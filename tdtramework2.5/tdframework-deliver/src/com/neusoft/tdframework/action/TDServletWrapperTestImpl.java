package com.neusoft.tdframework.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class TDServletWrapperTestImpl implements TDServletWrapper {
	
//	private HttpServletRequest request;
//	private HttpServletResponse response;
//	
//	private ActionMapping mapping;
//	private ActionForm form;

	private Map requestParameters;
	private Map requestAttributes;

	public TDServletWrapperTestImpl() {
		requestParameters=new HashMap();
		requestAttributes=new HashMap();
	}
	
	public TDServletWrapperTestImpl(Map requestParameters) {
		this.requestParameters=requestParameters;
		requestAttributes=new HashMap();
	}
	
	public TDServletWrapperTestImpl(Map requestParameters,Map requestAttributes) {
		this.requestParameters=requestParameters;
		this.requestAttributes=requestAttributes;
	}

	public void bind(Object bean) {
		try {
			BeanUtils.populate(bean,requestParameters);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
	
	}

	public Map getParameterMap(){
		return requestParameters;
	}
	

	public String getParameter(String key) {
		return (String)requestParameters.get(key);
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
		Object obj=requestParameters.get(key);
		if (obj instanceof String[]){
			return (String[])obj;
		}else{
			return new String[]{(String)obj};
		}
		
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
		return requestAttributes.get(key);
	}
	
	public void setAttribute(String key,Object value){
		requestAttributes.put(key,value);
	}
	
	
	
	public HttpServletRequest getRequest() {
		return null;
	}

	public void setRequest(HttpServletRequest request) {
		
	}

	public HttpServletResponse getResponse() {
		return null;
	}

	public void setResponse(HttpServletResponse response) {
		
	}

	public HttpSession getSession() {
		return null;
	}
	public HttpSession getSession(boolean create) {
		return null;
	}


	public ActionForm getForm() {
		return null;
	}

	public void setForm(ActionForm form) {
		
	}

	public ActionMapping getMapping() {
		return null;
	}

	public void setMapping(ActionMapping mapping) {
		
	}

	public ActionForward findForward(String name) {
		return null;
	}

	public ActionForward newForward(String path) {
		return null;
	}

	public ActionForward newForward(String path, boolean redirect) {
		return null;
	}

	public PrintWriter getResponseWriter() throws IOException {
		return getResponse().getWriter();
	}

	public void setResponseContentType(String contentType) {
		//do nothing
	}

}
