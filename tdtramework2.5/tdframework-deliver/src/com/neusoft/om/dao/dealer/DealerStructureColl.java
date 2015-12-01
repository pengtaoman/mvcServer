package com.neusoft.om.dao.dealer;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class DealerStructureColl extends ObjectCollection{
	private static final long serialVersionUID = 1L;

	/** 
		����һ�� DealerTypeVO ���� 
	*/ 
	public void addDealerStructureVO(DealerStructureVO vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� DealerTypeVO ���� 
	*/ 
	public DealerStructureVO getDealerStructure(int index) {
		return (DealerStructureVO)getElement(index);
	}

	/** 
		�û�ResultSet�������Ӷ�� DealerTypeVO ���� 
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
