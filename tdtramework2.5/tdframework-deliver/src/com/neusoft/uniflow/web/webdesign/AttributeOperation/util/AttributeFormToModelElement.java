package com.neusoft.uniflow.web.webdesign.AttributeOperation.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import com.neusoft.uniflow.web.toollistener.FileIO.UWBPIO;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms.AutoNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.subProcNodeForms.SubProcNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.AppForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.ActivityNodeAttrSave;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave.WorkflowResAttrSave;
import com.neusoft.workflow.ActTempletsDocument;
import com.neusoft.workflow.AutoActTemplet;
import com.neusoft.workflow.ManualActTemplet;
import com.neusoft.workflow.SubProcActTemplet;
import com.neusoft.workflow.model.Application;
import com.neusoft.workflow.model.ApplicationBean;
import com.neusoft.workflow.model.AutoNode;
import com.neusoft.workflow.model.CoupleType;
import com.neusoft.workflow.model.GlobalApplications;
import com.neusoft.workflow.model.InvokeModeType;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.Participant;
import com.neusoft.workflow.model.ParticipantType;
import com.neusoft.workflow.model.SubprocNode;
import com.neusoft.workflow.model.VariableMap;
import com.neusoft.workflow.model.CoupleType.Enum;

public class AttributeFormToModelElement{
	
	public static ManualNode getManualNode(String xmlStr,ManualNodeForm form)
	{
		ManualNode manual = null;
		InputStream in = null;
		try
		{
			in = new ByteArrayInputStream(xmlStr.getBytes("utf-8"));
			ActTempletsDocument actDoc = ActTempletsDocument.Factory.parse(in);	
			 //手动节点
			ManualActTemplet[] manualActTemplets = actDoc.getActTemplets().getManualActTempletArray();	
			ManualActTemplet manualActTemplet = manualActTemplets[0];
			manual = FlexElementToModelElement.getManualNodeFromTemplet(manualActTemplet);
			String[] variable= form.getVariablesString().split(";");
			String[] node=form.getNodeArraryString().split(";");
			String[] mVariable= form.getMinorVariablesString().split(";");
			String[] mNode=form.getMinorNodeArraryString().split(";");
	    	if( null != manual)	
	    	{
	    		Participant [] persons = null;
	    		if( manual.getParticipants()!=null){
	    		   persons = manual.getParticipants().getParticipantArray();
	    		   if(persons != null){
	    		   for(int i=persons.length;i>0;i--){ 
	    			   manual.getParticipants().removeParticipant(0);
	    		   }
	    	      }
	    		}else{
	    			manual.addNewParticipants();
	    		}
	    		if(variable!=null){
	    			for(int i=0;i<variable.length;i++){
	    				if(variable[i].toString().equals("")){
	    					continue;
	    				}
	    				Participant participant =  manual.getParticipants().addNewParticipant();
	    				participant.setAuthorityType("1");
	    				participant.setValue(variable[i].toString());
	    				participant.setType(ParticipantType.X_8);
	    		}
	    		}
	    		if(mVariable!=null){
	    			for(int i=0;i<mVariable.length;i++){
	    				if(variable[i].toString().equals("")){
	        				continue;
	        			}
	    				Participant participant =  manual.getParticipants().addNewParticipant();
	    				participant.setAuthorityType("0");
	    				participant.setValue(mVariable[i].toString());
	    				participant.setType(ParticipantType.X_8);
	    		}
	    		}
	    		if(node!=null){
	    			for(int i=0;i<node.length;i++){
	    				if(node[i].toString().equals("")){
	    					continue;
	    				}
	    				Participant participant =  manual.getParticipants().addNewParticipant();
	    				participant.setAuthorityType("1");
	    				participant.setValue(node[i].toString());
	    				participant.setType(ParticipantType.X_7);
	    		}
	    		}
	    		if(mNode!=null){
	    			for(int i=0;i<mNode.length;i++){
	    				if(mNode[i].toString().equals("")){
	    					continue;
	    				}
	    				Participant participant =  manual.getParticipants().addNewParticipant();
	    				participant.setAuthorityType("0");
	    				participant.setValue(mNode[i].toString());
	    				participant.setType(ParticipantType.X_7);
	    		}
	    		}
	    		manual.setOperationLevel(com.neusoft.workflow.model.OperationLevelType.Enum.forString(form.getOpertionLevel()));
	    		manual.setAssignRule(com.neusoft.workflow.model.AssignRuleType.Enum.forString(form.getAssignRule()));
	    		manual.setApplication(form.getApplication());
	    		ParticipantUtil.setParticipant(form.getMinorPeople(), "0", manual.getParticipants());
	    	    ParticipantUtil.setParticipant(form.getPrimaryPeople(), "1", manual.getParticipants());
	            for(int i=2;i<6;i++){
	            	if(form.getPrimaryPreDefine().toString().indexOf(Integer.toString(i))!=-1){
	            		Participant participant =  manual.getParticipants().addNewParticipant();
	            		participant.setAuthorityType("1");
	                	participant.setValue(Integer.toString(i));
	                	participant.setType(ParticipantType.X_10);
	            	}
	            	if(form.getMinorPreDefine().toString().indexOf(Integer.toString(i))!=-1){
	            		Participant participant =  manual.getParticipants().addNewParticipant();
	            		participant.setAuthorityType("0");
	                	participant.setValue(Integer.toString(i));
	                	participant.setType(ParticipantType.X_10);
	            	}
	            }
	
	            ActivityNodeAttrSave.save(manual, form , "ManualNode");
	            
	    	}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if(in != null)
			{
				try
				{
					in.close();
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
			}
		}	

    	return manual;
	}
	
	public static AutoNode getAutoNode(String xmlStr,AutoNodeForm form)
	{
		AutoNode autoNode = null;
		InputStream in = null;
		try
		{
			in = new ByteArrayInputStream(xmlStr.getBytes("utf-8"));
			ActTempletsDocument actDoc = ActTempletsDocument.Factory.parse(in);	
			 //手动节点
			AutoActTemplet[] autoActTemplets = actDoc.getActTemplets().getAutoActTempletArray();	
			AutoActTemplet autoActTemplet = autoActTemplets[0];
			autoNode = FlexElementToModelElement.getAutoNodeFromTemplet(autoActTemplet);
			ActivityNodeAttrSave.save(autoNode, form , "AutoNode");	
			autoNode.setApplication(form.getApplication());
			autoNode.setApplicationParams(form.getApplicationParams());
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if(in != null)
			{
				try
				{
					in.close();
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
			}
		}	
		return autoNode;
		
	}
	
	public static SubprocNode getSubProcNode(String xmlStr,SubProcNodeForm form)
	{
		SubprocNode subproc = null;
		InputStream in = null;
		try
		{
			in = new ByteArrayInputStream(xmlStr.getBytes("utf-8"));
			ActTempletsDocument actDoc = ActTempletsDocument.Factory.parse(in);	
			 //手动节点
			SubProcActTemplet[] subProcActTemplets = actDoc.getActTemplets().getSubProcActTempletArray();	
			SubProcActTemplet subProcActTemplet = subProcActTemplets[0];
			subproc = FlexElementToModelElement.getSubProcNodeFromTemplet(subProcActTemplet);
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
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if(in != null)
			{
				try
				{
					in.close();
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
			}
		}	
		return subproc;		
	}
	
	public  static Application getApplication(String xmlStr,AppForm form)
	{
		Application app = null;
		InputStream in = null;
		try
		{
			in = new ByteArrayInputStream(xmlStr.getBytes("utf-8"));
			GlobalApplications globalApplicaions = UWBPIO.getInstance().readProgListFromStream(in);
			if(globalApplicaions != null)
			{
				ApplicationBean[] applications = globalApplicaions.getApplicationBeanArray();
				ApplicationBean applicationBean = applications[0];
				 app = FlexElementToModelElement.getApplication(applicationBean);
			}
			
			WorkflowResAttrSave.save(app, form);	
			if(form.getAppType() !=null && !"".equals(form.getAppType())){
	    		app.setAppType(com.neusoft.workflow.model.ApplicationType.Enum.forString(form.getAppType()));
			}else{
				app.setAppType(com.neusoft.workflow.model.ApplicationType.Enum.forString(ConstantsForAttr.AppType_WForm));
			}
			
			if(form.getSynchMode() !=null && !"".equals(form.getSynchMode())){
				app.setSynchMode(com.neusoft.workflow.model.InvokeModeType.Enum.forString(form.getSynchMode()));
			}else{
				app.setSynchMode(com.neusoft.workflow.model.InvokeModeType.Enum.forString(ConstantsForAttr.InvokeModeType_Synch));
			}
			
			if(form.getAppHost() !=null && !"".equals(form.getAppHost())){
				app.setAppHost(form.getAppHost());
			}else{
				app.setAppHost("appmanager");
			}
			
			app.setAppURL(form.getAppUrl());
			app.setBuilder(form.getBuilder());
			app.setBuildTime(form.getBuildTime());
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if(in != null)
			{
				try
				{
					in.close();
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
			}
		}	
		return app;
	}

}
