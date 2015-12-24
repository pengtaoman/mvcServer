package com.lilai.framework.test.unit;


import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.lilai.framework.config.SecurityConfig;
import com.lilai.framework.web.config.WebConfig;

import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;




@RunWith(SpringJUnit4ClassRunner.class)  
@WebAppConfiguration(value = "/")  
@ContextHierarchy({  
      @ContextConfiguration(name = "parent", classes = { PersistenceConfig.class, AppConfig.class, SecurityConfig.class, BusinessConfig.class}),  
      @ContextConfiguration(name = "child", classes = WebConfig.class)  
}) 
@TestExecutionListeners(listeners={ServletTestExecutionListener.class,
		DependencyInjectionTestExecutionListener.class,
		DirtiesContextTestExecutionListener.class,
		TransactionalTestExecutionListener.class,
		WithSecurityContextTestExecutionListener.class})
public class BaseUnitTest {
	@Autowired
	protected WebApplicationContext wac;
	protected MockMvc mockMvc;

	@Before
	public void setUp() {

		mockMvc = MockMvcBuilders
				.webAppContextSetup(wac)
				.apply(SecurityMockMvcConfigurers.springSecurity())
				.build();

	}
	
    
}