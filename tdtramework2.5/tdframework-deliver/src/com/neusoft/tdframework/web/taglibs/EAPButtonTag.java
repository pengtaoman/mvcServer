/*
 * Created on 2006-8-21
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.web.taglibs;

import java.io.IOException;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.Tag;

import com.neusoft.om.dao.page.PageDAO;
import com.neusoft.tdframework.authorization.AuthorizeBO;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.context.FrameAppContext;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class EAPButtonTag implements Tag{
	////必有的属性//
	private PageContext pageContext;		//页面上下文
	private HttpServletRequest currentRequest;
	private Tag parent;						//父标签
	
	private String employeeId;
	private String buttonString;	//按钮id功能串,逗号分隔
	private String styleClassName;
	private String clickEvent;
	private String name;
	private String value;
	private String accesskey;
	private String onkeydown;
	private String onkeyup;
	private String onkeypress;
	private String tabindex;
	private String onblur;
	private String onfocus;
	private String onmousedown;
	private String onmouseout;
	private String onmousemove;
	private String onmouseover;
	private String onmouseup;
	private String id;
	private String style;
	/**
	 * get employeeId
	 * @return
	 */
	public String getEmployeeId() {
		return employeeId;
	}
	/**
	 * set employeeId
	 * @param string
	 */
	public void setEmployeeId(String string) {
		employeeId = string;
	}
	/**
	 * get buttonString
	 * @return
	 */
	public String getButtonIdString() {
		return buttonString;
	}
	/**
	 * set ButtonString
	 * @param string
	 */
	public void setButtonString(String string) {
		buttonString = string;
	}
	
	/**
	构造函数
	*/
	public EAPButtonTag(){}
	
	/** 
	@exception JspException 
	*/
	public int doStartTag() throws JspException{
	   return 0;
	}
	
	/** 
	@exception JspException 
	*/
	public int doEndTag() throws JspException{
		StringBuffer ret = new StringBuffer("");
		HttpSession session = pageContext.getSession();
        HttpServletRequest hsr = (HttpServletRequest)pageContext.getRequest();
		employeeId = (String)session.getAttribute("EmployeeId");

		
		//取功能串
		String buttonIdString = getButtonIdString();
		//if(buttonIdString==null) return 6;
        ret.append("<input ");
        ret.append(" type=\"button\" ");
		
		if(getStyleClass()!=null){
			ret.append("class=\""+getClassname()+"\" ");
		}
		if(getName()!=null){
			ret.append("name=\""+getName()+"\" ");
		}
		if(getAccesskey()!=null){
			ret.append("accesskey=\""+getAccesskey()+"\" ");
		}
		if(getOnkeyup()!=null){
			ret.append("onkeyup=\""+getOnkeyup()+"\" ");
		}
		if(getOnkeydown()!=null){
			ret.append("onkeydown=\""+getOnkeydown()+"\" ");
		}
		if(getOnblur()!=null){
			ret.append("onblur=\""+getOnblur()+"\" ");
		}
		if(getOnfocus()!=null){
			ret.append("onfocus=\""+getOnfocus()+"\" ");
		}
		if(getOnmousedown()!=null){
			ret.append("onmousedown=\""+getOnmousedown()+"\" ");
		}
		if(getOnmouseout()!=null){
			ret.append("onmouseout=\""+getOnmouseout()+"\" ");
		}
		if(getOnmousemove()!=null){
			ret.append("onmousemove=\""+getOnmousemove()+"\" ");
		}
		if(getOnmouseover()!=null){
			ret.append("onmouseover=\""+getOnmouseover()+"\" ");
		}
		if(getOnmouseup()!=null){
			ret.append("onmouseup=\""+getOnmouseup()+"\" ");
		}
		if(getTabindex()!=null){
			ret.append("tabindex=\""+getTabindex()+"\" ");
		}
		if(getId()!=null){
			ret.append("id=\""+getId()+"\" ");
		}
		if(getStyle()!=null){
			ret.append("style=\""+getStyle()+"\" ");
		}
		
		//StringTokenizer tokens = new StringTokenizer(buttonString,",");
		
		
		//将功能串按照","解析,循环生成XML标签
		if(buttonIdString==null)
			buttonIdString = "";
		if(buttonIdString.trim().length()>0){
			String functionStr = buttonIdString;
			functionStr = hsr.getServletPath() + ":" + functionStr;
			int needCut = functionStr.indexOf("..");
			if(needCut>0){
				functionStr = functionStr.substring(needCut + "..".length());
			}
			String pageLink = null;
			String menuId = null;
			
			//获取
			try{
				InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
				AppContext appContext = new AppContextImpl();
				appContext.setApplicationName("");
				PageDAO pageDAO = (PageDAO) factory
				.getInteractionObject("pageDAO", appContext);
				//AuthorizeBO authBO = authorizeFactory.getAuthorizeBO(currentRequest);
				pageLink = pageDAO.getRolePermissionsByResourceID(employeeId,functionStr);
				menuId = pageDAO.getMenuIDByResourceID(employeeId,functionStr);
				
			}catch(Exception e){
				e.printStackTrace();
				throw new JspException("功能按钮设置失败:" + e.getMessage());
			}
			
			if(pageLink!=null && pageLink.length()>0){
				//ret.append("		").append("<Function>")
				//if(pageLink.equals(getName()))
				ret.delete(0, ret.length());
				ret.append("<input type=\"hidden\"");
				if(getName()!=null){
					ret.append(" name=\""+getName()+"\" ");
				}
				//	.append("		").append("</Function>\n");
			}else{
				if(getOnclick()!=null){
					ret.append("onclick=\"javascript:if (typeof(document.getElementById(\'CREATE_BUTTON_ID\'))!=\'undefined\' && document.getElementById(\'CREATE_BUTTON_ID\')!=null) {document.getElementById(\'CREATE_BUTTON_ID\').value=\'"+menuId+"\' };"+getOnclick()+";javascript:if (typeof(document.getElementById(\'CREATE_BUTTON_ID\'))!=\'undefined\' && document.getElementById(\'CREATE_BUTTON_ID\')!=null) {document.getElementById(\'CREATE_BUTTON_ID\').value=\'\'};\" ");
				}
				
			}
		}else{
			if(getOnclick()!=null){
				ret.append("onclick=\""+getOnclick()+"\" ");
			}
			
		}
		if(getValue()!=null){
			ret.append(" value=\""+getValue()+"\" ");
		}
		ret.append(" />");
		
		try {
		   pageContext.getOut().write(ret.toString());
		} catch (IOException ioexception) {
		   throw new JspException("IO Error: " + ioexception.getMessage());
		}
		return 6;
	}
	
	/**
	获取父标签
	*/	
	public Tag getParent(){
		return parent;
	}
	
	/** 
	设置父标签
	@param tag 
	*/
	public void setParent(Tag tag){
	   parent = tag;
	}
	
	/**
	释放
	*/
	public void release(){}
	
	/**
	获取页面上下文
	*/
	public PageContext getPageContext(){
	   return pageContext;
	}
	
	/** @param pagecontext */
	public void setPageContext(PageContext pagecontext){
	   pageContext = pagecontext;
	}


  /**
   * @return
   */
  public HttpServletRequest getCurrentRequest() {
    return currentRequest;
  }

  /**
   * @param request
   */
  public void setCurrentRequest(HttpServletRequest currentRequest) {
    this.currentRequest = currentRequest;
  }
  /**
   * 
   * @param className
   */
  public void setStyleClass(String className)
  {
  	styleClassName = className;
  }
  /**
   * 
   * @return
   */
  public String  getStyleClass()
  {
  	return styleClassName;
  }
  /**
   * 
   * @param className
   */
  public void setSecurityid(String string)
  {
	  buttonString = string;
  }
  /**
   * 
   * @return
   */
  public String  getSecurityid()
  {
  	return buttonString;
  }
  /**
   * 
   * @param className
   */
  public void setClassname(String className)
  {
  	styleClassName = className;
  }
  /**
   * 
   * @return
   */
  public String  getClassname()
  {
  	return styleClassName;
  }
  /**
   * 
   * @param clickEventName
   */
  public void setOnclick(String clickEventName)
  {
  	clickEvent = clickEventName;
  }
  /**
   * 
   *
   */
  public String getOnclick()
  {
  	return clickEvent;
  }
  /*
   * 
   */
  public void setName(String name)
  {
  	this.name = name;
  }
  /**
   * 
   * @return
   */
  public String getName()
  {
  	return name;
  }
  /*
   * 
   */
  public void setValue(String value)
  {
  	this.value = value;
  }
  /**
   * 
   * @return
   */
  public String getValue()
  {
  	return value;
  }
public String getAccesskey() {
	return accesskey;
}
public void setAccesskey(String accesskey) {
	this.accesskey = accesskey;
}
public String getOnkeydown() {
	return onkeydown;
}
public void setOnkeydown(String onkeydown) {
	this.onkeydown = onkeydown;
}
public String getOnkeypress() {
	return onkeypress;
}
public void setOnkeypress(String onkeypress) {
	this.onkeypress = onkeypress;
}
public String getOnkeyup() {
	return onkeyup;
}
public void setOnkeyup(String onkeyup) {
	this.onkeyup = onkeyup;
}
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getOnblur() {
	return onblur;
}
public void setOnblur(String onblur) {
	this.onblur = onblur;
}
public String getOnfocus() {
	return onfocus;
}
public void setOnfocus(String onfocus) {
	this.onfocus = onfocus;
}
public String getOnmousedown() {
	return onmousedown;
}
public void setOnmousedown(String onmousedown) {
	this.onmousedown = onmousedown;
}
public String getOnmousemove() {
	return onmousemove;
}
public void setOnmousemove(String onmousemove) {
	this.onmousemove = onmousemove;
}
public String getOnmouseout() {
	return onmouseout;
}
public void setOnmouseout(String onmouseout) {
	this.onmouseout = onmouseout;
}
public String getOnmouseover() {
	return onmouseover;
}
public void setOnmouseover(String onmouseover) {
	this.onmouseover = onmouseover;
}
public String getOnmouseup() {
	return onmouseup;
}
public void setOnmouseup(String onmouseup) {
	this.onmouseup = onmouseup;
}
public String getTabindex() {
	return tabindex;
}
public void setTabindex(String tabindex) {
	this.tabindex = tabindex;
}
public String getStyle() {
	return style;
}
public void setStyle(String style) {
	this.style = style;
}

}
