/**
 * 
 */
package com.neusoft.tdframework.authorization;

import java.util.ResourceBundle;

/**
 * @projectName tdframework25
 * @Description 
 * @author likj 2010-7-26 上午09:25:48
 * @email li.kj@neusoft.com
 * @copyright NeuSoft
 */
public class LockPropertiesFile {
	
    /**
     * 根据key获取value
     * @param key
     * @return
     */
	public static String readValue(String key) {
		ResourceBundle resource = ResourceBundle.getBundle("lock");
		String value = resource.getString(key);
		return value;
	}

}
