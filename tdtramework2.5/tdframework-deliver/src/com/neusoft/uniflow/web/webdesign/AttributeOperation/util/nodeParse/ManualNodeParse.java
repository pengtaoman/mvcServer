package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.api.res.NWApplication;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.GetNameUtil;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ParticipantUtil;
import com.neusoft.workflow.model.Application;
import com.neusoft.workflow.model.AssignRuleType;
import com.neusoft.workflow.model.Data;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.OperationLevelType;
import com.neusoft.workflow.model.Participant;
import com.neusoft.workflow.model.ProcessContentDocument;

public class ManualNodeParse {

	public static ManualNodeForm xmlParse(ProcessContentDocument doc,
			String id, HttpServletRequest request) {
		ManualNodeForm mnform = new ManualNodeForm();
		ManualNode manual = null;
		String primaryPeople = "";
		String minorPeople = "";
		String primaryPeopleName = "";
		String minorPeopleName = "";
		String punit = "";
		String munit = "";
		ArrayList pUnitNameArray = null;
		ArrayList mUnitNameArray = null;
		String namespace = "declare namespace s='http://workflow.neusoft.com/model/'";
		String pathExpression = "./s:ProcessContent/Process//ManualNode";
		String manualNode = "";
		String variables = "";
		String manualNodeVariables = "";
		ManualNode[] results = (ManualNode[]) doc.selectPath(namespace
				+ pathExpression);
		Data[] datas = doc.getProcessContent().getProcess().getDatas()
				.getDataArray();
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					manual = results[i];
				} else {
					manualNode = manualNode + results[i].getID() + ","
							+ results[i].getName() + ";";
				}
			}
		}
		if (datas.length > 0) {
			for (int j = 0; j < datas.length; j++) {
				String dataType = datas[j].getDataType().toString();
				if (dataType.equals("0")) {
					variables = variables + datas[j].getId() + ","
							+ datas[j].getName() + ";";
				}
				if (dataType.equals("1") || dataType.equals("10")) {
					manualNodeVariables = manualNodeVariables
							+ datas[j].getId() + "," + datas[j].getName() + ";";
				}
			}
		}

		request.setAttribute("manualNode", manualNode);
		request.setAttribute("variablesManualNode", variables);
		request.setAttribute("manualNodeVariables", manualNodeVariables);
		if (null != manual) {
			mnform = (ManualNodeForm) ActivityNodeParse.xmlParse(manual,
					mnform, request);
			mnform.setApplication(manual.getApplication());
			mnform.setApplicationParams(mnform.getApplicationParams());
			if (manual.getExpiration() != null
					&& manual.getExpiration().getAction() != null) {
				mnform
						.setExActionName(GetNameUtil.getAppName(manual
								.getExpiration().getAction().getApplication(),
								request));
			}
			if (manual.getExpiration() != null
					&& manual.getExpiration().getAlertAction() != null) {
				mnform.setExAlertActionName(GetNameUtil.getAppName(manual
						.getExpiration().getAlertAction().getApplication(),
						request));
			}
			String applicationName = GetNameUtil.getAppName(manual
					.getApplication(), request);
			mnform.setApplicationName(applicationName);
			if (manual.getParticipants() != null) {
				Participant[] participants = manual.getParticipants()
						.getParticipantArray();
				if (participants != null) {
					String assignRuleTemp = AssignRuleType.X_0.toString();
					String operationLevel = OperationLevelType.X_0.toString();

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
					if (manual.getAssignRule() != null) {
						assignRuleTemp = manual.getAssignRule().toString();
					}
					if (manual.getOperationLevel() != null) {
						operationLevel = manual.getOperationLevel().toString();
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
					mnform.setAssignRule(assignRuleTemp);
					mnform.setOpertionLevel(operationLevel);

				}
			}

		}
		mnform.setXmlStr(doc.toString());
		return mnform;
	}

}