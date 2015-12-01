package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave;

import com.neusoft.uniflow.web.toollistener.Util.NWGUIDGenerator;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.transitionForms.TransitionForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.ActivityNodeAttrSave;
import com.neusoft.workflow.model.Data;
import com.neusoft.workflow.model.DataType;
import com.neusoft.workflow.model.DatasMergeType;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.Process;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.Transition;

public class TransitionAttrSave {
	public static Process save(ProcessContentDocument doc ,TransitionForm form , String id){

		Transition transition = null;
		String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//Transition";
        Transition[] results = (Transition[])doc.selectPath(namespace+pathExpression);
    	for(int i=0;i<results.length;i++){
    		if(results[i].getId().equals(id)){
    			transition = results[i];
    		}
    	}
    	
    	if(transition == null){		
    	}else{
    		transition.setName(form.getName());
    		transition.setDescription(form.getDesc());
    		
    		if(form.getPriority() !=null && !"".equals(form.getPriority())){
    			transition.setPriority(Integer.parseInt(form.getPriority()));
    		}else{
    			transition.setPriority(0);
    		}
    		
    		if(form.getTransType() != null && !"".equals(form.getTransType())){
    			transition.setTransType(Integer.parseInt(form.getTransType()));
    		}else{
    			transition.setPriority(0);
    		}
    		
    		if(transition.getExpression() == null){
    			transition.addNewExpression();
    		}
    		
    		transition.getExpression().setCondition(form.getExpression());
    		
//    		boolean isExist = false;
//    		if(doc.getProcessContent().getProcess().getDatas() != null){
//    			Data [] datas = doc.getProcessContent().getProcess().getDatas().getDataArray();
//    	        if(datas != null){
//    	        	if(!"".equals(form.getData1()) && form.getData1() !=null){
//    	        		for(int i=0;i<datas.length;i++){
//            				if(datas[i].getName().equals(form.getData1())){
//            					isExist = true;
//            					break;
//            				}
//            			}
//        	        	if(isExist == false){
//        	        	    Data data =	doc.getProcessContent().getProcess().getDatas().addNewData();
//        	        	    data.setName(form.getData1());
//        	        	    data.setDataType(DataType.X_1);
//        	        	    data.setMergeRule(DatasMergeType.X_0);
//        	        	    data.setId(NWGUIDGenerator.getInstance().getID());
//        	        	}else{
//        	        		isExist = false;
//        	        	}
//    	        	}
//    	        	if(!"".equals(form.getData2()) && form.getData2() !=null){
//    	        		for(int i=0;i<datas.length;i++){
//            				if(datas[i].getName().equals(form.getData2())){
//            					isExist = true;
//            					break;
//            				}
//            			}
//        	        	if(isExist == false){
//        	        	    Data data =	doc.getProcessContent().getProcess().getDatas().addNewData();
//        	        	    data.setName(form.getData2());
//        	        	    data.setDataType(DataType.X_1);
//        	        	    data.setMergeRule(DatasMergeType.X_0);
//        	        	    data.setId(NWGUIDGenerator.getInstance().getID());
//        	        	}else{
//        	        		isExist = false;
//        	        	}
//    	        	}
//    	        	
//    	        }
//    			
//    		}
    		
    		
    	}
    	
    	return doc.getProcessContent().getProcess();
    }
}
