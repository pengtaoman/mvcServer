//package com.lilai.framework.web.config;
//
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.support.RequestDataValueProcessor;
//
//@Component("requestDataValueProcessor")
//public class TDRequestDataValueProcessor implements RequestDataValueProcessor {
//
//	@Override
//	public String processAction(HttpServletRequest request, String action,
//			String httpMethod) {
//		System.out.println("******************** TDRequestDataValueProcessor processAction ******* ");
//		return null;
//	}
//
//	@Override
//	public String processFormFieldValue(HttpServletRequest request,
//			String name, String value, String type) {
//		System.out.println("******************** TDRequestDataValueProcessor processFormFieldValue ******* ");
//		return null;
//	}
//
//	@Override
//	public Map<String, String> getExtraHiddenFields(HttpServletRequest request) {
//		System.out.println("******************** TDRequestDataValueProcessor processFormFieldValue ******* ");
//		return null;
//	}
//
//	@Override
//	public String processUrl(HttpServletRequest request, String url) {
//		System.out.println("******************** TDRequestDataValueProcessor processUrl ******* ");
//		return null;
//	}
//
//}
