
var newWindow; 
var cssName = "unieap/form/css/form.css";
var a = 0;
var pageIDs;
var hashtable = new Hashtable();
var hashtable2 = new Hashtable();
var hashtable3 = new Hashtable();
var posHeight = new Array();
var scrollHeight = new Array();
var seals = new Array();
var containPrint = false;
var prtOrPre;
var pageNums =0;
var textarea_pagenum = 1;
function preview(divName) {
    hashtable.clear();
    pageIDs = new Array();
    pageIDs[0] = divName;
    //pageObj = document.getElementById(divName);
    //var html = pageObj.innerHTML;
    var height = window.screen.availHeight;
    var width = window.screen.availWidth;
    if(newWindow)
    	newWindow.close();
    window.open("form/formpreview.html","","scrollbars,menubar,status,height="+height+",width="+width+",resizable");
}

function printAll(){
    
	var printable = FORM_OBJECT_POOL.get("printable");
    if(printable=="false") return;
    
    this.prtOrPre = "prnt"
	containPrint = containPrintModel();
    var count = NSFTHandler.idCounterTab;
    if(containPrint){
       	var paramTable = getHrefParameters(); 
	    paramTable.setParameter("modelof","print");
	    paramTable.setParameter("subcmd","getpagecount");
	    count = parseInt(getModelInfo(paramTable));
    }
    hashtable.clear();
    pageIDs = new Array();
    for(i=0;i<count;i++){
    	pageIDs[i] = "psd_form_tab"+i;
    }
    
    if(containPrint){
	//LoadPrintModel();
	ifframe = document.createElement("iframe");
	ifframe.id = "form_innerF";
	ifframe.src = getURL();
	ifframe.style.visibility = "hidden";
	ifframe.attachEvent("onload",function(){processForm(ifframe.contentWindow.document)});
    	document.body.appendChild(ifframe);
    }
    else{
       processForm(document);
    }
    
    //window.open("form/formpreview.html","","top=1900,left=1900,scrollbars,menubar,status,height="+height+",width="+width+", resizable");
    //var printObj  = document.all.WebBrowser;
    //printObj.ExecWB(6,1);
}

function previewAll(){
    var printable = FORM_OBJECT_POOL.get("printable");
    if(printable=="false") return;
 

    this.prtOrPre = "prev"
    containPrint = containPrintModel();
    var count = NSFTHandler.idCounterTab;
    if(containPrint){
       	var paramTable = getHrefParameters(); 
	    paramTable.setParameter("modelof","print");
	    paramTable.setParameter("subcmd","getpagecount");
	    count = parseInt(getModelInfo(paramTable));
    }
    hashtable.clear();
    pageIDs = new Array();
    for(i=0;i<count;i++){
    	pageIDs[i] = "psd_form_tab"+i;
    }
    
    if(containPrint){
	//LoadPrintModel();
	ifframe = document.createElement("iframe");
	ifframe.id = "form_innerF";
	ifframe.src = getURL();
	ifframe.style.visibility = "hidden";
	ifframe.attachEvent("onload",function(){processForm(ifframe.contentWindow.document)});
    	document.body.appendChild(ifframe);
    }
    else{
       processForm(document);
    }
    

    //window.open("unieap/pages/form/formpreview.html","","scrollbars,menubar,status,height="+height+",width="+width+",resizable");
     //window.open("unieap/pages/form/formpreview.html","","top=0,left=0,height=20, width=20, resizable");
}


function processForm(obj){
    
    myreport = new Object();
    var overprint = document.forms(0).overprint;
    var ids = getPageIDs(); 
    
    var idx = 0;

    var main_div = document.createElement("div");//document.getElementById("print_temp");//
    main_div.setAttribute("id","form_print_temp_div");
    document.body.appendChild(main_div);
    main_div.style.display = "inline";
     	while(idx < ids.length){
    	
       		div = document.createElement("div");	  
       		div.setAttribute("id","form_page"+(idx+1));
       
       		var page = obj.getElementById(ids[idx]);   
       		//alert(ids[idx]+":"+page)
       		
   	 	    div.innerHTML = page.innerHTML;
   	 	    div.setAttribute("margin",page.margin);
	        
      	 	main_div.appendChild(div);
      	 	procElements(div,obj,containPrint,overprint);
      	 	idx++;	 
      	}
                  
        pageNums = ids.length;
        
        processGridAgain(containPrint,main_div,obj);
        processSeals();
        processTextArea(containPrint,main_div);
  
     if(overprint!="true"){
  	 moveElements();
     }

     myreport.documents = document;//document;//main_div;//ifframe.document;//.getElementById("form_page1");;
     myreport.copyrights='\u6770\u521b\u8f6f\u4ef6\u62e5\u6709\u7248\u6743 www.jatools.com';
     myreport.page_div_prefix = "form_";
     //<OBJECT ID=\"jatoolsPrinter\" style=\"display: none\" CLASSID=\"CLSID:B43D3361-D975-4BE2-87FE-057188254255\" codebase=\"unieap/pages/form/jatoolsP.cab#version=1,2,0,2\"></OBJECT>
     //document.getElementById("print_div")
     if(!document.getElementById("jatoolsPrinter")){
	     var div =  document.createElement("div");
	     div.innerHTML = "<OBJECT ID=\"jatoolsPrinter\" style=\"display: none\" CLASSID=\"CLSID:B43D3361-D975-4BE2-87FE-057188254255\" codebase=\"unieap/pages/form/jatoolsP.cab#version=2,1,0,3\"></OBJECT>";
	     document.body.appendChild(div);
	 }
     if(this.prtOrPre == "prev"){
     	try{
     	   jatoolsPrinter.printPreview(myreport);
     	   }catch(e){
     	   }
     }else if(this.prtOrPre == "prnt"){
           jatoolsPrinter.print(myreport,true);
     }

     document.attachEvent("onfocusin",function(){removeDiv("form_print_temp_div"); });

     
     	
}
function removeDiv(id){
   var ff = document.getElementById("form_innerF");
   if(ff){
   	document.body.removeChild(ff);
   	
   } 	

   var temp_div = document.getElementById(id);
   if(temp_div){
        document.body.removeChild(temp_div);
   }
}
function containPrintModel(){
    var paramTable  =  getHrefParameters(); 
    try{ 
      var contains = formCommandRequest("com.neusoft.form.engine.FormExistsCommand","",paramTable);
    }catch(e){
      alert(e.description);
    }
    if(contains=="1")
      return true;    
    return false;
}
function getModelInfo(paramTable){

    var rect = formCommandRequest("com.neusoft.form.engine.GetModelInfo","",paramTable);
    return rect;
}

function getURL(){
    var parameter = getHrefParameters();  
    var path = document.location.pathname;
    var pos=path.lastIndexOf('/', path.length-1);
    path = path.substring(0,pos);
    var url="http://"+ document.location.hostname + ":" + document.location.port + path +"/XMLReceiver?command=com.neusoft.form.engine.FormPrintListener";
    if(parameter.length()>0){
        url += "&"+parameter.toString();
        url = url.substring(0,url.length-1);
    }
    return url;
}
function getPageIDs(){
	return pageIDs;
}
function doNothing(){
}
function procElements(obj,modelDoc,usePrintModel,overprint){
    
    document.onclick = "doNothing()";
    //process datagrid
    var newXML = new ActiveXObject("MSXML2.DOMDocument");
    newXML.async = false;
    var datasetNode = newXML.createElement("dataset");
    newXML.appendChild(datasetNode);
    var dgs = obj.getElementsByTagName("DIV");
	
    for(i=0;i<dgs.length;i++){
           //alert(dgs[i].type);
           if(dgs[i].type=="gismap"||dgs[i].type=="giscoords"){
           	dgs[i].parentNode.removeChild(dgs[i]);    
    		i--;
           } else   	
      if(dgs[i].type){
           var xmlID;
           var xslID;

       	   if(dgs[i].type=="datagrid"){
      	   		xmlID = "grid_" + dgs[i].datasource;	
      	   		xslID = xmlID+"_xsl";
      	   }else
      	   if(dgs[i].type=="appendtable"){
      	   		xmlID = dgs[i].id+"_xml";	
      	   		xslID = xmlID+"_xsl";
      	   }else{
      	   		continue;
      	   }
      	   var xml;
      	   var xsl;
      	   
      	   if(usePrintModel){

      	        xml = modelDoc.getElementById(xmlID);//htmlXmlDoc.selectSingleNode("//xml[@id='"+xmlID+"']");
     	  	    xsl = modelDoc.getElementById(xslID);//htmlXmlDoc.selectSingleNode("//xml[@id='"+xslID+"']");
 
     	   }else{
      	   	    xml = document.getElementById(xmlID);//opener.document.getElementById(xmlID);//
	       	    xsl = document.getElementById(xslID);//opener.document.getElementById(xslID);//
	       }
	   
       	   xml = xml.cloneNode(true);
	       xsl = xsl.cloneNode(true);


       	   var temp = xsl.selectSingleNode("//xsl:template[@match='record']");
       	   tr = temp.selectSingleNode(".//tr");
	
       	   tr.selectSingleNode("@onclick").value = "doNothing()";
       	   tr.selectSingleNode("@onmouseover").value = "doNothing()";
       	   tr.selectSingleNode("@onmouseout").value = "doNothing()";
       	   tds = tr.selectNodes("td");
       	  
       	   for(j=0;j<tds.length;j++){
       	   		if(overprint=="true"){
       	        	tds.item(j).setAttribute("border-style","none");
       	        	tds.item(j).setAttribute("class","hidden_cell");
       	        }
	       	   	tdclick = tds.item(j).selectSingleNode("@onclick");
	       	   	if(tdclick)
	       	   	   tdclick.value ="doNothing()";
       	   }
       	   tds = xsl.selectNodes("//table/tr/th");
       	   
       	   for(j=0;j<tds.length;j++){
       	       if(overprint=="true"){
       	        	tds.item(j).setAttribute("border-style","none");
       	        	tds.item(j).setAttribute("class","hidden_cell");
       	        }
       	   	   tdclick = tds.item(j).selectSingleNode("@onclick");
       	   	   if(tdclick)
       	   	      tdclick.value ="doNothing()";
       	   }
       	   
       	   dgs[i].style.overflow = "visible";
       	   //dgs[i].style.border = "none";
       	   dgs[i].setAttribute("oldHeight",dgs[i].style.height);

       	   dgs[i].onmouseleave = "doNothing()";
       	   dgs[i].onmouseenter = "doNothing()";
       	   
       	   var exprTableHeight = 0;
       	   tables = xsl.selectNodes("//table"); 
       	   if(tables.length==2){
       	   		footTrs = tables.item(1).selectNodes("tr");
       	   		for(k=0;k<footTrs.length;k++){ 
       	   			exprTableHeight += parseInt(footTrs.item(k).getAttribute("height"));
       	   		}
       	   }
       	   //
       	   var allRowHeight = parseInt(dgs[i].style.height) - parseInt(dgs[i].headerheight) - exprTableHeight;
       	   var displayRows =  dgs[i].pagesize;//parseInt(allRowHeight/parseInt(dgs[i].rowheight));
         
	   temp = datasetNode.cloneNode(false);
	   newXML.replaceChild(temp,datasetNode);
	   datasetNode = temp;
    	   records = xml.selectNodes("//record[@state>=0 and @state<3]");
    	   
       	   for(k=0;k<displayRows&&k<records.length;k++){
       	   		datasetNode.appendChild(records.item(k));
       	   		
       	   }
       	  
       	   
       	   //pool the object
       	   hashtable.put(dgs[i].id,dgs[i]);
       	   var selAttr = xsl.selectSingleNode("//xsl:apply-templates/@select");
       	   if(selAttr)
       	      selAttr.value = "record"; 
       	   dgs[i].innerHTML = newXML.transformNode(xsl);
	   
       	   dgs[i].style.visibility = "visible";
       	   //alert(dgs[i].style.borderStyle);
       	   /*tables = dgs[i].getElementsByTagName("table");
       	   if(tables!=null && tables.length>=2){
       	   		tables[1].style.position = "relative";
       	   		tables[1].style.top = '';
       	   		
       	   }*/
       	   if(overprint=="true"){
	       	   var trs = dgs[i].getElementsByTagName("TR");
	           var ths = trs[0].getElementsByTagName("TD");
	           dgs[i].style.borderStyle= "none";
	           for(j=0;j<ths.length;j++){
	             ths[j].style.borderStyle = "none";
	             ths[j].className = "empty_cell";
	             ths[j].innerText = "";
	           }
           }
       }
       
    }
	
   
    var tableList = obj.getElementsByTagName("TABLE");
    for(i=0;i<tableList.length;i++){
    	if(tableList[i].printable=="false"&&overprint=="true"){
        	tableList[i].parentNode.removeChild(tableList[i]);
        	i--;
        	continue;
        }
    	if(overprint=="true"){
    		if(tableList[i].type=="table"){ 
    		    tableList[i].style.borderStyle="none";

    			var tdLists = tableList[i].getElementsByTagName("TD");
    			for(j=0;j<tdLists.length;j++){
	    			tdLists[j].className = "hidden_cell";
	    			tdLists[j].style.borderStyle = "none";	   			
    			}
    		}
    	}
    }    
    //remove all iframes 
    var iframes = obj.getElementsByTagName("iframe");
    for(i=0;i<iframes.length;i++){
    	iframes[i].parentNode.removeChild(iframes[i]);
    	i--;
	}
    var labels = obj.getElementsByTagName("label");
    for(i=0;i<labels.length;i++){
      if(labels[i].printable=="false"&&overprint=="true"){
        labels[i].parentNode.removeChild(labels[i]);
        i--;
      }
    }    
    var imgs = obj.getElementsByTagName("img");
    for(i=0;i<imgs.length;i++){
    	if((imgs[i].src && imgs[i].src.indexOf("unieap/pages/form/images/calendar.gif")!=-1) ||
    	    (imgs[i].src && imgs[i].src.indexOf("unieap/pages/form/images/datatree.gif")!=-1)||
    	    (imgs[i].id) || imgs[i].printable=="false"&&overprint=="true"){
    	    imgs[i].parentNode.removeChild(imgs[i]);
    	    i--;
    	}

    }
    
    var objs = obj.getElementsByTagName("object");
    var k =0 ;
    for(i=0;i<objs.length;i++){
	if(objs[i].type=="seal"){
	    //loadSeal("seal1","","");
	    seals[k] = objs[i].id;
	    k++;	
	}
	objs[i].parentNode.removeChild(objs[i]);    
    	i--;
    }
    
    var inputs = obj.getElementsByTagName("input");
    var reg = /(submit|reset|button|file|password)/i;
    for(i=0;i<inputs.length;i++){
        
    	if(inputs[i].style.visibility && inputs[i].style.visibility=="hidden"){
    	     //inputs[i].parentNode.removeChild(inputs[i]);
    	     //i--;
    	     continue;
    	}
    	//remove buttons
    	if(reg.test(inputs[i].type)||inputs[i].printable=="false"&&overprint=="true"){
    	     inputs[i].parentNode.removeChild(inputs[i]);
    	     i--;
    	}else
    	if("calendar"==inputs[i].getAttribute("type")){
    	     //if()
			/*
			* remove "?" "?" "?"
			*/
    	     value = inputs[i].value;
    	     if(overprint=="true"){
	    	     if(value.indexOf("\u5e74")>-1){
	    	       value = value.replace("\u5e74","   ");
	    	     }
	    	     if(value.indexOf("\u6708")>-1){
	    	       value = value.replace("\u6708","   ");
	    	     }
	    	     if(value.indexOf("\u65e5")>-1){
	    	       value = value.replace("\u65e5","   ");
	    	     }
	    	     /*while(value.indexOf("-")>-1){
	    	       value = value.replace("-"," ");
	    	     }
	    	     while(value.indexOf(".")>-1){
	    	       value = value.replace("."," ");
	    	     }
	    	     while(value.indexOf("/")>-1){
	    	       value = value.replace("/"," ");
	    	     }*/
    	     }
    	     
    	     
    	     label = document.createElement("label");
    	     label.style.position = inputs[i].style.position;
    	     label.style.top = inputs[i].style.top;
    	     label.style.left = inputs[i].style.left;
    	     label.style.width = inputs[i].style.width;
    	     label.style.height = inputs[i].style.height;
    	     label.style.lineHeight = inputs[i].style.height;
    	     label.style.fontFamily = inputs[i].style.fontFamily;
    	     label.style.fontStyle = inputs[i].style.fontStyle;
    	     label.style.fontWeight = inputs[i].style.fontWeight;
    	     label.style.fontSize = inputs[i].style.fontSize;
    	     label.style.foreground = inputs[i].style.foreground;
    	     label.style.background = inputs[i].style.background;
             if(overprint=="true"){
    	       	label.style.borderStyle = "none"; 
    	     }
             else{
             	label.style.borderStyle = inputs[i].style.borderStyle;
             	label.style.borderWidth = inputs[i].style.borderWidth;
             	label.style.borderColor = inputs[i].style.borderColor;
             }
             label.style.textAlign =  inputs[i].style.textAlign;
             label.style.overflow = "hidden";
    	     label.style.textOverflow = "ellipsis";
    	     label.name = inputs[i].name;
             label.innerText = value;

    	     if(label.style.borderStyle.indexOf("solid")<0){
    	        label.style.borderStyle = "none";
    	     }else{
    	        if(label.style.borderTopWidth>0)
    	           label.style.borderStyle = "none";
    	     }
   	     
    	     inputs[i].parentNode.replaceChild(label,inputs[i]);
    	     i--
    	     
    	}else
    	//process text
    	if(inputs[i].getAttribute("type")=="text"){
 			 	
    	     label = document.createElement("label");
    	     label.style.position = inputs[i].style.position;
    	     label.style.top = inputs[i].style.top;
    	     label.style.left = inputs[i].style.left;
    	     label.style.width = inputs[i].style.width;
    	     label.style.height = inputs[i].style.height;
    	     label.style.lineHeight = inputs[i].style.height;
    	     label.style.fontFamily = inputs[i].style.fontFamily;
    	     label.style.fontStyle = inputs[i].style.fontStyle;
    	     label.style.fontWeight = inputs[i].style.fontWeight;
    	     label.style.fontSize = inputs[i].style.fontSize;
    	     label.style.foreground = inputs[i].style.foreground;
    	     label.style.background = inputs[i].style.background;
             if(overprint=="true"){
    	       	label.style.borderStyle = "none"; 
    	     }
             else{
             	label.style.borderStyle = inputs[i].style.borderStyle;
             	label.style.borderWidth = inputs[i].style.borderWidth;
             	label.style.borderColor = inputs[i].style.borderColor;
             }
             label.style.textAlign =  inputs[i].style.textAlign;
             label.style.overflow = "hidden";
    	     label.style.textOverflow = "ellipsis";
    	     label.name = inputs[i].name;
             label.innerText = inputs[i].value;

    	     if(label.style.borderStyle.indexOf("solid")<0){
    	        label.style.borderStyle = "none";
    	     }else{
    	        if(label.style.borderTopWidth>0)
    	           label.style.borderStyle = "none";
    	     }
   	         // font-size start
   	    var scroll_h= inputs[i].scrollWidth;
    	var scroll_h_m = scroll_h;
    	var pos_h = inputs[i].style.posWidth; 
		var f_size = inputs[i].style.fontSize;
		
		var isPrintAgain = false; 
		//alert(Label.style.offsetHeight);
		//alert(scroll_h+":"+pos_h);
	  	    //alert(textareas[i].style.fontSize)
		    while(parseInt(scroll_h)>parseInt(pos_h)){
		    	//alert(scroll_h+":"+pos_h)
		    	if(f_size.indexOf("px")>0){
			   		if(parseFloat(inputs[i].style.fontSize)<8){
			   		    label.style.fontSize= f_size;
				   		break;
			   		} 
			    		
			    	inputs[i].style.fontSize = parseFloat(inputs[i].style.fontSize)-1;
					scroll_h = inputs[i].scrollWidth;
					pos_h = inputs[i].style.posWidth;	    	
		    	}
		    	else{ 
			   		if(parseFloat(inputs[i].style.fontSize)<6){
			   		    label.style.fontSize= f_size;
				   		break;
			   		} 
			    		
			    	inputs[i].style.fontSize = (parseFloat(inputs[i].style.fontSize)-0.5)+"pt";
					scroll_h = inputs[i].scrollWidth;
					pos_h = inputs[i].style.posWidth;	
		    	}
	
				
				label.style.fontSize = inputs[i].style.fontSize;
		    }
   	         //font-size end
    	     inputs[i].parentNode.replaceChild(label,inputs[i]);
    	     i--
    	     
    	}else
    	//process checkbox
    	if(inputs[i].type=="checkbox"||inputs[i].type=="radio"){
    	     
    	     img = document.createElement("img");
	    	     if(inputs[i].checked)
	    	     {	
	     	        img.src = "unieap/pages/form/images/checked.gif"
	     	     
	     	     }else{
	     	        img.src = "unieap/pages/form/images/blank.gif"
	     	     }
	     	     img.style.position = inputs[i].style.position;
	     	     img.style.top = inputs[i].style.top;
	    	     img.style.left = inputs[i].style.left;
	    	     img.style.width = "20px";
	    	     img.style.height= "20px";
	    	     
    	     if(overprint=="true"){
    	         var sibling = inputs[i].nextSibling;
    	         if(!sibling){
    	            sibling = inputs[i].previousSibling;

    	         }
    	         if(sibling)
    	         	sibling.style.visibility = "hidden";
   	         }
     	     inputs[i].parentNode.replaceChild(img,inputs[i]);
     	      
     	     i--;

    	     
     	     
    	}
    	
    	//processTable(tableList[i]);
    }

    var selects = obj.getElementsByTagName("select");
    for(i=0;i<selects.length;i++){
    	if(selects[i].style.visibility=="hidden"||selects[i].printable=="false"&&overprint=="true"){
    		selects[i].parentNode.removeChild(selects[i]);
    		i--;
    		continue;
    	}
    	label = document.createElement("label");
    	if(selects[i].selectedIndex>=0 )
    	   label.innerText = selects[i].options[selects[i].selectedIndex].text;
    	label.style.position = selects[i].style.position;
    	label.style.top = selects[i].style.top;
    	label.style.left = selects[i].style.left;
    	label.style.width = selects[i].style.width;
    	label.style.height = selects[i].style.height;
    	label.style.lineHeight = selects[i].style.height;
    	label.style.fontFamily = selects[i].style.fontFamily;
    	label.style.fontSize = selects[i].style.fontSize;
    	label.style.fontStyle = selects[i].style.fontStyle;
    	label.style.fontWeight = selects[i].style.fontWeight;
    	label.style.foreground = selects[i].style.foreground;
    	label.style.background = selects[i].style.background;
    	label.style.overflow = "hidden";
    	label.style.textOverflow = "ellipsis";
    	
    	selects[i].parentNode.replaceChild(label,selects[i]);
    	i--;
    }
    
    var textareas = obj.getElementsByTagName("textarea"); 
    for(i=0;i<textareas.length;i++){
	if(textareas[i].style.visibility=="hidden"||textareas[i].printable=="false"&&overprint=="true"){
    		textareas[i].parentNode.removeChild(textareas[i]);    		
    		i--;
    		continue;
    	}
    	label = document.createElement("label");   	
    	label.innerText = textareas[i].value;
	   	label.style.fontSize = textareas[i].style.fontSize;
     	label.style.position = textareas[i].style.position;
    	label.style.top = textareas[i].style.top;
    	label.style.left = textareas[i].style.left;
    	label.style.width = textareas[i].style.width;
    	label.style.height = textareas[i].style.height;
    	label.style.fontFamily = textareas[i].style.fontFamily;
    	label.style.fontStyle = textareas[i].style.fontStyle;
    	label.style.fontWeight = textareas[i].style.fontWeight;
    	label.style.foreground = textareas[i].style.foreground;
    	label.style.background = textareas[i].style.background;
	if(overprint=="true"){
    		label.style.borderStyle = "none";
    	}
    	else{
    		label.style.borderStyle = textareas[i].style.borderStyle;
    		label.style.borderWidth = textareas[i].style.borderWidth;
	    	label.style.borderColor = textareas[i].style.borderColor;
    	}
	label.style.textAlign =  textareas[i].style.textAlign;    	
    	label.style.margin = textareas[i].style.margin;
    	label.style.wordBreak  = textareas[i].style.wordBreak;//"keep-all";
    	label.style.wordWrap = "break-word";//textareas[i].style.wordWrap;//
    	label.style.overflow = "hidden";
    	label.style.textOverflow = "ellipsis"; 
    	
    	if(label.style.borderStyle.indexOf("solid")<0){
    	     label.style.borderStyle = "none";
    	}else{
    	if(label.style.borderTopWidth>0)
    	     label.style.borderStyle = "none";
    	}
    	     
    	var scroll_h= textareas[i].scrollHeight;
    	var scroll_h_m = scroll_h;
    	var pos_h = textareas[i].style.posHeight; 
	var f_size = textareas[i].style.fontSize;
	
	var isPrintAgain = false; 
	//alert(Label.style.offsetHeight);
	//alert(scroll_h+":"+pos_h);
  	    //alert(textareas[i].style.fontSize)
	    while(parseInt(scroll_h)>parseInt(pos_h)){
	    	
	    	if(f_size.indexOf("px")>0){
		   		if(parseFloat(textareas[i].style.fontSize)<8){

		   		   	scrollHeight[a] = scroll_h_m;
		   		   	//alert(a+":"+scroll_h_m)
					posHeight[a] = pos_h;
					textareas[i].style.fontSize = f_size;
					hashtable2.put(textareas[i].id,textareas[i]);
			   		a++;
			   		isPrintAgain = true;
			   		break;
		   		} 
		    		
		    	textareas[i].style.fontSize = parseFloat(textareas[i].style.fontSize)-1;
				scroll_h = textareas[i].scrollHeight;
				pos_h = textareas[i].style.posHeight;	    	
	    	}
	    	else{ 
		   		if(parseFloat(textareas[i].style.fontSize)<6){
		   		   	scrollHeight[a] = scroll_h_m;
					posHeight[a] = pos_h;
					textareas[i].style.fontSize = f_size;
					hashtable2.put(textareas[i].id,textareas[i]);
			   		a++;
			   		isPrintAgain = true;
			   		break;
		   		} 
		    		
		    	textareas[i].style.fontSize = (parseFloat(textareas[i].style.fontSize)-0.5)+"pt";
				scroll_h = textareas[i].scrollHeight;
				pos_h = textareas[i].style.posHeight;	
	    	}

			
			label.style.fontSize = textareas[i].style.fontSize;
	    }
	 // if text long enough , print standalone    
	if(isPrintAgain){
	    
	    textareas[i].style.height = "1122";
	    
	    var str = textareas[i].value;
	    for(n=0;n<str.length;n+=100){
	    	textareas[i].value = str.substring(0,n);
	    	//alert();
	    	if(textareas[i].scrollHeight > 1122){
	    	    hashtable3.put(i+"_"+textarea_pagenum,str.substring(0,n-100));
	    	    str = str.substring(n-100+1,str.length);
	    	    
	    	    n=0;
	    	    textarea_pagenum++;
	    	    
	    	}
	      hashtable3.put(i+"_"+textarea_pagenum,str);	
	    }

	   isPrintAgain = false; 

	   textareas[i].style.height = label.style.height;
	}
    	textareas[i].parentNode.replaceChild(label,textareas[i]);    	
    	i--;
 
    }

    //moveElements();
}
function moveElements(){
    var grids = hashtable.values();
    var left = 0;
    var right = 0;
    var top = 0;
    
    for(i=0;i<grids.length;i++){
    	//alert(grids[i].getElementsByTagName("TR").length);
      //if(grids[i].parentNode.tagName!="TD")
      //{
    	//var sibling = grids[i].nextSibling;
    	var total_records = grids[i].getElementsByTagName("TR").length - 1;
    	var n =0;
    	var pagesize = grids[i].pagesize;
    	if(pagesize>total_records){
    	    record_num = total_records;
    	    
    	}else{
    	    record_num = pagesize;
    	}
    	
    	//alert(total_records);
    	var rowHeight = parseInt(grids[i].getAttribute("rowHeight"));
    	var oldHeight = parseInt(grids[i].getAttribute("oldHeight"));

    	var dh = rowHeight * record_num + 17 - oldHeight;//grids[i].offsetHeight - oldHeight;
    	
   	var tables = grids[i].getElementsByTagName("TABLE");	
    	/*if(tables.length==1){
    	    //dh = parseInt(tables[0].offsetHeight) - oldHeight;
    	}else
    	    dh = parseInt(tables[0].offsetHeight) - oldHeight + parseInt(tables[1].offsetHeight); 
    	//alert(grids[i].offsetHeight);   */ 
  	    
    	if(dh <=0){ 
 
    	   	tables[0].style.visibility = "hidden";
			
		var rows = tables[0].rows;
    	   	var tr = rows(0); //head
    	   	var ths = tr.childNodes;
    	   	var len = ths.length;
    	   	//alert(pagesize - record_num);
    	   	while(dh<0&&n<(pagesize - record_num))
    	        {
    	   	    if(rowHeight + dh >0)
    	            rowHeight = -dh;
     	   	    
     	   	    newTR = tables[0].insertRow(-1); //document.createElement("TR");
    	   	    newTR.setAttribute("height",rowHeight);
    	   	    newTR.setAttribute("className","td1");
	    	   	for(k=0;k<len;k++){
	    	   	    newTD = newTR.insertCell(-1); //document.createElement("TD");
	    	   	    newTD.setAttribute("className","normal_cell");
	    	   	    newTD.setAttribute("width",ths.item(k).getAttribute("width"));
	    	   	    newTD.style.borderColor = ths.item(k).style.borderColor;
	    	   	    newTD.setAttribute("height",rowHeight);
	    	   	    newC = document.createElement("NOBR");
	    	   	    newC.style.textOverflow = 'ellipsis';
	    	   	    newTD.appendChild(newC);
	    	   	}
	    	   	dh = dh + rowHeight;
	    	   	n++;
    	        }
    	        tables[0].style.visibility = "visible";
    	   }

      }
}

function processGridAgain(usePrintModel,main_div,modelDoc){
	
	var dgs = hashtable.values();

    for(i=0;i<dgs.length;i++){
         if(!dgs[i].pagesize){
       	  continue; 		
      }
      
      if(dgs[i].type){
           var xmlID;
           var xslID;
      	   if(dgs[i].type=="datagrid"){
      	   		xmlID = "grid_" + dgs[i].datasource;	
      	   		xslID = xmlID+"_xsl";
      	   }else
      	   if(dgs[i].type=="appendtable"){
      	   		xmlID = dgs[i].id+"_xml";	
      	   		xslID = xmlID+"_xsl";
      	   }else{
      	   		continue;
      	   }
      	   var xml;
      	   var xsl;
      	   if(usePrintModel){
      	        xml = modelDoc.getElementById(xmlID);//htmlXmlDoc.selectSingleNode("//xml[@id='"+xmlID+"']");
     	  	    xsl = modelDoc.getElementById(xslID);//htmlXmlDoc.selectSingleNode("//xml[@id='"+xslID+"']");
     	   }else{
      	   		xml = document.getElementById(xmlID);//opener.document.getElementById(xmlID);//document.getElementById(xmlID);
	       	    xsl = document.getElementById(xslID);//opener.document.getElementById(xslID);//document.getElementById(xslID);
	       }
	       
       	   xml = xml.cloneNode(true);
       	   xsl = xsl.cloneNode(true);

       	   records = xml.selectNodes("//record[@state>=0 and @state<3]"); 
       	   
       	   var exprTableHeight = 0;
       	   //
       	   tables = xsl.selectNodes("//table");

       	   if(tables.length==2){
       	   		footTrs = tables.item(1).selectNodes("tr");
       	   		for(k=0;k<footTrs.length;k++){
       	   			exprTableHeight += parseInt(footTrs.item(k).getAttribute("height"));
       	   		}
       	   		tables.item(1).parentNode.removeChild(tables.item(1));
       	   }
       	          	  
       	          	  
       	   var gridHeight = parseInt(dgs[i].style.height) - parseInt(dgs[i].headerheight) -exprTableHeight ;
       	   var rowCount =  dgs[i].pagesize;//parseInt(gridHeight/parseInt(dgs[i].rowheight));
       	   //alert(records.length+":"+rowCount);      	   
       	   if(records.length < rowCount){
      	   		continue;
      	   }
       	   //xml.parentElement.removeNode(xml);
       	   //xsl.parentElement.removeNode(xsl);
       	   var temp = xsl.documentElement.selectSingleNode("//xsl:template[@match='record']");
       	   tr = temp.selectSingleNode(".//tr");

       	   tr.selectSingleNode("@onclick").value = "doNothing()";
       	   tr.selectSingleNode("@onmouseover").value = "";
       	   tr.selectSingleNode("@onmouseout").value = "";
       	   tds = tr.selectNodes("td");
       	   for(j=0;j<tds.length;j++){
       	   	tdclick = tds.item(j).selectSingleNode("@onclick");
       	   	if(tdclick)
       	   	   tdclick.value ="doNothing()";
       	   }
       	   tds = xsl.selectNodes("//table/tr/th");
       	   for(j=0;j<tds.length;j++){
       	   	   tdclick = tds.item(j).selectSingleNode("@onclick");
       	   	   if(tdclick)
       	   	      tdclick.value ="doNothing()";
       	   }
       	   
       	   dgs[i].style.overflow = "visible";
       	   //dgs[i].style.border = "none";
       	   dgs[i].setAttribute("oldHeight",dgs[i].style.height);

       	   dgs[i].onmouseleave = "doNothing()";
       	   dgs[i].onmouseenter = "doNothing()";
       	   
       	   //
       	   var selAttr = xsl.selectSingleNode("//xsl:apply-templates/@select");
       	   if(selAttr)
       	      selAttr.value = "record";
       	   
       	    
       	   //
       	   var margin = main_div.childNodes[0].margin;
       	   if(margin!=""){
       	      topMargin = margin.substring(0,margin.indexOf(","));
       	      margin = margin.substring(margin.indexOf(",")+1,margin.length);
       	      bottomMargin = margin.substring(0,margin.indexOf(","));
       	      margin = margin.substring(margin.indexOf(",")+1,margin.length);
       	      leftMargin = margin.substring(0,margin.indexOf(","));
       	   }else{
       	      topMargin = 5;
       	      bottomMargin = 20;
       	      leftMargin = 20;
       	   }
       	   //alert(topMargin+":"+bottomMargin+":"+leftMargin);
       	   //var leftMargin = 20;//factory.printing.leftMargin*window.screen.deviceXDPI/25.4;
           //var bottomMargin = 20;//factory.printing.bottomMargin*window.screen.deviceXDPI/25.4;
  	       //var topMargin = 5;//factory.printing.topMargin*window.screen.deviceXDPI/25.4;
       	   var allRowHeight = 1122 - topMargin - bottomMargin - parseInt(dgs[i].headerheight)-30 ; //- exprTableHeight;
       	   
       	   if(dgs[i].rowheight > 20){
       	      var displayRows =  parseInt(allRowHeight/parseInt(dgs[i].rowheight));
       	   }else{
       	      var displayRows =  parseInt(allRowHeight/20);
       	   }
       	   
       	   var displayPages = parseInt(records.length/displayRows) +1;
      	   
       	   //
       	   var newXML = new ActiveXObject("MSXML2.DOMDocument");
    	   newXML.async = false;
    	   datasetNode = newXML.createElement("dataset");
    	   newXML.appendChild(datasetNode);

    	   for(j=0;j<displayPages;j++)
    	   {
	    	   temp = datasetNode.cloneNode(false);
	    	   newXML.replaceChild(temp,datasetNode);
	    	   datasetNode = temp;
	    	   
	    	   var index = j*displayRows;
	    	   if(index >=records.length){
	    	   		break;
	    	   }
	       	   for(k=index;k<(index+displayRows)&&k<records.length;k++){
	       	   		datasetNode.appendChild(records.item(k));
	       	   }
	       	   
	       	   //
	       	   pageBreak = document.createElement("div");
			   pageBreak.className = "PAGENEXT";
			   document.body.appendChild(pageBreak);
			   
			   //
	       	   div = document.createElement("div");
	       	   div.setAttribute("id","form_page"+(pageNums + j + 1));//this.getPageIDs().length+j
		   div.style.position = "relative";
	 	   div.style.left = leftMargin;
		   div.style.top = topMargin;
		   dgDiv = document.createElement("div");
		   dgDiv.style.position = "absolute";
	 	   dgDiv.style.left = leftMargin;
		   //dgDiv.style.top = topMargin;
		   div.appendChild(dgDiv);
		       //document.body.appendChild(div);
		       //div.style.visibility = "hidden";
		   main_div.appendChild(div);
	       	   dgDiv.innerHTML = newXML.transformNode(xsl);
	       	   //dgDiv.style.display = "none";

       	   }
       	   pageNums += j;
       	   //alert(pageNums);
       }
    }
  
}
function processTextArea(usePrintModel,main_div){
    var tas = hashtable2.values();

    for(i=0;i<tas.length;i++){
      if(tas[i].type){

  	   if(tas[i].type=="textarea" && parseInt(scrollHeight[i])>parseInt(posHeight[i])){

	     var str =tas[i].value;;
	     var p = 0;
	     while(p<textarea_pagenum){	  
		   pageBreak = document.createElement("div");
		   //alert(pageNums + i + 1)
		   
		   pageBreak.className = "PAGENEXT";
		   document.body.appendChild(pageBreak);
		   
 	       var margin = main_div.childNodes[0].margin;
       	   if(margin!=null&&margin!=""){
       	      topMargin = margin.substring(0,margin.indexOf(","));
       	      margin = margin.substring(margin.indexOf(",")+1,margin.length);
       	      bottomMargin = margin.substring(0,margin.indexOf(","));
       	      margin = margin.substring(margin.indexOf(",")+1,margin.length);
       	      leftMargin = margin.substring(0,margin.indexOf(","));
       	   }else{
       	      topMargin = 5;
       	      bottomMargin = 20;
       	      leftMargin = 20;
       	   }
 	       //alert(topMargin+":"+bottomMargin+":"+leftMargin);
       	       div = document.createElement("div");
       	       div.setAttribute("id","form_page"+(pageNums+ p + 1));
       	       div.style.position = "relative";
	       div.style.left = leftMargin;
	       div.style.top = topMargin;
	       div.style.width = "750px"

	       dgDiv = document.createElement("div");
	       dgDiv.style.position = "absolute";
	       dgDiv.style.left = leftMargin;
	       //dgDiv.style.top = topMargin;


	       var label = document.createElement("label");
	       label.style.fontFamily = tas[i].style.fontFamily;
	       label.style.fontSize = tas[i].style.fontSize;
	       label.style.fontStyle = tas[i].style.fontStyle;
	       label.style.fontWeight = tas[i].style.fontWeight;
	       label.style.foreground = tas[i].style.foreground;
	       label.style.background = tas[i].style.background;
	       label.style.margin = tas[i].style.margin;
	       //hashtable2[i].isTextEdit = 'true';
	       var aaa = tas[i].createTextRange();
	       //alert(aaa.move('word'))
	       //alert(aaa.moveToPoint("200","200"));
	       label.style.wordBreak  = "keep-all";//hashtable2[i].style.wordBreak;//
    	       label.style.wordWrap = "break-word";//hashtable2[i].style.wordWrap;//
    	       label.innerText = hashtable3.get(i+"_"+(p+1)); 
	       
	       dgDiv.appendChild(label); 
	       div.appendChild(dgDiv);
 	       main_div.appendChild(div);
 	       p++;
 	       //alert(div.offsetHeight);
    	      }
    	      
    	      textarea_pagenum = 0;
 	  }
      	  	
	}
  }

}

function processSeals(){
   var sealname;
   for(var i=0;i<seals.length;i++){
   	div = document.createElement("DIV");
   	div.innerHTML = "<OBJECT id='"+seals[i]+"_clone' width=175 height=175 classid=clsid:A8EC4408-44CC-4AB2-998E-04AAF65EDBBB></OBJECT>"; 
   	sealname = seals[i].substring(0,seals[i].length-7);
   	oDiv = document.getElementById(sealname+"_div");

   	div.style.position = "absolute";
   	div.style.left = oDiv.style.left;
        div.style.top = oDiv.style.top;  
   	div.style.posWidth = 175;
   	div.style.posHeight  = 175;
   	document.body.appendChild(div);
   	seal = document.getElementById(seals[i]+"_clone");
   	seal.Width = 175;
   	seal.Height = 175;
   	seal.style.posWidth = seal.Width;
        seal.style.posHeight = seal.Height;
   	sealContentData(sealname);
   	loadSealSignedString(sealname);
   }
}

function sealContentData(sealName){ 
        var seal = document.getElementById(sealName+"_object_clone");
	var signedFields = parent.document.getElementsByName(sealName)[0].signedfields;
	if(!signedFields){
		return ;
	}
	fieldNames = signedFields.split(",");
	var value="";
	if(fieldNames){
		for(j=0;j<fieldNames.length;j++){
			if(j==0){
				value = parent.document.getElementsByName(fieldNames[j])[0].value;
			}else{
				value = parent.document.getElementsByName(fieldNames[j])[0].value +";" + value;
			}
		}
		seal.ContentData = value;
	}
}

function loadSealSignedString(sealName){
	var value = parent.document.getElementsByName(sealName)[0].value;
	value = value.replace("&#47;","/");
	var seal = document.getElementById(sealName+"_object_clone");
	seal.LoadFromString(value);
}