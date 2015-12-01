 /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+ 脚本描述： DataWindown对象
+            采用面向对象的设计方法
+ 创    建： 胡光华 hugh@neusoft.com
+ 修改履历：
+ 修改  人：
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


/**
*@description 数据窗口对象构造函数
*@param dwName 数据窗口名称
*/
function DataWindow(dwName){
    /* -------------- 属性申明区 ------------------------------ */
    this.name = dwName;                                           //名称
    this.type = null;                                             //类型
    this.href = null;                                             //XSL路径
    this.nameRule = new DW_NAME_RULE(dwName);                     //命名规则
    this.dwevent = new DWEvent();                                   //事件   
    this.crtCellIndex = -100;                                     //当前Cell的索引号
    this.crtDOIndex = -100;                                       //当前DataObj对象的索引号
    this.crtOperate = "WAITING";                                  //当前操作：修改(MODIFY)、新增(ADD)、查询(QUERY)、删除(DEL)
    this.popWinXSL = "PopWin.xsl";                                //用于解析弹出窗口的XSL文件
    this.queryWinXSL = "QueryWin.xsl";                            //用于解析查许条件窗口的XSL文件
    this.screenStandard = "800*600";                              //制作标准：800*600、1024*768
    this.isAutoSize = unieap.isAutoResize;                                      //是否自动调整数据窗口尺寸
    this.isCompleteXSLT = false;                                  //是否全解析
    //wanghx begin
    this.isUniteCols = false;                                   //是否合并单元格
    //wanghx end
    this.doc = document;                                         //获得弹出窗口的document
    this.firstLoad = false;
    this.currentSelectedRow = null;                              //保存当前选中的行对象
    this.mouseEventRowCss = null;

    /* -------------- 公有方法申明区 -------------------------- */

    //wanghx begin for unite col
    this.getLastSelectedDOIndex = DW_getLastSelectedDOIndex;      //获取最后选中的DataObj对象的索引
    //wanghx end
    this.getSelectedDataObjs = DW_getSelectedDataObjs;            //获取选中的DataObj对象数组
    this.getSelectedRows = DW_getSelectedRows;                    //获取选中的Row对象数组
    this.getFirstSelectedRow = DW_getFirstSelectedRow;            //获取第一个选中的Row对象
    this.getLastSelectedRow = DW_getLastSelectedRow;              //获取最后一个选中的Row对象
    this.getScreenStandard = DW_getScreenStandard;                //获取数据窗口的制作分辨率
    this.getFacade = DW_getFacade;                                //获取数据窗口对外接口
    this.getDWIdValue = DW_getDWIdValue;                          //获取数据窗口的DWId
    this.getAttrValue = DW_getAttrValue;                          //获取dataWindow/dataobjs/dataobj/attribute的值
    this.exeQuery = DW_exeQuery;                                  //执行查询
    this.isAutoRemove = DW_isAutoRemove;                          //是否自动清除

    /////////// writer
    this.setType = DW_setType;                                    //修改数据窗口类型

    this.msxslt = DW_msxslt;                                      //数据窗口部分解析
    this.fullMsxslt = DW_fullMsxslt;                              //数据窗口全部解析
    this.preDealDW = DW_preDealDW;                                //数据窗口预处理
    this.selectOneRow = DW_selectOneRow;                          //通过dataObj的index选择一行
    this.doMouseEvent = DW_doMouseEvent;
    this.preDealDataObj = DW_preDealDataObj;

    /////////// events
    this.cell_onDblClick_pop = DW_cell_onDblClick_pop;            //单元格的双击事件响应函数(数据窗口类型为：POP_EDIT)
    this.cell_onDblClick = DW_cell_onDblClick;                    //单元格的双击事件响应函数
    this.rowSelecterOnclick = DW_rowSelecterOnclick;              //行选择器的点击事件响应函数
    this.headerOnClick = DW_headerOnClick;                        //列表头的点击事件
    this.checkBoxOnclick = DW_checkBoxOnclick;                    //列表头复选框的点击事件
    this.dwrefresh = DW_dwrefresh;                                //数据窗体刷新事件


    this.addRow = DW_addRow;                                      //"增加"按钮点击事件响应函数
    this.deleteSelectedRow = DW_deleteSelectedRow;                //"删除"按钮点击事件响应函数
    this.modifySelectedRow = DW_modifySelectedRow;                //"修改"按钮点击事件响应函数
    this.save = DW_save;                                          //"保存"按钮点击事件响应函数
    this.query = DW_query;                                        //"查询"按钮点击事件响应函数
    this.query_onclick = DW_query_onclick;                        //普通查询条件界面的"查询"按钮点击事件响应函数
    this.reset = DW_reset;
    this.refresh = DW_refresh;                                    //"刷新"按钮点击事件响应函数
    this.selTextOnChange = DW_selTextOnChange;                    //用于select与text之间的联动 
    this.selectOnChange = DW_selectOnChange;                      //用于select与select之间的联动

    /* -------------- 私有方法申明区 -------------------------- */
    this.popWin = DW_popWin;
    this.queryWin = DW_queryWin                                   // 打开查询条件的录入窗口
    this.popWinOnLoad = DW_popWinOnLoad;
    this.queryWinOnLoad = DW_queryWinOnLoad                       //查询条件录入窗口的OnLoad事件函数，完成所有界面元素构画工作
    this.drawEditRow = DW_drawEditRow;                            //把列表中的指定行改成可编辑状态
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
    this.updateAttrValue = DW_updateAttrValue;                   //更新DataObj下attribute节点的值
    this.adjustScrollByPosInTable = DW_adjustScrollByPosInTable; //通过指定的列表中的行、列索引来调整滚动条的位置
    this.adjustScrollByPosInDataSet = DW_adjustScrollByPosInDataSet; //通过指定的DataSet中的行、列索引来调整滚动条的位置
    this.adjustScrollByCombPos = DW_adjustScrollByCombPos;       //通过组合的行列指定索引来调整滚动条的位置
    this.adjustDWSize = DW_adjustDWSize;                         //调整数据窗口的长宽、编辑器的宽度
    this.dataFilter = DW_dataFilter;                             //保存时使用的数据筛选函数
    this.addAttribute = DW_addAttribute;
    this.preDealEditer = DW_preDealEditer;
    this.modifyDOFromEditer = DW_modifyDOFromEditer;             //收集编辑器的数据,并修改对应的DataObj
    this.modifyEditerFromDO = DW_modifyEditerFromDO;
    this.getAttrNodeByIndex = DW_getAttrNodeByIndex;
    this.getDOAttrNodeByIndex = DW_getDOAttrNodeByIndex;
    this.getAttrNodeByName = DW_getAttrNodeByName;
    this.getValidDataType = DW_getValidDataType;
    this.getDataObjByIndex = DW_getDataObjByIndex;
    this.checkModifyInfo = DW_checkModifyInfo;                   //检查修改过的信息是否合法
    this.setDefaultValue = DW_setDefaultValue;
    this.checkedRowSelecter = DW_checkedRowSelecter;             //根据xml来选择选择器
    this.replaceNode = DW_replaceNode;
    this.translateValue = DW_translateValue;                     //翻译代码
    this.assQueryCondition = DW_assQueryCondition;               //组装查询条件
    this.adjustPageButton = DW_adjustPageButton;                 //调整翻页按钮
    this.checkAttributeIndex = DW_checkAttributeIndex ;          //检查arrtibute中的index是否有重复的
    this.cutUnwantedHeader = DW_cutUnwantedHeader ;              //删除那些header的attrIndex在所对应attribute的index中不存在的项
    this.headerInAttribute = DW_headerInAttribute ;
    this.getSelectedValue = DW_getSelectedValue;                 //得到选中列的值
    this.alternateChange = DW_alternateChange;                   //用于单选点击事件触发联动
    this.setDocument = DW_setDocument ;                          //用于应用弹出的模态对话框的document
    this.cutNBSP = DW_cutNBSP ;                                  //去掉空格
    this.doPoseRadioEvent = DW_doPoseRadioEvent;
    this.preDealSumCalculate = DW_preDealSumCalculate;
    this.formatDataPrecision = DW_formatDataPrecision;
    
    /* -------------- 与类型绑定的方法申明区 ------------------ */
        //wanghx begin for unite col
        this.getCurrAttrIndex = DW_getCurrAttrIndex;//根据模版中的"index"，取得数据岛中实际的attributes顺序
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
    this.preRowOnclick_freeEdit = DW_preRowOnclick_freeEdit;     //上一条点击事件
    this.nextRowOnclick_freeEdit = DW_nextRowOnclick_freeEdit;   //下一条点击事件
        //wanghx begin for united cols
        this.uniteCols =DW_uniteCols;//合并单元格
        this.uniteColsPostProc =DW_uniteColsPostProc;//在对合并单元格数据窗口做的某些操作（删除行）后调用此操作，调整页面表现
        this.getDisplayValue = DW_getDisplayValue;//返回当前字段的显示值（newValue或value）

    //wanghx end for united cols
    
    /* -------------- 数据岛和显示列表中的位置转换方法定义 ---- */
    this.cvtDOIndexToRowIndex = DW_cvtDOIndexToRowIndex;       //把DataObj的索引转换成列表中的行索引
    this.cvtRowIndexToDOIndex = DW_cvtRowIndexToDOIndex;       //把列表中的行索引转换成DataObj的索引
    this.cvtAttrIndexToCellIndex= DW_cvtAttrIndexToCellIndex;  //把DataObj/attribute/index转换成指定行中的列索引
    this.cvtCellIndexToAttrIndex= DW_cvtCellIndexToAttrIndex;  //把指定行中的列索引转换成DataObj/attribute/index

    /* -------------- 属性读方法 ------------------------------ */

    this.getName = DW_getName;                                 //获取数据窗口名字
    this.getType = DW_getType;                                 //获取数据窗口类型
    this.getXMLObj = DW_getXMLObj;
    this.getXMLDom = DW_getXMLDom;
    this.getXML = DW_getXML;
    this.getHref = DW_getHref;
    
    
}
/* ========================= 与类型绑定的方法定义   ============================ */
function DW_afterMsxslt(){
    //调背景颜色
    this.modifyBGColor();
    //执行各自的收尾函数
    this.afterMsxslt_gridEdit();
    this.afterMsxslt_quickEdit();
    this.afterMsxslt_freeEdit();
    this.afterMsxslt_gridEditRoot();//for jiye
    this.afterMsxslt_oneSelectRoot();
    ////调整垂直滚动条、水平滚动条
    this.adjustScrollByCombPos(this.crtDOIndex,this.crtCellIndex);
    //调用数据窗体刷新函数
    this.dwrefresh(); 
    //调整翻页按钮
    this.adjustPageButton();
}
function DW_dwrefresh(){
    eapObjsMgr.refreshDW(null,this);
    }
//收尾函数：适用类型为GRID_EDIT
function DW_afterMsxslt_gridEdit(){
    if(this.getType() != "GRID_EDIT") return;
    //画行编辑器
    this.drawEditRow(this.crtDOIndex,this.crtCellIndex);
}
/**
 *@description 适用类型为QUICK_EDIT
 *@modified by 2006-01-09
 *@remark currentSelectedRow指向当前选中行对象
 */
function DW_afterMsxslt_quickEdit(){
    if(this.getType() != "QUICK_EDIT") return;
    //填充编辑器的各项目的值
    var dataObjArr = this.getSelectedDataObjs();
    var myCheckbox =  this.nameRule.getCheckBox();     
    if(dataObjArr.length > 0 ){
        var dataObj = dataObjArr[0];
        this.modifyEditerFromDO(dataObj);
        if(myCheckbox != null) myCheckbox(0).checked = true;//有两个复选框
        var rowIndex = this.cvtDOIndexToRowIndex(dataObj.getAttribute("index"));
        this.currentSelectedRow = this.nameRule.getBodyTable().rows(rowIndex);   
    }
    else{
        if(myCheckbox != null) myCheckbox(0).checked = false;//有两个复选框
        //清空上次余留在编辑框数据
        this.modifyEditerFromDO(this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj").cloneNode(true));
    }
    this.alternateChange();
}
//收尾函数：适用类型为FREE_EDIT
function DW_afterMsxslt_freeEdit(){
    if(this.getType() != "FREE_EDIT") return;
    //把当前DataObj的值放入编辑器中
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

    //画行编辑器
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
* 从0开始，以便直接可以存取dom的节点数组
* @return 整数
*/
function DW_getLastSelectedDOIndex(){
     var selectedobjs =this.getSelectedDataObjs();
     if(selectedobjs!=null&&selectedobjs.length>0) {
        return parseInt(selectedobjs[0].getAttribute("index"),10)-1;
     }
     return null;
}

/**
* 合并单元格
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
                if(selectedIndex&&selectedIndex==j&&(type=="GRID_EDIT")) break;//在GRID_EDIT操作中，如果此行是当前被选中的值，则不必合并单元格
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
* 在对合并单元格数据窗口做的某些操作（删除行）后调用此操作，调整页面表现
* @return
*/
   function DW_uniteColsPostProc(objIndex_str){
     if (!this.isUniteCols) return;
     var index = parseInt(objIndex_str,10)-1;//从0起为数组的索引，方便操作dom
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
           while(j>=0){                        //当前行是被其他行合并的
              if(dataObjNodes[j].getAttribute("status")=="DELETED"){j--;continue;} //如果当此行是被删除的则不处理
              var frontAttrs = dataObjNodes[j].selectNodes("attribute");
              var front_unitedcol = frontAttrs[col].getAttribute("unitedcol");
              if(front_unitedcol&&front_unitedcol!="0") {
                frontAttrs[col].setAttribute("unitedcol",(parseInt(front_unitedcol)-1)+"");
                break;
              }
              j--;
           }
         }
         if(unitedcol>1){                //当前行合并了其他行
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
* 清楚子window中的内容
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
* 主window中点击一行的处理事件
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
* 设置子window中的缺省字段
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
/* ========================= 数据窗口读方法定义     ============================ */

// 获取数据窗口名称
function DW_getName(){ return this.name; }

// 获取数据窗口类型
function DW_getType(){
    if(this.type == null)
        this.type = this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("type").value;
    return this.type;
}

// 获取数据窗口xml对象
//DW_XMLID_BEGIN在DWNameRule.js中定义
function DW_getXMLObj(){ return document.all(DW_XMLID_BEGIN+this.getName()); }

// 获取数据窗口XMLDom
function DW_getXMLDom(){ return this.getXMLObj().XMLDocument; }

// 获取数据窗口XML
function DW_getXML(){ return this.getXMLObj().xml;}

// 获取数据窗口数据HREF
function DW_getHref(){return this.getXMLObj().href+"DataWindow"+this.getType()+".xsl";}

/**
 *@description 获取选中的DataObj对象数组
 *@return Array数组对象
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
 *@description 获取选中的Row对象数组(约定：在列表中的TR带有pos属性，其值为对应的DataObj的index值)
 *@return Array数组对象
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
                arr.splice(j,1); //优化部分
                if(arr.length==0) break again;
                continue again;
        }   
    
    return rowArr;
}
/**
 *@description 获取第一个选中的Row对象
 *@return Node对象
 */
function DW_getFirstSelectedRow(){
    var rowArr = this.getSelectedRows();
    if(rowArr.length == 0)  return null;
    return rowArr[0];
}
/**
 *@description 获取最后一个选中的Row对象
 *@return Node对象
 */
function DW_getLastSelectedRow(){
    var rowArr = this.getSelectedRows();
    if(rowArr.length == 0)  return null;
    return rowArr[rowArr.length-1];
}
// 获取数据窗口的制作分辨率
function DW_getScreenStandard(){
    return this.screenStandard;
}
function DW_getFacade(){
    return new DWFacade(this);
}
/* ========================= 数据窗口写方法定义     ============================ */

// 修改数据窗口类型
function DW_setType(type){
    if(type == this.getType())  return;
    this.type = type;
    this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("type").value = type;
}

/* ========================= 数据窗口点击事件响应方法定义======================= */
/**
 *@description 单元格双击事件响应函数(数据窗口类型为:GRID_EDIT)
 *@modified by 2006-01-06
 *@remark 改变选中行的操作
 */
function DW_cell_onDblClick_pop(){
    //增加双击之前的监听事件
    if(!this.dwevent.trigger(this.dwevent.BEFOR_OPEN_POPWIN)) return;
     
    var eSrcObject = event.srcElement;
    if(eSrcObject.tagName != "TR") eSrcObject = eSrcObject.parentElement;
    if(eSrcObject.tagName != "TR") return;
    if(eSrcObject.cells(0).tagName == "TH") return;

    
    this.crtOperate = "MODIFY";    //当前操作
    this.crtDOIndex = eSrcObject.pos;
    //this.selectOneRow(this.crtDOIndex);     //选中点击的行
    //修改部分
    eSrcObject.cells(0).children(0).click();
    
    this.popWin();                 //打开操作窗口
    //增加双击之后的监听事件
    this.dwevent.trigger(this.dwevent.AFTER_OPEN_POPWIN);
}
//单元格双击事件响应函数
function DW_cell_onDblClick(){

    var eSrcObject = event.srcElement;
    if(eSrcObject.tagName != "TR") eSrcObject = eSrcObject.parentElement;
    if(eSrcObject.tagName != "TR") return;
    if(eSrcObject.cells(0).tagName == "TH") return;

    this.currentSelectedRow = eSrcObject;      //当前行
    this.crtDOIndex = eSrcObject.pos;
    //this.selectOneRow(this.crtDOIndex);   //选中点击的行
    this.crtOperate = "QUERY";     //当前操作
    this.popWin();                 //打开操作窗口
    

}
/**
 *@description 触发radio组件的事件
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
 *@description 行选择器的点击事件响应函数(分别对以下几种编辑类型分别作处理)
 *@modified by 2006-01-05
 *@remark 提高性能，不再操作xslt
 */
function DW_rowSelecterOnclick(){
    //点击之前的触发事件
    if(!this.dwevent.trigger(this.dwevent.BEFOR_ROW_SELECTED)) return;        
   
    if(this.getType() == "ONE_SELECT" || this.getType()=="POP_EDIT"){ 
        this.doPoseRadioEvent();  
    }
    else if(this.getType() == "GRID_EDIT"||this.getType()=="QUICK_EDIT"){
       //校验输入值的合法性
       if(!this.checkModifyInfo()){
            event.returnValue = false;
            this.checkedRowSelecter();
            return;
       }      
       //保存记录到dom对象中
       if(this.currentSelectedRow){     
           var dataObjs = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");   
           var tDataRow = dataObjs[parseInt(this.currentSelectedRow.pos,10)-1].childNodes;                   
           for(var i=1;i<this.currentSelectedRow.cells.length;i++){          
               var colIndex = parseInt(this.currentSelectedRow.cells(i).index)-1;      
               this.currentSelectedRow.cells(i).innerText = tDataRow[colIndex].text +" ";
           }
       }     
       //改变行的样式表现以及修改dom对象的选种状态
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
    
    
    //检查已修改数据的合法性
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
    this.crtOperate = "WAITING";                              //一定要把状态置回去
    var eSrcObject = event.srcElement;
    this.crtCellIndex = 1;                                    //当前Cell的索引号
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
        //触发事件
       this.dwevent.trigger(this.dwevent.AFTER_ROW_SELECTED);
        return;
    }
    this.checkedRowSelecter();
   //this.afterMsxslt();
    this.msxslt();
*/
    //触发事件
    this.dwevent.trigger(this.dwevent.AFTER_ROW_SELECTED);
}
/**
 *@description 表头点击事件：排序
 *@param headerIndex 点中的列索引
 *@modified by 2006-01-06
 *@remark 改变当前行currentSelectedRow的指向
 */
function DW_headerOnClick(headerIndex){

    //触发事件
    if(!this.dwevent.trigger(this.dwevent.BEFOR_ORDER)) return;

    var headerNode = this.getXMLDom().selectSingleNode("/dataWindow/orderInfo");
    var namedNodemap = headerNode.attributes;
    
    //指定排序列
    namedNodemap.getNamedItem("attrIndex").value = headerIndex;
   
    //升降序轮遵
    var orderAttribute = namedNodemap.getNamedItem("order");
     
    if(orderAttribute.value == "ascending"){
        orderAttribute.value = "descending";
    }else{
        orderAttribute.value = "ascending"
    }
   
    //排序数据类型，主要考虑Number型
    //new add  //可能发生 headerIndex 不等于他所在header数组中的实际位置。
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
    //重新解析，刷新
    var dataObjIndex = this.currentSelectedRow?this.currentSelectedRow.pos:-1;
    
    if (unieap.orderbyDB && (this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("isEmptyOnCreate")==null || this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("isEmptyOnCreate").value =="false")){
        var postParameter = "headerIndex="+headerIndex+"&order="+orderAttribute.value;
        dsSessionMgr("setOrder",unieap.FORM_NAME,this.name,postParameter);
        this.currentSelectedRow = null;
        this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","false");
    }
    this.msxslt();
    //修改
    
    if(this.currentSelectedRow){
        var rowIndex = this.cvtDOIndexToRowIndex(dataObjIndex);
        this.currentSelectedRow = this.nameRule.getBodyTable().rows(rowIndex);
    }  

    //触发事件
    this.dwevent.trigger(this.dwevent.AFTER_ORDER);

}
/**
 *@description 弹出窗口的保存按钮的点击响应函数
 *@param doc 窗口的document对象
 *@modified by 2006-01-09
 */
function DW_popwin_save_onclick(doc)
{
    //增加保存之前的监听事件
 
    if(!this.dwevent.trigger(this.dwevent.BEFOR_SAVE_POPWIN)) return false;   
    var theForm = doc.all(unieap.FORM_NAME); 
    //校验值     
    if(!checkValue(theForm)) return false;
    var xmlDom = this.getXMLDom();  
    var editerNodes = xmlDom.selectNodes("/dataWindow/editers/editer");
    var theediter;
    var count = -1;
    var node;
   
    //新增操作
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
                   if(theediter.selectedIndex == 0&&theediter.options[0].text=="请选择")
                      node.text = "";
                   else
                      node.text = theediter.options(theediter.selectedIndex).text;
                   node.attributes.getNamedItem("value").value = theediter.options(theediter.selectedIndex).value;
                }
                else{//当<option>为空时 //概率小，所以放后边
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
        //其他行为非选择状态
        for(var j=0; j < xmlDom.selectNodes("/dataWindow/dataObjs/dataObj").length - 1; j++)
            xmlDom.selectNodes("/dataWindow/dataObjs/dataObj")(j).attributes.getNamedItem("selected").value = "false";
        //重新解析，刷新
        this.msxslt();
        //当前的行指针指向新建行        
        var rowIndex = this.cvtDOIndexToRowIndex(newRow.attributes.getNamedItem("index").value);
        this.currentSelectedRow = this.nameRule.getBodyTable().rows(rowIndex);
        //增加保存之后的监听事件
        this.dwevent.trigger(this.dwevent.AFTER_SAVE_POPWIN);
        return true;
    }
    //修改操作
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
            //从DataObject的attribute中获取的上一次改变后的值
            if(node.attributes.getNamedItem("modified").value == "true")
                oldValue = node.attributes.getNamedItem("newValue").value;
            else
                oldValue = node.attributes.getNamedItem("value").value;
            //从新窗口中获取新值
            theediter = doc.all(this.nameRule.getDisplayEditerBegin()+index);  

            if(theediter.tagName == 'INPUT'||theediter.tagName =='TEXTAREA'){               
                newValue = theediter.value;
                newText = newValue;
            }else if(theediter.tagName == 'SELECT'){               
     
                if(theediter.selectedIndex >=0){
                  if(theediter.selectedIndex == 0&&theediter.options[0].text=="请选择")
                     newText = "";
                  else
                     newText = theediter.options(theediter.selectedIndex).text;
                  newValue = theediter.options(theediter.selectedIndex).value;
                }
                else{ //当<option>为空时
                   //theediter.selectedIndex = 0;
                   newText = "";
                   newValue = "";
                }
            }
            //新旧值比较
            if(newValue != oldValue){
                node.attributes.getNamedItem("newValue").value = newValue;
                node.attributes.getNamedItem("modified").value = "true";
                node.text = newText;
                if(myStatus == "INSERTED")
                    node.attributes.getNamedItem("value").value = newValue;
                flag = true;
            }
            
        }
        //修改对应数据,不再使用xslt来刷新窗体
        for(var i=1;i<this.currentSelectedRow.cells.length;i++){          
            var colIndex = parseInt(this.currentSelectedRow.cells(i).index)-1;      
            this.currentSelectedRow.cells(i).innerText = selectedDataObjects[0].childNodes[colIndex].text +" ";
        }
        //最后判断DataObject的状态
        if( flag && myStatus != "INSERTED")
            selectedDataObjects[0].attributes.getNamedItem("status").value = "UPDATED";
                 
        //重新解析，刷新
        //this.msxslt();
         //增加保存之后的监听事件
        this.dwevent.trigger(this.dwevent.AFTER_SAVE_POPWIN);
        return true;
    }
}
//查询按钮点击事件响应函数
function DW_query(){
    this.queryWin();
}
//保存按钮点击事件响应函数
function DW_save(){

    //触发事件
    if(!this.dwevent.trigger(this.dwevent.BEFOR_SAVE)) return;
   
    //检查已修改数据的合法性，并保存
    if(!this.checkModifyInfo()) return;
    var eSrcObject = event.srcElement;

    var ret = dwManager.saveMultiDW(new Array(this.getName()),eSrcObject.boControllerName,eSrcObject.boControllerMethod,eSrcObject.actionName,eSrcObject.actionMethod);
    this.currentSelectedRow = null;
    //触发事件
    this.dwevent.trigger(this.dwevent.AFTER_SAVE);
    return ret;

}
//普通查询条件窗口查询按钮的OnClick事件响应函数
function DW_query_onclick(){
    var queryBtn = this.nameRule.getQueryButton();
    
    if(!this.assQueryCondition(document)) return false;
    var queryBtn = document.all(this.nameRule.getQueryButtonName());
    dwManager.getDW(this.name).setType("ONE_SELECT");
    dwManager.getDW(this.name).msxslt();
    //执行查询
    this.exeQuery(queryBtn.actionMethod,queryBtn.boControllerName,queryBtn.boControllerMethod,queryBtn.actionName);
    return true;
 }

//弹出式查询条件窗口查询按钮的OnClick事件响应函数
function DW_querywin_query_onclick(doc){

    //组装查询条件  
    if(!this.assQueryCondition(doc)) return false; 
    var queryBtn = document.all(this.nameRule.getQueryButtonName());
    //执行查询
    this.exeQuery(queryBtn.actionMethod,queryBtn.boControllerName,queryBtn.boControllerMethod,queryBtn.actionName);
    return true;
}
//组装查询条件
function DW_assQueryCondition(doc){
    var filterNodes = this.getXMLDom().selectNodes("/dataWindow/filters/filter");
    var filterObj;
    var value;
    var operatorObj,operator;
    //首先清理一下上次提交时产生的参数(这是必须的)
    dwManager.clearAllParameters();
    
    for(var i=0; i < filterNodes.length; i++){

        operator = filterNodes(i).attributes.getNamedItem("operator").value;
      if(operator=="*"){
            var operateValue = filterNodes(i).attributes.getNamedItem("operateValue").value;
            this.addAttribute(filterNodes(i),"operator",operateValue);
        }
        filterObj = doc.all(this.nameRule.getQueryConditionEditerBegin() + filterNodes(i).attributes.getNamedItem("index").value);
        if(filterObj == null) continue;
        //检查数据
         try{
                if(!eapObjsMgr.onvalidate(filterObj)){
                    filterObj.focus();                    
                    return false;
                }
            }catch(e){}
        //赋值
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
//执行查询
function DW_exeQuery(actionMethod,boControllerName,boControllerMethod,actionName){

    //触发事件
    if(!this.dwevent.trigger(this.dwevent.BEFOR_QUERY)) return;

    
    var filters = this.getXMLDom().selectSingleNode("/dataWindow/filters");
    var dwquery = this.nameRule.getQuery();
    dwquery.value = filters.xml;
    //调用管理器的方法
    var postParameter = getAlldata(findObj(unieap.FORM_NAME));
    postParameter += "&dwName="+this.getName();
    if(actionMethod == null || actionMethod == "undefined" || actionMethod == "")
        actionMethod = "query";
    var result = dwManager.executeRequest(postParameter,actionMethod,boControllerName,boControllerMethod,actionName);
    //调用统一的结果处理函数
    commDealResult(result);

    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"isEmptyOnCreate","false");
    //触发事件
    this.dwevent.trigger(this.dwevent.AFTER_QUERY);


}
/**
 *@description 列表头checkBox的OnClick事件响应函数
 *@param checkBoxObj checkbox对象
 *@modified by 2006-01-06
 *@remark 不再刷新页面,只改变被选中行的状态
 */
function DW_checkBoxOnclick(checkBoxObj){
    
    //触发事件
    if(!this.dwevent.trigger(this.dwevent.BEFOR_CHECK)) return; 
    
    //选中:
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
    //取消选中:
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
	        //检查已修改数据的合法性,并保存(只有quick和grid编辑情况下需判断)
	        if(this.getType()=="QUICK_EDIT" || this.getType()=="GRID_EDIT"){
		        if(!this.checkModifyInfo()){
		            checkBoxObj.checked = true;
		            return;
		        }
	            //静态页面显示
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
    //触发事件
    this.dwevent.trigger(this.dwevent.AFTER_CHECK);
}
//上一条点击事件
function DW_preRowOnclick_freeEdit(){
    //检查已修改数据的合法性,并保存
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
 //下一条点击事件
function DW_nextRowOnclick_freeEdit(){
    //检查已修改数据的合法性,并保存
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
/* ========================= 数据窗口行操作方法定义 ============================ */
// 增加一条记录
function DW_addRow(){
	//增加操作之前的监听
    if(!this.dwevent.trigger(this.dwevent.BEFOR_ADD)) return; 
    
    //指定当前操作：增加    
    this.crtOperate = "ADD";
    //选中checkbox
    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow"),"checkBoxStatus","true");
    //直接在数据窗口中增加一行（即一个DataObj对象）
    
    if(this.getType() == "GRID_EDIT" || this.getType() == "QUICK_EDIT" || this.getType() == "FREE_EDIT"||this.getType() == "GRID_EDIT_ROOT"){
        //检查已修改数据的合法性,并保存
        if(!this.checkModifyInfo()) return;

        var newRow = this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj").cloneNode(true);
        var index = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj").length + 1;       
        this.addAttribute(newRow,"index",index);
        this.addAttribute(newRow,"templateFlag","false");
       
        this.setDefaultValue(newRow);//默认值         
        this.getXMLDom().selectSingleNode("/dataWindow/dataObjs").appendChild(newRow);     
        this.crtDOIndex = parseInt(index,10);
        this.crtCellIndex = 1;        
        //取消选中其他行
        this.currentSelectedRow = null;
        var nodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
        for(var i=0; i < nodes.length; i++)
            nodes(i).attributes.getNamedItem("selected").value = "false";
        newRow.attributes.getNamedItem("selected").value = "true";
        if(this.getType() == "FREE_EDIT"){
            this.afterMsxslt_freeEdit();
        }
        else{
            //重新解析，刷新
            this.msxslt();

        }
        this.dwevent.trigger(this.dwevent.AFTER_ADD);
        return;
    }
    if(this.getType() == "POP_EDIT"){
        this.popWin();             //打开操作窗口
    }
	this.dwevent.trigger(this.dwevent.AFTER_ADD);
}
/**
 *@description 删除选中的记录
 *@modified by 2005-01-06
 *@remark 设置currentSelectedRow所指向的行对象为空
 */
function DW_deleteSelectedRow(){
    //增加删除操作之前的监听
    if(!this.dwevent.trigger(this.dwevent.BEFOR_DELETE)) return; 
    
    //指定当前操作：删除
    this.crtOperate = "DEL";

    //1.获取选中的DataObj对象集合
    var arr = this.getSelectedDataObjs();
    if(arr.length == 0){
        alert("请选择您要删除的记录!");
        return;
    }
    //2.置删除标志、取消选择
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
    //重新解析，刷新
    this.msxslt();
    this.currentSelectedRow = null;
    //增加删除操作之后的监听
    this.dwevent.trigger(this.dwevent.AFTER_DELETE);
}
/**
 *@description 修改选中的记录（最后一条）
 *@param isAlert  在没有选择行的情况下，是否提示(true/空: 是,false：否)
 *@return true/false
 *@modified by 2006-01-06
 *@remark 不再刷新整个页面，只需修改选中行置成只读状态
 *@flaw 合并单元格时不能正确显示
 */
function DW_modifySelectedRow(isAlert){
    if(!this.dwevent.trigger(this.dwevent.BEFOR_UPDATE)) return; 

    var lastRow = this.getLastSelectedRow();
    if(lastRow == null){
        if(isAlert == null || isAlert)
            alert("请选择您要修改的记录!");
        return true;
    }
    //指定当前操作：修改
    this.crtOperate = "MODIFY";
    //QUICK_EDIT、GRID_EDIT类型，把选中行的值赋给编辑器(命名规则: editer_"dwName"_"index"
    if(this.getType() == "QUICK_EDIT" || this.getType() == "GRID_EDIT"||this.getType() == "GRID_EDIT_ROOT"){
        var dataObjArr = this.getSelectedDataObjs();
        var dataObj = dataObjArr[0];
        if(!this.modifyDOFromEditer(dataObj)) return false;
        //把行聚焦、列聚焦取消
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

// 选中某一行
// dataObjIndex dataObj的index
// isMultiSelect 是否多选  否(false/空)、是(true)
// selectKind    选择类别：选中(true/空)、取消选中(false)
function DW_selectOneRow(dataObjIndex,isMultiSelect,selectKind)
{
    
    //是否单选
    var isOneSelect = isMultiSelect == null || !isMultiSelect ? true : false;
    //选择结果
    var result = selectKind == null || selectKind ? true : false;
    var oppResult = !result;
    //选中XmlDom中的对应节点
    var dataObjNodes = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj");
    for(var i = 0; i < dataObjNodes.length ; i++)
        if(dataObjNodes(i).attributes.getNamedItem("index").value == ""+dataObjIndex){
              dataObjNodes(i).attributes.getNamedItem("selected").value = ""+result;
        }
        else if(isOneSelect) //单选
                dataObjNodes(i).attributes.getNamedItem("selected").value = ""+oppResult;
    //选中行选择器
    var selecter = this.nameRule.getRowSelecter();
    if(selecter != null){
        var rowcount = selecter.length;
        for(var j=0;j<rowcount;j++)
            if(selecter(j).value == ""+dataObjIndex)
                selecter(j).checked = result;
            else if(isOneSelect) //单选
                    selecter(j).checked = oppResult;
    }
    //改变背景颜色
    this.modifyBGColor();
}

//数据窗单元格编辑器失去光标时触发的函数，编辑器的名字是：editer_[dwname]_[colindex]
function DW_editer_onblur(obj){

    var father = obj.parentElement;
    var grandFather = father.parentElement;
    //修改后的value和text
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
    //修改数据岛对应节点的数据
    this.modifyOneCell(grandFather.pos-1,obj.colIndex-1,theValue,theText);

    //行聚焦、列聚焦
    this.crtDOIndex = grandFather.pos;

    //重新解析，刷新
    this.msxslt();
}
//编辑框的OnKeyDown事件响应函数
function DW_editer_onkeydown(obj){
    /*
    if(event.keyCode==13){
        dw_editer_onblur(obj,dw);
    }*/
}


/* ========================= 数据窗口辅助方法定义 ============================ */

/**
 *@description DataWindow预处理，包括代码列表转换、格式化显示数据, 给DataSet增加dsid属性
 *@param dw 数据窗口对象
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
 *@description 处理页面小计的合运算
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
 *@description 格式化精确度操作
 *@param index attribute属性index
 *@param total 小数
 *@remark 格式化小计的小数点位数（默认为2）
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
    //进行必要的初始化
    var xmlDom = this.getXMLDom(); 
    //new add
    if(!this.checkAttributeIndex(xmlDom.selectNodes("/dataWindow/attributes/attribute"))) return false;    
    if(!this.cutUnwantedHeader(xmlDom.selectNodes("/dataWindow/headers/header"))) return false;  
    var header_info = xmlDom.selectNodes("/dataWindow/headers/header");     
    if(header_info(0)==null){ alert("header中的任意一个attrIndex属性与attribute中的任意一个index都不符，请重新配置。"); return false;}

    this.preDealDataObj();
    
    //为/dataWindow/template/dataObj增加hiddened属性,insertedByJs属性
    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj"),"hiddened","false");
    this.addAttribute(this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj"),"insertedByJs","true");

    //调整编辑器的属性
    this.preDealEditer();
    //校验orderInfo/dataType属性
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
    //对于FREE_EDIT格式，如果没有数据则增加一行
    if(this.getType() == "FREE_EDIT" && this.getXMLDom().selectSingleNode("/dataWindow/dataObjs").childNodes.length == 0){
        var newRow = this.getXMLDom().selectSingleNode("/dataWindow/template/dataObj").cloneNode(true);
        this.addAttribute(newRow,"index","1");
        this.addAttribute(newRow,"templateFlag","false");
        newRow.attributes.getNamedItem("selected").value = "true";
        this.getXMLDom().selectSingleNode("/dataWindow/dataObjs").appendChild(newRow);
    }
    //调整isHidden属性
    var headerNodes = this.getXMLDom().selectNodes("/dataWindow/headers/header");
    for(var i=0; i < headerNodes.length;i++){
        if(headerNodes(i).attributes.getNamedItem("isHidden") == null){
            this.addAttribute(headerNodes(i),"isHidden","false");
        }
    }
    //完善width属性
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
                //调整时间类型的宽度
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
    //调整数据窗口的长宽
    if(this.isAutoSize) this.adjustDWSize();
    this.firstLoad = true;
    return true;
}

// 全部解析
function DW_fullMsxslt(){
    //////////////////////////////////////////
    /////////////// 调试各时间 ////////////////
    //////////////////////////////////////////
    ///////  var d = new Date();  ////////////
    if(this.getXMLDom().selectNodes("/dataWindow/dataObjs[@sumcols!='']").length>0)
    	this.preDealSumCalculate();
    ////调用统一的xml解析函数
    var sret = msxsltXML(this.getXML(),this.getHref());
    this.isCompleteXSLT = true;
    var topDiv =this.nameRule.getTopDiv();
    topDiv.innerHTML = sret;
    
    //////////////////////////////////////////
    /////////////// 调试各时间 ////////////////
    //////////////////////////////////////////
    ////// var d2 =  new Date(); /////////////
    ////// parent.left.four.value = d2 -d; ///
    //////////////////////////////////////////
   
    //调用统一的收尾方法
    this.afterMsxslt();
    
    //////////////////////////////////////////
    /////////////// 调试各时间 ////////////////
    //////////////////////////////////////////
    /////  var d3 =  new Date(); /////////////
    ///// parent.left.five.value = d3 -d2; ///
    //////////////////////////////////////////
}
// 利用XSL解析XML(部分解析)
function DW_msxslt()
{
    this.fullMsxslt();
}

/**
 *@description 把列表中的指定行改成可编辑状态
 *@param   dataObjIndex dataObj的索引(这里采用dataObj的索引而不采用row的索引，是因为排序给row的索引带来了不稳定性)
 *@param   cellIndex    指定获得焦点的cell
 *@modified by 2005-01-06
 *@remark 增加辅助按钮操作&列聚焦时比较消耗资源
 */
function DW_drawEditRow(dataObjIndex,cellIndex){
    try{
        if(dataObjIndex < 0 || cellIndex < 0) return;
        var myStatus = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj")(dataObjIndex -1).attributes.getNamedItem("status").value;
        var isHidden = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj")(dataObjIndex -1).attributes.getNamedItem("hiddened").value;
        //对于删除、取消的记录画编辑行
        if(myStatus == "CANCELED" || myStatus == "DELETED" || isHidden == "true") return;
        //转换成Row索引
        
        var rowIndex = this.cvtDOIndexToRowIndex(dataObjIndex);
        this.currentSelectedRow = this.nameRule.getBodyTable().rows(rowIndex);
        
        var row = this.currentSelectedRow;
        var id;
        var htmlediter;
        var obj,colIndex;
        var cellText;
        //var colIndexArr = new Array(); //记录已画列，避免同一个列多次画
        var editerObj;    
       
again:  for(var i=1;i<row.cells.length;i++){
            //在xsl解析时，预留了一个属性index
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
          
            cellText =  this.cutNBSP(row.cells(i).innerText,false,true); //去掉右端空格 
            id = this.nameRule.getDisplayEditerBegin() + colIndex;
            if(obj.tagName.toUpperCase() == "INPUT" || obj.tagName.toUpperCase() == "TEXTAREA"){
                
                htmlediter =this.makeInputHTML(obj,cellText,id);

            }else if(obj.tagName == "SELECT"){               
                htmlediter = this.makeSelectHTML(obj,id,this.cutNBSP(row.cells(i).innerText,false,true));
            }            
            
            /**  增加辅助按钮操作，消耗一定量的资源  **/            
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
        //设置列聚焦        
        id = this.nameRule.getDisplayEditerBegin()+this.cvtCellIndexToAttrIndex(row,cellIndex);
        var focusCell = document.all(id); 
        //对于列聚焦时比较消耗资源     
        if(focusCell) focusCell.focus();  
        this.alternateChange();      
    }
    catch(e){}
}
// 打开数据操作窗口
function DW_popWin(){
    //激活当前数据窗口
    dwManager.activeDW(this);
    //
    var height=400,width=400;
    var dwNode = this.getXMLDom().selectSingleNode("/dataWindow");
    var tmpH = dwNode.attributes.getNamedItem("popWinHeight");
    var tmpW = dwNode.attributes.getNamedItem("popWinWidth");
    if(tmpH != null && !isNaN(parseInt(tmpH.value,10))) height = parseInt(tmpH.value,10);
    if(tmpW != null && !isNaN(parseInt(tmpW.value,10))) width = parseInt(tmpW.value,10);
    showModalDialog(unieap.DW_OPEN_WIN_URL,window,"status:no;center:yes;help:no;minimize:no;maximize:no;border:thin;statusbar:no;dialogWidth:"+width+"px;dialogHeight:"+height+"px");
    this.setDocument(); //恢复父窗体的document
}
// 打开查询条件的录入窗口
function DW_queryWin(){

    //激活当前数据窗口
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
 *@description 数据操作窗口的OnLoad事件函数，完成所有界面元素构画工作
 *@param doc   数据操作窗口的Document对象
 *@param itemContainer 利用openOperateWin()打开的窗口中用来容纳所有元素的容器（层）
 */
function DW_popWinOnLoad(doc,itemContainer)
{
    itemContainer.innerHTML = msxsltXML(this.getXML(),this.getXMLObj().href+this.popWinXSL);
   
    var dwDataOneRecordTbl = doc.all("dwDataOneRecordTbl"); //一定要在生成itemContainer之后赋值
    var theForm = doc.all(unieap.FORM_NAME);
    var dataObjNode,editer,valueArr;
    
    //对于查询、修改操作，需要给每个元素赋值
    if(this.crtOperate == "ADD" || this.crtOperate == "MODIFY" || this.crtOperate == "QUERY")   {

        if(this.crtOperate == "ADD"){
            //考虑默认值
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
    //对于查询操作，只显示关闭按钮
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
    //触发事件并传递参数
//  this.dwevent.addArgument("popWinDocument",doc);
//  this.dwevent.trigger(this.dwevent.POPWIN_ONLOAD);
    this.setDocument(doc);
    this.alternateChange();
    
    
}
/**
 *@description 查询条件录入窗口的OnLoad事件函数，完成所有界面元素构画工作
 *@param doc   数据操作窗口的Document对象
 *@param itemContainer 利用openOperateWin()打开的窗口中用来容纳所有元素的容器（层）
 */
function DW_queryWinOnLoad(doc,itemContainer)
{
    itemContainer.innerHTML = msxsltXML(this.getXML(),this.getXMLObj().href+this.queryWinXSL);
    //alert(itemContainer.innerHTML);
}
//根据输入框模板动态生成一个输入框，
function DW_makeInputHTML(objInput,strText,id){
    var objClone = objInput.cloneNode(0);

    objClone.attributes("id").value=id;
    objClone.value = strText;    
    return objClone.outerHTML;
}

//根据选择框模板动态生成一个选择框 
function DW_makeSelectHTML(objSel,id,arg,isValue){
    var cloSel = objSel.cloneNode(1);
    cloSel.attributes("id").value=id;
    var len = cloSel.options.length;
    if(isValue == null || !isValue){ //减少对isValue的判断（只需判断一次）
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
//移动标题
function DW_moveTitle(){

    var layLeft = parseInt(this.nameRule.getBodyDiv().scrollLeft,10);
    this.nameRule.getHeaderTable().style.left = layLeft * -1 ;
}
//修改数据岛的dataSet中某一节点的值
function DW_modifyOneCell(dataObjIndex,colIndex,value,text){

    var theRow  = this.getXMLDom().selectNodes("/dataWindow/dataObjs/dataObj")(dataObjIndex);
    var theNode = theRow.childNodes(colIndex);

    //如果值变了，要修改岛内数据同时值节点的修改状态
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
//数据过滤
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
               (dataObjNode.attributes.getNamedItem("insertedByJs") != null &&   //把后台新增的、前台删除的行也提交到服务
                dataObjNode.attributes.getNamedItem("status").value == "CANCELED" )){
                dataSetNode.removeChild(dataObjNode);
            }
        }
    }

    //将过滤后的XML数据放入隐藏域内
    this.nameRule.getFilter().value = dataSetNode.xml;
    return true;
}
//获取编辑框的值和文本
function DW_getediterValue(editer){
    var arr = new Array();
    arr[0] = "";  //真正的值
    arr[1] = "";  //文本
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
            if(editer.options[0].text=="请选择"){               
               arr[1] = "";
            }else               
               arr[1] = editer.options[selectedIndex].text;
        }
    }
    return arr;
}
//根据text选择下拉框中的列
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
//根据value选择下拉框中的列
function DW_selectByValue(objSelect,value){

    for(var k=0;k<objSelect.options.length;k++)        
       if(objSelect.options[k].value == value){
            objSelect.selectedIndex = k;
            return;
       }  
    objSelect.selectedIndex = 0;
}
/**
 *@description 调背景颜色
 *@modified by 2006-01-06
 *@remark 可以根据unieap.selectedRowCss变量来选者是否需要改变选中行的样式表现
 */
function DW_modifyBGColor(){
    if(this.getType() != "FREE_EDIT" && this.getType() != "QUERY_CONDITION"){
        var dwBodyTbl = this.nameRule.getBodyTable();
        var className , childObj;
        for(var i=0;i<dwBodyTbl.rows.length;i++){
            if(dwBodyTbl.rows(i).cells(0).tagName=="TH") continue;

            //奇偶行、选中行的背景定义不一样
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
//修改DataObj中某一attribute的值
//参数： myStatus  DataObj的状态
//       attrNode   DataObj下的attribute节点
//       newValue   新值
//       newText    新文本
//返回： true表示改变了、false表示没改变
function DW_updateAttrValue(myStatus,attrNode,newValue,newText){
    //始终与老的值比较
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
//调整垂直、水平滚动条
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
//调整垂直、水平滚动条
function DW_adjustScrollByPosInDataSet(dataObjIndex,attrIndex){
    this.adjustScrollByPosInTable(this.cvtDOIndexToRowIndex(dataObjIndex),this.cvtAttrIndexToCellIndex(attrIndex));
}
//调整垂直、水平滚动条
function DW_adjustScrollByCombPos(dataObjIndex,cellIndex){
    this.adjustScrollByPosInTable(this.cvtDOIndexToRowIndex(dataObjIndex),cellIndex);
}
//根据分辨率调整数据窗口的长宽、编辑器的宽度
function DW_adjustDWSize(){
    this.isAutoSize = false;
    //数据窗口的长宽
    var standard = this.getScreenStandard();
    if( standard != "800*600" && standard != "1024*768") return;
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    if( screenWidth+"*"+screenHeight == standard) return;  //制作标准和实际标准相同时，不需要调整
    var baseWidth = parseInt(standard.substring(0,standard.indexOf("*")),10);
    var baseHeight = parseInt(standard.substring(standard.indexOf("*") + 1),10);

    //1.调整数据窗口长宽
    var width = this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("width").value;
    var height = this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("height").value;
    //需要调整
    if(!(width == null || width.length == 0 || height == null || height.length == 0 )){
        var newWidth = Math.round(screenWidth * parseInt(width,10) / baseWidth);
        var newHeight = Math.round(screenHeight * parseInt(height,10) / baseHeight);
        this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("width").value = ""+newWidth;
        this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("height").value = ""+newHeight;
    }
    //2.调整列的宽度
    var attrNodes = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute");
    for(var i=0; i<attrNodes.length;i++){
        width = attrNodes(i).attributes.getNamedItem("width").value;
        if(width == null || width.length == 0 ) continue;
        attrNodes(i).attributes.getNamedItem("width").value = ""+ Math.round(screenWidth * parseInt(width,10) / baseWidth);
    }
    //3.调整editer的宽度
    var editerNodes = this.getXMLDom().selectNodes("/dataWindow/editers/editer");
    for(var i=0; editerNodes !=null && i<editerNodes.length;i++){
        width = editerNodes(i).attributes.getNamedItem("width").value;
        if(width == null || width.length == 0 ) continue;
        editerNodes(i).attributes.getNamedItem("width").value = ""+ Math.round(screenWidth * parseInt(width,10) / baseWidth);
    }
    //4.调整header的宽度
    var headerNodes = this.getXMLDom().selectNodes("/dataWindow/headers/header");
    for(var i=0; headerNodes !=null && i<headerNodes.length;i++){
        width = headerNodes(i).attributes.getNamedItem("width").value;
        if(width == null || width.length == 0 ) continue;
        headerNodes(i).attributes.getNamedItem("width").value = ""+ Math.round(screenWidth * parseInt(width,10) / baseWidth);
    }
    //5.调整filter的宽度
    var filterNodes = this.getXMLDom().selectNodes("/dataWindow/filters/filter");
    for(var i=0; filterNodes !=null && i<filterNodes.length;i++){
        width = filterNodes(i).attributes.getNamedItem("width").value;
        if(width == null || width.length == 0 ) continue;
        filterNodes(i).attributes.getNamedItem("width").value = ""+ Math.round(screenWidth * parseInt(width,10) / baseWidth);
    }

}
//给editer预处理一些字段用来简化XSL的解析
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
    //为每个textarea指定cols属性，其值为colsInOneRow
    for(var i=0; i < counter; i++){
           //zhoujj modify for isBand
       if (editerNodes(i).attributes.getNamedItem("isBand")&&editerNodes(i).attributes.getNamedItem("isBand").value){
             //增加prompt属性
            if(editerNodes(i).attributes.getNamedItem("prompt") == null && attrNode){
                 this.addAttribute(editerNodes(i),"prompt",attrNode.attributes.getNamedItem("title").value);
                 this.addAttribute(attrNode,"prompt",attrNode.attributes.getNamedItem("title").value);//给attribute增加prompt属性
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
           //增加isImage属性
           isImage = attrNode.attributes.getNamedItem("isImage");
           if(isImage != null && isImage.value == "true"){
                this.addAttribute(editerNodes(i),"isImage","true");
                this.addAttribute(editersNode,"hasImage","true");
                continue;
           }else{
                this.addAttribute(editerNodes(i),"isImage","false");
           }         
           //增加prompt属性
           if(editerNodes(i).attributes.getNamedItem("prompt") == null){
                this.addAttribute(editerNodes(i),"prompt",attrNode.attributes.getNamedItem("title").value);
                this.addAttribute(attrNode,"prompt",attrNode.attributes.getNamedItem("title").value);//给attribute增加prompt属性
           }
           else
                this.addAttribute(attrNode,"prompt",editerNodes(i).attributes.getNamedItem("prompt"));//给attribute增加prompt属性
           if(attrNode.attributes.getNamedItem("type").value.toLowerCase() == "textarea")
                this.addAttribute(attrNode,"cols",colsInOneRow);         
    }
    //删除非法的editer节点
    for(var i=0; i < removedNodesArr.length; i++)
        this.getXMLDom().selectSingleNode("/dataWindow/editers").removeChild(removedNodesArr[i]);
    //////////////////////处理含有图片的情况 
    //情况非常复杂,所以平台不处理
    if(editersNode.attributes.getNamedItem("hasImage").value == "true"){        
        //不进行下去
        return;
    }  
    //////////////////////处理不含有图片的情况
    var cols ;
    var oldCurrentColInOneRow ,leftCol;
    var frontAttrNode;
    //剩下的editer都有效
    editerNodes = this.getXMLDom().selectNodes("/dataWindow/editers/editer");
    leftCol = colsInOneRow;
    for(var i=0; i < editerNodes.length; i++){
        //把用户自定义的colspan、isRowBegin、isRowEnd清除
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
          //对应的attribute节点
          attrNode = this.getAttrNodeByIndex(editerNodes(i).attributes.getNamedItem("attrIndex").value);
          //对应的上一个attribute节点
         
          temp = attrNode.attributes.getNamedItem("cols");
          if(temp != null) temp = temp.value;
          cols = temp == null || temp == "" ? 1 : (isNaN(parseInt(temp,10)) ? 1 : parseInt(temp,10));
          if(cols > colsInOneRow ) cols = colsInOneRow;  //限制最大值
  
          this.addAttribute(attrNode,"colspan",cols*2 - 1);
          //剩下的列刚好够用,置行结束标志
          currentColInOneRow+= cols;
          if(cols == leftCol){
              this.addAttribute(editerNodes(i),"isRowEnd","true");
              currentColInOneRow = 0;
          }
          //剩下的列不够用,置行结束标志
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
          //剩下的列够用
          else{
              if(currentColInOneRow  == colsInOneRow){
                  currentColInOneRow = 0;
                  this.addAttribute(editerNodes(i),"isRowEnd","true");
              }
          }
            
         } 
              
        //处理最后一个元素
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

//修改节点属性值,如果没有该属性就生成
function DW_addAttribute(node,attrName,attrValue){
    if(node.attributes.getNamedItem(attrName) == null ){
        var attr = this.getXMLDom().createAttribute(attrName);
        attr.text = ""+attrValue;
        node.attributes.setNamedItem(attr);
    }
    else
        node.attributes.getNamedItem(attrName).value = ""+attrValue;
}
// 获取编辑框的数据,并修改对应的DataObj
function DW_modifyDOFromEditer(dataObj){
    var editer = null;
    var index = null;
    var oldValue = null;
    var flag = false;
    var existFlag = false;  // add by hugh 2003-08-01
    var myStatus = dataObj.attributes.getNamedItem("status").value;
    var newValueArr = null;
    //校验数据
    for(var j=0; j < dataObj.childNodes.length; j++)
    {
        index = dataObj.childNodes(j).attributes.getNamedItem("index").value;
        editer = document.all(this.nameRule.getDisplayEditerBegin() + index);
        if(editer!= null && editer.tagName.toUpperCase() != "IMG"){
            //考虑有些editer没有使用htc控件
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
            if(dataObj.childNodes(j).attributes.getNamedItem("modified").value=="true") //防止看不见的列被修改，而获取不到该信息
               hiddenModify = true;
            continue;
        }
        existFlag = true;  // add by hugh 2003-08-01
        newValueArr = this.getediterValue(editer);
        //调用修改方法进行DataObj/attribute节点的值修改
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
//获取DataObj的数据,并修改对应的编辑框
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
/* ========================= 数据岛和显示列表中的位置转换方法定义 ==================== */
// 把DataObj的索引转换成列表中的行索引
function DW_cvtDOIndexToRowIndex(dataObjIndex){
    var tbl = this.nameRule.getBodyTable();
    if(tbl == null||parseInt(dataObjIndex,10)<0) return -100;
    for(var i=1; i<tbl.rows.length; i++)
        if(tbl.rows(i).pos == ""+dataObjIndex)
            return i;
    return -100;
}
// 把列表中的行索引转换成DataObj的索引
function DW_cvtRowIndexToDOIndex(rowIndex){
    //约定：利用XSL解析时为列表中的每行增加了pos属性，其值为对应DataO bj的index
    try{
        return parseInt(this.nameRule.getBodyTable().rows(rowIndex).pos,10);
    }
    catch(e){
        return -100;
    }

}
// 把DataObj/attribute/index转换成指定行中的列索引
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
// 把指定行中的列索引转换成DataObj/attribute/index
function DW_cvtCellIndexToAttrIndex(arg,cellIndex){
    try{
        var row = null;
        if(typeof(arg) == "object")
            row = arg;
        else
            row = this.ruleName.getBodyTable().rows(arg);
        //约定：利用XSL解析时为列表中的每单元格增加了index属性，其值为对应DataObj/attribut的index
        return parseInt(row.cells(cellIndex).index,10);
    }
    catch(e){
        return -100;
    }
}
// 从dataWindow/attributes获取指定index的attribute
function DW_getAttrNodeByIndex(index){
    var attrNodes = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute");
    for(var i=0; i < attrNodes.length; i ++)
        if(attrNodes(i).attributes.getNamedItem("index").value == ""+ index)
            return  attrNodes(i);
    return null;
}
// 从dataWindow/dataWindow/dataObjs/dataObj/attribute获取指定index的attribute
function DW_getDOAttrNodeByIndex(dataObj,index){
    var attrNodes = dataObj.childNodes;
    for(var i=0; i < attrNodes.length; i ++)
        if(attrNodes(i).attributes.getNamedItem("index").value == ""+ index)
            return  attrNodes(i);
    return null;
}
// 从dataWindow/attributes获取指定attrName的attribute
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
 *@description 检查修改的信息是否合法 
 */
function DW_checkModifyInfo(){  
    var dataObjArr = this.getSelectedDataObjs();     
    if(dataObjArr.length == 0) return true;    
    var dataObj = dataObjArr[0];
    if(!this.modifyDOFromEditer(dataObj)) return false;
    return true;
}
//是否自动清除
function DW_isAutoRemove(){
    var tmp = this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("isAutoRemove");
    if(tmp == null || tmp.value.toUpperCase() == "TRUE" ) return true;
    return false;
}
function DW_getDWIdValue(){
    var tmp = this.getXMLDom().selectSingleNode("/dataWindow").attributes.getNamedItem("dwid");
    return tmp.value;
}
//获取列的值(对于有option的列，返回翻译后的值)
//返回 arr[0] 表示值
//     arr[1] 表示翻译后的文本
function DW_getAttrValue(dataObjAttr){
    var arr = new Array();
    var isModified = dataObjAttr.attributes.getNamedItem("modified").value;
    if(isModified.toUpperCase() == "TRUE")
        arr[0] = dataObjAttr.attributes.getNamedItem("newValue").value;
    else
        arr[0] = dataObjAttr.attributes.getNamedItem("value").value;

    //翻译
    var index = dataObjAttr.attributes.getNamedItem("index").value;
    arr[1] = this. translateValue(index,arr[0]);
    return arr;
}
//翻译，放回翻译后的文本
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
//赋默认值，新增行时候调用
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
        //如果有option，进行翻译
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
//根据xml来选择选择器
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
    if(myCheckbox != null) myCheckbox(0).checked = checkboxFlag;//有两个复选框
}
/**
 *@description 替换数据岛中的数据
 *@return 无返回值
 *@modified by 2006-01-06
 *@remark 使得当前行currentSelectedRow指向空
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
        alert("开发人员注意，现在replaceNode()函数还不能处理type='"+type+"'的参数");
        return;
    }

}
function DW_reset(){
    if(this.getType() == "QUERY_CONDITION"){
        this.msxslt();
    }
}
/**
 *description 调整上一条和下一条按钮的状态和样式表现
 *无返回值
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
       alert("attribute属性不能为空，请重新配置。");       
       return false ;
   }
   var x,href;
   for(var i=0;i<Nodes.length;i++){
       href = Nodes(i).attributes.getNamedItem("href");
       if(href) this.addAttribute(Nodes(i),"href",unieap.WEB_APP_NAME+"/"+href.value);
       x = Nodes(i).attributes.getNamedItem("dataType").value.toUpperCase();             
       if(x=="FLOAT"||x=="DOUBLE"){         
          if(!Nodes(i).attributes.getNamedItem("precision"))
              this.addAttribute(Nodes(i),"precision","2"); //默认精确度是2
          else if(Nodes(i).attributes.getNamedItem("precision").value=="")
              Nodes(i).attributes.getNamedItem("precision").value = "2";
       }
       else if(x=="TIMESTAMP"){
          if(!Nodes(i).attributes.getNamedItem("dateformat")){ //默认日期格式是YYYY-MM
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
              alert("第 '"+(i+1)+"' 个attribute的'index'和"+"第 '"+(j+1)+"' 个attribute的'index'都等于 '"+Nodes(i).attributes.getNamedItem("index").value+"' "+"请重新配置attribute属性。");
              return false;            
          }  
     }
   }
   return true;  
}
function DW_cutUnwantedHeader(headerNodes){  
    if(headerNodes(0)==null){
       alert("header的属性不能为空,请重新配置。");
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
 *@description selTtextChange 是select组件与text组件之间一对一的联动事件
 *@param index_1为主动select组件的下标
 *@param index_2为从动text组件的下标（局部刷新的部分）
 *@param actionName所提交的action名字
 *@param actionMethod所提交的action方法
 *@param otherParameters传递其他的参数
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
 *@description selectOnChange 是下标为index_1的select组件的onchange事件
 *@param index_1为主动select组件的下标
 *@param index_2为从动select组件的下标（局部刷新的部分）
 *@param actionName所提交的action名字
 *@param actionMethod所提交的action方法
 *@param otherParameters传递其他的参数
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
 *@根据组件下标获取对应的值(newValue),如果选中的记录个数不为一则返回""
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
  *@description 首先要判断是否要进行联动动作（如果不存在onchange=selectOnChange OR selTextOnChange事件时不需要执行）
  */
 function DW_alternateChange(){
   var attributes = this.getXMLDom().selectNodes("/dataWindow/attributes/attribute"); 
   var headers = this.getXMLDom().selectNodes("/dataWindow/headers/header"); //只让那些可以显示的编辑（适于GRID_EDIT类型）
   var editers = this.getXMLDom().selectNodes("/dataWindow/editers/editer");
   if((editers==null||editers.length==0)&&this.getType()!= "GRID_EDIT") return;
   var temp = "";  
   var editFlag ;    
   for(var i=0;i<attributes.length;i++){ //能够显示的编辑组件才适于联动
     editFlag = false;  
     
     if(this.getType()== "GRID_EDIT"){         
         for(var j=0;j<headers.length;j++){//当为GRID_EDIT类型时
            if(attributes(i).getAttribute("index")==headers(j).getAttribute("attrIndex")){
                editFlag = true;
                break;
            }              
         }
     }
     else{
        for(var j=0;j<editers.length;j++){ //只用可编辑的时候才进行联动（GRID_EDIT类型除外）
          
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
                 eval(temp);  //执行联动的代码
             }          
                
     }
  }
   /*filter部分的     
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
  *@description 获得弹出窗体的document，以便父窗体里的js方法能够取得弹出窗体的某些对象。
  */
  function DW_setDocument(doc){
     if(doc==null)
        this.doc = document;
     else
        this.doc = doc;
  }
  /**
  *@description 去空格操作
  *@param arg 被操作字符串
  *@param left 左去空格（true）
  *@param right 右去空格（true）
  *@return 去掉空格的字符串
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
  *@description 刷新当前窗体refresh方法
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
   *@description 鼠标事件over、out and onlick
   *@modified by 2006-01-09
   */
  function DW_doMouseEvent(ele){
     if(!unieap.mouseEvent) return;
     if(event.type=="mouseover"){ 
        this.mouseEventRowCss = ele.className;
        ele.className = "NEUDwListRowBgColor4";
     }else if(event.type=="mouseout"){   //鼠标移开
         if(unieap.selectedRowCss){
	        var childObj =  ele.cells(0).children(0);                
	        if(childObj.checked){
	           ele.className = "NEUDwListRowBgColor3";
               return ;
            }
            //如果是多选时特殊处理
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