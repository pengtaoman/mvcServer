package com.neusoft.om.bo;

import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.duty.OrganKindDutyColl;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2005-02-18</p>
 * <p>Module     : om</p>
 * <p>Description: 实现职务维护的接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface DutyBO extends BaseBO{
	public static final String BEAN = "dutyFacade";
	/**
	 * 修改职务信息
	 * @param vo
	 * @return int
	 * @throws ServiceException
	 */
	public int doAddDutyInfo(DutyVO vo) throws ServiceException;
	/**
	 * 修改职务信息
	 * @param vo
	 * @return int
	 * @throws ServiceException
	 */
	public int doModifyDudyInfo(DutyVO vo) throws ServiceException;
	/**
	 * 根据职务ID删除
	 * @param dutyId
	 * @return int
	 * @throws ServiceException
	 */
	public int doDeleteDutyInfoByDutyId(int dutyId) throws ServiceException;
	/**
	 * 根据职务编码得到职务信息
	 * @param dutyId
	 * @return
	 * @throws ServiceException
	 */
	public DutyVO getDutyInfoByDutyId(int dutyId) throws ServiceException;
	/**
	 * 得到组织机构类型和职务
	 * @return OrganKindDuty
	 * @throws ServiceException
	 */
	public OrganKindDutyColl getOrganKindDuty() throws ServiceException;
	/**
	 * 修改职务职责范围
	 * @param dutyId
	 * @param delFuncStr
	 * @param allFuncStr
	 * @return int
	 * @throws ServiceException
	 */
	public int doModifyDutyPower(int dutyId,String delFuncStr,String allFuncStr) throws ServiceException;
	/**
	 * 包括所有系统菜单信息
	 * @param dutyId
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getAllDutyPowerInfo(int dutyId) throws ServiceException;
	/**
	 * 有权利的菜单信息
	 * @param dutyId
	 * @return MenuColl
	 * @throws ServiceException
	 */
	public MenuColl getDutyPowerInfo(int dutyId) throws ServiceException;
	
}
