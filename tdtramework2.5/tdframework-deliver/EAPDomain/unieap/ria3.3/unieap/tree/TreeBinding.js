dojo.provide("unieap.tree.TreeBinding");
dojo.require("unieap.tree.Tree");
dojo.declare("unieap.tree.TreeBinding",null,{
	 /**
	 * @declaredClass:
	 * 		unieap.tree.TreeBinding
	 * @summary:
	 * 		树绑定数据的具体实现的父类
	 * @classDescription:
	 *     提供了对树绑定数据基本操作和属性的实现
	 *     RowSetTreeBinding和JsonTreeBinding均继承此类
	 */
	
    /**
	 * @summary：
	 * 		设置树的节点对应数据的标识字段
	 * @type：
	 * 		{string}
	 * @default：
	 * 		id 
	 * @description:
	 *      为了对树上的每个节点进行唯一的标示，需要对树节点对应的数据指定一个字段，进行唯一的标示
	 */
	 id :"id",
	 
	 /**
	 * @summary：
	 * 		设置树的节点对应数据的显示字段
	 * @type：
	 * 		{string}
	 * @default：
	 * 		label 
	 * @description:
	 *      指定数据中显示字段，对于每个节点会将其对应数据的该字段值作为显示值
	 */
	 label:"label",
	 
	/**
	 * @summary：
	 * 		设置树的节点对应图标的样式字段
	 * @type：
	 * 		{string}
	 * @default：
	 * 		"" 
	 * @description:
	 *      在应用中，如果对于不同的节点的图标显示为不同样式，可将节点图标显示的样式为css类名存储为一个字段，通过该属性指定对应的字段名称
	 */
	 iconClass : "",
	 
	 /**
	 * @summary：
	 * 		设置树的节点对应文字的样式字段
	 * @type：
	 * 		{string}
	 * @default：
	 * 		"" 
	 *  @description:
	 *      在应用中，如果对于不同的节点的文字区域要显示为不同样式，可将节点文字显示的样式为css类名存储为一个字段，通过该属性指定对应的字段名称
	 */
	 labelClass : "",
	 
	 /**
	 * @summary：
	 * 		 设置标示子节点数据的字段
	 * @type：
	 * 		{string}
	 * @default：
	 * 		"children" 
	 * @description:
	 *     在json格式的数据中，通过设置该属性的值确定子节点对应的数据
	 *     在RowSet格式的数据中，在构建树形数据时，也会使用该字段的值标示子节点的数据对象
	 */
	 children:"children",
	 
	 /**
	 * @summary：
	 * 		标示节点是否是叶子节点的字段
	 * @type：
	 * 		{string}
	 * @default：
	 * 		"" 
	 * @description:
	 *    在数据中指定一个字段标示对应节点是否为叶子节点，树会根据该字段的值判断节点的显示样式
	 *    对树进行节点增删操作的时候，若往叶子节点上添加子节点或者把某个非叶子节点的所有子节点全部删除，会改变此字段的值
	 */
	 leaf : "",
	 
	 /**
	 * @summary：
	 * 		设置树的节点的排序参数
	 * @type：
	 * 		{object}
	 * @description:
	 *      此功能待实现 
	 */
	 sort:null,
	 
	 /**
	 * @summary：
	 * 		设置生成binding类的类名
	 * @type：
	 * 		{string}
	 * @default：
	 * 		"" 
	 * @description:
	 *     目前支持的为RowSetTreeBinding和JsonTreeBinding两种类型
	 */
	 bindingClass : "",
	 
	 /**
	 * @summary：
	 * 		树的虚拟根节点的id
	 * @type：
	 * 		{string}
	 * @default：
	 * 		"unieap_ria_tree_id_for_root" 
	 * @description:
	 *     为了检索和数据加载，为树的虚拟根节点设置的id。一般情况下用户不需要配置，在树的懒加载中，可能需要进行设置。
	 */
	 rootNodeId : "unieap_ria_tree_id_for_root",
	 
	 /**
	 * @summary：
	 * 		标示节点是否为disabled状态的字段
	 * @type：
	 * 		{string}
	 * @default：
	 * 		"" 
	 * @description:
	 *    在数据中指定一个字段标示对应节点是否为disabled状态，树会根据该字段的值判断节点的样式和状态
	 *    对树进行节点的setDisabled操作时，若指定了该字段，将会同步修改该字段的值。
	 */
	 disabled:"",
	 
	//创建树唯一根节点
	createRootNodeItem : function(){
		this.treeRoot={};
		this.treeRoot["data"] = {label: this.widget.label || ""};
		this.treeRoot["data"][this.id] = this.rootNodeId;
	},
	//返回树根结点对应的数据对象
	getRootNodeItem : function(){
		return this.treeRoot;
	},
	
	/**
	 * @summary：
	 * 		根据某节点数据对象，得到对应的图标样式字段的值
	 * @param
	 *     {object}item
	 * @return
	 * 		{sring} 
	 * @description:
	 *       树在渲染节点的时候会调用该方法，以进行节点样式的确定
	 * @example:
	 * |var iconClass =  unieap.byId("basicTree").getBinding().getIconClass(node.getItem());
	 */ 
	 getIconClass:function(item){
	 	if(this.iconClass){
			return item.data[this.iconClass];
		}
	 },
	 
	 /**
	 * @summary：
	 * 		得到某节点数据对象对应的文字样式字段的值
	 * @param
	 *     {object}item
	 * @return
	 * 		{sring} 
	 * @description:
	 *      树在渲染节点的时候会调用该方法
	 * @example:
	 * |var labelClass =  unieap.byId("basicTree").getBinding().getLabelClass(node.getItem());
	 */ 
	 getLabelClass : function(item){
	 	if(this.labelClass){
			return item.data[this.labelClass];
		}
	 },
	 
	 /**
	 * @summary：
	 * 		得到某节点数据对象对应的样式字段的值
	 * @param
	 *     {object}item
	 * @return
	 * 		{sring} 
	 * 	@example:
	 * |unieap.byId("basicTree").getBinding().getLabel(node.getItem());
	 */ 
	 getLabel : function(item){
		return item.data[this.label];
	},
	

	
	/**
	 * @summary：
	 * 		根据数据对象，判断一个节点是否为叶子节点
	 * @param  
	 * 		{object} item
	 * @description:
	 *      首先根据指定的字段进行判断，若没有指定对应的字段，则根据是否有子节点的数据进行判断
	 * @example:
	 * |var leafOrNot = unieap.byId("basicTree").getBinding().isLeaf(node.getItem());
	 */ 
	 isLeaf : function(item){
	 	if(this.leaf && item.data[this.leaf]!=null){
			  return item.data[this.leaf]==true;
		}
	   if(item.children){
			return !item.children.length>0;
		}
		return this.widget.loader!=null || item==this.treeRoot ? false : true;
	 },
	 
	/**
	 * @summary：
	 * 		得到某节点数据对象对应的标识字段的值
	 * @param
	 *     {object}item
	 * @return
	 * 		{sring} 
	 * @example:
	 * |var id = unieap.byId("basicTree").getBinding().getId(node.getItem());
	 */ 
	 getId : function(item){
	 	return item.data[this.id];
	 },
	 
	 //根据指定的字段判断一个节点是不是disabled
	 isDisabledByData : function(item){
		if(this.disabled){
			return item.data[this.disabled]==true;
		}
		return false;
	}, 
	
	//若指定了标示disabled的字段，将一个节点对应的数据设置成对应的状态
	setDisabled : function(node,disabled){
		if(this.disabled){
			node.getItem().data[this.disabled] = disabled;
		}
	}
})