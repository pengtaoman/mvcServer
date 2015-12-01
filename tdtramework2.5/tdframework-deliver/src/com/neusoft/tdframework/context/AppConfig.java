/*
 * Created on 2004-12-10
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.context;

import java.util.Map;

/**
 * @author chenzt
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class AppConfig {
	
	private String configFile = null;
	private Map paramConfigFile = null;
	
	/**
	 * 
	 * 系统Spring框架下相关的配置文件
	 * 
	 * @return
	 */
	public String getConfigFile() {
		return configFile;
	}

	/**
	 * @param string
	 */
	public void setConfigFile(String string) {
		configFile = string;
	}


	/**
	 * @return
	 */
	public Map getParamConfigFile() {
		return paramConfigFile;
	}

	/**
	 * @param map
	 */
	public void setParamConfigFile(Map map) {
		paramConfigFile = map;
	}

}
