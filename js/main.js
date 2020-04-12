(function(){
    const headerBtn = document.getElementById('header-btn');//菜单导航
    const headerTips = document.getElementById('header-tips');//菜单导航ul(菜单、分类、关于我)
    const headerTipsLis = document.getElementsByClassName('header-tipsLi');//菜单导航li(菜单、分类、关于我)
    const headerSwitchUls = document.getElementById('header-switch').getElementsByTagName('ul');//与菜单、分类、关于我 对应的 menu、category、about
    const headerMenu = document.getElementById('header-menu');//头部导航菜单
    const headerCatory = document.getElementById('header-catory');//分类列表菜单
    const artOrProList = document.getElementById('artOrPro-list');//文章标题列表
    const midPagenation = document.getElementById('mid-pagenation');//分页
    const arrowUp = document.getElementById('arrow-up');//返回顶部
    const arrowDown = document.getElementById('arrow-down');//返回底部
    var pageinfoData = null; //博客首页的总文章信息数据
    var currentCategoryData = null; //存储分类下的文章信息数据,为obj类型
    var productData = null; //我的作品的总信息数据
    var lifecordData = null; //生活语录的总信息数据
    var persize = 15; //每页显示的文章数
    var type = 1; //1代表当前为博客首页，2代表当前为我的作品页，3代表当前为分类页
    
    //进入首页时，初始化页面的一些数据
    pageinfoData = getPageOrProductInfoData('../json/pageinfo.json');//获取文章信息
    addListIndex(headerTipsLis);/* 为头部的菜单、分类、关于我的li元素添加index，主要服务于菜单的点击事件headerTips---targetShow */
    addListIndex(headerMenu.getElementsByClassName('header-menuLi')); //为头部导航的博客主页、我的作品、生活语录、个人简历、GitHub等li元素添加index，主要服务于headerMenu---switchHeaderMenu
    initCategoryNameList(headerCatory,pageinfoData);//初始化文章分类菜单
    initPageOrProductList(artOrProList,pageinfoData.page,1,persize);//初始化首页的文章列表
    initpagenation(midPagenation,getDataLenth(pageinfoData,1),persize);//初始化分页器列表
    sessionStorage.setItem('pageinfoData',JSON.stringify(pageinfoData));//JSON.stringify(pageinfoData)

    headerBtn.addEventListener('click',function(e){toggleClass(headerTips,'block')});
    headerTips.addEventListener('click',function(e){targetShow(e,headerSwitchUls);toggleClass(headerTips,'block');});/* 点击菜单、分类、关于我，分别对应显示menu、category、about,且点击完之后显示 */
    headerCatory.addEventListener('click',function(e){type=4,currentCategoryData = getCategoryData(e,pageinfoData.page);initCategoryTitleList(artOrProList,currentCategoryData,1,persize); initpagenation(midPagenation,currentCategoryData.data.length,persize);});//初始化分类文章列表
    headerMenu.addEventListener('click',function(e) {switchHeaderMenu(e);});
    midPagenation.addEventListener('click',function(e){switchPageNation(e,artOrProList,persize,type)});
    arrowUp.addEventListener('click',toTop);
    arrowDown.addEventListener('click',toBottom);

    /* 为eles添加index属性 */
    function addListIndex(eles){
        var i = 0;
        for(i,len=eles.length; i<len; i++){
            eles[i].index = i;
        }
    }
    /* 有则添加，无则删除class */
    function toggleClass(ele,classname){
        var classnameArr = ele.className.split(' ');
        var index = classnameArr.indexOf(classname);
        if(index===-1){
            classnameArr.push(classname);
        }
        else{
            classnameArr.splice(index,1);
        }
        ele.className = classnameArr.join(' ');
    }
    /* 添加类 */
    function addClass(ele,classname){
        var classnameArr = ele.className.split(' ');
        var index = classnameArr.indexOf(classname);
        if(index===-1){
            classnameArr.push(classname);
            ele.className = classnameArr.join(' ');
        }
    }
    /* 删除类 */
    function removeClass(ele,classname){
        var classnameArr = ele.className.split(' ');
        var index = classnameArr.indexOf(classname);
        if(index!==-1){
            classnameArr.splice(index,1);
            ele.className = classnameArr.join(' ');
        }
    }
    /* 让元素线显示或隐藏 */
    function displayToggel(ele){
        if(!ele.style.display || ele.style.display === 'none'){
            ele.style.display = 'block';
        }else{
            ele.style.display = 'none';
        }
    }
    /* 让目标对象显示，其他隐藏，参数：e为点击的事件源，targetEles为要显示的目标对象集合 */
    function targetShow(e,targetEles){
        var k = e.target.index;
        var i = 0;
        for(i,len=targetEles.length; i<len; i++){
            targetEles[i].style.display = 'none';
        }
        targetEles[k].style.display = 'block';
    }
    /* 获取文章的基本信息数据 */
    function getPageOrProductInfoData(urlstr){
        var pageOrproductData = null;
        $.ajax({
            type:'GET',
            url: urlstr, 
            async: false, //true---异步 false---同步,此处要为同步加载数据，否则list没有数据
            success: function(data){
                pageOrproductData = data || [];
            }
        });
        console.log(pageOrproductData);
        return pageOrproductData;
    }
    /* 初始化文章分类菜单 */
    function initCategoryNameList(ele,data){
        var i = 0, str = '', len=data.category.length;
        var categoryArr = data.category;
        for(i; i<len; i++){
            str += '<li class="header-catoryLi">'+categoryArr[i]+'</li>';
            ele.innerHTML = str;
        }
        console.log(str);
    }
    /* 点击首页或作品 */
    function initPageOrProductList(ele,datas,pagenum,persize){
        var str = '';
        var categoryNameArr = [], pagedataArr = [];
        var str1 = '';
        var index = (pagenum-1)*persize;
        var l = 0, pageliArr = [], countArr = [];
        for(var i=0,len=datas.length; i<len; i++){
            pagedataArr = pagedataArr.concat(datas[i].data);
            l += datas[i].data.length; 
            if((l-index) <= 0){
                continue;
            }
            else{
                categoryNameArr.push(`<p class="list-category">`+datas[i].year+`</p>`);//存放时间标题的数组
                if((l-index) >= persize){//如果当前长度-开始下标的插值 大于 persize，则就可以一次获取数据了
                    countArr.push(persize);//countArr[length-1]的最后一项是persize
                    pageliArr = getpageList(pagedataArr,index,persize);//满15个数据
                    break;
                }
                else{
                    countArr.push(l-index); //countArr存放循环加载了多少个page.data[i],作为pageliArr切割的依据
                    pageliArr = getpageList(pagedataArr,index,l-index);//不满15个数据
                    continue;
                }
            }
        }
        for(var i=0,len=countArr.length; i<len; i++){
            var count = i===0 ? countArr[i]:countArr[i]-countArr[i-1];//countArr[i]-countArr[i-1],用后一项减去前一项
            str1 = '<ul class="list-wrap">$str</ul>'.replace('$str',pageliArr.splice(0,count).join(''));
            str += '<div class="artOrPro-inner">' + categoryNameArr[i] + str1 + '</div>';
        }
        ele.innerHTML = str;
    }
    /* 点击分类，获取对应的分类数据 */
    function getCategoryData(e,datas){
        var categoryName = e.target.innerHTML;
        var categorydata = [], k = 0;
        for(var i=0,len=datas.length; i<len; i++){
            for(var j=0,len1=datas[i].data.length; j<len1; j++){
                if(datas[i].data[j].mark.includes(categoryName)){
                    categorydata[k++] = datas[i].data[j]
                }
            }
        }
        var obj = {name:categoryName,data:categorydata};
        return obj;
    }
    /* 点击分类，获取对应的分类文章,datas为文章分类数据对象，包含两部分，datas.name为分类名，datas.data为分类后的文章数组 */
    function initCategoryTitleList(ele,datas,pagenum,persize){
        var str = `<p class="list-category">$categoryName</p>`;
        var str1 = '';
        str = str.replace('$categoryName',datas.name);
        str1 = '<ul class="list-wrap">$str</ul>'.replace('$str',getpageList(datas.data,(pagenum-1)*persize,persize).join('')); //渲染分类文章列表
        str = '<div class="artOrPro-inner">' + str + str1 + '</div>';
        ele.innerHTML = str;
    }
    /* 根据index---初始下标位置，count---要截取的数量，返回数组---存放着li元素 */
    function getpageList(data,index,count){
        var i = index,
            liArr = [], 
            len = (data.length-(index+count)) > 0 ? (index+count) : data.length;
        for(i; i<len; i++){
            liArr.push('<li><a href="'+data[i].url+'">'+data[i].title+'</a><time class="time-date">'+data[i].date+'</time></li>');
        }
        return liArr;
    }
    //求取各种情况下的数据的长度，以便求出分页数
    function getDataLenth(datas,type){
        var totalcount = 0;
        if(type===1){//type为1时，代表是文章,此时的data要求为data.page,依据pageinfo.json的配置来
            datas = datas.page;
            for(var i=0,len=datas.length; i<len; i++){
                totalcount += datas[i].data.length;
                console.log(totalcount);
            }
        }
        else if(type===2){//type为2时，代表是作品,此时的data要求为data.product，依据productinfo.json的配置来
            datas = datas.product;
            for(var i=0,len=datas.length; i<len; i++){
                totalcount += datas[i].data.length;
            }
        }
        else if(type===3){//type为2时，代表是作品,此时的data要求为data.product，依据productinfo.json的配置来
            datas = datas.lifecord;
            for(var i=0,len=datas.length; i<len; i++){
                totalcount += datas[i].data.length;
            }
        }
        else{//type为4，为分类情况下的
            totalcount = datas.length;
        }
        return totalcount;
    }
    /* 初始化分页器，ele---插入分页器的元素，data---根据数据长度计算总页数，persize---每页的文章列表数 */
    function initpagenation(ele,countotal,persize){
        var pagecount = Math.ceil(countotal/persize);
        if(pagecount>1){//若大于1，则显示分页
            var str = `<a href="#" class="pagenav-prev">&lt; prev</a>$str1<a href="#" class="pagenav-next">next &gt;</a> `;
            var str1 = '';
            for(var i=1; i<=pagecount; i++){
                str1 += `<a href="javascript:;" class="pagenav-num">`+i+`</a>`;
            }
            ele.innerHTML = str.replace('$str1',str1);
        }
        else{//若小于等于1，则不显示分页
            ele.innerHTML = '';
        }
    }
    /* 点击头部导航，进行相对应的数据处理和数据显示 */
    function switchHeaderMenu(e){
        var index = e.target.index;
        if(index===0){//博客首页
            if(type===2){//防止在当前主页时重复点击主页重复加,当前页由作品页要切换为主页时，才重新获取并设置显示本页阅读数，否则就不再改变本页阅读数
                // getAndsetPageViewCount(type);//获取并设置显示本页阅读数
            }
            type=1;//更改 标志 当前页为博客主页,全局变量
            initPageOrProductList(artOrProList,pageinfoData.page,1,persize);//初始化首页的文章列表
            initpagenation(midPagenation,getDataLenth(pageinfoData,type),persize);//初始化分页器列表
        }
        else if(index===1){//我的作品
            //1、获取作品的数据；2、初始化作品的文章列表；3、初始化分页器
            if(type===1){//防止在当前作品时重复点击主页重复加，当前页由主页要切换为作品页时，才重新获取并设置显示本页阅读数，否则就不再改变本页阅读数
                // getAndsetPageViewCount(type);//获取并设置显示本页阅读数
            }
            type=2;//更改 标志 当前页为我的作品,全局变量
            productData = getPageOrProductInfoData('../json/product.json');//,全局变量
            initPageOrProductList(artOrProList,productData.product,1,persize);//初始化作品的文章列表
            initpagenation(midPagenation,getDataLenth(productData,type),persize);//初始化分页器列表
            sessionStorage.setItem('productData',JSON.stringify(productData));
        }
        //最新改动
        else if(index===2){//生活语录
            type=3;
            console.log(index=2);
            lifecordData = getPageOrProductInfoData('../json/lifecord.json');//全局变量
            console.log(lifecordData);  
            initPageOrProductList(artOrProList,lifecordData.lifecord,1,persize);//初始化生活语录的文章列表
            initpagenation(midPagenation,getDataLenth(lifecordData,type),persize);//初始化分页器列表
            sessionStorage.setItem('lifecordData',JSON.stringify(lifecordData));
        }
        else if(index===3){//个人简历 
            location.href = 'https://cuteypl.github.io/resume.html';
        }
        //最新改动
        else if(index===4){
            location.href = 'https://github.com/cuteypl';
        }
    }
    /* 点击分页的处理 */
    function switchPageNation(e,ele,persize,type){
        if(e.target.nodeName === 'A'){
            for(var i=0,len=e.currentTarget.children.length; i<len; i++){
                removeClass(e.currentTarget.children[i],'pagenav-active');
            }
            var text = e.target.innerHTML;
            if(text === '&lt; prev'){
                text = e.target.nextSibling.innerHTML;//读取当前元素的下一个兄弟元素的文本
                addClass(e.target.nextSibling,'pagenav-active');
            }
            else if (text === 'next &gt;'){
                text = e.target.previousSibling.innerHTML;//读取当前元素的上一个兄弟元素的文本
                addClass(e.target.previousSibling,'pagenav-active');
            }
            else{
                addClass(e.target,'pagenav-active');
            }
            if(type===4){
                initCategoryTitleList(ele,currentCategoryData,parseInt(text),persize);//调用initCategoryTitleList初始化分类文章列表
            }
            else if(type===2){
                initPageOrProductList(ele,productData.product,parseInt(text),persize);//加载我的作品的数据
            }
            else if(type===1){
                initPageOrProductList(ele,pageinfoData.page,parseInt(text),persize);//加载博客首页的数据
            }
        }
    }
    /* 返回顶部 */
    function toTop(){
        scrollTo(0,0);
        // console.log(innerHeight,innerWidth,screenLeft,screenTop);
    }
    /* 返回底部 */
    function toBottom(){
        scrollTo(0,document.body.clientHeight);
        // console.log(pageXOffset,pageYOffset,outerWidth,outerHeight,document.body.clientHeight);
    }
    /* 获取并设置显示本网站的访问量 */
    // function getAndsetWebsitViewCount(){
    //     var userId = sessionStorage.getItem('id');
    //     if(!userId){//若每页获取到userId,则设置sessinon,并简单的将访问量加1
    //         sessionStorage.setItem('id',Math.floor((Math.random()*999)+1));
    //         sessionStorage.setItem('viewwebsitecount',pageinfoData.viewwebsitcount+1);
    //     }
    //     var viewwebsitcount = sessionStorage.getItem('viewwebsitecount');
    //     var vistorTotalcount = document.getElementById('vistor-totalcount');
    //     vistorTotalcount.innerHTML = viewwebsitcount;
    // }
    /* 获取并设置本页的阅读量 */
    // function getAndsetPageViewCount(type){
    //     var count = 0;
    //     var vistorPagecount = document.getElementById('vistor-pagecount');
    //     if(type===2){//我的作品
    //         var viewproductcount = sessionStorage.getItem('viewproductcount');
    //         count = productData.viewproductcount;
    //         if(!viewproductcount){//如果viewproductcount不存在session中
    //             sessionStorage.setItem('viewproductcount',count+1);
    //         }
    //         else{//更新session
    //             sessionStorage.setItem('viewproductcount',parseInt(viewproductcount)+1);
    //         }
    //         vistorPagecount.innerHTML = sessionStorage.getItem('viewproductcount');
    //     }
    //     else{//博客主页 和 分类情况下
    //         var viewpagecount = sessionStorage.getItem('viewpagecount');
    //         count = pageinfoData.viewpagecount;
    //         if(!viewpagecount){//如果viewpagecount不存在session中
    //             sessionStorage.setItem('viewpagecount',count+1);
    //         }
    //         else{//更新session
    //             sessionStorage.setItem('viewpagecount',parseInt(viewpagecount)+1);
    //         }
    //         vistorPagecount.innerHTML = sessionStorage.getItem('viewpagecount');
    //     }
    // }
})();