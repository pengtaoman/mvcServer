package com.neusoft.uniflow.web.util;

import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.log4j.Logger;

public class SessonAtrributeListener implements HttpSessionListener,
		HttpSessionAttributeListener {
	
	private static Logger logger;
	
	static {
		logger=Logger.getLogger("com.neusoft.uniflow.session");
	}

	public void sessionCreated(HttpSessionEvent event) {
	}

	public void sessionDestroyed(HttpSessionEvent event) {

	}

	public void attributeAdded(HttpSessionBindingEvent bindingEvent) {
		logger.info("add Attribute attributeName=====>"+bindingEvent.getName()+" attributeValue=======>"+bindingEvent.getValue());
	}

	public void attributeRemoved(HttpSessionBindingEvent bindingEvent) {
		logger.info("Removed Attribute attributeName=====>"+bindingEvent.getName()+" attributeValue=======>"+bindingEvent.getValue());

	}

	public void attributeReplaced(HttpSessionBindingEvent bindingEvent) {
		logger.info("Change Attribute attributeName======>"+bindingEvent.getName()+" attributeValue=======>"+bindingEvent.getValue());

	}

}
