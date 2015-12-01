package com.neusoft.uniflow.web.test;

import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWRelDataInst;
import com.neusoft.uniflow.engine.variable.IApplication;
import com.neusoft.uniflow.engine.variable.XMLVariable;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class VappTest implements IApplication {

	public int getIntegerValue(String procInstID, String variableName)
			throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	public String getStringValue(String procInstID, String variableName)
			throws Exception {
		NWProcInst procInst=WorkflowManager.getNWSession().getProcInst("", procInstID);
		NWRelDataInst reldata1=procInst.getRelData(variableName);
		XMLVariable xmlVariable=reldata1.getXmlObject();
		xmlVariable.addParticipant(0, "admin", 1, "biz1","ok");
		procInst.saveRelData(reldata1);
		return "test";
	}

}
