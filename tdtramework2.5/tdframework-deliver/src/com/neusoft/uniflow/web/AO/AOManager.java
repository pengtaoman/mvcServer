package com.neusoft.uniflow.web.AO;

import com.neusoft.org.NWOrg;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.web.util.UniflowManager;

/**
 * 工作流全局变量
 * 
 * @author yuanbz,shangzf
 * @version $Revision: 1.1 $ $Date: 2007/11/29 03:37:01 $
 * 
 */
public class AOManager {

	public static NWSession getNWSession() {
		return UniflowManager.getNWSession();
	}
	public static NWOrg getNWOrg(){
		return UniflowManager.getNWOrg();
	}
}