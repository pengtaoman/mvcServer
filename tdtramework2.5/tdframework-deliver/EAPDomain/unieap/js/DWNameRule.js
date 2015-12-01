/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ 
+ 脚本描述： 数据窗口命名规则
+ 创    建： 胡光华 hugh@neusoft.com
+ 修改履历： 
+ 修改  人： 
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var DW_TOP_DIV_BEGIN = "dwDiv_";
var DW_XML_DIV_BEGIN = "dwXmlDiv_";
var DW_HEADER_DIV_BEGIN = "dw_header_div_";
var DW_HEADER_TABLE_BEGIN = "dw_header_table_";
var DW_BODY_DIV_BEGIN = "dw_body_div_";
var DW_BODY_TABLE_BEGIN = "dw_body_table_";
var DW_DWFILTER_BEGIN = "dwUpdateXml_";
var DW_DWQUERY_BEGIN = "dwQueryXml_";
var DW_DWID_BEGIN = "dwid_";
var DW_XMLID_BEGIN = "dwXml_";
var DW_ROW_SELECTOR_BEGIN = "dw_row_selector_";
var DW_HIDDEN_EDITER_BEGIN = "hiddenEditer_"
var DW_DISPLAY_EDITER_BEGIN = "editer_"
var DW_QUERYCONDITION_EDITER_BEGIN = "filter_";
var DW_QUERYCONDITION_OPERATOR_EDITER_BEGIN = "filter_operater_";
var DW_CHECKBOX_BEGIN = "checkbox_"

var DW_BUTTON_ADD_BEGIN = "btnAdd_";
var DW_BUTTON_MODIFY_BEGIN = "btnModify_";
var DW_BUTTON_DEL_BEGIN = "btnDel_";
var DW_BUTTON_QUERY_BEGIN = "btnQuery_";
var DW_BUTTON_SAVE_BEGIN = "btnSave_";
var DW_BUTTON_PREROW_BEGIN = "btnPreRow_";
var DW_BUTTON_NEXTROW_BEGIN = "btnNextRow_";
var DW_BUTTON_FIRSTPAGE_BEGIN = "btnFirstPage_";
var DW_BUTTON_PREPAGE_BEGIN = "btnPrePage_";
var DW_BUTTON_NEXTPAGE_BEGIN = "btnNextPage_";
var DW_BUTTON_LASTPAGE_BEGIN = "btnLastPage_";
var DW_BUTTON_CERTAINPAGE_BEGIN = "btnCertainPage_";
var DW_BUTTON_REFRESHPAGE_BEGIN = "btnRefreshPage_";



/**
*@description  规则对象构造函数
*@param arg  数据窗口对象或数据窗口对象名称
*/
function DW_NAME_RULE(arg)
{			
	this.dw;
	this.dwname;
	if(typeof(arg) == "object"){		
		this.dw = arg;
		this.dwname = this.dw.id.substring(DW_XMLID_BEGIN.length);
	}
	else{
		this.dwname = arg;			
		this.dw = document.all(DW_XMLID_BEGIN + this.dwname);
	}
	//methods
	this.getDWName = getDWName;
	this.getTopDivName = getTopDivName;
	this.getXmlDivName = getXmlDivName;
	this.getBodyTableName = getBodyTableName;
	this.getRowSelecterName = getRowSelecterName;
	this.getFilterName = getFilterName;	
	this.getBodyDivName = getBodyDivName;	
	this.getHeaderDivName = getHeaderDivName;
	this.getHeaderTableName = getHeaderTableName;
	this.getAddButtonName = getAddButtonName;
	this.getModifyButtonName = getModifyButtonName;
	this.getDelButtonName = getDelButtonName;
	this.getSaveButtonName = getSaveButtonName;
	this.getQueryButtonName = getQueryButtonName;
	this.getPreRowButtonName = getPreRowButtonName;
	this.getNextRowButtonName = getNextRowButtonName;
	this.getFirstPageButtonName = getFirstPageButtonName;
	this.getPrePageButtonName = getPrePageButtonName;
	this.getNextPageButtonName = getNextPageButtonName;
    this.getCertainPageButtonName = getCertainPageButtonName; 
	this.getRefreshPageButtonName = getRefreshPageButtonName;
	this.getLastPageButtonName = getLastPageButtonName;
	this.getQueryName = getQueryName;
	this.getDWIDName = getDWIDName;
	this.getHiddenEditerBegin = getHiddenEditerBegin;
	this.getDisplayEditerBegin = getDisplayEditerBegin;
	this.getQueryConditionEditerBegin = getQueryConditionEditerBegin;
	this.getQueryConditionOpeEditerBegin = getQueryConditionOpeEditerBegin;
	this.getCheckBoxName = getCheckBoxName;	
	
	
	this.getDW = getDW;
	this.getTopDiv = getTopDiv;
	this.getXmlDiv = getXmlDiv;
	this.getBodyTable = getBodyTable;
	this.getRowSelecter = getRowSelecter;
	this.getFilter = getFilter;		
	this.getBodyDiv = getBodyDiv;
	this.getHeaderDiv = getHeaderDiv;
	this.getHeaderTable = getHeaderTable;
	this.getAddButton = getAddButton;
	this.getModifyButton = getModifyButton;
	this.getDelButton = getDelButton;
	this.getQueryButton = getQueryButton;
	this.getSaveButton = getSaveButton;
	this.getPreRowButton = getPreRowButton;
	this.getNextRowButton = getNextRowButton;	
	this.getFirstPageButton = getFirstPageButton;
	this.getPrePageButton = getPrePageButton;
	this.getNextPageButton = getNextPageButton;
    this.getCertainPageButton = getCertainPageButton;
	this.getRefreshPageButton = getRefreshPageButton;
	this.getLastPageButton = getLastPageButton;
	this.getQuery = getQuery;
	this.getDWID = getDWID;
	this.getCheckBox = getCheckBox;
	
	
	//constant variables
	
}
//获取数据窗口对象
function getDW(){
	return this.dw;
}
//获取数据窗口名称
function getDWName(){
	return this.dwname;
}
//获取数据窗口中用来显示的DIV名称
function getTopDivName(){
	return DW_TOP_DIV_BEGIN+this.getDWName();
}
//获取数据窗口中用来显示的DIV
function getTopDiv(){	
	return document.all(this.getTopDivName());
}
//获取数据窗口中xml的DIV名称
function getXmlDivName(){
	return DW_XML_DIV_BEGIN+this.getDWName();
}
//获取数据窗口中xml的DIV
function getXmlDiv(){	
	return document.all(this.getXmlDivName());
}
this.getXmlDivName = getXmlDivName;
//获取数据窗口中用来显示的Table名称
function getBodyTableName(){
	return DW_BODY_TABLE_BEGIN+this.getDWName();
}
function getBodyDivName(){	
	return DW_BODY_DIV_BEGIN+this.getDWName();
}
function getHeaderDivName(){
	return DW_HEADER_DIV_BEGIN+this.getDWName();
}
//获取数据窗口中用来显示的Table
function getBodyTable(){
	return document.all(this.getBodyTableName());
}
//获取数据窗口中行选中器名称
function getRowSelecterName(){
	return DW_ROW_SELECTOR_BEGIN+this.getDWName();
}
function getHeaderTableName(){
	return DW_HEADER_TABLE_BEGIN+this.getDWName();
}
function getQueryName(){
	return DW_DWQUERY_BEGIN+this.getDWName();
}
function getDWIDName(){
	return DW_DWID_BEGIN+this.getDWName();
}
function getHiddenEditerBegin(){
	return DW_HIDDEN_EDITER_BEGIN + this.getDWName() + "_";
}
function getDisplayEditerBegin(){
	return DW_DISPLAY_EDITER_BEGIN + this.getDWName() + "_";
}
function getQueryConditionEditerBegin(){
	return DW_QUERYCONDITION_EDITER_BEGIN + this.getDWName() + "_";
}
function getQueryConditionOpeEditerBegin(){
	return DW_QUERYCONDITION_OPERATOR_EDITER_BEGIN + this.getDWName() + "_";
}
function getCheckBoxName(){
	return DW_CHECKBOX_BEGIN + this.getDWName();
}
		
//获取数据窗口中行选中器
function getRowSelecter(){
	return document.all(this.getRowSelecterName());
}
//获取过滤器名称
function getFilterName(){
	return DW_DWFILTER_BEGIN+this.getDWName();
}
//获取过滤器
function getFilter(){
	return document.all(this.getFilterName());
}
function getBodyDiv(){
	return document.all(this.getBodyDivName());
}
function getHeaderDiv(){
	return document.all(this.getHeaderDivName());
}
function getHeaderTable(){
	return document.all(this.getHeaderTableName());
}
function getQuery(){
	return document.all(this.getQueryName());
}
function getCheckBox(){
	return document.all(this.getCheckBoxName());
}

/////////////// 获取按钮 ////////////////////////////
function getAddButtonName(){
	return DW_BUTTON_ADD_BEGIN + this.getDWName();
}	
function getModifyButtonName(){
	return DW_BUTTON_MODIFY_BEGIN + this.getDWName();
}
function getDelButtonName(){
	return DW_BUTTON_DEL_BEGIN + this.getDWName();
}
function getSaveButtonName(){
	return DW_BUTTON_SAVE_BEGIN + this.getDWName();
}
function getQueryButtonName(){
	return DW_BUTTON_QUERY_BEGIN + this.getDWName();
}
	
function getPreRowButtonName(){
	return DW_BUTTON_PREROW_BEGIN + this.getDWName();
}
function getNextRowButtonName(){
	return DW_BUTTON_NEXTROW_BEGIN + this.getDWName();
}
function getFirstPageButtonName(){
	return DW_BUTTON_FIRSTPAGE_BEGIN + this.getDWName();
}
function getPrePageButtonName(){
	return DW_BUTTON_PREPAGE_BEGIN + this.getDWName();
}
function getNextPageButtonName(){
	return DW_BUTTON_NEXTPAGE_BEGIN + this.getDWName();
}
function getCertainPageButtonName(){
    return DW_BUTTON_CERTAINPAGE_BEGIN + this.getDWName();
}
function getRefreshPageButtonName(){
	return DW_BUTTON_REFRESHPAGE_BEGIN + this.getDWName();
}
function getLastPageButtonName(){
	return DW_BUTTON_LASTPAGE_BEGIN + this.getDWName();
}

function getAddButton(){
	return document.all(this.getAddButtonName());
}
function getModifyButton(){
	return document.all(this.getModifyButtonName());
}
function getDelButton(){
	return document.all(this.getDelButtonName());
}
function getSaveButton(){
	return document.all(this.getSaveButtonName());
}
function getQueryButton(){
	return document.all(this.getQueryButtonName());
}
function getDWID(){
	return document.all(this.getDWIDName());
}
function getPreRowButton(){
	return document.all(this.getPreRowButtonName());
}
function getNextRowButton(){
	return document.all(this.getNextRowButtonName());
}
//翻页
function getFirstPageButton(){
	return document.all(this.getFirstPageButtonName());
}
function getPrePageButton(){
	return document.all(this.getPrePageButtonName());
}
function getNextPageButton(){
	return document.all(this.getNextPageButtonName());
}
function getCertainPageButton(){
	return document.all(this.getCertainPageButtonName());
}
function getRefreshPageButton(){
	return document.all(this.getRefreshPageButtonName());
}
function getLastPageButton(){
	return document.all(this.getLastPageButtonName());
}