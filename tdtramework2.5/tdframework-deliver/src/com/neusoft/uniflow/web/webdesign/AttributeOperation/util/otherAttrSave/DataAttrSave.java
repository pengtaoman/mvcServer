package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.DataForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ConstantsForAttr;
import com.neusoft.workflow.model.Data;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.DataType.Enum;

public class DataAttrSave {
	public static Data save(ProcessContentDocument doc ,DataForm form , String id){
		Data data = null;
		if(doc.getProcessContent().getProcess().getDatas() != null){
			Data [] datas = doc.getProcessContent().getProcess().getDatas().getDataArray();
	    	for(int i=0;i<datas.length;i++){
	    		if(datas[i].getId().equals(id)){
	    			data = datas[i];
	    		}
	    	}
	    	
	    	if(data != null){
	    		WorkflowResAttrSave.save(data, form);
	    		
	    		if(form.getDataType() !=null && !"".equals(form.getDataType())){
	    			data.setDataType(Enum.forString(form.getDataType()));
	    		}else{
	    			data.setDataType(Enum.forString(ConstantsForAttr.DataType_Number));
	    		}
	    		
	    		if(form.getMergeRule() !=null && !"".equals(form.getMergeRule())){
	    			data.setMergeRule(com.neusoft.workflow.model.DatasMergeType.Enum.forString(form.getMergeRule()));
	    		}else{
	    			data.setMergeRule(com.neusoft.workflow.model.DatasMergeType.Enum.forString(ConstantsForAttr.MergeType_Replace));
	    		}
	    		
	    		data.setHandleClass(form.getHandleClass());
	    		data.setDefaultValue(form.getDefaultValue());
	    	}
	    	
		}
		
		return data;
		
	}
}
