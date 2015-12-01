package testApplication;

import com.neusoft.uniflow.api.NWSession;

import com.neusoft.uniflow.appmgr.agent.NWIApplication;


public class ActCreated implements NWIApplication{



public int invokeApplication(NWSession session, String actInstID)
		throws Exception {
	if(true){
		throw new RuntimeException("sdfsdfdf");
	}
	System.out.println("#######################Act is created############################");
//	Thread.sleep(1000*60*10);
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
