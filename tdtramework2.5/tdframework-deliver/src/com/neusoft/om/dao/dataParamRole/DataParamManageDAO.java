package com.neusoft.om.dao.dataParamRole;

import java.util.HashMap;
import java.util.List;

import com.neusoft.common.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface DataParamManageDAO extends BaseDao{
	public static final String BEAN = "dataParamManageDAO";
	/**
     * ���� ְԱ��ź�����Դ���� ��ȡְԱ����Ӧ�Ľ�ɫ��Ϣ
     * @author yanglm
     * @param 
     * @return
     */
    public String getParamRoleInfo(String employeeId,String tableName) 
    	throws DataAccessException;
     /**
     *  ��ȡ���˱���������ֵ
     * 
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getTable() 
    	throws DataAccessException ;
    /**  ��ȡ���˱���������ֵ
    * 
    * @param
    * @return
    */
   public com.neusoft.tdframework.common.data.ParamObjectCollection getTableByRole(String roleId) 
   	    throws DataAccessException ;
   /**
    *  ����ְԱ��Ż�ȡ���˱���������ֵ
    * 
    * @param
    * @return
    */
   public com.neusoft.tdframework.common.data.ParamObjectCollection getTableByEmployee(String employeeId) 
   	    throws DataAccessException;
   /**
    *  ��ȡ������Ϣ����
    * 
    * @param
    * @return
    */
   public String getParamTableDesc(String roleId,String tableId) 
   	    throws DataAccessException ;
   /**
    *  ����ְԱ��Ż�ȡ������Ϣ����
    * 
    * @param
    * @return
    */
   public String getPowerDescByEmployee(String employeeId,String tableId) 
   		throws DataAccessException ;
   /**
     * ��ȡ�ñ��Ӧ�Ĺ�������Ϣ
     * @author yanglm
     * @param
     * @return
     */
    public HashMap getFilters(String tableId) throws DataAccessException ;
    /**
     * ��ȡ������������onchangeʱ�䷽��
     * @author yanglm
     * @param
     * @return
     */
    public List getOnChangeMethod(int tableId,List ifPassiveFilter,
    	List filterTagName,String methodName) throws DataAccessException;
    /**
     *  ��ȡ��ѯ�����
     * 
     * @param
     * @return
     */
    public HashMap getInfoColl(String tableId,String roleId,HashMap paramMap,
    	int beginNum, int endNum) throws DataAccessException ;
    /**
     * Ȩ��΢����������ְԱ��ű�ʶ��ȡ��ѯ�����
     * 
     * @param
     * @return
     */
    public HashMap getDataCollByEmployee(String tableId,String employeeId,
    		HashMap paramMap,int beginNum, int endNum,int powerFlag,int showNewData) 
    			throws DataAccessException;

    /**
     *  ��ȡ��ѯ�����������
     * 
     * @param
     * @return
     */
    public int getRowCount(String tableId,HashMap paramMap) 
    	throws DataAccessException ;
    /**
     * ��ȡ������ؼ��ֶ���Ϣ
     * @param 
     * @return
     */
    public int getParamTableId(String employeeId,String tableName) 
    	throws DataAccessException;
    /**
     * ��ȡ����������ֶ���Ϣ
     * @param 
     * @return
     */
    public HashMap getParamColumnInfo(String employeeId,String tableName) 
    	throws DataAccessException;
    
    public HashMap getParamColumnInfo(String employeeId,String tableName,
    		String keyTypes)throws DataAccessException;
    /**
     * ��ȡ������ؼ��ֶ���Ϣ
     * @param 
     * @return
     */
    public String[] getMainColumnInfo(int tableId,String mainType) 
    	throws DataAccessException;
    
    public String[] getMainColumnInfo(String tableName,String mainType) 
		throws DataAccessException;
    
    /**
     * ���� ְԱ��ţ�����Դ���ź��������ͱ�ʶ��ȡȨ��΢����������Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getEmployeeParamColl(String employeeId,
    		int tableId,int dataFlag) throws DataAccessException;
    
    /**
     * ͨ�� ְԱ��ţ�����Դ���źͲ�ѯȨ�޷�Χ ��ȡ����������Ϣ
     * ֻ�����û�΢��������
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(String employeeId,int tableId) 
    	throws DataAccessException;
    /**
     * ͨ�� ְԱ��ţ�����Դ���źͲ�ѯȨ�޷�Χ ��ȡ����������Ϣ
     * ���ݰ�����ɫ��Ӧ�ĺ�ְԱ΢�����ȫ������
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(String employeeId,int tableId
    		,int dealFlag,String useRoleOnly) throws DataAccessException;
    /**
     * ͨ�� ��ɫ��ź�����Դ���� ��ȡ����������Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(int roleId,int tableId) 
		throws DataAccessException;
    /**
	 * ��ѯĳ����ɫ��Ӧ�Ĺ��˱�������Ϣ
	 * @param 
	 * @return
	 */
	public List getDescTableInfo(int roleId) throws DataAccessException;
	/**
     * ������������������Ϣ
     * @param 
     * @return
     */
    public String addParamRoleData(int roleId,int tableId,String tableDesc,
    		ParamObjectCollection deleteDataInfo,ParamObjectCollection insertDataInfo) 
    			throws DataAccessException;
    /**
     * Ȩ��΢������������������������Ϣ���Ȳ�ֳ���Ҫ�����ɾ�������ݼ���Ȼ��ֱ���д���
     * @param 
     * @return
     */
    public String addParamAdjustData(String employeeId,int tableId,
    		ParamObjectCollection deleteDataInfo,ParamObjectCollection insertDataInfo)
    			throws DataAccessException;
    /**
     * �������˱�������Ϣ
     * @param 
     * @return
     */
    public String addDescTableInfo(int roleId,int tableId,String tableDesc) 
    	throws DataAccessException;
    /**
     * ɾ�����˱�������Ϣ
     * @param 
     * @return
     */
    public int deleteDescTableInfo(int roleId,String[] tableIds) 
    	throws DataAccessException;
    /**
     * ��ȡ�������˻�����Ȩ�޷�Χ���ƿ�����Ϣ
     * @param 
     * @return
     */
    public String getRolePowerFlag() throws DataAccessException;
    
    public String getRoleCacheFlag() throws DataAccessException;
    /**
     * ͨ�������SQL��ȡ��������������ݼ���
     * @param 
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getParamFilterColl(String sql) 
    	throws DataAccessException;
    
    public List getParamFilterColl(List sqlList,List ifPassive) 
    	throws DataAccessException;

    /**
     * �õ�����Դ�����õġ����������Ƿ�ɼ�����Ϣ
     * @param tableId
     * @return
     * @throws DataAccessException
     */
    public int getIfShowNewData(String tableId) throws DataAccessException;
    /**
     * ɾ����ǰҳ��������
     * @param roleId
     * @param tableId
     * @param allData
     * @return
     * @throws DataAccessException
     */
    public int doDeleteAllThisPageData(int roleId,int tableId,List allData) throws DataAccessException;
    
    /**
     * ���뵱ǰҳѡ�е�����
     * @param roleId
     * @param tableId
     * @param data
     * @return
     * @throws DataAccessException
     */
    public int doInsertCheckData (int roleId,int tableId,String[] data) throws DataAccessException;
    
    /**
     * �������ݲ��ɼ�ʱ�����ڱ���Ȩ��΢����Ϣ
     * @param employeeId
     * @param tableId
     * @param deleteData
     * @param addData
     * @param updateData
     * @return
     * @throws DataAccessException
     */
    public int doModifyAdjustData(String employeeId, int tableId, ParamObjectCollection deleteData,
    		ParamObjectCollection addData, ParamObjectCollection updateData) throws DataAccessException;
    /**
     * ���ݽ�ɫ������Ȩ
     * @param tableId
     * @param roleList
     * @param checkData
     * @param uncheckData
     * @return
     * @throws DataAccessException
     */
    public int doBatchEndowPower(String tableId, String roleList, List checkData, List uncheckData) throws DataAccessException;
    
    
    public int getTableIdByName(String tableName) throws DataAccessException;
}
