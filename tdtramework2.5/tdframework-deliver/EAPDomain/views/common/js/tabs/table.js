function getRecordByCell(cell){
	return getRowByCell(cell).record;
}

function getTableRowByRecord(table, record){
	if (record){
		if (table._activeRow && table._activeRow.record==record) return table._activeRow;

		var row=table.rows[table.activeRowIndex+1];
		if (row && row.record==record) return row;

		var row=table.rows[table.activeRowIndex-1];
		if (row && row.record==record) return row;
	}

	for(var i=0; i<table.tBodies[0].rows.length; i++){
		var row=table.tBodies[0].rows[i];
		if (row.record==record) return row;
	}
}

function refreshTableRowData(row){
	for(var i=0; i<row.cells.length; i++){
		refreshElementValue(row.cells[i]);
	}
}

function getTableRowStyle(row){
	var table=getTableByRow(row);
	if (row.rowIndex % 2)
		return "row_odd";
	else
		return "row_even";
}

function refreshTableRowStyle(row){
	var table=getTableByRow(row);
	if (row==table.activeRow && !isTrue(table.hideSelection)){
		if (table.focused && !(_isDropDownPage || isTrue(table.isDropDownTable)))
			row.className="row_active";
		else
			row.className="row_selected";
	}
	else{
		row.className=getTableRowStyle(row);
	}
}

function refreshTableRowIndicate(row){
	var table=getTableByRow(row);
	if (!isTrue(table.showIndicate)) return;

	var cell=row.firstChild;
	if (table.activeRow==row){
		var record=row.record;
		if (record && (record.dataset.state=="insert" || record.dataset.state=="modify"))
			cell.innerHTML="<label style=\"font-family: Webdings; font-size: 7pt; color: red\"><</label>";
		else
			cell.innerHTML="<label style=\"font-family: Webdings; font-size: 7pt\">4</label>";
		cell.className="";
	}
	else{
		cell.innerHTML="";
		cell.className="indicate";
	}
}

function resetDataTableStyle(table, startIndex){
	var row;
	var maxIndex=checkTableCellIndex(table, 9999, 9999);
	for(var i=startIndex; i<=maxIndex[0]; i++){
		row=table.rows[i];
		refreshTableRowStyle(row);
	}
}

function initDataTable(table, resetColumns){

	function setElementAttribute(element, attr, value){
		if (getValidStr(element.getAttribute(attr))=="") element.setAttribute(attr, value);
	}

	table.activeRow=null;
	table.activeRowIndex=null;
	table._activeCellIndex=null;
	table.activeCellIndex=null;
	table._activeCell=null;
	table._activeCellIndex=null;
	if (_isDropDownPage || isTrue(table.isDropDownTable)) table.onclick=_dropdown_onclick;

	var dataset=getElementDataset(table);

	if (resetColumns && dataset){
		var arrayField, arrayLabel=new Array();
		var fields=table.fields;
		if (fields){
			arrayField=fields.split(";");
			for(var i=0; i<arrayField.length; i++){
				index=arrayField[i].indexOf("=");
				if (index>=0){
					arrayLabel[i]=arrayField[i].substr(index+1);
					arrayField[i]=arrayField[i].substr(0, index);
				}
			}
		}
		else{
			arrayField=new Array();
			for(var i=0; i<dataset.fields.fieldCount; i++){
				arrayField[i]=dataset.fields[i].name.toLowerCase();
			}
		}

		for (var i=table.children.length-1; i>=0; i--) table.children[i].removeNode(true);
		table.appendChild(document.createElement("<tbody></tbody>"));

		var row, cell;
		if (isTrue(table.showHeader)){
			row=table.createTHead().insertRow();
			for(var i=0; i<arrayField.length; i++){
				cell=row.insertCell();
				cell.name=arrayField[i];
				cell.dataField=arrayField[i];
				if (arrayLabel[i]) cell.label=arrayLabel[i];
			}
		}

		row=table.tBodies[0].insertRow();
		for(var i=0; i<arrayField.length; i++){
			cell=row.insertCell();
			cell.name=arrayField[i];
			cell.dataField=arrayField[i];
		}

		if (isTrue(table.showFooter)){
			row=table.createTFoot().insertRow();
			for(var i=0; i<arrayField.length; i++){
				cell=row.insertCell();
				cell.name=arrayField[i];
				cell.dataField=arrayField[i];
				if (arrayLabel[i]) cell.label=arrayLabel[i];
			}
		}
		delete arrayField;
	}

	var tHeadRow, tBodyRow, tFootRow;
	if (table.tHead && table.tHead.rows[0]) tHeadRow=table.tHead.rows[0];
	if (table.tFoot && table.tFoot.rows[0]) tFootRow=table.tFoot.rows[0];
	tBodyRow=table.tBodies[0].rows[0];

	if (tHeadRow) tHeadRow.style.backgroundImage = "url(images/tabs/table_header.gif)";
	if (tFootRow) tFootRow.style.backgroundImage = "url(images/tabs/table_header.gif)";

	if (isTrue(table.showIndicate)){
		table.minCellIndex=1;
		if (!tBodyRow.firstChild || (tBodyRow.firstChild && !tBodyRow.firstChild.isIndicate)){
			cell=tBodyRow.insertCell(0);
			cell.width="9px";
			cell.align="center";
			cell.isIndicate=true;
			cell.className="indicate";

			if (tHeadRow){
				cell=tHeadRow.insertCell(0);
				cell.align="center";
			}

			if (tFootRow)
			{
				cell=tFootRow.insertCell(0);
				cell.align="center";
			}
		}
	}
	else{
		table.minCellIndex=0;
	}

	for(var i=table.minCellIndex; i<tBodyRow.children.length; i++){
		var cell=tBodyRow.children[i];
		var name=cell.name;
		var dataField=cell.dataField;
		if (!dataField) dataField=name.toLowerCase();
		cell.dataField=dataField;

		var field=null;
		if (dataset) field=dataset.getField(dataField);

		cell.id=table.id+"_"+dataField;
		cell.extra="tablecell";
		if (_isDropDownPage || isTrue(table.isDropDownTable)) cell.noWrap=true;

		if (name=="select"){
			cell.align="center";
			cell.vAlign="center";
			cell.innerHTML="<input type=checkbox onclick=\"return _table_checkbox_onclick();\" style=\"height:16\">";
			cell.readOnly=true;
		}
		else{
			if (field){
				setElementAttribute(cell, "readOnly", field.readOnly);
				setElementAttribute(cell, "dataType", field.dataType);
				setElementAttribute(cell, "align", field.align);
				setElementAttribute(cell, "vAlign", field.vAlign);
			}
			else{
				setElementAttribute(cell, "readOnly", true);
			}
		}

		if (getValidStr(cell.getAttribute("editorType"))==""){
			switch (cell.getAttribute("dataType")){
				case "date":{
					cell.editorType="date";
					break;
				}
				case "boolean":{
					if (!cell.dropDown)	{
						cell.editorType="checkbox";
					}					
					break;
				}
			}
		}

		fireUserEvent(getElementEventName(table, "onInitCell"), [table, cell, field]);
		initElement(cell);

		if (tHeadRow){
			var cell=tHeadRow.children[i];
			cell.id=table.id+"_header_"+dataField;
			cell.name=name;
			cell.dataField=dataField;
			cell.extra="columnheader";

			if (compareText(name, "select")){
				if (!cell.getAttribute("label")) cell.label="<font face=Marlett size=2>a</font>";
			}
			else{ 
				if (!cell.getAttribute("label")) cell.label=cell.name;
				if (field){
					cell.dataset=dataset;
				}
			}
			initElement(cell);
		}

		if (tFootRow){
			var cell=tFootRow.children[i];
			cell.id=table.id+"_footer_"+dataField;
			cell.name=name;
			cell.dataField=dataField;
			cell.extra="columnfooter";

			if (compareText(name, "select")){
				if (!cell.getAttribute("label")) cell.label="<font face=Marlett size=2>a</font>";
			}
			else{ 
				if (!cell.getAttribute("label")) cell.label=cell.name;
				if (field){
					cell.dataset=dataset;
				}
			}
			initElement(cell);
		}
	}
	tBodyRow.extra="tablerow";
	table.repeatRow=tBodyRow.cloneNode(true);

	table.selectedRecords=new pArray();
	if (getInt(table.getAttribute("maxRow"))==0) table.maxRow=99999;
}

function resetDataTable(table){
	initDataTable(table, true);
	refreshTableData(table);
}

function refreshTableData(table, startRecord){
	var dataset=getElementDataset(table);
	if (!dataset) return;

	var count=0, maxRow=table.getAttribute("maxRow");;

	var _record=(startRecord)?startRecord:dataset.getFirstRecord();
	var count=0;
	while (_record && count<maxRow){
		if (count>(table.tBodies[0].rows.length-1)) insertTableRow(table, "end");
		row=table.tBodies[0].rows[count];
		refreshTableRowStyle(row);
		row.extra="tablerow";
		row.record=_record;

		for (var j=0; j<row.cells.length; j++){
			cell=row.cells[j];
			refreshElementValue(cell);
		}
		count++;
		_record=_record.getNextRecord();
	}

	for(var i=table.tBodies[0].rows.length-1; i>=count; i--){
		var tmpRow=table.tBodies[0].rows[i];
		if (table.tBodies[0].rows.length!=1)
			deleteTableRow(tmpRow);
		else{
			tmpRow.record=null;
			for (var j=0; j<tmpRow.cells.length; j++){
				var cell=tmpRow.cells[j];
				if (cell.getAttribute("extra")=="tablecell") refreshElementValue(cell);
			}
		}

	}

	var row=getTableRowByRecord(table, dataset.record);
	if (row){
		setActiveTableRow(row);
	}
	else{
		setActiveTableRow(table.tBodies[0].rows[0]);
	}
}

function getTableFirstRecord(table){
	if (table.tBodies[0].rows.length>0)
		return table.tBodies[0].rows[0].record;
	else
		return null;
}

function getTableLastRecord(table){
	var rowLength=table.tBodies[0].rows.length;
	if (rowLength>0)
		return table.tBodies[0].rows[rowLength-1].record;
	else
		return null;
}

function checkTableCellIndex(table, rowIndex, cellIndex){
	var r_rowIndex=rowIndex;
	var r_cellIndex=cellIndex;
	var minRowIndex=(table.tHead)?table.tHead.rows.length:0;
	minRowIndex=(minRowIndex<0)?0:minRowIndex;
	var maxRowIndex=(table.tBodies[0])?(minRowIndex+table.tBodies[0].rows.length-1):-1;
	var minCellIndex=table.minCellIndex;
	var maxCellIndex=table.tBodies[0].rows[0].cells.length-1;

	if ((!r_cellIndex)||(r_cellIndex<minCellIndex)) r_cellIndex=minCellIndex
	else if (r_cellIndex>maxCellIndex) r_cellIndex=maxCellIndex;
	if ((!r_rowIndex)||(r_rowIndex<minRowIndex)) r_rowIndex=minRowIndex
	else if (r_rowIndex>maxRowIndex) r_rowIndex=maxRowIndex;

	return ([r_rowIndex, r_cellIndex]);
}

function setActiveTableRow(row){
	var table=getTableByRow(row);
	var oldrow=table.activeRow;

	table.activeRow=row;
	table.activeRowIndex=row.rowIndex;

	if (oldrow){
		refreshTableRowStyle(oldrow);
		refreshTableRowIndicate(oldrow);
	}
	refreshTableRowStyle(row);
	refreshTableRowIndicate(row);

	var cellIndex=table._activeCellIndex;
	if (!cellIndex) cellIndex=table.activeCellIndex;

	setActiveTableCell(row, cellIndex);
	table._activeCell=null;
	table._activeCellIndex=null;
}

function setActiveTableCell(row, cellIndex){
	var table=getTableByRow(row);
	var index=checkTableCellIndex(table, row.rowIndex, cellIndex);
	cell=row.cells[index[1]];
	var oldcell=table.activeCell;

	if (oldcell!=cell && table.focused){
		if (_activeEditor && _activeEditor.getAttribute("extra")=="dockeditor"){
			hideDockEditor(_activeEditor);
		}
	}

	var table_holder=table.parentElement;
	if (table_holder.scrollWidth>table_holder.offsetWidth || table_holder.scrollHeight>table_holder.offsetHeight){
		var pos=getAbsPosition(cell, table_holder);

		if (pos[0]<table_holder.scrollLeft)
			table_holder.scrollLeft=pos[0];
		else if ((pos[0]+cell.offsetWidth)>(table_holder.scrollLeft+table_holder.offsetWidth))
			table_holder.scrollLeft=pos[0]+cell.offsetWidth-table_holder.offsetWidth;

		if (pos[1]<table_holder.scrollTop)
			table_holder.scrollTop=pos[1];
		else if ((pos[1]+cell.offsetHeight)>(table_holder.scrollTop+table_holder.offsetHeight))
			table_holder.scrollTop=pos[1]+cell.offsetHeight-table_holder.offsetHeight;
	}

	if (table.focused){
		if (!isTrue(table.getAttribute("readOnly")) && isTrue(table.getAttribute("editable")) && cell.getAttribute("dataField")){
			_stored_element=cell;
			setTimeout("showDockEditor(_stored_element);", 0);
		}
	}

	table.activeCell=cell;
	table.activeCellIndex=cell.cellIndex;
	return true;
}

function deleteTableRow(row) {
	var table=getTableByRow(row);
	with (table){
		if (table.activeRow==row){
			setAttribute("activeRow", null);
			setAttribute("activeCell", null);
		}
		var rowIndex=row.rowIndex;
		row.removeNode(true);
		if (!_document_loading) resetDataTableStyle(table, rowIndex);
	}
}

function insertTableRow(table, mode, row, empty) {
	if (!row) row=table.tBodies[0].rows[0];

	var newRow=table.repeatRow.cloneNode(!empty);
	switch (mode){
		case "begin":{
			table.tBodies[0].insertAdjacentElement("afterBegin", newRow);
			break;
		}
		case "before":{
			row.insertAdjacentElement("beforeBegin", newRow);
			break;
		}
		case "after":{
			row.insertAdjacentElement("afterEnd", newRow);
			break;
		}
		default:{
			table.tBodies[0].insertAdjacentElement("beforeEnd", newRow);
			break;
		}
	}

	if (!_document_loading) resetDataTableStyle(table, newRow.rowIndex);
	return newRow;
}

function refreshTableRecord(row){
	refreshTableRowData(row);
}

function deleteTableRecord(row) {
	var table=getTableByRow(row);
	var editor=table.editor;
	if (editor) hideDockEditor(editor);

	if (table.tBodies[0].rows.length>1){
		var nextRow=table.tBodies[0].rows[row.rowIndex+1];
		deleteTableRow(row);
		if (nextRow) refreshTableRowData(nextRow);
	}
	else{
		row.record=null;
		for (var i=0; i<row.cells.length; i++){
			refreshElementValue(row.cells[i]);
		}
	}
}

function insertTableRecord(table, mode, row, record) {
	if (!row) row=table.tBodies[0].rows[0];

	var newRow;
	if (!row.getAttribute("record")){
		newRow=row;
	}
	else{
		newRow=insertTableRow(table, mode, row);
	}
	newRow.record=record;
	for (var i=0; i<newRow.cells.length; i++){
		refreshElementValue(newRow.cells[i]);
	}
	return newRow;
}

function _getCheckboxByRecord(table, record){
	var cells=document.body.all(table.id+"_select");
	if (cells){
		for (var i=0; i<cells.length; i++) {
			var row=getRowByCell(cells[i]);
			if (row.record==record){
				var checkbox=cells[i].firstChild;
				return checkbox;
			}
		}
	}
}

function isRecordSelected(table, record){
	var result=false;
	var unit=table.selectedRecords.firstUnit;
        while (unit) {
		if (unit.data==record){
			result=true;
			break;
		}
		unit=unit.nextUnit;
	}
	return result;
}

function selectRecord(table, record){
	var selectedRecords=table.getAttribute("selectedRecords");
	pArray_ex_insert(selectedRecords, record);
	
	var checkbox=_getCheckboxByRecord(table, record);
	if (checkbox) checkbox.checked=true;
}

function unselectRecord(table, record){
	var selectedRecords=table.getAttribute("selectedRecords");
	pArray_ex_delete(selectedRecords, record);
	
	var checkbox=_getCheckboxByRecord(table, record);
	if (checkbox) checkbox.checked=false;
}

function clearSelectedRecords(table){
	var selectedRecords=table.getAttribute("selectedRecords");
	pArray_clear(selectedRecords);
	
	var cells=document.body.all(table.id+"_select");
	if (cells){
		for (var i=0; i<cells.length; i++) {
			var row=getRowByCell(cells[i]);
			var checkbox=cells[i].firstChild;
			if (checkbox) checkbox.checked=false;
		}
	}
}

function _table_head_onmouseover(){
	var cell=this;
	if (cell.getAttribute("allowClick") || cell.getAttribute("allowSort")){
		cell.style.backgroundImage = "url(none)";
	}
}

function _table_head_onmouseout(){
	var cell=this;
	if (cell.getAttribute("allowClick") || cell.getAttribute("allowSort")){
		cell.style.backgroundImage = "url(images/tabs/table_header.gif)";
	}
}

function _table_head_onclick(){
	var cell=this;
	var table=getTableByCell(cell);

	if (cell.getAttribute("allowClick")){
		var eventName=table.id+"_"+cell.name+"_"+"onHeaderClick";
		fireUserEvent(eventName, [table, cell]);
	}

	if (cell.getAttribute("allowSort")){
		var dataset=getElementDataset(table);
		if (dataset){
			var sortfield;
			if (!event.altKey){
				sortfield=cell.getAttribute("dataField");
				var ascend=true;
				if (compareText(dataset.sortFields.substr(0, sortfield.length), sortfield)){
					sortfield="-"+sortfield;
					ascend=false;
				}
				showStatusLabel(window, "<FONT face=Marlett><B>"+((ascend)?"5":"6")+"</B></FONT>", cell);
			}
			else{
				sortfield="";
				showStatusLabel(window, constCancelSort, cell);
			}

			_stored_element=dataset;
			setTimeout("_stored_element.sort(\""+sortfield+"\")", 100);
			setTimeout("hideStatusLabel(window)",  500);
		}
	}
}

function _table_checkbox_onclick(){
	var row=getRowByCell(event.srcElement.parentElement);
	var record=row.getAttribute("record");
	if (!record) event.returnValue=false;

	if (event.srcElement.checked)
		selectRecord(getTableByRow(row), record);
	else
		unselectRecord(getTableByRow(row), record);
}