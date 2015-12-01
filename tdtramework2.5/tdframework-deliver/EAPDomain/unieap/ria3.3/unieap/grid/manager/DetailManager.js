dojo.provide('unieap.grid.manager.DetailManager');
dojo.declare("unieap.grid.manager.DetailManager", null, {
	
	
    /**
     * @summary:
     * 		Grid的Master Detail控制器
     * @declaredClass：
     * 		unieap.grid.manager.DetailManager
     * @classDescription:
     * 		通过配置getMasterDetail方法实现
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" detail='{expandAll:true,getMasterDetail:getMyDetail}'> 
	 * |</div>
	 * |function getMyDetail(inRowIndex){
	 * |	var span=dojo.create("span",{innerHTML:inRowIndex});
	 * |	return span;
	 * |}
	 * @example:
	 * |//得到控制器
	 * |var manager=grid.getManager('DetailManager');
	 * |//展开第一行
	 * |manager.expand(0);
	 * @img:
	 * 		images/grid/detail.png
     */
	
	ui:{
		expand:true,
		collapse:true
	},
	
	
	/**
	 * @summary:
	 * 		是否默认展开所有行
	 * @default
	 * 		false
	 * @type：
	 * 		{bolean}
	 * @example：
	 * |<div dojoType="unieap.grid.Grid" detail="{expandAll:true}">
	 * |</div>
	 */
    expandAll: false,
    
    _connectHandlers: null,
    
    constructor: function(param){
    	this._connectHandlers = [];
        dojo.mixin(this, param);
        this.viewManager = this.grid.managers.get('ViewManager');
       	this._addPatch();
        var self = this;
        var rowManager = this.grid.managers.get("RowManager");
		this._connectHandlers.push(dojo.connect(this.grid,"onBeforeResize",dojo.hitch(this,"onBeforeResize")));
		this._connectHandlers.push(dojo.connect(this.viewManager, 'onRowRender', dojo.hitch(self, self.onRowRender)));
        this._connectHandlers.push(dojo.connect(this.viewManager, 'onRowRefresh', dojo.hitch(self, self.onAfterRenderRow))); 
        this._connectHandlers.push(dojo.connect(rowManager, 'onAfterRenderRow', dojo.hitch(self, self.onAfterRenderRow)));
		this._connectHandlers.push(dojo.connect(rowManager, 'onRowRemoved', dojo.hitch(self, self.onRowRemoved)));
        this._connectHandlers.push(dojo.connect(this.grid, 'dispatchContentEvent', dojo.hitch(self, self.dispatchContentEvent)));
		this.grid.managers.addPlus(this.viewManager,'getRowBarWidth',dojo.hitch(this, this.getRowBarWidth));
		this.grid.managers.addPlus(this.viewManager,'generateRowBarCells',dojo.hitch(this, this.generateRowBarCells));
    },
	

    
	_addPatch : function(){
		var scroller = this.viewManager.scroller;
		scroller.getRowHeight= function(node){
        	return node.offsetHeight;
        }
        scroller.measurePage= function(inPageIndex){
    		return this.getDefaultPageNode(inPageIndex).offsetHeight;
        }
	},


    /**
     * @summary:
     * 		展开某行的详情
     * @param
     * 		{number} index 要展开的行号, 从0开始进行索引
     * @example:
     * |var detailMan=unieap.byId("grid").getManager("DetailManager");
     * |detailMan.expand(0); //展开第一行
     */
    expand: function(index, change){
        var self = this;
        var views = this.viewManager.views;
        var t, h = 0;
        for (var l = views.length, i = l - 1; i >= 0; i--) {
            var view = views[i];
            var rowNode = view.getRowNode(index);
            if (dojo.query(".u-grid-group", rowNode).length > 0) {
                return;
            }
            if (rowNode) {
                h = self.expandRowNode(index, rowNode, view, h);
            }
        }
        var masterIcon = this.getMasterIcon(index);
        if (masterIcon) {
            dojo.removeClass(masterIcon, 'u-grid-detail-plus');
            dojo.addClass(masterIcon, 'u-grid-detail-minus');
        }
		this.setRowExpand(index);
        if (!change) {
            this.viewManager.scroller.rowHeightChanged(index);
        }
    },
    
    /**
     * @summary:
     * 		收起某行的详情
     * @param:
     * 		{number} index 要收起的行号, 从0开始进行索引
     * @example:
     * |var detailMan=unieap.byId("grid").getManager("DetailManager");
     * |detailMan.collapse(0); //展开第一行
     */
    collapse: function(index){
        var self = this, h = 0;
        var views = this.viewManager.views;
        for (var l = views.length, i = 0; i < l; i++) {
            var view = views[i];
            var rowNode = view.getRowNode(index);
            if (dojo.query(".u-grid-group", rowNode).length > 0) {
                return;
            }
            if (rowNode) {
                self.collapseNode(index, rowNode, view);
            }
        }
		this.setRowCollapse(index);
        var masterIcon = this.getMasterIcon(index);
        if (masterIcon) {
            dojo.removeClass(masterIcon, 'u-grid-detail-minus');
            dojo.addClass(masterIcon, 'u-grid-detail-plus');
        }
        this.viewManager.scroller.rowHeightChanged(index);
    },
	
	
	/**
	 * @summary:
	 * 		用户自定义的内容
	 * @description:
	 * 		返回用户自定义的内容
	 * @return：
	 * 		{"string"|"HtmlNode"}
	 * @param:
	 * 		{number} inRowIndex	所在的行数
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" detail='{getMasterDetail:getMyDetail}'> 
	 * |</div>
	 * |function getMasterDetail(inRowIndex){			
	 * |	var result = ["<div style=\"width:auto;border-top:1px solid #dddddd;height:120px\">"];
	 * |	result.push("<table width=\"469\"><tr><td width=\"124\">");
	 * |	result.push("Html片段测试");
	 * |	result.push("</td></tr></table>");
	 * |	result.push("</div>");				
	 * |	return result.join("");
	 * |}
	 * @ img:
	 * 		images/grid/html.png
	 * @example:
	 * |function getMasterDetailForm(index){
	 * |	var f=dojo.create('div',{
	 * |		innerHTML:"<div dojoType='unieap.form.Form' binding='{store:\"empFilterDataStore2\",bindIndex:"+index+"}'>"+
	 * |					"<div dojoType='unieap.form.FieldSet' title='编辑' style='width:512px;' >"+
	 * |					"<table><tr>"+
	 * |						"<td>工资</td><td><div dojoType='unieap.form.TextBox' binding='{name:\"attr_sal\"}'></div></td>"+
	 * |						"<td>入职日期</td><td><div dojoType='unieap.form.DateTextBox' binding='{name:\"attr_hiredate\"}'></div></td>"+
	 * |						"</tr></table>"+
	 * |					"</div>"+
	 * |					"</div>"
	 * |			});
	 * |			dojo.parser.parse(f);
	 * |	return f;
	 * |}
	 * 自定义HtmlNode
	 * @img:
	 * 		images/grid/form.png
	 */
    getMasterDetail: function(inRowIndex){
        return '';
    },
       
	   
	get: function(inRowIndex){
        return this.getMasterDetail(inRowIndex)||"";
    },
	
	
	//刷新末行的rowbar的事件入口
    onRowRender: function(rowNode, index, view){
        if (view.isRowBar) {
           this.updateRowBar(rowNode, index, view);
        }
    },
	
	generateRowBarCells:function(inRowIndex){
		if(inRowIndex>=0&&!this.isGroup(inRowIndex)){
			var className=this.isRowExpand(inRowIndex)?"u-grid-detail-minus":"u-grid-detail-plus"
			return "<td class='u-grid-rowbar-detail'><div class='"+className+"'></div></td>";
		}else{
			return "<td class='u-grid-rowbar-detail'></td>";
		}
		return "";
	},
	
    //更新rowbar的状态 当有有详情且已展开时   展开节点
    updateRowBar: function(rowNode, index, view){
      	if(this.isRowExpand(index)){
			this.expand(index, true);
		}
    },
	
	
	//渲染完一行后的事件入口
    onAfterRenderRow: function(index){
        if (this.expandAll||this.isRowExpand(index)) {
			//默认展开式 不触发行高变化的事件
           this.expand(index, true);
        }
    },
	
	//由于body默认是被隐藏的,计算会出现问题
    onBeforeResize : function(){
		var rowsIndex=this._getExpandRowsIndex();
	    dojo.forEach(rowsIndex,function(index){
			this.expand(index);
		},this);	
	},
	
	//获得所有展开的row的索引
	_getExpandRowsIndex:function(){
		var binding=this.grid.getBinding(),
			rowset=binding.getRowSet(),
			rowcount=binding.getRowCount(),
			expandRows=[],
			row;
		for(var i=0;i<rowcount;i++){
			row=binding.getRow(i);
			if(row){
				var rowObject = new unieap.ds.Row(binding.getRowSet(),row,i);
				var groupIdentifier = rowObject.getIdentifier("_g");
				if(groupIdentifier && groupIdentifier["ep"]){
					expandRows.push(i);
				}
				//row&&row['_g']&&row['_g']['ep']&&expandRows.push(i)
			}
		}
		return expandRows;
	},
	//点击 + -号的事件入口
    dispatchContentEvent: function(e){
        var view = e.sourceView;
        var target = e.target;
        var index = e.rowIndex;
        if (view.isRowBar && e.type == 'click' && target.tagName == "DIV") {
			
            if (dojo.hasClass(target,'u-grid-detail-plus')) {
                this.expand(index);
				this.expandAll=false;
            }else if (dojo.hasClass(target,'u-grid-detail-minus')) {
                this.collapse(index);
				this.expandAll=false;
            }
        }
    },
	
	//销毁某行的事件入口
    onRowRemoved : function(node ,index){
		if(node){
			dojo.query('[widgetId]', node).forEach(function(n){
				var w=dijit.byNode(n);
				w&&w.destroy();
			});
		}
	},

    
	//展开某个视图的节点
    expandRowNode: function(index, rowNode, view, h){
        var l;
        if (view.isRowBar) {
            l = 1;
        }
        else {
            l = view.rowTable.cols.length;
        }
		var table;
        if (dojo.query('.u-grid-row-detail-table', rowNode).length > 0) {
			table=dojo.query('.u-grid-row-detail-table', rowNode)[0];
        }else{
	        table = dojo.create('table', {
	            'cellSpacing': '0',
	            'cellPadding': '0',
	            'border': '0',
	            'class': 'u-grid-row-detail-table',
	            innerHTML: "<tbody><tr><td></td></tr></tbody>"
	        }, rowNode);
	        if (!view.noscroll) {
	            var inner = this.get(index);
	            var td = table.childNodes[0].childNodes[0].childNodes[0];
	            if (dojo.isString(inner)) {
	                td.innerHTML = inner;
	            }
	            else {
	                td.appendChild(inner);
	            }
	        }
		}
        if (h) {
            dojo.style(table, 'height', h + 'px');
        }else if(!view.noscroll){
            h = dojo.coords(table).h;
            dojo.style(table, 'height', h + 'px');
        }
		unieap.fireContainerResize(table);	
		return h;
    },
    
	//关闭某个节点
    collapseNode: function(index, rowNode, view){
        dojo.query('.u-grid-row-detail-table', rowNode).forEach(function(t){
           	dojo.query('[widgetId]', t).forEach(function(node){
				var w=dijit.byNode(node);
				w&&w.destroy();
			});
			dojo.destroy(t);
        })
    },
    
    //所在的rowbar的
    getRowBarWidth: function(){
        return 18;
    },
    
    //返回+ - 对应的节点
    getMasterIcon: function(index){
        var views = this.viewManager.views;
        var view = views[0];
		if(!view.isRowBar){
			return;
		}
        var rowNode = view.getRowNode(index);
        if (rowNode) {
            var rs = dojo.query('.u-grid-rowbar-detail', rowNode);
            if (rs && rs[0]) {
                if (rs[0].childNodes[0]) {
                    return rs[0].childNodes[0];
                }
            }
        }
        return null;
    },
	
	
	setRowExpand: function(inRowIndex){
		var binding = this.grid.getBinding();
		var row = binding.getRow(inRowIndex);
		var rowObject = new unieap.ds.Row(binding.getRowSet(),row,inRowIndex);
		rowObject.setIdentifier("_g",{ep:true});
//		if (!row["_g"]) {
//			row["_g"] = {};
//		}
//		row["_g"]["ep"] = true;
	},
	
	setRowCollapse: function(inRowIndex){
		var binding = this.grid.getBinding();
		var row = binding.getRow(inRowIndex);
		var rowObject = new unieap.ds.Row(binding.getRowSet(),row,inRowIndex);
		rowObject.setIdentifier("_g",{ep:false});
//		var row = this.grid.getBinding().getRow(inRowIndex);
//		if (!row["_g"]) {
//			row["_g"] = {};
//		}
//		row["_g"]["ep"] = false;
	},
	
	isRowExpand: function(inRowIndex){
		var binding = this.grid.getBinding();
		var row = binding.getRow(inRowIndex);
		var rowObject = new unieap.ds.Row(binding.getRowSet(),row,inRowIndex);
		var groupIdentifier = rowObject.getIdentifier("_g");
		return groupIdentifier && groupIdentifier["ep"];
//		var row = this.grid.getBinding().getRow(inRowIndex);
//		if (!row["_g"]) {
//			row["_g"] = {};
//		}
//		return row["_g"]["ep"];
	},
	
	isGroup: function(inRowIndex){
//		var row = this.grid.getBinding().getRow(inRowIndex);
//		if (!row["_g"]) {
//			row["_g"] = {};
//		}
//		return row["_g"]["gr"]||row["_g"]["gsr"];
		var binding = this.grid.getBinding();
		var row = binding.getRow(inRowIndex);
		var rowObject = new unieap.ds.Row(binding.getRowSet(),row,inRowIndex);
		var groupIdentifier = rowObject.getIdentifier("_g");
		return groupIdentifier&&(groupIdentifier["gr"]||groupIdentifier("gsr"));
	},
	
	destroy: function(){
		while(this._connectHandlers.length>0) {
			dojo.disconnect(this._connectHandlers.pop());
		}
		this.inherited(arguments);
	}
});
