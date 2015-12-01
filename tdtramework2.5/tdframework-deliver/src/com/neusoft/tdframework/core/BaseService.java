package com.neusoft.tdframework.core;

import org.springframework.context.ApplicationContext;

import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
/**
* BaseService ½Ó¿Ú <br>
* * 
* @author lubin
* @since 2004-10-11
* @version 1.0, 2004-10-11
*/
public interface BaseService extends Service{

	public void setApplicationContext(ApplicationContext wac);
	public void setFactory(InteractionObjectFactory wac);
	public void setAppContext(AppContext appC);
	public Service getServiceFacade(String ServiceFacadeName);
}
