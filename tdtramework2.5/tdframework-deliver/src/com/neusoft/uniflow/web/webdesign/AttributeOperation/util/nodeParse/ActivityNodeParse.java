package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.ActivityNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ConstantsForAttr;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.GetNameUtil;
import com.neusoft.workflow.model.ActivityNode;
import com.neusoft.workflow.model.EngineEvent;

public class ActivityNodeParse {

	public static ActivityNodeForm xmlParse(ActivityNode actN,
			ActivityNodeForm actNform, HttpServletRequest request) {

		actNform = (ActivityNodeForm) NodeParse.xmlParse(actN, actNform);
		// if(actN.getExpiration() != null){
		// if(actN.getExpiration().getDuration() != null){
		// actNform.setDuration(actN.getExpiration().getDuration().getCondition());
		// }
		//			
		// if(actN.getExpiration().getAlertDuration() != null){
		// actNform.setAlertDuration(actN.getExpiration().getAlertDuration().getCondition());
		// }
		// }
		String msgReceiver = actN.getMsgReceiver();
		if(msgReceiver!=null && !msgReceiver.equals("")){
			actNform.setMsgReceiver(msgReceiver);
		}else{
			actNform.setMsgReceiver("appmanager");
		}
		if (actN.getEngineEvents() != null) {
			EngineEvent[] events = actN.getEngineEvents().getEngineEventArray();
			String eventString = actNform.getEvents();
			StringBuffer sb = new StringBuffer(eventString);
			for (int i = 0; i < events.length; i++) {
				EngineEvent event = events[i];
				String action = event.getAction();
				int type = event.getType();
				sb.append(type + "," + action);
				String actionName = GetNameUtil.getAppName(action, request);
				if (actionName != null && !actionName.equals("")) {
					sb.append("," + actionName);
				} else {
					sb.append("," + action);
				}
				sb.append(";");
			}
			actNform.setEvents(sb.toString());
		}
		
		if (actN.getPreCondition() != null) {
			String preCondition = actN.getPreCondition().getCondition();
			actNform.setPreCondition(preCondition);
		}
		
		if (actN.getPostCondition() != null) {
			String postCondition = actN.getPostCondition().getCondition();
			actNform.setPostCondition(postCondition);
		}
		
		if (actN.getExpiration() != null) {
			if (actN.getExpiration().getVariable() != null) {
				actNform.setVarOrDur(ConstantsForAttr.VarOrDur_Var);
				actNform.setVariable(actN.getExpiration().getVariable()
						.getCondition().substring(1));
			} else {
				actNform.setVarOrDur(ConstantsForAttr.VarOrdur_Dur);
				if (actN.getExpiration().getDuration() != null) {
					actNform.setDuration(actN.getExpiration().getDuration()
							.getCondition());
				}
			}

			if (actN.getExpiration().getAlertVariable() != null) {
				actNform.setAlertVarOrDur(ConstantsForAttr.AlertVarOrDur_Var);
				actNform.setAlertVariable(actN.getExpiration()
						.getAlertVariable().getCondition().substring(1));
			} else {
				actNform.setAlertVarOrDur(ConstantsForAttr.AlertVarOrDur_Dur);
				if (actN.getExpiration().getAlertDuration() != null) {
					actNform.setAlertDuration(actN.getExpiration()
							.getAlertDuration().getCondition());
				} else {
					actNform.setAlertDuration("0");
				}
			}

			if (actN.getExpiration().getAction() != null) {
				String appId = actN.getExpiration().getAction()
						.getApplication();
				if (appId != null && !appId.equals("")) {
					actNform.setActionApplication(appId);
					String appName = GetNameUtil.getAppName(appId, request);
					actNform.setActionAppName(appName);
				} else {
					actNform.setActionApplication("");
					actNform.setActionAppName("");
				}
				actNform.setActionType(Integer.toString(actN.getExpiration()
						.getAction().getType()));
			} else {
				actNform.setActionType("0");
			}

			if (actN.getExpiration().getAlertAction() != null) {
				String appId = actN.getExpiration().getAlertAction()
						.getApplication();
				if (appId != null && !appId.equals("")) {
					actNform.setAlertActionApplication(appId);
					String appName = GetNameUtil.getAppName(appId, request);
					actNform.setAlertActionAppName(appName);
				}
				actNform.setAlertActionCount(actN.getExpiration()
						.getAlertAction().getCount());
				actNform.setAlertActionInterval(actN.getExpiration()
						.getAlertAction().getInterval());
				actNform.setAlertActionType(Integer.toString(actN
						.getExpiration().getAlertAction().getType()));
			} else {
				actNform.setAlertActionCount("1");
				actNform.setAlertActionInterval("0");
				actNform.setAlertActionType("0");
			}
		}

		// actNform.setExpiration(actN.getExpiration());
		actNform.setCategory(actN.getCategory());
		if(actN.getPreCondition()!=null)
			actNform.setPreCondition(actN.getPreCondition().getCondition());
		if(actN.getPostCondition()!=null)
			actNform.setPostCondition(actN.getPostCondition().getCondition());
		return actNform;
	}

}
