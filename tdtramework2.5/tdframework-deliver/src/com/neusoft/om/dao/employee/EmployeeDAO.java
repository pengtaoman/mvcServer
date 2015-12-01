package com.neusoft.om.dao.employee;

import java.util.List;
import java.util.Map;
import java.util.Vector;

import com.neusoft.om.bo.EmployeeInfoReq;
import com.neusoft.om.bo.EmployeeInfoResp;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-10-20</p>
 * <p>Module     : om</p>
 * <p>Description: authorize</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface EmployeeDAO extends BaseDao {
	public static final String BEAN = "employeeDAO";
	/**
	 * 根据主键得到职员信息
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeVO getEmployeeInfoById(String employeeId) throws DataAccessException;
	/**
	 * 根据传入参数得到结果集,如果不输则不加该条件(包括兼职)
	 * @param areaId
	 * @param organId
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeColl getEmployeeInfo(String areaId,String organId,String dutyId) throws DataAccessException;
	/**
     * 查询所属渠道信息
     * @param name
     * @return
     * @throws DataAccessException
     */
     public String getDealerNameById(String dealerId) throws DataAccessException;
	/**
	 * 根据组织机构,职务查找人员信息集合(不包括兼职)
	 * @param organId
	 * @param dutyId
	 * @return EmployeeColl
	 * @throws DataAccessException
	 */
	public EmployeeColl getEmployeeInfo(String organId,int dutyId) throws DataAccessException;
	/**
	 * 根据组织机构,职务查找人员信息集合(包括兼职)
	 * @param organId
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeColl getAllEmployeeInfo(String organId,int dutyId) throws DataAccessException;
	/**
	 * 根据组织机构和职务查找人员信息集合(只包括兼职的人)
	 * @param organId
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeColl getPartTimeEmployeeInfo(String organId,int dutyId) throws DataAccessException;
	/**
	 * 查该组织机构下的人员信息(不包括兼职)
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeColl getEmployeeInfoByOrganId(String organId) throws DataAccessException;
	/**
	 * 查该组织机构下的人员信息(包括兼职)
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeColl getAllEmployeeInfoByOrganId(String organId) throws DataAccessException;
	/**
	 * 查询某个职务下的所有人员信息(不区分组织机构)(包括兼职)
	 * @param dutyId
	 * @return EmployeeColl
	 * @throws DataAccessException
	 */
	public EmployeeColl getAllEmployeeInfoByDutyId(int dutyId) throws DataAccessException;
	/**
	 * 根据登陆账号得到职员信息
	 * @param workNo
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeVO getEmployeeInfoByWorkNo(String workNo) throws DataAccessException;
	/**
     * 根据姓名模糊查询职员信息
     * @param name
     * @return
     * @throws DataAccessException
     */
     public EmployeeColl getEmployeeInfoByName(String name,int cityLevel) throws DataAccessException;
	/**
	 * 根据登陆账号模糊查询
	 * @param workNo
	 * @return EmployeeColl
	 * @throws DataAccessException
	 */
	public EmployeeColl getEmployeeInfoLikeWorkNo(String workNo) throws DataAccessException;
	/**
	 * 根据角色Id,得到使用该角色的操作员集合
	 * @param roleId
	 * @return EmployeeColl
	 * @throws DataAccessException
	 */
	public EmployeeColl getEmployeeInfoFromEmployeeRoleRelation(int roleId) throws DataAccessException;
	/**
	 * 更新操作员密码,同时更新密码修改时间
	 * @param workNo
	 * @param password
	 * @throws DataAccessException
	 */
	public int doPasswordUpdate(String workNo,String workPwd) throws DataAccessException;
	
	/**
	 * 更新操作员密码,同时更新密码修改时间
	 * @param workNo
	 * @param password
	 * @throws DataAccessException
	 */
	public int doUpdatePassWord(String workNo,String workPwd) throws DataAccessException;
	/**
	 * 增加操作员
	 * @param employeeVO
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddEmployee(EmployeeVO employeeVO) throws DataAccessException;
	/**
	 * 根据主键修改操作员
	 * @param employeeVO
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyEmployeeById(EmployeeVO employeeVO) throws DataAccessException;
	/**
	 * 删除操作员
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeById(String employeeId) throws DataAccessException;
    
    /**
     * 得到某组织机构下所有的兼职人员（不区分职务）
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getPartTimeEmployeeInfoByOrganId(String organId) throws DataAccessException;
    
    /**
	 * 根据登陆账号得到职员信息
	 * @param workNo
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeVO getEmployeeInfoByWorkNoFilter(String workNo,String employeeId,int areaLevel,int adminType) throws DataAccessException;
	/**
     * 根据姓名模糊查询职员信息
     * @param name
     * @return
     * @throws DataAccessException
     */
     public EmployeeColl getEmployeeInfoByNameFilter(String name,String employeeId,int areaLevel,int adminType) throws DataAccessException;
    
     /**
      * 得到组织机构职员列表
      * @param  EmployeeColl
      * @return
      * @throws ServiceException
      */
     //NEW：取结果集数据总行数
     public int getEmployeeRowCount(String areaId, String organId, String employeeId, int areaLevel, int adminType) throws DataAccessException;
     
     public EmployeeColl getEmployeeInfoFilter(String areaId, String organId, 
    		 String employeeId, int areaLevel, int adminType) throws DataAccessException;
     //NEW：用结果集分页方式取数据
     public EmployeeColl getEmployeeInfoFilter(String areaId, String organId, 
    		 String employeeId, int areaLevel, int adminType,
    		 	int startRow,int endRow) throws DataAccessException;
     /**
      * 查找某子系统的所有用户
      * @param systemId
      * @return
      * @throws DataAccessException
      */
     public EmployeeColl getEmployeeCollBySystemId(String systemId) throws DataAccessException;
     
     /**
      * 得到两个级别之间区域的所有职员
      * @param level1
      * @param level2
      * @return
      * @throws DataAccessException
      */
     public EmployeeColl getEmployeeByAreaLevel(int level1, int level2) throws DataAccessException;
     
     /**
      * 得到渠道人员集合
      * @param dealerId
      * @return
      * @throws DataAccessException
      */
     public EmployeeColl getDealerEmployee(String dealerId, int areaLevel,int adminType, String employeeId) throws DataAccessException;
     
     public EmployeeColl getDealerEmployee(String dealerId, int areaLevel, int adminType, String employeeId, int beginRow, int endRow) throws DataAccessException;
     
     public int getDealerEmployeeRowCount(String dealerId, int areaLevel, int adminType, String employeeId) throws DataAccessException;
     
     
     /**
      * 根据姓名查找渠道人员信息
      * @param name
      * @param employeeId
      * @param areaLevel
      * @param adminType
      * @param dealerId
      * @return
      * @throws DataAccessException
      */
     public EmployeeColl getDealerEmpByName(String name,String employeeId,int areaLevel,int adminType) throws DataAccessException;
     
     /**
      * 根据工号查找人员信息
      * @param workNo
      * @param employeeId
      * @param areaLevel
      * @param adminType
      * @param dealerId
      * @return
      * @throws DataAccessException
      */
     public EmployeeVO getDealerEmpByWorkNo(String workNo,String employeeId,int areaLevel,int adminType) throws DataAccessException;
     /**
 	 * 根据登陆账号得到职员信息 -- 为渠道系统提供
 	 * @param workNo
 	 * @return
 	 * @throws DataAccessException
 	 */
 	public EmployeeVO getEmployeeInfoByWorkNoFilterForChnl(String workNo,String employeeId,int areaLevel,int adminType) throws DataAccessException;

	/**
     * 根据姓名模糊查询职员信息 -- 为渠道系统提供
     * @param name
     * @return
     * @throws DataAccessException
     */
     public EmployeeColl getEmployeeInfoByNameFilterForChnl(String name,String employeeId,int areaLevel,int adminType) throws DataAccessException;

     /**
      * 得到可以转交权力的人员列表
      * @param areaId
      * @param employeeId
      * @param adminType
      * @return
      */
     public EmployeeColl getDeliverEmployee(String areaId, String employeeId, int adminType) throws DataAccessException;

     /**
      * 提交,将fromId创建的人员创建者字段修改为toId
      * @param fromId
      * @param toId
      * @return
      * @throws DataAccessException
      */
     public int doDeliverEmployee(String fromId, String toId) throws DataAccessException;
     
     public EmployeeColl getEmployeeInfoFilter(Map filterInfo) throws DataAccessException;
     
     public EmployeeColl getEmployeeInfoFilter(Map filterInfo, int startRow, int endRow) throws DataAccessException;
     
     public int getEmployeeInfoRowCountFilter(Map filterInfo) throws DataAccessException;
     
     public EmployeeColl getEmployeeByArea(String areaId) throws DataAccessException;
     
     /**
      * 取消权限微调的数据
      * @param employeeId
      * @return
      * @throws DataAccessException
      */
     public int cancelInching(String employeeId) throws DataAccessException;
     /**
      * 取消权限微调的数据,包括功能权限微调和数据权限微调
      * @param employeeId
      * @return
      * @throws DataAccessException
      */
     public String undoPowerAdjust(String employeeId,String[] powerType) throws DataAccessException;
     
  	/**
  	 * 校验组织机构或职员是否在工作流中存在工作项没有完成 为权限提供接口程序
  	 * @param paramId
  	 * @param type
  	 * @return
  	 * @throws DataAccessException
  	 */
  	public int checkOrgan(String paramId,int type)throws DataAccessException;
  	/**
  	 * 得到所有微调过的职员信息集合
  	 * @return
  	 * @throws DataAccessException
  	 */
  	public List getPowerAdjustEmpColl() throws DataAccessException;
  	
  	/**
     * 同步统一认证平台传入的职员信息
     * @param employeeInfo
     * @return
     * @throws ServiceException
     */
    public EmployeeInfoResp doSynFromAuthPlat(EmployeeInfoReq employeeInfo) throws DataAccessException;
    
    /**
     * 得到由统一认证系统同步来的职员信息
     * @return
     * @throws DataAccessException
     */
    public  List getEmployeeReq(int startNum, int endNum) throws DataAccessException;
    
    public int getTotalRowsOfEmpReq() throws DataAccessException;
    
    public int doDeleteEmpReq(String workNo) throws DataAccessException;
    
    public Vector getEmpReqVector() throws DataAccessException;
    
    /**
     * 删除职员时取消其分配的任务
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public int doCancelWork(String employeeId) throws DataAccessException;
    
    public Map getAllEmpRole() throws DataAccessException;
    
    public int doDeleteTempInfo() throws DataAccessException;
    
    public int[] doSaveTempInfo(EmployeeColl empColl) throws DataAccessException;
    
    public boolean ifInGroup(String employeeId) throws DataAccessException;
    /**
     * 得到自动生成的工号
     * @return
     * @throws DataAccessException
     */
    public String getAutoWorkNo() throws DataAccessException;
    
    public String getCityShortName(String cityCode )throws DataAccessException;
    
    public void doUpdatePartyId(String employeeId, String partyId) throws DataAccessException;
    
    /**
     * 得到指定部门的所有兼职工号
     * @param level1
     * @param level2
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getPtEmployee(OrganColl organColl) throws DataAccessException;
}
