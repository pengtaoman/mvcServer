package com.neusoft.om.dao.dealer;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-12-21
 * @author zhaof@neusoft.com
 * @version
 */

public class DealerTypeColl extends ObjectCollection { 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
		增加一个 DealerTypeVO 对象 
	*/ 
	public void addDealerTypeVO(DealerTypeVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 DealerTypeVO 对象 
	*/ 
	public DealerTypeVO getDealerType(int index) {
		return (DealerTypeVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 DealerTypeVO 对象 
	*/ 
	public void addDealerTypeResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			DealerTypeVO vo = new DealerTypeVO(); 
			vo.setAttribute(resultSet);
			addDealerTypeVO (vo);
		}
	}
	
	public DealerTypeVO getDealerTypeById(int id){
		for(int i=0; i < this.getRowCount(); i++){
			DealerTypeVO vo = this.getDealerType(i);
			int typeId = vo.getDealerType();
			if(typeId == id){
				return vo;
			}
		}
		return null;
	}

}
