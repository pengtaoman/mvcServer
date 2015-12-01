
var current_tab_obj=null;

var allow_to_go=null;

function initDataPilot(dataPilot){
	var dataset=getElementDataset(dataPilot);
	if (!dataPilot.getAttribute("pageSize")){
		if (dataset) dataPilot.pageSize=dataset.pageSize;
	}
	var pageSize=dataPilot.getAttribute("pageSize");

	for(var i=0; i<dataPilot.tBodies[0].rows.length; i++){
		var row=dataPilot.tBodies[0].rows[i];
		row.removeNode(true);
	}	

	var buttons_str=getValidStr(dataPilot.getAttribute("buttons"));
	if (buttons_str=="" || compareText(buttons_str, "default"))
		buttons_str="movefirst,prevpage,moveprev,movenext,nextpage,movelast,appendrecord,deleterecord,cancelrecord,updaterecord";
	else if (compareText(buttons_str, "readonly"))
		buttons_str="movefirst,prevpage,moveprev,movenext,nextpage,movelast";
	buttons_str=buttons_str.toLowerCase();
	var buttons=buttons_str.split(",");

	var row=dataPilot.tBodies[0].insertRow();
	row.align="center";
	for(var i=0; i<buttons.length; i++){
		if ((!dataset || !dataset.autoLoadPage || dataset.pageCount<2) && 
			(buttons[i]=="prevpage" || buttons[i]=="nextpage")) continue;

		btn=document.createElement("<input type=button class=button hideFocus=true style=\"height: 22px\">");
		btn.style.backgroundImage = "url(images/tabs/button.gif)";
		btn.tabIndex=-1;
		btn.onmouseover=_button_onmouseover;
		btn.onmouseout=_button_onmouseout;
		btn.onclick=_datapilot_onclick;

		btn.dataset=dataPilot.getAttribute("dataset");
		btn.buttonType=buttons[i];
		btn.datapiolt=dataPilot;

		switch(buttons[i]){
			case "movefirst":{
				btn.style.fontFamily="Webdings";
				btn.value="9";
				btn.title=constDatasetMoveFirst;
				btn.style.width=30;
				break;
			}
			case "prevpage":{
				btn.style.fontFamily="Webdings";
				btn.value="7";
				btn.title=constDatasetPrevPage;
				btn.style.width=30;
				break;
			}
			case "moveprev":{
				btn.style.fontFamily="Webdings";
				btn.value="3";
				btn.title=constDatasetMovePrev;
				btn.style.width=30;
				break;
			}
			case "movenext":{
				btn.style.fontFamily="Webdings";
				btn.value="4";
				btn.title=constDatasetMoveNext;
				btn.style.width=30;
				break;
			}
			case "nextpage":{
				btn.style.fontFamily="Webdings";
				btn.value="8";
				btn.title=constDatasetNextPage;
				btn.style.width=30;
				break;
			}
			case "movelast":{
				btn.style.fontFamily="Webdings";
				btn.value=":";
				btn.title=constDatasetMoveLast;
				btn.style.width=30;
				break;
			}
			case "insertrecord":{
				btn.value=constBtnInsertRecord;
				btn.title=constDatasetInsertRecord;
				btn.style.width=45;
				break;
			}
			case "appendrecord":{
				btn.value=constBtnAppendRecord;
				btn.title=constDatasetAppendRecord;
				btn.style.width=45;
				break;
			}
			case "deleterecord":{
				btn.value=constBtnDeleteRecord;
				btn.title=constDatasetDeleteRecord;
				btn.style.width=45;
				break;
			}
			case "editrecord":{
				btn.value=constBtnEditRecord;
				btn.title=constDatasetEditRecord;
				btn.style.width=45;
				break;
			}
			case "cancelrecord":{
				btn.value=constBtnCancelRecord;;
				btn.title=constDatasetCancelRecord;
				btn.style.width=45;
				break;
			}
			case "updaterecord":{
				btn.value=constBtnUpdateRecord;
				btn.title=constDatasetUpdateRecord;
				btn.style.width=45;
				break;
			}
		}
		btn.id=dataPilot.id+"_"+btn.buttonType;
		row.insertCell().appendChild(btn);
	}

	refreshDataPilot(dataPilot);
}

function setDataPilotButtons(dataPilot, buttons){
	dataPilot.buttons=buttons;
	initDataPilot(dataPilot);
}

function refreshDataPilot(dataPilot){

	function refreshButton(btn, enable){
			btn.disabled=!enable;
			refreshButtonColor(btn);
	}

	var dataset=getElementDataset(dataPilot);

	var row=dataPilot.rows[0];
	for(var i=0; i<row.cells.length; i++){
		var btn=row.cells[i].children[0];
		switch(btn.buttonType){
			case "movefirst":;
			case "moveprev":{
				refreshButton(btn, (dataset && !dataset.bof));
				break;
			}
			case "prevpage":{
				refreshButton(btn, (dataset && dataset.record && dataset.record.pageIndex>1));
				break;
			}
			case "movenext":;
			case "movelast":{
				refreshButton(btn, (dataset && !dataset.eof));
				break;
			}
			case "nextpage":{
				refreshButton(btn, (dataset && dataset.record && dataset.record.pageIndex<dataset.pageCount));
				break;
			}
			case "insertrecord":;
			case "appendrecord":{
				refreshButton(btn, (dataset && !dataset.readOnly));
				break;
			}
			case "editrecord":{
				refreshButton(btn, (dataset && !(dataset.bof && dataset.eof) && !dataset.readOnly));
				break;
			}
			case "deleterecord":{
				refreshButton(btn, (dataset && !(dataset.bof && dataset.eof) && !dataset.readOnly));
				break;
			}
			case "cancelrecord":;
			case "updaterecord":{
				refreshButton(btn, (dataset && (dataset.state=="insert" || dataset.state=="modify") && !dataset.readOnly));
				break;
			}
		}

		fireUserEvent(getElementEventName(dataPilot, "onRefreshButton"), [dataPilot, btn, btn.buttonType, dataset]);
	}
}

function _datapilot_onclick(){
	if (event.srcElement.disabled) return;
	var datapiolt=event.srcElement.datapiolt;
	var dataset=getElementDataset(datapiolt);

	var eventName=getElementEventName(datapiolt, "onButtonClick");
	if (isUserEventDefined(eventName)){
			var event_result=fireUserEvent(eventName, [datapiolt, event.srcElement, event.srcElement.buttonType, dataset]);
			if (!event_result) return;
	}

	var pageSize=datapiolt.getAttribute("pageSize");

	switch(event.srcElement.buttonType){
		case "movefirst":{
			dataset.moveFirst();
			break;
		}
		case "prevpage":{
			var pageIndex=(dataset.record)?dataset.record.pageIndex-1:1;
			dataset.moveToPage(pageIndex);
			break;
		}
		case "moveprev":{
			dataset.movePrev();
			break;
		}
		case "movenext":{
			dataset.moveNext();
			break;
		}
		case "nextpage":{
			var pageIndex=(dataset.record)?dataset.record.pageIndex+1:1;
			dataset.moveToPage(pageIndex);
			break;
		}
		case "movelast":{
			dataset.moveLast();
			break;
		}
		case "insertrecord":{
			dataset.insertRecord("before");
			break;
		}
		case "appendrecord":{
			dataset.insertRecord("end");
			break;
		}
		case "editrecord":{
			dataset_setState(dataset, "modify");
			break;
		}
		case "deleterecord":{
			if (isTrue(datapiolt.getAttribute("confirmDelete"))){
					if (confirm(constDatasetDeleteRecord)) dataset.deleteRecord();
			}
			else
					dataset.deleteRecord();
			break;
		}
		case "cancelrecord":{
			if (isTrue(datapiolt.getAttribute("confirmCancel"))){
					if (confirm(constDatasetCancelRecord)) dataset.cancelRecord();
			}
			else
					dataset.cancelRecord();
			break;
		}
		case "updaterecord":{
			dataset.updateRecord();
			break;
		}
	}
}

function initTabSet(tabset){
	
	//取得属性串：如"客户信息~20,tab1,;帐户信息~20,tab2,;服务信息~20,tab3,"
	var tabs=tabset.getAttribute("tabs");
	
	if (!tabs) return;
	var tabs=tabs.split(";");
	for(var i=0; i<tabset.tBodies[0].rows.length; i++){
		var row=tabset.tBodies[0].rows[i];
		row.removeNode(true);
	}

	var row=tabset.tBodies[0].insertRow();
	var cell=row.insertCell();
	cell.firstCell=true;
	cell.innerHTML="<img src=\"images/tabs/start_tab.gif\">";
	cell.onmousemove=DoMouseMove;
	
	var label, tabname, index;
	for(i=0; i<tabs.length; i++){
		props=tabs[i].split(",");
		//alert(props[0]);alert(props[1]);alert(props[2]);
		
		cell=row.insertCell();
		cell.background="images/tabs/tab_button.gif";
		cell._tabIndex=i;
		tabname=props[1];
		//alert(tabname);
		
		cell.tabName=tabname;
		cell.targetUrl=getDecodeStr(props[2]);
		//alert(cell.targetUrl);

		btn=document.createElement("<DIV hideFocus=true nowrap class=tab></DIV>");
		btn.innerText=getDecodeStr(props[0]);
		btn._tabIndex=-1;
		btn.onclick=_tabset_onclick;
		btn.onmouseover=_tabset_onmouseover;
		btn.onmouseout=_tabset_onmouseout;
		btn.tab=cell;
		cell.appendChild(btn);

		cell=row.insertCell();
		if (i!=tabs.length-1){
			cell.innerHTML="<img src=\"images/tabs/tab.gif\">";
			cell.onmousemove=DoMouseMove;
			
		}
		else{
			cell.lastCell=true;
			cell.innerHTML="<img src=\"images/tabs/end_tab.gif\">";
			cell.onmousemove=DoMouseMove;
			
		}

		eval("if (typeof("+tabset.id+"_"+tabname+")!=\"undefined\"){ "+
			tabset.id+"_"+tabname+".style.visibility=\"hidden\";"+
			tabset.id+"_"+tabname+".style.position=\"absolute\";}");

		//加程序：			
		/*var v = 'show';
		v=(v=='show')?'visible':(v='hide')?'hidden':v;
		
		//alert(typeof(tabset.id+"_"+tabname));
		eval("if (typeof("+tabset.id+"_"+tabname+")!=\"undefined\"){ "+
			tabset.id+"_"+tabname+".style.visibility='visible';"+
			tabset.id+"_"+tabname+".style.position='relative';"+
			"}");
		*/
		/*window.parent.frames[1].fee_div.innerHTML=fee_info;
		window.parent.frames[1].fee_current();
		window.parent.frames[1].fee_str_arr = fee_arr_info;*/		
			
	}
	
	cell=row.insertCell();
	cell.width="100%";
	cell.background="images/tabs/tab_blank.gif";
	cell.onmousemove=DoMouseMove;	

	setActiveTabIndex(tabset, getInt(tabset.getAttribute("tabIndex")));
	
	
	//alert(tabset);	
	current_tab_obj = tabset;
}

function setTabs(tabset, tabs){
	tabset.tabs=tabs;
	initTabSet(tabset);
}

function _setActiveTab(cell){
	
	//alert("haha");
	
	try{
		var row=getRowByCell(cell);
		var tabset=getTableByRow(row);
		var selectCell=tabset.selectTab;

		if (selectCell==cell) return;
		//alert(allow_to_go);
		if (allow_to_go=="no") return;
		
		var oldName=(selectCell)?selectCell.tabName:"";
		var newName=cell.tabName;

		//alert(oldName);
		//alert(newName);
		nas_set_tab_div(oldName,newName);
		

		var eventName=getElementEventName(tabset, "beforeTabChange");
		var event_result=fireUserEvent(eventName, [tabset, oldName, newName]);
		if (event_result) throw event_result;

		if (selectCell){
			var prevCell=row.cells[selectCell.cellIndex-1];
			var nextCell=row.cells[selectCell.cellIndex+1];

			selectCell.background="images/tabs/tab_button.gif";

			if (prevCell.firstCell)
				prevCell.firstChild.src="images/tabs/start_tab.gif";
			else
				prevCell.firstChild.src="images/tabs/tab.gif";

			if (nextCell.lastCell)
				nextCell.firstChild.src="images/tabs/end_tab.gif";
			else
				nextCell.firstChild.src="images/tabs/tab.gif";
			eval("if (typeof("+tabset.id+"_"+oldName+")!=\"undefined\") "+tabset.id+"_"+oldName+".style.visibility=\"hidden\"");
		}

		var prevCell=row.cells[cell.cellIndex-1];
		var nextCell=row.cells[cell.cellIndex+1];

		cell.background="images/tabs/active_tab_button.gif";

		if (prevCell.firstCell)
			prevCell.firstChild.src="images/tabs/active_start_tab.gif";
		else
			prevCell.firstChild.src="images/tabs/active_tab1.gif";

		if (nextCell.lastCell)
			nextCell.firstChild.src="images/tabs/active_end_tab.gif";
		else
			nextCell.firstChild.src="images/tabs/active_tab2.gif";
		eval("if (typeof("+tabset.id+"_"+newName+")!=\"undefined\") "+tabset.id+"_"+newName+".style.visibility=\"\"");

		tabset.selectTab=cell;
		tabset.selectName=cell.tabName;
		tabset.selectIndex=cell._tabIndex;

		if (cell.targetUrl){
			//20030920 TabSet的TargetUrl中不必加入tabIndex参数
			//var url=cell.targetUrl+((cell.targetUrl.indexOf("?")>=0)?"&":"?");
			//url+=tabset.id+"_tabIndex="+cell._tabIndex;
			open(cell.targetUrl, tabset.targetFrame);
		}

		var eventName=getElementEventName(tabset, "afterTabChange");
		fireUserEvent(eventName, [tabset, oldName, newName]);
		
		
		//设置焦点
		//alert(cell._tabIndex);
		//alert(typeof(focus_arr[cell._tabIndex]));
		//alert(eval("document.forms[0]."+focus_arr[cell._tabIndex]+".name"));
		if (typeof(focus_arr[cell._tabIndex])!="undefined")
		{
			eval("if (typeof(document.forms[0]."+focus_arr[cell._tabIndex]+")!=\"undefined\" && document.forms[0]."+focus_arr[cell._tabIndex]+".disabled!=true && document.forms[0]."+focus_arr[cell._tabIndex]+".readOnly!=true) "
				+"document.forms[0]."+focus_arr[cell._tabIndex]+".focus()");
			
			/*if (eval("document.forms[0]."+focus_arr[cell._tabIndex]+".length==1"))
			{
				eval("document.forms[0]."+focus_arr[cell._tabIndex]+".focus()");}
			}*/
		}
		
		//alert(document.forms[0].GApplyDate.readOnly);
		
	}
	catch(e){
		processException(e);
	}
}

function setActiveTab(table, tabname){
	
	if (!tabname) return;
	for(var i=0; i<table.cells.length; i++){
		
		//alert(table.cells[i].tabName +"--" + tabname);		
		if (table.cells[i].tabName==tabname){
			
			_setActiveTab(table.cells[i]);
			
			break;
		}
	}
}

function setActiveTabIndex(table, index){
	//alert(index);
	for(var i=0; i<table.cells.length; i++){
		if (table.cells[i]._tabIndex==index){
			_setActiveTab(table.cells[i]);
			break;
		}
	}
}

function _tabset_onclick(){

	//alert("in");

	var tab=event.srcElement.tab;
	
	//alert(tab);	
	_setActiveTab(tab);
		

}

function setFocus(theIndex)
{
	
}

function _tabset_onmouseover(){
	event.srcElement.style.color="blue";
	event.srcElement.style.textDecorationUnderline=true;
}

function _tabset_onmouseout(){
	event.srcElement.style.color="black";
	event.srcElement.style.textDecorationUnderline=false;
}

function refreshButtonColor(button){
	if (isTrue(button.getAttribute("down"))){
		button.className="button_down";
		button.style.color = "white";
		button.style.backgroundImage = "url(images/tabs/button_down.gif)";
	}
	else{
		button.className="button";
		button.style.color = "black";
		button.style.backgroundImage = "url(images/tabs/button.gif)";
	}
}

function setButtonDown(button, down){
	button.down=isTrue(down);
	refreshButtonColor(button);
}

function _button_onmousedown(){
	var button=event.srcElement;
	var menu=button.getAttribute("menu");

	if (typeof(menu)=="string" && menu!=""){
		eval("menu="+menu);
		button.menu=menu;
	}

	if (menu){
		showButtonMenu(menu, button);
	}
}

function _button_onmouseup(){
	var button=event.srcElement;
	if (isTrue(button.getAttribute("allowPushDown"))){
		var down=button.getAttribute("down");
		setButtonDown(button, !down);
	}
}

function _button_onmouseover(){
	try{
		var button=event.srcElement;
		if (button.disabled || button.down) return;
		button.style.backgroundImage="url(none)";
	}
	catch(e){
		//do nothing
	}
}

function _button_onmouseout(){
	try{
		var button=event.srcElement;
		if (button.disabled) return;
		refreshButtonColor(button);
	}
	catch(e){
		//do nothing
	}
}

function _button_onclick(){
	var button=event.srcElement;
	if (button.defaultOperation){
		switch (button.defaultOperation.toLowerCase())
		{
		case "submitupdate":
			SubmitManager.submit();
			break;
		case "refreshpage":
			window.open(window.location.href, "_self");
			break;
		}
	}
	else{
		fireUserEvent(getElementEventName(button, "onClick"), [button]);
	}
}

function DoMouseMove()
{
	//alert('in');
	//if ((event.button==1) && (CurElement!=null)) 
	//liux add '|| event.button == 2 || event.button == 3' for right mouse key drag or left and right mouse key both drag
	if (event.button == 1 || event.button == 2 || event.button == 3)
	{ 	
		return false;
	}
	return;
}

