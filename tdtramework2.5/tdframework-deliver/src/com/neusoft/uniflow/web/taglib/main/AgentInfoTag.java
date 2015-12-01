package com.neusoft.uniflow.web.taglib.main;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.util.CommonInfoManager;

public class AgentInfoTag extends TagSupport {
	private static final long serialVersionUID = 123492;
	private String info = "";

	public AgentInfoTag() {
	}

	public int doEndTag() throws JspTagException {
		StringBuffer outBuffer = new StringBuffer();
		HttpSession session = pageContext.getSession();
        if (!CommonInfoManager.getAgentInfo(this.info,session).equals("")){
        	outBuffer.append("<a href='javascript:getAgentList()' style=\"font-size:12px;font-color:blue;\"><");
        	outBuffer.append(CommonInfoManager.getAgentInfo(this.info,session));
        	outBuffer.append("></a>");
        }
		try {
			pageContext.getOut().write(outBuffer.toString());
		} catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

}
