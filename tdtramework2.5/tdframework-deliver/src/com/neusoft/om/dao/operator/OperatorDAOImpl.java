package com.neusoft.om.dao.operator;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import com.neusoft.popedom.Operator;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class OperatorDAOImpl extends BaseDaoImpl implements OperatorDAO{
	public Operator getOperator(String account)
    {
        Operator operator = new Operator();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        String sql = "select * from bm_person_name_t where account = ? ";		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, account.toUpperCase());
			rest = pstmt.executeQuery();
			while (rest.next()) {
				operator.setRegion_code(rest.getString("region_code"));
                operator.setAccount(rest.getString("account"));
                operator.setPassword(rest.getString("password"));
                operator.setDepartment(rest.getString("department"));
                operator.setRole_id(rest.getInt("role_id"));
                operator.setSys_role_id(rest.getInt("sys_role_id"));
                operator.setAdmin_role_id(rest.getInt("admin_role_id"));
                operator.setStatus(rest.getInt("status"));
                operator.setCity_code(rest.getString("city_code"));
                operator.setName(rest.getString("name"));
                operator.setPerson_level(rest.getInt("person_level"));
                operator.setSex(rest.getInt("sex"));
                operator.setOffice_address(rest.getString("office_address"));
                operator.setHome_address(rest.getString("home_address"));
                operator.setOffice_phone(rest.getString("office_phone"));
                operator.setHome_phone(rest.getString("home_phone"));
                operator.setMobile(rest.getString("mobile"));
                operator.setFax(rest.getString("fax"));
                operator.setPager(rest.getString("pager"));
                operator.setPost_code(rest.getString("post_code"));
                operator.setEmail(rest.getString("email"));
                operator.setWork_no(rest.getString("work_no"));
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OperatorDAOImpl--getOperator-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OperatorDAOImpl--getOperator-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return operator;
    }
	
    public Properties getOperatorInfo(String account) throws DataAccessException
	{
	    Properties operatorInfo = new Properties();
	    int city_level = 0;
	    String city_code = "";
	    String province_code = "";
	    Connection conn = null;
	    PreparedStatement pstmt = null;
	    ResultSet rest = null;
	    StringBuffer sqlbuf1 = new StringBuffer();
	    String center_code = "";
        sqlbuf1.append("select a.f_city_code city_code, a.f_person_level person_level, b.region_level city_level, b.COMMON_REGION_ID region_code ");
        sqlbuf1.append("from om_employee_t a, common_region b ");
        sqlbuf1.append("where a.F_AREA_ID = b.COMMON_REGION_ID and a.F_WORK_NO = ?");
        String sql = sqlbuf1.toString();
	    try
	    {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, account.toUpperCase());
			rest = pstmt.executeQuery();
			while (rest.next()) {
	            city_level = rest.getInt("city_level");
	            city_code = rest.getString("city_code");
	            operatorInfo.setProperty("Organ_code", nvl(rest.getString("city_code"), ""));
	            operatorInfo.setProperty("Person_level", nvl(rest.getString("person_level"), ""));
	            operatorInfo.setProperty("City_level", nvl(String.valueOf(city_level), ""));
	            operatorInfo.setProperty("Region_code", nvl(rest.getString("region_code"), ""));
	        }
	
	    }catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OperatorDAOImpl--getOperatorInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OperatorDAOImpl--getOperatorInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
	    if(city_level == 1)
	        center_code = city_code;
	    else
	    if(city_level == 2)
	    {
	        province_code = city_code;
	        center_code = getParentCity(city_code);
	    } else
	    {
	        province_code = getParentCity(city_code);
	        center_code = getParentCity(province_code);
	    }
	    operatorInfo.setProperty("City_code", nvl(city_code, ""));
	    operatorInfo.setProperty("Province_code", nvl(province_code, ""));
	    operatorInfo.setProperty("Center_code", nvl(center_code, ""));
	    return operatorInfo;
	}
    private static String nvl(String s, String s1)
    {
        if(s == null || s.intern() == "null".intern() || s.intern() == "".intern())
            s = s1;
        return s;
    }
    private String getParentCity(String city_code)
    {
        String parent_city = "";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        StringBuffer sqlbuf = new StringBuffer();
        sqlbuf.append("SELECT up_region_id subcompany_code FROM common_region WHERE city_code = ?");
        try
        {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlbuf.toString());
			pstmt.setString(1, city_code);
			rest = pstmt.executeQuery();            
			while(rest.next()){
				parent_city = rest.getString("subcompany_code");
			}
        }catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OperatorDAOImpl--getParentCity-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OperatorDAOImpl--getParentCity-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
        return parent_city;
    }

}
