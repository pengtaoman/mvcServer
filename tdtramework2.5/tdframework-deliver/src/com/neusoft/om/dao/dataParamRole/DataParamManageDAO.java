package com.neusoft.om.dao.dataParamRole;

import java.util.HashMap;
import java.util.List;

import com.neusoft.common.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface DataParamManageDAO extends BaseDao{
	public static final String BEAN = "dataParamManageDAO";
	/**
     * 根据 职员编号和数据源表名 获取职员所对应的角色信息
     * @author yanglm
     * @param 
     * @return
     */
    public String getParamRoleInfo(String employeeId,String tableName) 
    	throws DataAccessException;
     /**
     *  获取过滤表名下拉框值
     * 
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getTable() 
    	throws DataAccessException ;
    /**  获取过滤表名下拉框值
    * 
    * @param
    * @return
    */
   public com.neusoft.tdframework.common.data.ParamObjectCollection getTableByRole(String roleId) 
   	    throws DataAccessException ;
   /**
    *  根据职员编号获取过滤表名下拉框值
    * 
    * @param
    * @return
    */
   public com.neusoft.tdframework.common.data.ParamObjectCollection getTableByEmployee(String employeeId) 
   	    throws DataAccessException;
   /**
    *  获取过滤信息描述
    * 
    * @param
    * @return
    */
   public String getParamTableDesc(String roleId,String tableId) 
   	    throws DataAccessException ;
   /**
    *  根据职员编号获取过滤信息描述
    * 
    * @param
    * @return
    */
   public String getPowerDescByEmployee(String employeeId,String tableId) 
   		throws DataAccessException ;
   /**
     * 获取该表对应的过滤器信息
     * @author yanglm
     * @param
     * @return
     */
    public HashMap getFilters(String tableId) throws DataAccessException ;
    /**
     * 获取联动过滤器的onchange时间方法
     * @author yanglm
     * @param
     * @return
     */
    public List getOnChangeMethod(int tableId,List ifPassiveFilter,
    	List filterTagName,String methodName) throws DataAccessException;
    /**
     *  获取查询结果集
     * 
     * @param
     * @return
     */
    public HashMap getInfoColl(String tableId,String roleId,HashMap paramMap,
    	int beginNum, int endNum) throws DataAccessException ;
    /**
     * 权限微调——根据职员编号标识获取查询结果集
     * 
     * @param
     * @return
     */
    public HashMap getDataCollByEmployee(String tableId,String employeeId,
    		HashMap paramMap,int beginNum, int endNum,int powerFlag,int showNewData) 
    			throws DataAccessException;

    /**
     *  获取查询结果集的列数
     * 
     * @param
     * @return
     */
    public int getRowCount(String tableId,HashMap paramMap) 
    	throws DataAccessException ;
    /**
     * 获取下拉框关键字段信息
     * @param 
     * @return
     */
    public int getParamTableId(String employeeId,String tableName) 
    	throws DataAccessException;
    /**
     * 获取下拉框过滤字段信息
     * @param 
     * @return
     */
    public HashMap getParamColumnInfo(String employeeId,String tableName) 
    	throws DataAccessException;
    
    public HashMap getParamColumnInfo(String employeeId,String tableName,
    		String keyTypes)throws DataAccessException;
    /**
     * 获取下拉框关键字段信息
     * @param 
     * @return
     */
    public String[] getMainColumnInfo(int tableId,String mainType) 
    	throws DataAccessException;
    
    public String[] getMainColumnInfo(String tableName,String mainType) 
		throws DataAccessException;
    
    /**
     * 根据 职员编号，数据源表编号和数据类型标识获取权限微调后数据信息
     * @param 
     * @return
     */
    public ParamObjectCollection getEmployeeParamColl(String employeeId,
    		int tableId,int dataFlag) throws DataAccessException;
    
    /**
     * 通过 职员编号，数据源表编号和查询权限范围 获取过滤数据信息
     * 只包括用户微调的数据
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(String employeeId,int tableId) 
    	throws DataAccessException;
    /**
     * 通过 职员编号，数据源表编号和查询权限范围 获取过滤数据信息
     * 数据包括角色对应的和职员微调后的全部数据
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(String employeeId,int tableId
    		,int dealFlag,String useRoleOnly) throws DataAccessException;
    /**
     * 通过 角色编号和数据源表编号 获取过滤数据信息
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(int roleId,int tableId) 
		throws DataAccessException;
    /**
	 * 查询某个角色对应的过滤表描述信息
	 * @param 
	 * @return
	 */
	public List getDescTableInfo(int roleId) throws DataAccessException;
	/**
     * 新增参数过滤数据信息
     * @param 
     * @return
     */
    public String addParamRoleData(int roleId,int tableId,String tableDesc,
    		ParamObjectCollection deleteDataInfo,ParamObjectCollection insertDataInfo) 
    			throws DataAccessException;
    /**
     * 权限微调——新增参数过滤数据信息，先拆分出需要插入和删除的数据集，然后分别进行处理
     * @param 
     * @return
     */
    public String addParamAdjustData(String employeeId,int tableId,
    		ParamObjectCollection deleteDataInfo,ParamObjectCollection insertDataInfo)
    			throws DataAccessException;
    /**
     * 新增过滤表描述信息
     * @param 
     * @return
     */
    public String addDescTableInfo(int roleId,int tableId,String tableDesc) 
    	throws DataAccessException;
    /**
     * 删除过滤表描述信息
     * @param 
     * @return
     */
    public int deleteDescTableInfo(int roleId,String[] tableIds) 
    	throws DataAccessException;
    /**
     * 获取参数过滤缓存与权限范围控制开关信息
     * @param 
     * @return
     */
    public String getRolePowerFlag() throws DataAccessException;
    
    public String getRoleCacheFlag() throws DataAccessException;
    /**
     * 通过传入的SQL获取过滤下拉框的数据集合
     * @param 
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getParamFilterColl(String sql) 
    	throws DataAccessException;
    
    public List getParamFilterColl(List sqlList,List ifPassive) 
    	throws DataAccessException;

    /**
     * 得到数据源表配置的“新增数据是否可见”信息
     * @param tableId
     * @return
     * @throws DataAccessException
     */
    public int getIfShowNewData(String tableId) throws DataAccessException;
    /**
     * 删除当前页所有数据
     * @param roleId
     * @param tableId
     * @param allData
     * @return
     * @throws DataAccessException
     */
    public int doDeleteAllThisPageData(int roleId,int tableId,List allData) throws DataAccessException;
    
    /**
     * 插入当前页选中的数据
     * @param roleId
     * @param tableId
     * @param data
     * @return
     * @throws DataAccessException
     */
    public int doInsertCheckData (int roleId,int tableId,String[] data) throws DataAccessException;
    
    /**
     * 新增数据不可见时，用于保存权限微调信息
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
     * 数据角色批量赋权
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
