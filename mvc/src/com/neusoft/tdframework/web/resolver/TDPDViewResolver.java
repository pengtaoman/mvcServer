package com.neusoft.tdframework.web.resolver;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;

public class TDPDViewResolver implements ViewResolver {

	private Map<String, ? extends View> views = new HashMap<String, View>();
	
	@Override
	public View resolveViewName(String viewName, Locale locale)
			throws Exception {
		if (viewName.startsWith("pdf/")) {
			return this.views.get("pdf");
		}
		return null;
	}
	
	public void setViews(Map<String, ? extends View> views) {
		this.views = views;
	}

}
