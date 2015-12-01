if(!dojo._hasResource["unieap.form.FormHelper"]){
dojo._hasResource["unieap.form.FormHelper"] = true;
dojo.provide("unieap.form.FormHelper");
dojo.declare("unieap.form.FormHelper",null,{	
	/**
	 * @declaredClass:
	 * 		unieap.form.FormHelper
	 * @summary:
	 * 		Form控件的辅助模块，提供了一些方法对Form控件进行操作
	 * 		
	 */
	 
	 constructor : function(widget){
	 	this.widget = widget;
	 },
	 /**
	  * @summary:
	  * 	获取Form控件中的数据
	  * @param:
	  * 	{boolean} bool 是否只收集带binding属性的控件
	  * 	
	  * @description:
	  * 	数据格式形如{'name':'jack','age':'20'}
	  * 	如果控件具有相同的binding属性、name属性或者id属性,该方法只收集第一次遇到该属性时控件的值
	  * @example:
	  *|<div dojoType="unieap.form.Form" id='demoFrm'>
	  *|	<div dojoType="unieap.form.TextBox" binding="{name:'name'} ></div>
	  *|	<div dojoType="unieap.form.TextBox" name='age'></div>
	  *|</div>
	  *|var helper=unieap.byId('demoFrm').getHelper();
	  *|//data为{'name':'jack','age':'20'},
	  *|var data=helper.collectData();
	  *|//new_data为{'name':'jack'},因为只收集带binding属性的控件
	  *|var new_data=helper.collectData(true); 
	  * @img:
	  *     images/form/form_collect.png
	  */
	 collectData:function(bool){
	 	var widgets=this.widget.getDescendants(),result={};
		dojo.forEach(widgets,function(widget){
			var binding=widget.getBinding(),choice;
			if(binding){
				choice=binding['name'];
				!result[choice]&&(result[choice] = widget.getValue());
			}else{
				if(!bool){
					choice=widget.name || widget.id;
					!result[choice]&&(result[choice] = widget.getValue());
				}
			}
		});
	 	return result;
	 },
	 
	 
	 /**
	  * @summary:
	  * 		强制保存数据
	  * @example:
	  * |if(evt.keyCode==dojo.keys.PAGE_UP){
		|			unieap.byId('form').getHelper().apply();
		|			var data=unieap.byId('form').getBinding().getRow().data;
		|			alert('要提交的数据为:'+dojo.toJson(data));
		|}
		当按下PAGE_UP后将数据强制保存，并且显示提交的数据
	  * @description:
	  * 		适用于如下场景:置光标于控件编辑框中并修改控件的值(不失去焦点),按住快捷键来提交控件绑定的数据。
	  * 		由于控件失去焦点后才会修改数据中心对应的字段,如果直接提交将丢失数据。需要强制保存数据。
	  */
	 apply : function(){
	 	dojo.forEach(this.widget.getDescendants(), function(widget) {
	 		var value = widget.getValue();
	 		widget.setValue(value);
	 	});
	 }
});
}
