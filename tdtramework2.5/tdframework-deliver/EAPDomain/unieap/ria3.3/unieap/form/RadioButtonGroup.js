dojo.provide("unieap.form.RadioButtonGroup");
dojo.require("unieap.form.CheckGroup");
dojo.require("unieap.form.RadioButton");

dojo.declare("unieap.form.RadioButtonGroup", unieap.form.CheckGroup,{
	/**
	 * @declaredClass:
	 * 		unieap.form.RadioButtonGroup
	 * @summary:
	 * 		单选按钮组
	 * @superClass:
	 * 		unieap.form.CheckBoxGroup
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
	 * |<div id="RadioGroup" 
	 * |	cols="4" 
	 * |	labelAlign="left" 
	 * |	dojoType="unieap.form.RadioButtonGroup" 
	 * |	dataProvider="{'store':'city_store'}">
	 * |</div>
	 * @img:
	 * 		images/form/radioboxgroup.png
	 */
	
	postCreate : function(){
		this.inherited(arguments);
		//[Grid行编辑时，回车聚焦使用]
		//为孩子RadioButton添加onTab事件，执行RadioButtonGroup onTab 
		this._attachTab();
	},
	_attachTab : function(){
		for(var i=0; i<this.checkboxMap.length; i++) {
			dojo.connect(this.checkboxMap[i],"onTab",this,"onTab");
		}
	},
	
	getCheckBox: function(inRowIndex) {
		if(this.checkboxMap[inRowIndex]){
			return this.checkboxMap[inRowIndex];
		}		
		var provider = this.getDataProvider();
		var valueAttr = this.getDecoder().getValueAttr();	
		
		var param = {
			checkedValue: provider.getItemValue(valueAttr,inRowIndex),
			uncheckedValue : null,
			name : this.name || this.id
		};
		
		
		//mixin nextFocusId
		if(this.nextFocusId&&!dojo.isIE){
			dojo.mixin(param,{'nextFocusId':this.nextFocusId})
		}
		

		var checkbox = new unieap.form.RadioButton(param);
		
		checkbox.onChange = dojo.hitch(this,function(checked){
			if (checked) {
				this._onChange(checkbox);
			}
		});
		dojo.style(checkbox.modifiedNode,"display","none");
		this.checkboxMap[inRowIndex] = checkbox;
		return checkbox;
	},
	
	/**
	 * @summary:
	 * 		设置单选按钮组的值
	 * @param:
	 * 		{string} value
	 */
	setValue: function(value) {
		value = value!=null ? String(value) : "";
		var checkboxMap = this.checkboxMap;		
		for (var i=0, l = checkboxMap.length;i<l; i++) {
			if(String(checkboxMap[i].getCheckedValue())==value){
				checkboxMap[i].setValue(checkboxMap[i].getCheckedValue());
			}  else {
				checkboxMap[i].setValue(checkboxMap[i].getUncheckedValue());
			}
		}
		this.getValidator().validate();
		this.fireDataChange();
	},
	
	/**
	 * @summary:
	 * 		取得单选按钮组的值
	 * @return:
	 * 		string
	 */
	getValue: function() {
		var checkboxMap = this.checkboxMap;
		for (var i=0; i<checkboxMap.length; i++) {
			if (checkboxMap[i].checked) {
				return checkboxMap[i].getCheckedValue();
			}
		}
		return  "";
	},
	
	/**
	 * @summary:
	 * 		取得选中按钮的标签
	 * @return:
	 * 		string
	 */
	getText: function(){
		var checkboxMap = this.checkboxMap;
		for (var i=0; i<checkboxMap.length; i++) {
			if (checkboxMap[i].checked) {
				return this.getLabel(i);
			}
		}
		return  "";
	},
	
	_onChange: function(checkbox) {
		var checkboxMap = this.checkboxMap;
		for (var i=0; i<checkboxMap.length; i++) {
			if (checkboxMap[i] == checkbox) continue;
			checkboxMap[i].setValue(checkboxMap[i].getUncheckedValue());
		}
		this.getValidator().validate();
		this.fireDataChange();
		this.onChange(checkbox);
	},
	setNextFocusId: function(widgetId) {
		this.nextFocusId = widgetId;
		for(var i=0; i<this.checkboxMap.length; i++) {
			this.checkboxMap[i].setNextFocusId(widgetId);
		}
	}
});
