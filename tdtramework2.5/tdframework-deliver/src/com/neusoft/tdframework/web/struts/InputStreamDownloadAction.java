/*
 * Created on 2005-1-8
 *
 * 通过流实现文件下载
 * 
 */
package com.neusoft.tdframework.web.struts;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author chenzt
 *
 * 通过流的方式实现
 * 
 */
public abstract class InputStreamDownloadAction extends DownloadAction{
	
	/**
	 * 下载处理
	 * @param request
	 * @param response
	 * @param file
	 * @throws ServiceException
	 */
	public void processDownload(HttpServletRequest request,HttpServletResponse response,File file) throws ServiceException{
		DownloadBO downloadBO = getDownloadBO();
		Object obj = getRequestObject(request);
		
		DownloadInputStreamReader reader = new DownloadInputStreamReader(file,response,ifSaveFile());
		
		downloadBO.download(obj,reader);
	}
	
	/**
	 * 获取DownloadBO的实现类
	 * @return
	 */
	protected abstract DownloadBO getDownloadBO();
	
	/**
	 * 获取请求参数的对象，作为BO执行时传人的参数信息, 该信息将作为DAO执行的查询条件
	 * @param request
	 * @return
	 */
	protected abstract Object getRequestObject(HttpServletRequest request);
	
}
