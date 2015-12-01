package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.WorkflowResourceForm;
import com.neusoft.workflow.model.WorkflowResource;

public class WorkflowResAttrSave {
	public static WorkflowResource save(WorkflowResource res , WorkflowResourceForm form){
        
		if( res != null ){
           res.setDescription(form.getDesc());
           res.setName(form.getName());
		}
		
		return res;
	}
}
