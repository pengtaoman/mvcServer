package com.neusoft.om.dao.dealer;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class DealerColl extends ObjectCollection { 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
		增加一个 DealerVO 对象 
	*/ 
	public void addDealerVO(DealerVO vo) {
		addElement(vo);
	}

	/** 
		按照行号获取一个 DealerVO 对象 
	*/ 
	public DealerVO getDealer(int index) {
		return (DealerVO)getElement(index);
	}

	/** 
		用户ResultSet对象增加多个 DealerVO 对象 
	*/ 
	public void addDealerResultSet(ResultSet resultSet) throws SQLException {
		while(resultSet.next()) {
			DealerVO vo = new DealerVO(); 
			vo.setAttribute(resultSet);
			addDealerVO (vo);
		}
	}
   
	public DealerVO getDealerById(String id){
		if(id != null && !id.trim().equals("")){
			for(int i=0; i<this.getRowCount(); i++){
				DealerVO dealerVO = this.getDealer(i);
				String dealerId = dealerVO.getDealerId();
				if(dealerId.trim().equals(id.trim())){
					return dealerVO;
				}
			}
		}else{
			return null;
		}
		return null;
	}
}
