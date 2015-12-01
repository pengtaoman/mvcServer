/*
 * <p>Title:       AuthBOExt��ʵ����</p>
 * <p>Description: Ϊ�ں�4.5ҵ������ӵĵõ�session������</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
 */
package com.neusoft.om.interfase.authorize;

import java.util.Properties;

import com.neusoft.crm.channel.outInterface.om.dao.OmQueryDAO;
import com.neusoft.crm.channel.outInterface.om.data.DealerVO;
import com.neusoft.om.dao.city.CityDAO;
import com.neusoft.om.dao.department.DepartmentDAO;
import com.neusoft.om.dao.operator.OperatorDAO;
import com.neusoft.popedom.City;
import com.neusoft.popedom.Department;
import com.neusoft.popedom.Operator;
import com.neusoft.tdframework.authorization.AuthBOExt;
import com.neusoft.tdframework.authorization.AuthVOExt;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/**
 * 
 * ��AuthBOExtImpl.java��ʵ��������TODO ��ʵ������ 
 *
 * @author         zhaofan zhaof@neusoft.com
 * @version        1.0
 * Date            2006-7-12
 * @see            java.lang.Class
 * History:
 *    <author>     <time>      <version>      <desc>
 */
public class AuthBOExtImpl implements AuthBOExt
{
	private CityDAO cityDAO;
	private OperatorDAO operatorDAO;
	private DepartmentDAO departmentDAO;
	private OmQueryDAO omQueryDAOInterface;
	
    public void setCityDAO(CityDAO cityDAO) {
		this.cityDAO = cityDAO;
	}

	public void setOperatorDAO(OperatorDAO operatorDAO) {
		this.operatorDAO = operatorDAO;
	}

	public void setDepartmentDAO(DepartmentDAO departmentDAO) {
		this.departmentDAO = departmentDAO;
	}

	public void setOmQueryDAOInterface(OmQueryDAO omQueryDAOInterface) {
		this.omQueryDAOInterface = omQueryDAOInterface;
	}

	/**
     * ���ݹ��ŵõ�session��Ҫ����Ϣ
     * @param workNo  ְԱ��½�ʺ�
     * @param workPwd
     * @return
     * @throws ServiceException
     */
    public AuthVOExt getAuthorizeInfo(String workNo) throws ServiceException
    {
        AuthVOExtImpl authExtVO = new AuthVOExtImpl();
        Operator operator = operatorDAO.getOperator(workNo);
        Properties operatorPro = new Properties();        
        try {
            //���ݲ���Ա�ʺŻ�ò���Ա�йص�����Ϣ
            operatorPro = operatorDAO.getOperatorInfo(workNo);            
        } catch (DataAccessException e) {
        	SysLog.writeLogs("om", GlobalParameters.ERROR,
					"AuthBOExtImpl--getAuthorizeInfo:" + e.getMessage());
        }
        City city =  cityDAO.getCityByRegion(operator.getRegion_code());
        String account = operator.getAccount();
        int personLevel = operator.getPerson_level();
        String department = operator.getDepartment();        
        String cityCode = operatorPro.getProperty("City_code");
        String provinceCode = operatorPro.getProperty("Province_code");
        String centerCode = operatorPro.getProperty("Center_code");
        String organCode = operatorPro.getProperty("Organ_code");
        String regionCode = operatorPro.getProperty("Region_code");
        
        String cityName = city.getCity_name();;
        int cityLevel = city.getCity_level();
        String areaCode = city.getArea_code();
        String parentCity = city.getSubcompany_code();    
        String departmentName = "";
        String dealerId = operator.getDepartment();
//        if(dealerId != null && !dealerId.equals("")){
//        	DealerVO dealerVO = omQueryDAOInterface.doGetDealerByDealer(dealerId);
//        	departmentName = dealerVO.getDealer_name();
//        }      
        authExtVO.setAccount(account);
        authExtVO.setAreaCode(areaCode);
        authExtVO.setCenterCode(centerCode);
        authExtVO.setCityCode(cityCode);
        authExtVO.setCityLevel(cityLevel);
        authExtVO.setCityName(cityName);
        authExtVO.setDepartment(department);
        authExtVO.setDepartmentName(departmentName);
        authExtVO.setOrganCode(organCode);
        authExtVO.setParentCity(parentCity);
        authExtVO.setPersonLevel(personLevel);
        authExtVO.setProvinceCode(provinceCode);
        authExtVO.setRegionCode(regionCode);
        authExtVO.setWorkNo(workNo); 
        authExtVO.setParamRoleId("-100"); //Ϊ����ҵ��ϵͳ�����ӵ�Ĭ��ֵ,��ʵ��������
        return authExtVO;
    }

}
