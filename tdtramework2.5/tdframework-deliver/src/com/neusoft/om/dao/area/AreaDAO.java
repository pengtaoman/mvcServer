package com.neusoft.om.dao.area;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import java.util.Map;
import java.util.Vector;

public abstract interface AreaDAO extends BaseDao
{
  public static final String BEAN = "areaDAO";

  public abstract AreaVO getAreaById(String paramString)
    throws DataAccessException;

  public abstract AreaColl getAreaAllInfo()
    throws DataAccessException;

  public abstract AreaColl getAreaAllInfo(String paramString)
    throws DataAccessException;

  public abstract AreaColl getAreaInfoByOrgan(String paramString)
    throws DataAccessException;

  public abstract AreaColl getAreaChildColl(String paramString)
    throws DataAccessException;

  public abstract int getAreaLevelByAreaId(String paramString)
    throws DataAccessException;

  public abstract String getAreaNameByAreaId(String paramString)
    throws DataAccessException;

  public abstract int doAddAreaInfo(AreaVO paramAreaVO)
    throws DataAccessException;

  public abstract String addAreaInfo(AreaVO paramAreaVO)
    throws DataAccessException;

  public abstract int doModifyAreaInfo(AreaVO paramAreaVO)
    throws DataAccessException;

  public abstract int modifyAreaInfo(AreaVO paramAreaVO)
    throws DataAccessException;

  public abstract int doDeleteAreaInfo(String paramString)
    throws DataAccessException;

  public abstract AreaColl getAreaInnerTree()
    throws DataAccessException;

  public abstract AreaVO getAreaByCityCode(String paramString)
    throws DataAccessException;

  public abstract AreaColl getAreaByLevel(int paramInt1, int paramInt2)
    throws DataAccessException;

  public abstract AreaColl getAreaCollByAuthAreaId(String paramString)
    throws DataAccessException;

  public abstract AreaColl getAreaColl(Map paramMap)
    throws DataAccessException;

  public abstract int getAreaRowCount(Map paramMap)
    throws DataAccessException;

  public abstract AreaColl getAreaCollInfo(Map paramMap)
    throws DataAccessException;

  public abstract String getMaxAreaId(String paramString)
    throws DataAccessException;

  public abstract String getFirseAreaInfo(int paramInt)
    throws DataAccessException;

  public abstract Vector getAllAreaInfo(String paramString, int paramInt)
    throws DataAccessException;

  public abstract ParamObjectCollection getAreaLevelByParent(String paramString)
    throws DataAccessException;

  public abstract ParamObjectCollection getAreaLevelById(String paramString)
    throws DataAccessException;

  public abstract ParamObjectCollection getAreaCollByEmp(String paramString)
    throws DataAccessException;

  public abstract AreaColl getCountryColl(String paramString)
    throws DataAccessException;

  public abstract Vector getAreaVec(String paramString, int paramInt)
    throws DataAccessException;

  public abstract Map getAllCityColl()
    throws DataAccessException;

  public abstract Map getCityMap()
    throws DataAccessException;

  public abstract String getCityCode(String paramString)
    throws DataAccessException;

  public abstract String getProvinceId()
    throws DataAccessException;

  public abstract AreaColl getAllCity()
    throws DataAccessException;
}