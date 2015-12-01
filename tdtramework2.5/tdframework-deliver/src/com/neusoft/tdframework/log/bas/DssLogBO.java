package com.neusoft.tdframework.log.bas;

import com.neusoft.tdframework.exception.ServiceException;

public interface DssLogBO{
    public abstract boolean checkTimeOut(String loginId)
            throws ServiceException;

    public void doLogout(String loginId) throws ServiceException;

    public String doVisit(String loginId, String employeeId, String menuId,
            String systemId, int logType) throws ServiceException;

    public void doEndVisit(String visitId) throws ServiceException;

    public String doLogin(String employeeId, String loginIp)
            throws ServiceException;
}
