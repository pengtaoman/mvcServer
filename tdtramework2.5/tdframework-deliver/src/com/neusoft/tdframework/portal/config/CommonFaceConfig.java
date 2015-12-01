/*
 * Created on 2006-11-18
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
public class CommonFaceConfig implements IFaceConfig {
	/**
	 * @return Returns the name.
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name The name to set.
	 */
	public void setName(String name) {
		this.name = name;
	}
	private String name;

	public CentralConfig getCentralConfig() {
		return centralConfig;
	}
	/**
	 * @param centralConfig The centralConfig to set.
	 */
	public void setCentralConfig(CentralConfig centralConfig) {
		this.centralConfig = centralConfig;
	}
	/**
	 * @return Returns the headerConfig.
	 */
	public HeaderConfig getHeaderConfig() {
		return headerConfig;
	}
	/**
	 * @param headerConfig The headerConfig to set.
	 */
	public void setHeaderConfig(HeaderConfig headerConfig) {
		this.headerConfig = headerConfig;
	}
	/**
	 * @return Returns the leftConfig.
	 */
	public LeftConfig getLeftConfig() {
		return leftConfig;
	}
	/**
	 * @param leftConfig The leftConfig to set.
	 */
	public void setLeftConfig(LeftConfig leftConfig) {
		this.leftConfig = leftConfig;
	}
	/**
	 * @return Returns the navPathConfig.
	 */
	public NavPathConfig getNavPathConfig() {
		return navPathConfig;
	}
	/**
	 * @param navPathConfig The navPathConfig to set.
	 */
	public void setNavPathConfig(NavPathConfig navPathConfig) {
		this.navPathConfig = navPathConfig;
	}
	private HeaderConfig headerConfig;
	private LeftConfig leftConfig;
	private CentralConfig centralConfig;
	private NavPathConfig navPathConfig;

}
