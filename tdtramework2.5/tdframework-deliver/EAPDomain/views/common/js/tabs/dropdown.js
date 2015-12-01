var _dropdown_parentwindow=null;
var _dropdown_parentbox=null;
var _dropdown_box=null;
var _dropdown_table=null;
var _dropdown_frame=null;
var _dropdown_dataset=null;
var _date_dropdown_box=null;

var _array_dropdown = new Array();

var _calendarControl=null;
var _tmp_dataset_date=null;

function createDropDown(id) {
	var dropdown=new Object();
	dropdown.parameters=createParameters();
	dropdown.id=id;
	dropdown.setParameter=dropdown_setParameter;
	dropdown.getParameter=dropdown_getParameter;
	dropdown.getParameterName=dropdown_getParameterName;
	dropdown.getParameterCount=dropdown_getParameterCount;
	dropdown.clearCache=dropdown_clearCache;
	return dropdown;
}

function initDropDown(dropdown){
	_array_dropdown[_array_dropdown.length]=dropdown;
}

function dropdown_setParameter(name, value){
	this.parameters.setParameter(name, value);
}

function dropdown_getParameter(name){
	return this.parameters.setParameter(name);
}

function dropdown_getParameterName(index){
	return this.parameters.getParameterName(index);
}

function dropdown_getParameterCount(){
	var dropdown=this;
	return dropdown.parameters.length;
}

function dropdown_clearCache(){
	var dropdown=this;
	dropdown.dropdownbox=null;
}

function initDropDownBox(dropDownType){
	try{
		_isDropDownPage=true;
		if (typeof(_dropdown_succeed)!="undefined" && !isTrue(_dropdown_succeed)){
			throw getDecodeStr(_dropdown_error);
		}
		else{
			if (dropDownType=="db"){
				if (typeof(datasetDropDown)!="undefined") _dropdown_dataset=datasetDropDown;
			}
			initDocument();
			_initDropDownBox(dropDownType);
		}
		return true;
	}
	catch(e){
		processException(e);
		hideDropDown();
		hideStatusLabel(window.parent);
		return false;
	}
}

function _initDropDownBox(dropDownType){
	_document_loading=true;

	switch (dropDownType){
		case "db":{
			_dropdown_div.onkeydown=_dropdown_onkeydown;
		}

		case "custom":{
			_dropdown_parentwindow=window.parent;
			_dropdown_parentbox=_dropdown_parentwindow._dropdown_box;
			_dropdown_parentwindow._dropdown_window=window;

			if (!_dropdown_parentbox || _dropdown_parentbox.style.visibility=="hidden") return;

			var editor=_dropdown_parentbox.editor;
			_dropdown_div.style.width=
				(_dropdown_parentbox.offsetWidth>editor.offsetWidth)?_dropdown_parentbox.offsetWidth:editor.offsetWidth;

			_dropdown_parentwindow.sizeDropDownBox();

			with (_dropdown_parentwindow._dropdown_frame){
				width="100%";
				if (filters.blendTrans.status!=2) {
					if (getIEVersion()<"5.5"){
						style.visibility="visible";
					}
					else{
						filters.blendTrans.apply();
						style.visibility="visible";
						filters.blendTrans.play();
					}
				}
			}

			hideStatusLabel(_dropdown_parentwindow);
			break;
		}

		case "date":{
			_dropdown_parentwindow=window;
			_dropdown_parentbox=_dropdown_parentwindow._dropdown_box;
			_dropdown_parentwindow._dropdown_window=window;
			sizeDropDownBox();
			if ((getIEVersion()>="5.5") &&
				_dropdown_parentbox.filters.blendTrans.status!=2)
				_dropdown_parentbox.filters.blendTrans.play();
			break;
		}

		default:{
			_dropdown_parentwindow=window;
			_dropdown_parentbox=_dropdown_parentwindow._dropdown_box;
			_dropdown_parentwindow._dropdown_window=window;
			_dropdown_dataset=getElementDataset(_dropdown_table);
			sizeDropDownBox();
			if ((getIEVersion()>="5.5") &&
				_dropdown_parentbox.filters.blendTrans.status!=2)
				_dropdown_parentbox.filters.blendTrans.play();
			break;
		}
	}

	_dropdown_parentbox.prepared=true;
	var editor=_dropdown_parentbox.editor;
	if (editor) dropDownLocate();
	_document_loading=false;
}

function sizeDropDownBox(){
	function _sizeDropDownBox(new_width, new_height){
		with (_dropdown_box){
			var editor=_dropdown_box.editor;
			var dropdown=_dropdown_box.dropDown;
			var maxHeight=parseInt(dropdown.height);
			if (isNaN(maxHeight) || maxHeight<20) maxHeight=220;

			var pos=getAbsPosition(editor, document.body);
			var _posLeft=pos[0];
			var _posTop=pos[1]+editor.offsetHeight+1;

			if (new_height>maxHeight &&
				!(dropdown.type=="db" && getInt(dropdown.pageSize)>0)){
				new_height=maxHeight;
				new_width+=16;
				if (!(getIEVersion()<"5.5"))
					style.overflowY="scroll";
				else
					style.overflowY="visible";
			}
			else{
				style.overflowY="hidden";
			}

			var document_width=document.body.clientWidth + document.body.scrollLeft;
			var document_height=document.body.clientHeight + document.body.scrollTop;

			if (_posLeft+new_width>document_width && document_width>new_width) _posLeft=document_width-new_width;
			if (_posTop+new_height>document_height && pos[1]>new_height) _posTop=pos[1]-new_height-5;
			style.posLeft=_posLeft;
			style.posTop=_posTop;
			style.posHeight=new_height+4;
			style.posWidth=new_width+4;
			style.borderWidth="2px";
		}
	}

	if (!isDropdownBoxVisible()) return;

	try{
		var _width, _height;
		switch (_dropdown_box.dropDown.type){
			case "db":;
			case "custom":{
				with (_dropdown_frame){
					_height=_dropdown_window._dropdown_div.offsetHeight;
					_width=_dropdown_window._dropdown_div.offsetWidth;
					style.posWidth=_width;
					style.posHeight=_height;
				}
				break;
			}

			case "date":{
				_width=CalendarTable.offsetWidth;
				_height=CalendarTable.offsetHeight;
				break;
			}

			default:{
				_width=_dropdown_table.offsetWidth;
				_height=_dropdown_table.offsetHeight;
				break;
			}
		}
		_sizeDropDownBox(_width, _height);
	}
	catch(e){
		//do nothing
	}
}

function canDropDown(editor){
	return (editor.getAttribute("dropDown") &&
		!compareText(editor.type, "checkbox"));
}

function getDropDownBox(dropdown){
	if (dropdown.cache){
		_dropdown_box=dropdown.dropdownbox;
	}

	if (!_dropdown_box){
		_dropdown_box=document.createElement("<DIV class=\"dropdown_frame\" style=\"overflow-X: hidden; position: absolute; visibility: hidden; z-index: 10000\"></DIV>");
		document.body.appendChild(_dropdown_box);
		dropdown.dropdownbox = _dropdown_box;
		_dropdown_box.dropDown = dropdown;
	}
}

function getDropDownBtn(){
	if  (typeof(_dropdown_btn)=="undefined"){
		obj=document.createElement("<INPUT class=\"dropdown_button\" id=_dropdown_btn type=button tabindex=-1 value=6 hidefocus=true"+
			" style=\"position: absolute; visibility: hidden; z-index: 9999\""+
			" LANGUAGE=javascript onmousedown=\"return _dropdown_btn_onmousedown(this)\" onfocus=\"return _dropdown_btn_onfocus(this)\">");
		obj.style.background = "url(images/tabs/dropdown_button.gif)";
		document.body.appendChild(obj);
		return obj
	}
	else{
		return _dropdown_btn;
	}
}

function showDropDownBox(_editor){
	try{
		if (!canDropDown(_editor)) return;
		if (!isDropdownBoxVisible()){
			eval("var dropdown=" + _editor.getAttribute("dropDown"));
			var eventName=getElementEventName(dropdown, "beforeOpen");
			var event_result=fireUserEvent(eventName, [dropdown]);
			if (event_result) throw event_result;

			getDropDownBox(dropdown);
			_dropdown_box.editor=_editor;
			_dropdown_box.prepared=false;
			if (_dropdown_box.filters.blendTrans.status==2) return;

			var dataset=getElementDataset(_editor);
			if (dataset){
				if (!dataset.record) dataset.insertRecord();
			}

			with (_dropdown_box){
				style.overflowY="hidden";
				switch (dropdown.type){
					case "db":;
					case "custom":{
						style.visibility="visible";
						if (_editor.offsetWidth>128)
							style.width=editor.offsetWidth
						else
							style.width=128;
						break;
					}

					default:{
						if (filters.blendTrans.status!=2) {
							if (!(getIEVersion()<"5.5")) filters.blendTrans.apply();
							style.visibility="visible";
						}
						break;
					}
				}

				if (!_dropdown_box.cached){
					switch (dropdown.type){
						case "db":{
							showStatusLabel(window, constDownLoadingData, _editor);
							if (dropdown.sessionKey){
								var _url=_extra_library+"dbdropdown.jsp?sessionkey="+dropdown.sessionKey+"&pagesize="+getInt(dropdown.pageSize)+
									"&fields="+getValidStr(dropdown.fields)+"&value="+_editor.value;

								for(var i=0; i<dropdown.parameters.length; i++){
									var paramName=dropdown.parameters[i].name;
									if (paramName=="value") continue;
									_url+="&"+paramName+"="+dropdown.parameters[i].value;
								}

								_dropdown_box.innerHTML="<IFRAME height=100 frameborder=0 marginheight=0 marginwidth=0 scrolling=no"+
									" src=\""+_url+"\""+
									" style=\"position:_absolute; visibility:hidden_; border-style: none\"></IFRAME>";
								_dropdown_frame=_dropdown_box.firstChild;
							}
							break;
						}

						case "custom":{
							showStatusLabel(window, constDownLoadingData, _editor);
							_dropdown_box.innerHTML="<IFRAME height=0 frameborder=0 marginheight=0 marginwidth=0 scrolling=no"+
								" src=\""+dropdown.url+"\""+
								" style=\"overflow: hidden; position:absolute; visibility:hidden; border-style: none\"></IFRAME>";
							_dropdown_frame=_dropdown_box.firstChild;
							break;
						}

						case "date":{
							createCalendar(_dropdown_box);
							_initDropDownBox(dropdown.type);
							_dropdown_box.onkeydown=_calendar_onkeydown;
							break;
						}

						default:{
							style.width=_editor.offsetWidth;
							createListTable(_dropdown_box);
							_dropdown_table.onkeydown=_dropdown_onkeydown;

							var _dataset;
							if (dropdown.type=="list"){
								_dataset=getDropDownItems(dropdown);
								if (!dropdown.fields){
									if (isTrue(dropdown.mapValue))
										dropdown.fields="label";
									else
										dropdown.fields="value";
								}
							}
							else{
								_dataset=dropdown.dataset;
								if (typeof(_dataset)=="string") _dataset=getDatasetByID(_dataset);
							}

							if (_dataset){
								setElementDataset(_dropdown_table, _dataset);
								_dropdown_table.fields=dropdown.fields;
								initElements(_dropdown_table);
								refreshTableData(_dropdown_table);
							}
							_initDropDownBox(dropdown.type);
							break;
						}
					}
				}
				else{
					switch (dropdown.type){
						case "db":;
						case "custom":{
							_dropdown_frame=_dropdown_box.firstChild;
							dropdown.dropdown_window._initDropDownBox(dropdown.type);
							break;
						}

						default:{
							if (getIEVersion()<"5.5"){
								for (var i=0; i<_dropdown_box.children.length; i++){
									_dropdown_box.children[i].style.visibility="visible";
								}
							}
							_dropdown_table=dropdown.dropdown_table;
							_initDropDownBox(dropdown.type);
							break;
						}
					}
				}
			}
			_editor.dropDownVisible=true;
			if  (typeof(_dropdown_btn)!="undefined") _dropdown_btn.value="5";
		}
	}
	catch(e){
		processException(e);
	}
}

function hideDropDownBox(){
	if (!_dropdown_box) return;
	if (isDropdownBoxVisible()){
		_skip_activeChanged=true;
		var editor=_dropdown_box.editor;
		var dropdown=_dropdown_box.dropDown;
		if (_dropdown_box.prepared && dropdown.cache){
			dropdown.dropdown_box=_dropdown_box;
			_dropdown_box.cached=true;
			switch (dropdown.type){
				case "list":;
				case "dataset":{
					dropdown.dropdown_table=_dropdown_table;
					break;
				}
				case "db":;
				case "custom":{
					dropdown.dropdown_window=_dropdown_window;
					break;
				}
			}

			if (getIEVersion()<"5.5"){
				for (var i=0; i<_dropdown_box.children.length; i++){
					_dropdown_box.children[i].style.visibility="hidden"
				}
			}
			_dropdown_box.style.visibility="hidden";
			_dropdown_window=null;
		}
		else{
			_dropdown_box.editor=null;
			switch (_dropdown_box.dropDown.type){
				case "list":
				case "dataset":{
					setElementDataset(_dropdown_table, null);
					break;
				}
				case "db":;
				case "custom":{
					if (typeof(_dropdown_frame)!="undefined"){
						_dropdown_frame.style.visibility="hidden";
						_dropdown_frame.removeNode(true);
					}
					break;
				}
			}
			_dropdown_window=null;

			if (getIEVersion()<"5.5"){
				for (var i=0; i<_dropdown_box.children.length; i++){
					_dropdown_box.children[i].style.visibility="hidden"
				}
			}
			_dropdown_box.style.visibility="hidden";
			_dropdown_box.removeNode(true);
			_dropdown_box=null;
		}

		editor.dropDownVisible=false;
		if  (typeof(_dropdown_btn)!="undefined") _dropdown_btn.value="6";
	}
}

function isDropDownBtnVisible(){
	if  (typeof(_dropdown_btn)!="undefined")
		return (_dropdown_btn.style.visibility=="visible")
	else
		return false;
}

function sizeDropDownBtn(_editor){
	if (!isDropDownBtnVisible()) return;
	with (_dropdown_btn){
		var pos=getAbsPosition(_editor);

		style.height=_editor.offsetHeight-2;
		style.width=16;
		style.posLeft=pos[0]+_editor.offsetWidth-offsetWidth-1;
		style.posTop=pos[1]+1;
	}
}

function showDropDownBtn(_editor){
	if (!canDropDown(_editor)) return;
	getDropDownBtn();
	if (typeof(_dropdown_btn)=="undefined") return;

	with (_dropdown_btn){
		if (!isDropDownBtnVisible()){
			setAttribute("editor", _editor);
			style.visibility="visible";
			sizeDropDownBtn(_editor);

			var oldWidth=_editor.offsetWidth;
			_editor.style.borderRightWidth=18;
			_editor.style.width=oldWidth;
		}
	}
}

function hideDropDownBtn(){
	if  (typeof(_dropdown_btn)=="undefined") return;

	if (isDropDownBtnVisible()){
		var editor=_dropdown_btn.editor;
		if (editor){
			var oldWidth=editor.offsetWidth;
			editor.style.borderRightWidth=1;
			editor.style.width=oldWidth;
		}
		_dropdown_btn.style.visibility="hidden";
		_dropdown_btn.editor=null;
	}
}

function _dropdown_btn_onmousedown(button){
	var obj=button.editor;
	if (!isDropdownBoxVisible()){
		if (obj) showDropDownBox(obj);
	}
	else
		hideDropDownBox();
}

function _dropdown_btn_onfocus(button){
	var obj=button.editor;
	if (obj) obj.focus();
}

function createListTable(parent_element){
	_dropdown_table=document.createElement("<table extra=datatable isDropDownTable=true readOnly=true width=100% "+
		" cellspacing=0 cellpadding=2 rules=all></table>");

	if (parent_element)
		parent_element.appendChild(_dropdown_table);
	else
		document.body.appendChild(_dropdown_table);
}

function dropDownLocate(){
	var editor=_dropdown_parentbox.editor;
	var dropdown=_dropdown_parentbox.dropDown;
	switch (dropdown.type){
		case "date":{
			var _date=new Date(editor.value);
			if (!isNaN(_date)) setCalendarDate(_date);
			break;
		}
		default:{
			if (_dropdown_dataset){
				var fieldName;

				if (dropdown.type=="list"){
					fieldName=(isTrue(dropdown.mapValue))?"label":"value";
				}
				else{
					fieldName=dropdown.dataField;
					if (!fieldName) fieldName=editor.getAttribute("dataField");
				}

				var value=editor.value;
				var record=_dropdown_dataset.locate(fieldName, value);
				if (record) _dropdown_dataset.setRecord(record);
			}
			break;
		}
	}
}

function hideDropDown() {
	var editor=_dropdown_parentbox.editor;
	_dropdown_parentwindow.hideDropDownBox();
	editor.focus();
}

function _standard_dropdown_keyDown(keycode){
	switch(keycode){
		//PageUp
		case 33:{
			if (_dropdown_dataset){
				var pageIndex=(_dropdown_dataset.record)?_dropdown_dataset.record.pageIndex-1:1;
				_dropdown_dataset.moveToPage(pageIndex);
			}
			break;
		}
		//PageDown
		case 34:{
			if (_dropdown_dataset){
				var pageIndex=(_dropdown_dataset.record)?_dropdown_dataset.record.pageIndex+1:1;
				_dropdown_dataset.moveToPage(pageIndex);
			}
			break;
		}
		//Up
		case 38:{
			if (_dropdown_dataset){
				_dropdown_dataset.movePrev();
			}
			break;
		}
		//Down
		case 40:{
			if (_dropdown_dataset){
				_dropdown_dataset.moveNext();
			}
			break;
		}
	}
}

function processDropDownKeyDown(keycode) {
	switch(keycode){
		//Enter
		case 13:{
			dropDownSelected();
			break;
		}
		//ESC
		case 27:{
			hideDropDown();
			break;
		}
		//F2
		case 113:{
			hideDropDown();
			break;
		}
		//F7
		case 118:{
			hideDropDown();
			break;
		}
		default:{
			switch (_dropdown_parentbox.dropDown.type){
				case "list":
				case "dataset":
				case "db":{
					_standard_dropdown_keyDown(keycode);
					break;
				}
				case "date":{
					_calendar_onkeydown();
					break;
				}
				default:{
					if (typeof(dropDown_onKeyDown)!="undefined") dropDown_onKeyDown(keycode);
					break;
				}
			}
		}
	}
}

function dropDownSelected(){
	var record;
	switch (_dropdown_parentbox.dropDown.type){
		case "list":
		case "dataset":
		case "db":{
			if (_dropdown_dataset) record=_dropdown_dataset.record;
			break;
		}
		case "date":{
			_tmp_dataset_date=createDataset("_tmp_dataset_date");
			_tmp_dataset_date.addField("value");
			initDataset(_tmp_dataset_date);
			_tmp_dataset_date.insertRecord();
			_tmp_dataset_date.setValue("value", new Date(_calendarControl.year, _calendarControl.month, _calendarControl.day));
			_tmp_dataset_date.updateRecord();
			record=_tmp_dataset_date.record;
			break;
		}
		default:{
			if (typeof(dropDown_onGetRecord)!="undefined") record=dropDown_onGetRecord();
			break;
		}
	}

	if (record){
		_dropdown_parentwindow.processDropDownSelected(_dropdown_parentbox.editor, record, false);
		hideDropDown();
	}
	if (_tmp_dataset_date) freeDataset(_tmp_dataset_date);
}

function _dropdown_onkeydown(){
	processDropDownKeyDown(event.keyCode);
}

function _dropdown_onclick(){
	dropDownSelected();
	event.cancelBubble=true;
}

function getDropDownItems(dropdown){
        var items=dropdown._items;
        if (!items){
                initDropDownItems(dropdown);
                items=dropdown._items;
        }
        return items;
}

function _initDropDownItems(itemsStr, mapValue){
        if (!itemsStr) return null;
        var splitStr=";";
        var arrayItem=createDataset();
        arrayItem.id="_dropDown_items";
        arrayItem.readOnly=true;

        if (mapValue){
                var field;
                field=arrayItem.addField("label");
                field=arrayItem.addField("value");
                field.visible=false;

                var tmp=itemsStr.split(splitStr);
                var index;
                for (var i=0; i<tmp.length; i++ ){
                        index=tmp[i].indexOf("=");
                        record=new Array();
                        record[0]=getDecodeStr(tmp[i].substr(0, index));
                        record[1]=getDecodeStr(tmp[i].substr(index+1));
                        pArray_insert(arrayItem, "end", null, record);
                }

        }
        else{
                arrayItem.addField("value");

                var tmp=itemsStr.split(splitStr);
                for (var i=0; i<tmp.length; i++ ){
                        record=new Array();
                        record[0]=getDecodeStr(tmp[i]);
                        pArray_insert(arrayItem, "end", null, record);
                }
        }
        return arrayItem;
}

function initDropDownItems(dropdown){
        if (!dropdown.items) return;
        var items=_initDropDownItems(dropdown.items, isTrue(dropdown.mapValue));
        if (!items) return;
        initDataset(items);
        dropdown._items=items;
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var _calendar_days;

function _calendar_year_onpropertychange(){
	if (!_calender_year.processing && event.propertyName=="value"){
		if (_calender_year.value.length==4){
			_calender_year.processing=true;
			changeCalendarDate(getInt(_calender_year.value), _calendarControl.month);
			_calender_year.processing=false;
		}
	}
}

function _calendar_month_onpropertychange(){
	if (!_calender_month.processing && _activeElement==_calender_month && event.propertyName=="value"){
		if (_calender_month.value.length>0){
			_calender_month.processing=true;
			changeCalendarDate(_calendarControl.year, getInt(_calender_month.value-1));
			_calender_month.processing=false;
		}
	}
}

function createCalendar(parent_element){

	function calendar(){
	 	var today=new Date()
	 	this.todayDay=today.getDate();
		this.todayMonth=today.getMonth();
		this.todayYear=today.getFullYear();
	 	this.activeCellIndex=0;
	}

	_calendar_days=new Array(constSunday, constMonday, constTuesday, constWednesday, constThursday, constFriday, constSaturday);
	_calendarControl=new calendar();

	var tmpHTML="";
	tmpHTML+="<TABLE id=\"CalendarTable\" class=\"calendar\" width=200px cellspacing=0 cellpadding=1 rule=all>";
	tmpHTML+="<TR class=\"title\" valign=top><TD>";
	tmpHTML+="<TABLE WIDTH=100% CELLSPACING=1 CELLPADDING=0>";
	tmpHTML+="<TR><TD align=right>";
	tmpHTML+="<INPUT type=button extra=button value=3 title=\""+constLastYear+"\" style=\"FONT-SIZE:8;FONT-FAMILY:webdings;WIDTH:18px;HEIGHT:20px\" onclick=\"changeCalendarDate(_calendarControl.year-1,_calendarControl.month)\">";
	tmpHTML+="</TD><TD width=1>";
	tmpHTML+="<INPUT id=\"_calender_year\" type=text class=editor size=4 maxlength=4 onpropertychange=\"return _calendar_year_onpropertychange()\">";
	tmpHTML+="</TD><TD align=left width=20px>";
	tmpHTML+="<INPUT type=button extra=button value=4 title=\""+constNextYear+"\" style=\"FONT-SIZE:8;FONT-FAMILY:webdings;WIDTH:18px;HEIGHT:20px\" onclick=\"changeCalendarDate(_calendarControl.year+1,_calendarControl.month)\">";
	tmpHTML+="</TD>";
	tmpHTML+="<TD align=right width=20px>";
	tmpHTML+="<INPUT type=button extra=button value=3 title=\""+constLastMonth+"\" style=\"FONT-SIZE:8;FONT-FAMILY:webdings;WIDTH:18px;HEIGHT:20px\" onclick=\"changeCalendarDate(_calendarControl.preYear,_calendarControl.preMonth)\">";
	tmpHTML+="</TD><TD width=1>";
	tmpHTML+="<INPUT id=\"_calender_month\" type=text class=editor size=2 maxlength=2 onpropertychange=\"return _calendar_month_onpropertychange()\">";
	tmpHTML+="</TD><TD align=left>";
	tmpHTML+="<INPUT type=button extra=button value=4 title=\""+constNextMonth+"\" style=\"FONT-SIZE: 8;FONT-FAMILY:webdings;WIDTH:18px;HEIGHT:20px\" onclick=\"changeCalendarDate(_calendarControl.nextYear,_calendarControl.nextMonth)\">";
	tmpHTML+="</TD></TR>";
	tmpHTML+="</TABLE></TD></TR>";

	tmpHTML+="<TR><TD>";
	tmpHTML+="<TABLE border=1 bordercolor=silver id=\"calendarData\" HEIGHT=100% WIDTH=100% CELLSPACING=0 CELLPADDING=0 style=\"BORDER-COLLAPSE: collapse\"";
	tmpHTML+="onclick=\"_calendar_cell_onclick(event.srcElement)\">";
	tmpHTML+="<TR height=20px style=\"background-image: url(images/tabs/table_title.gif)\">";
	for (var i=0;i<=6;i++){
		tmpHTML+="<TD align=center>"+_calendar_days[i]+"</TD>";
	}
	tmpHTML+="</TR>";
	for(var i=0;i<=5;i++){
		tmpHTML+="<TR>";
		for(var j=0;j<=6;j++){
			tmpHTML+="<TD align=center></TD>";
		}
		tmpHTML+="</TR>";
	}
	tmpHTML+="</TABLE></TD></TR>";

	tmpHTML+="<TR class=\"footer\"><TD align=right>";
	tmpHTML+="<INPUT extra=button type=button id=\"button_today\" value=\""+constToday+" "+_calendarControl.todayYear+"-"+(_calendarControl.todayMonth+1)+"-"+_calendarControl.todayDay+"\" onclick=\"_calendar_today_onclick()\"";
	tmpHTML+="</TD></TR></TABLE>";
	if (parent_element)
		parent_element.innerHTML=tmpHTML;
	else
		document.body.innerHTML=tmpHTML;

	initElements(CalendarTable);
	changeCalendarDate(_calendarControl.todayYear,_calendarControl.todayMonth,_calendarControl.todayDay)
}

function setCalendarDate(date){
	changeCalendarDate(date.getFullYear(),date.getMonth(),date.getDate());
}

function changeCalendarDate(year, month, day){
	if (_calendarControl.year==year && _calendarControl.month==month && (!day || _calendarControl.day==day)) return;

	if (_calendarControl.year!=year || _calendarControl.month!=month){
		_calendarControl.year=year;
		_calendarControl.month=month;

		if (month==0){
			 _calendarControl.preMonth=11
			 _calendarControl.preYear=_calendarControl.year-1
		}else{
			 _calendarControl.preMonth=_calendarControl.month-1
			 _calendarControl.preYear=_calendarControl.year
		}
		if (month==11){
			_calendarControl.nextMonth=0
			_calendarControl.nextYear=_calendarControl.year+1
		}else{
			_calendarControl.nextMonth=_calendarControl.month+1
			_calendarControl.nextYear=_calendarControl.year

		}
		_calendarControl.startday=(new Date(year,month,1)).getDay()
		if (_calendarControl.startday==0) _calendarControl.startday=7
		var curNumdays=getNumberOfDays(_calendarControl.month,_calendarControl.year)
		var preNumdays=getNumberOfDays(_calendarControl.preMonth,_calendarControl.preYear)
		var nextNumdays=getNumberOfDays(_calendarControl.nextMonth,_calendarControl.nextYear)
		var startDate=preNumdays-_calendarControl.startday+1
		var endDate=42-curNumdays-_calendarControl.startday

		_calender_month.value=(_calendarControl.month+1);
		_calender_year.innerText=_calendarControl.year

		var datenum=0;
		for (var i=startDate;i<=preNumdays;i++){
			var cell = calendarData.cells[datenum+7];
			cell.monthAttribute="pre";
			cell.className="cell_trailing";
			cell.innerText=i;
			datenum++;
		}
		for (var i=1;i<=curNumdays;i++){
			var cell = calendarData.cells[datenum+7];
			cell.monthAttribute="cur";
			if (datenum != _calendarControl.activeCellIndex){
				cell.className="cell_day";
			}
			cell.innerText=i;
			datenum++;
		}
		for (var i=1;i<=endDate;i++){
			var cell = calendarData.cells[datenum+7];
			cell.monthAttribute="next";
			cell.className="cell_trailing";
			cell.innerText=i;
			datenum++;
		}
	}

	if (day) _calendarControl.day=day;
	setCalendarActiveCell(calendarData.cells[_calendarControl.day+_calendarControl.startday-1+7]);
}

function setCalendarActiveCell(cell){

	function setActiveCell(cellIndex){
		var cell = calendarData.cells[_calendarControl.activeCellIndex+7];
		if (cell.monthAttribute=="cur"){
			cell.className="cell_day";
		}
		else{
			cell.className="cell_trailing";
		}

		var cell = calendarData.cells[cellIndex+7];
		cell.className="cell_selected";

		_calendarControl.activeCellIndex=cellIndex;
	}

	if (cell.tagName.toLowerCase()!="td") return;
	var _activeCellIndex=cell.parentElement.rowIndex*7+cell.cellIndex-7;

	with(_calendarControl){
		if (activeCellIndex==_activeCellIndex) return;

		var monthAttribute=cell.monthAttribute;
		switch (monthAttribute){
			case "pre":{
				changeCalendarDate(preYear,preMonth,getNumberOfDays(preMonth,preYear)-startday+_activeCellIndex+1);
				setActiveCell(startday+day-1);
				break
			}
			case "cur":{
				changeCalendarDate(year,month,_activeCellIndex-startday+1);
				setActiveCell(_activeCellIndex);
				break
			}
			case "next":{
				changeCalendarDate(nextYear,nextMonth,_activeCellIndex-getNumberOfDays(month,year)-startday+1);
				setActiveCell(startday+day-1);
				break
			}
		}
	}
}

function _calendar_cell_onclick(cell){
	setCalendarActiveCell(cell);
	dropDownSelected();
}

function _calendar_onkeydown(){
	switch(event.keyCode){
		case 33:{//PgUp
			if (event.ctrlKey){
				changeCalendarDate(_calendarControl.year-1,_calendarControl.month)
			}else{
				changeCalendarDate(_calendarControl.preYear,_calendarControl.preMonth)
			}
			break
		}
		case 34:{//PgDn
			if (event.ctrlKey){
				 changeCalendarDate(_calendarControl.year+1,_calendarControl.month)
			}else{
				 changeCalendarDate(_calendarControl.nextYear,_calendarControl.nextMonth)
			}
			break
		}
		case 35:{//End
		    	var index=getNumberOfDays(_calendarControl.month,_calendarControl.year) +_calendarControl.startday-1
			setCalendarActiveCell(calendarData.cells[index+7+7])
			break
		}
		case 36:{//Home
			setCalendarActiveCell(calendarData.cells[_calendarControl.startday+7+7])
			break
		}
		case 37:{//<--
			var index=_calendarControl.activeCellIndex-1;
			if (index<0) index=0;
			setCalendarActiveCell(calendarData.cells[index+7])
			break
		}
		case 38:{//上箭头
			if (_calendarControl.activeCellIndex<14){
				var day=getNumberOfDays(_calendarControl.preMonth,_calendarControl.preYear)+_calendarControl.day-7;
				setCalendarDate(new Date(_calendarControl.preYear, _calendarControl.preMonth, day));
			}
			else{
				var index=_calendarControl.activeCellIndex-7;
				setCalendarActiveCell(calendarData.cells[index+7]);
			}
			break
		}
		case 39:{//-->
			var index=_calendarControl.activeCellIndex+1;
			if (index>=calendarData.cells.length-7) index=calendarData.cells.length-8;
			setCalendarActiveCell(calendarData.cells[index+7])
			break
		}
		case 40:{//下箭头
			if (_calendarControl.activeCellIndex>41){
				var day=7-(getNumberOfDays(_calendarControl.month,_calendarControl.year)-_calendarControl.day);
				setCalendarDate(new Date(_calendarControl.nextYear, _calendarControl.nextMonth, day));
			}
			else{
				var index=_calendarControl.activeCellIndex+7;
				setCalendarActiveCell(calendarData.cells[index+7]);
			}
			break
		}
	}
}

function _calendar_today_onclick(){
	changeCalendarDate(_calendarControl.todayYear,_calendarControl.todayMonth,_calendarControl.todayDay)
	var index=_calendarControl.todayDay+_calendarControl.startday-1;
	setCalendarActiveCell(calendarData.cells[index+7]);
	dropDownSelected();
}

function getNumberOfDays(month,year){
	var numDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31)
	n=numDays[month]
	if (month==1 && (year%4==0 && year%100!=0 || year%400==0)) n++
	return n
}