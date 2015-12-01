if(!dojo._hasResource["unieap.form.FormWidgetValidator"]){
dojo._hasResource["unieap.form.FormWidgetValidator"] = true;
dojo.provide("unieap.form.FormWidgetValidator");
dojo.require("unieap.util.util");
dojo.declare("unieap.form.FormWidgetValidator",null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.FormWidgetValidator
	 * @summary:
	 * 		FormWidgetValidator为一个表单控件校验器基类,它能对表单中的数据进行校验
	 *
	 */

	 /**
	  * @summary:
	  * 	当校验失败时,提示用户错误信息
	  * @type:
	  * 	{string}
	  * @img:
	  * 	images/form/errorMsg.png
	  */
	 errorMsg:RIA_I18N.form.formWidgetValidator.errorMsg,


	 //prompts{
	 //	 nullable:'该输入项的值不可以为空'
	 //	 maxLength: '最大长度为6'
	 //	 minLength: '最小长度为3'
	 //	 pattern: '只能输入字母'
	 //	 future: '日期不能大于2010-03-26'
	 //	 past: '日期不能小于2010-02-26'
	 //  max: '最大值为20'
	 //	 min: '最小值为10'
	 //	 precision:'数字整数部分为6位，小数2位'
	 //	 scale:'数字整数部分为6位，小数2位'
	 //}

	 /**
	  * @summary:
	  *		用于用户自定义提示信息,优先级高于MetaData中的prompts提示信息和errorMsg
	  *	@type:
	  *		{object}
	  * @example:
	  * |prompts{
	  * | 	nullable:'该输入项的值不可以为空'
	  * | 	maxLength: '最大长度为6'
	  * | 	minLength: '最小长度为3'
	  * |	pattern: '只能输入字母'
	  * |	future: '日期不能大于2010-03-26'
	  * |	past: '日期不能小于2010-02-26'
	  * |   max: '最大值为20'
	  * |	min: '最小值为10'
	  * |	precision:'数字整数部分为6位，小数2位'
	  * |   scale:'数字整数部分为6位，小数2位'
	  * |}
	  * @example:
	  * |<div dojoType="unieap.form.TextBox" validator="{prompts:{nullable:'不可以为空'}}" required="true" binding="{name:'deptno'}">
	  * |</div>
	  */
	 prompts:null,


	 //错误提示信息指针
	 _errorMsg:'',


	 /**
	  * @summary：
	  * 	用户自定义的异常码
	  * @description：
	  * 	10000 ~ 19999 范围为系统级异常码
	  * 		10001为非空异常码
	  * 		10002为最大长度异常码
	  * 		10003为最小长度异常码
	  * 		10004为最大值异常码(NumberTextBox控件)
	  * 		10005为最小值异常码(NumberTextBox控件)
	  * 		10006为精度不正确常码(NumberTextBox控件)
	  * 	20000 ~29999 范围为用户级异常码
	  * 		默认为20001
	  * @type:
	  * 	{number}
	  * @example:
	  * |<div dojoType="unieap.form.TextBox" validator="{errorCode:20002}"></div>
	  */
	 errorCode : 20001,

	 _errorCode:0,



	 constructor: function(params){
		dojo.mixin(this, params);
		!this.prompts&&(this.prompts={});
		var orginFn = this.validate;
		this.validate = function(){
			var mcaller = arguments.callee.caller;
			if(mcaller.caller && "widgetBind"==mcaller.caller._innerIdentify){
					//如果是通过form的setDataStore或bind方法绑定行数据，此时不会触发错误校验
					return true;
			}
			if(this.widget.disabled) return true;
			//该属性表明控件曾经执行过校验操作
			this.widget.wasValidated=true;
			this._errorMsg="";
			this._errorCode=0;

			//如果onBeforeValidate返回false,什么校验都不操作,validate方法直接返回true
			var value = this.widget.getValue();
			var bool = this.onBeforeValidate(value);
			if(bool){
				bool=this._baseValidate(value);
				if(bool&&value!=""){
					bool=orginFn.call(this,value);
					if(!bool){
						this._errorMsg= this._errorMsg|| this.errorMsg ;
						this._errorCode = this._errorCode || this.errorCode;
					}
				}
			}
			this.handleError(bool);
			return bool;
		}
	 },

	 //获得prototype上的errorMsg属性
	 getDefaultErrorMsg:function(){
	 	return dojo.getObject(this.declaredClass).prototype.errorMsg;
	 },

	 //获得值为空的校验信息
	 getNullableMsg:function(meta){
	 	return this.prompts["nullable"]||(meta&&meta.getPrompt("nullable"))||RIA_I18N.form.formWidgetValidator.nullError;
	 },

	 //获得最大长度限制的校验信息
	 getMaxLengthMsg:function(meta){
	 	return this.prompts["maxLength"]||(meta&&meta.getPrompt("maxLength"));
	 },

	 //获得最小长度的校验信息
	 getMinLengthMsg:function(meta){
	 	return this.prompts["minLength"]||(meta&&meta.getPrompt("minLength"));
	 },


	 //基本验证,验证控件是否非空、长度是否合法等
	 _baseValidate : function(value){
	 	value = value!=null ? String(value) : "";
		var binding=this.widget.getBinding(),
			//是否可以为空
			isNullable=true,meta;
		if(binding&&binding.getRow()){
			var meta=binding.getMetaData();
			meta&&(isNullable=meta.isNullable());
		}
	 	//非空校验，从required属性或者元数据中读取
	 	if((this.widget.required||!isNullable) && value==""){
 			this._errorMsg = this.getNullableMsg(meta);
 			this._errorCode = 10001;
 			return false;
	 	}
	 	//长度校验
		var minLength=this.widget.minLength>-1?this.widget.minLength:-1;
		var maxLength=this.widget.maxLength>-1?this.widget.maxLength:-1;


		//如果最小长度的值大于最大长度，最小长度值变为-1，即最小长度无效
		if(maxLength>-1){
			minLength>maxLength&&(this.widget.minLength=-1);
			if(unieap.bitLength(value)>maxLength){
				this._errorMsg = this.getMaxLengthMsg(meta)||(RIA_I18N.form.formWidgetValidator.maxLengthError+maxLength);
				this._errorCode = 10002;
	 			return false;
			}
		}
		if(value!=null&&unieap.bitLength(value)<minLength){
			this._errorMsg =  this.getMinLengthMsg(meta)||(RIA_I18N.form.formWidgetValidator.minLengthError+minLength);
			this._errorCode = 10003;
	 		return false;
		}
	 	return true;
	 },

	/**
	 * @summary：
	 * 		对控件的值进行校验
	 * @param：
	 * 		{object} value 控件传入的值
	 * @example：
	 * |var box=unieap.byId('txtBox');
	 * |var value = box.getValue();
	 * |var bool=box.getValidator().validate(value);
	 * @return:
	 * 		{boolean}
	 */
	validate: function(value){
		return true;
	},

	/**
	 * @summary:
	 * 		设置校验前回调事件,如果返回为false则不执行校验操作
	 * @param:
	 * 		{object} value 控件传入的值
	 * @example：
	 *  |<div dojoType="unieap.form.TextBox" validator="{onBeforeValidate:function(value){this.setErrorMsg('自定义错误');return false;}}">
	 * @return：
	 * 		{boolean} 默认返回为true
	 */
	onBeforeValidate: function(value){
		return true;
	},

	//处理错误，如果不合法就显示错误信息 {boolean} isValid 是否合法
	handleError : function(isValid){
		var errorNode=this.widget.errorNode;
		if(isValid){
			this.widget.fieldNode&&dojo.removeClass(this.widget.fieldNode,"u-form-textbox-error");
			if(errorNode){
				dojo.require("unieap.Tooltip");
				unieap.hideTooltip(errorNode)
				dojo.style(errorNode,"display","none");
			}
		}else{
			this.widget.fieldNode&&dojo.addClass(this.widget.fieldNode,"u-form-textbox-error");
			if(errorNode){
				dojo.style(errorNode,"display","block");
				if(!errorNode.onmouseover){
					dojo.require("unieap.Tooltip");
					this.widget.connect(errorNode,"onmouseover",function(){
						var errorMsg = this.getValidator().getErrorMsg();
						unieap.showTooltip(errorMsg,this.errorNode);
					});
					this.widget.connect(errorNode,"onmouseout",function(){
						unieap.hideTooltip(this.errorNode);
					});
				}
			}
		}
	},

	/**
	 * @summary:
	 * 		获取错误信息
	 * @return：
	 * 		{string}
	 */
	getErrorMsg : function(){
		return this._errorMsg;
	},

	/**
	 * @summary:
	 * 		设置错误提示信息
	 * @description:
	 * 		当没有错误时,该方法返回的为空字符串
	 * @param：
	 * 		{string} msg
	 */
	setErrorMsg : function(msg){
		this._errorMsg = msg;
	},


	/**
	 * @summary:
	 * 		获取错误码
	 * @description:
	 * 		当没有错误时,该方法返回的为0
	 * @return：
	 * 		{number}
	 */
	getErrorCode : function(){
		return this._errorCode;
	},

	/**
	 * @summary:
	 * 		设置错误码
	 * @param：
	 * 		{number} errorCode
	 */
	setErrorCode:function(errorCode){
		this._errorCode=errorCode;
	}
});
}
