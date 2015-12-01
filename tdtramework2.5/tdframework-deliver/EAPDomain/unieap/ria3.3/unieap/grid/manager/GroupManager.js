dojo.provide('unieap.grid.manager.GroupManager');

dojo.declare("unieap.grid.manager.GroupManager", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.manager.GroupManager
	 * @summary:
	 * 		分组控制器
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" width="500px" height="250px"
	 * |	binding="{store:'empDataStore'}" views="{rowNumber:true}"
	 * |	${1}group="{name:['attr_deptno','attr_job'],autoApply:true,groupBar:true}">
	 * |	<header>
	 * |		<cell width="150px" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
	 * |		<cell width="150px" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
	 * |		<cell width="100px" label="姓名" name="NAME"></cell>
	 * |		<cell width="100px" label="员工编号" name="attr_empno"></cell>
	 * |	</header>
	 * |</div>
	 * ${1}开启分组，只需配置group属性即可
	 * @img:
	 * 		images/grid/grid_group.png
	 */
	
	ui: {
		autoApply:true,
		setName:true,
		getName:true,
		getGroup:true,
		commit:true,
		clear:true,
		events: {
		}
	},
	
	_patch: "unieap.grid.manager.GroupPatch",
	
	/**
	 * @summary:
	 * 		分组是否立刻生效
	 * @type:
	 * 		{boolean}
	 * @example:
	 *|<div dojoType="unieap.grid.Grid" width="auto" height="380px" 
	 *|		binding="{store:'empDataStore'}" group="{autoApply:true,groupBar:true}">
	 *|		......
	 *|</div>
	 */
	autoApply: null,
	
	name: null,
	
	//root group
	root: null,
	
	
	groupList:null,
	
	constructor: function(param) {
		this.autoApply = true;
		dojo.mixin(this, param);
		if (this.name) {
			this.root = new unieap.grid.Group();
			this.root.setExpand(true);
			this.root.setFormatter(this.formatter);
			this.root.setName(this.name);
			this.root.setManager(this);
			this.setData();
		}
		
		if (this.statistic && this.grid.managers.managers['MenuManager']) {
			this.hookStatisticMenu();
		}
		
		this.connects = [];
		this.groupList=[];
		this.connects.push(dojo.connect(this.grid.managers.get("LayoutManager"), "onAfterAddCell", this, "onAddCell"));
		this.connects.push(dojo.connect(this.grid.managers.get("ViewManager"), "buildViews", this, "onBuildViews"));
		this.connects.push(dojo.connect(this.grid.managers.get("ViewManager"), "onBeforeRefresh", this,"_refreshGroup"));
		this.connects.push(dojo.connect(this.grid.getBinding(), "onAfterSort", this,"_sortGroup"));
	},
	
	//grid刷新时改变group
	_refreshGroup:function(){
		this._flag=true;
		var auto = this.autoApply;
		this.autoApply = true;
		this.setName(this.name);
		this.autoApply = auto;
//		dojo.forEach(this.groupList,function(handle){
//			var group=this.getGroup(handle);
//			group.setExpand(false)
//		},this)
		this.groupList=[];
	},
	
	//grid排序是改变group
	_sortGroup:function(){
		this._flag=true;
		var auto = this.autoApply;
		this.autoApply = true;
		this.setName(this.name);
		this.autoApply = auto;
		//展开分组状态
		dojo.forEach(this.groupList,function(handle){
			var group=this.getGroup(handle);
			group.setExpand(true);
		},this)
		this.commit();
	},
	
	//保存已经展开过的group列表
	insertGroupList:function(groupHandle){
		var flag;
		for(var i=0,l=this.groupList.length;i<l;i++){
			if(dojo.toJson(groupHandle)==dojo.toJson(this.groupList[i])){
				flag=true;
				break;
			}
		}
		!flag&&this.groupList.push(groupHandle)
		
	},
	
	//删除group列表
	removeGroupList:function(groupHandle){
		for(var i=0,l=this.groupList.length;i<l;i++){
			if(dojo.toJson(groupHandle)==dojo.toJson(this.groupList[i])){
				this.groupList.splice(i,1);
				break;
			}
		}
		
	},
	
	onAddCell: function(inCell) {
		this.doPatch(inCell);
	},
	
	onBuildViews: function() {
		if (this.groupBar==true) {
			dojo.require("unieap.grid.view.groupbar");
			this.groupBar = new unieap.grid.GroupBar({grid:this.grid,autoApply:this.autoApply});
			this.grid.managers.get("ViewManager").heightRelation.push(this.groupBar);
		} else if (this.groupBar){
			this.grid.managers.get("ViewManager").heightRelation.push(this.groupBar);
		}
		this.doPatch(this.grid.managers.get("ViewManager"));
		this.doPatch(this.grid.managers.get("RowManager"));
	},


	hookStatisticMenu: function() {
		var menuManager = this.grid.managers.get("MenuManager")
		menuManager.controlsNameList['unieap.grid.GroupStatistic']={};
	},
	
	doPatch: function(inComponent) {
		if (!this.patcher) {
			dojo.require(this._patch);
			var clazz = dojo.getObject(this._patch);
			this.patcher = new clazz();
		}
		this.patcher.doPatch(inComponent);
	},
	
	/**
	 * @summary:
	 * 		设置分组信息
	 * @description:
	 * 		分组信息为一个数组，其中每个元素为cell的name属性。
	 * 		分组信息中的列将被记录下来并进行预处理，若分组控制器的autoApply值为true,分组操作将被立即执行；
	 * 		否则将在用户调用commit方法时执行分组（若配置了groupBar,用户可点击右上角的执行按钮进行分组）。
	 * @param：
	 * 		{array} inName
	 * @example:
	 * |${1}grid.getManager("GroupManager").setName(['attr_empno','attr_empname']); 
	 * 	${1}对Grid的attr_empno,attr_empname两列进行分组，如果参数传入[](空数组)，相当于调用clear方法取消分组
	 * 	
	 */
	setName: function(inName) {
		if(!dojo.isArray(inName)) return;
		
		inName = unieap.array_unique(inName);
		
		//如果inName和this.name相同,表示是多次对同一组分组
		if(dojo.isArray(this.name)&&!this._flag){
			if(this.name.join(',')==inName.join(',')){
				return;
			}else{
				this.groupList=[]
			}
		}
		
		this._flag=false;
		//清除分组情况下，行展开状态
		if(inName.length == 0 || inName[0]=="") {
			this.groupList=[];
			this.name = null;
			this.root = null;
			this.grid.getBinding().setRowData(this.grid.getBinding().getRowSet().getData());
			this.commit();
		} else {
			//去除组中重复元素
			this.name = inName;
			this.root = new unieap.grid.Group();
			this.root.setExpand(true);
			this.root.setFormatter(this.formatter);
			this.root.setName(this.name);
			this.root.setManager(this);
			this.setData();
			this.autoApply && this.commit();
		}
	},
	
	/**
	 * @summary:
	 * 		取得分组设置
	 * @return:
	 * 		{array}
	 */
	getName: function() {
		return this.name;
	},
	
	/**
	 * @summary:
	 * 		取得某一分组对象
	 * @return:
	 * 		{unieap.grid.Group}
	 * @see:
	 * 		unieap.grid.Group
	 */
	getGroup: function(values) {
		var v = dojo.clone(values);
		return this.root.getGroup(v);
	},
	
	setData: function() {
		var data = this.grid.getBinding().getRowSet().getData();
		for (var i=0; i<data.length; i++) {
			this.root.addRow(data[i]);
		}
	},
	
	validate: function() {
		if (dojo.isArray(this.name) && this.name.length>0) {} else {
			return;
		}
		var name = [],
			layout = this.grid.managers.get("LayoutManager"),
			cell;
		for (var i=0, n; n=this.name[i]; i++) {
			cell = layout.getCell(n);
			if (cell && cell.name!=null) {
				name.push(cell.name);
			}
		}
		if (name.length!=this.name.length) {
			var auto = this.autoApply;
			this.autoApply = true;
			this.setName(name);
			this.autoApply = auto;
		}
	},
	
	/**
	 * @summary:
	 * 		执行分组
	 * @description:
	 * 		若分组控制器的autoApply值为false时，需要主动调用该方法执行分组
	 */
	commit: function() {
		var views = this.grid.managers.get("ViewManager");
		views.render(views.scrollTop);
//		this.grid.managers.get("ViewManager").render();
		this.groupBar && this.groupBar.update(this.name);
	},
	
	/**
	 * @summary:
	 * 		取消分组
	 * @example:
	 *|grid.getManager("GroupManager").clear(); 
	 */
	clear: function() {
		this.setName([]);
	},
	
	doStatistic: function(rows, name, operation) {
		if (this[operation]) {
			return this[operation].apply(this, [rows, name]);
		} else {
			return "";
		}
	},
	
	formatStatistic: function(name, value) {
		var nameMap = {
			max: RIA_I18N.grid.group.max+": ",
			min: RIA_I18N.grid.group.min+": ",
			sum: RIA_I18N.grid.group.sum+": ",
			avg: RIA_I18N.grid.group.avg+": "
		}
		return (nameMap[this.statistic[name]]||"") + value;
	},
	
	max: function(rows, name) {
		var result = Number.MIN_VALUE ; 
		dojo.forEach(rows,function(row) {
			row[name]!=null && (result = Math.max(row[name],result));
		});
		return (Number.MIN_VALUE==result?"":result);
	},
	
	min: function(rows, name) {
		var result = Number.MAX_VALUE ;
		dojo.forEach(rows,function(row) {
			row[name]!=null && (result = Math.min(row[name],result));
		});
		return (Number.MAX_VALUE==result?"":result);
	},
	
	sum: function(rows, name) {
		var result = 0;
		dojo.forEach(rows,function(row) {
			result += Number(row[name] || 0);
		});
		return result;
	},
	
	avg: function(rows, name) {
		if (!rows.length||rows.length==0) {
			return "";
		}
		var result = 0;
		dojo.forEach(rows,function(row) {
			result += Number(row[name] || 0);
		});
		return result/rows.length;
	},
	
	destroy: function() {
        for(var i=0,l=this.connects.length;i<l;i++){
            dojo.disconnect(this.connects[i]);
        }
		if(this.groupBar&&this.groupBar!=true){
			this.groupBar.destroy();
		}
	}
});

dojo.provide("unieap.grid.Group");
dojo.declare("unieap.grid.Group", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.Group
	 * @summary:
	 * 		分组对象
	 * @description:
	 * 		每个分组对象对应一个分组。
	 * 		可通过此对象取得此分组的
	 */
	
	/**
	 * @summary:
	 * 		上层分组
	 * @type:
	 * 		unieap.grid.Group
	 */
	parent: null,
	
	name: null,
	
	value: null,
	
	expand: null,
	
	/**
	 * @summary:
	 * 		子分组
	 * @type:
	 * 		{array}
	 */
	children: null,
	
	/**
	 * @summary:
	 * 		本分组内的所有行数据
	 * @type:
	 * 		{array}
	 */
	rows: null,
	
	/**
	 * @summary:
	 * 		分组行格式化
	 * @example:
	 *|<div id="grid" id="grid" dojoType="unieap.grid.Grid" width="80%" height="400px" binding="{store:'empDataStore'}"
     *|		group="{name:['attr_province','NAME'],groupBar:true,1formatter:groupFormatter}">
     *|		<fixed>
     *|		   <cell label="员工编号（attr_empno）" width="10%" name="attr_empno" headerStyles="text-align: left;"></cell>
     *|		</fixed>
     *|		<header>
     *|		   <cell width="10%" label="姓名" name="NAME" headerStyles="text-align: left;"></cell>
     *|		   <cell width="10%" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
     *|		   <cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
     *|		   <cell width="20%" label="所在省" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'ed_province',dataProvider:{store: 'p'}}}" 
     *|         name="attr_province" decoder="{store:'p',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
     *|		   <cell width="20%" label="所在市" name="attr_city" cascade="{primary:'ed_province',getCascadeStore:getCascade}" 
     *|         decoder="{store:'c1',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
     *|		   <cell width="10%" label="工资" name="attr_sal"></cell>
     *|		</header>
	 *|</div>
	 *|<script>
	 *|		function groupFormatter(name, value) {
     *|		if (name=="attr_province") {
     *|			return "省份---"+ (value==12?"辽宁":"浙江");
     *|		} else {
     *|		   return name+"+++"+value;
     *|		}
	 *|}
	 *|</script>
	 * @img:
	 * 		images/grid/formatter.png
	 */
	formatter: null,
	
	constructor: function(parent) {
		this.parent = parent;
		this.children = {}; 
		this.rows = [];
	},
	
	//设置分组
	setManager: function(inManager) {
		this.manager = inManager;
	},
	/**
	 * @summary:
	 * 		设置本分组的名称
	 * @example:
	 *|function setGroup(){
     *|	var array = new Array();
     *|	array.push("attr_deptno");
     *|	array.push("attr_job");
     *|	grid.getManager("GroupManager").setName(array); 
	 *|}  
	 */
	setName: function(inName) {
		this.name = inName;
	},
	
	/**
	 * @summary:
	 * 		取得本分组的名称
	 * @return {}
	 * @example:
	 *| grid.getManager("GroupManager").getName();
	 */
	getName: function() {
		return this.name[0];
	},
	
	setValue: function(inValue) {
		this.value = inValue;
	},
	
	/**
	 * @summary:
	 * 		取得本分组的值
	 * @description:
	 * 		如，按省分组，此组是辽宁省，那么此分组的值即为“辽宁省”
	 * @return:
	 * 		{object}
	 */
	getValue: function() {
		return this.value;
	},
	
	/**
	 * @summary:
	 * 		设置本分组格式化方法
	 * @param:
	 * 		{function} inFormatter
	 */
	setFormatter: function(inFormatter) {
		this.formatter = inFormatter;
	},
	
	getFormatter: function() {
		return this.formatter;
	},
	
	/**
	 * @summary:
	 * 		判断此分组是否被展开
	 * @return {}
	 */
	isExpand: function() {
		return this.expand;
	},
	
	setExpand: function(expand) {
		this.expand = expand==true;
	},
	
	
	addRow: function(inRow) {
		this.rows.push(inRow);
		if (this.name.length > 0) {
			var child = this.getChild(inRow[this.getName()]);
			child.addRow(inRow);
		}
	},
	/**
	 * @summary:
	 * 		获得分组对象
	 * @return 
	 * 		{object}
	 * @example:
	 *|var value = new Array();
	 *|value.push(12);
	 *|var group = grid.getManager("GroupManager").getGroup(value);
	 */
	
	getGroup: function(values) {
		if (!dojo.isArray(values)) return null;
		if (values.length == 0) {
			return this;
		} else {
			var value = values.shift();
			return this.getChild(value).getGroup(values);
		}
		
	},
	
	getChild: function(value) {
		value == null&&(value = RIA_I18N.grid.group.noValue);
		if (!this.children[value]) {
			var cname = [];
			for (var i=1; i<this.name.length; i++) {
				cname.push(this.name[i]);
			}
			this.children[value] = new unieap.grid.Group(this);
			this.children[value].setManager(this.manager);
			this.children[value].setName(cname);
			this.children[value].setValue(value);
			this.children[value].setFormatter(this.formatter);
		}
		return this.children[value];
	},
	
	//构造渲染使用的rowData
	toRowData: function() {
		var rowData = [];
		if (this.expand) {
			var count = 0;
			for (child in this.children) {
				count++;
				rowData = rowData.concat(this.getChild(child).toRowData());
			}
			if (count==0) {
				rowData = rowData.concat(this.rows);
			}
		}
		this.parent && rowData.unshift(this.getGroupRow());
		this.manager.statistic && rowData.push(this.getStatisticRow());
		return rowData;
	},
	
	getHandle: function() {
		if (this.parent==null) {
			return null;
		}
		var handle = [this.value];
			parentHandle = this.parent.getHandle();
		if (parentHandle) {
			handle = parentHandle.concat(handle);
		}
		return handle;
	},
	
	//分组标题行数据
	getGroupRow: function() {
		var data = {};
		data.name = this.parent.getName();
		data.value = this.getValue();
		data.isExpand = this.expand;
		data.formatter = this.formatter;
		data.handle = this.getHandle();
		
		data["_g"] = data["_g"]||{};
		data["_g"]["gr"] = true;
		
		return data;
	},
	
	getStatisticRow: function() {
		dojo.require('unieap.util.util');
		var rs = this.manager.grid.getBinding().getRowSet(),
			statistic = this.manager.statistic,
			data = {},
			dataType = null, meta = null;
		
		for (name in statistic) {
			meta = rs.getMetaData(name);
			if (meta) {
				dataType = unieap.getDataType(meta.getDataType());
			} else {
				dataType = this.manager.grid.managers.get("LayoutManager").getCell(name).dataType;
			}
			if (dataType=="number" || dataType=="date") {
				data[name] = this.manager.doStatistic(this.rows, name, statistic[name]);
			}
		}
		data["_g"] = data["_g"]||{};
		data["_g"]["gsr"] = true;
		return data;
	}
});

dojo.provide("unieap.grid.GroupStatistic");
dojo.declare("unieap.grid.GroupStatistic", null, {
	constructor: function(params) {
		dojo.mixin(this,params)
	},
	
	initMenu: function() {
		var statisticMenu = new unieap.menu.Menu({});
		var maxItem = new unieap.menu.MenuItem({
			//最大值
			label: RIA_I18N.grid.group.max,
			onClick: dojo.hitch(this, "updateStatistic", "max")
		});
		var minItem = new unieap.menu.MenuItem({
			//最小值
			label: RIA_I18N.grid.group.min,
			onClick: dojo.hitch(this, "updateStatistic", "min")
		});
		var sumItem = new unieap.menu.MenuItem({
			//合计值
			label: RIA_I18N.grid.group.sum,
			onClick: dojo.hitch(this, "updateStatistic", "sum")
		});
		var avgItem = new unieap.menu.MenuItem({
			//平均值
			label: RIA_I18N.grid.group.avg,
			onClick: dojo.hitch(this, "updateStatistic", "avg")
		});
		var clearItem = new unieap.menu.MenuItem({
			//清除统计
			label: RIA_I18N.grid.group.clear,
			onClick: dojo.hitch(this, "updateStatistic")
		});
		statisticMenu.addChild(maxItem);
		statisticMenu.addChild(minItem);
		statisticMenu.addChild(sumItem);
		statisticMenu.addChild(avgItem);
		statisticMenu.addChild(new unieap.menu.MenuSeparator());
		statisticMenu.addChild(clearItem);
		
		var m = this.menuManager.getMenu();
		var menu = new unieap.menu.Menu()
		
		this.statisticItem = new unieap.menu.PopupMenuItem({
			//分组统计
			label: RIA_I18N.grid.group.statistics,
			popup: statisticMenu
		});
		m.addChild(new unieap.menu.MenuSeparator());
		m.addChild(this.statisticItem);
	},
	
	updateMenu: function() {
		var cell = this.menuManager.getCell();
		if (cell.name) {
			var rs = this.grid.getBinding().getRowSet();
			meta = rs.getMetaData(cell.name);
			if (meta) {
				dataType = unieap.getDataType(meta.getDataType());
			} else {
				dataType = cell.dataType;
			}
			if (dataType=="number" || dataType=="date") {
				this.statisticItem.setDisabled(false);
			} else {
				this.statisticItem.setDisabled(true);
			}
		} else {
			this.statisticItem.setDisabled(true);
		}
		
	},
	
	updateStatistic: function(operation) {
		var name = this.menuManager.getCell().name,
			views = this.grid.managers.get("ViewManager"),
			groupManager = this.grid.managers.get("GroupManager");
		if (operation) {
			groupManager.statistic = groupManager.statistic||{};
			groupManager.statistic[name] = operation;
		} else {
			if (groupManager.statistic && groupManager.statistic[name]) {
				delete groupManager.statistic[name];
			}
		}
		views.refresh();
	}
});