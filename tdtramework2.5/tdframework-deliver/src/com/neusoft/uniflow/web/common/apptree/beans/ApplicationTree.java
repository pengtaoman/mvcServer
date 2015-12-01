package com.neusoft.uniflow.web.common.apptree.beans;

import java.util.Vector;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWRelData;
import com.neusoft.uniflow.api.res.NWApplication;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.toollistener.Util.StringUtil;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ApplicationTree {
	public static String NODE_ROOT_ID = "application_root";

	private String openNodeID = "";// 当前树中被选中节点

	private NWActDef currentActivity = null;

	private NWProcDef process = null;

	private ApplicationNode rootNode;

	private Vector FormApplication = new Vector();

	private Vector URLApplication = new Vector();

	private Vector PageFlowApplication = new Vector();
	
	private Vector usedActList = new Vector();

	public ApplicationTree(String activityID) {
		openNodeID = NODE_ROOT_ID;
		initApplication(activityID);
	}

	public void initApplication(String activityID) {
		rootNode = new ApplicationNode(NODE_ROOT_ID, "应用程序列表", "root");
		rootNode.setClicked(true);
		rootNode.setExpanded(true);
		ApplicationNode node1 = new ApplicationNode("application_form",
				"工作流表单", "application");
		rootNode.addChild(node1);
		ApplicationNode node2 = new ApplicationNode("application_url", "URL",
				"application");
		rootNode.addChild(node2);
		ApplicationNode node3 = new ApplicationNode("application_pageflow",
				"页面流", "application");
		rootNode.addChild(node3);

		NWActDef currentAct = null;
		try {
			NWSession nwsession = WorkflowManager.getNWSession();
			currentAct = nwsession.getActDef(activityID, 0);
			if (currentAct != null) {
				currentActivity = currentAct;
				String pid = currentAct.getProcDefID();
				String pversion = currentAct.getProcVersionName();
				process = nwsession.getProcDef("",pid, pversion, 0);
				String app = currentAct.getAppID();
				if (app != null && !app.equals("")) {
					if (app.indexOf(",") > 0) {
						String[] appIDs = app.split(",");
						for (int i = 0; i < appIDs.length; i++) {
							NWApplication application = nwsession
									.getApplication(appIDs[i]);
							if (application.getType().equals("wform")) {
								FormApplication.add(application);
							}
							if (application.getType().equals("url")) {
								URLApplication.add(application);
							}
							if (application.getType().equals("Pageflow")) {
								PageFlowApplication.add(application);
							}
						}

					} else {
						NWApplication application = nwsession
								.getApplication(app);
						if (application.getType().equals("wform")) {
							FormApplication.add(application);
						}
						if (application.getType().equals("url")) {
							URLApplication.add(application);
						}
						if (application.getType().equals("Pageflow")) {
							PageFlowApplication.add(application);
						}
					}
				}
			}
		} catch (NWException e) {
			e.printStackTrace();
		}
	}

	public ApplicationNode getApplicationNode(String nodeID) {
		if (nodeID.equals(ApplicationTree.NODE_ROOT_ID)) {
			return rootNode;
		}
		ApplicationNode node = rootNode.getDescendant(nodeID);
		if (node != null)
			return node;
		else
			return null;
	}

	public String getOpenNodeID() {
		return openNodeID;
	}

	public void setOpenNodeID(String openNodeID) {
		this.openNodeID = openNodeID;
	}

	public void expandNode(String nodeID) throws Exception {
		ApplicationNode node = this.getApplicationNode(nodeID);
		if (node.isExpanded()){
			node.setExpanded(false);
		}else if (node.isClicked()){// 如果合并的并且click过，一定有children，否则没有连接，不会执行这个操作
			node.setExpanded(true);
		}else {// 没有被click过，不知道有没有children
			if (node.getNodeID().equals("application_form")) {
				for (int i = 0; i < this.FormApplication.size(); i++) {
					NWApplication application = (NWApplication) this.FormApplication.elementAt(i);
					ApplicationNode nodeApp = new ApplicationNode(application
							.getID(), application.getName(), application
							.getType());
					nodeApp.setParticipants(this.changeNodeParti(
							currentActivity, process));
					String appUrl = application.getURL();
					if (appUrl==null)
					    nodeApp.setUrl("");
					else
						nodeApp.setUrl(appUrl);
					node.addChild(nodeApp);
				}
			}
			if (node.getNodeID().equals("application_url")) {
				for (int i = 0; i < this.URLApplication.size(); i++) {
					NWApplication application = (NWApplication) this.URLApplication
							.elementAt(i);
					ApplicationNode nodeApp = new ApplicationNode(application
							.getID(), application.getName(), application
							.getType());
					String appUrl = application.getURL();
					if (appUrl==null)
					    nodeApp.setUrl("");
					else
						nodeApp.setUrl(appUrl);
					node.addChild(nodeApp);
				}
			}
			if (node.getNodeID().equals("application_pageflow")) {
				for (int i = 0; i < this.PageFlowApplication.size(); i++) {
					NWApplication application = (NWApplication) this.PageFlowApplication
							.elementAt(i);
					ApplicationNode nodeApp = new ApplicationNode(application
							.getID(), application.getName(), application
							.getType());
					String appUrl = application.getURL();
					if (appUrl==null)
					    nodeApp.setUrl("");
					else
						nodeApp.setUrl(appUrl);
					node.addChild(nodeApp);
				}
			}

			node.setClicked(true);
			node.setExpanded(true);
		}
	}

	public void removeNode(String nodeId) {
		ApplicationNode node = this.getApplicationNode(nodeId);
		ApplicationNode parent = node.getParentNode();
		parent.getChildren().removeElement(node);
	}

	public ApplicationNode getRootNode() {
		return rootNode;
	}

	/**
	 * 
	 * @param nodeParti
	 *            example(0,33233:332443:-3444;1,32233:232332:-1223;3,;2,;5,;4,;7,;8,)
	 * @return (0,33233:332443:-3444;1,32233:232332:-1223;3,;2,;5,;4,;7,节点名称;8,变量名称)
	 */
	private String changeNodeParti(NWActDef actdef, NWProcDef procdef)
			throws NWException {
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
			}
			if (len == 2) {
				retStr.append(";");
				retStr.append(sPtcptEntity[0]);
				retStr.append(",");
				if (sPtcptEntity[0].equals("8")) {
					String name = "";
					if (procdef!=null){
						NWRelData rd = procdef.getRelData(sPtcptEntity[1]);
						if (rd != null)
							name = rd.getName();
					}
					name="变量";
					retStr.append(name);
					continue;
				}
				if (sPtcptEntity[0].equals("7")) {
					String name = "";
					if (procdef!=null){
						NWActDef nextAct = procdef.getActivity(sPtcptEntity[1]);
						if (nextAct != null)
							name = nextAct.getName();
					}
					name="节点";
					retStr.append(name);
					continue;
				}
				retStr.append(sPtcptEntity[1]);
			}
		}
		String retValue = retStr.toString();
		return retValue.startsWith(";") ? retValue.substring(1) : retValue;
	}

	public NWActDef getCurrentActivity() {
		return currentActivity;
	}

	public Vector getUsedActList() {
		return usedActList;
	}

	public void setUsedActList(Vector usedActList) {
		this.usedActList = usedActList;
	}

}