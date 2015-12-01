/*
 * Copyright 2006-2007 original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.neusoft.tdframework;

import javax.servlet.http.HttpServletRequest;
import org.ecside.filter.ECSideFilter;

import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;



/**
 * @author Wei Zijun
 * org.tdeccn.table.filter.TDExportFilter
 */

public class TDCommonFilter extends ECSideFilter {
	

//    public AbstractEasyListModel getEasyListModelBean(HttpServletRequest request,String beanName){
//    	Object bean=null;
// 		String[] appsName=request.getServletPath().split("/");
//		for (int i=0;i<appsName.length;i++){
//			bean=getBean(appsName[i],beanName);
//			if (bean!=null) { break;}
//		}
//    	return (AbstractEasyListModel)bean;
//    }
//    
//    public DataAccessModel getDataAccessModelBean(HttpServletRequest request,String beanName){
//    	Object bean=null;
// 		String[] appsName=request.getServletPath().split("/");
//		for (int i=0;i<appsName.length;i++){
//			bean=getBean(appsName[i],beanName);
//			if (bean!=null) { break;}
//		}
//    	return (DataAccessModel)bean;
//    }
//
//    public static Object getBean(String applicationName , String beanName){
//    	Object bean=null;
//    	InteractionObjectFactory factory = InteractionObjectFactory .getInstance();
//		AppContext appContext = new AppContextImpl();
//		appContext.setApplicationName(applicationName);
//		try {
//			bean=factory.getInteractionObject(beanName,appContext);
//		} catch (Throwable e) {
//			bean=null;
//		}
//    	if (bean==null){
//    		LogHandler.warnLog(logger,TDCommonFilter.class," Can't find Bean named "+beanName);
//    	}
//		return bean;
//    }
    
}
