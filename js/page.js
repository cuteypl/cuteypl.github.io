(function(){
    var postId = location.href.split('=').pop(); //pop删除数组的最后一个元素并返回被删除的元素
    var currentpageInfoData = getcurrentpageInfoData(JSON.parse(sessionStorage.getItem('pageinfoData')).page);//获取到当前文章的基本信息
    var urlstr = 'https://cuteypl.github.io/pages/page$postId.html'.replace('$postId',postId);
    var currentpageHtmlData = getcurrentpageHtmlData('https://cuteypl.github.io/pages/page2.html');//获取到相对于文章的html

    document.title = currentpageInfoData.title;//渲染文章的标题
    document.head.innerHTML += currentpageHtmlData.stylestr;//渲染文档的style样式
    document.getElementById('article-inner').innerHTML = currentpageHtmlData.bodystr;//渲染文章内容
    document.getElementById('article-mark').innerHTML = renderPageMark() + document.getElementById('article-mark').innerHTML;//渲染文章分类标签
    document.getElementById('article-info').innerHTML = renderPageInfo();//渲染文章发布时间和作者等信息
    document.getElementById('aside-list').innerHTML = renderPageTitleList();//渲染文章的目录
    document.getElementById('list-btn').addEventListener('click',function(){toshowOrhiddenList(document.getElementById('aside-list'))});//控制文章目录显示隐藏按钮
    document.getElementById('arrow-up').addEventListener('click',toTop);//返回顶部
    document.getElementById('arrow-down').addEventListener('click',toBottom);//返回底部
    document.getElementById('home-btn').addEventListener('click',function(){location.href='https://cuteypl.github.io'});//返回首页
    document.getElementById('tool-comment').addEventListener('click',function(){toshowOrhiddenList(document.getElementById('gitalk-container'))});//点击显示隐藏评论
    document.getElementById('tool-praise').addEventListener('click',function(e){addpraise(e)});//点赞

    /* 返回当前id文章基本信息数据 */
    function getcurrentpageInfoData(datas){
        for(var i=0,len=datas.length; i<len; i++){
            var dataArr = datas[i].data;
            for(var j=0,len=dataArr.length; j<len; j++){
                if(dataArr[j].id === postId){
                    return dataArr[j];
                }
            }
            
        }
    }
    /* 从pages获取当前文章的 */
    function getcurrentpageHtmlData(urlstr){
        var currentpageHtmlData = null;
        $.ajax({
            type:'GET',
            url: urlstr, 
            async: false, //true---异步 false---同步,此处要为同步加载数据，否则list没有数据
            dataType: String,
            success: function(data){
                currentpageHtmlData = data || '';//获取到的是个字符串
            }
        });
        if(currentpageHtmlData){
            var startindex = currentpageHtmlData.indexOf('<style>');
            var endindex = currentpageHtmlData.indexOf('</head>');
            var stylestr = currentpageHtmlData.substring(startindex,endindex).trim();//trim()去除头尾的空格
            startindex = currentpageHtmlData.indexOf('<body>');
            endindex = currentpageHtmlData.indexOf('</html>');
            bodystr = currentpageHtmlData.substring(startindex,endindex).trim();
            bodystr = bodystr.substring(6,bodystr.length-7);//将<body>和</body>去掉
            currentpageHtmlData = {'stylestr':stylestr,'bodystr':bodystr};
        }
        return currentpageHtmlData;
    }
    /* 渲染文章的分类标签 */
    function renderPageMark(){
        var str = `<span class="mark-img"></span>`;
        var str1 = '';
        for(var i=0,len=currentpageInfoData.mark.length; i<len; i++){
            str1 += `<span class="mark-category">`+currentpageInfoData.mark[i]+`</span>`;
        }
        str += str1;           
        return str;
    }
    /* 渲染文章的基本信息 */
    function renderPageInfo(){
        var urlstr = currentpageInfoData.copyright==='原创'?currentpageInfoData.url:currentpageInfoData.url1;//是原创则读取url,是转载则读取url1
        var str = `<span>发布时间：`+currentpageInfoData.date+`</span>
                    <a href="`+urlstr+`">`+currentpageInfoData.copyright+`</a>
                    <span>作者：`+currentpageInfoData.author+`</span>
                    <span>友情提示：转载请保留原文链接及作者</span>`;
        return str;
    }
    /* 显示或隐藏标题列表 */
    function toshowOrhiddenList(ele){
        if(ele.style.display === 'none'){//为none时，显示
            ele.style.display = 'block';
        }
        else{
            ele.style.display = 'none';
        }
    }
    /* 获取数据并渲染标题列表 */
    function renderPageTitleList(){
        var eles = document.getElementById('article-inner').children;
        var hEleArr = [];//存放标题元素的dom对象
        var hArr = ['H1','H2','H3','H4','H5','H6'];
        var str = '';
        for(var i=0,len=eles.length; i<len; i++){
            if(hArr.includes(eles[i].tagName)){
                hEleArr.push(eles[i]);
            }
        }
        hEleArr.shift();
        for(var i=0,len=hEleArr.length; i<len; i++){
            str += `<li class="list-item"><a href="#`+hEleArr[i].id+`">`+ hEleArr[i].innerHTML +`</a></li>`;
        }
        return str;
    }
    /* 返回顶部 */
    function toTop(){
        scrollTo(0,0);
    }
    /* 返回底部 */
    function toBottom(){
        scrollTo(0,document.body.clientHeight);
    }
    /* 点赞 */
    function addpraise(e){
        if(!e.target.style.background){
            e.target.style.background = 'url("../images/love1.png")';
        }
        else{
            e.target.style.background = '';
        }
    }
})();