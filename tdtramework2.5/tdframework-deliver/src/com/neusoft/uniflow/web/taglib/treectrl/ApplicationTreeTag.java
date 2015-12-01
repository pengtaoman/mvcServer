package com.neusoft.uniflow.web.taglib.treectrl;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.common.apptree.beans.ApplicationTree;
import com.neusoft.uniflow.web.common.apptree.beans.TreePrinter;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ApplicationTreeTag extends TagSupport {
	private static final long serialVersionUID = 1233367338;
	private String id = "";
	private String type = "";
	public int doEndTag() throws JspTagException {
		HttpSession session = pageContext.getSession();
		try {
			ApplicationTree tree = (ApplicationTree) session
					.getAttribute(this.id+this.type);
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}