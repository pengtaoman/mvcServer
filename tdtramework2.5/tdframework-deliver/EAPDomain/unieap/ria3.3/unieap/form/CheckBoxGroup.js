dojo.provide("unieap.form.CheckBoxGroup");
dojo.require("unieap.form.CheckGroup");
dojo.require("unieap.form.CheckBox");

dojo.declare("unieap.form.CheckBoxGroup", unieap.form.CheckGroup,{
	/**
	 * @declaredClass:
	 * 		unieap.form.CheckBoxGroup
	 * @summary:
	 * 		复选按钮组
	 * @classDescription:
	 * 		1.依靠unieap.ds.DataStore类型的数据源构造一个复选按钮组。
	 * 		2.复选按钮组本身作为一个FormWidget支持数据绑定，可通过getBinding()方法取得绑定对象。
	 * 		3.用户可通过设置cols值来控制按钮组布局。
	 * 		4.支持对组内按钮状态变化的监听.
	 * 		5.支持组内按钮反选.
	 * 		6.支持组内按钮的获取。
	 * @superClass:
	 * 		unieap.form.CheckGroup
	 * @example:
	 * |<script type="text/javascript">
	 * |	var city = new unieap.ds.DataStore('city_store', [
	 * |		{CODEVALUE: 1,CODENAME: '浙江'}, 
	 * |		{CODEVALUE: 2,CODENAME: '辽宁'}, 
	 * |		{CODEVALUE: 3,CODENAME: '福建'},
	 * |		{CODEVALUE: 4,CODENAME: '沈阳'}, 
	 * |		{CODEVALUE: 5,CODENAME: '北京'},
	 * |		{CODEVALUE: 6,CODENAME: '宁海'}, 
	 * |		{CODEVALUE: 7,CODENAME: '宁波'}, 
	 * |		{CODEVALUE: 8,CODENAME: '水车'},
	 * |		{CODEVALUE: 15,CODENAME: '上园'}, 
	 * |		{CODEVALUE: 16,CODENAME: '下园'}
	 * |	]);
	 * |	dataCenter.addDataStore(city);
	 * |</script>
	 * |<div id="CheckboxGroup" 
	 * |	cols="4" 
	 * |	labelAlign="left"
	 * |	dojoType="unieap.form.CheckBoxGroup"
	 * |	dataProvider="{'store':'city_store'}">
	 * |</div>
	 * @img:
	 * 		images/form/checkboxgroup.png
	 */
	
	//配置属性接口
	UserInterfaces : dojo.mixin({
		separator : "string"
	},
	unieap.form.CheckGroup.prototype.UserInterfaces),
	
	/**
	 * @summary:
	 *		数据分隔符
	 * @type:
	 * 		{string}
	 * @default：
	 *		","	 
	 */
	separator: ",",
	
	postCreate : function(){
		this.inherited(arguments);
		//[Grid行编辑时，回车聚焦使用]
		//为孩子CheckBox添加onTab事件，执行CheckBoxGroup onTab 
		
		this._attachTab();
	},
	_attachTab : function(){
		if(this.checkboxMap.length > 0) {
			var checkbox = this.getCheckBox(this.checkboxMap.length-1);
			dojo.connect(checkbox,"onTab",this,"onTab");
		}
	},
	
	//获得复选框,没有则创建
	getCheckBox: function(inRowIndex) {
		if(this.checkboxMap[inRowIndex]){
			return this.checkboxMap[inRowIndex];
		}		
		var provider = this.getDataProvider();
		var valueAttr = this.getDecoder().getValueAttr();
		var me=this;
		var param = {
			checkedValue: provider.getItemValue(valueAttr,inRowIndex),
			name : this.name || this.id,
			onChange:function(){
				me.getValidator().validate();
				me.onChange(me.getValue());
				me.fireDataChange();
			}
		};			
		var checkbox = new unieap.form.CheckBox(param);
		dojo.style(checkbox.modifiedNode,"display","none");
		this.checkboxMap[inRowIndex] = checkbox;
		return checkbox;
	},
	
	/**
	 * @summary:
	 * 		设置复选按钮组的值
	 * @param:
	 * 		{string} value
	 */
	setValue: function(value) {
		value = (value!=null ? String(value) : "").split(this.separator);	
		var mp = unieap.convertArrayToMap(value);
		var checkboxMap = this.checkboxMap;			
		for (var i=0, l = checkboxMap.length;i<l; i++) {
			checkboxMap[i].setChecked(false); //清除选中
			if(mp[checkboxMap[i].getCheckedValue()]){
				checkboxMap[i].setValue(checkboxMap[i].getCheckedValue());
			} 
		}
		this.getValidator().validate();
		this.fireDataChange();
	},
	
	/**
	 * @summary:
	 * 		取得复选按钮组的值
	 * @return:
	 * 		string
	 */
	getValue: function() {
		var checkboxMap = this.checkboxMap;
		var value = [];
		for (var i=0; i<checkboxMap.length; i++) {
			if (checkboxMap[i].checked) {
				value.push(checkboxMap[i].getCheckedValue());
			}
		}
		return  value.join(this.separator);
	},
	
	/**
	 * @summary:
	 * 		取得全部选中按钮的标签值，以分隔符间隔
	 * @return:
	 * 		string
	 */
	getText: function() {
		var checkboxMap = this.checkboxMap;
		var text = [];
		for (var i=0; i<checkboxMap.length; i++) {
			if (checkboxMap[i].checked) {
				text.push(this.getLabel(i));
			}
		}
		return  text.join(this.separator);
	},
	
	/**
	 * @summary:
	 * 		设置组内某些CheckBox的选中状态
	 * @param:
	 * 		{boolean} bool
	 * @param:
	 * 		{array} items
	 * 		CheckBox序号数据
	 */
	setChecked: function(bool, items) {
		if (!dojo.isArray(items)) {
			return;
		}		
		for(var i=0; i<items.length; i++) {
			var checkbox = this.checkboxMap[items[i]];
			checkbox.setChecked(bool);
		}
		this.fireDataChange();
	},
	
	/**
	 * @summary:
	 * 		复选按钮组反选
	 */
	checkReverse: function() {
		var checkboxMap = this.checkboxMap;
		for (var i=0; i<checkboxMap.length; i++) {
			var checkbox = checkboxMap[i];
			checkbox.setChecked(!checkbox.checked);
		}
		this.fireDataChange();
	},

	setNextFocusId: function(widgetId) {
		if(this.checkboxMap.length == 0) {
			this.nextFocusId = widgetId;
		} else {
			this.nextFocusId = this.checkboxMap[0].id;
			for(var i=0; i<this.checkboxMap.length; i++) {
				if (i != (this.checkboxMap.length-1)) {
					this.checkboxMap[i].setNextFocusId(this.checkboxMap[i+1].id);
				} else {
					this.checkboxMap[i].setNextFocusId(widgetId);
				}
			}
		}
	}
});