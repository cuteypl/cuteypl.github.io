function setRemUnit (ratio) {
    var docEle = document.documentElement,
        viewportEle = document.querySelector('meta[name="viewport]');
    var viewWidth = docEle.getBoundingClientRect().width || window.innerWidth;
        dpr = window.devicePixelRatio || 1,
        ratio = ratio;
    docEle.style.fontSize = viewWidth/(ratio*dpr) + 'px';
}