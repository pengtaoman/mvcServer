var needUpdateEditor=true;

function setEditorReadonly(editor, _readOnly){
	with (editor){
		if (_readOnly){
			editor.readOnly=true;
			style.color="dimgray";
			style.backgroundColor="whitesmoke";
		}
		else{
			editor.readOnly=false;
			style.color="black";
			style.backgroundColor="";
		}
	}
}

function checkFieldEditable(editor, dataset){
	var editable=true;
	if (dataset){
		var field=getElementField(editor);
		if (field){
			editable=!(isTrue(dataset.readOnly) || isTrue(field.readOnly));
		}
		else
			editable=true;
	}

	return editable;
}

function processDropDownSelected(editor, record){
	var _dropdown=getEditorDropDown(editor);
	if (!_dropdown) return;

	var eventName=getElementEventName(_dropdown, "onSelect");
	needAbort=(isUserEventDefined(eventName) && !fireUserEvent(eventName, [_dropdown, record, editor]));
	if (needAbort) return;

	if (record){
		switch (_dropdown.type){
			case "date":{
				setElementValue(editor,
					formatDateTime(new Date(record.getValue("value")), editor.getAttribute("dataType")));
				break;
			}
			default:{
				var fieldmaps=new Array();
				if (_dropdown.fieldMap){
					var fields=_dropdown.fieldMap.split(";");
					for(var i=0; i<fields.length; i++){
						fieldmaps[i]=new Object();
						var index=fields[i].indexOf("=");
						if (index>=0){
							fieldmaps[i].dataField=fields[i].substr(0, index);
							fieldmaps[i].dropdown_dataField=fields[i].substr(index+1);
						}
						else{
							fieldmaps[i].dataField=fields[i];
							fieldmaps[i].dropdown_dataField=fields[i];
						}
					}
				}

				var dataField=editor.getAttribute("dataField");
				var dataset=getElementDataset(editor);
				if (dataset){
					if (fieldmaps.length>0)	{
						for(var i=0; i<fieldmaps.length; i++){
							dataset.setValue(fieldmaps[i].dataField,
									record.getValue(fieldmaps[i].dropdown_dataField));
						}
					}
					else {
						if (_dropdown.type=="list") {
							setElementValue(editor, record.getValue("value"));
						}
						else if (dataField){
							dataset.setValue(dataField, record.getValue(dataField));
						}
					}
				}
				else{
					if (fieldmaps.length>0)	{
						editor.value=record.getValue(fieldmaps[0].dropdown_dataField);
					}
					else {
						if (_dropdown.type=="list") {
							setElementValue(editor, record.getValue("value"));
						}
						else{
							if (dataField){
								editor.value=record.getValue(dataField);
							}
							else{
								editor.value=record.getValue(0);
							}
						}
					}					
				}
			}
		}
	}
	else{
		switch (_dropdown.type){
			case "db":;
			case "custom":{
				setElementValue(editor, "");
				var dataset=getElementDataset(editor);
				if (dataset){
					dataset.setValue(editor.getAttribute("dataField"), "");
				}
				
			}
		}
	}

	editor.dropDownSelectedValue=editor.value;
}

function validEditorInput(editor){
	var _dropdown=getEditorDropDown(editor);
	if (!editor.value || (_dropdown && _dropdown.type=="list" && isTrue(_dropdown.mapValue))) return;

	switch (editor.getAttribute("dataType")){
		case "byte":;
		case "short":;
		case "int":;
		case "long":{
			if (isNaN(parseInt(editor.value)))
				throw constErrTypeInt.replace("%s", editor.value);
			break;
		}
		case "float":;
		case "double":;
		case "bigdecimal":{
			if (isNaN(parseFloat(editor.value)))
				throw constErrTypeNumber.replace("%s", editor.value);
			break;
		}
		case "date":{
			var _date=new Date(editor.value.replace(/-/g, "/"));
			if (isNaN(_date))
				throw constErrTypeDate.replace("%s", editor.value);
			else{
				editor.value=formatDateTime(_date, "date");
			}
			break;
		}
		case "time":{
			var _date=new Date("1900/1/1 "+editor.value);
			if (isNaN(_date))
				throw constErrTypeTime.replace("%s", editor.value);
			else{
				editor.value=formatDateTime(_date, "time");
			}
			break;
		}
		case "timestamp":{
			var _date=new Date(editor.value.replace(/-/g, "/"));
			if (isNaN(_date))
				throw constErrTypeDateTime.replace("%s", editor.value);
			else{
				editor.value=formatDateTime(_date, "datetime");
			}
			break;
		}		
	}
}

function updateEditorInput(editor){
	try{
		if (window.closed) return;

		editor.modified=(getElementValue(editor)!=editor.oldValue);
		if (editor.modified){
			validEditorInput(editor);

			var dataset=getElementDataset(editor);
			var editorValue=getElementValue(editor);
			var dataField=editor.getAttribute("dataField");

			var eventName=getElementEventName(editor, "onUpdate");
			var event_result=fireUserEvent(eventName, [editor]);
			if (event_result) throw event_result;

			var _dropdown=getEditorDropDown(editor);
			if (_dropdown && editor.dropDownSelectedValue!=editor.value
				&& !isTrue(_dropdown.fixed)){

				if (editor.value!=""){
					var notInList=false;
					switch (_dropdown.type){
						case "list":{
							var items=getDropDownItems(_dropdown);
							if (items){
								notInList=(items.find(["value"], [editorValue])==null);
							}
							break;
						}
						case "dataset":{
							var tmp_dataset=_dropdown.dataset;
							if (tmp_dataset){
								if (typeof(tmp_dataset)=="string") tmp_dataset=getDatasetByID(tmp_dataset);
								if (dataset){
									var dataField=_dropdown.dataField;
									if (!dataField) dataField=editor.getAttribute("dataField");
									if (dataField){
										var record=tmp_dataset.find([dataField], [editor.value]);
										notInList=(record==null);
										if (!notInList)	processDropDownSelected(editor, record);
									}
								}
							}
							break;
						}
					}

					if (notInList && isTrue(_dropdown.checkInput)){
						throw constErrOutOfDropDownList;
					}
				}
				else{
					switch (_dropdown.type){
						case "db":;
						case "custom":{
							processDropDownSelected(editor, null);
							break;
						}
					}
				}
			}

			editor.dropDownSelectedValue=editor.value;

			if (dataset && dataset.record){
				if (dataset.window==window){
					_record_setValue(dataset.record, dataField, trimStr(editorValue));
				}
				else{
					dataset.window._record_setValue(dataset.record, dataField, trimStr(editorValue));
				}
			}
		}
	}
	catch(e){
		processException(e);
		refreshElementValue(editor);
		editor.focus();
		throw "abort";
	}
}

function processEditorValueChanged(editor){
	var dataset=getElementDataset(editor);
	if (dataset){
		var value=editor.value;
		if (!dataset.record && editor.value!=""){
			dataset.insertRecord("end");
			if (dataset.state=="insert"){
				editor.value=value;
				editor.oldValue="";
			}
		}
	}
	editor.modified=(getElementValue(editor)!=editor.oldValue);

	if (editor.dropDownVisible && _dropdown_window)
		_dropdown_window.dropDownLocate();
}

function _editor_onpropertychange() {
	if (event.propertyName=="value"){
		var editor=event.srcElement;
		if (_activeEditor==editor) processEditorValueChanged(editor);
	}
}


function _checkbox_onclick() {
	processEditorValueChanged(event.srcElement);
}

function _editor_onkeypress() {
	if (event.srcElement.readOnly || !event.srcElement.contentEditable){
		event.returnValue=false;
		return;
	}

	var result=true;
	switch (event.srcElement.getAttribute("dataType")){
		case "byte":;
		case "short":;
		case "int":;
		case "long":{
			result=(event.keyCode == 45 || (event.keyCode>=48 && event.keyCode<=57));
			break;
		}
		case "float":;
		case "double":;
		case "bigdecimal":{
			result=(event.keyCode == 45 || event.keyCode == 46 || (event.keyCode>=48 && event.keyCode<=57));
			break;
		}
		case "date":{
			result=(event.keyCode == 47 || (event.keyCode>=48 && event.keyCode<=57));
			break;
		}		
		case "time":{
			result=(event.keyCode == 58 || (event.keyCode>=48 && event.keyCode<=57));
			break;
		}
		case "timestamp":{
			result=(event.keyCode == 47 || event.keyCode == 58 || event.keyCode == 32 || (event.keyCode>=48 && event.keyCode<=57));
			break;
		}
	}
	event.returnValue=result;
}

function getEditorDropDown(editor) {
	var _dropdown=editor.getAttribute("dropDown");
	if (_dropdown) eval("var _dropdown="+_dropdown);
	return _dropdown;
}

function sizeDockEditor(editor) {
	var _editor=(editor)?editor:_activeEditor;
	if (!_editor) return;

	var holder=_editor.editorHolder;
	if (!holder) return;

	var pos=getAbsPosition(holder);

	with (_editor){
		if (!compareText(type, "checkbox")){
			style.posLeft=pos[0];
			style.posTop=pos[1];
			style.width=holder.offsetWidth+1;
			style.height=holder.offsetHeight+1;
		}
		else{
			style.posLeft=pos[0]+1;
			style.posTop=pos[1]+1;
			style.width=holder.clientWidth;
			style.height=holder.clientHeight;

			if (offsetWidth>18){
				style.borderLeftWidth=(offsetWidth-18)/2;
				style.borderRightWidth=(offsetWidth-18)/2;
			}
		}
	}
}

function showDockEditor(holder){
	try{
		if (isTrue(holder.getAttribute("readOnly"))) throw "abort";
		if (!checkFieldEditable(holder, getElementDataset(holder))) throw "abort";

		var eventName=getElementEventName(holder, "beforeLoadEditor");
		var event_result=fireUserEvent(eventName, [holder]);
		if (event_result) throw event_result;

		editor=getDockEditor(holder);
		if (editor.editorHolder==holder) return

		with (editor){
			if (style.visiblity!="visible"){
				editor.editorHolder=holder;
				editor.dataType=holder.getAttribute("dataType");
				editor.editorType=holder.getAttribute("editorType");
				editor.dataField=holder.getAttribute("dataField");
				editor.dropDown=holder.getAttribute("dropDown");

				var _dataset=getElementDataset(holder);
				if (compareText(holder.tagName, "td")){
					var table=getTableByCell(holder);
					if (table) table.editor=editor;
					editor.in_table=true;
				}
				else
					editor.in_table=false;

				setElementDataset(editor, _dataset);

				sizeDockEditor(editor);
				style.visibility="visible";
			}

			editor.focus();
		}
	}
	catch(e){
		processException(e)
	}
}

function hideDockEditor(editor){
	if (editor.style.visibility=="visible"){
		_skip_activeChanged=true;
		editor.style.visibility="hidden";
		setElementDataset(editor, null);

		var holder=editor.editorHolder;
		if (holder){
			if (compareText(holder.tagName, "td")){
				var table=getTableByCell(holder);
				if (table) table.editor=null;
			}
			editor.editorHolder=null;
		}
	}
}

function getDockEditor(holder){
	var result=null;
	var editorType=holder.getAttribute("editorType");

	switch (editorType){
		case "textarea":{
			if  (typeof(_table_textarea)=="undefined"){
				result=document.createElement("<TEXTAREA id=_table_textarea extra=dockeditor tabindex=-1"+
					" style=\"position: absolute; visibility: hidden\"></TEXTAREA>");
				initElement(result);
				document.body.appendChild(result);
			}
			else{
				result=_table_textarea;
			}
			break;
		}
		case "checkbox":{
			if  (typeof(_table_checkbox)=="undefined"){
				result=document.createElement("<INPUT id=_table_checkbox type=checkbox hidefocus=false extra=dockeditor tabindex=-1"+
					" style=\"position: absolute; visibility: hidden; background-color: window;\">");
				initElement(result);
				document.body.appendChild(result);
			}
			else{
				result=_table_checkbox;
			}
			break;
		}
		default:{
			if  (typeof(_table_texteditor)=="undefined"){
				result=document.createElement("<INPUT id=_table_texteditor extra=dockeditor tabindex=-1"+
					" style=\"position: absolute; visibility: hidden\">");
				initElement(result);
				document.body.appendChild(result);

			}
			else{
				result=_table_texteditor;
			}
			break;
		}
	}

	return result;
}

function setFocusTableCell(table, rowIndex, cellIndex){
	_rowIndex=rowIndex;
	_cellIndex=cellIndex;
	if (_rowIndex==-1) _rowIndex=table.activeRowIndex;
	if (_cellIndex==-1) _cellIndex=table.activeCellIndex;
	var index=checkTableCellIndex(table, _rowIndex, _cellIndex);
	table.rows[index[0]].cells[index[1]].focus();
}

function isEmptyRow(row){
	function getTableRowState(row){
		var record=row.record;
		if (record)
			return record.recordstate
		else
			return "";
	}

	return (getTableRowState(row)=="new" && !getTableRowModified(row));
}