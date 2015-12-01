package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.ActivityNodeForm;
import com.neusoft.workflow.model.ActivityNode;
import com.neusoft.workflow.model.EngineEvent;
import com.neusoft.workflow.model.EngineEvents;
import com.neusoft.workflow.model.Expiration;
import com.neusoft.workflow.model.Expression;
import com.neusoft.workflow.model.impl.ExpressionImpl;

public class ActivityNodeAttrSave {
	public static ActivityNode save(ActivityNode actN, ActivityNodeForm form,
			String type) {

		String msgReceiver = form.getMsgReceiver();
		if (msgReceiver != null && !msgReceiver.equals("")) {
			actN.setMsgReceiver(msgReceiver);
		} else {
			actN.setMsgReceiver("appmanager");
		}

		EngineEvents engineEvents = EngineEvents.Factory.newInstance();
		actN.setEngineEvents(engineEvents);

		String eventString = form.getEvents();
		if (!eventString.equals("")) {
			String[] events = eventString
					.substring(0, eventString.length() - 1).split(";");
			for (int i = 0; i < events.length; i++) {
				String event = events[i];
				String[] eventPro = event.split(",");
				String eventType = eventPro[0];
				String action = eventPro[1];
				EngineEvent engineEvent = actN.getEngineEvents()
						.addNewEngineEvent();
				engineEvent.setType(Integer.parseInt(eventType));
				engineEvent.setAction(action);
			}
		}

		Expiration expir = Expiration.Factory.newInstance();
		actN.setExpiration(expir);

		if ("1".equals(form.getVarOrDur())) {
			actN.getExpiration().addNewVariable().setCondition(
					"#" + form.getVariable());

		} else if ("0".equals(form.getVarOrDur())) {
			actN.getExpiration().addNewDuration().setCondition(
					form.getDuration());

		}

		if ("1".equals(form.getAlertVarOrDur())) {
			actN.getExpiration().addNewAlertVariable().setCondition(
					"#" + form.getAlertVariable());

		} else if ("0".equals(form.getAlertVarOrDur())) {
			actN.getExpiration().addNewAlertDuration().setCondition(
					form.getAlertDuration());

		}

		if (actN.getExpiration().getAction() != null) {
		} else {
			actN.getExpiration().addNewAction();
		}
		if ("5".equals(form.getActionType())) {
			actN.getExpiration().getAction().setApplication(
					form.getActionApplication());
		}

		if (form.getActionType() == null) {
			actN.getExpiration().getAction().setType(0);
		} else {
			actN.getExpiration().getAction().setType(
					Integer.parseInt(form.getActionType()));
		}

		if (actN.getExpiration().getAlertAction() != null) {
		} else {
			actN.getExpiration().addNewAlertAction();
		}
		if ("1".equals(form.getAlertActionType())) {
			actN.getExpiration().getAlertAction().setApplication(
					form.getAlertActionApplication());
		}

		if (form.getAlertActionType() == null) {
			actN.getExpiration().getAlertAction().setType(0);
		} else {
			actN.getExpiration().getAlertAction().setType(
					Integer.parseInt(form.getAlertActionType()));
		}
		actN.getExpiration().getAlertAction().setCount(
				form.getAlertActionCount());
		actN.getExpiration().getAlertAction().setInterval(
				form.getAlertActionInterval());
		if(form.getPreCondition() != null)
			actN.addNewPreCondition().setCondition(form.getPreCondition());
		if(form.getPostCondition() != null)
			actN.addNewPostCondition().setCondition(form.getPostCondition());
		actN.setCategory(form.getCategory());
		NodeAttrSave.save(actN, form, type);

		return actN;
	}
}
