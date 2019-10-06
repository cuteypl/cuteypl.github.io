# 做这个小猫运用到的CSS3知识点及技巧，如下
## 1、CSS3---border-radius
  ### 1.1 知识点
  border-radius: x/y  
  `border-radius: 5px; /\*---相当于border-radius: 5px 5px 5px 5px/5px 5px 5px 5px \*/; 

  border-radius: 5px 10px; /\*------相当于border-radius: 5px 10px 5px 10px/5px 10px 5px 10px;\*/  

  border-radius: 5px 10px 6px; /\*---相当于border-radius: 5px 10px 6px 10px/5px 10px 6px 10px;\*/  
  border-radius: 5px 10px 6px 6px/10px; /\*---相当于border-radius: 5px 10px 6px 6px/10px 10px 10px 10px;\*/`  

  以上每一个都可以拆开为8个数字，前四个数代表四个角的水平方向，后四个数代表四个角的垂直方向，且对应的四个角的顺序是top-left、top-right、bottom-right、bottom-left  
 ### 1.2 应用
 在这个项目中，分别在猫的耳朵、猫的眼睛、猫的头部的花纹、猫眼睛旁边的花纹、猫的鼻子、猫的嘴巴等分别应用到了border-radius，详细的代码就不展示了，自己多动手去试试就会了。
## 2、CSS3---background:linear-gradient
### 2.1 知识点
background: linear-gradient(方向,颜色值 开始渐变点,颜色值 开始渐变点,...)  

`background: linear-gradient(red,blue); /\*---默认渐变方向从上到下，由red渐变到blue\*/  

background: linear-gradient(to right,red 50%,blue 100%); /\*---从左到右，从元素宽度的50%的点开始由red渐变到blue，直至元素宽度的100%的点结束\*/ 

background: linear-gradient(to bottom right,red 50%,blue 100%); /\*---从左上角到右下角，从元素宽度的50%的点开始由red渐变到blue，直至元素宽度的100%的点结束\*/   

background: linear-gradient(45deg,red 50%,blue 100%); /\*---渐变方向变成顺时针旋转45度，从对角线长度的50%的点开始由red渐变到blue，直至对角线长度的100%的点结束，说明这里的坐标系是：竖直方向为0度，想一想顺时针旋转45度是怎样的\*/`
### 2.2 应用
在这个项目中，主要是在猫的头部的花纹采用到了背景渐变，若每页背景渐变，按传统的做法就是添加一个div覆盖该父元素的半边来制造出一个div的背景色一半一个颜色
## 3、CSS3---z-index
 只有设置了position的元素，才可以设置层级  
 一个(定位)元素的层级的参照是根据其直系最近的(定位)父元素的层级来的  

 只有设置 position 为 absolute/fixed 的元素，设置top、right、bottom、left才生效  
## 4、CSS3---transform
 ### 4.1 知识点
 transform: translate()/rotate()/skew()/scale()
 ### 4.2 应用
 在这个项目中，主要是在猫的耳朵、猫的眼部周边的花纹等使用到了角度rotate变换，然后再有一点就是使用translate来使元素居中显示  
 然后，讲一下项目中，比较有技巧的一点就是：猫的眼部周边的花纹，左右两边是对称显示的，右边使用rotateY(180deg)，进行翻转，就可以对左右元素编写同样的样式，然后给右边元素添加rotateY(180deg)，就可以达到对称的效果，所以，以后在碰到对称的元素时，可以使用这一技巧。

 ## 5、总结
 以上就是这个demo使用的一些CSS3的知识点及技巧说明了。(#`O′)