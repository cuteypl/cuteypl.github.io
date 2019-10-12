# 使用SVG绘制的星空背景图
## 1、SVG 与 PNG、JPG、CANVAS的区别
SVG是一个基于XML的可伸缩矢量图形，它使用XML格式来定义图形  
CANVAS是通过JS来创建的图形  
SVG与JPEG、PNG等图片比起来更小且放大缩小后不失真
## 2、创建SVG文件
    <?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> 
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox='0 0 64 64' width='64' height='64'><circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />...</svg> 
## 3、创建SVG标签
    <svg width="100%" height="100%" viewBox="-400 -300 800 600" preserveAspectRatio="xMidYMid slice"></svg>
## 4、SVG的几个属性说明
### 4.1 viewBox、preserveAspectRatio
### 4.2 stroke
## 5、SVG标签下的基本图形
(PS:所有坐标都是相对于SVG的坐标系统的，所以在填入SVG内容时先搞清楚当前SVG的坐标系统原点)
### 5.1 rect
    <rect x="10" y="10" width="100" height="100" rx="5" ry="5" style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9"></rect>  
* x/y--->x坐标y坐标  
* width/height--->宽/高  
* rx/ry--->圆角  
* style--->样式  
    * fill--->填充色
    * fill-opacity--->填充区透明度
    * stroke--->描边色 
    * stroke-opacity--->描边透明度
    * stroke-width--->边框宽度
### 5.2 circle
    <circle cx="10" cy="10" r="50" style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9"></circle>
* cx/cy--->圆心坐标
* r--->半径
### 5.3 ellipse
    <ellipse cx="300" cy="80" rx="100" ry="50"style="fill:yellow;stroke:purple;stroke-width:2"></ellipse>
* rx--->水平轴半径
* ry--->垂直轴半径
### 5.4 line
    <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);           
### 5.5 polygon(多边形)
    <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1"/>
### 5.6 polyline(曲线)
    <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" style="fill:white stroke:red;stroke-width:4" />
### 5.7 path(路径)
    <path id="lineAB" d="M 100 350 l 150 -300" stroke="red" stroke-width="3" fill="none" />
* M = moveto 开始点
* L = lineto 直线结束点
* H = horizontal lineto 水平直线结束点
* V = vertical lineto 垂直直线结束点
* C = curveto 三次贝赛尔曲线
* S = smooth curveto 光滑三次贝赛尔曲线
* Q = quadratic Bézier curve 二次贝赛尔曲线
* T = smooth quadratic Bézier curveto 光滑二次贝赛尔曲线
* A = elliptical Arc 椭圆弧
* Z = closepath 关闭路径
PS：大写表示绝对定位，小写表示相对定位
### 5.8 文本
    <text x="0" y="15" fill="red">I love SVG</text>    
## 6、SVG的渐变
## 7、SVG的滤镜、模糊、阴影
## 8、SVG下的几个标签说明
### 8.1 marker
### 8.2 mask
### 8.3 defs
## 9、SVG在CSS中的一种应用
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' style='fill:red; stroke:none' %3E%3Crect x='0' y='40' width='100' height='20' /%3E%3Crect x='40' y='0' width='20' height='100' /%3E%3C/svg%3E");
    /* 其实质是 */
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' style='fill:red; stroke:none'><rect x='0' y='40' width='100' height='20' /><rect x='40' y='0' width='20' height='100' /></svg>");  
    /* %3C--->为“<"的转义编码  %3E--->为“>”的转义编码  主要是为了兼容IE  */


 [查看源码](https://github.com/cuteypl/cuteypl.github.io/blob/master/products/h5-svgStarSky)


