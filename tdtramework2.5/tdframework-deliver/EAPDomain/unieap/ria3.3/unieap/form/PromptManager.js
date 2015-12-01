dojo.provide("unieap.form.PromptManager");
dojo.require("unieap.Tooltip");
dojo.declare("unieap.form.PromptManager",null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.PromptManager
	 * @summary:
	 * 		消息提示管理器,用来在控件上显示用户自定义的提示信息
	 * @example:
	 * |<div dojoType="unieap.form.TextBox" id="txt" prompt="{promptMsg:'只能输入数字',duration:2000}"></div>
	 * @example:
	 * |var promptManager=unieap.byId('txt').getPromptManager();
	 * |promptManager.setPromptMsg("只能输入数字");
	 * |promptManager.setDuration(2000);
	 * @img:
	 * 		images/form/promptMsg.png
	 */
	
	/**
	 * @summary:
	 * 		设置在控件上显示的提示信息
	 * @type:
	 * 		{string}
	 */
	promptMsg:'',
	
	/**
	 * @summary:
	 * 		设置提示信息在控件上显示多长时间后再消失,单位为毫秒
	 * @type:
	 * 		{number}
	 */
	duration:1000,
	
	
	constructor:function(params){
		dojo.mixin(this,params);
	},
	
	/**
	 * @summary:
	 * 		在指定的domNode上显示提示信息,默认1s后提示信息会自动消失
	 * @description:
	 * 		当duration的值小于或等于0时,domNode上的提示信息不会自动消失
	 * @param:
	 * 		{DomNode} domNode 指定的domNode节点
	 */
	showPromptMsg:function(domNode){
		var me=this;
  		setTimeout(function(){
  			if(me.promptMsg){
  				unieap.showTooltip(me.promptMsg,domNode,['after','before','above','below']);
  			}
		},0);
		if(me.duration>0){
			this._handler=setTimeout(function(){
				me.hidePromptMsg(domNode);
				
			},me.duration);
		}
	},
	
	/**
	 * @summary:
	 * 		隐藏指定节点上的domNode的提示信息
	 * @param:
	 * 		{DomNode} domNode 指定的domNode节点
	 */
	hidePromptMsg:function(domNode){
		window.clearTimeout(this._handler);
		unieap.hideTooltip(this.promptMsg,domNode);
	},
	
	/**
	 * @summary:
	 * 		设置在控件上显示的提示信息
	 * @param:
	 * 		{string} promptMsg 要显示在控件上的信息
	 */
	setPromptMsg:function(promptMsg){
		this.promptMsg=promptMsg;
	},
	
	/**
	 * @summary:
	 * 		设置提示显示在控件上显示的时间
	 * @param：
	 * 		{number} duration 多长时间后提示信息消失
	 */
	setDuration:function(duration){
		this.duration=duration;
	}
})
