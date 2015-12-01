package com.neusoft.demo.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
//import org.springframework.web.bind.ServletRequestDataBinder;

import com.neusoft.demo.bo.MyDemoBO;
import com.neusoft.demo.dao.MyDemoDAO;
import com.neusoft.demo.dao.UserInfoVO;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.tdframework.action.TDServletWrapper;
import com.neusoft.tdframework.action.TDServletWrapperFactory;

public class TestAction extends TDDispatchAction{
	
	public static void main(String[] args) throws Exception {
		TestAction test=new TestAction();
		Map requestParameters=new HashMap();
		
		requestParameters.put("userName", "ut_userName");
		requestParameters.put("password", "ut_password");
		requestParameters.put("userRole", "1");
		requestParameters.put("regdate", "2007-06-25");
		requestParameters.put("email", "ut_email");
		requestParameters.put("gender", "1");
		requestParameters.put("memo", "ut_memo");
		requestParameters.put("age", "22");
		//阿凡达是的发生的发生   上的发生的发生大法师打发斯蒂芬 阿斯顿发生大法师打发斯蒂芬 大方大方过的风格  333333333333222222222222
		System.out.println(test.testSubmit1(TDServletWrapperFactory.getTestInstance(requestParameters)));
	}
	
	public String testSubmit1(TDServletWrapper servletWrapper)	throws Exception {
		
		UserInfoVO vo=new UserInfoVO();
		
		servletWrapper.bind(vo);

		System.out.println(vo);
		
		MyDemoBO bo=null;
		
		// bo=getServiceBean("beanName");
		//====== for test ======
		MyDemoDAO dao=new MyDemoDAO();
		dao.setDataSource("jdbc:oracle:thin:@192.168.220.187:1521:crm",
				"crm_owner_user", "bss_crm_xxp1");
		bo=new MyDemoBO();
		bo.setDemoDAO(dao);
		//====== end of test ======
		
		
		bo.insertUser(vo);
		
		return "form";
	}

	public ActionForward testSubmit2(TDServletWrapper servletWrapper)	throws Exception {
		
		UserInfoVO vo=new UserInfoVO();
		
		servletWrapper.bind(vo);

		System.out.println(vo);
		
//		return servletWrapper.findForward("form");
		return servletWrapper.newForward("/form.jsp");
	}
	
	
	
	public ActionForward testSubmit3(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response)	throws Exception {
		
		UserInfoVO vo=new UserInfoVO();
		
		//ServletRequestDataBinder binder = new ServletRequestDataBinder(vo);
		//binder.bind(request);
        //asafsdf -------------------------asdfasdf 
		System.out.println(vo);
		
//		return new ActionForward("/form.jsp");
		return mapping.findForward("form");
	}
}
