var headerTitle = document.getElementsByClassName('header_title')[0];
headerTitle.innerHTML = document.title;  //设置当前头部为商家名称

var DataListG = getList();
var contentLeftNav = document.getElementById('content_leftNav');
var currentIndexLeftNav = 0;
getDataToMenuLeftNav(DataListG);
toActiveEventForLeftNav(0);

contentLeftNav.addEventListener('click',function(e){var index = e.target.index; toActiveEventForLeftNav(index);});
contentLeftNav.addEventListener('touch',function(e){var index = e.target.index; toActiveEventForLeftNav(index);});

//获取对应商家的商品数据
function getList(){
    var list = null;
    $.ajax({
        type:'GET',
        url: '../json/food.json', 
        async: false, //true---异步 false---同步,此处要为同步加载数据，否则list没有数据
        success: function(data){
                console.log(data);
                list = data.data.food_spu_tags || [];
        }
    });
    console.log(list);
    return list;
}

function getDataToMenuLeftNav(datalist){
    var itemTmpl = '<a class="content_leftNav-item" href="javascrpit:;">$Content</a>';
    // var contentLeftNav = document.getElementById('content_leftNav');
    console.log(contentLeftNav);
    initMenuLeftNav(datalist);

    function initMenuLeftNav(datalist){
        var str = ''; 
        datalist.forEach(function(item,index){
            str += itemTmpl.replace('$Content',getContent(item));
        });
        contentLeftNav.innerHTML = str;
        var alist = contentLeftNav.getElementsByTagName('a');
        for(var i=0, len=alist.length; i<len; i++){
            alist[i].index = i;
        }
    }

    function getContent(data){
        if(data.icon){
            return '<img class="content_leftNav-item-icon" src="'+ data.icon +'">' + data.name; 
        }
        else{
            return data.name;
        }
    }
}

function toActiveEventForLeftNav(index){
    var eles = contentLeftNav.getElementsByTagName('a');

    // for(var i=0, len=eles.length; i<len; i++){
    //     eles[i].className = eles[i].className.replace(/\sactive/,'');
    // }
    eles[currentIndexLeftNav].className = eles[currentIndexLeftNav].className.replace(/\sactive/,'');
    eles[index].className += ' ' + 'active';
    currentIndexLeftNav = index;
    getDataToMenuRightTitle(DataListG,index);
    getDataToMenuRightList(DataListG,index);
}

function getDataToMenuRightTitle(datalist,index){
    var contentRightTitle = document.getElementById('content_rightTitle');
    var str = '<span class="content_rightMainTitle">'+ datalist[index].name +'</span>';
    contentRightTitle.innerHTML = str;
}

function getDataToMenuRightList(datalist,index){
    var dataArr = datalist[index].spus;
    var itemTmpl = '<li class="content_rightItem">'+
                        '<img class="content_rightItem-img" src="$Food_imgurl" alt="">'+
                        '<div class="content_rightItem-detail">'+
                            '<h4 class="content_rightItem-title">$Food_name</h4>'+
                            '<p class="content_rightItem-desc multi-line">$Food_desc</p>'+
                            '<p class="content_rightItem-praise">赞$Food_praise</p>'+
                            '<div class="content_rightItem-info">'+
                                '<p class="content_rightItem-price"><span class="content_rightItem-priceNum">￥$Food_price</span>/$Food_unit</p>'+
                                '<p class="content_rightItem-buycount"><span class="minus-btn"></span><span class="count-text">$Food_count</span><span class="plus-btn"></span></p>'+
                            '</div>'+
                        '</div>'+
                    '</li>';
    var contentRightList = document.getElementById('content_rightList');
    initMenuRightList(dataArr);
    // console.log(DataListG);

    function initMenuRightList(datalist){
        var str = '';
        console.log(datalist);
        datalist.forEach(function (item,index) {
            // debugger;
            if(!item.choosecount){  //!item.choose 如choose为0，或undefined时创键 ，如果choose大于0则不进行刷新，保留原值
                item.choosecount = 0;
                datalist[index] = item; //更新当前datalist[index]为新的item数据
            }
            str += itemTmpl
                    .replace('$Food_imgurl',item.picture)
                    .replace('$Food_name',item.name)
                    .replace('$Food_desc',item.description)
                    .replace('$Food_praise',item.praise_num)
                    .replace('$Food_price',item.min_price)
                    .replace('$Food_unit',item.unit)
                    .replace('$Food_count',item.choosecount);
        });
        contentRightList.innerHTML = str;
        DataListG[currentIndexLeftNav].spus = datalist; //更新全局域的DataListG数据  
        var itemlist = contentRightList.getElementsByClassName('content_rightItem');
        for(var i=0, len=itemlist.length; i<len; i++){
            itemlist[i].index = i;
        }
    }
}

function getDataToMenuDevPrice(){

}

//shop car 
var shopCarEle = document.getElementById('shop_bottom-car'),
    shopTopEle = document.getElementById('shop_top'),
    maskEle = document.getElementById('mask');
var foodArr = [] , key = 0 ;

//点击购物车 显示或隐藏 订单列表和遮罩层
shopCarEle.addEventListener('click',function(){mytoggleClass(shopTopEle,'none');});
shopCarEle.addEventListener('touch',function(){mytoggleClass(shopTopEle,'none');});
shopCarEle.addEventListener('click',function(){mytoggleClass(maskEle,'none');});
shopCarEle.addEventListener('touch',function(){mytoggleClass(maskEle,'none');});

//点餐，实现联动修改购物车数量价格信息 逻辑
var contentRightList = document.getElementById('content_rightList');
contentRightList.addEventListener('click',function(e){MinusAndPlusOfRight(e)});
contentRightList.addEventListener('touch',function(e){MinusAndPlusOfRight(e)});

function MinusAndPlusOfRight(e) {  
    var Xindex = currentIndexLeftNav, Yindex = e.target.parentNode.parentNode.parentNode.parentNode.index;
    var countTextEle = e.target.parentNode.getElementsByClassName('count-text')[0]
    var choosecount = '';
    if(e.target.className == 'minus-btn'){
        choosecount = (countTextEle.innerText - 1) < 0 ? 0 : (countTextEle.innerText - 1);     
    }
    else if(e.target.className == 'plus-btn'){
        choosecount = parseInt(countTextEle.innerText) + 1;
    }
    else{ return;}
    countTextEle.innerHTML = choosecount;  
    DataListG[Xindex].spus[Yindex].choosecount = choosecount; //更新全局域中的DataListG数据
    // console.log(DataListG);
    renderItemToShopList(Xindex,Yindex);
    renderNumToShopGoodsNum();
    renderPriceToShopPrice();
}

function renderItemToShopList(indexL,indexR){
    // debugger;
    var data = DataListG[indexL].spus[indexR]; 
    var shopGoodList = document.getElementById('shop_top-goodslist'),
        shopGoodListItemPrice = shopGoodList.getElementsByClassName('shop_top_goodslist-itemPriceNum'),
        shopGoodListItemCount = shopGoodList.getElementsByClassName('count-text');
    var isExit = false;
    
    foodArr.forEach(function(item,index){
        if((indexL==item.L) && (indexR==item.R)){
            isExit = true;
            if(data.choosecount){
                console.log(index);
                console.log(foodArr);
                shopGoodListItemPrice[index].innerHTML = data.min_price*data.choosecount;
                shopGoodListItemCount[index].innerHTML = data.choosecount;
                // isExit = true;
            }
            else{
                //若已存在，后数量减为了0，那就将该列去除
                console.log(shopGoodList.childNodes[index]);
                console.log(index);
                console.log(foodArr);
                shopGoodList.removeChild(shopGoodList.childNodes[index]);
                foodArr.splice(index,1);
                key--;
                // isExit = false;
            }
            return;
        }
    });
    if(!isExit){
        if(data.choosecount){
            var str = '<li class="shop_top-goodslis-item" data-L='+ indexL +' data-R='+ indexR +'>'+
                            '<p class="shop_top-goodslis-itemGoodsName">'+ data.name +'</p>'+
                            '<p class="shop_top_goodslist-itemPrice">￥<span class="shop_top_goodslist-itemPriceNum">'+ (data.min_price*data.choosecount) +'</span></p>'+
                            '<p class="content_rightItem-buycount"><span class="minus-btn"></span><span class="count-text">'+ data.choosecount +'</span><span class="plus-btn"></span></p>'+                  
                        '</li>'; 
            shopGoodList.innerHTML += str;
            foodArr[key++] = {L:indexL, R:indexR};
            // isExit = false;
        }
    }  
}

function renderNumToShopGoodsNum(){
    var shopGoodList = document.getElementById('shop_top-goodslist'),
        shopGoodListItemCount = shopGoodList.getElementsByClassName('count-text'),
        shopCarEle = document.getElementById('shop_bottom-car'),
        goodsNum = document.getElementById('shop_bottom-goodsNum');
    var count = 0;
    for(var i=0, len=shopGoodListItemCount.length; i<len; i++){
        count += parseInt(shopGoodListItemCount[i].innerText);
    }
    if(count){
        if(goodsNum){
            //已经存在，刷新数量
            goodsNum.innerHTML = count;
        }
        else{
            var str = '<div class="shop_bottom-car-goodsNum" id="shop_bottom-goodsNum">'+ count +'</div>';
            shopCarEle.innerHTML = str;
        }
    }
    else{
        shopCarEle.innerHTML = '';
    }
}

function renderPriceToShopPrice(){
    var shopTotalPrice = document.getElementById('shop_bottom-priceGoodsNum'),
        shopGoodListPrice = document.getElementById('shop_top-goodslist').getElementsByClassName('shop_top_goodslist-itemPriceNum');
    var totalPrice = 0;
    for(var i=0, len=shopGoodListPrice.length; i<len; i++){
        totalPrice += parseFloat(shopGoodListPrice[i].innerHTML);
    }
    shopTotalPrice.innerHTML = totalPrice;
    // console.log(totalPrice);
}

var shopGoodList = document.getElementById('shop_top-goodslist');
shopGoodList.addEventListener('click',function (e) { MinusAndPlusOfShop(e);});
shopGoodList.addEventListener('touch',function (e) { MinusAndPlusOfShop(e);});

function MinusAndPlusOfShop(e){
    var shopGoodListItem = e.target.parentNode.parentNode;
    var Xindex = shopGoodListItem.dataset.l, Yindex = shopGoodListItem.dataset.r;
    var countTextEle = e.target.parentNode.getElementsByClassName('count-text')[0];
    if(e.target.className == 'minus-btn'){
        choosecount = (countTextEle.innerText - 1) < 0 ? 0 : (countTextEle.innerText - 1);     
    }
    else if(e.target.className == 'plus-btn'){
        choosecount = parseInt(countTextEle.innerText) + 1;
    }
    else{ return;}
    if(choosecount){
        countTextEle.innerHTML = choosecount;  
        shopGoodListItem.getElementsByClassName('shop_top_goodslist-itemPriceNum')[0].innerText = DataListG[Xindex].spus[Yindex].min_price * choosecount;
    }
   else{
       foodArr.forEach(function(item,index){
            if((Xindex == item.L) && (Yindex == item.R)){
                foodArr.splice(index,1);
                key--;
                return;
            }
       });
        shopGoodListItem.parentNode.removeChild(shopGoodListItem);
   }
    DataListG[Xindex].spus[Yindex].choosecount = choosecount; //更新全局域中的DataListG数据
    if(currentIndexLeftNav == Xindex){
        renderPriceToRightListCount(Yindex,choosecount);
    }
    renderNumToShopGoodsNum();
    renderPriceToShopPrice();
}

function renderPriceToRightListCount(index,count){
    var rightList = document.getElementById('content_rightList'),
        rightListItems = rightList.getElementsByTagName('li');
    rightListItems[index].getElementsByClassName('count-text')[0].innerHTML = count;
    // console.log(rightListItems[index].getElementsByClassName('count-text'));
}

var clearCarBtn = document.getElementById('shop_top-clearcarBtn');
clearCarBtn.addEventListener('click',toclearShopCar);
clearCarBtn.addEventListener('touch',toclearShopCar);

function toclearShopCar(){
    //清除购物列表
    var shopGoodList = document.getElementById('shop_top-goodslist');
    shopGoodList.innerHTML = '';
    //更新购物车的提示数量 及 订单总价格
    renderNumToShopGoodsNum();
    renderPriceToShopPrice();
    foodArr.forEach(function(item,index){
        if(item.L == currentIndexLeftNav){
            //更新当前显示的右边列表中的数量
            renderPriceToRightListCount(item.R,0);
        }
        //更新DataListG的choosecount数据
        DataListG[item.L].spus[item.R].choosecount =0;
    });
    //更新foodArr数据
    foodArr = [];
}

var topNavEle = document.getElementsByClassName('content_topNav')[0],
    topNavAEles = topNavEle.getElementsByTagName('a');
for(var i=0, len=topNavAEles.length; i<len; i++){
    topNavAEles[i].index = i;
}
topNavEle.addEventListener('click',function(e){toActiveForTopNav(e)});
topNavEle.addEventListener('touch',function(e){toActiveForTopNav(e)});
function toActiveForTopNav(e){
    // debugger;
    var index = e.target.index;
    var contentWrap = document.getElementsByClassName('content_bottomWrap');
    for(var i=0, len=contentWrap.length; i<len; i++){
        var str = contentWrap[i].className;
        if(str.search('none') < 0){
            contentWrap[i].className += ' ' + 'none';
        }
        str = topNavAEles[i].className;
        if(str.search('active') > 0){
            topNavAEles[i].className = str.replace(/active/,'');
        }

    }
    contentWrap[index].className = contentWrap[index].className.replace(/none/,'');
    topNavAEles[index].className += ' ' + 'active';
}
