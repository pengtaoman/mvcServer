package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms.AutoNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.workflow.model.AutoNode;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.ProcessContentDocument;

public class AutoNodeAttrSave {
	public static AutoNode save(ProcessContentDocument doc ,AutoNodeForm form , String id){
		AutoNode auto = null;
	   	String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//AutoNode";
        AutoNode[] results = (AutoNode[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					auto = results[i];
				}
			}
		}
    	
    	if(auto == null){		
    	}else{
    		ActivityNodeAttrSave.save(auto, form , "AutoNode");
    		
    		auto.setApplication(form.getApplication());
    		auto.setApplicationParams(form.getApplicationParams());
    	}
    	
    	return auto;
    }
}
