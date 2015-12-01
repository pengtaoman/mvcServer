package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.endNodeForms.EndNodeForm;
import com.neusoft.workflow.model.EndNode;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.StartNode;

public class EndNodeAttrSave {
	public static EndNode save(ProcessContentDocument doc ,EndNodeForm form , String id){
		EndNode end = null;
		String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//EndNode";
        EndNode[] results = (EndNode[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					end = results[i];
				}
			}
		}
    	
    	if(end == null){		
    	}else{
    		RouteNodeAttrSave.save(end, form , "EndNode");
    	}
    	
    	return end;
    }
} 
