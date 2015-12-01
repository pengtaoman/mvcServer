dojo.provide("unieap.form.Cascade");
dojo.declare("unieap.form.Cascade", null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.Cascade
	 * @summary:
	 * 		下拉框级联控制器
	 * @classDescription:
	 * 		可以通过字段实现级联
	 * 		可以通过改变数据源实现级联
	 * @example:
	 * |	var p = new unieap.ds.DataStore('province',
	 * |	 [{CODEVALUE: 11,CODENAME: '浙江'}, 
	 * |	  {CODEVALUE: 12,CODENAME: '辽宁'}]);
	 * |	var c = new unieap.ds.DataStore('city',
	 * |	 [{CODEVALUE: 1,CODENAME: '宁波',filter: 11},
	 * |	  {CODEVALUE: 2,CODENAME: '宁海',filter: 11},
	 * |	  {CODEVALUE: 3,CODENAME: '温州',filter: 11}, 
	 * |	  {CODEVALUE: 4,CODENAME: '沈阳',filter: 12},
	 * |	  {CODEVALUE: 15,CODENAME: '大连',filter: 12},
	 * |	  {CODEVALUE: 16,CODENAME: '金州',filter: 12}]);
	 * |	<div dojoType="unieap.form.ComboBox" id="combo" dataProvider="{store:'province'}">
	 * |	</div>
	 * |	<div dojoType="unieap.form.ComboBox" cascade="{primary:'combo',filterAttr:'filter'}" 
	 * |		dataProvider="{store:'city'}">
	 * |	</div>
	 * 		市根据省的变化而变化。
	 * 		由filterAttr字段'filter'去和主ComboBox的值进行匹配实现过滤
	 * 		另外提供两个可配置属性：defaultSelect和filterNull，详见属性描述信息
	 * @example:
	 * |	var p = new unieap.ds.DataStore('province',
	 * |	 [{CODEVALUE: 11,CODENAME: '浙江'}, 
	 * |	  {CODEVALUE: 12,CODENAME: '辽宁'}]);
	 * |	var c1 = new unieap.ds.DataStore('city1',
	 * |	 [{CODEVALUE: 1,CODENAME: '宁波'},
	 * |	  {CODEVALUE: 2,CODENAME: '宁海'},
	 * |	  {CODEVALUE: 3,CODENAME: '温州'}]);
	 * |	var c2 = new unieap.ds.DataStore('city2',
	 * |	  {CODEVALUE: 4,CODENAME: '沈阳'},
	 * |	  {CODEVALUE: 15,CODENAME: '大连'},
	 * |	  {CODEVALUE: 16,CODENAME: '金州']);
	 * |	function getCascadeStore(value){
	 * |		if(value==11){
	 * |			return 'city1'
	 * |		}else if (value == 12){
	 * |			return 'city2'
	 * |		}
	 * |	}
	 * |	<div dojoType="unieap.form.ComboBox" id="combo" dataProvider="{store:'province'}">
	 * |	</div>
	 * |	<div dojoType="unieap.form.ComboBox" cascade="{primary:'combo',getCascadeStore:getCascadeStore}" 
	 * |		dataProvider="{store:'city'}">
	 * |	</div>
	 * 		根据getCascadeStore方法实现切换store，此方式仅支持defaultSelect属性，不支持filterNull属性
	 * 		主ComboBox值为空时，需要在getCascadeStore中对value == null 进行处理。
	 * @img:
	 * 		images/form/cascade.png
	 */
	
	constructor:function(params){
		dojo.mixin(this,params);
		this._registerCascade();
	},
	
	/**
	 * @summary:
	 * 		指向级联的主ComboBox
	 * @description:
	 * 		primary的值为主ComboBox的id,须与filterAttr属性一起使用
	 * @type:
	 * 		{string}
	 */
	primary:"",
	
	/**
	 * @summary:
	 * 		两个下拉文本框联动时使用，须与primary属性一起使用。
	 * @description:
	 * 		两个ComboBox做级联的原理是主ComboBox的valueAttr列和从ComboBox的filterAttr(默认值为FILTER)列相对应。
	 *		主ComboBox选择后，从ComboBox根据主ComboBox的值，针对filterAttr对应的列作过滤。
	 * @type:
	 * 		{string}
	 * @default：
	 * 		"FILTER"
	 */
	filterAttr:"FILTER",
	
	/**
	 * @summary:
	 * 		级联时是否选中第一条数据
	 * @type：
	 * 		{boolean}
	 * @default：
	 * 		true
	 */
	defaultSelect:true,
	
	/**
	 * @summary:
	 * 		级联中，主ComboBox为空时，从ComboBox可配置"下拉出全部数据"或"下拉不出任何数据"
	 * @description:
	 * 		all:下拉出全部数据
	 * 		none:下拉不出任何数据
	 * @type:
	 * 		{enum}
	 * @enum：
	 * 		{'all'|'none'}
	 * @default：
	 * 		'all'
	 */
	filterNull:'all',
	
	
	/*_onSelectedChange时触发,在dojo.global.ComboBoxCascadeMap中寻找是否有注册到本combobox的从combobox
	有的话根据本combobox的value设置从combobox的级联filter条件
	@param secondId,若指定从combobox id 则只过滤该从combobox,否则过滤该主combobox下的全部从combobox*/
	cascade:function(secondId){
		if (dojo.global.ComboBoxCascadeMap) {
			var map = dojo.global.ComboBoxCascadeMap;
			var key=this.widget.id;
			if (map[key]) {
				if(secondId) {
					this._cascadeSecond(secondId);
				} else {
					var secondary=map[key];
					for (var m = 0, l = secondary.length; m < l; m++) {
						this._cascadeSecond(secondary[m]);
					}
				}
			}
		}
	},
	
	_cascadeSecond: function(secondId) {
		var second = dijit.byId(secondId);
		if (second) {
			var items=this.widget.getDataProvider().getSelectedItems()
			var item=(items&&items.length>0?items[0]:null)||null;
			var value=this.widget.getValue();
			var filter = {};
			filter[second.getCascade().filterAttr] = value;
			var valueAttr = this.widget.getDecoder().valueAttr;
			var getCascadeStore =second.getCascade().getCascadeStore;
			//判断方法是否被重写
			if(getCascadeStore){
				second.getDataProvider().setDataStore(getCascadeStore(item && item[valueAttr]));
				second.getDataFilter().setCascadeFilter(null);
			}else{
				second.getDataFilter().setCascadeFilter(filter,
						second.getCascade().defaultSelect,
						second.getCascade().filterNull);
				//清除错误提示
				value!=null && second.getValidator().handleError(true);
			}
		}
	},
	
	/**
	 * @summary:
	 * 		获取级联store,需要按照业务需求重写
	 * @param:
	 * 		{object} value
	 */
	getCascadeStore: null,
	//getCascadeStore: function(value){}
	
	//注册级联信息，将自身注册成主Combobox的从Combobx
	_registerCascade:function(){
		if (this.primary) {
			var widget=this.widget;
			var key=this.primary;
			if (!dojo.global) {
				dojo.global= {};
			}
			if (!dojo.global.ComboBoxCascadeMap) {
				dojo.global.ComboBoxCascadeMap = {};
			}
			if (!dojo.global.ComboBoxCascadeMap[key]) {
				dojo.global.ComboBoxCascadeMap[key] = [];
			} 
			dojo.global.ComboBoxCascadeMap[key].push(widget.id);
		}
	},
	
	//通知主ComboBox，过滤this Combobox
	_notifyFilterMe: function() {
		if(this.primary) {
			var parent = dijit.byId(this.primary);
			parent && parent.getCascade().cascade(this.widget.id);
		}
	}
});