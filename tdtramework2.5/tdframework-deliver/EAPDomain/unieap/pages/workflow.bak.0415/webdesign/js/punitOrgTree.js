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
	var WEB_APP_NAME = window.opener.document.procForm.path.value;
	Ext.BLANK_IMAGE_URL = WEB_APP_NAME+'/unieap/pages/workflow/webdesign/ext-1.1.1/resources/images/shared/s.gif';
	Ext.QuickTips.init(); 
	var xt = Ext.tree;


	var leftTreePanel = new xt.TreePanel('pleftTreePanel', {
		animate:false,
       // enableDD:true,
        containerScroll: true,
        enableDrag: true,
        loader: new xt.TreeLoader({dataUrl:WEB_APP_NAME+'/unitOrgTree.do',
       							   baseParams:{'nodeType':'root','id':'root'}}),
		rootVisible: true
    });

    var leftTreeRootNode = new xt.AsyncTreeNode({
        text: '组织机构',
        iconCls:'unitroot',
         allowDrag:"true",
        allowDrop:"false",                
        id:'source'
    });
    leftTreePanel.setRootNode(leftTreeRootNode);
    leftTreePanel.render();
    leftTreeRootNode.expand();

    leftTreePanel.loader.on("beforeload", function(treeLoader, node) {
   			document.getElementById("select1").options.length=0   	
	    	var nodeType = node.attributes.nodeType 
	        treeLoader.baseParams.nodeType = nodeType;
	        treeLoader.baseParams.id = node.attributes.id;
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
function getSelectList(node,id){
	var childNodeArray=node.childNodes;
	var childNodeLength=childNodeArray.length;
	var type = node.attributes.nodeType;
	var text = node.attributes.text;
	if(id=='source'){
	return false;
	} 
	deleteAll("select1");
	//document.getElementById("select1").options.length=0;	
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
		if(checkAdd(optionValue)==true) 
			document.getElementById("select2").options.add(new Option(optionText,optionValue)); 
	}
}

//Commit the value to the parent page
function commitValue(){
var unitValue = "";
var unit = "";
var person="";
var personid="";
//var defineValue = getCheckBoxValue('define');
//var defineText = getCheckBoxText('define');
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
   	  var cType=window.opener.document.getElementById("cType");
   	  //var lastDef = defineValue.lastIndexOf(";");
   	  //defineValue = defineValue.substring(0,lastDef);
   	  var lastPer = person.lastIndexOf(";");
   	  var lastpid = personid.lastIndexOf(";");
   	  var lastunit = unit.lastIndexOf(";");
		//send value
		person = person.substring(0,lastPer);
		//window.opener.document.getElementById('primaryPerson').value=defineText+person;
		window.opener.document.getElementById('primaryPerson').value=person;
		//window.opener.document.manualNodeForm.primaryPreDefine.value=defineValue;
		personid = personid.substring(0,lastpid);
		window.opener.document.getElementById('tempId').value = personid;
		unit = unit.substring(0,lastunit);
		window.opener.document.getElementById('unit').value = unit;
}

//Get the checkBox's value
function getCheckBoxValue(name){
    var names = document.getElementsByName(name);
    var checkBoxValue="";
    for(i=0;i<names.length;i++){
      if(names[i].checked==true){
        var checkValue=names[i].id;
      	checkBoxValue=checkBoxValue+checkValue+";";
      }else{
      	//checkBoxValue=checkBoxValue+checkValue+";";
      }
       
    }
	return checkBoxValue;
}  

//Get the checkBox's text
function getCheckBoxText(name){
    var names = document.getElementsByName(name);
    var checkBoxText="";
    for(i=0;i<names.length;i++){
      if(names[i].checked==true){
        var checkText=names[i].value;
      	checkBoxText=checkBoxText+checkText+";";
      }else{
      	//checkBoxValue=checkBoxValue+checkValue+";";
      }
       
    }
	return checkBoxText;
}  

//Add Value To Select
function AddValueToSelect(){
	var cType=window.opener.document.getElementById("cType");
	if(cType.value=="0"){
	/*
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
	}*/
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
	}else if(cType.value=="1"){
	/*
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
	}*/
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
}

//Add Value To Proc Select
function AddValueToProcSelect(){
	var unitValue
	if(document.all){
		document.getElementById("select1").size="24";
		document.getElementById("select2").size="24";
	}else{
		document.getElementById("select1").style.height="360px";
		document.getElementById("select2").style.height="360px";
	}
	if(window.opener.document.getElementById('cType').value=="0"){
		unitValue = window.opener.document.getElementById('munit').value;
	}else{
		unitValue = window.opener.document.getElementById('punit').value;
	}
	
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
		personid = personid.substring(0,lastpid);
		unit = unit.substring(0,lastunit);
		if(window.opener.document.getElementById('cType').value=="0"){
			window.opener.document.getElementById('monitor').value=person;
			window.opener.document.procForm.monitors.value = personid;
			window.opener.document.getElementById('munit').value = unit;
		}else{
			window.opener.document.getElementById('validCreator').value=person;
			window.opener.document.procForm.validCreators.value = personid;
			window.opener.document.getElementById('punit').value = unit;
		}

	}