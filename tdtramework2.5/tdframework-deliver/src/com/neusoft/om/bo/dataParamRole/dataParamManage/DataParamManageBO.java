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
     *  获取过滤表名下拉框值
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getTable()
    	throws ServiceException; 
    /**  获取过滤表名下拉框值
     * 
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection 
    	getTableByRole(String roleId) throws ServiceException ;
    /**
     *  根据职员编号获取过滤表名下拉框值
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection 
    	getTableByEmployee(String employeeId) throws ServiceException;
    /**
     *  获取过滤信息描述
     * 
     * @param
     * @return
     */
    public String getParamTableDesc(String id,String tableId,String flag) throws ServiceException;
    /**
     *  获取该表对应的过滤器信息
     * @param
     * @return
     */
    public HashMap getFilters(String tableId,HttpSession session) 
    	throws ServiceException; 
    /**
     *  获取查询结果集
     * 
     * @param
     * @return
     */
    public HashMap getInfoColl(String tableId,String roleId,HashMap paramMap,
    	int beginNum, int endNum) throws ServiceException ;
    /**
     * 权限微调——根据职员编号标识获取查询结果集
     * 
     * @param
     * @return
     */
    public HashMap getDataInfoColl(String tableId,String employeeId,
    		HashMap paramMap,int beginNum, int endNum, int showNewData) throws ServiceException;
    /**
     *  获取查询结果集的列数
     * 
     * @param
     * @return
     */
    public int getRowCount(String tableId,HashMap paramMap) throws ServiceException ;
    /**
	 * 查询某个角色对应的过滤表描述信息
	 * @param 
	 * @return
	 */
	public List getDescTableInfo(String roleId) throws ServiceException;
    /**
	 * 新增过滤表描述信息
	 * @param 
	 * @return
	 */
	public String addDescTableInfo(String roleId,String tableId,
			String tableDesc) throws ServiceException;
	/**
	 * 删除过滤表描述信息
	 * @param 
	 * @return
	 */
	public String deleteDescTableInfo(String roleId,String[] tableIds) 
		throws ServiceException;
	/**
     * 新增参数过滤数据信息
     * @param 
     * @return
     */
    public String addParamRoleData(String roleId,String tableId,
    		String tableDesc,String[] dataInfo) throws ServiceException;
    /**
     * 权限微调——新增参数过滤数据信息
     * @param 
     * @return
     */
    public String addParamAdjustData(String employeeId,String tableId,
    		String[] values)throws ServiceException;
    /**
     * 获取过滤数据信息
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(String roleId,String tableId) 
		throws ServiceException;
    /**
     * 组装数据权限赋权信息
     * @param 
     * @return
     */
    public String makeParamDataInfo(String oldDataInfo,String unCheckData,
    	String[] checkedValue,String tableId);
    /**
     * 保存微调数据，当数据源配置新增数据不可见时调用这个方法
     * @param employeeId
     * @param tableId
     * @param values
     * @return
     * @throws ServiceException
     */
    public int addAdjustDataUnshowNew(String employeeId,String tableId,String[] uncheck, String[] check) 
	throws ServiceException;
}
