/////////////////////////////////////
var FormFavoriteHandler = {
                            ItemsDoc:null,
                            xmlhttp:null,
                            currentSelect:null,
                            subDoc:null,
                            currentobj:null,
                            itemsHash : new Hashtable(),
                            itemsActionHash: new Hashtable()
                          }

function getFavorite(obj,fresh)
  {
    if(!obj.vcard)
    	return;
	FormFavoriteHandler.currentobj = obj;
    if(!fresh){
    var exist = hasLoadItem(obj.vcard);
    if(exist)
      {
    		var itemAction = FormFavoriteHandler.itemsActionHash.get(obj.name);
			if(itemAction==null){
				//alert();
		    	itemAction = new actb(obj,null);
				FormFavoriteHandler.itemsActionHash.put(obj.name,itemAction);
			}
			var itemsList= FormFavoriteHandler.itemsHash.get(obj.vcard);

			itemAction.setKeyWords(itemsList);
        	
        	return;
      }
    }
    var params = new Parameters();
    params.setParameter('vcard',obj.vcard);
    formGetFavorite('com.neusoft.form.engine.persist.LoadFormFavoriteData',params,obj);
   //document.write("<SCRIPT event=onclick() for=document>actb_setNoDisplay()</SCRIPT>");
  }                          
function formGetFavorite(clsName,parameter,obj) {

    var path = document.location.pathname;
    var pos=path.lastIndexOf('/', path.length-1);
    path = path.substring(0,pos);
    var url="http://"+ document.location.hostname + ":" + document.location.port + path +"/XMLReceiver?command="+clsName;
    if(parameter.length()>0){
        url += "&"+parameter.toString();
        url = url.substring(0,url.length-1);
    }
    if(!FormFavoriteHandler.xmlhttp){
		    FormFavoriteHandler.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");		    
    }
    var xmlhttp = FormFavoriteHandler.xmlhttp;
    xmlhttp.Open("POST" ,url, false);
    xmlhttp.onreadystatechange=function()
          { 
            if(xmlhttp.readyState==4)
              {
                if (xmlhttp.status == 200)
                  {
                   if(xmlhttp.responseXML.xml!="") 
                     { 
                        
                        setFavoriteDocItems(xmlhttp.responseXML,obj);
                        
                     }
                  }
             }
          }    
    xmlhttp.Send(null);
}

function setFavoriteDocItems(idoc,obj)
 {
   var doc = getItemsDoc();//alert(obj);
   var itemsNode = idoc.selectSingleNode('//items');//alert(itemsNode.xml);
   if(itemsNode!=null)
      {
        var vcard = itemsNode.getAttribute('vcard');
        var items = itemsNode.selectNodes('//item');
        if(items!=null)
          {
 	        var customarray=new Array(); 
			for(var it=0;it<items.length;it++)
    		  {
    		    if(items[it].text.indexOf("\n")!=-1)
    		      {
    		        //alert(replaceAll(items[it].text,"\\n","<br />"))
    		        customarray[customarray.length] = items[it].text;//
    		      }
    		    else
    		      {
			        customarray[customarray.length] = items[it].text;	
			      }
			  }
			//obj.blur();

    		var itemAction = FormFavoriteHandler.itemsActionHash.get(obj.name);
			if(itemAction==null){
		    	itemAction = new actb(obj,customarray);
				FormFavoriteHandler.itemsActionHash.put(obj.name,itemAction);
			}
			itemAction.setKeyWords(customarray);
			
			//FormFavoriteHandler.itemsHash.containsKey(obj.vcard);
			//if(FormFavoriteHandler.itemsHash.containsKey(obj.vcard)){
				//alert();
				//FormFavoriteHandler.itemsHash.remove(obj.vcard);
				FormFavoriteHandler.itemsHash.put(obj.vcard,customarray);
				
			//}
			//obj.focus();
		  }
		var submitDoc = getCurrentSubmitDoc();
		var root = submitDoc.selectSingleNode("//phistory");
		if(root){
			while(root.childNodes.length>0){
				root.removeChild(root.childNodes(0));
			}
		}
		root =   doc.selectSingleNode("//phistory");
		var oldItems = root.selectSingleNode("//items[@vcard='"+obj.vcard+"']");
		if(oldItems){
			//alert(oldItems.xml)
			root.removeChild(oldItems);
		}
        doc.selectSingleNode("//phistory").appendChild(itemsNode);//alert(doc.xml);
	  } 
 }
function saveFavorite(){
	var obj = FormFavoriteHandler.currentobj;
	if(obj!=null&&obj.value!=''){
		if(confirm("\u662f\u5426\u4fdd\u5b58\u4e3a\u4e60\u60ef\u7528\u8bed?")){
			formSetFavorite();
		}
	} 
}
function formSetFavorite()
 {
   var doc = getItemsDoc();
   var newDoc = getCurrentSubmitDoc();
   var nodes = doc.selectNodes("//items");
   if(nodes==null||nodes.length==0)
     {
       return;
     }
   var fname;
   var value;
   var item;
   var nc;
	obj = FormFavoriteHandler.currentobj;
	
    if(obj!=null&&obj.value!='')
      { 
        fname = obj.vcard; 
        value = obj.value.trim();//alert(fname);
        if(value == '') return ;  
    	var aimNode = doc.selectSingleNode("//items[@vcard='"+fname+"']");
        
        item =aimNode.selectSingleNode("item[text()='"+value+"']");
        var itemValue = value;
        if(itemValue.length >256)
          {
            itemValue = itemValue.substring(0,255);
          }
        if(item!=null)
          {
            //var newItem = newDoc.createElement("item");
            //newItem.setAttribute("id",item.getAttribute("id")); 
            //newItem.setAttribute("vcard",fname);                
            //newItem.setAttribute("state",1);
            //newItem.text = itemValue;
            //newDoc.selectSingleNode("//phistory").appendChild(newItem);
            return;
          }
        else if(aimNode.selectNodes("item").length>=10)
          {
             var oldItem = getOldestItem(aimNode);
             var newItem = newDoc.createElement("item");
             newItem.setAttribute("id",oldItem.getAttribute("id"));  
             newItem.setAttribute("vcard",fname);                
             newItem.setAttribute("state",3);
             newItem.text = itemValue;
             newDoc.selectSingleNode("//phistory").appendChild(newItem);
          }
        else 
         {
            var newItem = newDoc.createElement("item");
            newItem.setAttribute("vcard",fname);                
            newItem.setAttribute("state",2);
            newItem.text = itemValue;
            newDoc.selectSingleNode("//phistory").appendChild(newItem);
         }
        
      }
    if(newDoc.selectSingleNode("//item"))
      {
        saveFormFavorite('com.neusoft.form.engine.persist.SaveFormFavoriteData',null,newDoc); 
      }
    getFavorite(obj,true);
 }
 
function getOldestItem(itemsNode)
  {
    var nodes = itemsNode.selectNodes("item");
    var minTime = 0;
    var temp;
    var index=0;
    var count=0;
    for(var nd=0;nd<nodes.length;nd++)
      {
        temp = nodes[nd].getAttribute("time");
        if(nd==0)
          {
            minTime = temp;
            count = nodes[nd].getAttribute("count");
          }
        else if(temp<minTime)
          {
            index = nd;
            minTime = temp;
            count = nodes[nd].getAttribute("count");
          }
        else if(temp==minTime)
          {
            if(count<nodes[nd].getAttribute("count"))
              {
                index = nd;
                minTime = temp;
                count = nodes[nd].getAttribute("count");
              }
          }
      }
   return nodes[index];
  }
 
function saveFormFavorite(clsName,parameter,doc)
  {
    //alert(doc.xml)
    var path = document.location.pathname;
    var pos=path.lastIndexOf('/', path.length-1);
    path = path.substring(0,pos);
    var url="http://"+ document.location.hostname + ":" + document.location.port + path +"/XMLReceiver?command="+clsName;
    if(parameter!=null&&parameter.length()>0){
        url += "&"+parameter.toString();
        url = url.substring(0,url.length-1);
    }
    var xmlhttp = FormFavoriteHandler.xmlhttp;//new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.Open("POST" ,url, false);
    xmlhttp.onreadystatechange=function()
          { 
            if(xmlhttp.readyState==4)
              {
                if (xmlhttp.status == 200)
                  {
                    if(xmlhttp.responseText=="true")
                      {
                        return true;
                      }
                  }
             }
          }    
         
    xmlhttp.send(doc);  
  }
 

function hasLoadItem(itemid)
 {
   var retValue = false;
   var doc = getItemsDoc();
   var node = doc.selectSingleNode("//items[@vcard='"+itemid+"']");
   if(node!=null)
     {
       retValue = true;
     }
   return retValue;
 }
 
function getItemsDoc()
 {
   if(FormFavoriteHandler.ItemsDoc==null)
     {
       FormFavoriteHandler.ItemsDoc = getNewItemsDoc();
     }
   return FormFavoriteHandler.ItemsDoc;
 }

function setItemDoc(doc)
{
	FormFavoriteHandler.ItemsDoc = doc;
}

function getNewItemsDoc()
 {
   var str_xml = '<?xml version="1.0" encoding="utf-8"?><phistory></phistory>';
   var doc = new ActiveXObject("MSXML2.DOMDocument");
   doc.async = false;
   doc.loadXML(str_xml);
   return doc;
 }
 
 function getCurrentSubmitDoc()
 {
   if(FormFavoriteHandler.subDoc==null)
     {
       FormFavoriteHandler.subDoc = getNewItemsDoc();
     }
   return FormFavoriteHandler.subDoc;
 }

function actb(obj,ca){
	/* ---- Public Variables ---- */
	this.actb_timeOut = -1; // Autocomplete Timeout in ms (-1: autocomplete never time out)
	this.actb_lim = 10;    // Number of elements autocomplete can show (-1: no limit)
	this.actb_firstText = false; // should the auto complete be limited to the beginning of keyword?
	this.actb_mouse = true; // Enable Mouse Support
	this.actb_delimiter = new Array(';',',');  // Delimiter for multiple autocomplete. Set it to empty array for single autocomplete
	this.actb_startcheck = 1; // Show widget only after this number of characters is typed in.
	/* ---- Public Variables ---- */

	/* --- Styles --- */
	this.actb_bgColor = '#FFFFFF';
	this.actb_textColor = '#000000';
	this.actb_textSelectColor = '#FFFFFF';
	this.actb_hColor = '#0a246a';
	this.actb_fFamily = '??';
	this.actb_fSize = '11px';
	this.actb_hStyle = 'text-decoration:underline;font-weight="bold"';
	this.actb_maxMatchLength = 30;
	/* --- Styles --- */

	/* ---- Private Variables ---- */
	var actb_delimwords = new Array();
	var actb_cdelimword = 0;
	var actb_delimchar = new Array();
	var actb_display = false;
	var actb_pos = 0;
	var actb_total = 0;
	var actb_curr = null;
	var actb_rangeu = 0;
	var actb_ranged = 0;
	var actb_bool = new Array();
	var actb_pre = 0;
	var actb_toid;
	var actb_tomake = false;
	var actb_getpre = "";
	var actb_mouse_on_list = 1;
	var actb_kwcount = 0;
	var actb_caretmove = false;
	this.setKeyWords = setKeyWords;
	//this.actb_keywords = new Array();
	/* ---- Private Variables---- */
	
	this.actb_keywords = ca;
	var actb_self = this;

	actb_curr = obj;
	
	//removeEvent(actb_curr,"focus",actb_setup);
	//removeEvent(actb_curr,"focus",showSaveIcon);
	//removeEvent(actb_curr,"dblclick",actb_generateAll);
	
	addEvent(actb_curr,"focus",actb_setup);
	addEvent(actb_curr,"focus",showSaveIcon);
	
	addEvent(actb_curr,"dblclick",actb_generateAll);
	function actb_setup(){ 
		addEvent(document,"keydown",actb_checkkey);
		addEvent(actb_curr,"blur",actb_clear);
		addEvent(actb_curr,"click",actb_keypress);
		//addEvent(document,"click",actb_click_clear);
		addEvent(document,"keypress",actb_keypress);
		//addEvent(document,"click",actb_keypress);
	}
	
	function actb_clear(evt){
		if (!evt) evt = event;
		removeEvent(document,"keydown",actb_checkkey);
		removeEvent(actb_curr,"blur",actb_clear);
		removeEvent(actb_curr,"click",actb_keypress);
		removeEvent(document,"keypress",actb_keypress);
		
		actb_removedisp();
	}
	function actb_parse(n){
		if (actb_self.actb_delimiter.length > 0){
			var t = actb_delimwords[actb_cdelimword].trim().addslashes();
			var plen = actb_delimwords[actb_cdelimword].trim().length;
		}else{
			var t = actb_curr.value.addslashes();
			var plen = actb_curr.value.length;
		}
		var tobuild = '';
		var i;

		if (actb_self.actb_firstText){
			var re = new RegExp("^" + t, "i");
		}else{
			var re = new RegExp(t, "i");
		}
		var p = n.search(re);
				
		for (i=0;i<p;i++){
			tobuild += n.substr(i,1);
		}
		tobuild += "<font style='"+(actb_self.actb_hStyle)+"'>"
		for (i=p;i<plen+p;i++){
			tobuild += n.substr(i,1);
		}
		tobuild += "</font>";
			for (i=plen+p;i<n.length;i++){
			tobuild += n.substr(i,1);
		}
		return tobuild;
	}
	function actb_generate(){

		if (document.getElementById('tat_table')){ actb_display = false;document.body.removeChild(document.getElementById('tat_table')); } 
		if (actb_kwcount == 0){
			actb_display = false;
			return;
		}
		actb_mouse_on_list = 0;
		a = document.createElement('table');
		a.cellSpacing='1px';
		a.cellPadding='2px';
		a.style.position='absolute';
		a.style.top = eval(curTop(actb_curr) + actb_curr.offsetHeight) + "px";
		a.style.left = curLeft(actb_curr) + "px";
		a.style.width = actb_curr.style.width;
		a.style.backgroundColor=actb_self.actb_bgColor;
		a.id = 'tat_table';
		/*
		var div = document.createElement("DIV");
		div.style.position='absolute';
		div.style.top = eval(curTop(actb_curr) + actb_curr.offsetHeight) + "px";
		div.style.left = curLeft(actb_curr) + "px";
		div.style.width = actb_curr.style.width;	
		div.style.scroll = "scroll"	
		div.appendChild(a);
		*/
		document.body.appendChild(a);
		a.style.border="solid #000000 1";
		var i;
		var first = true;
		var j = 1;
		if (actb_self.actb_mouse){
			a.onmouseout = actb_table_unfocus;
			a.onmouseover = actb_table_focus;
		}
		
		var counter = 0;
		for (i=0;i<actb_self.actb_keywords.length;i++){
			if (actb_bool[i]){
				counter++;
				r = a.insertRow(-1);
				if (first && !actb_tomake){
					r.style.backgroundColor = actb_self.actb_hColor;
					first = false;
					actb_pos = counter;
				}else if(actb_pre == i){
					r.style.backgroundColor = actb_self.actb_hColor;
					first = false;
					actb_pos = counter;
				}else{
					r.style.backgroundColor = actb_self.actb_bgColor;
				}
				
				r.id = 'tat_tr'+(j);
				c = r.insertCell(-1);
				c.style.color = actb_self.actb_textColor;
				c.style.fontFamily = actb_self.actb_fFamily;
				c.style.fontSize = actb_self.actb_fSize;
				c.style.width = actb_curr.style.width;
				//c.style.overflow = "hidden";
				//c.style.textOverflow = "ellipsis"
				c.innerHTML = actb_parse(actb_self.actb_keywords[i]);
				c.id = 'tat_td'+(j);
				c.setAttribute('pos',j);
				if (actb_self.actb_mouse){
					c.style.cursor = 'pointer';
					c.onclick=actb_mouseclick;
					c.onmouseover = actb_table_highlight;
				}
				j++;
			}
			if (j - 1 == actb_self.actb_lim && j < actb_total){
				r = a.insertRow(-1);
				r.style.backgroundColor = actb_self.actb_bgColor;
				c = r.insertCell(-1);
				c.style.color = actb_self.actb_textColor;
				//c.style.color = "#FFFFFF"
				c.style.fontFamily = 'arial narrow';
				c.style.fontSize = actb_self.actb_fSize;
				c.align='center';
				replaceHTML(c,'\\/');
				if (actb_self.actb_mouse){
					c.style.cursor = 'pointer';
					c.onclick = actb_mouse_down;
				}
				break;
			}
		}
		actb_rangeu = 1;
		actb_ranged = j-1;
		actb_display = true;
		if (actb_pos <= 0) actb_pos = 1;
		//alert(c.outerHTML)
		var currObj = document.getElementById('tat_tr1');
		if(currObj)
		{
		  FormFavoriteHandler.currentSelect = currObj
          currObj.childNodes[0].style.color = "#FFFFFF";		
        }
	}
	
	function actb_generateAll()
	 { 
	    //event.cancelBubble=true;
	    actb_mouse_on_list=0;
	    if (actb_display||actb_curr.value!=''){
			return;
		}
        if (document.getElementById('tat_table')){ actb_display = false;document.body.removeChild(document.getElementById('tat_table')); } 
		a = document.createElement('table');
		a.cellSpacing='1px';
		a.cellPadding='2px';
		a.style.position='absolute';
		a.style.top = eval(curTop(actb_curr) + actb_curr.offsetHeight) + "px";
		a.style.left = curLeft(actb_curr) + "px";
		a.style.width = actb_curr.style.width;
		//style.height = '100px';
		a.style.backgroundColor=actb_self.actb_bgColor;
		a.id = 'tat_table';
		document.body.appendChild(a);
		a.style.border="solid #000000 1";
		//alert(a.outerHTML)
		var i;
		var first = true;
		var j = 1;
		if (actb_self.actb_mouse){
			a.onmouseout = actb_table_unfocus;
			a.onmouseover = actb_table_focus;
		}
		actb_total = actb_self.actb_keywords.length;
		var counter = 0;
		for (i=0;i<actb_self.actb_keywords.length;i++){
		  
			if (true){
				counter++;
				r = a.insertRow(-1);
				
				if (first && !actb_tomake){
					r.style.backgroundColor = actb_self.actb_hColor;
					first = false;
					actb_pos = counter;
				}else if(actb_pre == i){
					r.style.backgroundColor = actb_self.actb_hColor;
					first = false;
					actb_pos = counter;
				}else{
					r.style.backgroundColor = actb_self.actb_bgColor;
				}
				
				r.id = 'tat_tr'+(j);
				c = r.insertCell(-1);
				c.style.color = actb_self.actb_textColor;
				c.style.fontFamily = actb_self.actb_fFamily;
				c.style.fontSize = actb_self.actb_fSize;
				c.style.overflow = "hidden"
				c.style.width = actb_curr.style.width;
				//alert(c.style.width)
				c.style.textOverflow = "ellipsis";
				c.innerHTML = actb_self.actb_keywords[i];
				c.id = 'tat_td'+(j);
				c.setAttribute('pos',j);
				
				if (actb_self.actb_mouse){
					c.style.cursor = 'pointer';
					c.onclick=function(){
             		if (!actb_display) return;
             		actb_mouse_on_list = 0;
            		//actb_pos = this.getAttribute('pos');
            		//alert(this.innerHTML.indexOf("<BR>"))
            		actb_curr.value=this.innerHTML;//replaceAll(this.innerHTML,"<BR>","\n")
					if (!actb_display) return;
		            actb_display = false;
                    actb_setNoDisplay();
		            l = getCaretStart(actb_curr);
					} 
					c.onmouseover = actb_table_highlight;
				}
				j++;
				
			}
			if (j - 1 == actb_self.actb_lim && j < actb_total){
				r = a.insertRow(-1);
				r.style.backgroundColor = actb_self.actb_bgColor;
				c = r.insertCell(-1);
				c.style.color = actb_self.actb_textColor;
				c.style.fontFamily = 'arial narrow';
				c.style.fontSize = actb_self.actb_fSize;
				c.align='center';
				replaceHTML(c,'\\/');
				if (actb_self.actb_mouse){
					c.style.cursor = 'pointer';
					c.onclick = actb_mouse_down;
				}
				break;
			}
		}
		actb_rangeu = 1;
		actb_ranged = j-1;
		actb_display = true;
		if (actb_pos <= 0) actb_pos = 1;
		var currObj = document.getElementById('tat_tr1');
		if(currObj!=null)
		 {
		   currObj.childNodes[0].style.color = "#FFFFFF";
		   FormFavoriteHandler.currentSelect = currObj
		 }
	 }

    function actb_setNoDisplay()
      {
		actb_mouse_on_list = 0;
		actb_removedisp();
      }
	
	function actb_remake(){
		document.body.removeChild(document.getElementById('tat_table'));
		a = document.createElement('table');
		a.cellSpacing='1px';
		a.cellPadding='2px';
		a.style.position='absolute';
		a.style.top = eval(curTop(actb_curr) + actb_curr.offsetHeight) + "px";
		a.style.left = curLeft(actb_curr) + "px";
		a.style.backgroundColor=actb_self.actb_bgColor;
		a.id = 'tat_table';
		if (actb_self.actb_mouse){
			a.onmouseout= actb_table_unfocus;
			a.onmouseover=actb_table_focus;
		}
		document.body.appendChild(a);
		var i;
		var first = true;
		var j = 1;
		if (actb_rangeu > 1){
			r = a.insertRow(-1);
			r.style.backgroundColor = actb_self.actb_bgColor;
			c = r.insertCell(-1);
			c.style.color = actb_self.actb_textColor;
			c.style.fontFamily = 'arial narrow';
			c.style.fontSize = actb_self.actb_fSize;
			c.align='center';
			replaceHTML(c,'/\\');
			if (actb_self.actb_mouse){
				c.style.cursor = 'pointer';
				c.onclick = actb_mouse_up;
			}
		}
		for (i=0;i<actb_self.actb_keywords.length;i++){
			if (actb_bool[i]){
				if (j >= actb_rangeu && j <= actb_ranged){
					r = a.insertRow(-1);
					r.style.backgroundColor = actb_self.actb_bgColor;
					r.id = 'tat_tr'+(j);
					c = r.insertCell(-1);
					c.style.color = actb_self.actb_textColor;
					c.style.fontFamily = actb_self.actb_fFamily;
					c.style.fontSize = actb_self.actb_fSize;
					c.innerHTML = actb_parse(actb_self.actb_keywords[i]);
					c.id = 'tat_td'+(j);
					c.setAttribute('pos',j);
					if (actb_self.actb_mouse){
						c.style.cursor = 'pointer';
						c.onclick=actb_mouseclick;
						c.onmouseover = actb_table_highlight;
					}
					j++;
				}else{
					j++;
				}
			}
			if (j > actb_ranged) break;
		}
		if (j-1 < actb_total){
			r = a.insertRow(-1);
			r.style.backgroundColor = actb_self.actb_bgColor;
			c = r.insertCell(-1);
			c.style.color = actb_self.actb_textColor;
			c.style.fontFamily = 'arial narrow';
			c.style.fontSize = actb_self.actb_fSize;
			c.align='center';
			replaceHTML(c,'\\/');
			if (actb_self.actb_mouse){
				c.style.cursor = 'pointer';
				c.onclick = actb_mouse_down;
			}
		}
	}
	function actb_goup(){
		if (!actb_display) return;
		if (actb_pos == 1) return;
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
        document.getElementById('tat_tr'+(actb_pos - 1)).childNodes[0].style.color = "#FFFFFF";
		if(document.getElementById('tat_tr'+actb_pos))
		  {
		    document.getElementById('tat_tr'+actb_pos).childNodes[0].style.color = "#000000";
		  }
		FormFavoriteHandler.currentSelect = document.getElementById('tat_tr'+(actb_pos - 1));
		actb_pos--;
		if (actb_pos < actb_rangeu) actb_moveup();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_godown(){
	    
		if (!actb_display) return;
		if (actb_pos == actb_total) return;
		var objtat_tr = document.getElementById('tat_tr'+actb_pos);
		if(objtat_tr==null)return;
		objtat_tr.style.backgroundColor = actb_self.actb_bgColor;
		//if(actb_pos+1==)
		actb_pos++;
		if (actb_pos > actb_ranged) actb_movedown();
		var obj = document.getElementById('tat_tr'+actb_pos);
		obj.style.backgroundColor = actb_self.actb_hColor;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
		
		FormFavoriteHandler.currentSelect = document.getElementById('tat_tr'+(actb_pos))
		
		document.getElementById('tat_tr'+(actb_pos)).childNodes[0].style.color = "#FFFFFF";
		if(document.getElementById('tat_tr'+(actb_pos - 1)))
		  {
		    document.getElementById('tat_tr'+(actb_pos - 1)).childNodes[0].style.color = "#000000";
		  }
	}
	function actb_movedown(){
		actb_rangeu++;
		actb_ranged++;
		actb_remake();
	}
	function actb_moveup(){
		actb_rangeu--;
		actb_ranged--;
		actb_remake();
	}

	/* Mouse */
	function actb_mouse_down(){
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		actb_pos++;
		actb_movedown();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		actb_curr.focus();
		actb_mouse_on_list = 0;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_mouse_up(evt){
		if (!evt) evt = event;
		if (evt.stopPropagation){
			evt.stopPropagation();
		}else{
			evt.cancelBubble = true;
		}
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		actb_pos--;
		actb_moveup();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		actb_curr.focus();
		actb_mouse_on_list = 0;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_mouseclick(evt){
		if (!evt) evt = event;
		if (!actb_display) return;
		actb_mouse_on_list = 0;
		actb_pos = this.getAttribute('pos');
		actb_penter();
	}
	function actb_table_focus(){
	
	    //alert()
		//actb_mouse_on_list = 1;
		if(event.srcElement.tagName=="TD")
		 {
		   if(FormFavoriteHandler.currentSelect!=null)
		    {
		      if(FormFavoriteHandler.currentSelect.tagName=="TR")
		        {
		          FormFavoriteHandler.currentSelect.childNodes[0].style.color = "#000000"
		        }
		      else
		        FormFavoriteHandler.currentSelect.style.color = "#000000"
		    }
		   FormFavoriteHandler.currentSelect = event.srcElement
		   //else
		   FormFavoriteHandler.currentSelect.style.color="#FFFFFF"
		 }
	}
	function actb_table_unfocus(){

        
		//if(event.srcElement.tagName=="TD")
		 //{
		 //  event.srcElement.style.color="#000000"
		// }        	    
		actb_mouse_on_list = 0;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list = 0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_table_highlight(){
	    
		actb_mouse_on_list = 1;
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		
		actb_pos = this.getAttribute('pos');
		while (actb_pos < actb_rangeu) actb_moveup();
		while (actb_pos > actb_ranged) actb_movedown();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		//document.getElementById('tat_tr'+actb_pos).childNodes[0].style.color=actb_self.actb_textSelectColor;
		
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list = 0;actb_removedisp();},actb_self.actb_timeOut);
	}
	/* ---- */

	function actb_insertword(a){
		if (actb_self.actb_delimiter.length > 0){
			str = '';
			l=0;
			for (i=0;i<actb_delimwords.length;i++){
				if (actb_cdelimword == i){
					prespace = postspace = '';
					gotbreak = false;
					for (j=0;j<actb_delimwords[i].length;++j){
						if (actb_delimwords[i].charAt(j) != ' '){
							gotbreak = true;
							break;
						}
						prespace += ' ';
					}
					for (j=actb_delimwords[i].length-1;j>=0;--j){
						if (actb_delimwords[i].charAt(j) != ' ') break;
						postspace += ' ';
					}
					str += prespace;
					str += a;
					l = str.length;
					if (gotbreak) str += postspace;
				}else{
					str += actb_delimwords[i];
				}
				if (i != actb_delimwords.length - 1){
					str += actb_delimchar[i];
				}
			}
			actb_curr.value = str;
			setCaret(actb_curr,l);
		}else{
			actb_curr.value = a;
		}
		actb_mouse_on_list = 0;
		actb_removedisp();
	}
	function actb_penter(){
	    
	    //alert(.innerHTML)
		if (!actb_display) return;
		actb_display = false;
		var word = '';
		var c = 0;
		if(actb_curr.value != "")
		  {
   		for (var i=0;i<=actb_self.actb_keywords.length;i++){
			if (actb_bool[i]) c++;
			if (c == actb_pos){
				word = actb_self.actb_keywords[i];
				break;
			}
		}
		 }
		//alert(word)
		if(word=="")
		  {
		    var tat_table = document.getElementById('tat_table');
		    if(tat_table!=null)
		      {
		        var len = tat_table.childNodes[0].childNodes.length;
		        var trs = tat_table.childNodes[0].childNodes
		        for(var jg=0;jg<len;jg++)
		          { 
		            if(trs[jg].style.backgroundColor == actb_self.actb_hColor)
		              { 
                      	 actb_curr.value=trs[jg].childNodes[0].innerHTML
                         actb_setNoDisplay();
                         break;
		              }
		          }
		      }
		    return;
		  }
		
		actb_insertword(word);
		l = getCaretStart(actb_curr);
		
	}
	function actb_removedisp(){
	     
		if (actb_mouse_on_list==0){
			actb_display = 0;
			if (document.getElementById('tat_table')){ document.body.removeChild(document.getElementById('tat_table')); }
			if (actb_toid) clearTimeout(actb_toid);
		}
	}
	function actb_keypress(e){
		window.event.cancelBubble=true;
		if (actb_caretmove) stopEvent(e);
		return !actb_caretmove;
	}
	function actb_checkkey(evt){
		if (!evt) evt = event;
		a = evt.keyCode;
		caret_pos_start = getCaretStart(actb_curr);
		actb_caretmove = 0;
		switch (a){
		 
		    case 37:
		        {
		          if(actb_display)
		            {
		              return true;
		            }
		          else
		            {
		              actb_tocomplete(a);
		              return true;
		            }
		        }
		        break;
		    case 39:
		        {
		          if(actb_display)
		            {
		              return true;
		            }
		          else
		            {
		              actb_tocomplete(a);
		              return true;
		            }		        
		        }
		        break;
			case 38:
			    if(!actb_display)
			      {
			        return true;
			      }
			    else
			      {
				    actb_goup();
				    actb_caretmove = 1;
				    return true;
				  }
				break;
			case 40:
			    if(!actb_display)
			      {
			        return true;
			      }
			    else
			      {
				    actb_godown();
				    actb_caretmove = 1;
				    setTimeout(function(){actb_tocomplete(a)},50);
				    return true;
				  }
				break;
			case 13: case 9:
				if (actb_display){
					actb_caretmove = 1;
					actb_penter();
					return false;
				}else{
					return true;
				}
				break;
		    case 46: 
		        {
		          if(actb_display&&event.shiftKey)
		            {
		              deteteCurrentSelect();
		            }
		          else 
		            {
		              if (actb_curr.value == '')
		               {
		                actb_display = false;
		                actb_generateAll();
			            return;
		              }
		            }
		           return true;
		        }
		        break;
		    case 16:
		        {
		          return false;
		        }
			default:
				setTimeout(function(){actb_tocomplete(a)},50);
				break;
		}
	}
  
    function deteteCurrentSelect()
      {
        if(actb_curr.value=="")
          {
            if(actb_self.actb_keywords.length>0)
              {
                var itemText = actb_self.actb_keywords[actb_pos - 1];
                actb_self.actb_keywords.splice((actb_pos - 1),1);
                var node = getItemsDoc().selectSingleNode("//item[text()='"+itemText+"']");
                if(node!=null)
                  {
                    var clonN = node.cloneNode(true);
                    clonN.setAttribute("state",4);
                    getCurrentSubmitDoc().selectSingleNode("//phistory").appendChild(clonN);
                    formSetFavorite();
                  }
                actb_tocomplete();
              }
          }
      }
 
	function actb_tocomplete(kc){

		//if (kc == 38 || kc == 40 || kc == 13) return;
		if (kc == 38 || kc == 40 || kc == 13) return;
		actb_display = false;
		if (actb_curr.value == ''){
		    actb_display = false;
		    actb_generateAll();
			return;
		}
		if(actb_curr.value.length > actb_self.actb_maxMatchLength)
		  {
		    return;
		  }
		var i;
		if (actb_display){ 
			var word = 0;
			var c = 0;
			for (var i=0;i<=actb_self.actb_keywords.length;i++){
				if (actb_bool[i]) c++;
				if (c == actb_pos){
					word = i;
					break;
				}
			}
			actb_pre = word;
		}else{ actb_pre = -1};
		
		if (actb_curr.value == ''){
		    actb_generateAll();
			//actb_mouse_on_list = 0;
			//actb_removedisp();
			return;
		}
		if (actb_self.actb_delimiter.length > 0){
			caret_pos_start = getCaretStart(actb_curr);
			caret_pos_end = getCaretEnd(actb_curr);
			
			delim_split = '';
			for (i=0;i<actb_self.actb_delimiter.length;i++){
				delim_split += actb_self.actb_delimiter[i];
			}
			delim_split = delim_split.addslashes();
			delim_split_rx = new RegExp("(["+delim_split+"])");
			c = 0;
			actb_delimwords = new Array();
			actb_delimwords[0] = '';
			for (i=0,j=actb_curr.value.length;i<actb_curr.value.length;i++,j--){
				if (actb_curr.value.substr(i,j).search(delim_split_rx) == 0){
					ma = actb_curr.value.substr(i,j).match(delim_split_rx);
					actb_delimchar[c] = ma[1];
					c++;
					actb_delimwords[c] = '';
				}else{
					actb_delimwords[c] += actb_curr.value.charAt(i);
					
				}
			}
			var l = 0;
			actb_cdelimword = -1;
			for (i=0;i<actb_delimwords.length;i++){
				if (caret_pos_end >= l && caret_pos_end <= l + actb_delimwords[i].length){
					actb_cdelimword = i;
				}
				l+=actb_delimwords[i].length + 1;
			}
			var ot = actb_delimwords[actb_cdelimword].trim(); 
			var t = actb_delimwords[actb_cdelimword].addslashes().trim();
		}else{
			var ot = actb_curr.value;
			var t = actb_curr.value.addslashes();
		}
		if (ot.length == 0){
			actb_mouse_on_list = 0;
			actb_removedisp();
		}
		if (ot.length < actb_self.actb_startcheck) return this;
		if (actb_self.actb_firstText){
			var re = new RegExp("^" + t, "i");
		}else{
			var re = new RegExp(t, "i");
		}

		actb_total = 0;
		actb_tomake = false;
		actb_kwcount = 0;
		for (i=0;i<actb_self.actb_keywords.length;i++){
			actb_bool[i] = false;
			if (re.test(actb_self.actb_keywords[i])){
				actb_total++;
				actb_bool[i] = true;
				actb_kwcount++;
				if (actb_pre == i) actb_tomake = true;
			}
		}

		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list = 0;actb_removedisp();},actb_self.actb_timeOut);
		actb_generate();
	}
	function showSaveIcon()
	{
	   //window.event.cancelBubble=true;
	   var div= document.getElementById("form_favorite_save_icon");
	   if(div==null){
		  div = document.createElement("DIV");  
		  div.setAttribute("id","form_favorite_save_icon");
		  with(div.style)
		  {
		  	   visibility="hidden";
			   position="absolute";
		  }
		  var divhtml='<div style="background-color:transparent"><table cellspacing="0" cellpadding="0" ><tr><td align="left"  onclick="saveFavorite();" style="background-color:transparent">';
	
	      var saveicon = '<img src="unieap/pages/form/data/images/pen.gif" style="cursor:hand;z-index:100" border="0"/>' ;
	      divhtml = divhtml +saveicon +'</td>';
	      divhtml += '</tr></table></div>';
	      div.innerHTML=divhtml;
	      //div.attachEvent("onclick",function(){
  	      //   window.event.cancelBubble=true
  		  //});
	      document.body.appendChild(div);
	  }
	 // div.style.zIndex = 1;
	  var point = fGetXY(actb_curr);
	  div.style.left = point.x + actb_curr.offsetWidth +1;
	  div.style.top = point.y;
	  div.style.visibility="visible";
	}
	function setKeyWords(keywords){
		actb_self.actb_keywords  = keywords;
	}
	return this;
}
//**********************************************
/* hidde saveIcon*/
function hiddeSaveIcon()
{
	var div = document.getElementById('form_favorite_save_icon');
	//alert("hidde");
	if (div){ 		
			document.body.removeChild(document.getElementById('form_favorite_save_icon')); 
	} 
}
/****************common.js************************/
/* Event Functions */

// Add an event to the obj given
// event_name refers to the event trigger, without the "on", like click or mouseover
// func_name refers to the function callback when event is triggered
function addEvent(obj,event_name,func_name){
	if (obj.attachEvent){
		obj.attachEvent("on"+event_name, func_name);
	}else if(obj.addEventListener){
		obj.addEventListener(event_name,func_name,true);
	}else{
		obj["on"+event_name] = func_name;
	}
}

// Removes an event from the object
function removeEvent(obj,event_name,func_name){
	if (obj.detachEvent){
		obj.detachEvent("on"+event_name,func_name);
	}else if(obj.removeEventListener){
		obj.removeEventListener(event_name,func_name,true);
	}else{
		obj["on"+event_name] = null;
	}
}

// Stop an event from bubbling up the event DOM
function stopEvent(evt){
	evt || window.event;
	if (evt.stopPropagation){
		evt.stopPropagation();
		evt.preventDefault();
	}else if(typeof evt.cancelBubble != "undefined"){
		evt.cancelBubble = true;
		evt.returnValue = false;
	}
	return false;
}

// Get the obj that starts the event
function getElement(evt){
	if (window.event){
		return window.event.srcElement;
	}else{
		return evt.currentTarget;
	}
}
// Get the obj that triggers off the event
function getTargetElement(evt){
	if (window.event){
		return window.event.srcElement;
	}else{
		return evt.target;
	}
}
// For IE only, stops the obj from being selected
function stopSelect(obj){
	if (typeof obj.onselectstart != 'undefined'){
		addEvent(obj,"selectstart",function(){ return false;});
	}
}

/*    Caret Functions     */

// Get the end position of the caret in the object. Note that the obj needs to be in focus first
function getCaretEnd(obj){
	if(typeof obj.selectionEnd != "undefined"){
		return obj.selectionEnd;
	}else if(document.selection&&document.selection.createRange){
		var M=document.selection.createRange();
		try{
			var Lp = M.duplicate();
			Lp.moveToElementText(obj);
		}catch(e){
			var Lp=obj.createTextRange();
		}
		Lp.setEndPoint("EndToEnd",M);
		var rb=Lp.text.length;
		if(rb>obj.value.length){
			return -1;
		}
		return rb;
	}
}
// Get the start position of the caret in the object
function getCaretStart(obj){
	if(typeof obj.selectionStart != "undefined"){
		return obj.selectionStart;
	}else if(document.selection&&document.selection.createRange){
		var M=document.selection.createRange();
		try{
			var Lp = M.duplicate();
			Lp.moveToElementText(obj);
		}catch(e){
			var Lp=obj.createTextRange();
		}
		Lp.setEndPoint("EndToStart",M);
		var rb=Lp.text.length;
		if(rb>obj.value.length){
			return -1;
		}
		return rb;
	}
}
// sets the caret position to l in the object
function setCaret(obj,l){
	obj.focus();
	if (obj.setSelectionRange){
		obj.setSelectionRange(l,l);
	}else if(obj.createTextRange){
		m = obj.createTextRange();		
		m.moveStart('character',l);
		m.collapse();
		m.select();
	}
}
// sets the caret selection from s to e in the object
function setSelection(obj,s,e){
	obj.focus();
	if (obj.setSelectionRange){
		obj.setSelectionRange(s,e);
	}else if(obj.createTextRange){
		m = obj.createTextRange();		
		m.moveStart('character',s);
		m.moveEnd('character',e);
		m.select();
	}
}

/*    Escape function   */
String.prototype.addslashes = function(){
	return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
}
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};
/* --- Escape --- */

/* Offset position from top of the screen */
function curTop(obj){
	toreturn = 0;
	while(obj){
		toreturn += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return toreturn;
}
function curLeft(obj){
	toreturn = 0;
	while(obj){
		toreturn += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return toreturn;
}
/* ------ End of Offset function ------- */

/* Types Function */

// is a given input a number?
function isNumber(a) {
    return typeof a == 'number' && isFinite(a);
}

/* Object Functions */

function replaceHTML(obj,text){
	while(el = obj.childNodes[0]){
		obj.removeChild(el);
	};
	obj.appendChild(document.createTextNode(text));
}

function replaceAll(str_source,str_old,str_new)
 {
    return str_source.replace(eval("/"+str_old+"/g"), str_new);
 }