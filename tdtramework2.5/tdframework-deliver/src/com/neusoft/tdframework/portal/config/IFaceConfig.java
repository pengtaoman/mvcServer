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
public interface IFaceConfig {
	public String getName();

	/**
	 * @param centralConfig The centralConfig to set.
	 */
	public void setName(String name);

	public CentralConfig getCentralConfig();

	/**
	 * @param centralConfig The centralConfig to set.
	 */
	public void setCentralConfig(CentralConfig centralConfig);

	/**
	 * @return Returns the headerConfig.
	 */
	public HeaderConfig getHeaderConfig();

	/**
	 * @param headerConfig The headerConfig to set.
	 */
	public void setHeaderConfig(HeaderConfig headerConfig);

	/**
	 * @return Returns the leftConfig.
	 */
	public LeftConfig getLeftConfig();

	/**
	 * @param leftConfig The leftConfig to set.
	 */
	public void setLeftConfig(LeftConfig leftConfig);

	/**
	 * @return Returns the navPathConfig.
	 */
	public NavPathConfig getNavPathConfig();

	/**
	 * @param navPathConfig The navPathConfig to set.
	 */
	public void setNavPathConfig(NavPathConfig navPathConfig);

}
