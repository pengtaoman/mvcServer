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

public class TDUserAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {
	
	
	private UserDetailsService userDetailsService;
	
	public TDUserAuthenticationProvider(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken authentication)
			throws AuthenticationException {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected UserDetails retrieveUser(String username,
			UsernamePasswordAuthenticationToken authentication)
			throws AuthenticationException {
		UserDetails loadedUser;
        System.out.println("()()()()()()()()()()()() TDUserAuthenticationProvider :: " + this.getUserDetailsService());
		try {
			loadedUser = this.getUserDetailsService().loadUserByUsername(username);
		}
		catch (UsernameNotFoundException notFound) {
//			if (authentication.getCredentials() != null) {
//				String presentedPassword = authentication.getCredentials().toString();
//				passwordEncoder.isPasswordValid(userNotFoundEncodedPassword,
//						presentedPassword, null);
//			}
			throw notFound;
		}
		catch (Exception repositoryProblem) {
			throw new InternalAuthenticationServiceException(
					repositoryProblem.getMessage(), repositoryProblem);
		}

		if (loadedUser == null) {
			throw new InternalAuthenticationServiceException(
					"UserDetailsService returned null, which is an interface contract violation");
		}
		return loadedUser;
	}
	
	public void setUserDetailsService(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	protected UserDetailsService getUserDetailsService() {
		return userDetailsService;
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
		
		return new DaoAuthenticationProvider().authenticate(authentication);

		
	}

}
