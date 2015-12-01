/*
 * Created on 2005-1-8
 *
 * ͨ����ʵ���ļ�����
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
 * ͨ�����ķ�ʽʵ��
 * 
 */
public abstract class InputStreamDownloadAction extends DownloadAction{
	
	/**
	 * ���ش���
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
	 * ��ȡDownloadBO��ʵ����
	 * @return
	 */
	protected abstract DownloadBO getDownloadBO();
	
	/**
	 * ��ȡ��������Ķ�����ΪBOִ��ʱ���˵Ĳ�����Ϣ, ����Ϣ����ΪDAOִ�еĲ�ѯ����
	 * @param request
	 * @return
	 */
	protected abstract Object getRequestObject(HttpServletRequest request);
	
}
