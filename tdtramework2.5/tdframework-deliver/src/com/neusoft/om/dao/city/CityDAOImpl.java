package com.neusoft.om.dao.city;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.popedom.City;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class CityDAOImpl extends BaseDaoImpl implements CityDAO{
	
	public City getCityByRegion(String region_code) throws DataAccessException{		
        City city = new City();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        String sql = "select * from bm_city_id_t where region_code = ?";		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, region_code);
			rest = pstmt.executeQuery();
			while (rest.next()) {
                city.setCity_code(rest.getString("city_code"));
                city.setCity_name(rest.getString("city_name"));
                city.setCity_level(rest.getInt("city_level"));
                city.setArea_code(rest.getString("area_code"));
                city.setSubcompany_code(rest.getString("subcompany_code"));
                city.setB_area_code(rest.getString("b_area_code"));
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"CityDAOImpl--getCityByRegion-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"CityDAOImpl--getCityByRegion-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return city;
	}
}
