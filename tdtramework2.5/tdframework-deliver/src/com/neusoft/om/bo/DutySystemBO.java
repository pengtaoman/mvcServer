package com.neusoft.om.bo;

import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: ʵ��ְ����ϵά�������нӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface DutySystemBO extends BaseBO{
	public static final String BEAN = "dutySystemFacade";
	/**
	 * ������֯�������͵õ���ǰ��֯������ְ����Ϣ����
	 * @param organKind
	 * @return DutyColl
	 * @throws DataAccessException
	 */
	public DutyColl queryDutySystemInfoByOrganKind(int organKind) throws ServiceException;
	/**
	 * ����ְ����Ϣ
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddDutySystemInfo(DutyVO vo) throws ServiceException;
	/**
	 * ������֯����������ɾ������֯������ְ����Ϣ
	 * @param organKind
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteDutySystemInfoByOrganKind(int organKind) throws ServiceException;
	/**
	 * ����ְ�����ɾ��
	 * @param dutyId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteDutySystemInfoByDutyId(int dutyId) throws ServiceException;
	
}
