package com.neusoft.om.taglibs;

import javax.servlet.jsp.tagext.*;

import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.authorization.AuthorizeBO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.context.FrameAppContext;

public class CheckPageTaglib extends TagSupport {
	/**
	 * The page to which we should forward for the user to log on.
	 */
	private String forword = "/views/om/authorize_invalid.html";
	/**标签名称*/
	private String name;
	/**标签默认值*/
	private String employeeId;
	private String menuId;
	
	/**
	 * Return the forward page.
	 */
	public String getforword() {

	return (this.forword);

	}
	/**
	 * Set the forward page.
	 *
	 * @param page The new forward page
	 */
	public void setforword(String forword) {

	this.forword = forword;

	}
	/**
	 * return name
	 */
	public String getName() {
		return name;
	}
	/**
	 * set name
	 * @param string
	 */
	public void setName(String string) {
		name = string;
	}
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
	 * get menuId
	 * @return
	 */
	public String getMenuId() {
		return menuId;
	}
	/**
	 * set menuId
	 * @param string
	 */
	public void setMenuId(String string) {
		menuId = string;
	}
	


  public int doEndTag() throws javax.servlet.jsp.JspException{
  
	if(forword == null || forword.trim().equals(""))
		forword = "/views/om/authorize_invalid.html";
	boolean checkPageResult = false;
	try {
		AuthorizeBO authorizeBO = (AuthorizeBO)FrameAppContext.getBean(pageContext.getServletContext(),AuthorizeBO.BEAN);
		checkPageResult = authorizeBO.checkPage(employeeId,menuId);

	} catch (ServiceException e) {
		SysLog.writeLogs("om",GlobalParameters.ERROR,"CheckPageTaglib--判断页面权限异常:"+e.getMessage());
	}
	if(!checkPageResult){
		try{
			pageContext.forward(forword);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CheckPageTaglib--页面上下文异常:"+e.getMessage());
		}
			return (SKIP_PAGE);
	  }else{
		return (EVAL_PAGE);
	  }
  }
  public int doStartTag() throws javax.servlet.jsp.JspException
  {
	/**@todo Override this javax.servlet.jsp.tagext.TagSupport method*/
	return super.doStartTag();
  }

}