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
public class LeftConfig {
	/**
	 * @return Returns the favoriteStyle.
	 */
	public String getFavoriteStyle() {
		return favoriteStyle;
	}
	/**
	 * @param favoriteStyle The favoriteStyle to set.
	 */
	public void setFavoriteStyle(String favoriteStyle) {
		this.favoriteStyle = favoriteStyle;
	}
	/**
	 * @return Returns the leftName.
	 */
	public String getLeftName() {
		return leftName;
	}
	/**
	 * @param leftName The leftName to set.
	 */
	public void setLeftName(String leftName) {
		this.leftName = leftName;
	}
	/**
	 * @return Returns the recentFrame.
	 */
	public String getRecentFrame() {
		return recentFrame;
	}
	/**
	 * @param recentFrame The recentFrame to set.
	 */
	public void setRecentFrame(String recentFrame) {
		this.recentFrame = recentFrame;
	}
	/**
	 * @return Returns the systemOpenStyle.
	 */
	public String getSystemOpenStyle() {
		return systemOpenStyle;
	}
	/**
	 * @param systemOpenStyle The systemOpenStyle to set.
	 */
	public void setSystemOpenStyle(String systemOpenStyle) {
		this.systemOpenStyle = systemOpenStyle;
	}
	private String leftName;
	private String recentFrame;
	private String favoriteStyle;
	private String systemOpenStyle;
}
