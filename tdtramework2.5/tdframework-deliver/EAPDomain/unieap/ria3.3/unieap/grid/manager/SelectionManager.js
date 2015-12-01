dojo.provide('unieap.grid.manager.SelectionManager');

dojo.declare("unieap.grid.manager.SelectionManager", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.manager.SelectionManager
	 * @summary:
	 * 		选择控制器
	 * @description:
	 * 		选择控制器为表格提供针对行的选择功能。
	 * 		可在Grid配置上配置selection指定表格的选择类型(单选/多选)，及各种选择事件。
	 * @example:
	 * |	<div dojoType="unieap.grid.Grid" width="500px" height="200px"
	 * |		binding="{store:'empDataStore'}"
	 * |		views="{rowNumber:true,orderType:'none'}"
	 * |		selection="{selectType:'single',onBeforeSelect:onSelect}">
	 * |		<fixed>
	 * |			<cell label="员工编号" width="150" name="attr_empno"></cell>
	 * |		</fixed>
	 * |		<header>
	 * |			<cell width="100px" label="姓名" name="NAME"></cell>
	 * |			<cell width="150px" label="职位" name="attr_job"></cell>
	 * |			<cell width="150px" label="工资" name="attr_sal" headerStyles="text-align: left;"></cell>
	 * |		</header>
	 * |	</div>
	 * @img:
	 * 		images/grid/grid_select.png
	 */
	
	ui: {
		setSelect:true,
		setAllSelect:true,
		isSelected:true,
		getSelectedRows:true,
		deleteSelectedRows:true,
		getSelectedRowIndexs:true,
		clearSelection:true,
		getSelectType:true,
		setSelectType:true,
		setCheckabled:true,
		isSelectable : true,
		getSelectedDataSet:true,
		events: {
			onBeforeSelect:true,
			onBeforeDeselect:true,
			onAfterSelect:true,
			onAfterDeselect:true,
			onBeforeAllSelect:true,
			onAfterAllSelect:true
		}
	},
	
	_patch: "unieap.grid.manager.SelectionPatch",
	types : {
		s: "s",
		single: "single",
		m: "m",
		multiple: "multiple"
	},
	
	/**
	 * @summary:
	 * 		选择类型
	 * @type:
	 * 		{string}
	 * @enum:
	 * 		{"s"|"single"|"m"|"multiple"|"none"}
	 * @default:
	 * 		"none"
	 * @example:
	 *|<div dojoType="unieap.grid.Grid"  width="80%" height="250px" binding="{store:'empDataStore'}" selection="{selectType:'single'}">
	 *|... ...
	 *|</div> 
	 */
	selectType: null,
	uncheckabled:null,
	
	constructor: function(param) {
		dojo.mixin(this, param);
		this.selectType = param.selectType||"none";
		this.uncheckabled = {};
		
		var viewManager=this.grid.managers.get("ViewManager");
		this.switchType();
		this.connects = [];
		this.connects.push(dojo.connect(viewManager, "addView", this, "onAddView"));
		this.grid.managers.addPlus(viewManager,'getRowBarWidth',dojo.hitch(this, this.getRowBarWidth));
		this.grid.managers.addPlus(viewManager,'generateRowBarCells',dojo.hitch(this, this.generateRowBarCells));
	},
	
	onAddView: function(inView) {
		switch(this.selectType) {
			case this.types.s:
			case this.types.single:
			case this.types.m:
			case this.types.multiple: {
				this.doPatch(inView);
			}
		}
	},
	
	switchType: function() {
		switch(this.selectType) {
			case this.types.s:
			case this.types.single:
			case this.types.m:
			case this.types.multiple: {
				this.doPatch(this);
				this.doPatch(this.grid.managers.get("RowManager"));
//				this.doPatch(this.grid.managers.get("ViewManager"));
				
			}
		}
	},
	
	getRowBarWidth: function() {
		var inWidth=0;
		switch(this.getSelectType()) {
			case this.types.s:
			case this.types.single:
			case this.types.m:
			case this.types.multiple: {
				inWidth+=20;
				break;	
			}	
		}
		return inWidth;
	},
	
	generateRowBarCells: function(inRowIndex) {

		var cells = "";
		if (this.getSelectType()==this.types.m || this.getSelectType()==this.types.multiple) {
			cells += this.generateMultiSelectCell(inRowIndex);
		} else if (this.getSelectType()==this.types.s || this.getSelectType()==this.types.single) {
			cells += this.generateSingleSelectCell(inRowIndex);
		}
		
	
		return cells;
	},
	isSelectable : function(inRowIndex){
		return true;
	},
	generateSingleSelectCell: function(inRowIndex) {
        if (inRowIndex == -1) {
            return "<td></td>";
        }else {
        	var binding = this.grid.getBinding();
            var data = binding.getRow(inRowIndex);
            var row = new unieap.ds.Row(binding.getRowSet(),data);
            var groupIdentifier = row.getIdentifier("_g");
            var selectIdentifier = row.getIdentifier("_s");
            //if (data["_g"] && (data["_g"]["gr"] || data["_g"]["gsr"])) {//分组行
            if (groupIdentifier && (groupIdentifier["gr"] || groupIdentifier["gsr"])) {//分组行
                return "<td></td>";
            }
            var check = [];
            var select = this.grid.managers.get("SelectionManager");
            check.push("<td class='u-grid-rowbar-choice'><input type='radio' name='");
            check.push("radio_" + this.grid.id + "'");
            if (selectIdentifier) {
                check.push(" checked='true' ");
                select.addToSelection(inRowIndex);
            }
            if (!this.isSelectable(inRowIndex) || groupIdentifier && groupIdentifier["uncheckabled"]) {
                check.push(" disabled='true' ");
            }
            check.push("/></td>");
            return check.join('');
        }
	},
	
	generateMultiSelectCell: function(inRowIndex) {
		var binding = this.grid.getBinding();
		var data = inRowIndex>=0?binding.getRow(inRowIndex):{allSelect: true};
		var row = new unieap.ds.Row(binding.getRowSet(),data);
        var groupIdentifier = row.getIdentifier("_g");
        var selectIdentifier = row.getIdentifier("_s");
		if (groupIdentifier && (groupIdentifier["gr"] || groupIdentifier["gsr"])) {//分组行
			return "<td></td>";	
		}
		var check = [];
		var select = this;
		check.push("<td  class='u-grid-rowbar-choice'><input type='checkbox' name='");
		check.push("checkbox_" + this.grid.id + "'");
		if (data["allSelect"]) {
			//设置全选按钮选中状态
			//todo:如果设置某些行不可以选中(row["_g"]["uncheckabled"]=true)
			//然后用户勾选表头复选框,grid重新刷新后，表头应该选中?
	
			var rs = this.grid.getBinding().getRowSet();
			//当Grid绑定的dataStore没有任何数据时，需要加上判断条件rs.getRowCount()>0才行
			//见bug U_EAP00011726
			if (rs.getRowCount()>0&&rs.getUnSelectedRows(unieap.ds.Buffer.PRIMARY).length == 0&&rs.getUnSelectedRows(unieap.ds.Buffer.FILTER).length == 0) {
				check.push(" checked='true' ");
			}
		} else if (selectIdentifier) {
			check.push(" checked='true' ");
			select.addToSelection(inRowIndex);
		} else {
			select.removeFromSelection(inRowIndex);
		}
		if (!this.isSelectable(inRowIndex) || groupIdentifier && groupIdentifier["uncheckabled"]) {
			check.push(" disabled='true' ");
		}
		check.push("/></td>");
		return check.join('');
	},
	
	update: function() {
		
	},
	
	/**
	 * @summary:
	 * 		取得表格的选择类型
	 * @return:
	 * 		{string}
	 * @enum:
	 * 		{"s"|"single"|"m"|"multiple"|"none"}
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |    var type=grid.getManager("SelectionManager").getSelectType(); 
	 * |	alert(type);
	 * |</script>
	 */
	getSelectType: function() {
		return this.selectType;
	},
	
	/**
	 * @summary:
	 * 		设置表格的选择类型
	 * @param:
	 * 		{string} inSelectType
	 * @enum:
	 * 		{"s"|"single"|"m"|"multiple"|"none"}
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |	var selectType = grid.getManager("SelectionManager").getSelectType();
	 * |	if(selectType=="m" || selectType=="multiple"){
   	 * |		grid.getManager("SelectionManager").setSelectType("s");
	 * |	}else if(selectType=="s" || selectType=="single"){
   	 * |		grid.getManager("SelectionManager").setSelectType("m"); 
	 * |	}
	 * |</script>
	 */
	setSelectType: function(inSelectType) {
		if (this.selectType == inSelectType) {
			return;
		} else {
			this.selectType = inSelectType;
			this.clearSelection && this.clearSelection();
			this.switchType();
			this.grid.managers.reloadManager("SelectionManager");
			this.grid.refresh();
		}
	},
	
	/**
	 * @summary:
	 * 		取得表格选中行
	 * @return:
	 * 		{array} 被选中的行的Row对象数组
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |	var selectedRows=grid.getManager('SelectionManager').getSelectedRows();
	 * |	unieap.debug(selectedRows);
	 * |</script>
	 */
	getSelectedRows: function() {
		try {
			return this.grid.getBinding().getRowSet().getSelectedRows();
		} catch (e) {
//			console.log("this.grid.getBinding().getRowSet().getSelectedRows()");
		}
	},
	
	
	/**
	 * @summary:
	 * 		取得选中的数据集
	 * @return：
	 * 		{unieap.ds.RowSet} 选中的数据对象组成的数据集
	 * @description：
	 * 		取得选中的数据集。
	 * 		当存在翻页缓存时,能够获取缓存中的数据。
	 * 		
	 */
	getSelectedDataSet:function(){
		var pagingMan=this.grid.getManager("PagingManager");
		if(pagingMan.pageCache){
			//如果存在缓存页
			var data=pagingMan.getSelectedCachedData();
			return new  unieap.ds.DataStore(data).getRowSet();
		}else{
			var rs = new unieap.ds.DataStore().getRowSet();
			var grs = this.grid.getBinding().getRowSet();
			var arr  = grs.getSelectedRowIndexs();
			var data = grs.getData();
			for(var i = 0;i<arr.length;i++){
				rs.addRow(data[arr[i]],false,true,false);
			}
			return rs;
		}
	},

	
	/**
	 * @summary:
	 * 		删除选中行
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |	grid.getManager('SelectionManager').deleteSelectedRows();
	 * |</script>
	 */
	deleteSelectedRows: function() {
		try {
			this.grid.getBinding().getRowSet().deleteSelectedRows();
			this.grid.managers.get("ViewManager").refresh();
		} catch(e) {
//			console.log("this.grid.getBinding().getRowSet().deleteSelectedRows()");
		}
	},
	
	/**
	 * @summary:
	 * 		选中前监听事件
	 * @description:
	 * 		此方法返回false时，选择将不生效。
	 * @param:
	 * 		{number} inRowIndex
	 * @return:
	 * 		{boolean}
	 */
	onBeforeSelect: function(inRowIndex) {
		return true;
	},
	
	/**
	 * @summary:
	 * 		取消选择前监听事件
	 * @description:
	 * 		此方法返回false时，取消选择将不生效。
	 * @param:
	 * 		{number} inRowIndex
	 * @return:
	 * 		{boolean}
	 * @example:
	 *|<div dojoType="unieap.grid.Grid"  width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" 
     *|	    selection="{selectType:'multiple',onBeforeDeselect:test}">
   	 *|		... 
	 *|</div>	  
	 */
	onBeforeDeselect: function(inRowIndex) {
		return true;
	},
	
	/**
	 * @summary:
	 * 		选择后事件
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 *|<div dojoType="unieap.grid.Grid"  width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" 
     *|     selection="{selectType:'single',onAfterSelect:test}">
	 *|</div>
	 */
	onAfterSelect: function(inRowIndex) {
	},
	/**
	 * @summary:
	 * 		取消选择后事件
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 *|<div dojoType="unieap.grid.Grid"  width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" 
     *|	selection="{selectType:'multiple',onAfterDeselect:test}">
     *|</div>
	 */
	onAfterDeselect: function(inRowIndex) {
	},
	/**
	 * @summary:
	 * 		全选前事件
	 * @description:
	 * 		此方法返回false时，全部选择将不生效。
	 * @param:
	 * 		{boolean} select select为true全部选中前事件，为false表示全部取消选择前事件
	 * @return:
	 * 		{boolean}
	 * @example:
	 *|<div dojoType="unieap.grid.Grid"  width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" 
     *|selection="{selectType:'multiple',onBeforeAllSelect:test}">
	 *|</div>
	 */
	onBeforeAllSelect: function(select) {
		return true;
	},
	/**
	 * @summary:
	 * 		全选后事件
	 * @param:
	 * 		{boolean} select select为true全部选中后事件，为false表示全部取消选择后事件
	 * @example:
	 *|<div dojoType="unieap.grid.Grid" width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" 
     *|     selection="{selectType:'multiple',onAfterAllSelect:test}">
	 *|</div>
	 */
	onAfterAllSelect: function(select) {
	},
	
	//在用户没有配置selectType的情况下,下面方法是空实现
	//设置selectType属性后,在SelectionPatch.js中会对这些方法进行覆盖(mixin)
	
	/**
	 * @summary:
	 * 		设置表格行数据的选中状态
	 * @param:
	 * 		{number} inRowIndex
	 * @param:
	 * 		{boolean} inSelect
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |	//如果用户配置了selection属性,会选中复选框或者单选框
	 * |	grid.getManager('SelectionManager').setSelect(0,true);
	 * |</script>
	 */
	setSelect: function() {},
	
	/**
	 * @summary:
	 * 		设置表格全选,只对多选时有用
	 * @description:
	 * 		如果某一行的复选框被禁用,本方法将不会操作该行
	 * @param:
	 * 		{boolean} inSelect
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |	//选中rowBar上所有的复选框
	 * |	grid.getManager('SelectionManager').setAllSelect(true);
	 * |</script>
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |	//第一行不可选中
	 * |	grid.getManager('SelectionManager').setCheckabled(0,false);
	 * |	//除第一行没被选中外，其他行都选中
	 * |	grid.getManager('SelectionManager').setAllSelect(true);
	 * |</script>
	 */
	setAllSelect: function() {},
	
	/**
	 * @summary:
	 * 		判断某一行是否被选中
	 * @param:
	 * 		{number} inIndex
	 * @return:
	 * 		{boolean}
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |	//判断第一行是否选中
	 * |	var selected=grid.getManager('SelectionManager').isSelected(0);
	 * |	alert(selected);
	 * |</script>
	 */
	isSelected: function(inRowIndex) {},
	
	/**
	 * @summary:
	 * 		取得选择的行号
	 * @return:
	 * 		{array}
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |	//获得选中的行号,返回一个数组
	 * |	var indexs=grid.getManager('SelectionManager').getSelectedRowIndexs();
	 * |	alert(indexs);
	 * |</script>
	 */
	getSelectedRowIndexs: function() {},
	
	/**
	 * @summary:
	 * 		清除所有选中项,包括禁用和非禁用的行
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |	grid.getManager('SelectionManager').clearSelection();
	 * |	
	 * |</script>
	 */
	clearSelection: function() {},
	
	/**
	 * @summary:
	 * 		设置一行是否可选中
	 * @param:
	 * 		{number} inRowIndex
	 * @param:
	 * 		{boolean} checkabled
	 * @example:
	 * |<script type="text/javascript">
	 * |	var grid=unieap.byId("grid");
	 * |	//设置第一行不可选中(第一行的复选框或者单选框被禁用)
	 * |	grid.getManager('SelectionManager').setCheckabled(0,false);
	 * |</script>
	 */
	setCheckabled: function(inRowIndex, checkabled) {},
	
	doPatch: function(inComponent) {
		if (!this.patcher) {
			dojo.require(this._patch);
			this.patcher = new unieap.grid.manager.SelectionPatch();
		}
		this.patcher.doPatch(inComponent);
	},
	
	destroy : function(){
		while(this.connects.length>0){
			dojo.disconnect(this.connects.pop());
		}
	}
});
