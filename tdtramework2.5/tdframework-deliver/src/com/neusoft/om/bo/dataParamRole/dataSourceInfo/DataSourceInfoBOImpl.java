package com.neusoft.om.bo.dataParamRole.dataSourceInfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.neusoft.om.dao.dataParamRole.DataSourceInfoDAO;
import com.neusoft.om.dao.dataParamRole.DataSourceInfoVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/***************************************************************
 * 程序名 : DataFilter.java.java
 * 日期  : 2007-8-11
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
public class DataSourceInfoBOImpl implements DataSourceInfoBO{

    private DataSourceInfoDAO dataSourceInfoDAO;
    
    /**
     * @return Returns the dataSourceInfoDAO.
     */
    public DataSourceInfoDAO getDataSourceInfoDAO() {
        return dataSourceInfoDAO;
    }

    /**
     * @param dataSourceInfoDAO The dataSourceInfoDAO to set.
     */
    public void setDataSourceInfoDAO(DataSourceInfoDAO dataSourceInfoDAO) {
        this.dataSourceInfoDAO = dataSourceInfoDAO;
    }
    /**
     * 获取om_param_table_desc_t 中信息
     * @param 
     * @return
     */
    public ParamObjectCollection getTables() throws ServiceException{
        ParamObjectCollection tableColl=null;
        
        try{
            tableColl=dataSourceInfoDAO.getTables();
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--getTables()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        
        return tableColl;
    }
    /**
     * 获取OM_PARAM_TABLE_INFO_T 的总记录数
     * @param 
     * @return
     */
    public int getRowCount(String filterKey, String tableName, String showNewData) throws ServiceException {
        int allRows = 0;
        try{
            allRows = dataSourceInfoDAO.getRowCount(filterKey,tableName,showNewData);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--getRowCount()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return allRows;
    }
    // 获取OM_PARAM_TABLE_INFO_T 的结果集
    public List getInfoColl(String filterKey, String tableName,String showNewData, int beginNum,int endNum) throws ServiceException {
        List list = new ArrayList();
        
        try{
            list = dataSourceInfoDAO.getInfoColl(filterKey,tableName,showNewData,beginNum,endNum);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOIMPL--getInfoColl()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        
        return list;
    }
//  根据表名 获取表内所有列及列类型 的结果集的总记录数
    public int getColsCount(String tableName) throws ServiceException {
        int allRows = 0;
        try{
            allRows = dataSourceInfoDAO.getColsCount(tableName);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--getColsCount()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return allRows;
    }
    // 根据表名 获取表内所有列及列类型 的结果集
    public List getColsInfoColl(String tableName) throws ServiceException {
        List list = new ArrayList();
        try{
            list = dataSourceInfoDAO.getColsInfoColl(tableName);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOIMPL--getColsInfoColl()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return list;
    }
    /**
     * 获取关联过滤器OM_PARAM_FILTER_INFO_T
     * @param 
     * @return
     */
    public ParamObjectCollection getFilter() throws ServiceException{
        ParamObjectCollection filterColl=null;
        try{
            filterColl=dataSourceInfoDAO.getFilter();
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--getFilterName()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        return filterColl;
    }
    /**
     * 新增保存方法
     * @param 
     * @return
     */
    public String doSave(String values []) throws ServiceException{
        String message="";
        try{
            message=dataSourceInfoDAO.doSave(values);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--doSave()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        return message;
    }
    
    /**
     * 向 om_param_table_desc_t 中增加数据
     */
    public String doSaveDesc(String tableName,String tableDesc,String showNewData) throws ServiceException{
        String message="";
        try{
            message=dataSourceInfoDAO.doSaveDesc(tableName,tableDesc,showNewData);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--doSave()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        return message;
    }
    /**
     * 新增保存后回显
     * @param 
     * @return
     */
    public int getRowCountBack()throws ServiceException{
        int allRows = 0;
        try{
            allRows = dataSourceInfoDAO.getRowCountBack();
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--getRowCountBack()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return allRows;
    }
    /**
     * 新增保存后回显
     * @param 
     * @return
     */
    public List getInfoCollBack(int beginNum,int endNum)throws ServiceException{
        List list = new ArrayList();
        try{
            list = dataSourceInfoDAO.getInfoCollBack(beginNum,endNum);
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
            message=dataSourceInfoDAO.doDelete(values);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--doDelete()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        return message;
    }
    /**
     * 获取到详细信息用于修改 时显示数据
     * @param 
     * @return
     */
    public DataSourceInfoVO modiInit(String tableId,String columnInfo ) throws ServiceException{
        DataSourceInfoVO vo = null;
        try{
            vo=dataSourceInfoDAO.modiInit(tableId,columnInfo);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--modiInit()-1:"+e.getMessage());
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
              message=dataSourceInfoDAO.modify(map);
          }catch(DataAccessException e){
              SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--modify()-1:"+e.getMessage());
             throw new ServiceException(e);
          }
          return message;
          
      }
      /**
       * 查询OM_PARAM_TABLE_INFO_T 总记录数 修改回显
       * @param 
       * @return
       */
      public int getRowCountL(HashMap map) throws ServiceException{
          int allRows = 0;
          try{
              allRows = dataSourceInfoDAO.getRowCountL(map);
          }catch (DataAccessException e) {
              SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOImpl--getRowCount()-1:"+e.getMessage());
              throw new ServiceException(e);
          }
          return allRows;
          
      } 
      /**
       * 查询OM_PARAM_TABLE_INFO_T 总记录 修改回显
       * @param 
       * @return
       */
      public List getInfoCollL(HashMap map) throws ServiceException {
          List list = new ArrayList();
          
          try{
              list = dataSourceInfoDAO.getInfoCollL(map);
          }catch (DataAccessException e) {
              SysLog.writeLogs("om",GlobalParameters.ERROR,"DataSourceInfoBOIMPL--getInfoColl()-1:"+e.getMessage());
              throw new ServiceException(e);
          }
          return list;
      }
      
}
