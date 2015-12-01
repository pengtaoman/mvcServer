package com.neusoft.tdframework.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public interface TDServletWrapper {

	public Map getParameterMap();
	
	
	public void setAttribute(String key,Object value);
	public Object getAttribute(String key);
	
	public ActionForward findForward(String name);

	public ActionForward newForward(String path);
	
	public ActionForward newForward(String path, boolean redirect);
	
	
	
	public String getParameter(String key);
	
	public String getParameter(String key,String ifNull);
	
	public String getParameterNoEmpty(String key,String ifEmpty);
	
	public String[] getParameterValues(String key);
	
	
	
	public Integer getIntegerParameter(String key);
	
	public Integer getIntegerParameter(String key,int ifNull);
	
	public Integer[] getIntegerParameterValues(String key);
	
	
	
	public Long getLongParameter(String key);
	
	public Long getLongParameter(String key,int ifNull);
	
	public Long[] getLongParameterValues(String key);
	

	public Double getDoubleParameter(String key);
	
	public Double getDoubleParameter(String key,double ifNull);
	
	public Double[] getDoubleParameterValues(String key);
	
	
	public Boolean getBooleanParameter(String key);
	
	public Boolean getBooleanParameter(String key,boolean ifNull);
	
	public Boolean[] getBooleanParameterValues(String key);
	
	
	public HttpSession getSession();
	public HttpSession getSession(boolean create);

	
	public HttpServletRequest getRequest();

	public void setRequest(HttpServletRequest request);

	public HttpServletResponse getResponse();
	
	public PrintWriter getResponseWriter() throws IOException;
	
	public void setResponseContentType(String contentType);

	public void setResponse(HttpServletResponse response);
	
	public ActionForm getForm();

	public void setForm(ActionForm form);
	
	public ActionMapping getMapping();

	public void setMapping(ActionMapping mapping);
	
	public void bind(Object bean);
	
}
