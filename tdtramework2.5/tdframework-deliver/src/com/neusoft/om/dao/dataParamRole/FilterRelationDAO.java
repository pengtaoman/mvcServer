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
public interface FilterRelationDAO extends BaseDao{
    
    public static final String BEAN = "filterRelationDAO";
    
    /**
     * ��ȡ���������˹���������������Դ����Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterTables() throws DataAccessException;
    /**
     * ��������Դ���ʶ��ȡ����Դ������
     * @param 
     * @return
     */
    public String getTableDescById(int tableId) throws DataAccessException;
    /**
     * ��������Դ���ʶ��ȡ��������Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterCollById(int tableId) throws DataAccessException;
    /**
     * ��������Դ���ʶ����ȡ�������������ϵ��Ϣ
     * @param 
     * @return
     */
    public List getFilterRelList(int tableId) throws DataAccessException;
    /**
     * ��������Դ���ʶ�������������򣬻�ȡ������������Ϣ
     * @param 
     * @return
     */
    public List getPassiveFilter(int tableId,String mainColumn,String operType) 
    	throws DataAccessException;
    /**
     * ���ݹ����������ͱ��������ֶ����ͣ���ȡ��Ӧ�ı����������ֶ���Ϣ����
     * @param 
     * @return
     */
    public List getFilterColumn(List filterInfo) throws DataAccessException;
    /**
     *  ��ȡ�ñ��Ӧ�Ĺ�������Ϣ
     * @param
     * @return
     */
    public HashMap getPassiveSelectInfo(int tableId,String column_info,
    	String[] mainValues) throws DataAccessException;
    /**
     * ���ݹ�����SQL��ȡ��������Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterInfoColl(String sql) 
		throws DataAccessException;
    /**
     * ��������Դ���ʶ�����������ֶκͱ�����������ʶ��ɾ����������ϵ������Ϣ
     * @param 
     * @return
     */
    public int deleteFilterRel(List values) throws DataAccessException;
    /**
     * ��������Դ���ʶ�����������ֶκͱ�����������ʶ��ɾ����������ϵ������Ϣ
     * @param 
     * @return
     */
    public int addFilterRel(List values,int tableId,String mainColumn,
    	String operType) throws DataAccessException;

      
}
