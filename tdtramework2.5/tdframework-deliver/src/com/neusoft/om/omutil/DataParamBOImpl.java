package com.neusoft.om.omutil;

import java.util.ArrayList;
import java.util.List;

import com.neusoft.common.ParamObject;
import com.neusoft.common.ParamObjectCollection;
import com.neusoft.om.dao.dataParamRole.DataParamManageDAO;

public class DataParamBOImpl implements DataParamBO{
	
	DataParamManageDAO dataParamManageDAO;
	
	public void setDataParamManageDAO(DataParamManageDAO dataParamManageDAO) {
		this.dataParamManageDAO = dataParamManageDAO;
	}

	public List getShowableId(String employeeId, String tableName){
		List list = new ArrayList();
		String powerSizeFlag = dataParamManageDAO.getRolePowerFlag();
		int power_size_flag = Integer.parseInt(powerSizeFlag);
		int tableId = dataParamManageDAO.getTableIdByName(tableName);
		ParamObjectCollection paramColl = dataParamManageDAO.getParamDataColl(employeeId,tableId,power_size_flag,"true");
		if(paramColl != null && paramColl.getRowCount() > 0){
			for(int i=0; i <paramColl.getRowCount(); i++){
				ParamObject vo = paramColl.getParamObject(i);
				String dataInfo = vo.getFilterDataInfo();
				String[] ids = dataInfo.split(";");
				String id = ids[0];
				if(!id.equals("*")){
					list.add(id);
				}			
			}
		}
		return list;
	}

}
