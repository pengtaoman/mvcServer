/*
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */

if(Ext.dd.DragZone){
Ext.tree.TreeDragZone = function(tree, config){
    Ext.tree.TreeDragZone.superclass.constructor.call(this, tree.getTreeEl(), config);
    this.tree = tree;
};

Ext.extend(Ext.tree.TreeDragZone, Ext.dd.DragZone, {
    ddGroup : "TreeDD",
    
    onBeforeDrag : function(data, e){
        var n = data.node;
        return n && n.draggable && !n.disabled;
    },
    onDrag : function(e){
   		var data = this.dragData;
   		var nodeType=data.node.attributes.nodeType;
   		var flag=this.proxy.dropNotAllowed;
   		if(nodeType=="role"||nodeType=="person"){
   			if(e.target.id=="select2"&&flag!="x-dd-drop-ok"){
        		this.proxy.dropNotAllowed="x-dd-drop-ok";
        		this.proxy.setStatus("x-dd-drop-ok");
       		}else if(e.target.id!="select2"&&flag=="x-dd-drop-ok"){
   		  		this.proxy.dropNotAllowed="x-dd-drop-nodrop";
          		this.proxy.setStatus("x-dd-drop-nodrop");
   			}else{
   		}
   		}
   },
    onInitDrag : function(e){
        var data = this.dragData;
        this.tree.getSelectionModel().select(data.node);
        this.proxy.update("");
        data.ddel.className="x-tree-node-leaf";
        data.node.ui.appendDDGhost(this.proxy.ghost.dom);
        this.proxy.setStatus("x-dd-drop-nodrop");
        this.tree.fireEvent("startdrag", this.tree, data.node, e);
    },
    
    getRepairXY : function(e, data){
        return data.node.ui.getDDRepairXY();
    },
    
    onEndDrag : function(data, e){
        if(e.target.id=="select2"){
        	var id=data.node.attributes.id;
        	var text=data.node.attributes.text;
        	var nodeType=data.node.attributes.nodeType;
        	
        		if(nodeType=="role"){
        			id=id+"|1";
        			if(checkAdd(id))  document.getElementById("select2").options.add(new Option(text,id));
        		}else if(nodeType=="person"){
        		 	id=id+"|0";
        		 	if(checkAdd(id))  document.getElementById("select2").options.add(new Option(text,id));
        		}else{
        		}
        }
       this.tree.fireEvent("enddrag", this.tree, data.node, e);
    },
    
    onValidDrop : function(dd, e, id){
        this.tree.fireEvent("dragdrop", this.tree, this.dragData.node, dd, e);
        this.hideProxy();
    },
    
    beforeInvalidDrop : function(e, id){
        // this scrolls the original position back into view
        var sm = this.tree.getSelectionModel();
        sm.clearSelections();
        sm.select(this.dragData.node);
    }
});
}