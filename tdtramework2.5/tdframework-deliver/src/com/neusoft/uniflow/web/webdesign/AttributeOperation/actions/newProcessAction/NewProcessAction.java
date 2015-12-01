package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.newProcessAction;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.toollistener.ServerIO.ServerIO;
import com.neusoft.uniflow.web.toollistener.Util.NWGUIDGenerator;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.util.WorkflowManager;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.procForms.ProcForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.XMLParse;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.otherAttrSave.ProcAttrSave;
import com.neusoft.workflow.model.AlertAction;
import com.neusoft.workflow.model.AssignRuleType;
import com.neusoft.workflow.model.BooleanType;
import com.neusoft.workflow.model.EndNode;
import com.neusoft.workflow.model.EngineEvent;
import com.neusoft.workflow.model.EngineEvents;
import com.neusoft.workflow.model.Expiration;
import com.neusoft.workflow.model.Expression;
import com.neusoft.workflow.model.ExtendProperties;
import com.neusoft.workflow.model.ExtendProperty;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.OperationLevelType;
import com.neusoft.workflow.model.Participant;
import com.neusoft.workflow.model.ParticipantType;
import com.neusoft.workflow.model.Participants;
import com.neusoft.workflow.model.Process;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.StartNode;
import com.neusoft.workflow.model.Transition;
import com.neusoft.workflow.model.Transitions;

public class NewProcessAction extends Action {
	private ServerIO serverIO;
	private HttpServletRequest request;
	private String expressionLang = "http://www.neusoft.com/workflow/language/expiration_simple";
	private String alertActionAppName = "Notify_FlowAdmin";
	private String nodeAlertActionAppName = "Notify_NodeAuditor";
	
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		String action = ((ProcForm)form).getAction();
		if("CreatInstance".equals(action)){
			String id = ((ProcForm)form).getId();
			String xmlStr = ((ProcForm)form).getXmlStr();
			
			ProcessContentDocument doc = ProcessContentDocument.Factory.newInstance();;
			try {
				doc = ProcessContentDocument.Factory.parse(xmlStr);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			Process process = ProcAttrSave.save(doc, (ProcForm)form, id);
			process.setBuildTime(Util.getDateFormat().format(new Date()));
			process.setVersionName(NWGUIDGenerator.getInstance().getID());
			String versionName = process.getVersionName();
			ExtendProperty[] extendPoperties = process.getManualNodeArray()[0].getExtendProperties().getExtendPropertyArray();
			for(int i=0;i<extendPoperties.length;i++){
				if(extendPoperties[i].getName().equals("canModifyFlow")){
					extendPoperties[i].setValue(((ProcForm)form).getCanModifyFlow());
					break;
				}
					
			}
			ServerIO  serverIO = UniflowManager.getServerIO();
			try {
				serverIO.writeProcToServer(doc);
				//ToDo...需要调用蓝凌流程和分类绑定.
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			request.setAttribute("selectedID", process.getID());
			request.setAttribute("selectedVersion",versionName );
			request.setAttribute("path", WorkflowManager.getWorkflowPath());
			return mapping.findForward("toNewFlex");
			
		}else{
			FlowDefineCommon defineCommon = new FlowDefineCommon();
	        ProcessContentDocument doc = ProcessContentDocument.Factory.newInstance();
			
			Process process = doc.addNewProcessContent().addNewProcess();
			//add process basic properties.
			process.setName("");
			process.setID(NWGUIDGenerator.getInstance().getID());
			process.setMsgReceiver("appmanager");
			process.setIsActiveVersion(BooleanType.X_1);
			
			//add special role.
			Participants monitors = process.addNewMonitors();
			Participant monitor = monitors.addNewParticipant();
			monitor.setType(ParticipantType.X_0);
			//ToDo...需要调用蓝凌获取当前登录人的id.
			monitor.setValue((String)request.getSession().getAttribute(SessionManager.BIZ_USERID));
			//add alert action.
			Expiration expiration = process.addNewExpiration();
			Expression exp = expiration.addNewAlertDuration();
			exp.setCondition("7200");
			exp.setExpressionLang(expressionLang);
			
			AlertAction alertAction = expiration.addNewAlertAction();
			alertAction.setCount("-1");
			alertAction.setType(1);
			alertAction.setInterval("1440");
			alertAction.setApplication(defineCommon.getApplicationIdByName(alertActionAppName));
			

			//add a new start node.
			StartNode startNode=process.addNewStartNode();//startNode
			startNode.setID(NWGUIDGenerator.getInstance().getID());
			startNode.setName("开始");
			startNode.setX(300);
			startNode.setY(20);
			//add a creator node.
			ManualNode manNode = initCreatorNode(process,defineCommon);
			
			
			//add a new end node.
			EndNode endNode=process.addNewEndNode();//endNode
			endNode.setID(NWGUIDGenerator.getInstance().getID());
			endNode.setName("结束");
			endNode.setX(300);
			endNode.setY(200);
			
			Transitions trans = process.addNewTransitions();
			//add a transition between start and creator node.
			Transition tran = trans.addNewTransition();
			tran.setId(NWGUIDGenerator.getInstance().getID());
			tran.setSource(startNode.getID());
			tran.setTarget(manNode.getID());
			tran.setName("link1");
			//add a transition between creator and end node.
			Transition tran2 = trans.addNewTransition();
			tran2.setId(NWGUIDGenerator.getInstance().getID());
			tran2.setSource(manNode.getID());
			tran2.setTarget(endNode.getID());
			tran2.setName("link2");
			//add extend properties.
			ExtendProperties properties = process.addNewExtendProperties();//extendProperties
			ExtendProperty notifyAllPro =  properties.addNewExtendProperty();
			notifyAllPro.setName("notifyAllAuditor");
			notifyAllPro.setValue("true");
			ExtendProperty sendTodoPro =  properties.addNewExtendProperty();
			sendTodoPro.setName("sendTodo");
			sendTodoPro.setValue("true");
			ExtendProperty sendEmailPro =  properties.addNewExtendProperty();
			sendEmailPro.setName("sendEmail");
			sendEmailPro.setValue("true");
			ExtendProperty sendSmsPro =  properties.addNewExtendProperty();
			sendSmsPro.setName("sendSms");
			sendSmsPro.setValue("true");
			//add engine events.
			EngineEvents events = process.addNewEngineEvents();
			for(int i=0;i<FlowDefineCommon.FLOW_EVENT_TYPES.length;i++){
				EngineEvent event = events.addNewEngineEvent();
				event.setType(FlowDefineCommon.FLOW_EVENT_TYPES[i]);
				event.setAction(defineCommon.getApplicationIdByType(FlowDefineCommon.FLOW_EVENT_TYPES[i]));
				
			}

			//Form ForwardAction
			request.setAttribute("xmlStr", doc.toString());
			request.setAttribute("id", process.getID());
			
			request.setAttribute("flag", "ok");
			
			
			//From Forward
			String forward = "";
			try{
				forward = XMLParse.parse(doc, "process", process.getID() ,request);
			}catch(Exception e){
			    e.printStackTrace();
			}
				
			return mapping.findForward(forward);
			
		}
	}
	
	private ManualNode initCreatorNode(Process process,FlowDefineCommon defineCommon){
		ManualNode manNode = process.addNewManualNode();
		//add manual node basic properties.
		manNode.setID(NWGUIDGenerator.getInstance().getID());
		manNode.setName("起草人");
		manNode.setX(300);
		manNode.setY(100);
		manNode.setMsgReceiver("appmanager");
		manNode.setAssignRule(AssignRuleType.X_0);
		manNode.setOperationLevel(OperationLevelType.X_0);
		Participants participants = manNode.addNewParticipants();
		Participant participant = participants.addNewParticipant();
		participant.setType(ParticipantType.X_10);
		participant.setValue("2");
		participant.setAuthorityType("1");
		Expiration manExpiration = manNode.addNewExpiration();
//		Expression manExp = manExpiration.addNewDuration();
//		manExp.setCondition("4320");
//		manExp.setExpressionLang(expressionLang);
//		com.neusoft.workflow.model.Action manAction = manExpiration.addNewAction();
//		manAction.setType(0);
		
		Expression manAlertDuration = manExpiration.addNewAlertDuration();
		manAlertDuration.setCondition("2880");
		manAlertDuration.setExpressionLang(expressionLang);
		AlertAction manAlertAction = manExpiration.addNewAlertAction();
		manAlertAction.setCount("-1");
		manAlertAction.setType(1);
		manAlertAction.setInterval("1440");
		manAlertAction.setApplication(defineCommon.getApplicationIdByName(nodeAlertActionAppName));
		//add extend properties.
		ExtendProperties properties = manNode.addNewExtendProperties();//extendProperties
		ExtendProperty canModifyFlowPro =  properties.addNewExtendProperty();
		canModifyFlowPro.setName("canModifyFlow");
		canModifyFlowPro.setValue("false");
		ExtendProperty autoCommitPro =  properties.addNewExtendProperty();
		autoCommitPro.setName("autoCommit");
		autoCommitPro.setValue("false");
		ExtendProperty isSignPro =  properties.addNewExtendProperty();
		isSignPro.setName("isSign");
		isSignPro.setValue("false");
		ExtendProperty canBeModifyPro =  properties.addNewExtendProperty();
		canBeModifyPro.setName("canBeModify");
		canBeModifyPro.setValue("false");
		ExtendProperty canModifyDocPro =  properties.addNewExtendProperty();
		canModifyDocPro.setName("canModifyDoc");
		canModifyDocPro.setValue("false");
		ExtendProperty mustBeModifyPro =  properties.addNewExtendProperty();
		mustBeModifyPro.setName("mustBeModify");
		mustBeModifyPro.setValue("false");
		ExtendProperty noAgentPro =  properties.addNewExtendProperty();
		noAgentPro.setName("noAgent");
		noAgentPro.setValue("false");
		//add engine events.
		EngineEvents events = manNode.addNewEngineEvents();
		for(int i=0;i<FlowDefineCommon.NODE_EVENT_TYPES.length;i++){
			EngineEvent event = events.addNewEngineEvent();
			event.setType(FlowDefineCommon.NODE_EVENT_TYPES[i]);
			event.setAction(defineCommon.getApplicationIdByType(FlowDefineCommon.NODE_EVENT_TYPES[i]));
			
		}
		return manNode;
	}

}
