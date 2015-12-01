dojo.provide("unieap.tree.JsonTreeBinding");
dojo.require("unieap.tree.Tree");
dojo.require("unieap.tree.TreeBinding");
dojo.declare("unieap.tree.JsonTreeBinding", unieap.tree.TreeBinding, {
	 /**
	 * @declaredClass:
	 * 		unieap.tree.JsonTreeBinding
	 * @summary:
	 * 		树绑定JSON数据的实现类
	 * @classDescription:
	 *     对JSON结构的数据，提供了对树的支持
	 *     支持数据懒加载
	 * @superClass
	 *        unieap.tree.TreeBinding
	 * @example:
	 * |	<div dojoType="unieap.tree.Tree" 
	 * |		id="checkTree" 
	 * |		label="UniEAP" 
	 * |		binding="{bindingClass :'unieap.tree.JsonTreeBinding',
	 * |		'leaf':'leaf',' 
	 * |		jsonData':jsondata, 
	 * |		'label':'text', 
	 * |		'id':'text'}">
	 * |	</div>
	 */

    /**
     * @summary：
     * 		指定树数据的字符串
     * @type
     * 		{string}
     * @description:
     *      数据格式为字符串，转换成JavaScript对象后，是一个数组形式的数据，包含了数据间的层次关系
     * @example:
     * |	"[{data:{id:'01',text:'01'},children:[
     * |		{data:{text:'01-01',leaf:true}},
     * |		{data:{text:'01-02'},children:[
     * |			{data:{text:'01-02-01',leaf:true}},
     * |			{data:{text:'01-02-02',leaf:true}}
     * |		]},
     * |		{data:{text:'01-03',leaf:true}}
     * |		]},
     * |	{data:{text:'02',leaf:true}},
     * |	{data:{text:'03',leaf:true}}
     * |	]"	
     * 以上为一个典型的JSON格式的树要求的数据结构
     */
    jsonData: "",
    
    constructor: function(params){
        dojo.mixin(this, params);
        this.createRootNodeItem();
        if(this.jsonData){
        	this._treeData = dojo.isString(this.jsonData) && dojo.fromJson(this.jsonData) || this.jsonData;
        	this.getRootNodeItem()[this.children] = this._treeData;
        	this.getRootNodeItem().loaded = true;
        }
		this.widget.afterLoad = dojo.hitch(this,"afterLoad");
		
    },
    
    afterLoad : function(){
		
	},
    
    /**
    * @summary:
    *       得到节点的子节点对应的数据
    * @param {object} item
    * @param {function} callback
    * @description:
    *       根据一个item，得到其子节点对应的数据对象组成的数组，并执行回调函数，回调函数的参数即为得到的items
    * @example:
    * |	var node = unieap.byId("basicTree").getCurrentNode();
    * |	unieap.byId("basicTree").getBinding().getChildren(node.getItem(),function(items){unieap.debug(items)});
    */
    getChildren: function(item, callback){
        callback = callback ||function(){};
        if (item.loaded) {
            callback(item[this.children]);
            return;
        }
        item.loaded = true;
        if (this.isLeaf(item)) {
            callback(null);
            return
        }
        if (this.doPreLoad(item)) 
            callback(this.doPreLoad(item));
        else  if (this.widget.loader) {
                var loader = this.widget.getLoader();
                var _this = this;
                var onComplete = function(res){
                    item[_this.children] = res || [];
                    callback(res,false);
                }
                loader.load(item, onComplete);
            }
            else 
                callback(null);
    },
    
    //在执行TreeLoader的load方法前，先在已有的数据中进行查询，得到子节点的数据对象数组
    doPreLoad: function(item){
        var childItems;
        if(item==this.treeRoot&&this.jsonData){
			childItems =this._treeData;
		}else{
			childItems = item[this.children];
		}
		return childItems;
    },
    
	
	//将传递过来的item设置选中或非选中状态
	setSelected : function(item,checked){
		item.isChecked = checked;
	},
	
	//返回item是否选中
	isSelected : function(item){
		return item.isChecked==true;
	},
	
	/**
	 * @summary：
	 * 		设置某节点数据对象对应的显示字段的值
	 * @param  
	 *     {unieap.tree.TreeNode}node
	 * @param  
	 * 		{sring} label
	 * @example:
	 * |	var treeNode = checkTree.getCurrentNode(); 
	 * |	checkTree.getBinding().setLabel(treeNode,"newLabel"); 
	 */ 
	 setLabel : function(node,label){
	    if(!node||node.isRoot()){
			return ;
		}
		var item = node.getItem();
		 item.data[this.label] = label;
		 this.widget.fireDataChange(node);
	},
	
	 /**
     * @summary：
     * 		得到树对应的数据对象
     * @return
     * 		{array}
     * @description:
     *       树的数据经过编辑或者增删节点，可能已于初始设置的jsonData不同
     * @example:
     * |	var treeData = checkTree.getBinding().getData(); 
     * |	unieap.debug(treeData); 
     * @img:
	 *    images/tree/getData.png
     */
	getData : function(){
		var result = [],
		    children = this.getRootNodeItem()[this.children] || [];
		for(var i=0,l=children.length;i<l;i++){
			result.push(this._addContent(children[i]));
		}
		return result;		
	},
	
	
	_addContent : function(item){
		var newItem = {};
		newItem["data"] = item.data;
		if(item.children){
			newItem["children"] = [];
			for(var i=0,l=item.children.length;i<l;i++){
				newItem["children"].push(this._addContent(item.children[i])); 
			}
		}
		return newItem;
	},
	// 增加一条数据
	addItem : function(data,parentItem){
		var newItem ={};
		var brothersItems = parentItem.children;
		if(brothersItems){
			newItem = {data:data} 
			brothersItems.push(newItem);
		}else{
			newItem = {data:data} 
			parentItem.children = [];
			parentItem.children.push(newItem);
		    if(this.leaf){
			    parentItem.data[this.leaf]=false;
		     }
		}
		return newItem;
	},
	//删除一条数据
	deleteItem : function(item,parentItem){
		var brotherItems = parentItem[this.children];
		for(var i=0;i<brotherItems.length;i++){
			if(brotherItems[i]==item){
				brotherItems.splice(i,1)
				break;
			}
		}
	},
	refresh : function(item){
		
	}
});