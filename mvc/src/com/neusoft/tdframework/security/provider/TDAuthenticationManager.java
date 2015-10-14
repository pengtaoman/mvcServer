package com.neusoft.tdframework.security.provider;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class TDAuthenticationManager implements AuthenticationManager{

	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {
		System.out.println("()()()()()()()()()()()() TDAuthenticationManager :: ");
		return null;
	}

}
