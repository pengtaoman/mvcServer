package com.neusoft.om.dao.dataParamRole;

import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

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
public interface DataFilterInfoDAO extends BaseDao{
    
    public static final String BEAN = "dataFilterDAO";
    
    /**
     * ��ȡom_param_filter_info_t ����Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getFilters() throws DataAccessException;
    /**
     * ����������ѯBb_Account_Info_T�����������
     * @param 
     * @return
     */
    public int getRowCount(String tableId, String tableDesc) throws DataAccessException;
    /**
     * ����������ѯOM_DATA_FILTER_T�����
     * @param 
     * @return
     */
    public List getInfoColl(String tableId, String tableDesc, int beginNum, int endNum) throws DataAccessException;
    /**
     * ��ȡ�����
     * @param 
     * @return
     */
    public ParamObjectCollection getColumn(String tableName) throws DataAccessException;
    /**
     * �������淽��
     * @param 
     * @return
     */
    public String doSave(HashMap map) throws DataAccessException;
    /**
     * ��������Է���
     * @param 
     * @return
     */
    public int getRowCountBack() throws DataAccessException ;
    /**
     * ��������Է���
     * @param 
     * @return
     */
    public List getInfoCollBack(int beginNum, int endNum) throws DataAccessException ;
    /**
     * �޸ĺ����
     * @param 
     * @return
     */
    public List getInfoCollBack(int filterId) throws DataAccessException;
    /**
     * ɾ������
     * @param 
     * @return
     */
    public String doDelete(String values[]) throws DataAccessException;
    
    /**
     * �޸ķ���
     * 
     * @param
     * @return
     */
    public DataFilterInfoVO modifyInit(String filterId) throws DataAccessException ;
    /**
     * �޸ķ���
     * @param 
     * @return
     */
    public String modify(HashMap map) throws DataAccessException;    
     
}
