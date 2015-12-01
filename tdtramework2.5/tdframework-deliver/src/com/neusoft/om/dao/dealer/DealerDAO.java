package com.neusoft.om.dao.dealer;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface DealerDAO extends BaseDao{
	
	/**
	 * 根据id得到dealer信息
	 * @param dealerId
	 * @return
	 * @throws DataAccessException
	 */
	public DealerVO getDealerById(String dealerId) throws DataAccessException;
	
	/**
	 * 得到属于某组织机构的dealer集合
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
