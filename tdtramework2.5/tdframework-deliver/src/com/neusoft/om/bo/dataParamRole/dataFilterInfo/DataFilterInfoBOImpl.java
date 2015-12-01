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
 * ������ : DataFilter.java.java
 * ����  : 2007-8-15
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
     * ��ȡom_param_filter_info_t ����Ϣ
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
    //  ��ȡom_param_filter_info_t ���ܼ�¼��
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
    // ��ȡom_param_filter_info_t �Ľ����
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
     * ��ȡ����������OM_PARAM_FILTER_INFO_T
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
     * �������淽��
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
     * ��������Է���
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
     * ��������Է���
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
     * �޸ĳ�ʼ������
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
     * �޸ķ���
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
       * �޸ĺ����
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
     * ɾ������
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
