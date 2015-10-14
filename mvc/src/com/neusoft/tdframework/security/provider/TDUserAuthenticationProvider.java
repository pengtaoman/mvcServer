package com.neusoft.tdframework.security.provider;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.neusoft.tdframework.entity.User;
import com.neusoft.tdframework.security.pojo.TDSecurityUser;
import com.neusoft.tdframework.security.service.TDUserDetailService;

public class TDUserAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {
	
	

	public TDUserAuthenticationProvider() {

	}

	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken authentication)
			throws AuthenticationException {
		// TODO Auto-generated method stub
	}

	
	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {
		//UserDetails user = (UserDetails)authentication.getPrincipal();
		if (authentication.getPrincipal().equals("ali")) {
			
			GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();
			
			SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_tduser");
			Collection<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
			authorities.add(authority);
			
			User us = new User();
			us.setId(1999L);
			TDSecurityUser user = new TDSecurityUser(us);
			
			UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(
					authentication.getPrincipal(), authentication.getCredentials(),
					authoritiesMapper.mapAuthorities(authorities));
			result.setDetails(authentication.getDetails());
			return result;
		}
		
		return null;

		
	}

	@Override
	protected UserDetails retrieveUser(String username,
			UsernamePasswordAuthenticationToken authentication)
			throws AuthenticationException {
		return null;
	}



}
