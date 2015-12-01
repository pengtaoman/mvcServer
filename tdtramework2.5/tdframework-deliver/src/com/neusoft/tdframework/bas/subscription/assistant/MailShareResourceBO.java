/*
 * Created on 2006-12-1
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.bas.subscription.assistant;

import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author zhangjn
 * 
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
public interface MailShareResourceBO {
    public boolean getIfShared(String sourceId) throws ServiceException;
}
