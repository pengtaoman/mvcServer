/*
 * <p>Title:       Ϊ�ں�4.5ҵ������ӵĵõ�session���ݽӿ�</p>
 * <p>Description: ����ϸ��˵��</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
 */
package com.neusoft.tdframework.authorization;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

public interface AuthBOExt extends BaseBO
{
    /**
     * BEAN �����ڿ�ܣ�config/applicationContext.xml�� <b>
     * bean_id = authorizeExtFacade
     */
    public static final String BEAN = "authorizeExtFacade";
    
    /**
     * ���ݹ��ŵõ�session��Ҫ����Ϣ
     * @param workNo
     * @param workPwd
     * @return
     * @throws ServiceException
     */
    public AuthVOExt getAuthorizeInfo(String workNo) throws ServiceException;
}
