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
	var WEB_APP_NAME = window.opener.document.manualNodeForm.path.value;
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
        id:'source'
    });
    	leftTreePanel.on("enddrag",function(){
	this.dragZone.onEndDrag=function(data, e){      
        if(e.target.id=="select2"){
        	var id=data.node.attributes.id;
        	var text=data.node.attributes.text;
        	var nodeType=data.node.attributes.nodeType;
        	if(nodeType!=="unit"){
        		if(nodeType=="role"){
        			id=id+"|1";
        		}else{
        		 	id=id+"|0";
        		}
        		if(checkAdd(id))  
            	document.getElementById("select2").options.add(new Option(text,id));
        	}
        }
        this.tree.fireEvent("enddrag", this.tree, data.node, e);
   };
    });
    leftTreePanel.setRootNode(leftTreeRootNode);
    leftTreePanel.render();
    leftTreeRootNode.expand();

    leftTreePanel.loader.on("beforeload", function(treeLoader, node) {
    		document.getElementById("select1").options.length=0;    	
	    	var nodeType = node.attributes.nodeType 
	        treeLoader.baseParams.nodeType = nodeType;
	        treeLoader.baseParams.id = node.attributes.id;

	        node.select();
	    });
	//left tree select node
	var selectModel = leftTreePanel.getSelectionModel();
 	leftTreePanel.on("click",function(){
	var node = selectModel.getSelectedNode();
	var id = node.attributes.id;
    getSelectList(node,id);
	});	
});	
function checkSelect1Option(id){
	var obj=document.getElementById("select1")
	for(i=0;i<obj.length;i++){
		if(obj[i].value==id){
			return false;
		}
	}
}
function getSelectList(node,id){
	var childNodeArray=node.childNodes;
	var childNodeLength=childNodeArray.length;
	var type = node.attributes.nodeType;
	var text = node.attributes.text;
	if(id=='source'){
	return false;
	} 
	deleteAll("select1");
	if(type!="unit"){
		if(type=="role"){
			roleid = id;
			role = text;
			//if(checkSelect1Option(roleid+"|1")==false)  return ;
			var oNewNode = document.createElement("option");
			document.getElementById("select1").appendChild(oNewNode);
			oNewNode.innerHTML=role;
			oNewNode.value = roleid+"|1";
			
		}else{
			personid = id;
			person = text;
			//if(checkSelect1Option(personid+"|0")==false) return false;
			var oNewNode = document.createElement("option");
			document.getElementById("select1").appendChild(oNewNode);
			oNewNode.innerHTML=person;
			oNewNode.value=personid+"|0";
		}
	}
	if(childNodeLength!=0){
		for(i=0;i<childNodeLength;i++){
			var childNode = childNodeArray[i];
			var childType =  childNode.attributes.nodeType;
			var childId = childNode.attributes.id;
			var childText = childNode.attributes.text;
			if(id=='source'){
			return ;
			} 
		if(childType!="unit"){
			if(childType=="role"){
				roleid = childId;
				role = childText;
				//if(checkSelect1Option(roleid+"|1")==false)  return ;
				var oNewNode = document.createElement("option");
				document.getElementById("select1").appendChild(oNewNode);
				oNewNode.innerHTML=role;
				oNewNode.value = roleid+"|1";
			}else{
				personid = childId;
				person = childText;
				//if(checkSelect1Option(personid+"|0")==false) return false;
				var oNewNode = document.createElement("option");
				document.getElementById("select1").appendChild(oNewNode);
				oNewNode.innerHTML=person;
				oNewNode.value=personid+"|0";
			}
		}
	}
}
}
function checkSelect2Option(id){
	var obj=document.getElementById("select2")
	for(i=0;i<obj.length;i++){
		if(obj[i].value==id){
			return false;
		}
	}
}      
//Add text to select2 
function addSelect2Text(id){
	var obj=document.getElementById(id);
	var optionText="";
	var optionValue=""
	var obj1=document.getElementById('select2'); 
	for(i=0;i<obj.length;i++){
		if(obj[i].selected==true){
			optionText=obj[i].text;
			optionValue=obj[i].value;
			obj[i].selected=false;
            if(checkAdd(optionValue))  
            	obj1.options.add(new Option(optionText,optionValue));
		}
	}
}

//Check value is not the same
function checkAdd(optionValue)
{
    var obj1=document.getElementById('select2');
    if(obj1.options.length==0){return true}
        else{ 
            for(i=0;i<obj1.length;i++){
                if(obj1[i].value==optionValue)
                return false;    
        }
        return true;
    }
}

//remove the select2's value
function removeSelect2Value(id){
   var obj=document.getElementById(id);
   for(i=obj.length-1;i>=0;i--){
		if(obj[i].selected==true){
		    obj.removeChild(obj[i])
		}
	}

}

//Delete all select2's value
function deleteAll(id){
	var obj= document.getElementById(id);
		for(i=obj.length-1;i>=0;i--){
		    obj.removeChild(obj[i])
	}
}

//Add all select1's value to select2
function addAll(id){
	var obj=document.getElementById(id);
	var optionText="";
	var optionValue=""
	for(b=0;b<obj.length;b++){
		optionText=obj[b].text; 
		optionValue=obj[b].value;
		obj[b].selected=false;
		if(checkAdd(optionValue)==true){ 
			document.getElementById("select2").options.add(new Option(optionText,optionValue)); 
			}
	}
}

//Commit the value to the parent page
function commitValue(){
var unitValue = "";
var unit = "";
var person="";
var personid="";


window.opener.document.manualNodeForm.opertionLevel.value = getRadioValue("OpertionLevel");
window.opener.document.manualNodeForm.assignRule.value = getRadioValue("AssignRule");
var obj = document.getElementById("select2");
	for(var i=0;i<obj.length;i++){
		var selText = obj[i].innerHTML;
		var selValue = obj[i].value;
		unitValue = selText+","+selValue+";";
		unit += unitValue;
	}

   var cust_all = unit.split(";");
   for(var i=0;i<cust_all.length;i++){
	   var cust_text = cust_all[i].split(",")
	   var utext = cust_text[1];
	   var uvalue = cust_text[0];
	   if(utext!=undefined&&uvalue!=""){
	   		person += uvalue+";";
	   		personid += utext+";";
	   }
   }	
   
   //  add by ly_liuy@neusoft.com 2010-5-21
   //  show predefine info
   	var predefine="";
    var def_all = document.getElementsByName('define');
    
   	for(var i=0;i<def_all.length;i++){
		if(def_all[i].checked){
			predefine += def_all[i].value+";";
		}
	}

	
	// show variableName
	var str=window.opener.document.getElementById("nodeVariables").value;
	var variables=str.split(";");
	var variableName="";
	for(i=0;i<variables.length-1;i++){
		if(document.getElementById(variables[i].split(",")[0]).checked){
			variableName+=variables[i].split(",")[1]+';';
		}
		//
	}


	//show nodeName
	var nodes = window.opener.document.getElementById("manualNode");
	var str=window.opener.document.getElementById("manualNode").value;
	var node=str.split(";");
	var nodeName='';
	for(i=0;i<node.length-1;i++){
		if(document.getElementById(node[i].split(",")[0]).checked){
			nodeName+=node[i].split(",")[1]+';';
		}
				
	}	

	//==================================================
  
   	  var cType=window.opener.document.getElementById("cType");
   	  var lastPer = person.lastIndexOf(";");
   	  var lastpid = personid.lastIndexOf(";");
   	  var lastunit = unit.lastIndexOf(";");

		//person = person.substring(0,lastPer);
		personid = personid.substring(0,lastpid);
		unit = unit.substring(0,lastunit);

		if(cType.value=="1"){
		window.opener.document.getElementById('primaryPerson').value=person+predefine+variableName+nodeName;
		window.opener.document.getElementById('punit').value = unit;
		window.opener.document.manualNodeForm.primaryPeople.value = personid;
		window.opener.document.manualNodeForm.primaryPreDefine.value=getDef();
		//alert(window.opener.document.manualNodeForm.primaryAllName);
		
		
		}else{
	
		window.opener.document.getElementById('minorPerson').value=person+predefine+variableName+nodeName;
		window.opener.document.getElementById('munit').value = unit;
		window.opener.document.manualNodeForm.minorPeople.value = personid;
		window.opener.document.manualNodeForm.minorPreDefine.value=getDef();
		//window.opener.document.manualNodeForm.minorAllName.value = person+";"+predefine+variableName+nodeName;
		}
		//alert(2);
	    commitVariable();
		commitNode();
		//alert(3);
}
function getRadioValue(name){
	var names=document.getElementsByName(name);
		for(i=0;i<names.length;i++){
			if(names[i].checked==true){
				return names[i].value;
			}
		}
}
function getDef(){
	var def=document.getElementsByName("define")
	var defString=""
	for(i=0;i<def.length;i++){
		if(def[i].checked==true){
		defString+=def[i].id+";";
	}
	
}
return defString;
}
function getLayoutHeight(){
	var initHeight=210;
	if(document.body.clientHeight>600){
			initHeight=400;
	}
	return initHeight;
}
//Add Value To Select
function AddValueToSelect(){
	createNodeSelect();
	creatVariableSelect();
	if(document.all){
		document.getElementById("select1").size="15";
		document.getElementById("select2").size="15";
	}else{
		document.getElementById("select1").style.height="220px";
		document.getElementById("select2").style.height="220px";
	}
	var cType=window.opener.document.getElementById("cType");
	if(cType.value=="1"){

	var def = window.opener.document.manualNodeForm.primaryPreDefine.value;
	var def_all = def.split(";");
	for(var i=0;i<def_all.length;i++){
		if(def_all[i]=="2"){
			document.getElementById('2').checked = true
		}
		if(def_all[i]=="3"){
			document.getElementById('3').checked = true
		}
		if(def_all[i]=="4"){
			document.getElementById('4').checked = true
		}
		if(def_all[i]=="5"){
			document.getElementById('5').checked = true
		}
	}
	var unitValue = window.opener.document.getElementById('punit').value;
	if(unitValue!=""){
		var cust_all = unitValue.split(";");
   		for(var i=0;i<cust_all.length;i++){
		   var cust_text = cust_all[i].split(",")
		   var utext = cust_text[1];
		   var uvalue = cust_text[0];
	   	   if(utext!=undefined&&uvalue!=""){
		   		document.getElementById("select2").options.add(new Option(uvalue,utext)); 
	   		}
   		}	
		}
	}else if(cType.value=="0"){
	
	var def = window.opener.document.manualNodeForm.minorPreDefine.value;
	var def_all = def.split(";");
	for(var i=0;i<def_all.length;i++){
		if(def_all[i]=="2"){
			document.getElementById('2').checked = true
		}
		if(def_all[i]=="3"){
			document.getElementById('3').checked = true
		}
		if(def_all[i]=="4"){
			document.getElementById('4').checked = true
		}
		if(def_all[i]=="5"){
			document.getElementById('5').checked = true
		}
	}
	var unitValue = window.opener.document.getElementById('munit').value;
	if(unitValue!=""){
		var cust_all = unitValue.split(";");
   		for(var i=0;i<cust_all.length;i++){
		   var cust_text = cust_all[i].split(",")
		   var utext = cust_text[1];
		   var uvalue = cust_text[0];
	   	   if(utext!=undefined&&uvalue!=""){
		   		document.getElementById("select2").options.add(new Option(uvalue,utext)); 
	   		}
   		}	
		}
	}
	showVariable();
	showNodeArrary();
}

//Add Value To Proc Select
function AddValueToProcSelect(){
	var unitValue = window.opener.document.getElementById('munit').value;
	if(unitValue!=""){
		var cust_all = unitValue.split(";");
   		for(var i=0;i<cust_all.length;i++){
		   var cust_text = cust_all[i].split(",")
		   var utext = cust_text[1];
		   var uvalue = cust_text[0];
	   	   if(utext!=undefined&&uvalue!=""){
		   		document.getElementById("select2").options.add(new Option(uvalue,utext)); 
	   		}
   		}	
		}
}

//Commit the value to the parent process page
function commitProcessValue(){
var unitValue = "";
var unit = "";
var person="";
var personid="";
var obj = document.getElementById("select2");
	for(var i=0;i<obj.length;i++){
		var selText = obj[i].innerHTML;
		var selValue = obj[i].value;
		unitValue = selText+","+selValue+";";
		unit += unitValue;
	}

   var cust_all = unit.split(";");
   for(var i=0;i<cust_all.length;i++){
	   var cust_text = cust_all[i].split(",")
	   var utext = cust_text[1];
	   var uvalue = cust_text[0];
	   if(utext!=undefined&&uvalue!=""){
	   		person += uvalue+";";
	   		personid += utext+";";
	   }
   }	
   	  var cType=document.getElementById("cType");
   	  var lastPer = person.lastIndexOf(";");
   	  var lastpid = personid.lastIndexOf(";");
   	  var lastunit = unit.lastIndexOf(";");

		//send value
		person = person.substring(0,lastPer);
		window.opener.document.getElementById('monitor').value=person;
		personid = personid.substring(0,lastpid);
		window.opener.document.procForm.monitors.value = personid;
		unit = unit.substring(0,lastunit);
		window.opener.document.getElementById('munit').value = unit;
	}
function showNodeArrary(){
    var cType=window.opener.document.getElementById("cType").value;
     var nodeArraryString="";
    if(cType=="1"){
        nodeArraryString=window.opener.document.manualNodeForm.nodeArraryString.value;
    }else{
        nodeArraryString=window.opener.document.manualNodeForm.minorNodeArraryString.value;
    }
    if(nodeArraryString==""){
    }else{
        var nodeArrary=document.getElementsByName("node")
        for(i=0;i<nodeArrary.length;i++){
            if(nodeArraryString.indexOf(nodeArrary[i].id)!=-1){
                nodeArrary[i].checked=true;
            }
        }
    }
}
function showVariable(){
    var nodeArraryString="";
    var cType=window.opener.document.getElementById("cType").value;
    if(cType=="1"){
        nodeArraryString=window.opener.document.manualNodeForm.variablesString.value;
    }else{
       nodeArraryString=window.opener.document.manualNodeForm.minorVariablesString.value; 
    }
    if(nodeArraryString==""){
    }else{
        var nodeArrary=document.getElementsByName("manualNodeVariables")
        for(i=0;i<nodeArrary.length;i++){
            if(nodeArraryString.indexOf(nodeArrary[i].id)!=-1){
                nodeArrary[i].checked=true;
            }
        }
    }
}
function commitVariable(){
    var variableSring="";
    var cType=window.opener.document.getElementById("cType").value;
    var nodeArrary=document.getElementsByName("manualNodeVariables")
     for(i=0;i<nodeArrary.length;i++){
            if(nodeArrary[i].checked==true){
                variableSring+=nodeArrary[i].id+";";
             }
        }
     if(cType=="1"){
      window.opener.document.manualNodeForm.variablesString.value=variableSring;
     }else{
      window.opener.document.manualNodeForm.minorVariablesString.value=variableSring;
     }
}
function commitNode(){
    var variableSring="";
    var cType=window.opener.document.getElementById("cType").value;
    var nodeArrary=document.getElementsByName("node")
     for(i=0;i<nodeArrary.length;i++){
            if(nodeArrary[i].checked==true){
                variableSring+=nodeArrary[i].id+";";
            }
        }
    if(cType=="1"){
        window.opener.document.manualNodeForm.nodeArraryString.value=variableSring;
    }else{
        window.opener.document.manualNodeForm.minorNodeArraryString.value=variableSring;
    }
      
}
function createNodeSelect(){
	var str=window.opener.document.getElementById("manualNode").value;

	var node=str.split(";");
	var str1='<table>';
	for(i=0;i<node.length-1;i++){
			str1=str1+'<tr><td> <input type="checkbox" name="node" id='+'"'+node[i].split(",")[0]+'"'+'/></td><td>'+node[i].split(",")[1]+'</td><tr>';
				
	}
	str1=str1+'</table>'

	document.getElementById("selectNode").innerHTML=str1;
	
	
}
function creatVariableSelect(){
	
		var str=window.opener.document.getElementById("nodeVariables").value;
		var variables=str.split(";");
			var str1='<table>';
		for(i=0;i<variables.length-1;i++){
			str1=str1+'<tr><td> <input type="checkbox" name="manualNodeVariables" id='+'"'+variables[i].split(",")[0]+'"'+'/></td><td>'+variables[i].split(",")[1]+'</td><tr>';
				
	}
	str1=str1+'</table>'

	document.getElementById("selectVariable").innerHTML=str1;

}      