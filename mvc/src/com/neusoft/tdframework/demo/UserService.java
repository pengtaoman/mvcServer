package com.neusoft.tdframework.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.business.repository.OtherDAO;
import com.neusoft.tdframework.base.BaseService;
import com.neusoft.tdframework.entity.User;

@Service
public class UserService extends BaseService {
	
	@Autowired
	UserDAO userDao;
	
	@Autowired
	OtherDAO otherDAO;
    
	public void createUser() {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        for (int i=0; i < 10; i++) {
	    	User uss = new User();
	    	uss.setId(100000L + i);
	    	uss.setLastname("LN00" + i);
	    	uss.setPhoneNum("133" + Math.round(Math.random()*10000000));
	    	uss.setPassword(bCryptPasswordEncoder.encode("123456"));
	    	
	    	userDao.create(uss);	    	
        }
	    createUserOther();

	}
	
	public void createUserOther() {
		
    	User uss6 = new User();
    	uss6.setId(Math.round(Math.random()*100000));
    	uss6.setLastname("AAAVVV" + Math.round(Math.random()*100000));
    	uss6.setPhoneNum("23232323");
    	otherDAO.create(uss6);
    	
    	//throw new RuntimeException("RRRRRRRRRRRRRRaaaaaaaaaaaaaaaaaaaaa");
	}
	
	public void isopen() {
		//UserDAO userDao = this.getApplicationContext().getBean(UserDAO.class);
		
		//OtherDAO otherDAO = this.getApplicationContext().getBean(OtherDAO.class);
		//userDao.updateUser();
		//otherDAO.updateUser();
	}
	
	public List<User> findAllUser() {
		//userDao.updateUser();
		return userDao.findAllUser();
	}
	
	public User getUsers(long id) {
		
		return userDao.getUsers(id);
	}
	
//	public void updateUser() {
//		userDao.updateUser();
//	}
	
	public void testNamedQuery() {
		userDao.testNamedQuery();
	}

	

}
