package com.lilai.framework.security.filter;
//package com.lilai.tdframework.security.filter;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import javax.servlet.Filter;
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
//import org.springframework.security.web.context.SecurityContextPersistenceFilter;
//import org.springframework.security.web.util.matcher.RequestMatcher;
//
//public class TDSecurityFilterChain  implements SecurityFilterChain {
//
//	private static final List<Filter> filterLst = new ArrayList<Filter>();
//	
//	//private final RequestMatcher requestMatcher = new RequestMatcher();
//	public TDSecurityFilterChain() {
//		System.out.println("========================TDSecurityFilterChain========================");
//	}
//	@Override
//	public boolean matches(HttpServletRequest request) {
//		// TODO Auto-generated method stub
//		return true;
//	}
//
//	@Override
//	public List<Filter> getFilters() {
//		if (filterLst.isEmpty()) {
//			filterLst.add(securityContextPersistenceFilter());
//			filterLst.add(new TDSecurityFilter());
//		}
//		return filterLst;
//	}
//	
//	
//	public SecurityContextPersistenceFilter securityContextPersistenceFilter() {
//		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  SecurityContextPersistenceFilter >>>>>>>>>>>>>>>>>>>>>>");
//		SecurityContextPersistenceFilter securityContextPersistenceFilter = new SecurityContextPersistenceFilter(httpSessionSecurityContextRepository());
//		securityContextPersistenceFilter.setForceEagerSessionCreation(true);
//		System.out.println("-------------------------------------------  " + securityContextPersistenceFilter);
//		return securityContextPersistenceFilter;
//	}
//	
//	public HttpSessionSecurityContextRepository httpSessionSecurityContextRepository() {
//		HttpSessionSecurityContextRepository httpSessionSecurityContextRepository = new HttpSessionSecurityContextRepository();
//		httpSessionSecurityContextRepository.setAllowSessionCreation(true);
//		httpSessionSecurityContextRepository.setDisableUrlRewriting(false);
//		System.out.println("##########  HttpSessionSecurityContextRepository " + httpSessionSecurityContextRepository);
//		return httpSessionSecurityContextRepository;
//	}
//
//}
