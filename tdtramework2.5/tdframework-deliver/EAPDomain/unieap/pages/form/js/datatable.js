/****************************************************
*  Note  :datatable \u6570\u636e\u8868\u683c\u7684\u76f8\u5173\u5904\u7406\u65b9\u6cd5
*  author:app
*  date  :2007.10.24
*****************************************************/

//var currentRow = -1;

/* use to mark the current editing grid's name*/
var editDataTableName = "";

function DataTable(name,dsID){
	this.name = name;
	this.dsID = dsID;
	this.recordNumber = 0;
	this.totalRecords = 0;
	
	this.focusins=new Hashtable();
	this.focusouts = new Hashtable();
	this.changes = new Hashtable();
	
	
	this.totalPages = 1;
	this.pageSize = 10;
	this.currentPage = 1;
	
	this.editable;
	
	this.currentRow = -1;
	this.selectedRow ;
	this.dtXSLDoc;
	this.dtXMLDoc;
	
	this.onViewUpdate = "";
	this.onRowSelectionChanged = "";
	this.onRecordAdded = "";
	this.onSave = "";
	
	this.pageable = false;
	this.addable = true;
	this.delable = true;
	
	this.init = init;
	this.addRow = addRow;
	this.deleteRow = deleteRow;
	this.setSelectedRow = setSelectedRow;
	this.getSelectedRow = getSelectedRow;
	this.rowMouseOver = rowMouseOver;
	this.rowMouseOut = rowMouseOut;
	this.getValueAt = getValueAt;
	this.setValueAt = setValueAt;
	this.setDTEditable = setDTEditable;
	this.getDTEditable = getDTEditable; 
	this.getRow = getRow;
	this.getRowCount = getRowCount;
	this.sums = sums;
	this.calcPageInfo = calcPageInfo;
	this.getXMLDocument = getXMLDocument;
	this.getXSLDocument = getXSLDocument;
	this.editCurrentTBody = editCurrentTBody;
	this.replaceFigure = replaceFigure;
	this.hiddeTBody = hiddeTBody; 
	this.updateView = updateView;
	this.showPageControl = showPageControl;
	this.drawPageControl = drawPageControl;
	this.ppage= ppage;
}

function getDataTable(name,dsID,pagesize){

  var dataTable = FORM_OBJECT_POOL.get(name); 
  try{
   if(!dataTable){
     dataTable = new DataTable(name,dsID);
     dataTable.init(pagesize);
     FORM_OBJECT_POOL.put(name,dataTable);
     //FORM_OBJECT_POOL.put("isSelected",false);
   }
  }
  catch(e){
  	alert(e.description);    	 
  }
  return dataTable;
}

/**
 * initial method
 * author:ly_liuy@neusoft.com
 * date  :2007.10.25
 */
function init(pagesize){   

	var doc = this.getXMLDocument();
    
    firstRecord = doc.selectSingleNode("/formdata/"+this.dsID+"/record[0]");
    
    if(firstRecord.getAttribute("state")==3){
    	this.recordNumber = 0;
    }else{
    	this.recordNumber = doc.selectSingleNode("/formdata/"+this.dsID).childNodes.length-1;
    }
  
    this.totalRecords = this.recordNumber;
    this.pageSize = pagesize;
    this.totalPages = Math.ceil(this.totalRecords*1.0 / this.pageSize);
    
    var div = document.getElementById(this.name);
    
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

/**
 * add row
 * author:ly_liuy@neusoft.com
 * date  :2007.10.26
 */
function addRow(){

    hiddeDataTable();

 	var doc = this.getXMLDocument();
 	
    var record = doc.selectSingleNode("/formdata/"+this.dsID+"/record[0]"); 	
 	var newRecord = record.cloneNode(true);
 	if(newRecord.getAttribute("ov")){
 		newRecord.setAttribute("ov","");
 	}
 	var children = newRecord.childNodes; 
 	for(i=0;i<children.length;i++){
   		children.item(i).text = "";//getDefaultValue(children.item(i).getAttribute("type"));
 	}
 	newRecord.setAttribute("state","2");
	
 	//get first record of data_modify_state = 3
 	//all dirty records are at the end
 	var refNode = doc.selectSingleNode("/formdata/"+this.dsID+"/record[@state=3]");
 	if(!refNode){
     	refNode = doc.selectSingleNode("/formdata/"+this.dsID+"/record[@state=-1]");
    } 	
 	if(refNode){
     	record.parentNode.insertBefore(newRecord,refNode);
    } 	
 	else{
     	record.parentNode.appendChild(newRecord);
	}	
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
 	this.updateView();
 	this.currentRow = -1;
 	var container = document.getElementById(this.name);
 	if(container){
 		showScrollPos(container,"add");
 	}
 	
 	return new DataTableRow(newRecord);
}


/**
 * delect the selected row
 * author:ly_liuy@neusoft.com
 * date  :2007.10.26
 */
function deleteRow(){
 	//fHideCalendar();
 	
 	if(this.currentRow == -1){
  		alert("\u8bf7\u9009\u62e9\u4e00\u884c");
  		return;
 	}
 	var confirm = window.confirm("\u4f60\u8981\u5220\u9664\u8fd9\u6761\u8bb0\u5f55\u5417\uff1f");
 	if(!confirm) return;
 	var doc = this.getXMLDocument();
 	var styleDoc = this.getXSLDocument();
 	
 	var root = doc.selectSingleNode("/formdata/"+this.dsID);	
 	var record = doc.selectSingleNode("/formdata/"+this.dsID+"/record[@num="+this.currentRow+" and @state !=-1]"); 	
 	var state = record.getAttribute("state");
 	root.removeChild(record);
 	
 	if(state!=2){  
    	record.setAttribute("state","-1");
    	root.appendChild(record);
 	}
 	var curNum = record.getAttribute("num");
 	var nodes = doc.selectNodes("/formdata/"+this.dsID+"/record[@state !=-1 and @num>"+curNum+"]");
 	
 	for(i=0;i<nodes.length;i++){
   		nodes[i].setAttribute("num",parseInt(curNum)+i);
 	}

 	this.recordNumber--;

 	this.calcPageInfo();
 
 	var pageInfoLabel = document.getElementById(this.name+"_page_and_total");
 	if(pageInfoLabel){
 		pageInfoLabel.innerText = this.currentPage + "/" +this.totalPages;
 	}
 	hiddeDataTable();
 	
 	//styleDoc.selectSingleNode("//xsl:param[@name='datatable_page_number']/@select").value = this.currentPage -1;
 	


   	this.updateView();
    this.currentRow = -1;  
 	var container = document.getElementById(this.name);
 	if(container){
		//show scroll position
 		showScrollPos(container,"del");

 	}    

   
   var tbodys = container.getElementsByTagName("TBODY")[0];
   var trs = tbodys.childNodes[0];
   var editor;
   if(trs){
   	  var tds = trs.getElementsByTagName("TD");
   	  for(var i=0;i<tds.length;i++){  	  
   	  	editor = tds[i].editor;  	  	
   	  	if(editor){
   	  		calculateRelatives(editor,0);
   	  	}
   	  }
   }
   
   var input = document.getElementsByTagName("input")[0];
   
   if(input){
   	//calculateRelatives(input.name,0);
   }
}

/**
 * set current selected row
 * author:ly_liuy@neusoft.com
 * date  :2007.10.30
 */
function setSelectedRow(tbody){

    this.selectedRow = tbody;
    tbody.className = "selected";
    
    this.currentRow=tbody.rowindex;
   	//if(this.currentRow!=tbody.rowindex || this.currentRow==-1){
    	//tbody.className = "scrollContent";
    	//fire row selection changed event
    	if(this.onRowSelectionChanged){
       		eval(this.onRowSelectionChanged);
    	}
    	
  	//}	
  	
}

/**
 * get current selected row
 * author:ly_liuy@neusoft.com
 * date  :2007.10.30
 */
function getSelectedRow(){
	return this.currentRow;
}

/**
 * row mouse over process
 * author:ly_liuy@neusoft.com
 * date  :2007.10.30
 */
function rowMouseOver(tbody,sel){ 
 	if(sel!=this.currentRow){
  		tbody.className = "mouseover";//pink
  	}
}

/**
 * row mouse out process
 * author:ly_liuy@neusoft.com
 * date  :2007.10.30
 */
function rowMouseOut(row,sel){
 	if(sel!=this.currentRow){//this.selectedRow
 		row.className = "scrollContent";//white
   	}
}
/**
 * DataTableRow
 * author:ly_liuy@neusoft.com
 * date  :2007.10.26
 */
function DataTableRow(recordXML){ 
  	//var doc = this.getXMLDocument();
  	//var root = doc.selectSingleNode("/formdata/"+this.dsID);
    this.row = recordXML;
    this.getColumnValue = getColumnValue;
    this.setColumnValue = setColumnValue;
    this.getColumnName  = getColumnName;
    var datatable = getFormObjectByName(this.name);
    function getColumnValue(colName){
    	
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

/**
 * get row
 * author:ly_liuy@neusoft.com
 * date  :2007.10.31
 */
function getRow(rowIndex){
  	var doc = this.getXMLDocument();
  	var root = doc.selectSingleNode("/formdata/"+this.dsID);//doc.documentElement;
  	var record = root.selectSingleNode("//record[@num="+(rowIndex)+"]");
  	if(!record){
    	alert("\u65e0\u6548\u7684\u7d22\u5f15\u503c ["+rowIndex+"]");
    	return null;
  	}
  	return new DataTableRow(record);
}

/**
 * get row count
 * author:ly_liuy@neusoft.com
 * date  :2007.10.31
 */
function getRowCount(){
  return this.totalRecords;
}

/**
 * set editable
 * author:ly_liuy@neusoft.com
 * date  :2007.10.31
 */
function setDTEditable(editable){
  this.editable = editable;
  this.addable = editable;
  this.delable = editable;
}

/**
 * get editable
 * author:ly_liuy@neusoft.com
 * date  :2007.10.31
 */
function getDTEditable(){
  return this.editable;
}

/**
 * sums
 * author:ly_liuy@neusoft.com
 * date  :2007.10.31
 */
function sums(colName){
//nullException throws when colName is wrong
  var doc = this.getXMLDocument();//document.getElementById(this.dsID).XMLDocument;
  //test type
  var node = doc.selectSingleNode("/formdata/"+this.dsID+"/record/"+colName);
  if(node){
    if(node.getAttribute("type")>=2 &&node.getAttribute("type")<=8){
      var nodes = doc.selectNodes("/dataset/record[@state>-1 and @state<3]/"+colName);
      var num = 0;
      for(i=0;i<nodes.length;i++){
      	if(isNaN(nodes.item(i).text) || !nodes.item(i).text)
      		num +=0;
  		else
  			num +=parseFloat(nodes.item(i).text);
      }
      return num;
    }else{
      return '';
    }  
  }
  else{
    alert("\u65e0\u6548\u7684\u5217\u6807\u8bc6: "+colName);
    return null;
  }

}

/**
 * culculate page info
 * author:ly_liuy@neusoft.com
 * date  :2007.10.26
 */
function calcPageInfo(){
  	var doc = this.getXMLDocument();//document.getElementById(this.dsID).XMLDocument;
  	this.totalRecords = doc.selectNodes("//record[@state>-1 and @state<3]").length;
  	this.totalPages = Math.ceil(this.totalRecords*1.0 / this.pageSize);
  	if(this.currentPage>this.totalPages)
    	this.currentPage = this.totalPages;

}

/**
 * get formdata xml document
 * author:ly_liuy@neusoft.com
 * date  :2007.10.26
 */
function getXMLDocument(){
    
	if(!xmlDoc){
		xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
		xmlDoc.async = false;
		xmlDoc.load($form_private_cache+"/data.xml");
		
	} 
	/*if(!this.dtXMLDoc){
		
		var dataxml = ' <formdata>'+
					  ' '+xmlDoc.selectSingleNode("/formdata/"+this.dsID).xml+
					  ' </formdata>';
		this.dtXMLDoc = new ActiveXObject("MSXML2.DOMDocument");
		this.dtXMLDoc.async = false;
		this.dtXMLDoc.loadXML(dataxml);
	}*/

	return xmlDoc;
}

/**
 * get view.xsl xml document
 * author:ly_liuy@neusoft.com
 * date  :2007.10.29
 */
function getXSLDocument(){
	if(!xslDoc){
		xslDoc = new ActiveXObject("MSXML2.DOMDocument");
		xslDoc.async = false;

		xslDoc.load($form_template_cache+"/view.xsl");
		if(xslDoc){
			xslDoc.selectSingleNode("//xsl:param[@name='prvdata_path']/@select").value = "'"+$form_private_cache+"'"; 
			xslDoc.selectSingleNode("//xsl:param[@name='pubdata_path']/@select").value = "'"+$form_pub_cache+"'"; 
			xslDoc.selectSingleNode("//xsl:param[@name='template_path']/@select").value = "'"+ $form_template_cache+"'"; 
		}
	}
	
	if(!this.dtXSLDoc){
		var stylesheet='<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"'+
		' xmlns="http://www.w3.org/TR/REC-html40">'+
		' <xsl:output method="html" indent="yes"/>'+
		' <xsl:param select="0" name="prvdata_path"/>'+
		' <xsl:param select="0" name="pubdata_path"/>'+
		' <xsl:param select="0" name="template_path"/>'+
		' <xsl:param select="0" name="sys_image_path"/>'+
		' <xsl:param select="'+
		this.currentPage +
		'" name="datatable_page_number"/>'+
		' <xsl:template match="/">'+
		xslDoc.selectSingleNode("//div/div[@id='"+this.name+"']").xml +		
		'</xsl:template></xsl:stylesheet>';
		
		this.dtXSLDoc = new ActiveXObject("MSXML2.DOMDocument");
		this.dtXSLDoc.async = false;
		this.dtXSLDoc.loadXML(stylesheet);
		
	}
	return this.dtXSLDoc;
}

/**
 * get value at 
 * author:ly_liuy@neusoft.com
 * date  :2007.10.31
 */
function getValueAt(rowIndex,colName){//trows nullException when rowIndex, colName is wrong
 	var doc = this.getXMLDocument();
 	var root = doc.selectSingleNode("/formdata/"+this.dsID);//doc.documentElement;
 	
 	var record = root.selectSingleNode("/formdata/"+this.dsID+"/record[@num="+rowIndex+"]");
 	if(record){
   		var col = record.selectSingleNode(colName);
   		if(col)
     		return col.text;
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

/**
 * set value at 
 * author:ly_liuy@neusoft.com
 * date  :2007.10.31
 */
function setValueAt(value,rowIndex,colName){
	hiddeDataTable();
	//trows nullException when rowIndex, colName is wrong
 	var doc = this.getXMLDocument();
 	var root = doc.selectSingleNode("/formdata/"+this.dsID);//doc.documentElement;
 	var record = root.selectSingleNode("/formdata/"+this.dsID+"/record[@num="+rowIndex+"]");
 	if(record){
 	    
   		var col = record.selectSingleNode(colName);
   		
   		if(col){
   	 		var oldValue = col.text;
   	 		if(oldValue!=value){
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

/**
 * edit current tbody
 * author:ly_liuy@neusoft.com
 * date  :2007.10.26
 */
function editCurrentTBody(tbody){
	
	if(this.name!=editDataTableName){
		hiddeDataTable();
	}else{
		if(tbody.rowindex==this.currentRow){
			return;
		}
		if(this.currentRow!=-1){
			hiddeTBody(tbody,this.name);
		}	
	}

	
  	var tds = tbody.getElementsByTagName("td");
  	
  	var td;
  	var datatable = getFormObjectByName(this.name);
  	
  	for(i=0;i<tds.length-1;i++){
  		td = tds[i];
		
		replaceFigure(td,datatable,tbody.rowindex,i);

  	}
    
  	editDataTableName = this.name;
  	this.setSelectedRow(tbody);
  	
  	
  	
}

/**
 * replace td's inner figure
 * author:ly_liuy@neusoft.com
 * date  :2007.11.01
 */
function replaceFigure(td,datatable,rowindex,i){
	var nobr = td.childNodes[0]; 	

	var input;
	if(td.editor==null||""==td.editor){
		//continue;
		return;
	}
	    
	//if label do not replace
	if(nobr!=null && "LABEL"==nobr.tagName){
		return;
	}
	input = document.getElementsByName(td.editor)[0];//.parentNode;
	
  	if("combobox"==input.getAttribute("type")){
  		var options = input.options;
  		for(var j=0;j<options.length;j++){
  			if(td.innerHTML == options[j].value){					
  				input.setAttribute("value",options[j].value);
  			}
  		}

  	}else{		
		input.setAttribute("value",td.innerHTML);
	}
	td.innerHTML = "";	
		
	input.style.height = parseInt(input.style.height)-2;
	input.style.width = parseInt(input.style.width) - 1;
	input.style.fontStyle = td.style.fontStyle;
	input.style.fontWeight = td.style.fontWeight;
	input.style.fontFamily = td.style.fontFamily;
	input.style.color = td.style.color;
	
	var target = input.xpath;
	target = target.replace("record/","record[@num="+rowindex+"]/");
	var change = function(){setValue(input,target,rowindex)};
	datatable.changes.put(i,change);
	input.attachEvent ("onchange", change);
	var focusin = function(){beginEditing(input,target,rowindex)};
	datatable.focusins.put(i,focusin);	
	input.attachEvent ("onfocusin", focusin);	
	var focusout = function(){stopEditing(input,target,rowindex)};
	datatable.focusouts.put(i,focusout);
	input.attachEvent ("onfocusout", focusout);
	 	  	
	if("calendar"==input.getAttribute("type")){
		input.parentNode.style.display="block";
		td.appendChild(input.parentNode);
	}else{
		input.style.display="block";
		td.appendChild(input);
	}
}

/**
 * hidde last edit tbody
 * author:ly_liuy@neusoft.com
 * date  :2007.10.25
 */
function hiddeTBody(tbody,datatablename){
	
	var parent = tbody.parentNode;
	var datatable = getDataTable(datatablename);
	
	
	/*var cr = parseInt(datatable.currentRow)%10;
	if(cr==0){
		cr = 10;
	}
	var oldTD = parent.childNodes[cr+1];*/
	
	//+1 if running online is wrong 
	var oldTD = parent.childNodes[parseInt(datatable.currentRow)];
	//var node = parent.selectSingleNode("TFOOT");

	if("TFOOT"==parent.childNodes[1].tagName){
		oldTD = parent.childNodes[parseInt(datatable.currentRow)+1];
	}
	
	oldTD.className="scrollContent"
	
	var tds = oldTD.getElementsByTagName("td");
	var td ;
	var input;
	var nobr;
	
	for(var i=0;i<tds.length-1;i++){
		td = tds[i];
		
		if(null==td.editor||""==td.editor){
			continue;
		}
		
		input = td.childNodes[0];
		
		if(null==input || "LABEL"== input.tagName){
			continue;
		}
	    
		if("calendar"==input.getAttribute("type")){
			input = input.childNodes[0];
		}	
		
		input.detachEvent("onchange", datatable.changes.get(i));
		input.detachEvent("onfocusin", datatable.focusins.get(i));
		input.detachEvent("onfocusout", datatable.focusouts.get(i));
		input.style.height = parseInt(input.style.height)+2;
		input.style.width = parseInt(input.style.width)+1;
		
		td.style.fontFamily = input.style.fontFamily;
		td.style.fontStyle = input.style.fontStyle;
		td.style.fontWeight = input.style.fontWeight;
		td.style.color = input.style.color;

		if("calendar"==input.getAttribute("type")){
			parent.appendChild(input.parentNode);
		}else{
			parent.appendChild(input);
		}		
		
		td.innerHTML = input.value;
	}

}

/**
 * \u663e\u793a\u6570\u636e\u8868\u683c\u7684\u64cd\u4f5c\u83dc\u5355\u680f
 * author:ly_liuy@neusoft.com
 * date  :2007.10.24
 */
function showPageControl(datatable){
    
	var datagrid_name = datatable.name;
	window.event.cancelBubble = true;

    var pcID=datagrid_name+"_pageControl"
    var pc=document.getElementById(pcID);

    if(pc==null){
       drawPageControl(datatable)
    }
    pc=document.getElementById(pcID);
    if(pc.style.visibility=="hidden"){
      pc.style.visibility="visible";
    }
}

function drawPageControl(datatable_div){
	var datatable_name = datatable_div.name;
	var datatable =  getFormObjectByName(datatable_name);
  	
  	var div=document.createElement("DIV");
  	div.setAttribute("id",datatable_name+"_pageControl")
    
	with(div.style)
	{
		visibility="hidden";
	   	position="absolute";
	}

  	var widths = datatable_div.style.pixelWidth + 10;//document.getElementById(datatable_name).style.pixelWidth;//- imgCtrl.style.pixelWidth;
  	var divhtml='<div  style="background-color:transparent"><table width="'+widths+'" cellspacing="0" cellpadding="0"  style="font-size:14px"><tr height="15" ><td align="left"  style="background-color:transparent;font-size:14px">';
 	var vadd = '<a onclick="getFormObjectByName(\''+datatable_name+'\').addRow();" ><img src="unieap/pages/form/images/add.gif" style="cursor:hand;z-index:100" border="0"/></a>';
    var vdelete = '<a onmousedown="window.event.cancelBubble = true" onclick="getFormObjectByName(\''+datatable_name+'\').deleteRow()"><img src="unieap/pages/form/images/del.gif" style="cursor:hand;z-index:100" border="0"/></a>';
    //divhtml = divhtml + vadd + '&nbsp;' + vdelete;
    if(datatable.addable){
    	divhtml = divhtml + vadd;
    }
    if(datatable.delable){
    	divhtml = divhtml + '&nbsp;' + vdelete;
    }

  	divhtml = divhtml + '</td>';
  if(datatable.pageable){
            divhtml = divhtml +
            //'<td align="right" style="font-size:14px"><label id="'+datatable_name+'_page_and_total" >'+grid.currentPage+'/'+grid.totalPages+'</label>&nbsp;</td>'+
   			'<td align="right" valign="center"><table cellspacing="0"><tr> ' +
   			'<td><a  href="javascript:" onclick="getFormObjectByName(\''+datatable_name+'\').ppage(\'prev\')"><img src="unieap/pages/form/images/pre.gif"  style="cursor:hand" border="0"/></a></td>'+
   			'<td><a  href="javascript:" onclick="getFormObjectByName(\''+datatable_name+'\').ppage(\'next\')"><img src="unieap/pages/form/images/next.gif" style="cursor:hand" border="0"/></a></td>'+   			
			'<td style="font-size:14px"><label id="'+datatable_name+'_page_and_total" >'+datatable.currentPage+'/'+datatable.totalPages+'</label>&nbsp;</td>' +
			'<td><a  href="javascript:" onclick="getFormObjectByName(\''+datatable_name+'\').ppage(\'first\');"><img src="unieap/pages/form/images/first.gif" style="cursor:hand;z-index:100" border="0"/></a></td>'+
   			'<td><a  href="javascript:" onclick="getFormObjectByName(\''+datatable_name+'\').ppage(\'last\')"><img src="unieap/pages/form/images/last.gif" style="cursor:hand" border="0"/></a></td>'+
   			'<td><input type="text" size="1" /></td>'+
            '<td><a href="javascript:" onclick="getFormObjectByName(\''+datatable_name+'\').ppage(\'goto\');"><img src="unieap/pages/form/images/button_go.gif" style="background-color:transpatent;cursor:hand;z-index:100" border="0"/></a></td>'+
   			'</tr></table></td>';
  }
  	divhtml += '</tr></table></div><iframe frameborder="0" scrolling="no" border="1" style="position:absolute;visibility:inherit;top:0px;left:0px;width:'+widths+'px; height:25px;z-index:-1;"></iframe>';
  
  	div.innerHTML=divhtml;
  	div.attachEvent("onclick",function(){
  	 	window.event.cancelBubble=true;
  	});

  	var point = fGetXY(datatable_div);
  	div.style.top = (parseInt(point.y) +parseInt(datatable_div.offsetHeight)) + 2;//parseInt(datatable_div.style.top)+parseInt(datatable_div.offsetHeight);//"104px";//400;//
  	div.style.left = parseInt(point.x) + 3;//parseInt(datatable_div.style.left)+30;//"17px";//100;//
  	div.style.zIndex = 1;

  	//document.body.appendChild(div);
  	document.getElementById("formdiv").appendChild(div);
  
  	document.attachEvent("onclick",function(){
    var pcID=datatable_name+"_pageControl"
    var pc=document.getElementById(pcID);
    if(pc){
	 	pc.style.visibility = "hidden";
	};
	hiddeDataTable();
  	}); 
  	return div;

}

/**
 * hidde all edit rows of Datatable
 * author:ly_liuy@neusoft.com
 * date  :2007.10.26
 */
function hiddeDataTable(){
	var datatable = FORM_OBJECT_POOL.get(editDataTableName);
   	if(datatable){
   		if(datatable.currentRow==-1){
   			return;
   		}
   		hiddeTBody(datatable.selectedRow,datatable.name);
   		datatable.currentRow = -1;
 	}
}

/**
 * Update DataTable
 * author:ly_liuy@neusoft.com
 * date  :2007.10.29
 */
 
function updateView(){
	
 	var doc = this.getXMLDocument();
 	var styleDoc = this.getXSLDocument();
 	styleDoc.selectSingleNode("//xsl:param[@name='datatable_page_number']/@select").value = this.currentPage -1;
 	var value = doc.transformNode(styleDoc);

 	document.getElementById(this.name).parentNode.innerHTML = value;
 	
 	if(this.onViewUpdate){
     	eval(this.onViewUpdate);
 	}

	fixedHeadAndFoot(document.getElementById(this.name));
 	
 }
 
/**
 * turn page
 * author:ly_liuy@neusoft.com
 * date  :2007.10.29
 */ 
function ppage(direct){
 	
 	if(direct=="next"){
  		if(this.currentPage< this.totalPages){
    		this.currentPage = parseInt(this.currentPage) + 1;
    	}
  		else{
    		this.currentPage =this.totalPages;
    		return;
  		}
 	}
 	else if(direct=="last"){
 		if(this.currentPage == this.totalPages)
   			return ;
  		this.currentPage = this.totalPages
 	}
 	else if(direct=="prev"){
  		if(this.currentPage > 1)
   			this.currentPage = parseInt(this.currentPage) - 1;
  		else
   			return;
 	}
 	else if(direct=="first"){
  		if(this.currentPage == 1)
   			return;
  		this.currentPage = 1;
 	}
 	else if(direct=="goto"){
  		var num=event.srcElement.parentElement.parentElement.previousSibling.childNodes[0].value
  
  		var pattern=/^\d+$/
  		flag=pattern.test(num)
  		if(flag){
   			if(num-this.totalPages>0||num==this.currentPage||num==0){
     			flag = false;//no info
     			alert("\u60a8\u6240\u8f93\u5165\u7684\u6570\u5b57\u8d85\u8fc7\u9875\u9762\u6570\uff0c\u8bf7\u8f93\u5165 1~"+this.totalPages+"\u95f4\u7684\u6570\u5b57\u3002");
   			}
  		}
  		if(flag){
   			this.currentPage= parseInt(num);
  		}
  		else{}
 	}
 	//styleDoc.selectSingleNode("//xsl:param[@name='datatable_page_number']/@select").value = this.currentPage -1;
   	this.updateView();

 	var pageInfoLabel = document.getElementById(this.name+"_page_and_total");
 	if(pageInfoLabel){
 		pageInfoLabel.innerText = this.currentPage + "/" +this.totalPages;
 	}
 	this.currentRow = -1;
}
