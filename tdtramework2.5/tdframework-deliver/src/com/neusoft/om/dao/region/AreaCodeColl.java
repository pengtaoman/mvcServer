package com.neusoft.om.dao.region;

import java.sql.ResultSet;
import java.sql.SQLException;
import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-01
 * @author renh
 * @version 
 */
public class AreaCodeColl extends ObjectCollection {

	public void addAreaCodeVO(AreaCodeVO vo){
		addElement(vo);
	}
	
	public void addAreaCodeVO(int index,AreaCodeVO vo){
		addElement(index,vo);
	}
	/**
	 * �����кŻ�ȡarea
	 * @param index
	 */
	public AreaCodeVO getAreaCodeVO(int index) {
		return (AreaCodeVO)getElement(index);
	}
	
	/**
	 * �û�ResultSet�������Ӷ��OrganPersonVO ����
	 */
	public void addAreaCode(ResultSet resultSet) throws SQLException {
		while (resultSet.next()) {
			AreaCodeVO vo = new AreaCodeVO();
			vo.setAttribute(resultSet);
			addAreaCodeVO(vo);
		}
	}
	
}
