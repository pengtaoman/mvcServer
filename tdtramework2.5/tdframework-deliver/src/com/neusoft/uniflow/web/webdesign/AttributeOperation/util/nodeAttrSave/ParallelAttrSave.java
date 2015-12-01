package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.parallelForms.ParallelForm;
import com.neusoft.workflow.model.ExtendProperty;
import com.neusoft.workflow.model.Parallel;
import com.neusoft.workflow.model.ProcessContentDocument;


public class ParallelAttrSave {
		
	public static Parallel save(ProcessContentDocument doc ,ParallelForm form , String id){
		Parallel parallel = null;
		String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//Parallel";
        Parallel[] results = (Parallel[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					parallel = results[i];
					break;
				}
			}
		}

    	if( null != parallel)		
    	{
    		ExtendProperty isSign = null;
    		if(parallel.getExtendProperties() != null){
				ExtendProperty [] properties = parallel.getExtendProperties().getExtendPropertyArray();
				if(properties != null){
					for(int i=0;i<properties.length;i++){
	        			if("isSign".equals(properties[i].getName())){
	        				isSign = properties[i];
	        				break;
	        			}
	        		}
				}
			}
            	if(parallel.getExtendProperties()== null){
            		parallel.addNewExtendProperties();
            	}
            	
            	ExtendProperty [] properties = parallel.getExtendProperties().getExtendPropertyArray();
            	for(int i=0;i<properties.length;i++){
            		if("mustBeModify".equals(properties[i].getName())){
            			properties[i].setValue("true");
            			break;
            		}
            	}
                
            ActivityNodeAttrSave.save(parallel, form , "Parallel");
            }else{
//            	ExtendProperty [] properties = parallel.getExtendProperties().getExtendPropertyArray();
//            	for(int i=0;i<properties.length;i++){
//            		if("mustBeModify".equals(properties[i].getName())){
//            			properties[i].setValue("false");
//            			break;
//            		}
//            	}
            }
            
           
            
    	 

    	return parallel;
    }
}
