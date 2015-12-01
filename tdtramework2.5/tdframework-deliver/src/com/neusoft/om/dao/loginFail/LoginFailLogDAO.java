package com.neusoft.om.dao.loginFail;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import java.util.List;

public abstract interface LoginFailLogDAO extends BaseDao
{
  public static final String BEAN = "loginFailLogDAO";

  public abstract int getLogRowCount(LoginFailLogQueryVO paramLoginFailLogQueryVO)
    throws DataAccessException;

  public abstract List<LoginFailLogQueryVO> getLogList(LoginFailLogQueryVO paramLoginFailLogQueryVO, int paramInt1, int paramInt2)
    throws DataAccessException;
}