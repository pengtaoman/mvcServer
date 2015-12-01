package com.neusoft.om.bo;

import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: 实现职务体系维护的所有接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface DutySystemBO extends BaseBO{
	public static final String BEAN = "dutySystemFacade";
	/**
	 * 根据组织机构类型得到当前组织机构的职务信息集合
	 * @param organKind
	 * @return DutyColl
	 * @throws DataAccessException
	 */
	public DutyColl queryDutySystemInfoByOrganKind(int organKind) throws ServiceException;
	/**
	 * 增加职务信息
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddDutySystemInfo(DutyVO vo) throws ServiceException;
	/**
	 * 根据组织机构的类型删除该组织机构的职务信息
	 * @param organKind
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteDutySystemInfoByOrganKind(int organKind) throws ServiceException;
	/**
	 * 根据职务编码删除
	 * @param dutyId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteDutySystemInfoByDutyId(int dutyId) throws ServiceException;
	
}
