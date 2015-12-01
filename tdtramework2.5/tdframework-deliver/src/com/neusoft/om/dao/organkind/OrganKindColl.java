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
		����һ�� OrganKindVO ���� 
	*/ 
	public void addOrganKindVO(OrganKindVO vo) {
		addElement(vo);
		addElement(new Integer(vo.getOrganKind()),vo);
	}

	/** 
		�����кŻ�ȡһ�� OrganKindVO ���� 
	*/ 
	public OrganKindVO getOrganKind(int index) {
		return (OrganKindVO)getElement(index);
	}
	/**
	 * ������֯�������ͻ��OrganKindVO����
	 * @param organKind
	 * @return
	 */
	public OrganKindVO getOrganKindByKind(int organKind){
		return (OrganKindVO)getElement(new Integer(organKind));
	}
	/** 
		�û�ResultSet�������Ӷ�� OrganKindVO ���� 
	*/ 
	public void addOrganKindResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			OrganKindVO vo = new OrganKindVO(); 
			vo.setAttribute(resultSet);
			addOrganKindVO (vo);
		}
	}

}