/*use to mark wherther the grid row has been edit */
//var isSelected = false;

/* use to mark the editing grid's name*/
var editGridName;

function formComplete()
{
  hiddeDataGrid();
  var saveable = FORM_OBJECT_POOL.get("saveable");
  if(saveable=="false") {
	return true;
  }

  if(document.forms[0].fireEvent("onsubmit")) {
  	document.forms[0].submit();
  	var parms =  getHrefParameters();
  	var state = formCommandRequest("com.neusoft.form.engine.util.FormSubmitStateCmd","",parms);
  	if(state=="true"){
  		return true;
  	}
  	return false;
  }

  return false;
}

function GridRow(recordXML){
    this.row = recordXML;
    this.getColumnValue = getColumnValue;
    this.setColumnValue = setColumnValue;
    this.getColumnName  = getColumnName;
    function getColumnValue(colName){
    	//alert(colName);
        var col = this.row.selectSingleNode(colName);
        if(col)
           return col.text;
        else
        {
           alert("\u65e0\u6548\u7684\u5217\u6807\u8bc6: "+colName);
           return null;
        }/**/
       return this.row.selectSingleNode(colName).text;
    }

    function setColumnValue(colName,value){
        var col = this.row.selectSingleNode(colName); 
        if(!col)
        {
           alert("\u65e0\u6548\u7684\u5217\u6807\u8bc6: "+colName);
        }
        col.text = value;    /**/
       this.row.selectSingleNode(colName).text = value;
    }

    function getColumnName(index){
       return this.row.childNodes.item(index).nodeName;
    }
}

function getDataGrid(name, dsID, editable, rowaccess)
{
  var grid = FORM_OBJECT_POOL.get(name); 
  try{
   if(!grid){
     grid = new DataGrid(name, dsID, editable, rowaccess);
     grid.init();
     FORM_OBJECT_POOL.put(name,grid);
     FORM_OBJECT_POOL.put("isSelected",false);
   }
  }
  catch(e){
  	//NullPointerException////
  	alert(e.description);    	 
  }

  return grid;
}

function DataGrid(name, dsID, editable, rowaccess)
{
 this.recordNumber = 0;
 this.name = name;
 this.dsID = dsID;
 this.styleID= this.dsID+"_xsl";
 this.selectedRow = -1;
 this.selectedRecord = -1;
 this.editable = editable;
 this.pageable = true;
 this.pageSize = 5;
 this.currentPage = 1;
 this.totalRecords = 0;
 this.totalPages = 1;
 this.rowaccess = rowaccess;
 
 this.init = init;
 this.addRow = addRow;
 this.deleteRow = deleteRow;
 this.setSelectedRow = setSelectedRow;
 this.getSelectedRow = getSelectedRow;
 this.getSelectedRecord = getSelectedRecord;
 this.saveXML = saveXML;
 this.editCellByTextField = editCellByTextField;
 this.editCellByTextareaField = editCellByTextareaField;
 this.editCellByComboxField = editCellByComboxField;
 this.editCellByCalendarField = editCellByCalendarField;
 this.setCell = setCell;
 this.escape = escape;
 this.unescape = unescape;
 this.rowMouseOver = rowMouseOver;
 this.rowMouseOut = rowMouseOut;
 this.updateView = updateView;
 this.getXMLDocument = getXMLDocument;
 this.getRow = getRow;
 this.getValueAt = getValueAt;
 this.setValueAt = setValueAt;
 this.getRowCount = getRowCount;
 this.sums = sums;
 this.getRecordCount = getRecordCount;
 this.calcPageInfo = calcPageInfo;
 this.onViewUpdate = "";
 this.onRowSelectionChanged = "";
 this.onRecordAdded = "";
 this.sort = sort;
 this.set = set;
 this.ppage= ppage;
 this.refresh=refresh;
 this.onSave = "";
 this.editCurrentRow = editCurrentRow;
 this.deleteAllRows = deleteAllRows;
 //this.createElementsUsed = createElementsUsed;
 //this.getTable = getTable;
 //this.selectBody = selectBody;
 //this.moveBody = moveBody;
 //this.downBody = downBody;
 //this.upBody = upBody;
 //this.moveCol = moveCol;
 //this.calculateOffset = calculateOffset;
}

function init() {
	 var doc = document.getElementById(this.dsID).XMLDocument;
	 firstRecord = doc.selectSingleNode("/dataset/record[0]");
	 if(firstRecord.getAttribute("state") == 3){
	    this.recordNumber = 0;
	 }
	 else {
	    this.recordNumber = doc.selectSingleNode("dataset").childNodes.length;
	 }
	 
	 this.totalRecords = this.recordNumber;
	 this.pageSize = 5;
	 this.totalPages = Math.ceil(this.totalRecords*1.0 / this.pageSize);
	 var div = document.getElementById(this.name);
	 
	 var dgName = this.name;
	 
	 //var span = div.parentNode.parentNode;
	 //span.attachEvent("onmouseenter",function(){return showImageCtrl(dgName)});
	 //span.attachEvent("onmouseleave",function(){return hideControlPanel(dgName)});
	
	 if(div.getAttribute("onViewUpdate")){
	     this.onViewUpdate = div.getAttribute("onViewUpdate");
	 }
	
	 if(div.getAttribute("onRowSelectionChanged")){
	     this.onRowSelectionChanged = div.getAttribute("onRowSelectionChanged");
	 }
	 
	 if(div.getAttribute("onRecordAdded")){
	     this.onRecordAdded = div.getAttribute("onRecordAdded");
	 }
	 
	 if(div.getAttribute("onSave")){
	     this.onSave = div.getAttribute("onSave");
	 }
}

function rowMouseOver(row,sel)
{
	 if(sel!=this.selectedRow)
	  {
	  		row.className = "td3";//pink
	  }
}

function rowMouseOut(row,sel)
{
	 if(sel!=this.selectedRow)
	   {
		  	row.className = "td1";//white
	   }
}

function addRow()
{
	 fHideCalendar();
	 var doc = document.getElementById(this.dsID).XMLDocument
	 var root = doc.documentElement;
	 var record = doc.selectSingleNode("//record[0]");
	 var newRecord = record.cloneNode(true);

	 if(newRecord.getAttribute("ov")){
	 	newRecord.setAttribute("ov","");
	 }

	 var children = newRecord.childNodes; 
	 for(i=0;i<children.length;i++){
	   children.item(i).text = getDefaultValue(children.item(i).getAttribute("type"));
	 }
	 newRecord.setAttribute("state","2");

	 //get first record of data_modify_state = 3
	 //all dirty records are at the end
	 var refNode = doc.selectSingleNode("//record[@state=3]");
	 if(!refNode)
	     refNode = doc.selectSingleNode("//record[@state=-1]");
	 if(refNode)
	     record.parentNode.insertBefore(newRecord,refNode);
	 else
	     record.parentNode.appendChild(newRecord);

	 //set record number and inscrease the  max record number
	 this.recordNumber++;
	 newRecord.setAttribute("num",this.recordNumber+"");

	 this.calcPageInfo();
	 this.currentPage = Math.ceil(this.recordNumber*1.0 / this.pageSize);
	 var pageInfoLabel = document.getElementById(this.name+"_page_and_total");
	 if(pageInfoLabel){
	 	pageInfoLabel.innerText = this.currentPage + "/" +this.totalPages;
	 }

	 if(this.onRecordAdded){
	    eval(this.onRecordAdded);
	 }
	 this.selectedRow = -1;

	 return new GridRow(newRecord);
}

/**
*  delete all rows of datagrid
*  2008-1-16  add by liuying
*/
function deleteAllRows(){
	var doc = document.getElementById(this.dsID).XMLDocument;
	var nodes = doc.selectNodes("//record[@state !=-1]");

	for(var i=0;i<nodes.length;i++){

		nodes[i].setAttribute("state","-1");
		this.recordNumber--;
	}

	this.updateView();
}

function deleteRow()
{
	 fHideCalendar();
	 hiddenValidateRect();

	 if(this.selectedRow == -1)
	 {
		alert("\u8bf7\u9009\u62e9\u4e00\u884c");
		return;
	 }

	 var comfirm = window.confirm("\u4f60\u8981\u5220\u9664\u8fd9\u6761\u8bb0\u5f55\u5417\uff1f");
	 if(!comfirm) return;
	 var doc = document.getElementById(this.dsID).XMLDocument;
	 var root = doc.documentElement;

	 var record = doc.selectSingleNode("//record[@num="+this.selectedRecord+" and @state !=-1]");
	 var state = record.getAttribute("state");

	 root.removeChild(record);
	 if(state!=2){  
	    record.setAttribute("state","-1");
	    root.appendChild(record);
	 }

	 var curNum = record.getAttribute("num");
	 var nodes = doc.selectNodes("/dataset/record[@state !=-1 and @num>"+curNum+"]");
	 for(i=0;i<nodes.length;i++){
		nodes[i].setAttribute("num",parseInt(curNum)+i);
	 }

	 this.recordNumber--;
	 this.calcPageInfo();
	 
	 var pageInfoLabel = document.getElementById(this.name+"_page_and_total");
	 if(pageInfoLabel){
	 	pageInfoLabel.innerText = this.currentPage + "/" +this.totalPages;
	 }
	 
	 this.selectedRow = -1;
	 this.updateView();

	 //var styleDoc = document.getElementById(this.styleID).XMLDocument;
	 //document.getElementById(this.name).innerHTML = doc.transformNode(styleDoc);
}

function setSelectedRow(tableRow,rowIndex,selRecord)
{
     //window.event.cancelBubble = true;
     var table = tableRow.parentNode;
     var nodes = table.childNodes; 

     if (this.selectedRow !=-1 && this.selectedRow<nodes.length && this.selectedRecord!=selRecord)
     	nodes.item(this.selectedRow).className = "td1";

     if(this.selectedRecord!=selRecord || this.selectedRow==-1){
	     this.selectedRow = rowIndex;
	     this.selectedRecord = selRecord;
	     tableRow.className = "td2";

	     //fire row selection changed event
	     if(this.onRowSelectionChanged){
	       	eval(this.onRowSelectionChanged);
    }
  }
}

function getSelectedRow(){
    return this.selectedRow;
}

function getSelectedRecord(){
    return this.selectedRecord;	
}

function saveXML(execpoint)
{
	var result = false;
 	var onSaveResult = false;
 	var errorMsg;
 	fHideCalendar();
 	hiddeDataGrid();
 
	 if (this.editable)
	 { 
	   if (this.onSave != '')
	   {	
	      	onSaveResult = eval(this.onSave);
	   }

	    var path = document.location.pathname;
	    var pos=path.lastIndexOf('/', path.length-1);
	    path = path.substring(0,pos);
        var params = getHrefParameters(); 
        params.addHiddenElements();   
	    var url="http://"+ document.location.hostname + ":" + document.location.port + path +"/XMLReceiver?command=com.neusoft.form.engine.datagrid.SaveDataGridCommand&gridname="+this.name+"&"+params.toString();
	    var doc = document.getElementById(this.dsID);
	    var xmldoc=doc.XMLDocument;
	    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    xmlhttp.Open("POST" ,url, false);
	    xmlhttp.Send(xmldoc);

	    if(execpoint == 1){
	       if (this.onSave != '')
	    	 return true && onSaveResult; 
	       else return true;	 
	    }

	    dom = xmlhttp.responseXML;

	    if(dom){
	    	var message = dom.selectSingleNode("datagrid_error");
	    	if(message)
	    	{
	    		errorMsg = message.text;
	    	}
	    	else
	    	{
	    		message = dom.selectSingleNode("datagrid_message");
	    		if(message){
	    		
	    		}else{
	    			doc.replaceChild(dom.documentElement,doc.XMLDocument.documentElement);
	    			this.updateView();
	    		}
	    		result = true;
	    	}
	    }else{
	    	result = true;
	    }

	   if (execpoint == 0)
	   {
		    if (result == true) //
		     	alert('\u6570\u636e\u8868\u683c\u4fdd\u5b58\u6210\u529f');
		    else
		     	alert('\u6570\u636e\u8868\u683c\u4fdd\u5b58\u5931\u8d25:'+errorMsg);
	   }
	   else//
	   { 
		   	if (result==false)
		        alert('\u6570\u636e\u8868\u683c\u4fdd\u5b58\u5931\u8d25:'+errorMsg);
	   }
	   
	 }else{
	 		result = true;
	 }

	 return result;
}

function editCurrentRow(tableRow,rowNumber,recordNum){
    //window.event.cancelBubble = true;

  	var table = tableRow.parentNode; 
	var nodes = table.childNodes;
  	var isSelected = FORM_OBJECT_POOL.get("isSelected");

  	if(editGridName!=null&&editGridName!=this.name){
     	hiddeDataGrid();
  	}
	
  	var cells = tableRow.childNodes;
	
  	var element = null;
	if(window.event){
		element= window.event.srcElement;
	}
	
	 
  	var selectedCell;
  	
  /**
   * 跨域点击时的处理
   */	
  if(element!=null){
	  selectedCell = element.parentNode;
	  
	  if((selectedCell.colname=="index"||selectedCell.tagName=="TR")&& !isSelected ){
	     hiddeDataGrid();
	     this.setSelectedRow(tableRow,rowNumber,recordNum);
	     //this.selectedRow = rowNumber;
	     
	     return;
	  }  	
  }

  
  if(element==null||this.editable&& isSelected && this.selectedRecord!=recordNum && this.selectedRow!=-1
     || this.selectedRecord == recordNum && element.parentNode.tagName!= "SPAN" && element.parentNode.tagName!= "TD"){//||element.tagName=='DIV'
		
     	var doc = document.getElementById(this.dsID).XMLDocument;
     	var record = doc.selectSingleNode("//record[@num="+this.selectedRecord+" and @state >-1 and @state<3]");
     	var oldRow = nodes.item(this.selectedRow);
     	var oldNodes = oldRow.childNodes;
     	fHideCalendar();
     	var flag = true;

     	for(var i=0;i<oldNodes.length;i++){
	        var hideable = oldNodes[i].editable;
	        
	        if(hideable == "false") continue;
	        
	    	var oldCell  = oldNodes[i].firstChild; 
	    	
	    	if(oldCell.firstChild==null){continue;}
	    	
	    	
	    	var value = oldCell.firstChild.value; 
	    	
	    	var colName = oldNodes[i].colname;
	    	
	    	//var input = oldCell.firstChild;
	    	//window.status = window.event.srcElement.tagName; 
	    	//if(input.onblur && element.parentNode.tagName!="TD"&& element.parentNode.tagName!="TR"&& element.parentNode.tagName!="TBODY"){
	    		//input.fireEvent("onblur");	
	    	//}

	    	if(!onEditblur(oldCell)){
	    		flag = false;
	    		break;
	    	}

     	}

     /*
     *   modify by liuying
     *   unpassed the verify
	 */
	 	if(flag){

		 	for(var i=0;i<oldNodes.length;i++){
		        var hideable = oldNodes[i].editable;
		        if(hideable == "false") continue;
		    	var oldCell  = oldNodes[i].firstChild; 
		    	
		    	if(oldCell.firstChild==null){continue;}
		    	
		    	var value = oldCell.firstChild.value; 
		    	var colName = oldNodes[i].colname;
				
		        oldCell.firstChild.style.visibility='hidden';

		    	record.selectSingleNode(colName).text= value;	    	
		    	oldCell.innerText = value;

	     	}
		    var state =  record.getAttribute("state");
		  	 if (state != 2 && state !=3)
		      record.setAttribute("state","1");
		      
		     // remain the selected rowIndex and style
		     //this.selectedRow = -1;
		     this.updateView();
		     hiddenValidateRect();
		     return true;
	 	}
	
   	}
   	else{
   		
     	if(this.selectedRow !=-1 && this.selectedRow<nodes.length && this.selectedRecord!=recordNum)
        	nodes.item(this.selectedRow).className = "td1";
        
     	if(this.selectedRecord!=recordNum || this.selectedRow==-1){
	        this.selectedRow = rowNumber;
	        this.selectedRecord = recordNum;
	        tableRow.className = "td2";
	        //fire row selection changed event
	        if(this.onRowSelectionChanged){
	           eval(this.onRowSelectionChanged);
	        }
      	}
     	if(this.editable){
	        //isSelected = true;
	        FORM_OBJECT_POOL.put("isSelected",true);
	        editGridName = this.name;
	        
	         for(i=0;i<cells.length;i++){
	     	  
	          var cell = cells[i];
	          var type = cell.ftype;
	          var textName = cell.textname;
	          var colName = cell.colname;
	          var feditable = cell.editable;
	          
	          if(cell==selectedCell){
	             selectable = true;
	          }
	          else{
	             selectable = false;
	          }
	
	          if(type=="text")
	             editCellByTextField(cell,textName,colName,rowNumber,recordNum,this.dsID,this.name,this.type,selectable,feditable);
	          else if(type=="textarea") 
	             editCellByTextareaField(cell,textName,colName,rowNumber,recordNum,this.dsID,this.name,this.type,selectable,feditable);
	          else if(type=="combobox")
	             editCellByComboxField(cell,textName,colName,rowNumber,recordNum,this.dsID,this.name,this.type,selectable,feditable);
	          else if(type == "calendar")
	             editCellByCalendarField(cell,textName,colName,rowNumber,recordNum,this.dsID,this.name,this.type,selectable,feditable);
	        }
     	}
  	}	
}

function editCellByTextField (cell,textName,colName,rowNumber,recordNum,dsID,gridName,gridType,selectable,feditable)
{
	 
	 if(feditable=="false") 
	 	return;

	 if(cell.firstChild.firstChild)
	 {
		   if(cell.firstChild.firstChild.tagName=="INPUT"){
		   		return;
		   }
	 }

	 //this.setSelectedRow(cell.parentNode,rowNumber,recordNum);
	 //************************relative variable*******************************
	 //var xmldoc = document.getElementById(dsID).XMLDocument;
	 //var editingRow =  xmldoc.selectSingleNode("//record[@num="+recordNum+" and @state !=-1]");
	 //var editingCol = editingRow.selectSingleNode(colName);
	 //***************************************************************************

	 if (document.getElementById)
	 {
		  
		  cell.normalize();
		  var input;

		  if (textName!=''){
		     input = document.getElementsByName(textName)[0].cloneNode(true);
		  }
		  else {
		     input = document.createElement('INPUT');
		  }
		  
		  if(cell.firstChild.firstChild){
		     input.setAttribute('value', cell.firstChild.firstChild.nodeValue);
		  }
		  
		  
		  //input.setAttribute('title', colName);//colName
		  input.setAttribute('dsID', dsID);
		  input.setAttribute('gridName', gridName);
		  input.setAttribute('gridType', gridType);
		  input.style.width = "99%"
		  input.style.height = "99%"
		  input.style.fontSize = "12px";
		  
		  if(cell.firstChild.firstChild)
		    cell.firstChild.replaceChild(input, cell.firstChild.firstChild);
		  else
		    cell.firstChild.appendChild(input);

		  input.disabled = false;
		  input.readOnly = false;
		  

		  input.style.visibility="visible";
		  if(selectable){
		    input.focus();
		    input.select();	
		  }
	 }
}

function editCellByCalendarField (cell,calName,colName,rowNumber,recordNum,dsID,gridName,gridType,selectable,feditable)
{
	 if(feditable=="false") return;
	 if(cell.firstChild.firstChild)
	 {
	  	if(cell.firstChild.firstChild.tagName=="INPUT")
	   		return;
	 }
	 //this.setSelectedRow(cell.parentNode,rowNumber,recordNum);
	
	 var xmldoc = document.getElementById(dsID).XMLDocument;
	 var editingRow =  xmldoc.selectSingleNode("//record[@num="+recordNum+" and @state !=-1]");
	 var editingCol = editingRow.selectSingleNode(colName);
	 if (document.getElementById)
	 {
		  cell.normalize();
		  var cal = document.getElementsByName(calName)[0];
		
		  var input = cal.cloneNode(true); //document.createElement('INPUT');
		
		  if(cell.firstChild.firstChild)
		     input.setAttribute('value', editingCol.text);//cell.firstChild.firstChild.nodeValue
		   
		  input.id = input.name + "_form001";
		  input.name = input.id;
		  //input.setAttribute('title', colName);
		  input.setAttribute('dsID', dsID);
		  input.setAttribute('gridName', gridName);
		  input.setAttribute('gridType', gridType);
		  input.style.width = cell.offsetWidth - 20;
		  input.style.position = "relative";
		  input.style.height = "20px"
		  input.style.fontSize = "12px";
		  input.style.left =0;
		  input.style.top =0;
		  input.style.borderStyle="solid";
		  input.removeAttribute("readonly");
		  input.style.visibility="visible";
		  //input.attachEvent ("onblur", function(){onEditblur(cell)});
		 
		  //input.attachEvent ("onclick", onEditClick);
		  //input.attachEvent ("onclick", function(){popFormCalendar(input.id,input.id)});
		  input.attachEvent ("onchange", function(){onEditChange(cell)});
		  //input.attachEvent ("onkeydown",function(){return onKeyDown(cell)});
		  if(cell.firstChild.firstChild){
		   	cell.firstChild.replaceChild(input, cell.firstChild.firstChild);
		  }else{
		   	cell.firstChild.appendChild(input);
		  }
		  cal.nextSibling.removeAttribute("onfocus");
		  var img = cal.nextSibling.cloneNode(true);
		
		  //img.attachEvent ("onclick", function(){popFormCalendar(input.id,input.id)});
		  
		  cell.firstChild.appendChild(img);
		  
		  if(selectable){
		    //popFormCalendar(input.id,input.id);
		    input.focus();
		    input.select();
	  	  }
	 }
}

function editCellByComboxField (cell,selectname,colName,rowNumber,recordNum,dsID,gridName,gridType,selectable,feditable)
{
	 if(feditable=="false") return;
	 if(cell.firstChild.firstChild)
	 {
	  	if(cell.firstChild.firstChild.tagName=="SELECT"){
	    	return;
	    }
	 }
	
	 //this.setSelectedRow(cell.parentNode,rowNumber,recordNum);
	 var xmldoc = document.getElementById(dsID).XMLDocument;
	 var editingRow =  xmldoc.selectSingleNode("//record[@num="+recordNum+" and @state !=-1]");
	 var editingCol = editingRow.selectSingleNode(colName);
	
	 if (document.getElementById)
	 {
		  cell.normalize();
		  var oSelect = document.getElementById(selectname).cloneNode(true);
		  //oSelect.style.visibility="hidden";
		  if(cell.firstChild.firstChild){
		  	oSelect.setAttribute('value',editingCol.text);
		  }
		  oSelect.setAttribute('size', 1);
		  //oSelect.setAttribute('title', colName);
		  oSelect.setAttribute('dsID', dsID);
		  oSelect.setAttribute('gridName', gridName);
		  oSelect.setAttribute('gridType', gridType);
		  oSelect.id = selectname+"_form0011070";
		  //alert(oSelect.childNodes[1].value+":"+recordNum);
		  oSelect.style.width="99%";
		  oSelect.style.height="99%";
		  oSelect.style.fontSize="12px";
		  if (cell.firstChild.firstChild){
		  		cell.firstChild.replaceChild(oSelect, cell.firstChild.firstChild);
		  }else{
		  		cell.firstChild.appendChild(oSelect);
		  }
		  oSelect.disabled = false;
		  oSelect.readOnly = false;
		  oSelect.style.visibility="visible";
		  //oSelect.attachEvent("onblur",onTextBlur);
		  //oSelect.attachEvent ("onblur", function(){onEditblur(cell); });
		  //oSelect.attachEvent ("onclick", onEditClick);
		  oSelect.attachEvent ("onchange", function(){onEditChange(cell)});
		  //oSelect.attachEvent ("onkeydown",function(){return onKeyDown(cell)});
		  //oSelect.focus();
		  if(selectable){
		    oSelect.focus();	
		  }	
	 }
}

function editCellByTextareaField (cell,textName,colName,rowNumber,recordNum,dsID,gridName,gridType,selectable,feditable)
{
	 if(feditable=="false") return;
	 if(cell.firstChild.firstChild){
	       if(cell.firstChild.firstChild.tagName=="TEXTAREA")
	          return;
	 }
	 //this.setSelectedRow(cell.parentNode,rowNumber,recordNum);
	
	 var xmldoc = document.getElementById(dsID).XMLDocument;
	 var editingRow =  xmldoc.selectSingleNode("//record[@num="+recordNum+" and @state !=-1]");
	 var editingCol = editingRow.selectSingleNode(colName);
	
	 if (document.getElementById)
	 {
		  cell.normalize();
		  var input;
		  if (textName!='')
		     input = document.getElementsByName(textName)[0].cloneNode(true);
		  else
		     input = document.createElement('TEXTAREA');
		
		  if(cell.firstChild.firstChild)
		   	input.setAttribute('value', cell.firstChild.firstChild.nodeValue);
		  //input.setAttribute('title', colName);
		  input.setAttribute('dsID', dsID);
		  input.setAttribute('gridName', gridName);
		  input.setAttribute('gridType', gridType);
		  input.style.width = "99%";
		  input.style.height = 100;
		  input.style.visibility="visible";
		  input.style.fontSize = "12px";
		  input.disabled = false;
		  input.readOnly = false;
		  //input.attachEvent ("onblur", function(){onEditblur(cell)});
		  //input.attachEvent ("onclick", onEditClick);
		  //input.attachEvent ("onchange", function(){return onEditChange(cell)});
		  //input.attachEvent ("onkeydown",function(){return onKeyDown(cell)});
		  
		  if(cell.firstChild.firstChild)
		   	cell.firstChild.replaceChild(input, cell.firstChild.firstChild);
		  else
		   	cell.firstChild.appendChild(input);
		  if(selectable){
		    input.focus();
		    input.select();	
	  	  }
	 }
}

function onEditblur(cell)
{	 
	 //window.status += "oneditblur";
	 var element = cell.childNodes[0];//window.event.srcElement;
	 var gridName = element.getAttribute("gridName");
	 var value = element.value;
	 var grid = getFormObjectByName(gridName);

	 if(!validateType(element)){ 
	     //value = grid.getValueAt(grid.getSelectedRecord(),element.title);
	     //element.focus();
	     return false;		
	 }
    
	 if(!verifyMaxLength(element)){
	 	var altName = element.title;
	    if(!altName || altName.length==0)
	          altName =  element.name;
		 alert("["+altName+"] \u4e2d\u5185\u5bb9\u8d85\u8fc7\u4e86\u6700\u5927\u957f\u5ea6 ["+element.getAttribute("maxlength")+"]\u3002"
		  		+"(\u5176\u4e2d\u6c49\u5b57\u5360\u4e24\u4e2a\u5b57\u8282)");
	     goToElement(element);
		 return false;
	 }
	

	 return true;

	 //var dsID = element.getAttribute("dsID");
	 //var gridType = element.getAttribute("gridType");
	 //getFormObjectByName(gridName).setCell(cell, element.title,value);
}

function hiddeDataGrid(){

	 //window.status = window.event.srcElement.name;
	 //window.event.srcElement.focus();
	 var isSelected = FORM_OBJECT_POOL.get("isSelected");
	 if(isSelected){
		 var grid = FORM_OBJECT_POOL.get(editGridName);
		 if(grid){
		     var rowIndex = grid.selectedRow;
		     var recordNum = grid.selectedRecord;
		     var tableRow = document.getElementsByName(editGridName)[0].getElementsByTagName("TABLE")[0].rows[rowIndex];

		     if(grid.editCurrentRow(tableRow,rowIndex,recordNum)){
		        //grid.selectedRow = -1;
		     	//grid.updateView();
		     	//isSelected = false;
		     	//setSelectedRow(tableRow,rowIndex,recordNum);
		     	FORM_OBJECT_POOL.put("isSelected",false);
		     	
		     }
		 }
	 }
}

function onEditClick()
{
	 //window.event.cancelBubble = true;
	 if(window.event.stopPropagation)
	  	window.event.stopPropagation();
}

function onEditChange(cell)
{
	 var element = window.event.srcElement;
	 var gridName = element.getAttribute("gridName");
	 var value = element.value;
	 var grid = getFormObjectByName(gridName);

	 if(!validateType(element)){ 
	     value = grid.getValueAt(grid.getSelectedRecord(),element.title);
	     element.focus();		
	 }

	 var dsID = element.getAttribute("dsID");
	 var gridType = element.getAttribute("gridType");
	 //getFormObjectByName(gridName).setCell(cell, element.title,value);
}

 //cell - HTML table cell
 //colName - record column name
 //value - the new value
function setCell (cell, colName,value)
{
	if(!cell.firstChild)
	  	return;

	 var doc = document.getElementById(this.dsID).XMLDocument
	 var record = doc.selectSingleNode("//record[@num="+this.selectedRecord+" and @state >-1 and @state<3]");
	 var oldValue = record.selectSingleNode(colName).text;

	 if(oldValue!=value)
	 {
		  record.selectSingleNode(colName).text= value;
		  var state =  record.getAttribute("state");
		  if (state != 2 && state !=3)
		      record.setAttribute("state","1");
	 }
}

function updateView()
{
	 //isSelected = false; 
	 FORM_OBJECT_POOL.put("isSelected",false);
	 var doc = this.getXMLDocument();//document.getElementById(this.dsID).XMLDocument;
	 var styleDoc = document.getElementById(this.styleID).XMLDocument;
	 styleDoc.selectSingleNode("//xsl:apply-templates/@select").value = "./*[@num <= " +  parseInt(this.currentPage * this.pageSize) + " and @num > " + parseInt(this.currentPage - 1) * this.pageSize + "]";

	 var value = doc.transformNode(styleDoc);
	 //alert(value);
	 document.getElementById(this.name).innerHTML = value;
	 
	 if(this.onViewUpdate){
	     eval(this.onViewUpdate);
	 }
	
	 //set style of selectedRow
	 if(this.selectedRow>=0){
		 var row = document.getElementsByName(this.name)[0].getElementsByTagName("TABLE")[0].rows[this.selectedRow];
	 	 if(row!=null)
	    	row.className="td2";
	  }
}

function getXMLDocument()
{
 	return document.getElementById(this.dsID).XMLDocument;
}

function getValueAt(rowIndex,colName)
{//trows nullException when rowIndex, colName is wrong
	 var doc = this.getXMLDocument();
	 var root = doc.documentElement;
	 var record = root.selectSingleNode("//record[@num="+rowIndex+"]");
	 if(record){
	   var col = record.selectSingleNode(colName);
	   if(col)
	     return col.text;
	   else
	   {
	     alert("\u65e0\u6548\u7684\u5217\u6807\u8bc6: "+colName);
	     return null;
	   }
	  }
	  else{
	     alert("\u65e0\u6548\u7684\u884c\u6807\u8bc6: "+rowIndex);
	     return null;
	  }
}

function setValueAt(value,rowIndex,colName)
{
//trows nullException when rowIndex, colName is wrong
 var doc = this.getXMLDocument();
 var root = doc.documentElement;
 var record = root.selectSingleNode("//record[@num="+rowIndex+"]");
 if(record){
   var col = record.selectSingleNode(colName);
   if(col){
   	 var oldValue = col.text;
   	 if(oldValue!=value)
     {
       record. selectSingleNode(colName).text= value;
       var state = record.getAttribute("state");;
       if (state != 2 && state !=3)
          record.setAttribute("state","1");
     }
     this.updateView();
   } 
   else{
     alert("\u65e0\u6548\u7684\u5217\u6807\u8bc6: "+colName);
     return null;
   }
 } 
 else{
   alert("\u65e0\u6548\u7684\u884c\u6807\u8bc6: "+rowIndex);
   return null;
 }
}

function getRowCount(){
  return this.totalRecords;
}

function getRow(rowIndex){
  var doc = this.getXMLDocument();
  var root = doc.documentElement;
  var record = root.selectSingleNode("//record[@num="+(rowIndex)+"]");
  if(!record){
    alert("\u65e0\u6548\u7684\u7d22\u5f15\u503c ["+rowIndex+"]");
    return null;
  }
  return new GridRow(record);
}

function sort(field)
{
	 var doc = this.getXMLDocument();//document.getElementById(this.dsID).XMLDocument;
	 var styleDoc = document.getElementById(this.styleID).XMLDocument;
	 //get old sort field
	 sortField = styleDoc.selectSingleNode("//xsl:sort/@select");
	 //get old order policy(ascending or descending)
	 orderType = styleDoc.selectSingleNode("//xsl:sort/@order");
	 if(orderType.value =="descending")
	 {
	  orderType.value = "ascending";
	 }
	 else
	 {
	  orderType.value = "descending";
	 }
	 //set to new values
	 sortField.value = field;
	 document.getElementById(this.name).innerHTML = doc.documentElement.transformNode(styleDoc);
}

function set(obj, width) {
	var doc = this.getXMLDocument();
	var styleDoc = document.getElementById(this.styleID).XMLDocument;
    
	var  colname=obj.parentNode.colname; 
	var nextCol = obj.parentNode.nextSibling.colname;
	
	var cells = styleDoc.selectNodes("//td[@colname='"+colname+"']");
	var nextCells = styleDoc.selectNodes("//td[@colname='"+nextCol+"']");

	var newWidth;
	var oldWidth;
	var nextOldWidth;
	var nextNewWidth;
	
	for(var i=0;i<cells.length;i++){
		
	 	oldWidth = cells[i].getAttribute("width"); 
	 	nextOldWidth = nextCells[i].getAttribute("width");

	 	newWidth = parseInt(oldWidth) + parseInt(width);
	 	nextNewWidth = parseInt(nextOldWidth) - parseInt(width);

	    if(nextNewWidth<=20){
	    	return;
	    }
	    window.status = nextNewWidth;
     
	 	cells[i].setAttribute("width",newWidth);       
	 	nextCells[i].setAttribute("width",nextNewWidth);	
		 			
		if(i!=0){
		 	cells[i].childNodes[0].setAttribute("style","width:"+(newWidth)+";overflow:hidden;text-overflow:ellipsis");//(parseInt(obj.style.width)+parseInt(width))
		 	nextCells[i].childNodes[0].setAttribute("style","width:"+(nextNewWidth)+";overflow:hidden;text-overflow:ellipsis");//(parseInt(nextChild.style.width)- parseInt(width))
        	
        }
	}

	//  refresh
	document.getElementById(this.name).innerHTML = doc.documentElement.transformNode(styleDoc);
}

function ppage(direct) {
	fHideCalendar();
 if(direct=="next")
 {
  if(this.currentPage< this.totalPages)
    this.currentPage = parseInt(this.currentPage) + 1;
  else{
    this.currentPage =this.totalPages;
    return;
  }
 }
 else if(direct=="last")
 {
  if(this.currentPage == this.totalPages)
   return ;
  this.currentPage = this.totalPages
 }
 else if(direct=="prev")
 {
  if(this.currentPage > 1)
   this.currentPage = parseInt(this.currentPage) - 1;
  else
   return;
 }
 else if(direct=="first")
 {
  if(this.currentPage == 1)
   return;
  this.currentPage = 1;
 }
 else if(direct=="goto")
 {
  var num=event.srcElement.parentElement.parentElement.previousSibling.childNodes[0].value
  
  var pattern=/^\d+$/
  flag=pattern.test(num)
  if(flag)
  {
   if(num-this.totalPages>0||num==this.currentPage||num==0)
   {
     flag = false;//no info
     alert("\u60a8\u6240\u8f93\u5165\u7684\u6570\u5b57\u8d85\u8fc7\u9875\u9762\u6570\uff0c\u8bf7\u8f93\u5165 1~"+this.totalPages+"\u95f4\u7684\u6570\u5b57\u3002");
   }
  }
  if(flag)
  {
   this.currentPage= parseInt(num);
  }
  else
  {
  	
  }
 }
 
 var doc = this.getXMLDocument(); //document.getElementById(this.dsID).XMLDocument;
 var styleDoc = document.getElementById(this.styleID).XMLDocument;
 styleDoc.selectSingleNode("//xsl:apply-templates/@select").value = "./*[@num <= " +  parseInt(this.currentPage * this.pageSize) + " and @num > " + parseInt(this.currentPage - 1) * this.pageSize + "]";
 document.getElementById(this.name).innerHTML = doc.documentElement.transformNode(styleDoc);

 var pageInfoLabel = document.getElementById(this.name+"_page_and_total");
 if(pageInfoLabel){
 	pageInfoLabel.innerText = this.currentPage + "/" +this.totalPages;
 }
 this.selectedRow = -1;
 FORM_OBJECT_POOL.put("isSelected",false);
}

function refresh(pagesize)
{
 this.pageSize=pagesize;
 this.calcPageInfo();
 var doc = document.getElementById(this.dsID).XMLDocument;	
 var styleDoc = document.getElementById(this.styleID).XMLDocument;
 var selectAttr = styleDoc.selectSingleNode("//xsl:apply-templates/@select");
 selectAttr.value = "./*[@num <= " +  parseInt(this.currentPage * this.pageSize) + " and @num > " + parseInt(this.currentPage - 1) * this.pageSize + "]";

 document.getElementById(this.name).innerHTML = doc.transformNode(styleDoc);	
}

function calcPageInfo()
{
  var doc = this.getXMLDocument();//document.getElementById(this.dsID).XMLDocument;
  this.totalRecords = doc.selectNodes("/dataset/record[@state>-1 and @state<3]").length;
  this.totalPages = Math.ceil(this.totalRecords*1.0 / this.pageSize);
  if(this.currentPage>this.totalPages)
    this.currentPage = this.totalPages;
}

function sums(colName){
//nullException throws when colName is wrong
  var doc = document.getElementById(this.dsID).XMLDocument;
  //test type
  var node = doc.selectSingleNode("/dataset/record/"+colName);
  if(node){
    if(node.getAttribute("type")>=2 &&node.getAttribute("type")<=8){//?????????
      var nodes = doc.selectNodes("/dataset/record[@state>-1 and @state<3]/"+colName);
      var num = 0;
      for(i=0;i<nodes.length;i++){
      	if(isNaN(nodes.item(i).text) || !nodes.item(i).text)
      		num +=0;
  		else
  			num +=parseFloat(nodes.item(i).text);
      }
      return num;
    }
    else{
      return '';
    }  
  }
  else{
    alert("\u65e0\u6548\u7684\u5217\u6807\u8bc6: "+colName);
    return null;
  }
}

function getRecordCount(){
  return this.totalRecords;
}

function showPageControl(datagrid_name){
	 window.event.cancelBubble = true;

     var pcID=datagrid_name+"_pageControl"
     var pc=document.getElementById(pcID);

     if(pc==null){
        drawPageControl(datagrid_name)
     }
     pc=document.getElementById(pcID);
     if(pc.style.visibility=="hidden"){
       pc.style.visibility="visible";
     }
}

function drawPageControl(datagrid_name)
{
  var div=document.createElement("DIV");
  div.setAttribute("id",datagrid_name+"_pageControl")

  with(div.style)
  {
   visibility="hidden";
   position="absolute";
   //backgroundColor = "blue";
   //zIndex = "1000";
   //left="10px";
  }
  var widths=document.getElementById(datagrid_name).style.pixelWidth;//- imgCtrl.style.pixelWidth;

  var divhtml='<div  onclick="hiddeDataGrid();" onmousedown="window.event.cancelBubble = true" style="background-color:transparent"><table width="'+widths+'" cellspacing="0" cellpadding="0"  style="font-size:14px"><tr height="15" ><td align="left"  style="background-color:transparent;font-size:14px">';

  var grid =  getFormObjectByName(datagrid_name);

  if (grid.editable)
  {
    var vadd = '<a href="javascript:" onclick="getFormObjectByName(\''+datagrid_name+'\').addRow();getFormObjectByName(\''+datagrid_name+'\').updateView();" ><img src="unieap/pages/form/data/images/add.gif" style="cursor:hand;z-index:100" border="0"/></a>';
    var vdelete = '<a href="javascript:" onmousedown="window.event.cancelBubble = true" onclick="getFormObjectByName(\''+datagrid_name+'\').deleteRow()"><img src="unieap/pages/form/data/images/del.gif" style="cursor:hand;z-index:100" border="0"/></a>';
    //var vsave = '<a href="javascript:" onclick="getFormObjectByName(\''+datagrid_name+'\').saveXML(0)">\u4fdd\u5b58</a>';
    var rowaccess = parseInt(grid.rowaccess);

    if (rowaccess == 0) 
	  divhtml = divhtml ;//+ vsave;
	else if (rowaccess == 1) 
	  divhtml = divhtml + vadd + '&nbsp;' ;//+ vsave;
	else if (rowaccess == 2) 
	  divhtml = divhtml + vdelete + '&nbsp;';// + vsave;
	else if (rowaccess == 3) 
      divhtml = divhtml + '&nbsp;' + vadd + '&nbsp;&nbsp;' + vdelete ;//+ '&nbsp;' + vsave;
    else if( rowaccess == 4)
      divhtml = divhtml + vadd + '&nbsp;' + vdelete;
  }
  divhtml = divhtml +
            '</td>';

  if(grid.pageable){
            divhtml = divhtml +
            //'<td align="right" style="font-size:14px"><label id="'+datagrid_name+'_page_and_total" >'+grid.currentPage+'/'+grid.totalPages+'</label>&nbsp;</td>'+
   			'<td align="right" valign="center"><table cellspacing="0"><tr> ' +
   			'<td><a  href="javascript:" onclick="getFormObjectByName(\''+datagrid_name+'\').ppage(\'prev\')"><img src="unieap/pages/form/data/images/pre.gif"  style="cursor:hand" border="0"/></a></td>'+
   			'<td><a  href="javascript:" onclick="getFormObjectByName(\''+datagrid_name+'\').ppage(\'next\')"><img src="unieap/pages/form/data/images/next.gif" style="cursor:hand" border="0"/></a></td>'+   			
			'<td style="font-size:14px"><label id="'+datagrid_name+'_page_and_total" >'+grid.currentPage+'/'+grid.totalPages+'</label>&nbsp;</td>' +
			'<td><a  href="javascript:" onclick="getFormObjectByName(\''+datagrid_name+'\').ppage(\'first\');"><img src="unieap/pages/form/data/images/first.gif" style="cursor:hand;z-index:100" border="0"/></a></td>'+
   			'<td><a  href="javascript:" onclick="getFormObjectByName(\''+datagrid_name+'\').ppage(\'last\')"><img src="unieap/pages/form/data/images/last.gif" style="cursor:hand" border="0"/></a></td>'+
   			'<td><input type="text" size="1" /></td>'+
            '<td><a href="javascript:" onclick="getFormObjectByName(\''+datagrid_name+'\').ppage(\'goto\');"><img src="unieap/pages/form/data/images/button_go.gif" style="background-color:transpatent;cursor:hand;z-index:100" border="0"/></a></td>'+
   			'</tr></table></td>';
  }
  divhtml += '</tr></table></div><iframe frameborder="0" scrolling="no" border="1" style="position:absolute;visibility:inherit;top:0px;left:0px;width:'+widths+'px; height:25px;z-index:-1;"></iframe>';
  
  div.innerHTML=divhtml;
  div.attachEvent("onclick",function(){
  	             window.event.cancelBubble=true;
  });

  span = document.getElementById(datagrid_name);
  var point = fGetXY(span);
  div.style.top = (parseInt(point.y) +parseInt(span.offsetHeight));
  div.style.left = parseInt(point.x);
  div.style.zIndex = 1;
 
  document.body.appendChild(div);
  
  document.attachEvent("onclick",function(){
      var pcID=datagrid_name+"_pageControl"
      var pc=document.getElementById(pcID);
      if(pc)
	 pc.style.visibility = "hidden";
  });
  
  //span.style.zIndex = 2000;
  return div;
}

function hideControlPanel(datagrid_name)
{
  window.event.cancelBubble = true;
  var imgCtrlId = datagrid_name+"_imgCtrl";
  var imgCtrl = document.getElementById(imgCtrlId);
  var x = parseInt(imgCtrl.style.left);
  var y = parseInt(imgCtrl.style.top);
  var width = parseInt(imgCtrl.style.width);
  var height = parseInt(imgCtrl.style.height);
  var point = fGetXY(event.srcElement);
  var x1 = point.x + event.offsetX;
  var y1 = point.y + event.offsetY ;

  if(event.offsetY>document.getElementById(datagrid_name).style.posHeight){
     offset = parseInt(event.srcElement.scrollHeight)-parseInt(document.getElementById(datagrid_name).style.posHeight);
     y1 = y1-offset;
  }

  if(x1>(x-5) && x1<((x+width)+10)&& y1>(y-5)&& y1<(y+height+10))
  {
   return;
  }

  if(imgCtrl)
  {
   var pcID=datagrid_name+"_pageControl"
   var pc=document.getElementById(pcID);

   if(pc&&pc.style.visibility=="visible"){
        return;
   }
   imgCtrl.getElementsByTagName("IMG")[0].src = "form/data/images/open.gif";
   imgCtrl.style.display = "none";
   if(pc){
        pc.style.visibility = "hidden";
   }
  }
}
function getDefaultValue(typeText){
     /*if(isNaN(typeText))
        return "";
     var type = parseInt(typeText);
     if(type>=2 && type<=8){
      return "";
     }else
     if(type>=91 && type<=93){
      var newValue = new Date();
      day = newValue.getDate();
      mon = newValue.getMonth()+1;
      year = newValue.getYear();
      hour = newValue.getHours();
      minute = newValue.getMinutes();
      second = newValue.getSeconds(); 
        if (day<10) day='0'+day;
        if (mon<10) mon='0'+mon;
        if(hour<10) hour = '0'+hour;
        if(minute<10) minute = '0'+minute;
        if(second<10) second = '0'+second;
        //return year+"-"+mon+"-"+day+" "+hour+":"+minute+":"+second;
     }*/
     return "";
}

    //page initialization
	function pageInit(){
		document.onmousemove = MouseMoveToResize;
		document.onmouseup = MouseUpToResize;
		document.body.ondrag = function () {return false;};
	    //document.body.onselectstart = function () { return false; };
	}
	
	var dragobj=null;    //obj1 is used to store the selected span
	var grid_width = 0;

	function isIE(){	
		if(window.navigator.userAgent.indexOf('MSIE')>=1)
			return true;
	}	
	
	function isFirefox(){	
		if(window.navigator.userAgent.indexOf('Firefox')>=1)
			return true;
	}
	
	//handle onmousedown event 
	function MouseDownToResize(event,obj){
		obj.focus();
		
		var table = obj.parentNode.parentNode.parentNode.parentNode;
		obj =table;
		
		obj.parentTdW=obj.parentNode.offsetWidth;
		var sibling = obj.parentNode.nextSibling;
		if(!sibling){
			return;
		}
		document.body.style.cursor = "e-resize";
		obj.siblingW = sibling.offsetWidth;
		obj.totalWidth = obj.siblingW + obj.parentTdW;
	    if(obj.parentElement)
	        obj.mouseDownX=event.clientX;
	    else
	        obj.mouseDownX=event.pageX;
	        
	    dragobj=obj;//.parentNode.parentNode.parentNode.parentNode.parentNode;
	    //var grid = table;
	    grid_width = table.totalWidth;
	    //alert(grid_width);
		//alert(dragobj.totalWidth);
	}
	
	
	var width=0;
	//handle onmousemove events
	function MouseMoveToResize(event)
	{	
		var e = event||window.event;
		if(dragobj==null)
	        return false;
	
	    if(!dragobj.mouseDownX)
	        return false;
	
	    newWidth=dragobj.parentTdW+e.clientX-dragobj.mouseDownX;

		
		var sibling = dragobj.parentNode.nextSibling;
		//if width of column does not exceed minimum width 80, set column width
		if(newWidth>20 && (parseInt(grid_width)-parseInt(newWidth))>20 )//&& (dragobj.totalWidth-newWidth)>20
	    {
	        //dragobj.parentNode.style.width = dragobj.parentTdW+e.clientX-dragobj.mouseDownX;
			//sibling.style.width = dragobj.siblingW-e.clientX+dragobj.mouseDownX;
			window.status = e.clientX-dragobj.mouseDownX;
			width = e.clientX-dragobj.mouseDownX;
			//getFormObjectByName("datagrid2").set(dragobj, width);
	    }
		
	
		
	}
	
	function MouseUpToResize(event)
	{   
		if(dragobj==null)
	        return false;
	    var datagrid = dragobj.parentNode.parentNode.parentNode.parentNode.parentNode;
	    if(!datagrid){
	    	return;
	    }    
	    //alert(dragobj.parentNode.parentNode.parentNode.parentNode.parentNode.outerHTML);    
		getFormObjectByName(datagrid.name).set(dragobj, width);
	    dragobj.mouseDownX=0;
		document.body.style.cursor = "";
	    dragobj=null;
		
	}