package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchForms.BranchForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.parallelForms.ParallelForm;
import com.neusoft.workflow.model.Branch;
import com.neusoft.workflow.model.ExtendProperty;
import com.neusoft.workflow.model.Parallel;
import com.neusoft.workflow.model.ProcessContentDocument;


public class BranchAttrSave {
		
	public static Branch save(ProcessContentDocument doc ,BranchForm form , String id){
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
		ActivityNodeAttrSave.save(branch, form , "Branch");
		return branch;
	}	
}
		
		
		

