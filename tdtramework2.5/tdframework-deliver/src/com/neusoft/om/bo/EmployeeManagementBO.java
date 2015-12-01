package com.neusoft.om.bo;

import java.util.HashMap;
import java.util.Map;

import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.bo.EmployeeInfoReq;
import com.neusoft.om.bo.EmployeeInfoResp;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationColl;
import com.neusoft.om.dao.employeeparamrolerelation.EmployeeParamRoleRelationColl;
import com.neusoft.om.dao.employeeroledisplay.EmployeeRoleDisplayColl;
import com.neusoft.om.dao.employeeroledisplay.OwnAndAssignedRoleDispColl;
import com.neusoft.om.dao.employeerolerelation.EmployeeRoleRelationColl;
import com.neusoft.om.dao.funcrole.FuncRoleColl;
import com.neusoft.om.dao.organemployeedisplay.OrganEmployeeDisplayColl;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: 实现操作员维护的所有接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface EmployeeManagementBO extends BaseBO {
	public static final String BEAN = "employeeManagementFacade";
	/**
     *查询渠道所属部门信息
     * @param dealerId
	 * @return
	 * @throws ServiceException
     */
    public String getRegionCodeById(String dealerId) throws ServiceException;
	/**
	 * 根据职员Id得到职员信息
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public EmployeeVO getEmployeeByEmployeeId(String employeeId) throws ServiceException;
	/**
	 * 根据功耗得到职员信息
	 * @param workNo
	 * @return
	 * @throws ServiceException
	 */
	 public EmployeeVO getEmployeeInfoByWorkNo(String workNo) throws ServiceException;
	
	 /**
     * 根据姓名模糊查询职员信息
     * @param name
     * @return
     * @throws ServiceException
     */
     public EmployeeColl getEmployeeInfoByName(String name,int cityLevel) throws ServiceException;
	/**
	 * 组合条件查询人员信息
	 * @param mapData(key: areaId,organId,dutyId)
	 * @return EmployeeColl
	 * @throws ServiceException
	 */
	public EmployeeColl getEmployeeInfo(HashMap mapData) throws ServiceException;
	/**
	 * 根据职员Id得到职员的角色信息集合(包括功能角色和数据角色)
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public RoleColl getRoleInfoByEmployeeId(String employeeId) throws ServiceException;
	/**
	 * 根据职员编码得到操作员所有允许的角色信息
	 * @param employeeId
	 * @return EmployeeDutyRelationColl
	 * @throws ServiceException
	 */
	public RoleColl getPermmitedRoleColl(String employeeId) throws ServiceException;
	
	/**
	 * 更新职员角色关系信息
	 * @param employeeId
	 * @return EmployeeDutyRelationColl
	 * @throws ServiceException
	 */
	public int doModifyRole(EmployeeRoleRelationColl employeeRoleRelationColl, String authId) throws ServiceException;
	
	/**
	 * 根据职员Id得到职员的职务信息集合
	 * @param dutyId
	 * @return
	 * @throws ServiceException
	 */
	public DutyColl getDutyInfoByEmployeeId(String employeeId) throws ServiceException;
	/**
	 * 根据组织机构Id得到该组织机构下的所有人员信息(销售调用)
	 * @param organId
	 * @return
	 * @throws ServiceException
	 */
	public EmployeeColl getEmployee(String organId) throws ServiceException;
	/**
	 * 根据职员编码到职员与职务关系表中查相关信息
	 * @param employeeId
	 * @return EmployeeDutyRelationColl
	 * @throws ServiceException
	 */
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByEmployeeId(String employeeId) throws ServiceException;
	/**
	 * 根据功耗得到职员信息
	 * @param workNo
	 * @return
	 * @throws ServiceException
	 */
	 public String getDealerNameInfo(String dealerId) throws ServiceException;	
	/**
	 * 增加操作员信息
	 * 同时需要维护职员-职务关系,职员-角色关系,职员权限详情
	 * @param vo
	 * @return int 1:成功 0:失败
	 * @throws ServiceException
	 */
	public long doAddEmployeeInfo(EmployeeVO employeeVO,HashMap map) throws  ServiceException;
	/**
	 * 修改操作员信息
	 * 如果修改组织机构,职务信息,需要维护职员-职务关系表,职员-角色关系表,职员权限详情表.
	 * @param employeeVO
	 * @param oldOrganId
	 * @param oldDutyId
	 * @return int
	 * @throws ServiceException
	 */
	public int doModifyEmployeeInfo(EmployeeVO employeeVO,String oldOrganId,int oldDutyId,HashMap map) throws  ServiceException;
	/**
	 * 需要维护职员-职务关系,职员-角色关系,职员权限详情表
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public int doDeleteEmployeeInfo(String employeeId,HashMap map) throws  ServiceException;

	/**
	 * 修改密码:
	 * 修改密码同时需要设置密码失效日期
	 * 从开关控制表中得到自修改密码之日起,多少天后失效
	 * @param workNo
	 * @param workPwd
	 * @return
	 * @throws ServiceException
	 */
	public int doUpdatePassWord(String workNo,String workPwd) throws ServiceException;
	/**
	 * 密码恢复
	 * 修改密码同时需要设置密码失效日期,从开关控制表中得到自修改密码之日起,多少天后失效;
	 * 密码恢复为操作员登录帐号！如操作员登录帐号小于6位，
	 * 则在登录帐号后填0补足六位;如操作员登录帐号大于15位，则取前15位;下划线换成数字0
	 * @param workNo
	 * @param workPwd
	 * @return
	 * @throws ServiceException
	 */
	public HashMap doRenewPassWord(String workNo) throws  ServiceException;
	/**
	 * 操作员权限微调
	 * strPowerInfo为权限功能字符串
	 * 字符串的格式为 菜单标识+权限标识(1增,2减少)各菜单权限之间用分号";"分隔
	 * @param employeeId
	 * @param strPowerInfo
	 * @return
	 * @throws ServiceException
	 */
	public int doPowerAdjust(String employeeId,String strPowerInfo) throws  ServiceException;
    
    /**
     * 得到某组织机构下所有的兼职人员（不区分职务）
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getPartTimeEmployeeInfoByOrganId(String organId) throws ServiceException;
    
    /**
     * 修改职员信息
     * @return
     * @throws ServiceException
     */
    public int doModifyEmployeeInfo(EmployeeVO employeeVO,boolean haveInOrgan) throws ServiceException;
   
     /**
      * 根据职员Id得到职员角色对应管理列表
      * @param employeeId
      * @return
      * @throws ServiceException
      */
     public EmployeeRoleRelationColl getEmployeeRoleRelationInfoByEmployeeId(String employeeId) throws ServiceException;
     
     /**
      * 通过职员编号得到其创建的角色列表
      * @param account
      * @return
      * @throws DataAccessException
      */
     public RoleColl getCreateRoleColl(String employeeId) throws ServiceException;
     
     /**
      * 通过employeeId得到其可分配的角色列表
      * @param employeeId
      * @return
      * @throws DataAccessException
      */
     public RoleColl getAssignableRoleColl(String employeeId) throws ServiceException;
     /**
      * 通过organId得到该组织机构下所有的职员信息，包括全职人员和兼职人员
      * @param organId
      * @return
      * @throws ServiceException
      */
     public OrganEmployeeDisplayColl getAllOrganEmployeeInfo(String organId) throws ServiceException;
     
     //public SystemColl getSystemInfoByEmployeeId(String employeeId) throws ServiceException;
     
//     public MenuColl getMenuInfoByEmployeeId(String employeeId, String systemId) throws ServiceException;
     
    
     /**
      * 得到职员赋权时的展示信息列表，其中包括当前职员可分配的角色列表和这些角色中当权被维护职员已经具有的角色权限类型（使用权，管理权）
      * @param currentEmpId 当前管理员的employeeId
      * @param assignedEmpId 被管理职员的employeeId
      * @return
      * @throws ServiceException
      */
     public EmployeeRoleDisplayColl getAssignDisplayColl(String currentEmpId, String assignedEmpId) throws ServiceException;
     
     /**
      * 得到职员赋权参数角色时的展示信息列表，其中包括当前职员可分配的角色列表和这些角色中当权被维护职员已经具有的参数角色权限类型（使用权，管理权）
      * @param currentEmpId 当前管理员的employeeId
      * @param assignedEmpId 被管理职员的employeeId
      * @return
      * @throws ServiceException
      */
     public ParamRoleColl getParamRoleAssignDisplayColl(String currentEmpId, String assignedEmpId) throws ServiceException;
     
     /**
      * 修改职员与参数角色关系
      * @param employeeParamRoleRelationColl
      * @return int
      * @throws ServiceException
      */
     
     public int doModifyEmployeeParamRoleRelation(EmployeeParamRoleRelationColl employeeParamRoleRelationColl, String authId) throws ServiceException;
     
     
     
     public EmployeeVO getEmployeeByWorkNo(String workNo) throws ServiceException;
     
     /**
      * 得到职员创建的和被分配的角色信息集合，专用于职员详细信息的角色部分展示
      * @param employeeId
      * @return
      * @throws ServiceException
      */
     public OwnAndAssignedRoleDispColl getEmpOwnerAndAssingedRoleColl(String employeeId) throws ServiceException;
     
     public FuncRoleColl getFunRoleCollByEmployeeId(String employeeId) throws ServiceException;
     
     
     /**
 	 * 根据功耗得到职员信息
 	 * @param workNo
 	 * @return
 	 * @throws ServiceException
 	 */
 	 public EmployeeVO getEmployeeInfoByWorkNoFilter(String workNo,String employeeId,int areaLevel,int adminType) throws ServiceException;
 	
 	 /**
      * 根据姓名模糊查询职员信息
      * @param name
      * @return
      * @throws ServiceException
      */
      public EmployeeColl getEmployeeInfoByNameFilter(String name,String employeeId,int areaLevel,int adminType) throws ServiceException;
      
      
      /**
       * 得到组织机构职员列表
       * @param  EmployeeColl
       * @return
       * @throws ServiceException
       */
      public int getEmployeeRowCount(String areaId, String organId, String employeeId, 
       		int areaLevel, int adminType) throws ServiceException;
      
      public EmployeeColl getEmployeeInfoFilter(String areaId, String organId, 
        		String employeeId, int areaLevel, int adminType,
        			int startRow,int endRow) throws ServiceException;
      
      public EmployeeColl getEmployeeInfoFilter(String areaId,String organId,String employeeId,int areaLevel,int adminType) throws ServiceException;
      
      public EmployeeColl getEmployeeInfoFilter(Map filterInfo) throws ServiceException;
      
      public EmployeeColl getEmployeeInfoFilter(Map filterInfo, int beginRow, int endRow) throws ServiceException;
      
      public int getEmployeeInfoRowCountFilter(Map filterInfo) throws ServiceException;
      /**
       * 得到渠道人员信息集合
       * @param dealerId
       * @param areaLevel
       * @param adminType
       * @param employeeId
       * @return
       */
      public EmployeeColl getDealerEmployee(String dealerId,int areaLevel,int adminType,String employeeId) throws ServiceException;
      /**
       * 根据姓名模糊查询渠道职员信息
       * @param name
       * @return
       * @throws ServiceException
       */
       public EmployeeColl getDealerEmpByName(String name, String employeeId,int areaLevel,int adminType) throws ServiceException;
       
       public EmployeeColl getDealerEmployee(String dealerId,int areaLevel,int adminType,String employeeId, int beginRow, int endRow) throws ServiceException;
       
       public int getDealerEmployeeRowCount(String dealerId,int areaLevel,int adminType,String employeeId) throws ServiceException;
       
       /**
    	 * 根据工号得到渠道职员信息
    	 * @param workNo
    	 * @return
    	 * @throws ServiceException
    	 */
        public EmployeeVO getDealerEmpByWorkNo(String workNo,String employeeId,int areaLevel,int adminType) throws ServiceException;
        /**
     	 * 根据工号得到职员信息--渠道专用
     	 * @param workNo
     	 * @return
     	 * @throws ServiceException
     	 */
     	 public EmployeeVO getEmployeeInfoByWorkNoFilterForChnl(String workNo,String employeeId,int areaLevel,int adminType) throws ServiceException;
     	 /**
          * 根据姓名模糊查询职员信息--渠道专用
          * @param name
          * @return
          * @throws ServiceException
          */
          public EmployeeColl getEmployeeInfoByNameFilterForChnl(String name,String employeeId,int areaLevel,int adminType) throws ServiceException;
          
          /**
           * 判断职员是否被分配在组中
           * @param employeeId 被管理职员的employeeId
           * @return
           * @throws ServiceException
           */
          public boolean ifInGroup(String employeeId) throws ServiceException;
          
          public void doUpdatePartyId(String employeeId, String partyId) throws ServiceException;


}
