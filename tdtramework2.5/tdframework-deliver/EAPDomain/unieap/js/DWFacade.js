/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+ �ű������� DWFacade����(��������������)
+          �������ݵ��е�xml����,�����ṩ���ݴ��ڲ����ӿ�
+ ��    ���� ���⻪ hugh@neusoft.com
+ �޸�������
+ �޸�  �ˣ�
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/***********************************************************************
*ʹ�÷���������
*        var facade = dwManager.getDW("testDW").getFacade();
*        //��ȡѡ�е�������
*        var arr = facade.getSelectedRows();
*        if(arr.length == 0){
*            alert("��ѡ��һ����¼��");
*            return false;
*        }
*        else{
*           //���ѡ�еļ�¼
*           var col = arr[0].getDWCol("1");
*           if(col.getValue() != "���⻪"){
*              alert("��ѡ������Ϊ�����⻪�ļ�¼����");
*              return false;
*           }
*        }
*        return true;
*
************************************************************************/



/**
* ���ݴ�����۶����캯��
* @param dw   ���ݴ��ڶ���
*/
function DWFacade(dw){
    this.dw = dw;
    /**
     * ���ú���
     * ��ȡѡ�е��ж�������
     * @return rowArr(Array����)
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
     * ���ú���
     * ��ȡ�ж������飺״̬Ϊ�����롱
     * @return rowArr(Array����)
     */
    this.getInsertedRows = function(){
        return this.getOneStatusRows("INSERTED");
    }
    /**
     * ���ú���
     * ��ȡ�ж������飺״̬Ϊ���ı䡱
     * @return rowArr(Array����)
     */
    this.getUpdatedRows = function(){
        return this.getOneStatusRows("UPDATED");
    }
    /**
     * ���ú���
     * ��ȡ�ж������飺״̬Ϊ��ȡ����
     * @return rowArr(Array����)
     */
    this.getCanceledRows = function(){
        return this.getOneStatusRows("CANCELED");
    }
    /**
     * ���ú���
     * ��ȡ�ж������飺״̬Ϊ��ɾ����
     * @return rowArr(Array����)
     */
    this.getDeletedRows = function(){
        return this.getOneStatusRows("DELETED");
    }
    /**
     * ���ú���
     * ��ȡ�ж������飺״̬Ϊ��δ�ı䡱
     * @return rowArr(Array����)
     */
    this.getUnchangedRows = function(){
        return this.getOneStatusRows("UNCHANGED");
    }
    /**
     * ���ú���
     * ��ȡĳһ״̬��������
     * @param   status(INSERTED��UPDATED��CANCELED��DELETED��UNCHANGED)
     * @return rowArr(Array����)
     */
    this.getOneStatusRows = function(status){
       //Ϊ��ֻ��һ�α�����ֱ�Ӵ�xml��ȡ��������getAllRows
       var dataObjNodes = this.dw.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
       var rowArr = new Array();
	   for(var i=0; i < dataObjNodes.length; i ++){
		  if(dataObjNodes(i).attributes.getNamedItem("status").value == status)
              rowArr[rowArr.length] = new DWRow(this.dw,dataObjNodes(i));
       }
       return rowArr;
    }
    /**
     * ���ú���
     * ��ȡ���ص��ж���
     * @return rowArr(Array����)
     */
    this.getHiddenedRows = function(){
       //Ϊ��ֻ��һ�α�����ֱ�Ӵ�xml��ȡ��������getAllRows
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
     * ���ú���
     * ��ȡ����ʾ���ж���(��DELETED��CANCELED����)
     * @return rowArr(Array����)
     */
    this.getUnHiddenedRows = function(){
       //Ϊ��ֻ��һ�α�����ֱ�Ӵ�xml��ȡ��������getAllRows
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
     *���ú���
     *��ȡ��ǰҳ��Ч�ж���(����Hidden����)
     * @return rowArr(Array����)
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
     * ���ú���
     * ��ȡ�Ƿ�ȫѡ��״̬
     * @return isAllSelected(boolean����)
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
     * ���ú���
     * ��ȡ���е��ж���
     * @return rowArr(Array����)
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
     * ���ú���
     * ˢ�±༭�����б�
     * @return nothing
     */
     this.refresh = function(){     	
     	this.dw.fullMsxslt();
     }
     /**
     * ���ú���
     * ��̬����
     * @parm   colIndex ������к�
     * @return nothing
     */
     this.orderBy = function(colIndex){
         this.dw.headerOnClick(colIndex);
     }
     /**
     * ���ú���
     * �޸�������
     * @param  colIndex  ��Ҫ�޸ĵ��к�
     * @param  attrName  ��������(��Сд����)
     * @param  attrValue ����ֵ
     * @param  isAdd     ��û�и����Ե�������Ƿ�����(��/false: �����ӣ�true������)
     * @param  isRefresh �޸����Ƿ���Ҫˢ�����ݴ���(��/true: ˢ�£�false����ˢ��)
     * @return boolean �޸��Ƿ�ɹ� true/false
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
             //����
             this.dw.addAttribute(attrNode,attrName,attrValue);             
         }
         
         //�����޸�:����editer��prompt��attribute��promptһ��
         if(attrName.toUpperCase() == "TITLE" || attrName.toUpperCase() == "PROMPT"){         	
         	var editerNodes = this.dw.getXMLDom().selectNodes("/dataWindow/editers/editer");
         	var counter = editerNodes == null ? 0 : editerNodes.length;         	         	
         	for(var i=0; i < counter; i++){
         		if(editerNodes(i).attributes.getNamedItem("attrIndex").value == ""+colIndex){
         			editerNodes(i).attributes.getNamedItem("prompt").value = ""+attrValue;
         	    }
            }         	
         }                  
         //ˢ�����ݴ���
         if(isRefresh == null || isRefresh){
         	this.refresh();
         }
         return true;

     }
     /**
     * ���ú���
     * �޸�������
     * @param  colName   ��Ҫ�޸ĵ�����
     * @param  attrName  ��������(��Сд����)
     * @param  attrValue ����ֵ
     * @param  isAdd     ��û�и����Ե�������Ƿ�����(��/false: �����ӣ�true������)
     * @param  isRefresh �޸����Ƿ���Ҫˢ�����ݴ���(��/true: ˢ�£�false����ˢ��)
     * @return boolean �޸��Ƿ�ɹ� true/false
     */
     this.modifyColAttrByName = function(colName,attrName,attrValue,isAdd,isRefresh){
     	var attrNode = this.dw.getAttrNodeByName(colName); 
     	if(attrNode == null) return false;
     	var index = attrNode.attributes.getNamedItem("index").value;
     	return this.modifyColAttr(index,attrName,attrValue,isAdd,isRefresh);
     }
    /**
     * ���ú���
     * ͨ���к�����ȡ�༭������
     * @param  index  �к�
     * @return html�еĶ���(null: ��ʾû�еõ�����)
     */
    this.getEditerByIndex = function(index){    	
    	 if(this.dw.getType() == "QUICK_EDIT" || this.dw.getType() == "FREE_EDIT" || this.dw.getType() == "GRID_EDIT"){
         	return document.all(this.dw.nameRule.getDisplayEditerBegin() + index);
         }else if(this.dw.getType = "POP_EDIT"){         	    	         
         	alert("������Աע�⣺��POP_EDIT�����ݴ����У���֧��getEditerByIndex��getEditerByName������");
         	return null;         
        }else{return null;}
        
    }
    /**
     * ���ú���
     * ͨ����������ȡ�༭������
     * @param  attrName  �����ƣ���Сд������)
     * @return html�еĶ���(null: ��ʾû�еõ�����)
     */
    this.getEditerByName = function(attrName){
         var attrNode = this.dw.getAttrNodeByName(attrName);
         if(attrNode == null) return null;
         return this.getEditerByIndex(attrNode.attributes.getNamedItem("index").value);
    }   
    /**
     * ���ú���
     * ����һ������
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
     * ���ú���
     * ��ѯ
     * @param  arr  ��ѯ�������飨��ѯ������λ�������ݴ��������ļ��ж����һ�£�
     *                           ""��ʾռλ����)
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
    		//if(arr[i] == "") continue;    //���ܼ�ʱ��� filterNodes(i)	�е����ݡ�
    		this.dw.addAttribute(filterNodes(i),"value",arr[i]);
        }        
        this.dw.exeQuery();	
    }
    /**
	*@description �������ݴ����¼��ļ������������ο�����Ա���á�
	*             ͬһ���¼������ظ���ӣ���Ȼֻ�������ļ�������Ч��
	*@parm eventID ��鿴DWEvent������¼��Ŷ��岿��
	*@parm handler һ�ο�ִ�е�js����(һ��Ϊһ������)
	*@return nothing
	*/
    this.addDWEventListener = function(eventID,handler){    	    	
    	this.dw.dwevent.addListener(eventID,handler);
	}	
	/**
	*@description ���������
	*@parm eventID ��鿴DWEvent������¼��Ŷ��岿��
	*@return nothing
	*/
	this.clearDWListener = function(eventID){
		this.dw.dwevent.clearListener(eventID);
	}
	/**
	*@description ������м�����
	*@return nothing
	*/
	this.clearDWAllListener = function(){
		this.dw.dwevent.clearAllListener();
	}
	/**
	*@description ֹͣ�¼��Ľ��У������¼���������
	*@return nothing
	*/
	this.stopEvent = function(){
		throw new createException(1, "I am stopped");
	}
	 /**
	 * ���ú���
	 * �޸���title
	 * @param  colIndex  ��Ҫ�޸ĵ��к�
	 * @param  attrValue ����ֵ
	 * @return boolean �޸��Ƿ�ɹ� true/false
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
    	//<TD class=NEUDwSearchTitleTD align=right><FONT class=NEUDwListDodyNotNullFont>���˱��</FONT></TD>
    	try{
    		tr.cells(i-1).children(0).innerText = attrValue;
    	}catch(e){ return false; }
    	return true;    	 
	}   
	/**
	 * ���ú���
	 * �޸���title
	 * @param  colName  ��Ҫ�޸ĵ�����
	 * @param  attrValue ����ֵ
	 * @return boolean �޸��Ƿ�ɹ� true/false
	 */
    this.modifyTitleByName = function(colName,attrValue){    	
    	var attrNode = this.dw.getAttrNodeByName(colName); 
     	if(attrNode == null) return false;
     	var index = attrNode.attributes.getNamedItem("index").value;     	
     	return this.modifyTitleByIndex(index,attrValue);
	}
	/**
	 * ���ú���
	 * ������ݵ��е����м�¼
	 * @parm isAddAnRow �Ƿ����һ���µļ�¼(null/true: ���룬false��������)
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
			this.dw.setDefaultValue(newRow);//Ĭ��ֵ
			newRow.attributes.getNamedItem("selected").value = "true";
			this.dw.getXMLDom().selectSingleNode("/dataWindow/dataObjs").appendChild(newRow);
		}
		this.refresh();
	}
    //�޸��е�״̬,��UniEAP����
	this.hiddenColStatus = function(attrIndex,status){
		//����isHidden����
		var headerNodes = this.dw.getXMLDom().selectNodes("/dataWindow/headers/header");
		if(headerNodes == null) return;
		for(var i=0; i < headerNodes.length;i++){
			if(headerNodes(i).attributes.getNamedItem("attrIndex").value == attrIndex){
				this.dw.addAttribute(headerNodes(i),"isHidden",status);
		    }
		}
    }
    /**
     * ���ú���
     * ͨ������������ָ����
     * @param  arr  ָ��������
     *         var arr = new Array();
     *         arr[0] = "1"; arr[1] = "2";
     * @param isRefresh null/true:ˢ��
     *                  false    :��ˢ��
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
     * ���ú���
     * ͨ����������ʾָ����
     * @param  arr  ָ��������
     *         var arr = new Array();
     *         arr[0] = "1"; arr[1] = "2";
     * @param isRefresh null/true:ˢ��
     *                  false    :��ˢ��
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
     * ���ú���
     * ͨ����������ָ����
     * @param  arr  ָ��������
     *         var arr = new Array();
     *         arr[0] = "empno"; 
     * @param isRefresh null/true:ˢ��
     *                  false    :��ˢ��
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
     * ���ú���
     * ͨ��������ʾָ����
     * @param  arr  ָ��������
     *         var arr = new Array();
     *         arr[0] = "empno"; 
     * @param isRefresh null/true:ˢ��
     *                  false    :��ˢ��
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
     * ���ú���
     * ����һ��
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
     * ���ú���
     * У�鲢��������
     * @return boolean true�����ݺϷ�; false ���ݲ��Ϸ�
     */
    this.accept = function(){
    	return this.dw.checkModifyInfo();
    }
    /**
     * ���ú���
     * ��ȡ���ѡ�����
     * @return boolean true�����ݺϷ�; false ���ݲ��Ϸ�
     */
    this.getLastSelectedRow = function(){
    	 if(this.dw.crtDOIndex == -100) return null;
    	 return new DWRow(this.dw,""+this.dw.crtDOIndex);
    }

}

/**
* ���ݴ����ж����캯��
* @param dw   ���ݴ��ڶ���
* @param arg  ����Ϊ��������:xml��dataObj�ڵ㡢xml��dataObj�ڵ��indexֵ
*/
function DWRow(dw,arg){
    this.dw = dw;
    this.dataObj;
    /**
     *��������
     * dataobj��index
     */
    this.index;
    if(typeof(arg) == "object"){
       this.dataObj = arg;
       this.index = this.dataObj.attributes.getNamedItem("index").value;
    }
    else{
       this.index = arg;
       //��ȡxml�е�dataObj����
       this.dataObj = this.dw.getDataObjByIndex(this.index);
    }

    /**
     * ���ú���
     * ��ȡ״̬
     * @return INSERTED��UPDATED��CANCELED��DELETED��UNCHANGED
     */
    this.getStatus = function(){
       return this.dataObj.attributes.getNamedItem("status").value;
    }
    /**
     * ���ú���
     * ����״̬
     * @param newStatus(INSERTED��UPDATED��CANCELED��DELETED��UNCHANGED)
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
     * ���ú���
     * �Ƿ�ѡ��
     * @return boolean false:δѡ�У�true:ѡ��
     */
    this.isSelected = function(){
         var tmp = this.dataObj.attributes.getNamedItem("selected").value;
         return tmp.toUpperCase() == "TRUE" ? true : false;
    }
    /**
     * ���ú���
     * �Ƿ�ɾ��
     * @return boolean false:δѡ�У�true:ѡ��
     */
    this.isRemoved = function(){
        var status = this.getStatus();
        return status == "DELETED" ||  status == "CANCELED" ? true : false;
    }
    /**
     * ���ú���
     * �Ƿ�����
     * @return boolean false:δѡ�У�true:ѡ��
     */
    this.isHiddened = function(){
         var hiddenAttr = this.dataObj.attributes.getNamedItem("hiddened");
         return hiddenAttr == null || hiddenAttr.value == "false" ? false : true;
    }
    /**
     * ���ú���
     * ��ȡ���ݴ����ж���
     * @param attrIndex �е�index
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
     * ���ú���
     * ��ȡ���ݴ����ж���
     * @param colName �е�����
     * @return DWCol
     */
    this.getDWColByName = function(colName){
         var attrNode = this.dw.getAttrNodeByName(colName); 
         if(attrNode == null) return null;     	
     	 var index = attrNode.attributes.getNamedItem("index").value;
     	 return this.getDWCol(index);
    }
    /**
     * ���ú���
     * ɾ������
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
     * ���ú���
     * ���ر������۱���״̬��Σ�������ʾ���б���
     * @return nothing
     */
    this.hidden = function(){
        this.dw.addAttribute(this.dataObj,"hiddened","true");
    }
    /**
     * ���ú���
     * ��ʾ����,��һ����������ʾ����(����״̬�й�)
     * @return nothing
     */
    this.show = function(){
        this.dw.addAttribute(this.dataObj,"hiddened","false");
    }
    /**
     * ���ú���
     * ѡ��
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
     * ���ú���
     * ȡ��ѡ��
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
* ���ݴ����ж����캯��
* @param dwRow   ���ݴ����ж���
* @param arg  ����Ϊ��������:xml��dataObj/attribute�ڵ㡢xml��dataObj/attribute�ڵ��indexֵ
*/
function DWCol(dwRow,arg){
     this.attrNode;
     this.dwRow = dwRow;
     if(typeof(arg) == "object") this.attrNode = arg;
     else this.attrNode = (this.dwRow.getDWCol(arg)).attrNode;
    /**
     * ��������
     * �е�index
     */
     this.index = this.attrNode.attributes.getNamedItem("index").value;
    /**
     * ��������
     * �е�value
     */
     this.value = this.attrNode.attributes.getNamedItem("value").value;
     /**
     * ��������
     * �е���ֵ
     */
     this.newValue = this.attrNode.attributes.getNamedItem("newValue").value;
     /**
     * ���ú���
     * �Ƿ�ı�
     * @return boolean false:δ�ı� true:�ı�
     */
     this.isModified = function(){
           var tmp = this.attrNode.attributes.getNamedItem("modified").value;
           if(tmp.toUpperCase() == "TRUE"){
               return true;
           }
           return false;
     }
    /**
     * ���ú���
     * ��Ӧ��attribute�Ƿ����option
     * @return boolean false:û�� true:��
     */
     this.hasOption = function(){
          var attrNode = this.dwRow.dw.getAttrNodeByIndex(this.index);
          //if(attrNode.childNodes.length > 0 ) return true;
          if(attrNode.attributes.getNamedItem("type").value.toLowerCase()=="select") return true;
          return false;
     }
    /**
     * ���ú���
     * ��ȡ�е�ֵ
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
     * ���ú���
     * ��ֵ
     * @param newValue
     * @return boolean ��ֵ�Ƿ�ɹ� true:�ɹ���false:ʧ��
     *         ʧ�ܵĿ���ԭ��1.���������ڷϳ�״̬��CANCELED��DELETED��
     *                      2.��ֵ���ٶ�Ӧ��option��
     */
     this.setNewValue = function(newValue){
           var rowStatus = this.dwRow.getStatus();
           //ɾ�����в�����
           if(rowStatus == "CANCELED" || rowStatus == "DELETED") return false;
           //ֵδ�ı䲻����
           var oldValue = this.getValue();
           if(newValue == oldValue) return true;
           //����select����
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
           if(newText == "UNIEAP_XML_ATTRIBUTE_SELECT_TEXT") return false;  //��ֵ���Ϸ�
           rowStatus = rowStatus == "INSERTED" ? "INSERTED" : "UPDATED";
           this.dwRow.setStatus(rowStatus); //��������״̬
           //����ֵ
           this.attrNode.attributes.getNamedItem("newValue").value = newValue;
           this.setText(newText);
           this.attrNode.attributes.getNamedItem("modified").value = "true";
           return true;
     }
     this.setText = function(newText){
         this.attrNode.text = newText;
     }
}