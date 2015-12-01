dojo.provide("unieap.form.TextBoxValidator");
dojo.require("unieap.form.FormWidgetValidator")
dojo.declare("unieap.form.TextBoxValidator",unieap.form.FormWidgetValidator,{
	/**
	 * @declaredClass:
	 * 		unieap.form.TextBoxValidator
	 * @superClass：
	 * 		unieap.form.FormWidgetValidator
	 * @summary:
	 * 		对文本框的数据进行校验
	 * @classDescription：
	 * 		支持正则校验
	 * 		支持自定义方法校验
	 * 		支持实时校验
	 * @example:
	 * |var textbox=unieap.byId('txtbox');
	 * |var validator=textbox.getValidator();
	 * |validator.validate();
	 * 		取得TextBox的校验器，并进行校验。
	 * @example：
	 * |<div dojoType="unieap.form.TextBox" validator="{realTime:true,regExp:/^\d+$/}"></div>
	 * 		在validator标签中配置realTime以及regExp。		
	 */
	 
	 /**
	  * @summary:
	  * 		对控件的数据进行正则校验
	  * @description:
	  * 	为了方便用户,regExp也可以配置成一个函数,这个函数需要返回一个bool值,控件传给函数的值为当前控件的value值
	  * @type:
	  * 		{object|function}
	  * @example:
	  * |<div dojoType="unieap.form.TextBox" validator="{regExp:/^\d+$/}">
	  * |</div>
	  * 	在写正则表达式时,如果已经定义了正则表达式以^符号开头以$符号结尾，请不要在斜杠后加上g，例如/^\d+$/g,这样书写会导致浏览器第一次校验成功后第二次校验必失败。
	  * @example:
	  * |<div dojoType="unieap.form.TextBox" validator="{regExp:fn,exampleMsg:'不能小于100'}"></div>
	  * |function fn(value,widget){
	  * |	return value>100;
	  * |}
	  * 	上述代码表明当输入的值不大于100时控件会提示错误信息
	  */
	 regExp:null,
	 
	 /**
	  * @summary:
	  * 	设置是否对控件输入的值进行实时校验
	  * @description：
	  * 	实时校验是指用户在输入字符时控件就对用户输入的数据进行校验并提示错误信息，
	  * 	默认情况下,当控件失去焦点时,控件才对用户输入的数据进行校验。
	  * @type:
	  * 	{boolean}
	  * @default:
	  * 	false
	  * @example:
	  * |<div dojoType="unieap.form.TextBox" validator="{regExp:/^\d+$/,realTime:true}">
	  */
	 realTime:false,
	 
	/**
	 * @summary：
	 * 		对控件的值进行校验。如果校验成功返回true，否则返回false
	 * @return:
	 * 		{boolean}
	 */
	validate: function(){
		var result=true,meta,
			binding=this.widget.getBinding();
		if(binding&&binding.getRow()){
			var meta=binding.getMetaData(),reg;
			//如果Form绑定一个带元数据的datastore，然后绑定另外一个带有不同元数据的datastore
			//需要更新一些状态信息
			this.regExpFlag&&(this.regExp=this.getDefaultRegExp());
			if(meta){
				reg=this.getRegExp(meta);
				reg&&(this.regExp=reg);
			}
		}
		if(this.regExp){
			var value=this.widget.getValue();
			if(dojo.isFunction(this.regExp) && this.regExp.call){
				result=!!this.regExp.call(this,value,this.widget);
			}else{
				result=new RegExp(this.regExp).test(value);
			}
			!result&&(this.setErrorMsg(this.getPatternMsg(meta)));
			return result;
		}
		return result;
	},
	
	
	//获得正则表达式
	getRegExp:function(meta){
		var	reg,defaultReg=this.getDefaultRegExp();
		this.regExp==defaultReg&&meta.getPattern()&&(reg=meta.pattern)&&(this.regExpFlag=true);
		return reg;
	},
	
	//获得默认的正则表达式
	getDefaultRegExp:function(){
		return dojo.getObject(this.declaredClass).prototype.regExp;
	},
	
	//获得正则校验信息
	getPatternMsg:function(meta){
		return this.prompts["pattern"]||(meta&&meta.getPrompt("pattern"))||this.errorMsg||this.getDefaultErrorMsg();
	},
	
	
	/**
	 * @summary:
	 * 		设置控件校验所需要的正则表达式或者函数
	 * @param:
	 * 		{object|function} regExp 正则表达式或者函数
	 * @example:
	 * |var box=unieap.byId('txtbox');
	 * |box.getValidator().setRegExp(/^\d+$/);
	 */
	setRegExp:function(regExp){
		this.regExp=regExp;
		
	}
});
