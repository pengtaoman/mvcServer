
var validateElement,focusElement;
////////////////////2004-12-10 added by micy for  ////////////////// 
function formProxyRequest(action, method, parameter) {
    var objXMLReq = new ActiveXObject("Microsoft.XMLHTTP");
    var strURL = action ;
    if(method != null && method != ""){
        strURL += "?method=" + method;
    }
    
    if(parameter != null && parameter != ""){
        strURL += ("&" + parameter);
    }
    //alert(strURL);
    objXMLReq.open("POST", strURL, false);
    objXMLReq.send("");
    var strResult = objXMLReq.responseText;
    return strResult;
}
////////////////// ////////////////// 
//clsName - 
//parameter - 
//xmlDoc - 
function formCommandRequest(clsName, xmlDoc,parameter) {
    var path = document.location.pathname;
    var pos=path.lastIndexOf('/', path.length-1);
    path = path.substring(0,pos);
    var url="http://"+ document.location.hostname + ":" + document.location.port + path +"/XMLReceiver?command="+clsName;
    
    if(parameter.length()>0){
        url += "&"+parameter.toString();
        url = url.substring(0,url.length-1);
    }
    //alert(url);
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.Open("POST" ,url, false);
    xmlhttp.Send(xmlDoc);
    return xmlhttp.responseText;;
}


function getFormData(){
    var obj = document.forms[0].elements;
    var parms = "";
    for (i=0; i<obj.length; i++ ){
        if ( obj(i).type != "submit" && obj(i).type != "reset" && obj(i).type != "button"){
            if( obj(i).type == "list"){
                for(j=0; j<obj(i).length;j++){
                    if (obj(i).options[j].selected ){
                        parms = parms+obj(i).name+"="+replaceStr(obj(i).options[j].value)+"&";
                    }
                }
            }else if(obj(i).type =="radio" || obj(i).type =="checkbox"){
                if (obj(i).checked){
                    parms=parms+obj(i).name+"="+replaceStr(obj(i).value)+"&";
                }
            }else{
                parms=parms+obj(i).name+"="+replaceStr(obj(i).value)+"&";
            }
        }
    }
    return parms;
}

function replaceStr(str)
{
   //str = str.replace(/\+/g,"%2B");
   //str = str.replace(/%/g,"%25");
   //str = str.replace(/&/g,"%26");
   // str = str.replace(/\\/g,"&#92;");
   // str = str.replace(/</g,"&#60;");
   // str = str.replace(/>/g,"&#62;");
   // str = str.replace(/\"/g,"&#34;");
    //str = str.replace(/ /g,"&nbsp;");
    
    return str;
}

function Parameters(){
    this.ctrlNames = new Hashtable();
    this.addName = addName;
    this.addAllElementNames = addAllElementNames;
    this.toString = toString;
    this.length = length;
    this.userParams = new Hashtable();
    this.setParameter = setParameter;
    this.getParameter = getParameter;
    this.addDisabledElements = addDisabledElements;
    this.addHiddenElements = addHiddenElements;
    this.names = names;
    //name is the form element's name
    function addName(name){
       try{
    	  this.ctrlNames.put(name,name)
       }
       catch(e){
          alert(e);
       }
    }
    function addAllElementNames(){
    	var elements = document.forms[0].elements;
    	try{
    	  for (i=0; i<elements.length; i++ ){
    	    this.ctrlNames.put(elements[i].name,elements[i].name);
    	  }
    	}
    	catch(e){
    	  alert(e);
    	}
    }
    function addDisabledElements(){
    	var elements = document.forms[0].elements;
    	try{
    	  for (i=0; i<elements.length; i++ ){
    		if(elements[i].disabled){
    	    	this.ctrlNames.put(elements[i].name,elements[i].name)
    	    }
    	  }
    	}
    	catch(e){
    	  alert(e);
    	}
    }
    function addHiddenElements(){
    	var elements = document.forms[0].elements;
    	try{
    	  for (i=0; i<elements.length; i++ ){
    		if("hidden"==elements[i].type){
    	    	this.ctrlNames.put(elements[i].name,elements[i].name)
    	    }
    	  }
    	}
    	catch(e){
    	  alert(e);
    	}
    }    
    function setParameter(name,value){
       try{
    	  this.userParams.put(name,value);
       }
       catch(e){
          alert(e);
       }
    }
    function getParameter(name){
    	return this.userParams.get(name);
    }
    function names(){
    	return this.userParams.keys();
    }
    function toString(){
    	var parms = "";
    	var obj;
    	var names = this.ctrlNames.values();
        for (i=0; i<names.length; i++ ){
        
            obj = document.forms[0].item(names[i]);
            if ( obj.type != "submit" && obj.type != "reset" && obj.type != "button"){
                if( obj.type == "list"){
                    for(j=0; j<obj.length;j++){
                       if (obj.options[j].selected ){
                          parms = parms+obj.name+"="+replaceStr(obj.options[j].value)+"&";
                       }
                    }
                }else 
                if(obj.length>1){
                    
                    for(j=0;j<obj.length;j++)
                    {
		                if(obj[j].type =="radio"){
		                    if (obj[j].checked){
		                       parms=parms+obj[j].name+"="+replaceStr(obj[j].value)+"&";
		                       break;
		                    }
		                }else
		                if(obj.name){
		                	parms=parms+obj.name+"="+replaceStr(obj.value)+"&";
		                	break;
		                }
		            }
                }else
                if(obj.type =="checkbox"){
                    if (obj.checked)
                       parms=parms+obj.name+"="+replaceStr(obj.value)+"&";
                }else{
                	
                    parms=parms+obj.name+"="+replaceStr(obj.value)+"&";
                }
            }
        }
        var keys = this.userParams.keys();
        for(i=0;i<keys.length;i++){
            parms = parms + keys[i] + "=" + this.userParams.get(keys[i]) + "&";
        }
        
        return parms;
    }
    function length(){
    	return this.ctrlNames.size()+this.userParams.size();
    }
}
function formSubmitParameters(){
	
	var params = new Parameters();
	params.addDisabledElements();
	var action = document.forms[0].action;
	var index = action.indexOf("?");
	
	var href = document.location.href;
    var ask = href.indexOf("?");
    var oldHref = href.substring(ask+1);
    
	//var paramsTable = getHrefParameters();
	if(params.length()>0){
		if(index<0){
			action = action + "?" +params.toString();
		}else{
	    	action = action+"&"+params.toString();
	    }
	    action = action  + "&" + oldHref;
	}else{
		action = action  + "?" + oldHref;//paramsTable.getParameter("fid");
	}
	document.forms[0].action = action;
	//alert(action);
	//else
	//    document.forms[0].action = action;    
}

function reloadForm(parmArray){
    var href = document.location.href;
    var ask = href.indexOf("?");
    var paramTable = getHrefParameters(); 
   var tempvalue;
   var name;
   var value;
   if(parmArray){
    for(var i=0;i<parmArray.length;i++){
       href = href+ parmArray[i];
       tempvalue = parmArray[i];
       name = tempvalue.substring(0,tempvalue.indexOf(":"));
       value = tempvalue.substring(tempvalue.indexOf(":")+1,tempvalue.length);
       paramTable.setParameter(name,value);
    }
   }
    href = href.substring(0,ask+1);
    var keys = paramTable.names();
    for(i=0;i<keys.length;i++){
    	if(i!=keys.length -1)
    	  href += keys[i] +"=" + paramTable.getParameter(keys[i])+"&";
    	else
          href += keys[i] +"=" + paramTable.getParameter(keys[i]);
    }

    document.location.href = href;
}

function formatDigit(x , digits){

  var xAbs = Math.abs(x);
  var intpart = Math.floor( xAbs );
  var decpart = xAbs - intpart;
  

  var fixedStr = "";
  if ( x < 0 ) fixedStr = fixedStr +  "-";  
  fixedStr = fixedStr + Math.round(intpart) + ".";

  for ( i = 0; i < digits; i++ )
  { 
   decpart = ( decpart - Math.floor( decpart ) ) * 10 + 1.0e-10;
   num0 = Math.floor( decpart );
   fixedStr = fixedStr +  num0;
  }
  return fixedStr;
 } 
 
function fPoint(iX, iY){
        this.x = iX;
        this.y = iY;
}
function fGetXY(aTag){
  var oTmp = aTag;
   
  var pt = new fPoint(0,0);
  do
  {		
        pt.x += oTmp.offsetLeft;
       	pt.y += oTmp.offsetTop;

		if(oTmp.parentNode.tagName=="TD" ){ 
		  var td;
            td = oTmp.parentNode;

	      if(td.vAlign=="middle"){
		    pt.y = parseInt(parseFloat(pt.y)-parseFloat(td.offsetHeight - oTmp.offsetHeight)/2.0 +1);
		  }
		  if(td.vAlign=="bottom"){
		    pt.y = parseInt(pt.y)-(td.offsetHeight - oTmp.offsetHeight) ;
		  }  
		  
		}
        oTmp = oTmp.offsetParent;
  } while(oTmp.tagName!="BODY");
  

  return pt;
}
function getHrefParameters(){
	var href = document.location.href;
    var ask = href.indexOf("?");
    var oldHref = href.substring(ask+1);
     
    var parms = oldHref.split("&");
    var parmValue,parmName;
    var paramTable = new Parameters();
    
    for(i=0;i<parms.length;i++){
        index = parms[i].indexOf("=");
        parmName = parms[i].substring(0,index);
        parmValue = parms[i].substring(index+1);
        paramTable.setParameter(parmName,parmValue);
    }
 
    return paramTable;
}



function getParentDiv(element){
    var  parent = element.parentNode;
    while(parent!=null && parent.tagName!="DIV"){
        parent = parent.parentNode;
    }   
    return parent;     
}
function drawFocusRect(element,type){
 var top,left,width,height,fpoint,parent;
 try{
    
   if(element.name == validateElement){
      hiddenValidateRect();
   }
   var rect = document.getElementsByName("focusrect")[0];
   
   
   if(type=="datatree" || type == "calendar" || type=="checkbox" || type == "radio"){

     parent = element.parentNode;
     
     fpoint = fGetXY(element);
     left = parseInt(fpoint.x);
     top  = parseInt(fpoint.y) ;
     var brother = element.nextSibling;
     width = parseInt(parent.offsetWidth);
     height = parseInt(parent.offsetHeight);
	 if(!brother){
	 	brother = element.previousSibling;
	 }
	 var brotherpoint = fGetXY(brother);
	 if(brotherpoint.x < left)
	    left = parseInt(brotherpoint.x);
	 if(brotherpoint.y < top)
	    top  = parseInt(brotherpoint.y);    
     
   }else{
     fpoint = fGetXY(element);
     left = parseInt(fpoint.x) ;
     top  = parseInt(fpoint.y) ;
     width = parseInt(element.offsetWidth);
     height = parseInt(element.offsetHeight) ;
   }

   rect.style.left = left+2;
   rect.style.top = top+2;
   rect.style.height = height -1 ;
   rect.style.width = width-1;
   rect.style.visibility="visible";
   focusElement = element.name;
 }catch(e){ }
 
 }
 function drawValidateRect(element,type){
 var top,left,width,height,fpoint,parent;
 try{
 
   if(element.name == focusElement){
      hiddenFocusRect();
   }
   var rect = document.getElementsByName("validaterect")[0];
   
   
   if(type=="datatree" || type == "calendar" || type=="checkbox" || type == "radio"){

     parent = element.parentNode;
     fpoint = fGetXY(element);
     left = parseInt(fpoint.x);
     top  = parseInt(fpoint.y) ;
     var brother = element.nextSibling
	 if(!brother){
	 	brother = element.previousSibling;
	 	left = left - brother.offsetWidth;
	 }
     if(type=="radio"){
     	parent = parent.parentNode;
     	fpoint = fGetXY(parent);
     	left = parseInt(fpoint.x);
     	top  = parseInt(fpoint.y) ;
     }
     width = parseInt(parent.offsetWidth);
     height = parseInt(parent.offsetHeight);
   }else{
     fpoint = fGetXY(element);
     left = parseInt(fpoint.x) ;
     top  = parseInt(fpoint.y) ;
     width = parseInt(element.offsetWidth);
     height = parseInt(element.offsetHeight) ;
   }

   rect.style.left = left;
   rect.style.top = top;
   rect.style.height = height ;
   rect.style.width = width;
   rect.style.visibility="visible";
   validateElement = element.name;
 }catch(e){ }
 
 }
 function hiddenFocusRect(){
   var rect = document.getElementById("focusrect");
   rect.style.visibility="hidden";
 }
 function hiddenValidateRect(){
   var rect = document.getElementById("validaterect");
   rect.style.visibility="hidden";
   
 }
 
function formHotkey(event)
{
  if(event.shiftKey==true)
  {
     if(event.keyCode==13) 
     {
        if(confirm("\u662f\u5426\u4fdd\u5b58"))
        	formComplete();
     }   
     else if(event.keyCode==86) previewAll();
     else if(event.keyCode==80) printAll();
  }
}


//after form load select all required elments and mark them
 function do_form_required()
{ 
  try{
    
    var frm = document.forms[0];   
    for(var i=0;i<frm.elements.length;i++)
    {
      var elmnt=frm.elements[i]; 
      var required = elmnt.getAttribute("required");
      if(required!="true"){
        continue; 
      }
      //alert(elmnt.name+":"+elmnt.getAttribute("type"));
 	  if(elmnt.readOnly||elmnt.disabled){
 	  	var type = elmnt.getAttribute("type");
 	  	if("datatree"!=type &&"calendar"!=type){
 	  		continue;
 	  	}	    
	  }
	  
      if(elmnt.type=="radio"&&required=="true"){
         
    	 var radiogroup = elmnt.parentNode.parentNode;
       	 var rg = document.getElementsByName(elmnt.name);
       	 var flag = false;
       	 var bgcolor="";
       	 for(r=0;r<rg.length;r++){
       	    if(rg[r].checked){
       	       flag = true;
       	       break;
       	    }
       	 }
       	 if(!flag){
       	    bgcolor = elmnt.style.backgroundColor;
       	    if(bgcolor!=""){
       	       elmnt.parentNode.setAttribute("bgColor",bgcolor);
       	    }
       	    elmnt.parentNode.style.backgroundColor = "";
       	    elmnt.style.backgroundColor = "";
       	    elmnt.nextSibling.style.backgroundColor = "";
       	    radiogroup.setAttribute("className","required-div");
       	 }
       	 /*else if(radiogroup.className=="required-div"){
       	    for(r=0;r<rg.length;r++){
       	        bgcolor = rg[r].parentNode.getAttribute("bgColor");
  	 	    	rg[r].parentNode.parentNode.className=""; 
       	    	rg[r].parentNode.style.backgroundColor = bgcolor;
       	    	rg[r].style.backgroundColor = bgcolor;
       	    	rg[r].nextSibling.style.backgroundColor = bgcolor;  
       	   }
       	    radiogroup.removeAttribute("className");
       	 }*/
       }
       else if(elmnt.type=="checkbox"&&required=="true"){
       	   var checkbox = elmnt.parentNode;
       	     if(!elmnt.checked){
       	        bgcolor = elmnt.style.backgroundColor;
       	        if(bgcolor!=""){
       	     	    checkbox.setAttribute("bgColor",bgcolor);
       	        }
       	    	checkbox.style.backgroundColor = "";
       	    	elmnt.style.backgroundColor = "";
       	    	elmnt.nextSibling.style.backgroundColor = "";
       	    	checkbox.setAttribute("className","required-div");
       	     }
       	     /*else if(checkbox.className=="required-div"){
       	        checkbox.style.backgroundColor = checkbox.getAttribute("bgColor");
   	    	    elmnt.style.backgroundColor = checkbox.getAttribute("bgColor");
   	    	    elmnt.nextSibling.style.backgroundColor = checkbox.getAttribute("bgColor");
   	    	    elmnt.removeAttribute("className");
       	        checkbox.removeAttribute("className");       	        
       	     }*/
       }
       
       else if(elmnt.value==""&&required=="true"){
            
            bgcolor = elmnt.style.backgroundColor;
       	    if(bgcolor!=""){
       	       elmnt.setAttribute("bgColor",bgcolor);
       	    }
	      	elmnt.style.backgroundColor="";
	      	elmnt.setAttribute("className","required-div");
	      	if(elmnt.getAttribute("readOnly")==true){
	      	    elmnt.style.filter="";
	      	}
	      	
	  }
	  /*else if(elmnt.value!=""&&required=="true"){
	    if(elmnt.className=="required-div"){
	        
	      	elmnt.style.backgroundColor = elmnt.getAttribute("bgColor");
	      	if(elmnt.getAttribute("readOnly")==true){
		        elmnt.style.filter="alpha(opacity=50)";
		    }
	         elmnt.removeAttribute("className");	        
		  }
	  }*/

   }
   }catch(e){
   	    alert(e.description);
   }
}
// mark required elments with a special css  required-div
function showRequiredDiv(elmnt){
  
  var rect = document.getElementById("requireddiv_"+elmnt.name);
  
  //datatree handler
  if(elmnt.type=="hidden"){ 
  	    var tree = elmnt.nextSibling.nextSibling;
  	    if(tree.getAttribute("required")!="true"){
  	    	return ;
  	    }
  	    
  	    if(tree.value!=""&&tree.value!=null){ 
      		var bgcolor = tree.getAttribute("backgroundColor");
     		if(bgcolor==null){
      			return;
      		}
      		else{
      			tree.style.backgroundColor = bgcolor;
      			tree.style.filter="alpha(opacity=50)";
      		}  	      
  	    }
  	    else{
  	    	tree.style.backgroundColor="";
  	    	tree.setAttribute("className","required-div");
      		if(tree.getAttribute("readOnly")==true){
	      		tree.style.filter="";
	  		}
  	    }
	   
  }
  //radio group handler
  else if(elmnt.type=="radio"){
           var radiogroup = elmnt.parentNode.parentNode;
       	   var rg = document.getElementsByName(elmnt.name);
       	   for(r=0;r<rg.length;r++){
  	 	    	rg[r].parentNode.parentNode.className=""; 
       	    	rg[r].parentNode.style.backgroundColor = rg[r].parentNode.getAttribute("bgColor");
       	    	rg[r].style.backgroundColor = rg[r].parentNode.getAttribute("bgColor");
       	    	rg[r].nextSibling.style.backgroundColor = rg[r].parentNode.getAttribute("bgColor");  
       	   }
  }
  //checkbox handler
  else if(elmnt.type=="checkbox"){
  		var checkbox = elmnt.parentNode;
  	 	if(elmnt.checked){
  	 	    
   	    	checkbox.style.backgroundColor = checkbox.getAttribute("bgColor");
   	    	elmnt.style.backgroundColor = checkbox.getAttribute("bgColor");
   	    	elmnt.nextSibling.style.backgroundColor = checkbox.getAttribute("bgColor");
   	    	elmnt.removeAttribute("className");
   	    	
  	 	}
  	 	else{
  	 	    
 	 		checkbox.setAttribute("bgColor",elmnt.style.backgroundColor);
       	    checkbox.style.backgroundColor = "";
       	    elmnt.style.backgroundColor = "";
       	    elmnt.nextSibling.style.backgroundColor = "";
  	 		elmnt.setAttribute("className","required-div");

  	 	}
  } 
  
  //text password handler 
  else if(elmnt.value!=""&&elmnt.value!=null){ //alert()
      var bgcolor = elmnt.getAttribute("bgColor");
      //if(bgcolor==null){
      	//return;
      //}
      //else{
      	elmnt.style.backgroundColor = bgcolor;
      	if(elmnt.getAttribute("readOnly")==true){
	        elmnt.style.filter="alpha(opacity=50)";
	    }
	    elmnt.removeAttribute("className");
	    //alert(elmnt.outerHTML);
      //}
  }else{
      elmnt.style.backgroundColor="";
      elmnt.setAttribute("className","required-div");
      if(elmnt.getAttribute("readOnly")==true){
	      elmnt.style.filter="";
	  }     
  }
}