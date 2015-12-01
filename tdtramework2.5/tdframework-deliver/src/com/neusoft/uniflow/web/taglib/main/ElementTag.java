package com.neusoft.uniflow.web.taglib.main;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
import java.util.ArrayList;
import java.util.Hashtable;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;

public class ElementTag
    extends TagSupport {
	private static final long serialVersionUID = 123493;
  private String collection;
  private String name;
  private String width;
  boolean flag = false;
	private boolean nowrap = false;

  public ElementTag() {

  }

  public String getCollection() {
    return collection;
  }

  public void setCollection(String collection) {
    this.collection = collection;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getWidth() {
    return width;
  }

  public void setWidth(String width) {
    this.width = width;
  }

  public int doStartTag() throws JspTagException {
    try {
	HttpSession session = pageContext.getSession();
	String liststring = (String) session.getAttribute(SessionManager.
	    CUSTOMATION);
	String elementlist = CustomHandler.getElements(collection, liststring);
	ServletContext ctx = session.getServletContext();
	Hashtable props = (Hashtable) ctx.getAttribute(CustomHandler.CUSTOM_PROPS);

	ArrayList components = null;
	if (props.containsKey(collection)) {
	  components = new ArrayList();
	  components = (ArrayList) props.get(collection);
	}
	if ( (components.contains(name.trim())) &&
	    (elementlist.charAt(components.indexOf(name.trim())) == '1')) {
	  flag = true;
	}
	if (flag) {
	  StringBuffer results = new StringBuffer();
	  results.append("<td  class=\"main_list_td\" valign=\"middle\"");
	  results.append(" nowrap");
	  results.append(">");
	  pageContext.getOut().write(results.toString());
	}
    }
    catch (java.io.IOException e) {
	e.printStackTrace();
    }
    if (flag)
	return (EVAL_BODY_INCLUDE);
    else
	return (SKIP_BODY);
  }

  public int doEndTag() throws JspTagException {
    try {
	if (flag) {
	  pageContext.getOut().write("</td>");
	}
    }
    catch (java.io.IOException e) {
	e.printStackTrace();
    }
    flag = false;
    return EVAL_PAGE;

  }

  public void release() {
    super.release();
    collection = null;
    name = null;
    width = null;
    flag = false;
  }
	public boolean isNowrap()
	{
		return nowrap;
	}
	public void setNowrap(boolean nowrap)
	{
		this.nowrap = nowrap;
	}

}