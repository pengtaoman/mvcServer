/**
 * 
 */
package com.neusoft.om.bo.dataParamRole.dataSourceInfo;

import java.util.HashMap;
import java.util.List;

import com.neusoft.om.dao.dataParamRole.DataSourceInfoVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/***************************************************************
 * ������ : 
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
/**
 * @author wbsuncg
 *
 */
public interface DataSourceInfoBO extends BaseBO{

    
    public static final String BEAN = "dataFilterBO";
    /**
     * ��ȡom_param_table_desc_t ����Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getTables() throws ServiceException;
    /**
     * ����������ѯOM_DATA_FILTER_T�����������
     * @param tableId
     * @param tableDesc
     * @param showNewData
     * @return
     * @throws ServiceException
     */
    public int getRowCount(String tableId,String tableDesc, String showNewData)throws ServiceException;
    
    /**
     *  ����������ѯOM_DATA_FILTER_T�����
     * @param tableId
     * @param tableDesc
     * @param showNewData
     * @param beginNum
     * @param endNum
     * @return
     * @throws ServiceException
     */
    public List getInfoColl(String tableId,String tableDesc,String showNewData,int beginNum,int endNum)throws ServiceException;
    /**
     * ���ݱ��� ��ȡ �����к������͵Ľ����
     * @param 
     * @return
     */
    public List getColsInfoColl(String tableName)throws ServiceException;
    /**
     * //���ݱ�����ѯ�ñ����е��ܼ�¼��
     * @param 
     * @return
     */
    public int getColsCount(String tableName) throws ServiceException;
    /**
     * ��ȡ����������OM_PARAM_FILTER_INFO_T
     * @param 
     * @return
     */
    public ParamObjectCollection getFilter() throws ServiceException;

    /**
     * �� om_param_table_desc_t ����������
     * @param tableName
     * @param tableDesc
     * @param showNewData
     * @return
     * @throws ServiceException
     */
    public String doSaveDesc(String tableName,String tableDesc,String showNewData) throws ServiceException;
    /**
     * �������淽��
     * @param 
     * @return
     */
    public String doSave(String values []) throws ServiceException;
    /**
     * ������������
     * @param 
     * @return
     */
    public int getRowCountBack()throws ServiceException;
    
    /**
     * ������������
     * @param 
     * @return
     */
    public List getInfoCollBack(int beginNum,int endNum)throws ServiceException;
    /**
     * ɾ������
     * @param 
     * @return
     */
    public String doDelete(String values []) throws ServiceException;
    /**
     * ��ȡ����ϸ��Ϣ�����޸� ʱ��ʾ����
     * @param 
     * @return
     */
    public DataSourceInfoVO modiInit(String tableId,String columnInfo ) throws ServiceException;
    /**
     * �޸ķ���
     * @param 
     * @return
     */
    public String modify(HashMap map) throws ServiceException ;
    /**
     * ��ѯOM_PARAM_TABLE_INFO_T �ܼ�¼�� �޸Ļ���
     * @param 
     * @return
     */
    public int getRowCountL(HashMap map) throws ServiceException ;
    /**
     * ��ѯOM_PARAM_TABLE_INFO_T �ܼ�¼ �޸Ļ���
     * @param 
     * @return
     */
    public List getInfoCollL(HashMap map) throws ServiceException ;

}


