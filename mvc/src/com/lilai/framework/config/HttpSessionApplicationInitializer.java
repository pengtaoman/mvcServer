package com.lilai.framework.config;

//import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;


/**
 * 创建HttpSessionApplicationInitializer，
 * 继承AbstractHttpSessionApplicationInitializer，HttpSessionApplicationInitializer不需要重载或实现任何方法，
 * 这个类只是一个使用Redis存储Session的一个标示类。在Servlet容器初始化时，会通过编码的方式添加一个Filter，
 * 通过WebApplicationContext查找名为springSessionRepositoryFilter的Filter类对request、response
 * 和session进行包装。
 * */
//public class HttpSessionApplicationInitializer extends AbstractHttpSessionApplicationInitializer {
	
//}
