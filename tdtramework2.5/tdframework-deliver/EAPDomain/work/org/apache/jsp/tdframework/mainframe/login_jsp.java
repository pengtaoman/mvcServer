package org.apache.jsp.tdframework.mainframe;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.neusoft.unieap.config.EAPConfigHelper;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import java.util.Properties;
import com.neusoft.unieap.config.EAPConfigHelper;
import com.neusoft.unieap.ria.config.RIAConfig;
import com.neusoft.unieap.service.org.Person;

public final class login_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      response.setContentType("text/html; charset=GBK");
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

//String path=EAPConfigHelper.getContextPath(request);
String message = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsg"),"");
String messageDL = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsgDL"),"");
String helpUri = request.getContextPath() + "/tdframework/mainframe/setting.html";
java.util.Properties properties = (java.util.Properties)request.getSession().getServletContext().getAttribute("ENVCONF");
String mobileFlag = (String)properties.getProperty("td.usemobilevalidate.flag");
String mobileEffTime = (String)properties.getProperty("td.mobilevalidate.effective.time");
String mobiErr = NullProcessUtil.nvlToString((String) request.getAttribute("mobiErr"),"");

String isLogOut = (String)request.getParameter("logout");

      out.write("\r\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<html style=\"overflow-y:hidden;overflow-x:hidden;\">\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=GB2312\">\r\n");
      out.write("<title>欢迎登录 中国电信 BSS系统</title>\r\n");
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
      out.write("<link rel=\"stylesheet\" href=\"");
      out.print(path);
      out.write("/common/dx20/css/login_style.css\"\r\n");
      out.write("\ttype=\"text/css\" />\r\n");
      out.write("<link rel=\"stylesheet\" id=\"themeStyles\"\r\n");
      out.write("\thref=\"");
      out.print(path);
      out.write("/unieap/ria3.3/dijit/themes/claro/claro.css\">\r\n");
      out.write("\r\n");
      out.write("<script type=\"text/javascript\"\r\n");
      out.write("\tsrc=\"");
      out.print(path);
      out.write("/tdframework/mainframe/js/login.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("dojo.require(\"dojo.cookie\");\r\n");
      out.write("dojo.require(\"dijit.dijit\"); // optimize: load dijit layer\r\n");
      out.write("dojo.require(\"dijit.Tooltip\");\r\n");
      out.write("dojo.require(\"dijit.TooltipDialog\");\r\n");
      out.write("dojo.require(\"dijit.form.DropDownButton\");\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("dojo.addOnLoad(function(){\r\n");
      out.write("\r\n");
if ("1".equals(isLogOut)) {
      out.write("\r\n");
      out.write("    dojo.cookie(\"USER_LOG_TEMP_VALUE\", \"\");\r\n");
      out.write("\tdojo.cookie(\"USER_LOG_TEMP_PSW_VALUE\", \"\");\r\n");
      out.write("\tdojo.byId(\"j_username\").focus();\r\n");
      out.write("\treturn false;\r\n");
}
      out.write("\r\n");
      out.write("       dojo.byId(\"vCodeDivImg\").style.visibility='hidden';\r\n");
      out.write("       \r\n");
      out.write("       if (dojo.cookie(\"USER_LOG_TEMP_VALUE\") == null) {\r\n");
      out.write("           dojo.byId(\"j_username\").value=\"\";\r\n");
      out.write("       } else {\r\n");
      out.write("           dojo.byId(\"j_username\").value=dojo.cookie(\"USER_LOG_TEMP_VALUE\");\r\n");
      out.write("           //alert(\"cookkie  j_username: \" + dojo.byId(\"j_username\").value);\r\n");
      out.write("       }\r\n");
      out.write("       \r\n");
      out.write("       if (dojo.cookie(\"USER_LOG_TEMP_PSW_VALUE\") == null) {\r\n");
      out.write("           dojo.byId(\"j_password\").value=\"\";\r\n");
      out.write("       } else {\r\n");
      out.write("           dojo.byId(\"j_password\").value=dojo.cookie(\"USER_LOG_TEMP_PSW_VALUE\");\r\n");
      out.write("       }\r\n");
      out.write("\r\n");
      out.write("       if (dojo.cookie(\"USER_LOG_TEMP_VALUE\") != null && dojo.cookie(\"USER_LOG_TEMP_VALUE\") != \"\") {\r\n");
      out.write("\r\n");
      out.write("           try {\r\n");
      out.write("            var urla = APP_PATH + \"/login.do?method=getValidateForEmp&rnd=\"+Math.random()+\"&j_username=\"+dojo.byId(\"j_username\").value;\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\tdojo.xhrGet({\r\n");
      out.write("\t\t\t\t\t\turl : urla,\r\n");
      out.write("\t\t\t\t\t\tsync : true,\r\n");
      out.write("\t\t\t\t\t\tpreventCache:true,\r\n");
      out.write("\t\t\t\t\t\thandleAs:\"text\",\r\n");
      out.write("\t\t\t\t\t\tload : function(text, args) {\r\n");
      out.write("\t\t\t\t\t\t    var str02 = '<input class=\"proving\" type=\"text\" tabIndex=\"4\" name=\"mobile_code\" id=\"mobile_code\" onKeyDown=\"enterToSubmit(event)\">';\r\n");
      out.write("\t\t\t\t\t\t    var str03 = '<input type=\"button\" title=\"获取手机验证码\" class=\"button_mobile\" border=\"10\" id=\"mobileCode\" value=\"手机验证码\" onclick=\"genMobileCode(this)\" />';\r\n");
      out.write("\t\t\t\t\t\t\ttry {\r\n");
      out.write("\t\t\t\t\t\t\t\tif (text == 1){\r\n");
      out.write("\t\t\t\t\t\t\t    \tdojo.byId(\"vCodeDiv\").innerHTML = str02;\r\n");
      out.write("\t\t\t\t\t\t\t    \tdojo.byId(\"vCodeDivImg\").innerHTML = str03;\r\n");
      out.write("\t\t\t\t\t\t\t    \tdojo.byId(\"vCodeDivImg\").style.visibility='visible';\r\n");
      out.write("\t\t\t\t\t\t\t    \tdojo.byId(\"logonform\").action=APP_PATH + \"/j_unieap_security_check.do?isMobile=10012\";\r\n");
      out.write("\t\t\t\t\t\t\t    \tdojo.byId(\"mobile_code\").focus();\r\n");
      out.write("\t\t\t\t\t\t\t    \tisMobileText = 1;\r\n");
      out.write("\t\t\t\t\t\t\t    } else if (text == 0){\r\n");
      out.write("\t\t\t\t\t\t\t           dojo.byId(\"vCodeDiv\").innerHTML = \"\";\r\n");
      out.write("\t\t\t\t\t\t\t\t    \tdojo.byId(\"vCodeDivImg\").innerHTML = \"\";\r\n");
      out.write("\t\t\t\t\t\t\t\t    \tdojo.byId(\"vCodeDiv\").style.visibility='hidden';\r\n");
      out.write("\t\t\t\t\t\t\t\t    \tdojo.byId(\"vCodeDivImg\").style.visibility='hidden';\r\n");
      out.write("\t\t\t\t\t\t\t\t    \tdojo.byId(\"j_username\").focus();\r\n");
      out.write("\t\t\t\t\t\t\t\t    \tdojo.byId(\"logonform\").action=APP_PATH + \"/j_unieap_security_check.do\";\r\n");
      out.write("\t\t\t\t\t\t\t\t    \tisMobileText = 0;\r\n");
      out.write("\t\t\t\t\t\t\t\t    \treturn false;\r\n");
      out.write("\t\t\t\t\t\t\t    } else if (text == 3){\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.cookie(\"USER_LOG_TEMP_VALUE\", \"\");\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.byId(\"j_username\").value = \"\";\r\n");
      out.write("\t\t\t\t\t\t\t    \t \r\n");
      out.write("\t\t\t\t\t\t\t    \t alert(\"用户名错误，请正确填写。\");\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.byId(\"j_username\").focus();\r\n");
      out.write("\t\t\t\t\t\t\t    } else if (text == 4){\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.cookie(\"USER_LOG_TEMP_PSW_VALUE\", \"\");\r\n");
      out.write("\t\t\t\t\t\t\t    \t alert(\"密码错误，请正确填写。\");\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.byId(\"j_password\").focus();\r\n");
      out.write("\t\t\t\t\t\t\t    } else {\r\n");
      out.write("\t\t\t\t\t\t\t        dojo.byId(\"j_username\").focus();\r\n");
      out.write("\t\t\t\t\t\t\t    }\r\n");
      out.write("\t\t\t\t\t\t\t} catch (e) {\r\n");
      out.write("\t\t\t\t\t\t\t\talert(\"获取地市信息失败。\" + e);\r\n");
      out.write("\t\t\t\t\t\t\t\treturn false;\r\n");
      out.write("\t\t\t\t\t\t\t}\r\n");
      out.write("\t\t\t\t\t\t}\r\n");
      out.write("\t\t\t\t\t});\r\n");
      out.write("\t\t } catch(e) {\r\n");
      out.write("\t\t     alert(\"获取地市信息失败。\");\r\n");
      out.write("\t\t }\r\n");
      out.write("       } else {\r\n");
      out.write("    \t   dojo.byId(\"j_username\").focus();\r\n");
      out.write("       }\r\n");
      out.write("       \r\n");
      out.write("       init();\r\n");
      out.write("       \r\n");
      out.write("\t});\r\n");
      out.write("\r\n");
      out.write("function init(){\r\n");
      out.write("\t//var showAlert = document.getElementById(\"showAlert\").value;\r\n");
      out.write("\t//if(showAlert!=\"null\"){\r\n");
      out.write("\t\t//document.getElementById(\"alertMessage\").style.display=\"block\";\r\n");
      out.write("\t//}\r\n");
      out.write("\t");

	if (!messageDL.equals("")) {
	
      out.write("\r\n");
      out.write("//\tMessageBox.alert(\r\n");
      out.write("//\t\t\t{title:\"提示信息\",message:'");
      out.print(messageDL);
      out.write("'}\r\n");
      out.write("//\t\t);\r\n");
      out.write("    var msg = '");
      out.print(messageDL);
      out.write("';\r\n");
      out.write("\talert(msg);\r\n");
      out.write("\t");

	    if (mobiErr != null && ("1".equals(mobiErr) || "2".equals(mobiErr))) {
	
      out.write("\r\n");
      out.write("      try {\r\n");
      out.write("          dojo.byId(\"mobile_code\").style.display=\"block\";\r\n");
      out.write("          dojo.byId(\"mobile_code\").focus();\r\n");
      out.write("      } catch(e) { alert(e);}\r\n");

      }
	}

      out.write("\r\n");
      out.write("    \r\n");
      out.write("\t//focusUsername();\r\n");
      out.write(" }\r\n");
      out.write("   function fetchJcap(){\r\n");
      out.write("     document.getElementById(\"jcaptcha\").src=\"");
      out.print(request.getContextPath());
      out.write("/jcaptcha/\"+ Math.round(Math.random(100)*100000);\r\n");
      out.write(" }\r\n");
      out.write("   \r\n");
      out.write("\r\n");
      out.write("/*\r\n");
      out.write("\tfunction enter_key(evt) {\r\n");
      out.write("\t\tif (evt == null) {\r\n");
      out.write("\t\t\tevt = window.event;\r\n");
      out.write("\t\t}\r\n");
      out.write("\t\tvar obj = evt.srcElement ? evt.srcElement : evt.target;\r\n");
      out.write("\r\n");
      out.write("\t\tvar ele = document.forms[\"logonform\"].elements;\r\n");
      out.write("\t\t\r\n");
      out.write("\t\tif (ele[0].value==\"\") {\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t    ele[0].focus();\r\n");
      out.write("\t\t}\r\n");
      out.write("\t\tif (evt.keyCode == 13) {\r\n");
      out.write("\t\t\tif (obj.type != \"button\" && obj.type != \"checkbox\") {\r\n");
      out.write("\t\t\t\tfor ( var i = 0; i < ele.length; i++) {\r\n");
      out.write("\t\t\t\t\tif (ele[i].id == obj.id) {\r\n");
      out.write("\t\t\t\t\t\t\r\n");
      out.write("\t\t\t\t\t\tif (ele[i].type == \"password\") {\r\n");
      out.write("\t\t\t\t\t\t\t//alert(ele[i].value);\r\n");
      out.write("\t\t\t\t\t\t\tvar val = ele[i].value;\r\n");
      out.write("\t\t\t\t\t\t\tpassword = val;\r\n");
      out.write("\t\t\t\t\t\t}\r\n");
      out.write("\t\t\t\t\t    \t\r\n");
      out.write("\t\t\t\t\t\tele[i + 1].focus();\r\n");
      out.write("\t\t\t\t\t\tbreak;\r\n");
      out.write("\t\t\t\t\t}\r\n");
      out.write("\t\t\t\t\tele[0].focus();\r\n");
      out.write("\t\t\t\t}\r\n");
      out.write("\t\t\t}\r\n");
      out.write("\r\n");
      out.write("\t\t} \r\n");
      out.write("\t}\r\n");
      out.write("\t*/\r\n");
      out.write("\tfunction showDes(s) {\r\n");
      out.write("\t\tif (s==1) {\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\tdojo.byId(note_div).style.display=\"block\";\r\n");
      out.write("\t\t} else {\r\n");
      out.write("\t\t\tdojo.byId(note_div).style.display=\"none\";\r\n");
      out.write("\t\t}\r\n");
      out.write("\t\t\r\n");
      out.write("\t}\r\n");
      out.write("\t\r\n");
      out.write("    var APP_PATH = \"");
      out.print(request.getContextPath());
      out.write("\";\r\n");
      out.write("    \r\n");
      out.write("\tfunction genMobileCode(val) {\r\n");
      out.write("\t    if (dojo.byId(\"j_username\").value == \"\" || dojo.byId(\"j_password\").value == \"\") {\r\n");
      out.write("\t        alert(\"请填写用户名和密码\");\r\n");
      out.write("\t        return false;\r\n");
      out.write("\t    }\r\n");
      out.write("\t    \r\n");
      out.write("\t    var urla = APP_PATH + \"/login.do?method=genMobileCode&rnd=\"+Math.random()+\"&j_username=\"+dojo.byId(\"j_username\").value+\"&j_password=\"+dojo.byId(\"j_password\").value;\r\n");
      out.write("\t\tvar falseType = 0;\r\n");
      out.write("\t\ttry {\r\n");
      out.write("\t\t\tdojo.xhrGet({\r\n");
      out.write("\t\t\t\t\t\turl : urla,\r\n");
      out.write("\t\t\t\t\t\tsync : true,\r\n");
      out.write("\t\t\t\t\t\tpreventCache:　true,\r\n");
      out.write("\t\t\t\t\t\thandleAs:　\"text\",\r\n");
      out.write("\t\t\t\t\t\tload : function(text, args) {\r\n");
      out.write("\t\t\t\t\t\t\t    if (text == 3){\r\n");
      out.write("\t\t\t\t\t\t\t    \t alert('用户名错误，请正确填写。');\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.cookie(\"USER_LOG_TEMP_VALUE\", \"\");\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.byId(\"j_username\").value = \"\";\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.byId(\"j_username\").focus();\r\n");
      out.write("\t\t\t\t\t\t\t    \t falseType = 1;\r\n");
      out.write("\t\t\t\t\t\t\t    \t return false;\r\n");
      out.write("\t\t\t\t\t\t\t    } else if (text == 4){\r\n");
      out.write("\t\t\t\t\t\t\t    \t alert('密码错误，请正确填写。');\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.cookie(\"USER_LOG_TEMP_PSW_VALUE\", \"\");\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.byId(\"j_password\").value = \"\";\r\n");
      out.write("\t\t\t\t\t\t\t    \t dojo.byId(\"j_password\").focus();\r\n");
      out.write("\t\t\t\t\t\t\t    \t //MessageBox.alert( {title:\"提示信息\",message:'密码错误，请正确填写。'} );\r\n");
      out.write("\t\t\t\t\t\t\t    \t falseType = 1;\r\n");
      out.write("\t\t\t\t\t\t\t    \t return false;\r\n");
      out.write("\t\t\t\t\t\t\t    } else if (text == 10){\r\n");
      out.write("\t\t\t\t\t\t\t         dojo.cookie(\"USER_LOG_TEMP_PSW_VALUE\", dojo.byId(\"j_password\").value);\r\n");
      out.write("\t\t\t\t\t\t\t    \t alert('手机验证码已经发送，请注意接收.');\r\n");
      out.write("\t\t\t\t\t\t\t    \t return false;\r\n");
      out.write("\t\t\t\t\t\t\t    } else if (text == 11){\r\n");
      out.write("\t\t\t\t\t\t\t         dojo.cookie(\"USER_LOG_TEMP_PSW_VALUE\", dojo.byId(\"j_password\").value);\r\n");
      out.write("\t\t\t\t\t\t\t    \t alert('请等待一分钟后再获取手机验证码.');\r\n");
      out.write("\t\t\t\t\t\t\t    \t return false;\r\n");
      out.write("\t\t\t\t\t\t\t    } else if (text == 12){\r\n");
      out.write("\t\t\t\t\t\t\t         dojo.cookie(\"USER_LOG_TEMP_PSW_VALUE\", dojo.byId(\"j_password\").value);\r\n");
      out.write("\t\t\t\t\t\t\t    \t alert('该用户没有维护手机号码，请联系系统管理员维护！');\r\n");
      out.write("\t\t\t\t\t\t\t    \t falseType = 1;\r\n");
      out.write("\t\t\t\t\t\t\t    \t return false;\r\n");
      out.write("\t\t\t\t\t\t\t    }\r\n");
      out.write("\t\t\t\t\t\t}\r\n");
      out.write("\t\t\t\t\t});\r\n");
      out.write("\t\t } catch(e) {\r\n");
      out.write("\t\t     alert(\"获取手机验证码失败。\");\r\n");
      out.write("\t\t }\r\n");
      out.write("\t\t if (falseType == 0) {\r\n");
      out.write("\t\t     disableButton(val);\r\n");
      out.write("\t\t     countdown = 60;\r\n");
      out.write("\t\t }\r\n");
      out.write("\t}\r\n");
      out.write("\t\r\n");
      out.write("\tvar countdown=60;\r\n");
      out.write("\tvar time;\r\n");
      out.write("\tfunction disableButton(val) {\r\n");
      out.write("\t    if (countdown == 0) {\r\n");
      out.write("\t\t\tclearTimeout(time);\r\n");
      out.write("\t\t\tval.removeAttribute(\"disabled\");\r\n");
      out.write("\t\t\tval.value=\"手机验证码\";\r\n");
      out.write("\t\t} else {\r\n");
      out.write("\t\t\tval.setAttribute(\"disabled\", true);\r\n");
      out.write("\t\t\tval.value=\"请等待(\" + countdown + \")\";\r\n");
      out.write("\t\t\tcountdown--;\r\n");
      out.write("\t\t}\r\n");
      out.write("\t\ttime = setTimeout(function() {\r\n");
      out.write("          disableButton(val)\r\n");
      out.write("         },1000)\r\n");
      out.write("\t}\r\n");
      out.write("\t\r\n");
      out.write("\t\t\r\n");
      out.write("    function enterUserName() {\r\n");
      out.write("        var event1 = arguments[0]||window.event;\r\n");
      out.write("\t    var currentKey = event1.charCode||event1.keyCode; \r\n");
      out.write("        if (currentKey == 13){\r\n");
      out.write("    \t    dojo.byId(\"j_password\").focus();\r\n");
      out.write("        }\r\n");
      out.write("    }\r\n");
      out.write("    \r\n");
      out.write("    function enterPass() {\r\n");
      out.write("        var event1 = arguments[0]||window.event;\r\n");
      out.write("\t    var currentKey = event1.charCode||event1.keyCode; \r\n");
      out.write("        if (currentKey == 13){\r\n");
      out.write("        /*\r\n");
      out.write("           if (dojo.byId(\"jcaptcha_response\")) {\r\n");
      out.write("               dojo.byId(\"jcaptcha_response\").focus();\r\n");
      out.write("           } else if (dojo.byId(\"mobile_code\")) {\r\n");
      out.write("               dojo.byId(\"mobile_code\").focus();\r\n");
      out.write("           }\r\n");
      out.write("         */\r\n");
      out.write("         //inputTextBlur(event1);\r\n");
      out.write("          enterToTab();\r\n");
      out.write("        }\r\n");
      out.write("    }\r\n");
      out.write("</script>\r\n");
      out.write("</head>\r\n");
      out.write("\r\n");
      out.write("<body class=\"unieap\">\r\n");
      out.write("\r\n");
      out.write("<form name=\"logonform\" id=\"logonform\" method=\"post\"\r\n");
      out.write("\taction=\"");
      out.print(path);
      out.write("/j_unieap_security_check.do\">\r\n");
      out.write("<div id=\"index_box\">\r\n");
      out.write("<div id=\"exeDownLoad\" align=\"right\" class=\"claro\"\r\n");
      out.write("\tstyle=\"position: absolute; width: 100%\"><span><a\r\n");
      out.write("\thref=\"");
      out.print(path);
      out.write("/tdframework/CRM_Multi-User_Login.exe\" id=\"multiUser\"\r\n");
      out.write("\tonmouseover=\"showDes(1);\" onmouseout=\"showDes(0);\">允许多用户登录程序</a></span>\r\n");
      out.write("<div id=\"note_div\"\r\n");
      out.write("\tstyle=\"display: none; border: solid #769dc0 1px; background: #ffffff; width: 360px\">\r\n");
      out.write("<table width=\"350px\" height=\"100px\" border=\"0\" cellspacing=\"0\"\r\n");
      out.write("\tcellpadding=\"0\">\r\n");
      out.write("\t<tr>\r\n");
      out.write("\t\t<td align=left>如果要在本机使用多个用户同时登录系统，请点击运行“允许多用户登录程序”。 <br>\r\n");
      out.write("\t\t<br>\r\n");
      out.write("\t\t<font color=\"red\">(※请注意，在IE8下同一个浏览器的多个tab页仍然不能多用户同时登录。 <br>\r\n");
      out.write("\t\t可以通过多次打开浏览器程序的方式进行多用户同时登录。)</font></td>\r\n");
      out.write("\t</tr>\r\n");
      out.write("</table>\r\n");
      out.write("</div>\r\n");
      out.write("</div>\r\n");
      out.write("<div id=\"login\">\r\n");
      out.write("<table width=\"250px\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
      out.write("\t<tr>\r\n");
      out.write("\t\t<td colspan=\"2\" height=\"33px\" valign=\"bottom\"><input type=\"text\"\r\n");
      out.write("\t\t\tclass=\"default\" tabIndex=\"1\" name=\"j_username\" id=\"j_username\"\r\n");
      out.write("\t\t\tonfocus=\"\" onBlur=\"inputTextBlur(event)\"\r\n");
      out.write("\t\t\tonKeyDown=\"enterUserName(event)\"></td>\r\n");
      out.write("\t</tr>\r\n");
      out.write("\t<tr>\r\n");
      out.write("\t\t<td colspan=\"2\" height=\"33px\" valign=\"bottom\"><input\r\n");
      out.write("\t\t\ttype=\"password\" class=\"default\" tabIndex=\"2\" name=\"j_password\"\r\n");
      out.write("\t\t\tid=\"j_password\" onfocus=\"\" onBlur=\"inputTextBlur(event)\"\r\n");
      out.write("\t\t\tonKeyDown=\"enterPass(event)\"></td>\r\n");
      out.write("\t</tr>\r\n");
      out.write("\t<tr>\r\n");
      out.write("\t\t<td height=\"35\" width=\"140px\" text-align=\"left\" valign=\"bottom\">\r\n");
      out.write("\t\t<div id=\"vCodeDiv\"></div>\r\n");
      out.write("\t\t</td>\r\n");
      out.write("\t\t<td text-align=\"left;\">\r\n");
      out.write("\t\t<div id=\"vCodeDivImg\"></div>\r\n");
      out.write("\t\t</td>\r\n");
      out.write("\t\t");

          //if (!"1".equals(mobileFlag)) {
          
      out.write("\r\n");
      out.write("\t\t<!--  <td height=\"35\" width=\"140px\" text-align=\"left\" valign=\"bottom\">\r\n");
      out.write("\t\t          <div id=\"vCodeDiv\">\r\n");
      out.write("\t\t          \r\n");
      out.write("\t\t          </div>\r\n");
      out.write("\t\t          </td>\r\n");
      out.write("\t\t          <td text-align=\"left;\">\r\n");
      out.write("\t\t          <div id=\"vCodeDiv1\">\r\n");
      out.write("\t\t              <img width=\"77\" height=\"30\" border=\"0\" src=\"jcaptcha\" id=\"jcaptcha\" title=\"刷新验证码\"  onclick=\"fetchJcap()\"/>\r\n");
      out.write("\t\t          </div>\r\n");
      out.write("\t              </td>  -->\r\n");
      out.write("\r\n");
      out.write("\t\t");

         // } else {
          
      out.write("\r\n");
      out.write("\t\t<!--\r\n");
      out.write("          \t\t  <td height=\"35\" width=\"140px\" text-align=\"left\" valign=\"bottom\">\r\n");
      out.write("          \t\t  <div id=\"vMobileCodeDiv\">\r\n");
      out.write("\t\t          <input class=\"proving\" type=\"text\" tabIndex=\"3\" name=\"mobile_code\" id=\"mobile_code\" onKeyDown=\"enterToSubmit(event)\">\r\n");
      out.write("\t\t          </div>\r\n");
      out.write("\t\t          </td>\r\n");
      out.write("\t\t          <td text-align=\"left;\">\r\n");
      out.write("\t\t          <div id=\"vMobileCodeDiv1\">\r\n");
      out.write("\t\t          <input type=\"button\" title=\"获取手机验证码\" class=\"button_mobile\" border=\"10\" id=\"mobileCode\" value=\"手机验证码\" onclick=\"genMobileCode(this)\" />\r\n");
      out.write("\t\t          </div>\r\n");
      out.write("\t\t          </td>\r\n");
      out.write("\t\t          -->\r\n");
      out.write("\t\t");
 
          //}
          
      out.write("\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</tr>\r\n");
      out.write("\t<tr>\r\n");
      out.write("\t\t<td colspan=\"2\" align=\"left\" valign=\"bottom\" height=\"16px\"><input\r\n");
      out.write("\t\t\ttype=\"checkbox\" name=\"double_screen\" id=\"double_screen\"\r\n");
      out.write("\t\t\tstyle=\"margin-left: 30px\"> <label for=\"checkbox\"></label></td>\r\n");
      out.write("\t</tr>\r\n");
      out.write("\t<tr>\r\n");
      out.write("\t\t<td colspan=\"2\" align=\"center\" height=\"20px\">\r\n");
      out.write("\t\t<div id=\"alertMessage\">");
      out.print(message);
      out.write("</div>\r\n");
      out.write("\t\t</td>\r\n");
      out.write("\t</tr>\r\n");
      out.write("\t<tr>\r\n");
      out.write("\t\t<td colspan=\"2\" align=\"left\" class=\"company\"><input type=\"hidden\"\r\n");
      out.write("\t\t\tname=\"showAlert\" value=\"");
      out.print(message);
      out.write("\" /> <input name=\"B1\"\r\n");
      out.write("\t\t\ttype=\"button\" id=\"sub\" tabIndex=\"5\" class=\"button_login\" value=\"\"\r\n");
      out.write("\t\t\tonClick=\"doSubmit(event);\" /> &nbsp;&nbsp; <input name=\"B2\"\r\n");
      out.write("\t\t\ttype=\"reset\" class=\"button_reset\" value=\"\" onClick=\"reload();\" /></td>\r\n");
      out.write("\t</tr>\r\n");
      out.write("</table>\r\n");
      out.write("</div>\r\n");
      out.write("<div id=\"company\">东软集团股份有限公司 Neusoft Group Ltd.</div>\r\n");
      out.write("</div>\r\n");
      out.write("</form>\r\n");
      out.write("</body>\r\n");
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
