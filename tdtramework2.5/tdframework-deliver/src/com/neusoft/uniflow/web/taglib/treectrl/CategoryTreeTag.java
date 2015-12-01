package com.neusoft.uniflow.web.taglib.treectrl;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.common.categorytree.beans.CategoryPrinter;
import com.neusoft.uniflow.web.common.categorytree.beans.CategoryTree;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class CategoryTreeTag extends TagSupport {
	 private String agentid = "";
	 public int doEndTag() throws JspTagException
	  {
	    HttpSession session = pageContext.getSession();
	    try{
		CategoryTree tree = (CategoryTree)session.getAttribute(this.agentid);
		CategoryPrinter printer = new CategoryPrinter();
		printer.printTree(tree,pageContext.getOut());
	    }catch(java.io.IOException e)
	    {
		session.setAttribute(SessionManager.ERROR,new UniException("error.unitr.noEnclosingIterate"));
		try{
		pageContext.forward( WorkflowManager.getWorkflowPath() + "/common/error.jsp");
		}catch(Exception ee)
		{
		ee.printStackTrace();
		}

	    }
	    return EVAL_PAGE;
	  }
	public String getAgentid() {
		return agentid;
	}
	public void setAgentid(String agentid) {
		this.agentid = agentid;
	}
}
