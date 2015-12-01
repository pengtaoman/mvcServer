package testApplication;
import java.util.Vector;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.appmgr.agent.NWIApplication;


public class Application   implements NWIApplication{



public int invokeApplication(NWSession session, String actInstID)
		throws Exception {
	
	NWActInst actInst = session.getActInst(null,actInstID);
	int inPut = 0;
	int outPut;
	int j=0;
	Vector rdList = actInst.openRelDataList();
	for(int i = 0;i < rdList.size();i++){
	     
		NWRelDataInst dataInst = (NWRelDataInst)rdList.get(i);
		if(dataInst.getName().equals("in")){
			inPut=Integer.parseInt(dataInst.getValue());
		}
		if(dataInst.getName().equals("out")){
			outPut=Integer.parseInt(dataInst.getValue());
			j=i;
		}
	}
	
//	outPut=(int) Math.round(Math.random()*2);
	outPut=inPut;
	NWRelDataInst dataInst = (NWRelDataInst)rdList.get(j);
	dataInst.setValue(String.valueOf(outPut));
	actInst.saveRelData(dataInst);
	System.out.println("³ö²ÎÊÇ"+dataInst.getValue()+"end***************************************");
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
