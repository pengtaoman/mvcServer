package com.neusoft.om.dao.mac;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface ParameterDAO extends BaseDao{
	
	public ParamObjectCollection getDealerArea(String areaId) throws DataAccessException;
	
	public ParamObjectCollection getDealerOrgan(String areaId) throws DataAccessException;
	
	public ParamObjectCollection getDealer(String organId) throws DataAccessException;
}
