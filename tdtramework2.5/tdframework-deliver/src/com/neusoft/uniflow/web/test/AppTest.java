package com.neusoft.uniflow.web.test;

import java.util.ArrayList;
import java.util.List;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.appmgr.agent.NWIApplication;

public class AppTest implements NWIApplication {

	public int invokeApplication(NWSession session, String actInstID)
			throws Exception {
		
		NWActInst actInst=session.getActInst("", actInstID);
		String actDefId=actInst.getActDefID();
		return 0;
	}

	public int requestApplicationStatus(String actInstID) throws Exception {
		return 0;
	}

	public void terminateApplication(String actInstID) throws Exception {

	}

}
