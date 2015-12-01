package com.neusoft.om.dao.servicekind;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface ServiceKindDAO extends BaseDao {
	
	public static final String BEAN = "serviceKindDAO";

	public int getServiceKind(String serviceID,String areaID) throws DataAccessException;
}
