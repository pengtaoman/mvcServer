package com.neusoft.om.dao.unlock;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public abstract interface UnlockDAO extends BaseDao
{
  public static final String BEAN = "unlockDAO";

  public abstract boolean getExistNo(String paramString)
    throws DataAccessException;

  public abstract String getAreaIdLock(String paramString)
    throws DataAccessException;
}