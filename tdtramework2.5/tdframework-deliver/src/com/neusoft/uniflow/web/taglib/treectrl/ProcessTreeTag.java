package com.neusoft.uniflow.web.taglib.treectrl;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.common.processtree.beans.ProcessTree;
import com.neusoft.uniflow.web.common.processtree.beans.TreePrinter;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ProcessTreeTag extends TagSupport {
	private static final long serialVersionUID = 12333678;
	private String id = "";

	public int doEndTag() throws JspTagException {
		HttpSession session = pageContext.getSession();
		try {
			ProcessTree tree = (ProcessTree) session
					.getAttribute(this.id);
			TreePrinter printer = new TreePrinter();
			printer.printTree(tree, pageContext.getOut());
		} catch (java.io.IOException e) {
			session.setAttribute(SessionManager.ERROR, new UniException(
					"error.unitr.noEnclosingIterate"));
			try {
				pageContext.forward(WorkflowManager.getWorkflowPath()
						+ "/common/error.jsp");
			} catch (Exception ee) {
				// ee.printStackTrace();
			}

		}
		return EVAL_PAGE;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}