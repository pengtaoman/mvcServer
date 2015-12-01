package com.neusoft.om.dao.system;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import java.util.List;

public abstract interface SystemDAO extends BaseDao
{
  public static final String BEAN = "systemDAO";

  public abstract SystemVO getSystemInfoById(String paramString)
    throws DataAccessException;

  public abstract SystemColl getAllSystemInfo()
    throws DataAccessException;

  public abstract SystemColl getSystemInfoByEmployeeId(String paramString)
    throws DataAccessException;

  public abstract SystemColl getAdminSystemInfoByEmployeeId(String paramString)
    throws DataAccessException;

  public abstract SystemColl getSystemInfoWeb()
    throws DataAccessException;

  public abstract int doAddSystemInfo(SystemVO paramSystemVO)
    throws DataAccessException;

  public abstract int doModifySystemInfo(SystemVO paramSystemVO)
    throws DataAccessException;

  public abstract int doDeleteSystemInfo(String paramString)
    throws DataAccessException;

  public abstract SystemColl getSystemInfoByEmpId(String paramString)
    throws DataAccessException;

  public abstract SystemColl getSystemCollByRole(int paramInt)
    throws DataAccessException;

  public abstract SystemColl getSystemCollInfo(String paramString)
    throws DataAccessException;

  public abstract SystemColl getSystemCollByMenu(String paramString)
    throws DataAccessException;

  public abstract SystemColl getParentSystem()
    throws DataAccessException;

  public abstract SystemColl getFirstLevelSysCollByRole(int paramInt)
    throws DataAccessException;

  public abstract SystemColl getChildSystemCollInfo(String paramString)
    throws DataAccessException;

  public abstract SystemColl getFirstLevelSystemCollByEmpId(String paramString)
    throws DataAccessException;

  public abstract List getSystemIdListByMenuList(List paramList)
    throws DataAccessException;

  public abstract List getParentSystemIdList(List paramList)
    throws DataAccessException;

  public abstract SystemColl getSystemCollBySystemIdList(List paramList)
    throws DataAccessException;

  public abstract List queryAllBillSystem()
    throws DataAccessException;
}