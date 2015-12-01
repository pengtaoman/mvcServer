package com.neusoft.om.omutil;

import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.tdframework.exception.ServiceException;

public class OmOrganUtilBOImpl implements OmOrganUtilBO{

	private OmOrganUtilDAO organUtilDAO;
	private EmployeeDAO employeeDAO;
	private OrganDAO organDAO;
	private AreaDAO areaDAO;
	/**
	 * �������ԱID�����ظò���Ա�ɼ���������֯������Ϣ
	 * ����ԱȨ�޷�Ϊ����
	 * ���Ȩ�޵Ŀɼ����������ڲ��ţ��뱾�����ڲ���ƽ�������parent��Ϊ����ƽ����ʾͬһ�����׵��ֵܣ����parentΪ�գ�
	 * 				��ƽ����ʾareaId��ͬ��parentΪ�յĲ��ţ�������Щ��֯�������¼�������֯����
	 * �е�Ȩ�޵Ŀɼ����������ڲ��ż����¼����еĲ���
	 * ��СȨ�޵Ŀɼ����������ڲ���
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getOrganCollByAuthId(String employeeId) throws ServiceException{
		OrganColl coll = new OrganColl();
		//���ȵõ���ǰ����Ա�����ݽ�ɫ����Ӧ����֯����Ȩ�ޣ���ʼ�����ݣ�1����Ȩ��2����ͨ��3������		
		int paramId = 1000;
		paramId=organUtilDAO.getOrganParamId(employeeId);
		if(paramId == 1000){
			paramId = 2; //���û���������ݽ�ɫ��Ĭ��Ϊ��ͨ
		}
		String organId = getOrganId(employeeId);
		if(paramId == 1){//��Ȩ
			String parentOrganId = organDAO.getOrganInfoById(organId).getParentOrganId();
			if( parentOrganId == null || parentOrganId.equals("")){
				coll = organUtilDAO.getSameAndChildPrtIsNull(organId);				
			}else{
				coll = organUtilDAO.getSameLevelAndChildOrgan(organId);
			}
			
		}else if(paramId == 2){//��ͨ
			coll = organUtilDAO.getChildOrganColl(organId);
		}else if(paramId == 3){//����
			coll = organDAO.getOrganInfo(organId);
		}		
		return coll;
	}

	private String getOrganId(String employeeId) {
		EmployeeVO empVO = new EmployeeVO();
		empVO = employeeDAO.getEmployeeInfoById(employeeId);
		String organId = "";
		if(empVO != null){
			organId = empVO.getOrganId();
		}
		return organId;
	}
	
	/**
	 * �������ԱID�����ظò���Ա�ɼ��������г�����Ϣ
	 * ����ԱȨ�޷�Ϊ����
	 * ���Ȩ�޵Ŀɼ������������г������뱾�������г���ƽ�������parent��Ϊ����ƽ����ʾͬһ�����׵��ֵܣ����parentΪ�գ�
	 * 				��ƽ����ʾareaId��ͬ��parentΪ�յ��г�����������Щ�г������¼������г���
	 * �е�Ȩ�޵Ŀɼ������������г��������¼����е��г���
	 * ��СȨ�޵Ŀɼ������������г���
	 * ǰ�᣺��ǰ����Ա�����Ĳ���һ�����г������Ͳſ���
	 * @param employeeId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getMarketCollByAuthId(String employeeId, String cityCode) throws ServiceException{
		OrganColl coll = new OrganColl();		
		//���ȵõ���ǰ����Ա�����ݽ�ɫ����Ӧ����֯����Ȩ�ޣ���ʼ�����ݣ�1����Ȩ��2����ͨ��3������		
		int paramId = 1000;
		paramId=organUtilDAO.getOrganParamId(employeeId);
		if(paramId == 1000){
			paramId = 2; //���û���������ݽ�ɫ��Ĭ��Ϊ��ͨ
		}
		String organId = getOrganId(employeeId);
		boolean isMarket = isMarket(organId);
		String parentOrganId = getParentOrganId(organId);
		int areaLevel = getAreaLevel(employeeId);
		int cityCodeLevel = getCityCodeLevel(cityCode);
		if(paramId == 1){//��Ȩ
			if(areaLevel <= 2 && cityCodeLevel >= 3){ //����ʡ����Ȩ���ţ���ѡ���city_code�ǵ��б�Ŷ�����ʡ�ݱ�š��򷵻ظõ��������г�����
				coll = organUtilDAO.getAllCityMarket(cityCode);
			}else{//����ʡ����Ȩ���ţ�ѡ���city_codeΪʡ�ݱ��ʱ��������ʡ���г����������г��������ʡ����Ȩ�����߼���ͬ��
				if(parentOrganId != null &&  !parentOrganId.equals("")){
					coll = organUtilDAO.getSameLevelAndChildMarket(organId, cityCode);
				}else{
					coll = organUtilDAO.getSameAndCldMarketPrtIsNull(organId, cityCode);				
				}
			}
		}else if(paramId == 2){//��ͨ
			coll = organUtilDAO.getChildMarketColl(organId);
		}else if(paramId == 3){//����
			if(isMarket){
				coll = organDAO.getOrganInfo(organId);
			}			
		}
		
		return coll;
	}

	private String getParentOrganId(String organId) {
		OrganVO vo = organDAO.getOrganInfoById(organId);		
		String parentOrganId = "";
		if(vo != null){
			parentOrganId = vo.getParentOrganId();
		}
		return parentOrganId;
	}
	private int  getAreaLevel(String employeeId){
		EmployeeVO vo = employeeDAO.getEmployeeInfoById(employeeId);
		String areaId = vo.getAreaId();
		int areaLevel = organUtilDAO.getAreaLevel(areaId);
		return areaLevel;
	}
	
	private int getCityCodeLevel(String cityCode){
		AreaVO vo = areaDAO.getAreaByCityCode(cityCode);
		int cityCodeLevel = vo.getAreaLevel();
		return cityCodeLevel;
	}

	private boolean isMarket(String organId){
		boolean isMarket = false;
		int departmentKind = organUtilDAO.getDepartmentKind(organId);
		if(departmentKind == 2 ){
			isMarket = true;
		}
		return isMarket;
	}
	/**
	 * ���ز���Ա�������¼��г�����Ϣ,��ͬcity_code���г���
	 */
	public OrganColl getChildMarketCollByAuthId(String employeeId, String cityCode) throws ServiceException{
		String organId = getOrganId(employeeId);
		OrganColl coll = organUtilDAO.getSameCityChildMarketColl(organId, cityCode);
		return coll;
	}
	
	/**
	 * �����г���ID�������г����������¼��г�����Ϣ
	 */
	public OrganColl getChildMarketCollByOrgId( String organId, String cityCode ) throws ServiceException{
		OrganColl coll = organUtilDAO.getChildMarketColl(organId);
		return coll;
	}
	
	/**
	 * �����г���ID�������г���������ͬ�����г�����Ϣ(�˴�ͬ������ָ���г������������AREA_LEVEL��ͬ�����ҹ�����ͬһ���г���)\
	 * �����������������г�����
	 * ��Ҫcity_code��ͬ��
	 * @param organId
	 * @return
	 * @throws ServiceException
	 */
	public OrganColl getSameLevelAndCldOrgColl(String organId, String cityCode) throws ServiceException{
		String parentOrganId =  getParentOrganId(organId);
		OrganColl coll = new OrganColl();
		if(parentOrganId != null && !parentOrganId.trim().equals("")){
			coll = organUtilDAO.getSameLevelAndChildMarket(organId);
		}else{
			coll = organUtilDAO.getSameAndCldMarketPrtIsNull(organId);
		}
		return coll;
	}

	public void setOrganUtilDAO(OmOrganUtilDAO organUtilDAO) {
		this.organUtilDAO = organUtilDAO;
	}

	public void setEmployeeDAO(EmployeeDAO employeeDAO) {
		this.employeeDAO = employeeDAO;
	}

	public void setOrganDAO(OrganDAO organDAO) {
		this.organDAO = organDAO;
	}

	public void setAreaDAO(AreaDAO areaDAO) {
		this.areaDAO = areaDAO;
	}
	
	

}
