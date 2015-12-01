var leftBox_prefixname = "listBox_left_";
var rightBox_prefixname = "listBox_right_";
var listBox_DEBUG = true;
/**
 *@description listbox���ƶ�����(private)
 *@param name listbox���������
 *@param method ����(add)/����(left)
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
 *@description listbox��˫���ƶ�(private)
 *@param obj select���
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
 *@description listbox��˫���ƶ�(private)
 *@param obj select���
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
 *@description listbox�Ķ�̬�ƶ�����(private)
 *@param name listbox���������
 *@param method ����(add)/����(left)
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
 *@description �����ƶ�ʱ��̬�Ĵ��ݲ���(private)
 *@param o1 ��/�����������
 *@param o2 ��/�����������
 *@param flag ��(listBoxLeftZone)/��(listBoxRightZone)
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
 *@description ����Ӻ�̨���صĽ��(private)
 *@param result �Ӻ󷵻ص�js��������ַ���
 *@param name listbox���������
 */
function listBox_dynamicExecute(result,name){
   var leftObj = document.all(leftBox_prefixname+name);
   var rightObj = document.all(rightBox_prefixname+name);
   var arr = eval(result);
   listBox_changeContent(name,leftObj,rightObj,arr);
   
}
/**
 *@description �ı�������������������ݲ���(private)
 *@param name listbox���������
 *@param o1 ��/�����������
 *@param o2 ��/�����������
 *@param arr ��������������html����
 */
function listBox_changeContent(name,o1,o2,arr){
    var preO1html =  o1.outerHTML.substring(0,o1.outerHTML.indexOf(">")+1);
    var preO2html =  o2.outerHTML.substring(0,o2.outerHTML.indexOf(">")+1);
    o1.outerHTML = preO1html +listBox_cancelSelectItem(name,arr[0]) +"</select>";
    o2.outerHTML = preO2html +listBox_cancelSelectItem(name,arr[1]) +"</select>";
}
/**
 *@description �Ƴ�����̬�ƶ�ʱselected��״̬
 *@param name listbox���������
 *@param str select�����html����
 *@return ���˺��html
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
 *@description listbox�ľ�̬�ƶ�����(private)
 *@param name listbox���������
 *@param o1 ��/�����������
 *@param o2 ��/�����������
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
 *@description �洢�����������������ݵ�������Ĳ������Ҹı䰴ť��״̬�������(private)
 *@param name listbox���������
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
 *@description �����ƶ�ʱ�û��Զ���Ĳ�������(public)
 *@param name listbox���������
 *@return ���ݲ���
 */
function listBox_customParam(name){
   return "";
}
/**
 *@description onchage�¼�(private)
 *@param obj �������������
 *@param name ��λ���������������
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
 *@description ��λ�������onkeyup�¼�(private)
 *@param obj ��λ���������
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
 *@description ȫ�ƶ��¼�(private)
 *@param name ��λ���������������
 *@param method ����(add)/����(left)
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
 *@description �滻�������(private)
 *@param listbox �������
 *@param content ����
 */
function listBox_changeSingleContent(listbox,content){
    var prehtml =  listbox.outerHTML.substring(0,listbox.outerHTML.indexOf(">")+1);
    listbox.outerHTML = prehtml + content + "</select>";
}
/**
 *@description �滻����option��Ԫ������(private)
 *@param cell ǰһ�����ߺ�һ������
 *@param selectedCell ѡ�ж���
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
	strGB+="�������������������������������������������������������������������°ð�";
	strGB+="�ŰưǰȰɰʰ˰̰ͰΰϰаѰҰӰ԰հְװذٰڰ۰ܰݰް߰���������";
	strGB+="�������������������������������������������������������������";
	strGB+="���������������������������������������±ñıűƱǱȱɱʱ˱̱ͱαϱбѱ�";
	strGB+="�ӱԱձֱױرٱڱ۱ܱݱޱ߱�������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�����������²òĲŲƲǲȲɲʲ˲̲ͲβϲвѲҲӲԲղֲײزٲڲ۲ܲݲ޲߲�";
	strGB+="�����������������������������������������������������";
	strGB+="�������������������������������������������������������³óĳųƳǳȳɳ�";
	strGB+="�˳̳ͳγϳгѳҳӳԳճֳ׳سٳڳ۳ܳݳ޳߳���������������";
	strGB+="�������������������������������������������������������������������";
	strGB+="���������������������������´ôĴŴƴǴȴɴʴ˴̴ʹδϴдѴҴӴԴմִ״�";
	strGB+="�ٴڴ۴ܴݴ޴ߴ�������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�õĵŵƵǵȵɵʵ˵̵͵εϵеѵҵӵԵյֵ׵صٵڵ۵ܵݵ޵ߵ�������";
	strGB+="�����������������������������������������������������������";
	strGB+="�������������������������������������������¶öĶŶƶǶȶɶʶ˶̶Ͷζ϶�";
	strGB+="�ѶҶӶԶնֶ׶ضٶڶ۶ܶݶ޶߶���������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="���������������·÷ķŷƷǷȷɷʷ˷̷ͷηϷзѷҷӷԷշַ׷طٷڷ۷ܷݷ�";
	strGB+="�߷�������������������������������������������������";
	strGB+="�����������������������������������������������������������¸øĸŸƸǸ�";
	strGB+="�ɸʸ˸̸͸θϸиѸҸӸԸոָ׸ظٸڸ۸ܸݸ޸߸�������������";
	strGB+="�����������������������������������������������������������������";
	strGB+="�������������������������������¹ùĹŹƹǹȹɹʹ˹̹͹ιϹйѹҹӹԹչ�";
	strGB+="�׹عٹڹ۹ܹݹ޹߹���������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="���ºúĺźƺǺȺɺʺ˺̺ͺκϺкѺҺӺԺպֺ׺غٺںۺܺݺ޺ߺ�����";
	strGB+="���������������������������������������������������������";
	strGB+="�����������������������������������������������»ûĻŻƻǻȻɻʻ˻̻ͻ�";
	strGB+="�ϻлѻһӻԻջֻ׻ػٻڻۻܻݻ޻߻�������������������";
	strGB+="�����������������������������������������������������������������������";
	strGB+="�������������������¼üļżƼǼȼɼʼ˼̼ͼμϼмѼҼӼԼռּ׼ؼټڼۼ�";
	strGB+="�ݼ޼߼���������������������������������������������";
	strGB+="���������������������������������������������������������������½ýĽŽ�";
	strGB+="�ǽȽɽʽ˽̽ͽνϽнѽҽӽԽսֽ׽ؽٽڽ۽ܽݽ޽߽�����������";
	strGB+="���������������������������������������������������������������";
	strGB+="�����������������������������������¾þľžƾǾȾɾʾ˾̾;ξϾоѾҾӾ�";
	strGB+="�վ־׾ؾپھ۾ܾݾ޾߾�����������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�������¿ÿĿſƿǿȿɿʿ˿̿ͿοϿпѿҿӿԿտֿ׿ؿٿڿۿܿݿ޿߿���";
	strGB+="�������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿����������";
	strGB+="������������������������������������������������������������������������";
	strGB+="��������������������������������������������áâãäåæçèéêëìíî";
	strGB+="ïðñòóôõö÷øùúûüýþÿ��������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="����������������ġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļ";
	strGB+="ĽľĿ������������������������������������������������������������������";
	strGB+="������������������������������������������������������������šŢţŤťŦ";
	strGB+="ŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſ����������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="��������������������������������ơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴ";
	strGB+="ƵƶƷƸƹƺƻƼƽƾƿ��������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="����ǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿ������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������ȡȢȣȤȥȦȧȨȩȪȫȬ";
	strGB+="ȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿ����������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="��������������������ɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺ";
	strGB+="ɻɼɽɾɿ��������������������������������������������������������������";
	strGB+="����������������������������������������������������������������ʡʢʣʤ";
	strGB+="ʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿ������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������ˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲";
	strGB+="˳˴˵˶˷˸˹˺˻˼˽˾˿����������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="��������̴̵̶̷̸̡̢̧̨̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼̽̾̿��";
	strGB+="������������������������������������������������������������������������";
	strGB+="����������������������������������������������������ͣͤͥͦͧͨͩͪ͢͡";
	strGB+="ͫͬͭͮͯͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������Ρ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθ";
	strGB+="ικλμνξο����������������������������������������������������������";
	strGB+="��������������������������������������������������������������������ϡϢ";
	strGB+="ϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿ��������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="����������������������������������������СТУФХЦЧШЩЪЫЬЭЮЯа";
	strGB+="бвгдежзийклмноп������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������ѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾ";
	strGB+="ѿ����������������������������������������������������������������������";
	strGB+="��������������������������������������������������������ҡҢңҤҥҦҧҨ";
	strGB+="ҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾҿ��������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="����������������������������ӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶ";
	strGB+="ӷӸӹӺӻӼӽӾӿ������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="ԡԢԣԤԥԦԧԨԩԪԫԬԭԮԯ԰ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿ����������";
	strGB+="������������������������������������������������������������������������";
	strGB+="��������������������������������������������աբգդեզէըթժիլխծ";
	strGB+="կհձղճմյնշոչպջռսվտ��������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="����������������ְֱֲֳִֵֶַָֹֺֻּ֢֣֤֥֦֧֪֭֮֡֨֩֫֬֯";
	strGB+="ֽ־ֿ������������������������������������������������������������������";
	strGB+="������������������������������������������������������������סעףפץצ";
	strGB+="קרשת׫׬׭׮ׯװױײ׳״׵׶׷׸׹׺׻׼׽׾׿����������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="��������������������������������ءآأؤإئابةتثجحخدذرزسشص";
	strGB+="ضطظعغػؼؽؾؿ����������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="��١٢٣٤٥٦٧٨٩٪٫٬٭ٮٯٰٱٲٳٴٵٶٷٸٹٺٻټٽپٿ��������";
	strGB+="������������������������������������������������������������������������";
	strGB+="����������������������������������������������ڡڢڣڤڥڦڧڨکڪګڬڭ";
	strGB+="ڮگڰڱڲڳڴڵڶڷڸڹںڻڼڽھڿ������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������ۣۡۢۤۥۦۧۨ۩۪ۭ۫۬ۮۯ۰۱۲۳۴۵۶۷۸۹ۺۻ";
	strGB+="ۼ۽۾ۿ����������������������������������������������������������������";
	strGB+="��������������������������������������������������������������ܡܢܣܤܥ";
	strGB+="ܦܧܨܩܪܫܬܭܮܯܱܴܷܸܹܻܼܾܰܲܳܵܶܺܽܿ��������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="����������������������������������ݡݢݣݤݥݦݧݨݩݪݫݬݭݮݯݰݱݲݳ";
	strGB+="ݴݵݶݷݸݹݺݻݼݽݾݿ������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������ޡޢޣޤޥަާިީުޫެޭޮޯްޱ޲޳޴޵޶޷޸޹޺޻޼޽޾޿����";
	strGB+="������������������������������������������������������������������������";
	strGB+="��������������������������������������������������ߡߢߣߤߥߦߧߨߩߪ߫";
	strGB+="߲߬߭߮߯߰߱߳ߴߵ߶߷߸߹ߺ߻߼߽߾߿��������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�����������������������������������������������";
	strGB+="������������������������������������������������������������������";
	strGB+="���������������������������������������������������������������������";
	strGB+="��������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�������������������������������������������������������";
	strGB+="����������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�����������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="���������������������������������������������������������������";
	strGB+="��������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�������������������������������������������������";
	strGB+="����������������������������������������������������������������";
	strGB+="�����������������������������������������������������������������������";
	strGB+="������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="���������������������������������������������������������";
	strGB+="��������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�������������������������������������������";
	strGB+="����������������������������������������������������������������������";
	strGB+="�����������������������������������������������������������������";
	strGB+="������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="���������������������������������������������������";
	strGB+="��������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�����������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�����������������������������������������������������������";
	strGB+="������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="���������������������������������������������";
	strGB+="��������������������������������������������������������������������";
	strGB+="�������������������������������������������������������������������";
	strGB+="����������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�����������������������������������������������������";
	strGB+="������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�����������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�������������������������������������������������������������";
	strGB+="����������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�����������������������������������������������";
	strGB+="������������������������������������������������������������������";
	strGB+="���������������������������������������������������������������������";
	strGB+="��������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="����������������������������������������������������������������������";
/**
 *@description �������
 *@param a �Ƚ��ַ���
 *@param b ���Ƚ��ַ���
 *@param 0/1/-1 �ȽϽ��
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
 *@description �����ƶ�(public)
 *@param name listbox���������
 *@param direction ������left��������right
 *@param multi ��ѡʱ�Ƿ�֧���ƶ�,Ĭ��Ϊtrue
 */
function listBox_up(name,direction,multi){

	var listbox = document.all("listBox_" + direction + "_" + name);
	if(null==listbox){
	    if(listBox_DEBUG)
	    	alert("����listbox����ı�ʶ�Ƿ���ȷ,directionΪleft��right.");
	    return;
	}
	if(listbox.options.length < 2) 
		return ;
	var selectedIndex = listbox.selectedIndex;
	if(selectedIndex < 1) //����δѡ�к�ѡ�е�һ������,���������Ʋ���.
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
	    	     	alert("���ܽ������϶����ƶ�.");
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
 *@description �����ƶ�(public)
 *@param name listbox���������
 *@param direction ������left��������right
 *@param multi ��ѡʱ�Ƿ�֧���ƶ�,Ĭ��Ϊtrue
 */
function listBox_down(name,direction,multi){
	var listbox = document.all("listBox_" + direction + "_" + name);
	if(null==listbox){
	    if(listBox_DEBUG)
	    	alert("����listbox����ı�ʶ�Ƿ���ȷ,directionΪleft��right.");
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
	
	if(selectedIndex < 0 || selectedIndex==listbox.options.length-1) //����δѡ�к�ѡ�е����һ������,�������ƶ�����.
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
	    	     	alert("���ܽ������¶����ƶ�.");
	    	     }
	    	     return ;
	    	}
	    }	    
	    listBox_exchangeDBCellContent(listbox.options(selectedIndex+1),listbox.options(selectedIndex));
	}
}
/**
 *@description �����¼�(public)
 *@param name listbox���������
 *@param direction ������left��������right
 *@param sort ����asc����desc Ĭ��asc
 */
function listBox_sort(name,direction,sort){
     var listbox = document.all("listBox_" + direction + "_" + name);
     if(null==listbox){
	  if(listBox_DEBUG)
	     alert("����listbox����ı�ʶ�Ƿ���ȷ,directionΪleft��right.");
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
 *@description ȡ����߻��ұ��������ֵ����
 *@param name listbox���������
 *@direction left/rightĬ��Ϊright
 *@return array����
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