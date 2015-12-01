package com.neusoft.om.bo.dataParamRole.dataFilterInfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.neusoft.om.dao.dataParamRole.DataFilterInfoDAO;
import com.neusoft.om.dao.dataParamRole.DataFilterInfoVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
/***************************************************************
 * 程序名 : DataFilter.java.java
 * 日期  : 2007-8-15
 * 作者  : sunchonggui@neusoft.com
 * 模块  : 
 * 描述  : 
 * 备注  : 
 * ------------------------------------------------------------
 * 修改历史
 * 序号  日期  修改人   修改原因
 * 1
 * 2
 ***************************************************************/
public class DataFilterInfoBOImpl implements DataFilterInfoBO{

    private DataFilterInfoDAO dataFilterInfoDAO;
    
    
/**
     * @return Returns the dataFilterInfoDAO.
     */
    public DataFilterInfoDAO getDataFilterInfoDAO() {
        return dataFilterInfoDAO;
    }
    /**
     * @param dataFilterInfoDAO The dataFilterInfoDAO to set.
     */
    public void setDataFilterInfoDAO(DataFilterInfoDAO dataFilterInfoDAO) {
        this.dataFilterInfoDAO = dataFilterInfoDAO;
    }
    
    /**
     * 获取om_param_filter_info_t 中信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilters() throws ServiceException{
        
        ParamObjectCollection tableColl=null;
        try{
            tableColl=dataFilterInfoDAO.getFilters();
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--getFilters()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        return tableColl;
    }
    //  获取om_param_filter_info_t 的总记录数
    public int getRowCount(String filterInfo, String filterDesc) throws ServiceException {
        int allRows = 0;
        try{
            allRows = dataFilterInfoDAO.getRowCount(filterInfo,filterDesc);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--getRowCount()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return allRows;
    }
    // 获取om_param_filter_info_t 的结果集
    public List getInfoColl(String filterInfo, String filterDesc,int beginNum,int endNum) throws ServiceException {
        List list = new ArrayList();
        try{
            list = dataFilterInfoDAO.getInfoColl(filterInfo,filterDesc,beginNum,endNum);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOIMPL--getInfoColl()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return list;
    }
    /**
     * 获取关联过滤器OM_PARAM_FILTER_INFO_T
     * @param 
     * @return
     */
    public ParamObjectCollection getColumn(String tableName) throws ServiceException{
        ParamObjectCollection filterColl=null;
        try{
            filterColl=dataFilterInfoDAO.getColumn(tableName);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--getColumn()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        return filterColl;
    }
    /**
     * 新增保存方法
     * @param 
     * @return
     */
    public String doSave(HashMap map) throws ServiceException{
        String message="";
        try{
            message=dataFilterInfoDAO.doSave(map);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--doSave()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        return message;
    }
    /**
     * 新增后回显方法
     * @param 
     * @return
     */
    public int getRowCountBack() throws ServiceException{
        int allRows = 0;
        try{
            allRows = dataFilterInfoDAO.getRowCountBack();
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--getRowCountBack()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return allRows;
    }
    /**
     * 新增后回显方法
     * @param 
     * @return
     */
    public List getInfoCollBack(int beginNum, int endNum) throws ServiceException {
        List list = new ArrayList();
        try{
            list = dataFilterInfoDAO.getInfoCollBack(beginNum,endNum);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOIMPL--getInfoCollBack()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return list;
        
    }
    /**
     * 修改初始化方法
     * 
     * @param
     * @return
     */
    public DataFilterInfoVO modifyInit(String filterId) throws ServiceException{
        DataFilterInfoVO vo=null;
        try{
            vo=dataFilterInfoDAO.modifyInit(filterId);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--modifyInit()-1:"+e.getMessage());
            throw new ServiceException(e);
         }
        return vo;
    } 
    /**
     * 修改方法
     * @param 
     * @return
     */
      public String modify(HashMap map) throws ServiceException {
          String message="";
          try{
              message=dataFilterInfoDAO.modify(map);
          }catch(DataAccessException e){
              SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--modify()-1:"+e.getMessage());
             throw new ServiceException(e);
          }
          return message;
          
      }
      /**
       * 修改后回显
       * @param 
       * @return
       */
      public List getInfoCollBack(int filterId)throws ServiceException{
          List list = new ArrayList();
          
          try{
              list = dataFilterInfoDAO.getInfoCollBack(filterId);
          }catch (DataAccessException e) {
              SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOIMPL--getInfoCollBack()-1:"+e.getMessage());
              throw new ServiceException(e);
          }
          
          return list;
          
      }
  

    /**
     * 删除方法
     * @param 
     * @return
     */
    public String doDelete(String values []) throws ServiceException{
        String message="";
        try{
            message=dataFilterInfoDAO.doDelete(values);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--doDelete()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        return message;
    }

}
