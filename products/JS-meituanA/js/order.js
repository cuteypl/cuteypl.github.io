
getDataToOrderList();

function getDataToOrderList(){
    var itemTmpl = '<li class="order_list-item">'+
                    '<div class="order_list-itemTop">'+
                        '<img class="order_list-itemTopL" src=$Store_imgurl alt="">'+
                        '<div class="order_list-itemTopR">'+
                            '<div class="order_list-itemTopRTitle"><p class="order_list-itemTopRTitle-Store one-line" href="javascript:;">$Store_name</p><i class="order_list-itemTopRTitle-Arrow fa fa-angle-right fa-lg"></i><span class="order_list-itemTopRTitle-OrderState">$Order_state</span></div>'+
                            '$Product_list'+
                            '<p class="order_list-itemTopRTotal">...<span class="order_list-itemTopRTotal-Count">总计$Product_count个菜,实付<b class="order_list-itemTopRTotal-Price">¥$Total_price</b></span></p>'+
                        '</div>'+
                    '</div>'+
                    '$Comment_btn'+
                    '</li>';
    
    var orderListEle = document.getElementById('order_list');
    var startindex = 0, count = 3, page = 0, maxpage = 3,isLoading = false;
    var datalist = null;

    datalist = getList();
    initOrderList(datalist);
    isLoading = false;

    function initOrderList(datalist){
        isLoading = true;
        var arrlist = datalist.slice(startindex,startindex+count);
        startindex = startindex + count;
        page++;
        var str = '';
        arrlist.forEach(function(item,index){
            str = itemTmpl
                      .replace('$Store_imgurl',item.poi_pic)
                      .replace('$Store_name',item.poi_name)
                      .replace('$Order_state',item.status_description)
                      .replace('$Product_count',item.product_count)
                      .replace('$Total_price',item.total)
                      .replace('$Product_list',getProductList(item))
                      .replace('$Comment_btn',getCommentBtn(item));
            $(orderListEle).append(str);
        });
    }

    window.addEventListener('scroll',function(){
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = document.body.scrollHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var proDis = 30; //px为单位
        if ((scrollTop + clientHeight) >= (scrollHeight-proDis)) {
            if (page < maxpage && (startindex < datalist.length)) {  // 最多滚动加载3页
                if (isLoading) { // 在发送ajax请求时避免触发多次滚动加载
                    return;
                }
                initOrderList(datalist);
                isLoading = false;
            }else {
                console.log(111);
                var loadingEle = document.getElementById('content_loading');
                loadingEle.innerHTML = '加载完成';
            }   
        }
    })

    //获取商家列表数据
    function getList(){
        var list = null;
        $.ajax({
            type:'GET',
            url: '../json/orders.json', 
            async: false, //true---异步 false---同步,此处要为同步加载数据，否则list没有数据
            success: function(data){
                    console.log(data);
                    list = data.data.digestlist || [];
            }
        });
        console.log(list);
        return list;
    }

    function getProductList(data){
        var arrlist = data.product_list || [];
        var str = '';
        arrlist.forEach(function(item,index){
            str += '<p class="order_list-itemTopRGoods">'+item.product_name+'<span class="order_list-itemTopRGoods-Count">x'+item.product_count+'</span></p>';
        })
        return str;
    }

    function getCommentBtn(data){
        var isComment = !data.is_comment;
        if(isComment){
            return '<div class="order_list-itemBottom"><button class="order_list-itemBottom-Btn" type="button">评价</button></div>';
        }
        else{
            return '';
        }
    }
}