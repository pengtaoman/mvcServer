package com.neusoft.demo.dao;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class TestDAO {
	
	
	///////////////////////////////////
	//
	// 以下为测试代码
	//
	///////////////////////////////////
	
	public static void test_select(MyDemoDAO testDAO) {
		System.out.println("============= test_select ===============");
		Map param=new HashMap();

		List userlist=null;

		param.put("max_userid", "999999999");
		userlist=testDAO.queryUserList(param);
		
		System.out.println("----- 结果 : -----");
		for (Iterator itor=userlist.iterator();itor.hasNext();){
			UserInfoVO vo=(UserInfoVO)itor.next();
			System.out.println(vo.getUserId()+" : "+ vo.getUserName()+"  "+vo.getMemo());
		}
		
		StackTraceElement stack[] = new Throwable().getStackTrace();
		if (stack.length>2){
			System.out.println(stack[2].getClassName()+"  "+stack[2].getMethodName()+"  "+stack[2].getLineNumber());
		}


	}
	
	public static void test_select_sub(MyDemoDAO testDAO) {
		System.out.println("============= test_select_sub ===============");
		Map param=new HashMap();

		List userlist=null;
		
		param.put("max_userid", "1000");
		
		userlist=testDAO.queryNsubQueryUserList(param);

		System.out.println("----- 结果 : -----");
		for (Iterator itor=userlist.iterator();itor.hasNext();){
			UserInfoVO vo=(UserInfoVO)itor.next();
			System.out.println(vo.getUserId()+" : "+ vo.getUserName()+"  "+vo.getMemo());
		}
		

	}
	
	public static void test_update(MyDemoDAO testDAO) {
		System.out.println("============= test_update ===============");
		Map param=new HashMap();
		int resultCode;
		param.put("userid", "1");
		param.put("email", "aaa@qwe.com");
		resultCode=testDAO.updateUserEmail(param);
		System.out.println("----- 结果 : "+resultCode+" -----");
	}
	
	public static void test_delete(MyDemoDAO testDAO) {
		System.out.println("============= test_delete ===============");
		Map param=new HashMap();
		int resultCode;
		
		param.put("username","NewUser_batch%" );
		resultCode=testDAO.deleteUser(param);
		System.out.println("----- 结果 : "+resultCode+" -----");
	}
	
	public static void test_insert(MyDemoDAO testDAO) {
		System.out.println("============= test_insert ===============");
		Map param=new HashMap();
		int resultCode;

		param.put("username","NewUser2343" );
		param.put("password", "123");
		param.put("userrole","1" );
		param.put("email",param.get("username")+"@neusoft.com" );
		param.put("gender","1" );
		param.put("memo",param.get("username")+"'s default memo: asdasdasdasdasd" );
		resultCode=testDAO.insertUser(param);
		
		System.out.println("----- 结果 : "+resultCode+" -----");
	}
	
	
	public static void test_insert_batch(MyDemoDAO testDAO) {
		System.out.println("============= test_insert_batch ===============");
		Map param=new HashMap();

		param.put("user_num","5000" );
		param.put("username","NewUser_batch" );
		param.put("password", "123");
		param.put("userrole","1" );
		param.put("email",param.get("username")+"@neusoft.com" );
		param.put("gender","1" );
		param.put("memo",param.get("username")+"'s default memo: asdasdasdasdasd" );


		System.out.println("----- 结果 -----");
		System.out.println(testDAO.insertSomeUser(param));
	}
	
	public static void test_procedure(MyDemoDAO testDAO) {
		System.out.println("============= test_procedure ===============");
		Map param=new HashMap();

		param.put("userid", "1");
		System.out.println("----- 结果 : -----");
		System.out.println(testDAO.callProcedure(param));
		
	}
	
	
	public static void test_function(MyDemoDAO testDAO) {
		System.out.println("============= test_function ===============");
		Map param=new HashMap();

		param.put("userid", "2");
		System.out.println("----- 结果 : -----");
		System.out.println(testDAO.callFunction(param));
		
	}
	
	public static void main(String[] args) {
		Resource resource=new ClassPathResource("testcontext.xml");
		BeanFactory factory = new XmlBeanFactory(resource);
		
		MyDemoDAO testDAO1 = (MyDemoDAO) factory.getBean("testDAO1");
		System.out.println(testDAO1);
		System.out.println(testDAO1.getDataSource());

		MyDemoDAO testDAO2 = (MyDemoDAO) factory.getBean("testDAO2");
		System.out.println(testDAO2);
		System.out.println(testDAO2.getDataSource("ds2"));
		System.out.println("===================");
		

		TestDAO.test_update(testDAO1);
		TestDAO.test_procedure(testDAO1);
		TestDAO.test_function(testDAO1);
		TestDAO.test_insert(testDAO1);
		TestDAO.test_select(testDAO1);
		TestDAO.test_insert_batch(testDAO1);
		TestDAO.test_select_sub(testDAO1);
		TestDAO.test_delete(testDAO1);

		TestDAO.test_select(testDAO1);
		System.gc();
		System.runFinalization();

	}
}
