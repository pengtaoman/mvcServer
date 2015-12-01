package com.neusoft.om.dao.servicekind;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.dao.TDBaseDAO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;

public class ServiceKindDAOImpl extends TDBaseDAO implements ServiceKindDAO{
	
	public int getServiceKind(String serviceID,String areaID) throws DataAccessException {
    	Connection con = null;
    	PreparedStatement pstm = null;
    	ResultSet rst = null;
    	StringBuffer sqlBuf= new StringBuffer();
    	StringBuffer sqlBuf2= new StringBuffer();
		sqlBuf.append("select a.service_kind from "); 
    	sqlBuf.append("bb_service_relation_t a, bs_service_kind_t b ");
    	sqlBuf.append("where a.service_kind = b.service_kind ");
		sqlBuf.append("and a.service_id in (?,?) and a.if_valid = 1 "); 
		sqlBuf.append("and b.service_flag = 3 ");                           
		sqlBuf.append("and b.if_open = 1 and rownum = 1"); 
		
    	sqlBuf2.append("select a.service_kind from "); 
    	sqlBuf2.append("bb_bus_temp_t a, bs_service_kind_t b ");
    	sqlBuf2.append("where a.service_kind = b.service_kind ");
		sqlBuf2.append("and a.service_id in (?,?) "); 
		sqlBuf2.append("and b.service_flag = 3 ");                           
		sqlBuf2.append("and b.if_open = 1 and rownum = 1"); 
		
    	int iIndex = 1;
    	int serviceKind = 0;
    	try {
	    	con = getConnection();
	    	pstm = con.prepareStatement(sqlBuf.toString());
	    	pstm.setString(iIndex++, serviceID);
	    	pstm.setString(iIndex++, areaID + serviceID );
	    	rst = pstm.executeQuery(); 
	    	if(rst.next()){
	    		serviceKind =  rst.getInt("service_kind");
	    	}else{
	    		iIndex = 1;
	    		pstm = con.prepareStatement(sqlBuf2.toString());
		    	pstm.setString(iIndex++, serviceID);
		    	pstm.setString(iIndex++, areaID + serviceID );
		    	rst = pstm.executeQuery(); 
		    	if(rst.next()){
		    		serviceKind =  rst.getInt("service_kind");
		    	}
	    	}
    	}catch (SQLException se) {
	    	SysLog.writeLogs("BSS", GlobalParameters.ERROR,
	    	"ServiceKindDAOImpl--getServiceKind-1:" + se.getMessage());
	    	throw new DataAccessException(se);
    	} catch (Exception e) {
	    	SysLog.writeLogs("BSS", GlobalParameters.ERROR,
	    	"ServiceKindDAOImpl--getServiceKind-2:" + e.getMessage());
	    	throw new DataAccessException(e);
    	} finally {
    		close(rst, pstm, con);
    	}
    	return serviceKind;
    }

}
