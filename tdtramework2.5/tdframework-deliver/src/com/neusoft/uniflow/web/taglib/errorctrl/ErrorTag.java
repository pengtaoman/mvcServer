package com.neusoft.uniflow.web.taglib.errorctrl;


import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;


public class ErrorTag extends TagSupport
{private static final long serialVersionUID = 123479;
    public int doEndTag() throws JspTagException
    {
      HttpSession session = pageContext.getSession();
      JspWriter writer = pageContext.getOut();
      UniException exception = (UniException)session.getAttribute(SessionManager.ERROR);
      try{
	     if(exception==null){//Session无效，需要重新登录
	  	        writer.println(MessageUtil.getString("workflow.session.validate",session));
	     }else{
	        writer.println("<A href = '" + WorkflowManager.getWorkflowPath() + "/common/errordetail.jsp'>");
	        writer.println(exception.getMessage(pageContext));
	        writer.println("</A>");
	     }
      }catch(java.lang.Exception e){
      	 e.printStackTrace();
      }
      return EVAL_PAGE;
    }
}