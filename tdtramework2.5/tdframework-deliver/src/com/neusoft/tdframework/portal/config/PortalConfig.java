/*
 * Created on 2006-11-16
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.portal.config;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class PortalConfig {
	/**
	 * @return Returns the config.
	 */
	public IFaceConfig getFaceConfig() {
		return faceConfig;
	}
	/**
	 * @param config The config to set.
	 */
	public void setFaceConfig(IFaceConfig faceConfig) {
		this.faceConfig = faceConfig;
	}
	private IFaceConfig faceConfig;
}
