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
 * ��������֤�ӿڣ���ʵ��authorize�ӿڡ���ǰ�ýӿ�Ӧ�����ҳ��ģ��ʵ��
 * ��session��д���ҵ��ģ����Ҫ��������Ϣ��Ϊ�˱�֤��session����Ϣ���Ʋ��ظ���
 * ����ʵ�����session����ȡ���ֵ�ʱ��ע��Ψһ�ԡ�
 */
public interface ThirdPartyAuthorize {

	/**
	 * ��������֤�ӿڡ���
	 * ���׳����쳣����Ϣ������֤���
	 * @param request
	 * @return Ŀǰ���û������Լ�����÷���ֵΪ�Ժ����á�����ʹ�õ�ǰ�汾û������˵��
	 * ��ǰ����ʵ�����з���true��
	 * @throws ServiceException
	 * ���쳣������֤ͨ������Ϊalert��Ϣ��ʾ������Ա���������Ҫ֪ͨ����Ա�Ļ��벻���׳��쳣��Ϣ��
	 */
	public boolean authorize(HttpServletRequest request) throws ServiceException;
	
}
