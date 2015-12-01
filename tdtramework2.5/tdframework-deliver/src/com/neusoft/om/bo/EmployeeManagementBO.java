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
 * <p>Description: ʵ�ֲ���Աά�������нӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface EmployeeManagementBO extends BaseBO {
	public static final String BEAN = "employeeManagementFacade";
	/**
     *��ѯ��������������Ϣ
     * @param dealerId
	 * @return
	 * @throws ServiceException
     */
    public String getRegionCodeById(String dealerId) throws ServiceException;
	/**
	 * ����ְԱId�õ�ְԱ��Ϣ
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public EmployeeVO getEmployeeByEmployeeId(String employeeId) throws ServiceException;
	/**
	 * ���ݹ��ĵõ�ְԱ��Ϣ
	 * @param workNo
	 * @return
	 * @throws ServiceException
	 */
	 public EmployeeVO getEmployeeInfoByWorkNo(String workNo) throws ServiceException;
	
	 /**
     * ��������ģ����ѯְԱ��Ϣ
     * @param name
     * @return
     * @throws ServiceException
     */
     public EmployeeColl getEmployeeInfoByName(String name,int cityLevel) throws ServiceException;
	/**
	 * ���������ѯ��Ա��Ϣ
	 * @param mapData(key: areaId,organId,dutyId)
	 * @return EmployeeColl
	 * @throws ServiceException
	 */
	public EmployeeColl getEmployeeInfo(HashMap mapData) throws ServiceException;
	/**
	 * ����ְԱId�õ�ְԱ�Ľ�ɫ��Ϣ����(�������ܽ�ɫ�����ݽ�ɫ)
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public RoleColl getRoleInfoByEmployeeId(String employeeId) throws ServiceException;
	/**
	 * ����ְԱ����õ�����Ա��������Ľ�ɫ��Ϣ
	 * @param employeeId
	 * @return EmployeeDutyRelationColl
	 * @throws ServiceException
	 */
	public RoleColl getPermmitedRoleColl(String employeeId) throws ServiceException;
	
	/**
	 * ����ְԱ��ɫ��ϵ��Ϣ
	 * @param employeeId
	 * @return EmployeeDutyRelationColl
	 * @throws ServiceException
	 */
	public int doModifyRole(EmployeeRoleRelationColl employeeRoleRelationColl, String authId) throws ServiceException;
	
	/**
	 * ����ְԱId�õ�ְԱ��ְ����Ϣ����
	 * @param dutyId
	 * @return
	 * @throws ServiceException
	 */
	public DutyColl getDutyInfoByEmployeeId(String employeeId) throws ServiceException;
	/**
	 * ������֯����Id�õ�����֯�����µ�������Ա��Ϣ(���۵���)
	 * @param organId
	 * @return
	 * @throws ServiceException
	 */
	public EmployeeColl getEmployee(String organId) throws ServiceException;
	/**
	 * ����ְԱ���뵽ְԱ��ְ���ϵ���в������Ϣ
	 * @param employeeId
	 * @return EmployeeDutyRelationColl
	 * @throws ServiceException
	 */
	public EmployeeDutyRelationColl getEmployeeDutyRelationInfoByEmployeeId(String employeeId) throws ServiceException;
	/**
	 * ���ݹ��ĵõ�ְԱ��Ϣ
	 * @param workNo
	 * @return
	 * @throws ServiceException
	 */
	 public String getDealerNameInfo(String dealerId) throws ServiceException;	
	/**
	 * ���Ӳ���Ա��Ϣ
	 * ͬʱ��Ҫά��ְԱ-ְ���ϵ,ְԱ-��ɫ��ϵ,ְԱȨ������
	 * @param vo
	 * @return int 1:�ɹ� 0:ʧ��
	 * @throws ServiceException
	 */
	public long doAddEmployeeInfo(EmployeeVO employeeVO,HashMap map) throws  ServiceException;
	/**
	 * �޸Ĳ���Ա��Ϣ
	 * ����޸���֯����,ְ����Ϣ,��Ҫά��ְԱ-ְ���ϵ��,ְԱ-��ɫ��ϵ��,ְԱȨ�������.
	 * @param employeeVO
	 * @param oldOrganId
	 * @param oldDutyId
	 * @return int
	 * @throws ServiceException
	 */
	public int doModifyEmployeeInfo(EmployeeVO employeeVO,String oldOrganId,int oldDutyId,HashMap map) throws  ServiceException;
	/**
	 * ��Ҫά��ְԱ-ְ���ϵ,ְԱ-��ɫ��ϵ,ְԱȨ�������
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public int doDeleteEmployeeInfo(String employeeId,HashMap map) throws  ServiceException;

	/**
	 * �޸�����:
	 * �޸�����ͬʱ��Ҫ��������ʧЧ����
	 * �ӿ��ؿ��Ʊ��еõ����޸�����֮����,�������ʧЧ
	 * @param workNo
	 * @param workPwd
	 * @return
	 * @throws ServiceException
	 */
	public int doUpdatePassWord(String workNo,String workPwd) throws ServiceException;
	/**
	 * ����ָ�
	 * �޸�����ͬʱ��Ҫ��������ʧЧ����,�ӿ��ؿ��Ʊ��еõ����޸�����֮����,�������ʧЧ;
	 * ����ָ�Ϊ����Ա��¼�ʺţ������Ա��¼�ʺ�С��6λ��
	 * ���ڵ�¼�ʺź���0������λ;�����Ա��¼�ʺŴ���15λ����ȡǰ15λ;�»��߻�������0
	 * @param workNo
	 * @param workPwd
	 * @return
	 * @throws ServiceException
	 */
	public HashMap doRenewPassWord(String workNo) throws  ServiceException;
	/**
	 * ����ԱȨ��΢��
	 * strPowerInfoΪȨ�޹����ַ���
	 * �ַ����ĸ�ʽΪ �˵���ʶ+Ȩ�ޱ�ʶ(1��,2����)���˵�Ȩ��֮���÷ֺ�";"�ָ�
	 * @param employeeId
	 * @param strPowerInfo
	 * @return
	 * @throws ServiceException
	 */
	public int doPowerAdjust(String employeeId,String strPowerInfo) throws  ServiceException;
    
    /**
     * �õ�ĳ��֯���������еļ�ְ��Ա��������ְ��
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getPartTimeEmployeeInfoByOrganId(String organId) throws ServiceException;
    
    /**
     * �޸�ְԱ��Ϣ
     * @return
     * @throws ServiceException
     */
    public int doModifyEmployeeInfo(EmployeeVO employeeVO,boolean haveInOrgan) throws ServiceException;
   
     /**
      * ����ְԱId�õ�ְԱ��ɫ��Ӧ�����б�
      * @param employeeId
      * @return
      * @throws ServiceException
      */
     public EmployeeRoleRelationColl getEmployeeRoleRelationInfoByEmployeeId(String employeeId) throws ServiceException;
     
     /**
      * ͨ��ְԱ��ŵõ��䴴���Ľ�ɫ�б�
      * @param account
      * @return
      * @throws DataAccessException
      */
     public RoleColl getCreateRoleColl(String employeeId) throws ServiceException;
     
     /**
      * ͨ��employeeId�õ���ɷ���Ľ�ɫ�б�
      * @param employeeId
      * @return
      * @throws DataAccessException
      */
     public RoleColl getAssignableRoleColl(String employeeId) throws ServiceException;
     /**
      * ͨ��organId�õ�����֯���������е�ְԱ��Ϣ������ȫְ��Ա�ͼ�ְ��Ա
      * @param organId
      * @return
      * @throws ServiceException
      */
     public OrganEmployeeDisplayColl getAllOrganEmployeeInfo(String organId) throws ServiceException;
     
     //public SystemColl getSystemInfoByEmployeeId(String employeeId) throws ServiceException;
     
//     public MenuColl getMenuInfoByEmployeeId(String employeeId, String systemId) throws ServiceException;
     
    
     /**
      * �õ�ְԱ��Ȩʱ��չʾ��Ϣ�б����а�����ǰְԱ�ɷ���Ľ�ɫ�б����Щ��ɫ�е�Ȩ��ά��ְԱ�Ѿ����еĽ�ɫȨ�����ͣ�ʹ��Ȩ������Ȩ��
      * @param currentEmpId ��ǰ����Ա��employeeId
      * @param assignedEmpId ������ְԱ��employeeId
      * @return
      * @throws ServiceException
      */
     public EmployeeRoleDisplayColl getAssignDisplayColl(String currentEmpId, String assignedEmpId) throws ServiceException;
     
     /**
      * �õ�ְԱ��Ȩ������ɫʱ��չʾ��Ϣ�б����а�����ǰְԱ�ɷ���Ľ�ɫ�б����Щ��ɫ�е�Ȩ��ά��ְԱ�Ѿ����еĲ�����ɫȨ�����ͣ�ʹ��Ȩ������Ȩ��
      * @param currentEmpId ��ǰ����Ա��employeeId
      * @param assignedEmpId ������ְԱ��employeeId
      * @return
      * @throws ServiceException
      */
     public ParamRoleColl getParamRoleAssignDisplayColl(String currentEmpId, String assignedEmpId) throws ServiceException;
     
     /**
      * �޸�ְԱ�������ɫ��ϵ
      * @param employeeParamRoleRelationColl
      * @return int
      * @throws ServiceException
      */
     
     public int doModifyEmployeeParamRoleRelation(EmployeeParamRoleRelationColl employeeParamRoleRelationColl, String authId) throws ServiceException;
     
     
     
     public EmployeeVO getEmployeeByWorkNo(String workNo) throws ServiceException;
     
     /**
      * �õ�ְԱ�����ĺͱ�����Ľ�ɫ��Ϣ���ϣ�ר����ְԱ��ϸ��Ϣ�Ľ�ɫ����չʾ
      * @param employeeId
      * @return
      * @throws ServiceException
      */
     public OwnAndAssignedRoleDispColl getEmpOwnerAndAssingedRoleColl(String employeeId) throws ServiceException;
     
     public FuncRoleColl getFunRoleCollByEmployeeId(String employeeId) throws ServiceException;
     
     
     /**
 	 * ���ݹ��ĵõ�ְԱ��Ϣ
 	 * @param workNo
 	 * @return
 	 * @throws ServiceException
 	 */
 	 public EmployeeVO getEmployeeInfoByWorkNoFilter(String workNo,String employeeId,int areaLevel,int adminType) throws ServiceException;
 	
 	 /**
      * ��������ģ����ѯְԱ��Ϣ
      * @param name
      * @return
      * @throws ServiceException
      */
      public EmployeeColl getEmployeeInfoByNameFilter(String name,String employeeId,int areaLevel,int adminType) throws ServiceException;
      
      
      /**
       * �õ���֯����ְԱ�б�
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
       * �õ�������Ա��Ϣ����
       * @param dealerId
       * @param areaLevel
       * @param adminType
       * @param employeeId
       * @return
       */
      public EmployeeColl getDealerEmployee(String dealerId,int areaLevel,int adminType,String employeeId) throws ServiceException;
      /**
       * ��������ģ����ѯ����ְԱ��Ϣ
       * @param name
       * @return
       * @throws ServiceException
       */
       public EmployeeColl getDealerEmpByName(String name, String employeeId,int areaLevel,int adminType) throws ServiceException;
       
       public EmployeeColl getDealerEmployee(String dealerId,int areaLevel,int adminType,String employeeId, int beginRow, int endRow) throws ServiceException;
       
       public int getDealerEmployeeRowCount(String dealerId,int areaLevel,int adminType,String employeeId) throws ServiceException;
       
       /**
    	 * ���ݹ��ŵõ�����ְԱ��Ϣ
    	 * @param workNo
    	 * @return
    	 * @throws ServiceException
    	 */
        public EmployeeVO getDealerEmpByWorkNo(String workNo,String employeeId,int areaLevel,int adminType) throws ServiceException;
        /**
     	 * ���ݹ��ŵõ�ְԱ��Ϣ--����ר��
     	 * @param workNo
     	 * @return
     	 * @throws ServiceException
     	 */
     	 public EmployeeVO getEmployeeInfoByWorkNoFilterForChnl(String workNo,String employeeId,int areaLevel,int adminType) throws ServiceException;
     	 /**
          * ��������ģ����ѯְԱ��Ϣ--����ר��
          * @param name
          * @return
          * @throws ServiceException
          */
          public EmployeeColl getEmployeeInfoByNameFilterForChnl(String name,String employeeId,int areaLevel,int adminType) throws ServiceException;
          
          /**
           * �ж�ְԱ�Ƿ񱻷���������
           * @param employeeId ������ְԱ��employeeId
           * @return
           * @throws ServiceException
           */
          public boolean ifInGroup(String employeeId) throws ServiceException;
          
          public void doUpdatePartyId(String employeeId, String partyId) throws ServiceException;


}
