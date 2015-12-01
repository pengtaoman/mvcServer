package com.neusoft.uniflow.web.taglib.treectrl;

import java.io.IOException;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.common.workdayorgtree.beans.WorkdayOrgTree;
import com.neusoft.uniflow.web.common.workdayorgtree.beans.WorkdayOrgTreePrinter;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class WorkdayOrgTreeTag extends TagSupport {

	public int doEndTag(){
		 HttpSession session=pageContext.getSession();
		 WorkdayOrgTree tree=(WorkdayOrgTree)session.getAttribute(SessionManager.workdayOrgTree);
		 WorkdayOrgTreePrinter print=new WorkdayOrgTreePrinter();
		 JspWriter out=pageContext.getOut();
		 try {
			print.printTree(tree, out);
		} catch (IOException e) {
			session.setAttribute(SessionManager.ERROR,new UniException("error.unitr.noEnclosingIterate"));
			try{
			pageContext.forward( WorkflowManager.getWorkflowPath() + "/common/error.jsp");
			}catch(Exception ee)
			{
			}

		}
	    return EVAL_PAGE;
	 }

}
