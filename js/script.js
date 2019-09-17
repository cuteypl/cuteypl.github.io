var aNavEles = document.getElementsByTagName("a"),
    ulEle = document.getElementsByClassName("contain_nav-ul")[0],
    divBanEle = document.getElementsByClassName("contain_banner")[0],
    containEle = document.getElementsByClassName("contain")[0];
var currentIndex = 0, //全局变量，记录当前为active状态的目标,mouseover 和 click 事件都会改变这个变量
    originIndex = 0; //全局变量，记录原为active状态的目标，仅发生click事件会改变这个变量，mouseover事件不会改变这个变量
var timer = null; //定时器句柄

for(var i=0; i<aNavEles.length; i++){
    aNavEles[i].index=i; //给li对象添加index属性
}

//每秒钟切换一次
timerFn();
function timerFn(){
    timer = setInterval(function(){
        var nextIndex = (currentIndex + 1)%4;
        currentIndex = activeToLi(aNavEles,divBanEle,currentIndex,nextIndex,originIndex,"setInterval");
        originIndex = currentIndex;
        },1000);
}
//当鼠标放到整体页面上时，暂停轮播
EventUtil.addHandler(containEle,"mouseover",function(){
    clearInterval(timer);
}); 
//当鼠标离开整体页面上时，开始轮播
EventUtil.addHandler(containEle,"mouseout",function(){
    timerFn();
}); 
//添加鼠标放到选项上时，高亮且显示图片
EventUtil.addHandler(ulEle,"mouseover",function(){
    var nextIndex = EventUtil.getTarget(event).index; //获取触发事件的对象的索引
    currentIndex = activeToLi(aNavEles,divBanEle,currentIndex,nextIndex,originIndex,"mouseover");
}); 
//添加鼠标离开选项时，还原为上一次的状态
EventUtil.addHandler(ulEle,"mouseout",function(){
    var nextIndex = EventUtil.getTarget(event).index; //获取触发事件的对象的索引
    currentIndex = activeToLi(aNavEles,divBanEle,currentIndex,nextIndex,originIndex,"mouseout");
}); 
//添加鼠标放点击选项时，高亮且显示图片
EventUtil.addHandler(ulEle,"click",function(){
    var nextIndex = EventUtil.getTarget(event).index; //获取触发事件的对象的索引
    currentIndex = activeToLi(aNavEles,divBanEle,currentIndex,nextIndex,originIndex,"click");
    originIndex = currentIndex;
}); 

/* 
    选项高亮同时进行广告图片进行切换
    parameter:targetEles---选项集合
              imgEle---广告图片容器
              currentIndex---当前高亮的选项index索引
              nextIndex---将要高亮的选项index索引
              originIndex---原始高亮的选项索引（为了使鼠标移动到选项上但未点击而直接离开时能恢复到原来的样子）
              eventType---事件类型  
    return:返回当前点击对象的索引，更改currentIndex;
*/
function activeToLi(targetEles,imgEle,currentIndex,nextIndex,originIndex,eventType){
    if(eventType == "click" || eventType == "mouseover" || eventType == "setInterval"){
        ClassUtil.removeClass(targetEles[currentIndex],"active"); //将当前对象去除active状态
        ClassUtil.addClass(targetEles[nextIndex],"active"); //为点击对象添加active状态
        imgEle.style.backgroundImage = "url(images/"+ nextIndex +".jpg)"; //给bannerdiv更改背景图像
        return nextIndex; //返回当前点击对象的索引
    }
    else if(eventType == "mouseout"){
        ClassUtil.removeClass(targetEles[currentIndex],"active"); //将当前对象去除active状态
        ClassUtil.addClass(targetEles[originIndex],"active"); //为点击对象添加active状态
        imgEle.style.backgroundImage = "url(images/"+ originIndex +".jpg)";  //给bannerdiv更改背景图像
        return originIndex; //返回当前点击对象的索引
    }
    
}
