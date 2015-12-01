/*
 * Created on 2006-11-17
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
public class InterfaceConfig {
	/**
	 * @return Returns the ssoConfig.
	 */
	public SSOConfig getSsoConfig() {
		return ssoConfig;
	}
	/**
	 * @param ssoConfig The ssoConfig to set.
	 */
	public void setSsoConfig(SSOConfig ssoConfig) {
		this.ssoConfig = ssoConfig;
	}
	/**
	 * @return Returns the uniflowConfig.
	 */
	public boolean getUniflowConfig() {
		return uniflowConfig;
	}
	/**
	 * @param uniflowConfig The uniflowConfig to set.
	 */
	public void setUniflowConfig(boolean uniflowConfig) {
		this.uniflowConfig = uniflowConfig;
	}
	/**
	 * @return Returns the basConfig.
	 */
	public BASConfig getBasConfig() {
		return basConfig;
	}
	/**
	 * @param basConfig The basConfig to set.
	 */
	public void setBasConfig(BASConfig basConfig) {
		this.basConfig = basConfig;
	}
	private BASConfig basConfig;
	private boolean uniflowConfig;
	private SSOConfig ssoConfig;
	private String appKind;
	private boolean clusterFlag;
	/**
	 * @return Returns the hostConfig.
	 */
	public String getAppId() {
		return appId;
	}
	/**
	 * @param hostConfig The hostConfig to set.
	 */
	public void setAppId(String appId) {
		this.appId = appId;
	}
	private String appId;
	public String getAppKind() {
		return appKind;
	}
	public void setAppKind(String appKind) {
		this.appKind = appKind;
	}
	public boolean getClusterFlag() {
		return clusterFlag;
	}
	public void setClusterFlag(boolean clusterFlag) {
		this.clusterFlag = clusterFlag;
	}

}
