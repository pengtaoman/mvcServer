package com.neusoft.uniflow.web.taglib.formctrl;

import java.io.IOException;
import java.util.Map;
import java.util.Vector;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class IteratorMap extends TagSupport {
	private Object name;
	private Object keySet;
	public int doStartTag() throws JspTagException {
	
		return EVAL_PAGE;
	}
	public int doEndTag() throws JspTagException{
		StringBuffer buffer =new StringBuffer();
		Vector keyset=(Vector)this.getKeySet();
		NWSession nwsession=WorkflowManager.getNWSession();
		int keysize=keyset.size();
		for(int i=0;i<keysize;i++){
			Map name=(Map)this.getName();
			String key=keyset.get(i).toString();
			try {
				buffer.append("<tr><td align=\"left\" valign=\"top\" class=\"main_list_td\">");
				buffer.append(nwsession.getActInst("", key).getName());
				buffer.append("</td>");
			} catch (NWException e) {
				e.printStackTrace();
			}
			buffer.append("<td align=\"left\" valign=\"top\" class=\"main_list_td\">");
			buffer.append(CommonInfoManager.getProcessPath(name.get(key).toString()));
			buffer.append("</td></tr>");
		}
		try {
			pageContext.getOut().write(buffer.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
	public void release(){
		super.release();
		name=null;
		keySet=null;
	}
	public Object getName(){
		return this.name;
	}
	public void setName(Object map){
		this.name=map;
	}
	public Object getKeySet(){
		return this.keySet;
	}
	public void setKeySet(Object keySet){
		this.keySet=keySet;
	}
	
}
