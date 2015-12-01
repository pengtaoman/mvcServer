dojo.provide("unieap.layout.AdaptivePane");
dojo.require("unieap.layout.Container");
dojo.declare("unieap.layout.AdaptivePane", [unieap.layout.Container], {
	/**
     * @declaredClass:
     * 		unieap.layout.AdaptivePane
     * @summary:
     * 		自适应组件的内容面板
     * @classDescription:
     *		位于自适应容器内部，用作某一显示区域内容的展示
	 */
	
	/**
	 * @summary：
	 * 		是否是自适应的容器
	 * @description：
	 * 		自适应容器可以自动撑满父容器剩下的高度空间，同时可以存在多个自适应容器根据规则自动分配高度
	 * @type：
	 * 		{boolean}
	 * @default：
	 * 		false
	 */
	autoHeight : false,
	
	postCreate:function(){
		dojo.addClass(this.containerNode,"adaptivepane");
		this.initContainer();
	},
	
	/*
	 * @summary:
	 * 		获取容器的高度
	 * @example:
	 * |var height = unieap.byId('adaptivePane1').getHeight()
	 */
	getHeight : function(){
		if(this.isAutoHeight()){
			return this.height == "auto" ? 100 : parseInt(this.height);
		}
		var h = 0;
		if(this.height == "auto"){
			for(var i=0,n;(n=this.containerNode.childNodes[i]);i++){
				h+=(n.offsetHeight || 0);
			}
			dojo.style(this.containerNode,"height",h+"px");
		}
		else{
			h = this.containerNode.offsetHeight;
		}
		return h;
	},
	
	/*
	 * @summary:
	 * 		设置容器的高度
	 * @example:
	 * |unieap.byId('adaptivePane1').setHeight("500px")
	 */
	setHeight : function(height){
		this.height = height;
		dojo.style(this.domNode,"height",this._convertNumber(this.height));
	},
	
	/**
	 * @summary:
	 * 		判断是否为自适应容器
	 * @example:
	 * |unieap.byId('adaptivePane1').isAutoHeight()
	 */
	isAutoHeight : function(){
		return this.autoHeight;
	}
});
