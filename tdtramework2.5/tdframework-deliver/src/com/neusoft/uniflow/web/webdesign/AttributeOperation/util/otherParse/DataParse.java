package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherParse;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.DataForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ConstantsForAttr;
import com.neusoft.workflow.model.Data;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.ProcessContentDocument;

public class DataParse {
	public static DataForm xmlParse(ProcessContentDocument doc , String id){
		DataForm form = new DataForm();
		if(doc.getProcessContent().getProcess().getDatas() != null){
			Data [] datas = doc.getProcessContent().getProcess().getDatas().getDataArray();
	    	Data data = null;
	    	for(int i=0;i<datas.length;i++){
	    		if(datas[i].getId().equals(id)){
	    			data = datas[i];
	    			break;
	    		}
	    	}
	    	if(data != null){
	    		form = (DataForm)WorkflowResourceParse.xmlParse(data, form);
	    		
	    		if(data.getDataType() !=null){
	    			form.setDataType(data.getDataType().toString());
	    		}else{
	    			form.setDataType(ConstantsForAttr.DataType_Number);
	    		}
	    		
	    		if(data.getMergeRule() != null){
	    			form.setMergeRule(data.getMergeRule().toString());
	    		}else{
	    			form.setMergeRule(ConstantsForAttr.MergeType_Replace);
	    		}
	    		if(data.getHandleClass() != null)
	    		{
	    			form.setHandleClass(data.getHandleClass());
	    		}  		
	    		form.setDefaultValue(data.getDefaultValue());
	    		
	    	}
		}
    	
		return form;
	}
}
