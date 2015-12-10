package com.neusoft.tdframework.web.resolver;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.apache.tiles.request.render.Renderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.AbstractUrlBasedView;
import org.springframework.web.servlet.view.AbstractView;
import org.springframework.web.servlet.view.tiles3.TilesView;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

public class TDTilesViewResolver extends TilesViewResolver {
	
	@Autowired
	private Environment env;
	
	@Override
	protected View loadView(String viewName, Locale locale) throws Exception {
		
		//"/resources/**","/main/tdlogin", "/main/register", "/main/logout"
		System.out.println(">>>>>>>>>>>>MMMMMMMMMMMMMMMMMMM  TDTilesViewResolver loadView ::  " + viewName);
		System.out.println(">>>>>>>>>>>>MMMMMMMMMMMMMMMMMMM  TDTilesViewResolver Environment ::  " + env);
		
		if (viewName.startsWith("tiles.")) {
			
			String tilesViewName = viewName.substring("tiles.".length());
			AbstractUrlBasedView view = buildView(tilesViewName);
			
			View result = this.applyLifecycleMethods(tilesViewName, view);
			return (view.checkResource(locale) ? result : null);
		} else if ("".equals(viewName)){
			return super.loadView(viewName, locale);
		} else {
			return super.loadView(viewName, locale);
		}
		

	}
	
	private View applyLifecycleMethods(String viewName, AbstractView view) {
		return (View) getApplicationContext().getAutowireCapableBeanFactory().initializeBean(view, viewName);
	}
}
