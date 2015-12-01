package com.neusoft.om.dao.dealer;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface DealerDAO extends BaseDao{
	
	/**
	 * ����id�õ�dealer��Ϣ
	 * @param dealerId
	 * @return
	 * @throws DataAccessException
	 */
	public DealerVO getDealerById(String dealerId) throws DataAccessException;
	
	/**
	 * �õ�����ĳ��֯������dealer����
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public DealerColl getDealerCollByOrganId(String organId) throws DataAccessException;
	
	public DealerTypeVO getDealerTypeById(int id) throws DataAccessException;
	
	public DealerTypeColl getAllDealerType() throws DataAccessException;
	
	public DealerStructureColl getDealerStructureColl() throws DataAccessException;
	
	public DealerColl getDealerCollByStruct(String structId, String organId,String dealerName) throws DataAccessException; 
	
	public DealerColl getDealerCollByOrganIdDealerName(String organId, String dealerName) throws DataAccessException;
}
