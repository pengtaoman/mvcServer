/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ 
+ �ű������� QuickSelectObj 
+            ֧��������pageҳ
+ ��    ���� ���⻪ hugh@neusoft.com
+ �޸������� 2003.07.21
+ �޸�  �ˣ� �׳��� micy@neusoft.com
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function QuickSelectObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = QSO_getParentObj;
	this.getBaseObj = QSO_getBaseObj;
	
	this.onvalidate = QSO_onvalidate;

	
	
	this.onReady = QSO_doInit;
	this.dealKeypress = QSO_dealKeypress;
	this.dealInputOnblur = QSO_dealInputOnblur;
	this.dealInputBackSpace = QSO_dealInputBackSpace;
 	this.eventBand = QSO_eventBand;
	
	
	//˽�з���
	this.dealInputKeyup = _dealInputKeyup;
	
	this.dealSelectKeypress = _dealSelectKeypress;
	this.selectConformest = _selectConformest;
	this.drawACell = _drawACell;
	this.getSpell = _getSpell;
	this.dealOnFocus = _dealOnFocus;
	
	
	//˽�ж���
    	var ParObj=null;
    	var BasObj=null;
	}


	function QSO_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new SelectObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function QSO_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}
   	
function QSO_onvalidate() {
    
     //����Base.htc�еĹ��ú���������ݺϷ���
     if(!this.getBaseObj().commonCheck())	return false;    
     return true;

}   
    
function QSO_doInit(){	    	
	//2003-11-29
	//alert(this.edtObj.tagName);
	
	if(this.edtObj.tagName.toUpperCase() == "SELECT"){
		
		//����һ��ҳ����QuickSelect�����
		var counter = 0;
		for(var i=0; i < window.document.all.length; i++)
			if(window.document.all(i).isQuickSelect)
				counter = i;			    
	    //counter ++;
	    var divId = "QuickSelect_"+counter;	
	    var inputID = "QuickSelectInput_"+counter;		    	    
	    var id = this.edtObj.id;
	    if(id == null) id = this.edtObj.name;
	    var eventHandler = "onblur='var obj = new QuickSelectObj(this); obj.dealInputOnblur();'";
	    	eventHandler += "onkeydown='var obj = new QuickSelectObj(this); obj.dealInputBackSpace();'";
		//eventHandler += "onkeypress='var obj = new QuickSelectObj(this); obj.dealKeypress();'";	    
	   	eventHandler += "onkeyup='var obj = new QuickSelectObj(this); obj.dealKeypress();'";	    
		var sHTML = "<DIV id='"+divId+"' style='position: absolute;top:0px;display:none;width:110px;height:22px;background:#ADC9EB;border:solid 2 #47578A;'><center><input id="+inputID+" type='text' "+eventHandler+" style='width:100px;height:20px;top:3px;font-weight: bold;ime-mode:disabled;' selectID="+id+" div2Id="+divId+"_2 isClear=false ></center></DIV>";					
		sHTML += "<DIV id='"+divId+"_2' style='position:absolute;top:22px;display:none;width:400px;height:22px;background:#ADC9EB;border:solid 2 #47578A;'></DIV>";
		this.edtObj.insertAdjacentHTML('AfterEnd', sHTML);
		this.edtObj.isQuickSelect=true;	
		this.edtObj.divID = divId;
		this.edtObj.inputID = inputID;
		//�����ķ����ƴ��
		var text,spell,counter,spellBeginStr;
		for(var k=0;k<this.edtObj.options.length;k++){
		    text = this.edtObj.options[k].text;
		    if(text == null || text == "" || text == "undefined") continue;		    
		    spell = "";
			for(var i=0; i < text.length; i++){
				spell += this.getSpell(text.substring(i,i+1)).substring(0,1);				
			}					
			this.edtObj.options[k].spellBeginStr = spell;
			
		}
		//���ø���ĳ�ʼ������   	 
    	this.getParentObj().onReady();
	}	   
}
function QSO_dealKeypress(){	
	 var upperTagName = upperCase(this.edtObj.tagName);
	 if(upperTagName == "SELECT")
	 	this.dealSelectKeypress();
	 else if (upperTagName == "INPUT")
	 	this.dealInputKeyup();
}
function QSO_dealInputBackSpace(){
	
	if(this.edtObj.tagName.toUpperCase() != "INPUT") return;
	/*
	if(window.event.keyCode == 27){
		//window.document.all(this.edtObj.div2Id).style.display = "none";
		var inputObj = window.document.all(this.edtObj.inputID);		 		 		 	
	 	inputObj.focus();
		return;
		}
	*/
	if(window.event.keyCode == 8){	 		
		var value = this.edtObj.value;
		if(value == null) value = "";
		value = value.substring(0,value.length - 1);
		window.document.all(this.edtObj.div2Id).style.display = "none";
		this.selectConformest(window.document.all(this.edtObj.selectID),value);
	}
}
function _dealSelectKeypress(){
	//�ո�	 
	 if(window.event.keyCode == 32){	 	 
	 	window.document.all(this.edtObj.divID).style.display = "";	 
	 	var inputObj = window.document.all(this.edtObj.inputID);		 		 		 	
	 	inputObj.focus();
	 	
	 }
}

//�û�����ϣ���ڿؼ��õ�����ʱִ���밴�ո��ͬ���Ĳ���
function _dealOnFocus(){
		if(this.edtObj.flagForOnFocus == null || this.edtObj.flagForOnFocus){
		 	window.document.all(this.edtObj.divID).style.display = "";	 
		 	var inputObj = window.document.all(this.edtObj.inputID);		 		 		 	
		 	inputObj.focus();
		 	this.edtObj.flagForOnFocus = false;
		 	return;
		}
	 	this.edtObj.flagForOnFocus = true;
}

function _dealInputKeyup(){
	//var code = window.event.keyCode;
	
	//var presskey = String.fromCharCode(window.event.keyCode);
	//this.selectConformest(window.document.all(this.edtObj.selectID),""+this.edtObj.value+presskey);	
	this.selectConformest(window.document.all(this.edtObj.selectID),""+this.edtObj.value);	
}
function QSO_dealInputOnblur(){
	if(upperCase(this.edtObj.tagName) != "INPUT")	return;
	this.edtObj.value = "";
	this.edtObj.parentElement.parentElement.style.display = "none";
	//ѡ���һ��
	var div2 = window.document.all(this.edtObj.div2Id);
	try{
		window.document.all(this.edtObj.selectID).value = div2.children(0).rows(0).cells(0).value;
	}catch(e){}
	window.document.all(this.edtObj.div2Id).style.display = "none";
	window.document.all(this.edtObj.selectID).focus();
}
function _selectConformest(selectObj,beginStr){			 		 		 
	 if(selectObj == null) return;
	 if(beginStr == null || beginStr == "") return;
	 var div2 = window.document.all(this.edtObj.div2Id);
	 beginStr = upperCase(beginStr);
	 var spellBegStr,upperStr;
	 var counter = 0;
	 var leftLetters;	 	 
	 var n = parseInt(beginStr.substring(beginStr.length-1),10);
	 n = isNaN(n) ? 0 : n;	 		  	 
	 if(div2.style.display == "" && n > 0 && n <= div2.children(0).rows(0).cells.length){	 		
	 		div2.children(0).rows(0).cells(0).value = div2.children(0).rows(0).cells(n - 1).value;
	 		this.dealInputOnblur();
	 		return;
	 }
	var sHTML = "<TABLE cellpadding=0 cellspacing=0 width=100% height=100%><TR>"; 			 	
 	var opt;
 	for(var k=0;k<selectObj.options.length;k++){
 		opt = selectObj.options[k];
	 	spellBegStr = opt.spellBeginStr;		 		
	 	if(spellBegStr == null || spellBegStr =="undefined" || spellBegStr == "")	continue;	 
	 	upperStr = upperCase(spellBegStr); 			 	
	 	if(upperStr.substring(0,beginStr.length) == beginStr){
	 		
	 		leftLetters = spellBegStr.substring(upperStr.indexOf(beginStr)+beginStr.length);		 		
	 		if( ++counter <= 5)
	 			sHTML += this.drawACell(spellBegStr,opt.value,counter,opt.text,leftLetters);
	 	}
	}
 	sHTML += "</TR></TABLE>";
 	div2.innerHTML = sHTML;
	div2.style.display = "";
	if(counter == 1) this.dealInputOnblur();
}
function _drawACell(spellBegStr,value,counter,text,leftLetters){
	var style1 = "color:blue;";
	var style2 = "color:black;";
	var style3 = "color:red;";			 		
	var sHTML = "<TD value="+value+" spellBegStr="+spellBegStr+" text="+text+" style='font-size:9pt;font-family: '����';'><font style="+style1+">"+counter+"</font> <font style="+style2+"></font>"+text+"</font><font style="+style3+">"+leftLetters+"</font> </TD>";	
	return sHTML;
}
var strGB= "";
	strGB+="�������������������������������������������������������������������°ð�";
	strGB+="�ŰưǰȰɰʰ˰̰ͰΰϰаѰҰӰ԰հְװذٰڰ۰ܰݰް߰���������";
	strGB+="��������������������������������������������������������������";
	strGB+="���������������������������������������±ñıűƱǱȱɱʱ˱̱ͱαϱбѱ�";
	strGB+="�ӱԱձֱױرٱڱ۱ܱݱޱ߱��������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�����������²òĲŲƲǲȲɲʲ˲̲ͲβϲвѲҲӲԲղֲײزٲڲ۲ܲݲ޲߲�";
	strGB+="������������������������������������������������������";
	strGB+="�������������������������������������������������������³óĳųƳǳȳɳ�";
	strGB+="�˳̳ͳγϳгѳҳӳԳճֳ׳سٳڳ۳ܳݳ޳߳����������������";
	strGB+="�������������������������������������������������������������������";
	strGB+="���������������������������´ôĴŴƴǴȴɴʴ˴̴ʹδϴдѴҴӴԴմִ״�";
	strGB+="�ٴڴ۴ܴݴ޴ߴ��������������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�õĵŵƵǵȵɵʵ˵̵͵εϵеѵҵӵԵյֵ׵صٵڵ۵ܵݵ޵ߵ�������";
	strGB+="������������������������������������������������������������";
	strGB+="�������������������������������������������¶öĶŶƶǶȶɶʶ˶̶Ͷζ϶�";
	strGB+="�ѶҶӶԶնֶ׶ضٶڶ۶ܶݶ޶߶����������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="���������������·÷ķŷƷǷȷɷʷ˷̷ͷηϷзѷҷӷԷշַ׷طٷڷ۷ܷݷ�";
	strGB+="�߷��������������������������������������������������";
	strGB+="�����������������������������������������������������������¸øĸŸƸǸ�";
	strGB+="�ɸʸ˸̸͸θϸиѸҸӸԸոָ׸ظٸڸ۸ܸݸ޸߸�������������";
	strGB+="������������������������������������������������������������������";
	strGB+="�������������������������������¹ùĹŹƹǹȹɹʹ˹̹͹ιϹйѹҹӹԹչ�";
	strGB+="�׹عٹڹ۹ܹݹ޹߹����������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="���ºúĺźƺǺȺɺʺ˺̺ͺκϺкѺҺӺԺպֺ׺غٺںۺܺݺ޺ߺ�����";
	strGB+="����������������������������������������������������������";
	strGB+="�����������������������������������������������»ûĻŻƻǻȻɻʻ˻̻ͻ�";
	strGB+="�ϻлѻһӻԻջֻ׻ػٻڻۻܻݻ޻߻��������������������";
	strGB+="�����������������������������������������������������������������������";
	strGB+="�������������������¼üļżƼǼȼɼʼ˼̼ͼμϼмѼҼӼԼռּ׼ؼټڼۼ�";
	strGB+="�ݼ޼߼����������������������������������������������";
	strGB+="���������������������������������������������������������������½ýĽŽ�";
	strGB+="�ǽȽɽʽ˽̽ͽνϽнѽҽӽԽսֽ׽ؽٽڽ۽ܽݽ޽߽�����������";
	strGB+="����������������������������������������������������������������";
	strGB+="�����������������������������������¾þľžƾǾȾɾʾ˾̾;ξϾоѾҾӾ�";
	strGB+="�վ־׾ؾپھ۾ܾݾ޾߾������������������������������";
	strGB+="������������������������������������������������������������������������";
	strGB+="�������¿ÿĿſƿǿȿɿʿ˿̿ͿοϿпѿҿӿԿտֿ׿ؿٿڿۿܿݿ޿߿���";
	strGB+="��������������������������������������������������������";
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
	strGB+="������������������������������������������������������������������������";
	strGB+="������������������������������������������������������������������������";
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

var qswhSpell=["a",0,"ai",2,"an",15,"ang",24,"ao",27,"ba",36,"bai",54,"ban",62,"bang",77,"bao",89,"bei",106,"ben",121,"beng",125,"bi",131,"bian",155,"biao",167,"bie",171,"bin",175,"bing",181,"bo",190,"bu",211,"ca",220,"cai",221,"can",232,"cang",239,"cao",244,"ce",249,"ceng",254,"cha",256,"chai",267,"chan",270,"chang",280,"chao",293,"che",302,"chen",308,"cheng",318,"chi",333,"chong",349,"chou",354,"chu",366,"chuai",382,"chuan",383,"chuang",390,"chui",396,"chun",401,"chuo",408,"ci",410,"cong",422,"cou",428,"cu",429,"cuan",433,"cui",436,"cun",444,"cuo",447,"da",453,"dai",459,"dan",471,"dang",486,"dao",491,"de",503,"deng",506,"di",513,"dian",532,"diao",548,"die",557,"ding",564,"diu",573,"dong",574,"dou",584,"du",591,"duan",606,"dui",612,"dun",616,"duo",625,"e",637,"en",650,"er",651,"fa",659,"fan",667,"fang",684,"fei",695,"fen",707,"feng",722,"fo",737,"fou",738,"fu",739,"ga",784,"gai",786,"gan",792,"gang",803,"gao",812,"ge",822,"gei",839,"gen",840,"geng",842,"gong",849,"gou",864,"gu",873,"gua",891,"guai",897,"guan",900,"guang",911,"gui",914,"gun",930,"guo",933,"ha",939,"hai",940,"han",947,"hang",966,"hao",969,"he",978,"hei",996,"hen",998,"heng",1002,"hong",1007,"hou",1016,"hu",1023,"hua",1041,"huai",1050,"huan",1055,"huang",1069,"hui",1083,"hun",1104,"huo",1110,"ji",1120,"jia",1173,"jian",1190,"jiang",1230,"jiao",1243,"jie",1271,"jin",1298,"jing",1318,"jiong",1343,"jiu",1345,"ju",1362,"juan",1387,"jue",1394,"jun",1404,"ka",1415,"kai",1419,"kan",1424,"kang",1430,"kao",1437,"ke",1441,"ken",1456,"keng",1460,"kong",1462,"kou",1466,"ku",1470,"kua",1477,"kuai",1482,"kuan",1486,"kuang",1488,"kui",1496,"kun",1507,"kuo",1511,"la",1515,"lai",1522,"lan",1525,"lang",1540,"lao",1547,"le",1556,"lei",1558,"leng",1569,"li",1572,"lia",1606,"lian",1607,"liang",1621,"liao",1632,"lie",1645,"lin",1650,"ling",1662,"liu",1676,"long",1687,"lou",1696,"lu",1702,"lv",1722,"luan",1736,"lue",1742,"lun",1744,"luo",1751,"ma",1763,"mai",1772,"man",1778,"mang",1787,"mao",1793,"me",1805,"mei",1806,"men",1822,"meng",1825,"mi",1833,"mian",1847,"miao",1856,"mie",1864,"min",1866,"ming",1872,"miu",1878,"mo",1879,"mou",1896,"mu",1899,"na",1914,"nai",1921,"nan",1926,"nang",1929,"nao",1930,"ne",1935,"nei",1936,"nen",1938,"neng",1939,"ni",1940,"nian",1951,"niang",1958,"niao",1960,"nie",1962,"nin",1969,"ning",1970,"niu",1976,"nong",1980,"nu",1984,"nv",1987,"nuan",1988,"nue",1989,"nuo",1991,"o",1995,"ou",1996,"pa",2003,"pai",2009,"pan",2015,"pang",2023,"pao",2028,"pei",2035,"pen",2044,"peng",2046,"pi",2060,"pian",2077,"piao",2081,"pie",2085,"pin",2087,"ping",2092,"po",2101,"pu",2110,"qi",2125,"qia",2161,"qian",2164,"qiang",2186,"qiao",2194,"qie",2209,"qin",2214,"qing",2225,"qiong",2238,"qiu",2240,"qu",2248,"quan",2261,"que",2272,"qun",2280,"ran",2282,"rang",2286,"rao",2291,"re",2294,"ren",2296,"reng",2306,"ri",2308,"rong",2309,"rou",2319,"ru",2322,"ruan",2332,"rui",2334,"run",2337,"ruo",2339,"sa",2341,"sai",2344,"san",2348,"sang",2352,"sao",2355,"se",2359,"sen",2362,"seng",2363,"sha",2364,"shai",2373,"shan",2375,"shang",2391,"shao",2399,"she",2410,"shen",2422,"sheng",2438,"shi",2449,"shou",2496,"shu",2506,"shua",2539,"shuai",2541,"shuan",2545,"shuang",2547,"shui",2550,"shun",2554,"shuo",2558,"si",2562,"song",2578,"sou",2586,"su",2589,"suan",2602,"sui",2605,"sun",2616,"suo",2619,"ta",2627,"tai",2636,"tan",2645,"tang",2663,"tao",2676,"te",2687,"teng",2688,"ti",2692,"tian",2707,"tiao",2715,"tie",2720,"ting",2723,"tong",2733,"tou",2746,"tu",2750,"tuan",2761,"tui",2763,"tun",2769,"tuo",2772,"wa",2783,"wai",2790,"wan",2792,"wang",2809,"wei",2819,"wen",2852,"weng",2862,"wo",2865,"wu",2874,"xi",2903,"xia",2938,"xian",2951,"xiang",2977,"xiao",2997,"xie",3015,"xin",3036,"xing",3046,"xiong",3061,"xiu",3068,"xu",3077,"xuan",3096,"xue",3106,"xun",3112,"ya",3126,"yan",3142,"yang",3175,"yao",3192,"ye",3207,"yi",3222,"yin",3275,"ying",3291,"yo",3309,"yong",3310,"you",3325,"yu",3346,"yuan",3390,"yue",3410,"yun",3420,"za",3432,"zai",3435,"zan",3442,"zang",3446,"zao",3449,"ze",3463,"zei",3467,"zen",3468,"zeng",3469,"zha",3473,"zhai",3487,"zhan",3493,"zhang",3510,"zhao",3525,"zhe",3535,"zhen",3545,"zheng",3561,"zhi",3576,"zhong",3619,"zhou",3630,"zhu",3644,"zhua",3670,"zhuai",3672,"zhuan",3673,"zhuang",3679,"zhui",3686,"zhun",3692,"zhuo",3694,"zi",3705,"zong",3720,"zou",3727,"zu",3731,"zuan",3739,"zui",3741,"zun",3745,"zuo",3747];

function UrlEncode(str){
	/*********qiushuiwuhen(2002-9-16)********/
	var i,c,p,q,ret="",strSpecial="!\"#$%&'()*+,/:;<=>?@[\]^`{|}~%";
	for(i=0;i<str.length;i++){
		if(str.charCodeAt(i)>=0x4e00){
			var p=strGB.indexOf(str.charAt(i));
			if(p>=0){
				q=p%94;
				p=(p-q)/94;
				ret+=("%"+(0xB0+p).toString(16)+"%"+(0xA1+q).toString(16)).toUpperCase();
			}
		}
		else{
			c=str.charAt(i);
			if(c==" ")
				ret+="+";
			else if(strSpecial.indexOf(c)!=-1)
				ret+="%"+str.charCodeAt(i).toString(16);
			else
				ret+=c;
		}
	}
	return ret;
}

function _getSpell(str,sp){
	/*********qiushuiwuhen(2002-9-16)********/
	
	var i,c,t,p,ret="";
	if(sp==null)sp="";
	for(i=0;i<str.length;i++){
		if(str.charCodeAt(i)>=0x4e00){
			p=strGB.indexOf(str.charAt(i));
			if(p>-1&&p<3755){
				for(t=qswhSpell.length-1;t>0;t=t-2)if(qswhSpell[t]<=p)break;
				if(t>0)ret+=qswhSpell[t-1]+sp;
			}
		}
	}
	if(ret=="")ret = str;
	return ret.substr(0,ret.length-sp.length);
}

function QSO_eventBand(){
    	this.getBaseObj().eventBand("onkeypress","dealKeypress()");
    	this.getBaseObj().eventBand("onblur","dealInputOnblur()");
    	this.getBaseObj().eventBand("onkeydown","dealInputBackSpace()");
   }
	