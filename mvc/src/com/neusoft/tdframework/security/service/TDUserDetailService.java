package com.neusoft.tdframework.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.neusoft.tdframework.entity.User;
import com.neusoft.tdframework.security.pojo.TDSecurityUser;

@Component
public class TDUserDetailService implements UserDetailsService{

	@Autowired
	private TDUserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		System.out.println("##############  loadUserByUsername #################");
		User user= userService.findSecurityUserByID(username);
		if(user == null){
		      throw new UsernameNotFoundException("UserName "+username+" not found");
		}
		return new TDSecurityUser(user);
	}

}
