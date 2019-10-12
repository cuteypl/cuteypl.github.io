# 栅格系统
这是一款我自己个人实现的响应式的栅格系统，实现这个也是由于学习到CSS3的新属性@media和flex时，回想起很久前用过Bootstarp框架，Bootstarp里的栅格系统的响应式布局效果，好像可以利用这两个新属性来实现，所以就即学即用，应用这个两个属性实现了这款简便简单的栅格系统。  
下面我会简单展开说下它的实现和使用。
## 1、实现原理
### 1.1 知识点
    media、flex
* @media：媒体查询，利用它可以为不同类型的设备和不同宽高的设备应用不同的样式，来达到适配的效果。  
* flex：弹性布局，利用它可以实现根据页面的现可视宽高来实现响应式的布局，它会自动对flex容器内的子元素进行伸缩、换行等重新排列布局，以自适应页面，达到更好的展示。  
想要更深入的了解@media和flex，[传送门](https://www.runoob.com/w3cnote/flex-grammar.html)。
### 1.2 实现原理
    /***** row行 ****/
    .row{ display:flex; flex-wrap:wrap; margin: 6px 0;}

    /***** col列 ****/
    .col, .col-sm, .col-md, .col-lg, .clo-xl,
    .col-1, ... , .col-12,
    .col-sm-1, .... , .col-sm-12,
    .col-md-1, ... , .col-md-12,
    .col-lg-1, ... , .col-lg-12,
    .col-xl-1, ... , .col-xl-12{
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
    }

    /* 576px以下的样式 */
    /* 列占据行宽的百分比 */
    .col { flex-basis: 0; flex-grow: 1;}
    .col-sm-1{ flex: 0 0 8.33333333%; }
    ...
    .col-sm-12{ flex: 0 0 100%; }

    /* 列的偏移 */
    .col-offset-0 { margin-left: 0; }
    .col-offset-1 { margin-left: 8.33333333%; }
    ...
    .col-offset-12 { margin-left: 100%; }

    /* 列的顺序 */
    .col-order-1{ order: 1; }
    ...
    .col-order-12 { order: 12; }

    @media(min-width: 576px){ ... } /* sm的col-sm样式 *//*仅名称不一样内容一样*/
    @media(min-width: 768px){ ... } /* md的col-md样式 */
    @media(min-width: 992px){ ... } /* lg的col-lg样式 */
    @media(min-width: 1200px){ ... } /* xl的col-xl样式 */
* 实现采用移动优先：即小屏幕优先，当@media查询到当前屏幕的最小宽度为768px时，会应用 @media(min-width: 768px)里的样式覆盖前面的样式.   
* row行容器设置为flex容器，然后flex-wrap:wrap，当行宽发生变化时，行内子元素可换行显示。  
* row分12列(即分12份)，col-xx-1 这里的1 表示占据一行的1份，即flex: 0 0 8.33333333%;(1/12=8.333)，同理col-xx-2 2表示占据一行的2份，...
### 1.3 一些细节
    .container{ width: 100%; margin-left: auto; margin-right: auto; }
     @media(min-width:576px){ .container{ width: 540px; } } /* sm */   
     @media(min-width:768px){ .container{ width: 720px; } } /* md */   
     @media(min-width:992px){ .container{ width: 960px; } } /* lg */   
     @media(min-width:1200px){ .container{ width: 1140px; } } /* xl */ 
* row：这里行的上下具有6px的外边距，如果不需要可在引用该css的文件后，再覆盖去掉该外边距  
* col：这里列的左右具有15px的内边距，如果不需要可在引用该css的文件后，再覆盖去掉该内边距  
* container：该css中还给container添加了样式，所以如果引用该文件的时候，若当前html中使用了container，可能会出现自适应情况，如上。  
* 若在html页面中引用了container类，如果不需要该样式，可在引用该css的文件后，再覆盖去掉该内边距。
    
    
## 2、使用示例
下载gridFlex.css文件后，在html中引用  
`<link rel="stylesheet" href="grid.css">`
### 2.1 不嵌套使用
    <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">1</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">2</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">3</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">4</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">5</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">6</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">7</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">8</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">9</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">10</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">11</div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-1">12</div>
    </div>
* 给父容器添加row类，给其子元素添加想要的相应的col-xx-i类即可。  
* 上面例子添加的col-xx-i类的意思是：当屏幕在[0,576px)时，采用col-12样式，一列占据一行的12份，即一行一列；当屏幕在[576px,768px)时，采用col-sm-6样式，一列占据一行6份，即一行两列；同理，后面依此类推即可。
### 2.2 嵌套使用
    <div class="row">
        <div class="col-4">
            <div class="row">
                <div class="col-3">1.1</div>
                <div class="col-3">1.2</div>
                <div class="col-3">1.3</div>
                <div class="col-3">1.4</div>
            </div>
        </div>
        <div class="col-4">2</div>
        <div class="col-4">3</div>
    </div>
* 即行列里面可以再嵌套行，如上所示
### 2.3 使列偏移
    <div class="row">
        <div class="col-4">2</div>
        <div class="col-4 col-xl-offset-4">1</div>
    </div>
* 使列偏移原来位置的4/12行宽距离
### 2.4 调整列顺序
    <div class="row">
        <div class="col-4 col-order-2">1</div>
        <div class="col-4 col-order-3">2</div>
        <div class="col-4 col-order-1">3</div>
    </div>
### 2.5 效果展示
以上2.1、2.2、2.3、2.4的效果分别如下：  

![alt 效果展示](./result.png)
## 3、总结
综上描述了该栅格系统的实现原理、实现细节及常用的使用示范，更多的使用效果，客观可下载源码后，自己动手试试。  
优点：  
* 不像Bootstrap那般累赘，如果仅仅只是想简单的实现响应式布局，那可以直接下载引用该css文件即可。  
* 使用简单，易上手  
缺点：  
* 可能兼容性不如Bootstrap，但在设备及浏览器日渐更新的情况下，是可以放心的使用的。  
 
[查看源码](https://github.com/cuteypl/cuteypl.github.io/blob/master/products/css3-gridFlex)

