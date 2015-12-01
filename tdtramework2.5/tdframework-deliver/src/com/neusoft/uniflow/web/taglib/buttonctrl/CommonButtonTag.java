package com.neusoft.uniflow.web.taglib.buttonctrl;


import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class CommonButtonTag extends TagSupport

{
	private static final long serialVersionUID = 123476;
  private static String TRUE = "true";
  private String refresh = "true";
  private String print = "false";
  private String customization = "true";
  private String find = "false";
  private String customAction = "#";
  private String refreshAction = "javascript:refresh()";
  private String printAction = "#";
  private String findAction = "#";

  public String getFind()
  {
	return find;
  }
  public void setFind(String find)
  {
	this.find = find;
  }
  public String getRefresh()
  {
    return refresh;
  }
  public void setRefresh(String refresh)
  {
    this.refresh = refresh;
  }
  public String getPrint()
  {
    return print;
  }
  public void setPrint(String print)
  {
    this.print = print;
  }
  public String getCustomization()
  {
    return this.customization;
  }
  public void setCustomization(String customization)
  {
    this.customization = customization;
  }
  public String getCustomAction()
  {
    return this.customAction;
  }
  public void setCustomAction(String customAction)
  {
    this.customAction = customAction;
  }

  public String getRefreshAction()
  {
    return this.refreshAction;
  }
  public void setRefreshAction(String action)
  {
    this.refreshAction = action;
  }

  public String getPrintAction()
  {
    return this.printAction;
  }
  public void setPrintAction(String action)
  {
    this.printAction = action;
  }
  public String getFindAction()
  {
	return this.findAction;
  }
  public void setFindAction(String findAction)
  {
	this.findAction = findAction;
  }

  public CommonButtonTag()
  {
  }

  public int doEndTag() throws JspTagException
  {
	HttpSession session = pageContext.getSession();
    StringBuffer outBuffer = new StringBuffer();
    if(this.getRefresh().equalsIgnoreCase(TRUE))
    {
	outBuffer.append("&nbsp;");
	outBuffer.append("<a href='");
	outBuffer.append(this.getRefreshAction());
	outBuffer.append("'>");
	outBuffer.append("<img src='");
	outBuffer.append(WorkflowManager.getWorkflowStylePath());
	outBuffer.append("/style1/main_img/refresh.gif' width='16' height='16' alt='");
	outBuffer.append(MessageUtil.getString("workflow.alt.refresh", session));
	outBuffer.append("' border='0'>");
	outBuffer.append("</a>");
    }
    if(this.getPrint().equalsIgnoreCase(TRUE))
    {
	outBuffer.append("&nbsp;");
	outBuffer.append("<a href='");
	outBuffer.append(this.getPrintAction());
	outBuffer.append("'>");
	outBuffer.append("<img src='");
	outBuffer.append(WorkflowManager.getWorkflowStylePath());
	outBuffer.append("/style1/main_img/print.gif' width='16' height='16' alt='");
	outBuffer.append(MessageUtil.getString("workflow.alt.print", session));
	outBuffer.append("' border='0'>");
	outBuffer.append("</a>");
    }
    if(this.getCustomization().equalsIgnoreCase(TRUE))
    {
	outBuffer.append("&nbsp;");
	outBuffer.append("<a href='");
	outBuffer.append(customAction);
	outBuffer.append("'>");
	outBuffer.append("<img src='");
	outBuffer.append(WorkflowManager.getWorkflowStylePath());
	outBuffer.append("/style1/main_img/set_row.gif' width='16' height='16' alt='");
	outBuffer.append(MessageUtil.getString("workflow.alt.custom", session));
	outBuffer.append("' border='0'>");
	outBuffer.append("</a>");
    }
	if(this.getFind().equalsIgnoreCase(TRUE))
	{
	outBuffer.append("&nbsp;");
	outBuffer.append("<a href='");
	outBuffer.append(findAction);
	outBuffer.append("'>");
	outBuffer.append("<img src='");
	outBuffer.append(WorkflowManager.getWorkflowStylePath());
	outBuffer.append("/style1/main_img/find.gif' width='16' height='16' alt='");
	outBuffer.append(MessageUtil.getString("workflow.alt.query", session));
	outBuffer.append("' border='0'>");
	outBuffer.append("</a>");
	}
    try{
	pageContext.getOut().write(outBuffer.toString());
    }catch(java.io.IOException e)
    {
	e.printStackTrace();
    }
    return EVAL_PAGE;
  }
}



