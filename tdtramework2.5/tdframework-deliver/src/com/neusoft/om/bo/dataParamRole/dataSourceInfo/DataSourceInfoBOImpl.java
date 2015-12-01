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
 * ������ : DataFilter.java.java
 * ����  : 2007-8-11
 * ����  : sunchonggui@neusoft.com
 * ģ��  : 
 * ����  : 
 * ��ע  : 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���  ����  �޸���   �޸�ԭ��
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
     * ��ȡom_param_table_desc_t ����Ϣ
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
     * ��ȡOM_PARAM_TABLE_INFO_T ���ܼ�¼��
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
    // ��ȡOM_PARAM_TABLE_INFO_T �Ľ����
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
//  ���ݱ��� ��ȡ���������м������� �Ľ�������ܼ�¼��
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
    // ���ݱ��� ��ȡ���������м������� �Ľ����
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
     * ��ȡ����������OM_PARAM_FILTER_INFO_T
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
     * �������淽��
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
     * �� om_param_table_desc_t ����������
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
     * ������������
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
     * ������������
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
     * ɾ������
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
     * ��ȡ����ϸ��Ϣ�����޸� ʱ��ʾ����
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
     * �޸ķ���
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
       * ��ѯOM_PARAM_TABLE_INFO_T �ܼ�¼�� �޸Ļ���
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
       * ��ѯOM_PARAM_TABLE_INFO_T �ܼ�¼ �޸Ļ���
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
