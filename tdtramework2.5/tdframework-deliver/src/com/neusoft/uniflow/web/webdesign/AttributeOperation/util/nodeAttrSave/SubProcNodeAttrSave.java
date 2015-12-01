package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.subProcNodeForms.SubProcNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ConstantsForAttr;
import com.neusoft.workflow.model.CoupleType;
import com.neusoft.workflow.model.EndNode;
import com.neusoft.workflow.model.InvokeModeType;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.SubprocNode;
import com.neusoft.workflow.model.VariableMap;
import com.neusoft.workflow.model.CoupleType.Enum;

public class SubProcNodeAttrSave {
	public static SubprocNode save(ProcessContentDocument doc ,SubProcNodeForm form , String id){
		SubprocNode subproc = null;
		String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//SubprocNode";
        SubprocNode[] results = (SubprocNode[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					subproc = results[i];
				}
			}
		}
    	if(subproc == null){		
    	}else{
    		if(subproc.getSubProc()!=null){
    			if(form.getSubproc()!=null||!form.getSubproc().equals("")){
        			subproc.getSubProc().setProcessID(form.getSubproc());
        			subproc.getSubProc().setProcessName(form.getSubprocName());
            		subproc.getSubProc().setVersionName(form.getVersionName());
            		subproc.getSubProc().setServerName("workflow");
    			}

    		}
    		else{
    			if(form.getSubproc()!=null||!form.getSubproc().equals("")){
        			subproc.addNewSubProc().setProcessID(form.getSubproc());
        			subproc.getSubProc().setProcessName(form.getSubprocName());
            		subproc.getSubProc().setVersionName(form.getVersionName());
            		subproc.getSubProc().setServerName("workflow");
    			}

    		}
    		
    		ActivityNodeAttrSave.save(subproc, form , "SubProcNode");
    		if(ConstantsForAttr.CoupleType_loosely.equals(form.getCoupleType())){
    			subproc.setSubProcCoupleType(Enum.forInt(CoupleType.INT_X_0));
    		}else if(ConstantsForAttr.CoupleType_tightly.equals(form.getCoupleType())){
    			subproc.setSubProcCoupleType(Enum.forInt(CoupleType.INT_X_1));
    		}
    		
    		if(ConstantsForAttr.InvokeModeType_asynch.equals(form.getInvokeType())){
    			subproc.setInvokeMode(com.neusoft.workflow.model.InvokeModeType.Enum.forInt(InvokeModeType.INT_X_0));
    		}else if(ConstantsForAttr.InvokeModeType_Synch.equals(form.getInvokeType())){
    			subproc.setInvokeMode(com.neusoft.workflow.model.InvokeModeType.Enum.forInt(InvokeModeType.INT_X_1));
    		}
    		String parentArray[]=form.getParentVariable().split(";");
			String subArray[]=form.getSupprocVariable().split(";");
			String mapArray[]=form.getMapType().split(";");
			if(subproc.getSubProcParams()!=null){
    			for(int i=subproc.getSubProcParams().getVariableMapArray().length-1;i>=0;i--){
    				subproc.getSubProcParams().removeVariableMap(i);
    			}
    			for(int j=0;j<parentArray.length;j++){
    				if(parentArray[j].equals("")||subArray[j].equals("")){
    				}else{
    					VariableMap variable=subproc.getSubProcParams().addNewVariableMap();
    					variable.setParentVariable(parentArray[j]);
    					variable.setSupprocVariable(subArray[j]);
    					variable.setMapType(Integer.parseInt(mapArray[j]));
    				}
    			}
    		}
    		if(subproc.getSubProcParams()==null){
    			subproc.addNewSubProcParams();
    			for(int j=0;j<parentArray.length;j++){
    				if(parentArray[j].equals("")||subArray[j].equals("")){
    					
    				}else{
    				VariableMap variable=subproc.getSubProcParams().addNewVariableMap();
    				variable.setParentVariable(parentArray[j]);
    				variable.setSupprocVariable(subArray[j]);
    				variable.setMapType(Integer.parseInt(mapArray[j]));
    				}
    			}
    		}
    	
    	}
    	
    	return subproc;
    }
}
