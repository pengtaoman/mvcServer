/****************************************************
*  Note  :form print 表单的打印处理
*  author:app
*  date  :2007.10.16
*****************************************************/

var newWindow; 
var cssName = "form/data/css/form.css";
var a = 0;
var pageIDs;
/**
 * 记录超长的数据表格
 */
var hashtable = new Hashtable();
/**
 * 记录多行文本框
 */
var hashtable2 = new Hashtable();
/**
 * 多行文本框分页内容
 */
var hashtable3 = new Hashtable();
//stores all textareas style before print
var orgTextareas = new Hashtable();
/**
 * 记录多行文本框控件原始高度
 */
var posHeight = new Array();
/**
 * 记录多行文本框滚动高度
 */
var scrollHeight = new Array();
/**
 * 记录签章控件
 */
var seals = new Array();
/**
 * 是否包含打印模版
 */
var containPrint = false;
/**
 * 判断是打印操作还是预览操作的标志。打印=prnt,预览=pre
 */
var prtOrPre;
/**
 * 总的打印页数
 */
var pageNums =0;
/**
 * 打印范围标志
 */
var printTab = "all";
/**
 * 纸张方向
 */
var orientation = 1;

/**
 * \u8868\u5355\u6253\u5370\u7684\u8c03\u7528\u65b9\u6cd5
 * author:ly_liuy@neusoft.com
 * date  :2007.10.16
 */
function printAll(){
	var printable = FORM_OBJECT_POOL.get("printable");
    if(printable=="false") return;
    //
    this.prtOrPre = "prnt"
	containPrint = containPrintModel();
    var count = NSFTHandler.idCounterTab;
    if(containPrint){
       	var paramTable = getHrefParameters(); 
	    paramTable.setParameter("modelof","print");
	    paramTable.setParameter("subcmd","getpagecount");
	    count = parseInt(getModelInfo(paramTable));
    }
    hashtable.clear();
    hashtable2.clear();
    pageIDs = new Array();
    for(i=0;i<count;i++){
    	pageIDs[i] = "psd_form_tab"+i;
    }
	
	
	//先删除存放打印内容的DIV
	removeDiv("form_print_temp_div");
	
	/**
	* 创建iframe对象，用于存放打印处理的内容
	**/
	ifframe = document.createElement("iframe");
	ifframe.id = "form_innerF";
	ifframe.style.visibility = "hidden";

	ifframe.style.position = "absolute";
	ifframe.style.top = "0";
	ifframe.style.left = "0";
	ifframe.style.width = "10";
	ifframe.style.height = "10";
	
	document.body.appendChild(ifframe);
	
    //判断是否应用打印模板
    
    if(containPrint){
		var _s  = new Date();
		ifframe.src = getURL();
		//window.status = "put iframe"+(new Date()-_s);
		_s  = new Date();
		ifframe.attachEvent("onload",function(){processForm(ifframe.contentWindow.document,ifframe.contentWindow.document)});  	
		//window.status = window.status + "processForm"+(new Date()-_s);
    }
    else{
        var _s  = new Date();
	
		ifframe.contentWindow.document.write(document.getElementsByTagName("HEAD")[0].innerHTML+"<body></body>");

        //window.status = "put iframe"+(new Date()-_s);
		//_s  = new Date();
		processForm(document,ifframe.contentWindow.document);//ifframe.contentWindow.
		//window.status = window.status + "processForm"+(new Date()-_s);
    }
}
/**
 * 表单打印预览的调用方法
 * author:ly_liuy@neusoft.com
 * date  :2007.10.16
 */
function previewAll(){
   	//读取预览权限
    var printable = FORM_OBJECT_POOL.get("printable");

    //如果没有预览权限则返回
    if(printable=="false") return;
    
	//标记当前操作为预览
    this.prtOrPre = "prev"

    /**
     * 判断当前表单是否含有打印模版
     */
    this.containPrint = containPrintModel();

    //当前表单包含的页面数
    var count = NSFTHandler.idCounterTab;

     // 判断是否应用打印模板
     
     if(containPrint){
       	var paramTable = getHrefParameters(); 
	    paramTable.setParameter("modelof","print");
	    paramTable.setParameter("subcmd","getpagecount");
	    count = parseInt(getModelInfo(paramTable));
    }

    //
    this.hashtable.clear();
    //
    this.hashtable2.clear();
    this.pageIDs = new Array();
    for(i=0;i<count;i++){
    	pageIDs[i] = "psd_form_tab"+i;
    }

 
	//先删除存放打印内容的DIV
	removeDiv("form_print_temp_div");
	
	/**
	* 创建iframe对象，用于存放打印处理的内容
	**/
	ifframe = document.createElement("iframe");
	ifframe.id = "form_innerF";
	ifframe.style.visibility = "hidden";
	
	ifframe.style.position = "absolute";
	ifframe.style.top = "0";
	ifframe.style.left = "0";
	ifframe.style.width = "10";
	ifframe.style.height = "10";
	
	document.body.appendChild(ifframe);
	
    //判断是否应用打印模板
    
    if(containPrint){
		ifframe.src = getURL();
		ifframe.attachEvent("onload",function(){processForm(ifframe.contentWindow.document,ifframe.contentWindow.document)});  	
    }
    else{
        var _s  = new Date();
		ifframe.contentWindow.document.write(document.getElementsByTagName("HEAD")[0].innerHTML+"<body></body>");
        //window.status = "put iframe"+(new Date()-_s);
		//var _s  = new Date();
		processForm(document,ifframe.contentWindow.document);//ifframe.contentWindow.
		//window.status += "processForm"+(new Date()-_s);
 
    }
     //window.open("unieap/pages/form/formpreview.html","","scrollbars,menubar,status,height="+height+",width="+width+",resizable");
}

function setPrintTab(tab){
	printTab = tab;
}

function getPrintTab(){
	return printTab;
}

function setOrientation(orient){
	orientation = orient;
}

function getOrientation(){
	return orientation;
}

/**
 * 处理表单中需要打印的内容
 * author:ly_liuy@neusoft.com
 * date  :2007.10.16
 */
function processForm(doc,fra){

	/**
	 * 清空打印页面数
	 */
	 this.pageNums = 0;
    /*
     * 取套打标志，用于判断是否是套打
     */
    var overprint = document.forms(0).overprint;

	//设置打印页面的范围
	if(setPrintPageRange()){
		return;
	}

    //处理表单打印内容
	createPrintContent(doc,overprint,fra);
	
	//执行打印或预览
    printOrPreview(doc,fra);
}

function createPrintContent(doc,overprint,fra){

	//创建用于存放所有打印内容的临时 DIV
	//var ff = document.getElementById("form_innerF");
    var main_div = fra.createElement("div");//doc.createElement("div");//document.createElement("div");
    main_div.setAttribute("id","form_print_temp_div");
    //将打印内容DIV添加到表单中
    //document.body.appendChild(main_div);

	fra.body.appendChild(main_div);//doc.body.appendChild(main_div);

    //先隐藏此DIV(打印容器) 
    //main_div.style.visibility = "hidden";

	main_div.style.zIndex = -1;
	var ids = getPageIDs();    
    var idx = 0;
	/**
	 * 页面边距
	 * margin{top,right,bottom,left}
	 */	
    var margin = new Array(19.05,0,5,0);//new Array(19.05,19.05,19.05,19.05);
    //将可打印的页面复制并添加到打印容器中，并按页处理待打印的内容
    while(idx < ids.length){
 
       	/**
      	 * 计算当前打印页面对应的页码数
      	 */
      	var startNo = this.pageNums+idx+1;

		
		div = fra.createElement("div");//doc.createElement("div");//document.createElement("div");	  
       	div.setAttribute("id","PT_form_page"+(startNo));
       	var page = doc.getElementById(ids[idx]);         		
   	 	div.innerHTML = page.innerHTML;
   	 	//div.setAttribute("margin",page.margin);
		//div.setAttribute("margin",margin);
		//div.style.border="1 solid red";
      	main_div.appendChild(div);

      	
      	//处理每一页的内容
      	processGrid(div,doc,fra,containPrint,overprint);
      	processOthers(div,doc,fra,containPrint,overprint);
      	processSelect(div,doc,fra,containPrint,overprint);
      	processTextArea(div,doc,fra,containPrint,overprint);  	
      	processInput(div,doc,fra,containPrint,overprint);

      	/**
      	 * margin{top,right,bottom,left}
      	 */      	
      	//var margin = page.margin.split(",");
      	//page.margin = "";
      	
      	
      	/**
      	 * 毫米需要转换成像素
      	 */
		var pageHeight = page.height - parseInt(margin[0]*4) - parseInt(margin[2]*4) + 5;//
		var _s = new Date();
      	var pagefooter = getPageFooter(page);//doc.getElementById("pagefooter");
      	//window.status += "getfooter"+(new Date()-_s);
      	
      	
      	if(pagefooter){
      		pageHeight =  pagefooter.offsetTop ;
      	}		
		//window.status += pageHeight;
		var _s  = new Date();
      	this.pageNums += adjustDocument(div,pageHeight,startNo,fra);
		//window.status += "adjust "+(new Date()-_s);
		//window.status += this.pageNums+"&"+idx+"#";
		
      	idx++;	 
    }
 
    //处理签章控件
    //processSeals(doc);
    
 }
 /**
  * 取页脚
  */
function getPageFooter(doc){
	var spans = doc.getElementsByTagName("SPAN");
	for(var i=0;i<spans.length;i++){
		if("pagefooter"==spans[i].useas){
			return spans[i];
			break;
		}
	}
	return null;
}
 /**
  * 取页眉
  */
function getPageHeader(doc){
	var spans = doc.getElementsByTagName("SPAN");
	for(var i=0;i<spans.length;i++){
		//alert(divs[i].useas);
		if("pageheader"==spans[i].useas){
			return spans[i];
			break;
		}
	}
	return null;
}
 /**
  * 取标题
  */
function getPageTitle(doc){
	var spans = doc.getElementsByTagName("SPAN");
	for(var i=0;i<spans.length;i++){
		if("pagetitle"==spans[i].useas){
			return spans[i];
			break;
		}
	}
	return null;
}
/**
 * 选择表单页面打印范围
 */
function setPrintPageRange(){
	var s = showModalDialog("unieap/pages/form/formPrint.html",window,"dialogTop:300px;dialogLeft:300px;dialogWidth:365px;dialogHeight:300px;status:no;");
    
    if(!s){
    	return true;
    }
    if("all"==s){
    	
    }else
    if("special"==s){
    	var tab = getPrintTab();
    	this.pageIDs = new Array();
    	this.pageIDs[0] = tab;
    }else
    if("range"==s){ 
    	var tab = getPrintTab();
    	var nums = tab.split("-");
    	this.pageIDs = new Array();
    	var n=0;
    	if(nums.length>1){
    		for(var i=parseInt(nums[0]);i<=parseInt(nums[1]);i++){
    			this.pageIDs[n++] = "form_page_"+(i-1);
    		}
    	}
    	nums = tab.split(",");
    	n=0;
    	if(nums.length>1){
    		for(var i=0;i<nums.length;i++){
    			this.pageIDs[n++] = "form_page_"+(parseInt(nums[i])-1);
    		}
    	}
    }
}
/**
 * 执行打印或预览
 */
function printOrPreview(doc,fra){
 	 /*
 	  * 创建打印对象
 	  */
     var myreport = new Object();
     
     /**
      * 去除onfocusin上方法，以免弹出打印设置窗口操作完毕后，
      * 焦点回到当前页面此方法被执行，导致打印找不到指定页面
      */
     //document.detachEvent("onfocusin",A);

     myreport.documents = fra;//doc;//document;
     //myreport.copyrights='杰创软件拥有版权 www.jatools.com';//1,2,0,2
     myreport.copyrights='\u6770\u521b\u8f6f\u4ef6\u62e5\u6709\u7248\u6743 www.jatools.com';//1,2,0,2
     
     myreport.page_div_prefix = "PT_form_";
     
     settings = new Object();

     settings.orientation =parseInt(this.orientation);
     settings.load_print_settings_if_exists = false;    

     myreport.print_settings = settings; 

	 myreport.ondone=function(){
 	 if(jatoolsPrinter.state=='ok'){
    		 //alert("ok");
    	 }else{
    		 alert(jatoolsPrinter.error);
    	 }
     }
     myreport.marginIgnored = true;
	
     if(!document.getElementById("jatoolsPrinter")){
	     var div =  document.createElement("div");
 		 div.innerHTML = "<OBJECT ID=\"jatoolsPrinter\" style=\"display: none\" CLASSID=\"CLSID:B43D3361-D975-4BE2-87FE-057188254255\" codebase=\"unieap/pages/form/jatoolsP.cab#version=1,2,0,2\"></OBJECT>";
 		 //div.innerHTML = "<OBJECT ID=\"jatoolsPrinter\" style=\"display: none\" CLASSID=\"CLSID:B43D3361-D975-4BE2-87FE-FFFF88254255\" codebase=\"unieap/pages/form/jatoolsPrinter_f.cab#version=2.1.0.5\"></OBJECT>";
	   	 document.body.appendChild(div);
		 //doc.body.appendChild(div);
	 }
	try{
		
		if(typeof(jatoolsPrinter.page_div_prefix)=='undefined'){
        	//alert("请按页顶上的黄色提示下载ActiveX控件.如果没有提示请按以下步骤设置ie.\n 工具-> internet 选项->安全->自定义级别,设置 ‘下载未签名的 ActiveX ’为'启用'状态")
        	removeDiv("form_print_temp_div");
			var sFeatures="dialogTop=200px;dialogLeft=100px;dialogHeight: 240px;dialogWidth=430px; status:no;";//"dialogTop=200,dialogLeft=100,dialogHeight=200px, dialogWidth=400px, status:no"
			window.showModalDialog("unieap/pages/form/install.jsp","",sFeatures);
        	return ;
    	}
		if(this.prtOrPre == "prev"){
     	   jatoolsPrinter.printPreview(myreport);
     	}else if(this.prtOrPre == "prnt"){
           jatoolsPrinter.print(myreport,true);
		   //jatoolsPrinter.printPreview(myreport);
     	}
     	/**
     	 * 在onfocus上增加方法，在打印结束后，焦点回到表单页面时，
     	 * 将临时打印div移除
     	 */
     	//document.attachEvent("onfocusin",A); 
 
     	
	}catch(e){
		/*
		 * 删除存放打印内容的DIV
		 */
		removeDiv("form_print_temp_div");
		//var sFeatures="dialogTop=200px;dialogLeft=100px;dialogHeight: 240px;dialogWidth=430px; status:no;";//"dialogTop=200,dialogLeft=100,dialogHeight=200px, dialogWidth=400px, status:no"
		//window.showModalDialog("unieap/pages/form/install.jsp","",sFeatures);
		
	}finally{
		
	}
}
function A(){removeDiv("form_print_temp_div"); }
/**
 * 如果不使用套打，则用空白行填充数据表格剩余空间
 *
 */
function fillGridWithBlankRow(grid,doc,fra){
    var grids = hashtable.values();
    var left = 0;
    var right = 0;
    var top = 0;
    
    //for(i=0;i<grids.length;i++){
    	
      //if(grids[i].parentNode.tagName!="TD")
      //{
    	//var sibling = grids[i].nextSibling;
    	//var total_records = grids[i].getElementsByTagName("TR").length - 1;
    	var total_records = grid.childNodes[0].childNodes[0].childNodes.length;//grid.getElementsByTagName("TR").length - 1;
    	
    	//alert(grid.childNodes[0].childNodes[0].childNodes.length);
    	var n =0;
    	//var pagesize = grids[i].pagesize;
    	var pagesize = grid.pagesize;
    	if(pagesize>total_records){
    	    record_num = total_records;
    	    
    	}else{
    	    record_num = pagesize;
    	}
    	
    	//var rowHeight = parseInt(grids[i].getAttribute("rowHeight"));
    	//var oldHeight = parseInt(grids[i].getAttribute("oldHeight"));

    	var rowHeight = parseInt(grid.getAttribute("rowHeight"));
    	var oldHeight = parseInt(grid.getAttribute("oldHeight"));

    	var dh = rowHeight * record_num + 17 - oldHeight;//grids[i].offsetHeight - oldHeight;
    	
   		//var tables = grids[i].getElementsByTagName("TABLE");	
   		var tables = grid.getElementsByTagName("TABLE");
    	/*if(tables.length==1){
    	    //dh = parseInt(tables[0].offsetHeight) - oldHeight;
    	}else
    	    dh = parseInt(tables[0].offsetHeight) - oldHeight + parseInt(tables[1].offsetHeight); 
    	//alert(grids[i].offsetHeight);   */ 
  	    
    	if(dh <=0){ 
 
    	   	tables[0].style.visibility = "hidden";
			
		var rows = tables[0].rows;
    	   	var tr = rows(0); //head
    	   	var ths = tr.childNodes;
    	   	var len = ths.length;
    	   	
    	   	while(dh<0&&n<(pagesize - record_num))
    	        {
    	   	    if(rowHeight + dh >0)
    	            rowHeight = -dh;
     	   	    
     	   	    newTR = tables[0].insertRow(-1); //document.createElement("TR");
    	   	    newTR.setAttribute("height",rowHeight);
    	   	    newTR.setAttribute("className","td1");
	    	   	for(k=0;k<len;k++){
	    	   	    newTD = newTR.insertCell(-1); //document.createElement("TD");
	    	   	    newTD.setAttribute("className","normal_cell");
	    	   	    newTD.setAttribute("width",ths.item(k).getAttribute("width"));
	    	   	    newTD.style.borderColor = ths.item(k).style.borderColor;
	    	   	    newTD.setAttribute("height",rowHeight);
	    	   	    newC = fra.createElement("NOBR");;//doc.createElement("NOBR");//document.createElement("NOBR");
	    	   	    newC.style.textOverflow = 'ellipsis';
	    	   	    newC.innerHTML="&nbsp;";
	    	   	    newTD.appendChild(newC);
	    	   	}
	    	   	dh = dh + rowHeight;
	    	   	n++;
    	        }
    	        tables[0].style.visibility = "visible";
    	   }

      //}
}
/**
 * 处理表单页面元素
 * author:ly_liuy@neusoft.com
 * date  :2007.10.16
 */
function processGrid(div,doc,fra,usePrintModel,overprint){
    //将表单上的事件去掉
    doc.onclick = "doNothing()";
    //process datagrid
    var newXML = new ActiveXObject("MSXML2.DOMDocument");
    newXML.async = false;
    var datasetNode = newXML.createElement("dataset");
    newXML.appendChild(datasetNode);
    var dgs = div.getElementsByTagName("DIV");
	
    for(i=0;i<dgs.length;i++){
 	
      if(dgs[i].type){
      
           var xmlID;
           var xslID;

       	   if(dgs[i].type=="datagrid"){
      	   		xmlID = "grid_" + dgs[i].datasource;	
      	   		xslID = xmlID+"_xsl";
      	   }else
      	   if(dgs[i].type=="appendtable"){
      	   		xmlID = dgs[i].id+"_xml";	
      	   		xslID = xmlID+"_xsl";
      	   }else{
      	   		continue;
      	   }
      	   var xml;
      	   var xsl;

//      	   if(usePrintModel){

      	        xml = doc.getElementById(xmlID);//htmlXmlDoc.selectSingleNode("//xml[@id='"+xmlID+"']");
     	  	    xsl = doc.getElementById(xslID);//htmlXmlDoc.selectSingleNode("//xml[@id='"+xslID+"']");
 
//     	   }else{
//      	   	xml = doc.getElementById(xmlID);//opener.document.getElementById(xmlID);//
//	       	    xsl = doc.getElementById(xslID);//opener.document.getElementById(xslID);//
//	       }
	   
       	   xml = xml.cloneNode(true);
	       xsl = xsl.cloneNode(true);


       	   var temp = xsl.selectSingleNode("//xsl:template[@match='record']");
       	   tr = temp.selectSingleNode(".//tr");
	
       	   tr.selectSingleNode("@onclick").value = "doNothing()";
       	   tr.selectSingleNode("@onmouseover").value = "doNothing()";
       	   tr.selectSingleNode("@onmouseout").value = "doNothing()";
       	   tds = tr.selectNodes("td");
       	  
       	   for(j=0;j<tds.length;j++){
       	   		if(overprint=="true"){
       	        	tds.item(j).setAttribute("border-style","none");
       	        	tds.item(j).setAttribute("class","hidden_cell");
       	        }
	       	   	tdclick = tds.item(j).selectSingleNode("@onclick");
	       	   	if(tdclick)
	       	   	   tdclick.value ="doNothing()";
       	   }
       	   tds = xsl.selectNodes("//table/tr/th");
       	   
       	   for(j=0;j<tds.length;j++){
       	       if(overprint=="true"){
       	        	tds.item(j).setAttribute("border-style","none");
       	        	tds.item(j).setAttribute("class","hidden_cell");
       	        }
       	   	   tdclick = tds.item(j).selectSingleNode("@onclick");
       	   	   if(tdclick)
       	   	      tdclick.value ="doNothing()";
       	   }
       	   
       	   dgs[i].setAttribute("oldHeight",dgs[i].style.height);

       	   dgs[i].onmouseleave = "doNothing()";
       	   dgs[i].onmouseenter = "doNothing()";
       	   
       	   var exprTableHeight = 0;
       	   tables = xsl.selectNodes("//table"); 
       	   if(tables.length==2){
       	   		footTrs = tables.item(1).selectNodes("tr");
       	   		for(k=0;k<footTrs.length;k++){ 
       	   			exprTableHeight += parseInt(footTrs.item(k).getAttribute("height"));
       	   		}
       	   }
       	   //
       	   var allRowHeight = parseInt(dgs[i].style.height) - parseInt(dgs[i].headerheight) - exprTableHeight;
       	   var displayRows =  dgs[i].pagesize;//parseInt(allRowHeight/parseInt(dgs[i].rowheight));
         
	   	   temp = datasetNode.cloneNode(false);
	   	   newXML.replaceChild(temp,datasetNode);
	   	   datasetNode = temp;
    	   records = xml.selectNodes("//record[@state>=0 and @state<3]");
		   //alert(records.length);
       	   for(k=0;k<records.length;k++){//k<displayRows&&
       	   		datasetNode.appendChild(records.item(k));
       	   		
       	   }

       	   
       	   //pool the object
       	   hashtable.put(dgs[i].id,dgs[i]);
       	   var selAttr = xsl.selectSingleNode("//xsl:apply-templates/@select");
       	   if(selAttr)
       	      selAttr.value = "record"; 
       	   dgs[i].innerHTML = newXML.transformNode(xsl);
       	
		   
       	   /**
       	    * 如果此数据表格非嵌套在任何控件内，则正常打印。
       	    */
       	   //if(dgs[i].parentNode==div){
       	   		dgs[i].style.border = "none";
       	   		//dgs[i].style.borderTop = "none";
       	   		//dgs[i].style.borderLeft = "none";
       	   //}

	   	   dgs[i].style.overflowY = "hidden";
//       	   //dgs[i].style.visibility = "hidden";
//
//       	   //dgs[i].style.scroll = "auto";
//       	   
//       	   tables = dgs[i].getElementsByTagName("table");
//       	   if(tables!=null && tables.length>=2){
//       	   	tables[1].style.position = "relative";
//       	   		tables[1].style.top = '';
//       	   		
//       	   }
          
       	   if(overprint=="true"){
	       	   var trs = dgs[i].getElementsByTagName("TR");
	           var ths = trs[0].getElementsByTagName("TD");
	           dgs[i].style.borderStyle= "none";
	           for(j=0;j<ths.length;j++){
	             ths[j].style.borderStyle = "none";
	             ths[j].className = "empty_cell";
	             ths[j].innerText = "";
	           }
           }
           fillGridWithBlankRow(dgs[i],doc,fra);
           
           
		   
       }
       //dgs[i].style.border = "solid 1px black";
       //alert(dgs[i].outerHTML);
       
    }
	
   
    var tableList = div.getElementsByTagName("TABLE");
    for(i=0;i<tableList.length;i++){
    	if(tableList[i].printable=="false"&&overprint=="true"){
        	tableList[i].parentNode.removeChild(tableList[i]);
        	i--;
        	continue;
        }
        tableList[i].style.borderStyle="none";
    	if(overprint=="true"){
    		if(tableList[i].type=="table"){ 
    		    //tableList[i].style.borderStyle="none";
    			var tdLists = tableList[i].getElementsByTagName("TD");
    			for(j=0;j<tdLists.length;j++){
	    			tdLists[j].className = "hidden_cell";
	    			tdLists[j].style.borderStyle = "none";	   			
    			}
    		}
    	}
    }    

}

function processSelect(div,doc,fra,usePrintModel,overprint){
	var selects = div.getElementsByTagName("select");
    for(i=0;i<selects.length;i++){
    	if(selects[i].style.visibility=="hidden"||selects[i].printable=="false"&&overprint=="true"){
    		selects[i].parentNode.removeChild(selects[i]);
    		i--;
    		continue;
    	}
    	label = fra.createElement("label");//doc.createElement("label");//document.createElement("label");
    	if(selects[i].selectedIndex>=0 )
    	   label.innerText = selects[i].options[selects[i].selectedIndex].text;
    	label.style.position = selects[i].style.position;
    	label.style.top = selects[i].style.top;
    	label.style.left = selects[i].style.left;
    	label.style.width = selects[i].style.width;
    	label.style.height = selects[i].style.height;
    	label.style.lineHeight = selects[i].style.height;
    	label.style.fontFamily = selects[i].style.fontFamily;
    	label.style.fontSize = selects[i].style.fontSize;
    	label.style.fontStyle = selects[i].style.fontStyle;
    	label.style.fontWeight = selects[i].style.fontWeight;
    	label.style.foreground = selects[i].style.foreground;
    	label.style.background = selects[i].style.background;
    	label.style.overflow = "hidden";
    	label.style.textOverflow = "ellipsis";
    	
    	selects[i].parentNode.replaceChild(label,selects[i]);
    	i--;
    }
}
function processOthers(div,doc,fra,usePrintModel,overprint){
	 //remove all iframes 
    var iframes = div.getElementsByTagName("iframe");
    for(i=0;i<iframes.length;i++){
    	iframes[i].parentNode.removeChild(iframes[i]);
    	i--;
	}
    var labels = div.getElementsByTagName("label");
    for(i=0;i<labels.length;i++){
      if(labels[i].printable=="false"&&overprint=="true"){
        labels[i].parentNode.removeChild(labels[i]);
        i--;
      }
    }    
    var imgs = div.getElementsByTagName("img");
    for(i=0;i<imgs.length;i++){
    	if((imgs[i].src && imgs[i].src.indexOf("unieap/pages/form/data/images/calendar.gif")!=-1) ||
    	    (imgs[i].src && imgs[i].src.indexOf("unieap/pages/form/data/images/datatree.gif")!=-1)||
    	    (imgs[i].id) || imgs[i].printable=="false"&&overprint=="true"){
    	    imgs[i].parentNode.removeChild(imgs[i]);
    	    i--;
    	}

    }
    
    var objs = div.getElementsByTagName("object");
    var k =0 ;
    for(i=0;i<objs.length;i++){
		if(objs[i].type=="seal"){
		    //loadSeal("seal1","","");
		    seals[k] = objs[i].id;
		    k++;	
		}
		objs[i].parentNode.removeChild(objs[i]);    
	    	i--;
    }
}

/**
 * 打印结束后将临时DIV清除
 * author:ly_liuy@neusoft.com
 * date  :2007.10.16
 */
function removeDiv(id){
   var ff = document.getElementById("form_innerF");

   if(ff){
   	document.body.removeChild(ff); 
   } 	

   var temp_div = document.getElementById(id);
   if(temp_div){
		document.body.removeChild(temp_div);
   }
}


/**
 * 判断打印模板是否存在
 * author:ly_liuy@neusoft.com
 * date  :2007.10.16
 */
function containPrintModel(){
    var paramTable  =  getHrefParameters(); 
    try{ 
		var contains = formCommandRequest("com.neusoft.form.engine.FormExistsCommand","",paramTable);
    }catch(e){
		alert(e.description);
    }

    if(contains=="1") {
		return true;
	}

    return false;
}

/**
 * 取打印页面大小
 * author:ly_liuy@neusoft.com
 * date  :2007.10.16
 */
function getModelInfo(paramTable){
    var rect = formCommandRequest("com.neusoft.form.engine.GetModelInfo","",paramTable);
    return rect;
}

function getURL(){
    var parameter = getHrefParameters();  
    var path = document.location.pathname;
    var pos=path.lastIndexOf('/', path.length-1);
    path = path.substring(0,pos);
    var url="http://"+ document.location.hostname + ":" + document.location.port + path +"/XMLReceiver?command=com.neusoft.form.engine.FormPrintListener";
    if(parameter.length()>0){
        url += "&"+parameter.toString();
        url = url.substring(0,url.length-1);
    }
    return url;
}

function getPageIDs(){
	return pageIDs;
}

function getPageNames(){
	return NSFTHandler.f_tab_names;
}

function doNothing(){
}

function processSeals(doc){
   var sealname;
   for(var i=0;i<seals.length;i++){
   	div = doc.createElement("DIV");//document.createElement("DIV");
   	div.innerHTML = "<OBJECT id='"+seals[i]+"_clone' width=175 height=175 classid=clsid:A8EC4408-44CC-4AB2-998E-04AAF65EDBBB></OBJECT>"; 
   	sealname = seals[i].substring(0,seals[i].length-7);
   	oDiv = doc.getElementById(sealname+"_div");;//document.getElementById(sealname+"_div");

   	div.style.position = "absolute";
   	div.style.left = oDiv.style.left;
    div.style.top = oDiv.style.top;  
   	div.style.posWidth = 175;
   	div.style.posHeight  = 175;
   	//document.body.appendChild(div);
	doc.body.appendChild(div);
   	seal = doc.getElementById(seals[i]+"_clone");;//document.getElementById(seals[i]+"_clone");
   	seal.Width = 175;
   	seal.Height = 175;
   	seal.style.posWidth = seal.Width;
    seal.style.posHeight = seal.Height;
   	sealContentData(sealname,doc);
   	loadSealSignedString(sealname,doc);
   }
}

function sealContentData(sealName,doc){ 
    var seal = doc.getElementById(sealName+"_object_clone");//document.getElementById(sealName+"_object_clone");
	var signedFields = parent.doc.getElementsByName(sealName)[0].signedfields;;//parent.document.getElementsByName(sealName)[0].signedfields;
	if(!signedFields){
		return ;
	}
	fieldNames = signedFields.split(",");
	var value="";
	if(fieldNames){
		for(j=0;j<fieldNames.length;j++){
			if(j==0){
				value = parent.doc.getElementsByName(fieldNames[j])[0].value;;//parent.document.getElementsByName(fieldNames[j])[0].value;
			}else{
				value = parent.doc.getElementsByName(fieldNames[j])[0].value +";" + value;;//parent.document.getElementsByName(fieldNames[j])[0].value +";" + value;
			}
		}
		seal.ContentData = value;
	}
}

function loadSealSignedString(sealName,doc){
	var value = parent.doc.getElementsByName(sealName)[0].value;;//parent.document.getElementsByName(sealName)[0].value;
	value = value.replace("&#47;","/");
	var seal = doc.getElementById(sealName+"_object_clone");;//document.getElementById(sealName+"_object_clone");
	seal.LoadFromString(value);
}

var textarea_pagenum;

function processTextArea(div,doc,fra,usePrintModel,overprint){
	
//***********process textarea  start********************
    textarea_pagenum = 1;

    var textareas =div.getElementsByTagName("textarea");
    var textarea;

    for(i=0;i<textareas.length;i++){
	    textarea = textareas[i];
		
	    //remove spaces after value string
	    textarea.value = textarea.value.delnull();
	    textarea.value = textarea.value.rtrim();
	
		//alert(text);
	    //if textarea is hidden or don't need print, remove.
		if(textarea.style.visibility=="hidden"||textarea.printable=="false"&&overprint=="true"){
	    		textarea.parentNode.removeChild(textarea);    		
	    		i--;
	    		continue;
	    }
	
        if(textarea.offsetHeight>=textarea.scrollHeight || textarea.parentNode!=div){
 			/*
 			 * 如果嵌套在表格或者组合中的多行文本框，将不进行扩展打印处理
 			 * 但如果文字超长，会对文字进行缩小处理，以尽可能在可视范围内打印显示更多的数据
 			 */
 			changeTextAreaFontSize(textarea,overprint,doc,fra);      	
        }else{
			//changeTextAreaFontSize(textarea,overprint,doc,fra);  
		    if(overprint == "true"){
		    	textarea.style.borderStyle = "none";
		    }else{
		    	if(textarea.style.borderStyle.indexOf("solid")<0){
		    		textarea.style.borderStyle="none";
		    	}
		    }

		    textarea.style.overflow = "hidden";
		    if(textarea.readOnly=="true")
		    	textarea.style.filter = "";        	
        }
   }
//*********process textarea end**********************
}
function changeTextAreaFontSize(textarea,overprint,doc,fra){
    label = fra.createElement("label");//doc.createElement("label");  ;//document.createElement("label");   	
    label.innerText = textarea.value;
	label.style.fontSize = textarea.style.fontSize;
    label.style.position = textarea.style.position;
    label.style.top = textarea.style.top;
    label.style.left = textarea.style.left;
    label.style.width = textarea.style.width;
    label.style.height = textarea.style.height;
    label.style.fontFamily = textarea.style.fontFamily;
    label.style.fontStyle = textarea.style.fontStyle;
    label.style.fontWeight = textarea.style.fontWeight;
    label.style.foreground = textarea.style.foreground;
    label.style.background = textarea.style.background;

	if(overprint=="true"){
    		label.style.borderStyle = "none";
    	}
    	else{
    		label.style.borderStyle = textarea.style.borderStyle;
    		label.style.borderWidth = textarea.style.borderWidth;
	    	label.style.borderColor = textarea.style.borderColor;
    	}
	label.style.textAlign =  textarea.style.textAlign;    	
    label.style.margin = textarea.style.margin;
    label.style.wordBreak  = textarea.style.wordBreak;//"keep-all";
    label.style.wordWrap = "break-word";//textarea.style.wordWrap;//
    label.style.overflow = "hidden";
    label.style.textOverflow = "ellipsis"; 
    	
    if(label.style.borderStyle.indexOf("solid")<0){
         label.style.borderStyle = "none";
    }else{
    if(label.style.borderTopWidth>0)
         label.style.borderStyle = "none";
    }

    //add a temp div to the document
    var temp1;
	var temp = fra.createElement("div");//doc.createElement("div");;//document.createElement("div");
	temp.innerHTML = textarea.outerHTML;
	//document.body.appendChild(temp);
	//doc.body.appendChild(temp);
	fra.body.appendChild(temp);
	temp1 = temp.childNodes[0];

    try{
    	var scroll_h= temp1.scrollHeight;
    	var scroll_h_m = scroll_h;
    	var pos_h = temp1.style.posHeight; 
    	
		var f_size = temp1.style.fontSize;
		var temparea = temp1;	
		var isPrintAgain = false; 

        //process content of the textarea
	  	while(parseInt(scroll_h)>parseInt(pos_h)){
	    	if(f_size.indexOf("px")>0){
		   		if(parseFloat(temp1.style.fontSize)<10){
		   		   	scrollHeight[a] = scroll_h_m;
					posHeight[a] = pos_h;
					temp1.style.fontSize = f_size;
					hashtable2.put(temp1.id,temp1);
			   		a++;
			   		isPrintAgain = true;
			   		break;
		   		} 		    		
		    	temp1.style.fontSize = parseFloat(temp1.style.fontSize)-0.5;
				scroll_h = temp1.scrollHeight;
				pos_h = temp1.style.posHeight;	    	
	    	}
	    	else{ 
		   		if(parseFloat(temp1.style.fontSize)<8){
		   		   	scrollHeight[a] = scroll_h_m;
					posHeight[a] = pos_h;
					temp1.style.fontSize = f_size;
					hashtable2.put(temp1.id,temp1);
			   		a++;
			   		isPrintAgain = true;
			   		break;
		   		} 		    	
		    	temp1.style.fontSize = (parseFloat(temp1.style.fontSize)-0.5)+"pt";
				scroll_h = temp1.scrollHeight;
				pos_h = temp1.style.posHeight;	
	    	}
			label.style.fontSize = temp1.style.fontSize;
	    }

     	textarea.style.fontSize = f_size ;

        //remove the temp div
	   	//document.body.removeChild(temp);
		//doc.body.removeChild(temp);
		fra.body.removeChild(temp);
       	textarea.parentNode.replaceChild(label,textarea);  
       	i--;  	
   	}catch(e){
   		//if error remove the temp div
   	   	//document.body.removeChild(temp);
		//doc.body.removeChild(temp);
		fra.body.removeChild(temp);
   	   	alert(e.description);
   	}
}
function processInput(div,doc,fra,usePrintModel,overprint){
 //==============process text start=========================
    var inputs = div.getElementsByTagName("input");
    var reg = /(submit|reset|button|file|password)/i;
    for(i=0;i<inputs.length;i++){
    	//if(inputs[i].type=="datatree"){
   			inputs[i].style.filter = "";
   		//}
   		
        inputs[i].value = inputs[i].value.trim();
    	if(inputs[i].style.visibility && inputs[i].style.visibility=="hidden"){
    	    continue;
    	}

    	//remove buttons
    	if(reg.test(inputs[i].type)||inputs[i].printable=="false"&&overprint=="true"){
    	    inputs[i].parentNode.removeChild(inputs[i]);
    	    i--;
    	}
    	else if("calendar"==inputs[i].getAttribute("type")){
			processCalander(inputs[i],overprint,doc,fra);
	   	    i--
    	}else
    	//process text
    	if(inputs[i].getAttribute("type")=="text"){
	   	     processTextfield(inputs[i],overprint,doc,fra);
	   	     i--;
    	}else
    	//process checkbox
    	if(inputs[i].type=="checkbox"||inputs[i].type=="radio"){
    	     //processRadioAndCheck(inputs[i],overprint,doc,fra); 
     	     //i--;
   		}
    }
 //=================process input end========================   
}

function processCalander(cal,overprint,doc,fra){
	value = cal.value;
	/*
	 * remove "year" "month" "day"
	 */
	if(overprint=="true"){
 	     if(value.indexOf("\u5e74")>-1){
 	       value = value.replace("\u5e74","   ");
 	     }
 	     if(value.indexOf("\u6708")>-1){
 	       value = value.replace("\u6708","   ");
 	     }
 	     if(value.indexOf("\u65e5")>-1){
 	       value = value.replace("\u65e5","   ");
 	     }
 	     /*while(value.indexOf("-")>-1){
 	       value = value.replace("-"," ");
 	     }
 	     while(value.indexOf(".")>-1){
 	       value = value.replace("."," ");
 	     }
 	     while(value.indexOf("/")>-1){
 	       value = value.replace("/"," ");
 	     }*/
	}
  
     label = fra.createElement("label");;//doc.createElement("label");;//document.createElement("label");
     label.style.position = cal.style.position;
     label.style.top = cal.style.top;
     label.style.left = cal.style.left;
     label.style.width = cal.style.width;
     label.style.height = cal.style.height;
     label.style.lineHeight = cal.style.height;
     label.style.fontFamily = cal.style.fontFamily;
     label.style.fontStyle = cal.style.fontStyle;
     label.style.fontWeight = cal.style.fontWeight;
     label.style.fontSize = cal.style.fontSize;
     label.style.foreground = cal.style.foreground;
     label.style.background = cal.style.background;
     label.style.backgroundColor = cal.style.backgroundColor;
     
     if(overprint=="true"){
     	label.style.borderStyle = "none"; 
     }
     else{
     	label.style.borderStyle = cal.style.borderStyle;
     	label.style.borderWidth = cal.style.borderWidth;
     	label.style.borderColor = cal.style.borderColor;
     }
     label.style.textAlign =  cal.style.textAlign;
     label.style.overflow = "hidden";
     label.style.textOverflow = "ellipsis";
     label.name = cal.name;
     label.innerText = value;

     if(label.style.borderStyle.indexOf("solid")<0){
        label.style.borderStyle = "none";
     }else{
        if(label.style.borderTopWidth>0)
           label.style.borderStyle = "none";
     }
        
     cal.parentNode.replaceChild(label,cal);
}

function processTextfield(text,overprint,doc,fra){
	label = fra.createElement("label");;//doc.createElement("label");;//document.createElement("label");
    label.style.position = text.style.position;
    label.style.top = text.style.top;
    label.style.left = text.style.left;
    label.style.width = text.style.width;
    label.style.height = text.style.height;
    label.style.lineHeight = text.style.height;
    label.style.fontFamily = text.style.fontFamily;
    label.style.fontStyle = text.style.fontStyle;
    label.style.fontWeight = text.style.fontWeight;
    label.style.fontSize = text.style.fontSize;
    label.style.foreground = text.style.foreground;
    //label.style.background = text.style.background;
    label.style.backgroundColor = text.style.backgroundColor;
    
    if(overprint=="true"){
      	label.style.borderStyle = "none"; 
    }
    else{
    	label.style.borderStyle = text.style.borderStyle;
    	label.style.borderWidth = text.style.borderWidth;
    	label.style.borderColor = text.style.borderColor;
    }
    label.style.textAlign =  text.style.textAlign;
    label.style.overflow = "hidden";
   	label.style.textOverflow = "ellipsis";
    label.name = text.name;
       label.innerText = text.value;

    if(label.style.borderStyle.indexOf("solid")<0){
       label.style.borderStyle = "none";
    }else{
       if(label.style.borderTopWidth>0)
          label.style.borderStyle = "none";
    }
 	     
 	//add a temp div to the document,process content of the textfield overflow
	var inputTemp;
	var temp = fra.createElement("div");//doc.createElement("div");;//document.createElement("div");
	temp.innerHTML = text.outerHTML;
	//document.body.appendChild(temp);
	//doc.body.appendChild(temp);
	fra.body.appendChild(temp);
	inputTemp = temp.childNodes[0];
          
    try{
       // font-size start
    	var scroll_h= inputTemp.scrollWidth;
		var scroll_h_m = scroll_h;
		var pos_h = inputTemp.style.posWidth; 
		var f_size = inputTemp.style.fontSize;
		var isPrintAgain = false; 

	   	while(parseInt(scroll_h)>parseInt(pos_h)){
		   	if(f_size.indexOf("px")>0){
		   		if(parseFloat(inputTemp.style.fontSize)<10){
			   		break;
		   		}
		    	inputTemp.style.fontSize = parseFloat(inputTemp.style.fontSize)-1;
				scroll_h = inputTemp.scrollWidth;
				pos_h = inputTemp.style.posWidth;	    	
		   	}
		   	else{ 
		   		if(parseFloat(inputTemp.style.fontSize)<8){
			   		break;
		   		}
		    	inputTemp.style.fontSize = (parseFloat(inputTemp.style.fontSize)-0.5)+"pt";
				scroll_h = inputTemp.scrollWidth;
				pos_h = inputTemp.style.posWidth;	
		   	}
			label.style.fontSize = inputTemp.style.fontSize;
	   	}
	    inputTemp.style.fontSize = f_size;
	    //remove the temp div
	    //document.body.removeChild(temp);
		//doc.body.removeChild(temp);
		fra.body.removeChild(temp);
	         //font-size end
 	    text.parentNode.replaceChild(label,text);
	}catch(e){
		//document.body.removeChild(temp);
		//doc.body.removeChild(temp);
		fra.body.removeChild(temp);
		alert(e.description);
	}
}
function processRadioAndCheck(input,overprint,doc,fra){
	img = fra.createElement("img");//doc.createElement("img");//document.createElement("img");
	if(input.type=="checkbox"){
		if(input.checked) {	
		    img.src = "unieap/pages/form/data/images/checkbox_checked.gif";
		 }else{
		    img.src = "unieap/pages/form/data/images/checkbox_unchecked.gif";
		 }
	}else 
	if(input.type=="radio"){
		if(input.checked) {	
		    img.src = "unieap/pages/form/data/images/radio_checked.gif";
		 }else{
		    img.src = "unieap/pages/form/data/images/radio_unchecked.gif";
		 }
	}

	img.style.position = input.style.position;
	img.style.top = input.style.top;
	img.style.left = input.style.left;
	img.style.verticalAlign = "middle";
	//img.style.width = "20px";
	//img.style.height= "20px";
	   
	if(overprint=="true"){
	var sibling = input.nextSibling;
	if(!sibling){
	    sibling = input.previousSibling;
	}
	if(sibling)
	    sibling.style.visibility = "hidden";
	}
	//alert(input.parentNode.outerHTML);
	input.parentNode.replaceChild(img,input);    	   
} 

String.prototype.rtrim = function(){
    return this.replace(/(\s*$)/g, "");
}

String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

String.prototype.delnull = function(){
    return this.replace(/([\s]*\r\n){2,}/gm,"\r\n\r\n");//this.replace(/([\s]*\r\n[\s]*){2,}/gm,"\r\n"); 
};