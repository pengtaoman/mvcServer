/*
 * <p>Title:       为融合4.5业务而增加的得到session数据接口</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.tdframework.authorization;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

public interface AuthBOExt extends BaseBO
{
    /**
     * BEAN 配置在框架：config/applicationContext.xml中 <b>
     * bean_id = authorizeExtFacade
     */
    public static final String BEAN = "authorizeExtFacade";
    
    /**
     * 根据工号得到session需要的信息
     * @param workNo
     * @param workPwd
     * @return
     * @throws ServiceException
     */
    public AuthVOExt getAuthorizeInfo(String workNo) throws ServiceException;
}
