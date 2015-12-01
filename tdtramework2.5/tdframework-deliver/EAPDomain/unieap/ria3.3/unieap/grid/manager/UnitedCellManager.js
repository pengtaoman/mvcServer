dojo.provide('unieap.grid.manager.UnitedCellManager');

dojo.declare("unieap.grid.manager.UnitedCellManager", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.manager.UnitedCellManager
	 * @summary:
	 * 		合并单元格控制器
	 * @description:
	 * 		提供合并单元格功能。
	 * 		标签中可配置unite属性指定一个需要合并的单元格数组，onCellClick指定合并后单元格的点击事件。
	 * 		合并单元格控制器还提供getUnitedCells方法取得被合并的单元格名称数组。
	 * @example:
	 * |	<div id="grid" id="grid" dojoType="unieap.grid.Grid" width="500px" height="200px"
	 * |		binding="{store:'empDataStore'}" views="{rowNumber:true}"
	 * |		unitedCell="{unite:['attr_deptno','attr_job'],onCellClick: onclick}">
	 * |		<header>
	 * |			<cell width="100px" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
	 * |			<cell width="150px" label="职位" name="attr_job"></cell>
	 * |			<cell width="150px" label="姓名" name="NAME"></cell>
	 * |			<cell label="员工编号" width="100" name="attr_empno" headerStyles="text-align: left;"></cell>
	 * |		</header>
	 * |	</div>
	 * @img:
	 * 		images/grid/grid_unitedCell.png
	 */
	
	ui: {
		getUnitedCells:true,
		events: {
			onCellClick:true,
			onContextMenu:true,
			onCellDblClick:true
		}
	},
	
	unite: null,
	helpers: null,
	_table:'<table class="u-grid-row-table u-grid-unitedLayout" border="0" cellspacing="0" cellpadding="0"',
	
	constructor: function(param) {
		dojo.mixin(this, param);
		if (!dojo.isArray(this.unite)) {
			return;
		}
		this.helpers = {};
		this.unitedCells = {};
		this.connects = [];
		var viewManager=this.grid.managers.get("ViewManager");
		this.connects.push(dojo.connect(this.grid.managers.get("LayoutManager"), "onAfterAddCell", this, "onAddCell"));
		this.connects.push(dojo.connect(viewManager, "addView", this, "onAddView"));
		this.connects.push(dojo.connect(viewManager, "_prerender", this, "onpreRender"));
		this.connects.push(dojo.connect(viewManager, "setScrollTop", this, "render"));
		this.connects.push(dojo.connect(viewManager, "_postrender", this, "render"));
		this.connects.push(dojo.connect(this.grid.managers.get("RowManager"), "updateStyles", this, "updateStyles"));
		this.grid.managers.addPlus(this.grid,'getGridData',dojo.hitch(this, this.getGridData));
		for (var i=0,name; name=this.unite[i]; i++) {
			this.unitedCells[name] = {
				layers:[],
				superior:this.unite[i-1] || null
			};
		}
	},
	
	onAddCell: function(inCell) {
		var name = inCell.name;
		if (name && this.unitedCells[name]) {
			this.helpers[name] = new unieap.grid.UnitedCellHelper(inCell,this.unitedCells[name].superior, this);
			inCell.enable = false;
		}
	},
	
	onAddView: function(inView) {
		if (inView.isRowBar) return;
		var node = this.getUnitedLayer(inView);
		inView.contentNode.appendChild(node);
		inView.unitedCellLayer = node;
		inView._resizeWidth = dojo.hitch(inView, function(node,index,width) {
			var colgroups; 
			if(node){
				colgroups = node.getElementsByTagName("colgroup");
				for(var colgroup, i= 0;colgroup = colgroups[i]; i++) {
					if (dojo.isFF) {
						dojo.style(colgroup.childNodes[index],"width",width);
					} else {
						dojo.style(colgroup.children[index],"width",width);
					}
				}
			}
		});
	},
	
	getUnitedLayer: function(inView) {
		var node = dojo.create('div', {
			'class':'u-grid-unitedLayer'
		});
		return node;
	},
	onpreRender: function() {
		var views = this.grid.managers.get("ViewManager").views,
			cellLayers=[];
		
		for (var i=0,v; v=views[i]; i++) {
			if (v.unitedCellLayer) {
				v.unitedCellLayer.innerHTML = this.generateHtml(v);
				//<div cell='attr_deptno'></div>
				var result = dojo.query("div[class=u-grid-unitedCellLayer]",v.unitedCellLayer);
				for (var j=0,c; c=result[j]; j++) {
					cellLayers.push(c);
				}
			}
		}
		var c;
		for (c in this.unitedCells) {
			this.unitedCells[c].layers = [];
		}
		for (var i=0,l; l=cellLayers[i]; i++) {
			this.unitedCells[dojo.attr(l, "cell")].layers.push(l);
		}

		for (var i=0,name,helper; name=this.unite[i]; i++) {
			helper = this.getUnitedCellHelper(name);
			helper.reset();
		}
	},
	generateHtml: function(inView) {
		
		var html = [this._table], 
			v = inView,
			rows = v.contentStructure.rows;
		html.push('>');
		html.push(v.rowTable["colgroup"]);
		for(var j=0, row; (row=rows[j]); j++) {
			html.push('<tr>');
			for(var i=0, cell, markup; (cell=row[i]); i++) {
				markup = this.generateCellMarkup(cell);
				if(this.unitedCells[cell.name]) {
					markup[5] = "<div class='u-grid-unitedCellLayer' cell='" + cell.name + "'></div>";
				}
				html.push(markup.join(''));
			}
			html.push('</tr>');
		}
		html.push('</table>');
		return html.join('');
	},
	generateCellMarkup: function(inCell) {
		var result = [], html, colSpan, rowSpan;
		colSpan = "contentColSpan";
		rowSpan = "contentRowSpan";
		
		html = [ '<td tabIndex="-1"' ];
		
		inCell.colSpan && html.push(' colspan="', inCell.colSpan, '"');
		inCell.rowSpan && html.push(' rowspan="', inCell.rowSpan, '"');
		html.push('');//class
		// result[0] => td opener, style
		result.push(html.join(''));
		// SLOT: result[1] => td classes 
		html = [' idx="', inCell.index, '" style="'];
		html.push('height:100%;');
		// result[2] => markup
		result.push(html.join(''));
		// SLOT: result[3] => td style 
		result.push('');
		html = [ '"' ];
		inCell.attrs && html.push(" ", inCell.attrs);
		html.push('>');
		// result[4] => td postfix
		result.push(html.join(''));
		// SLOT: result[5] => content
		result.push('');
		// result[6] => td closes
		result.push('</td>');
		return result;
	},
	
	getUnitedCellHelper: function(name) {
		if (this.helpers[name]) {
			return this.helpers[name];
		}
		return null;
	},
	
	render: function() {
		//用了一个全局的job id,导致有多个grid同时渲染时
		//只渲染了了最后一个,见bug U_EAP00008063
		unieap.grid.jobs.job("u-grid-renderUnited-"+this.grid.id, 0, dojo.hitch(this, function() {
			for (var i=0,name,helper; name=this.unite[i]; i++) {
				helper = this.getUnitedCellHelper(name);
				helper.reset();
				helper.render();
			}
		}));
	},
	
	updateStyles: function(inRowIndex) {
		if (inRowIndex<0) return;

		var nodes = this.getNodes(inRowIndex);
		if (dojo.isArray(nodes) && nodes.length>0) {
			
			for (var i=0,node; node=nodes[i]; i++) {
				this.styleRowNode(inRowIndex, node);
			}
		}
	},
	styleRowNode: function(inRowIndex, inRowNode) {
		var row = this.prepareStylingRow(inRowIndex, inRowNode);
		this.onStyleRow(row);
		this.applyStyles(row);
	},
	prepareStylingRow: function(inRowIndex, inRowNode) {
		var rm = this.grid.managers.get("RowManager");
		return {
			index: inRowIndex, 
			node: inRowNode,
			odd: Boolean(inRowIndex&1),
			over: rm.isOver(inRowIndex),
			customStyles: "",
			customClasses: "u-grid-unite-cell"
		}
	},
	onStyleRow: function(inRow) {
		var rm = this.grid.managers.get("RowManager");
		with(inRow) {
			customClasses += (odd?" u-grid-row-odd":"")  
			+ (over?" u-grid-row-over":"")
			+((index==rm.currentRowIndex)?" u-grid-row-current":"");
		}
	},
	applyStyles: function(inRow) {
		with(inRow) {
			node.className = customClasses;
			var h = node.style.height,top=node.style.top;
			unieap.grid.setStyleText(node, customStyles + ';' + (node._style||''));
			node.style.height = h;
			node.style.top=top;
		}
	},
	getNodes: function(inRowIndex) {
		var nodes = [];
		for (var i=0,name,helper; name=this.unite[i]; i++) {
			helper = this.getUnitedCellHelper(name);
			var rowNodes = helper.nodes[inRowIndex];
			if (dojo.isArray(rowNodes) && rowNodes.length>0) {
				for (var j=0,n; n=rowNodes[j]; j++) {
					nodes.push(n);
				}
			}
		}
		return nodes;
	},
	
	destroy : function(){
       for(var i=0,l=this.connects.length;i<l;i++){
            dojo.disconnect(this.connects[i]);
       }
	   for (var i=0,name,helper; name=this.unite[i]; i++) {
			var helper = this.getUnitedCellHelper(name);
			helper.destroy();
	   }
	   unieap.grid.jobs.cancelJob("u-grid-renderUnited-"+this.grid.id);
	},
	
	//user interface
	/**
	 * @summary:
	 * 		取得合并单元格名称数组
	 * @return:
	 * 		{array}
	 * @example:
	 *|grid.getManager("UnitedCellManager").getUnitedCells(); 
	 */
	getUnitedCells: function() {
		return this.unite;
	},
	
	/**
	 * @summary:
	 * 		合并的单元格点击事件
	 * @param:
	 * 		{unieap.grid.Cell} inCell
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 *|<div dojoType="unieap.grid.Grid" id="grid" width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" 
     *|unitedCell="{unite:['attr_job'],onCellClick: test}">
     *|	... ...
	 *|</div>
	 */
	onCellClick: function(inCell, inRowIndex) {
		
	},
	
	/**
	 * @summary:
	 * 		合并的单元格双击事件
	 * @param:
	 * 		{unieap.grid.Cell} inCell
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 *|<div dojoType="unieap.grid.Grid" id="grid" width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" 
     *|		unitedCell="{unite:['attr_job'],onCellDblClick: test}">
     *|	... ...
	 *|</div>
	 */
	onCellDblClick: function(inCell, inRowIndex) {
		
	},
	
	/**
	 * @summary:
	 * 		合并单元格右键菜单事件
	 * @param:
	 * 		{unieap.grid.Cell} cell
	 * @param:
	 * 		{domNode} cellNode
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid" width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" 
     * |		unitedCell="{unite:['attr_job'],onContextMenu: fn}">
     * |		... ...
	 * |</div>
	 * |<script type="text/javascript">
	 * |	var menu;
	 * |	function fn(cell,cellNode,inRowIndex){
	 * |		if(!menu){
	 * |			menu=new unieap.menu.Menu({style:'display:none'});
	 * |			menu.addChild(new unieap.menu.MenuItem({label:"你好"}));
	 * |			menu.addChild(new unieap.menu.MenuItem({label:"基础软件"}));
	 * |			menu.startup();
	 * |		}
	 * |		menu.bindDomNode(cellNode);
	 * |	}	
	 * |</script>
	 */
	onContextMenu:function(cell,cellNode,inRowIndex){},
	
	

	
	
	getGridData: function(){
		return {unitedCells:this.unite};
	}
	
});

dojo.provide("unieap.grid.UnitedCellHelper");
dojo.declare("unieap.grid.UnitedCellHelper", null, {
	
	constructor: function(inCell, superior, uniteManager) {
		this.cell = inCell;
		this.superior = superior;
		this.manager = uniteManager;
		this.views = this.cell.grid.managers.get("ViewManager");
		this.rowHeight = this.cell.grid.managers.get("RowManager").defaultRowHeight;
		this.view = this.views.getViewByCell(this.cell);
		this.nodes = {};
		this.boundary = {};
	},
	
	getRowCount: function() {
		return this.cell.grid.getBinding().getRowData().length;
	},
	
	render : function(){
	
		var top = this.views.scroller.firstVisibleRow;
		var bottom = this.views.scroller.lastVisibleRow-1;

		var layers = this.manager.unitedCells[this.cell.name].layers;
		if (dojo.isArray(layers) && layers.length>0) {
			for(var i=top;i<=bottom;i++){
				this.parseRow(i, layers);
			}
		}
	

	},
	
	parseRow : function(inRowIndex, layers) {
		
		var unite = this.unite = this.unite || [];
		var binding = this.cell.grid.getBinding();
		if (!dojo.isArray(layers)) {
			return;
		}
		if(unite[inRowIndex] || layers.length<=0) {
			return;
		}
		this.nodes[inRowIndex] = [];

		var row = binding.getRow(inRowIndex);
		
		var value = this.cell.get(inRowIndex);
		unite[inRowIndex]=1;
		var top = inRowIndex,
			superiorHelper = this.manager.getUnitedCellHelper(this.superior);
			preRow = binding.getRow(inRowIndex-1);
		
			
		var rowObject = new unieap.ds.Row(binding.getRowSet(),row);
		var rowGroup = rowObject.getIdentifier("_g");
		var preRowObject,preRowGroup;
		if(preRow){
			preRowObject = new unieap.ds.Row(binding.getRowSet(),preRow);
			preRowGroup = preRowObject.getIdentifier("_g");
		}
		
			
		while(top-1>=0 && this.cell.get(top-1)==value//向上搜索,直至值不再相同
			&& !(rowGroup && rowGroup["gr"])//搜索至分组行停止
			&& (preRowObject&&!(preRowGroup && preRowGroup["gr"])) //上一行不存在分组
			&& (this.superior?this.manager.getUnitedCellHelper(this.superior).restrain(top):"true")) { //是否满足上级单元格合并
			top--;
			unite[top]=1;
			preRow = binding.getRow(top-1);
			if(preRow){
				preRowObject = new unieap.ds.Row(binding.getRowSet(),preRow);
				preRowGroup = preRowObject.getIdentifier("_g");
			}else{
				preRowObject = null;
				preRowGroup = null;
			}
		}
		
		var bottom = inRowIndex;
		var rowCount = this.getRowCount();
		var nextRow = this.cell.grid.getBinding().getRow(inRowIndex+1);
		
		
		var nextRowObject,nextRowGroup;
		if(nextRow){
			nextRowObject = new unieap.ds.Row(binding.getRowSet(),nextRow);
			nextRowGroup = nextRowObject.getIdentifier("_g");
		}
		
		while(bottom+1<rowCount && this.cell.get(bottom+1)==value //向下搜索,直至值不再相同 
			&& !(rowGroup && rowGroup["gr"]) //搜索至分组行停止
			&& (nextRowObject&&!(nextRowGroup && nextRowGroup["gr"])) //下一行不存在分组
			&& (this.superior?this.manager.getUnitedCellHelper(this.superior).restrain(bottom+1):"true")) {
				bottom++;
				unite[bottom]=1;
				nextRow = this.cell.grid.getBinding().getRow(bottom+1);
				if(nextRow){
					nextRowObject = new unieap.ds.Row(binding.getRowSet(),nextRow);
					nextRowGroup = nextRowObject.getIdentifier("_g");
				}else{
					nextRowObject = null;
					nextRowGroup = null;
				}
		}
		
		this.boundary[top] = true;
		this.boundary[bottom+1] = true;
		//这部分构造
		var rowSpan = bottom - top +1;
		
	

		for (var i=0, layer; layer=layers[i]; i++) {
			var node;
			if (inRowIndex%2) {
				node = dojo.create("div", {
					'class' : "u-grid-unite-cell u-grid-row-odd"
				});
			} else {
				node = dojo.create("div", {
					'class' : "u-grid-unite-cell"
				});
			}
			this.funnelEvents(node, top);
			node.pos = top;
			node.innerHTML = this.generUniteHTML(inRowIndex, row);
			dojo.style(node,"top",top * this.rowHeight + "px");
			dojo.style(node,"height",rowSpan * this.rowHeight + "px");
			layer.appendChild(node);
			this.nodes[inRowIndex].push(node);
		}
	},
	
	restrain: function(index) {
		return !this.boundary[index];
	},
	
	generUniteHTML : function(inRowIndex, row) {
		var result = ["<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" height=\"100%\">"];
		result.push("<tr>");
		
		if (row["_g"] && row["_g"]["gr"]) {
			result.push("<td class=\"u-grid-united-group\" style=\""+this.cell.styles+"\">");
		} else {
			result.push("<td class=\"u-grid-unitedCell-inner\" style=\""+this.cell.styles+"\">");
		}
//		result.push("<nobr class='u-grid-text'>");
		result.push(this.cell.format(inRowIndex,null,true) || "&nbsp;");
//		result.push("</nobr>");
		result.push("</td>");
		result.push("</tr>");
		result.push("</table>");
		
		return result.join("");
	},
	
	funnelEvents: function(inNode, inRowIndex) {
		var rm = this.cell.grid.managers.get("RowManager"),
			vm = this.cell.grid.managers.get("ViewManager");
		inNode.onmouseover = dojo.hitch(this, function(e) {
			if (!rm.isOver(inRowIndex)) {
				rm.setOverRow(inRowIndex);
			}
			dojo.stopEvent(e);
		});
		
		
		inNode.onclick = dojo.hitch(this, function(e) {
			rm.updateCurrnetRow(inRowIndex);
			e=dojo.fixEvent(e);
			dojo.stopEvent(e);
			this.manager.onCellClick(this.cell, inRowIndex);
			vm.onCellClick(this.cell,inRowIndex);
			vm.onRowClick(inRowIndex);
		});
		
		inNode.ondblclick = dojo.hitch(this, function(e) {
			e=dojo.fixEvent(e);
			dojo.stopEvent(e);
			this.manager.onCellDblClick(this.cell, inRowIndex);
			vm.onCellDblClick(this.cell,inRowIndex);
			vm.onRowDblClick(inRowIndex);
		});
		
		
		inNode.onmouseup=dojo.hitch(this,function(e){
			e=dojo.fixEvent(e);
			if(e.button!=2){
				return;
			}
			this.manager.onContextMenu(this.cell,inNode,inRowIndex);
			vm.onContextMenu(this.cell,inNode,inRowIndex);
				
			});
	},
	
	reset : function() {
		this.releaseEvent();
		var layers = this.manager.unitedCells[this.cell.name].layers;
		for (var i=0,layer; layer=layers[i]; i++) {
			layer.innerHTML = "";
		}
		this.unite = null;
		this.nodes = {};
		this.boundary = {};
	},
	destroy : function(){
        this.releaseEvent();
	} ,
	
	releaseEvent : function(){
		for(var i in this.nodes){
		  if(this.nodes[i]){
		  	for(var j=0,ll=this.nodes[i].length;j<ll;j++){
				 this.nodes[i][j].onmouseover = null;
		         this.nodes[i][j].onclick = null;
				 this.nodes[i][j].onmouseup=null;
				 this.nodes[i][j].ondblclick=null;
			}
		  }
       }
	}
});