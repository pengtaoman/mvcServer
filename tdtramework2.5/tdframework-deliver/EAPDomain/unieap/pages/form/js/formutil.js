
String.prototype.replaceAll = replaceAll;
String.prototype.trim = trim;

function  replaceAll(findText,repText){
  var raRegExp = new RegExp(findText,"g");
  return this.replace(raRegExp,repText)
}

function trim(){
 return this.replace(/(^\s*)|(\s*$)/g, "");
}

function setStyle(object,name,valueStr){
	if(name=="color"){
		object.style.color = valueStr;
	}else
	if(name=="background-color"){
		object.style.backgroundColor = valueStr;
	}else
	if(name=="font-family"){
		object.style.fontFamily = valueStr;
	}else
	if(name=="font-size"){
		object.style.fontSize = parseInt(valueStr)+"pt";
	}else
	if(name=="font-style"){
		object.style.fontStyle = valueStr;
	}else
	if(name=="font-weight"){
		object.style.fontWeight = valueStr;
	}else
	if(name=="visibility"){
		object.style.visibility  = visibility;
	}
	
}


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

 
function fPoint(iX, iY){
        this.x = iX;
        this.y = iY;
}
function fGetXY(aTag){
  var oTmp = aTag;
  
  //alert(aTag);
   
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
    
    while(parent!=null && parent.tagName!="DIV" || parent.id.indexOf("psd_form_tab")<0){
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

/********************
ArrayList
********************/
function ArrayList(){
 this.buffer=new Array();
 if(arguments.length>0) this.buffer=arguments[0];
 this.length=this.buffer.length;
}
ArrayList.prototype.hashCode=function(){
 var h=0;
 for(var i=0;i<this.lengh;i++)
  h+=this.buffer[i].hashCode();
 return h;
}
 
ArrayList.prototype.size=function(){
 return this.length;
}

ArrayList.prototype.clear=function(){
 for(var i=0;i<this.length;i++) this.buffer[i]=null;
 this.buffer.length=0;
 this.length=0;
}

ArrayList.prototype.isEmpty=function(){
 return this.length==0;
}
 
ArrayList.prototype.toArray=function(){
 var copy=new Array();
 for(var i=0;i<this.length;i++){
  copy[i]=this.buffer[i];
 }
 return copy;
}
ArrayList.prototype.get=function(index){
 if(index>=0 && index<this.length)
  return this.buffer[index];
 return null;
}

ArrayList.prototype.remove=function(param){
 var index=0;
  
 if(isNaN(param)){
  index=this.indexOf(param);
 }
 else index=param;
   
 if(index>=0 && index<this.length){
  for(var i=index;i<this.length-1;i++)
   this.buffer[i]=this.buffer[i+1];
   this.length-=1;
   return true;
 }
 else return false;
}
  
ArrayList.prototype.add=function(){
 var args=arguments;
 if(args.length==1){
  this.buffer[this.length++]=args[0];
  return true;
 }
 else if(args.length==2){
  var index=args[0];
  var obj=args[1];
  if(index>=0 && index<=this.length){
   for(var i=this.length;i>index;i--)
    this.buffer[i]=this.buffer[i-1];
   this.buffer[i]=obj;
   this.length+=1;
   return true;
  }
 }
 return false;
}

ArrayList.prototype.indexOf=function(obj){
 for(var i=0;i<this.length;i++){
  if(this.buffer[i]==obj) return i;
 }
 return -1;
}

ArrayList.prototype.lastIndexOf=function(obj){
 for(var i=this.length-1;i>=0;i--){
  if(this.buffer[i]==obj) return i;
 }
 return -1;
}

ArrayList.prototype.contains=function(obj){
 return this.indexOf(obj)!=-1;
}

ArrayList.prototype.equals=function(obj){
 if(this.size()!=obj.size()) return false;
 for(var i=0;i<this.length;i++){
  if(!obj.get(i)==this.buffer[i]) return false;
 }
 return true;
}

ArrayList.prototype.addAll=function(list){
 var mod=false;
 for(var it=list.iterator();it.hasNext();){
  var v=it.next();
  if(this.add(v)) mod=true;
 }
 return mod;  
}
 
ArrayList.prototype.containsAll=function(list){
 for(var i=0;i<list.size();i++){
  if(!this.contains(list.get(i))) return false;
 }
 return true;
}

ArrayList.prototype.removeAll=function(list){
 for(var i=0;i<list.size();i++){
  this.remove(this.indexOf(list.get(i)));
 }
}

ArrayList.prototype.retainAll=function(list){
 for(var i=this.length-1;i>=0;i--){
  if(!list.contains(this.buffer[i])){
   this.remove(i);
  }
 }
}

ArrayList.prototype.subList=function(begin,end){
 if(begin<0) begin=0;
 if(end>this.length) end=this.length;
 var newsize=end-begin;
 var newbuffer=new Array();
 for(var i=0;i<newsize;i++){
  newbuffer[i]=this.buffer[begin+i];
 }
 return new ArrayList(newbuffer);
}
ArrayList.prototype.set=function(index,obj){
 if(index>=0 && index<this.length){
  temp=this.buffer[index];
  this.buffer[index]=obj;
  return temp;
 }
}

ArrayList.prototype.iterator=function iterator(){
 return new ListIterator(this.buffer,this.length);
}

//ListIterator
function ListIterator(table,len){
    this.table=table;
 this.len=len;                          
    this.index=0;
  
 this.hasNext=function() {
  return this.index< this.len;
    }

    this.next=function() { 
  if(!this.hasNext())
   throw "No such Element!";
  return this.table[this.index++];
    }
}



