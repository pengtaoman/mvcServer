dojo.provide('unieap.grid.manager.Individual');

dojo.declare("unieap.grid.manager.Individual", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.manager.Individual
	 * @summary:
	 * 		个性化模块
	 * @description:
	 * 		此模块在数据表格的工具栏(toolbar)上增加一个按钮，点击按钮可弹出一个设置表格列布局的对话框。
	 * 		用户可在对话框中设置表格中每一列的隐藏/显示，锁定/解锁及各列的前后次序。
	 * 		对话框的上移下移按钮可以调整格列的前后次序，应用按钮可以将设置应用到当前页面，保存可以更新本地的缓存数据，保存用户的个性化设置。
	 * 		个性化功能不支持复杂表头和多标题表格。
	 * @example:
	 * |	<div dojoType="unieap.grid.Grid" width="500px" height="250px" style="left: 150px;top:200px;"
	 * |		binding="{store:'empDataStore'}" views="{rowNumber:true}">
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
	 * @img:
	 * 		images/grid/grid_individual.png
	 */
	
	
	ui: {
		events: {
			
		}
	},
	
	constructor: function(param) {
		dojo.mixin(this, param);
		this.connects = [];
		var node = dojo.create('div',{
			'class':'u-grid-custom-div'
		});
		var upBtn = dojo.create('button',{
			'class':'u-grid-custom-up'
		},node);
		var downBtn = dojo.create('button',{
			'class':'u-grid-custom-down'
		},node);
		var saveBtn = dojo.create('button',{
			'class':'u-grid-custom-save'
		},node);
		var applyBtn = dojo.create('button',{
			'class':'u-grid-custom-apply'
		},node);
		upBtn.innerHTML=RIA_I18N.grid.individual.moveup;
		downBtn.innerHTML=RIA_I18N.grid.individual.movedown;
		saveBtn.innerHTML=RIA_I18N.grid.individual.save;
		applyBtn.innerHTML=RIA_I18N.grid.individual.apply;
		
		this.connects.push(dojo.connect(upBtn,"onclick",this, "rowUp"));
		this.connects.push(dojo.connect(downBtn,"onclick",this, "rowDown"));
		this.connects.push(dojo.connect(saveBtn,"onclick",this, "saveIndividual"));
		this.connects.push(dojo.connect(applyBtn,"onclick",this, "applyIndividual"));
		
		this.sequence = [];
		this.view = node;
	},
	
	destroy : function() {
		while(this.connects.length>0) {
			dojo.disconnect(this.connects.pop());
		}
		this.structureGrid && this.structureGrid.destroy();
	},
	
	updateView: function() {
		var cs = this.grid.managers.get("LayoutManager").customStructure;
		this.sequence = [];
		this.fixed = cs.fixed;
		for (var i = 0; i < cs.seq.length; i++) {
			this.sequence.push(cs.seq[i]);
		}
		this.structureGrid && this.structureGrid.destroy();
		var layout = this.grid.managers.get("LayoutManager");
		var ds = this.getStore();
		
		var layout = this.buildStructure();
		this.structureGrid =  new unieap.grid.Grid({layout: {structure: layout}, 
			binding: {store:ds}, width: "300px", height:"250px"});
		
		this.view.appendChild(this.structureGrid.domNode);
		
	},
	
	getStore: function() {
		//获得LayoutManager对象
		var layoutMan=this.grid.managers.get("LayoutManager"), 
			//最初是的列对象,为一个数组
			columns = layoutMan.origin.columns, 
			//原始列的序号,例如[0,1,2,3,4]
			orginSeq=layoutMan.origin.sequence, 
			//LayoutManager对象中的customStructure.seq,为当前的序号,比如[0,1,2],表示第4和5列隐藏
			seq=this.sequence,
			
			//用户重新排序后的顺序列表
			newSeq=layoutMan._newSequence; 
		
		//一些基本变量
		var _seq=(newSeq&&newSeq.length>0&&newSeq)||orginSeq,
			hide=[],
			fixedRows=[];
		
		//获得隐藏的列序号
		//如果用户重排过序号就从重排的序号中(_newSequence)查找,否则从原始序号中查找
		for(var i=0,l=_seq.length;i<l;i++){
			var show=false;
			for(var j=0,k=seq.length;j<k;j++){
				if(_seq[i]==seq[j]){
					show=true;
					break;
				}
			}
			show || hide.push(_seq[i]);
		}

		var rows = [];
		//处理显示的列,并将锁定的列序号放在最前面
		for(var index=0,l=seq.length;index<l;index++){
			if(index<this.fixed){
				fixedRows.push({"name": columns[seq[index]].label,
							"show": 1,
							"lock": 1,
							"index": seq[index]});	
			}else{
				rows.push({"name": columns[seq[index]].label,
							"show": 1,
							"lock": 0,
							"index": seq[index]});
			}
		}
		
		//将锁定列数据放到rows数组的最前面
		fixedRows.length>0&&Array.prototype.unshift.apply(rows,fixedRows);
		
		//处理隐藏的列,如果用户重排过序号就从重排的序号中(_newSequence)查找,否则从原始序号中查找
		for(var index=0,l=hide.length;index<l;index++){
			var tempIndex=-1;
			newSeq&&(tempIndex=dojo.indexOf(newSeq,hide[index]));
			if(this.fixed>0){
				if(hide[index]>=this.fixed){
					tempIndex==-1?(tempIndex=hide[index]):(tempIndex=tempIndex);
					rows.splice(tempIndex,0,{
						"name": columns[hide[index]].label,
						"show": 0,
						"lock": 0,
						"index": hide[index]
					});
				}else{
					tempIndex==-1?(tempIndex=this.fixed):(tempIndex=tempIndex);
					
					rows.splice(tempIndex,0,{
						"name": columns[hide[index]].label,
						"show": 0,
						"lock": 0,
						"index": hide[index]
					});
				}
			}else{
				tempIndex==-1?(tempIndex=hide[index]):(tempIndex=tempIndex);
				rows.splice(tempIndex,0,{
					"name": columns[hide[index]].label,
					"show": 0,
					"lock": 0,
					"index": hide[index]
				});
			}
		}
		var store = new unieap.ds.DataStore();
		store.getRowSet().addRows(rows);
		return store;
	},
	
	buildStructure: function() {
		var layout = [];
		var header={};
		header["rows"] = this.buildRows();
		layout.push(header);
		return layout;
	},
	
	buildRows: function() {
		var rows = [];
		rows.push(this.buildColumns());
		return rows;
	},
	
	buildColumns: function() {
		var row = [];
		var column = {
			name : "show",
			editor:{editorClass:"unieap.form.CheckBox",editorProps:{checkedValue:1,uncheckedValue:0}},
			label: RIA_I18N.grid.individual.visible,
			width: "50px",
			canSort: false,
			noResize : true
		};
		row.push(column);
		
		column = {
			name : "lock",
			editor:{editorClass:"unieap.form.CheckBox",editorProps:{checkedValue:1,uncheckedValue:0}},
			label: RIA_I18N.grid.individual.lock,
			width: "50px",
			canSort: false,
			noResize : true
		};
		row.push(column);
		
		column = {"editorProps":{},
			name : "name",
			label : RIA_I18N.grid.individual.column,
			width : "150px",
			canSort: false
		};
		row.push(column);
		return row;
	},
	
	rowUp: function() {
		var index = this.structureGrid.managers.get("RowManager").getCurrentRowIndex();
		if (index <= 0) {return;}
		
		var rs = this.structureGrid.getBinding().getRowSet();
		rs.rowsMove(index, index+1, null, rs,index-1,null);
		this.structureGrid.managers.get("RowManager").updateCurrnetRow(index-1);
		this.structureGrid.refresh();
		this._sortChanged=true;
	},
	
	rowDown: function() {
		var index = this.structureGrid.managers.get("RowManager").getCurrentRowIndex();
		if (index >= this.structureGrid.managers.get("RowManager").getRowCount()-1) {return;}
		
		var rs = this.structureGrid.getBinding().getRowSet();
		rs.rowsMove(index, index+1, null, rs,index+1,null);
		this.structureGrid.managers.get("RowManager").updateCurrnetRow(index+1);
		this.structureGrid.refresh();
		this._sortChanged=true;
		
	},
	
	configCustom: function() {
		var rows = this.structureGrid.getBinding().getRowData();
		
		var seq = [];
		var header = [];
		var fixed = 0;
		for (var i = 0; rows[i]; i++) {
			if (rows[i].show) {
				seq.push(rows[i].index);
				if (rows[i].lock) {
					 fixed++;
					 header.push(rows[i].index);
				}
			}
		}
		
	
		for (var i = 0; i < seq.length; i++) {
			var inHeader = false;
			for (var j = 0; j < header.length; j++) {
				if (seq[i] == header[j]) {
					inHeader = true;
					break;
				}
			}
			inHeader || header.push(seq[i]);
		}

		
		if (header.length <= 0) {
			alert("必须设置至少一列可见");
			return;
		}
		
		this.sequence = header;
		this.fixed = fixed;
		this.buildCustomStore(header, fixed);
	},
	
	applyIndividual: function(e) {
		if(e){
			this.configCustom();
		}
		
		//发生了排序操作
		if(this._sortChanged){
			var rows = this.structureGrid.getBinding().getRowData();
			this._newSequence=[];
			for(var i=0,l=rows.length;i<l;i++){
				this._newSequence.push(rows[i].index);
			}
			this.grid.managers.get("LayoutManager")._newSequence=this._newSequence;
			this._sortChanged=false;
		}
		
		this.grid.managers.get("LayoutManager").sortCell(this.sequence, this.fixed);
		
		
		
	
		//关闭对话框
		this.dialog && this.dialog.close();
		
	},
	
	buildCustomStore: function(header, fixed) {
		var cs = [];
		var cols = this.grid.managers.get("LayoutManager").origin.columns;
		var islocked = 0;
		for (var i = 0; i < header.length; i++) {
			if (i < fixed) {
				islocked = 1;
			} else {
				islocked = 0;
			}
			cs.push({lock: islocked, show: 1, name: cols[header[i]].name,index: header[i]});
		}
		this.cs = cs
	},
	
	saveIndividual: function() {
		this.configCustom();
		unieap.Action.setIndividual({id:this.grid.id, data:this.cs, callback:dojo.hitch(this, "applyIndividual")});
	},
	
	resetIndividual: function() {
		unieap.Action.setIndividual({id:this.grid.id, data:[]});
		var layout = this.grid.managers.get("LayoutManager");
		//清除重排后的序号
		delete layout._newSequence;
		layout.sortCell(layout.origin.sequence);
		for (var i = 0; i < layout.customStructure.seq.length; i++) {
			this.sequence.push(layout.customStructure.seq[i]);
		}
		document.body.click();
	},
	
	showDialog: function() {
		this.updateView();
		dojo.require("unieap.dialog.DialogUtil");
		this.dialog = DialogUtil.showDialog({inner:this.view,resizable:false,isExpand:false,width:400,height:320,title:RIA_I18N.grid.individual.title});
	},
	
	setSource: function(source) {
		this.dialogSource = source;
	}
	
});