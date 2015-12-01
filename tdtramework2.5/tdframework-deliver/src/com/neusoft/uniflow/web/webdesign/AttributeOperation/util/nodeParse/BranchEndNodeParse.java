package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchBeginNodeForms.BranchBeginNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchEndNodeForms.BranchEndNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchForms.BranchForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.parallelForms.ParallelForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.startNodeForms.StartNodeForm;
import com.neusoft.workflow.model.Branch;
import com.neusoft.workflow.model.BranchEndNode;
import com.neusoft.workflow.model.BranchStartNode;
import com.neusoft.workflow.model.Parallel;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.StartNode;

public class BranchEndNodeParse {
	public static BranchEndNodeForm xmlParse(ProcessContentDocument doc , String type , String id){
		BranchEndNodeForm paform = new BranchEndNodeForm();
		Parallel[] pa = doc.getProcessContent().getProcess().getParallelArray();
		BranchEndNode end = null;
		String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//BranchEndNode";
        BranchEndNode[] results = (BranchEndNode[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					end = results[i];
				}
			}
		}
    	if (null != end) {
    		paform = (BranchEndNodeForm)RouteNodeParse.xmlParse(end,paform);
		}
    	return paform;
    }
} 
