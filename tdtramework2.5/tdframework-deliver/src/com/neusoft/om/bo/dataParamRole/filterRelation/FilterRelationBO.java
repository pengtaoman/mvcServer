/**
 * 
 */
package com.neusoft.om.bo.dataParamRole.filterRelation;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.neusoft.om.dao.dataParamRole.DataSourceInfoVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/***************************************************************
 * ������ : 
 * ����  : 2007-8-11
 * ����  : yanglm@neusoft.com
 * ģ��  : 
 * ����  : 
 * ��ע  : 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���  ����  �޸���   �޸�ԭ��
 * 1
 * 2
 ***************************************************************/
public interface FilterRelationBO extends BaseBO{

    
    public static final String BEAN = "filterRelationBO";
    /**
     * ��ȡ���������˹���������������Դ����Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterTables() throws ServiceException;
    /**
     * ��������Դ���ʶ��ȡ����Դ������
     * @param 
     * @return
     */
    public String getTableDescById(String tableId) throws ServiceException;
    /**
     * ��������Դ���ʶ��ȡ��������Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterCollById(String tableId) throws ServiceException;
    /**
     * �ֲ�ˢ�£���ȡ������������
     * @param 
     * @return
     */
    public ParamObjectCollection getPassiveSelect(String tableId,HashMap dataMap,
    		HttpSession session) throws ServiceException;
    /**
     * ��������Դ���ʶ�������������򣬻�ȡ������������Ϣ
     * @param 
     * @return
     */
    public List getFilterRelList(String tableId) throws ServiceException;
    /**
     * ��������Դ���ʶ�������������򣬻�ȡ������������Ϣ
     * @param 
     * @return
     */
    public List getPassiveFilter(String tableId,String mainColumn,String operType) 
    	throws ServiceException;
    /**
     * ��������Դ���ʶ�����������ֶκͱ�����������ʶ��ɾ����������ϵ������Ϣ
     * @param 
     * @return
     */
    public String deleteFilterRel(String[] values) throws ServiceException;
    /**
     * ��������Դ���ʶ�����������ֶκͱ�����������ʶ��ɾ����������ϵ������Ϣ
     * @param 
     * @return
     */
    public String addFilterRel(String[] values,String tableId,String mainColumn,
    	String operType) throws ServiceException;
    
    
}


