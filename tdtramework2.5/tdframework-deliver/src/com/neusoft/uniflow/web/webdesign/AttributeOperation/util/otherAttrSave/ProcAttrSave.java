package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.procForms.ProcForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ParticipantUtil;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave.ActivityNodeAttrSave;
import com.neusoft.workflow.model.Data;
import com.neusoft.workflow.model.DataType;
import com.neusoft.workflow.model.DatasMergeType;
import com.neusoft.workflow.model.Participant;
import com.neusoft.workflow.model.Process;
import com.neusoft.workflow.model.ProcessContentDocument;

public class ProcAttrSave {
	public static Process save(ProcessContentDocument doc ,ProcForm form , String id){
		Process process = doc.getProcessContent().getProcess();
    	if( process !=null&& process.getID().equals(id)){
    		ActivityNodeAttrSave.save(process, form , "Process");
    		process.setBuilder(form.getBuilder());
    		process.setBuildTime(form.getBuildTime());
    		process.setVersionName(form.getVersionName());
    		process.setModifiedTime(form.getModifiedTime());
    	    if( process.getValidCreators()!= null ){
     		   Participant [] persons = process.getValidCreators().getParticipantArray();
     		   if(persons != null){
     		      for(int i=persons.length;i>0;i--){ 
     			     process.getValidCreators().removeParticipant(0);
     		      }
     	       }
    	    }else{
    		   process.addNewValidCreators();
    	    }
    		
    	    if( process.getMonitors()!= null ){
      		   Participant [] persons = process.getMonitors().getParticipantArray();
      		   if(persons != null){
      		      for(int i=persons.length;i>0;i--){ 
      			     process.getMonitors().removeParticipant(0);
      		      }
      	       }
     	    }else{
     		   process.addNewMonitors();
     	    }
    	 
    	    
    	    
    	    
//    	   String str = form.getValidCreatorsPerson();
//    	   ParticipantUtil.setParticipant(str, ParticipantType.X_0, "1", process.getValidCreators());
//    	   
//    	   str = form.getValidCreatorsRole();
//    	   ParticipantUtil.setParticipant(str, ParticipantType.X_1, "1", process.getValidCreators());
//    	   
//    	   str = form.getMonitorsPerson();
//    	   ParticipantUtil.setParticipant(str, ParticipantType.X_0, "1", process.getMonitors());
//    	   
//    	   str = form.getMonitorsRole();
//    	   ParticipantUtil.setParticipant(str, ParticipantType.X_1, "1", process.getMonitors());
    	   
    	   String str = form.getValidCreators();
    	   ParticipantUtil.setParticipant(str, "1", process.getValidCreators());
    	
    	   str = form.getMonitors();
    	   ParticipantUtil.setParticipant(str, "1", process.getMonitors());
    	   
    	   setProcVariables(process,form);
    	   
     }
    	return process;
  }
	/**
	 * 设置流程变量
	 * @param process
	 * @param form
	 */
	private static void setProcVariables(Process process ,ProcForm form){
		String variableJson=form.getVariableJson();
		//通过前台传过来的字符串格式判断流程变量是否进行了改变（首次请求的变量数据格式是数组，而传回到后台的则是json串）
		JSONArray  variableArray=JSONArray.fromObject(variableJson);
		if(process.getDatas()!=null){
			Data[] datas=process.getDatas().getDataArray();
			for(int i=0;i<datas.length;i++){
				process.getDatas().removeData(0);
			}
		}
		
		for (int i = 0; i < variableArray.size(); i++) {
			JSONObject var = (JSONObject) variableArray.get(i);
			Data data=process.getDatas().addNewData();
			String varID=var.getString("id");
			if(Util.isNullOrEmpty(varID))
				varID=Util.generateGUID();
			data.setId(varID);
			data.setName(var.getString("name"));
			data.setDescription(var.getString("description"));
			data.setDataType(DataType.Enum.forString(var.getString("type")));
			data.setMergeRule(DatasMergeType.Enum.forString(var.getString("combineType")));
			data.setDefaultValue(var.getString("defaultValue"));
			data.setHandleClass(var.getString("javaApp"));
		}
	}
	
}
