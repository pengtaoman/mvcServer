package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherParse;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.AppForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.DataForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ConstantsForAttr;
import com.neusoft.workflow.model.Application;
import com.neusoft.workflow.model.ProcessContentDocument;

public class AppParse {
	public static AppForm xmlParse(ProcessContentDocument doc , String id){
		AppForm form = new AppForm();
		if(doc.getProcessContent().getProcess().getApplications() != null){
			Application [] apps = doc.getProcessContent().getProcess().getApplications().getApplicationArray();
			Application app = null;
	    	for(int i=0;i<apps.length;i++){
	    		if(apps[i].getId().equals(id)){
	    			app = apps[i];
	    		}
	    	}
	    	if(app !=null){
	    		form = (AppForm)WorkflowResourceParse.xmlParse(app, form);
	    		
	    		form.setAppUrl(app.getAppURL());
	    		form.setBuilder(app.getBuilder());
	    		form.setBuildTime(app.getBuildTime());
	    		
	    		if( app.getAppType()!= null){
	    			form.setAppType(app.getAppType().toString());
	    		}else{
	    			form.setAppType(ConstantsForAttr.AppType_WForm);
	    		}

	    		if(app.getSynchMode() !=null){
		    		form.setSynchMode(app.getSynchMode().toString());
	    		}else{
	    			form.setSynchMode(ConstantsForAttr.InvokeModeType_Synch);
	    		}
	    	}
		}
		return form;
	}
}

