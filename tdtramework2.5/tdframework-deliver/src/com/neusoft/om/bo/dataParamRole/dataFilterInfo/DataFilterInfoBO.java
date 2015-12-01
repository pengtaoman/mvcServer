/**
 * 
 */
package com.neusoft.om.bo.dataParamRole.dataFilterInfo;

import java.util.HashMap;
import java.util.List;

import com.neusoft.om.dao.dataParamRole.DataFilterInfoVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/***************************************************************
 * ������ : 
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
/**
 * @author wbsuncg
 *
 */
public interface DataFilterInfoBO extends BaseBO{
   
    public static final String BEAN = "dataFilterBO";
    /**
     * ��ȡom_param_filter_info_t ����Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getFilters() throws ServiceException;
    /**
     * ����������ѯOM_DATA_FILTER_T�����������
     * @param 
     * @return
     */
    public int getRowCount(String tableId,String tableDesc)throws ServiceException;
    /**
     * ����������ѯOM_DATA_FILTER_T�����
     * @param 
     * @return
     */
    public List getInfoColl(String tableId,String tableDesc,int beginNum,int endNum)throws ServiceException;
    /**
     * ��ȡ����������OM_PARAM_FILTER_INFO_T
     * @param 
     * @return
     */
    public ParamObjectCollection getColumn(String tableName) throws ServiceException;
    /**
     * �������淽��
     * @param 
     * @return
     */
    public String doSave(HashMap map) throws ServiceException;
    /**
     * ��������Է���
     * @param 
     * @return
     */
    public int getRowCountBack() throws ServiceException ;
    /**
     * ��������Է���
     * @param 
     * @return
     */
    public List getInfoCollBack(int beginNum, int endNum) throws ServiceException ;
    /**
     * �޸ĺ����
     * @param 
     * @return
     */
    public List getInfoCollBack(int filterId)throws ServiceException;   
    /**
     * ɾ������
     * @param 
     * @return
     */
    public String doDelete(String values []) throws ServiceException;
    /**
     * �޸ĳ�ʼ������
     * 
     * @param
     * @return
     */
    public DataFilterInfoVO modifyInit(String filterId) throws ServiceException;
    /**
     * �޸ķ���
     * @param 
     * @return
     */
    public String modify(HashMap map) throws ServiceException ;
}


