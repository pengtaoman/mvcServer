package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherParse;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.WorkflowResourceForm;
import com.neusoft.workflow.model.WorkflowResource;

public class WorkflowResourceParse {
	public static WorkflowResourceForm xmlParse(WorkflowResource resource , WorkflowResourceForm form){
		if( resource != null){
			form.setDesc(resource.getDescription());
			form.setName(resource.getName());
			form.setId(resource.getId());
		}
		
		return form;
	}
}
