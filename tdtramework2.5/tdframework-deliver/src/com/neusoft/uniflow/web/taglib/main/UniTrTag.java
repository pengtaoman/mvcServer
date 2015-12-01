package com.neusoft.uniflow.web.taglib.main;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.struts.taglib.logic.IterateTag;

import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;



public class UniTrTag extends TagSupport
{private static final long serialVersionUID = 12349123;
  private String oddClass;
  private String evenClass;
  private String width;
  private String height;

  public UniTrTag()
  {
    this.oddClass = "";
    this.evenClass = "";
    this.width = "";
    this.height = "";
  }
  public String getOddClass()
  {
    return oddClass;
  }
  public void setOddClass(String klass)
  {
    this.oddClass = klass;
  }

  public String getEvenClass()
  {
    return evenClass;
  }
  public void setEvenClass(String klass)
  {
    this.evenClass = klass;
  }

  public String getWidth()
  {
    return width;
  }
  public void setWidth(String width)
  {
    this.width = width;
  }

  public String getHeight()
  {
    return height;
  }
  public void setHeight(String height)
  {
    this.height = height;
  }

  public int doStartTag() throws JspException
  {
    IterateTag iterateTag = (IterateTag) findAncestorWithClass(this, IterateTag.class);
    if(iterateTag==null)
    {
      HttpSession session = pageContext.getSession();
      session.setAttribute(SessionManager.ERROR,new UniException("error.unitr.noEnclosingIterate"));
      try{
	pageContext.forward( ( (HttpServletRequest) pageContext.getRequest()).
			    getContextPath() + "/error.jsp");
	
      }catch(Exception e)
      {
    	  e.printStackTrace();
      }
  		return SKIP_BODY;
    }
    int index = iterateTag.getIndex();
    StringBuffer buffer = new StringBuffer();
    buffer.append("<tr");
    if(!this.getWidth().equals(""))
      buffer.append(" width='" + this.getWidth() + "'");
    if(!this.getHeight().equals(""))
      buffer.append(" height='" + this.getHeight() + "'");
    if(index % 2 == 1)//奇数
    {
      if (!this.getOddClass().equals(""))
	buffer.append(" class='" + this.getOddClass() + "'");
    }
    else//偶数
    {
      if (!this.getEvenClass().equals(""))
	buffer.append(" class='" + this.getEvenClass() + "'");
    }
    buffer.append(">");
    try{
      pageContext.getOut().print(buffer.toString());
    }catch(java.io.IOException e)
    {
      e.printStackTrace();
      throw new JspException(e);
    }
    return EVAL_BODY_INCLUDE;
  }

  public int doEndTag() throws JspException
  {
    try{
      pageContext.getOut().print("</tr>");
    }catch(java.io.IOException e)
    {
      e.printStackTrace();
    }
    return EVAL_PAGE;
  }

}