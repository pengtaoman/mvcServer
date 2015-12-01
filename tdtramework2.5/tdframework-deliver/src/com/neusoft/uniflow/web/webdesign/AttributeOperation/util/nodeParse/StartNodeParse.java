package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.startNodeForms.StartNodeForm;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.StartNode;

public class StartNodeParse {
	public static StartNodeForm xmlParse(ProcessContentDocument doc , String type , String id){
    	StartNodeForm form = new StartNodeForm();
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
    		form = (StartNodeForm)RouteNodeParse.xmlParse(start,form);
    	}
    	return form;
    }
} 
