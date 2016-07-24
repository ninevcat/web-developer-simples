window.onload = function(){
	waterfall('main','box');
	    var dataInt={'data':[{'src':'1.jpg'},
	    					{'src':'2.jpg'},
	    					{'src':'3.jpg'},
	    					{'src':'4.jpg'},
	    					{'src':'5.jpg'},
	    					{'src':'6.jpg'},
	    					{'src':'7.jpg'},
	    					{'src':'8.jpg'},
	    					{'src':'9.jpg'},
	    					{'src':'10.jpg'},
	    					{'src':'11.jpg'},
	    					{'src':'12.jpg'},
	    					{'src':'13.jpg'},
	    					{'src':'14.jpg'},
	    					{'src':'15.jpg'},
	    					{'src':'16.jpg'},
	    					{'src':'17.jpg'},
	    					{'src':'18.jpg'}]};
	
	window.onscroll = function(){
		if (checkscrollside()) {
			var oParent = document.getElementById('main');
			for (var i = 0;i<dataInt.data.length;i++) {
				
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className ='pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
//		checkscrollside();
	}
}
function waterfall(parent,box){
	//遍历所有的盒子
	var oParent = document.getElementById(parent);
	var oBox = getByClass(oParent,box);
//	console.log(oBox.length);
	//计算整个页面的列数
	var oBoxW = oBox[0].offsetWidth;
//	console.log(oBoxW);
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
//	console.log(cols);
	//设置main的宽度
	oParent.style.cssText = 'width: '+oBoxW*cols+'px;margin: 0 auto'
	var hArr = [];//存放每一行高度
	for (var i = 0; i<oBox.length;i++) {
		if (i<cols) {
			hArr.push(oBox[i].offsetHeight);
//			console.log(hArr);
		}else{
			var minH = Math.min.apply(null,hArr);
//			console.log(minH);
			var index = getminHIndex(hArr,minH);
//			console.log(i);
			oBox[i].style.position = 'absolute';
			oBox[i].style.top = minH + 'px';
			oBox[i].style.left = oBoxW*index+'px';
			hArr[index]+= oBox[i].offsetHeight;
		}
	}

}


function getByClass(parent,classname){
	var boxArr = [],//存储所有class为box的元素
		oElements = parent.getElementsByTagName('*');
	for (var i = 0; i<oElements.length;i++) {
		if(oElements[i].className == classname ){
			boxArr.push(oElements[i]);
		}
	}	
	return boxArr;
}

function getminHIndex(arr,val){
	for (var i in arr ) {
		if (arr[i]==val) {
			return i;
		}
	}
}

function checkscrollside(){
	var oParent = document.getElementById('main');
	var oBox = getByClass(oParent,'box');
	var lastBoxH = oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/5);
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
//	console.log(scrollTop);
	var height = document.body.clientHeight||document.documentElement.clientHeight;
	return (lastBoxH < scrollTop+height)?true:false;
}
