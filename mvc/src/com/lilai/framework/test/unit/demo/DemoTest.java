package com.lilai.framework.test.unit.demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.http.HttpMethod;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContext;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.lilai.framework.demo.UserService;
import com.lilai.framework.test.unit.BaseUnitTest;
import com.lilai.framework.util.URIUtil;

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
	@WithMockUser("ali")
	public void testControl() throws Exception {  
	    //mockMvc.perform(MockMvcRequestBuilders.get("/helloWorld/mamamyu"));  
		ResultActions ra = mockMvc.perform(MockMvcRequestBuilders.post("/hello11.do")); 
		System.out.println("++++++++++++++++++++++++++++++++++++++" + ra.getClass().getSimpleName());
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
			RequestBuilder requestBuilder = formLogin("/main/login?isforuttest=justforuttest").user("ali").password("12");
			//requestBuilder.buildRequest(wac.getServletContext());
			mockMvc.perform(requestBuilder)
			        .andExpect(authenticated());
			
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
