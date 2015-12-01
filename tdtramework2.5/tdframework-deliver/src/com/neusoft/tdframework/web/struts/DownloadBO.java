/*
 * Created on 2005-1-8
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.struts;

import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author chenzt
 *
 * 实现下载的BO接口 
 */
public interface DownloadBO {
	/**
	 * 实现文件下载功能。
	 * 如果相同的BO里要实现多种文件的下载，需要requestObject里设置不同的参数调用不同的DAO，
	 * 或者再实现的 BO 注册其它业务的BO 。
	 * @param requestObject
	 * @param listener
	 * @throws ServiceException
	 */
	public void download(Object requestObject,DownloadInputStreamReader reader) throws ServiceException;
}
