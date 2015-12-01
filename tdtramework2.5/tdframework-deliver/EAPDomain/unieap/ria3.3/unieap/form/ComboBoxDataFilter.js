dojo.provide("unieap.form.ComboBoxDataFilter");
dojo.declare("unieap.form.ComboBoxDataFilter", null, {
	/**
	 * @declaredClass:
	 * 		unieap.form.ComboBoxDataFilter
	 * @summary:
	 * 		下拉框数据过滤器
	 * @classDescription:
	 * 	1.模糊匹配
	 * 	2.大小写规则
	 * 	3.多个过滤条件
	 *  4.两种过滤模式
	 *  5.汉字拼音过滤
	 */
	
	constructor:function(params){
		dojo.mixin(this,params);
		if (!this.searchAttr) {
			var d = this.widget.getDecoder();
			this.searchAttr = [];
			this.searchAttr.push(d.displayAttr);
			this.searchAttr.push(d.valueAttr);
		}
	},
		
	/**
	 * @summary:
	 * 		模糊匹配。
	 * @description：
	 * 		输入过程中,设置下拉框模糊匹配指定的匹配列。
	 * 		默认为displayAttr，valueAttr两列。
	 * @type：
	 * 		{string|array}
	 * @example：
	 * |		var store = new unieap.ds.DataStore([{
	 * |			CODEVALUE: 1,
	 * |			CODENAME: '浙江',
	 * |			hello: 'zj'
	 * |		}, {
	 * |			CODEVALUE: 2,
	 * |			CODENAME: '辽宁',	
	 * |			hello: 'ln'
	 * |		}]);
	 * |	dataCenter.addDataStore('test',store);
	 * |	<div dojoType="unieap.form.ComboBox" dataFilter="{searchAttr:'hello'}"></div>
	 * |	//对hello列进行模糊匹配
	 * |	<div dojoType="unieap.form.ComboBox" dataFilter="{searchAttr:['hello','CODENAME']}"></div>
	 * |	//对hello CODENAME两列进行模糊匹配
	 */
	searchAttr:null,
	
	/**
	 * @summary:
	 * 		大小写规则
	 * @description：
	 * 		指定构造数据时是否忽略大小写。
	 * @type：
	 * 		{boolean}
	 * @default：
	 * 		true
	 */
	ignoreCase:true,
	
	/**
	 * @summary:
	 * 		过滤时过滤条件的且或关系。
	 * @enum：
	 * 		{"||"|"&&"}：
	 * @default:
	 * 		"||"
	 */
	relation:"||",
	
	/**
	 * @summary：
	 * 		过滤条件的设置
	 * @description：
	 * 		多个过滤条件的关系可以用过relation参数设置,多个过滤条件无先后之分。
	 * @type：
	 * 		{object|function}
	 * @example：
	 * |	<div dojoType="unieap.form.ComboBox" dataFilter="{filter:myFilter}"></div>
	 * |	function myFilter(item){
	 * |		//返回true false
	 * |		return item.CODENAME == 'filtertest';
	 * |	}
	 * 		对整个列进行过滤。支持filter为方法,参数为item，一行数据。
	 * @example:
	 * |	<div dojoType="unieap.form.ComboBox" dataFilter="{filter:myFilter}"></div>
	 * |	myFilter={
	 * |		CODEVALUE:'1|2|3|4'
	 * |	}
	 * 		对某一列进行枚举过滤,string对象以'|'隔开。CODEVALUE列的数据可为1,2,3,4;
	 * @example：
	 * |	<div dojoType="unieap.form.ComboBox" dataFilter="{filter:myFilter}"></div>
	 * |	myFilter={
	 * |		CODENAME:/^1[23]$/
	 * |	}
	 * 		对某一列进行正则过滤。CODENAME列的数据可为12,13；
	 * @example：
	 * |	<div dojoType="unieap.form.ComboBox" dataFilter="{filter:myFilter}"></div>
	 * |	myFilter={
	 * |		CODEDISPLAY:function(value,item){return value=='1'}
	 * |	}
	 * 		对一列进行方法过滤。CODEDISPLAY的数据可为1.
	 */
	filter:null,
	
	/**
	 * @summary:
	 * 		过滤类型,和fitler联合使用
	 * @description:
	 * 		include:显示满足条件的数据
	 * 		exclude:排除满足条件的数据
	 * @enum：
	 * 		{"include"|"exclude"}
	 * @default:
	 * 		"include"
	 * @example:
	 * |<script type="text/javascript">
	 * |	var city = new unieap.ds.DataStore("city_store", [
	 * |		{CODEVALUE: 1,CODENAME: "宁波"}, 
	 * |		{CODEVALUE: 2,CODENAME: "宁海"}, 
	 * |		{CODEVALUE: 3,CODENAME: "温州"}, 
	 * |		{CODEVALUE: 4,CODENAME: "沈阳"}
	 * |	]);
	 * |</script>
	 * |<div dojoType="unieap.form.ComboBox" dataFilter="{filter:{CODEVALUE:'1|2'},filterMode:'exclude'}"></div>
	 * 由于配置了filterMode:'exclude',过滤之后的ComboBox数据条目是 CODEVALUE=3或4的两条，而不是默认情况下(filterMode:'include')的CODEVALUE=1或2的两条
	 */
	filterMode:"include",
	
	/**
	 * @summary：
	 * 		 拼音字母模糊匹配
	 * @description:
	 * 		根据显示列创建内部的一个拼音列用来进行拼音模糊匹配。
	 * @example：
	 * |		var store = new unieap.ds.DataStore([{
	 * |			CODEVALUE: 1,
	 * |			CODENAME: "浙江"
	 * |		}, {
	 * |			CODEVALUE: 2,
	 * |			CODENAME: "辽宁"
	 * |		}]);
	 * |	<div dojoType="unieap.form.ComboBox" dataFilter="{spellAttr:'py'}"></div>
	 * 		此时将会动态生成一列数据，列明为'py'。并自动增加到searchAttr中去，即支持拼音模糊匹配。
	 * 		当输入z时,过滤出'浙江'列
	 */
	spellAttr: "",
	
	/*
	 * @summary:
	 * 		配置{filter:null}情况下"下拉出全部数据"或"下拉不出任何数据"
	 * @description:
	 * 		all:下拉出全部数据
	 * 		none:下拉不出任何数据
	 * @enum：
	 * 		{'all'|'none'}
	 * @default：
	 * 		'all'
	 */
	filterNull: "all",
	
	/*
	 * @summary:
	 * 		排序方式
	 * @type:
	 * 		{object|array}
	 * @example:
	 * |	order=[{CODENAME:"asc"},{CODEVALUE:"asc"}]
	 */
	order: "",
	
	/**
	 * @summary：
	 * 		动态设置ComboBox的过滤条件
	 * @param：
	 * 		{object} filter
	 */
	setFilter: function(filter) {
		this.filter=filter;
//		this.widget.getDataProvider().clearCacheItems();
	},
	
	/*
	 * @summary：
	 * 		设置级联过滤条件
	 * @param：
	 * 		{object} filter  级联条件
	 * @param:
	 * 		{boolean} defaultSelect 是否默认选中第一条数据
	 * @param:
	 * 		enum 
	 */
	setCascadeFilter:function(filter, defaultSelect, filterNull){
		//属性在doFilter方法里用
		this.filterNull = filterNull;
		
		var _default;
		this.cascadeFilter = filter;
		if (arguments.length>=2) {
			_default = defaultSelect;
		} else {
			_default = this.widget.getCascade().defaultSelect
		}
		if (_default) {
			// 选中第一条数据
			var items = this.widget.getDataProvider().getItems();
			if (items.length > 0) {
				this.widget.setValue(this.widget.getDecoder().code(items[0]));
				return;
			}
		}
		this.widget.setValue(null);
	},
	
	/*
	 * @summary:
	 * 		根据过滤条件过滤数据
	 * @param:
	 * 		{array} items
	 * @param：
	 * 		 {filter} filter
	 */
	doFilter: function(items, filter, filterMode, relation){
		var filter=filter || this.filter;
		var filterMode = filterMode || this.filterMode;
		var relation = relation || this.relation;
		var ignoreCase = this.ignoreCase
		var filterFunction = function(item) {
			var matchs = [];
			var f = {};
			if (typeof filter=="function") {
				//filter为方法
				var match = !!filter.call(this.widget,item);
				matchs.push(match);
			} else {
				for (f in filter) {
					var match = false;
					if (filter[f]===null && this.filterNull=="all") {
						match = true;
					}else if (filter[f]===null && this.filterNull=="none") {
						match = false;
					} else if (typeof filter[f] == "object") {
						//正则过滤条件
						var regExp=null;
						regExp = new RegExp(filter[f]);
						match = item[f].toString().match(regExp)?true:false;
					} else if(typeof filter[f] =="string" || typeof filter[f]=="number") {
						//string过滤条件
						var filters = filter[f].toString().split('|');
						match = dojo.some(filters,function(fv) {
							if (ignoreCase) {
								return fv.toLowerCase()==(item[f]||"").toString().toLowerCase();
							} else {
								return fv==(item[f]||"").toString();
							}
						});
					} else if (typeof filter[f] == "function") {
						//回调方法过滤
						if (filter[f].call) {
							match=!!filter[f].call(this.widget,item[f],item);
						} else {
							//在safari中 typeof /^1$/ 返回 "function"
							var regExp = null;
							regExp = new RegExp(filter[f]);
							match = item[f].toString().match(regExp)?true:false;
						}
					}
					matchs.push(match);
				}
			}
			if (matchs.length > 0) {
				//_everyOrSome 过滤条件的且或关系 不存在先后关系
				//dojo1.4将dojo._everyOrSome改为内部函数
				//var match=dojo._everyOrSome(relation=="&&",matchs,function(match){return match});
				var match;
				if (relation == "&&") {
					match = dojo.every(matchs, function(match) {return match;})
				} else {
					match = dojo.some(matchs, function(match) {return match;})
				}
				//include or exclude
				return filterMode=="include"?match:!match;
			} else {
				return true;
			}
		}
		var items = dojo.filter(items,dojo.hitch(this,filterFunction));
		return items;
	}
	
});
