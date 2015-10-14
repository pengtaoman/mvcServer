package com.neusoft.tdframework.test.unit.demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.http.HttpMethod;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContext;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.neusoft.tdframework.demo.UserService;
import com.neusoft.tdframework.test.unit.BaseUnitTest;




import com.neusoft.tdframework.util.URIUtil;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.*;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.*;

public class DemoTest extends BaseUnitTest{
	
	@Test  
	public void testView() throws Exception { 
		UserService us = this.wac.getBean(UserService.class);
		System.out.println(us.hashCode());
		us.createUser();
	}
	
	@Test  
	@WithUserDetails("100000")
	public void testControl() throws Exception {  
	    //mockMvc.perform(MockMvcRequestBuilders.get("/helloWorld/mamamyu"));  
	    mockMvc.perform(MockMvcRequestBuilders.post("/hello11.do")); 
	}  
	
	@Test  
	public void testControl22() throws Exception {  
	    //mockMvc.perform(MockMvcRequestBuilders.get("/helloWorld/mamamyu"));  
	    mockMvc.perform(MockMvcRequestBuilders.post("/hello22")); 
	}  
	
	@Test
	public void testLogin() {
		
		try {
			//MockMvcRequestBuilders.get("").buildRequest(servletContext)
			//MockMvcRequestBuilders.MockHttpServletRequest
			wac.getServletContext().setAttribute("isforuttest", "justforuttest");
			RequestBuilder requestBuilder = formLogin("/main/login?isforuttest=justforuttest").user("100000").password("1234256");
			//requestBuilder.buildRequest(wac.getServletContext());
			mockMvc.perform(requestBuilder)
			        .andExpect(unauthenticated());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
//	@Test
//	@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class)
//    public void testControl11() throws Exception {  
//	    //mockMvc.perform(MockMvcRequestBuilders.get("/helloWorld/mamamyu"));  
//	    mockMvc.perform(MockMvcRequestBuilders.post("/hello11")); 
//	} 

}
