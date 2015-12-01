/*
 * Created on 2004-12-16
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.authorization;

import javax.servlet.http.HttpServletRequest;
import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author chenzt
 *
 * 第三方认证接口，请实现authorize接口。当前该接口应用与各页面模块实现
 * 在session中写入各业务模块需要的特殊信息。为了保证不session的信息名称不重复，
 * 请在实现类的session变量取名字的时候注意唯一性。
 */
public interface ThirdPartyAuthorize {

	/**
	 * 第三方认证接口。。
	 * 但抛出的异常的信息将在认证完成
	 * @param request
	 * @return 目前框架没有特殊约定，该返回值为以后处理用。请在使用当前版本没有特殊说明
	 * 以前请在实现类中返回true。
	 * @throws ServiceException
	 * 该异常请在认证通过后，作为alert信息显示给操作员，如果不需要通知操作员的话请不用抛出异常信息。
	 */
	public boolean authorize(HttpServletRequest request) throws ServiceException;
	
}
