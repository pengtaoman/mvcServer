package com.neusoft.uniflow.web.taglib.main;


import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;


import com.neusoft.uniflow.web.util.WorkflowManager;


public class StyleTag extends TagSupport {
	private static final long serialVersionUID = 123497;
  private String type;

  public StyleTag()
  {
  }

  public String getType()
  {
    return type;
  }

  public void setType(String type)
  {
    this.type = type;
  }


  public int doEndTag() throws JspTagException
  {
    try{
      //HttpSession session = pageContext.getSession();
      //String liststring = (String)session.getAttribute(SessionManager.CUSTOMATION);
      //String style = CustomHandler.getElements(CustomHandler.PREFERENCE_SYTLE,liststring);
      pageContext.getOut().write("<META HTTP-EQUIV=\"MSThemeCompatible\" CONTENT=\"No\">");
      pageContext.getOut().write("<LINK href='"+WorkflowManager.getWorkflowStylePath()+"/Style.css' rel=stylesheet>");
    }catch(java.io.IOException e)
    {
      e.printStackTrace();
    }
    return EVAL_PAGE;
  }
}