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

public class MulApplicationListTree {
	private NWActDef actDef = null;
	private NWSession nwsession = UniflowManager.getNWSession();
	private Vector formApplications = new Vector();

	private Vector urlApplications = new Vector();

	private Vector pageFlowApplications = new Vector();
	
	private String actDefID ;
	private String workItemID;
	private String procInstID;
	private String uid;
	private String userID;
	private String filter="";

	public MulApplicationListTree(String actDefID,String opstring) {

		try {
			
			if(opstring !=null&&!opstring.equals("")){
				String[] opStrs=opstring.split(",");
				this.workItemID = opStrs[0];
				this.procInstID = opStrs[1];
				this.uid  = opStrs[2];
				this.userID = opStrs[3];
				if(opStrs.length>4)
				filter=opStrs[4];
			}
			this.actDefID=actDefID;

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
				applicationLeaf.setAction(application.getURL());
				if (application.getType().equals("wform")) {
					StringBuffer actionStr = new StringBuffer();
					actionStr
							.append("formlistener?pv=");
					actionStr.append(actDefID);
					actionStr.append("&fid=");
					actionStr.append(application.getURL());
					actionStr.append("&uid=");
					actionStr.append(uid);
					actionStr.append("&workitem_id=");
					actionStr.append(workItemID);
					actionStr.append("&procInstID=");
					actionStr.append(procInstID);
					actionStr.append("&userID=");
					actionStr.append(userID);
					if(filter!="")
						actionStr.append("&filter=").append(filter);
					applicationLeaf.setAction(actionStr.toString());
					formApplications.add(applicationLeaf);
				}
				else if (application.getType().equals("url")) {
					urlApplications.add(applicationLeaf);
				}
				else if (application.getType().equals("Pageflow")) {
					pageFlowApplications.add(applicationLeaf);
				}
			}

		}

	}


}
