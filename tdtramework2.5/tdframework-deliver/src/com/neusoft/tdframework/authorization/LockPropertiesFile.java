/**
 * 
 */
package com.neusoft.tdframework.authorization;

import java.util.ResourceBundle;

/**
 * @projectName tdframework25
 * @Description 
 * @author likj 2010-7-26 ����09:25:48
 * @email li.kj@neusoft.com
 * @copyright NeuSoft
 */
public class LockPropertiesFile {
	
    /**
     * ����key��ȡvalue
     * @param key
     * @return
     */
	public static String readValue(String key) {
		ResourceBundle resource = ResourceBundle.getBundle("lock");
		String value = resource.getString(key);
		return value;
	}

}
