package com.neusoft.om.bo;

import java.util.HashMap;
import java.util.Map;

import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationVO;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.core.BaseBO;
/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: ְ��ְԱ��ϵά��</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface DutyEmployeeRelationMaintanceBO extends BaseBO {
	public static final String BEAN = "dutyEmployeeRelationManagementFacade";
	/**������֯����Id,ְ��Id�õ���ְ���ϵ������Ϣ
	 * key: "mainEmployee","partTimeEmployee","otherInnerEmployee","otherInterEmployee"
	 * value: "��ְ��Ա","��ְ��Ա","��֯������������Ա"
	 * @param organId
	 * @param dutyId
	 * @return Map
	 * @throws ServiceException
	 */
	public Map getAllEmployeeInfo(String organId,int dutyId) throws ServiceException;

	/**
	 * 
	 * �ڲ���ְ����ɾ����ְ�Ĳ���Ա��Ϣ
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
	 * �ڲ���ְ�������Ӽ�ְ�Ĳ���Ա��Ϣ
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
     * ��Ա��ְ���ϵ��������Ա�����˱��б���Ķ��Ǽ�ְ��Ϣ��
     * @param map
     * @return
     * @throws ServiceException
     */
    public int doAddPartTimeEmployeeInfo(HashMap map) throws ServiceException;
    
    /**
     * ɾ��Ա��ְ���ϵ��Ϣ
     * @param empDutyVO
     * @return
     * @throws ServiceException
     */
    public int doDeleteEmployeeDutyRelationInfo(EmployeeDutyRelationVO empDutyVO) throws ServiceException;
    
    /**
     * �жϴ���֯�������Ƿ��Ѿ����ڸ�ְԱ
     * @param employeeId
     * @param organId
     * @return
     */
    public boolean haveInOrgan(String employeeId,String organId);
	
}
