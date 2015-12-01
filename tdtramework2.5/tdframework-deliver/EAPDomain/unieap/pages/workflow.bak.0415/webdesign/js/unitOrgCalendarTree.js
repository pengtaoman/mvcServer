//return role and person information 
var unit;
var role;
var roleid;
var person;
var personid;
var roleType;
var personType;

function roleNode(){
	return role;
}

function roleId(){
	return roleid;
}

function personNode(){
	return person;
}

function personId(){
	return personid;
}

function roleType(){
	return roleType;
}

function personType(){
	return personType;
}
Ext.onReady(function(){
	var WEB_APP_NAME=document.getElementById("path").value
	Ext.BLANK_IMAGE_URL = WEB_APP_NAME+'/unieap/pages/workflow/webdesign/ext-1.1.1/resources/images/shared/s.gif';
	Ext.QuickTips.init(); 
	var xt = Ext.tree;
	var leftTreePanel = new xt.TreePanel('leftTreePanel', {
		animate:false,
       // enableDD:true,
        containerScroll: true,
        enableDrag: true,
        loader: new xt.TreeLoader({dataUrl:WEB_APP_NAME+'/OrgCalendarTree.do',
       							   baseParams:{'nodeType':'root','id':'root'}}),
		rootVisible: true
    });
    var leftTreeRootNode = new xt.AsyncTreeNode({
        text:'组织结构',
        iconCls:'unitroot',
        allowDrag:"true",
        allowDrop:"false",              
        id:'system'
    });
    leftTreePanel.setRootNode(leftTreeRootNode);
    leftTreePanel.render();
    leftTreeRootNode.expand();
	selected_onclick("system");
	
    leftTreePanel.loader.on("beforeload", function(treeLoader, node) {  	
	    	var nodeType = node.attributes.nodeType 
	        treeLoader.baseParams.nodeType = nodeType;
	        treeLoader.baseParams.id = node.attributes.id;
	        
	    });
	var selectModel = leftTreePanel.getSelectionModel();
 	leftTreePanel.on("click",function(){
	var node = selectModel.getSelectedNode();
	var id = node.attributes.id;
	selected_onclick(id);

	});	
});	

function getSelectList(node,id){

}