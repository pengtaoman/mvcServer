/**
 * @file globals.js
 * @desription 本文件定义程序全局的简单变量，包括常量定义
 * @version 1.0 2003.4.10
 * @author shaosl@neusoft.com
 */

/**
 * UniEAP类，存放应用相关信息
 */
function UniEAP(){
    this.WEB_APP_NAME  = "tdframework";
    this.FORM_NAME     = "EAPForm";
    this.DEBUG         = false;
    this.orderbyDB  = true;
    this.selectedRowCss= true; //选中行的css设置
    this.mouseEvent = false; //鼠标的特效
    
    // for datawindow
    if(this.WEB_APP_NAME!="")
        this.WEB_APP_NAME="/"+this.WEB_APP_NAME;
    this.DW_OPEN_WIN_URL        =this.WEB_APP_NAME + "/DataWindowPopWinAction.do"; 
    this.DW_QUERY_WIN_URL       =this.WEB_APP_NAME + "/DataWindowQueryWinAction.do";  
    //返回结果分割符
    this.resultSplit = "RESPONSE_SEPARATOR";
    //一个汉字所占位数
    this.bitsOfOneChinese = 2;     
    //局部刷新不作处理的开头标识
    this.NOT_DEAL_INDENTIFIER = "<!-- unieapNotDeal -->"; 
    //数据窗口是否自动调整大小
    this.isAutoResize = false;
    
}
var unieap = new UniEAP();
