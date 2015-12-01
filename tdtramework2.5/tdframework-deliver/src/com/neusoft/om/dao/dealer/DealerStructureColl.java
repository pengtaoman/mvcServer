package com.neusoft.om.dao.dealer;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class DealerStructureColl extends ObjectCollection{
	private static final long serialVersionUID = 1L;

	/** 
		增加一个 DealerTypeVO 对象 
	*/ 
	public void addDealerStructureVO(DealerStructureVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 DealerTypeVO 对象 
	*/ 
	public DealerStructureVO getDealerStructure(int index) {
		return (DealerStructureVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 DealerTypeVO 对象 
	*/ 
	public void addDealerStructureResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			DealerStructureVO vo = new DealerStructureVO(); 
			vo.setAttribute(resultSet);
			addDealerStructureVO (vo);
		}
	}
	
	public DealerStructureVO getDealerStructureById(String id){
		for(int i=0; i < this.getRowCount(); i++){
			DealerStructureVO vo = this.getDealerStructure(i);
			String structId = vo.getStructId();
			if(structId.trim().equals(id)){
				return vo;
			}
		}
		return null;
	}
}
