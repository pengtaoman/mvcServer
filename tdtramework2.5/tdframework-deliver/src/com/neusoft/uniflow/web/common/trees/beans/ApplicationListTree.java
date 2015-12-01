package com.neusoft.uniflow.web.common.trees.beans;

import java.util.Vector;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWRelData;
import com.neusoft.uniflow.api.res.NWApplication;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.util.StringUtil;
import com.neusoft.uniflow.web.util.UniflowManager;

public class ApplicationListTree {
	private NWActDef actDef = null;
	private NWSession nwsession = UniflowManager.getNWSession();
	private Vector formApplications = new Vector();

	private Vector urlApplications = new Vector();

	private Vector pageFlowApplications = new Vector();

	public ApplicationListTree(String actDefID) {

		try {
			actDef = nwsession.getActDef(actDefID, 0);
			init();
		} catch (NWException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public Vector getFormApplication() {
		return this.formApplications;
	}

	public Vector getURLApplication() {
		return this.urlApplications;
	}

	public Vector getPageFlowApplication() {
		return this.pageFlowApplications;
	}

	private void init() throws NWException {
		String app = actDef.getAppID();
		NWListLeaf applicationLeaf;
		if (app != null && !app.equals("")) {
			String[] appIDs = app.split(",");
			for (int i = 0; i < appIDs.length; i++) {
				NWApplication application = nwsession.getApplication(appIDs[i]);
				applicationLeaf = new NWListLeaf();
				applicationLeaf.setName(application.getName());
				applicationLeaf.setType(application.getType());
				if (application.getType().equals("wform")) {
					StringBuffer actionStr = new StringBuffer();
					actionStr
							.append("unieap/pages/workflow/authorization/uniform/formauthWindow.jsp?activityid=");
					actionStr.append(actDef.getID());
					actionStr.append("&formid=");
					actionStr.append(application.getURL());
					actionStr.append("&participants=");
					actionStr.append(changeNodeParti(actDef));
					actionStr.append("&activityname=");
					actionStr.append(actDef.getName());
					applicationLeaf.setAction(actionStr.toString());
					formApplications.add(applicationLeaf);
				}
				if (application.getType().equals("url")) {
					urlApplications.add(applicationLeaf);
				}
				if (application.getType().equals("Pageflow")) {
					pageFlowApplications.add(applicationLeaf);
				}
			}

		}

	}

	private String changeNodeParti(NWActDef actdef) throws NWException {
		NWProcDef procdef = nwsession.getProcDef("", actdef.getProcDefID(),
				actdef.getProcVersionName(), 0);
		StringBuffer retStr = new StringBuffer();
		Vector ptcpts = actdef.openParticipantList();
		int sizePtcpts = ptcpts.size();
		String ptcptStr = "";
		for (int j = 0; j < sizePtcpts; j++) {
			NWParticipantEntity ptcpt = (NWParticipantEntity) ptcpts
					.elementAt(j);
			int entityType = ptcpt.getEntityType();
			String entityID = "";
			if (entityType == NWParticipantEntity.PTCPTENTITY_TYPE_SCRIPT) {
				entityID = ptcpt.getParticipantScript();
			} else {
				entityID = ptcpt.getEntityID();
			}
			ptcptStr = StringUtil.appendString(ptcptStr, ";", String
					.valueOf(entityType)
					+ "," + entityID);
		}
		String arrPtcpts[] = ptcptStr.split(";");
		int size = arrPtcpts.length;
		for (int i = 0; i < size; i++) {
			String sPtcpt = arrPtcpts[i];
			String sPtcptEntity[] = sPtcpt.split(",");
			int len = sPtcptEntity.length;
			if (len == 1) {
				retStr.append(";");
				retStr.append(sPtcptEntity[0]);
				retStr.append(",");
			} else if (len == 2) {
				retStr.append(";");
				retStr.append(sPtcptEntity[0]);
				retStr.append(",");
				if (sPtcptEntity[0].equals("8")) {
					String name = "";
					if (procdef != null) {
						NWRelData rd = procdef.getRelData(sPtcptEntity[1]);
						if (rd != null)
							name = rd.getName();
					}
					name = "varible";
					retStr.append(name);
					continue;
				} else if (sPtcptEntity[0].equals("7")) {
					String name = "";
					if (procdef != null) {
						NWActDef nextAct = procdef.getActivity(sPtcptEntity[1]);
						if (nextAct != null)
							name = nextAct.getName();
					}
					name = "actDef";
					retStr.append(name);
					continue;
				}
				retStr.append(sPtcptEntity[1]);
			}
		}
		String retValue = retStr.toString();
		return retValue.startsWith(";") ? retValue.substring(1) : retValue;
	}
	
}
