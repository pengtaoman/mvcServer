package com.neusoft.om.taglibs;

/**
����������������. taglib
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
	
	////���е�����//
	private PageContext pageContext;		//ҳ��������
	private HttpServletRequest currentRequest;
	private Tag parent;						//����ǩ
	
	private String employeeId;
	private String buttonString;	//��ťid���ܴ�,���ŷָ�
	
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
	���캯��
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
		
		//ȡ���ܴ�
		String buttonIdString = getButtonIdString();
		if(buttonIdString==null) return 6;
		
		ret.append("	<Button>\n");
		
		StringTokenizer tokens = new StringTokenizer(buttonString,",");
		
		//�����ܴ�����","����,ѭ������XML��ǩ
		while(tokens.hasMoreTokens()){
			String function = tokens.nextToken();
			
			String pageLink = null;
			
			//��ȡ
			try{
				AuthorizeFactory authorizeFactory = (AuthorizeFactory)FrameAppContext.getBean(pageContext.getServletContext(),AuthorizeFactory.BEAN);
				AuthorizeBO authBO = authorizeFactory.getAuthorizeBO(currentRequest);
				pageLink = authBO.getDisabledButton(employeeId,function);
			}catch(Exception e){
				e.printStackTrace();
				throw new JspException("���ܰ�ť����ʧ��:" + e.getMessage());
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
	��ȡ����ǩ
	*/	
	public Tag getParent(){
		return parent;
	}
	
	/** 
	���ø���ǩ
	@param tag 
	*/
	public void setParent(Tag tag){
	   parent = tag;
	}
	
	/**
	�ͷ�
	*/
	public void release(){}
	
	/**
	��ȡҳ��������
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
