package com.neusoft.uniflow.web.util;

import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import javax.servlet.http.HttpSession;

import org.apache.struts.Globals;



public class MessageUtil {
	private static ResourceBundle bundle = null;
//	static {
//		Locale locale = Locale.getDefault();
//		bundle = ResourceBundle.getBundle("ApplicationResources", locale);
//	}

//	public static String getMessage(String key, PageContext pageContext)
//			throws javax.servlet.jsp.JspException {
//		return RequestUtils.message(pageContext, Globals.MESSAGES_KEY,
//				Globals.LOCALE_KEY, key, null);
//	}
//
//	public static String getMessage(String key, PageContext pageContext,
//			Object[] params) throws javax.servlet.jsp.JspException {
//		return RequestUtils.message(pageContext, Globals.MESSAGES_KEY,
//				Globals.LOCALE_KEY, key, params);
//	}

	public static String getString(String key,HttpSession session) throws MissingResourceException {
		try {
			Locale locale = (Locale)session.getAttribute(Globals.LOCALE_KEY);
			bundle = ResourceBundle.getBundle("unieap_workflow", locale);
			return bundle.getString(key);
		} catch (MissingResourceException mre) {
			return key;
		}
	}
}