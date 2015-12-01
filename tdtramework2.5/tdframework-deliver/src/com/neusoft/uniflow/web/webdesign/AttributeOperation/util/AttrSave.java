package com.neusoft.uniflow.web.webdesign.AttributeOperation.util;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.AutoNodeAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.BranchAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.BranchBeginNodeAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.BranchEndNodeAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.ChoiceNodeAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.EndNodeAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.ManualNodeAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.ParallelAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.StartNodeAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.SubProcNodeAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave.AppAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave.DataAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave.ProcAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave.TransitionAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms.AutoNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.choiceNodeForms.ChoiceNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.endNodeForms.EndNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchBeginNodeForms.BranchBeginNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchEndNodeForms.BranchEndNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.branchForms.BranchForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.parallelForms.ParallelForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.procForms.ProcForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.startNodeForms.StartNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.subProcNodeForms.SubProcNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.transitionForms.TransitionForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.AppForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.DataForm;
import com.neusoft.workflow.model.ProcessContentDocument;
      

public class AttrSave {
    private static ProcessContentDocument doc = null;
    
    public static final String ACTTEMPLETS_IDENTIFICATION = "<actTemplets";
    
    public static String toString(String xmlStr , Object ob , String type , String id)throws Exception{
    	try{
    		doc = ProcessContentDocument.Factory.parse(xmlStr);
    	}catch(Exception e){
    		throw new Exception("Cannot read struts.xml file");
    	}
    	
    	String str = null;
    	
    	Object ob2 = null;
    	
    	if("Transition".equals(type)){
    		ob2 = TransitionAttrSave.save(doc, (TransitionForm)ob, id);
    	}else 
    		if("Process".equals(type)){
    		ob2 = ProcAttrSave.save(doc, (ProcForm)ob, id);
    	}else
    		if("Parallel".equals(type)){
    		    ob2 = ParallelAttrSave.save(doc, (ParallelForm)ob, id);
    	}else	
    		if("Data".equals(type)){
    			ob2 = DataAttrSave.save(doc, (DataForm)ob, id);
    	}else 
    		if("Application".equals(type)){
    		    ob2 = AppAttrSave.save(doc, (AppForm)ob, id);
    	}else
    	if(Integer.parseInt(type)== NWActDef.ACT_TYPE_MANUAL){
    		ob2 = ManualNodeAttrSave.save(doc , (ManualNodeForm)ob , id );
    	}else 
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_AUTO){
    		ob2 = AutoNodeAttrSave.save(doc , (AutoNodeForm)ob , id );
    	}else 
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_SYNCHSUBPROC){
    		ob2 = SubProcNodeAttrSave.save(doc , (SubProcNodeForm)ob , id );
    	}else 
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_START){
    		ob2 = StartNodeAttrSave.save(doc , (StartNodeForm)ob , id );
    	}else 
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_END){
    		ob2 = EndNodeAttrSave.save(doc, (EndNodeForm)ob, id);
    	}else 
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_CHOICE){
    		ob2 = ChoiceNodeAttrSave.save(doc, (ChoiceNodeForm)ob, id);
    	}else
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_PARALLEL_UNIT){
		    ob2 = ParallelAttrSave.save(doc, (ParallelForm)ob, id);
		}else
    		if(Integer.parseInt(type)== NWActDef.ACT_TYPE_PARALLEL_BRANCH){
    		    ob2 = BranchAttrSave.save(doc, (BranchForm)ob, id);
    	}else
        	if(Integer.parseInt(type)== NWActDef.ACT_TYPE_PARALLEL_BRANCH_BEGIN){
        		    ob2 = BranchBeginNodeAttrSave.save(doc, (BranchBeginNodeForm)ob, id);
        }else
        	if(Integer.parseInt(type)== NWActDef.ACT_TYPE_PARALLEL_BRANCH_END){
    		    ob2 = BranchEndNodeAttrSave.save(doc, (BranchEndNodeForm)ob, id);
        }
    
        str = ob2.toString();   
    	return str;
    }
	
}
