package com.neusoft.om.omutil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class OmOrganUtilDAOImpl extends BaseDaoImpl implements OmOrganUtilDAO {
	
	public int getOrganParamId(String employeeId) throws DataAccessException{
		int paramId = 1000;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();		
		buf.append(" select f_param_role_id from om_employee_param_role_rel_t ");
		buf.append(" where f_param_role_id in (1,2,3) and f_employee_id = ? and f_usable_flag = 1 ");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				int paramRoleId = rest.getInt(1);
				if(paramId > paramRoleId){ //���һ�������ж����֯���������ݽ�ɫ������ֵ��С�Ľ�ɫ����������ߵ�
					paramId = paramRoleId;
				}				
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getOrganParamId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getOrganParamId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}	
		return paramId;
	}

	public OrganColl getSameLevelAndChildOrgan(String organId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id "); 
		buf.append(" start with f_organ_id ");
		buf.append(" in (select f_organ_id from om_organ_t where f_parent_organ_id =  ");
		buf.append(" (select f_parent_organ_id from om_organ_t where f_organ_id = ? )) ");
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, organId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameLevelAndChild-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameLevelAndChild-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}			
		return coll;
	}
	
	/**
	 * �õ�����֯����ƽ����������֯������parentΪ�գ��򷵻�ͬ��������parentΪ�յĲ��ź���Щ���ŵ������¼�����
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameAndChildPrtIsNull(String organId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id "); 
		buf.append(" start with f_organ_id ");
		buf.append(" in (select a.f_organ_id from om_organ_t a, om_organ_t b  ");
		buf.append(" where a.f_parent_organ_id is null and a.f_area_id = b.f_area_id and b.f_organ_id = ?)");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, organId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameAndChildPrtIsNull-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameAndChildPrtIsNull-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}			
		return coll;
	}
	
	public OrganColl getChildOrganColl(String organId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();		
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id ");
		buf.append(" start with f_organ_id  = ? ");
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, organId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getChildOrganColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getChildOrganColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}			
		return coll;
	}
	
	/**
	 * �õ�����֯����ƽ�����г�������Щ�г����¼��������г�����ֻ�����г������͵Ĳ�������
	 * �����ڵ�ǰ�г������ϼ���Ϊ�յ����
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameLevelAndChildMarket(String organId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" where f_organ_kind in (select f_organ_kind from om_organ_kind_t where f_department_kind = 2) ");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id "); 
		buf.append(" start with f_organ_id ");
		buf.append(" in (select f_organ_id from om_organ_t where f_parent_organ_id =  ");
		buf.append(" (select f_parent_organ_id from om_organ_t where f_organ_id = ? )) ");
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, organId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameLevelAndChildMarket-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameLevelAndChildMarket-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}	
		return coll;
	}
	
	/**
	 * �õ�����֯����ƽ�����г�������Щ�г����¼��������г�����ֻ�����г������͵Ĳ�������
	 * �����ڵ�ǰ�г������ϼ�Ϊ�յ������
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameAndCldMarketPrtIsNull(String organId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" where f_organ_kind in (select f_organ_kind from om_organ_kind_t where  f_department_kind = 2 ) ");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id "); 
		buf.append(" start with f_organ_id ");
		buf.append(" in (select a.f_organ_id from om_organ_t a, om_organ_t b  ");
		buf.append(" where a.f_parent_organ_id is null and a.f_area_id = b.f_area_id and b.f_organ_id = ?)");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, organId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameAndCldMarketPrtIsNull-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameAndCldMarketPrtIsNull-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}		
		return coll;
	}
	
	/**
	 * �õ���ǰ�г��������¼��������г����������¼������¼�...��
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getChildMarketColl(String organId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();		
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" where f_organ_kind in (select f_organ_kind from om_organ_kind_t where  f_department_kind = 2) ");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id ");
		buf.append(" start with f_organ_id  = ? ");
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, organId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getChildMarketColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getChildMarketColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}			
		return coll;
	}

	/**
	 * �õ���ǰ�г��������¼��������г����������¼������¼�...��
	 * Ҫ��city_code��ͬ���г���
	 * @param organId
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameCityChildMarketColl(String organId, String cityCode) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();		
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" where f_organ_kind in (select f_organ_kind from om_organ_kind_t where  f_department_kind = 2) ");
		buf.append(" and f_city_code = ? ");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id ");
		buf.append(" start with f_organ_id  = ? ");
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, cityCode);
			pstmt.setString(2, organId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getChildMarketColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getChildMarketColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}			
		return coll;
	}
	/**
	 * �õ�����֯����ƽ�����г�������Щ�г����¼��������г�����ֻ�����г������͵Ĳ�������
	 * �����ڵ�ǰ�г������ϼ���Ϊ�յ����
	 * Ҫ�󷵻�city_code��ͬ���г���
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameLevelAndChildMarket(String organId, String cityCode) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" where f_organ_kind in (select f_organ_kind from om_organ_kind_t where  f_department_kind = 2) ");
		buf.append(" and f_city_code = ?");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id "); 
		buf.append(" start with f_organ_id ");
		buf.append(" in (select f_organ_id from om_organ_t where f_parent_organ_id =  ");
		buf.append(" (select f_parent_organ_id from om_organ_t where f_organ_id = ? )) ");
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,cityCode);
			pstmt.setString(2, organId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameLevelAndChildMarket-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameLevelAndChildMarket-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}	
		return coll;
	}
	
	/**
	 * �õ�����֯����ƽ�����г�������Щ�г����¼��������г�����ֻ�����г������͵Ĳ�������
	 * �����ڵ�ǰ�г������ϼ�Ϊ�յ������
	 *  Ҫ�󷵻�city_code��ͬ���г���
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSameAndCldMarketPrtIsNull(String organId, String cityCode) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" where f_organ_kind in (select f_organ_kind from om_organ_kind_t where  f_department_kind = 2) ");
		buf.append(" and f_city_code = ? ");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id "); 
		buf.append(" start with f_organ_id ");
		buf.append(" in (select a.f_organ_id from om_organ_t a, om_organ_t b  ");
		buf.append(" where a.f_parent_organ_id is null and a.f_area_id = b.f_area_id and b.f_organ_id = ?)");
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, cityCode);
			pstmt.setString(2, organId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameAndCldMarketPrtIsNull-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getSameAndCldMarketPrtIsNull-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}		
		return coll;
	}
	
	/**
	 * �õ�����city_code��Ӧ���е������г������������г���
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getAllCityMarket(String cityCode) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" where f_organ_kind in (select f_organ_kind from om_organ_kind_t where  f_department_kind = 2) ");
		buf.append(" and f_city_code = ? ");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id "); 
		buf.append(" start with f_parent_organ_id is null ");
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, cityCode);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getAllCityMarket-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getAllCityMarket-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}		
		return coll;
	}
	public OrganColl getAllCityOrgan(String cityCode) throws DataAccessException{
		OrganColl coll = new OrganColl();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
		buf.append(" where f_city_code = ? ");
		buf.append(" connect by f_parent_organ_id = prior f_organ_id "); 
		buf.append(" start with f_parent_organ_id is null ");
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, cityCode);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addOrgan(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getAllCityMarket-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getAllCityMarket-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}		
		return coll;
	}
	
	public int getAreaLevel(String areaId) throws DataAccessException{
		int areaLevel = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" SELECT f_area_level FROM om_area_t WHERE f_area_id = ?");
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, areaId);
			rest = pstmt.executeQuery();
			if (rest.next()) {
				areaLevel = rest.getInt("f_area_level");
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getAreaLevel-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getAreaLevel-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaLevel;
	}
	
	public int getDepartmentKind(String organId) throws DataAccessException{
		int depKind = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" SELECT b.f_department_kind ");
		buf.append(" FROM  om_organ_t a, om_organ_kind_t b ");
		buf.append(" WHERE a.f_organ_kind = b.f_organ_kind AND a.f_organ_id = ? ");

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, organId);
			rest = pstmt.executeQuery();
			if (rest.next()) {
				depKind = rest.getInt(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getDepartmentKind-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"OmOrganUtilDAOImpl--getDepartmentKind-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return depKind;
	}
}
