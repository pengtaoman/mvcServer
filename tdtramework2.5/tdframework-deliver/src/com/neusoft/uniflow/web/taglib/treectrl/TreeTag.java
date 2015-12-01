package com.neusoft.uniflow.web.taglib.treectrl;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.common.trees.beans.OrgTree;
import com.neusoft.uniflow.web.common.trees.beans.TreePrinter;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;


public class TreeTag extends TagSupport
{private static final long serialVersionUID = 12333678;
  public int doEndTag() throws JspTagException
  {
    HttpSession session = pageContext.getSession();
    try{
	OrgTree tree = (OrgTree)session.getAttribute(SessionManager.ORGTREE);
	TreePrinter printer = new TreePrinter();
	printer.printTree(tree,pageContext.getOut());
    }catch(java.io.IOException e)
    {
	session.setAttribute(SessionManager.ERROR,new UniException("error.unitr.noEnclosingIterate"));
	try{
	pageContext.forward( WorkflowManager.getWorkflowPath() + "/common/error.jsp");
	}catch(Exception ee)
	{
	//ee.printStackTrace();
	}

    }
    return EVAL_PAGE;
  }

}