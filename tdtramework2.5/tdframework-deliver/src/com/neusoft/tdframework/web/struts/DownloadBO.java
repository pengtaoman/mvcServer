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
 * ʵ�����ص�BO�ӿ� 
 */
public interface DownloadBO {
	/**
	 * ʵ���ļ����ع��ܡ�
	 * �����ͬ��BO��Ҫʵ�ֶ����ļ������أ���ҪrequestObject�����ò�ͬ�Ĳ������ò�ͬ��DAO��
	 * ������ʵ�ֵ� BO ע������ҵ���BO ��
	 * @param requestObject
	 * @param listener
	 * @throws ServiceException
	 */
	public void download(Object requestObject,DownloadInputStreamReader reader) throws ServiceException;
}
