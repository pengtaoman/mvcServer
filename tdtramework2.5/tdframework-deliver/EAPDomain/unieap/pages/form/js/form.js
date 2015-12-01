var xmlDoc;
var funcDoc;
var xslDoc;

//the num of shotsnap
var snapNum = 3;

//privilege data
var prvDoc;

var tempDoc = new ActiveXObject("MSXML2.DOMDocument");

var NSForm = {
	/**
	 * Set element value and update it's model.
	 *
	 */
	setElementValue:function (elementName,value){
		var element = document.getElementsByName(elementName)[0];
		element.value = value;
		
		if("calendar"==element.type){			
			setValue(element.parentNode,element.getAttribute("xpath"),1);
		}else{
			setValue(element,element.getAttribute("xpath"),1);
		}
		
	},
	/**
	 * Get element value.
	 *
	 */
	getElementValue:function (elementName){
		var element = document.getElementsByName(elementName)[0];
		var node = xmlDoc.selectSingleNode(element.getAttribute("xpath"));//ref
		if(!node)
			return;
		return node.text;
	},
	setElementVisible:function(elementName,visible){
		var element = document.getElementsByName(elementName)[0];
		var type = element.getAttribute("type");
		var display ;
		if(visible){
			display = "visible";
		}else{ 
			display = "hidden";
		}
		if("checkbox"==type||"radio"==type){
			element.parentNode.style.visibility = display;
		}else{
			element.style.visibility = display;
		}
		
	},
	setElementEditable:function(elementName,editable){
		var element = document.getElementsByName(elementName)[0];
		
		var type = element.getAttribute("type");
		if("DIV"==element.tagName){
			var datatable = getFormObjectByName(elementName);
			datatable.setDTEditable(editable);
		}else{
			
			if("button"==type){
				element.disabled = !editable;
			}else
			if("calendar"==type){
				var cal = getFormCalendar(elementName);
				cal.setCalEditable(editable);
			}else
			if("radio"==type){
				var radios = document.getElementsByName(elementName);
				//alert(elementName);
				for(var i=0;i<radios.length;i++){
					//alert(radios[i].outerHTML);
					radios[i].disabled = !editable; 
				}
				//element.disabled = !editable;
			}
			element.disabled = !editable;
			
			var xpath = element.getAttribute("xpath");			
			if(!xpath || xpath==""){				
				return;
			}
			if(xpath.indexOf("record/")>-1){
				elementName = element.parentNode.parentNode.parentNode.id;
				var datatable = getFormObjectByName(elementName);
				datatable.setDTEditable(editable);
				//alert(!editable);
				element.disabled = editable;
			}
		}
	},
	setCmdMenuEditable:function(type){ 
	   var div = document.getElementById("f_cmd_div_left");
	   var tds = div.getElementsByTagName("TD");
	   for(var i=0;i<tds.length;i++){
	   		if(tds[i].type==type){
	   			tds[i].style.backgroundImage="url("+tds[i].icon+")";
	   			tds[i].disabled = false;
	   			break;
	   		}
	   }
	},
	setCmdMenuDefaultPrv:function(){ 
		var div = document.getElementById("f_cmd_div_left");
	    var tds = div.getElementsByTagName("TD");
	    for(var i=0;i<tds.length;i++){
	    	   if(tds[i].type=="validate"){
	    	   		continue;
	    	   }
	    	   tds[i].style.backgroundImage="url("+tds[i].nav_icon+")";
   			   tds[i].disabled = true;
	    }
	}
};

function transform(){
	

	if(!xslDoc){
		xslDoc = new ActiveXObject("MSXML2.DOMDocument");
		xslDoc.async = false;
		xslDoc.load($form_template_cache+"/view.xsl");
		if(xslDoc){
		    
			xslDoc.selectSingleNode("//xsl:param[@name='prvdata_path']/@select").value = "'"+$form_private_cache+"'"; 
			xslDoc.selectSingleNode("//xsl:param[@name='pubdata_path']/@select").value = "'"+$form_pub_cache+"'"; 
			xslDoc.selectSingleNode("//xsl:param[@name='template_path']/@select").value = "'"+ $form_template_cache+"'";
			
			//process form privilege
			//xslDoc.selectSingleNode("//xsl:param[@name='privilege_path']/@select").value ="'"+$form_privilege_cath+"'"; 
			//xslDoc.selectSingleNode("//xsl:param[@name='datatable_page_number']/@select").value = 2;
		}
	}
	
	getFunctionDoc();
    
	if(!xmlDoc){
		xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
		xmlDoc.async = false;
		xmlDoc.load($form_private_cache+"/data.xml");
	}
	//get privilege data
	/*if(!prvDoc){
		prvDoc = new ActiveXObject("MSXML2.DOMDocument");
		prvDoc.async = false;
		prvDoc.load($form_private_cache+"/privileges/p-39991fd3116f132d6e6-7ffd/privilege.xml");
	}*/
	
	
	document.all.formdiv.innerHTML = xmlDoc.transformNode(xslDoc);
	
	
}

function getFunctionDoc(){

	if(!funcDoc){
		funcDoc = new ActiveXObject("MSXML2.DOMDocument");
		xslDoc.async = false;
		funcDoc.load($form_template_cache+"/functions.xml");
	}
	return funcDoc;
}

function validate(elmnt,target){
	var node = getFunctionDoc().selectSingleNode("functions/validations/validation[@control='"+elmnt.name+"']");
	
	if(!node)
		return true;
	var stylesheet='<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"'+
	' xmlns="http://www.w3.org/TR/REC-html40">'+
	' <xsl:output method="html" indent="yes"/><xsl:template match="/">';
	var tempstr;
	var message;
	var expr = node.getAttribute("expression");
	expr = expr.replaceAll('<',"&lt;");
	expr = expr.replaceAll('>',"&gt;");
	var tempstr = stylesheet + "<xsl:variable name='"+elmnt.name+"' select=\""+target+"\"/><xsl:choose><xsl:when test=\""+expr+"\">"
	tempstr += "true</xsl:when><xsl:otherwise>false</xsl:otherwise></xsl:choose></xsl:template></xsl:stylesheet>";
	tempDoc.loadXML(tempstr);
	if(xmlDoc.transformNode(tempDoc)=="true"){
	       message = node.getAttribute("message");
	       if(message){
	          	alert(node.getAttribute("message"));
	       }else{
	          	alert("need to be implemented");
	       }
	       elmnt.focus();
	       elmnt.select();
	       return false; 
	}
	return true;
}

function getRelFuncs(nodes,operation){
	var relative = new ArrayList();
	var node;
	var flag = false;
	var elmnt;
	
	for(var i=0;i<nodes.size();i++){
		node = nodes.get(i);
		expression =node.getAttribute("expression");
		elmnt = document.getElementsByName(operation)[0];
		if(elmnt){
			operation = elmnt.getAttribute("xpath");
		}
		
		if(expression.indexOf(operation)!=-1){
			flag = true;
			relative.add(node);
			nodes.remove(i);
			i--;
		}
	}
	
	if(flag==false || nodes.isEmpty())
		return relative;
		
	var temp = new ArrayList();
	temp.addAll(relative);
	
	for(i=0;i<temp.size();i++){
		node = temp.get(i);
		relative.addAll(getRelFuncs(nodes,node.getAttribute("control")));
	}
	return relative;
}

function calculateRelatives(elementName,num){
	var temp = getFunctionDoc().selectNodes("/functions/computations/computation");
	
	var nodes = new ArrayList();
	for(i=0;i<temp.length;i++){
		nodes.add(temp[i]);
		
	}
	
	nodes = getRelFuncs(nodes,elementName);
	
	var node;
	var xmlnode;
	var stylesheet='<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"'+
		'  xmlns="http://www.w3.org/TR/REC-html40"><xsl:output method="html" indent="yes"/><xsl:template match="/">';
	var tempstr;
	var expression;
	var target;
	var i=0;
	
	for(i=0;i<nodes.size();i++){
		node = nodes.get(i);
		target =node.getAttribute("target");
		
		if(""==target){
			continue;
		}
		if(target.indexOf("record")!=-1){
			target = target.replace("record/","record[@num="+num+"]/");
		}

		xmlnode = xmlDoc.selectSingleNode(target);
		expression =node.getAttribute("expression2");
		

		if(expression.indexOf("record")>-1 && target.indexOf("record")>-1){
			expression = expression.replaceAll("record/","record[@num="+num+"]/");
		}
		
		tempstr = stylesheet + '<xsl:value-of select="'+expression+'"/>'
	    tempstr += "</xsl:template></xsl:stylesheet>";
	    tempDoc.loadXML(tempstr);
        result = xmlDoc.transformNode(tempDoc);
        
        if(isNaN(result)||"NaN"==result){
        	result = "";
        }
        
	    if(xmlnode)
	    	xmlnode.text = result;
	   
		document.getElementsByName(node.getAttribute("control"))[0].value = result;
	    tempstr = "";
	}
	
	return nodes;
}

function conditionFormatAll(targets,num){

	var condStyles = funcDoc.selectNodes("/functions/conditionstyles/conditionstyle");
	if(!condStyles)
		return;
	var stylesheet='<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"'+
		' xmlns="http://www.w3.org/TR/REC-html40">'+
		'<xsl:output method="html" indent="yes"/>	<xsl:template match="/">\n';
	var k=0;	
	var index = 0;
	for(index=0;index<condStyles.length;index++){
		controlName = condStyles.item(index).getAttribute("control");
		target = condStyles.item(index).getAttribute("target");
		
		if(target.indexOf("record/")!=-1){
			target = target.replace("record/","record[@num="+num+"]/");
			k = num-1;
		}else{
			k = 0;
		}
		
		if(!targets.contains("/"+target))
			//continue;

		element = document.getElementsByName(controlName);
		if(element.length<=k){
			continue;
		}
		element = element[k];
		var nodes = xslDoc.selectSingleNode("//xsl:element/xsl:attribute[@name='name' and .='"+controlName+"']");
		nodes = nodes.parentNode.selectSingleNode("xsl:attribute[@name='style']");
		
		var tempstr = stylesheet + "<xsl:variable name='"+controlName+"' select=\""+target+"\"/>";
		nodes = nodes.childNodes;

		var tmp = "";
		for(i=0;i<nodes.length;i++){
			
			tmp = nodes.item(i).xml;
			if(tmp.indexOf(condStyles.item(index).getAttribute("target"))!=-1){
				tmp = tmp.replace(condStyles.item(index).getAttribute("target"),target);
			}
			
			tempstr += tmp;
		}

		tempstr += "</xsl:template></xsl:stylesheet>";
		
		tempDoc.loadXML(tempstr); 
		
		var styleStr = xmlDoc.transformNode(tempDoc);
		
		var re1 = /\s*;\s*/;
		var re2 = /\s*:\s*/;
		var styles = styleStr.split(re1);
		var aStyle;
		for(j=0;j<styles.length;j++){
		         aStyle = styles[j].split(re2);
		         setStyle(element,aStyle[0],aStyle[1]);
		}
	}
}

/**
 * Set the dom node value when the view changes.
 * 
 * elmnt   is the control object.
 * target  is a xpath expression.
 * num	   is the index of dom node.
 */ 
function setValue(elmnt,target,num){
	
    if(target==""){
		return;
	}
	var value;
	var isDatatable = false;
	if(target.indexOf("record/")!=-1){
		return;
		//target = target.replace("record/","record[@num="+num+"]/");
	}

	var node = xmlDoc.selectSingleNode(target);//ref
	
	if(target.indexOf("record")!=-1){
		var state = node.parentNode.getAttribute("state");
		if(state != 2 && state !=3){
			node.parentNode.setAttribute("state","1");
		}	
		isDatatable = true;
	}
	if(!node)
		return;
	if("radio"==elmnt.type){
		var radios = document.getElementsByName(elmnt.name);
		for(var i=0;i<radios.length;i++){
			
			if(radios[i].checked==true){
				value = radios[i].value;
				
			}
		}
	}else 	
	if("calendar"==elmnt.type){
		value = elmnt.childNodes[0].value;
	}else{
		value = elmnt.value;
	}
	
	var tempValue = node.text;
	node.text = typeTranslate(value);
	
	nodes = calculateRelatives(elmnt.name,num);
	
	if(validate(elmnt,target)){
		//formatDisplay();
	}else{
		//node.text = tempValue;
		//elmnt.value = tempValue;
	}

	updateData(nodes,target,num);
	if(isDatatable){
		
	}
}

function updateData(nodes,target,num){
	
	var targets = new ArrayList();
	for(i=0;i<nodes.size();i++){
		node = nodes.get(i);
		targets.add(node.getAttribute("target"));
	}
	targets.add(target);
	formattingAll(targets,num);
	conditionFormatAll(targets,num);
}

function typeTranslate(value,type){
	if("integer"==type){
		return parseInt(value);
	}else if("float"==type){
		return parseFloat(value);
	}else{
		return value;
	}
}

function formattingAll(targets,num){
	
	var nodes = funcDoc.selectNodes("/functions/formatting/format");
	var stylesheet='<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"'+
		'  xmlns="http://www.w3.org/TR/REC-html40"><xsl:output method="html" indent="yes"/><xsl:template match="/">';
	var tempstr;
	var formatStr;
	var control;
	var node;
	var i=0;
	for(i=0;i<nodes.length;i++){
		node = nodes[i];
		target =node.getAttribute("target");
		if(!targets.contains(target))
			continue;
		if(target.indexOf("record/")!=-1){
			target = target.replace("record/","record[@num="+num+"]/");
		}else{
			//index = 0;
		}
		if(!xmlDoc.selectSingleNode(target)){
			continue;
		}
		control = node.getAttribute("control");
		tempstr = stylesheet + "<xsl:variable name='"+control+"' select=\""+target+"\"/>" ;
		tempstr += "<xsl:value-of select=\""+node.getAttribute("formatString")+"\"/></xsl:template></xsl:stylesheet>";
		tempDoc.loadXML(tempstr); 

		formatedStr = xmlDoc.transformNode(tempDoc);
		
		document.getElementsByName(control)[0].value = formatedStr;
		tempstr = "";
	}
}

function formatting(element,num,initdatatable){
	var name;
	
	if(initdatatable=="true"){
		name = element.editor;//element.parentNode.editor;
	}else{
		name = element.name;
	}
	var node = getFunctionDoc().selectSingleNode("/functions/formatting/format[@control='"+name+"']");
	if(!node)
		return;
		
	var stylesheet='<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"'+
		'  xmlns="http://www.w3.org/TR/REC-html40"><xsl:output method="html" indent="yes"/><xsl:template match="/">';
	var tempstr;
	var formatStr = node.getAttribute("formatString");
	var control;
	target =node.getAttribute("target");
	if(target.indexOf("record/")!=-1){
		target = target.replace("record/","record[@num="+num+"]/");
	}
	if(!xmlDoc.selectSingleNode(target)){
		return;
	}
	control = node.getAttribute("control");
	tempstr = stylesheet + "<xsl:variable name=\""+control+"\" select=\""+target+"\"/>" ;
	tempstr += "<xsl:value-of select=\""+formatStr+"\"/></xsl:template></xsl:stylesheet>";
	tempDoc.loadXML(tempstr); 
	formatedStr = xmlDoc.transformNode(tempDoc);
	if(initdatatable=="true"){
		element.innerHTML = formatedStr;
	}else{
		element.value = formatedStr;
	}
	
}

function beginEditing(elmnt,target,num){
	
	if(target==""){
		return;
	}
	if(target.indexOf("record/")!=-1){
		return;
		//target = target.replace("record/","record[@num="+num+"]/");
	}
	var node = xmlDoc.selectSingleNode(target);//ref
	if(node){
		elmnt.value = node.text;		
	}
}

function stopEditing(elmnt,target,num){
	if(target==""){
		return;
	}
	formatting(elmnt,num);
}
	
function initDataTables(){
	divs = document.getElementsByTagName("DIV");
	for(var k=0;k<divs.length;k++){
		if(divs[k].type && divs[k].type=="datatable"){
			fixedHeadAndFoot(divs[k]);
			//calculateDatatables();
		}
	}
	
}

function calculateDatatables(){

	divs = document.getElementsByTagName("DIV");
	for(var k=0;k<divs.length;k++){
		if(divs[k].type && divs[k].type=="datatable"){
			calculateDatatable(divs[k]);
			getDataTable(divs[k].name,divs[k].dsID,10);
		}
	}

}

function calculateDatatable(tableContainer){
	if(!xmlDoc){
		xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
		xmlDoc.async = false;
		xmlDoc.load($form_private_cache+"/data.xml");
	}
	var target = "/formdata/"+tableContainer.dsID+"/record";
	var records = xmlDoc.selectNodes(target);
	var columns ;
	var result;

	var tbodys = tableContainer.getElementsByTagName("TBODY");
	var elementName;

	var tds;
	var td;
	var initdatatable = "true";
	var record;
	var editor;
	var node;
	
	for(var i=0;i<records.length;i++){
		columns = records[i].childNodes;
		if(!tbodys[i]){
			continue;
		}
		
		tds = tbodys[i].getElementsByTagName("TD");
		
		for(var j=0;j<columns.length;j++){
			elementName = columns[j].nodeName;
			calculateRelatives(elementName,i+1);
		}
		
		for(var x=0;x<tds.length;x++){
    		td = tds[x].childNodes[0];
    		editor = tds[x].editor;
    		
    		if(td){
    		
    			if("LABEL"==td.tagName){
    				continue;
    			}
    		}
    			

			if(!editor){
				continue;
			}
			
			target = document.getElementsByName(editor)[0].xpath;
			target = target.replace("record/","record[@num="+(i+1)+"]/");

			node = xmlDoc.selectSingleNode(target);

			if(node){
				tds[x].innerHTML = node.text;
			}
			
			formatting(tds[x],i+1,initdatatable);
			conditionFormat(tds[x],i+1,initdatatable);

    	}	
	}	
}
function conditionFormat(element,num,initdatatable){
	var name ;
	
	if(initdatatable=="true"){
		name = element.editor;//element.parentNode.editor;
	}else{
		name = element.name;
	}
	var node = getFunctionDoc().selectSingleNode("/functions/conditionstyles/conditionstyle[@control='"+name+"']");
	if(!node)
		return;
		
	var stylesheet='<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"'+
		'  xmlns="http://www.w3.org/TR/REC-html40"><xsl:output method="html" indent="yes"/><xsl:template match="/">';
	var tempstr;
	var formatStr = node.getAttribute("expression");
	var control;
	target =node.getAttribute("target");
	if(target.indexOf("record/")!=-1){
		target = target.replace("record/","record[@num="+num+"]/");
	}
	if(!xmlDoc.selectSingleNode(target)){
		return;
	}
	
	var nodes = xslDoc.selectSingleNode("//xsl:element/xsl:attribute[@name='name' and .='"+name+"']");
	nodes = nodes.parentNode.selectSingleNode("xsl:attribute[@name='style']");
	
	var tempstr = stylesheet + "<xsl:variable name='"+name+"' select=\""+target+"\"/>";
	nodes = nodes.childNodes;
	var tmp = "";
	for(i=0;i<nodes.length;i++){
		
		tmp = nodes.item(i).xml;
		if(tmp.indexOf(node.getAttribute("target"))!=-1){
			tmp = tmp.replace(node.getAttribute("target"),target);
		}
		
		tempstr += tmp;//nodes.item(i).xml;
	}
	tempstr += "</xsl:template></xsl:stylesheet>";	
	
	tempDoc.loadXML(tempstr); 
	
	var styleStr = xmlDoc.transformNode(tempDoc);
	
	var re1 = /\s*;\s*/;
	var re2 = /\s*:\s*/;
	var styles = styleStr.split(re1);
	var aStyle;
	for(j=0;j<styles.length;j++){
	         aStyle = styles[j].split(re2);
	         setStyle(element,aStyle[0],aStyle[1]);
	}
}
function showScrollPos(container,opera){
	var scrollpos = document.getElementById("fscrollpos");

	if("add"==opera){
		container.scrollTop = container.childNodes[0].offsetHeight;//parseInt(scrollpos.value) + 25;
	}
	if("del"==opera){
		container.scrollTop = parseInt(scrollpos.value);
	}
}
function saveScrollPos(container){

	var scrollpos = document.getElementById("fscrollpos");
	scrollpos.value = container.scrollTop;
}

function fixedHeadAndFoot(tableContainer){

	var rows = tableContainer.getElementsByTagName("THEAD")[0].childNodes;	
	
	var cells;
	for(var i=0;i<rows.length;i++){
		cells = rows.item(i).childNodes;
		for(j=0;j<cells.length;j++){
			cells.item(j).style.top = tableContainer.scrollTop;
		}
	}

	var height = tableContainer.childNodes[0].offsetHeight;
	
	var headHeight = parseInt(tableContainer.headHeight);
	var tfoot = tableContainer.getElementsByTagName("TFOOT")[0];
	if(tfoot==null){
		return;
	}
	rows = tfoot.childNodes;	
	if(rows==null){
		return;
	}		
	var row;
	for(var i=0;i<rows.length;i++){
		row = rows.item(i);
		cells = row.childNodes;
		
		if("&nbsp;"==row.innerHTML){
			//rows.removeChild(row);
			continue;
		}
		for(j=0;j<cells.length;j++){
			if(cells.item(j).style){
				cells.item(j).style.top = parseInt(tableContainer.style.height)-height+tableContainer.scrollTop;//tableContainer.style.top;//
			}	
		}
	}

}

function formComplete(workflow){

	var isSubmitAvailabel = true;
	if(verifyMsg.size()>0){
		showVerifyDiv();
		return;
	}
	errorMsg.clear();
	
	try{

   if(onsubmit_form()){
   	 isSubmitAvailabel = true;
   }else{
   	 isSubmitAvailabel = false;
	 //return false;
   }
   }catch(e){
   	
   }finally{
   }
   
	if(isSubmitAvailabel){
		
	
	var path = document.location.pathname;
    var pos=path.lastIndexOf('/', path.length-1);
    path = path.substring(0,pos);
    var url="http://"+ document.location.hostname + ":" + document.location.port + path +"/formparser?formaction=put";
    var parameter = getHrefParameters();
    if(parameter.length()>0){
        url += "&"+parameter.toString();
        url = url.substring(0,url.length-1);
    }
    
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.Open("POST" ,url, false);
       
    var flag = true;
    xmlhttp.onreadystatechange=function()
  	{  
    	if(xmlhttp.readyState==4)
      	{
        	if (xmlhttp.status == 200)
          	{

            	if(xmlhttp.responseText!=null&&""!=xmlhttp.responseText){
            		var respone_array = xmlhttp.responseText.split("</p>");
            		var error = respone_array[0].substring(respone_array[0].lastIndexOf(">")+1,respone_array[0].length);
            		
            		errorMsg.put("formconsole",error);
            		if("workflow"==workflow){
            			flag = false;
            		}
            		
            	}else{
            		errorMsg.put("formconsole","\u8868\u5355\u63d0\u4ea4\u6210\u529f");
            		if("workflow"==workflow){
            		}
            	}
            	
            	
          	}else {
           		//alert("\u8bfb\u53d6\u53c2\u4e0e\u8005\u5931\u8d25\uff01\n" +xmlhttp.statusText+"\n"+xmlhttp.responseText);
           		if("workflow"==workflow){
           			 flag = false;
            	}
         	}

         	if("workflow"==workflow){
         		if(flag==false){
         				showVerifyDiv();
         		}
         	}else{
         		showVerifyDiv();
         	}
         
     	}
  	}
  	xmlhttp.Send(xmlDoc); 
  	
  	return flag;
    //return xmlhttp.responseText;
  }else{
  	return isSubmitAvailabel;
  }
}

/**
 * do verify 
 * author:ly_liuy@neusoft.com
 * date  :2007.11.5
 */
function doVerify(){
	verifyAll();
	showVerifyDiv();
}

/**
 * show verify div
 * author:ly_liuy@neusoft.com
 * date  :2007.11.5
 */
function showVerifyDiv(){
	var flag = false;
    //verifyAll();
	if(document.getElementById("msgDiv")){
    	return;
    }
    var msgw,msgh,bordercolor;
    msgw=400;//width of msgwindow
    msgh=500;//height of msgwindow
    titleheight=25 //height of msgwindow's title
    bordercolor="#336699";//borderColor of msgwindow
    titlecolor="#99CCFF";//titleColor of msgwindow
   

	var msgObj=document.createElement("div")
    msgObj.setAttribute("id","msgDiv");    
    msgObj.setAttribute("align","center");
    msgObj.style.background="white";   
     
    msgObj.style.border="1px solid " + bordercolor;
    msgObj.style.position = "absolute";
    msgObj.style.left = 200;//"50%";
    msgObj.style.top = 200;//"50%";
    msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    //msgObj.style.marginLeft = "225px";//"-225px" ;
    //msgObj.style.marginTop = 200+document.documentElement.scrollTop+"px";//-75+document.documentElement.scrollTop+"px";
    msgObj.style.width = msgw + "px";
    msgObj.style.height =msgh + "px";
    msgObj.style.textAlign = "center";
    msgObj.style.lineHeight ="25px";
    //msgObj.style.zIndex = "10001";
    
    var iframe = '<iframe frameborder=0 border=1 style="position:absolute; visibility:inherit; top:0px; left:0px; width:100%; height:100%;z-index:-1;border:ridge 1px"></iframe>';
    msgObj.innerHTML = iframe;
    
    var title=document.createElement("h4");
    title.setAttribute("id","msgTitle");
    title.setAttribute("align","right");
    title.style.margin="0";
    title.style.padding="3px";
    title.style.width = msgw -1 + "px";
    title.style.background=bordercolor;
    title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    title.style.opacity="0.75";
    title.style.border="1px solid " + bordercolor;
    title.style.height="18px";
    title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif";
    title.style.color="white";
    title.style.cursor="pointer";
    title.innerHTML='<a onclick="closeVerifyDiv()">\u5173\u95ed</a>';

	title.onmousedown=function(){
	 	grabIt();
	}
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    
    
    var txt=document.createElement("div");
    txt.style.margin="1em 0"
    txt.setAttribute("id","msgTxt");
    txt.setAttribute("align","left");
    txt.style.font="14px Verdana, Geneva, Arial, Helvetica, sans-serif";
    txt.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=15,finishOpacity=50";
    txt.style.color = "red";
    txt.style.wordBreak = "break-all";
    
    
    //verify error
    var keys = verifyMsg.keys();
    var len = keys.length;
    var str = "";
    var key;

    for(var i=0;i<len;i++){
    	key = keys[i];
    	elmnt = document.getElementsByName(key)[0];
    	
    	if(key.indexOf("formconsole")>-1 || key.indexOf("JSError")>-1){
    		str += '['+i+']  '+ key+':'+verifyMsg.get(key)+'<br/>'; 
    	}else{
    		str += '['+i+']  '+'<a href="javascript:" onclick="goToElement('+i+')" style="color:red;">'+key+':'+verifyMsg.get(key)+'</a><br/>';
    	}
    }

    //submit error
    var keys = errorMsg.keys();
    var len = keys.length;
    //var str = "";
    var key;

    for(i=0;i<len;i++){
    	key = keys[i];
    	elmnt = document.getElementsByName(key)[0];
    	if(key.indexOf("formconsole")>-1 || key.indexOf("JSError")>-1){
    		str += '['+i+']  '+ key+':'+errorMsg.get(key)+'<br/>'; 
    	}else{
    		str += '['+i+']  '+'<a onclick="goToElement('+i+')" style="color:red;">'+key+':'+errorMsg.get(key)+'</a><br/>';
    	}
    }
    
    
    if(""==str.trim()){
    	txt.setAttribute("align","center");
    	
    	str="\u6821\u9a8c\u901a\u8fc7";
    	// pass all the validate;
    	flag = true;
    }
    txt.innerHTML=str;
    document.getElementById("msgDiv").appendChild(txt);
    //MoveLayer("msgDiv",0,0);

    return flag;
    
}

function closeVerifyDiv(){

    var msgDiv = document.getElementById("msgDiv");
    var title = document.getElementById("msgTitle");
    if(msgDiv){
    	msgDiv.removeChild(title);
    	document.body.removeChild(msgDiv);
    }
}

/**
 * show verify div
 * author:ly_liuy@neusoft.com
 * date  :2007.11.5
 */
function goToElement(num){

	
	var keys = verifyMsg.keys();
	var key;
	var elmnt;
	for(var i=0;i<keys.length;i++){
		if(i==num){
			key = keys[i];
    		elmnt = document.getElementsByName(key)[0];
    		break;
		}
		
	}
	if(elmnt){
		drawValidateRect(elmnt,elmnt.getAttribute("type"));
	}
	
  	//drawValidateRect(elmnt,elmnt.getAttribute("type"));
  	//radioGroupName ="";
} 

currentX = currentY = 0;                               
whichIt = null;                                         
lastScrollX = 0; lastScrollY = 0;                                           
                     
function grabIt(){            
	                            
	whichIt = event.srcElement; 
	while (whichIt.id.indexOf("msgDiv") == -1){    
		whichIt = whichIt.parentElement;                           
		if (whichIt == null){ return true; }         
	}                            
	whichIt.style.pixelLeft = whichIt.offsetLeft;                              
	whichIt.style.pixelTop = whichIt.offsetTop;                          
	currentX = (event.clientX + document.body.scrollLeft);                       
	currentY = (event.clientY + document.body.scrollTop);                        
	                       
	return true;                        
}                            
function moveIt(){               
	if (whichIt == null){ return false; }       
	                            
	newX = (event.clientX + document.body.scrollLeft);                           
	newY = (event.clientY + document.body.scrollTop);                
	distanceX = (newX - currentX);    distanceY = (newY - currentY);   
	currentX = newX;    currentY = newY;                       
	whichIt.style.pixelLeft += distanceX;                          
	whichIt.style.pixelTop += distanceY;                      
	if(whichIt.style.pixelTop < document.body.scrollTop) 
		whichIt.style.pixelTop = document.body.scrollTop;   
	if(whichIt.style.pixelLeft < document.body.scrollLeft) 
		whichIt.style.pixelLeft = document.body.scrollLeft; 
	if(whichIt.style.pixelLeft > document.body.offsetWidth - document.body.scrollLeft - whichIt.style.pixelWidth - 20) 
		whichIt.style.pixelLeft = document.body.offsetWidth - whichIt.style.pixelWidth - 20;
	if(whichIt.style.pixelTop > document.body.offsetHeight + document.body.scrollTop - whichIt.style.pixelHeight - 5) 
		whichIt.style.pixelTop = document.body.offsetHeight + document.body.scrollTop - whichIt.style.pixelHeight - 5;  
	event.returnValue = false;  
	
	return false;  
}   
function dropIt(){     
	whichIt = null;     
	return true;             
}

function changeDataTableState(){
	if(!xmlDoc){
		xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
		xmlDoc.async = false;
		xmlDoc.load($form_private_cache+"/data.xml");
	}
	var records = xmlDoc.selectNodes("//record");
	var state;
	for(var i=0;i<records.length;i++){
		state = records[i].getAttribute("state");
		if(state==0){
			state = 2;
		}
		
		records[i].setAttribute("state",state);
	}
}
/**
 * save data shotsnap
 * author:ly_liuy@neusoft.com
 * date  :2008.4.8
 */
function savesnap(){
	if(!xmlDoc){
		xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
		xmlDoc.async = false;
		xmlDoc.load($form_private_cache+"/data.xml");
	}

	var path = document.location.pathname;
    var pos=path.lastIndexOf('/', path.length-1);
    path = path.substring(0,pos);
    var url="http://"+ document.location.hostname + ":" + document.location.port + path +"/formparser?formaction=savesnap&snapnum="+snapNum;
    var parameter = getHrefParameters();
    if(parameter.length()>0){
        url += "&"+parameter.toString();
        url = url.substring(0,url.length-1);
    }
    
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.Open("POST" ,url, false);
       
    xmlhttp.onreadystatechange=function()
  	{  
    	if(xmlhttp.readyState==4)
      	{
        	if (xmlhttp.status == 200)
          	{

            	if(xmlhttp.responseText!=null&&""!=xmlhttp.responseText){
            		var respone_array = xmlhttp.responseText.split("</p>");
            		var error = respone_array[0].substring(respone_array[0].lastIndexOf(">")+1,respone_array[0].length);
            		
            		errorMsg.put("formconsole",error);
            	}else{
            		errorMsg.put("formconsole","\u4fdd\u5b58\u5feb\u7167\u6210\u529f");
            	}
          	}   
          	showVerifyDiv();      
     	}
  	}

  
  	xmlhttp.Send(xmlDoc); 

  	    
}
/**
 * open data shotsnap
 * author:ly_liuy@neusoft.com
 * date  :2008.4.8
 */
function opensnap(){


	var s = showModalDialog("unieap/pages/form/html/shotSnap.html",window,"dialogTop:300px;dialogLeft:300px;dialogWidth:350px;dialogHeight:250px;status:no;");
	
	if(s){
		xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
		xmlDoc.async = false;
		xmlDoc.load($form_private_cache+"/"+s);
		initTabs();
		getMenuHandler().clearMenu();
		transform();
		initformtabs('unieap/pages/form/images');
	}
}
/**
 * get snaps 
 * author:ly_liuy@neusoft.com
 * date  :2008.4.8
 */
function getSnaps(){
	var fileValues = "";
	var path = document.location.pathname;
    var pos=path.lastIndexOf('/', path.length-1);
    path = path.substring(0,pos);
    var url="http://"+ document.location.hostname + ":" + document.location.port + path +"/formparser?formaction=getsnap";
    var parameter = getHrefParameters();
    if(parameter.length()>0){
        url += "&"+parameter.toString();
        url = url.substring(0,url.length-1);
    }
    
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.Open("POST" ,url, false);
       
    xmlhttp.onreadystatechange=function()
  	{  
    	if(xmlhttp.readyState==4)
      	{
        	if (xmlhttp.status == 200)
          	{
               
            	if(xmlhttp.responseText!=null&&""!=xmlhttp.responseText){
            		fileValues = xmlhttp.responseText;

            	}else{
            		errorMsg.put("formconsole","\u4fdd\u5b58\u5feb\u7167\u6210\u529f");
            	}
          	}     
     	}
  	}
  	xmlhttp.Send();
  	
  	return fileValues;
}


