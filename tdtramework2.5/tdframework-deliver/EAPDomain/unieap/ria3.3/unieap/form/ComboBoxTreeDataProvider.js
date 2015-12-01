dojo.provide("unieap.form.ComboBoxTreeDataProvider");
dojo.declare("unieap.form.ComboBoxTreeDataProvider",null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.ComboBoxTreeDataProvider
	 * @summary:
	 * 		下拉树控件的数据源控制器
	 * 
	 */
	
	widget:null,
	
	/**
	 * @summary:
	 * 		该方法已经不推荐使用,请使用getLazyLabel
	 * @type:
	 * 		{string}
	 * @deprecated
	 */
	label:'',
	
	/**
	 * @summary:
	 * 		下拉树懒加载时，数据未加载完毕,控件在树中找不到指定的id所对应的label,所以需要用户显示指定。
	 * @type:
	 * 		{function}
	 * @example:
	 * |var ds=new unieap.ds.DataStore('demo',[
	 * |	{empNo:'1002'}
	 * |]);
	 * |dataCenter.addDataStore(ds);
	 * |function getLabels(ids){
	 * |	alert(ids); //ids默认是以逗号分隔的字符串
	 * |	var labels=sendRequest(ids); //用户将ids发送到后台
	 * |	return labels; //返回的labels也应该是以逗号分隔的字符串.返回成功后文本框中将显示labels
	 * |}
	 * |<div dojoType="unieap.form.Form" binding="{store:'demo'}">
	 * |	<div dojoType="unieap.form.ComboBoxTree" binding="{name:'empNo'} 
	 * |		dataProvider="{${1}getLazyLabel:getLabels}"  
	 * |		treeJson="{loader:{url:'/getChildren.do'},label:'LazyTree',binding:{leaf:'leaf'}}">
	 * |	</div>
	 * |</div>
	 * ${1}定义获取label的方法 
	 */
	getLazyLabel:null,
	
	constructor:function(params){
		dojo.mixin(this,params);
	}
	
});
