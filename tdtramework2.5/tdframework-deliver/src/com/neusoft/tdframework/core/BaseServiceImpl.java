package com.neusoft.tdframework.core;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;

import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
/**
* BaseService 接口实现类 <br>
* * 
* @author lubin
* @since 2004-10-11
* @version 1.0, 2004-10-11
*/
public class BaseServiceImpl implements BaseService {


	public ApplicationContext wacs;
	public InteractionObjectFactory _factory;
	public AppContext _appC = null;
	protected static final Log log =
		LogFactory.getLog(BaseServiceImpl.class.getName());
			
	public void setApplicationContext(ApplicationContext wac){
		this.wacs = wac;
	}

	public void setAppContext(AppContext appC){
		this._appC = appC;
	}


	public void setFactory(InteractionObjectFactory factory){
		this._factory = factory;
	}
	/*
	private  Object getBean(String beans){
		Object service =(Object)wacs.getBean(beans);
		return service;		
	}
	*/
	private  Object getBean(String beans){
		//AppContext appContext = new AppContextImpl();
		//appContext.setApplicationName(appName);
		Object service = (Object) _factory.getInteractionObject(beans, _appC);
		return service;		
	}

	public Service getServiceFacade(String serviceFacadeName){
		return (Service)getBean(serviceFacadeName);
	}

	
}
