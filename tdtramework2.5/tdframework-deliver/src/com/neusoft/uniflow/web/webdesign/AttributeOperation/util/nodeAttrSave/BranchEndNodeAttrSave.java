package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchEndNodeForms.BranchEndNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.endNodeForms.EndNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.RouteNodeParse;
import com.neusoft.workflow.model.Branch;
import com.neusoft.workflow.model.BranchEndNode;
import com.neusoft.workflow.model.BranchStartNode;
import com.neusoft.workflow.model.EndNode;
import com.neusoft.workflow.model.Parallel;
import com.neusoft.workflow.model.ProcessContentDocument;

public class BranchEndNodeAttrSave {
	public static BranchEndNode save(ProcessContentDocument doc ,BranchEndNodeForm form , String id){
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
    	
    	if(end == null){		
        	}else{
        		RouteNodeAttrSave.save(end, form , Integer.toString(NWActDef.ACT_TYPE_PARALLEL_BRANCH_END));
       	}
    	return end;
	}
} 
