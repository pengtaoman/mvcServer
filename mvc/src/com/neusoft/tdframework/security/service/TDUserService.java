package com.neusoft.tdframework.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neusoft.tdframework.base.BaseService;
import com.neusoft.tdframework.entity.User;
import com.neusoft.tdframework.security.dao.TDSecurityUserDAO;

@Service
public class TDUserService extends BaseService {
	
	@Autowired
	TDSecurityUserDAO tdSecurityUserDAO;
	
    

	
	public User findSecurityUserByID(String id) {
		return tdSecurityUserDAO.findSecurityUserByID(id);
	}
	

}
