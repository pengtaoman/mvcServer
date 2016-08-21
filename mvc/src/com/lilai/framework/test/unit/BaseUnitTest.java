package com.lilai.framework.test.unit;


import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.ServletTestExecutionListener;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.lilai.framework.config.AppConfig;
import com.lilai.framework.config.BusinessConfig;
import com.lilai.framework.config.PersistenceConfig;
import com.lilai.framework.config.RedisConfig;
//import com.lilai.framework.config.SecurityConfig;
import com.lilai.framework.web.config.WebConfig;

import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;




@RunWith(SpringJUnit4ClassRunner.class)  
@WebAppConfiguration(value = "/")  
@ContextHierarchy({  
      //@ContextConfiguration(name = "parent", classes = { PersistenceConfig.class, AppConfig.class, RedisConfig.class, SecurityConfig.class, BusinessConfig.class}), 
	  @ContextConfiguration(name = "parent", classes = { AppConfig.class, BusinessConfig.class}),  
      @ContextConfiguration(name = "child", classes = WebConfig.class)  
}) 
@TestExecutionListeners(listeners={ServletTestExecutionListener.class,
		DependencyInjectionTestExecutionListener.class,
		DirtiesContextTestExecutionListener.class,
		TransactionalTestExecutionListener.class
		//,WithSecurityContextTestExecutionListener.class
		})
public class BaseUnitTest {
	@Autowired
	protected WebApplicationContext wac;
	protected MockMvc mockMvc;

	@Before
	public void setUp() {

		OpenEntityManagerInViewFilter openEntityManagerInViewFilter = new OpenEntityManagerInViewFilter();
		openEntityManagerInViewFilter.setEntityManagerFactoryBeanName("entityManagerFactory");
		openEntityManagerInViewFilter.setServletContext(wac.getServletContext());
		
		System.out.println("???????????????  wac.getServletContext() :: " + wac.getServletContext());
		//wac.getServletContext().addFilter("openEntityManagerInViewFilter", "org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter").addMappingForUrlPatterns(null, true, "/*");;
		mockMvc = MockMvcBuilders
				.webAppContextSetup(wac)
				.addFilter(openEntityManagerInViewFilter, "/*")
				.apply(SecurityMockMvcConfigurers.springSecurity())
				
				.build();

	}
	
    
}
