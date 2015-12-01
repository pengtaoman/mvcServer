package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.AppForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ConstantsForAttr;
import com.neusoft.workflow.model.Application;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.ApplicationType.Enum;

public class AppAttrSave {
	public static Application save(ProcessContentDocument doc ,AppForm form , String id){
		Application app = null;
		if(doc.getProcessContent().getProcess().getApplications() != null){
			Application [] apps = doc.getProcessContent().getProcess().getApplications().getApplicationArray();
	    	for(int i=0;i<apps.length;i++){
	    		if(apps[i].getId().equals(id)){
	    			app = apps[i];
	    		}
	    	}
	    	if(app !=null){
	    		WorkflowResAttrSave.save(app, form);
	    		
	    		if(form.getAppType() !=null && !"".equals(form.getAppType())){
		    		app.setAppType(Enum.forString(form.getAppType()));
	    		}else{
	    			app.setAppType(Enum.forString(ConstantsForAttr.AppType_WForm));
	    		}
	    		
	    		if(form.getSynchMode() !=null && !"".equals(form.getSynchMode())){
	    			app.setSynchMode(com.neusoft.workflow.model.InvokeModeType.Enum.forString(form.getSynchMode()));
	    		}else{
	    			app.setSynchMode(com.neusoft.workflow.model.InvokeModeType.Enum.forString(ConstantsForAttr.InvokeModeType_Synch));
	    		}
	    		
	    		app.setAppURL(form.getAppUrl());
	    		app.setBuilder(form.getBuilder());
	    		app.setBuildTime(form.getBuildTime());
	    		

	    	}
		}
		return app;
	}
}
