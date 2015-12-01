var CURRENT_TREE;
var CURRENT_TITLE;
//var treeValues = new Hashtable();
var openImg = new Image();
    openImg.src = "unieap/pages/form/data/images/tree_open.gif";
var closedImg = new Image();
    closedImg.src = "unieap/pages/form/data/images/tree_close.gif";

var listCtrl = new Object();

//var treeValues = new Hashtable();

var multiselect = false;

function form_tree(name){
    this.name = name;
    this.useFullPath = false;
    this.structure = null;
    this.selectedPath = "";
    this.getValue = getValue;
    this.setValue = setValue;
    this.getText = getText;
    this.setVisible = setVisible;
    this.isVisible = isVisible;
    this.setEnabled = setEnabled;
    this.getMultiselectable = getMultiselectable;
    
    function getMultiselectable(){
       var treeView = getElementsByName(this.name+"_displaytext");
       if(treeView.multiselect=="true"){
           multiselect = true;
       }else{
           multiselect = false;
       }
       return multiselect; 
    }

    function getValue(){
    	 var treeView = getElementsByName(this.name);//document.getElementsByName(this.name)[0];
     	 return treeView.value;
    }
    function setEnabled(enabled){
        var treeTextView = getElementsByName(this.name+"_displaytext");//document.getElementsByName(this.name+"_displaytext")[0];
     	treeTextView.nextSibling.disabled = !enabled;
    }
    function setValue(newValue){
	    
    	var treeView = getElementsByName(this.name);//document.getElementsByName(this.name)[0];
    	var treeTextView = getElementsByName(this.name+"_displaytext");//document.getElementsByName(this.name+"_displaytext")[0];
    	var treeValues = getTreeValues(this.name);
    	if(newValue==""){
    		treeView.value ="";
        	treeTextView.value = "";
        	this.selectedPath = "";
        	return;
    	}
    	this.selectedPath = "";
    	this.displayPath="";
    	//treeValues.clear();
    	var tempvalue = newValue;
    	var value = "";
    	var semIndex = tempvalue.indexOf(",",0);
    	var new_keys = new Array();
    	var i=0;
    	var keys = treeValues.keys();
    	var obj;
    	//alert(keys.length);
    	
    	for(n=0;n<keys.length;n++){
    	   obj = document.getElementById(keys[n]);
           if(obj){
              obj.childNodes[1].checked = false;
           }
    	}
        treeValues.clear();
    	while(semIndex>0){
    	   value = tempvalue.substring(0,semIndex);
    	   tempvalue = tempvalue.substring(semIndex+1,tempvalue.length);
    	   semIndex = tempvalue.indexOf(",",0);
    	   new_keys[i++]=value;  
 	   
    	}
    	new_keys[i] = tempvalue;
	
    	for(k=0;k<new_keys.length;k++){
    	   var datasource = treeView.datasource;
    	   if(!datasource)
    		  datasource = treeView.dataset;
           var doc = document.getElementById(datasource+"_xml").XMLDocument.documentElement;
           var node = doc.selectSingleNode("//node[@value='"+new_keys[k]+"']");
        
           if(!node) return;
        
		temp = node.parentNode;
		text = node.getAttribute("text");
		var path = text;
		if(treeTextView.showpath == "true"){
			this.useFullPath = true;
			while(temp){
				if(temp.parentNode){
					if(temp.parentNode.attributes){
						text = temp.parentNode.getAttribute("text");
						if(text) path  = text +"."+ path ;
					}else
						break;
				}else
					break;
					
				temp = temp.parentNode;
			}
			var dotIndex = path.indexOf(".",0);
			path = path.substring(dotIndex+1,path.length);	
		}
        obj = document.getElementById(new_keys[k]);
        if(obj){
          obj.childNodes[1].checked = true;
        }
		treeValues.put(new_keys[k],path);
		this.selectedPath = this.selectedPath + path + ",";
 	        
    	}
	this.selectedPath = this.selectedPath.substring(0,this.selectedPath.length-1);
	
	//*****remove . from the path ****	
	var raRegExp = new RegExp("\\.","g");
	this.displayPath = this.selectedPath.replace(raRegExp,'');	
	//*****remove end******
	
	treeView.value =newValue;
    treeTextView.value = this.displayPath;//this.selectedPath;
    
    if(treeTextView.required=="true")
    	showRequiredDiv(treeTextView);     

	 if(treeView.onchange){
	 
	 	treeView.fireEvent("onchange");
	 }
        
    }
    function getText(){
       var treeView = getElementsByName(this.name+"_displaytext");//document.getElementsByName(this.name)[0];
       return treeView.value;
    }
    function setVisible(visible){
       var tree = getElementsByName(this.name+"_displaytext");
       //document.getElementsByName(this.name+"_displaytext")[0];
       var img = tree.nextSibling;
       var display = tree.style.visibility;
       if(visible=="visible"||visible=="hidden"){
          display = visible;	
       }else
       if(visible==true){
         display = "visible" 
       }else
       if(visible ==false){
    	 display = "hidden";
       } 	    
       tree.style.visibility =  display;
       img.style.visibility =  display;
    }
    //useless
    function isVisible(){
       var tree = getElementsByName(this.name+"_displaytext");
       return tree.style.visibility!="hidden";
    }
}

////////////////////////
function draw(name)
{
 if (!getObjectById("fptree_"+name))
 {
   var div = document.createElement("DIV");
   div.id = 'tree_parent_'+name;
   div.attachEvent("onclick",function() {
	   event.cancelBubble=true; 
         }
   );

   with(div.style){
      position="absolute"; 
      visibility = "hidden";
      backgroundColor = "white";
      borderWidth = 1;
      borderColor = "black";
      borderStyle = "solid";
      //overflow= "auto";
      marginLeft= 0;
      marginTop = 0;
   }
   var formtree = getFormTree(name); 
   var checked = "";
   if(formtree.useFullPath){
   		checked = "checked";
   }

   var txt = '<div style="overflow:auto;height:300px;"><div onmousedown="event.cancelBubble=true" style="POSITION:relative;visibility:inherit; background-color:#EEEEEE;cursor:hand;word-break:keep-all">'+
             '<table style="width:100%"><tr><td align="left"><input type="checkbox" id="fptree_check_001100_'+name+'" ' + checked +' onclick="setTreeFullPath(\''+name+'\')"/><font size=2px>\u5168\u8def\u5f84</font>'+
             "</td><td align = 'right'><a style='font-size:12px;color:blue;cursor:hand' onclick='clearTreeValue()'>\u6e05\u7a7a</a>  "+
             "<a style='font-size:12px;color:blue;cursor:hand' onclick='fHidePopupTree()'>\u786e\u5b9a</a></td>"+
             "</tr></table>"+"</div>"+
             '<div id="fptree_'+name+'" treename="'+name+'" onclick="event.cancelBubble=true" onmousedown="event.cancelBubble=true" style="POSITION:relative;z-index:100;word-break:keep-all">'+
             "</div></div>" +
             '<iframe frameborder="0" scrolling="no" border="1" style="position:absolute; visibility:inherit; top:0;left:0;width:100%; height:100%;z-index:-1;"></iframe>';
             
   div.innerHTML = txt;
   document.body.appendChild(div);          
   
  }

}
////////////////
function getObjectById(name)
{
    if (document.getElementById)
    {
        return document.getElementById(name);
    }
    else if (document.all)
    {
        return document.all[name];
    }
    else if (document.layers)
    {
        return document.layers[name];
    }
    return false;
}
///////////////////////////////////////////////////////////////
function getPopupTree(name){
  //return getObjectById("tree_parent_"+name);
  return getObjectById("tree_parent_"+name);
}
function popFormTree(pp, dt){

  event.cancelBubble=true;
  fHidePopupTree();
  hiddenTreeTitle();
  var poptree = getPopupTree(pp);
  if(!poptree)
  {
     buildTree(pp); 
  }
  ////////////////////////////////////////
  listCtrl = document.getElementById(dt);
  popCtrl = document.getElementById(pp+"_displaytext");
  ////////////////////////////////////////
  var point = fGetXY(popCtrl);
	//alert(point.x+":"+point.y+":");
  CURRENT_TREE = getPopupTree(pp);
  
  if(CURRENT_TREE){
	  with (CURRENT_TREE.style)
	  {
	  	left = parseInt(point.x);
	        top  = parseInt(point.y) + parseInt(popCtrl.style.height);
	        width = parseInt(popCtrl.style.width) + popCtrl.nextSibling.width;
	        if(width<200)
	            width = 200;    
	        height= 300; 
	        visibility = 'visible';
	  }
	  CURRENT_TREE.focus();
  }else{
    alert("\u6ca1\u6709\u4efb\u4f55\u6570\u636e\u6e90\u548c\u6b64\u6570\u636e\u6811\u7ed1\u5b9a");
  }
}

function showBranch(id){
       //this.treeDoc.xml
       //select all the treeValues
        
       var evtSrc = window.event.srcElement;
       var img;   
       if(evtSrc.tagName=="IMG"){
       	   img = evtSrc;
           evtSrc = evtSrc.parentNode;
       }
       span = evtSrc;
       
       span = span.nextSibling;
       
       
       //alert(span.parentNode.treename);
       var treeValues = getTreeValues(span.parentNode.treename);
	    
        if(treeValues!=null){ 
      	  var keys = treeValues.keys();
          var obj;
          
          for(i=0;i<keys.length;i++){
            
      	    obj = document.getElementById(keys[i]);
      	    if(obj!=null)
     	       obj.childNodes[1].checked = true;
     	       //alert(obj.outerHTML);
          }
        }
        
       if(span.childNodes.length==0){ 
        var level = 1;
		temp = evtSrc;
		path =  "/node[@value='"+temp.id+"']";	
		
		while(temp.parentNode.tagName!='DIV'){
			temp = temp.parentNode;
			temp = temp.previousSibling;
			path = "/node[@value='"+temp.id+"']/elements[0]"+path;	
			level++;
		}
		
		var treeName = temp.parentNode.treename;
		
		var dt_dsname = getElementsByName(treeName).datasource;//document.getElementsByName(treeName)[0].datasource;
		var doc = document.getElementById(dt_dsname+"_xml").XMLDocument;
		
		var node1=doc.selectSingleNode(path);
		     		
	 	buildLevel(treeName,span,level);
	 	
	        if(node1==null)
	 		return;
		if(!(node1.hasChildNodes))
			return;
		node1=node1.childNodes[0]
		var treeStyle = FORM_OBJECT_POOL.get("tree_style");
            var innerHtml =node1.transformNode(treeStyle)
            span.innerHTML = innerHtml;
            if(treeValues!=null){
      	      var keys = treeValues.keys();
              var obj;
              for(i=0;i<keys.length;i++){
      	        obj = document.getElementById(keys[i]);
      	        if(obj!=null)
     	           obj.childNodes[1].checked = true;
              }
            }
       }
       
	   if(span.style.display=="block")
		   	span.style.display="none";
	   else
		   	span.style.display="block";
	   
       
       swapFolder(img);
       
}

function swapFolder(img){
	objImg = img;//document.getElementById(img);
	if(!objImg)
	   return;
	if(objImg.src.indexOf('close.gif')>-1)
		objImg.src = openImg.src;
	else
		objImg.src = closedImg.src;
}


function fHidePopupTree(){
  if(CURRENT_TREE==null) return;
  CURRENT_TREE.style.visibility = "hidden";
 
}

function treeTagInBound(aTag){

  with (CURRENT_TREE.style){
        var l = parseInt(left);
        var t = parseInt(top);
        var r = l+parseInt(width);
        var b = t+parseInt(height);
        var ptLT = fGetXY(aTag);
        return !((ptLT.x>r)||(ptLT.x+aTag.offsetWidth<l)||(ptLT.y>b)||(ptLT.y+aTag.offsetHeight<t));
  }
}
///***************************************************************************************
//***2006.12***** add by liuying********start***************
// clear tree Value
function clearTreeValue(){
    var tree = getFormTree(listCtrl.name);
    var treeValues = getTreeValues(listCtrl.name);
    var treeTextView = getElementsByName(listCtrl.name+"_displaytext");

    var keys = treeValues.keys();
    var obj ;
    for(i=0;i<keys.length;i++){
       obj = document.getElementById(keys[i]);
       if(obj!=null){
          obj.childNodes[1].checked = false;
       }
    }
    treeValues.clear();
    
    //treeTextView.value = "";
    tree.setValue("");
    
    if(treeTextView.required=="true")
    	showRequiredDiv(treeTextView); 
    
    fHidePopupTree(); 
    	
    if(listCtrl.onchange){
	 	listCtrl.fireEvent("onchange");
	}
	
}

//when obj is selected set the tree value immediatey
function setTreeValue(value){
  
  var obj = window.event.srcElement;
  var parent=obj.parentElement;
  var tree = getFormTree(listCtrl.name);
  var treeValues = getTreeValues(listCtrl.name);
  if(tree.getMultiselectable()){ 
    if(obj.tagName=="INPUT"){
  	if(!obj.checked){
  		treeValues.remove(value);
  		setTreeText();
  		
  		return;
  	}
    }else {
        if(treeValues.containsKey(value)){
  	
  	if(parent.childNodes[1].checked){
  		parent.childNodes[1].checked = false;
  		treeValues.remove(value);
  		setTreeText();
  		
  		return;	
  	}
  	else{
  		parent.childNodes[1].checked = true;
  	}
    } 
    else{
    	parent.childNodes[1].checked = true;
    } 
   }
  }else{
    treeValues.clear();
  } 
  
  
  var path=parent.path;

  if(tree.useFullPath)
  {
     
     path=getFullPath(parent,path)  
     	
  }
  
  treeValues.put(value,path);
  setTreeText();

  //fHidePopupTree();
}
// set current display text
function setTreeText(){
  var tree = getFormTree(listCtrl.name);
  var treeValues = getTreeValues(listCtrl.name);
  var treeText = getElementsByName(listCtrl.name+"_displaytext");//document.getElementsByName(listCtrl.name+"_displaytext")[0];
  
  var texts = treeValues.values();
  var keys = treeValues.keys(); 
  var path="";
  var value = "";
  for(n=0;n<texts.length;n++){
    path = path + texts[n]+",";	
    value = value + keys[n]+","; 
  }
  path = path.substring(0,path.length-1);
  value = value.substring(0,value.length-1);
  
  //*****remove . from the path ****
  var raRegExp = new RegExp("\\.","g");
  path = path.replace(raRegExp,'');
  //****remove end**********//
	
	
  treeText.value = path;
  
  if(treeText.required=="true"){
	   showRequiredDiv(treeText);
  }
  
  if(listCtrl.value != value){
     //tree.setValue(value);
     listCtrl.value = value;
	 if(listCtrl.onchange){
	 	listCtrl.fireEvent("onchange");
	 }
  }
}
// pop the title div of the tree
function popTreeTitle(pp){
  
  event.cancelBubble=true;
  fHidePopupTree();
  var poptitle = createTreeTitle(pp);
  
  CURRENT_TITLE = poptitle;
  ////////////////////////////////////////
  
  var treeValues = getTreeValues(pp.substring(0,pp.indexOf("_")));
  popCtrl = document.getElementById(pp);
  
  //if can not find the image(the tree no privilege)
  if(popCtrl.nextSibling==null){
    return;
  }
  ////////////////////////////////////////
  var values = treeValues.values();
   var title = "";
   for(i=0;i<values.length;i++){
      title=title +  values[i] +"<br/>" ;	
   }
   
  //*****remove . from the path ****
  var raRegExp = new RegExp("\\.","g");
  title = title.replace(raRegExp,'');
  //****remove end**********//   
   
   
   var txt = '<div id="'+pp+'_title" treename="'+name+'" onclick="event.cancelBubble=true" onmousedown="event.cancelBubble=true" style="font-size:12px;POSITION:relative; z-index:100;word-break:keep-all">'
             + title +"</div>"
             + '<iframe frameborder="0" scrolling="no"  border="1" style="position:absolute; visibility:inherit; top:0;left:0;width:100%; height:100%;z-index:-1;"></iframe>';
   			 
   poptitle.innerHTML = txt;//inherit background-color:#FFFFE0; 
  var point = fGetXY(popCtrl.parentNode); 
  with(poptitle.style){
	  	left = parseInt(point.x);
	    top  = parseInt(point.y) + parseInt(popCtrl.style.height);
	    width = parseInt(popCtrl.style.width) + popCtrl.nextSibling.width;
	    if(width<200)
	         width = 200;    
	    height= 100; 
	    visibility = 'visible';
  }
  
}
//hidde the title div 
function hiddenTreeTitle(){
  if(CURRENT_TITLE == null) return;
  else{
      CURRENT_TITLE.style.visibility = "hidden";
  }
}
//crate title div of tree
function createTreeTitle(name){
  
  hiddenTreeTitle();
  var obj = getObjectById(name+"_title");
  if (!obj)
 {
   var div = document.createElement("DIV");
   div.id = name+"_title";
   div.attachEvent("onclick",function() {
	   event.cancelBubble=true; 
   }
   );
   
   with(div.style){
      position="absolute"; 
      visibility = "hidden";
      backgroundColor = "white";//#FFFFE0
      borderWidth = 1;
      borderColor = "black";
      borderStyle = "solid";
      overflow= "auto";
      marginLeft= 0;
      marginTop = 0;
   }
   document.body.appendChild(div);
   return div;
  }else{
   return obj;
  }

}
//*********2006.12******add by liuying*********end******
//******************************************************************************************
// get full path of the selected obj
function getFullPath(obj,path){
  
  var path0=path
  var pNode=null;
  if(obj.parentElement!=null&&obj.parentElement.previousSibling!=null)
    pNode=obj.parentElement.previousSibling
  if(pNode==null)
    return path0;
  var path1=pNode.path
  if(path1==null){
   return path0;
  }
  if(path1!=null){
     path0=path1+"."+path0
  }
  var path2=getFullPath(pNode,path0)
  return path2;
}

function parseTree(struct){

  var  nodeStack = new Array();

  var root;

  var tokens = struct;
  var i=0;
  var tokenBuffer = "";
        var ch;
  var maxIndex=-1;
  while(i<tokens.length){
     ch = tokens.charAt(i);
     switch(ch){
       case ';':
        //pop tree node

        var node = nodeStack[maxIndex--];
        if(maxIndex==-1){
          root = node;

        }else{
          var parentNode = nodeStack[maxIndex];

          parentNode.add(node);
          nodeStack[maxIndex]= parentNode;
        }
        break;
       case ')':
        //push tree node
        var tt = tokenBuffer.split(",");
        nodeStack[++maxIndex] = new FStructTreeNode(tt[0],tt[1]);
        if(tt.length==3)
            nodeStack[maxIndex].selectable = tt[2];
        
        tokenBuffer="";
        break;
      case '}':
      case '{':
      case '(':
        break;
      default:
        tokenBuffer +=ch;
        break;

    }
    i++;
  }
  return root;
}
function buildTree(dt_name)
{

    var tree=getFormTree(dt_name);

    var dt_dsname = getElementsByName(dt_name).datasource;//document.getElementsByName(dt_name)[0].datasource;
    if(!dt_dsname){
    	dt_dsname = getElementsByName(dt_name).dataset;//document.getElementsByName(dt_name)[0].dataset;
    	if(!dt_dsname)
    		return;
    }	
    
    var doc = document.getElementById(dt_dsname+"_xml").XMLDocument;
    this.treeDoc=doc;
    //var path = document.location.pathname;
    //var pos=path.lastIndexOf('/', path.length-1);
    //path = path.substring(0,pos);
    //var url="http://"+ document.location.hostname + ":" + document.location.port + path +"/data/xsl/tree.xsl";
    var url = "unieap/pages/form/data/xsl/tree.xsl";
    
    try{
      var treeStyle = new ActiveXObject("MSXML2.DOMDocument");
      treeStyle.async = false;
      treeStyle.load(url);
      FORM_OBJECT_POOL.put("tree_style",treeStyle);
 
      var struct = getElementsByName(dt_name).structure;//document.getElementsByName(dt_name)[0].structure;
      var rootNode = parseTree(struct);
      tree.structure = rootNode;

      draw(dt_name);

      //FORM_OBJECT_POOL.put(dt_name,tree);
    
      var div = document.getElementById("fptree_"+dt_name);
    
      buildLevel(dt_name,div,1);

      div.innerHTML = doc.documentElement.transformNode(treeStyle); 
    }
    catch(e){
      alert(e.description);
    }
    
    return tree;
   
}
function getTreeValues(treeName){
  var treeValues = FORM_OBJECT_POOL.get(treeName+"_values");
  try{
    if(!treeValues){
        treeValues = new Hashtable();
        FORM_OBJECT_POOL.put(treeName+"_values",treeValues);
      }
  }
  catch(e){
      alert(e.description);
    }
    return treeValues;
}
function getFormTree(treeName){
    var tree =  FORM_OBJECT_POOL.get(treeName);	
    
    try{
      if(!tree){//tree==null
    	tree = new form_tree(treeName);
    	FORM_OBJECT_POOL.put(treeName,tree);
      }
    }
    catch(e){
      alert(e.description);
    }
    return tree;
}
function setTreeFullPath(treeName){
    

    var tree = getFormTree(treeName);
    var treeValues = getTreeValues(treeName);
    tree.useFullPath= window.event.srcElement.checked;
    var keys;
    var values;
    var treeView = getElementsByName(treeName);//document.getElementsByName(this.name)[0];
    var treeTextView = getElementsByName(treeName+"_displaytext");
    
    var tempText = "";
    //if(treeValues!=null){
    	keys = treeValues.keys();
        values = treeValues.values();
    //}
    // when the check box was selected turn all the path to  fullpath
    if(tree.useFullPath){
    	
        for(k=0;k<keys.length;k++){
    	   var datasource = treeView.datasource;
    	   if(!datasource)
    		  datasource = treeView.dataset;
           var doc = document.getElementById(datasource+"_xml").XMLDocument.documentElement;
           var node = doc.selectSingleNode("//node[@value='"+keys[k]+"']");
        
           if(!node) return;
        
		   temp = node.parentNode;
		   text = node.getAttribute("text");
		   var path = text;
		
			
			while(temp){
				if(temp.parentNode){
					if(temp.parentNode.attributes){
						text = temp.parentNode.getAttribute("text");
						if(text) path  = text +"."+ path ;
					}else
						break;
				}else
					break;
					
				temp = temp.parentNode;
			}
			var dotIndex = path.indexOf(".",0);
			path = path.substring(dotIndex+1,path.length);	

		treeValues.put(keys[k],path);  
		tempText = tempText + path + ",";
	  }	
    }else{
        //else turn all fullpath to path
        var tempvalue="";
        
    	for(i=0;i<keys.length;i++){
    	  var pt = values[i].indexOf("."); 
     	  if(pt<0){
	         tempText = tempText + treeValues.get(keys[i]) + ",";
	         break;
	      }else{
	        tempValue = values[i];
     	    while(pt>0){
     	        tempValue = tempValue.substring(pt+1,values[i].length);
     	        pt = tempValue.indexOf(".");
     	    }
     	    treeValues.remove(keys[i]);
     	    treeValues.put(keys[i],tempValue);
     	    tempText = tempText + tempValue + ",";
          }
        }
    }
    tempText = tempText.substring(0,tempText.length-1);
    
    
    //*****remove . from the path ****
    var raRegExp = new RegExp("\\.","g");
    tempText = tempText.replace(raRegExp,'');
    //*****remove end******
    
    // change the display text immediately
    treeTextView.value = tempText;
}


function FStructTreeNode(id,name){
  this.id = id;
  this.name = name;
  this.selectable = '0';
  this.child = null;

}
FStructTreeNode.prototype.add = function(node){
  this.child = node; 
}


function buildLevel(treeName,parentNode,level){
    //if node selectable
    
    var tree = getFormTree(treeName);
    var node = tree.structure;
    var i = 0;
    var selectable = '0';
    
    while(i<level){
      	node = node.child;
       	i++;
    }
    if(node) selectable = node.selectable;
    
    
    var treeStyle = FORM_OBJECT_POOL.get("tree_style");
    
    var variables = treeStyle.selectNodes("//xsl:variable");
	
    variables.item(0).setAttribute("select",selectable);

    variables.item(1).setAttribute("select",tree.getMultiselectable());

}
function getElementsByName(treename){
	var tree = document.getElementsByName(treename)[0];//alert(tree);
	if(!tree){
		alert("\u9519\u8bef\u7684\u63a7\u4ef6\u540d\u79f0 {" + treename + "}");
	}
	return tree;
}