var leftBox_prefixname = "listBox_left_";
var rightBox_prefixname = "listBox_right_";
var listBox_DEBUG = true;
/**
 *@description listboxµÄÒÆ¶¯·½·¨(private)
 *@param name listbox×é¼þµÄÃû³Æ
 *@param method ÓÒÒÆ(add)/×óÒÆ(left)
 */
function listBox_move(name,method){
   var obj = document.getElementById(name);
   var isPartRefresh = obj.isPartRefresh+"";
   if(isPartRefresh=="true"){
       var params = listBox_dynamicParams(name,method);
       if(params=="") return;
       var result = executeRequest(obj.actionName,obj.actionMethod,params);
       listBox_dynamicExecute(result,name);
   }
   else{
      var leftObj = document.all(leftBox_prefixname+name);
      var rightObj = document.all(rightBox_prefixname+name);
      if("del"==method){
          rightObj= document.all(leftBox_prefixname+name);
          leftObj= document.all(rightBox_prefixname+name);
         
      }
      if(!listBox_innerStaticFunc(name,leftObj,rightObj)) return;
        
   }
   listBox_storeValue(name);
}
/**
 *@description listboxµÄË«»÷ÒÆ¶¯(private)
 *@param obj select×é¼þ
 *@return true/false
 */
function listBox_dblclick(obj){ 
   if(obj.options){
      if(obj.options.length==0) return false;
      return true;
   }
   return false;
}
/**
 *@description listboxµÄË«»÷ÒÆ¶¯(private)
 *@param obj select×é¼þ
 *@return true/false
 */
function listBox_onkeypress(obj){
   if(obj.options){
      if(obj.options.length==0||obj.selectedIndex<0||event.keyCode!=46) return false;
      return true;
   }
   return false;
}

/**
 *@description listboxµÄ¶¯Ì¬ÒÆ¶¯·½·¨(private)
 *@param name listbox×é¼þµÄÃû³Æ
 *@param method ×óÒÆ(add)/ÓÒÒÆ(left)
 */
function listBox_dynamicParams(name,method){
   var parameters = "";
   //var selectedOptions = "";
   //var leftListBoxOptions = "";
   //var rightListBoxOptions = "";
   parameters+="listBoxName="+name;
   parameters+="&listBoxMethod="+method;
   
   if("del"==method){
       var o1 = document.all(rightBox_prefixname+name);
       var o2 = document.all(leftBox_prefixname+name);
       var arr = listBox_innerDynamicFunc(o1,o2,false);
       if(arr[0]=="") return "";
       //selectedOptions = "&listBoxselectedOptions="+arr[0];
       //leftListBoxOptions = "&listBoxLeftZone="+arr[2];
       //rightListBoxOptions = "&listBoxRightZone="+arr[1];
   }
   else if("add"==method){
       var o1 = document.all(leftBox_prefixname+name);
       var o2 = document.all(rightBox_prefixname+name);
       var arr = listBox_innerDynamicFunc(o1,o2,true);
       if(arr[0]=="") return "";
       //selectedOptions = "&listBoxselectedOptions="+arr[0];
       //leftListBoxOptions = "&listBoxLeftZone="+arr[1];
       //rightListBoxOptions = "&listBoxRightZone="+arr[2];
   }
   else{
      alert("the method "+method+" didn't defined.");
      return "";
   } 
   //parameters+= selectedOptions + leftListBoxOptions + rightListBoxOptions;
   parameters+=arr[0]+arr[1]+arr[2];
   parameters+="&"+ listBox_customParam(name);
   return parameters;
}
/**
 *@description ¹¹ÔìÒÆ¶¯Ê±¶¯Ì¬µÄ´«µÝ²ÎÊý(private)
 *@param o1 ×ó/ÓÒÏÂÀ­¿ò¶ÔÏó
 *@param o2 ÓÒ/×óÏÂÀ­¿ò¶ÔÏó
 *@param flag ÓÒ(listBoxLeftZone)/×ó(listBoxRightZone)
 */
function listBox_innerDynamicFunc(o1,o2,flag){
   var arr = ["","",""];
   for(var i=0;i<o1.options.length;i++){
       var cell = o1.options(i);
       if(cell.selected)
          //arr[0]+=","+cell.value;  
          arr[0]+="&listBoxselectedOptions="+cell.value;     
       else{
          //arr[1]+=","+cell.value;
          if(flag)
             arr[1]+="&listBoxLeftZone="+cell.value;  
          else
             arr[1]+="&listBoxRightZone="+cell.value;  
       }
   }
   for(var i=0;i<o2.options.length;i++){
       var cell = o2.options(i);
       if(flag)
          arr[2]+="&listBoxRightZone="+cell.value;
       else
          arr[2]+="&listBoxLeftZone="+cell.value;
       //arr[2]+=","+cell.value;
   }
   //if(arr[0]!="") arr[0]=arr[0].substring(1);
   //if(arr[1]!="") arr[1]=arr[1].substring(1);
   //if(arr[2]!="") arr[2]=arr[2].substring(1);
   return arr;
}
/**
 *@description ´¦Àí´ÓºóÌ¨·µ»ØµÄ½á¹û(private)
 *@param result ´Óºó·µ»ØµÄjsÊý×é¶ÔÏó×Ö·û´®
 *@param name listbox×é¼þµÄÃû³Æ
 */
function listBox_dynamicExecute(result,name){
   var leftObj = document.all(leftBox_prefixname+name);
   var rightObj = document.all(rightBox_prefixname+name);
   var arr = eval(result);
   listBox_changeContent(name,leftObj,rightObj,arr);
   
}
/**
 *@description ¸Ä±ä×óÓÒÏÂÀ­¿ò×é¼þµÄÄÚÈÝ²Ù×÷(private)
 *@param name listbox×é¼þµÄÃû³Æ
 *@param o1 ×ó/ÓÒÏÂÀ­¿ò¶ÔÏó
 *@param o2 ÓÒ/×óÏÂÀ­¿ò¶ÔÏó
 *@param arr ´æ·Å×Å×óÓÒÀ­¿òµÄhtmlÄÚÈÝ
 */
function listBox_changeContent(name,o1,o2,arr){
    var preO1html =  o1.outerHTML.substring(0,o1.outerHTML.indexOf(">")+1);
    var preO2html =  o2.outerHTML.substring(0,o2.outerHTML.indexOf(">")+1);
    o1.outerHTML = preO1html +listBox_cancelSelectItem(name,arr[0]) +"</select>";
    o2.outerHTML = preO2html +listBox_cancelSelectItem(name,arr[1]) +"</select>";
}
/**
 *@description ÒÆ³ýµô¾²Ì¬ÒÆ¶¯Ê±selectedµÄ×´Ì¬
 *@param name listbox×é¼þµÄÃû³Æ
 *@param str select×é¼þµÄhtmlÄÚÈÝ
 *@return ¹ýÂËºóµÄhtml
 */
function listBox_cancelSelectItem(name,str){ 
    var obj = document.getElementById(name);
    var isPartRefresh = obj.isPartRefresh+"";
    if(isPartRefresh=="false"){
	    var re = /selected/g; 
	    str = str.replace(re, " "); 
    }   
    return str;
}
/**
 *@description listboxµÄ¾²Ì¬ÒÆ¶¯·½·¨(private)
 *@param name listbox×é¼þµÄÃû³Æ
 *@param o1 ×ó/ÓÒÏÂÀ­¿ò¶ÔÏó
 *@param o2 ÓÒ/×óÏÂÀ­¿ò¶ÔÏó
 */
function listBox_innerStaticFunc(name,o1,o2){
    var arr = ["",""];
    for(var i=0;i<o1.options.length;i++){
       var item = o1.options(i);
       if(item.selected){
          arr[1]+=item.outerHTML+"\n";
       }
       else{
          arr[0]+=item.outerHTML+"\n";
       }
    }
    if(arr[1]=="") return false;
    if(o2.innerHTML){
      arr[1]= o2.innerHTML+arr[1];
    }
    listBox_changeContent(name,o1,o2,arr);
    
    return true;
}
/**
 *@description ´æ´¢×óÓÒÁ½±ßÏÂÀ­¿òÊý¾Ýµ½Òþ²ØÓòµÄ²Ù×÷²¢ÇÒ¸Ä±ä°´Å¥µÄ×´Ì¬¿ÉÓÃÓë·ñ(private)
 *@param name listbox×é¼þµÄÃû³Æ
 */
function listBox_storeValue(name){
   var styleSubfix = document.getElementById(name).styleSubfix;
   var o1 = document.all(leftBox_prefixname+name);
   var o2 = document.all(rightBox_prefixname+name);
   var result = "";
   for(var i=0;i<o1.options.length;i++){
       result+="\t<input type='hidden' name='listBoxLeftStoreValue_"+name+"' value=\""+o1.options(i).value+"\">\n";
   }
   if(result==""){ 
      document.all("listBox_rightBtn_"+name).disabled = true;
      document.all("listBox_rightBtn_"+name).className = "ListBoxRightBtnDisabledStyle"+styleSubfix;
      if(document.all("listBox_fullRightBtn_"+name)){
      	 document.all("listBox_fullRightBtn_"+name).disabled = true;
      	 document.all("listBox_fullRightBtn_"+name).className = "ListBoxFullRightBtnDisabledStyle"+styleSubfix;
      }
   }
   else{ 
      document.all("listBox_rightBtn_"+name).disabled = false;
      document.all("listBox_rightBtn_"+name).className = "ListBoxRightBtnStyle"+styleSubfix;
      if(document.all("listBox_fullRightBtn_"+name)){
      	 document.all("listBox_fullRightBtn_"+name).disabled = false;
      	 document.all("listBox_fullRightBtn_"+name).className = "ListBoxFullRightBtnStyle"+styleSubfix;
      }
   }
   document.all("listBoxLeftStoreValue_hidden_span_"+name).innerHTML = result;
   result= "";
   for(var i=0;i<o2.options.length;i++){
       result+="\t<input type='hidden' name='listBoxRightStoreValue_"+name+"' value=\""+o2.options(i).value+"\">\n";
   }
   if(result==""){ 
      document.all("listBox_leftBtn_"+name).disabled = true;
      document.all("listBox_leftBtn_"+name).className = "ListBoxLeftBtnDisabledStyle"+styleSubfix;
      if(document.all("listBox_fullLeftBtn_"+name)){
      	 document.all("listBox_fullLeftBtn_"+name).disabled = true;
      	 document.all("listBox_fullLeftBtn_"+name).className = "ListBoxFullLeftBtnDisabledStyle"+styleSubfix;
      }
   }
   else{ 
      document.all("listBox_leftBtn_"+name).disabled = false;
      document.all("listBox_leftBtn_"+name).className ="ListBoxLeftBtnStyle"+styleSubfix;
      if(document.all("listBox_fullLeftBtn_"+name)){
      	 document.all("listBox_fullLeftBtn_"+name).disabled = false;
      	 document.all("listBox_fullLeftBtn_"+name).className = "ListBoxFullLeftBtnStyle"+styleSubfix;
      }
   }
   document.all("listBoxRightStoreValue_hidden_span_"+name).innerHTML = result;
}
/**
 *@description ×óÓÒÒÆ¶¯Ê±ÓÃ»§×Ô¶¨ÒåµÄ²ÎÊý´«µÝ(public)
 *@param name listbox×é¼þµÄÃû³Æ
 *@return ´«µÝ²ÎÊý
 */
function listBox_customParam(name){
   return "";
}
/**
 *@description onchageÊÂ¼þ(private)
 *@param obj ÏÂÀ­¿ò×é¼þ¶ÔÏó
 *@param name ¶¨Î»ÊäÈëÓò×é¼þµÄÃû³Æ
 */
function listBox_click(obj,name){
	for(var i=0;i<obj.options.length;i++){
		if(obj.options(i).selected){
			document.all(name).value = obj.options(i).text;
			break;
		}
	}
}
/**
 *@description ¶¨Î»ÊäÈëÓòµÄonkeyupÊÂ¼þ(private)
 *@param obj ¶¨Î»ÊäÈëÓò×é¼þ
 */
function listBox_keyup(obj){
	var select = document.all(obj.listbox);
    for(var i=0;i<select.options.length;i++){
	 if(select.options(i).text.indexOf(obj.value)==0){
		select.options(i).selected = true;
		select.options(i).selected = false;
		break;
	 }
    }
}
/**
 *@description È«ÒÆ¶¯ÊÂ¼þ(private)
 *@param name ¶¨Î»ÊäÈëÓò×é¼þµÄÃû³Æ
 *@param method ÓÒÒÆ(add)/×óÒÆ(left)
 */
function listBox_fullmove(name,method){
	var obj;
	switch(method){
	   case "add" :
		obj = document.all(leftBox_prefixname+name);
	 	break;
	   case "del"  :
		obj = document.all(rightBox_prefixname+name);
		break;
	   default :
	        alert("not support "+ method +" method to move datas.");
	        return ;
	}
	for(var i=0;i<obj.options.length;i++){
	    obj.options(i).selected = true;
	}
	listBox_move(name,method);
}
/**
 *@description Ìæ»»×é¼þÄÚÈÝ(private)
 *@param listbox ×é¼þ¶ÔÏó
 *@param content ÄÚÈÝ
 */
function listBox_changeSingleContent(listbox,content){
    var prehtml =  listbox.outerHTML.substring(0,listbox.outerHTML.indexOf(">")+1);
    listbox.outerHTML = prehtml + content + "</select>";
}
/**
 *@description Ìæ»»Á½¸öoptionµ¥ÔªµÄÄÚÈÝ(private)
 *@param cell Ç°Ò»¸ö»òÕßºóÒ»¸ö¶ÔÏó
 *@param selectedCell Ñ¡ÖÐ¶ÔÏó
 */
function listBox_exchangeDBCellContent(cell,selectedCell){
      var attrs = cell.outerHTML.substring(cell.outerHTML.indexOf(" "),cell.outerHTML.indexOf(">")).split(" ");
      var attrArray = [],valueArray = [];	   
      for(var i=0;i<attrs.length;i++){
    	  if(attrs[i].indexOf("=")>0){
    	      var temp = attrs[i].split("=");
    	      attrArray[attrArray.length] = temp[0];
    	      valueArray[valueArray.length] = temp[1];
    	  }
      }
      for(var i=0;i<attrArray.length;i++){
          cell.setAttribute(attrArray[i],selectedCell.getAttribute(attrArray[i]));
      	  selectedCell.setAttribute(attrArray[i],valueArray[i]);
      }
      var text = cell.text;
      cell.text = selectedCell.text;
      selectedCell.text = text;
      selectedCell.selected = false;
      cell.selected = true;
}

var strGB= "";
	strGB+="°¡°¢°£°¤°¥°¦°§°¨°©°ª°«°¬°­°®°¯°°°±°²°³°´°µ°¶°·°¸°¹°º°»°¼°½°¾°¿°À°Á°Â°Ã°Ä";
	strGB+="°Å°Æ°Ç°È°É°Ê°Ë°Ì°Í°Î°Ï°Ð°Ñ°Ò°Ó°Ô°Õ°Ö°×°Ø°Ù°Ú°Û°Ü°Ý°Þ°ß°à°á°â°ã°ä°å°æ°ç°è";
	strGB+="°é°ê°ë°ì°í°î°ï°ð°ñ°ò°ó°ô°õ°ö°÷°ø°ù°ú°û°ü°ý°þ±¡±¢±£±¤±¥±¦±§±¨±©±ª±«±¬±­±®";
	strGB+="±¯±°±±±²±³±´±µ±¶±·±¸±¹±º±»±¼±½±¾±¿±À±Á±Â±Ã±Ä±Å±Æ±Ç±È±É±Ê±Ë±Ì±Í±Î±Ï±Ð±Ñ±Ò";
	strGB+="±Ó±Ô±Õ±Ö±×±Ø±Ù±Ú±Û±Ü±Ý±Þ±ß±à±á±â±ã±ä±å±æ±ç±è±é±ê±ë±ì±í±î±ï±ð±ñ±ò±ó±ô±õ±ö";
	strGB+="±÷±ø±ù±ú±û±ü±ý±þ²¡²¢²£²¤²¥²¦²§²¨²©²ª²«²¬²­²®²¯²°²±²²²³²´²µ²¶²·²¸²¹²º²»²¼";
	strGB+="²½²¾²¿²À²Á²Â²Ã²Ä²Å²Æ²Ç²È²É²Ê²Ë²Ì²Í²Î²Ï²Ð²Ñ²Ò²Ó²Ô²Õ²Ö²×²Ø²Ù²Ú²Û²Ü²Ý²Þ²ß²à";
	strGB+="²á²â²ã²ä²å²æ²ç²è²é²ê²ë²ì²í²î²ï²ð²ñ²ò²ó²ô²õ²ö²÷²ø²ù²ú²û²ü²ý²þ³¡³¢³£³¤³¥³¦";
	strGB+="³§³¨³©³ª³«³¬³­³®³¯³°³±³²³³³´³µ³¶³·³¸³¹³º³»³¼³½³¾³¿³À³Á³Â³Ã³Ä³Å³Æ³Ç³È³É³Ê";
	strGB+="³Ë³Ì³Í³Î³Ï³Ð³Ñ³Ò³Ó³Ô³Õ³Ö³×³Ø³Ù³Ú³Û³Ü³Ý³Þ³ß³à³á³â³ã³ä³å³æ³ç³è³é³ê³ë³ì³í³î";
	strGB+="³ï³ð³ñ³ò³ó³ô³õ³ö³÷³ø³ù³ú³û³ü³ý³þ´¡´¢´£´¤´¥´¦´§´¨´©´ª´«´¬´­´®´¯´°´±´²´³´´";
	strGB+="´µ´¶´·´¸´¹´º´»´¼´½´¾´¿´À´Á´Â´Ã´Ä´Å´Æ´Ç´È´É´Ê´Ë´Ì´Í´Î´Ï´Ð´Ñ´Ò´Ó´Ô´Õ´Ö´×´Ø";
	strGB+="´Ù´Ú´Û´Ü´Ý´Þ´ß´à´á´â´ã´ä´å´æ´ç´è´é´ê´ë´ì´í´î´ï´ð´ñ´ò´ó´ô´õ´ö´÷´ø´ù´ú´û´ü";
	strGB+="´ý´þµ¡µ¢µ£µ¤µ¥µ¦µ§µ¨µ©µªµ«µ¬µ­µ®µ¯µ°µ±µ²µ³µ´µµµ¶µ·µ¸µ¹µºµ»µ¼µ½µ¾µ¿µÀµÁµÂ";
	strGB+="µÃµÄµÅµÆµÇµÈµÉµÊµËµÌµÍµÎµÏµÐµÑµÒµÓµÔµÕµÖµ×µØµÙµÚµÛµÜµÝµÞµßµàµáµâµãµäµåµæ";
	strGB+="µçµèµéµêµëµìµíµîµïµðµñµòµóµôµõµöµ÷µøµùµúµûµüµýµþ¶¡¶¢¶£¶¤¶¥¶¦¶§¶¨¶©¶ª¶«¶¬";
	strGB+="¶­¶®¶¯¶°¶±¶²¶³¶´¶µ¶¶¶·¶¸¶¹¶º¶»¶¼¶½¶¾¶¿¶À¶Á¶Â¶Ã¶Ä¶Å¶Æ¶Ç¶È¶É¶Ê¶Ë¶Ì¶Í¶Î¶Ï¶Ð";
	strGB+="¶Ñ¶Ò¶Ó¶Ô¶Õ¶Ö¶×¶Ø¶Ù¶Ú¶Û¶Ü¶Ý¶Þ¶ß¶à¶á¶â¶ã¶ä¶å¶æ¶ç¶è¶é¶ê¶ë¶ì¶í¶î¶ï¶ð¶ñ¶ò¶ó¶ô";
	strGB+="¶õ¶ö¶÷¶ø¶ù¶ú¶û¶ü¶ý¶þ·¡·¢·£·¤·¥·¦·§·¨·©·ª·«·¬·­·®·¯·°·±·²·³·´·µ·¶···¸·¹·º";
	strGB+="·»·¼·½·¾·¿·À·Á·Â·Ã·Ä·Å·Æ·Ç·È·É·Ê·Ë·Ì·Í·Î·Ï·Ð·Ñ·Ò·Ó·Ô·Õ·Ö·×·Ø·Ù·Ú·Û·Ü·Ý·Þ";
	strGB+="·ß·à·á·â·ã·ä·å·æ·ç·è·é·ê·ë·ì·í·î·ï·ð·ñ·ò·ó·ô·õ·ö·÷·ø·ù·ú·û·ü·ý·þ¸¡¸¢¸£¸¤";
	strGB+="¸¥¸¦¸§¸¨¸©¸ª¸«¸¬¸­¸®¸¯¸°¸±¸²¸³¸´¸µ¸¶¸·¸¸¸¹¸º¸»¸¼¸½¸¾¸¿¸À¸Á¸Â¸Ã¸Ä¸Å¸Æ¸Ç¸È";
	strGB+="¸É¸Ê¸Ë¸Ì¸Í¸Î¸Ï¸Ð¸Ñ¸Ò¸Ó¸Ô¸Õ¸Ö¸×¸Ø¸Ù¸Ú¸Û¸Ü¸Ý¸Þ¸ß¸à¸á¸â¸ã¸ä¸å¸æ¸ç¸è¸é¸ê¸ë¸ì";
	strGB+="¸í¸î¸ï¸ð¸ñ¸ò¸ó¸ô¸õ¸ö¸÷¸ø¸ù¸ú¸û¸ü¸ý¸þ¹¡¹¢¹£¹¤¹¥¹¦¹§¹¨¹©¹ª¹«¹¬¹­¹®¹¯¹°¹±¹²";
	strGB+="¹³¹´¹µ¹¶¹·¹¸¹¹¹º¹»¹¼¹½¹¾¹¿¹À¹Á¹Â¹Ã¹Ä¹Å¹Æ¹Ç¹È¹É¹Ê¹Ë¹Ì¹Í¹Î¹Ï¹Ð¹Ñ¹Ò¹Ó¹Ô¹Õ¹Ö";
	strGB+="¹×¹Ø¹Ù¹Ú¹Û¹Ü¹Ý¹Þ¹ß¹à¹á¹â¹ã¹ä¹å¹æ¹ç¹è¹é¹ê¹ë¹ì¹í¹î¹ï¹ð¹ñ¹ò¹ó¹ô¹õ¹ö¹÷¹ø¹ù¹ú";
	strGB+="¹û¹ü¹ý¹þº¡º¢º£º¤º¥º¦º§º¨º©ºªº«º¬º­º®º¯º°º±º²º³º´ºµº¶º·º¸º¹ººº»º¼º½º¾º¿ºÀ";
	strGB+="ºÁºÂºÃºÄºÅºÆºÇºÈºÉºÊºËºÌºÍºÎºÏºÐºÑºÒºÓºÔºÕºÖº×ºØºÙºÚºÛºÜºÝºÞºßºàºáºâºãºä";
	strGB+="ºåºæºçºèºéºêºëºìºíºîºïºðºñºòºóºôºõºöº÷ºøºùºúºûºüºýºþ»¡»¢»£»¤»¥»¦»§»¨»©»ª";
	strGB+="»«»¬»­»®»¯»°»±»²»³»´»µ»¶»·»¸»¹»º»»»¼»½»¾»¿»À»Á»Â»Ã»Ä»Å»Æ»Ç»È»É»Ê»Ë»Ì»Í»Î";
	strGB+="»Ï»Ð»Ñ»Ò»Ó»Ô»Õ»Ö»×»Ø»Ù»Ú»Û»Ü»Ý»Þ»ß»à»á»â»ã»ä»å»æ»ç»è»é»ê»ë»ì»í»î»ï»ð»ñ»ò";
	strGB+="»ó»ô»õ»ö»÷»ø»ù»ú»û»ü»ý»þ¼¡¼¢¼£¼¤¼¥¼¦¼§¼¨¼©¼ª¼«¼¬¼­¼®¼¯¼°¼±¼²¼³¼´¼µ¼¶¼·¼¸";
	strGB+="¼¹¼º¼»¼¼¼½¼¾¼¿¼À¼Á¼Â¼Ã¼Ä¼Å¼Æ¼Ç¼È¼É¼Ê¼Ë¼Ì¼Í¼Î¼Ï¼Ð¼Ñ¼Ò¼Ó¼Ô¼Õ¼Ö¼×¼Ø¼Ù¼Ú¼Û¼Ü";
	strGB+="¼Ý¼Þ¼ß¼à¼á¼â¼ã¼ä¼å¼æ¼ç¼è¼é¼ê¼ë¼ì¼í¼î¼ï¼ð¼ñ¼ò¼ó¼ô¼õ¼ö¼÷¼ø¼ù¼ú¼û¼ü¼ý¼þ½¡½¢";
	strGB+="½£½¤½¥½¦½§½¨½©½ª½«½¬½­½®½¯½°½±½²½³½´½µ½¶½·½¸½¹½º½»½¼½½½¾½¿½À½Á½Â½Ã½Ä½Å½Æ";
	strGB+="½Ç½È½É½Ê½Ë½Ì½Í½Î½Ï½Ð½Ñ½Ò½Ó½Ô½Õ½Ö½×½Ø½Ù½Ú½Û½Ü½Ý½Þ½ß½à½á½â½ã½ä½å½æ½ç½è½é½ê";
	strGB+="½ë½ì½í½î½ï½ð½ñ½ò½ó½ô½õ½ö½÷½ø½ù½ú½û½ü½ý½þ¾¡¾¢¾£¾¤¾¥¾¦¾§¾¨¾©¾ª¾«¾¬¾­¾®¾¯¾°";
	strGB+="¾±¾²¾³¾´¾µ¾¶¾·¾¸¾¹¾º¾»¾¼¾½¾¾¾¿¾À¾Á¾Â¾Ã¾Ä¾Å¾Æ¾Ç¾È¾É¾Ê¾Ë¾Ì¾Í¾Î¾Ï¾Ð¾Ñ¾Ò¾Ó¾Ô";
	strGB+="¾Õ¾Ö¾×¾Ø¾Ù¾Ú¾Û¾Ü¾Ý¾Þ¾ß¾à¾á¾â¾ã¾ä¾å¾æ¾ç¾è¾é¾ê¾ë¾ì¾í¾î¾ï¾ð¾ñ¾ò¾ó¾ô¾õ¾ö¾÷¾ø";
	strGB+="¾ù¾ú¾û¾ü¾ý¾þ¿¡¿¢¿£¿¤¿¥¿¦¿§¿¨¿©¿ª¿«¿¬¿­¿®¿¯¿°¿±¿²¿³¿´¿µ¿¶¿·¿¸¿¹¿º¿»¿¼¿½¿¾";
	strGB+="¿¿¿À¿Á¿Â¿Ã¿Ä¿Å¿Æ¿Ç¿È¿É¿Ê¿Ë¿Ì¿Í¿Î¿Ï¿Ð¿Ñ¿Ò¿Ó¿Ô¿Õ¿Ö¿×¿Ø¿Ù¿Ú¿Û¿Ü¿Ý¿Þ¿ß¿à¿á¿â";
	strGB+="¿ã¿ä¿å¿æ¿ç¿è¿é¿ê¿ë¿ì¿í¿î¿ï¿ð¿ñ¿ò¿ó¿ô¿õ¿ö¿÷¿ø¿ù¿ú¿û¿ü¿ý¿þÀ¡À¢À£À¤À¥À¦À§À¨";
	strGB+="À©ÀªÀ«À¬À­À®À¯À°À±À²À³À´ÀµÀ¶À·À¸À¹ÀºÀ»À¼À½À¾À¿ÀÀÀÁÀÂÀÃÀÄÀÅÀÆÀÇÀÈÀÉÀÊÀËÀÌ";
	strGB+="ÀÍÀÎÀÏÀÐÀÑÀÒÀÓÀÔÀÕÀÖÀ×ÀØÀÙÀÚÀÛÀÜÀÝÀÞÀßÀàÀáÀâÀãÀäÀåÀæÀçÀèÀéÀêÀëÀìÀíÀîÀïÀð";
	strGB+="ÀñÀòÀóÀôÀõÀöÀ÷ÀøÀùÀúÀûÀüÀýÀþÁ¡Á¢Á£Á¤Á¥Á¦Á§Á¨Á©ÁªÁ«Á¬Á­Á®Á¯Á°Á±Á²Á³Á´ÁµÁ¶";
	strGB+="Á·Á¸Á¹ÁºÁ»Á¼Á½Á¾Á¿ÁÀÁÁÁÂÁÃÁÄÁÅÁÆÁÇÁÈÁÉÁÊÁËÁÌÁÍÁÎÁÏÁÐÁÑÁÒÁÓÁÔÁÕÁÖÁ×ÁØÁÙÁÚ";
	strGB+="ÁÛÁÜÁÝÁÞÁßÁàÁáÁâÁãÁäÁåÁæÁçÁèÁéÁêÁëÁìÁíÁîÁïÁðÁñÁòÁóÁôÁõÁöÁ÷ÁøÁùÁúÁûÁüÁýÁþ";
	strGB+="Â¡Â¢Â£Â¤Â¥Â¦Â§Â¨Â©ÂªÂ«Â¬Â­Â®Â¯Â°Â±Â²Â³Â´ÂµÂ¶Â·Â¸Â¹ÂºÂ»Â¼Â½Â¾Â¿ÂÀÂÁÂÂÂÃÂÄ";
	strGB+="ÂÅÂÆÂÇÂÈÂÉÂÊÂËÂÌÂÍÂÎÂÏÂÐÂÑÂÒÂÓÂÔÂÕÂÖÂ×ÂØÂÙÂÚÂÛÂÜÂÝÂÞÂßÂàÂáÂâÂãÂäÂåÂæÂçÂè";
	strGB+="ÂéÂêÂëÂìÂíÂîÂïÂðÂñÂòÂóÂôÂõÂöÂ÷ÂøÂùÂúÂûÂüÂýÂþÃ¡Ã¢Ã£Ã¤Ã¥Ã¦Ã§Ã¨Ã©ÃªÃ«Ã¬Ã­Ã®";
	strGB+="Ã¯Ã°Ã±Ã²Ã³Ã´ÃµÃ¶Ã·Ã¸Ã¹ÃºÃ»Ã¼Ã½Ã¾Ã¿ÃÀÃÁÃÂÃÃÃÄÃÅÃÆÃÇÃÈÃÉÃÊÃËÃÌÃÍÃÎÃÏÃÐÃÑÃÒ";
	strGB+="ÃÓÃÔÃÕÃÖÃ×ÃØÃÙÃÚÃÛÃÜÃÝÃÞÃßÃàÃáÃâÃãÃäÃåÃæÃçÃèÃéÃêÃëÃìÃíÃîÃïÃðÃñÃòÃóÃôÃõÃö";
	strGB+="Ã÷ÃøÃùÃúÃûÃüÃýÃþÄ¡Ä¢Ä£Ä¤Ä¥Ä¦Ä§Ä¨Ä©ÄªÄ«Ä¬Ä­Ä®Ä¯Ä°Ä±Ä²Ä³Ä´ÄµÄ¶Ä·Ä¸Ä¹ÄºÄ»Ä¼";
	strGB+="Ä½Ä¾Ä¿ÄÀÄÁÄÂÄÃÄÄÄÅÄÆÄÇÄÈÄÉÄÊÄËÄÌÄÍÄÎÄÏÄÐÄÑÄÒÄÓÄÔÄÕÄÖÄ×ÄØÄÙÄÚÄÛÄÜÄÝÄÞÄßÄà";
	strGB+="ÄáÄâÄãÄäÄåÄæÄçÄèÄéÄêÄëÄìÄíÄîÄïÄðÄñÄòÄóÄôÄõÄöÄ÷ÄøÄùÄúÄûÄüÄýÄþÅ¡Å¢Å£Å¤Å¥Å¦";
	strGB+="Å§Å¨Å©ÅªÅ«Å¬Å­Å®Å¯Å°Å±Å²Å³Å´ÅµÅ¶Å·Å¸Å¹ÅºÅ»Å¼Å½Å¾Å¿ÅÀÅÁÅÂÅÃÅÄÅÅÅÆÅÇÅÈÅÉÅÊ";
	strGB+="ÅËÅÌÅÍÅÎÅÏÅÐÅÑÅÒÅÓÅÔÅÕÅÖÅ×ÅØÅÙÅÚÅÛÅÜÅÝÅÞÅßÅàÅáÅâÅãÅäÅåÅæÅçÅèÅéÅêÅëÅìÅíÅî";
	strGB+="ÅïÅðÅñÅòÅóÅôÅõÅöÅ÷ÅøÅùÅúÅûÅüÅýÅþÆ¡Æ¢Æ£Æ¤Æ¥Æ¦Æ§Æ¨Æ©ÆªÆ«Æ¬Æ­Æ®Æ¯Æ°Æ±Æ²Æ³Æ´";
	strGB+="ÆµÆ¶Æ·Æ¸Æ¹ÆºÆ»Æ¼Æ½Æ¾Æ¿ÆÀÆÁÆÂÆÃÆÄÆÅÆÆÆÇÆÈÆÉÆÊÆËÆÌÆÍÆÎÆÏÆÐÆÑÆÒÆÓÆÔÆÕÆÖÆ×ÆØ";
	strGB+="ÆÙÆÚÆÛÆÜÆÝÆÞÆßÆàÆáÆâÆãÆäÆåÆæÆçÆèÆéÆêÆëÆìÆíÆîÆïÆðÆñÆòÆóÆôÆõÆöÆ÷ÆøÆùÆúÆûÆü";
	strGB+="ÆýÆþÇ¡Ç¢Ç£Ç¤Ç¥Ç¦Ç§Ç¨Ç©ÇªÇ«Ç¬Ç­Ç®Ç¯Ç°Ç±Ç²Ç³Ç´ÇµÇ¶Ç·Ç¸Ç¹ÇºÇ»Ç¼Ç½Ç¾Ç¿ÇÀÇÁÇÂ";
	strGB+="ÇÃÇÄÇÅÇÆÇÇÇÈÇÉÇÊÇËÇÌÇÍÇÎÇÏÇÐÇÑÇÒÇÓÇÔÇÕÇÖÇ×ÇØÇÙÇÚÇÛÇÜÇÝÇÞÇßÇàÇáÇâÇãÇäÇåÇæ";
	strGB+="ÇçÇèÇéÇêÇëÇìÇíÇîÇïÇðÇñÇòÇóÇôÇõÇöÇ÷ÇøÇùÇúÇûÇüÇýÇþÈ¡È¢È£È¤È¥È¦È§È¨È©ÈªÈ«È¬";
	strGB+="È­È®È¯È°È±È²È³È´ÈµÈ¶È·È¸È¹ÈºÈ»È¼È½È¾È¿ÈÀÈÁÈÂÈÃÈÄÈÅÈÆÈÇÈÈÈÉÈÊÈËÈÌÈÍÈÎÈÏÈÐ";
	strGB+="ÈÑÈÒÈÓÈÔÈÕÈÖÈ×ÈØÈÙÈÚÈÛÈÜÈÝÈÞÈßÈàÈáÈâÈãÈäÈåÈæÈçÈèÈéÈêÈëÈìÈíÈîÈïÈðÈñÈòÈóÈô";
	strGB+="ÈõÈöÈ÷ÈøÈùÈúÈûÈüÈýÈþÉ¡É¢É£É¤É¥É¦É§É¨É©ÉªÉ«É¬É­É®É¯É°É±É²É³É´ÉµÉ¶É·É¸É¹Éº";
	strGB+="É»É¼É½É¾É¿ÉÀÉÁÉÂÉÃÉÄÉÅÉÆÉÇÉÈÉÉÉÊÉËÉÌÉÍÉÎÉÏÉÐÉÑÉÒÉÓÉÔÉÕÉÖÉ×ÉØÉÙÉÚÉÛÉÜÉÝÉÞ";
	strGB+="ÉßÉàÉáÉâÉãÉäÉåÉæÉçÉèÉéÉêÉëÉìÉíÉîÉïÉðÉñÉòÉóÉôÉõÉöÉ÷ÉøÉùÉúÉûÉüÉýÉþÊ¡Ê¢Ê£Ê¤";
	strGB+="Ê¥Ê¦Ê§Ê¨Ê©ÊªÊ«Ê¬Ê­Ê®Ê¯Ê°Ê±Ê²Ê³Ê´ÊµÊ¶Ê·Ê¸Ê¹ÊºÊ»Ê¼Ê½Ê¾Ê¿ÊÀÊÁÊÂÊÃÊÄÊÅÊÆÊÇÊÈ";
	strGB+="ÊÉÊÊÊËÊÌÊÍÊÎÊÏÊÐÊÑÊÒÊÓÊÔÊÕÊÖÊ×ÊØÊÙÊÚÊÛÊÜÊÝÊÞÊßÊàÊáÊâÊãÊäÊåÊæÊçÊèÊéÊêÊëÊì";
	strGB+="ÊíÊîÊïÊðÊñÊòÊóÊôÊõÊöÊ÷ÊøÊùÊúÊûÊüÊýÊþË¡Ë¢Ë£Ë¤Ë¥Ë¦Ë§Ë¨Ë©ËªË«Ë¬Ë­Ë®Ë¯Ë°Ë±Ë²";
	strGB+="Ë³Ë´ËµË¶Ë·Ë¸Ë¹ËºË»Ë¼Ë½Ë¾Ë¿ËÀËÁËÂËÃËÄËÅËÆËÇËÈËÉËÊËËËÌËÍËÎËÏËÐËÑËÒËÓËÔËÕËÖ";
	strGB+="Ë×ËØËÙËÚËÛËÜËÝËÞËßËàËáËâËãËäËåËæËçËèËéËêËëËìËíËîËïËðËñËòËóËôËõËöË÷ËøËùËú";
	strGB+="ËûËüËýËþÌ¡Ì¢Ì£Ì¤Ì¥Ì¦Ì§Ì¨Ì©ÌªÌ«Ì¬Ì­Ì®Ì¯Ì°Ì±Ì²Ì³Ì´ÌµÌ¶Ì·Ì¸Ì¹ÌºÌ»Ì¼Ì½Ì¾Ì¿ÌÀ";
	strGB+="ÌÁÌÂÌÃÌÄÌÅÌÆÌÇÌÈÌÉÌÊÌËÌÌÌÍÌÎÌÏÌÐÌÑÌÒÌÓÌÔÌÕÌÖÌ×ÌØÌÙÌÚÌÛÌÜÌÝÌÞÌßÌàÌáÌâÌãÌä";
	strGB+="ÌåÌæÌçÌèÌéÌêÌëÌìÌíÌîÌïÌðÌñÌòÌóÌôÌõÌöÌ÷ÌøÌùÌúÌûÌüÌýÌþÍ¡Í¢Í£Í¤Í¥Í¦Í§Í¨Í©Íª";
	strGB+="Í«Í¬Í­Í®Í¯Í°Í±Í²Í³Í´ÍµÍ¶Í·Í¸Í¹ÍºÍ»Í¼Í½Í¾Í¿ÍÀÍÁÍÂÍÃÍÄÍÅÍÆÍÇÍÈÍÉÍÊÍËÍÌÍÍÍÎ";
	strGB+="ÍÏÍÐÍÑÍÒÍÓÍÔÍÕÍÖÍ×ÍØÍÙÍÚÍÛÍÜÍÝÍÞÍßÍàÍáÍâÍãÍäÍåÍæÍçÍèÍéÍêÍëÍìÍíÍîÍïÍðÍñÍò";
	strGB+="ÍóÍôÍõÍöÍ÷ÍøÍùÍúÍûÍüÍýÍþÎ¡Î¢Î£Î¤Î¥Î¦Î§Î¨Î©ÎªÎ«Î¬Î­Î®Î¯Î°Î±Î²Î³Î´ÎµÎ¶Î·Î¸";
	strGB+="Î¹ÎºÎ»Î¼Î½Î¾Î¿ÎÀÎÁÎÂÎÃÎÄÎÅÎÆÎÇÎÈÎÉÎÊÎËÎÌÎÍÎÎÎÏÎÐÎÑÎÒÎÓÎÔÎÕÎÖÎ×ÎØÎÙÎÚÎÛÎÜ";
	strGB+="ÎÝÎÞÎßÎàÎáÎâÎãÎäÎåÎæÎçÎèÎéÎêÎëÎìÎíÎîÎïÎðÎñÎòÎóÎôÎõÎöÎ÷ÎøÎùÎúÎûÎüÎýÎþÏ¡Ï¢";
	strGB+="Ï£Ï¤Ï¥Ï¦Ï§Ï¨Ï©ÏªÏ«Ï¬Ï­Ï®Ï¯Ï°Ï±Ï²Ï³Ï´ÏµÏ¶Ï·Ï¸Ï¹ÏºÏ»Ï¼Ï½Ï¾Ï¿ÏÀÏÁÏÂÏÃÏÄÏÅÏÆ";
	strGB+="ÏÇÏÈÏÉÏÊÏËÏÌÏÍÏÎÏÏÏÐÏÑÏÒÏÓÏÔÏÕÏÖÏ×ÏØÏÙÏÚÏÛÏÜÏÝÏÞÏßÏàÏáÏâÏãÏäÏåÏæÏçÏèÏéÏê";
	strGB+="ÏëÏìÏíÏîÏïÏðÏñÏòÏóÏôÏõÏöÏ÷ÏøÏùÏúÏûÏüÏýÏþÐ¡Ð¢Ð£Ð¤Ð¥Ð¦Ð§Ð¨Ð©ÐªÐ«Ð¬Ð­Ð®Ð¯Ð°";
	strGB+="Ð±Ð²Ð³Ð´ÐµÐ¶Ð·Ð¸Ð¹ÐºÐ»Ð¼Ð½Ð¾Ð¿ÐÀÐÁÐÂÐÃÐÄÐÅÐÆÐÇÐÈÐÉÐÊÐËÐÌÐÍÐÎÐÏÐÐÐÑÐÒÐÓÐÔ";
	strGB+="ÐÕÐÖÐ×ÐØÐÙÐÚÐÛÐÜÐÝÐÞÐßÐàÐáÐâÐãÐäÐåÐæÐçÐèÐéÐêÐëÐìÐíÐîÐïÐðÐñÐòÐóÐôÐõÐöÐ÷Ðø";
	strGB+="ÐùÐúÐûÐüÐýÐþÑ¡Ñ¢Ñ£Ñ¤Ñ¥Ñ¦Ñ§Ñ¨Ñ©ÑªÑ«Ñ¬Ñ­Ñ®Ñ¯Ñ°Ñ±Ñ²Ñ³Ñ´ÑµÑ¶Ñ·Ñ¸Ñ¹ÑºÑ»Ñ¼Ñ½Ñ¾";
	strGB+="Ñ¿ÑÀÑÁÑÂÑÃÑÄÑÅÑÆÑÇÑÈÑÉÑÊÑËÑÌÑÍÑÎÑÏÑÐÑÑÑÒÑÓÑÔÑÕÑÖÑ×ÑØÑÙÑÚÑÛÑÜÑÝÑÞÑßÑàÑáÑâ";
	strGB+="ÑãÑäÑåÑæÑçÑèÑéÑêÑëÑìÑíÑîÑïÑðÑñÑòÑóÑôÑõÑöÑ÷ÑøÑùÑúÑûÑüÑýÑþÒ¡Ò¢Ò£Ò¤Ò¥Ò¦Ò§Ò¨";
	strGB+="Ò©ÒªÒ«Ò¬Ò­Ò®Ò¯Ò°Ò±Ò²Ò³Ò´ÒµÒ¶Ò·Ò¸Ò¹ÒºÒ»Ò¼Ò½Ò¾Ò¿ÒÀÒÁÒÂÒÃÒÄÒÅÒÆÒÇÒÈÒÉÒÊÒËÒÌ";
	strGB+="ÒÍÒÎÒÏÒÐÒÑÒÒÒÓÒÔÒÕÒÖÒ×ÒØÒÙÒÚÒÛÒÜÒÝÒÞÒßÒàÒáÒâÒãÒäÒåÒæÒçÒèÒéÒêÒëÒìÒíÒîÒïÒð";
	strGB+="ÒñÒòÒóÒôÒõÒöÒ÷ÒøÒùÒúÒûÒüÒýÒþÓ¡Ó¢Ó£Ó¤Ó¥Ó¦Ó§Ó¨Ó©ÓªÓ«Ó¬Ó­Ó®Ó¯Ó°Ó±Ó²Ó³Ó´ÓµÓ¶";
	strGB+="Ó·Ó¸Ó¹ÓºÓ»Ó¼Ó½Ó¾Ó¿ÓÀÓÁÓÂÓÃÓÄÓÅÓÆÓÇÓÈÓÉÓÊÓËÓÌÓÍÓÎÓÏÓÐÓÑÓÒÓÓÓÔÓÕÓÖÓ×ÓØÓÙÓÚ";
	strGB+="ÓÛÓÜÓÝÓÞÓßÓàÓáÓâÓãÓäÓåÓæÓçÓèÓéÓêÓëÓìÓíÓîÓïÓðÓñÓòÓóÓôÓõÓöÓ÷ÓøÓùÓúÓûÓüÓýÓþ";
	strGB+="Ô¡Ô¢Ô£Ô¤Ô¥Ô¦Ô§Ô¨Ô©ÔªÔ«Ô¬Ô­Ô®Ô¯Ô°Ô±Ô²Ô³Ô´ÔµÔ¶Ô·Ô¸Ô¹ÔºÔ»Ô¼Ô½Ô¾Ô¿ÔÀÔÁÔÂÔÃÔÄ";
	strGB+="ÔÅÔÆÔÇÔÈÔÉÔÊÔËÔÌÔÍÔÎÔÏÔÐÔÑÔÒÔÓÔÔÔÕÔÖÔ×ÔØÔÙÔÚÔÛÔÜÔÝÔÞÔßÔàÔáÔâÔãÔäÔåÔæÔçÔè";
	strGB+="ÔéÔêÔëÔìÔíÔîÔïÔðÔñÔòÔóÔôÔõÔöÔ÷ÔøÔùÔúÔûÔüÔýÔþÕ¡Õ¢Õ£Õ¤Õ¥Õ¦Õ§Õ¨Õ©ÕªÕ«Õ¬Õ­Õ®";
	strGB+="Õ¯Õ°Õ±Õ²Õ³Õ´ÕµÕ¶Õ·Õ¸Õ¹ÕºÕ»Õ¼Õ½Õ¾Õ¿ÕÀÕÁÕÂÕÃÕÄÕÅÕÆÕÇÕÈÕÉÕÊÕËÕÌÕÍÕÎÕÏÕÐÕÑÕÒ";
	strGB+="ÕÓÕÔÕÕÕÖÕ×ÕØÕÙÕÚÕÛÕÜÕÝÕÞÕßÕàÕáÕâÕãÕäÕåÕæÕçÕèÕéÕêÕëÕìÕíÕîÕïÕðÕñÕòÕóÕôÕõÕö";
	strGB+="Õ÷ÕøÕùÕúÕûÕüÕýÕþÖ¡Ö¢Ö£Ö¤Ö¥Ö¦Ö§Ö¨Ö©ÖªÖ«Ö¬Ö­Ö®Ö¯Ö°Ö±Ö²Ö³Ö´ÖµÖ¶Ö·Ö¸Ö¹ÖºÖ»Ö¼";
	strGB+="Ö½Ö¾Ö¿ÖÀÖÁÖÂÖÃÖÄÖÅÖÆÖÇÖÈÖÉÖÊÖËÖÌÖÍÖÎÖÏÖÐÖÑÖÒÖÓÖÔÖÕÖÖÖ×ÖØÖÙÖÚÖÛÖÜÖÝÖÞÖßÖà";
	strGB+="ÖáÖâÖãÖäÖåÖæÖçÖèÖéÖêÖëÖìÖíÖîÖïÖðÖñÖòÖóÖôÖõÖöÖ÷ÖøÖùÖúÖûÖüÖýÖþ×¡×¢×£×¤×¥×¦";
	strGB+="×§×¨×©×ª×«×¬×­×®×¯×°×±×²×³×´×µ×¶×·×¸×¹×º×»×¼×½×¾×¿×À×Á×Â×Ã×Ä×Å×Æ×Ç×È×É×Ê";
	strGB+="×Ë×Ì×Í×Î×Ï×Ð×Ñ×Ò×Ó×Ô×Õ×Ö×××Ø×Ù×Ú×Û×Ü×Ý×Þ×ß×à×á×â×ã×ä×å×æ×ç×è×é×ê×ë×ì×í×î";
	strGB+="×ï×ð×ñ×ò×ó×ô×õ×ö×÷×ø×ù×ú×û×ü×ý×þØ¡Ø¢Ø£Ø¤Ø¥Ø¦Ø§Ø¨Ø©ØªØ«Ø¬Ø­Ø®Ø¯Ø°Ø±Ø²Ø³Ø´Øµ";
	strGB+="Ø¶Ø·Ø¸Ø¹ØºØ»Ø¼Ø½Ø¾Ø¿ØÀØÁØÂØÃØÄØÅØÆØÇØÈØÉØÊØËØÌØÍØÎØÏØÐØÑØÒØÓØÔØÕØÖØ×ØØØÙ";
	strGB+="ØÚØÛØÜØÝØÞØßØàØáØâØãØäØåØæØçØèØéØêØëØìØíØîØïØðØñØòØóØôØõØöØ÷ØøØùØúØûØüØý";
	strGB+="ØþÙ¡Ù¢Ù£Ù¤Ù¥Ù¦Ù§Ù¨Ù©ÙªÙ«Ù¬Ù­Ù®Ù¯Ù°Ù±Ù²Ù³Ù´ÙµÙ¶Ù·Ù¸Ù¹ÙºÙ»Ù¼Ù½Ù¾Ù¿ÙÀÙÁÙÂÙÃ";
	strGB+="ÙÄÙÅÙÆÙÇÙÈÙÉÙÊÙËÙÌÙÍÙÎÙÏÙÐÙÑÙÒÙÓÙÔÙÕÙÖÙ×ÙØÙÙÙÚÙÛÙÜÙÝÙÞÙßÙàÙáÙâÙãÙäÙåÙæÙç";
	strGB+="ÙèÙéÙêÙëÙìÙíÙîÙïÙðÙñÙòÙóÙôÙõÙöÙ÷ÙøÙùÙúÙûÙüÙýÙþÚ¡Ú¢Ú£Ú¤Ú¥Ú¦Ú§Ú¨Ú©ÚªÚ«Ú¬Ú­";
	strGB+="Ú®Ú¯Ú°Ú±Ú²Ú³Ú´ÚµÚ¶Ú·Ú¸Ú¹ÚºÚ»Ú¼Ú½Ú¾Ú¿ÚÀÚÁÚÂÚÃÚÄÚÅÚÆÚÇÚÈÚÉÚÊÚËÚÌÚÍÚÎÚÏÚÐÚÑ";
	strGB+="ÚÒÚÓÚÔÚÕÚÖÚ×ÚØÚÙÚÚÚÛÚÜÚÝÚÞÚßÚàÚáÚâÚãÚäÚåÚæÚçÚèÚéÚêÚëÚìÚíÚîÚïÚðÚñÚòÚóÚôÚõ";
	strGB+="ÚöÚ÷ÚøÚùÚúÚûÚüÚýÚþÛ¡Û¢Û£Û¤Û¥Û¦Û§Û¨Û©ÛªÛ«Û¬Û­Û®Û¯Û°Û±Û²Û³Û´ÛµÛ¶Û·Û¸Û¹ÛºÛ»";
	strGB+="Û¼Û½Û¾Û¿ÛÀÛÁÛÂÛÃÛÄÛÅÛÆÛÇÛÈÛÉÛÊÛËÛÌÛÍÛÎÛÏÛÐÛÑÛÒÛÓÛÔÛÕÛÖÛ×ÛØÛÙÛÚÛÛÛÜÛÝÛÞÛß";
	strGB+="ÛàÛáÛâÛãÛäÛåÛæÛçÛèÛéÛêÛëÛìÛíÛîÛïÛðÛñÛòÛóÛôÛõÛöÛ÷ÛøÛùÛúÛûÛüÛýÛþÜ¡Ü¢Ü£Ü¤Ü¥";
	strGB+="Ü¦Ü§Ü¨Ü©ÜªÜ«Ü¬Ü­Ü®Ü¯Ü°Ü±Ü²Ü³Ü´ÜµÜ¶Ü·Ü¸Ü¹ÜºÜ»Ü¼Ü½Ü¾Ü¿ÜÀÜÁÜÂÜÃÜÄÜÅÜÆÜÇÜÈÜÉ";
	strGB+="ÜÊÜËÜÌÜÍÜÎÜÏÜÐÜÑÜÒÜÓÜÔÜÕÜÖÜ×ÜØÜÙÜÚÜÛÜÜÜÝÜÞÜßÜàÜáÜâÜãÜäÜåÜæÜçÜèÜéÜêÜëÜìÜí";
	strGB+="ÜîÜïÜðÜñÜòÜóÜôÜõÜöÜ÷ÜøÜùÜúÜûÜüÜýÜþÝ¡Ý¢Ý£Ý¤Ý¥Ý¦Ý§Ý¨Ý©ÝªÝ«Ý¬Ý­Ý®Ý¯Ý°Ý±Ý²Ý³";
	strGB+="Ý´ÝµÝ¶Ý·Ý¸Ý¹ÝºÝ»Ý¼Ý½Ý¾Ý¿ÝÀÝÁÝÂÝÃÝÄÝÅÝÆÝÇÝÈÝÉÝÊÝËÝÌÝÍÝÎÝÏÝÐÝÑÝÒÝÓÝÔÝÕÝÖÝ×";
	strGB+="ÝØÝÙÝÚÝÛÝÜÝÝÝÞÝßÝàÝáÝâÝãÝäÝåÝæÝçÝèÝéÝêÝëÝìÝíÝîÝïÝðÝñÝòÝóÝôÝõÝöÝ÷ÝøÝùÝúÝû";
	strGB+="ÝüÝýÝþÞ¡Þ¢Þ£Þ¤Þ¥Þ¦Þ§Þ¨Þ©ÞªÞ«Þ¬Þ­Þ®Þ¯Þ°Þ±Þ²Þ³Þ´ÞµÞ¶Þ·Þ¸Þ¹ÞºÞ»Þ¼Þ½Þ¾Þ¿ÞÀÞÁ";
	strGB+="ÞÂÞÃÞÄÞÅÞÆÞÇÞÈÞÉÞÊÞËÞÌÞÍÞÎÞÏÞÐÞÑÞÒÞÓÞÔÞÕÞÖÞ×ÞØÞÙÞÚÞÛÞÜÞÝÞÞÞßÞàÞáÞâÞãÞäÞå";
	strGB+="ÞæÞçÞèÞéÞêÞëÞìÞíÞîÞïÞðÞñÞòÞóÞôÞõÞöÞ÷ÞøÞùÞúÞûÞüÞýÞþß¡ß¢ß£ß¤ß¥ß¦ß§ß¨ß©ßªß«";
	strGB+="ß¬ß­ß®ß¯ß°ß±ß²ß³ß´ßµß¶ß·ß¸ß¹ßºß»ß¼ß½ß¾ß¿ßÀßÁßÂßÃßÄßÅßÆßÇßÈßÉßÊßËßÌßÍßÎßÏ";
	strGB+="ßÐßÑßÒßÓßÔßÕßÖß×ßØßÙßÚßÛßÜßÝßÞßßßàßáßâßãßäßåßæßçßèßéßêßëßìßíßîßïßðßñßòßó";
	strGB+="ßôßõßöß÷ßøßùßúßûßüßýßþà¡à¢à£à¤à¥à¦à§à¨à©àªà«à¬à­à®à¯à°à±à²à³à´àµà¶à·à¸à¹";
	strGB+="àºà»à¼à½à¾à¿àÀàÁàÂàÃàÄàÅàÆàÇàÈàÉàÊàËàÌàÍàÎàÏàÐàÑàÒàÓàÔàÕàÖà×àØàÙàÚàÛàÜàÝ";
	strGB+="àÞàßàààáàâàãàäàåàæàçàèàéàêàëàìàíàîàïàðàñàòàóàôàõàöà÷àøàùàúàûàüàýàþá¡á¢á£";
	strGB+="á¤á¥á¦á§á¨á©áªá«á¬á­á®á¯á°á±á²á³á´áµá¶á·á¸á¹áºá»á¼á½á¾á¿áÀáÁáÂáÃáÄáÅáÆáÇ";
	strGB+="áÈáÉáÊáËáÌáÍáÎáÏáÐáÑáÒáÓáÔáÕáÖá×áØáÙáÚáÛáÜáÝáÞáßáàáááâáãáäáåáæáçáèáéáêáë";
	strGB+="áìáíáîáïáðáñáòáóáôáõáöá÷áøáùáúáûáüáýáþâ¡â¢â£â¤â¥â¦â§â¨â©âªâ«â¬â­â®â¯â°â±";
	strGB+="â²â³â´âµâ¶â·â¸â¹âºâ»â¼â½â¾â¿âÀâÁâÂâÃâÄâÅâÆâÇâÈâÉâÊâËâÌâÍâÎâÏâÐâÑâÒâÓâÔâÕ";
	strGB+="âÖâ×âØâÙâÚâÛâÜâÝâÞâßâàâáâââãâäâåâæâçâèâéâêâëâìâíâîâïâðâñâòâóâôâõâöâ÷âøâù";
	strGB+="âúâûâüâýâþã¡ã¢ã£ã¤ã¥ã¦ã§ã¨ã©ãªã«ã¬ã­ã®ã¯ã°ã±ã²ã³ã´ãµã¶ã·ã¸ã¹ãºã»ã¼ã½ã¾ã¿";
	strGB+="ãÀãÁãÂãÃãÄãÅãÆãÇãÈãÉãÊãËãÌãÍãÎãÏãÐãÑãÒãÓãÔãÕãÖã×ãØãÙãÚãÛãÜãÝãÞãßãàãáãâãã";
	strGB+="ãäãåãæãçãèãéãêãëãìãíãîãïãðãñãòãóãôãõãöã÷ãøãùãúãûãüãýãþä¡ä¢ä£ä¤ä¥ä¦ä§ä¨ä©";
	strGB+="äªä«ä¬ä­ä®ä¯ä°ä±ä²ä³ä´äµä¶ä·ä¸ä¹äºä»ä¼ä½ä¾ä¿äÀäÁäÂäÃäÄäÅäÆäÇäÈäÉäÊäËäÌäÍ";
	strGB+="äÎäÏäÐäÑäÒäÓäÔäÕäÖä×äØäÙäÚäÛäÜäÝäÞäßäàäáäâäãäääåäæäçäèäéäêäëäìäíäîäïäðäñ";
	strGB+="äòäóäôäõäöä÷äøäùäúäûäüäýäþå¡å¢å£å¤å¥å¦å§å¨å©åªå«å¬å­å®å¯å°å±å²å³å´åµå¶å·";
	strGB+="å¸å¹åºå»å¼å½å¾å¿åÀåÁåÂåÃåÄåÅåÆåÇåÈåÉåÊåËåÌåÍåÎåÏåÐåÑåÒåÓåÔåÕåÖå×åØåÙåÚåÛ";
	strGB+="åÜåÝåÞåßåàåáåâåãåäåååæåçåèåéåêåëåìåíåîåïåðåñåòåóåôåõåöå÷åøåùåúåûåüåýåþæ¡";
	strGB+="æ¢æ£æ¤æ¥æ¦æ§æ¨æ©æªæ«æ¬æ­æ®æ¯æ°æ±æ²æ³æ´æµæ¶æ·æ¸æ¹æºæ»æ¼æ½æ¾æ¿æÀæÁæÂæÃæÄæÅ";
	strGB+="æÆæÇæÈæÉæÊæËæÌæÍæÎæÏæÐæÑæÒæÓæÔæÕæÖæ×æØæÙæÚæÛæÜæÝæÞæßæàæáæâæãæäæåæææçæèæé";
	strGB+="æêæëæìæíæîæïæðæñæòæóæôæõæöæ÷æøæùæúæûæüæýæþç¡ç¢ç£ç¤ç¥ç¦ç§ç¨ç©çªç«ç¬ç­ç®ç¯";
	strGB+="ç°ç±ç²ç³ç´çµç¶ç·ç¸ç¹çºç»ç¼ç½ç¾ç¿çÀçÁçÂçÃçÄçÅçÆçÇçÈçÉçÊçËçÌçÍçÎçÏçÐçÑçÒçÓ";
	strGB+="çÔçÕçÖç×çØçÙçÚçÛçÜçÝçÞçßçàçáçâçãçäçåçæçççèçéçêçëçìçíçîçïçðçñçòçóçôçõçöç÷";
	strGB+="çøçùçúçûçüçýçþè¡è¢è£è¤è¥è¦è§è¨è©èªè«è¬è­è®è¯è°è±è²è³è´èµè¶è·è¸è¹èºè»è¼è½";
	strGB+="è¾è¿èÀèÁèÂèÃèÄèÅèÆèÇèÈèÉèÊèËèÌèÍèÎèÏèÐèÑèÒèÓèÔèÕèÖè×èØèÙèÚèÛèÜèÝèÞèßèàèá";
	strGB+="èâèãèäèåèæèçèèèéèêèëèìèíèîèïèðèñèòèóèôèõèöè÷èøèùèúèûèüèýèþé¡é¢é£é¤é¥é¦é§";
	strGB+="é¨é©éªé«é¬é­é®é¯é°é±é²é³é´éµé¶é·é¸é¹éºé»é¼é½é¾é¿éÀéÁéÂéÃéÄéÅéÆéÇéÈéÉéÊéË";
	strGB+="éÌéÍéÎéÏéÐéÑéÒéÓéÔéÕéÖé×éØéÙéÚéÛéÜéÝéÞéßéàéáéâéãéäéåéæéçéèéééêéëéìéíéîéï";
	strGB+="éðéñéòéóéôéõéöé÷éøéùéúéûéüéýéþê¡ê¢ê£ê¤ê¥ê¦ê§ê¨ê©êªê«ê¬ê­ê®ê¯ê°ê±ê²ê³ê´êµ";
	strGB+="ê¶ê·ê¸ê¹êºê»ê¼ê½ê¾ê¿êÀêÁêÂêÃêÄêÅêÆêÇêÈêÉêÊêËêÌêÍêÎêÏêÐêÑêÒêÓêÔêÕêÖê×êØêÙ";
	strGB+="êÚêÛêÜêÝêÞêßêàêáêâêãêäêåêæêçêèêéêêêëêìêíêîêïêðêñêòêóêôêõêöê÷êøêùêúêûêüêý";
	strGB+="êþë¡ë¢ë£ë¤ë¥ë¦ë§ë¨ë©ëªë«ë¬ë­ë®ë¯ë°ë±ë²ë³ë´ëµë¶ë·ë¸ë¹ëºë»ë¼ë½ë¾ë¿ëÀëÁëÂëÃ";
	strGB+="ëÄëÅëÆëÇëÈëÉëÊëËëÌëÍëÎëÏëÐëÑëÒëÓëÔëÕëÖë×ëØëÙëÚëÛëÜëÝëÞëßëàëáëâëãëäëåëæëç";
	strGB+="ëèëéëêëëëìëíëîëïëðëñëòëóëôëõëöë÷ëøëùëúëûëüëýëþì¡ì¢ì£ì¤ì¥ì¦ì§ì¨ì©ìªì«ì¬ì­";
	strGB+="ì®ì¯ì°ì±ì²ì³ì´ìµì¶ì·ì¸ì¹ìºì»ì¼ì½ì¾ì¿ìÀìÁìÂìÃìÄìÅìÆìÇìÈìÉìÊìËìÌìÍìÎìÏìÐìÑ";
	strGB+="ìÒìÓìÔìÕìÖì×ìØìÙìÚìÛìÜìÝìÞìßìàìáìâìãìäìåìæìçìèìéìêìëìììíìîìïìðìñìòìóìôìõ";
	strGB+="ìöì÷ìøìùìúìûìüìýìþí¡í¢í£í¤í¥í¦í§í¨í©íªí«í¬í­í®í¯í°í±í²í³í´íµí¶í·í¸í¹íºí»";
	strGB+="í¼í½í¾í¿íÀíÁíÂíÃíÄíÅíÆíÇíÈíÉíÊíËíÌíÍíÎíÏíÐíÑíÒíÓíÔíÕíÖí×íØíÙíÚíÛíÜíÝíÞíß";
	strGB+="íàíáíâíãíäíåíæíçíèíéíêíëíìíííîíïíðíñíòíóíôíõíöí÷íøíùíúíûíüíýíþî¡î¢î£î¤î¥";
	strGB+="î¦î§î¨î©îªî«î¬î­î®î¯î°î±î²î³î´îµî¶î·î¸î¹îºî»î¼î½î¾î¿îÀîÁîÂîÃîÄîÅîÆîÇîÈîÉ";
	strGB+="îÊîËîÌîÍîÎîÏîÐîÑîÒîÓîÔîÕîÖî×îØîÙîÚîÛîÜîÝîÞîßîàîáîâîãîäîåîæîçîèîéîêîëîìîí";
	strGB+="îîîïîðîñîòîóîôîõîöî÷îøîùîúîûîüîýîþï¡ï¢ï£ï¤ï¥ï¦ï§ï¨ï©ïªï«ï¬ï­ï®ï¯ï°ï±ï²ï³";
	strGB+="ï´ïµï¶ï·ï¸ï¹ïºï»ï¼ï½ï¾ï¿ïÀïÁïÂïÃïÄïÅïÆïÇïÈïÉïÊïËïÌïÍïÎïÏïÐïÑïÒïÓïÔïÕïÖï×";
	strGB+="ïØïÙïÚïÛïÜïÝïÞïßïàïáïâïãïäïåïæïçïèïéïêïëïìïíïîïïïðïñïòïóïôïõïöï÷ïøïùïúïû";
	strGB+="ïüïýïþð¡ð¢ð£ð¤ð¥ð¦ð§ð¨ð©ðªð«ð¬ð­ð®ð¯ð°ð±ð²ð³ð´ðµð¶ð·ð¸ð¹ðºð»ð¼ð½ð¾ð¿ðÀðÁ";
	strGB+="ðÂðÃðÄðÅðÆðÇðÈðÉðÊðËðÌðÍðÎðÏðÐðÑðÒðÓðÔðÕðÖð×ðØðÙðÚðÛðÜðÝðÞðßðàðáðâðãðäðå";
	strGB+="ðæðçðèðéðêðëðìðíðîðïðððñðòðóðôðõðöð÷ðøðùðúðûðüðýðþñ¡ñ¢ñ£ñ¤ñ¥ñ¦ñ§ñ¨ñ©ñªñ«";
	strGB+="ñ¬ñ­ñ®ñ¯ñ°ñ±ñ²ñ³ñ´ñµñ¶ñ·ñ¸ñ¹ñºñ»ñ¼ñ½ñ¾ñ¿ñÀñÁñÂñÃñÄñÅñÆñÇñÈñÉñÊñËñÌñÍñÎñÏ";
	strGB+="ñÐñÑñÒñÓñÔñÕñÖñ×ñØñÙñÚñÛñÜñÝñÞñßñàñáñâñãñäñåñæñçñèñéñêñëñìñíñîñïñðñññòñó";
	strGB+="ñôñõñöñ÷ñøñùñúñûñüñýñþò¡ò¢ò£ò¤ò¥ò¦ò§ò¨ò©òªò«ò¬ò­ò®ò¯ò°ò±ò²ò³ò´òµò¶ò·ò¸ò¹";
	strGB+="òºò»ò¼ò½ò¾ò¿òÀòÁòÂòÃòÄòÅòÆòÇòÈòÉòÊòËòÌòÍòÎòÏòÐòÑòÒòÓòÔòÕòÖò×òØòÙòÚòÛòÜòÝ";
	strGB+="òÞòßòàòáòâòãòäòåòæòçòèòéòêòëòìòíòîòïòðòñòòòóòôòõòöò÷òøòùòúòûòüòýòþó¡ó¢ó£";
	strGB+="ó¤ó¥ó¦ó§ó¨ó©óªó«ó¬ó­ó®ó¯ó°ó±ó²ó³ó´óµó¶ó·ó¸ó¹óºó»ó¼ó½ó¾ó¿óÀóÁóÂóÃóÄóÅóÆóÇ";
	strGB+="óÈóÉóÊóËóÌóÍóÎóÏóÐóÑóÒóÓóÔóÕóÖó×óØóÙóÚóÛóÜóÝóÞóßóàóáóâóãóäóåóæóçóèóéóêóë";
	strGB+="óìóíóîóïóðóñóòóóóôóõóöó÷óøóùóúóûóüóýóþô¡ô¢ô£ô¤ô¥ô¦ô§ô¨ô©ôªô«ô¬ô­ô®ô¯ô°ô±";
	strGB+="ô²ô³ô´ôµô¶ô·ô¸ô¹ôºô»ô¼ô½ô¾ô¿ôÀôÁôÂôÃôÄôÅôÆôÇôÈôÉôÊôËôÌôÍôÎôÏôÐôÑôÒôÓôÔôÕ";
	strGB+="ôÖô×ôØôÙôÚôÛôÜôÝôÞôßôàôáôâôãôäôåôæôçôèôéôêôëôìôíôîôïôðôñôòôóôôôõôöô÷ôøôù";
	strGB+="ôúôûôüôýôþõ¡õ¢õ£õ¤õ¥õ¦õ§õ¨õ©õªõ«õ¬õ­õ®õ¯õ°õ±õ²õ³õ´õµõ¶õ·õ¸õ¹õºõ»õ¼õ½õ¾õ¿";
	strGB+="õÀõÁõÂõÃõÄõÅõÆõÇõÈõÉõÊõËõÌõÍõÎõÏõÐõÑõÒõÓõÔõÕõÖõ×õØõÙõÚõÛõÜõÝõÞõßõàõáõâõã";
	strGB+="õäõåõæõçõèõéõêõëõìõíõîõïõðõñõòõóõôõõõöõ÷õøõùõúõûõüõýõþö¡ö¢ö£ö¤ö¥ö¦ö§ö¨ö©";
	strGB+="öªö«ö¬ö­ö®ö¯ö°ö±ö²ö³ö´öµö¶ö·ö¸ö¹öºö»ö¼ö½ö¾ö¿öÀöÁöÂöÃöÄöÅöÆöÇöÈöÉöÊöËöÌöÍ";
	strGB+="öÎöÏöÐöÑöÒöÓöÔöÕöÖö×öØöÙöÚöÛöÜöÝöÞößöàöáöâöãöäöåöæöçöèöéöêöëöìöíöîöïöðöñ";
	strGB+="öòöóöôöõööö÷öøöùöúöûöüöýöþ÷¡÷¢÷£÷¤÷¥÷¦÷§÷¨÷©÷ª÷«÷¬÷­÷®÷¯÷°÷±÷²÷³÷´÷µ÷¶÷·";
	strGB+="÷¸÷¹÷º÷»÷¼÷½÷¾÷¿÷À÷Á÷Â÷Ã÷Ä÷Å÷Æ÷Ç÷È÷É÷Ê÷Ë÷Ì÷Í÷Î÷Ï÷Ð÷Ñ÷Ò÷Ó÷Ô÷Õ÷Ö÷×÷Ø÷Ù÷Ú÷Û";
	strGB+="÷Ü÷Ý÷Þ÷ß÷à÷á÷â÷ã÷ä÷å÷æ÷ç÷è÷é÷ê÷ë÷ì÷í÷î÷ï÷ð÷ñ÷ò÷ó÷ô÷õ÷ö÷÷÷ø÷ù÷ú÷û÷ü÷ý÷þ";
/**
 *@description ÅÅÐò¹æÔò
 *@param a ±È½Ï×Ö·û´®
 *@param b ±»±È½Ï×Ö·û´®
 *@param 0/1/-1 ±È½Ï½á¹û
 */
function listBox_sortComparable(a,b){
	var len = a.length > b.length ? b.length : a.length;
	for(var i=0;i<len;i++){
	    if(a.charCodeAt(i) >=0x4e00&& b.charCodeAt(i)>=0x4e00){
		    if(strGB.indexOf(a.charAt(i)) >  strGB.indexOf(b.charAt(i)) ){
			     return 1;
			}
			else if(strGB.indexOf(a.charAt(i)) < strGB.indexOf(b.charAt(i))){
			     return -1;
			}
		}	    
	    else if(a.charCodeAt(i)>=0x4e00 && b.charCodeAt(i)<0x4e00){
	    	return 1;
		}
		else if(a.charCodeAt(i)< 0x4e00 && b.charCodeAt(i)>=0x4e00){
		   return -1;
		}
		else{
	       if(a.charAt(i)>b.charAt(i)){
		         return 1;
		   }
		   if(a.charAt(i)<b.charAt(i)){
		         return -1;
		   }
		}
	}
	return  a.length - len>0?1:-1;
}
/**
 *@description ÏòÉÏÒÆ¶¯(public)
 *@param name listbox×é¼þµÄÃû³Æ
 *@param direction ×óÅÅÐòleft¡¢ÓÒÅÅÐòright
 *@param multi ¶àÑ¡Ê±ÊÇ·ñÖ§³ÖÒÆ¶¯,Ä¬ÈÏÎªtrue
 */
function listBox_up(name,direction,multi){

	var listbox = document.all("listBox_" + direction + "_" + name);
	if(null==listbox){
	    if(listBox_DEBUG)
	    	alert("Çë¼ì²élistbox×é¼þµÄ±êÊ¶ÊÇ·ñÕýÈ·,directionÎªleft»òright.");
	    return;
	}
	if(listbox.options.length < 2) 
		return ;
	var selectedIndex = listbox.selectedIndex;
	if(selectedIndex < 1) //°üÀ¨Î´Ñ¡ÖÐºÍÑ¡ÖÐµÚÒ»ÏîµÄÇé¿ö,²»½øÐÐÉÏÒÆ²Ù×÷.
		return;
	if(multi==null) 
		multi = true;
		
	if(multi){
	    var result = "";
	    for(var i=0;i<selectedIndex-1;i++){
	    	result+= listbox.options(i).outerHTML+"\n";
	    }
	    var bottom = listbox.options(selectedIndex-1).outerHTML+"\n";
	    for(var i=selectedIndex;i<listbox.options.length;i++){
	    	if(listbox.options(i).selected)
	    	    result+= listbox.options(i).outerHTML+"\n";
	    	else
	            bottom+= listbox.options(i).outerHTML+"\n";
	    }
	    result+=bottom;
	    listBox_changeSingleContent(listbox,result);
	}
	else{
	    for(var i=selectedIndex+1;i<listbox.options.length;i++){
	    	if(listbox.options(i).selected){
	    	     if(listBox_DEBUG){
	    	     	alert("²»ÄÜ½øÐÐÍùÉÏ¶àÏîÒÆ¶¯.");
	    	     }
	    	     return ;
	    	}
	    }
	    /*
	    var result = "";
	    for(var i=0;i<selectedIndex-1;i++){
	    	result+= listbox.options(i).outerHTML+"\n";
	    }
	    result+= listbox.options(selectedIndex).outerHTML+"\n";
	    result+= listbox.options(selectedIndex-1).outerHTML+"\n";
	    for(var i=selectedIndex+1;i<listbox.options.length;i++){
	    	result+= listbox.options(i).outerHTML+"\n";
	    }
	    listBox_changeSingleContent(listbox,result);
	    */
	    listBox_exchangeDBCellContent(listbox.options(selectedIndex-1),listbox.options(selectedIndex));
	}
	var listboxname = "listBox_" + direction + "_" + name;
	setTimeout("listBox_setViewOpions('"+listboxname +"')",100);
}
function listBox_setViewOpions(name){
	var obj = document.all(name);
	for(var i=obj.options.length-1;i>=0;i--){
		if(obj.options(i).selected){
			obj.options(i).selected = true;
			break;
		}
	}
}
/**
 *@description ÏòÉÏÒÆ¶¯(public)
 *@param name listbox×é¼þµÄÃû³Æ
 *@param direction ×óÅÅÐòleft¡¢ÓÒÅÅÐòright
 *@param multi ¶àÑ¡Ê±ÊÇ·ñÖ§³ÖÒÆ¶¯,Ä¬ÈÏÎªtrue
 */
function listBox_down(name,direction,multi){
	var listbox = document.all("listBox_" + direction + "_" + name);
	if(null==listbox){
	    if(listBox_DEBUG)
	    	alert("Çë¼ì²élistbox×é¼þµÄ±êÊ¶ÊÇ·ñÕýÈ·,directionÎªleft»òright.");
	    return;
	}
	if(listbox.options.length < 2) 
		return ;
	var selectedIndex = -1;
	for(var i=listbox.options.length-1;i>=0;i--){
	   if(listbox.options(i).selected){
		selectedIndex = i;
		break;
	   }
	}
	
	if(selectedIndex < 0 || selectedIndex==listbox.options.length-1) //°üÀ¨Î´Ñ¡ÖÐºÍÑ¡ÖÐµÚ×îºóÒ»ÏîµÄÇé¿ö,²»½øÐÐÒÆ¶¯²Ù×÷.
		return;
	if(multi==null) 
		multi = true;
		
	if(multi){
	    var result = "";
	    var temp = "";
	    for(var i=0;i<=selectedIndex;i++){
	    	if(!listbox.options(i).selected)
	    	    result+= listbox.options(i).outerHTML+"\n";
	    	else
	            temp+= listbox.options(i).outerHTML+"\n";
	    }
	    result+= listbox.options(selectedIndex+1).outerHTML+"\n" +temp;
	    
	    for(var i=selectedIndex+2;i<listbox.options.length;i++){
	    	result+= listbox.options(i).outerHTML+"\n";
	    }
	    listBox_changeSingleContent(listbox,result);
	}
	else{
	    for(var i=selectedIndex-1;i>=0;i--){
	    	if(listbox.options(i).selected){
	    	     if(listBox_DEBUG){
	    	     	alert("²»ÄÜ½øÐÐÍùÏÂ¶àÏîÒÆ¶¯.");
	    	     }
	    	     return ;
	    	}
	    }	    
	    listBox_exchangeDBCellContent(listbox.options(selectedIndex+1),listbox.options(selectedIndex));
	}
}
/**
 *@description ÅÅÐòÊÂ¼þ(public)
 *@param name listbox×é¼þµÄÃû³Æ
 *@param direction ×óÅÅÐòleft¡¢ÓÒÅÅÐòright
 *@param sort ÅÅÐòasc»òÕßdesc Ä¬ÈÏasc
 */
function listBox_sort(name,direction,sort){
     var listbox = document.all("listBox_" + direction + "_" + name);
     if(null==listbox){
	  if(listBox_DEBUG)
	     alert("Çë¼ì²élistbox×é¼þµÄ±êÊ¶ÊÇ·ñÕýÈ·,directionÎªleft»òright.");
	  return;
     }
     if(listbox.options.length < 2) 
	  return ;
     if(sort){
     	listbox.setAttribute("listBoxSort",sort)
     }
     else{
        if(listbox.getAttribute("listBoxSort")==null){
     	    if(!sort)
     	       sort = "asc";
     	    listbox.setAttribute("listBoxSort",sort);
     	}   
     }
     var sort = listbox.getAttribute("listBoxSort");
     var textArray = [],contents = [];
    
     for(var i=0;i<listbox.options.length;i++){
     	textArray[textArray.length] = listbox.options[i].text;
     	contents[contents.length] = listbox.options(i);
     }	
     textArray = textArray.sort(listBox_sortComparable);
     var result = "";
     if("asc"==sort){
     	textArray.reverse();
     	while(textArray.length>0){
     	   var text = textArray.pop();
	   for(var i=0;i<contents.length;i++){
	       if(contents[i].text==text){
	            result+=contents[i].outerHTML+"\n";
	            contents.splice(i,1);
	            break;
	       }
	   }
	}
	listbox.setAttribute("listBoxSort","desc");
  }
  else{
      while(textArray.length>0){
         var text = textArray.pop();
	     for(var i=0;i<contents.length;i++){
	       if(contents[i].text==text){
	            result+=contents[i].outerHTML+"\n";
	            contents.splice(i,1);
	            break;
	       }
	     }
	  }
	  listbox.setAttribute("listBoxSort","asc");
    }
    listBox_changeSingleContent(listbox,result);
}
/**
 *@description È¡µÃ×ó±ß»òÓÒ±ßÏÂÀ­¿òµÄÖµÊý×é
 *@param name listbox×é¼þµÄÃû³Æ
 *@direction left/rightÄ¬ÈÏÎªright
 *@return array¶ÔÏó
 */
function listBox_getArrayValue(name,direction){
	var obj = null;
	if(direction==null||direction=="right"){
		obj = document.all(rightBox_prefixname+name).options;
	}
	else {
		obj = document.all(leftBox_prefixname+name).options;
	}
	var result = []
	for(var i=0;i<obj.length;i++){
		result[result.length] = obj(i).value;
	}
	return result;
}