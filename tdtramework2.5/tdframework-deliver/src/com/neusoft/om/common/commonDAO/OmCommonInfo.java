package com.neusoft.om.common.commonDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class OmCommonInfo extends BaseDaoImpl{
	public static final String BEAN = "omCommoninfo";
	/**
     * 查询所属渠道名称信息
     * @param name
     * @return
     * @throws DataAccessException
     */
     public String getDealerNameById(String dealerId) throws DataAccessException{
             String dealerName= "";
             StringBuffer buf = new StringBuffer();
             buf.append("select DEALER_NAME from BD_DEALER_T where DEALER_ID = '"+dealerId+"'");            
             String sql = buf.toString();            
             Connection conn = null;
             PreparedStatement pstmt = null;
             ResultSet rest = null;
             try{
                 conn = getConnection();
                 pstmt = conn.prepareStatement(sql);
                 rest = pstmt.executeQuery();  
                 if(rest.next()){
               	  dealerName = rest.getString(1);
                 }
             }catch(SQLException e){
                 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByName-1:"+e.getMessage());
                 throw new DataAccessException(e);
             }catch(Exception e){
                 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByName-2:"+e.getMessage());
                 throw new DataAccessException(e);
             }finally{
                 close(rest,pstmt,conn);
             }  
             return dealerName;
     }
}
