
/* 
    对event对象的常用属性及方法的兼容性处理
    使用方法:EventUtil.addHandler(element,type,handler); 
*/
var EventUtil = {
    addHandler: function(element, type, handler) {
        //绑定事件
        //Chrome Firefox IE9等     addEventListener 
        //IE8及IE8以下的浏览器     attachEvent 
        if(element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if(element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler
        }
    },
    removeHandler: function(element, type, handler) {
        //移除事件
        //Chrome Firefox IE9等      
        //IE8及IE8以下的浏览器     
        if(element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if(element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    preventDefault: function(event) {
        //阻止对象事件的默认行为
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) {
        //阻止对象事件的冒泡行为
        if(event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true;
        }
    },
    getTarget: function(event) {
        //获得目标对象
        return event.target || event.srcElement;
    },
    getCharCode: function(event) {
        //获得按键的键码或SCALL码
        if(typeof event.charCode == "number") {
            return event.charCode;
        } else {
            event.keyCode;
        }
    },
}

/* 
    解决getElementsByClassName的兼容问题，使其能够支持IE8以下
    parameter:obj---为obj对象，具有
              obj.searchClass---要搜索的类目,
              obj.node---查找的范围,
              obj.tag---要查找的类名为searchClass的tag标签
    return:返回对象集合或空数组
    使用方法:getElementsByClassName(obj);或
            getElementsByClassName({
                searchClass:"className1 className2",
                node:ele,
                tag:tag,
            });
*/
var getElementsByClassName = function(obj) {
	var searchClass = obj.searchClass; // 存储要查找的类名
	var node = obj.node || document;  // 存储要出查找的范围
	var tag = obj.tag || '*'; // 存储一定范围内要查找的标签
	var result = [];//存储查找到的元素对象集合
		// 判断浏览器支不支持getElementsByClassName方法
	if (document.getElementsByClassName) { // 如果浏览器支持
		var nodes = node.getElementsByClassName(searchClass);
		if (tag !== "*") {
			for (var i = 0; node = nodes[i++];) {
				if (node.tagName === tag.toUpperCase()) {
					result.push(node);
				}
			}
		} else { 
			result = nodes;
		}
		return result;
	} else { // 使用IE8以下的浏览器能够支持该属性
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var i, j;
		var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) { // 检测正则表达式
				result[j] = els[i];
				j++;
			}
		}
		return result;
	}
}

/* 对class属性操作的设置 */
var ClassUtil = {
    getClass: function(ele) {
      return ele.className.replace(/\s+/, " ").split(" ");
    },

    hasClass: function(ele, cls) {
      return -1 < (" " + ele.className + " ").indexOf(" " + cls + " ");
    },

    addClass: function(ele, cls) {
      if (!this.hasClass(ele, cls))
        ele.className += " " + cls;
    },

    removeClass: function(ele, cls) {
      if (this.hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', "gi");
        ele.className = ele.className.replace(reg, " ");
      }
    },

    toggleClass: function(ele, cls) {
      if (this.hasClass(ele, cls)) {
        this.removeClass(ele, cls);
      } else {
        this.addClass(ele, cls);
      }
    }
  };