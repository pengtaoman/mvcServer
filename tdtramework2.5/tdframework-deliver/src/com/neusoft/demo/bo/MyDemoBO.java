package com.neusoft.demo.bo;

import com.neusoft.demo.dao.MyDemoDAO;
import com.neusoft.demo.dao.UserInfoVO;

public class MyDemoBO {
	
	private MyDemoDAO demoDAO;

	
	public int insertUser(UserInfoVO vo){
		return demoDAO.insertUser(vo);
	}
	
	public MyDemoDAO getDemoDAO() {
		//asdfasdffffffffffffffffffffffff
		return demoDAO;
	}

	public void setDemoDAO(MyDemoDAO demoDAO) {
		this.demoDAO = demoDAO;
	}
	
}
