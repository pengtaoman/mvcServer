/*
 * Created on 2004-12-20
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.authorization;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author chenzt
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class ThirdPartyAuthorizeBO {
	public static final String BEAN="thirdPartyAuthorize";
	private List thirdPartyAuthorize = null;
	
	/**
	 * @return
	 */
	public List getThirdPartyAuthorize() {
		return thirdPartyAuthorize;
	}

	/**
	 * @param list
	 */
	public void setThirdPartyAuthorize(List list) {
		thirdPartyAuthorize = list;
	}
	
	/**
	 * 第三方认证
	 * @throws ServiceException
	 */
	public boolean authorize(HttpServletRequest request) throws ServiceException{
		if (thirdPartyAuthorize==null) return true;
		
		boolean result = true;
		
		String errMsg = null;
		
		for(int i=0;i<thirdPartyAuthorize.size();i++) { 
			ThirdPartyAuthorize thirdAuthorize = (ThirdPartyAuthorize)thirdPartyAuthorize.get(i);
			try {
				if(!thirdAuthorize.authorize(request))
					result = false;
			} catch (ServiceException e) {
				e.printStackTrace();
				errMsg = errMsg + "\n" + thirdAuthorize.getClass().getName() + ":" + e.getMessage();
			}
		}
		
		if(errMsg!=null) throw new ServiceException(errMsg); 
		
		return result;
	}
}
