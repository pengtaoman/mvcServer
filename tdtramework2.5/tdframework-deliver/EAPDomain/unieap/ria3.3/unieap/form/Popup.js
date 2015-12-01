dojo.provide("unieap.form.Popup");
dojo.require("dojo.fx");
dojo.declare("unieap.form.Popup", [dijit._Widget, dijit._Templated], {
	/**
	 * @declaredClass:
	 * 		unieap.form.Popup
	 * @summary:
	 * 		TextBoxWithIcon的弹出框的接口
	 */
	
	//注意这里的tabindex,如果不设置它,通过document.activeElement就无法获得到
	templateString: "<div  class='u-popupcontainer' dojoAttachPoint='popupcontainer,containerNode' ></div>",
	
	/**
	 * @summary:
	 * 		指定下拉框的高度
	 * @type：
	 * 		{number}
	 * @default:
	 * 		0
	 */
	height: 0,
	
	
	/**
	 * @summary:
	 * 		指定下拉框的宽度
	 * @type：
	 * 		{number}
	 * @default:
	 * 		-1
	 */
	width: 0,
	
	isOpen:function(){
		return this._isShowingNow;
	},
	
	/**
	 * @summary:
	 * 		是否启用动画效果
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		true
	 */
	animate:(typeof(unieap.animate) == 'undefined')?true:unieap.animate,
	
	/**
     * @summary:
     * 		指定展开关闭下拉框的持续时间
     * @description:
     * 		animate为false时无效
     * @type：
     * 		{number}
     * @default：
     * 		300
     */
    duration: 300,
	
	_isShowingNow:false,
	
	//是否需要点击domNode时focus到TextBoxWithIcon控件的输入域
	_needFocus:function(){
		return true;
	},
	
	postCreate: function(){
		if (!dojo.byId('dijit-popupBody')) {
			var node = dojo.create('div',null,dojo.body(),'first');
			node.id = "dijit-popupBody";
		}
		if (!dojo.byId('_backgroundIframe')) {
			this._iframe=dojo.create('iframe',null,dojo.byId('dijit-popupBody'));
			this._iframe.frameBorder="no";
			this._iframe.id='_backgroundIframe';
			dojo.addClass(this._iframe,'u-backgroundIframe');
		}else{
			this._iframe=dojo.byId('_backgroundIframe');
		}
		//dijit.placeOnScreenAroundElement(this.popupcontainer,this.widget.domNode,{TL:'BL',TR:'BR'});
		dojo.style(this.domNode,'display','none');
		
		dojo.place(this.domNode,dojo.byId('dijit-popupBody'));
		this._needFocus()&&this.connect(this.domNode,'onclick',function(){
			dijit.focus(this.widget.inputNode);
		});
		
		//默认情况下,在firefox下div是不可以置入焦点的
		//给div设置tabindex为0就可以置入焦点
		dojo.isFF&&dojo.attr(this.domNode,'tabindex',"0");

		
	},
	

	
	/**
	 * @summary:
	 * 		打开弹出框
	 * @example:
	 * |var city = unieap.byId('city');
	 * |city.getPopup().open();
	 * 如果下拉框处于关闭状态，则打开下拉框
	 * 
	 */
	open: function(width, height){
		if(this.animation&&this.animation.status() == "playing"){
			this.animation.stop();
		}
		this._isShowingNow = true;
		this._resetWidgetHW();
		this._resetWidgetTL(width || this.width, height || this.height);
		dojo.style(this.domNode, 'overflow', 'hidden');
		dojo.style(this.domNode, 'display', 'block');
		if(this.animate){
			var node=this.domNode;
			var height=node.offsetHeight;
			var _height=node.style.height;
			this.animation=dojo.animateProperty({
				node: node,
				duration: this.duration,
				onBegin:dojo.hitch(this,function(){
					this.onAnimateBegin();
				}),
				properties: {
					height: {start: '0', end: height , unit:"px"}
				},
				onEnd:dojo.hitch(this,function(){
					this.domNode.style.height=_height
					this.onAnimateEnd();
				})
			});
			this.animation.play();
		}else{
			dojo.isIE&&this._adjustIframePosition();
			if (!this.widget.focusShift) {
				dijit.focus(this.widget.inputNode);
			}
		}
		if(unieap.form.Popup.popwidget){
			var id=unieap.form.Popup.popwidget,popwidget;
			if(id!=this.widget.id){
				popwidget=dijit.byId(id);
				popwidget&&popwidget.getPopup().close();
			}
		}
		unieap.form.Popup.popwidget=this.widget.id;
	},
	
	onAnimateBegin:function(){
		dojo.style(this.domNode, 'height', '1px');
	},
	onAnimateEnd:function(){
		dojo.isIE&&this._adjustIframePosition();
	    if (!this.widget.focusShift) {
		   dijit.focus(this.widget.inputNode);
	    }
	},
	
	/*
	 * 计算容器的top与left属性
	 */
	_resetWidgetTL: function(){
		var widget = this.widget;
		dijit.placeOnScreenAroundElement(this.popupcontainer,widget.domNode,{BL:'TL', BR:'TR',TL:'BL',TR:'BR'});
//		var box = dojo.coords(widget.domNode, true);
//		var box_noscroll = dojo.coords(widget.domNode);
//		var body = dojo.coords(document.body, true);
//		var body_noscroll = dojo.coords(document.body);
//		var dropwidth = dojo.style(this.widget.domNode, "width");
//		if ((box.x + dropwidth) > document.body.clientWidth) {
//			dojo.style(this.popupcontainer, "left", ((box.x + box.w - dropwidth) + "px"));
//		}
//		else {
//			dojo.style(this.popupcontainer, "left", (box.x + "px"));
//		}
//		dojo.style(this.popupcontainer, "top", (box.y + box.h - 1) + "px");
	},
	
	 // 计算容器的height与width属性	 
	_resetWidgetHW: function(width, height){
		dojo.style(this.popupcontainer, 'width', this.width || dojo.style(this.widget.domNode, 'width') + 'px');
		dojo.style(this.popupcontainer, 'height', this.height);
	},
	

	 //调整iframe蒙层位置,放在popupcontainer下
	_adjustIframePosition: function(){
		dojo.style(this._iframe,{
			width:dojo.style(this.popupcontainer,'width'),
			height:dojo.style(this.popupcontainer,'height'),
			top:dojo.style(this.popupcontainer,'top'),
			left:dojo.style(this.popupcontainer,'left')
		})
	},
	
	/**
	 * @summary:
	 * 		关闭弹出框
	 * @example:
	 * |var city = unieap.byId('city');
	 * |city.getPopup().close();
	 * 如果下拉框处于下拉状态，则关闭下拉框
	 */
	close: function(){
		if(this.animation&&this.animation.status() == "playing"){
			this.animation.stop();
		}
		if (this._isShowingNow) {
			this._isShowingNow = false;
			dojo.style(this.popupcontainer, "display", "none");
			var iframe = this._iframe;
			if (iframe) {
				iframe.style.width = "0px";
				iframe.style.height = "0px";
			}
		}
	},
	
	
	/*
	 * @summary:
	 * 		在弹出框中增加节点
	 * @param：
	 * 		{DomNode} node
	 */
	appendNode: function(node){
		this.popupcontainer.appendChild(node);
	},
	
	clearNode: function(node){
		var container = this.popupcontainer;
		if(container==null) return;
		for (var i = container.childNodes.length - 1; i >= 0; i--) {
			container.removeChild(container.childNodes[i]);
		}
	},
	
	destroy : function(){
		if(this._iframe){
			    this._iframe.onreadystatechange = this._iframe.onload = null;
				//没有必要，这个iframe里面根本也没有内容
				//如果在通过href嵌套在ContentPane中反而会出现拒绝访问的问题
			    //this._iframe.contentWindow.document.write("");
				this._iframe.src = "javascript:false";
				this._iframe = null;
				delete this._iframe;
		}
		this.inherited(arguments);
	} 
	
});


