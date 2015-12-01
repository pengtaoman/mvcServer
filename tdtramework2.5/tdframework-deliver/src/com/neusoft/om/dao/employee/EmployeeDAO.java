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
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface EmployeeDAO extends BaseDao {
	public static final String BEAN = "employeeDAO";
	/**
	 * ���������õ�ְԱ��Ϣ
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeVO getEmployeeInfoById(String employeeId) throws DataAccessException;
	/**
	 * ���ݴ�������õ������,��������򲻼Ӹ�����(������ְ)
	 * @param areaId
	 * @param organId
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeColl getEmployeeInfo(String areaId,String organId,String dutyId) throws DataAccessException;
	/**
     * ��ѯ����������Ϣ
     * @param name
     * @return
     * @throws DataAccessException
     */
     public String getDealerNameById(String dealerId) throws DataAccessException;
	/**
	 * ������֯����,ְ�������Ա��Ϣ����(��������ְ)
	 * @param organId
	 * @param dutyId
	 * @return EmployeeColl
	 * @throws DataAccessException
	 */
	public EmployeeColl getEmployeeInfo(String organId,int dutyId) throws DataAccessException;
	/**
	 * ������֯����,ְ�������Ա��Ϣ����(������ְ)
	 * @param organId
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeColl getAllEmployeeInfo(String organId,int dutyId) throws DataAccessException;
	/**
	 * ������֯������ְ�������Ա��Ϣ����(ֻ������ְ����)
	 * @param organId
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeColl getPartTimeEmployeeInfo(String organId,int dutyId) throws DataAccessException;
	/**
	 * �����֯�����µ���Ա��Ϣ(��������ְ)
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeColl getEmployeeInfoByOrganId(String organId) throws DataAccessException;
	/**
	 * �����֯�����µ���Ա��Ϣ(������ְ)
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeColl getAllEmployeeInfoByOrganId(String organId) throws DataAccessException;
	/**
	 * ��ѯĳ��ְ���µ�������Ա��Ϣ(��������֯����)(������ְ)
	 * @param dutyId
	 * @return EmployeeColl
	 * @throws DataAccessException
	 */
	public EmployeeColl getAllEmployeeInfoByDutyId(int dutyId) throws DataAccessException;
	/**
	 * ���ݵ�½�˺ŵõ�ְԱ��Ϣ
	 * @param workNo
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeVO getEmployeeInfoByWorkNo(String workNo) throws DataAccessException;
	/**
     * ��������ģ����ѯְԱ��Ϣ
     * @param name
     * @return
     * @throws DataAccessException
     */
     public EmployeeColl getEmployeeInfoByName(String name,int cityLevel) throws DataAccessException;
	/**
	 * ���ݵ�½�˺�ģ����ѯ
	 * @param workNo
	 * @return EmployeeColl
	 * @throws DataAccessException
	 */
	public EmployeeColl getEmployeeInfoLikeWorkNo(String workNo) throws DataAccessException;
	/**
	 * ���ݽ�ɫId,�õ�ʹ�øý�ɫ�Ĳ���Ա����
	 * @param roleId
	 * @return EmployeeColl
	 * @throws DataAccessException
	 */
	public EmployeeColl getEmployeeInfoFromEmployeeRoleRelation(int roleId) throws DataAccessException;
	/**
	 * ���²���Ա����,ͬʱ���������޸�ʱ��
	 * @param workNo
	 * @param password
	 * @throws DataAccessException
	 */
	public int doPasswordUpdate(String workNo,String workPwd) throws DataAccessException;
	
	/**
	 * ���²���Ա����,ͬʱ���������޸�ʱ��
	 * @param workNo
	 * @param password
	 * @throws DataAccessException
	 */
	public int doUpdatePassWord(String workNo,String workPwd) throws DataAccessException;
	/**
	 * ���Ӳ���Ա
	 * @param employeeVO
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddEmployee(EmployeeVO employeeVO) throws DataAccessException;
	/**
	 * ���������޸Ĳ���Ա
	 * @param employeeVO
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyEmployeeById(EmployeeVO employeeVO) throws DataAccessException;
	/**
	 * ɾ������Ա
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteEmployeeById(String employeeId) throws DataAccessException;
    
    /**
     * �õ�ĳ��֯���������еļ�ְ��Ա��������ְ��
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getPartTimeEmployeeInfoByOrganId(String organId) throws DataAccessException;
    
    /**
	 * ���ݵ�½�˺ŵõ�ְԱ��Ϣ
	 * @param workNo
	 * @return
	 * @throws DataAccessException
	 */
	public EmployeeVO getEmployeeInfoByWorkNoFilter(String workNo,String employeeId,int areaLevel,int adminType) throws DataAccessException;
	/**
     * ��������ģ����ѯְԱ��Ϣ
     * @param name
     * @return
     * @throws DataAccessException
     */
     public EmployeeColl getEmployeeInfoByNameFilter(String name,String employeeId,int areaLevel,int adminType) throws DataAccessException;
    
     /**
      * �õ���֯����ְԱ�б�
      * @param  EmployeeColl
      * @return
      * @throws ServiceException
      */
     //NEW��ȡ���������������
     public int getEmployeeRowCount(String areaId, String organId, String employeeId, int areaLevel, int adminType) throws DataAccessException;
     
     public EmployeeColl getEmployeeInfoFilter(String areaId, String organId, 
    		 String employeeId, int areaLevel, int adminType) throws DataAccessException;
     //NEW���ý������ҳ��ʽȡ����
     public EmployeeColl getEmployeeInfoFilter(String areaId, String organId, 
    		 String employeeId, int areaLevel, int adminType,
    		 	int startRow,int endRow) throws DataAccessException;
     /**
      * ����ĳ��ϵͳ�������û�
      * @param systemId
      * @return
      * @throws DataAccessException
      */
     public EmployeeColl getEmployeeCollBySystemId(String systemId) throws DataAccessException;
     
     /**
      * �õ���������֮�����������ְԱ
      * @param level1
      * @param level2
      * @return
      * @throws DataAccessException
      */
     public EmployeeColl getEmployeeByAreaLevel(int level1, int level2) throws DataAccessException;
     
     /**
      * �õ�������Ա����
      * @param dealerId
      * @return
      * @throws DataAccessException
      */
     public EmployeeColl getDealerEmployee(String dealerId, int areaLevel,int adminType, String employeeId) throws DataAccessException;
     
     public EmployeeColl getDealerEmployee(String dealerId, int areaLevel, int adminType, String employeeId, int beginRow, int endRow) throws DataAccessException;
     
     public int getDealerEmployeeRowCount(String dealerId, int areaLevel, int adminType, String employeeId) throws DataAccessException;
     
     
     /**
      * ������������������Ա��Ϣ
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
      * ���ݹ��Ų�����Ա��Ϣ
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
 	 * ���ݵ�½�˺ŵõ�ְԱ��Ϣ -- Ϊ����ϵͳ�ṩ
 	 * @param workNo
 	 * @return
 	 * @throws DataAccessException
 	 */
 	public EmployeeVO getEmployeeInfoByWorkNoFilterForChnl(String workNo,String employeeId,int areaLevel,int adminType) throws DataAccessException;

	/**
     * ��������ģ����ѯְԱ��Ϣ -- Ϊ����ϵͳ�ṩ
     * @param name
     * @return
     * @throws DataAccessException
     */
     public EmployeeColl getEmployeeInfoByNameFilterForChnl(String name,String employeeId,int areaLevel,int adminType) throws DataAccessException;

     /**
      * �õ�����ת��Ȩ������Ա�б�
      * @param areaId
      * @param employeeId
      * @param adminType
      * @return
      */
     public EmployeeColl getDeliverEmployee(String areaId, String employeeId, int adminType) throws DataAccessException;

     /**
      * �ύ,��fromId��������Ա�������ֶ��޸�ΪtoId
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
      * ȡ��Ȩ��΢��������
      * @param employeeId
      * @return
      * @throws DataAccessException
      */
     public int cancelInching(String employeeId) throws DataAccessException;
     /**
      * ȡ��Ȩ��΢��������,��������Ȩ��΢��������Ȩ��΢��
      * @param employeeId
      * @return
      * @throws DataAccessException
      */
     public String undoPowerAdjust(String employeeId,String[] powerType) throws DataAccessException;
     
  	/**
  	 * У����֯������ְԱ�Ƿ��ڹ������д��ڹ�����û����� ΪȨ���ṩ�ӿڳ���
  	 * @param paramId
  	 * @param type
  	 * @return
  	 * @throws DataAccessException
  	 */
  	public int checkOrgan(String paramId,int type)throws DataAccessException;
  	/**
  	 * �õ�����΢������ְԱ��Ϣ����
  	 * @return
  	 * @throws DataAccessException
  	 */
  	public List getPowerAdjustEmpColl() throws DataAccessException;
  	
  	/**
     * ͬ��ͳһ��֤ƽ̨�����ְԱ��Ϣ
     * @param employeeInfo
     * @return
     * @throws ServiceException
     */
    public EmployeeInfoResp doSynFromAuthPlat(EmployeeInfoReq employeeInfo) throws DataAccessException;
    
    /**
     * �õ���ͳһ��֤ϵͳͬ������ְԱ��Ϣ
     * @return
     * @throws DataAccessException
     */
    public  List getEmployeeReq(int startNum, int endNum) throws DataAccessException;
    
    public int getTotalRowsOfEmpReq() throws DataAccessException;
    
    public int doDeleteEmpReq(String workNo) throws DataAccessException;
    
    public Vector getEmpReqVector() throws DataAccessException;
    
    /**
     * ɾ��ְԱʱȡ������������
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
     * �õ��Զ����ɵĹ���
     * @return
     * @throws DataAccessException
     */
    public String getAutoWorkNo() throws DataAccessException;
    
    public String getCityShortName(String cityCode )throws DataAccessException;
    
    public void doUpdatePartyId(String employeeId, String partyId) throws DataAccessException;
    
    /**
     * �õ�ָ�����ŵ����м�ְ����
     * @param level1
     * @param level2
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getPtEmployee(OrganColl organColl) throws DataAccessException;
}
