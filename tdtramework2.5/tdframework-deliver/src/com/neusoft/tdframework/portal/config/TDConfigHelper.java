/*
 * Created on 2006-11-16
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.portal.config;

import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.interfase.authorize.OMSystemColl;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class TDConfigHelper {
	/**
	 * @return Returns the config.
	 */
	public static PortalConfig getPortalConfig() {
		InteractionObjectFactory factory = InteractionObjectFactory
		.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		PortalConfig portalConfig = (PortalConfig) factory
		.getInteractionObject("portalConfig", appContext);
		return portalConfig;
	}
	public static String getHeaderSearch()
	{
		return getPortalConfig().getFaceConfig().getHeaderConfig().getInstantSearch();
	}
	public static String getFaceName(){
		return getPortalConfig().getFaceConfig().getName();
	}
	
	public static InterfaceConfig getInterfaceConfig() {
		InteractionObjectFactory factory = InteractionObjectFactory
		.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		InterfaceConfig interfaceConfig = (InterfaceConfig) factory
		.getInteractionObject("interfaceConfig", appContext);
		return interfaceConfig;
	}
	public static String getAppId(){
		return getInterfaceConfig().getAppId();
	}

	public static String getAppKind(){
		return getInterfaceConfig().getAppKind();
	}

	public static boolean isFlowPermitted(){
		return getInterfaceConfig().getUniflowConfig();
	}
	public static boolean isBasLogPermitted(){
		return getInterfaceConfig().getBasConfig().getLoginLog();
	}
	
	public static boolean isCluster(){
		return getInterfaceConfig().getClusterFlag();
	}
	
	public static com.neusoft.tdframework.authorization.SystemColl getPermittedSystemColl() {
		InteractionObjectFactory factory = InteractionObjectFactory
		.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		SystemColl systemColl = (SystemColl) factory
		.getInteractionObject("permittedSystemColl", appContext);
		OMSystemColl oMSystemColl = new OMSystemColl();
		oMSystemColl.setSystemColl(systemColl);

		return oMSystemColl;
	}
	
	
}
