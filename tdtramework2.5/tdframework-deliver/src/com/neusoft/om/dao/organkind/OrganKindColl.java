package com.neusoft.om.dao.organkind;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: OrganKindColl
 * Description:
 * Company: neusoft
 * Date: 2004-12-20
 * @author ren.hui@neusoft.com
 * @version
 */

public class OrganKindColl extends ObjectCollection { 
	/** 
		增加一个 OrganKindVO 对象 
	*/ 
	public void addOrganKindVO(OrganKindVO vo) {
		addElement(vo);
		addElement(new Integer(vo.getOrganKind()),vo);
	}

	/** 
		按照行号获取一个 OrganKindVO 对象 
	*/ 
	public OrganKindVO getOrganKind(int index) {
		return (OrganKindVO)getElement(index);
	}
	/**
	 * 根据组织机构类型获得OrganKindVO对象
	 * @param organKind
	 * @return
	 */
	public OrganKindVO getOrganKindByKind(int organKind){
		return (OrganKindVO)getElement(new Integer(organKind));
	}
	/** 
		用户ResultSet对象增加多个 OrganKindVO 对象 
	*/ 
	public void addOrganKindResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			OrganKindVO vo = new OrganKindVO(); 
			vo.setAttribute(resultSet);
			addOrganKindVO (vo);
		}
	}

}