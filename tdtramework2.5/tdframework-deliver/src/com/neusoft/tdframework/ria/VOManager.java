package com.neusoft.tdframework.ria;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class VOManager {
	
	private static ApplicationContext ctx = null;

	private static final String string = "vo.xml";

	static {
		init();
	}

	static public void init() {
		ctx = new ClassPathXmlApplicationContext(string);
	}

	static public Object getVO(String bean) {
		Object object = ctx.getBean(bean);
		return object;
	}

	static public String getName(Object object) {
		String[] beanNamesForType = ctx.getBeanNamesForType(object.getClass());
		String name = null;
		switch (beanNamesForType.length) {
		case 0:
			break;
		case 1:
			name = beanNamesForType[0];
			break;
		default:
			break;
		}
		return name;
	}
	
}
