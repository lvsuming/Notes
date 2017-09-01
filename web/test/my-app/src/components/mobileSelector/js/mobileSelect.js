	function getClass(dom,string) {
		return dom.getElementsByClassName(string);
	}

	//构造器
	let MobileSelect = function (config) {
		this.mobileSelect;
		this.wheelsData = config.wheels;
	    this.jsonType =  false;
	    this.jsonData = [];
	    this.checkDataType();
		this.renderWheels(this.wheelsData);
	    this.displayJson = []; 
	    this.cascade = false;
	    this.startY;
	    this.moveEndY;
	    this.moveY;
	    this.oldMoveY;
	    this.offset = 0;
	    this.offsetSum = 0;
	    this.oversizeBorder;
	    this.curDistance = [];
	    this.clickStatus = false;

	    this.init(config);
	};
	
	MobileSelect.prototype = {
		constructor: MobileSelect,
		init: function(config){
			let _this = this;

			_this.trigger = document.querySelector(config.trigger);
		    _this.wheel = getClass(_this.mobileSelect,'wheel');   //wheel 数组
		    _this.slider = getClass(_this.mobileSelect,'selectContainer'); // slider 数组
		    _this.wheels = _this.mobileSelect.querySelector('.wheels');   //wheels
		    _this.liHeight = _this.mobileSelect.querySelector('li').offsetHeight;
		    _this.ensureBtn = _this.mobileSelect.querySelector('.ensure');
	    	_this.closeBtn = _this.mobileSelect.querySelector('.cancel');
		    _this.grayLayer = _this.mobileSelect.querySelector('.grayLayer');
		    _this.popUp = _this.mobileSelect.querySelector('.content');
		    _this.callback = config.callback ? config.callback : function(){};
		    _this.transitionEnd = config.transitionEnd ? config.transitionEnd : function(){};
		    _this.initPosition = config.position ? config.position : [];
		    _this.titleText = config.title ? config.title : '';

			_this.trigger.style.cursor='pointer';
			_this.setTitle(_this.titleText);
			_this.checkCascade();

			if (_this.cascade) {
				_this.initCascade();
			}

			//定位 初始位置
			if(_this.initPosition.length === 0){
				for(let i=0; i<_this.slider.length; i++){
					_this.initPosition.push(0);
				}
			}

			_this.setCurDistance(_this.initPosition);
			_this.addListenerAll();

			//按钮监听
		    _this.closeBtn.addEventListener('click',function(){
		    	_this.mobileSelect.classList.remove('mobileSelect-show');
		    });

		    _this.ensureBtn.addEventListener('click',function(){
		    	_this.mobileSelect.classList.remove('mobileSelect-show');
			    let tempValue ='';
		    	for(let i=0; i<_this.wheel.length; i++){
		    		i===_this.wheel.length-1 ? tempValue += _this.getValue(i) : tempValue += _this.getValue(i)+' ';
		    	}
		    	_this.trigger.innerHTML = tempValue;
		    	_this.callback(_this.getIndexArr(),_this.getJson());
		    });

		    _this.trigger.addEventListener('click',function(){
		    	_this.mobileSelect.classList.add('mobileSelect-show');
		    });
		    _this.grayLayer.addEventListener('click',function(){
		    	_this.mobileSelect.classList.remove('mobileSelect-show');
		    });
		    _this.popUp.addEventListener('click',function(event){
		    	event.stopPropagation();
		    });

			_this.fixRowStyle(); //修正列数
		},

		setTitle: function(string){
			let _this = this;
			_this.titleText = string;
			_this.mobileSelect.querySelector('.title').innerHTML = _this.titleText;
		},

		renderWheels: function(wheelsData){
			let _this = this;
			_this.mobileSelect = document.createElement("div");
			_this.mobileSelect.className = "mobileSelect";
			_this.mobileSelect.innerHTML = 
		    	'<div class="grayLayer"></div>'+
		        '<div class="content">'+
		            '<div class="btnBar">'+
		                '<div class="fixWidth">'+
		                    '<div class="cancel">取消</div>'+
		                    '<div class="title"></div>'+
		                    '<div class="ensure">选择</div>'+
		                '</div>'+
		            '</div>'+
		            '<div class="panel">'+
		                '<div class="fixWidth">'+
		                	'<div class="wheels">'+
			                '</div>'+
		                    '<div class="selectLine"></div>'+
		                    '<div class="shadowMask"></div>'+
		                '</div>'+
		            '</div>'+
		        '</div>';
		    document.body.appendChild(_this.mobileSelect);

			//根据数据长度来渲染

			let tempHTML='';
			for(let i=0; i<wheelsData.length; i++){ //列
				tempHTML += '<div class="wheel"><ul class="selectContainer">';
				if(_this.jsonType){
					for(let j=0; j<wheelsData[i].data.length; j++){ //行
						tempHTML += '<li data-id="'+(wheelsData[i].data[j].id||wheelsData[i].data[j].fdId)+'">'+(wheelsData[i].data[j].value||wheelsData[i].data[j].fdName)+'</li>';
					}
				}else{
					for(let j=0; j<wheelsData[i].data.length; j++){ //行
						tempHTML += '<li>'+wheelsData[i].data[j]+'</li>';
					}
				}
				tempHTML += '</ul></div>';
			}
			_this.mobileSelect.querySelector('.wheels').innerHTML = tempHTML;
		},

		addListenerAll: function(){
			let _this = this;
			for(let i=0; i<_this.slider.length; i++){
				//手势监听
				(function (i) {
					_this.addListenerWheel(_this.wheel[i], i);
					_this.addListenerLi(i);
				})(i);
			}
		},

		addListenerWheel: function(theWheel, index){
			let _this = this;
			theWheel.addEventListener('touchstart', function (event) {
				_this.touch(event, this.firstChild, index);
			},false);
			theWheel.addEventListener('touchend', function (event) {
				_this.touch(event, this.firstChild, index);
			},false);
			theWheel.addEventListener('touchmove', function (event) {
				_this.touch(event, this.firstChild, index);
			},false);

			//PC拖拽监听
			theWheel.addEventListener('mousedown', function (event) {
				_this.dragClick(event, this.firstChild, index);
			},false);
			theWheel.addEventListener('mousemove', function (event) {
				_this.dragClick(event, this.firstChild, index);
			},false);
			theWheel.addEventListener('mouseup', function (event) {
				_this.dragClick(event, this.firstChild, index);
			},true); 
		},

		addListenerLi:function(sliderIndex){
			let _this = this;
			let curWheelLi = _this.slider[sliderIndex].getElementsByTagName('li');
			for(let j=0; j<curWheelLi.length;j++){
				(function (j) {
					curWheelLi[j].addEventListener('click',function(){
						_this.singleClick(this, j, sliderIndex);
					},false);
				})(j);
			}
		},

		checkDataType: function(){ 
			let _this = this;
			if(typeof(_this.wheelsData[0].data[0])==='object'){
				_this.jsonType = true;
				_this.jsonData = _this.wheelsData[0].data;
			}
		},

		checkCascade: function(){
			let _this = this;
			if(_this.jsonType){ 
				let node = _this.wheelsData[0].data;
				for(let i=0; i<node.length; i++){
					if('childs' in node[i] && node[i].childs.length > 0){
						_this.cascade = true;
						break;
					}
				}
			}else{
				_this.cascade = false;
			}
		},

		initCascade: function(){
			let _this = this;
			_this.displayJson.push(_this.generateArrData(_this.jsonData));
			_this.checkArrDeep(_this.jsonData[0]);
			//console.log('将要显示的json:'); 
			//console.log(_this.displayJson);
			_this.updateWheels();
		},

		generateArrData: function (targetArr) {
			let tempArr = [];
			for(let i=0; i<targetArr.length; i++){
				tempArr.push({
					"id": targetArr[i].id || targetArr[i].fdId,
					"value": targetArr[i].value || targetArr[i].fdName
				});	
			}
			return tempArr;
		},

		checkArrDeep: function (parent) { //检测子节点深度  修改 displayJson
            let _this = this;
			if (parent && 'childs' in parent && parent.childs.length > 0) {
				_this.displayJson.push(_this.generateArrData(parent.childs)) ; //生成子节点数组
				_this.checkArrDeep(parent.childs[0]);//检测下一个子节点
			}
		},

		checkRange: function(index, posIndexArr){
            let _this = this;
            let deleteNum = _this.displayJson.length-1-index;
			for(let i=0; i<deleteNum; i++){
				_this.displayJson.pop(); //修改 displayJson
			}
            let resultNode;
			for (let i = 0; i <= index; i++){
				if (i === 0)
					resultNode = _this.jsonData[posIndexArr[0]];
				else {
					resultNode = resultNode.childs[posIndexArr[i]];
				}
			}
			_this.checkArrDeep(resultNode);
			//console.log(_this.displayJson);
			_this.updateWheels();
			_this.fixRowStyle();
			_this.setCurDistance(_this.resetPostion(index, posIndexArr));
		},

		resetPostion: function(index, posIndexArr){
            let _this = this;
            let tempPosArr = posIndexArr;
            let tempCount;
			if(_this.slider.length > posIndexArr.length){ 
				tempCount = _this.slider.length - posIndexArr.length;
				for(let i=0; i<tempCount; i++){
					tempPosArr.push(0);
				}
			}else if(_this.slider.length < posIndexArr.length){
				tempCount = posIndexArr.length - _this.slider.length;
				for(let i=0; i<tempCount; i++){
					tempPosArr.pop();
				}	
			}
			for(let i=index+1; i< tempPosArr.length; i++){
				tempPosArr[i] = 0;
			} 
			return tempPosArr;
		},

		updateWheels: function(){
            let _this = this;
			//删除多余的wheel
			if(_this.wheel.length > _this.displayJson.length){
                let count = _this.wheel.length - _this.displayJson.length;
				for(let i=0; i<count; i++){
					_this.wheels.removeChild(_this.wheel[_this.wheel.length-1]);
				}
			}

			for(let i=0; i<_this.displayJson.length; i++){ //列
				(function (i) {
                    let tempHTML='';
					if(_this.wheel[i]){
						//console.log('插入Li');
						for(let j=0; j<_this.displayJson[i].length; j++){ //行
							tempHTML += '<li data-id="'+(_this.displayJson[i][j].id||_this.displayJson[i][j].fdId)+'">'+(_this.displayJson[i][j].value||_this.displayJson[i][j].fdName)+'</li>';
						}
						_this.slider[i].innerHTML = tempHTML;

					}else{
                        let tempWheel = document.createElement("div");
						tempWheel.className = "wheel";
						tempHTML = '<ul class="selectContainer">';
						for(let j=0; j<_this.displayJson[i].length; j++){ //行
							tempHTML += '<li data-id="'+(_this.displayJson[i][j].id||_this.displayJson[i][j].fdId)+'">'+(_this.displayJson[i][j].value||_this.displayJson[i][j].fdName)+'</li>';
						}
						tempHTML += '</ul>';
						tempWheel.innerHTML = tempHTML;

						_this.addListenerWheel(tempWheel, i);
				    	_this.wheels.appendChild(tempWheel); 
					}
					_this.addListenerLi(i);
				})(i);
			}
		},

		updateWheel: function(sliderIndex, data){
            let _this = this;
            let tempHTML='';
			for(let j=0; j<data.length; j++){
				tempHTML += '<li>'+data[j]+'</li>'
			}
			_this.slider[sliderIndex].innerHTML = tempHTML;
			_this.addListenerLi(sliderIndex);
		},

		fixRowStyle: function(){
            let _this = this;
            let width = (100/_this.wheel.length).toFixed(2);
			for(let i=0; i<_this.wheel.length; i++){
				_this.wheel[i].style.width = width+'%';
			}
		},

	    getIndex: function(distance){
	        return Math.round((2*this.liHeight-distance)/this.liHeight);
	    },

	    getIndexArr: function(){
            let _this = this;
            let temp = [];
	    	for(let i=0; i<_this.curDistance.length; i++){
	    		temp.push(_this.getIndex(_this.curDistance[i]));
	    	}
	    	return temp;
	    },

	    getJson: function(){
            let _this = this;
            let temp = [];
            let positionArr = _this.getIndexArr();
	    	if(_this.cascade){
		    	for(let i=0; i<_this.wheel.length; i++){
		    		temp.push(_this.displayJson[i][positionArr[i]]);
		    	}
	    	}
	    	else if(_this.jsonType){
		    	for(let i=0; i<_this.curDistance.length; i++){
		    		temp.push(_this.wheelsData[i].data[_this.getIndex(_this.curDistance[i])]);
		    	}
	    	}else{
		    	for(let i=0; i<_this.curDistance.length; i++){
		    		temp.push(_this.getValue(i));
		    	}
	    	}
	    	return temp;
	    },

	    calcDistance: function(index){
			return 2*this.liHeight-index*this.liHeight;
	    },

	    setCurDistance: function(indexArr){
            let _this = this;
            let temp = [];
	    	for(let i=0; i<_this.slider.length; i++){
	    		temp.push(_this.calcDistance(indexArr[i]));
	    		_this.movePosition(_this.slider[i],temp[i]);
	    	}
	    	_this.curDistance = temp;
	    },

	    fixPosition: function(distance){
	        return -(this.getIndex(distance)-2)*this.liHeight;
	    },

	    movePosition: function(theSlider, distance){
	        theSlider.style.webkitTransform = 'translate3d(0,' + distance + 'px, 0)';
	        theSlider.style.transform = 'translate3d(0,' + distance + 'px, 0)';
	    },

	    locatePostion: function(index, posIndex){
	    	this.curDistance[index] = this.calcDistance(posIndex);
	    	this.movePosition(this.slider[index],this.curDistance[index]);
	    },

	    updateCurDistance: function(theSlider, index){
	        this.curDistance[index] = parseInt(theSlider.style.transform.split(',')[1],10);
	    },

	    getDistance:function(theSlider){
	    	return parseInt(theSlider.style.transform.split(',')[1],10);
	    },

	    getValue: function(sliderIndex){
            let _this = this;
            let index = _this.getIndex(_this.curDistance[sliderIndex]);
	    	return _this.slider[sliderIndex].getElementsByTagName('li')[index].innerHTML;
	    },

	    touch: function(event, theSlider, index){
            let _this = this;
	    	event = event || window.event;
	    	switch(event.type){
	    		case "touchstart":
			        _this.startY = event.touches[0].clientY;
			        _this.oldMoveY = _this.startY;
	    			break;

	    		case "touchend":

			        _this.moveEndY = event.changedTouches[0].clientY;
			        _this.offsetSum = _this.moveEndY - _this.startY;

					//修正位置
			        _this.updateCurDistance(theSlider, index);
			        _this.curDistance[index] = _this.fixPosition(_this.curDistance[index]);
			        _this.movePosition(theSlider, _this.curDistance[index]);
			        _this.oversizeBorder = -(theSlider.getElementsByTagName('li').length-3)*_this.liHeight; 


			        //反弹
			        if(_this.curDistance[index] + _this.offsetSum > 2*_this.liHeight){
			            _this.curDistance[index] = 2*_this.liHeight;
			            setTimeout(function(){
			                _this.movePosition(theSlider, _this.curDistance[index]);
			            }, 100);

			        }else if(_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder){
			            _this.curDistance[index] = _this.oversizeBorder;
			            setTimeout(function(){
			                _this.movePosition(theSlider, _this.curDistance[index]);
			            }, 100);
			        }


			        _this.transitionEnd(_this.getIndexArr(),_this.getJson());

			        if(_this.cascade){
				        let tempPosArr = _this.getIndexArr();
				        tempPosArr[index] = _this.getIndex(_this.curDistance[index]);
			        	_this.checkRange(index, tempPosArr);
			        }

	    			break;

	    		case "touchmove":
			        event.preventDefault();
			        _this.moveY = event.touches[0].clientY;
			        _this.offset = _this.moveY - _this.oldMoveY;

			        _this.updateCurDistance(theSlider, index);
			        _this.curDistance[index] = _this.curDistance[index] + _this.offset;
			        _this.movePosition(theSlider, _this.curDistance[index]);
			        _this.oldMoveY = _this.moveY;
	    			break;

				default :
					break;
	    	}
	    },

	    dragClick: function(event, theSlider, index){
	    	let _this = this;
	    	event = event || window.event;
	    	switch(event.type){
	    		case "mousedown":
			        _this.startY = event.clientY;
			        _this.oldMoveY = _this.startY;
			        _this.clickStatus = true;
	    			break;

	    		case "mouseup":

			        _this.moveEndY = event.clientY;
			        _this.offsetSum = _this.moveEndY - _this.startY;

					//修正位置
			        _this.updateCurDistance(theSlider, index);
			        _this.curDistance[index] = _this.fixPosition(_this.curDistance[index]);
			        _this.movePosition(theSlider, _this.curDistance[index]);
			        _this.oversizeBorder = -(theSlider.getElementsByTagName('li').length-3)*_this.liHeight; 


			        //反弹
			        if(_this.curDistance[index] + _this.offsetSum > 2*_this.liHeight){
			            _this.curDistance[index] = 2*_this.liHeight;
			            setTimeout(function(){
			                _this.movePosition(theSlider, _this.curDistance[index]);
			            }, 100);

			        }else if(_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder){
			            _this.curDistance[index] = _this.oversizeBorder;
			            setTimeout(function(){
			                _this.movePosition(theSlider, _this.curDistance[index]);
			            }, 100);
			        }

			        _this.clickStatus = false;
			        _this.transitionEnd(_this.getIndexArr(),_this.getJson());
			        if(_this.cascade){
				        let tempPosArr = _this.getIndexArr();
				        tempPosArr[index] = _this.getIndex(_this.curDistance[index]);
			        	_this.checkRange(index, tempPosArr);
			        }
	    			break;

	    		case "mousemove":
			        event.preventDefault();
			        if(_this.clickStatus){
				        _this.moveY = event.clientY;
				        _this.offset = _this.moveY - _this.oldMoveY;

				        _this.updateCurDistance(theSlider, index);
				        _this.curDistance[index] = _this.curDistance[index] + _this.offset;
				        _this.movePosition(theSlider, _this.curDistance[index]);
				        _this.oldMoveY = _this.moveY;
			        }
	    			break;
				default:
					break;
	    	}
	    },

	    singleClick: function(theLi, index, sliderIndex){
	    	let _this = this;
	        if(_this.cascade){
		        let tempPosArr = _this.getIndexArr();
		        tempPosArr[sliderIndex] = index;
	        	_this.checkRange(sliderIndex, tempPosArr);

	        }else{
		        _this.curDistance[sliderIndex] = (2-index)*_this.liHeight;
		        _this.movePosition(theLi.parentNode, _this.curDistance[sliderIndex]);
	        }
	    }

	};

export default MobileSelect;