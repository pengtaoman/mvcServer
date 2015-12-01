/*
 * Created on 2004-12-7
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.context;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;

import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author chenzt
 *
 * CRMϵͳ���
 * 
 */
public class FrameAppContext {
	//��ܵı�ʶ
	public static final String PREFIX = "tdframework";
	
	private static ApplicationContext appContext = null;
	private static AppConfig appConfig = null;
	private static Map paramAppContext = new HashMap();
	
	/**
	 * ���ŷָ��嵥
	 * @param fileList
	 */
	private static ApplicationContext createAppContext(String fileList) {
		String configFileList[] = fileList.split(",");
		for(int i=0;i<configFileList.length;i++) {
			configFileList[i] = configFileList[i].trim(); 
		}
		
		return new ClassPathXmlApplicationContext(
				configFileList
				);
		
	}
	
	/**
	 * ��ʼ��AppConfig����
	 *
	 */
	private static synchronized void initAppConfig() {
		//XmlBeanFactory xmlBeanFactory = new XmlBeanFactory(FileUtil.getStream("config/applicationConfig.xml"));
		XmlBeanFactory xmlBeanFactory = new XmlBeanFactory(new ClassPathResource("/config/applicationConfig.xml"));
		appConfig = (AppConfig)xmlBeanFactory.getBean("appConfig");
	}
	
	/**
	 * ��ȡϵͳ������Ϣ
	 * @return
	 */
	public static AppConfig getAppConfig() {
		if(appConfig==null) initAppConfig();
		return appConfig;
	}
	
	/**
	 * Ӧ���ڲ���ʱ�õ������Bean
	 * @param bean
	 * @return
	 */
	/*
	public static Object getBean(String bean) {
		if(appConfig==null) {
			String configFile = getAppConfig().getConfigFile();
			appContext = createAppContext(configFile);
		} 
		return appContext.getBean(bean);
	}
	*/
	public static Object getBean(String bean) {
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appC = new AppContextImpl();
		appC.setApplicationName("example");
		
		Object baseService = (Object) factory.getInteractionObject(bean,  appC);
		return baseService;
	}
	
	/**
	 * ��ȡӦ�ò������õ�������
	 * @param appPrefix
	 */
	public static ApplicationContext getParamAppContext(String appPrefix) {
		ApplicationContext appContext = (ApplicationContext)paramAppContext.get(appPrefix);
		if(appContext == null) {
			String paramConfigFileList = (String)getAppConfig().getParamConfigFile().get(appPrefix);
			//���û��������Ӧģ������ݣ����ؿ�
			if(paramConfigFileList==null || paramConfigFileList.trim().intern() == "".intern()) return null; 
			appContext = createAppContext(paramConfigFileList);
			paramAppContext.put(appPrefix,appContext);
		}
		
		return appContext;
	}
	
	/**
	 * 
	 * ��WEB������Ӧ�������Ļ�ȡ������Ϣ
	 * 
	 * @param servletContext
	 * @param beanName
	 * @return
	 */
	public static Object getBean(ServletContext servletContext,String beanName) {

		//ApplicationContext context = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
		return getBean(beanName);
	}
	
	/**
	 * ��ȡ������ʵ����
	 * @param prefix
	 * @param beanName
	 * @return
	 */
	public static Object getParamBean(String prefix,String beanName) {
		/**ApplicationContext context = getParamAppContext(prefix);
		if(context==null) return null; 
		return context.getBean(beanName);
		*/
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appC = new AppContextImpl();
		appC.setApplicationName(prefix);
		
		Object baseService = (Object) factory.getInteractionObject(beanName,  appC);
		return baseService;
	}
	
}
