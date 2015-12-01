 /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+ �ű������� DataWindown����
+            ��������������Ʒ���
+ ��    ���� ���⻪ hugh@neusoft.com
+ �޸�������
+ �޸�  �ˣ�
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


/**
*@description ���ݴ��ڶ����캯��
*@param dwName ���ݴ�������
*/
function DataWindow(dwName){
    /* -------------- ���������� ------------------------------ */
    this.name = dwName;                                           //����
    this.type = null;                                             //����
    this.href = null;                                             //XSL·��
    this.nameRule = new DW_NAME_RULE(dwName);                     //��������
    this.dwevent = new DWEvent();                                   //�¼�   
    this.crtCellIndex = -100;                                     //��ǰCell��������
    this.crtDOIndex = -100;                                       //��ǰDataObj�����������
    this.crtOperate = "WAITING";                                  //��ǰ�������޸�(MODIFY)������(ADD)����ѯ(QUERY)��ɾ��(DEL)
    this.popWinXSL = "PopWin.xsl";                                //���ڽ����������ڵ�XSL�ļ�
    this.queryWinXSL = "QueryWin.xsl";                            //���ڽ��������������ڵ�XSL�ļ�
    this.screenStandard = "800*600";                              //������׼��800*600��1024*768
    this.isAutoSize = unieap.isAutoResize;                                      //�Ƿ��Զ��������ݴ��ڳߴ�
    this.isCompleteXSLT = false;                                  //�Ƿ�ȫ����
    //wanghx begin
    this.isUniteCols = false;                                   //�Ƿ�ϲ���Ԫ��
    //wanghx end
    this.doc = document;                                         //��õ������ڵ�document
    this.firstLoad = false;
    this.currentSelectedRow = null;                              //���浱ǰѡ�е��ж���
    this.mouseEventRowCss = null;

    /* -------------- ���з��������� -------------------------- */

    //wanghx begin for unite col
    this.getLastSelectedDOIndex = DW_getLastSelectedDOIndex;      //��ȡ���ѡ�е�DataObj���������
    //wanghx end
    this.getSelectedDataObjs = DW_getSelectedDataObjs;            //��ȡѡ�е�DataObj��������
    this.getSelectedRows = DW_getSelectedRows;                    //��ȡѡ�е�Row��������
    this.getFirstSelectedRow = DW_getFirstSelectedRow;            //��ȡ��һ��ѡ�е�Row����
    this.getLastSelectedRow = DW_getLastSelectedRow;              //��ȡ���һ��ѡ�е�Row����
    this.getScreenStandard = DW_getScreenStandard;                //��ȡ���ݴ��ڵ������ֱ���
    this.getFacade = DW_getFacade;                                //��ȡ���ݴ��ڶ���ӿ�
    this.getDWIdValue = DW_getDWIdValue;                          //��ȡ���ݴ��ڵ�DWId
    this.getAttrValue = DW_getAttrValue;                          //��ȡdataWindow/dataobjs/dataobj/attribute��ֵ
    this.exeQuery = DW_exeQuery;                                  //ִ�в�ѯ
    this.isAutoRemove = DW_isAutoRemove;                          //�Ƿ��Զ����

    /////////// writer
    this.setType = DW_setType;                                    //�޸����ݴ�������

    this.msxslt = DW_msxslt;                                      //���ݴ��ڲ��ֽ���
    this.fullMsxslt = DW_fullMsxslt;                              //���ݴ���ȫ������
    this.preDealDW = DW_preDealDW;                                //���ݴ���Ԥ����
    this.selectOneRow = DW_selectOneRow;                          //ͨ��dataObj��indexѡ��һ��
    this.doMouseEvent = DW_doMouseEvent;
    this.preDealDataObj = DW_preDealDataObj;

    /////////// events
    this.cell_onDblClick_pop = DW_cell_onDblClick_pop;            //��Ԫ���˫���¼���Ӧ����(���ݴ�������Ϊ��POP_EDIT)
    this.cell_onDblClick = DW_cell_onDblClick;                    //��Ԫ���˫���¼���Ӧ����
    this.rowSelecterOnclick = DW_rowSelecterOnclick;              //��ѡ�����ĵ���¼���Ӧ����
    this.headerOnClick = DW_headerOnClick;                        //�б�ͷ�ĵ���¼�
    this.checkBoxOnclick = DW_checkBoxOnclick;                    //�б�ͷ��ѡ��ĵ���¼�
    this.dwrefresh = DW_dwrefresh;                                //���ݴ���ˢ���¼�


    this.addRow = DW_addRow;                                      //"����"��ť����¼���Ӧ����
    this.deleteSelectedRow = DW_deleteSelectedRow;                //"ɾ��"��ť����¼���Ӧ����
    this.modifySelectedRow = DW_modifySelectedRow;                //"�޸�"��ť����¼���Ӧ����
    this.save = DW_save;                                          //"����"��ť����¼���Ӧ����
    this.query = DW_query;                                        //"��ѯ"��ť����¼���Ӧ����
    this.query_onclick = DW_query_onclick;                        //��ͨ��ѯ���������"��ѯ"��ť����¼���Ӧ����
    this.reset = DW_reset;
    this.refresh = DW_refresh;                                    //"ˢ��"��ť����¼���Ӧ����
    this.selTextOnChange = DW_selTextOnChange;                    //����select��text֮������� 
    this.selectOnChange = DW_selectOnChange;                      //����select��select֮�������

    /* -------------- ˽�з��������� -------------------------- */
    this.popWin = DW_popWin;
    this.queryWin = DW_queryWin                                   // �򿪲�ѯ������¼�봰��
    this.popWinOnLoad = DW_popWinOnLoad;
    this.queryWinOnLoad = DW_queryWinOnLoad                       //��ѯ����¼�봰�ڵ�OnLoad�¼�������������н���Ԫ�ع�������
    this.drawEditRow = DW_drawEditRow;                            //���б��е�ָ���иĳɿɱ༭״̬
    this.makeInputHTML = DW_makeInputHTML;
    this.makeSelectHTML = DW_makeSelectHTML;
    this.moveTitle = DW_moveTitle;
    this.editer_onblur = DW_editer_onblur;
    this.editer_onkeydown = DW_editer_onkeydown;
    this.modifyOneCell = DW_modifyOneCell;
    this.popwin_save_onclick = DW_popwin_save_onclick;
    this.querywin_query_onclick = DW_querywin_query_onclick;
    this.getediterValue = DW_getediterValue;
    this.selectByText = DW_selectByText;
    this.selectByValue = DW_selectByValue;
    this.modifyBGColor = DW_modifyBGColor;
    this.updateAttrValue = DW_updateAttrValue;                   //����DataObj��attribute�ڵ��ֵ
    this.adjustScrollByPosInTable = DW_adjustScrollByPosInTable; //ͨ��ָ�����б��е��С���������������������λ��
    this.adjustScrollByPosInDataSet = DW_adjustScrollByPosInDataSet; //ͨ��ָ����DataSet�е��С���������������������λ��
    this.adjustScrollByCombPos = DW_adjustScrollByCombPos;       //ͨ����ϵ�����ָ��������������������λ��
    this.adjustDWSize = DW_adjustDWSize;                         //�������ݴ��ڵĳ����༭���Ŀ��
    this.dataFilter = DW_dataFilter;                             //����ʱʹ�õ�����ɸѡ����
    this.addAttribute = DW_addAttribute;
    this.preDealEditer = DW_preDealEditer;
    this.modifyDOFromEditer = DW_modifyDOFromEditer;             //�ռ��༭��������,���޸Ķ�Ӧ��DataObj
    this.modifyEditerFromDO = DW_modifyEditerFromDO;
    this.getAttrNodeByIndex = DW_getAttrNodeByIndex;
    this.getDOAttrNodeByIndex = DW_getDOAttrNodeByIndex;
    this.getAttrNodeByName = DW_getAttrNodeByName;
    this.getValidDataType = DW_getValidDataType;
    this.getDataObjByIndex = DW_getDataObjByIndex;
    this.checkModifyInfo = DW_checkModifyInfo;                   //����޸Ĺ�����Ϣ�Ƿ�Ϸ�
    this.setDefaultValue = DW_setDefaultValue;
    this.checkedRowSelecter = DW_checkedRowSelecter;             //����xml��ѡ��ѡ����
    this.replaceNode = DW_replaceNode;
    this.translateValue = DW_translateValue;                     //�������
    this.assQueryCondition = DW_assQueryCondition;               //��װ��ѯ����
    this.adjustPageButton = DW_adjustPageButton;                 //������ҳ��ť
    this.checkAttributeIndex = DW_checkAttributeIndex ;          //���arrtibute�е�index�Ƿ����ظ���
    this.cutUnwantedHeader = DW_cutUnwantedHeader ;              //ɾ����Щheader��attrIndex������Ӧattribute��index�в����ڵ���
    this.headerInAttribute = DW_headerInAttribute ;
    this.getSelectedValue = DW_getSelectedValue;                 //�õ�ѡ���е�ֵ
    this.alternateChange = DW_alternateChange;                   //���ڵ�ѡ����¼���������
    this.setDocument = DW_setDocument ;                          //����Ӧ�õ�����ģ̬�Ի����document
    this.cutNBSP = DW_cutNBSP ;                                  //ȥ���ո�
    this.doPoseRadioEvent = DW_doPoseRadioEvent;
    this.preDealSumCalculate = DW_preDealSumCalculate;
    this.formatDataPrecision = DW_formatDataPrecision;
    
    /* -------------- �����Ͱ󶨵ķ��������� ------------------ */
        //wanghx begin for unite col
        this.getCurrAttrIndex = DW_getCurrAttrIndex;//����ģ���е�"index"��ȡ�����ݵ���ʵ�ʵ�attributes˳��
    //wanghx end
    this.afterMsxslt = DW_afterMsxslt;
    this.afterMsxslt_gridEdit = DW_afterMsxslt_gridEdit;
    this.afterMsxslt_quickEdit = DW_afterMsxslt_quickEdit;
    this.afterMsxslt_freeEdit = DW_afterMsxslt_freeEdit;
    this.afterMsxslt_gridEditRoot = DW_afterMsxslt_gridEditRoot; //for jiye
    this.afterMsxslt_oneSelectRoot = DW_afterMsxslt_oneSelectRoot;
    this.clearChildDataWindow = DW_clearChildDataWindow;
    this.rootRowSelecterOnclick = DW_rootRowSelecterOnclick;
    this.setDefaultChildCol = DW_setDefaultChildCol;
    this.preRowOnclick_freeEdit = DW_preRowOnclick_freeEdit;     //��һ������¼�
    this.nextRowOnclick_freeEdit = DW_nextRowOnclick_freeEdit;   //��һ������¼�
        //wanghx begin for united cols
        this.uniteCols =DW_uniteCols;//�ϲ���Ԫ��
        this.uniteColsPostProc =DW_uniteColsPostProc;//�ڶԺϲ���Ԫ�����ݴ�������ĳЩ������ɾ���У�����ô˲���������ҳ�����
        this.getDisplayValue = DW_getDisplayValue;//���ص�ǰ�ֶε���ʾֵ��newValue��value��

    //wanghx end for united cols
    
    /* -------------- ���ݵ�����ʾ�б��е�λ��ת���������� ---- */
    this.cvtDOIndexToRowIndex = DW_cvtDOIndexToRowIndex;       //��DataObj������ת�����б��е�������
    this.cvtRowIndexToDOIndex = DW_cvtRowIndexToDOIndex;       //���б��е�������ת����DataObj������
    this.cvtAttrIndexToCellIndex= DW_cvtAttrIndexToCellIndex;  //��DataObj/attribute/indexת����ָ�����е�������
    this.cvtCellIndexToAttrIndex= DW_cvtCellIndexToAttrIndex;  //��ָ�����е�������ת����DataObj/attribute/index

    /* -------------- ���Զ����� ------------------------------ */

    this.getName = DW_getName;                                 //��ȡ���ݴ�������
    this.getType = DW_getType;                                 //��ȡ���ݴ�������
    this.getXMLObj = DW_getXMLObj;
    this.getXMLDom = DW_getXMLDom;
    this.getXML = DW_getXML;
    this.getHref = DW_getHref;
    
    
}
/* ========================= �����Ͱ󶨵ķ�������   ============================ */
function DW_afterMsxslt(){
    //��������ɫ
    this.modifyBGColor();
    //ִ�и��Ե���β����
    this.afterMsxslt_gridEdit();
    this.afterMsxslt_quickEdit();
    this.afterMsxslt_freeEdit();
    this.afterMsxslt_gridEditRoot();//for jiye
    this.afterMsxslt_oneSelectRoot();
    ////������ֱ��������ˮƽ������
    this.adjustScrollByCombPos(this.crtDOIndex,this.crtCellIndex);
    //�������ݴ���ˢ�º���
    this.dwrefresh(); 
    //������ҳ��ť
    this.adjustPageButton();
}
function DW_dwrefresh(){
    eapObjsMgr.refreshDW(null,this);
    }
//��β��������������ΪGRID_EDIT
function DW_afterMsxslt_gridEdit(){
    if(this.getType() != "GRID_EDIT") return;
    //���б༭��
    this.drawEditRow(this.crtDOIndex,this.crtCellIndex);
}
/**
 *@description ��������ΪQUICK_EDIT
 *@modified by 2006-01-09
 *@remark currentSelectedRowָ��ǰѡ���ж���
 */
function DW_afterMsxslt_quickEdit(){
    if(this.getType() != "QUICK_EDIT") return;
    //���༭���ĸ���Ŀ��ֵ
    var dataObjArr = this.getSelectedDataObjs();
    var myCheckbox =  this.nameRule.getCheckBox();     
    if(dataObjArr.length > 0 ){
        var dataObj = dataObjArr[0];
        this.modifyEditerFromDO(dataObj);
        if(myCheckbox != null) myCheckbox(0).checked = true;//��������ѡ��
        var rowIndex = this.cvtDOIndexToRowIndex(dataObj.getAttribute("index"));
        this.currentSelectedRow = this.nameRule.getBodyTable().rows(rowIndex);   
    }
    else{
        if(myCheckbox != null) myCheckbox(0).checked = false;//��������ѡ��
        //����ϴ������ڱ༭������
        this.modifyEditerFromDO(this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj").cloneNode(true));
    }
    this.alternateChange();
}
//��β��������������ΪFREE_EDIT
function DW_afterMsxslt_freeEdit(){
    if(this.getType() != "FREE_EDIT") return;
    //�ѵ�ǰDataObj��ֵ����༭����
    var dataObj = null;
    var doNums = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
    var btn1 = this.nameRule.getPreRowButton();
    var btn2 = this.nameRule.getNextRowButton();
    if(btn1 != null){ btn1.disabled = true; btn1.className="NEUDwButton_Pre_Disable";}
    if(btn2 != null){ btn2.disabled = true; btn2.className="NEUDwButton_Next_Disable";}
    if(doNums != null && doNums.length > 0){
        var tmp =   this.crtDOIndex == -100 ? 1 : this.crtDOIndex;
        if(tmp < parseInt(doNums.length,10)){
            if(btn2 != null){ btn2.disabled = false; btn2.className="NEUDwButton_Next";}
        }
        if(tmp > 1){
            if(btn1 != null){ btn1.disabled = false; btn1.className="NEUDwButton_Pre";}
        }
    }
    if(this.crtDOIndex < 0 ){
         this.crtDOIndex = 1;
         if(doNums != null && doNums.length > 0){
            doNums(0).attributes.getNamedItem("selected").value = "true";
         }
    }
    try{
        var doNum = doNums.length;
        dataObj = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj")(this.crtDOIndex - 1);
        this.modifyEditerFromDO(dataObj);
     }catch(e){}
     /////
     this.alternateChange();
}

function DW_afterMsxslt_oneSelectRoot(){
   if(this.getType() != "ONE_SELECT_ROOT") return;
   var arr = this.getSelectedDataObjs();
    if(arr.length == 0){
     var selecter = this.nameRule.getRowSelecter();
      if(!selecter) this.clearChildDataWindow();
      else{
        if(selecter.length>1)  selecter[0].click();
        else  selecter.click();
      }
    }
    else{
       if(this.crtOperate == "ADD") this.clearChildDataWindow();
    }
     return;
}
function DW_afterMsxslt_gridEditRoot(){
    if(this.getType() != "GRID_EDIT_ROOT") return;

    //���б༭��
    this.drawEditRow(this.crtDOIndex,this.crtCellIndex);
    var arr = this.getSelectedDataObjs();
    if(arr.length == 0){
      var selecter = this.nameRule.getRowSelecter();
      if(!selecter) this.clearChildDataWindow();
      else{
        if(selecter.length>1)  selecter[0].click();
        else  selecter.click();
      }
    }
    else{
       if(this.crtOperate == "ADD") this.clearChildDataWindow();
    }
    return;
}
//wanghx begin for united cols
function DW_getDisplayValue(node,obj){
  var status = node.getAttribute("modified");
 if (status=="true") {  return node.getAttribute("newValue");}
 else return node.getAttribute("value");
}
function DW_getCurrAttrIndex(index){
     var attributes = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute");
     for(var i=0;i<attributes.length;i++){
       if(index==attributes(i).getAttribute("index"))
         return i;
     }
     return -1;
}
/**
* ��0��ʼ���Ա�ֱ�ӿ��Դ�ȡdom�Ľڵ�����
* @return ����
*/
function DW_getLastSelectedDOIndex(){
     var selectedobjs =this.getSelectedDataObjs();
     if(selectedobjs!=null&&selectedobjs.length>0) {
        return parseInt(selectedobjs[0].getAttribute("index"),10)-1;
     }
     return null;
}

/**
* �ϲ���Ԫ��
*/
function DW_uniteCols(){
    if(this.getXMLDom().selectSingleNode("/dataWindow/uniteCols")==null)
       return;
     var type= this.getType();
     this.isUniteCols = true;
     this.isSort = false;
     var selectedIndex= this.getLastSelectedDOIndex();
     var colNodes = this.getXMLDom().selectNodes("/dataWindow/uniteCols/col");
     var attrIndex = new Array();
     var m;
     for(m=0;m<colNodes.length;m++){
        var index = colNodes(m).getAttribute("attrIndex");
        attrIndex[m] = this.getCurrAttrIndex(index);
     }
     var dataObjNodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
     var frontObj,objIndex,j,col;
     for(objIndex=0;objIndex<dataObjNodes.length;objIndex++){
        var obj = dataObjNodes(objIndex);
       var attrs = obj.selectNodes("attribute");
       for(col=0;col<attrIndex.length;col++){
           var attr = attrs(attrIndex[col]);
           attr.setAttribute("unitedcol","1");
           if(selectedIndex&&selectedIndex==objIndex) continue;
                if(col>=1){
                   var frontAttr1 = attrs(attrIndex[col-1]);
                     if(frontAttr1.getAttribute("unitedcol")!="0") continue;
                }
                j=objIndex-1;
                while(j>=0){
                if(selectedIndex&&selectedIndex==j&&(type=="GRID_EDIT")) break;//��GRID_EDIT�����У���������ǵ�ǰ��ѡ�е�ֵ���򲻱غϲ���Ԫ��
                  var frontObj = dataObjNodes(j);
                  var frontAttrs = frontObj.selectNodes("attribute");
                  var frontAttr = frontAttrs(attrIndex[col]);
                  var value = this.getDisplayValue(attr,obj);//attr.getAttribute("value");
                  var frontValue = this.getDisplayValue(frontAttr,frontObj);//frontAttr.getAttribute("value");
                  if(frontValue==null||value==null) break;
                  if(frontValue==value){
                     if(frontAttr.getAttribute("unitedcol")!="0"){
                              frontAttr.setAttribute("unitedcol",(parseInt(frontAttr.getAttribute("unitedcol"))+1)+"");
                          //modify by wanghx
                          //attr.setAttribute("unitedcol","0");
                           //break;
                       }
                         attr.setAttribute("unitedcol","0");
                         j--;
                  }
                  else break;
                 }
              }
           }
  }
/**
* �ڶԺϲ���Ԫ�����ݴ�������ĳЩ������ɾ���У�����ô˲���������ҳ�����
* @return
*/
   function DW_uniteColsPostProc(objIndex_str){
     if (!this.isUniteCols) return;
     var index = parseInt(objIndex_str,10)-1;//��0��Ϊ������������������dom
     var dataObjNodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
     var dataObj= dataObjNodes[index];
     if(dataObj==null) return ;
     if(dataObj.getAttribute("status")=="DELETED"){
       var attrs = dataObj.selectNodes("attribute");
       for(var col=0;col<attrs.length;col++){
         var unitedcol =attrs[col].getAttribute("unitedcol");
         if(!unitedcol) continue;
         unitedcol= parseInt(unitedcol,10);
         if(unitedcol== 0){
           var j= index-1;
           while(j>=0){                        //��ǰ���Ǳ������кϲ���
              if(dataObjNodes[j].getAttribute("status")=="DELETED"){j--;continue;} //����������Ǳ�ɾ�����򲻴���
              var frontAttrs = dataObjNodes[j].selectNodes("attribute");
              var front_unitedcol = frontAttrs[col].getAttribute("unitedcol");
              if(front_unitedcol&&front_unitedcol!="0") {
                frontAttrs[col].setAttribute("unitedcol",(parseInt(front_unitedcol)-1)+"");
                break;
              }
              j--;
           }
         }
         if(unitedcol>1){                //��ǰ�кϲ���������
          var j = index+1;
          var laterObj= dataObjNodes[j];
          while(laterObj!=null&&laterObj.getAttribute("status")=="DELETED"){
            laterObj= dataObjNodes[++j];
          }
          if(laterObj==null) continue;
          var laterAttrs= laterObj.selectNodes("attribute");
          var later_unitedcol = laterAttrs[col].getAttribute("unitedcol");
          if(later_unitedcol&&later_unitedcol=="0") {
             laterAttrs[col].setAttribute("unitedcol",(unitedcol-1)+"");
          }
         }
       }
     }
     return;
   }
//wanghx end for united cols
/**
* �����window�е�����
* @return
*/
function DW_clearChildDataWindow(){
   var childWindowName = findObj("childWindowName").value;
   var divHTML = findObj("dwXmlDiv_"+childWindowName).innerHTML;
   var i = divHTML.indexOf("<dataObjs");
   var j = divHTML.indexOf("</dataObjs>",i);
   if(j>0){
     var n = divHTML.indexOf("<dataObj",i+9);
     findObj("dwXmlDiv_"+childWindowName).innerHTML = divHTML.substring(0,n)+divHTML.substring(j);
     return;
   }

}
/**
* ��window�е��һ�еĴ����¼�
* @return
*/
function DW_rootRowSelecterOnclick(formId,dataWindowName,rowIndex){

  // alert("jiye has in rootrowselecteronclick, formid="+formId+",dwname="+dataWindowName+",rowindex="+rowIndex);
   this.rowSelecterOnclick();
   //var dataWindowId;
   var objDwForm=findObj(formId);
   postParameter="&dwid_"+dataWindowName+"="+findObj("dwid_"+dataWindowName,objDwForm).value;
   postParameter+="&dwName="+dataWindowName+"&rowIndex="+rowIndex;
   postParameter+="&biDataWindowName="+findObj("biDataWindowName").value;
   var childWindowName = findObj("childWindowName").value;
   var objXMLReq = new ActiveXObject("Microsoft.XMLHTTP");
   var method="checkRootRow";
   var strURL = unieap.WEB_APP_NAME + "/BiDataWindowEventAction.do";
   strURL=strURL+"?method="+method+postParameter;
   //alert("strURL is-"+strURL);

   objXMLReq.open("POST", strURL, false);
   objXMLReq.send("");
   var result = objXMLReq.responseText;
   if(result.indexOf("ERROR:")==0)
   {
      result=result.substr(6);
      //alert(result);
      return;
   }
   // alert("window = "+childWindowName+"result="+result);
   dataWindowRefresh(this.getName(),result,"dataObjs");
   this.setDefaultChildCol();

}
/***
* ������window�е�ȱʡ�ֶ�
*/

function DW_setDefaultChildCol(){
  var xmlDoc = document.all("bidw_relatedKeys").XMLDocument;
  if(xmlDoc==null) return;
  var childName= document.all("childWindowName").value;
  var rks = xmlDoc.selectNodes("/relatedKeys/RK");
  var nods = this.getSelectedDataObjs();
  var rootIndex,childIndex,rootval,facade;
  for(var i=0;i<rks.length;i++){
     rootIndex = rks[i].attributes.getNamedItem("rootIndex").value;
     childIndex = rks[i].attributes.getNamedItem("childIndex").value;
     rootval = nods[0].childNodes(rootIndex-1).attributes.getNamedItem("value").value;
     facade = dwManager.getDW(childName).getFacade();
     facade.modifyColAttr(childIndex,"defaultValue",rootval,"true");
  }
  return;
}
/* ========================= ���ݴ��ڶ���������     ============================ */

// ��ȡ���ݴ�������
function DW_getName(){ return this.name; }

// ��ȡ���ݴ�������
function DW_getType(){
    if(this.type == null)
        this.type = this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("type").value;
    return this.type;
}

// ��ȡ���ݴ���xml����
//DW_XMLID_BEGIN��DWNameRule.js�ж���
function DW_getXMLObj(){ return document.all(DW_XMLID_BEGIN+this.getName()); }

// ��ȡ���ݴ���XMLDom
function DW_getXMLDom(){ return this.getXMLObj().XMLDocument; }

// ��ȡ���ݴ���XML
function DW_getXML(){ return this.getXMLObj().xml;}

// ��ȡ���ݴ�������HREF
function DW_getHref(){return this.getXMLObj().href+"DataWindow"+this.getType()+".xsl";}

/**
 *@description ��ȡѡ�е�DataObj��������
 *@return Array�������
 *@modified by 2006-01-06
 */
function DW_getSelectedDataObjs(){
    var arr = new Array();
    
    /******
    var dataObjNodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
    if(dataObjNodes == null) return arr;
    for(var i=0 ; i < dataObjNodes.length;i++)
        if(dataObjNodes(i).attributes.getNamedItem("selected").value == "true")
            arr[arr.length] = dataObjNodes(i);
    ******/

    var node = this.getXMLDom().selectSingleNode("/dataWindow/dataObjs").firstChild;
    while(node){
       if(node.attributes.getNamedItem("selected").value == "true")
          arr[arr.length] = node;
       node = node.nextSibling;
    }
    return arr;
}
/**
 *@description ��ȡѡ�е�Row��������(Լ�������б��е�TR����pos���ԣ���ֵΪ��Ӧ��DataObj��indexֵ)
 *@return Array�������
 *modified by 2006-01-06
 */
function DW_getSelectedRows(){
    var arr = this.getSelectedDataObjs();
    var rowArr = new Array();
    var tbl = this.nameRule.getBodyTable();
    if(tbl == null) return rowArr;
    again: for(var i=1;i < tbl.rows.length; i++)
        for(var j=0; j<arr.length; j++)
            if(arr[j].attributes.getNamedItem("index").value == tbl.rows(i).pos){
                rowArr[rowArr.length] = tbl.rows(i);
                arr.splice(j,1); //�Ż�����
                if(arr.length==0) break again;
                continue again;
        }   
    
    return rowArr;
}
/**
 *@description ��ȡ��һ��ѡ�е�Row����
 *@return Node����
 */
function DW_getFirstSelectedRow(){
    var rowArr = this.getSelectedRows();
    if(rowArr.length == 0)  return null;
    return rowArr[0];
}
/**
 *@description ��ȡ���һ��ѡ�е�Row����
 *@return Node����
 */
function DW_getLastSelectedRow(){
    var rowArr = this.getSelectedRows();
    if(rowArr.length == 0)  return null;
    return rowArr[rowArr.length-1];
}
// ��ȡ���ݴ��ڵ������ֱ���
function DW_getScreenStandard(){
    return this.screenStandard;
}
function DW_getFacade(){
    return new DWFacade(this);
}
/* ========================= ���ݴ���д��������     ============================ */

// �޸����ݴ�������
function DW_setType(type){
    if(type == this.getType())  return;
    this.type = type;
    this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("type").value = type;
}

/* ========================= ���ݴ��ڵ���¼���Ӧ��������======================= */
/**
 *@description ��Ԫ��˫���¼���Ӧ����(���ݴ�������Ϊ:GRID_EDIT)
 *@modified by 2006-01-06
 *@remark �ı�ѡ���еĲ���
 */
function DW_cell_onDblClick_pop(){
    //����˫��֮ǰ�ļ����¼�
    if(!this.dwevent.trigger(this.dwevent.BEFOR_OPEN_POPWIN)) return;
     
    var eSrcObject = event.srcElement;
    if(eSrcObject.tagName != "TR") eSrcObject = eSrcObject.parentElement;
    if(eSrcObject.tagName != "TR") return;
    if(eSrcObject.cells(0).tagName == "TH") return;

    
    this.crtOperate = "MODIFY";    //��ǰ����
    this.crtDOIndex = eSrcObject.pos;
    //this.selectOneRow(this.crtDOIndex);     //ѡ�е������
    //�޸Ĳ���
    eSrcObject.cells(0).children(0).click();
    
    this.popWin();                 //�򿪲�������
    //����˫��֮��ļ����¼�
    this.dwevent.trigger(this.dwevent.AFTER_OPEN_POPWIN);
}
//��Ԫ��˫���¼���Ӧ����
function DW_cell_onDblClick(){

    var eSrcObject = event.srcElement;
    if(eSrcObject.tagName != "TR") eSrcObject = eSrcObject.parentElement;
    if(eSrcObject.tagName != "TR") return;
    if(eSrcObject.cells(0).tagName == "TH") return;

    this.currentSelectedRow = eSrcObject;      //��ǰ��
    this.crtDOIndex = eSrcObject.pos;
    //this.selectOneRow(this.crtDOIndex);   //ѡ�е������
    this.crtOperate = "QUERY";     //��ǰ����
    this.popWin();                 //�򿪲�������
    

}
/**
 *@description ����radio������¼�
 *@created by 2006-01-05
 *@remark 
 */
function DW_doPoseRadioEvent(){
    var eSrcObject = event.srcElement;
    var dataObjs = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");          
    if(this.currentSelectedRow){       
       dataObjs(parseInt(this.currentSelectedRow.pos,10) - 1).attributes.getNamedItem("selected").value = "false" ;  
       if(unieap.selectedRowCss){
	       var brother = this.currentSelectedRow.nextSibling?this.currentSelectedRow.nextSibling:this.currentSelectedRow.previousSibling;        
		   if(brother){
		      if(brother.className=="NEUDwListRowBgColor1")
		           this.currentSelectedRow.className ="NEUDwListRowBgColor2";
		      else
		           this.currentSelectedRow.className ="NEUDwListRowBgColor1";                  
		   }
		   else
		      this.currentSelectedRow.className ="NEUDwListRowBgColor1"; 
       }            
    } 
    this.crtCellIndex = 1;
    this.crtDOIndex = parseInt(eSrcObject.value,10);  
    this.currentSelectedRow = eSrcObject.parentElement.parentElement; 
    dataObjs(this.crtDOIndex-1).attributes.getNamedItem("selected").value = "true" ; 
    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","true"); 
    if(unieap.selectedRowCss)    
        this.currentSelectedRow.className ="NEUDwListRowBgColor3";        
    this.nameRule.getCheckBox()(0).checked = true;   
    if(this.isUniteCols) {this.uniteCols();}    
}
/**
 *@description ��ѡ�����ĵ���¼���Ӧ����(�ֱ�����¼��ֱ༭���ͷֱ�������)
 *@modified by 2006-01-05
 *@remark ������ܣ����ٲ���xslt
 */
function DW_rowSelecterOnclick(){
    //���֮ǰ�Ĵ����¼�
    if(!this.dwevent.trigger(this.dwevent.BEFOR_ROW_SELECTED)) return;        
   
    if(this.getType() == "ONE_SELECT" || this.getType()=="POP_EDIT"){ 
        this.doPoseRadioEvent();  
    }
    else if(this.getType() == "GRID_EDIT"||this.getType()=="QUICK_EDIT"){
       //У������ֵ�ĺϷ���
       if(!this.checkModifyInfo()){
            event.returnValue = false;
            this.checkedRowSelecter();
            return;
       }      
       //�����¼��dom������
       if(this.currentSelectedRow){     
           var dataObjs = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");   
           var tDataRow = dataObjs[parseInt(this.currentSelectedRow.pos,10)-1].childNodes;                   
           for(var i=1;i<this.currentSelectedRow.cells.length;i++){          
               var colIndex = parseInt(this.currentSelectedRow.cells(i).index)-1;      
               this.currentSelectedRow.cells(i).innerText = tDataRow[colIndex].text +" ";
           }
       }     
       //�ı��е���ʽ�����Լ��޸�dom�����ѡ��״̬
       this.doPoseRadioEvent();
       this.afterMsxslt_gridEdit();
       this.afterMsxslt_quickEdit(); 
       
       this.dwrefresh(); 
       this.alternateChange();
    }
    else if(this.getType() == "MULTI_SELECT" ){
       var eSrcObject = event.srcElement;
       var parentObj = eSrcObject.parentElement.parentElement;
       var dataObjs = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");  
       if(!eSrcObject.checked){    
          dataObjs(parseInt(parentObj.pos,10) - 1).attributes.getNamedItem("selected").value ="false" ; 
          if(unieap.selectedRowCss){
             if(this.cvtDOIndexToRowIndex(parentObj.pos)%2==0)
               parentObj.className = "NEUDwListRowBgColor1"; 
             else
               parentObj.className = "NEUDwListRowBgColor2"; 
          }
       }
       else{
          dataObjs(parseInt(parentObj.pos,10) - 1).attributes.getNamedItem("selected").value = "true" ;  
          this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","true"); 
          if(unieap.selectedRowCss)
             parentObj.className ="NEUDwListRowBgColor3"; 
          this.nameRule.getCheckBox()(0).checked = true; 
       }       
    }
    
    
    
    
    
    
    /*
    
    
    //������޸����ݵĺϷ���
    if(!this.checkModifyInfo()){
        event.returnValue = false;
        this.checkedRowSelecter();
        return;
    }
   
    if( this.crtDOIndex > 0 ){

       if(this.getType() == "GRID_EDIT" || this.getType() == "QUICK_EDIT"){
            var rowIndex = this.cvtDOIndexToRowIndex(this.crtDOIndex);
            if(rowIndex >=0){
	            var row = this.nameRule.getBodyTable().rows(rowIndex);
	            var tDataRow = this.getSelectedDataObjs()[0].childNodes;
	            for(var i=1;i<row.cells.length;i++){          
	                var colIndex = parseInt(row.cells(i).index)-1;      
	                row.cells(i).innerText = tDataRow[colIndex].text +" ";
	           }
            }   
       }       
    }
    this.crtOperate = "WAITING";                              //һ��Ҫ��״̬�û�ȥ
    var eSrcObject = event.srcElement;
    this.crtCellIndex = 1;                                    //��ǰCell��������
    this.crtDOIndex = parseInt(eSrcObject.value,10);
    if(eSrcObject.type.toUpperCase() == "RADIO")
        this.selectOneRow(eSrcObject.value);
    else if(eSrcObject.type.toUpperCase() == "CHECKBOX")
            if(eSrcObject.checked)
                this.selectOneRow(eSrcObject.value,true,true);
            else
                this.selectOneRow(eSrcObject.value,true,false);

    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","true");
    //modify by wanghx for unite col
    //if(this.getType() == "GRID_EDIT"){
    if(this.getType() == "GRID_EDIT"||this.getType() == "QUICK_EDIT"||this.getType() == "POP_EDIT"||this.getType() == "ONE_SELECT"){
        //wanghx begin for united cols
        if(this.isUniteCols) {this.uniteCols();}
        this.checkedRowSelecter();
     
        //wanghx end
      // this.msxslt();
        this.afterMsxslt();
     
        if(this.getType() == "GRID_EDIT"||this.getType() == "QUICK_EDIT") //new add listener
           this.alternateChange();
        //�����¼�
       this.dwevent.trigger(this.dwevent.AFTER_ROW_SELECTED);
        return;
    }
    this.checkedRowSelecter();
   //this.afterMsxslt();
    this.msxslt();
*/
    //�����¼�
    this.dwevent.trigger(this.dwevent.AFTER_ROW_SELECTED);
}
/**
 *@description ��ͷ����¼�������
 *@param headerIndex ���е�������
 *@modified by 2006-01-06
 *@remark �ı䵱ǰ��currentSelectedRow��ָ��
 */
function DW_headerOnClick(headerIndex){

    //�����¼�
    if(!this.dwevent.trigger(this.dwevent.BEFOR_ORDER)) return;

    var headerNode = this.getXMLDom().selectSingleNode("/dataWindow/orderInfo");
    var namedNodemap = headerNode.attributes;
    
    //ָ��������
    namedNodemap.getNamedItem("attrIndex").value = headerIndex;
   
    //����������
    var orderAttribute = namedNodemap.getNamedItem("order");
     
    if(orderAttribute.value == "ascending"){
        orderAttribute.value = "descending";
    }else{
        orderAttribute.value = "ascending"
    }
   
    //�����������ͣ���Ҫ����Number��
    //new add  //���ܷ��� headerIndex ������������header�����е�ʵ��λ�á�
    var temp = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute");    
    var colDataType ;
    for(var i=0;i<temp.length;i++){
       //alert("the"+i+" = "+temp(i).attributes.getNamedItem("dataType").value);
       if(temp(i).attributes.getNamedItem("index").value==(""+headerIndex)){
          colDataType = temp(i).attributes.getNamedItem("dataType").value;          
          break;
       }
    }   
    namedNodemap.getNamedItem("dataType").value = this.getValidDataType(colDataType)
    //���½�����ˢ��
    var dataObjIndex = this.currentSelectedRow?this.currentSelectedRow.pos:-1;
    
    if (unieap.orderbyDB && (this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("isEmptyOnCreate")==null || this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("isEmptyOnCreate").value =="false")){
        var postParameter = "headerIndex="+headerIndex+"&order="+orderAttribute.value;
        dsSessionMgr("setOrder",unieap.FORM_NAME,this.name,postParameter);
        this.currentSelectedRow = null;
        this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","false");
    }
    this.msxslt();
    //�޸�
    
    if(this.currentSelectedRow){
        var rowIndex = this.cvtDOIndexToRowIndex(dataObjIndex);
        this.currentSelectedRow = this.nameRule.getBodyTable().rows(rowIndex);
    }  

    //�����¼�
    this.dwevent.trigger(this.dwevent.AFTER_ORDER);

}
/**
 *@description �������ڵı��水ť�ĵ����Ӧ����
 *@param doc ���ڵ�document����
 *@modified by 2006-01-09
 */
function DW_popwin_save_onclick(doc)
{
    //���ӱ���֮ǰ�ļ����¼�
 
    if(!this.dwevent.trigger(this.dwevent.BEFOR_SAVE_POPWIN)) return false;   
    var theForm = doc.all(unieap.FORM_NAME); 
    //У��ֵ     
    if(!checkValue(theForm)) return false;
    var xmlDom = this.getXMLDom();  
    var editerNodes = xmlDom.selectNodes("/dataWindow/editers/editer");
    var theediter;
    var count = -1;
    var node;
   
    //��������
    if(this.crtOperate == "ADD"){
        var index;
        var newRow = xmlDom.selectSingleNode("/dataWindow/template/dataObj").cloneNode(true);               
        for(var i = 0; i < editerNodes.length; i++){
            index = editerNodes(i).attributes.getNamedItem("attrIndex").value;
            node = this.getDOAttrNodeByIndex(newRow,index);           
            theediter = doc.all(this.nameRule.getDisplayEditerBegin()+index);            
            if(theediter.tagName.toUpperCase() == 'INPUT'||theediter.tagName.toUpperCase()=='TEXTAREA'){
                node.text = theediter.value;
                node.attributes.getNamedItem("value").value = theediter.value;
            }else if(theediter.tagName == 'SELECT'){
                
                if(theediter.selectedIndex>=0){
                   if(theediter.selectedIndex == 0&&theediter.options[0].text=="��ѡ��")
                      node.text = "";
                   else
                      node.text = theediter.options(theediter.selectedIndex).text;
                   node.attributes.getNamedItem("value").value = theediter.options(theediter.selectedIndex).value;
                }
                else{//��<option>Ϊ��ʱ //����С�����Էź��
                   //theediter.selectedIndex = 0;
                  
                    node.text = "";
                    node.attributes.getNamedItem("value").value ="";
                } 
            }
            node.attributes.getNamedItem("newValue").value = node.attributes.getNamedItem("value").value;
        }
        newRow.attributes.getNamedItem("index").value = xmlDom.selectNodes("/dataWindow/dataObjs/dataObj").length + 1;
        newRow.attributes.getNamedItem("status").value = "INSERTED";
        newRow.attributes.getNamedItem("selected").value = "true";
        xmlDom.selectSingleNode("/dataWindow/dataObjs").appendChild(newRow);
        //������Ϊ��ѡ��״̬
        for(var j=0; j < xmlDom.selectNodes("/dataWindow/dataObjs/dataObj").length - 1; j++)
            xmlDom.selectNodes("/dataWindow/dataObjs/dataObj")(j).attributes.getNamedItem("selected").value = "false";
        //���½�����ˢ��
        this.msxslt();
        //��ǰ����ָ��ָ���½���        
        var rowIndex = this.cvtDOIndexToRowIndex(newRow.attributes.getNamedItem("index").value);
        this.currentSelectedRow = this.nameRule.getBodyTable().rows(rowIndex);
        //���ӱ���֮��ļ����¼�
        this.dwevent.trigger(this.dwevent.AFTER_SAVE_POPWIN);
        return true;
    }
    //�޸Ĳ���
    else if(this.crtOperate == "MODIFY")
    {
        var selectedDataObjects = this.getSelectedDataObjs();
        var oldValue,newValue,newText,flag=false;
        var myStatus;
        myStatus = selectedDataObjects[0].attributes.getNamedItem("status").value;
        if( myStatus == "DELETED")  return;
              
        var index;
        for(var i = 0; i < editerNodes.length; i++){
            index = editerNodes(i).attributes.getNamedItem("attrIndex").value; 
            node = this.getDOAttrNodeByIndex(selectedDataObjects[0],index);
            //��DataObject��attribute�л�ȡ����һ�θı���ֵ
            if(node.attributes.getNamedItem("modified").value == "true")
                oldValue = node.attributes.getNamedItem("newValue").value;
            else
                oldValue = node.attributes.getNamedItem("value").value;
            //���´����л�ȡ��ֵ
            theediter = doc.all(this.nameRule.getDisplayEditerBegin()+index);  

            if(theediter.tagName == 'INPUT'||theediter.tagName =='TEXTAREA'){               
                newValue = theediter.value;
                newText = newValue;
            }else if(theediter.tagName == 'SELECT'){               
     
                if(theediter.selectedIndex >=0){
                  if(theediter.selectedIndex == 0&&theediter.options[0].text=="��ѡ��")
                     newText = "";
                  else
                     newText = theediter.options(theediter.selectedIndex).text;
                  newValue = theediter.options(theediter.selectedIndex).value;
                }
                else{ //��<option>Ϊ��ʱ
                   //theediter.selectedIndex = 0;
                   newText = "";
                   newValue = "";
                }
            }
            //�¾�ֵ�Ƚ�
            if(newValue != oldValue){
                node.attributes.getNamedItem("newValue").value = newValue;
                node.attributes.getNamedItem("modified").value = "true";
                node.text = newText;
                if(myStatus == "INSERTED")
                    node.attributes.getNamedItem("value").value = newValue;
                flag = true;
            }
            
        }
        //�޸Ķ�Ӧ����,����ʹ��xslt��ˢ�´���
        for(var i=1;i<this.currentSelectedRow.cells.length;i++){          
            var colIndex = parseInt(this.currentSelectedRow.cells(i).index)-1;      
            this.currentSelectedRow.cells(i).innerText = selectedDataObjects[0].childNodes[colIndex].text +" ";
        }
        //����ж�DataObject��״̬
        if( flag && myStatus != "INSERTED")
            selectedDataObjects[0].attributes.getNamedItem("status").value = "UPDATED";
                 
        //���½�����ˢ��
        //this.msxslt();
         //���ӱ���֮��ļ����¼�
        this.dwevent.trigger(this.dwevent.AFTER_SAVE_POPWIN);
        return true;
    }
}
//��ѯ��ť����¼���Ӧ����
function DW_query(){
    this.queryWin();
}
//���水ť����¼���Ӧ����
function DW_save(){

    //�����¼�
    if(!this.dwevent.trigger(this.dwevent.BEFOR_SAVE)) return;
   
    //������޸����ݵĺϷ��ԣ�������
    if(!this.checkModifyInfo()) return;
    var eSrcObject = event.srcElement;

    var ret = dwManager.saveMultiDW(new Array(this.getName()),eSrcObject.boControllerName,eSrcObject.boControllerMethod,eSrcObject.actionName,eSrcObject.actionMethod);
    this.currentSelectedRow = null;
    //�����¼�
    this.dwevent.trigger(this.dwevent.AFTER_SAVE);
    return ret;

}
//��ͨ��ѯ�������ڲ�ѯ��ť��OnClick�¼���Ӧ����
function DW_query_onclick(){
    var queryBtn = this.nameRule.getQueryButton();
    
    if(!this.assQueryCondition(document)) return false;
    var queryBtn = document.all(this.nameRule.getQueryButtonName());
    dwManager.getDW(this.name).setType("ONE_SELECT");
    dwManager.getDW(this.name).msxslt();
    //ִ�в�ѯ
    this.exeQuery(queryBtn.actionMethod,queryBtn.boControllerName,queryBtn.boControllerMethod,queryBtn.actionName);
    return true;
 }

//����ʽ��ѯ�������ڲ�ѯ��ť��OnClick�¼���Ӧ����
function DW_querywin_query_onclick(doc){

    //��װ��ѯ����  
    if(!this.assQueryCondition(doc)) return false; 
    var queryBtn = document.all(this.nameRule.getQueryButtonName());
    //ִ�в�ѯ
    this.exeQuery(queryBtn.actionMethod,queryBtn.boControllerName,queryBtn.boControllerMethod,queryBtn.actionName);
    return true;
}
//��װ��ѯ����
function DW_assQueryCondition(doc){
    var filterNodes = this.getXMLDom().selectNodes("/dataWindow/filters/filter");
    var filterObj;
    var value;
    var operatorObj,operator;
    //��������һ���ϴ��ύʱ�����Ĳ���(���Ǳ����)
    dwManager.clearAllParameters();
    
    for(var i=0; i < filterNodes.length; i++){

        operator = filterNodes(i).attributes.getNamedItem("operator").value;
      if(operator=="*"){
            var operateValue = filterNodes(i).attributes.getNamedItem("operateValue").value;
            this.addAttribute(filterNodes(i),"operator",operateValue);
        }
        filterObj = doc.all(this.nameRule.getQueryConditionEditerBegin() + filterNodes(i).attributes.getNamedItem("index").value);
        if(filterObj == null) continue;
        //�������
         try{
                if(!eapObjsMgr.onvalidate(filterObj)){
                    filterObj.focus();                    
                    return false;
                }
            }catch(e){}
        //��ֵ
        value = this.getediterValue(filterObj);
        this.addAttribute(filterNodes(i),"value",value[0]);
        operatorObj = doc.all(this.nameRule.getQueryConditionOpeEditerBegin() + filterNodes(i).attributes.getNamedItem("index").value);
        if(operatorObj != null){
            value = this.getediterValue(operatorObj);
            this.addAttribute(filterNodes(i),"operator",value[0]);
        }
    }
    return true;
}
//ִ�в�ѯ
function DW_exeQuery(actionMethod,boControllerName,boControllerMethod,actionName){

    //�����¼�
    if(!this.dwevent.trigger(this.dwevent.BEFOR_QUERY)) return;

    
    var filters = this.getXMLDom().selectSingleNode("/dataWindow/filters");
    var dwquery = this.nameRule.getQuery();
    dwquery.value = filters.xml;
    //���ù������ķ���
    var postParameter = getAlldata(findObj(unieap.FORM_NAME));
    postParameter += "&dwName="+this.getName();
    if(actionMethod == null || actionMethod == "undefined" || actionMethod == "")
        actionMethod = "query";
    var result = dwManager.executeRequest(postParameter,actionMethod,boControllerName,boControllerMethod,actionName);
    //����ͳһ�Ľ��������
    commDealResult(result);

    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"isEmptyOnCreate","false");
    //�����¼�
    this.dwevent.trigger(this.dwevent.AFTER_QUERY);


}
/**
 *@description �б�ͷcheckBox��OnClick�¼���Ӧ����
 *@param checkBoxObj checkbox����
 *@modified by 2006-01-06
 *@remark ����ˢ��ҳ��,ֻ�ı䱻ѡ���е�״̬
 */
function DW_checkBoxOnclick(checkBoxObj){
    
    //�����¼�
    if(!this.dwevent.trigger(this.dwevent.BEFOR_CHECK)) return; 
    
    //ѡ��:
    if(checkBoxObj.checked){
        if(this.getType() == "MULTI_SELECT"){                       
              this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","true");
              var nodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
              var tabObj = this.nameRule.getBodyTable();
              var row , checkBoxObj;
              for(var i=2;i<tabObj.rows.length;i++){
	               row = tabObj.rows(i);
	               checkBox = row.cells(0).children(0);
	               checkBox.checked = true;             
	               nodes(parseInt(row.pos)-1).attributes.getNamedItem("selected").value = "true" ;               
	               if(!unieap.selectedRowCss) continue;                   
	                  row.className = "NEUDwListRowBgColor3"; 	               
              }
        }
    }
    //ȡ��ѡ��:
    else{
        if(this.getType()=="MULTI_SELECT"){
            var nodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
            var tabObj = this.nameRule.getBodyTable();
            var row , checkBoxObj;
            for(var i=2;i<tabObj.rows.length;i++){
               row = tabObj.rows(i);
               checkBox = row.cells(0).children(0);              
               if(checkBox.checked){
                   nodes(parseInt(row.pos)-1).attributes.getNamedItem("selected").value = "false" ;
                   checkBox.checked = false;
                   if(!unieap.selectedRowCss) continue;
                   if(i%2==0)
                      row.className = "NEUDwListRowBgColor1"; 
                   else
                      row.className = "NEUDwListRowBgColor2"; 
               }
            }
        }
        else{
	        //������޸����ݵĺϷ���,������(ֻ��quick��grid�༭��������ж�)
	        if(this.getType()=="QUICK_EDIT" || this.getType()=="GRID_EDIT"){
		        if(!this.checkModifyInfo()){
		            checkBoxObj.checked = true;
		            return;
		        }
	            //��̬ҳ����ʾ
	            if(this.currentSelectedRow){     
		            var dataObjs = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");   
		            var tDataRow = dataObjs[parseInt(this.currentSelectedRow.pos,10)-1].childNodes;                   
		            for(var i=1;i<this.currentSelectedRow.cells.length;i++){          
		               var colIndex = parseInt(this.currentSelectedRow.cells(i).index)-1;      
		               this.currentSelectedRow.cells(i).innerText = tDataRow[colIndex].text +" ";
		            }
	            }    
	        } 
	        if(this.currentSelectedRow){
	           var nodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
	           nodes(parseInt(this.currentSelectedRow.pos)-1).attributes.getNamedItem("selected").value = "false" ;
	           if(unieap.selectedRowCss){
	              var brother = this.currentSelectedRow.nextSibling?this.currentSelectedRow.nextSibling:this.currentSelectedRow.previousSibling;        
	              if(brother){
	                 if(brother.className=="NEUDwListRowBgColor1")
	                    this.currentSelectedRow.className ="NEUDwListRowBgColor2";
	                 else
	                    this.currentSelectedRow.className ="NEUDwListRowBgColor1";                  
	              }
	              else
	                 this.currentSelectedRow.className ="NEUDwListRowBgColor1"; 
	           }
	           this.currentSelectedRow.cells(0).children(0).checked = false;  
	        }           
        }
         this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","false");
         this.crtDOIndex = -100;
         this.crtCellIndex = -100;
         this.currentSelectedRow = null;
    }    
    //�����¼�
    this.dwevent.trigger(this.dwevent.AFTER_CHECK);
}
//��һ������¼�
function DW_preRowOnclick_freeEdit(){
    //������޸����ݵĺϷ���,������
    if(!this.checkModifyInfo()) return;

    var dataObjArr = this.getSelectedDataObjs();
    if(dataObjArr.length == 0) return;
    var dObj = dataObjArr[0];
    var index = dObj.attributes.getNamedItem("index").value;
    dObj.attributes.getNamedItem("selected").value = "false";
    this.crtDOIndex = parseInt(index,10) - 1;
    var nodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
    nodes(this.crtDOIndex - 1).attributes.getNamedItem("selected").value = "true";

    this.afterMsxslt_freeEdit();
}
 //��һ������¼�
function DW_nextRowOnclick_freeEdit(){
    //������޸����ݵĺϷ���,������
    if(!this.checkModifyInfo()) return;

    var dataObjArr = this.getSelectedDataObjs();
    if(dataObjArr.length == 0) return;
    var dObj = dataObjArr[0];
    var index = dObj.attributes.getNamedItem("index").value;
    dObj.attributes.getNamedItem("selected").value = "false";
    this.crtDOIndex = parseInt(index,10) + 1;
    var nodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
    nodes(this.crtDOIndex - 1).attributes.getNamedItem("selected").value = "true";
    this.afterMsxslt_freeEdit();
}
/* ========================= ���ݴ����в����������� ============================ */
// ����һ����¼
function DW_addRow(){
	//���Ӳ���֮ǰ�ļ���
    if(!this.dwevent.trigger(this.dwevent.BEFOR_ADD)) return; 
    
    //ָ����ǰ����������    
    this.crtOperate = "ADD";
    //ѡ��checkbox
    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","true");
    //ֱ�������ݴ���������һ�У���һ��DataObj����
    
    if(this.getType() == "GRID_EDIT" || this.getType() == "QUICK_EDIT" || this.getType() == "FREE_EDIT"||this.getType() == "GRID_EDIT_ROOT"){
        //������޸����ݵĺϷ���,������
        if(!this.checkModifyInfo()) return;

        var newRow = this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj").cloneNode(true);
        var index = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj").length + 1;       
        this.addAttribute(newRow,"index",index);
        this.addAttribute(newRow,"templateFlag","false");
       
        this.setDefaultValue(newRow);//Ĭ��ֵ         
        this.getXMLDom().selectSingleNode("/dataWindow/dataObjs").appendChild(newRow);     
        this.crtDOIndex = parseInt(index,10);
        this.crtCellIndex = 1;        
        //ȡ��ѡ��������
        this.currentSelectedRow = null;
        var nodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
        for(var i=0; i < nodes.length; i++)
            nodes(i).attributes.getNamedItem("selected").value = "false";
        newRow.attributes.getNamedItem("selected").value = "true";
        if(this.getType() == "FREE_EDIT"){
            this.afterMsxslt_freeEdit();
        }
        else{
            //���½�����ˢ��
            this.msxslt();

        }
        this.dwevent.trigger(this.dwevent.AFTER_ADD);
        return;
    }
    if(this.getType() == "POP_EDIT"){
        this.popWin();             //�򿪲�������
    }
	this.dwevent.trigger(this.dwevent.AFTER_ADD);
}
/**
 *@description ɾ��ѡ�еļ�¼
 *@modified by 2005-01-06
 *@remark ����currentSelectedRow��ָ����ж���Ϊ��
 */
function DW_deleteSelectedRow(){
    //����ɾ������֮ǰ�ļ���
    if(!this.dwevent.trigger(this.dwevent.BEFOR_DELETE)) return; 
    
    //ָ����ǰ������ɾ��
    this.crtOperate = "DEL";

    //1.��ȡѡ�е�DataObj���󼯺�
    var arr = this.getSelectedDataObjs();
    if(arr.length == 0){
        alert("��ѡ����Ҫɾ���ļ�¼!");
        return;
    }
    //2.��ɾ����־��ȡ��ѡ��
    var myStatus;
    for(var i=0; i<arr.length; i++){
        myStatus = arr[i].attributes.getNamedItem("status").value;
        if(myStatus == "INSERTED")
            arr[i].attributes.getNamedItem("status").value = "CANCELED";
        else{
            arr[i].attributes.getNamedItem("status").value = "DELETED";
            this.uniteColsPostProc(arr[i].attributes.getNamedItem("index").value);//wanghx for united cols
        }
        arr[i].attributes.getNamedItem("selected").value = "flase";
    }
    //���½�����ˢ��
    this.msxslt();
    this.currentSelectedRow = null;
    //����ɾ������֮��ļ���
    this.dwevent.trigger(this.dwevent.AFTER_DELETE);
}
/**
 *@description �޸�ѡ�еļ�¼�����һ����
 *@param isAlert  ��û��ѡ���е�����£��Ƿ���ʾ(true/��: ��,false����)
 *@return true/false
 *@modified by 2006-01-06
 *@remark ����ˢ������ҳ�棬ֻ���޸�ѡ�����ó�ֻ��״̬
 *@flaw �ϲ���Ԫ��ʱ������ȷ��ʾ
 */
function DW_modifySelectedRow(isAlert){
    if(!this.dwevent.trigger(this.dwevent.BEFOR_UPDATE)) return; 

    var lastRow = this.getLastSelectedRow();
    if(lastRow == null){
        if(isAlert == null || isAlert)
            alert("��ѡ����Ҫ�޸ĵļ�¼!");
        return true;
    }
    //ָ����ǰ�������޸�
    this.crtOperate = "MODIFY";
    //QUICK_EDIT��GRID_EDIT���ͣ���ѡ���е�ֵ�����༭��(��������: editer_"dwName"_"index"
    if(this.getType() == "QUICK_EDIT" || this.getType() == "GRID_EDIT"||this.getType() == "GRID_EDIT_ROOT"){
        var dataObjArr = this.getSelectedDataObjs();
        var dataObj = dataObjArr[0];
        if(!this.modifyDOFromEditer(dataObj)) return false;
        //���о۽����о۽�ȡ��
        this.crtDOIndex = -100;
        if(this.isUniteCols) this.uniteCols();//wanghx for united cols
        //refresh
        //this.msxslt();
        if(this.currentSelectedRow){        
           var dataObjs = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");   
           var tDataRow = dataObjs[parseInt(this.currentSelectedRow.pos,10)-1].childNodes;                   
           for(var i=1;i<this.currentSelectedRow.cells.length;i++){          
               var colIndex = parseInt(this.currentSelectedRow.cells(i).index)-1;      
               this.currentSelectedRow.cells(i).innerText = tDataRow[colIndex].text +" ";
           }
       }
    }
    this.dwevent.trigger(this.dwevent.AFTER_UPDATE);
    return true;
}

// ѡ��ĳһ��
// dataObjIndex dataObj��index
// isMultiSelect �Ƿ��ѡ  ��(false/��)����(true)
// selectKind    ѡ�����ѡ��(true/��)��ȡ��ѡ��(false)
function DW_selectOneRow(dataObjIndex,isMultiSelect,selectKind)
{
    
    //�Ƿ�ѡ
    var isOneSelect = isMultiSelect == null || !isMultiSelect ? true : false;
    //ѡ����
    var result = selectKind == null || selectKind ? true : false;
    var oppResult = !result;
    //ѡ��XmlDom�еĶ�Ӧ�ڵ�
    var dataObjNodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
    for(var i = 0; i < dataObjNodes.length ; i++)
        if(dataObjNodes(i).attributes.getNamedItem("index").value == ""+dataObjIndex){
              dataObjNodes(i).attributes.getNamedItem("selected").value = ""+result;
        }
        else if(isOneSelect) //��ѡ
                dataObjNodes(i).attributes.getNamedItem("selected").value = ""+oppResult;
    //ѡ����ѡ����
    var selecter = this.nameRule.getRowSelecter();
    if(selecter != null){
        var rowcount = selecter.length;
        for(var j=0;j<rowcount;j++)
            if(selecter(j).value == ""+dataObjIndex)
                selecter(j).checked = result;
            else if(isOneSelect) //��ѡ
                    selecter(j).checked = oppResult;
    }
    //�ı䱳����ɫ
    this.modifyBGColor();
}

//���ݴ���Ԫ��༭��ʧȥ���ʱ�����ĺ������༭���������ǣ�editer_[dwname]_[colindex]
function DW_editer_onblur(obj){

    var father = obj.parentElement;
    var grandFather = father.parentElement;
    //�޸ĺ��value��text
    var theValue,theText;
    if(obj.tagName == "INPUT"||obj.tagName=="TEXTAREA"){
        theValue = obj.value;
        theText  = obj.value;
    }else if(obj.tagName == "SELECT"){
       if(obj.selectedIndex<0){
          theValue ="";theText="";
       }
       else{
          theValue = obj.options(obj.selectedIndex).value;
          theText  = obj.options(obj.selectedIndex).text;
       }
    }
    //�޸����ݵ���Ӧ�ڵ������
    this.modifyOneCell(grandFather.pos-1,obj.colIndex-1,theValue,theText);

    //�о۽����о۽�
    this.crtDOIndex = grandFather.pos;

    //���½�����ˢ��
    this.msxslt();
}
//�༭���OnKeyDown�¼���Ӧ����
function DW_editer_onkeydown(obj){
    /*
    if(event.keyCode==13){
        dw_editer_onblur(obj,dw);
    }*/
}


/* ========================= ���ݴ��ڸ����������� ============================ */

/**
 *@description DataWindowԤ�������������б�ת������ʽ����ʾ����, ��DataSet����dsid����
 *@param dw ���ݴ��ڶ���
 */
function DW_preDealDataObj(){
    
    this.uniteCols();//wanghx for united cols
    this.currentSelectedRow = null;
    this.crtCellIndex = -100;
    this.crtDOIndex = -100;
    this.currentSelectedRow = null;
    this.crtOperate = "WAITING";
    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","false");
    var xmlDom = this.getXMLDom();
   var dataObjNodes = xmlDom.selectNodes("/dataWindow/dataObjs/dataObj");
    var dataObjCount = 0;
    if( dataObjNodes != null) dataObjCount = dataObjNodes.length;
    //modify
    for(rowIndex = 0; rowIndex < dataObjCount; rowIndex++)
       this.addAttribute(dataObjNodes(rowIndex),"hiddened","false");
    var attr_index,attr_options,rowIndex;
    var attrs = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute");  
    for(var i=0;i<attrs.length;i++){
       attr_index = parseInt(attrs(i).attributes.getNamedItem("index").value,10);
       attr_options = attrs(i).childNodes;      
       if(!attr_options)
          for(rowIndex = 0; rowIndex < dataObjCount; rowIndex++)
             dataObjNodes(rowIndex).childNodes(attr_index-1).text = dataObjNodes(rowIndex).childNodes(attr_index-1).attributes.getNamedItem("value").value;
       else
          for(rowIndex = 0; rowIndex < dataObjCount; rowIndex++){
             dataObjNodes(rowIndex).childNodes(attr_index-1).text = dataObjNodes(rowIndex).childNodes(attr_index-1).attributes.getNamedItem("value").value;
             for(var k = 0 ; k < attr_options.length ; k++)
                if(dataObjNodes(rowIndex).childNodes(attr_index-1).attributes.getNamedItem("value").value == attr_options(k).attributes.getNamedItem("value").value){
                    dataObjNodes(rowIndex).childNodes(attr_index-1).text = attr_options(k).text;
                    break;
                }             
          }
    }   
}
/**
 *@description ����ҳ��С�Ƶĺ�����
 *@param
 */
function DW_preDealSumCalculate(){

    var headers = this.getXMLDom().selectNodes("/dataWindow/headers/header");
    for(var i=0;i<headers.length;i++){
       var header = headers(i);
       var attr = header.attributes.getNamedItem("isSumcol");
       if(!attr||attr.value!="true") continue;
       var index = parseInt(header.attributes.getNamedItem("attrIndex").value);
       var dataObjs = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
       var total = 0;
       var re = /,/g;      
       for(var j=0;j<dataObjs.length;j++){
          var dataObj = dataObjs(j);
          var status = dataObj.attributes.getNamedItem("status").value;
          if(status=="DELETED"||status=="CANCELED") continue;
          var value = dataObj.childNodes(index-1).attributes.getNamedItem("newValue").value;
          if(value!=""){           
          	 value = value.replace(re, "");    
             total+=parseFloat(value);
          }
       }
       this.formatDataPrecision(index,total+"");
       
    }
     
}
/**
 *@description ��ʽ����ȷ�Ȳ���
 *@param index attribute����index
 *@param total С��
 *@remark ��ʽ��С�Ƶ�С����λ����Ĭ��Ϊ2��
 */
function DW_formatDataPrecision(index,total){
   var attr = this.getAttrNodeByIndex(index);
   if(!attr) return total;
   var dataType = attr.attributes.getNamedItem("dataType").value;
   if(dataType=="FLOAT"||dataType=="DOUBLE"){
      var precision = attr.attributes.getNamedItem("precision"); 
	  try{
	      if(!precision)precision = 2;
	          precision = parseInt(precision.value);
	  }catch(e){
	        precision = 2;
	  }
	  var pattern = "#.";
	  for(var i=0;i<precision;i++)
	  	  pattern+="0";
      if(attr.attributes.getNamedItem("JSObjName").value=="Money"){
   		  var attrPatt=attr.attributes.getNamedItem("pattern");
   		  if(attrPatt){
   		  pattern = attrPatt.value;
   		  }else{
   		  pattern="#.00";
   		  }
   		  if(!pattern) pattern="#.00";
      }
      
      var dataObj = this.getXMLDom().selectSingleNode("/dataWindow/dataObjs");
      total = formatNumber(total,pattern);
      this.addAttribute(dataObj,"subtotal"+index,total);
     
      var sumcol = dataObj.attributes.getNamedItem("sumcol"+index).value;
      if((sumcol+"").indexOf(",")<0){
          sumcol = formatNumber(sumcol,pattern);
      	  this.addAttribute(dataObj,"sumcol"+index,sumcol);
      }	  
      /*
      else{
	      var precision = attr.attributes.getNamedItem("precision"); 
	      try{
	        if(!precision)precision = 2;
	        precision = parseInt(precision.value);
	      }catch(e){
	        precision = 2;
	      }
	      if(precision>0){
	          if(total.indexOf(".")>-1){
	             total = total.substring(0,total.indexOf(".")+precision+1);
	             precision =precision -( total.length - total.indexOf(".") -1 );
	          }
	          else total+=".";
	          for(var i=0;i<precision;i++) total+="0";
	      }
      }
      */
   }
   //return total;
}
function DW_preDealDW(){
    //���б�Ҫ�ĳ�ʼ��
    var xmlDom = this.getXMLDom(); 
    //new add
    if(!this.checkAttributeIndex(xmlDom.selectNodes("/dataWindow/attributes/attribute"))) return false;    
    if(!this.cutUnwantedHeader(xmlDom.selectNodes("/dataWindow/headers/header"))) return false;  
    var header_info = xmlDom.selectNodes("/dataWindow/headers/header");     
    if(header_info(0)==null){ alert("header�е�����һ��attrIndex������attribute�е�����һ��index�����������������á�"); return false;}

    this.preDealDataObj();
    
    //Ϊ/dataWindow/template/dataObj����hiddened����,insertedByJs����
    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj"),"hiddened","false");
    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj"),"insertedByJs","true");

    //�����༭��������
    this.preDealEditer();
    //У��orderInfo/dataType����
    var order_info = xmlDom.selectSingleNode("dataWindow/orderInfo");
    if(order_info==null){        
        var newRow = xmlDom.createElement("orderInfo");      
        var header_info = xmlDom.selectNodes("/dataWindow/headers/header");
        var header_index = header_info(0).attributes.getNamedItem("attrIndex").value;
        this.addAttribute(newRow,"attrIndex",header_index);
        this.addAttribute(newRow,"dataType",this.getAttrNodeByIndex(header_index).attributes.getNamedItem("dataType").value);
        this.addAttribute(newRow,"order","ascending"); 
        xmlDom.selectSingleNode("/dataWindow").appendChild(newRow);      
    }    
    xmlDom.selectSingleNode("dataWindow/orderInfo").attributes.getNamedItem("dataType").value = this.getValidDataType(xmlDom.selectSingleNode("dataWindow/orderInfo").attributes.getNamedItem("dataType").value);
    //����FREE_EDIT��ʽ�����û������������һ��
    if(this.getType() == "FREE_EDIT" && this.getXMLDom().selectSingleNode("/dataWindow/dataObjs").childNodes.length == 0){
        var newRow = this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj").cloneNode(true);
        this.addAttribute(newRow,"index","1");
        this.addAttribute(newRow,"templateFlag","false");
        newRow.attributes.getNamedItem("selected").value = "true";
        this.getXMLDom().selectSingleNode("/dataWindow/dataObjs").appendChild(newRow);
    }
    //����isHidden����
    var headerNodes = this.getXMLDom().selectNodes("/dataWindow/headers/header");
    for(var i=0; i < headerNodes.length;i++){
        if(headerNodes(i).attributes.getNamedItem("isHidden") == null){
            this.addAttribute(headerNodes(i),"isHidden","false");
        }
    }
    //����width����
    if(!this.isCompleteXSLT){       
        var editerNodes = xmlDom.selectNodes("/dataWindow/editers/editer");
        var attrNode = null;
        var tmpWidth = null;
        if(editerNodes != null){
            for(var i=0; i<editerNodes.length;i++){
                if(editerNodes(i).attributes.getNamedItem("width") != null) continue;           
                attrNode = this.getAttrNodeByIndex(editerNodes(i).attributes.getNamedItem("attrIndex").value);
                if(attrNode != null){
                    tmpWidth = attrNode.attributes.getNamedItem("width").value;
                    this.addAttribute(editerNodes(i),"width",tmpWidth);
                }
            }
        }
        var headerNodes = xmlDom.selectNodes("/dataWindow/headers/header");
        //if(headerNodes != null){
            
            var headerLength,dataType;
            for(var i=0; i<headerNodes.length;i++){
                attrNode = this.getAttrNodeByIndex(headerNodes(i).attributes.getNamedItem("attrIndex").value);
                if(headerNodes(i).attributes.getNamedItem("width") == null){
                    //if(attrNode != null){
                        tmpWidth = attrNode.attributes.getNamedItem("width").value;
                        this.addAttribute(headerNodes(i),"width",tmpWidth);
                   // }
                }
                //����ʱ�����͵Ŀ��
                //if(attrNode != null){
                dataType = attrNode.attributes.getNamedItem("dataType");
                //if(dataType == null) continue;                    
                if(dataType && dataType.value.toUpperCase() == "TIMESTAMP"){
                    headerLength = headerNodes(i).attributes.getNamedItem("width").value;
                    headerLength = parseInt(headerLength,10) + 20;
                    this.addAttribute(headerNodes(i),"width",headerLength);
                }
                //}
            }
        //}
    }
    //�������ݴ��ڵĳ���
    if(this.isAutoSize) this.adjustDWSize();
    this.firstLoad = true;
    return true;
}

// ȫ������
function DW_fullMsxslt(){
    //////////////////////////////////////////
    /////////////// ���Ը�ʱ�� ////////////////
    //////////////////////////////////////////
    ///////  var d = new Date();  ////////////
    if(this.getXMLDom().selectNodes("/dataWindow/dataObjs[@sumcols!='']").length>0)
    	this.preDealSumCalculate();
    ////����ͳһ��xml��������
    var sret = msxsltXML(this.getXML(),this.getHref());
    this.isCompleteXSLT = true;
    var topDiv =this.nameRule.getTopDiv();
    topDiv.innerHTML = sret;
    
    //////////////////////////////////////////
    /////////////// ���Ը�ʱ�� ////////////////
    //////////////////////////////////////////
    ////// var d2 =  new Date(); /////////////
    ////// parent.left.four.value = d2 -d; ///
    //////////////////////////////////////////
   
    //����ͳһ����β����
    this.afterMsxslt();
    
    //////////////////////////////////////////
    /////////////// ���Ը�ʱ�� ////////////////
    //////////////////////////////////////////
    /////  var d3 =  new Date(); /////////////
    ///// parent.left.five.value = d3 -d2; ///
    //////////////////////////////////////////
}
// ����XSL����XML(���ֽ���)
function DW_msxslt()
{
    this.fullMsxslt();
}

/**
 *@description ���б��е�ָ���иĳɿɱ༭״̬
 *@param   dataObjIndex dataObj������(�������dataObj��������������row������������Ϊ�����row�����������˲��ȶ���)
 *@param   cellIndex    ָ����ý����cell
 *@modified by 2005-01-06
 *@remark ���Ӹ�����ť����&�о۽�ʱ�Ƚ�������Դ
 */
function DW_drawEditRow(dataObjIndex,cellIndex){
    try{
        if(dataObjIndex < 0 || cellIndex < 0) return;
        var myStatus = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj")(dataObjIndex -1).attributes.getNamedItem("status").value;
        var isHidden = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj")(dataObjIndex -1).attributes.getNamedItem("hiddened").value;
        //����ɾ����ȡ���ļ�¼���༭��
        if(myStatus == "CANCELED" || myStatus == "DELETED" || isHidden == "true") return;
        //ת����Row����
        
        var rowIndex = this.cvtDOIndexToRowIndex(dataObjIndex);
        this.currentSelectedRow = this.nameRule.getBodyTable().rows(rowIndex);
        
        var row = this.currentSelectedRow;
        var id;
        var htmlediter;
        var obj,colIndex;
        var cellText;
        //var colIndexArr = new Array(); //��¼�ѻ��У�����ͬһ���ж�λ�
        var editerObj;    
       
again:  for(var i=1;i<row.cells.length;i++){
            //��xsl����ʱ��Ԥ����һ������index
            colIndex = row.cells(i).index;
            
            /* 
            for(var j=0; j < colIndexArr.length; j++){
                if(colIndexArr[j] == ""+colIndex){                 
                   continue again;
                }
            }
            colIndexArr[colIndexArr.length] = colIndex;
            */
            obj = document.all(this.nameRule.getHiddenEditerBegin() + colIndex);
          
            cellText =  this.cutNBSP(row.cells(i).innerText,false,true); //ȥ���Ҷ˿ո� 
            id = this.nameRule.getDisplayEditerBegin() + colIndex;
            if(obj.tagName.toUpperCase() == "INPUT" || obj.tagName.toUpperCase() == "TEXTAREA"){
                
                htmlediter =this.makeInputHTML(obj,cellText,id);

            }else if(obj.tagName == "SELECT"){               
                htmlediter = this.makeSelectHTML(obj,id,this.cutNBSP(row.cells(i).innerText,false,true));
            }            
            
            /**  ���Ӹ�����ť����������һ��������Դ  **/            
            var aidButton = this.getAttrNodeByIndex(colIndex).attributes.getNamedItem("hasAidBtn");            
            if(aidButton!=null&&aidButton.value=="true"){
               var Bvalue = this.getAttrNodeByIndex(colIndex).attributes.getNamedItem("aidBtnValue");
               Bvalue = Bvalue==null?"":Bvalue.value;
               var Bcss = this.getAttrNodeByIndex(colIndex).attributes.getNamedItem("aidBtnClass");
               Bcss = (Bcss==null||Bcss.value=="")?"NEUDwButton_INNER":Bcss.value;
               var Btitle = this.getAttrNodeByIndex(colIndex).attributes.getNamedItem("aidBtnPrompt");
               Btitle = Btitle==null?"":Btitle.value;
               var Bonclick = this.getAttrNodeByIndex(colIndex).attributes.getNamedItem("aidBtnOnclick");
               Bonclick = Bonclick==null?"":Bonclick.value;
               htmlediter+="<input type='button' class='"+ Bcss +"' value='"+ Bvalue +"' title='"+Btitle+"' onclick="+Bonclick+">";
               obj.aidButton = "true";
            } 
            row.cells(i).innerHTML = htmlediter;
            if(obj.JSObjName=="Password")
               row.cells(i).children(0).value = cellText;
            
         }
        //�����о۽�        
        id = this.nameRule.getDisplayEditerBegin()+this.cvtCellIndexToAttrIndex(row,cellIndex);
        var focusCell = document.all(id); 
        //�����о۽�ʱ�Ƚ�������Դ     
        if(focusCell) focusCell.focus();  
        this.alternateChange();      
    }
    catch(e){}
}
// �����ݲ�������
function DW_popWin(){
    //���ǰ���ݴ���
    dwManager.activeDW(this);
    //
    var height=400,width=400;
    var dwNode = this.getXMLDom().selectSingleNode("/dataWindow");
    var tmpH = dwNode.attributes.getNamedItem("popWinHeight");
    var tmpW = dwNode.attributes.getNamedItem("popWinWidth");
    if(tmpH != null && !isNaN(parseInt(tmpH.value,10))) height = parseInt(tmpH.value,10);
    if(tmpW != null && !isNaN(parseInt(tmpW.value,10))) width = parseInt(tmpW.value,10);
    showModalDialog(unieap.DW_OPEN_WIN_URL,window,"status:no;center:yes;help:no;minimize:no;maximize:no;border:thin;statusbar:no;dialogWidth:"+width+"px;dialogHeight:"+height+"px");
    this.setDocument(); //�ָ��������document
}
// �򿪲�ѯ������¼�봰��
function DW_queryWin(){

    //���ǰ���ݴ���
    dwManager.activeDW(this);
    //
    var height=400,width=400;
    var dwNode = this.getXMLDom().selectSingleNode("/dataWindow");
    var tmpH = dwNode.attributes.getNamedItem("queryWinHeight");
    var tmpW = dwNode.attributes.getNamedItem("queryWinWidth");
    if(tmpH != null && !isNaN(parseInt(tmpH.value,10))) height = parseInt(tmpH.value,10);
    if(tmpW != null && !isNaN(parseInt(tmpW.value,10))) width = parseInt(tmpW.value,10);
    showModalDialog(unieap.DW_QUERY_WIN_URL,window,"status:no;center:yes;help:no;minimize:no;maximize:no;border:thin;statusbar:no;dialogWidth:"+width+"px;dialogHeight:"+height+"px");
    //this.setDocument();
}
/**
 *@description ���ݲ������ڵ�OnLoad�¼�������������н���Ԫ�ع�������
 *@param doc   ���ݲ������ڵ�Document����
 *@param itemContainer ����openOperateWin()�򿪵Ĵ�����������������Ԫ�ص��������㣩
 */
function DW_popWinOnLoad(doc,itemContainer)
{
    itemContainer.innerHTML = msxsltXML(this.getXML(),this.getXMLObj().href+this.popWinXSL);
   
    var dwDataOneRecordTbl = doc.all("dwDataOneRecordTbl"); //һ��Ҫ������itemContainer֮��ֵ
    var theForm = doc.all(unieap.FORM_NAME);
    var dataObjNode,editer,valueArr;
    
    //���ڲ�ѯ���޸Ĳ�������Ҫ��ÿ��Ԫ�ظ�ֵ
    if(this.crtOperate == "ADD" || this.crtOperate == "MODIFY" || this.crtOperate == "QUERY")   {

        if(this.crtOperate == "ADD"){
            //����Ĭ��ֵ
            dataObjNode = this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj").cloneNode(true);
            this.setDefaultValue(dataObjNode);
            this.currentSelectedRow = null;
        }
        else
            dataObjNode = this.getDataObjByIndex(this.currentSelectedRow.pos);
        for(var i=0; i < dataObjNode.childNodes.length; i++){
            editer = doc.all(this.nameRule.getDisplayEditerBegin()+dataObjNode.childNodes(i).attributes.getNamedItem("index").value);
            if(editer != null){
                valueArr = this.getAttrValue(dataObjNode.childNodes(i));
                if(editer.tagName == "SELECT")
                    this.selectByValue(editer,valueArr[0]);
                else
                    editer.value= valueArr[1];
            }
        }
    }
    //���ڲ�ѯ������ֻ��ʾ�رհ�ť
    if(this.crtOperate == "QUERY")
    {
        var btn_save = doc.all(this.nameRule.getSaveButtonName());
        btn_save.disabled = true;
    }
    try{
       eapObjsMgr.onReady(theForm);
    }catch(e)
    {
        /*alert(e.message);*/
    }
    //�����¼������ݲ���
//  this.dwevent.addArgument("popWinDocument",doc);
//  this.dwevent.trigger(this.dwevent.POPWIN_ONLOAD);
    this.setDocument(doc);
    this.alternateChange();
    
    
}
/**
 *@description ��ѯ����¼�봰�ڵ�OnLoad�¼�������������н���Ԫ�ع�������
 *@param doc   ���ݲ������ڵ�Document����
 *@param itemContainer ����openOperateWin()�򿪵Ĵ�����������������Ԫ�ص��������㣩
 */
function DW_queryWinOnLoad(doc,itemContainer)
{
    itemContainer.innerHTML = msxsltXML(this.getXML(),this.getXMLObj().href+this.queryWinXSL);
    //alert(itemContainer.innerHTML);
}
//���������ģ�嶯̬����һ�������
function DW_makeInputHTML(objInput,strText,id){
    var objClone = objInput.cloneNode(0);

    objClone.attributes("id").value=id;
    objClone.value = strText;    
    return objClone.outerHTML;
}

//����ѡ���ģ�嶯̬����һ��ѡ��� 
function DW_makeSelectHTML(objSel,id,arg,isValue){
    var cloSel = objSel.cloneNode(1);
    cloSel.attributes("id").value=id;
    var len = cloSel.options.length;
    if(isValue == null || !isValue){ //���ٶ�isValue���жϣ�ֻ���ж�һ�Σ�
       for(var i=0; i<len; i++)
           if(cloSel.options(i).text == arg){
                cloSel.selectedIndex = i;
                break;
            }
    }
    else{
       for(var i=0; i<len; i++)
           if(cloSel.options(i).value == arg){
                cloSel.selectedIndex = i;
                break;
            }
    }

    return cloSel.outerHTML;
}
//�ƶ�����
function DW_moveTitle(){

    var layLeft = parseInt(this.nameRule.getBodyDiv().scrollLeft,10);
    this.nameRule.getHeaderTable().style.left = layLeft * -1 ;
}
//�޸����ݵ���dataSet��ĳһ�ڵ��ֵ
function DW_modifyOneCell(dataObjIndex,colIndex,value,text){

    var theRow  = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj")(dataObjIndex);
    var theNode = theRow.childNodes(colIndex);

    //���ֵ���ˣ�Ҫ�޸ĵ�������ͬʱֵ�ڵ���޸�״̬
    var oldValue = theNode.attributes.getNamedItem("value").value;

    if(oldValue != value){
        theNode.attributes.getNamedItem("newValue").value = value;
        theNode.text = text;
        theNode.attributes.getNamedItem("modified").value = "true";

        if(theRow.attributes.getNamedItem("status").value != "INSERTED"){
            theRow.attributes.getNamedItem("status").value = "UPDATED";
        }
    }
}
//���ݹ���
function DW_dataFilter(){
    if(!this.checkModifyInfo()) return false;
    var dataSetNode  = this.getXMLDom().selectSingleNode("/dataWindow/dataObjs").cloneNode(true);
    var dataObjNodes = dataSetNode.selectNodes("dataObj");
    var dataObjCount = dataObjNodes.length;
    var dataObjNode;

    if(this.getType() == "ONE_SELECT" || this.getType() == "MULTI_SELECT"){
        for(var i = 0; i < dataObjCount; i++){
            dataObjNode = dataObjNodes(i);
            if(dataObjNode.attributes.getNamedItem("selected").value == "false"){
                dataSetNode.removeChild(dataObjNode);
            }
        }
    }else if(this.getType() == "GRID_EDIT" || this.getType() == "QUICK_EDIT" || this.getType() == "FREE_EDIT" ||this.getType() == "POP_EDIT"||this.getType() == "GRID_EDIT_ROOT" ){
        for(var i = 0; i < dataObjCount; i++){
            dataObjNode = dataObjNodes(i);
            if(dataObjNode.attributes.getNamedItem("status").value == "UNCHANGED" ||
               (dataObjNode.attributes.getNamedItem("insertedByJs") != null &&   //�Ѻ�̨�����ġ�ǰ̨ɾ������Ҳ�ύ������
                dataObjNode.attributes.getNamedItem("status").value == "CANCELED" )){
                dataSetNode.removeChild(dataObjNode);
            }
        }
    }

    //�����˺��XML���ݷ�����������
    this.nameRule.getFilter().value = dataSetNode.xml;
    return true;
}
//��ȡ�༭���ֵ���ı�
function DW_getediterValue(editer){
    var arr = new Array();
    arr[0] = "";  //������ֵ
    arr[1] = "";  //�ı�
    if(editer.tagName.toUpperCase() == "INPUT" || editer.tagName.toUpperCase() == "TEXTAREA" ){
        arr[0] = editer.value;
        arr[1] = editer.value;
    }
    else if(editer.tagName.toUpperCase() == "SELECT"){
        selectedIndex = editer.selectedIndex;      
        if(selectedIndex > 0){
            arr[0] = editer.options[selectedIndex].value;
            arr[1] = editer.options[selectedIndex].text;
        }
        else if(selectedIndex == 0){
            arr[0] = editer.options[0].value;
            if(editer.options[0].text=="��ѡ��"){               
               arr[1] = "";
            }else               
               arr[1] = editer.options[selectedIndex].text;
        }
    }
    return arr;
}
//����textѡ���������е���
function DW_selectByText(objSelect,text){
    //var flag = false;
    for(var k=0;k<objSelect.options.length;k++){
        if(objSelect.options[k].text == text){
            objSelect.selectedIndex = k;
            //flag = true;
            return;
        }
    }
    //if(!flag) 
       objSelect.selectedIndex = 0;
}
//����valueѡ���������е���
function DW_selectByValue(objSelect,value){

    for(var k=0;k<objSelect.options.length;k++)        
       if(objSelect.options[k].value == value){
            objSelect.selectedIndex = k;
            return;
       }  
    objSelect.selectedIndex = 0;
}
/**
 *@description ��������ɫ
 *@modified by 2006-01-06
 *@remark ���Ը���unieap.selectedRowCss������ѡ���Ƿ���Ҫ�ı�ѡ���е���ʽ����
 */
function DW_modifyBGColor(){
    if(this.getType() != "FREE_EDIT" && this.getType() != "QUERY_CONDITION"){
        var dwBodyTbl = this.nameRule.getBodyTable();
        var className , childObj;
        for(var i=0;i<dwBodyTbl.rows.length;i++){
            if(dwBodyTbl.rows(i).cells(0).tagName=="TH") continue;

            //��ż�С�ѡ���еı������岻һ��
            className = i%2 == 0 ? "NEUDwListRowBgColor1" : "NEUDwListRowBgColor2";

            childObj =  dwBodyTbl.rows(i).cells(0).children(0);
            if(!childObj) {
                dwBodyTbl.rows(i).className=className;
                continue;
            }
            //selected
            if(childObj.checked&&unieap.selectedRowCss)   
                  className = "NEUDwListRowBgColor3";
            dwBodyTbl.rows(i).className=className;
           // childObj.className=className;
        }
        if(this.getXMLDom().selectNodes("/dataWindow/dataObjs[@sumcols!='']").length<=0)return;
        var attrNodes = this.getXMLDom().selectNodes("/dataWindow/headers/header");
        for(var i=0;i<attrNodes.length;i++){
        	var sumcol = attrNodes(i).attributes.getNamedItem("isSumcol");
        	if(sumcol&&sumcol.value=="true"){
        		var headers = this.getXMLDom().selectSingleNode("/dataWindow/headers");
        		var css = headers.attributes.getNamedItem("subTotalCss");
        		if(css){
        			dwBodyTbl.rows(dwBodyTbl.rows.length-2).className=css.value;
        		}
        		css = headers.attributes.getNamedItem("sumTotalCss");
        		if(css){
        			dwBodyTbl.rows(dwBodyTbl.rows.length-1).className=css.value;
        		}
        		break;
        	}
        }
    }
}
//�޸�DataObj��ĳһattribute��ֵ
//������ myStatus  DataObj��״̬
//       attrNode   DataObj�µ�attribute�ڵ�
//       newValue   ��ֵ
//       newText    ���ı�
//���أ� true��ʾ�ı��ˡ�false��ʾû�ı�
function DW_updateAttrValue(myStatus,attrNode,newValue,newText){
    //ʼ�����ϵ�ֵ�Ƚ�
    var oldValue = attrNode.attributes.getNamedItem("value").value;

    if(oldValue==null) oldValue = "";
    if(newValue==null) newValue = "";
    if(newText==null) newText = "";

    if(oldValue == newValue){
        attrNode.attributes.getNamedItem("modified").value = "false";
        attrNode.attributes.getNamedItem("newValue").value = newValue;
        attrNode.text = newText;
        return false;
    }
    attrNode.attributes.getNamedItem("newValue").value = newValue;
    attrNode.attributes.getNamedItem("modified").value = "true";
    attrNode.text = newText;
    if(myStatus == "INSERTED")
        attrNode.attributes.getNamedItem("value").value = newValue;
    return true;
}
//������ֱ��ˮƽ������
function DW_adjustScrollByPosInTable(rowIndex,cellIndex){
    try{
        var bodyDiv = this.nameRule.getBodyDiv();
        var bodyTbl = this.nameRule.getBodyTable();
        var topPercent = Math.round((rowIndex+1)/bodyTbl.rows.length);
        var leftPercent = Math.round((cellIndex+1)/bodyTbl.rows(0).cells.length);    
        bodyDiv.scrollTop = topPercent*bodyDiv.scrollHeight;
        bodyDiv.scrollLeft = leftPercent*bodyDiv.scrollWidth;
    }
    catch(e){};
}
//������ֱ��ˮƽ������
function DW_adjustScrollByPosInDataSet(dataObjIndex,attrIndex){
    this.adjustScrollByPosInTable(this.cvtDOIndexToRowIndex(dataObjIndex),this.cvtAttrIndexToCellIndex(attrIndex));
}
//������ֱ��ˮƽ������
function DW_adjustScrollByCombPos(dataObjIndex,cellIndex){
    this.adjustScrollByPosInTable(this.cvtDOIndexToRowIndex(dataObjIndex),cellIndex);
}
//���ݷֱ��ʵ������ݴ��ڵĳ����༭���Ŀ��
function DW_adjustDWSize(){
    this.isAutoSize = false;
    //���ݴ��ڵĳ���
    var standard = this.getScreenStandard();
    if( standard != "800*600" && standard != "1024*768") return;
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    if( screenWidth+"*"+screenHeight == standard) return;  //������׼��ʵ�ʱ�׼��ͬʱ������Ҫ����
    var baseWidth = parseInt(standard.substring(0,standard.indexOf("*")),10);
    var baseHeight = parseInt(standard.substring(standard.indexOf("*") + 1),10);

    //1.�������ݴ��ڳ���
    var width = this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("width").value;
    var height = this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("height").value;
    //��Ҫ����
    if(!(width == null || width.length == 0 || height == null || height.length == 0 )){
        var newWidth = Math.round(screenWidth * parseInt(width,10) / baseWidth);
        var newHeight = Math.round(screenHeight * parseInt(height,10) / baseHeight);
        this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("width").value = ""+newWidth;
        this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("height").value = ""+newHeight;
    }
    //2.�����еĿ��
    var attrNodes = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute");
    for(var i=0; i<attrNodes.length;i++){
        width = attrNodes(i).attributes.getNamedItem("width").value;
        if(width == null || width.length == 0 ) continue;
        attrNodes(i).attributes.getNamedItem("width").value = ""+ Math.round(screenWidth * parseInt(width,10) / baseWidth);
    }
    //3.����editer�Ŀ��
    var editerNodes = this.getXMLDom().selectNodes("/dataWindow/editers/editer");
    for(var i=0; editerNodes !=null && i<editerNodes.length;i++){
        width = editerNodes(i).attributes.getNamedItem("width").value;
        if(width == null || width.length == 0 ) continue;
        editerNodes(i).attributes.getNamedItem("width").value = ""+ Math.round(screenWidth * parseInt(width,10) / baseWidth);
    }
    //4.����header�Ŀ��
    var headerNodes = this.getXMLDom().selectNodes("/dataWindow/headers/header");
    for(var i=0; headerNodes !=null && i<headerNodes.length;i++){
        width = headerNodes(i).attributes.getNamedItem("width").value;
        if(width == null || width.length == 0 ) continue;
        headerNodes(i).attributes.getNamedItem("width").value = ""+ Math.round(screenWidth * parseInt(width,10) / baseWidth);
    }
    //5.����filter�Ŀ��
    var filterNodes = this.getXMLDom().selectNodes("/dataWindow/filters/filter");
    for(var i=0; filterNodes !=null && i<filterNodes.length;i++){
        width = filterNodes(i).attributes.getNamedItem("width").value;
        if(width == null || width.length == 0 ) continue;
        filterNodes(i).attributes.getNamedItem("width").value = ""+ Math.round(screenWidth * parseInt(width,10) / baseWidth);
    }

}
//��editerԤ����һЩ�ֶ�������XSL�Ľ���
function DW_preDealEditer(){
    var rowNum = 0,currentColInOneRow = 0,nextColType;
    var editersNode = this.getXMLDom().selectSingleNode("/dataWindow/editers");
    if(editersNode==null) return;
    var temp = editersNode.attributes.getNamedItem("colsInOneRow");
    if(temp==null)     
       this.addAttribute(editersNode,"colsInOneRow",2);
    else temp = temp.value;
    this.addAttribute(editersNode,"hasImage","false");
    if(temp == null || temp == "")  temp = "2";
    var colsInOneRow = parseInt(temp,10); 
    var editerNodes = this.getXMLDom().selectNodes("/dataWindow/editers/editer");
    var counter = editerNodes == null ? 0 : editerNodes.length;
    var attrNode = null;
    var removedNodesArr = new Array();
    var isImage;
    //Ϊÿ��textareaָ��cols���ԣ���ֵΪcolsInOneRow
    for(var i=0; i < counter; i++){
           //zhoujj modify for isBand
       if (editerNodes(i).attributes.getNamedItem("isBand")&&editerNodes(i).attributes.getNamedItem("isBand").value){
             //����prompt����
            if(editerNodes(i).attributes.getNamedItem("prompt") == null && attrNode){
                 this.addAttribute(editerNodes(i),"prompt",attrNode.attributes.getNamedItem("title").value);
                 this.addAttribute(attrNode,"prompt",attrNode.attributes.getNamedItem("title").value);//��attribute����prompt����
            }
            continue;
       }
       else{        
           attrNode = this.getAttrNodeByIndex(editerNodes(i).attributes.getNamedItem("attrIndex").value);
           if(attrNode == null){
                removedNodesArr[removedNodesArr.length] = editerNodes(i);
                continue;
              }
            }  
           //����isImage����
           isImage = attrNode.attributes.getNamedItem("isImage");
           if(isImage != null && isImage.value == "true"){
                this.addAttribute(editerNodes(i),"isImage","true");
                this.addAttribute(editersNode,"hasImage","true");
                continue;
           }else{
                this.addAttribute(editerNodes(i),"isImage","false");
           }         
           //����prompt����
           if(editerNodes(i).attributes.getNamedItem("prompt") == null){
                this.addAttribute(editerNodes(i),"prompt",attrNode.attributes.getNamedItem("title").value);
                this.addAttribute(attrNode,"prompt",attrNode.attributes.getNamedItem("title").value);//��attribute����prompt����
           }
           else
                this.addAttribute(attrNode,"prompt",editerNodes(i).attributes.getNamedItem("prompt"));//��attribute����prompt����
           if(attrNode.attributes.getNamedItem("type").value.toLowerCase() == "textarea")
                this.addAttribute(attrNode,"cols",colsInOneRow);         
    }
    //ɾ���Ƿ���editer�ڵ�
    for(var i=0; i < removedNodesArr.length; i++)
        this.getXMLDom().selectSingleNode("/dataWindow/editers").removeChild(removedNodesArr[i]);
    //////////////////////������ͼƬ����� 
    //����ǳ�����,����ƽ̨������
    if(editersNode.attributes.getNamedItem("hasImage").value == "true"){        
        //��������ȥ
        return;
    }  
    //////////////////////��������ͼƬ�����
    var cols ;
    var oldCurrentColInOneRow ,leftCol;
    var frontAttrNode;
    //ʣ�µ�editer����Ч
    editerNodes = this.getXMLDom().selectNodes("/dataWindow/editers/editer");
    leftCol = colsInOneRow;
    for(var i=0; i < editerNodes.length; i++){
        //���û��Զ����colspan��isRowBegin��isRowEnd���
        this.addAttribute(editerNodes(i),"colspan",0);
        editerNodes(i).removeAttribute("isRowBegin");
        editerNodes(i).removeAttribute("isRowEnd");  
        //currentColInOneRow ++;       
        if(currentColInOneRow == 0 ){
            this.addAttribute(editerNodes(i),"isRowBegin","true");
        }
        if (editerNodes(i).attributes.getNamedItem("isBand")&&editerNodes(i).attributes.getNamedItem("isBand").value)
        {
          this.addAttribute(editerNodes(i),"isRowBegin","true");
          this.addAttribute(editerNodes(i),"isRowEnd","true");
          this.addAttribute(editerNodes(i),"colspan",colsInOneRow*2);
          currentColInOneRow = 0 ;
           if(i>0)
              this.addAttribute(editerNodes(i - 1),"isRowEnd","true");
                frontAttrNode = attrNode;
                attrNode ==null;          
                if ((leftCol<colsInOneRow)&&(frontAttrNode!=null)) {
                       var oldColSpan = frontAttrNode.attributes.getNamedItem("colspan");

                        if(oldColSpan == null || oldColSpan.value == "" )
                            oldColSpan = 0;
                        else
                            oldColSpan = parseInt(oldColSpan.value,10);  
                         this.addAttribute(frontAttrNode,"colspan",leftCol*2 + oldColSpan);
                     }   
        }
        else
         {
          //��Ӧ��attribute�ڵ�
          attrNode = this.getAttrNodeByIndex(editerNodes(i).attributes.getNamedItem("attrIndex").value);
          //��Ӧ����һ��attribute�ڵ�
         
          temp = attrNode.attributes.getNamedItem("cols");
          if(temp != null) temp = temp.value;
          cols = temp == null || temp == "" ? 1 : (isNaN(parseInt(temp,10)) ? 1 : parseInt(temp,10));
          if(cols > colsInOneRow ) cols = colsInOneRow;  //�������ֵ
  
          this.addAttribute(attrNode,"colspan",cols*2 - 1);
          //ʣ�µ��иպù���,���н�����־
          currentColInOneRow+= cols;
          if(cols == leftCol){
              this.addAttribute(editerNodes(i),"isRowEnd","true");
              currentColInOneRow = 0;
          }
          //ʣ�µ��в�����,���н�����־
          else if(cols > leftCol){
              this.addAttribute(editerNodes(i),"isRowBegin","true");
              frontAttrNode = i == 0 ? null : this.getAttrNodeByIndex(editerNodes(i - 1).attributes.getNamedItem("attrIndex").value);
              if(frontAttrNode != null){
                  this.addAttribute(editerNodes(i - 1),"isRowEnd","true");
                  var oldColSpan = frontAttrNode.attributes.getNamedItem("colspan");
                  if(oldColSpan == null || oldColSpan.value == "" )
                      oldColSpan = -1;
                  else
                      oldColSpan = parseInt(oldColSpan.value,10);
                  this.addAttribute(frontAttrNode,"colspan",(leftCol*2 + oldColSpan));
              }
              if(cols == colsInOneRow){
                  this.addAttribute(editerNodes(i),"isRowEnd","true");
                  currentColInOneRow = 0 ;
              }
              else
                  currentColInOneRow = cols ;
  
          }
          //ʣ�µ��й���
          else{
              if(currentColInOneRow  == colsInOneRow){
                  currentColInOneRow = 0;
                  this.addAttribute(editerNodes(i),"isRowEnd","true");
              }
          }
            
         } 
              
        //�������һ��Ԫ��
        if(i == editerNodes.length - 1){
            this.addAttribute(editerNodes(i),"isRowEnd","true");
            this.addAttribute(attrNode,"colspan",leftCol*2 - 1);
        }
        leftCol = colsInOneRow - currentColInOneRow ;
      
    }
    for(var i=0; i < editerNodes.length; i++){
        if(editerNodes(i).attributes.getNamedItem("isRowEnd") == null)
            this.addAttribute(editerNodes(i),"isRowEnd","false");
        if(editerNodes(i).attributes.getNamedItem("isRowBegin") == null)
            this.addAttribute(editerNodes(i),"isRowBegin","false");
    } 
    
}

//�޸Ľڵ�����ֵ,���û�и����Ծ�����
function DW_addAttribute(node,attrName,attrValue){
    if(node.attributes.getNamedItem(attrName) == null ){
        var attr = this.getXMLDom().createAttribute(attrName);
        attr.text = ""+attrValue;
        node.attributes.setNamedItem(attr);
    }
    else
        node.attributes.getNamedItem(attrName).value = ""+attrValue;
}
// ��ȡ�༭�������,���޸Ķ�Ӧ��DataObj
function DW_modifyDOFromEditer(dataObj){
    var editer = null;
    var index = null;
    var oldValue = null;
    var flag = false;
    var existFlag = false;  // add by hugh 2003-08-01
    var myStatus = dataObj.attributes.getNamedItem("status").value;
    var newValueArr = null;
    //У������
    for(var j=0; j < dataObj.childNodes.length; j++)
    {
        index = dataObj.childNodes(j).attributes.getNamedItem("index").value;
        editer = document.all(this.nameRule.getDisplayEditerBegin() + index);
        if(editer!= null && editer.tagName.toUpperCase() != "IMG"){
            //������Щediterû��ʹ��htc�ؼ�
            try{
                if(!eapObjsMgr.onvalidate(editer)){                    
                    editer.focus();
                    return false;
                }
            }catch(e){}
        }
    }
    var hiddenModify = false;
    for(var j=0; j < dataObj.childNodes.length; j++)
    {
        index = dataObj.childNodes(j).attributes.getNamedItem("index").value;
        editer = document.all(this.nameRule.getDisplayEditerBegin() + index);
        if(!editer || editer.tagName.toUpperCase() == "IMG" ) {
            if(dataObj.childNodes(j).attributes.getNamedItem("modified").value=="true") //��ֹ���������б��޸ģ�����ȡ��������Ϣ
               hiddenModify = true;
            continue;
        }
        existFlag = true;  // add by hugh 2003-08-01
        newValueArr = this.getediterValue(editer);
        //�����޸ķ�������DataObj/attribute�ڵ��ֵ�޸�
        if(this.updateAttrValue(myStatus,dataObj.childNodes(j),newValueArr[0],newValueArr[1]))
            flag = true;
    }
    if(myStatus != "INSERTED"){
        if(flag && myStatus == "UNCHANGED")
            dataObj.attributes.getNamedItem("status").value = "UPDATED";
        else if(myStatus == "UPDATED" && !flag && existFlag && !hiddenModify)    // add by hugh 2003-08-01
            dataObj.attributes.getNamedItem("status").value = "UNCHANGED";

    }   
    return true;
}
//��ȡDataObj������,���޸Ķ�Ӧ�ı༭��
function DW_modifyEditerFromDO(dataObj){
        var myStatus = dataObj.attributes.getNamedItem("status").value;
        var isHidden = dataObj.attributes.getNamedItem("hiddened").value;
        if( myStatus != "DELETED" && myStatus != "CANCELED" && isHidden != "true"){
            var editer = null;
            var index = null;
            var valueArr = null;
            for(var j=0; j < dataObj.childNodes.length; j++)
            {

                index = dataObj.childNodes(j).attributes.getNamedItem("index").value;
                editer = document.all(this.nameRule.getDisplayEditerBegin() + index);
                if(editer != null){    
                       valueArr = this.getAttrValue(dataObj.childNodes(j));
                    if(editer.tagName == "SELECT"){                       
                        this.selectByValue(editer,valueArr[0]);
                    }
                    else if(editer.tagName.toUpperCase() == "IMG"){
                        if(valueArr[1] == null || valueArr[1] == "")
                            editer.src = unieap.WEB_APP_NAME+"/images/unieap/blank.gif";
                        else
                            editer.src = valueArr[1];

                    }
                    else
                        editer.value= valueArr[1];
                }
           }
        }
        this.dwrefresh(); /////////////////***********************************************************************************/***********//////////////////////////****************************////////////////
}
/* ========================= ���ݵ�����ʾ�б��е�λ��ת���������� ==================== */
// ��DataObj������ת�����б��е�������
function DW_cvtDOIndexToRowIndex(dataObjIndex){
    var tbl = this.nameRule.getBodyTable();
    if(tbl == null||parseInt(dataObjIndex,10)<0) return -100;
    for(var i=1; i<tbl.rows.length; i++)
        if(tbl.rows(i).pos == ""+dataObjIndex)
            return i;
    return -100;
}
// ���б��е�������ת����DataObj������
function DW_cvtRowIndexToDOIndex(rowIndex){
    //Լ��������XSL����ʱΪ�б��е�ÿ��������pos���ԣ���ֵΪ��ӦDataO bj��index
    try{
        return parseInt(this.nameRule.getBodyTable().rows(rowIndex).pos,10);
    }
    catch(e){
        return -100;
    }

}
// ��DataObj/attribute/indexת����ָ�����е�������
function DW_cvtAttrIndexToCellIndex(arg,colIndex){
    try{
        var row = null;
        if(typeof(arg) == "object")
            row = arg;
        else{
            row = this.ruleName.getBodyTable().rows(arg);
        }
        for(var i=1;i<row.cells.length;i++)
            if(row.cells(i).index == ""+colIndex)
                return i;
        return -100;
    }
    catch(e){
        return -100;
    }
}
// ��ָ�����е�������ת����DataObj/attribute/index
function DW_cvtCellIndexToAttrIndex(arg,cellIndex){
    try{
        var row = null;
        if(typeof(arg) == "object")
            row = arg;
        else
            row = this.ruleName.getBodyTable().rows(arg);
        //Լ��������XSL����ʱΪ�б��е�ÿ��Ԫ��������index���ԣ���ֵΪ��ӦDataObj/attribut��index
        return parseInt(row.cells(cellIndex).index,10);
    }
    catch(e){
        return -100;
    }
}
// ��dataWindow/attributes��ȡָ��index��attribute
function DW_getAttrNodeByIndex(index){
    var attrNodes = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute");
    for(var i=0; i < attrNodes.length; i ++)
        if(attrNodes(i).attributes.getNamedItem("index").value == ""+ index)
            return  attrNodes(i);
    return null;
}
// ��dataWindow/dataWindow/dataObjs/dataObj/attribute��ȡָ��index��attribute
function DW_getDOAttrNodeByIndex(dataObj,index){
    var attrNodes = dataObj.childNodes;
    for(var i=0; i < attrNodes.length; i ++)
        if(attrNodes(i).attributes.getNamedItem("index").value == ""+ index)
            return  attrNodes(i);
    return null;
}
// ��dataWindow/attributes��ȡָ��attrName��attribute
function DW_getAttrNodeByName(attrName){
    if(attrName == null) return null;
    var attrNodes = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute");
    attrName = attrName.toUpperCase();
    for(var i=0; i < attrNodes.length; i ++)
        if(attrNodes(i).attributes.getNamedItem("attrName").value.toUpperCase() == attrName)
            return  attrNodes(i);
    return null;
}
function DW_getValidDataType(srcDataType){
    if(srcDataType == "INTEGER" || srcDataType == "LONG" || srcDataType == "FLOAT" || srcDataType == "DOUBLE"|| srcDataType == "BIGDECIMAL")
        return "number";
    else
        return "text";
}
function DW_getDataObjByIndex(index){
    var dataObjNodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
    for(var i=0; i < dataObjNodes.length; i ++)
        if(dataObjNodes(i).attributes.getNamedItem("index").value == ""+index)
            return dataObjNodes(i);
    return null;
}
/**
 *@description ����޸ĵ���Ϣ�Ƿ�Ϸ� 
 */
function DW_checkModifyInfo(){  
    var dataObjArr = this.getSelectedDataObjs();     
    if(dataObjArr.length == 0) return true;    
    var dataObj = dataObjArr[0];
    if(!this.modifyDOFromEditer(dataObj)) return false;
    return true;
}
//�Ƿ��Զ����
function DW_isAutoRemove(){
    var tmp = this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("isAutoRemove");
    if(tmp == null || tmp.value.toUpperCase() == "TRUE" ) return true;
    return false;
}
function DW_getDWIdValue(){
    var tmp = this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("dwid");
    return tmp.value;
}
//��ȡ�е�ֵ(������option���У����ط�����ֵ)
//���� arr[0] ��ʾֵ
//     arr[1] ��ʾ�������ı�
function DW_getAttrValue(dataObjAttr){
    var arr = new Array();
    var isModified = dataObjAttr.attributes.getNamedItem("modified").value;
    if(isModified.toUpperCase() == "TRUE")
        arr[0] = dataObjAttr.attributes.getNamedItem("newValue").value;
    else
        arr[0] = dataObjAttr.attributes.getNamedItem("value").value;

    //����
    var index = dataObjAttr.attributes.getNamedItem("index").value;
    arr[1] = this. translateValue(index,arr[0]);
    return arr;
}
//���룬�Żط������ı�
function DW_translateValue(index,value){
    var attr = this.getAttrNodeByIndex(index);
    if(attr != null && attr.childNodes != null){
        var optionCount = attr.childNodes.length;
        for(var k = 0 ; k < optionCount ; k++){
            if( value == attr.childNodes(k).attributes.getNamedItem("value").value)
                return attr.childNodes(k).text;
        }
    }
    return value;
}
//��Ĭ��ֵ��������ʱ�����
function DW_setDefaultValue(dataObj){
    var index,defaultValue,attrNode,text,optionCount;    
    for(var i=0; i < dataObj.childNodes.length; i++){        
        index = dataObj.childNodes(i).attributes.getNamedItem("index").value;
        attrNode = this.getAttrNodeByIndex(index);  
        if(attrNode!=null)
           defaultValue = attrNode.attributes.getNamedItem("defaultValue");
        else continue;          
        if(defaultValue == null) continue;        
        defaultValue = defaultValue.value;
        if(defaultValue == null || defaultValue == "") continue;
        
        text = defaultValue;
        //�����option�����з���
        if(attrNode.childNodes != null){
            optionCount = attrNode.childNodes.length;
            for(var k = 0 ; k < optionCount ; k++){
                if( attrNode.childNodes(k).attributes.getNamedItem("value").value == defaultValue){
                    text = attrNode.childNodes(k).text;break;
                }
            }
        }
        dataObj.childNodes(i).attributes.getNamedItem("value").value = defaultValue;
        dataObj.childNodes(i).attributes.getNamedItem("newValue").value = defaultValue;
        dataObj.childNodes(i).text = text;
    }
}
//����xml��ѡ��ѡ����
function DW_checkedRowSelecter(){
    var selecter = null;
    try{
        selecter = this.nameRule.getRowSelecter();
        if(selecter==null) return;
    }catch(e){return;}

    var dataObjIndex;
    var arr = this.getSelectedDataObjs();
    var checkboxFlag = false;
    var j;
again:  for(var i=0; i < selecter.length; i++){
        dataObjIndex = selecter(i).value;
        for(j=0; j < arr.length; j++){
            if(dataObjIndex == arr[j].attributes.getNamedItem("index").value){
                selecter(i).checked = true;
                checkboxFlag = true;
                continue again;
            }
        }
        selecter(i).checked = false;
    }
    var myCheckbox =  this.nameRule.getCheckBox();
    if(myCheckbox != null) myCheckbox(0).checked = checkboxFlag;//��������ѡ��
}
/**
 *@description �滻���ݵ��е�����
 *@return �޷���ֵ
 *@modified by 2006-01-06
 *@remark ʹ�õ�ǰ��currentSelectedRowָ���
 */
function DW_replaceNode(dataObjsXML,type){
    if(type == "dataObjs"){              
        var dataWindowXml = this.getXMLDom().selectSingleNode("dataWindow").xml;
        var xmlheader = "<XML id="+DW_XMLID_BEGIN+this.getName()+" href='"+this.getXMLObj().href+"'>";
        var start = dataWindowXml.indexOf("<dataObjs");
        var end = dataWindowXml.indexOf("</dataObjs>",start); 
        if(end==-1){
           end = dataWindowXml.indexOf(">",start)+1;           
        } 
        else end+="</dataObjs>".length;   
        
        this.getXMLObj().outerHTML = xmlheader+ dataWindowXml.substring(0,start)+ dataObjsXML+dataWindowXml.substring(end)+"</XML>";   
        
        if(this.firstLoad)
          this.preDealDataObj(); 
        else 
          this.preDealDW();               
        this.msxslt();     
        this.currentSelectedRow = null;   
    }
    else{
        alert("������Աע�⣬����replaceNode()���������ܴ���type='"+type+"'�Ĳ���");
        return;
    }

}
function DW_reset(){
    if(this.getType() == "QUERY_CONDITION"){
        this.msxslt();
    }
}
/**
 *description ������һ������һ����ť��״̬����ʽ����
 *�޷���ֵ
 */
function DW_adjustPageButton(){
    try{
        var node = this.getXMLDom().selectSingleNode("/dataWindow/dataObjs");
        var rsCount = node.attributes.getNamedItem("rsCount").value;
        if(rsCount == "-1") return;
        var pageCount = node.attributes.getNamedItem("pageCount").value;
        if(pageCount == "-1") return;
        var pageNo = node.attributes.getNamedItem("pageNo").value;
        pageNo = parseInt(pageNo,10);
        pageCount = parseInt(pageCount,10);

        var firstPageBtn = this.nameRule.getFirstPageButton();
        var prePageBtn = this.nameRule.getPrePageButton();
        var nextPageBtn = this.nameRule.getNextPageButton();
        var lastPageBtn = this.nameRule.getLastPageButton();
        //var certainPageBtn = this.nameRule.getCertainPageButton();   

        if(pageNo == 1 || pageCount==0){
            if(firstPageBtn != null){
                firstPageBtn.disabled = true;               
                firstPageBtn.className = "NEUDwButton_FirstPage_Disable";
            }
            if(prePageBtn != null){
                prePageBtn.disabled = true;
                prePageBtn.className = "NEUDwButton_PreviousPage_Disable";
            }
        }
        if(pageNo == pageCount || pageCount==0){
            if(lastPageBtn != null) {
                lastPageBtn.disabled = true;
                lastPageBtn.className = "NEUDwButton_LastPage_Disable";
            }
            if(nextPageBtn != null) {
                nextPageBtn.disabled = true;
                nextPageBtn.className = "NEUDwButton_NextPage_Disable";
            }
        }
       // if(certainPageBtn && pageCount<=1){
       //     certainPageBtn.disabled = true;
       //     certainPageBtn.className = "NEUDwButton_GoPage_Diabled";
       //     certainPageBtn.title ="";
       // }
    }catch(e){}
}
//new add

function DW_checkAttributeIndex(Nodes){  
   if(Nodes(0)==null){ 
       alert("attribute���Բ���Ϊ�գ����������á�");       
       return false ;
   }
   var x,href;
   for(var i=0;i<Nodes.length;i++){
       href = Nodes(i).attributes.getNamedItem("href");
       if(href) this.addAttribute(Nodes(i),"href",unieap.WEB_APP_NAME+"/"+href.value);
       x = Nodes(i).attributes.getNamedItem("dataType").value.toUpperCase();             
       if(x=="FLOAT"||x=="DOUBLE"){         
          if(!Nodes(i).attributes.getNamedItem("precision"))
              this.addAttribute(Nodes(i),"precision","2"); //Ĭ�Ͼ�ȷ����2
          else if(Nodes(i).attributes.getNamedItem("precision").value=="")
              Nodes(i).attributes.getNamedItem("precision").value = "2";
       }
       else if(x=="TIMESTAMP"){
          if(!Nodes(i).attributes.getNamedItem("dateformat")){ //Ĭ�����ڸ�ʽ��YYYY-MM
             this.addAttribute(Nodes(i),"dateformat","YYYY-MM");
          }
          else if(Nodes(i).attributes.getNamedItem("dateformat").value=="")
             Nodes(i).attributes.getNamedItem("dateformat").value = "YYYY-MM" ; 
       }
       var defaultValue = Nodes(i).attributes.getNamedItem("defaultValue");
       if(defaultValue&&defaultValue.value){           
             var template = this.getXMLDom().selectNodes("/dataWindow/template/dataObj/attribute")[parseInt(Nodes(i).attributes.getNamedItem("index").value)-1];
             template.attributes.getNamedItem("newValue").value = defaultValue.value;
             template.attributes.getNamedItem("modified").value = "true";
             template.text = defaultValue.value;
       }       
       for(var j=i+1;j<Nodes.length;j++){
          if(Nodes(i).attributes.getNamedItem("index").value==Nodes(j).attributes.getNamedItem("index").value){
              alert("�� '"+(i+1)+"' ��attribute��'index'��"+"�� '"+(j+1)+"' ��attribute��'index'������ '"+Nodes(i).attributes.getNamedItem("index").value+"' "+"����������attribute���ԡ�");
              return false;            
          }  
     }
   }
   return true;  
}
function DW_cutUnwantedHeader(headerNodes){  
    if(headerNodes(0)==null){
       alert("header�����Բ���Ϊ��,���������á�");
       return false;
    }   
    var i = 0;
    while(i<headerNodes.length){      
       if(!this.headerInAttribute(headerNodes(i)))   
           this.getXMLDom().selectSingleNode("/dataWindow/headers").removeChild(headerNodes(i));                                  
       i = i+1;       
    }
    return true;
}
function DW_headerInAttribute(headerNode){
   var attNodes = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute");  
   for(var i=0;i<attNodes.length;i++){
      if(attNodes(i).attributes.getNamedItem("index").value==headerNode.attributes.getNamedItem("attrIndex").value)
         return true;
   }  
   return false;
} 
/*
 *@description selTtextChange ��select�����text���֮��һ��һ�������¼�
 *@param index_1Ϊ����select������±�
 *@param index_2Ϊ�Ӷ�text������±꣨�ֲ�ˢ�µĲ��֣�
 *@param actionName���ύ��action����
 *@param actionMethod���ύ��action����
 *@param otherParameters���������Ĳ���
 */
 function DW_selTextOnChange(index_1,index_2,actionName,actionMethod,otherParameters){
    var parameter ="";
    var temp_editerID;
    temp_editerID = "editer_"+this.getName()+"_"+index_1;   
    parameter+="changeValue="+this.doc.all(temp_editerID).value;
    parameter+="&defaultValue=" + this.doc.all("editer_"+this.getName()+"_"+index_2).value;     
    if(otherParameters) parameter+="&"+ otherParameters;
    var result = executeRequest(actionName,actionMethod,parameter);
    this.doc.all("editer_"+this.getName()+"_"+index_2).value = result;      
 }
/*
 *@description selectOnChange ���±�Ϊindex_1��select�����onchange�¼�
 *@param index_1Ϊ����select������±�
 *@param index_2Ϊ�Ӷ�select������±꣨�ֲ�ˢ�µĲ��֣�
 *@param actionName���ύ��action����
 *@param actionMethod���ύ��action����
 *@param otherParameters���������Ĳ���
 */
 function DW_selectOnChange(index_1,index_2,actionName,actionMethod,otherParameters){
   
    var parameter ="";
    var temp_editerID;
    temp_editerID = "editer_"+this.getName()+"_"+index_1;     
    parameter+="changeValue="+this.doc.all(temp_editerID).value;    
    parameter+="&defaultValue=" + this.getSelectedValue(index_2); 
    if(this.getAttrNodeByIndex(index_2).attributes.getNamedItem("isNullable"))
    parameter+="&isnullable=" + this.getAttrNodeByIndex(index_2).attributes.getNamedItem("isNullable").value;
    if(otherParameters) parameter+="&"+ otherParameters;    
    temp_editerID = "editer_"+this.getName()+"_"+index_2;
    var objs = this.doc.all(temp_editerID);
    var dwEditer = objs.outerHTML.substring(0,objs.outerHTML.indexOf(">")+1);
    var result = executeRequest(actionName,actionMethod,parameter);   
    result = dwEditer+result+"</select>"; 
    this.doc.all(temp_editerID).outerHTML = result;      
}
/*
 *@��������±��ȡ��Ӧ��ֵ(newValue),���ѡ�еļ�¼������Ϊһ�򷵻�""
 */
 function DW_getSelectedValue(index){
  var rows = this.getSelectedDataObjs();
  if(rows.length!=1) return "";   
  var nodes = rows[0].childNodes; 
  for(var i= 0;i<nodes.length;i++){
    if(nodes(i).attributes.getNamedItem("index").value==""+index){
       return nodes(i).attributes.getNamedItem("newValue").value;
    }
  }
  return "";  
 }
 /**
  *@description ����Ҫ�ж��Ƿ�Ҫ�����������������������onchange=selectOnChange OR selTextOnChange�¼�ʱ����Ҫִ�У�
  */
 function DW_alternateChange(){
   var attributes = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute"); 
   var headers = this.getXMLDom().selectNodes("/dataWindow/headers/header"); //ֻ����Щ������ʾ�ı༭������GRID_EDIT���ͣ�
   var editers = this.getXMLDom().selectNodes("/dataWindow/editers/editer");
   if((editers==null||editers.length==0)&&this.getType()!= "GRID_EDIT") return;
   var temp = "";  
   var editFlag ;    
   for(var i=0;i<attributes.length;i++){ //�ܹ���ʾ�ı༭�������������
     editFlag = false;  
     
     if(this.getType()== "GRID_EDIT"){         
         for(var j=0;j<headers.length;j++){//��ΪGRID_EDIT����ʱ
            if(attributes(i).getAttribute("index")==headers(j).getAttribute("attrIndex")){
                editFlag = true;
                break;
            }              
         }
     }
     else{
        for(var j=0;j<editers.length;j++){ //ֻ�ÿɱ༭��ʱ��Ž���������GRID_EDIT���ͳ��⣩
          
            if(attributes(i).getAttribute("index")== editers(j).getAttribute("attrIndex")){
                editFlag = true;
                break; 
            }
        }
     }          
     if(editFlag){     
          temp = attributes(i).getAttribute("onchange");   
          if(temp!=null&&temp!="")
             if(temp.indexOf("selectOnChange(")>0||temp.indexOf("selTtextOnChange(")>0){                 
                 eval(temp);  //ִ�������Ĵ���
             }          
                
     }
  }
   /*filter���ֵ�     
   var filters = this.getXMLDom().selectNodes("/dataWindow/filters/filter");
   for(var i=0;i<filters.length;i++){
     temp = filters(i).getAttribute("onchange");
     if(temp!=null&&temp!="")
       if(temp.indexOf(".selectOnChange(")>0||temp.indexOf(".selTtextOnChange(")>0)
          eval(temp);
     }
     */
 }
 /**
  *@description ��õ��������document���Ա㸸�������js�����ܹ�ȡ�õ��������ĳЩ����
  */
  function DW_setDocument(doc){
     if(doc==null)
        this.doc = document;
     else
        this.doc = doc;
  }
  /**
  *@description ȥ�ո����
  *@param arg �������ַ���
  *@param left ��ȥ�ո�true��
  *@param right ��ȥ�ո�true��
  *@return ȥ���ո���ַ���
  */
  function DW_cutNBSP(arg,left,right){  
      if(arg=="") return arg;
      if(left){
          while(arg.charAt(0)==" "){
             arg = arg.substring(1);
          }
      }
      if(right){
          while(arg.charAt(arg.length-1)==" "){
             arg = arg.substring(0,arg.length-1);
          }
      }
      return arg;
  }
  /**
  *@description ˢ�µ�ǰ����refresh����
  *@return nothing
  */
  function DW_refresh(){
     if(!this.dwevent.trigger(this.dwevent.BEFOR_REFRESH)) return;
       
     var eSrcObject = event.srcElement;
     dwManager.refreshMultiDW(new Array(this.getName()),eSrcObject.boControllerName,eSrcObject.boControllerMethod,eSrcObject.actionName,eSrcObject.actionMethod);
     this.currentSelectedRow = null;   
     this.dwevent.trigger(this.dwevent.AFTER_REFRESH);
  }
  /**
   *@description ����¼�over��out and onlick
   *@modified by 2006-01-09
   */
  function DW_doMouseEvent(ele){
     if(!unieap.mouseEvent) return;
     if(event.type=="mouseover"){ 
        this.mouseEventRowCss = ele.className;
        ele.className = "NEUDwListRowBgColor4";
     }else if(event.type=="mouseout"){   //����ƿ�
         if(unieap.selectedRowCss){
	        var childObj =  ele.cells(0).children(0);                
	        if(childObj.checked){
	           ele.className = "NEUDwListRowBgColor3";
               return ;
            }
            //����Ƕ�ѡʱ���⴦��
            if(this.getType()=="MULTI_SELECT"){          
               if(this.cvtDOIndexToRowIndex(ele.pos)%2==0)
                  ele.className = "NEUDwListRowBgColor1"; 
               else
                  ele.className = "NEUDwListRowBgColor2"; 
               return;
            }
         }         
         ele.className = this.mouseEventRowCss;
      }
      else if(event.type=="click"){
          ele.cells(0).children(0).click();         
      }
        
     
  }