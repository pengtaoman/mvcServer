package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms.AutoNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.GetNameUtil;
import com.neusoft.workflow.model.AutoNode;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.ProcessContentDocument;

public class AutoNodeParse {
    public static AutoNodeForm xmlParse(ProcessContentDocument doc ,String type , String id , HttpServletRequest request){

    	AutoNodeForm form = new AutoNodeForm();
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
        		form = (AutoNodeForm)ActivityNodeParse.xmlParse(auto,form,request );
        		
        		form.setApplication(auto.getApplication());
        		form.setApplicationParams(auto.getApplicationParams());
        		if(auto.getExpiration()!=null){
        			form.setExActionName(GetNameUtil.getAppName(auto.getExpiration().getAction().getApplication(),request));
        		}
        		if(auto.getExpiration()!=null){
        			form.setExAlertActionName(GetNameUtil.getAppName(auto.getExpiration().getAlertAction().getApplication(),request));
        		}
        		String applicationName=GetNameUtil.getAppName(auto.getApplication(),request);
        		form.setApplicationName(applicationName);
        	}
    	
    	
    	return form;
    	
    }
}
