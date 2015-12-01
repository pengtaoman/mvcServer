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
import org.springframework.web.bind.ServletRequestDataBinder;


public class TDServletWrapperImpl implements TDServletWrapper {
	
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	private ActionMapping mapping;
	private ActionForm form;



	public TDServletWrapperImpl(HttpServletRequest request,HttpServletResponse response) {
		this.request=request;
		this.response=response;
	}

	public TDServletWrapperImpl(ActionMapping mapping,ActionForm form,HttpServletRequest request,HttpServletResponse response) {
		this(request,response);
		this.mapping=mapping;
		this.form=form;
	}
	
	public void bind(Object bean) {
		ServletRequestDataBinder binder = new ServletRequestDataBinder(bean);
		binder.bind(request);
	
	}
	
	public ActionForward findForward(String name){
		return mapping.findForward(name);
	}

	public ActionForward newForward(String path){
		return new ActionForward(path);
	}
	
	public ActionForward newForward(String path, boolean redirect){
		return new ActionForward(path,redirect);
	}
	
	public Map getParameterMap(){
		return request.getParameterMap();
	}
	

	public String getParameter(String key) {
		return request.getParameter(key);
	}

	public String getParameter(String key, String ifNull) {
		String obj=getParameter(key);
		return obj==null?ifNull:obj;
	}

	public String getParameterNoEmpty(String key, String ifEmpty) {
		String obj=getParameter(key);
		return obj==null||obj.length()<1?ifEmpty:obj;
	}
	
	public String[] getParameterValues(String key) {
		return request.getParameterValues(key);
	}
	
	
	
	public Integer getIntegerParameter(String key) {
		try {
			return Integer.valueOf(getParameter(key));
		} catch (Exception e) {
			return null;
		}
	}

	public Integer getIntegerParameter(String key, int ifNull) {
		Integer obj=getIntegerParameter(key);
		return obj==null?new Integer(ifNull):obj;
	}

	public Integer[] getIntegerParameterValues(String key) {
		String[] objs=getParameterValues(key);
		if (objs==null) return null;
		Integer[] dObjs=new Integer[objs.length];
		
		for (int i=0;i<objs.length;i++){
			try {
				dObjs[i]=Integer.valueOf(objs[i]);
			} catch (Exception e) {
				dObjs[i]=null;
			}
		}
		return dObjs;
	}

	
	
	public Long getLongParameter(String key) {
		try {
			return Long.valueOf(getParameter(key));
		} catch (Exception e) {
			return null;
		}
	}

	public Long getLongParameter(String key, int ifNull) {
		Long obj=getLongParameter(key);
		return obj==null?new Long(ifNull):obj;
	}

	public Long[] getLongParameterValues(String key) {
		String[] objs=getParameterValues(key);
		if (objs==null) return null;
		Long[] dObjs=new Long[objs.length];
		
		for (int i=0;i<objs.length;i++){
			try {
				dObjs[i]=Long.valueOf(objs[i]);
			} catch (Exception e) {
				dObjs[i]=null;
			}
		}
		return dObjs;
	}
	
	
	public Double getDoubleParameter(String key) {
		try {
			return Double.valueOf(getParameter(key));
		} catch (Exception e) {
			return null;
		}
	}

	public Double getDoubleParameter(String key, double ifNull) {
		Double obj=getDoubleParameter(key);
		return obj==null?new Double(ifNull):obj;
	}

	public Double[] getDoubleParameterValues(String key) {
		String[] objs=getParameterValues(key);
		if (objs==null) return null;
		Double[] dObjs=new Double[objs.length];
		
		for (int i=0;i<objs.length;i++){
			try {
				dObjs[i]=Double.valueOf(objs[i]);
			} catch (Exception e) {
				dObjs[i]=null;
			}
		}
		return dObjs;
	}
	
	
	public Boolean getBooleanParameter(String key) {
		try {
			return Boolean.valueOf(getParameter(key));
		} catch (Exception e) {
			return null;
		}
	}

	public Boolean getBooleanParameter(String key, boolean ifNull) {
		Boolean obj=getBooleanParameter(key);
		return obj==null?new Boolean(ifNull):obj;
	}

	public Boolean[] getBooleanParameterValues(String key) {
		String[] objs=getParameterValues(key);
		if (objs==null) return null;
		Boolean[] dObjs=new Boolean[objs.length];
		
		for (int i=0;i<objs.length;i++){
			try {
				dObjs[i]=Boolean.valueOf(objs[i]);
			} catch (Exception e) {
				dObjs[i]=null;
			}
		}
		return dObjs;
	}
	
	public Object getAttribute(String key) {
		return request.getAttribute(key);
	}
	
	public void setAttribute(String key,Object value){
		request.setAttribute(key,value);
	}
	
	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}

	public HttpSession getSession() {
		return ((HttpServletRequest)request).getSession();
	}
	public HttpSession getSession(boolean create) {
		return ((HttpServletRequest)request).getSession(create);
	}


	public ActionForm getForm() {
		return form;
	}

	public void setForm(ActionForm form) {
		this.form = form;
	}

	public ActionMapping getMapping() {
		return mapping;
	}

	public void setMapping(ActionMapping mapping) {
		this.mapping = mapping;
	}

	public PrintWriter getResponseWriter() throws IOException {
		return getResponse().getWriter();
	}

	public void setResponseContentType(String contentType) {
		getResponse().setContentType(contentType);
	}




}
