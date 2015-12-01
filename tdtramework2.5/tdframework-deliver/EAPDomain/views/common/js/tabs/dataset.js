function _downloadData(dataset, pageSize, pageIndex){
	try{
		if (dataset.sessionKey){
			var _url=_extra_library+"datasetservice?sessionkey="+dataset.sessionKey;
			_url+="&pagesize="+getValidStr(pageSize);

			if (pageIndex)
				_url+="&pageindex="+getValidStr(pageIndex);
			else
				_url+="&pageindex=1";

			for(var i=0; i<dataset.parameters.length; i++){
				_url+="&"+dataset.parameters[i].name+"="+dataset.parameters[i].value;
			}

			var XMLDoc=new ActiveXObject("MSXML");
			XMLDoc.url=_url;

			var XMLRoot=XMLDoc.root;
			if (isTrue(XMLRoot.children.item("Succeed").text)){
				var datasetRoot=XMLRoot.children.item("Dataset");
				var result=new Object();
				result.fieldStr=getValidStr(datasetRoot.children.item("Fields").text);
				result.recordStr=getValidStr(datasetRoot.children.item("Data").text);
				result.pageCount=getInt(datasetRoot.children.item("PageSize").text);
				result.pageIndex=getInt(datasetRoot.children.item("PageIndex").text);
				result.pageCount=getInt(datasetRoot.children.item("pageCount").text);
				delete XMLDoc;
				return result;
			}
			else{
				var error_text=XMLRoot.children.item("Error").text;
				delete XMLDoc;
				throw constErrDownLoadFailed+"\n"+constErrDescription+":"+error_text;
			}
		}
	}
	catch(e){
		processException(e);
	}
}

function getDatasetByID(ID){
	for(var i=0; i<_array_dataset.length; i++){
		if (_array_dataset[i].id==ID) return _array_dataset[i];
	}

	var result;
	eval("if (typeof("+ID+")!=\"undefined\") result="+ID+";");
	return result;
}

function setElementDataset(element, dataset){
	var _dataset;
	if (typeof(dataset)=="string"){
		_dataset=getDatasetByID(dataset);
	}
	else{
		_dataset=dataset;
	}
	var old_dataset=element.getAttribute("dataset");

	if (old_dataset){
		var array=old_dataset.editors;
		if (array) pArray_ex_delete(array, element);
	}

	if (_dataset){
		var array=_dataset.editors;
		if (!array){
			array=new pArray();
			_dataset.editors=array;
		}

		pArray_ex_insert(array, element);
	}
	element.dataset=_dataset;
}

function _dataset_getField(fields, fieldName){
	var field=null;
	if (typeof(fieldName)=="number"){
		field=fields[fieldName];
	}
	else if (typeof(fieldName)=="string"){
		var fieldIndex=fields["_index_"+fieldName.toLowerCase()];
		if (!isNaN(fieldIndex)) field=fields[fieldIndex];
	}
	return field;
}

function dataset_getField(fieldName){
	var dataset=this;
	return _dataset_getField(dataset.fields, fieldName);
}

function appendFromDataString(dataset, recordStr, init){
	if (!recordStr) return;
	var records=recordStr.split(";");
	for(var i=0; i<records.length; i++){
		var record=records[i].split(",");
		for(var j=0; j<record.length; j++){
			record[j]=getDecodeStr(record[j]);
		}
		pArray_insert(dataset, "end", null, record);
		if (init) initRecord(record, dataset);
	}
}

function transferToDataString(dataset){
	var result="";
	var i=0;
	var record=dataset.getFirstRecord();
	while (record){
		if (i!=0) result+=";";
		for(var j=0; j<dataset.fields.fieldCount; j++){
			if (j!=0) result+=",";
			result+=getEncodeStr(record.getString(j));
		}
		record=record.getNextRecord();
		i++;
	}
	return result;
}

function createDataset(ID, fieldStr, recordStr){
	var dataset=new pArray();

	dataset.fields=new Array();
	dataset.parameters=createParameters();
	dataset.updateItems=new Array();
	dataset.fields.fieldCount=0;
	dataset.addField=dataset_addField;
	dataset.pageSize=9999;
	dataset.pageCount=1;
	dataset.pageIndex=1;
	dataset.autoLoadPage=true;

	dataset._saveOldValue=record_saveOldValue;
	dataset._getValue=record_getValue;
	dataset._getString=record_getString;
	dataset._setValue=record_setValue;
	dataset._getPrevRecord=record_getPrevRecord;
	dataset._getNextRecord=record_getNextRecord;

	dataset.getField=dataset_getField;
	dataset.getValue=dataset_getValue;
	dataset.getString=dataset_getString;
	dataset.setValue=dataset_setValue;
	dataset.disableControls=dataset_disableControls;
	dataset.enableControls=dataset_enableControls;
	dataset.disableEvents=dataset_disableEvents;
	dataset.enableEvents=dataset_enableEvents;
	dataset.refreshControls=dataset_refreshControls;
	dataset.setRecord=dataset_setRecord;
	dataset.setReadOnly=dataset_setReadOnly;
	dataset.setFieldReadOnly=dataset_setFieldReadOnly;
	dataset.getFirstRecord=dataset_getFirstRecord;
	dataset.getLastRecord=dataset_getLastRecord;
	dataset.move=dataset_move;
	dataset.movePrev=dataset_movePrev;
	dataset.moveNext=dataset_moveNext;
	dataset.moveFirst=dataset_moveFirst;
	dataset.moveLast=dataset_moveLast;
	dataset.find=dataset_find;
	dataset.locate=dataset_locate;
	dataset.updateRecord=dataset_updateRecord;
	dataset.cancelRecord=dataset_cancelRecord;
	dataset.insertRecord=dataset_insertRecord;
	dataset.deleteRecord=dataset_deleteRecord;
	dataset.copyRecord=dataset_copyRecord;
	dataset.loadPage=dataset_loadPage;
	dataset.loadDetail=dataset_loadDetail;
	dataset.isPageLoaded=dataset_isPageLoaded;
	dataset.moveToPage=dataset_moveToPage;
	dataset.setMasterDataset=dataset_setMasterDataset;
	dataset.flushData=dataset_flushData;
	dataset.clearData=dataset_clearData;
	dataset.sort=dataset_sort;
	dataset.setParameter=dataset_setParameter;
	dataset.getParameter=dataset_getParameter;
	dataset.getParameterName=dataset_getParameterName;
	dataset.getParameterCount=dataset_getParameterCount;

	if (ID){
		dataset.id=ID;
		_array_dataset[_array_dataset.length]=dataset;
	}

	if (fieldStr){
		var fields=fieldStr.split(",");
		for(var i=0; i<fields.length; i++){
			dataset.addField(fields[i]);
		}
	}

	appendFromDataString(dataset, recordStr);

	return dataset;
}

function dataset_setParameter(name, value){
	this.parameters.setParameter(name, value);
}

function dataset_getParameter(name){
	return this.parameters.setParameter(name);
}

function dataset_getParameterName(index){
	return this.parameters.getParameterName(index);
}

function dataset_getParameterCount(){
	var dataset=this;
	return dataset.parameters.length;
}

function dataset_addField(name, dataType){
	var dataset=this;
	try{
		if (getValidStr(name)=="")
			throw constErrEmptyFieldName;

		if (dataset.prepared)
			throw constErrAddDataField;

		var _name=name.toLowerCase();
		var field=new Object;
		var i=dataset.fields.length;
		dataset.fields["_index_"+_name]=i;
		dataset.fields[i]=field;
		dataset.fields.fieldCount++;
		field.index=i;
		field.dataset=dataset;
		field.fields=dataset.fields;
		field.name=_name;
		field.label=_name;
		field.fieldName=name;
		field.dataType=dataType;

		switch (dataType){
			case "string":{
				field.editorType="text";
				field.align="left";
				field.vAlign="top";
				break;
			}
			
			case "byte":;
			case "short":;
			case "int":;
			case "long":;
			case "float":;
			case "double":;
			case "bigdecimal":{
				field.editorType="text";
				field.align="right";
				field.vAlign="top";
				break;
			}

			case "boolean":{
				field.editorType="checkbox";
				field.align="middle";
				field.vAlign="middle";
				break;
			}

			case "date":{
				field.editorType="text";
				field.align="left";
				field.vAlign="top";
				field.size=10;
				break;
			}

			case "time":{
				field.editorType="text";
				field.align="left";
				field.vAlign="top";
				field.size=8;
				break;
			}

			case "timestamp":{
				field.editorType="text";
				field.align="left";
				field.vAlign="top";
				field.size=19;
				break;
			}

			default:{
				field.editorType="text";
				field.align="left";
				field.vAlign="top";
				break;
			}
		}

		return field;
	}
	catch(e){
		processException(e);
	}
}

function _addUpdateItem(dataset) {
	var item=new Object();
	dataset.updateItems[dataset.updateItems.length]=item;
	return item;
}

function initFieldArray(dataset, fields){
	var fieldCount=fields.fieldCount;
	fields.dataset=dataset;

	for(var i=0; i<fieldCount; i++){
		if (dataset.id){
			if (fields[i].id && typeof(_element_property)!="undefined"){
				var root=_element_property[fields[i].id];
				if (root){
					var property_count=root.length;
					for(var j=0; j<property_count; j++)
						eval("fields[i]."+root[j].property+"=getDecodeStr(root[j].value)");
				}
			}
		}

		fields[fieldCount+i]=new Object;
		fields[fieldCount+i].name="_cur_"+fields[i].name;
		fields[fieldCount+i].dataType=fields[i].dataType;
		fields["_index__cur_"+fields[i].name]=fieldCount+i;
		fields[fieldCount*2+i]=new Object;
		fields[fieldCount*2+i].name="_old_"+fields[i].name;
		fields[fieldCount*2+i].dataType=fields[i].dataType;
		fields["_index__old_"+fields[i].name]=fieldCount*2+i;

		fields[i].readOnly=isTrue(fields[i].readOnly);
		fireDatasetEvent(dataset, "onInitField", [dataset, fields[i]]);
	}
}

function initRecord(record, dataset, skipSaveOld){
	record.dataset=dataset;
	record.fields=dataset.fields;
	record.recordState="none";
	record.pageIndex=dataset.pageIndex;
	record.visible=true;

	record.saveOldValue=dataset._saveOldValue;
	record.getValue=dataset._getValue;
	record.getString=dataset._getString;
	record.setValue=dataset._setValue;
	record.getPrevRecord=dataset._getPrevRecord;
	record.getNextRecord=dataset._getNextRecord;

	if (!skipSaveOld) record.saveOldValue();
}

function initDataset(dataset){
	if (dataset.prepared) return;

	dataset.disableControlCount=1;
	dataset.disableEventCount=1;
	try{
		if (dataset.id && typeof(_element_property)!="undefined"){
			var root=_element_property[dataset.id];
			if (root){
				var property_count=root.length;
				for(var i=0; i<property_count; i++)
					eval("dataset."+root[i].property+"=getDecodeStr(root[i].value)");
			}
		}

		dataset.window=window;

		dataset.bof=true;
		dataset.eof=true;
		dataset.state="none";
		dataset.readOnly=isTrue(dataset.readOnly);
		dataset.sortFields="";
		dataset.loadedPage=new Array();
		if (dataset.pageIndex>0) dataset.loadedPage[dataset.pageIndex-1]=true;		

		fireDatasetEvent(dataset, "onInitDataset", [dataset]);
		dataset.setReadOnly(isTrue(dataset.readOnly));
		initFieldArray(dataset, dataset.fields);
		var record=dataset.firstUnit;
		while (record){
			initRecord(record, dataset);
			record=record.nextUnit;
		}

		if (dataset.pageIndex==1 || !dataset.autoLoadPage){
			dataset.moveFirst();
		}
		else {
			dataset.setRecord(dataset.getFirstRecord());
		}

		dataset.prepared=true;
	}
	finally{
		dataset.disableControlCount=0;
		dataset.disableEventCount=0;
	}
}

function _dataset_setMasterDataset(dataset, masterDataset, referencesString){
	if (dataset.masterDataset){
		var array=dataset.masterDataset.detailDatasets;
		if (array) pArray_ex_delete(array, dataset);
	}

	if (typeof(masterDataset)=="string") masterDataset=getDatasetByID(masterDataset);
	dataset.masterDataset=masterDataset;
	if (masterDataset){
		var array=masterDataset.detailDatasets;
		if (!array){
			array=new pArray();
			masterDataset.detailDatasets=array;
		}
		pArray_ex_insert(array, dataset);

		var refs=referencesString.split(";");
		var field, fieldName;
		dataset.references=new Array();
		for(var i=0; i<refs.length; i++){
			var index=refs[i].indexOf("=");
			dataset.references[i]=new Object();

			if (index>=0){
				fieldName=refs[i].substr(0, index);
			}
			else{
				fieldName=refs[i];
			}
			field=masterDataset.getField(fieldName);

			if (field){
				dataset.references[i].masterField=field.name;
				dataset.references[i].masterIndex=field.index;
			}
			else
				throw constErrCantFindMasterField.replace("%s", fieldName);

			if (index>=0){
				fieldName=refs[i].substr(index+1);
			}
			else{
				fieldName=refs[i];
			}
			field=dataset.getField(fieldName);

			if (field){
				dataset.references[i].detailField=field.name;
				dataset.references[i].detailIndex=field.index;
			}
			else{
				throw constErrCantFindDetailField.replace("%s", fieldName);
			}
		}
		delete refs;

		delete dataset.loaded_detail;
		dataset.loaded_detail=new Array;
		masterDataset.loadDetail();
	}
}

function dataset_setMasterDataset(masterDataset, referencesString){
	var dataset=this;
	try{
		_dataset_setMasterDataset(dataset, masterDataset, referencesString);
	}
	catch (e){
		processException(e);
	}
}

function _dataset_loadDetail(dataset){
	if (dataset.detailDatasets){
		var unit=dataset.detailDatasets.firstUnit;
		while (unit && unit.data){
			try{
				var detail_dataset=unit.data;

				var keycode_founded=false;
				if (dataset.record) {
					var keycode="";
					for(var i=0; i<detail_dataset.references.length; i++){
						keycode+=dataset.record[detail_dataset.references[i].masterIndex];
					}

					
					for(var i=0; i<detail_dataset.loaded_detail.length; i++){
						if (detail_dataset.loaded_detail[i]==keycode){
							keycode_founded=true;
							break;
						}
					}
				}

				if (!keycode_founded){
					var dataset_inserted=false;
					var event_result=fireDatasetEvent(detail_dataset, "beforeLoadDetail", [detail_dataset, dataset]);
					if (event_result) throw event_result;

					if (detail_dataset.references.length>0) {
						for(var i=0; i<detail_dataset.references.length; i++){
							detail_dataset.setParameter(detail_dataset.references[i].masterField,
								dataset.getValue(detail_dataset.references[i].masterIndex));
						}

						var result=_downloadData(detail_dataset);
						if (result && result.recordStr){
							var tmpArray=new pArray();
							appendFromDataString(tmpArray, result.recordStr);
							var record=tmpArray.lastUnit;
							while (record){
								initRecord(record, detail_dataset);
								record=record.prevUnit;
							}
							pArray_insertArray(detail_dataset, "end", null, tmpArray);
						}
						delete result;
					}

					detail_dataset.loaded_detail[detail_dataset.loaded_detail.length]=keycode;
				}
				detail_dataset.refreshControls();
				detail_dataset.moveFirst();
				unit=unit.nextUnit;
			}
			catch (e){
				processException(e);
			}
		}
	}
}

function dataset_loadDetail(){
	var dataset=this;
	try{
		_dataset_loadDetail(dataset);
	}
	catch (e){
		processException(e);
	}
}

function dataset_isPageLoaded(pageIndex){
	var dataset=this;
	return dataset.loadedPage[pageIndex-1];
}


function _dataset_loadPage(dataset, pageIndex){
	if (!dataset.autoLoadPage || pageIndex<1 || pageIndex>dataset.pageCount || dataset.isPageLoaded(pageIndex)) return;
	if (dataset.masterDataset) throw constErrLoadPageOnDetailDataset;
	if (dataset.sortFields) throw constErrLoadPageAfterSort;

	var result=_downloadData(dataset, dataset.pageSize, pageIndex);
	if (result && result.recordStr){
		var tmpArray=new pArray();
		appendFromDataString(tmpArray, result.recordStr);
		var record=tmpArray.lastUnit;
		while (record){
			initRecord(record, dataset);
			record.pageIndex=pageIndex;
			record=record.prevUnit;
		}

		var inserted=false;
		var record=dataset.lastUnit;
		while (record){
			if (record.pageIndex<pageIndex){
				pArray_insertArray(dataset, "after", record, tmpArray);
				inserted=true;
				break;
			}
			record=record.prevUnit;
		}
		if (!inserted) pArray_insertArray(dataset, "begin", null, tmpArray);
		delete tmpArray;

		dataset.loadedPage[pageIndex-1]=true;
		dataset.refreshControls();
	}
	delete result;
}

function dataset_loadPage(pageIndex){
	try{
		var dataset=this;
		_dataset_loadPage(dataset, pageIndex);
	}
	catch (e){
		processException(e);
	}
}

function _dataset_clearData(dataset){
	dataset.disableControls();
	try{
		if (dataset.loaded_detail) delete dataset.loaded_detail;
		if (dataset.loadedPage) delete dataset.loadedPage;
		dataset.loadedPage=new Array();
		if (dataset.pageIndex>0) dataset.loadedPage[dataset.pageIndex-1]=true;
		pArray_clear(dataset);
		dataset.moveFirst();
	}
	finally{
		dataset.enableControls();
		dataset.refreshControls();
	}
}

function dataset_clearData(){
	try{
		var dataset=this;
		_dataset_clearData(dataset);
	}
	catch (e){
		processException(e);
	}
}

function freeDataset(dataset){
	if (dataset.detailDatasets) pArray_clear(dataset.detailDatasets);
	if (dataset.editors) pArray_clear(dataset.editors);
	delete dataset.references;
	pArray_clear(dataset.fields);
	dataset.clearData();
	delete dataset;
}

function _dataset_flushData(dataset){
	dataset.disableControls();
	try{
		dataset.clearData();

		var result=_downloadData(dataset);
		if (result){
			if (result.recordStr)
			{
				var tmpArray=new pArray();
				appendFromDataString(tmpArray, result.recordStr);
				var record=tmpArray.lastUnit;
				while (record){
					initRecord(record, dataset);
					record=record.prevUnit;
				}
				pArray_insertArray(dataset, "end", null, tmpArray);
			}
			dataset.pageIndex=result.pageIndex;
			dataset.pageCount=result.pageCount;
		}
		delete result;
	}
	finally{
		dataset.moveFirst();
		dataset.enableControls();
		dataset.refreshControls();
	}
}

function dataset_flushData(){
	try{
		var dataset=this;
		_dataset_flushData(dataset);
	}
	catch (e){
		processException(e);
	}
}

function dataset_moveToPage(pageIndex){
	try{
		var dataset=this;
		if (!dataset.isPageLoaded(pageIndex)) _dataset_loadPage(dataset, pageIndex);

		var record=dataset.getFirstRecord();
		while (record){
			if (record.pageIndex>=pageIndex){
				_dataset_setRecord(dataset, record);
				break;
			}
			record=record.getNextRecord();
		}
	}
	catch (e){
		processException(e);
	}
}

function record_saveOldValue(){
	var record=this;

	var fieldCount=record.fields.fieldCount;
	for(var i=0; i<fieldCount; i++){
		record[fieldCount+i]=record[i];
		record[fieldCount*2+i]=record[i];
	}
}

function _dataset_sort(dataset, fields){

	function quickSort(_array, _fields, _low, _high){

		function compareRecord(record, _mid_data){
			if (_fields.length>0){
				var value1, value2;
				for (var i=0; i<_fields.length; i++){
					if (_field[i].ascend){
						value1=1;
						value2=-1;
					}
					else{
						value1=-1;
						value2=1;
					}

					if (record.getValue(_fields[i].index)>_mid_data[i]){
						return value1;
					}
					else if (record.getValue(_fields[i].index)<_mid_data[i]){
						return value2;
					}
				}
			}
			else{
				if (record.recordno>_mid_data[0]){
					return 1;
				}
				else if (record.recordno<_mid_data[0]){
					return -1;
				}
			}
			return 0;
		}

		var low=_low;
		var high=_high;
		var mid=getInt((low+high)/2);
		var mid_data=new Array();

		if (_fields.length>0){
			for (var i=0; i<_fields.length; i++)
				mid_data[i]=_array[mid].getValue(_fields[i].index);
		}
		else{
			mid_data[0]=_array[mid].recordno;
		}

		do {
			while (compareRecord(_array[low], mid_data)<0) low++;
			while (compareRecord(_array[high], mid_data)>0) high--;

			if (low<=high){
				var tmp=_array[low];
				_array[low]=_array[high];
				_array[high]=tmp;

				low++;
				high--;
			}
		}while (low<=high)

		if (high>_low) quickSort(_array, _fields, _low, high);
		if (_high>low) quickSort(_array, _fields, low, _high);
	}

	var _field=new Array();
	if (fields){
		var fields_array=fields.split(",");
		for (var i=0; i<fields_array.length; i++){
			_field[i]=new Object();
			_field[i].ascend=true;

			var firstchar=fields_array[i].substring(0, 1);
			var fieldName;
			if (firstchar=="+" || firstchar=="-"){
				if (firstchar=="-") _field[i].ascend=false;
				fieldName=fields_array[i].substring(1, fields_array[i].length);
			}
			else{
				fieldName=fields_array[i];
			}

			for (var j=0; j<dataset.fields.fieldCount; j++){
				if (compareText(fieldName, dataset.fields[j].name)){
					_field[i].index=j;
					break;
				}
			}
		}
	}

	function customSort(_array, _low, _high){

		function compareRecord(record1, record2){
			var event_name=getElementEventName(dataset, "onCompareRecord");
			if (isUserEventDefined(event_name)){
				return fireUserEvent(event_name, [record1.dataset, record1, record2]);
			}
		}

		var low=_low;
		var high=_high;
		var mid_record=_array[getInt((low+high)/2)];

		do {
			while (compareRecord(_array[low], mid_record)<0) low++;
			while (compareRecord(_array[high], mid_record)>0) high--;

			if (low<=high){
				var tmp=_array[low];
				_array[low]=_array[high];
				_array[high]=tmp;

				low++;
				high--;
			}
		}while (low<=high)

		if (high>_low) customSort(_array, _low, high);
		if (_high>low) customSort(_array, low, _high);
	}

	var _field=new Array();
	if (fields){
		if (fields!="#custom"){
			var fields_array=fields.split(",");
			for (var i=0; i<fields_array.length; i++){
				_field[i]=new Object();
				_field[i].ascend=true;

				var firstchar=fields_array[i].substring(0, 1);
				var fieldName;
				if (firstchar=="+" || firstchar=="-"){
					if (firstchar=="-") _field[i].ascend=false;
					fieldName=fields_array[i].substring(1, fields_array[i].length);
				}
				else{
					fieldName=fields_array[i];
				}

				for (var j=0; j<dataset.fields.fieldCount; j++){
					if (compareText(fieldName, dataset.fields[j].name)){
						_field[i].index=j;
						break;
					}
				}
			}
		}
	}

	if (!dataset.firstUnit) return;

	var tmp_array=new Array();
	try{
		var record=dataset.firstUnit;
		var i=0;
		while (record){
			tmp_array[i++]=record;
			if (!dataset.sortFields) record.recordno=i;
			record=record.nextUnit;
		}

		dataset.sortFields=fields;
		if (fields!="#custom"){
			quickSort(tmp_array, _field, 0, tmp_array.length-1);
		}
		else{
			customSort(tmp_array, 0, tmp_array.length-1);
		}

		dataset.firstUnit=null;
		dataset.lastUnit=null;
		for (var i=0; i<tmp_array.length; i++){
			pArray_insert(dataset, "end", null, tmp_array[i]);
		}

		dataset.refreshControls();
	}
	finally{
		delete tmp_array;
		for (var i=0; i<_field.length; i++) delete _field[i];
		delete _field;
	}
}

function dataset_sort(fields){
	try{
		var dataset=this;
		_dataset_sort(dataset, fields);
	}
	catch (e){
		processException(e);
	}
}

function dataset_setReadOnly(readOnly){
	var dataset=this;
	dataset.readOnly=readOnly;

	_broadcastDatasetMsg(_notifyDatasetStateChanged, dataset);
}

function dataset_setFieldReadOnly(fieldName, readOnly){
	var dataset=this;
	var field=dataset.getField(fieldName);
	if (field){
		field.readOnly=readOnly;
		_broadcastFieldMsg(_notifyFieldStateChanged, dataset, dataset.record, field);
	}
	else
		throw constErrCantFindField.replace("%s", dataset.id+"."+fieldName);
}

function fireDatasetEvent(dataset, eventName, param){
	if (dataset.disableEventCount>0) return;
	var result;
	result=fireUserEvent(getElementEventName(dataset, eventName), param);
	return result;
}

function dataset_isRecordValid(record){
	if (!record)
		return false;
	else{
		var result=(record.recordState!="delete" && record.recordState!="discard" && record.visible);
		var dataset=record.dataset;
		var masterDataset=dataset.masterDataset;
		if (result){
			if (masterDataset){
				if (!masterDataset.record) return false;

				for(var i=0; i<dataset.references.length; i++){
					if (masterDataset.record[dataset.references[i].masterIndex]!=
						record[dataset.references[i].detailIndex]){
							result=false;
							break;
					}
				}
			}

			if (dataset.filtered && !(record==dataset.record && dataset.state!="none")){
				var event_name=getElementEventName(dataset, "onFilterRecord");
				if (isUserEventDefined(event_name)){
					if (!fireUserEvent(event_name, [dataset, record])) result=false;
				}
			}
		}
		return result;
	}
}

function dataset_setBofnEof(dataset, BofValue, EofValue){
	if (dataset.bof!=BofValue || dataset.eof!=EofValue){
		dataset.bof=BofValue;
		dataset.eof=EofValue;
		_broadcastDatasetMsg(_notifyDatasetStateChanged, dataset, dataset.record);
	}
}

function _do_dataset_setRecord(dataset, record){
	if (dataset.record!=record){
		if (dataset.record){
			_dataset_updateRecord(dataset);
		}

		if (dataset.detailDatasets){
			var unit=dataset.detailDatasets.firstUnit;
			while (unit){
				var detailDataset=unit.data;
				_dataset_updateRecord(detailDataset);
				unit=unit.nextUnit;
			}
		}

		var event_result=fireDatasetEvent(dataset, "beforeScroll", [dataset]);
		if (event_result) throw event_result;

		dataset.record=record;
		dataset.modified=false;

		if (dataset.disableControlCount<1) dataset.loadDetail();

		fireDatasetEvent(dataset, "afterScroll", [dataset]);
		_broadcastDatasetMsg(_notifyDatasetCursorChanged, dataset, record);
	}
}

function _dataset_setRecord(dataset, record){
	_do_dataset_setRecord(dataset, record);
	if (record){
		dataset_setBofnEof(dataset, false, false);
		dataset_setBofnEof(dataset, false, false);
	}
}

function dataset_setRecord(record){
	try{
		_dataset_setRecord(this, record);
	}
	catch(e){
		processException(e);
	}
}

function validateDatasetCursor(dataset){
	var down_found=false, up_found=false;
	var curRecord=(dataset.record)?dataset.record:dataset.firstUnit;

	var record=curRecord;
	while (record){
		if (dataset_isRecordValid(record)){
			_do_dataset_setRecord(dataset, record);
			up_found=true;
			break;
		}
		record=_record_getPrevRecord(record);
	}

	var record=curRecord;
	while (record){
		if (dataset_isRecordValid(record)){
			_do_dataset_setRecord(dataset, record);
			down_found=true;
			break;
		}
		record=_record_getNextRecord(record);
	}

	if (!up_found && !down_found)
		_do_dataset_setRecord(dataset, null);

	dataset_setBofnEof(dataset, (!up_found), (!down_found));
}

function dataset_setState(dataset, state){
	dataset.state=state;

	_broadcastDatasetMsg(_notifyDatasetStateChanged, dataset, dataset.record);
	fireDatasetEvent(dataset, "onStateChanged", [dataset]);
}

function _record_getValue(record, fieldName){
	var dataset=record.dataset;
	var fields=record.fields;
	var fieldIndex=-1;
	var result;

	if (typeof(fieldName)=="number"){
		fieldIndex=fieldName;
	}
	else if (typeof(fieldName)=="string"){
		fieldIndex=fields["_index_"+fieldName.toLowerCase()];
	}

	var field=fields[fieldIndex];
	if (typeof(field)=="undefined"){
		throw constErrCantFindField.replace("%s", record.dataset.id+"."+fieldName);
	}

	result=getTypedValue(record[fieldIndex], field.dataType);

	var eventName=getElementEventName(dataset, "onGetValue");
	if (isUserEventDefined(eventName)){
			result=fireUserEvent(eventName, [dataset, field, result]);
	}

	return result;
}

function record_getValue(fieldName){
	try{
		return _record_getValue(this, fieldName);
	}
	catch(e){
		processException(e);
	}
}

function dataset_getValue(fieldName){
	var dataset=this;
	if (dataset.record)
		return dataset.record.getValue(fieldName);
	else
		return "";
}

function record_getString(fieldName){
	var record=this, field, result="";
	var field=record.dataset.getField(fieldName);

	if (field){
		var value=record.getValue(fieldName);
		switch (field.dataType){
			case "string":{
				result=getValidStr(value);
				break;
			}
			
			case "byte":;
			case "short":;
			case "int":;
			case "long":{
				if (!isNaN(value))  result=value+"";
			
				break;
			}
			case "float":;
			case "double":;
			case "bigdecimal":{
				if (!isNaN(value)) result=formatFloat(value, field.scale);
				break;
			}
						
			case "date":;
			case "time":;
			case "timestamp":{
				result=formatDateTime(value, field.dataType);
				break;
			}
			
			case "boolean":;
			default:{
				result=getValidStr(value);
				break;
			}
		}
	}
	return result;
}

function dataset_getString(fieldName){
	var dataset=this;
	if (dataset.record)
		return dataset.record.getString(fieldName);
	else
		return "";
}

function _record_setValue(record, fieldName, value){
	var dataset=record.dataset;
	var fields=record.fields;
	var fieldIndex=-1;

	if (typeof(fieldName)=="number"){
		fieldIndex=fieldName;
	}
	else if (typeof(fieldName)=="string"){
		fieldIndex=fields["_index_"+fieldName.toLowerCase()];
	}

	if (typeof(fields[fieldIndex])=="undefined"){
		throw constErrCantFindField.replace("%s", record.dataset.id+"."+fieldName);
	}

	var field=fields[fieldIndex];
	switch (field.dataType)
	{
		case "date":;
		case "time":;
		case "timestamp":
			value=getValidStr(value);
			value=new Date(value.replace(/-/g, "/"));
			break;
		case "boolean":
			value=isTrue(value);
			break;
	}
	var event_result=fireDatasetEvent(dataset, "beforeChange", [dataset, field, value]);
	if (event_result) throw event_result;

	var eventName=getElementEventName(dataset, "onSetValue");
	if (isUserEventDefined(eventName)){
			value=fireUserEvent(eventName, [dataset, field, value]);
	}

	record[fieldIndex]=value;

	dataset.modified=true;

	fireDatasetEvent(dataset, "afterChange", [dataset, field]);

	if (dataset.state=="none") dataset_setState(dataset, "modify");
	_broadcastFieldMsg(_notifyFieldDataChanged, dataset, record, field);
}

function record_setValue(fieldName, value){
	try{
		_record_setValue(this, fieldName, value);
	}
	catch(e){
		processException(e);
	}
}

function _record_getPrevRecord(record){
	var _record=record;
	while (_record){
		_record=_record.prevUnit;
		if (dataset_isRecordValid(_record)) return _record;
	}
}

function record_getPrevRecord(){
	return _record_getPrevRecord(this);
}

function _record_getNextRecord(record){
	var _record=record;
	while (_record){
		_record=_record.nextUnit;
		if (dataset_isRecordValid(_record)) return _record;
	}
}

function record_getNextRecord(){
	return _record_getNextRecord(this);
}

function dataset_setValue(fieldName, value){
	try{
		var dataset=this;
		if (dataset.record)
			dataset.record.setValue(fieldName, value);
		else
			throw constErrNoCurrentRecord;
	}
	catch(e){
		processException(e);
	}
}

function dataset_refreshCursor(dataset){
	_broadcastDatasetMsg(_notifyDatasetCursorChanged, dataset, dataset.record);
}

function dataset_disableControls(){
	var dataset=this;
	dataset.disableControlCount=dataset.disableControlCount+1;
}

function dataset_enableControls(){
	var dataset=this;
	dataset.disableControlCount=(dataset.disableControlCount>0)?dataset.disableControlCount-1:0;
	dataset_refreshCursor(dataset);

}

function dataset_disableEvents(){
	var dataset=this;
	dataset.disableEventCount=dataset.disableEventCount+1;
}

function dataset_enableEvents(){
	var dataset=this;
	dataset.disableEventCount=(dataset.disableEventCount>0)?dataset.disableEventCount-1:0;
}

function dataset_refreshControls(){
	var dataset=this;
	validateDatasetCursor(dataset);
	_broadcastDatasetMsg(_notifyDatasetRefresh, dataset);
}

function _dataset_move(dataset, count){
	var _record=dataset.record;
	if (!_record) _record=dataset.getFirstRecord();
	if (!_record) return;
	var record=_record;

	if (count>0){
		var old_pageIndex=record.pageIndex
		var eof=false;
		for(var i=0; i<count; i++){
			var pageIndex=0;

			_record=record.getNextRecord();
			if (!_record || (_record && _record.pageIndex!=old_pageIndex)){
				if (old_pageIndex<dataset.pageCount){
					if (!dataset.isPageLoaded(old_pageIndex+1)){
						if ((i+dataset.pageSize<count) && (old_pageIndex+1<dataset.pageCount)){
							i+=dataset.pageSize-1;
							_record=record;
						}
						else{
							_dataset_loadPage(dataset, old_pageIndex+1);
							_record=record.getNextRecord();
						}
					}
				}
				old_pageIndex++;
			}

			if (_record){
				record=_record;
			}
			else{
				eof=true;
				break;
			}
		}
		dataset_setBofnEof(dataset, (!dataset_isRecordValid(dataset.record)), eof);
	}
	else{
		var old_pageIndex=record.pageIndex
		var bof=false;
		for(var i=count; i<0; i++){
			var pageIndex=0;

			_record=record.getPrevRecord();
			if (!_record || (_record && _record.pageIndex!=old_pageIndex)){
				if (old_pageIndex>1){
					if (!dataset.isPageLoaded(old_pageIndex-1)){
						if ((i+dataset.pageSize<0) && (old_pageIndex>1)){
							i+=dataset.pageSize-1;
							_record=record;
						}
						else{
							_dataset_loadPage(dataset, old_pageIndex-1);
							_record=record.getPrevRecord();
						}
					}
				}
				old_pageIndex--;
			}

			if (_record){
				record=_record;
			}
			else{
				bof=true;
				break;
			}
		}
		dataset_setBofnEof(dataset, bof, (!dataset_isRecordValid(dataset.record)));
	}

	if (record) _do_dataset_setRecord(dataset, record);
}

function dataset_move(count){
	var dataset=this;
	try{
		_dataset_move(dataset, count);
	}
	catch(e){
		processException(e);
	}
}

function dataset_movePrev(){
	var dataset=this;
	try{
		_dataset_move(dataset, -1);
	}
	catch(e){
		processException(e);
	}
}

function dataset_moveNext(){
	var dataset=this;
	try{
		_dataset_move(dataset, 1);
	}
	catch(e){
		processException(e);
	}
}

function _dataset_getFirstRecord(dataset){
	var record=dataset.firstUnit;
	if (record && !dataset_isRecordValid(record)) record=record.getNextRecord();
	return record;
}

function dataset_getFirstRecord(){
	return _dataset_getFirstRecord(this);
}

function dataset_moveFirst(){
	var dataset=this;

	try{
		if (!dataset.isPageLoaded(1)) _dataset_loadPage(dataset, 1);
		_do_dataset_setRecord(dataset, dataset.getFirstRecord());
		dataset_setBofnEof(dataset, true, (!dataset_isRecordValid(dataset.record)));
	}
	catch(e){
		processException(e);
	}
}

function _dataset_getLastRecord(dataset){
	var record=dataset.lastUnit;
	if (!dataset_isRecordValid(record) && record) record=record.getPrevRecord();
	return record;
}

function dataset_getLastRecord(){
	return _dataset_getLastRecord(this);
}

function dataset_moveLast(){
	var dataset=this;

	try{
		if (!dataset.isPageLoaded(dataset.pageCount)) _dataset_loadPage(dataset, dataset.pageCount);
		_do_dataset_setRecord(dataset, dataset.getLastRecord());
		dataset_setBofnEof(dataset, (!dataset_isRecordValid(dataset.record)), true);
	}
	catch(e){
		processException(e);
	}
}

function dataset_find(fieldNames, values, startRecord){

	function isMatching(fieldNames, values, record){
		var result=true;
		for (var j=0; j<fieldNames.length && j<values.length; j++){
			if (!compareText(record.getString(fieldNames[j]), values[j])){
				result=false;
				break;
			}
		}
		return result;
	}

	if (!fieldNames || !values) return false;

	var dataset=this;
	if (!dataset.record) return;
	if (isMatching(fieldNames, values, dataset.record)) return dataset.record;

	var record=(startRecord)?startRecord:dataset.getFirstRecord();
	while (record){
		if (isMatching(fieldNames, values, record)) return record;
		record=record.getNextRecord();
	}
}

function dataset_locate(fieldName, value, startRecord){

	function isMatching(fieldName, value, record){
		var tmpValue=record.getString(fieldName);
		return (tmpValue && compareText(tmpValue.substr(0, len), value));
	}

	if (!value) return false;

	var dataset=this;
	if (!dataset.record) return;
	if (isMatching(fieldName, value, dataset.record)) return dataset.record;

	var len=value.length;
	var record=(startRecord)?startRecord:dataset.getFirstRecord();
	while (record){
		if (isMatching(fieldName, value, record)) return record;
		record=record.getNextRecord();
	}
}

function _dataset_insertRecord(dataset, mode){
	_dataset_updateRecord(dataset);

	var event_result=fireDatasetEvent(dataset, "beforeInsert", [dataset, mode]);
	if (event_result) throw event_result;

	var pageIndex=(dataset.record)?dataset.record.pageIndex:1;

	var newRecord=new Array();
	pArray_insert(dataset, mode, dataset.record, newRecord);
	initRecord(newRecord, dataset);

	switch (mode){
		case "begin":{
			newRecord.pageIndex=1;
			break;
		}
		case "end":{
			newRecord.pageIndex=dataset.pageCount;
			break;
		}
		default:{
			newRecord.pageIndex=pageIndex;
			break;
		}
	}

	newRecord.recordState="new";
	newRecord.recordno=9999;

	var masterDataset=dataset.masterDataset;
	if (masterDataset && masterDataset.record){
		for(var i=0; i<dataset.references.length; i++){
			newRecord[dataset.references[i].detailIndex]=masterDataset.record[dataset.references[i].masterIndex];
		}
	}

	var fieldCount=dataset.fields.fieldCount;
	for (var i=0; i<fieldCount; i++){
		var defaultValue=getValidStr(dataset.fields[i].defaultValue);
		if (defaultValue!=""){
			if (defaultValue.length>8 && defaultValue.substr(0, 8)=="[script]"){
				newRecord[i]=eval("newRecord[i]="+defaultValue.substr(8));}
			else
				newRecord[i]=defaultValue;
		}
	}

	dataset_setState(dataset, "insert");
	_broadcastDatasetMsg(_notifyDatasetInsert, dataset, dataset.record, [mode, newRecord]);
	_dataset_setRecord(dataset, newRecord);

	fireDatasetEvent(dataset, "afterInsert", [dataset, mode]);
	dataset.modified=true;
}

function dataset_insertRecord(mode){
	try{
		_dataset_insertRecord(this, mode);
	}
	catch(e){
		processException(e);
	}
}

function _dataset_deleteRecord(dataset){
	if (!dataset.record) return;

	needUpdateEditor=false;
	try{
		if (dataset.record.recordState=="new" || dataset.record.recordState=="insert"){
			var event_result=fireDatasetEvent(dataset, "beforeDelete", [dataset]);
			if (event_result) throw event_result;

			dataset.record.recordState="discard";
		}
		else{
			var event_result=fireDatasetEvent(dataset, "beforeDelete", [dataset]);
			if (event_result) throw event_result;

			dataset.record.recordState="delete";
		}

		dataset.modified=false;

		fireDatasetEvent(dataset, "afterDelete", [dataset]);
		dataset_setState(dataset, "none");

		_broadcastDatasetMsg(_notifyDatasetDelete, dataset, dataset.record);
		validateDatasetCursor(dataset);
	}
	finally{
		needUpdateEditor=true;
	}
}

function dataset_deleteRecord(){
	try{
		_dataset_deleteRecord(this);
	}
	catch(e){
		processException(e);
	}
}

function _dataset_updateRecord(dataset){
	if (!dataset.record) return;
	if (!dataset_isRecordValid(dataset.record)) return;

	_broadcastDatasetMsg(_notifyDatasetBeforeUpdate, dataset, dataset.record);

	if (dataset.modified){
		var fieldCount=dataset.fields.fieldCount;
		for (var i=0; i<fieldCount; i++){
			if (!isTrue(dataset.fields[i].readOnly) && isTrue(dataset.fields[i].required) &&
				dataset.getString(i)==""){
				throw constErrFieldValueRequired.replace("%s", dataset.fields[i].label);
			}
		}

		var event_result=fireDatasetEvent(dataset, "beforeUpdate", [dataset]);
		if (event_result) throw event_result;

		switch (dataset.record.recordState){
			case "none":{
				dataset.record.recordState="modify";
				break;
			}
			case "new":{
				dataset.record.recordState="insert";
				break;
			}
		}

		for (var i=0; i<fieldCount; i++){
			dataset.record[fieldCount+i]=dataset.record[i];
		}
		dataset.modified=false;

		fireDatasetEvent(dataset, "afterUpdate", [dataset]);
		dataset_setState(dataset, "none");
	}
	else{
		if (dataset.record.recordState=="new"){
			dataset.record.recordState="discard";
			dataset_setState(dataset, "none");
			_broadcastDatasetMsg(_notifyDatasetDelete, dataset, dataset.record);
			validateDatasetCursor(dataset);
		}
	}
}

function dataset_updateRecord(){
	try{
		_dataset_updateRecord(this);
		return true;
	}
	catch(e){
		processException(e);
		return false;
	}
}

function _dataset_cancelRecord(dataset){
	if (!dataset.record) return;

	needUpdateEditor=false;
	try{
		if (dataset.record.recordState=="new"){
			var event_result=fireDatasetEvent(dataset, "beforeCancel", [dataset]);
			if (event_result) throw event_result;

			dataset.record.recordState="discard";

			fireDatasetEvent(dataset, "afterCancel", [dataset]);

			dataset_setState(dataset, "none");
			_broadcastDatasetMsg(_notifyDatasetDelete, dataset, dataset.record);
			validateDatasetCursor(dataset);
		}
		else if (dataset.modified){
			var event_result=fireDatasetEvent(dataset, "beforeCancel", [dataset]);
			if (event_result) throw event_result;

			var fieldCount=dataset.fields.fieldCount;
			for (var i=0; i<fieldCount; i++){
				dataset.record[i]=dataset.record[fieldCount+i];
			}
			dataset.modified=false;

			fireDatasetEvent(dataset, "afterCancel", [dataset]);

			dataset_setState(dataset, "none");
			_broadcastDatasetMsg(_notifyDatasetRefreshRecord, dataset, dataset.record);
		}
	}
	finally{
		needUpdateEditor=true;
	}
}

function dataset_cancelRecord(){
	try{
		_dataset_cancelRecord(this);
	}
	catch(e){
		processException(e);
	}
}

function _dataset_copyRecord(dataset, record){
	for(var i=0; i<dataset.fields.fieldCount; i++){
		var fieldName=dataset.fields[i].name;
		var value=record.getValue(fieldName);
		if (typeof(value)!="undefined") dataset.setValue(fieldName, value);
	}
}

function dataset_copyRecord(record){
	var dataset=this;
	_dataset_copyRecord(dataset, record);
}

function _broadcastDatasetMsg(proc, dataset, record, reserved){
	if (dataset.disableControlCount>0) return;
	var pArray=dataset.editors;
	if (pArray){
		var unit=pArray.firstUnit;
		while (unit && unit.data){
			proc(unit.data, dataset, record, reserved);
			unit=unit.nextUnit;
		}
	}
}

function _broadcastFieldMsg(proc, dataset, record, field, reserved){
	if (dataset.disableControlCount>0) return;
	var pArray=dataset.editors;
	if (pArray){
		var unit=pArray.firstUnit;
		while (unit && unit.data){
			proc(unit.data, dataset, record, field, reserved);
			unit=unit.nextUnit;
		}
	}
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function _notifyDatasetCursorChanged(element, dataset, record, reserved){
	var _window=element.window;
	switch (element.getAttribute("extra")){
		case "datatable":{
			if (!record) break;

			var maxRow=element.getAttribute("maxRow");
			if (element.tBodies[0].rows.length>=maxRow){
				var needRefresh=true;
				var firstRecord=_window.getTableFirstRecord(element);
				var lastRecord=_window.getTableLastRecord(element);

				var _record=firstRecord;
				while (_record){
					if (_record==record){
						needRefresh=false;
						break;
					}

					if (_record==lastRecord) break;
					_record=_record.nextUnit;
				}

				if (needRefresh && firstRecord && lastRecord){
					if (record==firstRecord.getPrevRecord()){
						_window.deleteTableRecord(element.tBodies[0].rows[element.tBodies[0].rows.length-1]);
						_window.insertTableRecord(element, "begin", null, record);
						needRefresh=false;
					}
					else if (record==lastRecord.getNextRecord()){
						_window.deleteTableRecord(element.tBodies[0].rows[0]);
						_window.insertTableRecord(element, "end", null, record);
						needRefresh=false;
					}
				}

				if (needRefresh){
					var counter=maxRow;
					var tmpRecord=record;

					for(var i=0; i<counter; i++){
						tmpRecord=tmpRecord.getNextRecord();
						if (!tmpRecord) break;
					}

					var startRecord=record;
					tmpRecord=record;
					counter=maxRow-i-1;
					for(var i=0; i<counter; i++){
						tmpRecord=tmpRecord.getPrevRecord();
						if (tmpRecord)
							startRecord=tmpRecord;
						else
							break;
					}

					_window.refreshTableData(element, startRecord);
				}
			}

			var row=_window.getTableRowByRecord(element, record);
			if (row){
				_window.setActiveTableRow(row);
			}
			break;
		}
		case "datalabel":{
			_window.refreshElementValue(element);
			break;
		}
		case "editor":;
		case "dockeditor":{
			_window.refreshElementValue(element);
			element.isUserInput=false;
			break;
		}
		case "datapilot":{
			_window.refreshDataPilot(element);
			break;
		}
	}
}

function _notifyDatasetBeforeUpdate(element, dataset, record, reserved){
	var _window=element.window;
	switch (element.getAttribute("extra")){
		case "dockeditor":{
			_window.updateEditorInput(element);
			break;
		}
	}
}

function _notifyDatasetStateChanged(element, dataset, record, reserved){
	var _window=element.window;
	switch (element.getAttribute("extra")){
		case "editor":;
		case "dockeditor":{
			var readOnly=dataset.readOnly;
			var field=_window.getElementField(element);
			if (field) readOnly=(readOnly || field.readOnly);
			setEditorReadonly(element, (readOnly || element.readOnly));
			break;
		}
		case "datapilot":{
			_window.refreshDataPilot(element);
			break;
		}
		case "datatable":{
			if (element.activeRow) _window.refreshTableRowIndicate(element.activeRow);
			break;
		}
	}
}

function _notifyDatasetInsert(element, dataset, record, reserved){
	var _window=element.window;
	switch (element.getAttribute("extra")){
		case "datatable":{
			var row;
			if (record) row=_window.getTableRowByRecord(element, record);

			_window.insertTableRecord(element, reserved[0], row, reserved[1]);
			if (element.tBodies[0].rows.length>element.getAttribute("maxRow")){
				var lastRecord=_window.getTableLastRecord(element);
				if (lastRecord!=reserved[1]){
					_window.deleteTableRecord(element.tBodies[0].rows[element.tBodies[0].rows.length-1]);
				}
				else{
					_window.deleteTableRecord(element.tBodies[0].rows[0]);
				}
			}
			break;
		}
	}
}

function _notifyDatasetDelete(element, dataset, record, reserved){
	var _window=element.window;
	switch (element.getAttribute("extra")){
		case "datatable":{
			if (record){
				var row=_window.getTableRowByRecord(element, record);
				if (row){
					if (element.tBodies[0].rows.length<=element.getAttribute("maxRow")){
						var firstRecord=_window.getTableFirstRecord(element);
						var lastRecord=_window.getTableLastRecord(element);
						if (firstRecord){
							var _record=lastRecord.getNextRecord();
							if (_record){
								_window.insertTableRecord(element, "end", row, _record);
							}
							else{
								var _record=firstRecord.getPrevRecord();
								if (_record) _window.insertTableRecord(element, "begin", row, _record);
							}
						}
					}

					_window.deleteTableRecord(row);
				}
			}
			break;
		}
	}
}

function _notifyDatasetRefreshRecord(element, dataset, record, reserved){
	var _window=element.window;
	switch (element.getAttribute("extra")){
		case "datatable":{
			if (record){
				var row=_window.getTableRowByRecord(element, record);
				if (row) _window.refreshTableRecord(row);
			}
			break;
		}
		case "datalabel":;
		case "editor":;
		case "dockeditor":{
			_window.refreshElementValue(element);
			element.isUserInput=false;
			break;
		}
	}

	if (typeof(_window.sizeDockEditor)!="undefined") _window.sizeDockEditor();
}

function _notifyDatasetRefresh(element, dataset, record, reserved){
	var _window=element.window;
	switch (element.getAttribute("extra")){
		case "datatable":{
			_window.refreshTableData(element);
			break;
		}
		case "datalabel":;
		case "editor":;
		case "dockeditor":{
			_window.refreshElementValue(element);
			element.isUserInput=false;
			break;
		}
		case "datapilot":{
			_window.refreshDataPilot(element);
			break;
		}
	}
	_notifyDatasetStateChanged(element, dataset, record, reserved);

	if (typeof(_window.sizeDockEditor)!="undefined") _window.sizeDockEditor();
}

function _notifyFieldDataChanged(element, dataset, record, field, reserved){
	var _window=element.window;
	switch (element.getAttribute("extra")){
		case "datatable":{
			var row=_window.getTableRowByRecord(element, record);
			for(var i=0; i<row.cells.length; i++){
				var cell=row.cells[i];
				if (compareText(cell.getAttribute("dataField"), field.name)){
					_window.refreshElementValue(cell);
				}
			}
			break;
		}
		case "editor":;
		case "dockeditor":{
			if (compareText(element.getAttribute("dataField"), field.name)){
				_window.refreshElementValue(element);
				element.isUserInput=false;
			}
			break;
		}
		case "datalabel":{
			if (compareText(element.getAttribute("dataField"), field.name)){
				_window.refreshElementValue(element);
			}
			break;
		}
	}

	if (typeof(_window.sizeDockEditor)!="undefined") _window.sizeDockEditor();
}

function _notifyFieldStateChanged(element, dataset, record, field, reserved){
	switch (element.getAttribute("extra")){
		case "editor":;
		case "dockeditor":{
			if (compareText(element.getAttribute("dataField"), field.name)){
				var readOnly=dataset.readOnly;
				if (field) readOnly=(readOnly || field.readOnly);
				setEditorReadonly(element, readOnly);
			}
			break;
		}
	}
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function _createSubmitManager() {
	this.parameters=createParameters();
	this.datasets=new Array();
	this.setParameter=SubmitManager_setParameter;
	this.getParameter=SubmitManager_getParameter;
	this.getParameterName=SubmitManager_getParameterName;
	this.getParameterCount=SubmitManager_getParameterCount;
	this.setDatasets=SubmitManager_setDatasets;
	this.submit=SubmitManager_submit;	
	return this;
}

function SubmitManager_setParameter(name, value){
	this.parameters.setParameter(name, value);
}

function SubmitManager_getParameter(name){
	return this.parameters.setParameter(name);
}

function SubmitManager_getParameterName(index){
	return this.parameters.getParameterName(index);
}

function SubmitManager_getParameterCount(){
	return this.parameters.length;
}

function _addSubmitDataset(manager, dataset) {
	manager.datasets[manager.datasets.length]=getDatasetByID(dataset);
}

function _resetRecordState(record){
	record.saveOldValue();
	if (record.recordState!="discard")
		record.recordState="none";
}

function _resetDatasetState(dataset){
	var record=dataset.firstUnit;
	while (record){
		_resetRecordState(record);
		record=record.nextUnit;
	}
}

function _getUpdateString(){

	function doGetUpdateString(dataset){
		var prop="";
		prop+="id=\""+dataset.id+"\" ";
		prop+="sessionKey=\""+dataset.sessionKey+"\" ";
		prop+="tag=\""+getEncodeStr(dataset.tag)+"\" ";
		var result="<Dataset "+prop+">";

		result+="<Fields>";
		for(var i=0; i<dataset.fields.fieldCount; i++){
			var field=dataset.getField(i);
			var prop="";
			prop+="name=\""+field.name+"\" ";
			prop+="dataType=\""+field.dataType+"\" ";
			prop+="nullable=\""+field.nullable+"\" ";
			prop+="updatable=\""+field.updatable+"\" ";
			prop+="fieldName=\""+field.fieldName+"\" ";
			prop+="tableName=\""+field.tableName+"\" ";
			prop+="tag=\""+getEncodeStr(field.tag)+"\" ";
			result+="<Field "+prop+"/>";
		}
		result+="</Fields>";

		result+="<Records>";
		var record=dataset.firstUnit;
		while (record){
			var needSubmit, needOldValue;
			switch (record.recordState){
			case "none":
				needSubmit=(dataset.submitData=="all");
				needOldValue=false;
				break;
			case "insert":
				needSubmit=true;
				needOldValue=false;
				break;
			case "modify":
			case "delete":
				needSubmit=true;
				needOldValue=true;
				break;
			}

			if (needSubmit){
				result+="<Record state=\""+record.recordState+"\">";
				result+="<data>";
				for(var i=0; i<dataset.fields.fieldCount; i++){
					result+=getEncodeStr(record.getString(i))+",";
				}
				result+="</data>";
				if (needOldValue){
					result+="<old>";
					for(var i=0; i<dataset.fields.fieldCount; i++){
						result+=getEncodeStr(record.getString(dataset.fields.fieldCount*2+i))+",";
					}
					result+="</old>";
				}
				result+="</Record>";
			}
			record=record.nextUnit;
		}
		result+="</Records>";

		result+="<UpdateItems>";
		for(var i=0; i<dataset.updateItems.length; i++){
			var item=dataset.updateItems[i];
			var prop="";
			prop+="updateMode=\""+item.updateMode+"\" ";
			prop+="dataSource=\""+item.dataSource+"\" ";
			prop+="tableName=\""+item.tableName+"\" ";
			prop+="keyFields=\""+item.keyFields+"\" ";
			prop+="updateFields=\""+item.updateFields+"\" ";
			result+="<UpdateItem "+prop+"/>";
		}
		result+="</UpdateItems>";
	
		result+="</Dataset>";
		return result;		
	}

	var result="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
	result+="<SubmitData updaterClass=\"" + getValidStr(SubmitManager.updaterClass) + "\">";	
	result+="<Parameters>";	
	for(var i=0; i<SubmitManager.parameters.length; i++){
		result+="<Parameter name=\"" + SubmitManager.parameters[i].name + "\" value=\"" + SubmitManager.parameters[i].value + "\"/>";
	}
	result+="</Parameters>";
	result+="<Datasets>";	
	for (var i=0; i<SubmitManager.datasets.length; i++){
		result+=doGetUpdateString(SubmitManager.datasets[i]);
	}
	result+="</Datasets>";
	result+="</SubmitData>";
	return result;
}

function submitNeeded(){
	for (var i=0; i<SubmitManager.datasets.length; i++){
		var dataset=SubmitManager.datasets[i];
		if (!dataset.updateRecord()) return false;
		if (dataset.submitData=="all") return true;
		var record=dataset.firstUnit;
		while (record) {
			if (record.recordState == "insert" ||
				record.recordState == "modify" ||
				record.recordState == "delete")
			{
				return true;
			}
			record=record.nextUnit;
		}
	}
}

function SubmitManager_setDatasets(datasets) {
	SubmitManager.datasets[i] = datasets;
}

function SubmitManager_submit(){
	function _submitString(updateString){
		if (trimStr(updateString)=="") return;
		var param=new Object();
		param.updatestring=updateString;		
		param.sourceurl=window.location.pathname;
		var result=showModalDialog(_extra_library+"updateagent.html", param,
			"dialogHeight: 80px; dialogWidth: 220px; center: Yes; help: No; resizable: yes; status: No");
		if (!result.succeed) throw result.error;
		return true;
	}

	function getSubmitForm(){
		if (typeof(_form_extra)=="undefined")
		{
			var obj=document.createElement("<form method=\"post\" id=\"_form_extra\" style=\"visibility: hidden\"></form>");
			obj.innerHTML="<input name=\"updatestring\"><input name=\"targeturl\"><input name=\"sourceurl\">";
			document.body.appendChild(obj);
		}
	}

	function redirectPage() {
		if (SubmitManager.targetUrl){
			open(SubmitManager.targetUrl, (SubmitManager.targetFrame)?SubmitManager.targetFrame:"_self");
		}
	}

	try{
		for (var i=0; i<SubmitManager.datasets.length; i++){
			var dataset=SubmitManager.datasets[i];
			if (!dataset.updateRecord()) return true;
		}
	
		if (!submitNeeded()){
			redirectPage();
			return true;
		}

		var updateString=_getUpdateString();
		if (compareText(SubmitManager.submitMode, "default"))
		{			
			if (_submitString(updateString)){
				for(var i=0; i<SubmitManager.datasets.length; i++)
					_resetDatasetState(SubmitManager.datasets[i]);
			}
			redirectPage();
			return true;
		}
		else{
			getSubmitForm();
			_form_extra.action=_extra_library+"updateservice";
			_form_extra.target=(SubmitManager.targetFrame)?SubmitManager.targetFrame:"_self";
			_form_extra.updatestring.value=updateString;
			_form_extra.targeturl.value=SubmitManager.targetUrl;
			_form_extra.sourceurl.value=window.location.pathname;
			_form_extra.submit();
		}		
	}
	catch(e){
		processException(e);
		return false;
	}
}