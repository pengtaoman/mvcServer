package com.neusoft.om.dao.dataParamRole;

import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/***************************************************************
 * ������ : DataFilterDAO.java.java
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
public interface DataSourceInfoDAO extends BaseDao{
    
    public static final String BEAN = "dataFilterDAO";
    
    /**
     * ��ȡom_param_table_desc_t ����Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getTables() throws DataAccessException;
   
    /**
     * ����������ѯBb_Account_Info_T�����������
     * @param tableId
     * @param tableDesc
     * @param showNewData
     * @return
     * @throws DataAccessException
     */
    public int getRowCount(String tableId,String tableDesc,String showNewData) throws DataAccessException;
   
    /**
     * ����������ѯOM_DATA_FILTER_T�����
     * @param tableId
     * @param tableDesc
     * @param showNewData
     * @param beginNum
     * @param endNum
     * @return
     * @throws DataAccessException
     */
    public List getInfoColl(String tableId,String tableDesc,String showNewData,int beginNum,int endNum) throws DataAccessException;
    
    /**
     * //���ݱ�����ѯ�ñ����е��ܼ�¼��
     * @param 
     * @return
     */
    public int getColsCount(String tableName) throws DataAccessException;
    /**
     * ���ݱ�����ȡ�����ֶκ��������� �����
     * @param 
     * @return
     */
    public List getColsInfoColl(String table) throws DataAccessException; 
    /**
     * ��ȡ����������OM_PARAM_FILTER_INFO_T
     * @param 
     * @return
     */
    public ParamObjectCollection getFilter() throws DataAccessException;
    
    /**
     *  �� om_param_table_desc_t ����������
     * @param tableName
     * @param tableDesc
     * @param showNewData
     * @return
     * @throws DataAccessException
     */
    public String doSaveDesc(String tableName,String tableDesc,String showNewData) throws DataAccessException;
    /**
     * �������淽��
     * @param 
     * @return
     */
    public String doSave(String values []) throws DataAccessException;
    /**
     * //���������
     * @param 
     * @return
     */
    public int getRowCountBack() throws DataAccessException ;
    /**
     * //���������
     * @param 
     * @return
     */
    public List getInfoCollBack( int beginNum, int endNum)throws DataAccessException ;
    /**
     * ɾ������
     * @param 
     * @return
     */
    public String doDelete(String values []) throws DataAccessException;
    
    /**
     * ��ȡ����ϸ��Ϣ�����޸� ʱ��ʾ����
     * @param 
     * @return
     */
    public DataSourceInfoVO modiInit(String tableId,String columnInfo ) throws DataAccessException;
    /**
     * �޸ķ���
     * @param 
     * @return
     */
      public String modify(HashMap map) throws DataAccessException ;    
      /**
       * ��ѯOM_PARAM_TABLE_INFO_T �ܼ�¼�� �޸Ļ���
       * @param 
       * @return
       */
      public int getRowCountL(HashMap map) throws DataAccessException ;
      /**
       * ��ѯOM_PARAM_TABLE_INFO_T �ܼ�¼ �޸Ļ���
       * @param 
       * @return
       */
      public List getInfoCollL(HashMap map) throws DataAccessException ;
}
