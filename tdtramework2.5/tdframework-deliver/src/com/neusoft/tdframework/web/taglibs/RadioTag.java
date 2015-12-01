/*
 * Created on 2006-8-21
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.web.taglibs;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.Tag;

import com.neusoft.om.dao.page.PageDAO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class RadioTag implements Tag{
	
	////���е�����//
	private PageContext pageContext;		//ҳ��������
	private HttpServletRequest currentRequest;
	private Tag parent;						//����ǩ
	
	private String styleClassName;
	private String name;
	private String value;
	private String title;
	private String onclick;
	/**
	 * @return Returns the securityId.
	 */
	public String getSecurityid() {
		return securityid;
	}
	/**
	 * @param securityId The securityId to set.
	 */
	public void setSecurityid(String securityid) {
		this.securityid = securityid;
	}
	private String securityid;
	
	/**
	���캯��
	*/
	public RadioTag(){}
	
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
		String requestURI =((HttpServletRequest)pageContext.getRequest()).getServletPath();
		AuthorizeVO vo = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
		String employeeId = vo.getEmployeeId();
		
		//ȡ���ܴ�
		String securityId = getSecurityid();
		//if(securityId==null) return 6;
		
		ret.append("<input type=\"RADIO\"  ");
		if(getStyleClass()!=null){
			ret.append("class=\""+getStyleClass()+"\" ");
		}
		if(getName()!=null){
			ret.append("name=\""+getName()+"\" ");
		}
		if(getOnclick()!=null){
			ret.append("onclick=\""+getOnclick()+"\" ");
		}
		if(getValue()!=null){
			ret.append("value=\""+getValue()+"\" ");
		}else
			ret.append("value=\"\" ");
			
		ret.append(">\n");
		if(getTitle()!=null){
			ret.append(getTitle());
		}
			//��ȡ
		if(securityId!=null){
			try{
				InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
				AppContext appContext = new AppContextImpl();
				appContext.setApplicationName("");
				PageDAO dao = (PageDAO) factory.getInteractionObject("pageDAO", appContext);
	
				if(!dao.haveRadioRight(employeeId,requestURI+":"+securityId))
					ret = new StringBuffer("");
			}catch(Exception e){
				e.printStackTrace();
				throw new JspException("radiobutton����ʧ��:" + e.getMessage());
			}
		}
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
public String getTitle() {
	return title;
}
public void setTitle(String title) {
	this.title = title;
}
public String getOnclick() {
	return onclick;
}
public void setOnclick(String onclick) {
	this.onclick = onclick;
}

}
