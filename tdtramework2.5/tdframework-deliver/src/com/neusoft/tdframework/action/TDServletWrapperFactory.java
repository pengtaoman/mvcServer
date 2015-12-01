package com.neusoft.tdframework.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;


public class TDServletWrapperFactory {

	public static TDServletWrapper getInstance(ActionMapping mapping,ActionForm form,HttpServletRequest request,HttpServletResponse response){
		return new TDServletWrapperImpl(mapping,form,request,response);
	}
	
	
	public static TDServletWrapper getTestInstance(Map requestParameters){
		return new TDServletWrapperTestImpl(requestParameters);
	}
	
	public static TDServletWrapper getTestInstance(Map requestParameters,Map requestAttributes){
		return new TDServletWrapperTestImpl(requestParameters,requestAttributes);
	}
	
}
