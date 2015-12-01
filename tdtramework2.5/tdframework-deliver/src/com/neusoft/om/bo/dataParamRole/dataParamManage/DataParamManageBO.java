package com.neusoft.om.bo.dataParamRole.dataParamManage;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.neusoft.common.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

public interface DataParamManageBO extends BaseBO{
	public static final String BEAN = "dataParamManageBO";
	
     /**
     *  ��ȡ���˱���������ֵ
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getTable()
    	throws ServiceException; 
    /**  ��ȡ���˱���������ֵ
     * 
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection 
    	getTableByRole(String roleId) throws ServiceException ;
    /**
     *  ����ְԱ��Ż�ȡ���˱���������ֵ
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection 
    	getTableByEmployee(String employeeId) throws ServiceException;
    /**
     *  ��ȡ������Ϣ����
     * 
     * @param
     * @return
     */
    public String getParamTableDesc(String id,String tableId,String flag) throws ServiceException;
    /**
     *  ��ȡ�ñ��Ӧ�Ĺ�������Ϣ
     * @param
     * @return
     */
    public HashMap getFilters(String tableId,HttpSession session) 
    	throws ServiceException; 
    /**
     *  ��ȡ��ѯ�����
     * 
     * @param
     * @return
     */
    public HashMap getInfoColl(String tableId,String roleId,HashMap paramMap,
    	int beginNum, int endNum) throws ServiceException ;
    /**
     * Ȩ��΢����������ְԱ��ű�ʶ��ȡ��ѯ�����
     * 
     * @param
     * @return
     */
    public HashMap getDataInfoColl(String tableId,String employeeId,
    		HashMap paramMap,int beginNum, int endNum, int showNewData) throws ServiceException;
    /**
     *  ��ȡ��ѯ�����������
     * 
     * @param
     * @return
     */
    public int getRowCount(String tableId,HashMap paramMap) throws ServiceException ;
    /**
	 * ��ѯĳ����ɫ��Ӧ�Ĺ��˱�������Ϣ
	 * @param 
	 * @return
	 */
	public List getDescTableInfo(String roleId) throws ServiceException;
    /**
	 * �������˱�������Ϣ
	 * @param 
	 * @return
	 */
	public String addDescTableInfo(String roleId,String tableId,
			String tableDesc) throws ServiceException;
	/**
	 * ɾ�����˱�������Ϣ
	 * @param 
	 * @return
	 */
	public String deleteDescTableInfo(String roleId,String[] tableIds) 
		throws ServiceException;
	/**
     * ������������������Ϣ
     * @param 
     * @return
     */
    public String addParamRoleData(String roleId,String tableId,
    		String tableDesc,String[] dataInfo) throws ServiceException;
    /**
     * Ȩ��΢������������������������Ϣ
     * @param 
     * @return
     */
    public String addParamAdjustData(String employeeId,String tableId,
    		String[] values)throws ServiceException;
    /**
     * ��ȡ����������Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(String roleId,String tableId) 
		throws ServiceException;
    /**
     * ��װ����Ȩ�޸�Ȩ��Ϣ
     * @param 
     * @return
     */
    public String makeParamDataInfo(String oldDataInfo,String unCheckData,
    	String[] checkedValue,String tableId);
    /**
     * ����΢�����ݣ�������Դ�����������ݲ��ɼ�ʱ�����������
     * @param employeeId
     * @param tableId
     * @param values
     * @return
     * @throws ServiceException
     */
    public int addAdjustDataUnshowNew(String employeeId,String tableId,String[] uncheck, String[] check) 
	throws ServiceException;
}
