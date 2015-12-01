dojo.provide("unieap.form.ComboBoxDataProvider");
dojo.declare("unieap.form.ComboBoxDataProvider", null, {
	/**
	 * @declaredClass:
	 * 		unieap.form.ComboBoxDataProvider
	 * @summary:
	 * 		下拉列表的数据源控制器
	 */
	 
	/**
	 * @summary:
	 * 		设置下拉框绑定的DataStore对象或者DataStore对象的名称。
	 * @type:
	 * 		{string|unieap.ds.Datastore}
	 */
	store: null,
	
	/*
	 * @summary:
	 * 		下拉框请求数据的相关参数
	 * @type:
	 * 		{object}
	 */
	parameters: {},
	
	/**
	 * @summary:
	 * 		添加自定义项
	 * @type：
	 * 		{object|array}
	 * @example：
	 * |	<div dojoType="unieap.form.ComboBox" dataProvider="{customItem:{CODEVALUE:'3',CODENAME: '大连'}}" >
	 * |	</div>
	 * 		此时除了store中的数据，还将增加一个自定义项。多列时可配置为数组。
	 */
	customItem: null,
	
	// items
	items: null,
	
	_currentItems: null,
	
	_loseItems: null,
	
	/**
	 * @summary:
	 * 		设置ComboBox控件绑定的数据源的数据类型
	 * @description:
	 * 		只有当数据源的值为bool值时才设置此属性，比如dataType值为"boolean"
	 * @type:
	 * 		{string}
	 * @example:
	 * |<script type="text/javascript">
	 * |	var ds=new unieap.ds.DataStore("demo",[{CODEVALUE:false,CODENAME:'测试'}]);
	 * |	dataCenter.addDataStore(ds);
	 * |</script>
	 * |<div dojoType="unieap.form.ComboBox" dataProvider="{store:'demo',dataType:'boolean'}"></div>
	 */
	dataType: "",
	
	/**
	 * @summary:
	 * 		是否使用静态数据
	 * @description:
	 * 		注意:开启staticData功能是,ComboBox的标签请使用select标签。
	 * @type：
	 * 		{boolean}
	 * @default：
	 * 		false
	 * @example：
	 * |	<select dojoType="unieap.form.ComboBox" dataProvider="{staticData:true}" >
	 * |		<option value="1">男</option>
	 * |		<option  value="0">女</option>
	 * |	</select>
	 * 		此时ComboBox将增加两个自定义数据
	 */	
	staticData: false,
	
	constructor: function(params) {
		dojo.mixin(this, params);
		this.setDataStore(this.store);
	},
	
	/**
	 * @summary:
	 * 	用户自定义数据源,构造ComboBox支持的数据格式
	 * @param:
	 * 	{string} name DataStore的名字
	 * @param：
	 * 	{object} parameters 自定义参数 ，如{a:123,b:456}
	 * @example：
	 * |	<div dojoType="unieap.form.ComboBox" dataProvider="{loadStore:loadMyStore}" >
	 * |	</div>
	 * | loadMyStore = function(name,parameters){
	 * |		return new unieap.ds.DataStore(name,[{a:1,b:1},{a:2,b:2}]);
	 * | }
	 * @return
	 * 	 {unieap.ds.DataStore}
	 */
	loadStore: function(name, parameters) {
		return null;
	},
	
	/**
	 * @summary:
	 * 	设置数据源
	 * @description:
	 * 	重新构造ComboBox支持的数据格式
	 * @param：
	 * 	{unieap.ds.DataStore|string} store
	 */
	setDataStore: function(store) {
		var ds = unieap.getDataStore(store, null, true);
		if (!ds) {
			ds = this.loadStore(store, this.parameters);
		}
		if (!ds) {
			dojo.require("unieap.rpc");
			ds = unieap.Action.getCodeList(store);
		}
		this.store = ds;
		this._loadItems(this.store);
	},
	
	/**
	 * @summary:
	 * 	获取ComboBox绑定的DataStore
	 * @return：
	 * 	unieap.ds.DataStore
	 * @example:
	 * |var combobox = unieap.byId('cityComboBox');
	 * |var store = combobox.getDataProvider().getDataStore();
	 */
	getDataStore: function() {
		return this.store;
	},
	
	// API
	/**
	 * @summary:
	 * 	依据条件获取下拉框的数据对象数组（item数组）
	 * @description:
	 * 	不传递参数，则返回ComboBox绑定的所有item的数组,多条件仅支持“或”关系
	 * @param:
	 * 	{string} text 针对显示值的过滤条件，多个条件用ComboBox控件的separator属性字符分割，并设置isMulti参数为true
	 * @param:
	 * 	{boolean} isMulti 是否是多个条件
	 * @return:
	 * 	{array}
	 * @example:
	 * |<script type="text/javascript">
	 * |	var city = new unieap.ds.DataStore('city_store', [
	 * |		{CODEVALUE: 1,CODENAME: '宁波'}, 
	 * |		{CODEVALUE: 2,CODENAME: '宁海'}, 
	 * |		{CODEVALUE: 3,CODENAME: '温州'}, 
	 * |		{CODEVALUE: 4,CODENAME: '沈阳'}
	 * |	]);
	 * |	dojo.addOnLoad(function(){
	 * |		var city = unieap.byId('city');
	 * |		city.getDataProvider().getItems('宁,阳',true);
	 * |	});
	 * |</script>
	 * |<div dojoType="unieap.form.ComboBox" id="city" dataProvider="{'store':'city_store'}"></div>
	 * 以上示例展示多条件的getItems方法使用，单条件API调用如：city.getDataProvider().getItems('宁',false);。
	 * 上述示例运行结果如图所示
	 * @img:
	 * 	images/form/combobox_getitems_data.png
	 * 
	 */
	getItems: function(text, isMulti) {
		var items = this.items;
		if (this._loseItems!=null && dojo.isArray(this._loseItems))
			items = items.concat(this._loseItems);
		var decoder = this.widget.getDecoder();
		var dataFilter = this.widget.getDataFilter();
		if (dataFilter.spellAttr) {
			//构造拼音模糊匹配列
			items=this._createSpellCols(items, dataFilter, decoder.displayAttr, dataFilter.spellAttr);
		}
		if (dataFilter.cascadeFilter) {
			items = dataFilter.doFilter(items, dataFilter.cascadeFilter, "include", "||");
		}
		// 本征条件过滤
		items = dataFilter.doFilter(items);
		
		// 动态条件过滤
		if (text && dojo.trim(text)!=="") {
			if (isMulti) {
				var texts = text.split(this.widget.separator);
				text = texts.join("|");
			}
			var reg = null;
			try {
				// 当text=[时存在错误
				reg = dataFilter.ignoreCase?new RegExp("^.*"+text+".*$","i"):new RegExp("^.*"+text+".*$");
			} catch (e) {
				reg = dataFilter.ignoreCase?new RegExp("^.*$","i"):new RegExp("^.*$");
			}
			var filter = {};
			if (dataFilter.searchAttr) {
				dataFilter.searchAttr = [].concat(dataFilter.searchAttr);
				for(var i=0,l=dataFilter.searchAttr.length; i<l; i++){
					filter[dataFilter.searchAttr[i]] = reg;
				}
			}
			items = dataFilter.doFilter(items, filter, "include", "||");
		}
		this._currentItems = items;
		return items;
	},
	
	/**
	  * @summary:
	  * 	取得ComboBox可下拉的数据条目（items）
	  * @description:
	  * 	在ComboBox级联的情况下，调用从ComboBox的此方法，可以获得到经过主ComboBox过滤后的从ComboBox可下拉的数据条目
	  * @return：
	  * 	{array} 
	  * @example:
	  * |var combobox = unieap.byId('cityComboBox');
	  * |var items = combobox.getDataProvider().getCurrentItems();
	  */
	getCurrentItems: function() {
		return this._currentItems==null?this.getItems():this._currentItems;
	},
	
	/**
	 * @summary:
	 * 		清空当前页显示的数据
	 */
	clearCurrentItems: function() {
		this._currentItems = null;
	},
	
	/**
	 * @summary:
	 * 		清空ComboBox内的缓存数据
	 * @deprecated
	 */
	clearCacheItems: function() {
		// do nothing, there isn's any cacheItems any more.
	},
	
	/**
	 * @summary:
	 * 		得到当前选中的节点
	 * @description:
	 * 		多条被选中(复选ComboBox)时，返回item数组
	 * @return:
	 * 		{array}
	 */
	getSelectedItems: function() {// for user and cascade
		return this.widget._getSelectedItems();
	},
	
	/**
	 * @summary:
	 * 		动态增加一条或多条下拉数据
	 * @param：
	 * 		{object|array} item
	 * @example:
	 * |var city = new unieap.ds.DataStore('city_store', [
	 * |	{CODEVALUE: 1,CODENAME: '宁波'}, 
	 * |	{CODEVALUE: 2,CODENAME: '宁海'}, 
	 * |	{CODEVALUE: 3,CODENAME: '温州'}, 
	 * |	{CODEVALUE: 4,CODENAME: '沈阳'}
	 * |]);
	 * |var city = unieap.byId('cityComboBox');
	 * |city.getDataProvider().addItem({CODEVALUE:5,CODENAME:'大连'}); //添加一条item
	 * |city.getDataProvider().addItem([{CODEVALUE:6,CODENAME:'鞍山'},{CODEVALUE:7,CODENAME:'瓦房店'}]);//添加一个item数组，多条item
	 * 如上代码执行后，city ComboBox可以下拉出7条数据，包括动态添加进来的'大连'、'鞍山'、'瓦房店'
	 */
	addItem: function(item) {
		if (this.items && dojo.isArray(this.items)) {
			if (dojo.isArray(item)) {
				this.items = this.items.concat(item);
			} else {
				this.items.push(item);
			}
		}
	},
	
	/**
	 * @summary:
	 * 		选中一个或多个节点
	 * @param：
	 * 		{array} item
	 * @param:
	 * 		{boolean} 是否改变显示值
	 * 		默认true
	 * @example:
	 * |function setSelectItems(){
	 * |	var items = unieap.byId("setSelect").getDataProvider().getItems();
	 * |	unieap.byId("setSelect").getDataProvider().setSelectedItems([items[2],items[3]],true);
	 * |}
	 * |<div id="setSelect" popup="{displayStyle:'multi'}" dojoType="unieap.form.ComboBox" dataProvider="{'store':'city_store'}">
	 * |</div>
	 * 以上代码执行后，会将第三条和第四条数据选中。
	 */
	setSelectedItems: function(items, display) {
		if (dojo.isArray(items)) {
			var d = this.widget.getDecoder();
			var values = [];
			var allItems = this.getItems();
			for (var i=0; i<items.length; i++) {
				for (var j=0; j<allItems.length; j++) {
					if (items[i] != allItems[j]) continue;
					var v = d.code(items[i]);
					values.push(v);
					break;
				}
			}
			if (display===false) {
				var text = this.widget.getText();
				this.widget.setValue(values.join(this.widget.separator));
				this.widget.setText(text);
			} else {
				this.widget.setValue(values.join(this.widget.separator));
			}
		}
	},
	
	/**
	 * @summary:
	 * 		清空ComboBox
	 * @description:
	 * 		清空ComboBox输入框的值及下拉框的选中状态
	 * @example:
	 * |var city = unieap.byId('cityComboBox');
	 * |city.getDataProvider().clear();
	 */
	clear: function() {
		this.widget.setValue("");
	},
	
	// inner API
	_loadItems: function(store) {
		var data = [];
		if (store) {
			try {
				data = dojo.clone(store.rowSet.getData());
			} catch (e) {
				data = [];
			}
		}
		// 增加静态数据
		if (this.staticData) {
			data = [].concat(this._createStaticItems(), data);
		}
		// 增加自定义数据
		if (this.customItem) {
			data = [].concat(this.customItem, data);
		}
		this.items = data;

		if(this.isComboShowSelect()){
			var text  = this.widget.comboShowSelectText || unieap.widget.form.comboShowSelectText;
			var d = this.widget.getDecoder()
			if(this.items&&this.items.length>0){
				var _item={};
				_item[d.valueAttr]=this.widget.comboShowSelectValue;
				_item[d.displayAttr]=text;
				this.items = [ _item ].concat(this.items);
			}
		}
	},
	
	isComboShowSelect:function(){
		var flag=this.widget.comboShowSelect;

		if(flag!=null){
					return flag;
		}else{
			dojo.require("unieap.global");
			return unieap.widget.form.comboShowSelect;	
		}		
		
	},
	
	_checkLoseItems: function(values) {
		if (values==null || !dojo.isArray(values)) return;
		var d = this.widget.getDecoder(), items = this.items;
		var loseitems = [];
		dojo.forEach(values,dojo.hitch(this.widget,function(v){
			var _item=null;
			for (var i=0; i<items.length; i++) {
				var item = items[i],
					dvalue = d.code(item);
				this.dataType=="boolean" && (dvalue=String(dvalue));
				if (dvalue == v) {
					_item = item;
					break;
				}
			}
			if (_item == null) {
				loseitems.push(this.getLoseItem.call(this,v));
			}
		}));
		this._setLoseItems(loseitems)
	},
	
	_setLoseItems: function(items) {
		if (items==null || !dojo.isArray(items)) {
			this._loseItems = null;
			return; 
		}
		this._loseItems = items;
	},
	
	_createStaticItems: function(){
		var node = this.widget._staticNode;
		var items = [];
		var d = this.widget.getDecoder();
		dojo.forEach(node.childNodes, function(option) {
			if (option && option.tagName=="OPTION") {
				var item = {};
				item[d.displayAttr] = option.text;
				item[d.valueAttr] = option.value;
				items.push(item);
			}
		});
		return items;
	},
	
	_createSpellCols: function(items, dataFilter, displayAttr, spellAttr) {
		//已有此列时返回
		if (dojo.some(items, function(item){return item[spellAttr]!=null;})){
			return items;
		}
		//将此列加到模糊匹配中去
		dataFilter.searchAttr=[].concat(dataFilter.searchAttr).concat(dataFilter.spellAttr);
		dojo.require("unieap.util.spell");
		items = dojo.map(items, function(item) {
			item[spellAttr] = unieap.makePy(item[displayAttr].toString());
			return item;
		});
		return items;
	}
});
