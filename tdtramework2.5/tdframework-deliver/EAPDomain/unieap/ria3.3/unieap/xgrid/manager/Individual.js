dojo.provide('unieap.xgrid.manager.Individual');
dojo.require("unieap.xgrid.manager.Manager");

dojo.declare("unieap.xgrid.manager.Individual", unieap.xgrid.manager.Manager, {
	 
	 /**
	 * @declaredClass:
	 * 		unieap.xgrid.manager.Individual
	 * @summary:
	 * 		个性化模块
	 * @description:
	 * 		此模块控制Grid的个性化设置，包括拖动调整列位置、锁定解锁列、显示隐藏列。
	 * 		可以配置在Grid上或toolbar上，分以下3种情况进行说明
	 * 		1.在toolbar上配置个性化时，在toolbar上增加一个下拉菜单，
	 * 			用户可以通过拖动和点击表头上的下拉菜单定制个性化的表格布局，
	 * 			定制好以后，可以点击toolbar上的保存按钮，将表格布局保存到本地的缓存数据，
	 * 			当对表格布局不满意时，可以重新定制表格布局，
	 * 			点击toolbar上的重置按钮，可以将表格还原回本来的样式。	
	 * 		2.在Grid上配置个性化时，表格具有个性化设置的所有功能，但是不能保存和重置设置后的表格布局
	 * 		3.在toolbar和Grid上同时配置个性化，Grid上的individual能够控制toolbar上的按钮是否显示，
	 * 			个性化只实例化toolbar上的功能。
	 * 		要使个性化设置的锁定解锁列、显示隐藏列可用，必须在Grid上配置menu属性
	 * 		个性化功能不支持复杂表头和多标题表格。
	 * @example:
	 * |	<div dojoType="unieap.xgrid.Grid" width="500px" height="250px" style="left: 150px;top:200px;"
	 * |		binding="{store:'empDataStore'}" views="{rowNumber:true}" individual="{isShowToolbar: false}">
	 * |		<fixed>
	 * |			<cell label="员工编号" name="attr_empno" width="100px"></cell>
	 * |		</fixed>
	 * |		<header>
	 * |			<cell width="100px"  name="attr_job" label="职位"></cell>
	 * |			<cell width="100px" name="NAME" label="姓名"></cell>
	 * |			<cell width="100px" name="attr_deptno" label="部门" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
	 * |			<cell width="100px" name="attr_sal" label="工资" headerStyles="text-align: left;"></cell>
	 * |		</header>
	 * |		<toolbar individual="true"></toolbar>
	 * |	</div>
	 */
	 
	create: function(){
		dojo.require("unieap.xgrid.menu.lockcell");
		this.menulockcell = new unieap.xgrid.menu.lockcell({grid:this.grid});
	
		dojo.require("unieap.xgrid.menu.showcell");
		this.menushowcell = new unieap.xgrid.menu.showcell({grid:this.grid});
		
		this.grid.draggable = true;
	},
	
	buildCustomStore: function() {
		var cs = [];
		var cols = this.grid.getManager("LayoutManager").origin.columns;
		var layoutManager = this.grid.getManager("LayoutManager");
		var strucItems = [];
		dojo.forEach(layoutManager.structure,function(structure){
			if(!structure.type){
				dojo.forEach(structure.rows[0],function(cell){
					strucItems.push(cell)
				});
			}
		});
		var sequence = [];
		dojo.forEach(strucItems, function(item){
			for(var i = 0; i<cols.length; i++){
				if(cols[i].name==item.name && cols[i].label==item.label){
					sequence.push(i);
					break;
				}
			}
		});
		var structure = layoutManager.structure;
		var lockCellNum = 0;
		for(var i = 0 ; i<structure.length; ++i){
			if(structure[i].noscroll && !structure[i].isRowBar){
				lockCellNum = structure[i].rows[0].length;
			}
		}
		
		var islocked = 0;
		var isShow = true;
		for (var i = 0; i < sequence.length; i++) {
			if (i < lockCellNum) {
				islocked = 1;
			} else {
				islocked = 0;
			}
			if(strucItems[sequence[i]].hidden){
				isShow = false;
			} else {
				isShow = true;
			}
			cs.push({lock: islocked, show: isShow, index: sequence[i], width: strucItems[i].width});
		}
		this.cs = cs;
	},
	
	//保存个性化设置到本地的缓存数据
	saveIndividual: function() {
		this.buildCustomStore();
		unieap.Action.setIndividual({id:this.grid.id, data:this.cs});
	},
	
	//重置个性化设置
	resetIndividual: function() {
		unieap.Action.setIndividual({id:this.grid.id, data:[]});
		var origin = this.grid.getManager("LayoutManager").origin;
		var structure = this.grid.getManager("LayoutManager").structure;
		if(structure[0].type=="unieap.xgrid.RowView"){
			structure.shift();
		}
		if(origin.fixed > 0){
			structure[0].rows[0] = [];
			for(var i = 0; i<origin.fixed; i++){
				structure[0].rows[0].push(origin.columns[i]);
			}
		}
		structure[structure.length-1].rows[0] = [];
		for(var i = origin.fixed; i<origin.columns.length; i++){
			structure[structure.length-1].rows[0].push(origin.columns[i]);
		}
		this.grid.getManager("LayoutManager").setStructure(structure);
	}
});