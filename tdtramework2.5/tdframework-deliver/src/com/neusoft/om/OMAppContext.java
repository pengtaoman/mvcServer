/*
 * Created on 2004-12-7
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om;

import javax.servlet.ServletContext;

import com.neusoft.om.bo.OMDictionaryBO;
import com.neusoft.tdframework.context.FrameAppContext;

/**
 * @author chenzt
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OMAppContext {
	public static final String PREFIX = "om";
	/**
	private static ApplicationContext appContext = null;
	static {
		appContext =
			new ClassPathXmlApplicationContext(
				new String[] {
					"config/applicationContext.xml",
					"config/dataAccessContext.xml",
					"config/om/applicationContext-om.xml",
					"config/om/dataAccessContext-om.xml" });
	}
	*/
	
	/**
	 * �õ������Object
	 * @param bean
	 * @return
	 */
	public static Object getBean(String bean) {
		return FrameAppContext.getBean(bean);
	}
	
	/**
	 * ���WEB������Ӧ��������
	 * @param servletContext
	 * @param beanName
	 * @return
	 */
	public static Object getBean(ServletContext servletContext,String beanName) {
		return FrameAppContext.getBean(servletContext,beanName);
	}
		
	/**
	 * ��ȡ������ҵ�����
	 * @return
	 */
	public static Object getParamBean(String beanName){
		return FrameAppContext.getParamBean(PREFIX,beanName);
	}
	
}
