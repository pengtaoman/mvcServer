package com.neusoft.uniflow.web.test.bean;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.appmgr.agent.NWIApplication;

public class WorkItemEventTest implements NWIApplication {

	private int m_iStatus;

	public WorkItemEventTest() {
		m_iStatus = 0;
	}

	public int invokeApplication(NWSession objSession, String ID)
			throws Exception {
		//System.out.println("* * * * * * * * * * * * Workflow Event Infomation * * * * * * * * * * * *");
		System.out.println("* * * 当前工作项 - " + ID );
		//System.out.println("* * * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * *  *");
		return 1;
	}

	public void terminateApplication(String s) throws Exception {
	}

	public int requestApplicationStatus(String strActInstID) throws Exception {
		return m_iStatus;
	}

}