package org.apache.jsp.tdframework.mainframe;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.neusoft.tdframework.authorization.*;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.portal.config.TDConfigHelper;
import com.neusoft.tdframework.common.util.DESUtil;
import com.neusoft.unieap.config.EAPConfigHelper;
import com.neusoft.unieap.ria.config.RIAConfig;
import com.neusoft.unieap.service.org.Person;

public final class tab_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList(1);
    _jspx_dependants.add("/unieap/ria3.3/pages/config.jsp");
  }

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");

//left.jsp

String requestHead = request.getHeader("User-Agent");
if (requestHead.indexOf("Firefox") == -1) {
	out.println("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
}
String webpath = request.getContextPath();
    boolean basLog = TDConfigHelper.isBasLogPermitted();
AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
String userName = authorizeVO.getWorkNo();
StringBuffer paramStr = new StringBuffer();
String passWord = (String)request.getSession(true).getAttribute("decodedPass");
String d_flag = (String)session.getAttribute("double_flag");
String endpassword = DESUtil.encrypt(passWord);
paramStr.append("'STAFFNO=").append(userName).append("&PASSWORD=").append(endpassword).append("&double_flag=").append(d_flag).append("'");


      out.write("\r\n");
      out.write("<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n");
      out.write("\t<head>\r\n");
      out.write("\t\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\r\n");
      out.write("\t\t</meta>\r\n");
      out.write("\t\t<META HTTP-EQUIV=\"Pragma\" CONTENT=\"no-cache\"> \r\n");
      out.write("\t\t<META HTTP-EQUIV=\"Cache-Control\" CONTENT=\"no-cache\"> \r\n");
      out.write("\t\t<META HTTP-EQUIV=\"Expires\" CONTENT=\"0\">\r\n");
      out.write("\t\t<title>Tab样例</title>\r\n");
      out.write("        ");
out.println("<script type='text/javascript'>function getcontext(){var APP_PATH = '"+webpath+"'; return APP_PATH;}</script>");
      out.write("\r\n");
      out.write("\t\t");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");

	String path = request.getContextPath();
    String appPath = EAPConfigHelper.getApplicationContextPath(request);
    String cmpPath = request.getRequestURI(); //è·åé¡µé¢è·¯å¾å°å
    String themePath = path + "/unieap/ria3.3/unieap/themes/blue/css";
    boolean dialogRelogin= RIAConfig.DIALOGRELOGIN;//è®¾ç½®æ¯å¦ä½¿ç¨Dialogè¿è¡éæ°ç»å½
    boolean PUBLICATION = RIAConfig.PUBLICATION; //è®¾ç½®æ¯å¦
	boolean isEncrypt = RIAConfig.ENCRYPT;//æ¯å¦ä½¿ç¨å å¯
	Person person = (Person) session.getAttribute("userinfo");
	
	
	java.util.Properties envProp = (java.util.Properties)request.getSession().getServletContext().getAttribute("ENVCONF");
	//System.out.println("???????????????????????????????????    " + envProp.getProperty("td.jscompress.flag"));
	boolean isCompressJs = false;
	if ("1".equals(envProp.getProperty("td.usejscompress.flag"))) {
		isCompressJs = true;
	}

      out.write("\r\n");
      out.write("<style>\r\n");
      out.write("\tbody{\r\n");
      out.write("\t\tmargin : 0px;\r\n");
      out.write("\t\tvisibility : hidden;\r\n");
      out.write("\t}\r\n");
      out.write("</style>\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("\t//var beginTime = new Date();\r\n");
      out.write("\t//åå§åç³»ç»åæ°\r\n");
      out.write("\tunieap = {};\r\n");
      out.write("\tunieap.WEB_APP_NAME = \"");
      out.print(path);
      out.write("\";\r\n");
      out.write("\tunieap.appPath = \"");
      out.print(appPath);
      out.write("\";\r\n");
      out.write("\tunieap.cmpPath = \"");
      out.print(cmpPath);
      out.write("\"; //unieap.cmpPathç¨äºgridèªå®ä¹ä¸­\r\n");
      out.write("\tunieap.dialogRelogin=\"");
      out.print(dialogRelogin);
      out.write("\";\r\n");
      out.write("\tunieap.isEncrypt = \"");
      out.print(isEncrypt);
      out.write("\";\r\n");
      out.write("\tunieap.loginAccount = '");
      out.print((person!=null?person.getAccount():""));
      out.write("';\r\n");
      out.write("\tunieap.locale = \"zh_CN\";\r\n");
      out.write("</script>\r\n");
      out.write(" <!--  \r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
//=path
      out.write("/unieap/ria3.3/unieap/themes/base/css/unieap.css\" charset=\"utf-8\"></link>\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
//=themePath
      out.write('/');
//=PUBLICATION?"unieap-all.css":"unieap.css"
      out.write("\" ></link>\r\n");
      out.write("-->\r\n");
if(!isCompressJs) {//if(!PUBLICATION){ 
      out.write("\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/themes/base/css/unieap.css\" charset=\"utf-8\"></link>\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.print(themePath);
      out.write('/');
      out.print(PUBLICATION?"unieap-all.css":"unieap.css");
      out.write("\" ></link>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/dojo/dojo.js\" djConfig=\" parseOnLoad: true,locale:'zh'\" ></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/patch/dojo-patch.js\"  charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/dijit/dijit.js\"  charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/nls/application_zh_CN.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/global.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/cache.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/rpc.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/Form.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/FieldSet.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/TextBox.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/InlineEditBox.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/Textarea.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/NumberTextBox.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/TextBoxWithIcon.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/ComboBox.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/DateTextBox.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/ComboBoxTree.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/Button.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/DropDownButton.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/CheckBox.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/RadioButton.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/CheckBoxGroup.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/RadioButtonGroup.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/FileInput.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/tree/Tree.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/layout/Container.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/layout/TitlePane.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/layout/TabContainer.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/layout/AdaptiveContainer.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/layout/BorderContainer.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/layout/BorderPane.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/layout/HBoxContainer.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/layout/VBoxContainer.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/grid/Grid.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/core/lib.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/core/cell.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/Manager.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/core/rowbar.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/LayoutManager.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/core/builder.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/core/view.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/core/scroller.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/ViewManager.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/RowManager.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/BindingManager.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/MenuManager.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/SelectionManager.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/RowEditManager.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/PagingManager.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/ExportManager.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/menu/lockcell.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/menu/showcell.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/manager/Individual.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/core/toolbar.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/xgrid/Grid.js\" charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/dialog/DialogUtil.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/dialog/MessageBox.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/menu/Menu.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/Tooltip.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/form/RichTextEditor.js\"></script>\r\n");
} else{
      out.write("\r\n");
      out.write("<!-- \r\n");
      out.write("<script type=\"text/javascript\" src=\"");
//=path
      out.write("/unieap/ria3.3/dojo/dojo.js\" djConfig=\"parseOnLoad: true,locale:'zh'\" ></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
//=path
      out.write("/unieap/ria3.3/unieap/nls/application_zh_CN.js\"></script>\r\n");
      out.write("-->\r\n");
      out.write("<!--å°global.jsæä»¶ç¬ç«åºæ¥,ç¨æ¥å¯ä»¥å¨æ­¤å¤å¼å¥èªå·±çglobal.jsæä»¶ -->\r\n");
      out.write("<!-- \r\n");
      out.write("<script type=\"text/javascript\" src=\"");
//=path
      out.write("/unieap/ria3.3/unieap/global.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
//=path
      out.write("/unieap/ria3.3/unieap/unieap-all.js\" ></script>\r\n");
      out.write(" -->\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.print(themePath);
      out.write("/unieap-combo.css\" ></link>\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/themes/base/css/tooltip.css\" ></link>\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/themes/blue/css/tooltip.css\" ></link>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/dojo/dojo.js\" djConfig=\"parseOnLoad: true,locale:'zh'\" ></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/dijit/dijit.js\"  charset=\"utf-8\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/pages/unieap-combo.js\" charset=\"utf-8\"></script>\r\n");
      out.write("\r\n");
      out.write("\r\n");
} 
      out.write("\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("\t//var jsTime = new Date();\r\n");
      out.write("\tdojo.addOnLoad(function(){\r\n");
      out.write("\t\tdojo.style(document.body,\"visibility\",\"visible\");\r\n");
      out.write("\t\t//è®¾ç½®å®¹å¨çå¤§å°\r\n");
      out.write("\t\t//unieap.fireContainerResize();\t\r\n");
      out.write("\t\t//è§£å³å¨dojo.addOnLoadæ¹æ³éæ§ä»¶èç¦çé®é¢\r\n");
      out.write("\t\tunieap.blurWidget();\r\n");
      out.write("\t\t\r\n");
      out.write("\t});\r\n");
      out.write("\tunieap.session.dialogRelogin=");
      out.print(dialogRelogin);
      out.write(";\r\n");
      out.write("</script>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/unieap/ria3.3/unieap/tdextend/layout/TabContainer.js\"></script>\r\n");
      out.write("\t\t<contextPath value=\"");
      out.print(path);
      out.write("\"/>\r\n");
      out.write("\t\t<link href=\"");
      out.print(path);
      out.write("/common/dx20/css/crm6_tab.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n");
      out.write("\t\t<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/tdframework/mainframe/js/tab.js\"></script>\r\n");
      out.write("\t\t<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/tdframework/mainframe/js/menuNavigation.js\"></script>\r\n");
      out.write("\t\t<script>\r\n");
      out.write("\t\t//dojo.require(\"unieap.tdextend.layout.TabContainer\");\r\n");
      out.write("\t\tdojo.require(\"unieap.form.DropDownButton_crm\");\r\n");
      out.write("\t\t</script>\r\n");
      out.write("\t\t<script type=\"text/javascript\">\r\n");
      out.write("var APP_PATH='");
      out.print(path);
      out.write("';\r\n");
      out.write("var BAS_LOG=");
      out.print(basLog);
      out.write(";\r\n");
      out.write("\r\n");
      out.write("dojo.addOnLoad(function(){\r\n");
      out.write("\t/*\r\n");
      out.write("\t var ctabHeight = dojo.byId(\"createTab\").style.height;\r\n");
      out.write("\t alert(ctabHeight);\r\n");
      out.write("\t \r\n");
      out.write("\t  var pxIndex = ctabHeight.indexOf(\"px\");\r\n");
      out.write("\t if (pxIndex >= 0) {\r\n");
      out.write("\t\t ctabHeight = ctabHeight.substring(0,pxIndex);\r\n");
      out.write("\t }\r\n");
      out.write("\t\r\n");
      out.write("\t dojo.byId(\"createTab\").style.height = (parseInt(ctabHeight) + 5) + \"px\";\r\n");
      out.write("\t */\r\n");
      out.write("\t var sysNaviDiv = dojo.byId(\"sysNaviDiv\");\r\n");
      out.write("\t if (sysNaviDiv && sysNaviDiv != null) {\r\n");
      out.write("\t\t //do nothing\r\n");
      out.write("\t } else {\r\n");
      out.write("\t\t createTab();\r\n");
      out.write("\t\t parent.addFristPageTab();\r\n");
      out.write("\t }\r\n");
      out.write("\t getSysNavi();\r\n");
      out.write("\t\r\n");
      out.write("\t var iconNode = unieap.byId(\"comboxMenuNavi\").iconNode;\r\n");
      out.write("\t unieap.byId(\"comboxMenuNavi\").textValidate = false;\r\n");
      out.write("\t iconNode.onclick=function() {\r\n");
      out.write("\t\t searchMenu();\r\n");
      out.write("\t };\r\n");
      out.write("});\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("//可能跳转到其他应用的时候会用到   暂时保留\r\n");
      out.write("function showFirstPage(){\r\n");
      out.write("\t\r\n");
      out.write("\tif (sysId=='80'){\r\n");
      out.write("\t\ttop.main.location=APP_PATH+\"/home/homepage.do?systemId=\"+sysId;\r\n");
      out.write("\t\tparent.work_items.setNav(  [\"首页\"] );\r\n");
      out.write("\t\treturn;\r\n");
      out.write("\t}\r\n");
      out.write("\t\r\n");
      out.write("\tvar firstLeaf = MenuTree.getFirstLeaf();\r\n");
      out.write("\tif (firstLeaf){\r\n");
      out.write("\t\t$(firstLeaf.menuId).fireEvent(\"onclick\");\r\n");
      out.write("\t}\r\n");
      out.write("\r\n");
      out.write("\tvar defaultMenuId=\"defaultMenuId\";\r\n");
      out.write("\tvar idx=(document.location+\"\").indexOf(\"&defaultParameter&\");\r\n");
      out.write("\tif (idx>0) {\r\n");
      out.write("\t\tdefaultPara=(document.location+\"\").substring(idx);\r\n");
      out.write("\t}\r\n");
      out.write("\r\n");
      out.write("\tif (defaultMenuId && defaultMenuId.length>1){\r\n");
      out.write("\t\tMenuTree.showNode(defaultMenuId);\r\n");
      out.write("\t}\r\n");
      out.write("\treturn ;\r\n");
      out.write("\t\r\n");
      out.write("\tif (top.DefaultHomePageId) {\r\n");
      out.write("\t\tMenuTree.showNode(top.DefaultHomePageId);\r\n");
      out.write("\t}\r\n");
      out.write("\r\n");
      out.write("\tif (top.top_page.MenuBar.getCurrentTopMenu()!=null && FIRST_PAGE==top.top_page.MenuBar.getCurrentTopMenu().id){\r\n");
      out.write("\t\t//MenuTree.showNode(\"080AA\");\r\n");
      out.write("\t\tvar firstPageId=\"\";\r\n");
      out.write("\t\tvar mObj=document.getElementById(firstPageId);\r\n");
      out.write("\t\tif ( isValid(mObj) ) {\r\n");
      out.write("\t\t\tmObj.fireEvent(\"onclick\");\r\n");
      out.write("\t\t}\r\n");
      out.write("\t}else{\r\n");
      out.write("\t}\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("function dealLeaf(obj){\r\n");
      out.write("\tvar node=obj;\r\n");
      out.write("\t\r\n");
      out.write("\tvar menuName = node.getLabel();\r\n");
      out.write("\tvar menuUrl = node.getData()[\"pageLink\"];\r\n");
      out.write("\tvar menuId = node.getData()[\"menuId\"];\r\n");
      out.write("\tvar ifDiffContext = node.getData()[\"ifDiffContext\"];\r\n");
      out.write("\tvar systemId = node.getData()[\"systemId\"];\r\n");
      out.write("\tvar ifChild = node.getData()[\"ifChild\"];\r\n");
      out.write("\t\r\n");
      out.write("\tif (menuUrl.indexOf('?')<0){\r\n");
      out.write("\t\tmenuUrl=menuUrl+'?';\r\n");
      out.write("\t} else {\r\n");
      out.write("\t\tmenuUrl=menuUrl+'&';\r\n");
      out.write("\t}\r\n");
      out.write("\t\r\n");
      out.write("\tvar authPara = ");
      out.print(paramStr.toString());
      out.write(";\r\n");
      out.write("\t\r\n");
      out.write("\tvar pl=APP_PATH+\"/blank.html\";\r\n");
      out.write("\tvar mtd = node.getData()[\"openMethod\"];\r\n");
      out.write("\tif(BAS_LOG)\r\n");
      out.write("\t{\r\n");
      out.write("\t\tmtd = \"b\";\r\n");
      out.write("\t}\r\n");
      out.write("\r\n");
      out.write("\tmenuUrl=menuUrl + authPara;\r\n");
      out.write("\t//alert(\"\t000000  \" + menuUrl);\r\n");
      out.write("\tif(mtd==\"0\"){\r\n");
      out.write("\t\t/*\r\n");
      out.write("\t\tdocument.myform.favoriteName.value = menuObj.menuName;\r\n");
      out.write("\t\tdocument.myform.currentLocation.value = pl;\r\n");
      out.write("\t\tdocument.myform.menuId.value = menuObj.menuId;*/\r\n");
      out.write("\t\t//menuUrl = pl+defaultPara;   defaultPara   没找到使用的地方  一直是 空\r\n");
      out.write("\t\t//alert(\"\t1111111  \" + menuUrl);\r\n");
      out.write("\t}else if(mtd==\"1\"){\r\n");
      out.write("\t\twindow.open(menuUrl, \"\", \"\");\r\n");
      out.write("\t\treturn;\r\n");
      out.write("\t}else if(mtd==\"b\"){\r\n");
      out.write("\t\t//alert(\"\t22222  \" + menuUrl);\r\n");
      out.write("\t\tvar menuId = node.menuId;\r\n");
      out.write("\t\tvar systemId = systemId;\r\n");
      out.write("\t\t//var menuUrl = pl+defaultPara;   defaultPara   没找到使用的地方  一直是 空\r\n");
      out.write("\t\tvar tmpLocation = APP_PATH + \"/basLog.do?method=log&menuId=\"+menuId+\"&systemId=\"+systemId+\"&destUrl=\"+menuUrl;\r\n");
      out.write("\t\tdocument.myform.currentLocation.value = tmpLocation;\r\n");
      out.write("\t\tmenuUrl = APP_PATH + \"/basLog.do?method=log&menuId=\"+menuId+\"&systemId=\"+systemId+\"&destUrl=\"+destUrl;\r\n");
      out.write("\t}\r\n");
      out.write("\t//alert(\"\t33333  \" + menuUrl);\r\n");
      out.write("\treturn menuUrl;\r\n");
      out.write("}\r\n");
      out.write("</script>\r\n");
      out.write("\t</head>\r\n");
      out.write("\t<body class=\"unieap\" style=\"margin:0;padding:0;\">\r\n");
      out.write("\t<input type=\"hidden\" id=\"warningSearchMenu\" value='请输入搜索内容'>\r\n");
      out.write("\t\t\t\t\t\t<div tabPosition=\"right-h\" style=\"margin:0;padding:0;height:100%\">\r\n");
      out.write("\t\t\t\t\t\t\t\t<div id='getTabButton' style=\"margin:0;padding:0;\">\r\n");
      out.write("\t\t\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t\t\t</div>\r\n");
      out.write("\t<form name=\"myform\">\r\n");
      out.write("\t\t<input type=\"hidden\" name=\"systemId\"/>\r\n");
      out.write("\t\t<input type=\"hidden\" name=\"currentLocation\" />\t\r\n");
      out.write("\t\t<input type=\"hidden\" name=\"menuId\" value=\"\"/>\r\n");
      out.write("\t\t<input type=\"hidden\" name=\"favoriteName\" />\r\n");
      out.write("\t\t<input type=\"hidden\" name=\"SubSystemName\" value=\"\" />\r\n");
      out.write("   </form>\t\r\n");
      out.write("\t</body>\r\n");
      out.write("</html>\r\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
