dojo.provide('unieap.grid.manager.FilterManager');
dojo.declare("unieap.grid.manager.FilterManager", null, {
	/**
	 * @summary:
	 * 		过滤控制器
	 * @classDescription：
	 * 		控制Grid的过滤功能
	 * @declaredClass:
	 * 		unieap.grid.manager.FilterManager
	 * @example:
	 * |//得到过滤控制器
	 * |var manager=grid.getManager('FilterManager');
	 * |var filter={
	 * |	condition:{
	 * |		A:{name:'attr_sal',relation:">",value:1000}
	 * |	},
	 * |	pattern:"${A}"
	 * |}
	 * |//设置过滤
	 * |manager.setFilter('attr_sal',filter);
	 * |//进行过滤
	 * |manager.doFilter();
	 * @img:
	 * 		images/grid/filter.png
	 */
	
	ui:{
		cancelFilter:true,
		doFilter:true,
		setFilter:true
	},
	
	
	constructor: function(param) {
		dojo.mixin(this,param);
	},

	
	/**
	 * @summary:
	 * 		取消过滤
	 * @description:
	 * 		取消某列的过滤或者取消Grid的过滤
	 * @param 
	 * 		{unieap.grid.Cell|string} cell
	 * @example:
	 * |var filterManager=grid.getManager('FilterManager');
	 * |//取消name值为"attr_ename"的列并清除其过滤条件
	 * |filterManager.cancelFilter('attr_ename');	
	 * @example:
	 * |var filterManager=grid.getManager('FilterManager');
	 * |//取消所有cell的过滤条件,即取消Grid的过滤		
	 * |filterManager.cancelFilter();
	 */
	cancelFilter:function(cell){
		var layoutManager=this.grid.managers.get('LayoutManager');
		if(dojo.isString(cell)){
			cell=layoutManager.getCell(cell);
		}
		if(cell){
			cell.filter=null;
			layoutManager.clearFilterInfo(cell);
		}else{
			var cells=layoutManager.cells;
			dojo.forEach(cells,function(cell){
				cell.filter=null;
			});
			layoutManager.clearFilterInfo();
		}
	
		this.doFilter();
	},
	
	
	/**
	 * @summary
	 * 		进行过滤
	 * @description:
	 * 		对某个cell通过setFilter设置的过滤条件进行过滤
	 * @example:
	 * |var layoutManager=grid.getManager('LayoutManager');
	 * |var filterManager=grid.getManager('FilterManager');
	 * |var filter={
	 * |	condition:{
	 * |		//对同一个单元格进行过滤时,name属性得相同!!
	 * |		A:{name:'attr_ename',relation:"=",value:'开发'},
	 * |		B:{name:'attr_ename',relation:"=",value:'test'}
	 * |	},
	 * |	pattern:" ${A} || ${B} " //注意条件之间有空格!!
	 * |}
	 * |filterManager.setFilter('attr_ename',filter);
	 * |filterManager.doFilter();	
	 */
	doFilter:function(){
		if(!dojo.getObject("unieap.grid.menu.filter")){
			this.grid.connect(this.grid,'onRowSetFilter',dojo.hitch(this,function(){
				this._updateCell();
			}));
		}
		this.grid.getBinding().doFilter();
	},
	
	_updateCell:function(){
		var layout = this.grid.managers.get("LayoutManager");
		dojo.query('.u-grid-cell',this.grid.headerNode).forEach(function(th){
			var index=th.getAttribute("idx");
			var cell=layout.getCell(Number(index));
			if(cell.filter){
				dojo.addClass(th,'u-grid-filter-cell');
			}else{
				dojo.removeClass(th,'u-grid-filter-cell');
			}
		});
	},
	
	/**
	 * @summary:
	 * 		设置某个cell的过滤条件，注意condition中的条件列名称定义不能重复
	 * @param
	 *		{unieap.grid.Cell|string} cell 列绑定名
	 * @param 
	 * 		{object} filter 过滤条件
	 * @example:
	 * |var layoutManager=grid.getManager('LayoutManager');
	 * |var filterManager=grid.getManager('FilterManager');
	 * |//过滤出所有attr_ename为yangzz或者为fangzh的数据
	 * |var filter={
	 * |	condition:{
	 * |		A:{name:'attr_ename',relation:"=",value:'yangzz'},
	 * |		B:{name:'attr_ename',relation:"=",value:'fangzh'}
	 * |	},
	 * |	pattern:" ${A} || ${B} "
	 * |}
	 * |//取得cell,构造过滤条件,并进行过滤
	 * |var cell=layoutManager.getCell('attr_ename');
	 * |filterManager.setFilter(cell,filter);
	 * |filterManager.doFilter();
	 */
	setFilter:function(cell,filter){
		if(dojo.isString(cell)){
			cell=this.grid.getManager('LayoutManager').getCell(cell);
		}
		if(cell){
			cell.filter=filter;
		}
	}
	
});
