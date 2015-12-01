dojo.provide("unieap.tree.TreeEditor");
dojo.require("unieap.tree.Tree");
dojo.require("unieap.form.TextBox");
dojo.declare("unieap.tree.TreeEditor",null,{
	 /**
	 * @declaredClass:
	 * 		unieap.tree.TreeEditor
	 * @summary:
	 * 		树编辑的实现类
	 * @classDescription:
	 *     提供了对树的文本区域进行编辑的实现
	 *     支持编辑前后的监听
	 *     支持设置是否允许为空
	 * @example:
	 * |<div dojoType="unieap.tree.Tree" 
	 * |	id="basicTree"  animate="false" label="UniEAP" 
	 * |	treeEditor="{allowBlank:false}" 
	 * |	binding = "{'leaf':'leaf','store':treeStorePart,
	 * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	 * |</div>
	 */
	 
	/**
	 * @summary：
	 * 	     显示字段是否允许为空
	 * @type
	 * 		{boolean} 
	 * @default:
	 *      false
	 *  @description:
	 *      是否可以将编辑字段设为空字符串。
	 *      若设为false的话，在将编辑字段设置为空字符串的话，将会默认恢复为编辑前的值。
	 */
	allowBlank : false,
	
	//用于编辑节点的文本框
	_textbox : null,
	 
	 //构造函数，将会生成一个文本框
	 constructor: function(params){
        dojo.mixin(this, params);
		this._textbox = new unieap.form.TextBox({'height':'18px'});
    },
	editNode : function(node){
		//根结点不能进行编辑
		if(node&&node.isRoot()){
			this.widget._editing = false;
			return;
		}
		//调用编辑前的事件
		if(this.onBeforeEdit(node)==false){
			this.widget._editing = false;
			return;
		}
		//记录初始值，并将文本框置于原树节点所在的位置
		var initValue = this.widget.getBinding().getLabel(node.getItem());
		this.widget.getLabelNode(node.domNode).innerHTML = "";
		this.widget.getLabelNode(node.domNode).appendChild(this._textbox.domNode);
		this._textbox.setValue(initValue);
		var _this = this;
		//定义文本框的焦点离开事件
		this._textbox.onBlur = function(evt){	  
			  var label =  _this._textbox.getValue();
			  if(!label&&!_this.allowBlank){
			  	 label = initValue;
			  }
			  _this.widget.getLabelNode(node.domNode).removeChild(_this._textbox.domNode);
			  if (label != initValue) {
			  	_this.widget.getBinding().setLabel(node, label);
			  }
			  _this.widget.setLabelNode(node.domNode,label)
			   _this.widget._editing = false;
			   _this.onAfterEdit(node)
		   }
		this._textbox.focus();
	},
	
    /**
	 * @summary:
	 *       节点在编辑前触发的事件
	 * @param  node
	 *        {unieap.tree.TreeNode}
	 *  @description:
	 *        若返回false则不会进行编辑
	 *  @example:
	 * |function beforeEdit(node){ 
	 * |	return confirm("确定要进行编辑吗？"); 
	 * |} 
	 * |<div dojoType="unieap.tree.Tree" id="basicTree"  animate="false" label="UniEAP" 
	 * |	treeEditor="{allowBlank:false,onBeforeEdit:beforeEdit}" 
	 * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	 * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	 * |</div>
	 */
	onBeforeEdit : function(node){
		return true;
	},
	
	  /**
	 * @summary:
	 *       节点在编辑完成后触发的事件
	 * @param  node
	 *        {unieap.tree.TreeNode}
	 * @example:
	 * |function afterEdit(node){ 
	 * |	alert("节点"+node.getLabel()+"已经编辑完毕！"); 
	 * |}
	 * |<div dojoType="unieap.tree.Tree" id="basicTree"  animate="false" label="UniEAP" 
	 * |	treeEditor="{allowBlank:false,onAfterEdit:afterEdit}" 
	 * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	 * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	 * |</div> 
	 */
	onAfterEdit : function(node){
		
	},
	
	 destroy : function(){
	 	this._textbox.destroy();
	 }
	
})
