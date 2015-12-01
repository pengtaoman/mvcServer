package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.choiceNodeForms.ChoiceNodeForm;
import com.neusoft.workflow.model.BranchEndNode;
import com.neusoft.workflow.model.ChoiceNode;
import com.neusoft.workflow.model.ProcessContentDocument;

public class ChoiceNodeParse {
	public static ChoiceNodeForm xmlParse(ProcessContentDocument doc , String type , String id){
		ChoiceNodeForm form = new ChoiceNodeForm();
    	ChoiceNode choiceNode = null;
    	String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//ChoiceNode";
        ChoiceNode[] results = (ChoiceNode[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					choiceNode = results[i];
				}
			}
		}
    	if(choiceNode == null){		
    	}else{
    		form = (ChoiceNodeForm)RouteNodeParse.xmlParse(choiceNode,form);
    	}
    	return form;
    }
}
