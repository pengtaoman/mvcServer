//return role and person information 
var unit;
var role;
var roleid;
var person;
var personid;
var roleType;
var personType;
var selectName;
var selectType;
var selectId;
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
	var WEB_APP_NAME = window.opener.document.getElementById('path').value;

	Ext.BLANK_IMAGE_URL = WEB_APP_NAME+'/unieap/pages/workflow/webdesign/ext-1.1.1/resources/images/shared/s.gif';
	Ext.QuickTips.init(); 
	var xt = Ext.tree;


	var leftTreePanel = new xt.TreePanel('leftTreePanel', {
		animate:false,
       // enableDD:true,
        containerScroll: true,
        enableDrag: true,
        loader: new xt.TreeLoader({dataUrl:WEB_APP_NAME+'/unitOrgTree.do',
       							   baseParams:{'nodeType':'root','id':'root'}}),
		rootVisible: true
    });
    var leftTreeRootNode = new xt.AsyncTreeNode({
        text:'组织机构',
        iconCls:'unitroot',
        allowDrag:"true",
        allowDrop:"false", 
        checked:"true",             
        id:'source'
    });

    leftTreePanel.setRootNode(leftTreeRootNode);
    leftTreePanel.render();
    leftTreeRootNode.expand();

    leftTreePanel.loader.on("beforeload", function(treeLoader, node) {
    		//document.getElementById("select1").options.length=0;    	
	    	var nodeType = node.attributes.nodeType 
	        treeLoader.baseParams.nodeType = nodeType;
	        treeLoader.baseParams.id = node.attributes.id;
	    });
	//left tree select node
	var selectModel = leftTreePanel.getSelectionModel();
 	leftTreePanel.on("click",function(){
	var node = selectModel.getSelectedNode();
	var id = node.attributes.id;
   	 	selectId =node.attributes.id;
	 	selectType=node.attributes.nodeType;
	 	selectName=node.attributes.text;
	
	});	
});	

function getSelectList(node,id){

}
function trim(str){ 
  return str.replace(/\s/g, ""); 
}
function ok_onclick(){
	if(selectType=="person"){
		opener.assigneeType=selectType
		opener.assigneeName=selectName;
		opener.assigneeId=selectId;
	var textfalg=opener.openfalg;
		opener.set_textvalue(textfalg);
		window.close();
		
	}else{
		var flag=opener.openfalg;
		if(trim(flag)=="assigner"){
			alert("请重新选择业务指派人")
		}else{
			alert("请重新选择业务代理人")
		}
		
	}
}     