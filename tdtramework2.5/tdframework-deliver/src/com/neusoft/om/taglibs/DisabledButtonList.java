package com.neusoft.om.taglibs;

/**
级别参数表的下拉框. taglib
*/

import java.io.IOException;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.Tag;

import com.neusoft.tdframework.authorization.AuthorizeBO;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.context.FrameAppContext;

public class DisabledButtonList implements Tag{
	
	////必有的属性//
	private PageContext pageContext;		//页面上下文
	private HttpServletRequest currentRequest;
	private Tag parent;						//父标签
	
	private String employeeId;
	private String buttonString;	//按钮id功能串,逗号分隔
	
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
	public DisabledButtonList(){}
	
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
		
		ret.append("	<Button>\n");
		
		StringTokenizer tokens = new StringTokenizer(buttonString,",");
		
		//将功能串按照","解析,循环生成XML标签
		while(tokens.hasMoreTokens()){
			String function = tokens.nextToken();
			
			String pageLink = null;
			
			//获取
			try{
				AuthorizeFactory authorizeFactory = (AuthorizeFactory)FrameAppContext.getBean(pageContext.getServletContext(),AuthorizeFactory.BEAN);
				AuthorizeBO authBO = authorizeFactory.getAuthorizeBO(currentRequest);
				pageLink = authBO.getDisabledButton(employeeId,function);
			}catch(Exception e){
				e.printStackTrace();
				throw new JspException("功能按钮设置失败:" + e.getMessage());
			}
			
			if(pageLink!=null && pageLink.length()>0){
				ret.append("		").append("<Function>")
					.append(pageLink)
					.append("		").append("</Function>\n");
			}
		}
		
		ret.append("	</Button>\n");
		
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

}
