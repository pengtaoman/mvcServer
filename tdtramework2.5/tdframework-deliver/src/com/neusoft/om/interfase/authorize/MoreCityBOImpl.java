package com.neusoft.om.interfase.authorize;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.ServiceException;

public class MoreCityBOImpl implements MoreCityBO{

	private static final long serialVersionUID = 1L;
	EmployeeDAO employeeDAO;
	AreaDAO areaDAO;
	
	public void setAreaDAO(AreaDAO areaDAO) {
		this.areaDAO = areaDAO;
	}

	public void setEmployeeDAO(EmployeeDAO employeeDAO) {
		this.employeeDAO = employeeDAO;
	}


	public ParamObjectCollection getMoreCityColl(String employeeId) throws ServiceException{
		ParamObjectCollection coll = new ParamObjectCollection();
		EmployeeVO employeeVO = employeeDAO.getEmployeeInfoById(employeeId);
		int moreCity = employeeVO.getMoreCity(); //�õ�ְԱ�ġ��Ƿ�����������ҵ������ֵ
		String cityCode = employeeVO.getCityCode();//�õ�Ա�������ĵ��ж�Ӧ��city_code����
		moreCity =1;
		if(moreCity == 1){//�������������ҵ��
			AreaColl cityColl = areaDAO.getAllCity();
			if(cityColl != null && cityColl.getRowCount() > 0){
				for(int i=0; i < cityColl.getRowCount(); i++){
					ParamObject vo = new ParamObject();
					AreaVO areaVO = cityColl.getArea(i);
					vo.setId(areaVO.getCityCode());
					vo.setName(areaVO.getAreaName());
					coll.addParamObject(vo);
				}				
			}
		}else{//����ֵ����Ϊ�������������ҵ��
			AreaVO areaVO = areaDAO.getAreaByCityCode(cityCode);
			ParamObject vo = new ParamObject();
			vo.setId(areaVO.getCityCode());
			vo.setName(areaVO.getAreaName());
			coll.addParamObject(vo);
		}
		return coll;
	}

}
