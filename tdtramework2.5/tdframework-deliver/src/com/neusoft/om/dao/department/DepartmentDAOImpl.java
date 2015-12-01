package com.neusoft.om.dao.department;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.popedom.Department;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class DepartmentDAOImpl extends BaseDaoImpl implements DepartmentDAO{
    public Department getDepartment(String city_code, String dealer_id) throws DataAccessException
    {
        Department department = new Department();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        String sql = "select * from bd_dealer_t where city_code = ? and dealer_id = ?";
        try
        {   
        	conn = getConnection();
        	pstmt = conn.prepareStatement(sql);         
            pstmt.setString(1, city_code);
            pstmt.setString(2, dealer_id);
            rest = pstmt.executeQuery();
            while(rest.next()){
                department.setArea_code(rest.getString("area_code"));
                department.setDealer_kind(rest.getInt("dealer_kind"));
                department.setDealer_id(rest.getString("dealer_id"));
                department.setParent_dealer_id(rest.getString("belongs_part"));
                department.setCity_code(rest.getString("city_code"));
                department.setDealer_name(rest.getString("dealer_name"));
            }
        } catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DepartmentDAOImpl--getDepartment-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DepartmentDAOImpl--getDepartment-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
        return department;
    }

}
