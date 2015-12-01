package org.apache.jsp.tdframework.mainframe;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.neusoft.tdframework.authorization.RemoteAuthorizeVO;
import com.neusoft.tdframework.authorization.RemoteAuthorizeColl;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.util.PassWord;
import com.neusoft.tdframework.authorization.AuthorizeUtil;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.tdframework.common.util.DESUtil;

public final class RemoteAuthAJAX_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

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
      response.setContentType("text/html;charset=GBK");
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
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");

	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	StringBuffer channelPara = new StringBuffer();
    channelPara.append("?user_id=").append(authVO.getWorkNo()).append("&user_name=").append(authVO.getEmployeeName()).append("&area_id=").append(authVO.getCityCode()).append("&city_id=").append(authVO.getAreaId());
	
	String userName = authVO.getWorkNo();
	String passWord = DESUtil.encrypt(PassWord.decode(authVO.getWorkPwd()));
	String orgPassWord = PassWord.decode(authVO.getWorkPwd());
	//String phpAuthUri = "http://192.168.216.15:9999/authenticate_crm.php?UserName=" + userName + "&PassWord=" + passWord;

	InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    AppContext appContext = new AppContextImpl();
    appContext.setApplicationName("");
	AuthorizeFactory authFactory = (AuthorizeFactory) factory
				.getInteractionObject(AuthorizeFactory.BEAN, appContext);

	RemoteAuthorizeColl remoteAuthColl = authFactory.getRemoteAuthorizeColl();
	


      out.write("\r\n");
      out.write("<html>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("  <head>\r\n");
      out.write("    <base href=\"");
      out.print(basePath);
      out.write("\">\r\n");
      out.write("   \r\n");
      out.write("    <meta http-equiv=\"pragma\" content=\"no-cache\">\r\n");
      out.write("    <meta http-equiv=\"cache-control\" content=\"no-cache\">\r\n");
      out.write("    <meta http-equiv=\"expires\" content=\"0\">\r\n");
      out.write("   <script type=\"text/javascript\" src=\"");
      out.print(path);
      out.write("/common/js/prototypeajax.js\" ></script>\r\n");
      out.write("\r\n");
      out.write("   \t<script type=\"text/javascript\">\r\n");
      out.write("var windowMap={};\r\n");
      out.write("\r\n");
      out.write("function authInit() {\r\n");
      out.write("\ttry {\r\n");
      out.write("\r\n");

StringBuffer iframehtml=new StringBuffer();
if(remoteAuthColl!=null){
		for(int i=0;i<remoteAuthColl.getRowCount();i++) {
			RemoteAuthorizeVO vo = remoteAuthColl.getRemoteAuthorizeVO(i);
			if(vo.isIfValid()) {
				String authUrl = "";
			
				if(vo.getAuthUrl().indexOf("initsession.do")>0){
					authUrl = vo.getAuthUrl() + channelPara.toString();
			    
			    }else{
			    	if(vo.getEncry().equals("true"))
						authUrl = vo.getAuthUrl() + "?" + vo.getUserKey() + "=" + userName + "&" + vo.getPasswordKey() + "=" + passWord;
					else
						authUrl = vo.getAuthUrl() + "?" + vo.getUserKey() + "=" + userName + "&" + vo.getPasswordKey() + "=" + orgPassWord;
				}
			
			
			
			//1：表示ajax方式
			//2：表示iframe方式
			//3：标识 window.open方式
			String authType = vo.getAuthType();
				if ("1".equals(authType)){
					out.println("new Ajax.Request( \"" + authUrl + "\",{  onComplete: doNothing } );");
				}else if ("2".equals(authType)) {
					iframehtml.append("<iframe style=\"border:0px;\" marginwidth=\"0\" marginheight=\"0\" frameborder=\"0\" border=\"0\" width=\"0\" height=\"0\"");
					iframehtml.append(" id=\"").append(vo.getName());
					iframehtml.append("\" name=\"").append(vo.getName());
					iframehtml.append("\" src=\"").append(authUrl).append("\" ></iframe>");
					iframehtml.append("\n");
				}else if ("3".equals(authType)) {
					out.println("windowMap[\""+vo.getName() + "\"]=window.open(\"" + authUrl + "\",\"" + vo.getName() + "\",\"left=3000,top=3000,height=1,width=1,status=no,toolbar=no,menubar=no,location=no\");");
					out.println("window.focus()");
				  	out.println("window.setTimeout(\"windowMap[\"" + vo.getName() + "\"].close()\"," + vo.getTimeWait() +");");
				}
		  	}
		}
	}

      out.write("\r\n");
      out.write("\r\n");
      out.write("\t}catch(e){\r\n");
      out.write("\t\talert(\"无法跨域访问指定的URL.\");\r\n");
      out.write("\t}\r\n");
      out.write("\r\n");
      out.write("}\r\n");
      out.write("//succeed fail\r\n");
      out.write("function doNothing(originalRequest){\r\n");
      out.write("var authResult=originalRequest.responseText;\r\n");
      out.write("var r=authResult.split(\"\\n\");\r\n");
      out.write("if (r.length>1){\r\n");
      out.write("\tif (r[0].toLowerCase().indexOf(\"fail\")>0){\r\n");
      out.write("\t\talert(\"对不起,对 \"+r[1].replace(\"<\"+\"!--\",\"\").replace(\"--\"+\">\",\"\")+\"的认证失败!\");\r\n");
      out.write("\t}\r\n");
      out.write("}\r\n");
      out.write("}\r\n");
      out.write("\t</script>\r\n");
      out.write("    <!--\r\n");
      out.write("    <link rel=\"stylesheet\" type=\"text/css\" href=\"styles.css\">\r\n");
      out.write("    -->\r\n");
      out.write("  </head>\r\n");
      out.write("  \r\n");
      out.write("  <body onload=\"authInit();return false;\">\r\n");
      out.write("    This is the remote auth page. <br>\r\n");
      out.write("    ");
      out.print(iframehtml);
      out.write("\r\n");
      out.write("  </body>\r\n");
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
