/**
 * @file globals.js
 * @desription ���ļ��������ȫ�ֵļ򵥱�����������������
 * @version 1.0 2003.4.10
 * @author shaosl@neusoft.com
 */

/**
 * UniEAP�࣬���Ӧ�������Ϣ
 */
function UniEAP(){
    this.WEB_APP_NAME  = "tdframework";
    this.FORM_NAME     = "EAPForm";
    this.DEBUG         = false;
    this.orderbyDB  = true;
    this.selectedRowCss= true; //ѡ���е�css����
    this.mouseEvent = false; //������Ч
    
    // for datawindow
    if(this.WEB_APP_NAME!="")
        this.WEB_APP_NAME="/"+this.WEB_APP_NAME;
    this.DW_OPEN_WIN_URL        =this.WEB_APP_NAME + "/DataWindowPopWinAction.do"; 
    this.DW_QUERY_WIN_URL       =this.WEB_APP_NAME + "/DataWindowQueryWinAction.do";  
    //���ؽ���ָ��
    this.resultSplit = "RESPONSE_SEPARATOR";
    //һ��������ռλ��
    this.bitsOfOneChinese = 2;     
    //�ֲ�ˢ�²�������Ŀ�ͷ��ʶ
    this.NOT_DEAL_INDENTIFIER = "<!-- unieapNotDeal -->"; 
    //���ݴ����Ƿ��Զ�������С
    this.isAutoResize = false;
    
}
var unieap = new UniEAP();
