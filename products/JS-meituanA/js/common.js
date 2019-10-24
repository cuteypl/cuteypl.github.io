
toActive();
// var footerNav = document.getElementById('footer_nav');
// footerNav.addEventListener('click',toActive);
// 找到当前页面的url来确定key值
function toActive(){
    var arr = window.location.pathname.split('/');
    var pageName = arr[arr.length-1].replace('.html','') || 'index';

    var footerNavA = document.getElementsByClassName('footer_nav-a');

    for(var i=0, len=footerNavA.length; i<len; i++){
        var str = footerNavA[i].className;
        if(str.search(pageName)<0){
            footerNavA[i].className = str.replace(/\sactive/,'');
        }
        else{    
            footerNavA[i].className += ' ' + 'active';
        }
    } 
}

/* 
    添加或删除类
    param：ele为要操作添加/删除某一类名的元素，classNstr为类名（注意传字符串形式）
*/
function mytoggleClass(ele,classNStr){
    var str = ele.className;
    if(str.search(classNStr)<0){  //class中没有classNStr时 str.search()为字符串方法
        ele.className += ' ' + classNStr;  //添加classNStr类
    }
    else{                         //class中有none时 str.replace()为字符串方法
        str = str.replace(classNStr,''); //删除none类
        ele.className = str;
    }
}



// getList();
// function getList(){
//     var list = null;
//     $.ajax({
//         type:'GET',
//         url: '../json/restanurant.json', 
//         async: false, //true---异步 false---同步,此处要为同步加载数据，否则list没有数据
//         success: function(data){
//                 console.log(data);
//                 list = data.data.poilist || [];
//         }
//     });
//     console.log(list);
//     return list;
// }