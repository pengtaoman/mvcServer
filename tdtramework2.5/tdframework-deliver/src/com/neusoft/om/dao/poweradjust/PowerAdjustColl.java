package com.neusoft.om.dao.poweradjust;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2004-12-21
 * @author ren.hui@neusoft.com
 * @version
 */

public class PowerAdjustColl extends ObjectCollection { 
	/** 
		����һ�� PowerAdjustVO ���� 
	*/ 
	public void addPowerAdjustVO(PowerAdjustVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� PowerAdjustVO ���� 
	*/ 
	public PowerAdjustVO getPowerAdjust(int index) {
		return (PowerAdjustVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� PowerAdjustVO ���� 
	*/ 
	public void addPowerAdjustResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			PowerAdjustVO vo = new PowerAdjustVO(); 
			vo.setAttribute(resultSet);
			addPowerAdjustVO (vo);
		}
	}

}