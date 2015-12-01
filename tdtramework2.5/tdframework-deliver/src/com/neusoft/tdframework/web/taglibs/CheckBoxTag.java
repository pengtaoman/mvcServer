/*
 * Created on 2006-8-21
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
 * @wanghuan 2008-12-11 ����
 */
public class CheckBoxTag implements Tag {

	// ��ǩ����
	private PageContext pageContext; // ҳ��������

	private HttpServletRequest currentRequest;

	private Tag parent; // ����ǩ

	// �ؼ�����
	private String name;

	private String value;

	private String title;

	private String securityid;

	private String styleClass;

	private String id;

	private String checked;

	private String disabled;

	// �ؼ��¼�
	private String onclick;

	private String onchange;

	private String onkeydown;

	/**
	 * ���캯��
	 */
	public CheckBoxTag() {
	}

	/**
	 * @exception JspException
	 */
	public int doStartTag() throws JspException {
		return 0;
	}

	/**
	 * @exception JspException
	 */
	public int doEndTag() throws JspException {

		StringBuffer ret = new StringBuffer("");

		// ȡ���ܴ�
		String securityId = getSecurityid();
		
		ret.append("<input type=\"" + "checkbox" + "\" ");

		if (getStyleClass() != null) {
			ret.append("class=\"" + getStyleClass() + "\" ");
		}
		if (getName() != null) {
			ret.append("name=\"" + getName() + "\" ");
		}
		if (getValue() != null) {
			ret.append("value=\"" + getValue() + "\" ");
		} else {
			ret.append("value=\"\" ");
		}
		if (getId() != null) {
			ret.append("id=\"" + getId() + "\" ");
		}
		if (getChecked() != null) {
			ret.append("checked=\"" + getChecked() + "\" ");
		}
		if (getDisabled() != null) {
			ret.append("disabled=\"" + getDisabled() + "\" ");
		}
		if (getTitle() != null) {
			ret.append("title=\"" + getTitle() + "\" ");
		}

		if (getOnclick() != null) {
			ret.append("onclick=\"" + getOnclick() + "\" ");
		}
		if (getOnchange() != null) {
			ret.append("onchange=\"" + getOnchange() + "\" ");
		}
		if (getOnkeydown() != null) {
			ret.append("onkeydown=\"" + getOnkeydown() + "\" ");
		}
		
		if (getSecurityid() != null) {

			HttpSession session = pageContext.getSession();
			AuthorizeVO vo = (AuthorizeVO) session.getAttribute(GlobalParameters.SESSION_INFO);
			
			String employeeId = vo.getEmployeeId();
			String requestURI = ((HttpServletRequest) pageContext.getRequest()).getServletPath();
			
			try {
				
				InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
				
				AppContext appContext = new AppContextImpl();
				appContext.setApplicationName("");
				
				PageDAO dao = (PageDAO) factory.getInteractionObject("pageDAO",appContext);
				
				//û��Ȩ�������Ϊhidden�򣬽����id��name��value����
				if (!dao.haveCheckBoxRight(employeeId, requestURI + ":"+ securityId)) {
					
					ret = new StringBuffer("");

					ret.append("<input type=hidden ");

					if (getId() != null) {
						ret.append("id=\"" + getId() + "\" ");
					}
					if (getName() != null) {
						ret.append("name=\"" + getName() + "\" ");
					}
					if (getValue() != null) {
						ret.append("value=\"" + getValue() + "\" ");
					} else {
						ret.append("value=\"\" ");
					}
				}

			} catch (Exception e) {
				e.printStackTrace();
				throw new JspException("checkbox����ʧ��:" + e.getMessage());
			}
		}
		
		ret.append(">\n");
		
		try {
			pageContext.getOut().write(ret.toString());
		} catch (IOException ioexception) {
			throw new JspException("IO Error: " + ioexception.getMessage());
		}
		return 6;
	}

	/**
	 * �ͷ�
	 */
	public void release() {
	}

	/**
	 * ��ȡ����ǩ
	 */
	public Tag getParent() {
		return parent;
	}

	/**
	 * ���ø���ǩ
	 * 
	 * @param tag
	 */
	public void setParent(Tag tag) {
		parent = tag;
	}

	/**
	 * ��ȡҳ��������
	 */
	public PageContext getPageContext() {
		return pageContext;
	}

	public void setPageContext(PageContext pagecontext) {
		pageContext = pagecontext;
	}

	public HttpServletRequest getCurrentRequest() {
		return currentRequest;
	}

	public String getStyleClass() {
		return styleClass;
	}

	public void setStyleClass(String styleClass) {
		this.styleClass = styleClass;
	}

	public void setCurrentRequest(HttpServletRequest currentRequest) {
		this.currentRequest = currentRequest;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getValue() {
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

	public String getSecurityid() {
		return securityid;
	}

	public void setSecurityid(String securityid) {
		this.securityid = securityid;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	public String getDisabled() {
		return disabled;
	}

	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOnchange() {
		return onchange;
	}

	public void setOnchange(String onchange) {
		this.onchange = onchange;
	}

	public String getOnkeydown() {
		return onkeydown;
	}

	public void setOnkeydown(String onkeydown) {
		this.onkeydown = onkeydown;
	}

}
