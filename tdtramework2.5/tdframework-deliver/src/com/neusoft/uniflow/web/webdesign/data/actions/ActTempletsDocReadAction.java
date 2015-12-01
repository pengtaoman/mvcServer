package com.neusoft.uniflow.web.webdesign.data.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.NWSessionImpl;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWActTemplet;
import com.neusoft.uniflow.api.def.NWEngineEvent;
import com.neusoft.uniflow.api.def.NWParam;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.api.def.NWTimerEntity;
import com.neusoft.uniflow.category.ICategory;
import com.neusoft.uniflow.category.ICategoryEntry;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.toollistener.ServerIO.ServerIO;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.webdesign.data.beans.ActTempletsDocReadForm;
import com.neusoft.workflow.ActTemplet;
import com.neusoft.workflow.ActTempletEngineEvent;
import com.neusoft.workflow.ActTempletParticipant;
import com.neusoft.workflow.ActTemplets;
import com.neusoft.workflow.ActTempletsDocument;
import com.neusoft.workflow.AutoActTemplet;
import com.neusoft.workflow.EngineEvents;
import com.neusoft.workflow.ManualActTemplet;
import com.neusoft.workflow.Participants;
import com.neusoft.workflow.SubProcActTemplet;
import com.neusoft.workflow.SubProceMaps;
import com.neusoft.workflow.SubprocVarMap;
import com.neusoft.workflow.TimeOut;

public class ActTempletsDocReadAction extends Action{
	private ServerIO serverIO;
	private HttpServletRequest request;
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		this.request=request;
		
		String id = request.getParameter("categoryID");
		String isGetNode = request.getParameter("isGetNode");
		ServerIO  server = UniflowManager.getServerIO();
		if(null == id){
			NWSession session = server.getWFSession();
			ICategoryEntry cateEntry = session.getCategoryEntry();
			Vector cateVector = cateEntry.openAbsoluteRootCategoryList(ICategoryEntry.ACTTEMPLET);
			String rootArrayStr = "";
			for(int i=0;i<cateVector.size();i++){
				String name = ((ICategory)(cateVector.get(i))).getName();
				String iD = ((ICategory)(cateVector.get(i))).getId();
				rootArrayStr += name + "|" + iD + ";";
			}
			if(rootArrayStr != ""){
			   int length = rootArrayStr.length();
			   rootArrayStr = rootArrayStr.substring(0, length-1);
			}
			request.setAttribute("rootArrayStr", rootArrayStr);
			return mapping.findForward("loadRoot");
		}
		if("false".equals(isGetNode)){
			NWSession session = server.getWFSession();
			ICategoryEntry cateEntry = session.getCategoryEntry();
			Vector cateVector = cateEntry.openNextLevelCategoryList(id);
			String rootArrayStr = "";
			for(int i=0;i<cateVector.size();i++){
				String name = ((ICategory)(cateVector.get(i))).getName();
				String iD = ((ICategory)(cateVector.get(i))).getId();
				rootArrayStr += name + "|" + iD + ";";
			}
			if(rootArrayStr != ""){
			   int length = rootArrayStr.length();
			   rootArrayStr = rootArrayStr.substring(0, length-1);
			}
			request.setAttribute("childLevelArray", rootArrayStr);
			return mapping.findForward("loadChild");
			
		}
		try {
			ActTempletsDocument actTempletsDoc = readActTemplets(server.getWFSession() ,id);
					
			if (actTempletsDoc != null) {
				ActTempletsDocReadForm ATDForm = (ActTempletsDocReadForm)form;
				ATDForm.setATDoc(actTempletsDoc);
			} else {
				ActTempletsDocReadForm ATDForm = (ActTempletsDocReadForm)form;			
				ATDForm.setATDoc(null);
			}
		} catch (Exception e) {
			e.printStackTrace();			
		}
		return mapping.findForward("success");
	}
	
	private ActTempletsDocument readActTemplets(NWSessionImpl session ,String categoryID)
	throws NWException {
		Vector nwActTemplets = session.getProcDefManager().openActTmpListByClassifiedID(categoryID);
		if (nwActTemplets != null) {
			ActTempletsDocument actTempletsDoc = ActTempletsDocument.Factory.newInstance();
			ActTemplets actTemplets = actTempletsDoc.addNewActTemplets();
			for (int i = 0; i < nwActTemplets.size(); i++) {
				NWActTemplet templet = (NWActTemplet) nwActTemplets.get(i);
				if (templet.getType() == NWActDef.ACT_TYPE_MANUAL) {
					ManualActTemplet actTemplet = actTemplets
							.addNewManualActTemplet();
					copyActTemplet(templet, actTemplet);
				} else if (templet.getType() == NWActDef.ACT_TYPE_AUTO) {
					AutoActTemplet actTemplet = actTemplets
							.addNewAutoActTemplet();
					copyActTemplet(templet, actTemplet);
				} else if (templet.getType() == NWActDef.ACT_TYPE_SYNCHSUBPROC) {
					SubProcActTemplet actTemplet = actTemplets
							.addNewSubProcActTemplet();
					copyActTemplet(templet, actTemplet);
				} else if (templet.getType() == NWActDef.ACT_TYPE_ASYNCHSUBPROC) {
					SubProcActTemplet actTemplet = actTemplets
							.addNewSubProcActTemplet();
					copyActTemplet(templet, actTemplet);
				}
			}
			return actTempletsDoc;
		}

		return null;
	}
	
		private void copyActTemplet(NWActTemplet templet,ManualActTemplet actTemplet) throws NWException {
			copyBaseActTemplet(templet, actTemplet);
			copyManualActTemplet(templet, actTemplet);
		}
		
		private void copyBaseActTemplet(NWActTemplet templet, ActTemplet actTemplet)
		throws NWException {
	actTemplet.setName(templet.getName());
	actTemplet.setId(templet.getID());
	actTemplet.setCategory(templet.getBusinessCategory());
	actTemplet.setCategoryTreeId(templet.getCategoryTreeID());
	actTemplet.setDesc(templet.getDescription());
	actTemplet.setEventReceiver(templet.getMsgReceiver());
	Vector engineEvants = templet.openEngineEventList();
	if (engineEvants.size() > 0) {
		EngineEvents actTempletEngineEvents = actTemplet
				.addNewEngineEvents();
		for (int i = 0; i < engineEvants.size(); i++) {
			NWEngineEvent engineEvent = (NWEngineEvent) engineEvants.get(i);
			ActTempletEngineEvent actEngineEvent = actTempletEngineEvents
					.addNewEngineEvent();
			actEngineEvent.setEventAction(engineEvent.getAction());
			actEngineEvent.setEventId(engineEvent.getType());
		}
	}

	actTemplet.setExtensionProper(templet.getExtProp());
	actTemplet.setPostCondition(templet.getPostCondition());
	actTemplet.setPreCondition(templet.getPreCondition());
	NWTimerEntity timer = templet.getTimer();
	if (timer != null) {
		TimeOut timeOut = actTemplet.addNewTimeOut();
		timeOut.setTimeOutAction(timer.getLimitAction());
		timeOut.setLimitTime(timer.getLimitTime());
		timeOut.setTimeOutApplication(timer.getLimitApplication());
		timeOut.setWarnAction(timer.getWarningAction());
		timeOut.setWarnApplication(timer.getWarningApplication());
		timeOut.setWarnInterval(timer.getWarningInterval());
		timeOut.setWarnTime(timer.getWarningTime());
	}

	actTemplet.setType(templet.getType());
}
		
		private void copyManualActTemplet(NWActTemplet templet,
				ManualActTemplet actTemplet) throws NWException {
			actTemplet.setNeedPartRole(templet.isNeedPtcptRole());
			actTemplet.setOperatorAction(templet.getParallelRule());
			actTemplet.setOperatorLevel(templet.getOperationLevel());

			Vector parts = templet.openParticipantList();
			if (parts.size() > 0) {
				Participants actTempletParts = actTemplet.addNewParticipants();
				for (int i = 0; i < parts.size(); i++) {
					NWParticipantEntity nwPart = (NWParticipantEntity) parts.get(i);
					ActTempletParticipant actTempletPart = actTempletParts
							.addNewParticipant();
					actTempletPart.setAuthorityType(nwPart.getActionType());
					int type = nwPart.getEntityType();
					String value = "";
					if (type == NWParticipantEntity.PTCPTENTITY_TYPE_SCRIPT) {
						value = nwPart.getParticipantScript();
					} else {
						value = nwPart.getEntityID();
					}
					actTempletPart.setType(nwPart.getEntityType());
					actTempletPart.setValue(value);
				}
			}

			actTemplet.setApplication(templet.getAppID());
		}
		
		protected void copyActTemplet(NWActTemplet templet,
				AutoActTemplet actTemplet) throws NWException {
			copyBaseActTemplet(templet, actTemplet);
			copyAutoProcActTemplet(templet, actTemplet);
		}
		
		private void copyAutoProcActTemplet(NWActTemplet templet,
				AutoActTemplet actTemplet) {

			actTemplet.setApplication(templet.getAppID());
		}
		
		protected void copyActTemplet(NWActTemplet templet,
				SubProcActTemplet actTemplet) throws NWException {
			copyBaseActTemplet(templet, actTemplet);
			copySubProcActTemplet(templet, actTemplet);
		}
		
		private void copySubProcActTemplet(NWActTemplet templet,
				SubProcActTemplet actTemplet) throws NWException {
			actTemplet.setSubProcId(templet.getSubProcID());
			actTemplet.setSubProcServerName(templet.getSubProcServerID());
			actTemplet.setSubProcVersion(templet.getSubProcVersion());
			actTemplet.setSubProcName(templet.getSubProcName());
			actTemplet.setCoupleType(templet.getSubProcCoupleType());
			if (templet.getType() == NWActDef.ACT_TYPE_ASYNCHSUBPROC) {
				actTemplet.setInvokeType(0);
			} else if (templet.getType() == NWActDef.ACT_TYPE_SYNCHSUBPROC) {
				actTemplet.setInvokeType(1);
			}

			Vector params = templet.openSubprocParamList();
			if (params.size() > 0) {
				SubProceMaps subProcMaps = actTemplet.addNewVarMaps();
				for (int i = 0; i < params.size(); i++) {
					NWParam param = (NWParam) params.get(i);
					SubprocVarMap varMap = subProcMaps.addNewSubProcVarMap();
					varMap.setParentProcVar(param.getVar1ID());
					varMap.setSubProcVar(param.getVar2ID());
					varMap.setType(param.getDirection());
				}
			}
		}


}
