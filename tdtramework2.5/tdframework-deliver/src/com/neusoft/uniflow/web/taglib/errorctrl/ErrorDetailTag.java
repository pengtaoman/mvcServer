package com.neusoft.uniflow.web.taglib.errorctrl;

import java.io.PrintWriter;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;



public class ErrorDetailTag extends TagSupport
{private static final long serialVersionUID = 123478;
  public int doEndTag() throws JspTagException
  {
    HttpSession session = pageContext.getSession();
    //ServletRequest request = pageContext.getRequest();
    UniException exception = (UniException) session.getAttribute(SessionManager.ERROR);

    try {
      pageContext.getOut().println("<pre>");
      exception.printStackTrace(new PrintWriter(pageContext.getOut()),pageContext);
      pageContext.getOut().println("</pre>");
    }
    catch (java.io.IOException e) {
      e.printStackTrace();
    }
  return EVAL_PAGE;
}

}