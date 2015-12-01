
var _activeElement=null;
var _activeEditor=null;
var _activeTable=null;
var _dropdown_window=null;
var _isDropDownPage=false;

var _document_loading=false;
var _stored_element=null;
var _array_dataset=new Array();
var _tabset_list=new Array();

var _skip_activeChanged=false;

function getPlatform(){
	return window.clientInformation.platform;
}

function getIEVersion(){
	var index=window.clientInformation.userAgent.indexOf("MSIE");
	if (index<0){
		return "";
	}
	else{
		return window.clientInformation.userAgent.substring(index+5, index+8);
	}
}

function getRowByCell(cell){
	return cell.parentElement;
}

function getTableByCell(cell){
	var tbody=getRowByCell(cell).parentElement;
	if (tbody) return tbody.parentElement;
}

function getTableByRow(row){
	var tbody=row.parentElement;
	if (tbody) return tbody.parentElement;
}

function getElementEventName(element, eventName){
	var result="";
	if (element.extra!="dockeditor")
		result=element.id+"_"+eventName;
	else{
		var holder=element.editorHolder;
		if (holder) result=holder.id+"_"+eventName;
	}
	return result;
}

function isUserEventDefined(function_name){
	if (function_name=="") return false;
	var result;
	eval("result=(typeof("+function_name+")!=\"undefined\");");
	return result;
}

function fireUserEvent(function_name, param){
	var result;
	var paramstr="";
	for(i=0; i<param.length; i++){
		if (i==0)
		 	paramstr="param["+i+"]";
		 else
		 	paramstr=paramstr+",param["+i+"]";
	}

	if (isUserEventDefined(function_name))
		eval("result="+function_name+"("+paramstr+");");
	return result;
}

function processActiveElementChanged(activeElement){

	function isChildofTable(obj) {
		var result=null;
		var tmpObj;

		if (obj.getAttribute("extra")=="dockeditor")
			tmpObj=obj.editorHolder;
		else
			tmpObj=obj;

		if (tmpObj.getAttribute("extra")=="tablecell") result=getTableByCell(tmpObj);
		return result;
	}

	function set_activeEditor(editor){
		if (_activeEditor!=editor){
			if (_activeEditor){
				if (needUpdateEditor){
					if (_activeEditor.window==window)
						updateEditorInput(_activeEditor);
					else
						_activeEditor.window.updateEditorInput(_activeEditor);
				}
				if (typeof(hideDropDownBtn)!="undefined") hideDropDownBtn();

				switch (_activeEditor.getAttribute("extra")){
					case "editor":{
						_activeEditor.className="editor";
						break;
					}
					case "dockeditor":{
						hideDockEditor(_activeEditor);
						break;
					}
				}
				refreshElementValue(_activeEditor);
			}

			if (editor && !editor.readOnly){
				var field=getElementField(editor);

				if (editor.getAttribute("extra")=="editor"){
					editor.className="editor_active";
					if (field){
						editor.dataType=field.dataType;
						editor.editorType=field.editorType;
					}
				}

				if (field) editor.maxLength=(field.size>0)?field.size:2147483647;
				if (!editor.getAttribute("dropDown") &&
					(editor.getAttribute("dataType")=="date" || editor.getAttribute("dataType")=="timestamp")){
					editor.dropDown="dropDownDate";
				}

				refreshElementValue(editor);


				var _dropdown=getEditorDropDown(editor);
				if (_dropdown){
					editor.contentEditable=(!isTrue(_dropdown.fixed));					
					if (typeof(showDropDownBtn)!="undefined"){
						showDropDownBtn(editor);
						if (_dropdown && isTrue(_dropdown.autoDropDown)) showDropDownBox(editor);
					}
				}
				else{
					editor.contentEditable=true;
				}
				
				if (!(_dropdown && isTrue(_dropdown.fixed)) &&
					!compareText(editor.type, "checkbox")) editor.select();
			}

			_activeEditor=editor;
		}
	}

	function processElementBlur(){
		var doblur=(activeElement!=_activeEditor);

		if (_activeElement){
			if (typeof(_dropdown_btn)!="undefined" && _dropdown_btn){
				doblur=doblur && (_activeElement!=_dropdown_btn) &&
					(activeElement!=_dropdown_btn);
			}

			if (typeof(_dropdown_box)!="undefined" && _dropdown_box){
				var editor=_dropdown_box.editor;
				doblur=doblur && (activeElement!=editor) &&
					(!isChild(activeElement, _dropdown_box));
			}

			if (doblur){
				if (_activeEditor && _activeEditor.dropDownVisible){
					if (typeof(hideDropDownBox)!="undefined") hideDropDownBox();
					hideStatusLabel(window);
				}
				set_activeEditor(null);
			}
		}
		else{
			doblur=false;
		}

		if (activeElement==document.body && _skip_activeChanged){
			_skip_activeChanged=false;
			return;
		}

		if ((doblur || !_activeEditor)){
			var activeTable=isChildofTable(activeElement);
			if (_activeTable!=activeTable){
				if (_activeTable){
					_activeTable.focused=false;

					var row=_activeTable.activeRow;
					if (row) refreshTableRowStyle(row);

					var eventName=getElementEventName(_activeTable, "onBlur");
					fireUserEvent(eventName, [_activeTable]);
				}

				_activeTable=activeTable;

				if (_activeTable){
					_activeTable.focused=true;

					var row=_activeTable.activeRow;
					if (row) refreshTableRowStyle(row);

					var eventName=getElementEventName(_activeTable, "onFocus");
					fireUserEvent(eventName, [_activeTable]);
				}
			}
		}
	}

	try{
		if (window.closed) return;
		if (activeElement==_activeElement) return;

		if (_activeElement){
			if (typeof(hideMenu)!="undefined"){
				if (_activeElement.getAttribute("extra")=="menuframe" ||
					_activeElement.getAttribute("extra")=="menubar"){
					hideMenu();
				}
			}
		}

		if (activeElement){
			processElementBlur();

			switch (activeElement.getAttribute("extra")){
				case "tablecell":{
					var row=getRowByCell(activeElement);
					var table=getTableByRow(row);
					var dataset=getElementDataset(activeElement);

					table._activeRow=row;
					table._activeCell=activeElement;
					table._activeCellIndex=activeElement.cellIndex;
					if (row.record){
						if (dataset.window==window)
							_dataset_setRecord(dataset, row.record);
						else
							dataset.window._dataset_setRecord(dataset, row.record);
					}
					setActiveTableCell(row, activeElement.cellIndex);
					table._activeRow=null;
					break;
				}
				case "editor":;
				case "dockeditor":{
					set_activeEditor(activeElement);
					break;
				}
			}
		}
		_activeElement=activeElement;
	}
	catch(e){
		processException(e);
	}
}

function _document_onpropertychange() {
	if (event.propertyName=="activeElement")
		processActiveElementChanged(document.activeElement);
}

function _document_onkeydown(){
	switch (event.keyCode){
		case 123:{
			if (_enableClientDebug && event.altKey && event.ctrlKey && event.shiftKey){
				eval(window.prompt("DEBUG", ""));
			}
			break;
		}
	}

}

function _document_oncontextmenu(){
	if (typeof(_disableSystemContextMenu)!="undefined")
	{
		event.returnValue=(!isTrue(_disableSystemContextMenu));
		if (typeof(_array_menu)=="undefined") return;
		for(var i=0; i<_array_menu.length; i++){
			var strHolder=_array_menu[i].popupHolder;
			if (getValidStr(strHolder)!=""){
				var arrayHolder=strHolder.split(",");
				for(var j=0; j<arrayHolder.length; j++){
					if (arrayHolder[j]=="") continue;
					var needPopup;
					eval("needPopup=isChild(event.srcElement,"+arrayHolder[j]+")");
					if (needPopup){
						showMenu(_array_menu[i]);
						event.returnValue=false;
						return;
					}
				}
			}
		}
	}
}

function getPriorTabElement(obj){
	var i=obj.sourceIndex-1;
	var elementCount=document.all.length
	var tmpObj=null;
	while (i<elementCount){
		tmpObj=document.all[i];
		if (tmpObj!=obj)
		{
			switch (tmpObj.tagName.toLowerCase())
			{
			case "input":
			case "textarea":
			case "button":
				if (tmpObj.tabIndex!=-1 && !tmpObj.disabled && !tmpObj.readOnly)
				{
					return tmpObj;
				}
			case "td":
				if (tmpObj.extra=="tablecell" && !tmpObj.readOnly)
				{
					return tmpObj;
				}
			}
		}
		i--;
	}
}

function getNextTabElement(obj){
	var i=obj.sourceIndex+1;
	var elementCount=document.all.length
	var tmpObj=null;
	while (i<elementCount){
		tmpObj=document.all[i];
		if (tmpObj!=obj)
		{
			switch (tmpObj.tagName.toLowerCase())
			{
			case "input":
			case "textarea":
			case "button":
				if (tmpObj.tabIndex!=-1 && !tmpObj.disabled && !tmpObj.readOnly)
				{
					return tmpObj;
				}
			case "td":
				if (tmpObj.extra=="tablecell" && !tmpObj.readOnly)
				{
					return tmpObj;
				}
			}
		}
		i++;
	}
}
function _control_onkeydown() {

	function getCell(element){
		if (element.getAttribute("extra")=="tablecell")
			return element;
		else if (element.in_table)
			return element.editorHolder;
	}

	function processTab(element){
		var obj=null;
		if (element.in_table){
			obj=element.editorHolder;
		}
		else{
			obj=element;
		}
		if (!obj) return;
		if (event.shiftKey)
			obj=getPriorTabElement(obj);
		else
			obj=getNextTabElement(obj);

		try
		{
			if (obj) obj.focus();
			event.returnValue=false;
		}
		catch (e)
		{
			// do nothing
		}
	}

	element=event.srcElement;
	if (isDropdownBoxVisible()){
		if (_dropdown_window) _dropdown_window.processDropDownKeyDown(event.keyCode);
		event.returnValue=true;
	}
	else{
		var rowindex, colindex;
		switch (event.keyCode) {
			//Tab
			case 9:{
				processTab(element);
				break;
			}
			//Enter
			case 13:{
				if (_processEnterAsTab && !compareText(element.tagName, "textarea") || event.shiftKey || event.ctrlKey || event.altKey){
					var cell=getCell(element);
					if (cell && !event.shiftKey){
						var row=getRowByCell(cell);
						var table=getTableByRow(row);
						var maxIndex=checkTableCellIndex(table, 9999, 9999);
						if (row.rowIndex==maxIndex[0] && cell.cellIndex==maxIndex[1] && !isTrue(table.getAttribute("readOnly"))){
							var dataset=getElementDataset(element);
							dataset.insertRecord("end");
							dataset.modified=false;
							setActiveTableCell(table.activeRow, 0);
						}
						else{
							processTab(element);
						}
					}
					else{
						processTab(element);
					}
				}
				break;
			}
			//ESC
			case 27:{
				if (!element.modified){
					var dataset=getElementDataset(element);
					if (!dataset || dataset.state=="none") break;

					var cell=getCell(element);
					var table=getTableByCell(cell);
					if (cell && !isTrue(table.getAttribute("readOnly"))){
						if (isTrue(table.getAttribute("confirmCancel"))){
							if (confirm(constDatasetConfirmCancel)){
								dataset.cancelRecord();
							}
						}
						else{
							dataset.cancelRecord();
						}
					}
				}
				else{
					setElementValue(element, element.oldValue);
				}
				event.returnValue=false;
				break;
			}
			//Left
			case 37:{
				var cell=getCell(element);
				if (cell){
					if ((event.ctrlKey) || (event.altKey)){
						var table=getTableByCell(cell);
						var rowIndex=getRowByCell(cell).rowIndex;
						var cellIndex=cell.cellIndex;
						cellIndex--;
						setFocusTableCell(table, rowIndex, cellIndex);
						event.returnValue=false;
					}
				}
				break;
			}
			//Up
			case 38:{
				var cell=getCell(element);
				if (cell){
					var dataset=getElementDataset(element);
					if (dataset){
						dataset.movePrev();
						event.returnValue=false;
					}
				}
				break;
			}
			//Right
			case 39:{
				var cell=getCell(element);
				if (cell){
					if ((event.ctrlKey) || (event.altKey)){
						var table=getTableByCell(cell);
						var rowIndex=getRowByCell(cell).rowIndex;
						var cellIndex=cell.cellIndex;
						cellIndex++;
						setFocusTableCell(table, rowIndex, cellIndex);
						event.returnValue=false;
					}
				}
				break;
			}
			//Down
			case 40:{
				if (event.altKey){
					showDropDownBox(element);
				}
				else{
					var cell=getCell(element);
					if (cell){
						var table=getTableByCell(cell);
						var dataset=getElementDataset(element);
						if (dataset){
							dataset.moveNext();
							if (dataset.eof && !isTrue(table.getAttribute("readOnly")) && !isTrue(dataset.readOnly)){
								dataset.insertRecord("end");
								dataset.modified=false;
							}
							event.returnValue=false;
						}
					}
				}
				break;
			}
			//Insert
			case 45:{
				var cell=getCell(element);
				if (cell && !isTrue(getTableByCell(cell).getAttribute("readOnly"))){
					var dataset=getElementDataset(element);
					if (!isTrue(dataset.readOnly)){
						dataset.insertRecord("before");
						dataset.modified=false;
					}
				}
				break;
			}
			//Delete
			case 46:{
				if (event.ctrlKey){
					var cell=getCell(element);				
					if (cell){
						var table=getTableByCell(cell);
						if (!isTrue(table.getAttribute("readOnly"))){						
							var dataset=getElementDataset(element);
							if (!isTrue(dataset.readOnly)){
								if (isTrue(table.getAttribute("confirmDelete"))){
									if (confirm(constDatasetConfirmDelete)){
										dataset.deleteRecord();
									}
								}
								else{
									dataset.deleteRecord();
								}
							}
							event.returnValue=false;						
						}
					}
				}
				break;
			}
			//Home
			case 36:{
				var cell=getCell(element);
				if (cell){
					if ((event.ctrlKey) || (event.altKey)){
						var row=getRowByCell(cell);
						setActiveTableCell(row, 0);
						event.returnValue=false;
					}
				}
				break;
			}
			//End
			case 35:{
				var cell=getCell(element);
				if (cell){
					if ((event.ctrlKey) || (event.altKey)){
						var row=getRowByCell(cell);
						setActiveTableCell(row, 99999);
						event.returnValue=false;
					}
				}
				break;
			}
			//Page Up
			case 33:{
				var cell=getCell(element);
				if (cell && !isTrue(getTableByCell(cell).getAttribute("readOnly"))){
					var dataset=getElementDataset(element);
					var pageIndex=(dataset.record)?dataset.record.pageIndex-1:1;
					dataset.moveToPage(pageIndex);
				}
				break;
			}
			//Page Down
			case 34:{
				var cell=getCell(element);
				if (cell && !isTrue(getTableByCell(cell).getAttribute("readOnly"))){
					var dataset=getElementDataset(element);
					var pageIndex=(dataset.record)?dataset.record.pageIndex+1:1;
					dataset.moveToPage(pageIndex);
				}
				break;
			}
			//F2
			case 113:;
			//F7
			case 118:{
				showDropDownBox(element);
				break;
			}
		}
	}
}

function getAbsPosition(obj, offsetObj){
	var _offsetObj=(offsetObj)?offsetObj:document.body;
	var x=obj.offsetLeft;
	var y=obj.offsetTop;
	var tmpObj=obj.offsetParent;

	while ((tmpObj!=_offsetObj) && tmpObj){
		x+=tmpObj.offsetLeft-tmpObj.scrollLeft;
		y+=tmpObj.offsetTop-tmpObj.scrollTop;
		tmpObj=tmpObj.offsetParent;
	}
	return ([x, y]);
}

function isChild(obj, parentObj) {
	var tmpObj=obj;
	var result=false;
	if (parentObj) {
		while (tmpObj) {
			if (tmpObj==parentObj){
				result=true;
				break;
			}
			tmpObj=tmpObj.parentElement;
		}
	}
	return result;
}

function initElementDataset(element){
	var dataset=element.getAttribute("dataset");
	if (dataset) setElementDataset(element, dataset);
}

function initElement(element){
	var initChildren=true;
	var _extra=element.getAttribute("extra");
	if (_extra){
		switch (_extra){
			case "fieldlabel":{
				if (!element.className) element.className=_extra;

				var dataset;
				var _dataset=element.getAttribute("dataset");
				if (typeof(_dataset)=="string"){
					dataset=getDatasetByID(_dataset);
				}
				else{
					dataset=_dataset;
				}
				element.dataset=dataset;
				refreshElementValue(element);
				initChildren=false;
				break;
			}
			case "columnheader":{
				if (!element.className) element.className=_extra;
				element.noWrap=true;
				element.onclick=_table_head_onclick;
				element.onmouseover=_table_head_onmouseover;
				element.onmouseout=_table_head_onmouseout;
				refreshElementValue(element);
				initChildren=false;
				break;
			}
			case "columnfooter":{
				if (!element.className) element.className=_extra;
				refreshElementValue(element);
				initChildren=false;
				break;
			}
			case "datalabel":{
				if (!element.className) element.className=_extra;
				initElementDataset(element);
				initChildren=false;
				break;
			}
			case "editor":
				if (!element.className) element.className=_extra;

				initElementDataset(element);
				with (element){
					if (tagName.toLowerCase()=="input" && compareText(type, "checkbox")){
						style.borderColor="window";
						onclick=_checkbox_onclick;
					}

					language="javascript";
					onkeydown=_control_onkeydown;
					onkeypress=_editor_onkeypress;
					onpropertychange=_editor_onpropertychange;
				}
				setElementValue(element, element.getAttribute("initValue"));
				initChildren=false;
				break;
			case "dockeditor":{
				if (!element.className) element.className="editor_active";

				initElementDataset(element);
				with (element){
					if (tagName.toLowerCase()=="input" && compareText(type, "checkbox")){
						style.borderColor="window";
						onclick=_checkbox_onclick;
					}

					language="javascript";
					onkeydown=_control_onkeydown;
					onkeypress=_editor_onkeypress;
					onpropertychange=_editor_onpropertychange;
				}
				initChildren=false;
				break;
			}
			case "datatable":{
				if (_isDropDownPage || isTrue(element.isDropDownTable)){
					if (!element.className) element.className="dropdowntable";
				}
				else{
					if (!element.className) element.className="datatable";
				}

				initElementDataset(element);
				initDataTable(element, !isTrue(element.getAttribute("skipRebuild")));
				element.onkeydown=_control_onkeydown;
				break;
			}
			case "tablecell":{
				if (!element.className) element.className=_extra;
				initChildren=false;
				break;
			}
			case "datapilot":{
				if (!element.className) element.className=_extra;
				initElementDataset(element);
				initDataPilot(element);
				break;
			}
			case "menubar":{
				if (!element.className) element.className=_extra;
				initMenuBar(element);
				break;
			}
			case "button":{
				if (!element.className) element.className=_extra;

				element.hideFocus=true;
				setButtonDown(element, element.getAttribute("down"))
				element.onmousedown=_button_onmousedown;
				element.onmouseup=_button_onmouseup;
				element.onmouseover=_button_onmouseover;
				element.onmouseout=_button_onmouseout;
				if (!isTrue(element.onclick) && !isTrue(element.getAttribute("defaultOperation"))) {
					element.onclick=_button_onclick;
				}

				initChildren=false;
				break;
			}
			case "tree":{
				if (!element.className) element.className=_extra;
				initTree(element);
				initChildren=false;
				break;
			}
			case "tabset":{
				if (!element.className) element.className=_extra;
				initTabSet(element);
				initChildren=false;
				break;
			}
			default:{
				if (!element.className &&_extra) element.className=_extra;
				break;
			}
		}

		element.window=window;
		fireUserEvent("document_onInitElement", [element, _extra]);
	}
	return initChildren;
}

function initElements(element){
	
	if (compareText(element.getAttribute("extra"), "tabset")){
		_tabset_list[_tabset_list.length]=element;
	}
	else{
		if (!initElement(element)) return;
	}

	for (var i=0; i<element.children.length; i++){
		initElements(element.children[i]);
	}
}

function uninitElement(element){
	var _extra=element.getAttribute("extra");
	switch (_extra){
		case "datalabel":;
		case "editor":;
		case "dockeditor":;
		case "datatable":;
		case "tablecell":;
		case "datapilot":{
			if (typeof(setElementDataset)!="undefined") setElementDataset(element, null);
			break;
		}
	}
}

function uninitElements(element){
	for(var i=0; i<_array_dataset.length; i++){
		var dataset=_array_dataset[i];
		if (dataset.window==window) dataset.setMasterDataset(null);
	}

	if (!element) element=document.body;

	for (var i=0; i<element.children.length; i++){
		uninitElements(element.children[i]);
	}
	uninitElement(element);
}

function _window_onunload() {
	uninitElements();
}

function initTabSets(){
	for (var i=0; i<_tabset_list.length; i++){
		initElement(_tabset_list[i]);
	}
}

function initDocument(){

	if (getIEVersion()<"5.0"){
		alert(constErrUnsupportBrowser);
	}

	_document_loading=true;
	try{
		with (document){
			if (typeof(_setElementsProperties)!="undefined") _setElementsProperties();
			
			//将extra="tabset"的表格读取到数组_tabset_list
			initElements(body);

			for(var i=0; i<_array_dataset.length; i++){
				var dataset=_array_dataset[i];
				if (dataset.masterDataset && dataset.references){
					dataset.setMasterDataset(dataset.masterDataset, dataset.references);
				}
				var event_name=getElementEventName(dataset, "onFilterRecord");
				dataset.filtered=isUserEventDefined(event_name);
				dataset.refreshControls();
			}
			
			/*主要方法:
				initTabSets，其中调用initElement，参数是table的数组_tabset_list
				对tab页，主要方法: initTabSet(element); ---位置： control.js
			*/
			setTimeout("initTabSets()", 0);

			language="javascript";
			onpropertychange=_document_onpropertychange;
			onkeydown=_document_onkeydown;
			oncontextmenu=_document_oncontextmenu;
		}
		if (!window.onunload) window.onunload=_window_onunload;

		if (typeof(sizeDockEditor)!="undefined") setInterval("adjustControlsSize();", 300);

		setTimeout("if (typeof(document.activeElement)!=\"unknown\") processActiveElementChanged(document.activeElement);", 0);
	}
	finally{
		_document_loading=false;
	}
}

var _ad_box=null;
var _ad_interval=50;
var _ad_count=_ad_interval;

function adjustControlsSize(){
	if (typeof(sizeDockEditor)!="undefined"){
		sizeDockEditor();
		if (typeof(sizeDropDownBtn)!="undefined" && _activeEditor) sizeDropDownBtn(_activeEditor);
		if (typeof(sizeDropDownBox)!="undefined") sizeDropDownBox();
	}
}

function getElementDataset(element){
	switch (element.getAttribute("extra")){
		case "tablecell":{
			var table=getTableByCell(element);
			if (table){
				return table.getAttribute("dataset");
			}
			break;
		}
		case "tablerow":{
			var table=getTableByRow(element);
			if (table){
				return table.getAttribute("dataset");
			}
			break;
		}
		case "dockeditor":{
			var holder=element.editorHolder;
			if (holder){
				return getElementDataset(holder);
			}
			break;
		}
		default:{
			return element.getAttribute("dataset");
			break;
		}
	}
}

function getElementField(element){
	var dataset=getElementDataset(element);
	if (!dataset) return;
	return dataset.getField(element.getAttribute("dataField"));
}

function getElementValue(element){
	var eventName=getElementEventName(element, "onGetValue");
	if (isUserEventDefined(eventName)){
		var event_result=fireUserEvent(eventName, [element, value]);
		return event_result;
	}

	switch (element.getAttribute("extra")){
		case "editor":;
		case "dockeditor":{
			switch (element.type.toLowerCase()){
				case "checkbox":{
					return element.checked;
					break;
				}
				default:{
					var result=element.value;
					var _dropdown=getEditorDropDown(element);
					if (_dropdown){
						if (_dropdown.type=="list" && isTrue(_dropdown.mapValue)){
							var items=getDropDownItems(_dropdown);
							if (items){
								var item=items.find(["label"], [element.value]);
								if (item) result=item.getString("value");
							}
						}
					}
					return result;
					break;
				}
			}
			break;
		}

		default:{
			return element.value;
			break;
		}
	}
}

function setElementValue(element, value){

	function getEditorValue(element, value){
		var result=getValidStr(value);
		var _dropdown=getEditorDropDown(element);
		if (_dropdown){
			if (_dropdown.type=="list" && isTrue(_dropdown.mapValue)){
				result="";
				var items=getDropDownItems(_dropdown);
				if (items){
					var item=items.find(["value"], [value]);
					if (item) result=item.getString("label");
				}
			}
		}
		return result;
	}

	switch (element.getAttribute("extra")){
		case "fieldlabel":;
		case "columnfooter":;
		case "columnheader":{
			var eventName=getElementEventName(element, "onRefresh");
			if (isUserEventDefined(eventName)){
				if (!fireUserEvent(eventName, [element, value])) break;
			}
			element.innerHTML=value;
			break;
		}

		case "datalabel":{
			if (element.oldValue==value) return;
			element.oldValue=value;

			var eventName=getElementEventName(element, "onRefresh");
			if (isUserEventDefined(eventName)){
				if (!fireUserEvent(eventName, [element, value])) break;
			}
			element.innerText=value;
			break;
		}

		case "editor":;
		case "dockeditor":{
			if (element.oldValue==value && !element.modified) return;

			var eventName=getElementEventName(element, "onSetValue");
			if (isUserEventDefined(eventName)){
				if (!fireUserEvent(eventName, [element, value])) break;
			}

			element.keyValue=value;
			switch (element.type.toLowerCase()){
				case "checkbox":{
					element.checked=isTrue(value);
					break;
				}
				default:{
					element.value=getEditorValue(element, value);
					break;
				}
			}
			break;
		}

		case "tablecell":{
			var eventName=getElementEventName(element, "onRefresh");
			if (isUserEventDefined(eventName)){
				var record=getRecordByCell(element);
				if (!fireUserEvent(eventName, [element, value, record])) break;
			}

			var tmpHTML;
			switch (element.getAttribute("editorType")){
				case "checkbox":{
					if (isTrue(value)){
						tmpHTML="<font face=Marlett size=2>a</font>";
					}
					else{
						tmpHTML="<font face=Webdings size=1 color=silver>c</font>";
					}
					element.innerHTML=tmpHTML;
					break;
				}
				default:{
					tmpHTML=getEditorValue(element, value);
					if (tmpHTML=="") tmpHTML=" ";
					element.innerText=tmpHTML;
				}
			}
			break;
		}

		case "treenode":{
			var node=element.node;
			var canceled=false;
			var eventName=getElementEventName(getTableByCell(element), "onRefresh");
			if (isUserEventDefined(eventName)){
				canceled=(!fireUserEvent(eventName, [element, value, node]));
			}
			if (!canceled) element.innerHTML=value;
			
			if (node.selectable){
				tmpHTML="<input type=\"checkbox\" "+((node.selected)?"checked":"")+
					" onclick=\"return _tree_checkbox_onClick();\">";
				element.insertAdjacentHTML("afterBegin", tmpHTML);
				element.firstChild.node=node;
			}

			var tmpHTML="";
			if (node.icon){
				if (node.hasChild && node.expanded && node.expandedIcon)
					tmpHTML="<img src=\""+node.expandedIcon+"\" class=\"icon\">";
				else
					tmpHTML="<img src=\""+node.icon+"\" class=\"icon\">";
				element.insertAdjacentHTML("afterBegin", tmpHTML);
			}
			

			var record=node.data;
			var button;
			if (node.hasChild){
				var button_img=(node.expanded)?"collapse.gif":"expand.gif";
				button=document.createElement("<img id=_button_expand hideFocus=true class=\"expandbutton\" src=\"images/tabs/"+button_img+"\""+
					" language=javascript onclick=\"return _tree_expendclick(this);\">");

				button.treenode=element;
				element.insertAdjacentElement("afterBegin", button);
			}
			else{
				element.insertAdjacentHTML("afterBegin", "<img id=_button_expand hideFocus=true class=\"expandbutton\" src=\"images/tabs/nochild.gif\">");
			}

			tmpHTML="";
			element.button=button;
			for(var i=1; i<node.level; i++){
				tmpHTML+="&nbsp;&nbsp;&nbsp;&nbsp;"
			}
			element.insertAdjacentHTML("afterBegin", tmpHTML);
			break;
		}
		default:{
			element.value=value;
		}
	}
}

function refreshElementValue(element){
	var dataset;
	var _extra=element.getAttribute("extra");

	switch (_extra){
		case "fieldlabel":{
			var label=element.getAttribute("dataField");
			var field=getElementField(element);
			if (field){
				label=field.label;
				if (field.required && !field.readOnly && !field.dataset.readOnly){
						label="<font color=red>*</font>"+label;
				}
			}
			setElementValue(element, label);
			break;
		}

		case "columnheader":;
		case "columnfooter":{
			var label=getValidStr(element.getAttribute("label"));
			var field=getElementField(element);
			if (label==""){
				if (field){
					label=field.label;
				}
				else{
					label=getValidStr(element.getAttribute("name"));
				}
			}

			if (field){
				if (field.required && !field.readOnly && !field.dataset.readOnly){
						label="<font color=red>*</font>"+label;
				}
			}

			setElementValue(element, label);
			break;
		}

		case "tablecell":{
			var row=getRowByCell(element);
			var record=row.record;
			var dataField=element.getAttribute("dataField");
			if (dataField=="select") break;

			if (record)
				setElementValue(element, record.getString(dataField));
			else
				setElementValue(element, "");
			break;
		}

		case "treenode":{
			var node=element.node;

			if (node)
				setElementValue(element, node.label);
			else
				setElementValue(element, "");
			break;
		}

		default:{
			dataset=getElementDataset(element);

			var value="";
			if (dataset){
				var fieldName=element.getAttribute("dataField");
				if (fieldName) value=dataset.getString(fieldName);

				setElementValue(element, value);
			}
			element.oldValue=getElementValue(element);
			element.modified=false;
			break;
		}
	}
}

function getStatusLabel(text){
	if (typeof(_status_label)=="undefined"){
		document.body.insertAdjacentHTML("beforeEnd", "<DIV id=_status_label nowrap style=\"position: absolute; visibility: hidden;"+
			" padding-left: 16px; padding-right: 16px; height: 22px; font-size: 9pt; background-color: #ffffcc; border: 1 solid silver; padding-top:3; z-index: 10000;  filter:alpha(opacity=80)\"></DIV>");
	}
	_status_label.innerHTML=text;
}

function showStatusLabel(parent_window, text, control){
	parent_window.getStatusLabel(text);
	parent_window._status_label.style.visibility="visible";
	if (control){
		var pos=getAbsPosition(control);
		locateStatusLabel(pos[0]+(control.offsetWidth-_status_label.offsetWidth)/2, pos[1]+control.offsetHeight+1);
	}
	else{
		parent_window._status_label.style.posLeft=(document.body.clientWidth - _status_label.offsetWidth) / 2;
		parent_window._status_label.style.posTop=(document.body.clientHeight - _status_label.offsetHeight) / 2;
		parent_window.document.onmousemove=null;
	}

}

function hideStatusLabel(parent_window){
	if (!parent_window.closed && parent_window._status_label){
		parent_window.document.onmousemove=null;
		parent_window._status_label.style.visibility="hidden";
	}
}

function locateStatusLabel(x, y){
	if (x==0 && y==0) return;

	var posX=document.body.clientWidth + document.body.scrollLeft - _status_label.offsetWidth;
	var posY=document.body.clientHeight + document.body.scrollTop - _status_label.offsetHeight;
	posX=(x<posX)?x:posX;
	posY=(y<posY)?y:posY;

	_status_label.style.posLeft=posX + 1;
	_status_label.style.posTop=posY + 1;
}

function isDropdownBoxVisible(){
        if (typeof(_dropdown_box)!="undefined" && _dropdown_box)
                return (_dropdown_box.style.visibility=="visible")
        else
                return false;
}

function createParameters(){
	var parameters=new Array();
	parameters.setParameter=parameters_setParameter;
	parameters.getParameter=parameters_getParameter;
	return parameters;
}

function parameters_setParameter(name, value){
	if (typeof(name)=="number"){
		if (name >= 0 && name < this.length) {
			this[name].name=name;
			this[name].value=value;
		}
	}
	else{
		var count=this.length;
		var founded=false;
		for (var i=0; i<count; i++){
			if (compareText(this[i].name, name)){
				founded=true;
				break;
			}
		}
		if (!founded){
			i=count;
			this[i]=new Object();

		}
		this[i].name=name;
		this[i].value=value;
	}
}

function parameters_getParameter(name){
	if (typeof(name)=="number"){
		return this[name].value;
	}
	else{
		var count=this.length;
		var founded=false;
		for (var i=0; i<count; i++){
			if (compareText(this[i].name, name)){
				return this[i].value;
				break;
			}
		}
	}
}

function parameters_getParameterName(index){
	if (this[index])
		return this[index].name;
}
