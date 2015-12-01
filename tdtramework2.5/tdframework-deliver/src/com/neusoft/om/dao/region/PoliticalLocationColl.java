package com.neusoft.om.dao.region;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class PoliticalLocationColl  extends ObjectCollection {
	public void addPoliticalLocationVO(PoliticalLocationVO vo){
		addElement(vo);
	}
	
	public void addPoliticalLocationVO(int index,PoliticalLocationVO vo){
		addElement(index,vo);
	}
	/**
	 * 根据行号获取area
	 * @param index
	 */
	public PoliticalLocationVO getPoliticalLocationVO(int index) {
		return (PoliticalLocationVO)getElement(index);
	}
	
	/**
	 * 用户ResultSet对象增加多个OrganPersonVO 对象
	 */
	public void addPoliticalLocation(ResultSet resultSet) throws SQLException {
		while (resultSet.next()) {
			PoliticalLocationVO vo = new PoliticalLocationVO();
			vo.setAttribute(resultSet);
			addPoliticalLocationVO(vo);
		}
	}
}
