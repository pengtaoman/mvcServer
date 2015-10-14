//package com.neusoft.tdframework.security.filter;
//
//import java.io.IOException;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//
//import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
//import org.springframework.security.web.context.SecurityContextPersistenceFilter;
//import org.springframework.security.web.context.SecurityContextRepository;
//
//public class TDSecurityContextPersistenceFilter extends SecurityContextPersistenceFilter{
//	
//	public TDSecurityContextPersistenceFilter() {
//		super(new HttpSessionSecurityContextRepository());
//	}
//
//	public TDSecurityContextPersistenceFilter(SecurityContextRepository repo) {
//		super(repo);
//	}
//	
//	@Override
//	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
//			throws IOException, ServletException {
//		System.out.println("--------------------------TDSecurityContextPersistenceFilter TDSecurityContextPersistenceFilter----------------------------");
//		super.doFilter(req, res, chain);
//	}
//
//}
