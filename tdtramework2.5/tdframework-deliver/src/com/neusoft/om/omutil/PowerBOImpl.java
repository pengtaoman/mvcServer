package com.neusoft.om.omutil;

import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.page.PageDAO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

public class PowerBOImpl implements PowerBO{
	
	PageDAO pageDAO;
	MenuDAO menuDAO;
	
	public void setPageDAO(PageDAO pageDAO) {
		this.pageDAO = pageDAO;
	}

	public void setMenuDAO(MenuDAO menuDAO) {
		this.menuDAO = menuDAO;
	}

	public boolean haveRightByPageLink(String employeeId, String pageLink) throws ServiceException{
		boolean have = false;
		try{
			have = pageDAO.ifHaveRightForOther(employeeId, pageLink);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerBOImpl--haveRightByPageLink(String employeeId, String pageLink):"+e.getMessage());
			throw new ServiceException(e);
		}
		return have;
		
	}
	
	public boolean haveRightByMenuId(String employeeId, String menuId) throws ServiceException{
		boolean have = false;
		try{
			MenuVO menuVO = menuDAO.getMenuById(menuId);
			if(menuVO == null || menuVO.getMenuId() == null || menuVO.getMenuId().equals("")){ //���om_menu_t��û����������˵���Ĭ��Ϊ��Ȩ��
				have = true;
			}else if(menuVO.getInuse() == 0){//��������õ�����Ϊͣ��״̬����Ϊ���ɼ���
				have = false;
			}else{			
				have = menuDAO.getEmployeePowerInfo(employeeId, menuId);
			}			
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerBOImpl--haveRightByPageLink(String employeeId, String pageLink):"+e.getMessage());
			throw new ServiceException(e);
		}
		return have;
		
	}

}
