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
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.Tag;

import com.neusoft.tdframework.authorization.AuthorizeBO;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
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
public class ButtonControlTag implements Tag{
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
	public ButtonControlTag(){}
	
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
		
		//取功能串
		String buttonIdString = getButtonIdString();
		if(buttonIdString==null) return 6;
		
		ret.append("<Button ");
		if(getStyleClass()!=null){
			ret.append("class=\""+getStyleClass()+"\" ");
		}
		if(getName()!=null){
			ret.append("name=\""+getName()+"\" ");
		}
		if(getOnclick()!=null){
			ret.append("onclick=\""+getOnclick()+"\" ");
		}
		StringTokenizer tokens = new StringTokenizer(buttonString,",");
		
		//将功能串按照","解析,循环生成XML标签
		while(tokens.hasMoreTokens()){
			String function = tokens.nextToken();
			
			String pageLink = null;
			
			//获取
			try{
				InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
				AppContext appContext = new AppContextImpl();
				appContext.setApplicationName("");
				AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
				.getInteractionObject(AuthorizeFactory.BEAN, appContext);
				AuthorizeBO authBO = authorizeFactory.getAuthorizeBO(currentRequest);
				pageLink = authBO.getDisabledButton(employeeId,function);
			}catch(Exception e){
				e.printStackTrace();
				throw new JspException("功能按钮设置失败:" + e.getMessage());
			}
			
			if(pageLink!=null && pageLink.length()>0){
				//ret.append("		").append("<Function>")
				if(pageLink.equals(getName()))
					ret.append("disabled=true ");
				//	.append("		").append("</Function>\n");
			}
		}
		
		ret.append(">");
		if(getValue()!=null){
			ret.append(" "+getValue()+" ");
		}
		ret.append("</Button>\n");
		
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

}
