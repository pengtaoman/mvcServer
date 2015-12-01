package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.newProcessAction;

import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.res.NWApplication;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class FlowDefineCommon {
	public static final int[] FLOW_EVENT_TYPES = { 508, 503, 502 };

	public static final int[] NODE_EVENT_TYPES = { 523, 522, 521, 529, 526,
			524, 525, 545, 549, 541, 544, 546, 547, 548, 551 };



	private Map applicationEventMap = null;

	private Map applicationIdMap = null;



	/**
	 * 根据应用事件类型获取ID
	 * 
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public String getApplicationIdByType(int type){
		if (applicationEventMap == null) {
			try {
				initApplicationData();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return (String) applicationEventMap.get(new Integer(type));
	}

	/**
	 * 根据应用程序名获取ID
	 * 
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public String getApplicationIdByName(String name){
		if (applicationIdMap == null) {
			try {
				initApplicationData();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return (String) applicationIdMap.get(name);
	}

	/**
	 * 加载application信息到内存
	 * 
	 * @throws Exception
	 */
	private void initApplicationData() throws Exception {
		Map map = new HashMap();
		map.put("Event_FlowComplete", new Integer(508));
		map.put("Event_FlowAbort", new Integer(503));
		map.put("Event_FlowStart", new Integer(502));

		map.put("Event_NodeAbort", new Integer(523));
		map.put("Event_NodeStart", new Integer(522));
		map.put("Event_NodeCreate", new Integer(521));
		map.put("Event_NodeComplete", new Integer(529));
		map.put("Event_NodeRollBack", new Integer(526));
		map.put("Event_NodeSuspend", new Integer(524));
		map.put("Event_NodeResume", new Integer(525));

		map.put("Event_ItemReassign", new Integer(545));
		map.put("Event_ItemAbort", new Integer(549));
		map.put("Event_ItemCreate", new Integer(541));
		map.put("Event_ItemComplete", new Integer(544));
		map.put("Event_ItemRollBack", new Integer(546));
		map.put("Event_ItemSuspend", new Integer(547));
		map.put("Event_ItemResume", new Integer(548));
		map.put("Event_ItemCommission", new Integer(551));

		NWSession session = WorkflowManager.getNWSession();
		Vector vector = session.openApplicationList();
		applicationEventMap = new HashMap();
		applicationIdMap = new HashMap();
		for (int i = 0; i < vector.size(); i++) {
			NWApplication application = (NWApplication) vector.get(i);
			applicationIdMap.put(application.getName(), application.getID());
			if (map.containsKey(application.getName()))
				applicationEventMap.put(map.get(application.getName()),
						application.getID());
		}
	}

}
