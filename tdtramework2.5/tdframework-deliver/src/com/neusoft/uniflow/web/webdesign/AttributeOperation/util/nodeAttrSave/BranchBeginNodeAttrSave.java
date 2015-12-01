package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchBeginNodeForms.BranchBeginNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchEndNodeForms.BranchEndNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.endNodeForms.EndNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.RouteNodeParse;
import com.neusoft.workflow.model.Branch;
import com.neusoft.workflow.model.BranchEndNode;
import com.neusoft.workflow.model.BranchStartNode;
import com.neusoft.workflow.model.EndNode;
import com.neusoft.workflow.model.Parallel;
import com.neusoft.workflow.model.ProcessContentDocument;

public class BranchBeginNodeAttrSave {
	public static BranchStartNode save(ProcessContentDocument doc ,BranchBeginNodeForm form , String id){
		BranchStartNode start = null;
		String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//BranchStartNode";
        BranchStartNode[] results = (BranchStartNode[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					start = results[i];
				}
			}
		}
    	
    	if(start == null){		
        	}else{
        		RouteNodeAttrSave.save(start, form , Integer.toString(NWActDef.ACT_TYPE_PARALLEL_BRANCH_BEGIN));
       	}
    	return start;
	}
} 
