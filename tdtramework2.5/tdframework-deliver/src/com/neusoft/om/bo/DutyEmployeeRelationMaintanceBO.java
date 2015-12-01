package com.neusoft.om.bo;

import java.util.HashMap;
import java.util.Map;

import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationVO;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.core.BaseBO;
/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: 职务职员关系维护</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface DutyEmployeeRelationMaintanceBO extends BaseBO {
	public static final String BEAN = "dutyEmployeeRelationManagementFacade";
	/**根据组织机构Id,职务Id得到该职务上的相关信息
	 * key: "mainEmployee","partTimeEmployee","otherInnerEmployee","otherInterEmployee"
	 * value: "主职人员","兼职人员","组织机构内其他人员"
	 * @param organId
	 * @param dutyId
	 * @return Map
	 * @throws ServiceException
	 */
	public Map getAllEmployeeInfo(String organId,int dutyId) throws ServiceException;

	/**
	 * 
	 * 在部门职务中删除兼职的操作员信息
	 * 
	 * @param areaId
	 * @param organId
	 * @param dutyId
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public int doDelPartTimeEmployeeInfo(String areaId,String organId,int dutyId,String employeeId) throws ServiceException;

	/**
	 * 
	 * 在部门职务中增加兼职的操作员信息
	 * 
	 * @param areaId
	 * @param organId
	 * @param dutyId
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public int doAddPartTimeEmployeeInfo(String areaId,String organId,int dutyId,String[] employeeId) throws ServiceException;
    
    /**
     * 在员工职务关系表中增加员工（此表中保存的都是兼职信息）
     * @param map
     * @return
     * @throws ServiceException
     */
    public int doAddPartTimeEmployeeInfo(HashMap map) throws ServiceException;
    
    /**
     * 删除员工职务关系信息
     * @param empDutyVO
     * @return
     * @throws ServiceException
     */
    public int doDeleteEmployeeDutyRelationInfo(EmployeeDutyRelationVO empDutyVO) throws ServiceException;
    
    /**
     * 判断此组织机构中是否已经存在该职员
     * @param employeeId
     * @param organId
     * @return
     */
    public boolean haveInOrgan(String employeeId,String organId);
	
}
