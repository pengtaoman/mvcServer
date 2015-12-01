package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchForms.BranchForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.parallelForms.ParallelForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.GetNameUtil;
import com.neusoft.workflow.model.Branch;
import com.neusoft.workflow.model.Parallel;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.SubprocNode;
public class BranchParse {

	public static BranchForm xmlParse(ProcessContentDocument doc, String id,
			HttpServletRequest request) {
		BranchForm paform = new BranchForm();
		Branch branch = null;
		String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//Branch";
        Branch[] results = (Branch[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					branch = results[i];
				}
			}
		}
			if (null != branch) {
				paform = (BranchForm) ActivityNodeParse.xmlParse(branch,
						paform, request);
				if(branch.getExpiration()!=null){
					paform.setExActionName(GetNameUtil.getAppName(branch.getExpiration().getAction().getApplication(),request));
	    		}
	    		if(branch.getExpiration()!=null){
	    			paform.setExAlertActionName(GetNameUtil.getAppName(branch.getExpiration().getAlertAction().getApplication(),request));
	    		}

			}else{
				
			}
	    	return paform;
    }
} 
