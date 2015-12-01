package com.neusoft.uniflow.web.webdesign.AttributeOperation.util;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;

import com.neusoft.form.api.FormDBException;
import com.neusoft.form.api.FormDefBrief;
import com.neusoft.form.api.FormPersistManager;
import com.neusoft.form.manage.server.FormManagerFactory;
import com.neusoft.uniflow.web.toollistener.ServerIO.ServerIO;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms.AutoNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.subProcNodeForms.SubProcNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.AppForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.ActivityNodeParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse.Messages;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherParse.WorkflowResourceParse;
import com.neusoft.workflow.model.Application;
import com.neusoft.workflow.model.AssignRuleType;
import com.neusoft.workflow.model.AutoNode;
import com.neusoft.workflow.model.CoupleType;
import com.neusoft.workflow.model.Data;
import com.neusoft.workflow.model.InvokeModeType;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.OperationLevelType;
import com.neusoft.workflow.model.Participant;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.SubprocNode;

public class ModelElementToAttributeForm {
	
	public static ManualNodeForm getManualNodeForm(ManualNode manual,HttpServletRequest request)
	{
		ManualNodeForm mnform =  new ManualNodeForm();
		String primaryPeople = "";
		String minorPeople = "";
		String primaryPeopleName = "";
		String minorPeopleName = "";
		String punit = "";
		String munit = "";
		ArrayList pUnitNameArray = null;
		ArrayList mUnitNameArray = null;	
		if(null != manual)
		{
			mnform = (ManualNodeForm) ActivityNodeParse.xmlParse(manual,
					mnform, request);
			mnform.setApplication(manual.getApplication());
			mnform.setApplicationParams(mnform.getApplicationParams());
			if (manual.getExpiration() != null
					&& manual.getExpiration().getAction() != null && !manual.getExpiration().getAction().getApplication().equals("")) {
				mnform
						.setExActionName(GetNameUtil.getAppName(manual
								.getExpiration().getAction().getApplication(),
								request));
			}
			if (manual.getExpiration() != null
					&& manual.getExpiration().getAlertAction() != null && !manual.getExpiration().getAlertAction().getApplication().equals("")) {
				mnform.setExAlertActionName(GetNameUtil.getAppName(manual
						.getExpiration().getAlertAction().getApplication(),
						request));
			}
			String applicationName = GetNameUtil.getAppName(manual
					.getApplication(), request);
			mnform.setApplicationName(applicationName);
			String assignRuleTemp = AssignRuleType.X_0.toString();
			String operationLevel = OperationLevelType.X_0.toString();
			if (manual.getParticipants() != null) {
				Participant[] participants = manual.getParticipants()
						.getParticipantArray();
				if (participants != null) {				
					try {
						mnform.setPrimaryPreDefine(ParticipantUtil
								.getPrimaryPreDefine(participants));
						mnform.setMinorPreDefine(ParticipantUtil
								.getMinorPreDefinePreDefine(participants));
						mnform.setVariablesString(ParticipantUtil
								.getPrimaryVariablesParticipant(participants));
						mnform.setMinorVariablesString(ParticipantUtil
								.getMinorVariablesParticipant(participants));
						mnform.setNodeArraryString(ParticipantUtil
								.getPrimaryNodeParticipant(participants));
						mnform.setMinorNodeArraryString(ParticipantUtil
								.getMinorNodeParticipant(participants));
					} catch (Exception e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
					try {
						pUnitNameArray = ParticipantUtil
								.getPrimaryParticipant(participants);
						mUnitNameArray = ParticipantUtil
								.getMinorParticipant(participants);
					} catch (Exception e) {
						e.printStackTrace();
					}
					String pUnit = pUnitNameArray.get(0).toString();
					String mUnit = mUnitNameArray.get(0).toString();
					if (pUnit != "") {
						int n = pUnit.length();
						pUnit = pUnit.substring(0, n - 1);
					}
					if (mUnit != "") {
						int n = mUnit.length();
						mUnit = mUnit.substring(0, n - 1);
					}
					punit = pUnit;
					munit = mUnit;

					String pNames = pUnitNameArray.get(1).toString();
					String mNames = mUnitNameArray.get(1).toString();
					if (pNames != "") {
						int n = pNames.length();
						pNames = pNames.substring(0, n - 1);
					}
					if (mNames != "") {
						int n = mNames.length();
						mNames = mNames.substring(0, n - 1);
					}
					primaryPeopleName = pNames;
					minorPeopleName = mNames;

					String pIds = pUnitNameArray.get(2).toString();
					String mIds = mUnitNameArray.get(2).toString();
					if (pIds != "") {
						int n = pIds.length();
						pIds = pIds.substring(0, n - 1);
					}
					if (mIds != "") {
						int n = mIds.length();
						mIds = mIds.substring(0, n - 1);
					}
					primaryPeople = pIds;
					minorPeople = mIds;
					// name,id|0;name,id|1;
					mnform.setPunit(punit);
					mnform.setMunit(munit);
					// name1;name2;
					mnform.setPrimaryPeopleName(primaryPeopleName);
					mnform.setMinorPeopleName(minorPeopleName);
					// id1;id2
					mnform.setPrimaryPeople(primaryPeople);
					mnform.setMinorPeople(minorPeople);
					mnform.setApplication(manual.getApplication());
					
				}
			}
			if (manual.getAssignRule() != null) {
				assignRuleTemp = manual.getAssignRule().toString();
			}
			if (manual.getOperationLevel() != null) {
				operationLevel = manual.getOperationLevel().toString();
			}
			mnform.setAssignRule(assignRuleTemp);
			mnform.setOpertionLevel(operationLevel);
		}
		return mnform;
	}
	
	public static AutoNodeForm getAutoNodeForm(AutoNode auto,HttpServletRequest request)
	{
		AutoNodeForm form = new AutoNodeForm();
		form = (AutoNodeForm)ActivityNodeParse.xmlParse(auto,form,request );	
		form.setApplication(auto.getApplication());
		form.setApplicationParams(auto.getApplicationParams());
		if(auto.getExpiration()!=null && !auto.getExpiration().getAction().getApplication().equals("")){
			form.setExActionName(GetNameUtil.getAppName(auto.getExpiration().getAction().getApplication(),request));
		}
		if(auto.getExpiration()!=null && !auto.getExpiration().getAlertAction().getApplication().equals("")){
			form.setExAlertActionName(GetNameUtil.getAppName(auto.getExpiration().getAlertAction().getApplication(),request));
		}
		String applicationName = "";
		if(auto.getApplication()!=null && !auto.getApplication().equals(""))
			applicationName=GetNameUtil.getAppName(auto.getApplication(),request);
		form.setApplicationName(applicationName);
		return form;
	}
	
	public static SubProcNodeForm getSubProcNodeForm(SubprocNode subProcNode,HttpServletRequest request)throws Exception
	{
		SubProcNodeForm form = new SubProcNodeForm();
		String parentVariableName = "";
		String supprocVariableName = "";
		String mapTypeName = "";
		String parentVariableId = "";
		String supprocVariableId = "";
		String mapTypeNameId = "";
		String gridDate = "";
		String parentDataString = "";
		Data[] datas = null;
		form = (SubProcNodeForm) ActivityNodeParse.xmlParse(subProcNode, form,request);
		if (subProcNode.getExpiration() != null && !subProcNode.getExpiration().getAction().getApplication().equals("")) {
			form.setExActionName(GetNameUtil.getAppName(subProcNode
							.getExpiration().getAction().getApplication(),
							request));
		}
		if (subProcNode.getExpiration() != null && !subProcNode.getExpiration().getAction().getApplication().equals("")) {
			form.setExAlertActionName(GetNameUtil.getAppName(subProcNode
					.getExpiration().getAlertAction().getApplication(),
					request));
		}
		if(subProcNode.getSubProc()!=null){
			form.setProcName(GetNameUtil.getSubprocName(subProcNode.getSubProc()
				.getProcessID(), subProcNode.getSubProc().getVersionName(),
				request));
			form.setSubproc(subProcNode.getSubProc().getProcessID());
			form.setVersionName(subProcNode.getSubProc().getVersionName());
		}
		if (subProcNode.getSubProcCoupleType() != null) {
			if (CoupleType.INT_X_0 == subProcNode.getSubProcCoupleType()
					.intValue()) {
				form.setCoupleType(ConstantsForAttr.CoupleType_loosely);
			} else if (CoupleType.INT_X_1 == subProcNode.getSubProcCoupleType()
					.intValue()) {
				form.setCoupleType(ConstantsForAttr.CoupleType_tightly);
			}
		}
		if (subProcNode.getInvokeMode() != null) {
			if (InvokeModeType.INT_X_0 == subProcNode.getInvokeMode()
					.intValue()) {
				form.setInvokeType(ConstantsForAttr.InvokeModeType_asynch);
			} else if (InvokeModeType.INT_X_1 == subProcNode.getInvokeMode()
					.intValue()) {
				form.setInvokeType(ConstantsForAttr.InvokeModeType_Synch);
			}
		}
		ServerIO serverIO = UniflowManager.getServerIO();
		
		ProcessContentDocument EPDoc;
		ProcessContentDocument SubEPDoc;
		EPDoc = serverIO.readProcFromServer(subProcNode.getID());
		Data[] subDatas=null;
		if(subProcNode.getSubProc()!=null&&subProcNode.getSubProc().getProcessID() != null){
		SubEPDoc = serverIO.readProcFromServer(subProcNode.getSubProc().getProcessID());
		if(SubEPDoc.getProcessContent().getProcess().getDatas()!=null){
			subDatas = SubEPDoc.getProcessContent().getProcess().getDatas().getDataArray();
			}
		}
		request.setAttribute("parentData", parentDataString);
		if (subProcNode.getSubProc() != null&&subDatas!=null&& subProcNode.getSubProcParams() != null&& subProcNode.getSubProcParams().getVariableMapArray() != null) {
			
			for (int i = 0; i < subProcNode.getSubProcParams()
					.getVariableMapArray().length; i++) {
				if (subProcNode.getSubProcParams() != null) {
					if (datas != null) {
						for (int j = 0; j < datas.length; j++) {
							if (subProcNode.getSubProcParams().getVariableMapArray(
									i).getParentVariable().equals(
									datas[j].getId())) {
								parentVariableName = "'" + datas[j].getName()
										+ "'";
								parentVariableId = "'" + datas[j].getId() + "'";
							}
						}
					}
					for (int k = 0; k < subDatas.length; k++) {
						if (subProcNode.getSubProcParams().getVariableMapArray(
								i).getSupprocVariable().equals(
								subDatas[k].getId())) {
							supprocVariableName = "'"
									+ subDatas[k].getName() + "'";
							supprocVariableId = "'" + subDatas[k].getId()
									+ "'";
						}
					}
					if (subProcNode.getSubProcParams().getVariableMapArray(i)
							.getMapType() == 0) {
						mapTypeName = "'" + Messages.getString("SubProcNodeParse.in") + "'";
						mapTypeNameId = "'" + "0" + "'";
					} else if (subProcNode.getSubProcParams()
							.getVariableMapArray(i).getMapType() == 1) {
						mapTypeName = "'" + Messages.getString("SubProcNodeParse.out") + "'";
						mapTypeNameId = "'" + "1" + "'";
					} else {
						mapTypeName = "'" + Messages.getString("SubProcNodeParse.inorout") + "'";
						mapTypeNameId = "'" + "2" + "'";
					}

					gridDate = gridDate + "[" + parentVariableName + ","
							+ supprocVariableName + "," + mapTypeName + ","
							+ parentVariableId + "," + supprocVariableId
							+ "," + mapTypeNameId + "]";
					if ((i + 1) < subProcNode.getSubProcParams()
							.getVariableMapArray().length) {
						gridDate = gridDate + ",";
					}
				}
			}
			request.setAttribute("JsonData", "[" + gridDate + "]");
			request.setAttribute("parentData", parentDataString);
		} else {		
			request.setAttribute("JsonData", "null");		
		}
		return form ;
	}
	
	public static AppForm getAppForm(Application app,HttpServletRequest request)throws Exception
	{
		AppForm  form = new AppForm();
		form = (AppForm)WorkflowResourceParse.xmlParse(app, form);
		form.setAppUrl(app.getAppURL());
		form.setBuilder(app.getBuilder());
		form.setBuildTime(app.getBuildTime());	
		String formName=getFormName(app.getAppURL(),request);
		form.setFormName(formName);
		if( app.getAppType()!= null){
			form.setAppType(app.getAppType().toString());
		}else{
			form.setAppType(ConstantsForAttr.AppType_WForm);
		}
		
		if(app.getAppHost() !=null && !"".equals(app.getAppHost())){
			form.setAppHost(app.getAppHost());
		}else{
			form.setAppHost("appmanager");
		}

		if(app.getSynchMode() !=null){
    		form.setSynchMode(app.getSynchMode().toString());
		}else{
			form.setSynchMode(ConstantsForAttr.InvokeModeType_Synch);
		}
		
		return form;
		
	}
	
	private static String getFormName(String formID,HttpServletRequest request) throws Exception{
		FormPersistManager manager = FormManagerFactory.createManagerFactory(request).getFormPersistManager();
		List formList = manager.loadFormBriefList();
		for (int i = 0; i < formList.size(); i++) {
			FormDefBrief formDef = (FormDefBrief) formList.get(i);
			if(formDef.getID().equals(formID))
				return formDef.getName();
		}
		return "";
	}

}
