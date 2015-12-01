package com.neusoft.om.interfase.ebisp.data;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-11-17
 * @author ren.hui@neusoft.com
 * @version
 */

public class IconColl extends ObjectCollection { 
	
	private static final long serialVersionUID = 1L;
	/** 
		����һ�� IconVO ���� 
	*/ 
	public void addIconVO(IconVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� IconVO ���� 
	*/ 
	public IconVO getIcon(int index) {
		return (IconVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� IconVO ���� 
	*/ 
	public void addIconResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			IconVO vo = new IconVO(); 
			vo.setAttribute(resultSet);
			addIconVO (vo);
		}
	}

}