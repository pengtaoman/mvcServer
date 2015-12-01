dojo.provide("unieap.form.InlineDecoder");
dojo.require("unieap.rpc");
dojo.declare("unieap.form.InlineDecoder",null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.InlineDecoder
	 * @summary:
	 * 		InlineEditBox的解码器
	 * @img:
	 * 		images/form/inlineeditbox1.png
	 * @example:
	 *|var sex = new unieap.ds.DataStore('sex', [
	 *|		{CODEVALUE: 1,CODENAME: '男'},  		
	 *|		{CODEVALUE: 2,CODENAME: '女'}
	 *|]);
	 *|<div id="sex" dojoType="unieap.form.InlineEditBox" decoder="{store:'sex',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}" value="1">
	 *|InlineEditBox的实际值是'1',经过decoder转码以后显示值是'男'
	 */
	
	/**
	 * @summary:
	 * 		标识控件的数据来源
	 * @type:
	 * 		{unieap.form.DataStore}
	 */
	store:null,
	
	/**
	 * @summary:
	 * 		设置控件的显示值对应数据集中的列
	 * @type：
	 * 		{string} 
	 */
	displayAttr:'CODENAME',
	
	/**
	 * @summary:
	 * 		设置控件的值对应数据集中的列
	 * @type:
	 * 		{string}
	 */
	valueAttr:'CODEVALUE',
	
	constructor:function(params){
		dojo.mixin(this,params);
		this.store = unieap.Action.getCodeList(this.store);
	},
	
	//转码，比如var ds=new unieap.ds.DataStore("demo,[{id:'1',name:'Nuesoft'}]);
	//设置好store、valueAttr及其displayAttr后，decode(1)讲返回'Neusoft'
	decode:function(value){
		var transcodeValue = value;
		if(this.store){
			transcodeValue=unieap.transcode(value, {
				store : this.store,
				valueAttr : this.valueAttr,
				displayAttr : this.displayAttr
			});	
			if(transcodeValue == ""){
				return value;
			}
		}
		return transcodeValue;
	}
});