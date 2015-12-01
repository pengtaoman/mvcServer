/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+ 脚本描述： DWFacade对象(含几个辅助对象)
+          屏蔽数据岛中的xml数据,向外提供数据窗口操作接口
+ 创    建： 胡光华 hugh@neusoft.com
+ 修改履历：
+ 修改  人：
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/***********************************************************************
*使用方法举例：
*        var facade = dwManager.getDW("testDW").getFacade();
*        //获取选中的行数组
*        var arr = facade.getSelectedRows();
*        if(arr.length == 0){
*            alert("请选择一条记录！");
*            return false;
*        }
*        else{
*           //检查选中的记录
*           var col = arr[0].getDWCol("1");
*           if(col.getValue() != "胡光华"){
*              alert("请选择姓名为‘胡光华的记录’！");
*              return false;
*           }
*        }
*        return true;
*
************************************************************************/



/**
* 数据窗口外观对象构造函数
* @param dw   数据窗口对象
*/
function DWFacade(dw){
    this.dw = dw;
    /**
     * 公用函数
     * 获取选中的行对象数组
     * @return rowArr(Array类型)
     */
    this.getSelectedRows = function(){
       var nodes = this.dw.getSelectedDataObjs();
       var rowArr = new Array();
       for(var i=0;i < nodes.length;i++){
          rowArr[rowArr.length] = new DWRow(this.dw,nodes[i]);
       }
       return rowArr;
    }
    /**
     * 公用函数
     * 获取行对象数组：状态为“插入”
     * @return rowArr(Array类型)
     */
    this.getInsertedRows = function(){
        return this.getOneStatusRows("INSERTED");
    }
    /**
     * 公用函数
     * 获取行对象数组：状态为“改变”
     * @return rowArr(Array类型)
     */
    this.getUpdatedRows = function(){
        return this.getOneStatusRows("UPDATED");
    }
    /**
     * 公用函数
     * 获取行对象数组：状态为“取消”
     * @return rowArr(Array类型)
     */
    this.getCanceledRows = function(){
        return this.getOneStatusRows("CANCELED");
    }
    /**
     * 公用函数
     * 获取行对象数组：状态为“删除”
     * @return rowArr(Array类型)
     */
    this.getDeletedRows = function(){
        return this.getOneStatusRows("DELETED");
    }
    /**
     * 公用函数
     * 获取行对象数组：状态为“未改变”
     * @return rowArr(Array类型)
     */
    this.getUnchangedRows = function(){
        return this.getOneStatusRows("UNCHANGED");
    }
    /**
     * 公用函数
     * 获取某一状态的行数组
     * @param   status(INSERTED、UPDATED、CANCELED、DELETED、UNCHANGED)
     * @return rowArr(Array类型)
     */
    this.getOneStatusRows = function(status){
       //为了只作一次遍历，直接从xml中取，不采用getAllRows
       var dataObjNodes = this.dw.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
       var rowArr = new Array();
	   for(var i=0; i < dataObjNodes.length; i ++){
		  if(dataObjNodes(i).attributes.getNamedItem("status").value == status)
              rowArr[rowArr.length] = new DWRow(this.dw,dataObjNodes(i));
       }
       return rowArr;
    }
    /**
     * 公用函数
     * 获取隐藏的行对象
     * @return rowArr(Array类型)
     */
    this.getHiddenedRows = function(){
       //为了只作一次遍历，直接从xml中取，不采用getAllRows
       var dataObjNodes = this.dw.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
       var rowArr = new Array();
	   for(var i=0; i < dataObjNodes.length; i ++){
		  if(dataObjNodes(i).attributes.getNamedItem("hiddened") != null &&
             dataObjNodes(i).attributes.getNamedItem("hiddened").value == "true")
              rowArr[rowArr.length] = new DWRow(this.dw,dataObjNodes(i));
       }
       return rowArr;
    }
    /**
     * 公用函数
     * 获取可显示的行对象(含DELETED、CANCELED的行)
     * @return rowArr(Array类型)
     */
    this.getUnHiddenedRows = function(){
       //为了只作一次遍历，直接从xml中取，不采用getAllRows
       var dataObjNodes = this.dw.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
       var rowArr = new Array();
	   for(var i=0; i < dataObjNodes.length; i ++){
		  if(dataObjNodes(i).attributes.getNamedItem("hiddened") == null ||
             dataObjNodes(i).attributes.getNamedItem("hiddened").value == "false")
              rowArr[rowArr.length] = new DWRow(this.dw,dataObjNodes(i));
       }
       return rowArr;
    }
     /**
     *公用函数
     *获取当前页有效行对象(不含Hidden的行)
     * @return rowArr(Array类型)
     */
     this.getCurrentRows = function(){
        var dataObjNodes = this.dw.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
        var rowArr = new Array();
        var hiddenObj;
        var operateObj;
         for(var i=0; i < dataObjNodes.length; i ++){
            hiddenObj= dataObjNodes(i).attributes.getNamedItem("hiddened");
            operateObj= dataObjNodes(i).attributes.getNamedItem("status");          
            if((hiddenObj == null || hiddenObj.value == "false" )&&( operateObj.value == "UNCHANGED"  || operateObj.value == "UPDATED" || operateObj.value == "INSERTED"))
              rowArr[rowArr.length] = new DWRow(this.dw,dataObjNodes(i));
       }
       return rowArr;
     } 
     /**
     * 公用函数
     * 获取是否全选的状态
     * @return isAllSelected(boolean类型)
     */ 
     this.isAllRowsSelected = function(){
        var dataObjNodes = this.dw.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
        var operateObj,selected;
        for(var i=0; i < dataObjNodes.length; i ++){            
           operateObj= dataObjNodes(i).attributes.getNamedItem("status").value;          
           if( operateObj == "UNCHANGED"  || operateObj == "UPDATED" || operateObj == "INSERTED"){
               selected = dataObjNodes(i).attributes.getNamedItem("selected").value;
               if(selected=="false")
                  return false;
           }
        }      
        return true;
     } 
    /**
     * 公用函数
     * 获取所有的行对象
     * @return rowArr(Array类型)
     */
    this.getAllRows = function(){
       var dataObjNodes = this.dw.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
       var rowArr = new Array();
	   for(var i=0; i < dataObjNodes.length; i ++){
           rowArr[rowArr.length] = new DWRow(this.dw,dataObjNodes(i));
       }
       return rowArr;
    }
     /**
     * 公用函数
     * 刷新编辑器和列表
     * @return nothing
     */
     this.refresh = function(){     	
     	this.dw.fullMsxslt();
     }
     /**
     * 公用函数
     * 动态排序
     * @parm   colIndex 排序的列号
     * @return nothing
     */
     this.orderBy = function(colIndex){
         this.dw.headerOnClick(colIndex);
     }
     /**
     * 公用函数
     * 修改列属性
     * @param  colIndex  需要修改的列号
     * @param  attrName  属性名称(大小写敏感)
     * @param  attrValue 属性值
     * @param  isAdd     在没有该属性的情况下是否增加(空/false: 不增加，true：增加)
     * @param  isRefresh 修改完是否需要刷新数据窗口(空/true: 刷新，false：不刷新)
     * @return boolean 修改是否成功 true/false
     */
     this.modifyColAttr = function(colIndex,attrName,attrValue,isAdd,isRefresh){     	
         if(colIndex == null || attrName == null || attrValue == null) return false;         
         var attrNode = this.dw.getAttrNodeByIndex(colIndex);
         if(attrNode == null ) return false;
         if(attrNode.attributes.getNamedItem(""+attrName) != null){
             attrNode.attributes.getNamedItem(""+attrName).value = ""+attrValue;            
         }
         else{
             if(isAdd == null || !isAdd) return false;
             //增加
             this.dw.addAttribute(attrNode,attrName,attrValue);             
         }
         
         //特殊修改:保持editer的prompt和attribute的prompt一致
         if(attrName.toUpperCase() == "TITLE" || attrName.toUpperCase() == "PROMPT"){         	
         	var editerNodes = this.dw.getXMLDom().selectNodes("/dataWindow/editers/editer");
         	var counter = editerNodes == null ? 0 : editerNodes.length;         	         	
         	for(var i=0; i < counter; i++){
         		if(editerNodes(i).attributes.getNamedItem("attrIndex").value == ""+colIndex){
         			editerNodes(i).attributes.getNamedItem("prompt").value = ""+attrValue;
         	    }
            }         	
         }                  
         //刷新数据窗口
         if(isRefresh == null || isRefresh){
         	this.refresh();
         }
         return true;

     }
     /**
     * 公用函数
     * 修改列属性
     * @param  colName   需要修改的列名
     * @param  attrName  属性名称(大小写敏感)
     * @param  attrValue 属性值
     * @param  isAdd     在没有该属性的情况下是否增加(空/false: 不增加，true：增加)
     * @param  isRefresh 修改完是否需要刷新数据窗口(空/true: 刷新，false：不刷新)
     * @return boolean 修改是否成功 true/false
     */
     this.modifyColAttrByName = function(colName,attrName,attrValue,isAdd,isRefresh){
     	var attrNode = this.dw.getAttrNodeByName(colName); 
     	if(attrNode == null) return false;
     	var index = attrNode.attributes.getNamedItem("index").value;
     	return this.modifyColAttr(index,attrName,attrValue,isAdd,isRefresh);
     }
    /**
     * 公用函数
     * 通过列号来获取编辑器对象
     * @param  index  列号
     * @return html中的对象(null: 表示没有得到对象)
     */
    this.getEditerByIndex = function(index){    	
    	 if(this.dw.getType() == "QUICK_EDIT" || this.dw.getType() == "FREE_EDIT" || this.dw.getType() == "GRID_EDIT"){
         	return document.all(this.dw.nameRule.getDisplayEditerBegin() + index);
         }else if(this.dw.getType = "POP_EDIT"){         	    	         
         	alert("开发人员注意：在POP_EDIT的数据窗口中，不支持getEditerByIndex和getEditerByName函数！");
         	return null;         
        }else{return null;}
        
    }
    /**
     * 公用函数
     * 通过名称来获取编辑器对象
     * @param  attrName  列名称（大小写不敏感)
     * @return html中的对象(null: 表示没有得到对象)
     */
    this.getEditerByName = function(attrName){
         var attrNode = this.dw.getAttrNodeByName(attrName);
         if(attrNode == null) return null;
         return this.getEditerByIndex(attrNode.attributes.getNamedItem("index").value);
    }   
    /**
     * 公用函数
     * 增加一个空行
     * @return DWRow
     */
    this.addRow = function(){
    	var newRow = this.dw.getXMLDom().selectSingleNode("/dataWindow/template/dataObj").cloneNode(true);
		var index = this.dw.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj").length + 1;
		this.dw.addAttribute(newRow,"index",index);
		this.dw.addAttribute(newRow,"templateFlag","false");
		this.dw.getXMLDom().selectSingleNode("/dataWindow/dataObjs").appendChild(newRow);
		return new DWRow(this.dw,newRow);
    }
    /**
     * 公用函数
     * 查询
     * @param  arr  查询条件数组（查询条件的位置于数据窗口配置文件中定义的一致，
     *                           ""表示占位条件)
     * @example       var arr = new Array();
     *                    arr[0] = ""; arr[1] = "abc";
     *                    dwManager.getDW("abc").getFacade().query(arr);
     * @return DWRow
     */
    this.query = function(arr){    	
    	if(arr == null || arr.length == 0) return;
    	var filterNodes = this.dw.getXMLDom().selectNodes("/dataWindow/filters/filter");    	
    	if(filterNodes == null || filterNodes.length == 0) return;    	
    	for(var i=0; i < arr.length; i++){
    		if(i > filterNodes.length - 1) break;      		  		
    		//if(arr[i] == "") continue;    //不能及时清空 filterNodes(i)	中的内容。
    		this.dw.addAttribute(filterNodes(i),"value",arr[i]);
        }        
        this.dw.exeQuery();	
    }
    /**
	*@description 增加数据窗口事件的监听器，供二次开发人员调用。
	*             同一种事件不能重复添加，不然只有最后定义的监听器有效。
	*@parm eventID 请查看DWEvent对象的事件号定义部分
	*@parm handler 一段可执行的js代码(一般为一个函数)
	*@return nothing
	*/
    this.addDWEventListener = function(eventID,handler){    	    	
    	this.dw.dwevent.addListener(eventID,handler);
	}	
	/**
	*@description 清除监听器
	*@parm eventID 请查看DWEvent对象的事件号定义部分
	*@return nothing
	*/
	this.clearDWListener = function(eventID){
		this.dw.dwevent.clearListener(eventID);
	}
	/**
	*@description 清除所有监听器
	*@return nothing
	*/
	this.clearDWAllListener = function(){
		this.dw.dwevent.clearAllListener();
	}
	/**
	*@description 停止事件的进行，用在事件监听器中
	*@return nothing
	*/
	this.stopEvent = function(){
		throw new createException(1, "I am stopped");
	}
	 /**
	 * 公用函数
	 * 修改列title
	 * @param  colIndex  需要修改的列号
	 * @param  attrValue 属性值
	 * @return boolean 修改是否成功 true/false
	 */
    this.modifyTitleByIndex = function(colIndex,attrValue){        		
    	 if(!this.modifyColAttr(colIndex,"title",attrValue,true,false)) return false;    	 
    	 var editer = this.getEditerByIndex(colIndex);    	 
    	 if(editer == null) return false;
    	 var tr = editer.parentElement.parentElement;
    	 if(tr.tagName.toUpperCase() != "TR") return false;    	 
    	 for(var i=0; i < tr.cells.length; i++){
    	 	try{
    	 		if(tr.cells(i).children(0).id == editer.id) break;
    		}catch(e){return false;}
    	}
    	//<TD class=NEUDwSearchTitleTD align=right><FONT class=NEUDwListDodyNotNullFont>个人编号</FONT></TD>
    	try{
    		tr.cells(i-1).children(0).innerText = attrValue;
    	}catch(e){ return false; }
    	return true;    	 
	}   
	/**
	 * 公用函数
	 * 修改列title
	 * @param  colName  需要修改的列名
	 * @param  attrValue 属性值
	 * @return boolean 修改是否成功 true/false
	 */
    this.modifyTitleByName = function(colName,attrValue){    	
    	var attrNode = this.dw.getAttrNodeByName(colName); 
     	if(attrNode == null) return false;
     	var index = attrNode.attributes.getNamedItem("index").value;     	
     	return this.modifyTitleByIndex(index,attrValue);
	}
	/**
	 * 公用函数
	 * 清空数据岛中的所有记录
	 * @parm isAddAnRow 是否插入一条新的记录(null/true: 插入，false：不插入)
	 * @return nonthing
	 */
	this.reset = function(isAddAnRow){		
		var dataObjsNode  = this.dw.getXMLDom().selectSingleNode("/dataWindow/dataObjs");
		var dataObjNodes = dataObjsNode.selectNodes("dataObj");
		if(	dataObjNodes == null || dataObjNodes.length == 0) return;
		var nextDataObjIndex = dataObjNodes.length + 1;
		for(var i = 0; i < dataObjNodes.length; i++){
			dataObjsNode.removeChild(dataObjNodes(i));
		}		
		this.dw.crtCellIndex = -100;	
		if(isAddAnRow == null || isAddAnRow){
			var newRow = this.dw.getXMLDom().selectSingleNode("/dataWindow/template/dataObj").cloneNode(true);		
			this.dw.addAttribute(newRow,"index",nextDataObjIndex);
			this.dw.addAttribute(newRow,"templateFlag","false");
			this.dw.setDefaultValue(newRow);//默认值
			newRow.attributes.getNamedItem("selected").value = "true";
			this.dw.getXMLDom().selectSingleNode("/dataWindow/dataObjs").appendChild(newRow);
		}
		this.refresh();
	}
    //修改列的状态,供UniEAP调用
	this.hiddenColStatus = function(attrIndex,status){
		//调整isHidden属性
		var headerNodes = this.dw.getXMLDom().selectNodes("/dataWindow/headers/header");
		if(headerNodes == null) return;
		for(var i=0; i < headerNodes.length;i++){
			if(headerNodes(i).attributes.getNamedItem("attrIndex").value == attrIndex){
				this.dw.addAttribute(headerNodes(i),"isHidden",status);
		    }
		}
    }
    /**
     * 公用函数
     * 通过列索引隐藏指定列
     * @param  arr  指定列数组
     *         var arr = new Array();
     *         arr[0] = "1"; arr[1] = "2";
     * @param isRefresh null/true:刷新
     *                  false    :不刷新
     * @return void
     */
    this.hiddenColByIndex = function(arr,isRefresh){
    	if(arr == null) return;
    	for(var i=0; i < arr.length; i++)
    	    this.hiddenColStatus(arr[i],"true");
    	if(isRefresh == null || isRefresh)
    	    this.refresh();
    }
    /**
     * 公用函数
     * 通过列索引显示指定列
     * @param  arr  指定列数组
     *         var arr = new Array();
     *         arr[0] = "1"; arr[1] = "2";
     * @param isRefresh null/true:刷新
     *                  false    :不刷新
     * @return void
     */
    this.showColByIndex = function(arr,isRefresh){
    	if(arr == null) return;
    	for(var i=0; i < arr.length; i++)
    	    this.hiddenColStatus(arr[i],"false");
    	if(isRefresh == null || isRefresh)
    	    this.refresh();
    }
    /**
     * 公用函数
     * 通过列名隐藏指定列
     * @param  arr  指定列数组
     *         var arr = new Array();
     *         arr[0] = "empno"; 
     * @param isRefresh null/true:刷新
     *                  false    :不刷新
     * @return void
     */
    this.hiddenColByName = function(arr,isRefresh){
    	if(arr == null) return;
    	var attrNode = null;
    	for(var i=0; i < arr.length; i++){
    		attrNode = this.dw.getAttrNodeByName(arr[i]); 
    		if(attrNode != null){
    	    	this.hiddenColStatus(attrNode.attributes.getNamedItem("index").value,"true");
    	    }
    	}
    	if(isRefresh == null || isRefresh)
    	    this.refresh();
    }
    /**
     * 公用函数
     * 通过列名显示指定列
     * @param  arr  指定列数组
     *         var arr = new Array();
     *         arr[0] = "empno"; 
     * @param isRefresh null/true:刷新
     *                  false    :不刷新
     * @return void
     */
    this.showColByName = function(arr,isRefresh){
    	if(arr == null) return;
    	var attrNode = null;
    	for(var i=0; i < arr.length; i++){
    		attrNode = this.dw.getAttrNodeByName(arr[i]); 
    		if(attrNode != null){
    	    	this.hiddenColStatus(attrNode.attributes.getNamedItem("index").value,"false");
    	    }
    	}
    	if(isRefresh == null || isRefresh)
    	    this.refresh();
    }
    /**
     * 公用函数
     * 拷贝一行
     * @param  DWRow
     * @return DWRow
     */
    this.copyDWRow = function (dwRow){
    	var newIndex = this.dw.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj").length + 1;
        var newRow = dwRow.dataObj.cloneNode(true);    	
		this.dw.addAttribute(newRow,"index",newIndex);
		this.dw.addAttribute(newRow,"templateFlag","false");
		this.dw.addAttribute(newRow,"selected","false");
		this.dw.getXMLDom().selectSingleNode("/dataWindow/dataObjs").appendChild(newRow);
		return new DWRow(this.dw,newRow);	
    }
    /**
     * 公用函数
     * 校验并接受数据
     * @return boolean true：数据合法; false 数据不合法
     */
    this.accept = function(){
    	return this.dw.checkModifyInfo();
    }
    /**
     * 公用函数
     * 获取最后选择的行
     * @return boolean true：数据合法; false 数据不合法
     */
    this.getLastSelectedRow = function(){
    	 if(this.dw.crtDOIndex == -100) return null;
    	 return new DWRow(this.dw,""+this.dw.crtDOIndex);
    }

}

/**
* 数据窗口行对象构造函数
* @param dw   数据窗口对象
* @param arg  可以为两种类型:xml中dataObj节点、xml中dataObj节点的index值
*/
function DWRow(dw,arg){
    this.dw = dw;
    this.dataObj;
    /**
     *公用属性
     * dataobj的index
     */
    this.index;
    if(typeof(arg) == "object"){
       this.dataObj = arg;
       this.index = this.dataObj.attributes.getNamedItem("index").value;
    }
    else{
       this.index = arg;
       //获取xml中的dataObj对象
       this.dataObj = this.dw.getDataObjByIndex(this.index);
    }

    /**
     * 公用函数
     * 获取状态
     * @return INSERTED、UPDATED、CANCELED、DELETED、UNCHANGED
     */
    this.getStatus = function(){
       return this.dataObj.attributes.getNamedItem("status").value;
    }
    /**
     * 公用函数
     * 置行状态
     * @param newStatus(INSERTED、UPDATED、CANCELED、DELETED、UNCHANGED)
     * @return nothing
     */
    this.setStatus = function(newStatus){
        if(newStatus != null){
            newStatus = newStatus.toUpperCase();
            if(newStatus == "INSERTED" || newStatus == "UPDATED"||
               newStatus == "CANCELED" || newStatus == "DELETED"||
               newStatus == "UNCHANGED"){
               this.dataObj.attributes.getNamedItem("status").value = newStatus;
            }
        }
    }
    /**
     * 公用函数
     * 是否选择
     * @return boolean false:未选中；true:选中
     */
    this.isSelected = function(){
         var tmp = this.dataObj.attributes.getNamedItem("selected").value;
         return tmp.toUpperCase() == "TRUE" ? true : false;
    }
    /**
     * 公用函数
     * 是否删除
     * @return boolean false:未选中；true:选中
     */
    this.isRemoved = function(){
        var status = this.getStatus();
        return status == "DELETED" ||  status == "CANCELED" ? true : false;
    }
    /**
     * 公用函数
     * 是否隐藏
     * @return boolean false:未选中；true:选中
     */
    this.isHiddened = function(){
         var hiddenAttr = this.dataObj.attributes.getNamedItem("hiddened");
         return hiddenAttr == null || hiddenAttr.value == "false" ? false : true;
    }
    /**
     * 公用函数
     * 获取数据窗口列对象
     * @param attrIndex 列的index
     * @return DWCol
     */
    this.getDWCol = function(attrIndex){
         var attrNodes = this.dataObj.childNodes;
         var node;
         for(var i=0; i < attrNodes.length; i++){
            if(attrNodes(i).attributes.getNamedItem("index").value == ""+attrIndex){
                 node = attrNodes(i);
                 break;
            }
         }
         if(node == null) return null;
         return new DWCol(this,node);
    }
    /**
     * 公用函数
     * 获取数据窗口列对象
     * @param colName 列的名称
     * @return DWCol
     */
    this.getDWColByName = function(colName){
         var attrNode = this.dw.getAttrNodeByName(colName); 
         if(attrNode == null) return null;     	
     	 var index = attrNode.attributes.getNamedItem("index").value;
     	 return this.getDWCol(index);
    }
    /**
     * 公用函数
     * 删除本身
     * @return nothing
     */
    this.remove = function(){
        var status = this.getStatus();
        status = status == "INSERTED" ||  status == "CANCELED" ? "CANCELED" : "DELETED";
        this.dataObj.attributes.getNamedItem("status").value = status;
        this.dataObj.attributes.getNamedItem("selected").value = "false";
        var arr = this.dw.getSelectedDataObjs();
		if(arr != null && arr.length > 0){
			this.dw.crtDOIndex = parseInt(arr[0].index,10); 
		} 
		else
		    this.dw.crtDOIndex = -100;   
    }
    /**
     * 公用函数
     * 隐藏本身：无论本身状态如何，都不显示在列表中
     * @return nothing
     */
    this.hidden = function(){
        this.dw.addAttribute(this.dataObj,"hiddened","true");
    }
    /**
     * 公用函数
     * 显示本身,不一定真正的显示出来(还和状态有关)
     * @return nothing
     */
    this.show = function(){
        this.dw.addAttribute(this.dataObj,"hiddened","false");
    }
    /**
     * 公用函数
     * 选中
     * @return nothing
     */    
    this.select = function(){        	
    	if(this.dw.getType() != "MULTI_SELECT"){
    		var arr = this.dw.getSelectedDataObjs();
            
    		if(arr != null && arr.length > 0){
    			arr[0].attributes.getNamedItem("selected").value = "false";  
    		}
    	}
    	this.dw.crtDOIndex = parseInt(this.dataObj.attributes.getNamedItem("index").value,10); 
        this.dw.crtCellIndex = 1; 
        this.dw.addAttribute(this.dw.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","true");
    	this.dataObj.attributes.getNamedItem("selected").value = "true";    	
    }
    /**
     * 公用函数
     * 取消选中
     * @return nothing
     */  
    this.disSelect = function(){
    	this.dataObj.attributes.getNamedItem("selected").value = "false";
    	var arr = this.dw.getSelectedDataObjs();
		if(arr != null && arr.length > 0){
			this.dw.crtDOIndex = parseInt(arr[0].index,10); 
		} 
		else
		    this.dw.crtDOIndex = -100;   	
    }
}
/**
* 数据窗口列对象构造函数
* @param dwRow   数据窗口列对象
* @param arg  可以为两种类型:xml中dataObj/attribute节点、xml中dataObj/attribute节点的index值
*/
function DWCol(dwRow,arg){
     this.attrNode;
     this.dwRow = dwRow;
     if(typeof(arg) == "object") this.attrNode = arg;
     else this.attrNode = (this.dwRow.getDWCol(arg)).attrNode;
    /**
     * 公用属性
     * 列的index
     */
     this.index = this.attrNode.attributes.getNamedItem("index").value;
    /**
     * 公用属性
     * 列的value
     */
     this.value = this.attrNode.attributes.getNamedItem("value").value;
     /**
     * 公用属性
     * 列的新值
     */
     this.newValue = this.attrNode.attributes.getNamedItem("newValue").value;
     /**
     * 公用函数
     * 是否改变
     * @return boolean false:未改变 true:改变
     */
     this.isModified = function(){
           var tmp = this.attrNode.attributes.getNamedItem("modified").value;
           if(tmp.toUpperCase() == "TRUE"){
               return true;
           }
           return false;
     }
    /**
     * 公用函数
     * 对应的attribute是否带有option
     * @return boolean false:没有 true:有
     */
     this.hasOption = function(){
          var attrNode = this.dwRow.dw.getAttrNodeByIndex(this.index);
          //if(attrNode.childNodes.length > 0 ) return true;
          if(attrNode.attributes.getNamedItem("type").value.toLowerCase()=="select") return true;
          return false;
     }
    /**
     * 公用函数
     * 获取列的值
     * @return value
     */
     this.getValue = function(){
          return this.newValue == "" ? this.value : this.newValue;
     }
     this.getOldValue = function(){
          return this.value;
     }
     this.getText = function(){
        return this.attrNode.text;
       /* var attrNodes = this.dwRow.dw.getAttrNodeByIndex(this.index);
        if(attrNodes.childNodes.length < 1 ){
            return this.getValue();
        }else{
            for(var i=0;i<attrNodes.childNodes.length;i++){
               if(attrNodes.childNodes(i).attributes.getNamedItem("value").value == this.getValue())
                   return attrNodes.childNodes(i).text;
            }
            return "";
        }*/
     }
     this.getOldText = function(){
        /*
        var attrNodes = this.dwRow.dw.getAttrNodeByIndex(this.index);
        if(attrNodes.childNodes.length < 1 ){
            return this.value;
        }else{
            for(var i=0;i<attrNodes.childNodes.length;i++){
               if(attrNodes.childNodes(i).attributes.getNamedItem("value").value == this.value)
                   return attrNodes.childNodes(i).text;
            }
            return "";
        }
        */
        if(this.hasOption()){
            var edt = document.all("editer_"+this.dwRow.dw.getName()+"_"+this.index); 
              if(edt){                
                 for(var i=0;i<edt.options.length;i++)
                    if(edt.options(i).value==this.value){
                       return edt.options(i).text;
                    }
              }
              else{              
                  var attrNodes = this.dwRow.dw.getAttrNodeByIndex(this.index);
                  for(var i=0; i < attrNodes.childNodes.length; i++)
                       if(attrNodes.childNodes(i).attributes.getNamedItem("value").value == this.value){
                            return attrNodes.childNodes(i).text;
                       }
                  
               }
               return this.value;
        }
        else
           return this.value;
     }
     /**
     * 公用函数
     * 赋值
     * @param newValue
     * @return boolean 赋值是否成功 true:成功、false:失败
     *         失败的可能原因：1.所在行属于废除状态（CANCELED、DELETED）
     *                      2.新值不再对应的option中
     */
     this.setNewValue = function(newValue){
           var rowStatus = this.dwRow.getStatus();
           //删除的行不处理
           if(rowStatus == "CANCELED" || rowStatus == "DELETED") return false;
           //值未改变不处理
           var oldValue = this.getValue();
           if(newValue == oldValue) return true;
           //处理select类型
           var newText = newValue;
           if(this.hasOption()){
              newText = "UNIEAP_XML_ATTRIBUTE_SELECT_TEXT";
              var edt = document.all("editer_"+this.dwRow.dw.getName()+"_"+this.index); 
              if(edt){                
                 for(var i=0;i<edt.options.length;i++)
                    if(edt.options(i).value==newValue){
                       newText = edt.options(i).text;
                       break;
                    }
              }
              else{              
	              var attrNodes = this.dwRow.dw.getAttrNodeByIndex(this.index);
	              for(var i=0; i < attrNodes.childNodes.length; i++)
	                   if(attrNodes.childNodes(i).attributes.getNamedItem("value").value == newValue){
	                        newText = attrNodes.childNodes(i).text;
	                        break;
	                   }
	              
               }
           }
           if(newText == "UNIEAP_XML_ATTRIBUTE_SELECT_TEXT") return false;  //新值不合法
           rowStatus = rowStatus == "INSERTED" ? "INSERTED" : "UPDATED";
           this.dwRow.setStatus(rowStatus); //给行置新状态
           //赋新值
           this.attrNode.attributes.getNamedItem("newValue").value = newValue;
           this.setText(newText);
           this.attrNode.attributes.getNamedItem("modified").value = "true";
           return true;
     }
     this.setText = function(newText){
         this.attrNode.text = newText;
     }
}