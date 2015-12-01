package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherParse;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.procForms.ProcForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.GetNameUtil;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ParticipantUtil;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.ActivityNodeParse;
import com.neusoft.workflow.model.Data;
import com.neusoft.workflow.model.Participant;
import com.neusoft.workflow.model.Process;
import com.neusoft.workflow.model.ProcessContentDocument;

public class ProcParse {
	 public static ProcForm xmlParse(ProcessContentDocument doc , String id , HttpServletRequest request){
		    ProcForm form = new ProcForm();
	    	Process process = doc.getProcessContent().getProcess();
//	    	if(process.getID().equals(id)&&process !=null){
	    	if(process !=null){
	    		if(process.getExpiration()!=null && null != process.getExpiration().getAction()){
	    			form.setExActionName(GetNameUtil.getAppName(process.getExpiration().getAction().getApplication(),request));
	    		}
	    		if(process.getExpiration()!=null && null != process.getExpiration().getAlertAction()){
	    			form.setExAlertActionName(GetNameUtil.getAppName(process.getExpiration().getAlertAction().getApplication(),request));
	    		}
	    		form = (ProcForm)ActivityNodeParse.xmlParse(process,form ,request);
	    		
	    		form.setBuilder(process.getBuilder());
	    		form.setBuildTime(process.getBuildTime());
	    		form.setModifiedTime(process.getModifiedTime());
	    		form.setVersionName(process.getVersionName());
	    		

	    		if(process.getMonitors()!=null&&process.getMonitors().getParticipantArray()!=null){
		    		   String monitorsName = "";
		    		   String monitorID = "";
		    		   
		    		   Participant [] participants = process.getMonitors().getParticipantArray();
		    		   String munit ="";
		    		   
		    		   ArrayList unitNameArray = null;
						try {
							unitNameArray = ParticipantUtil.getParticipant(participants);
						} catch (Exception e) {
							e.printStackTrace();
						}
						munit = unitNameArray.get(0).toString();
						monitorsName = unitNameArray.get(1).toString();
						if( !monitorsName.equals("")){
							int n = monitorsName.length();
							monitorsName = monitorsName.substring(0, n-1);
						}
						
					   monitorID = unitNameArray.get(2).toString();
					   if( !monitorID.equals("") ){
							int n = monitorID.length();
							monitorID = monitorID.substring(0, n-1);
						}
		    		   
		    		   form.setMonitorsName(monitorsName);
		    		   
		    		   form.setMonitors(monitorID);
		    		   
		    		   form.setMunit(munit);
	    	     }
	    		if(process.getValidCreators()!=null&&process.getValidCreators().getParticipantArray()!=null){
		    		   String validCreatorsName = "";
		    		   String validCreators = "";
		    		   
		    		   Participant [] participants = process.getValidCreators().getParticipantArray();
		    		   String munit ="";
		    		   
		    		   ArrayList unitNameArray = null;
						try {
							unitNameArray = ParticipantUtil.getParticipant(participants);
						} catch (Exception e) {
							e.printStackTrace();
						}
						munit = unitNameArray.get(0).toString();
						validCreatorsName = unitNameArray.get(1).toString();
						if( !validCreatorsName.equals("") ){
							int n = validCreatorsName.length();
							validCreatorsName = validCreatorsName.substring(0, n-1);
						}
						
					   validCreators = unitNameArray.get(2).toString();
					   if( !validCreators.equals("")){
							int n = validCreators.length();
							validCreators = validCreators.substring(0, n-1);
						}
		    		   
		    		   form.setValidCreatorsName(validCreatorsName);
		    		   
		    		   form.setValidCreators(validCreators);
		    		   
		    		   form.setPunit(munit);
	    	     }
	    		
	    		transformVariableJson(process,form);
	    }
	    	return form;
	 }
	 
	 private static void transformVariableJson(Process process,ProcForm form){
		 if(process.getDatas()==null)
			 return;
		Data[] datas= process.getDatas().getDataArray();
		JSONArray array=new JSONArray();
		 for(int i=0;i<datas.length;i++){
			 Data data=datas[i];
			 JSONObject variable=new JSONObject();
			 variable.put("id",data.getId());
			 variable.put("name", data.getName());
			 if(data.getDescription()==null)
				 variable.put("description"," ");
			 else
				 variable.put("description",data.getDescription());
			 
			 String type=data.getDataType().toString();
			 String mergeRule=data.getMergeRule().toString();
			 variable.put("type", type);
			 variable.put("combineType",mergeRule);
			 if(data.getDefaultValue()==null)
				 variable.put("defaultValue", " ");
			 else
				 variable.put("defaultValue",data.getDefaultValue());
			 
			 if(data.getHandleClass()==null)
				 variable.put("javaApp"," ");
			 else
				 variable.put("javaApp",data.getHandleClass());
			 
			 variable.put("combineTypeName", getName("combineType",mergeRule));
			 variable.put("typeName", getName("type",type));
			 array.add(variable);
		 }
		 form.setVariableJson(array.toString());
	 }
	 
	 private static String getName(String type,String value){
		 String name="";
		 if(type.equals("type"))
		 {
			 if(value.equals("1"))
				 name="字符串";
			 else if(value.equals("0"))
				 name="整数";
			 else if(value.equals("3"))
				 name="浮点数";
			 else if(value.equals("4"))
				 name="日期";
			 else if(value.equals("10"))
				 name="XML";
		 }
		 
		 if(type.equals("combineType"))
		 {
			 if(value.equals("1"))
				 name="追加";
			 else if(value.equals("0"))
				 name="覆盖";
				 
		 }
		 return name;
	 }
}
