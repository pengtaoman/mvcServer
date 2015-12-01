package testApplication;

import com.neusoft.uniflow.api.NWSession;

import com.neusoft.uniflow.appmgr.agent.NWIApplication;


public class ProcExpired   implements NWIApplication{



public int invokeApplication(NWSession session, String actInstID)
		throws Exception {
	
System.out.println("Process expired");
	
	return 1;
}

public int requestApplicationStatus(String actInstID) throws Exception {
	// TODO Auto-generated method stub
	return 1;
}

public void terminateApplication(String actInstID) throws Exception {
	// TODO Auto-generated method stub
	
}
}
