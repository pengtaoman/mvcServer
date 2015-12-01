package org.apache.jsp.tdframework.mainframe;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.neusoft.tdframework.authorization.*;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.DESUtil;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;
import com.neusoft.unieap.config.EAPConfigHelper;
import com.neusoft.unieap.ria.config.RIAConfig;
import com.neusoft.unieap.service.org.Person;

public final class ctg_005fmain_jsp extends org.apache.jasper.runtime.HttpJspBase
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

      out.write("<!DOCTYPE html>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");

	
    String remoteAuth = request.getContextPath() + "/tdframework/mainframe/RemoteAuthAJAX.jsp";

	//String navFrameUri = request.getContextPath() + "/navBar.do?method=common";	
	String navFrameUri = request.getContextPath() + "/tdframework/mainframe/nav_info.jsp";	
	String alertMsg = (String)session.getAttribute("alertMsg");
	session.removeAttribute("alertMsg");
	if(alertMsg == null){
		alertMsg = "";
	}	


	AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
	
	if (authorizeVO==null){
		out.println("登录信息发生错误");
		response.sendRedirect(request.getContextPath()+"/");	
		return;	
	}
	String workNo = authorizeVO.getWorkNo();
	String userName = authorizeVO.getEmployeeName();
	//String areaName = authorizeVO.getAreaName();
	String organName = authorizeVO.getOrganName();
	String cityCode =  authorizeVO.getCityCode();
	
	String kbsCity = "";
	if ("186".equals(cityCode)) {
		kbsCity = "510";
	} else if ("188".equals(cityCode)) {
		kbsCity = "511 ";
	}else if ("187".equals(cityCode)) {
		kbsCity = "512";
	}else if ("184".equals(cityCode)) {
		kbsCity = "513";
	}else if ("189".equals(cityCode)) {
		kbsCity = "514";
	}else if ("181".equals(cityCode)) {
		kbsCity = "515";
	}else if ("183".equals(cityCode)) {
		kbsCity = "516";
	}else if ("720".equals(cityCode)) {
		kbsCity = "518";
	}else if ("185".equals(cityCode)) {
		kbsCity = "519";
	}else if ("182".equals(cityCode)) {
		kbsCity = "510";
	}else if ("186".equals(cityCode)) {
		kbsCity = "520";
	}else if ("018".equals(cityCode)) {
		kbsCity = "521";
	}
	
	String kbsURL = "http://136.142.25.83:8082/csp/theThirdPartyLogin.jsp?staffid="+kbsCity+"&password=E99A18C428CB38D5F260853678922E03";
	
	if ("018".equals(cityCode)) {
		cityCode = "188";
	}
	//out.println("================ " + cityCode);
	if(authorizeVO.getDealerName()!=null && authorizeVO.getDealerName().length()>1)
			organName = authorizeVO.getOrganName() + "|"+ authorizeVO.getDealerName();
	else
			organName = authorizeVO.getOrganName();

	String webpath = request.getContextPath();
	
	String isTagFormat =request.getParameter("isTagFormat");
	boolean isTagShowing = true;
	if (isTagFormat != null && "0".equals(isTagFormat)) {
		isTagShowing = false;
	}
	
	String tabUrl = request.getContextPath() + "/tdframework/mainframe/tab.jsp";
	String crmMiddleUrl = request.getContextPath() + "/tdframework/mainframe/crm_middle.jsp";
	String topUrl = request.getContextPath() + "/tdframework/mainframe/ctg_top.jsp";
	String homeCityIfmUrl = request.getContextPath() + "/tdframework/mainframe/home_city.jsp";

	//以下是整合双屏功能的代码
	String d_flag = (String)session.getAttribute("double_flag");
	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	
	String userNameDs = authVO.getWorkNo();
	String passWordDs = (String)request.getSession(true).getAttribute("decodedPass");
	String endpasswordDES = DESUtil.encrypt(passWordDs);
	
	StringBuffer para = new StringBuffer();
    para.append("/assistsell/assistsell/common/d_screen.jsp?STAFFNO=").append(userNameDs).append("&PASSWORD=").append(endpasswordDES).append("&double_flag=").append(d_flag);
	
    String jsParaAutoPara = new StringBuilder("STAFFNO=").append(userNameDs).append("&PASSWORD=").append(endpasswordDES).append("&double_flag=").append(d_flag).toString();
    
    //以下是从application变量中取得间隔时间设置
    java.util.Properties pro = (java.util.Properties)application.getAttribute("ENVCONF");
    String warningTimeInterval = (String)pro.getProperty("note.warning.timeInterval");
    int warningTimeIntervalL = 60000;
    if (warningTimeInterval != null && !"".equals(warningTimeInterval.trim())) {
    	warningTimeIntervalL = Integer.parseInt(warningTimeInterval);
    }
    
	List appNames = (List)request.getSession().getAttribute("appNames");
	String params = "STAFFNO="+workNo+"&PASSWORD="+(String)request.getSession(true).getAttribute("EncriedPwd");

      out.write("\r\n");
      out.write("\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\r\n");
      out.write("<META HTTP-EQUIV=\"Pragma\" CONTENT=\"no-cache\"> \r\n");
      out.write("<META HTTP-EQUIV=\"Cache-Control\" CONTENT=\"no-cache\"> \r\n");
      out.write("<META HTTP-EQUIV=\"Expires\" CONTENT=\"0\">\r\n");
      out.write("<title>欢迎登录 中国电信 BSS系统</title>\r\n");
      out.write("<contextPath value=\"");
      out.print(webpath);
      out.write("\"/>\r\n");
      out.write("\r\n");
      out.write("<OBJECT id=\"max\" type=\"application/x-oleobject\" classid=\"clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11\">\r\n");
      out.write("<PARAM name=\"Command\" value=\"Maximize\">\r\n");
      out.write("</OBJECT>\r\n");
      out.write("\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("\r\n");
      out.write("window.onunload = onbeforeunload_handler;   \r\n");
      out.write("//window.onunload = onunload_handler;   \r\n");
      out.write("\r\n");
      out.write("var refreshUrls = [];\r\n");
      out.write("function onbeforeunload_handler() {\r\n");
      out.write("    //暂时不区分刷新动作\r\n");
      out.write("\t//if ((document.body.clientWidth-event.clientX)<20 && event.clientY<0 || event.altKey) {\r\n");
      out.write("\t\tfor (var i=0;i<refreshUrls.length ;i++ ){\r\n");
      out.write("            if(refreshUrls[i].indexOf(\"channel\")>0) {\r\n");
      out.write("                continue;\r\n");
      out.write("            } else {\r\n");
      out.write("\t\t\t    new Ajax.Request( refreshUrls[i],{onComplete: doNothing} );\r\n");
      out.write("            }\r\n");
      out.write("\t\t}\r\n");
      out.write("\t//}\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("function getJsParaAutoPara() {\r\n");
      out.write("\treturn \"");
      out.print(jsParaAutoPara);
      out.write("\";\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("window.moveTo(0, 0);\r\n");
      out.write("if (document.all) {\r\n");
      out.write("\ttop.window.resizeTo(screen.availWidth, screen.availHeight);\r\n");
      out.write("} else if (document.layers || document.getElementById) {\r\n");
      out.write("\twindow.resizeTo(window.screen.availWidth, window.screen.availHeight);\r\n");
      out.write("\tif (top.window.outerHeight < screen.availHeight\r\n");
      out.write("\t\t\t|| top.window.outerWidth < screen.availWidth) {\r\n");
      out.write("\t\ttop.window.outerHeight = screen.availHeight;\r\n");
      out.write("\t\ttop.window.outerWidth = screen.availWidth;\r\n");
      out.write("\t}\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("function resizeWindow() {\r\n");
      out.write("\r\n");
      out.write("\tif (navigator.userAgent.indexOf(\"Firefox\") > 0) {\r\n");
      out.write("\t\tdocument.getElementById(\"subframe\").width = screen.availWidth;\r\n");
      out.write("\t\t//alert(screen.availHeight);\r\n");
      out.write("\t\tdocument.getElementById(\"subframe\").height = getTdTabHeight();\r\n");
      out.write("\t} \r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("</script>\r\n");
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
      out.write('\r');
      out.write('\n');
   out.println("<script type='text/javascript'>function getcontext(){var APP_PATH = '"+webpath+"'; return APP_PATH;}</script>");
      out.write("\r\n");
      out.write("<link href=\"");
      out.print(path);
      out.write("/common/dx20/css/main_style.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n");
      out.write("<link href=\"");
      out.print(path);
      out.write("/common/dx20/css/crm6_main.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n");
      out.write("\r\n");
      out.write("<script src=\"");
      out.print(path);
      out.write("/common/js/jquery.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"");
      out.print(path);
      out.write("/tdframework/mainframe/js/date.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"");
      out.print(path);
      out.write("/tdframework/mainframe/js/note.js\" type=\"text/javascript\"></script>\r\n");
if(isTagShowing) {
      out.write("\r\n");
      out.write("<script src=\"");
      out.print(path);
      out.write("/tdframework/mainframe/js/ctg_main.js\" type=\"text/javascript\"></script>\r\n");
} else { 
      out.write("\r\n");
      out.write("<script src=\"");
      out.print(path);
      out.write("/tdframework/mainframe/js/ctg_main_middle.js\" type=\"text/javascript\"></script>\r\n");
} 
      out.write("\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/tdframework/mainframe/js/top_lt.js\" ></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/common/js/prototypeajax.js\" ></script>\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("var changeUserCityLst;\r\n");
      out.write("dojo.addOnLoad(function(){\r\n");
      out.write("\t resizeWindow();\r\n");
      out.write("\t dojo.byId(\"citySelContent\").display=\"none\";\r\n");
      out.write("\t var homeCity = \"");
      out.print(cityCode);
      out.write("\";\r\n");
      out.write("\t \r\n");
      out.write("\t dojo.rawXhrPost({\r\n");
      out.write("\t\t\turl : APP_PATH + \"/login.do?method=getPfNo\",\r\n");
      out.write("\t\t\t//parameters:{j_username: \"SUPER\", j_password: \"super0\"},\r\n");
      out.write("\t\t\tsync : false,\r\n");
      out.write("\t\t\tload : function(text, args) {\r\n");
      out.write("\t\t\t\ttry {\r\n");
      out.write("\t\t\t\t    var citylst = eval(\"(\" + text + \")\");\r\n");
      out.write("\t\t\t\t    //alert(citylst);\r\n");
      out.write("\t\t\t\t\tif (citylst && citylst != 0) {\r\n");
      out.write("\t\t\t\t\t    changeUserCityLst = citylst;\r\n");
      out.write("\t\t\t\t\t    changeUserCity(homeCity);\r\n");
      out.write("\t\t\t\t\t} else {\r\n");
      out.write("\t\t\t\t\t    selCity(homeCity);\r\n");
      out.write("\t\t\t\t\t    if (homeCity == \"188\") {\r\n");
      out.write("\t\t                    try {\r\n");
      out.write("\t                             changeCity(\"188\",\"石家庄\",\"1\");\r\n");
      out.write("\t\t                    } catch (e) {\r\n");
      out.write("\t\t\t                     changeCity(\"188\",\"石家庄\",\"1\");\r\n");
      out.write("\t\t                    }\r\n");
      out.write("\t                    }\r\n");
      out.write("\t\t\t\t\t}\r\n");
      out.write("\t\t\t\t} catch (e) {\r\n");
      out.write("\t\t\t\t\talert(\"初始化系统失败。\" + e);\r\n");
      out.write("\t\t\t\t}\r\n");
      out.write("\t\t\t}\r\n");
      out.write("\t\t});\r\n");
      out.write("\r\n");
      out.write("\t var theight = dojo.byId(\"mainTable\").clientHeight;\r\n");
      out.write("\t //alert(theight);\r\n");
      out.write("\t dojo.byId(\"tdTab\").height=theight-50-23;\r\n");
      out.write("\t showBox();\r\n");
      out.write("\t  \r\n");
      out.write("});\r\n");
      out.write("\r\n");
      out.write("var d_flag = \"");
      out.print(d_flag);
      out.write("\";\r\n");
      out.write("//广电测试暂时不要\r\n");
      out.write("//window.setInterval('showBox()',");
      out.print(warningTimeIntervalL);
      out.write(");\r\n");
      out.write("var int_value = window.setInterval('closeBox()',15000);\r\n");
      out.write("\r\n");
      out.write("function init()\r\n");
      out.write("{\r\n");
      out.write("\t//top.changeWinWidth();\r\n");
      out.write("\tif(d_flag==\"1\"){\r\n");
      out.write("\t\tvar dscreen=document.getElementById(\"dscreen\");\t\r\n");
      out.write("\t\tdscreen.style.display=\"inline\";\r\n");
      out.write("\t}\r\n");
      out.write("\t\r\n");
      out.write("\t");

	if (appNames != null) {
	    Iterator it = appNames.iterator();
	    int i=0;
	    while(it.hasNext()) {		
		    String uStr = (String)it.next();	
    
      out.write("\r\n");
      out.write("\t        refreshUrls[\"");
      out.print(i);
      out.write("\"] = \"");
      out.print(uStr);
      out.write("\";\r\n");
      out.write("    ");
      i++; 
        }
	}
    
      out.write("\t\r\n");
      out.write("    \r\n");
      out.write("    //added for liaoning 20121123\r\n");
      out.write("    var isShowWarning = executeRequest(\"login\",\"isShowWarning\");\r\n");
      out.write("\tif (isShowWarning == \"show\") {\r\n");
      out.write("\t    window.open(\"");
      out.print(path);
      out.write("/warning.jsp\",\"obj\",'height=400, width=600, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');\r\n");
      out.write("\t} else {\r\n");
      out.write("\t\t\r\n");
      out.write("\t}\r\n");
      out.write("\r\n");
      out.write("\t\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("function openKBS() {\r\n");
      out.write("\twindow.open(\"");
      out.print(kbsURL);
      out.write("\",\"obj\",'height=600, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=no, status=no');\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("function OpenDoubleScreen()\r\n");
      out.write("{\r\n");
      out.write("\ttry{\r\n");
      out.write("\t    windowflag.focus();\r\n");
      out.write("\t}catch(e){\r\n");
      out.write("\t\twindowflag=null;\r\n");
      out.write("\t}\r\n");
      out.write("\tif(windowflag){\r\n");
      out.write("\t    windowflag.close();\r\n");
      out.write("\t    windowflag=null;\r\n");
      out.write("\t}else{\r\n");
      out.write("\t\twindowflag=window.showModelessDialog(\"");
      out.print(para.toString());
      out.write("\",\"\",\"dialogWidth=120px;dialogHeight=498px;scroll:no;help:no;status:no;dialogLeft:720;dialogTop:210\");\r\n");
      out.write("\t}\r\n");
      out.write("}\r\n");
      out.write("</script>\r\n");
      out.write("\r\n");
      out.write("<style type=\"text/css\">\r\n");
      out.write(".cityName{\r\n");
      out.write("\tmargin:20px 0 0 200px;\r\n");
      out.write("\tposition:relative;\r\n");
      out.write("\twidth:50px;\r\n");
      out.write("}\r\n");
      out.write(".cityName a{\r\n");
      out.write("\twidth:60px;\r\n");
      out.write("\tcolor:#015880;\r\n");
      out.write("\tfont-size:12px;\r\n");
      out.write("}\r\n");
      out.write(".bubble_div{\r\n");
      out.write("\tposition: absolute;\r\n");
      out.write("\tz-index:100000;\r\n");
      out.write("\tright:5px;\r\n");
      out.write("\ttop:17px;\r\n");
      out.write("\toverflow:visible;\r\n");
      out.write("}\r\n");
      out.write(".b_tl{\r\n");
      out.write("\tbackground-image: url(images/b_tl.png);\r\n");
      out.write("\theight: 10px;\r\n");
      out.write("\twidth: 6px;\r\n");
      out.write("}\r\n");
      out.write(".b_t{\r\n");
      out.write("\tbackground-image: url(images/b_t.png);\r\n");
      out.write("\tbackground-repeat: no-repeat;\r\n");
      out.write("\tbackground-position: right;\r\n");
      out.write("}\r\n");
      out.write(".b_tr{\r\n");
      out.write("\tbackground-image: url(images/b_tr.png);\r\n");
      out.write("\theight: 10px;\r\n");
      out.write("\twidth: 6px;\r\n");
      out.write("}\r\n");
      out.write(".b_l{\r\n");
      out.write("\tbackground-image: url(images/b_l.png);\r\n");
      out.write("\tbackground-repeat:no-repeat;\r\n");
      out.write("\theight: 68px;\r\n");
      out.write("\twidth: 6px;\r\n");
      out.write("\tbackground-position: bottom;\r\n");
      out.write("}\r\n");
      out.write(".b_bl{\r\n");
      out.write("\tbackground-image: url(images/b_bl.png);\r\n");
      out.write("\theight: 7px;\r\n");
      out.write("\twidth: 6px;\r\n");
      out.write("}\r\n");
      out.write(".b_c{\r\n");
      out.write("\tbackground-color: #f6faff;\r\n");
      out.write("}\r\n");
      out.write(".b_b_l{\r\n");
      out.write("\tbackground-image: url(images/b_b_l.png);\r\n");
      out.write("\theight: 7px;\r\n");
      out.write("\twidth: 75px;\r\n");
      out.write("}\r\n");
      out.write(".b_b{\r\n");
      out.write("\tbackground-image: url(images/b_b.png);\r\n");
      out.write("}\r\n");
      out.write(".b_b_r{\r\n");
      out.write("\tbackground-image: url(images/b_b_r.png);\r\n");
      out.write("\theight: 7px;\r\n");
      out.write("\twidth: 75px;\r\n");
      out.write("}\r\n");
      out.write(".b_br{\r\n");
      out.write("\tbackground-image: url(images/b_br.png);\r\n");
      out.write("}\r\n");
      out.write(".b_r{\r\n");
      out.write("\tbackground-image: url(images/b_r.png);\r\n");
      out.write("\tbackground-repeat:no-repeat;\r\n");
      out.write("\theight: 68px;\r\n");
      out.write("\twidth: 6px;\r\n");
      out.write("\tbackground-position: bottom;\r\n");
      out.write("}\r\n");
      out.write(".b_c a{\r\n");
      out.write("\tcolor:#7c7c7c;\r\n");
      out.write("\tmargin:14px;\r\n");
      out.write("\twhite-space:nowrap;\r\n");
      out.write("\taligh:right;\r\n");
      out.write("}\r\n");
      out.write("</style>\r\n");
      out.write("\r\n");
      out.write("</head>\r\n");
      out.write("<body onLoad=\"startclock();initTab();queryFavorite();init();\" class=\"unieap\" style=\"overflow-y:hidden;overflow-x:hidden;\">\r\n");
      out.write("<table width=\"100%\" height=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" id=\"mainTable\">\r\n");
      out.write("  ");

  String requestHead = request.getHeader("User-Agent");
  if (requestHead.indexOf("Firefox") != -1) {
		out.println("<tr height='1px'><td></td></tr>");
	} 
  
      out.write("\r\n");
      out.write("  \r\n");
      out.write("  <tr>\r\n");
      out.write("    <td height=\"50px\"><table width=\"100%\" height=\"50px\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
      out.write("        <tr>\r\n");
      out.write("          <td rowspan=\"2\" id=\"header_logo\" align=right>\r\n");
      out.write("             <table>\r\n");
      out.write("             <tr><td aligh=right>\r\n");
      out.write("\t            <div class=\"cityName\" id=\"selfCity\" ><div id=\"selfCityDiv\"></div>\r\n");
      out.write("\t\t\t\t\t<div class=\"bubble_div\" id=\"citySelContent\" style=\"width:160px;display:none\" onmouseout=\"javascript:document.getElementById('citySelContent').style.display='none';\" onmouseover=\"javascript:document.getElementById('citySelContent').style.display='block';\">\r\n");
      out.write("\t\t\t\t\t\t<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"width: 160px; table-layout: fixed; word-wrap: break-word;\">\r\n");
      out.write("\t\t\t\t\t\t  <tr>\r\n");
      out.write("\t\t\t\t\t\t    <td class=\"b_tl\"></td>\r\n");
      out.write("\t\t\t\t\t\t    <td colspan=\"3\" class=\"b_t\"></td>\r\n");
      out.write("\t\t\t\t\t\t    <td class=\"b_tr\"></td>\r\n");
      out.write("\t\t\t\t\t\t  </tr>\r\n");
      out.write("\t\t\t\t\t\t  <tr>\r\n");
      out.write("\t\t\t\t\t\t   <td class=\"b_l\"></td>\r\n");
      out.write("\t\t\t\t\t\t    <td colspan=\"3\" class=\"b_c\" id=\"cityOption\"></td>\r\n");
      out.write("\t\t\t\t\t\t    <td class=\"b_r\"></td>\r\n");
      out.write("\t\t\t\t\t\t  </tr>\r\n");
      out.write("\t\t\t\t\t\t  <tr>\r\n");
      out.write("\t\t\t\t\t\t    <td class=\"b_bl\"></td>\r\n");
      out.write("\t\t\t\t\t\t    <td class=\"b_b_l\"></td>\r\n");
      out.write("\t\t\t\t\t\t    <td class=\"b_b\"></td>\r\n");
      out.write("\t\t\t\t\t\t    <td class=\"b_b_r\"></td>\r\n");
      out.write("\t\t\t\t\t\t    <td class=\"b_br\"></td>\r\n");
      out.write("\t\t\t\t\t\t  </tr>\r\n");
      out.write("\t\t\t\t\t\t</table>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t<td>\r\n");
      out.write("\t\t\t\t&nbsp;&nbsp;\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t</tr>\r\n");
      out.write("\t\t\t\t</table>\r\n");
      out.write("          </td>\r\n");
      out.write("          <td id=\"header_button\"><a href=\"javascript:openKBS();\"><img src=\"");
      out.print(path);
      out.write("/common/dx20/images/main/kbs.gif\" width=\"16\" height=\"16\" alt=\"知识库\"></a><a href=\"javascript:addFristPageTab();\"><img src=\"");
      out.print(path);
      out.write("/common/dx20/images/main/icon_home.gif\" width=\"16\" height=\"16\" alt=\"首页\"></a><a href=\"#\" onClick=\"relogin();return false;\"><img src=\"");
      out.print(path);
      out.write("/common/dx20/images/main/icon_relogin.gif\" width=\"14\" height=\"16\" alt=\"重新登录\"></a><a href=\"javascript:updatePassword();\"><img src=\"");
      out.print(path);
      out.write("/common/dx20/images/main/icon_edit.gif\" width=\"16\" height=\"16\" alt=\"配置\"></a><a href=\"javascript:doAddFavorite();\"><img src=\"");
      out.print(path);
      out.write("/common/dx20/images/main/icon_favori.gif\" width=\"15\" height=\"16\" alt=\"收藏\" ></a><a href=\"#\" onClick=\"help('");
      out.print(params );
      out.write("');return false;\"><img src=\"");
      out.print(path);
      out.write("/common/dx20/images/main/icon_help.gif\" width=\"16\" height=\"16\" alt=\"帮助\"></a>&nbsp;&nbsp;&nbsp;</td>\r\n");
      out.write("        </tr>\r\n");
      out.write("        <tr>\r\n");
      out.write("            <td id=\"header_favori\" nowarp><div id=\"favoriteDiv\" width=\"1px\" style=\"white-space:nowrap;\"></div></td>\r\n");
      out.write("        </tr>\r\n");
      out.write("      </table></td>\r\n");
      out.write("  </tr>\r\n");
      out.write("  <tr>\r\n");
      out.write("    <td id=\"tdTab\"><iframe id=\"subframe\" width=\"100%\" height=\"100%\" frameborder=\"0\" src=\"");
if(isTagShowing) { out.print(tabUrl);} else { out.print(crmMiddleUrl); } 
      out.write("\"  style=\"overflow-y:hidden;overflow-x:hidden;\"></iframe></td>\r\n");
      out.write("  </tr>\r\n");
      out.write("  <tr>\r\n");
      out.write("    <td height=\"23px\" id=\"footer\">\r\n");
      out.write("      <table width=\"100%\" height=\"23px\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
      out.write("        <tr>\r\n");
      out.write("          <td class=\"login_info\">您好：");
      out.print(organName );
      out.write(' ');
      out.print(userName );
      out.write("，欢迎登录！</td>\r\n");
      out.write("           <td width=\"23px\" id=\"dscreen\" style=\"display:none\"><input type=\"submit\" class=\"button_ds\" name=\"ds\" value=\"\" onMouseOver= \"this.className= 'button_ds_o' \" onMouseOut= \"this.className= 'button_ds' \" onMouseDown= \"this.className= 'button_ds_d' \" onMouseUp= \"this.className= 'button_ds_o'\" onclick=\"OpenDoubleScreen();\" ></td>\r\n");
      out.write("          ");


          if (requestHead.indexOf("Firefox") == -1) {
          
      out.write("\r\n");
      out.write("          <td width=\"23px\"><input type=\"button\" class=\"button_calculator\" name=\"calculator\" value=\"\" onMouseOver= \"this.className= 'button_calculator_o' \" onMouseOut= \"this.className= 'button_calculator' \" onMouseDown= \"this.className= 'button_calculator_d' \" onMouseUp= \"this.className= 'button_calculator_o';executeWindowsCmd('calc.exe');\"></td>\r\n");
      out.write("          <td width=\"23px\"><input type=\"button\" class=\"button_notepad\" name=\"notepad\" value=\"\" onMouseOver= \"this.className= 'button_notepad_o' \" onMouseOut= \"this.className= 'button_notepad' \" onMouseDown= \"this.className= 'button_notepad_d' \" onMouseUp= \"this.className= 'button_notepad_o'\" onclick=\"executeWindowsCmd('notepad.exe');\"></td>\r\n");
      out.write("          <td width=\"23px\"><input type=\"button\" class=\"button_calendar\" name=\"calendar\" value=\"\" onMouseOver= \"this.className= 'button_calendar_o' \" onMouseOut= \"this.className= 'button_calendar' \" onMouseDown= \"this.className= 'button_calendar_d' \" onMouseUp= \"this.className= 'button_calendar_o'\" onclick=\"executeWindowsCmd('rundll32.exe shell32.dll,Control_RunDLL timedate.cpl,,0');\"></td>\r\n");
      out.write("          ");

          }
          
      out.write("\r\n");
      out.write("          <td class=\"footer_date\"><FORM NAME='jsfrm'>\r\n");
      out.write("              <INPUT TYPE=\"text\" class=\"date_show\" NAME='face' size=27 value=''>\r\n");
      out.write("            </form></td>\r\n");
      out.write("        </tr>\r\n");
      out.write("      </table></td>\r\n");
      out.write("  </tr>\r\n");
      out.write("</table>\r\n");
      out.write("<!---->\r\n");
      out.write("<div id=\"note_div\" style=\"height:200px;align:right\">\r\n");
      out.write("  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
      out.write("    <tr>\r\n");
      out.write("      <td class=\"note_tl\"></td>\r\n");
      out.write("      <td class=\"note_t\"></td>\r\n");
      out.write("      <td class=\"note_tr\"></td>\r\n");
      out.write("    </tr>\r\n");
      out.write("    <tr>\r\n");
      out.write("      <td class=\"note_l\"></td>\r\n");
      out.write("      <td class=\"note_tc\">\r\n");
      out.write("        <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
      out.write("          <tr>\r\n");
      out.write("            <td class=\"note_tc_title\">公告信息</td>\r\n");
      out.write("            <td><a class=\"note_button\" onClick=\"closeBox()\"><img src=\"");
      out.print(path);
      out.write("/common/dx20/images/main/note/note_close.gif\" width=\"5\" height=\"5\" alt=\"关闭\"></a></td>\r\n");
      out.write("          </tr>\r\n");
      out.write("        </table>\r\n");
      out.write("        \r\n");
      out.write("        </td>\r\n");
      out.write("      <td class=\"note_r\"></td>\r\n");
      out.write("    </tr>\r\n");
      out.write("    <tr>\r\n");
      out.write("      <td class=\"note_l\"></td>\r\n");
      out.write("      <td class=\"note_c\"><div id=\"updiv\" style=\"OVERFLOW-Y:scroll;height:150px\">欢迎登录本系统！</div></td>\r\n");
      out.write("      <td class=\"note_r\"></td>\r\n");
      out.write("    </tr>\r\n");
      out.write("    <tr>\r\n");
      out.write("      <td class=\"note_bl\"></td>\r\n");
      out.write("      <td class=\"note_b\"></td>\r\n");
      out.write("      <td class=\"note_br\"></td>\r\n");
      out.write("    </tr>\r\n");
      out.write("  </table>\r\n");
      out.write("</div>\r\n");
      out.write("\r\n");
      out.write("<form name='favoForm' id='favoForm' method=\"post\" target=\"favoSub\">\r\n");
      out.write("<input type='hidden' id='operType' name='operType'>\r\n");
      out.write("<input type='hidden' id='menuId' name='menuId'>\r\n");
      out.write("<input type='hidden' id='systemId' name='systemId'>\r\n");
      out.write("<input type='hidden' id='pageLink' name='pageLink'>\r\n");
      out.write("<input type='hidden' id='webcontext' name='webcontext' value=\"");
      out.print(webpath);
      out.write("\">\r\n");
      out.write("</form>\r\n");
      out.write("\r\n");
      out.write("<iframe id=\"favoSub\" name=\"top_page\" width=\"100%\" height=\"0\" frameborder=\"0\" src='");
      out.print(topUrl );
      out.write("'></iframe>\r\n");
      out.write("<iframe id=\"remoteAuth\" name=\"remoteAuth\" width=\"100%\" height=\"0\" frameborder=\"0\" src=\"");
      out.print(remoteAuth);
      out.write("\"></iframe>\r\n");
      out.write("<iframe id=\"home_city_ifm\" name=\"home_city_ifm\" width=\"100%\" height=\"0\" frameborder=\"0\" src=\"");
      out.print(homeCityIfmUrl);
      out.write("\"></iframe>\r\n");
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
