package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.toollistener.ServerIO.ServerIO;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.subProcNodeForms.SubProcNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ConstantsForAttr;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.GetNameUtil;
import com.neusoft.workflow.model.CoupleType;
import com.neusoft.workflow.model.Data;
import com.neusoft.workflow.model.InvokeModeType;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.SubprocNode;

public class SubProcNodeParse {
	public static SubProcNodeForm xmlParse(ProcessContentDocument doc,
			String type, String id, HttpServletRequest request)
			throws Exception {
		SubProcNodeForm form = new SubProcNodeForm();
		SubprocNode subProc = null;
		String parentVariableName = "";
		String supprocVariableName = "";
		String mapTypeName = "";
		String parentVariableId = "";
		String supprocVariableId = "";
		String mapTypeNameId = "";
		String gridDate = "";
		String parentDataString = "";
		Data[] datas = null;
		String namespace = "declare namespace s='http://workflow.neusoft.com/model/'";
		String pathExpression = "./s:ProcessContent/Process//SubprocNode";
		SubprocNode[] results = (SubprocNode[]) doc.selectPath(namespace
				+ pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					subProc = results[i];
				}
			}
		}
		if (subProc == null) {
		} else {
			form = (SubProcNodeForm) ActivityNodeParse.xmlParse(subProc, form,
					request);
			if (subProc.getExpiration() != null) {
				form
						.setExActionName(GetNameUtil.getAppName(subProc
								.getExpiration().getAction().getApplication(),
								request));
			}
			if (subProc.getExpiration() != null) {
				form.setExAlertActionName(GetNameUtil.getAppName(subProc
						.getExpiration().getAlertAction().getApplication(),
						request));
			}
			if(subProc.getSubProc()!=null){
				form.setProcName(GetNameUtil.getSubprocName(subProc.getSubProc()
					.getProcessID(), subProc.getSubProc().getVersionName(),
					request));
				form.setSubproc(subProc.getSubProc().getProcessID());
				form.setVersionName(subProc.getSubProc().getVersionName());
			}
			if (subProc.getSubProcCoupleType() != null) {
				if (CoupleType.INT_X_0 == subProc.getSubProcCoupleType()
						.intValue()) {
					form.setCoupleType(ConstantsForAttr.CoupleType_loosely);
				} else if (CoupleType.INT_X_1 == subProc.getSubProcCoupleType()
						.intValue()) {
					form.setCoupleType(ConstantsForAttr.CoupleType_tightly);
				}
			}
			if (subProc.getInvokeMode() != null) {
				if (InvokeModeType.INT_X_0 == subProc.getInvokeMode()
						.intValue()) {
					form.setInvokeType(ConstantsForAttr.InvokeModeType_asynch);
				} else if (InvokeModeType.INT_X_1 == subProc.getInvokeMode()
						.intValue()) {
					form.setInvokeType(ConstantsForAttr.InvokeModeType_Synch);
				}
			}
			ServerIO serverIO = UniflowManager.getServerIO();
			ProcessContentDocument EPDoc;
			ProcessContentDocument SubEPDoc;
			EPDoc = serverIO.readProcFromServer(subProc.getID());
			if(doc.getProcessContent().getProcess().getDatas()!=null){
			 datas = doc.getProcessContent().getProcess().getDatas()
				.getDataArray();
			 for (int i = 0; i < datas.length; i++) {
					parentDataString = parentDataString + "[" + "\""
							+ datas[i].getId() + "\"" + "," + "\""
							+ datas[i].getName() + "\"" + "]";
					if ((i + 1) < datas.length) {
						parentDataString = parentDataString + ",";
					}
				}
			}else{
				 parentDataString = "[" + "\"" + " " + "\"" + "," + "\""
				+ " " + "\"" + "]";
		
		
			}
			Data[] subDatas=null;
			if(subProc.getSubProc()!=null&&subProc.getSubProc().getProcessID() != null){
			SubEPDoc = serverIO.readProcFromServer(subProc.getSubProc().getProcessID());
			if(SubEPDoc.getProcessContent().getProcess().getDatas()!=null){
				subDatas = SubEPDoc.getProcessContent().getProcess().getDatas().getDataArray();
				}
			}
			request.setAttribute("parentData", parentDataString);
			if (subProc.getSubProc() != null&&subDatas!=null&& subProc.getSubProcParams() != null&& subProc.getSubProcParams().getVariableMapArray() != null) {
				
				for (int i = 0; i < subProc.getSubProcParams()
						.getVariableMapArray().length; i++) {
					if (subProc.getSubProcParams() != null) {
						for (int j = 0; j < datas.length; j++) {
							if (subProc.getSubProcParams().getVariableMapArray(
									i).getParentVariable().equals(
									datas[j].getId())) {
								parentVariableName = "'" + datas[j].getName()
										+ "'";
								parentVariableId = "'" + datas[j].getId() + "'";

							}
						}

						for (int k = 0; k < subDatas.length; k++) {
							if (subProc.getSubProcParams().getVariableMapArray(
									i).getSupprocVariable().equals(
									subDatas[k].getId())) {
								supprocVariableName = "'"
										+ subDatas[k].getName() + "'";
								supprocVariableId = "'" + subDatas[k].getId()
										+ "'";

							}
						}
						if (subProc.getSubProcParams().getVariableMapArray(i)
								.getMapType() == 0) {
							mapTypeName = "'" + Messages.getString("SubProcNodeParse.in") + "'";
							mapTypeNameId = "'" + "0" + "'";
						} else if (subProc.getSubProcParams()
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
						if ((i + 1) < subProc.getSubProcParams()
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

		}

		return form;
	}
}
