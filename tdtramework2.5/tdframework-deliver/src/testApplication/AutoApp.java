package testApplication;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.appmgr.agent.NWIApplication;


public class AutoApp implements NWIApplication{



public int invokeApplication(NWSession session, String actInstID)
		throws Exception {
//	System.out.println("Auto execute");
//	Thread.sleep(1000*60*3);
	if(true){
		throw new Exception("******************************test**************************");
	}
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
