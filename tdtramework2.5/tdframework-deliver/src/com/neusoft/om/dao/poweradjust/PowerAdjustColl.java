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
		增加一个 PowerAdjustVO 对象 
	*/ 
	public void addPowerAdjustVO(PowerAdjustVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 PowerAdjustVO 对象 
	*/ 
	public PowerAdjustVO getPowerAdjust(int index) {
		return (PowerAdjustVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 PowerAdjustVO 对象 
	*/ 
	public void addPowerAdjustResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			PowerAdjustVO vo = new PowerAdjustVO(); 
			vo.setAttribute(resultSet);
			addPowerAdjustVO (vo);
		}
	}

}