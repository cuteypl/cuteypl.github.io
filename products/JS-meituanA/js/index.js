var headerEle = document.getElementById("header");

var searchInp = headerEle.getElementsByClassName("header_search-input")[0],
    searchClose = headerEle.getElementsByClassName("fa-myclose")[0];

//为搜索框添加input、touch事件
searchInp.addEventListener('input',toShowClose);
searchInp.addEventListener('touch',toShowClose);
/* 
    显示隐藏搜索框的清除按钮
    param
*/
function toShowClose(){
    var strclassName = searchClose.className;
    if(!searchInp.value){   //搜索框内容为空时 且 
        if(strclassName.search(/none/)<0){  //清除按钮的class中没有none时 str.search()为字符串方法
            searchClose.className += ' ' + 'none';  //添加none类
        }                   //class中有none时,不用再次添加none类
    }
    else{                 //搜索框内容不为空时 且
        if(strclassName.search(/none/)>0){ //清除按钮的class中有none时 str.search()为字符串方法
            searchClose.className = 'fa-myclose'; //删除none类
        }                  //class中无none时,不用再次执行删除none类
    }
}
//为搜索框的清除按钮添加click、touch事件
searchClose.addEventListener('click',toDeleteValue);
searchClose.addEventListener('touch',toDeleteValue);
/* 
    清除搜索框内容
    param
*/
function toDeleteValue(){
    searchInp.value = '';
    searchClose.className += ' '+'none';
}


var towcodeBtn = headerEle.getElementsByClassName('header_towcode')[0],
    twocodeList = headerEle.getElementsByClassName('header_twocode-list')[0];

//为二维码按钮添加click、touch事件
towcodeBtn.addEventListener('click',function(){mytoggleClass(twocodeList,'none');});
towcodeBtn.addEventListener('touch',function(){mytoggleClass(twocodeList,'none');});

getDataToContentList();
/*
    获取商家列表数据并渲染到页面
    param
*/
function getDataToContentList(){
    //商家详情列表模板
    var itemTmpl = '<li class="content_list-item">'+
                '<div class="content_list-itemL"><img class="content_list-itemLImg" src=$Store_imgurl>$Store_brand</div>'+
                '<div class="content_list-itemR">'+
                    '<h4 class="content_list-itemRTitle">$Store_name</h4>'+
                    '<p class="content_list-itemRDesc">'+
                        '<span class="content_list-itemRScore">$Store_score</span>'+
                        '<span class="content_list-itemRScale">月售$Store_sale</span>'+
                        '<span class="content_list-itemRDistance">$Store_distance</span>'+
                        '<span class="content_list-itemRTime">$Store_deliverytime&nbsp;|&nbsp;</span>'+
                    '</p>'+
                    '<p class="content_list-itemRSendPrice">$Store_preprice</p>'+
                    '<ul class="content_list-itemROtherTipsUL">$Store_discount</ul>'+
                '</div>'+
            '</li>';
   
    var contentListEle = document.getElementById('content_list');
    var startindex = 0, count = 5, page = 0, maxpage = 4,isLoading = false;
    var datalist = null;  

    datalist = getList();
    initContentList(datalist,startindex,4);
    isLoading = false;
    startindex = startindex + 4;

    function initContentList(datalist,startindex,count){
        isLoading = true;
        page++;
        var len = datalist.length;
        var arrlist = datalist.slice(startindex,startindex+count);
        arrlist.forEach(function(item,index){
            var str = itemTmpl
                      .replace('$Store_imgurl',item.pic_url)
                      .replace('$Store_name',item.name)
                      .replace('$Store_distance',item.distance)
                      .replace('$Store_deliverytime',item.mt_delivery_time)
                      .replace('$Store_preprice',item.min_price_tip)
                      .replace('$Store_brand',getBrand(item))
                      .replace('$Store_score',getStar(item))
                      .replace('$Store_sale',getSale(item))
                      .replace('$Store_discount',getDiscount(item));
            $(contentListEle).append(str);
            contentListEle.lastElementChild.storeInfo = {storeId:item.id, storeName:item.name}; //为当前的列表项添加一个自定义属性存储商家的id和名称
            contentListEle.lastElementChild.addEventListener('click',function (e) {toStoreMenu(item.id,item.name);}); //为当前的列表项添加点击事件，跳转到相应的商家菜单页面
            contentListEle.lastElementChild.addEventListener('touch',function (e) {toStoreMenu(item.id,item.name);}); //为当前的列表项添加点击事件，跳转到相应的商家菜单页面
        });
    }

    window.addEventListener('scroll',function(){
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = document.body.scrollHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var proDis = 30; //px为单位
        if ((scrollTop + clientHeight) >= (scrollHeight-proDis)) {
            if (page < maxpage || (startindex < datalist.length)) {  // 最多滚动加载3页
                if (isLoading) { // 在发送ajax请求时避免触发多次滚动加载
                    return;
                }
                initContentList(datalist,startindex,count);
                isLoading = false;
                startindex = startindex + count;
            }else {
                var loadingEle = document.getElementById('content_loading');
                loadingEle.innerHTML = '加载完成';
            }   
        }
    });

    //获取商家列表数据
    function getList(){
        var list = null;
        $.ajax({
            type:'GET',
            url: '../json/homelist.json', 
            async: false, //true---异步 false---同步,此处要为同步加载数据，否则list没有数据
            success: function(data){
                    console.log(data);
                    list = data.data.poilist || [];
            }
        });
        console.log(list);
        return list;
    }

    function getBrand(data){
        if (data.brand_type) {
            return '<span class="content_list-itemLBrand Brand-Old">品牌</span>';
        } else {
            return '<span class="content_list-itemLBrand Brand-New">新到</span>';
        }
    }

    function getStar(data){
        var _score = data.wm_poi_score || '';
        _score = _score.toString();
        var scoreArray = _score.split('.');  //4.4
        var fullstar = parseInt(scoreArray[0]);  // 满星
        var halfstar = parseInt(scoreArray[1]) >=5 ? 1: 0; // 半星
        var nullstar = 5 - fullstar - halfstar; // 0星

        var starstr = '';
        for (var i = 0 ; i < fullstar ; i++) {
            starstr += '<i class="fa fa-star"></i>'
        }
        for (var j = 0 ; j < halfstar ; j++) {
            starstr += '<i class="fa fa-star-half-full"></i>'
        }
        for (var k = 0 ; k < nullstar ; k++) {
            starstr += '<i class="fa fa-star-o"></i>'
        }
        return starstr;
    }

    function getSale(data){
        if (data.month_sale_num > 999) { 
            return '999+';   // 大于999采用999+
        }
        return data.month_sale_num
    }

    function getDiscount(data){
        var array = data.discounts2;
        var str = '';
        array.forEach(function(item, index){
            // 内部的商家活动模版字符串
            var _str = null;
            if(item.id == -2){
                _str = '<li class="content_list-itemROtherTipsUL-li one-line"><i class="fa-myticket">票</i>'+item.info+'</li>';
            }
            else if(item.id == 100){
                _str = '<li class="content_list-itemROtherTipsUL-li one-line"><i class="fa-myrefund">返</i>'+item.info+'</li>';
            }
            else if(item.id == 103){
                _str = '<li class="content_list-itemROtherTipsUL-li one-line"><i class="fa-mycoupon">领</i>'+item.info+'</li>';
            }
            else{
                _str = '';
            }
            // 字符串拼接
            str = str + _str;
        })
        return str;
    }
}

/* 
    点击相应的商家列表项，跳转到相应的商家菜单页面 并初始化菜单页的头部
    param
*/
function toStoreMenu(storeId,storeName){
    var urldata = storeId +'&&'+ storeName;
    // urldata = encodeURIComponent(urldata);
    // console.log(urldata);
    window.open('menu.html?'+urldata,'_self', true);
}

$.get('../json/restanurant.json', function(data){
    console.log(data);
});
$.get('../json/comments.json', function(data){
    console.log(data);
});
$.get('../json/filter.json', function(data){
    console.log(data);
});
$.get('../json/head.json', function(data){
    console.log(data);
});
$.get('../json/listparams.json', function(data){
    console.log(data);
});
$.get('../json/orders.json', function(data){
    console.log(data);
});
