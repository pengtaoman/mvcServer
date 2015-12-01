package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.startNodeForms.StartNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.subProcNodeForms.SubProcNodeForm;
import com.neusoft.workflow.model.AutoNode;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.StartNode;
import com.neusoft.workflow.model.SubprocNode;

public class StartNodeAttrSave {
	public static StartNode save(ProcessContentDocument doc ,StartNodeForm form , String id){
		StartNode start = null;
		String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//StartNode";
        StartNode[] results = (StartNode[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					start = results[i];
				}
			}
		}
    	
    	if(start == null){		
    	}else{
    		RouteNodeAttrSave.save(start, form , "StartNode");
    	}
    	
    	return start;
    }
}
