dojo.provide("unieap.form.InputFilter");
dojo.declare("unieap.form.InputFilter", null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.InputFilter
	 * @summary:
	 * 		对控件输入的值进行过滤
	 */
	
	constructor:function(params){
		dojo.mixin(this,params);
	},

	/**
	 * @summary:
	 * 		设置控件的过滤规则,指定用户能从键盘输入的单个字符。
	 * @description:
	 * 		filterRule属性控制的是用户输入的单个字符
	 * @type：
	 * 		{object}
	 * @example：
	 * |<div dojoType="unieap.form.TextBox" inputFilter="{filterRule:/\d/}"></div>
	 * 		上述代码表明,用户从键盘输入单个字符时,每次输入的字符只能是数字(0～9)
	 */
	filterRule:"",
	
	//控件文本框中只能输入filterRule指定的字符
	filter:function(evt){
		var codeValue=evt.charOrCode;
		if (this.filterRule) {
			if (this.isSpecialKey(evt)) {
				return;
			}
			
			if (!new RegExp(this.filterRule).test(codeValue)) {
				dojo.stopEvent(evt);
			}
			
			if (this.widget.declaredClass == 'unieap.form.NumberTextBox') {
				//如果无法通过正则表达式，或者已经输入了“-”号并且又输入一个减号，
				//或者已经输入了“.”号又输入一个减号，阻止事件
				//修正问题 U_EAP00021028
				var text = this.widget.getText();
				if ((text.indexOf('-') > -1 && '-' == codeValue) || (text.indexOf('.') > -1 && '.' == codeValue)) {
					dojo.stopEvent(evt);
				}
			}
		}
	},
	
	/**
	 * @summary:
	 * 		设置控件的过滤规则,指定用户能从键盘输入的字符
	 * @param:
	 * 		{object} filterRule 过滤正则表达式
	 * @example:
	 * |var box=unieap.byId('txtbox');
	 * |box.getInputFilter().setFilterRule(/[0-9]/);
	 */
	setFilterRule:function(filterRule){
		this.filterRule=filterRule;
	},
	
	//如果按下的键为回格键、回车键、TAB键以及左右方向箭头,不执行dojo.stopEvent()方法
	//如果是组合键CTRL+A CTRL+C CTRL+V CTRL+X,也不执行不执行dojo.stopEvent()方法
	isSpecialKey:function(evt){
		var keys=[8,9,13,37,39];
		if(dojo.indexOf(keys,evt.charOrCode)>-1){
			return true;
		}else if(evt.ctrlKey&&dojo.indexOf([65,67,86,88,97,99,118,120,129],evt.keyCode||evt.which)>-1){ 

			return true;
		}
		return false;
	}
	
});


