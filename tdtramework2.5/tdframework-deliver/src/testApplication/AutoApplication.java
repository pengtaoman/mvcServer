package testApplication;

import com.neusoft.uniflow.api.NWSession;

import com.neusoft.uniflow.appmgr.agent.NWIApplication;


public class AutoApplication   implements NWIApplication{



public int invokeApplication(NWSession session, String actInstID)
		throws Exception {
	
System.out.println("#####################autoApplication has started#################################");
	
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
