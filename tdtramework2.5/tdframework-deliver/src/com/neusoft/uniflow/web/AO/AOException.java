/*
 * Copyright 2006 The Neusoft Software Foundation.
 * 
 */
package com.neusoft.uniflow.web.AO;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
/**
 * 异常处理类
 * 
 * @author shangzf 
 * @version $Revision: 1.1 $ $Date: 2007/11/29 03:37:01 $
 *
 */
public class AOException extends Exception {
	private static final long serialVersionUID = -1370581604141869315L;
	private static String gsResourceBundleName = null;
	private static Locale gsLocale = null;
	private static ResourceBundle gsPRB = null;

	static {
	    gsResourceBundleName = "com.neusoft.uniflow.web.AO.AO_error";
		gsLocale = Locale.getDefault();
		gsPRB = ResourceBundle.getBundle(gsResourceBundleName, gsLocale);
	}
	public AOException(){
	   
    }
	public AOException(long msgId) {
		this(msgId, (Object[]) null);
	}
	public AOException(long msgId, Object param) {
		this( msgId, new Object[] { param });
	}
	public AOException(long msgId, Object[] args) {
		super(getLocalizedMessage(msgId, args));

	}
	private static String getLocalizedMessage(long msgId, Object aobj[]) {
		String s = null;
		try {
			s = getRSString(String.valueOf(msgId));
			if (aobj != null)
				s = MessageFormat.format(s, aobj);
			s = "[uniflow error][ErrorID = " + String.valueOf(msgId) + "]" + s;
		} catch (MissingResourceException m) {
			m.printStackTrace();
		}

		if (s == null) {
			System.err.println("Missing resource in ExceptionMessages.properties, key = "+ msgId);
			s = "#" + msgId;
		}
		return s;
	}
    public static String getMessage(int errorCode) {
	    return getRSString(String.valueOf(errorCode));
	}
	private static String getRSString(String key) throws MissingResourceException{
	  	try{
	  		return gsPRB.getString(key);
	  	}catch(MissingResourceException mre){
	  	    mre.printStackTrace();
	        return "#-1";  		
	  	}
	}
}
