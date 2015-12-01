package com.neusoft.uniflow.web.test.bean;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.appmgr.agent.NWIApplication;

public class ProcessEventTest implements NWIApplication {

	private int m_iStatus;

	public ProcessEventTest() {
		m_iStatus = 0;
	}

	public int invokeApplication(NWSession objSession, String ID)
			throws Exception {
		//NWProcInst objProcInst = objSession.getProcInst("", ID);
		//System.out.println("* * * * * * * * * * * * Workflow Event Infomation * * * * * * * * * * * *");
		System.out.println("* * * 当前流程实例 - " + ID );
		//System.out.println("* * * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * *  *");
		return 1;
	}

	public void terminateApplication(String s) throws Exception {
	}

	public int requestApplicationStatus(String strActInstID) throws Exception {
		return m_iStatus;
	}

}