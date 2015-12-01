package com.neusoft.om.dao.region;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.taglib.innertree.TreeData;

/**
 * 
 * @author zhaofan 2009-9-30
 */

public class RegionDAOImpl extends BaseDaoImpl implements RegionDAO {

	public AreaVO getAreaById(String areaId) throws DataAccessException {
		AreaVO vo = null;

		StringBuffer buf = new StringBuffer();
		buf
				.append(" SELECT a.region_id,a.region_name,c.parent_region_id,b.region_name parent_region_name ,b.region_code parent_area_id");
		buf
				.append(" 		,c.region_level,c.region_code,a.area_code, a.city_code, a.postal_code ");
		buf.append("  FROM REGION a,REGION b,local_political_region c ");
		buf.append("  WHERE	a.region_id = c.region_id");
		buf
				.append("    AND c.parent_region_id = b.region_id(+) AND a.region_id = ? ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, areaId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				vo = new AreaVO();
				vo.setAttribute(rest);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaById-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"AreaDAO--getAreaById-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return vo;
	}

	public AreaColl getAreaAllInfo() throws DataAccessException {
		AreaColl coll = new AreaColl();
		AreaVO vo = null;
		String sql = "select level,f_area_id,f_parent_area_id,f_area_name,"
				+ "f_area_level,f_postal_code,f_area_code,f_city_code "
				+ "from om_area_t " + "start with f_parent_area_id is null "
				+ "connect by prior f_area_id = f_parent_area_id";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				vo = new AreaVO();
				vo.setAreaId(rest.getString("f_area_id"));
				vo.setParentAreaId(rest.getString("f_parent_area_id"));
				vo.setAreaName(rest.getString("f_area_name"));
				vo.setAreaLevel(rest.getInt("f_area_level"));
				vo.setAreaCode(NullProcessUtil.nvlToString(rest
						.getString("f_area_code"), ""));
				coll.addArea(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaAllInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaAllInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}

	public AreaColl getAreaAllInfo(String areaId) throws DataAccessException {
		AreaColl coll = new AreaColl();
		AreaVO vo = null;
		String sql = "select f_area_id,f_parent_area_id,f_area_name,"
				+ "f_area_level,f_postal_code,f_area_code,f_city_code "
				+ "from om_area_t " + "where f_area_id = ? ";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, areaId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				vo = new AreaVO();
				vo.setAreaId(rest.getString("f_area_id"));
				vo.setParentAreaId(rest.getString("f_parent_area_id"));
				vo.setAreaName(rest.getString("f_area_name"));
				vo.setAreaLevel(rest.getInt("f_area_level"));
				vo.setAreaCode(NullProcessUtil.nvlToString(rest
						.getString("f_area_code"), ""));
				coll.addArea(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaAllInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaAllInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}

	public AreaColl getAreaInfoByOrgan(String organId)
			throws DataAccessException {
		AreaColl coll = new AreaColl();
		AreaVO vo = null;
		String sql = "select a.f_area_id,a.f_parent_area_id,a.f_area_name, "
				+ "a.f_area_level,a.f_postal_code,a.f_area_code,a.f_city_code "
				+ "from om_area_t a,om_organ_t b "
				+ "where b.f_organ_id = ? and a.f_area_id = b.f_area_id ";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, organId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				vo = new AreaVO();
				vo.setAreaId(rest.getString("f_area_id"));
				vo.setParentAreaId(rest.getString("f_parent_area_id"));
				vo.setAreaName(rest.getString("f_area_name"));
				vo.setAreaLevel(rest.getInt("f_area_level"));
				vo.setAreaCode(NullProcessUtil.nvlToString(rest
						.getString("f_area_code"), ""));
				coll.addArea(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaAllInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaAllInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}

	public AreaColl getAreaChildColl(String areaId) throws DataAccessException {
		AreaColl coll = new AreaColl();
		AreaVO vo = null;
		String sql = "select level,f_area_id,f_parent_area_id,f_area_name,"
				+ "f_area_level,f_postal_code,f_area_code,f_city_code "
				+ "from om_area_t " + "start with f_area_id = ? "
				+ "connect by prior f_area_id = f_parent_area_id";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, areaId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				vo = new AreaVO();
				vo.setAreaId(rest.getString("f_area_id"));
				vo.setParentAreaId(rest.getString("f_parent_area_id"));
				vo.setAreaName(rest.getString("f_area_name"));
				vo.setAreaLevel(rest.getInt("f_area_level"));
				vo.setAreaCode(NullProcessUtil.nvlToString(rest
						.getString("f_area_code"), ""));
				coll.addArea(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaChildColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaChildColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}

	public String getAreaNameByAreaId(String areaId) throws DataAccessException {
		String areaName = "";
		String sql = "select f_area_name from om_area_t where f_area_id = ?";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, areaId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				areaName = rest.getString("f_area_name");
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaNameByAreaId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaNameByAreaId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaName;
	}

	public int getAreaLevelByAreaId(String areaId) throws DataAccessException {
		int areaLevel = 0;
		String sql = "SELECT f_area_level FROM om_area_level_t "
				+ " WHERE f_parent_area_level = (select f_area_level from om_area_t where f_area_id = ?)";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, areaId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				areaLevel = rest.getInt("f_area_level");
			}
		} catch (SQLException e) {
			areaLevel = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaLevelByParentAreaId-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			areaLevel = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaLevelByParentAreaId-2:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaLevel;
	}

	public int doAddAreaInfo(AreaVO vo) throws DataAccessException {
		int code = 1;
		StringBuffer buf = new StringBuffer("");
		buf.append("insert into om_area_t (");
		buf
				.append(" f_area_id,f_parent_area_id,f_area_name,f_area_level,"
						+ "f_postal_code,f_area_code,f_active_date,f_inactive_date,f_city_code )");
		buf
				.append(" values(?,?,?,?,?,?,to_date(?,'yyyy-mm-dd'),to_date(?,'yyyy-mm-dd'),?)");
		Connection conn = null;
		PreparedStatement pstmt = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, vo.getAreaId());
			pstmt.setString(2, vo.getParentAreaId());
			pstmt.setString(3, vo.getAreaName());
			pstmt.setInt(4, vo.getAreaLevel());
			pstmt.setString(6, vo.getAreaCode());
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--doAddAreaInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--doAddAreaInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(pstmt, conn);
		}
		return code;
	}

	/**
	 * 增加行政区域信息--ylm
	 * 
	 * @param areaVO
	 * @return
	 * @throws DataAccessException
	 */
	public String addAreaInfo(AreaVO vo) throws DataAccessException {
		int code = 1;
		String message = "";
		String areaId = "";
		String cityCode = "";
		String parentAreaId = vo.getParentAreaId();
		String firseAreaid = parentAreaId.substring(3) + "001";

		StringBuffer buf1 = new StringBuffer();
		buf1.append(" select NVL(MAX(substrb(f_area_id,4))+1, ? ) ");
		buf1.append(" from om_area_t where f_parent_area_id = ? ");

		StringBuffer buf3 = new StringBuffer("");
		buf3.append("insert into om_area_t (");
		buf3
				.append(" f_area_id,f_parent_area_id,f_area_name,f_area_level,"
						+ "f_postal_code,f_area_code,f_active_date,f_inactive_date,f_city_code )");
		buf3
				.append(" values(?,?,?,?,?,?,to_date(?,'yyyy-mm-dd'),to_date(?,'yyyy-mm-dd'),?)");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf1.toString());
			pstmt.setString(1, firseAreaid);
			pstmt.setString(2, parentAreaId);
			rest = pstmt.executeQuery();
			if (rest.next()) {
				cityCode = rest.getString(1);
			}

			if (!cityCode.trim().equals("")) {
				String sfAreaId = parentAreaId.substring(0, 3);
				areaId = sfAreaId + cityCode;
			}

			pstmt = conn.prepareStatement(buf3.toString());
			pstmt.setString(1, areaId);
			pstmt.setString(2, parentAreaId);
			pstmt.setString(3, vo.getAreaName());
			pstmt.setInt(4, vo.getAreaLevel());
			pstmt.setString(6, vo.getAreaCode());
			pstmt.setString(9, cityCode);

			code = pstmt.executeUpdate();
			if (code > 0) {
				message = areaId;
			} else {
				message = "false";
			}
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--doAddAreaInfo()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--doAddAreaInfo()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(pstmt, conn);
		}

		return message;
	}

	/*
	 * 修改 返回code
	 */
	public int doModifyAreaInfo(AreaVO vo) throws DataAccessException {
		int code = 0;
		String areaId = vo.getAreaId();
		String areaName = vo.getAreaName();
		String areaCode = vo.getAreaCode();
		String parentAreaId = vo.getParentAreaId();
		int areaLevel = vo.getAreaLevel();

		String sql = "update om_area_t set f_area_name = ?,"
				+ " f_postal_code = ?, f_area_code = ? ,f_parent_area_id = ? ,"
				+ " f_city_code = ?, f_area_level = ? , f_active_date = to_date(?,'yyyy-mm-dd'), f_inactive_date = to_date(?,'yyyy-mm-dd') "
				+ " where f_area_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, areaName);
			pstmt.setString(3, areaCode);
			pstmt.setString(4, parentAreaId);
			pstmt.setInt(6, areaLevel);
			pstmt.setString(9, areaId);
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = -1;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--modifyAreaInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = -1;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--modifyAreaInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return code;
	}

	/**
	 * 修改行政区域信息--ylm
	 * 
	 * @param areaVO
	 * @return
	 * @throws DataAccessException
	 */
	public int modifyAreaInfo(AreaVO vo) throws DataAccessException {
		int code = 0;

		String areaId = vo.getAreaId();
		String areaName = vo.getAreaName();
		String areaCode = vo.getAreaCode();

		StringBuffer buf = new StringBuffer();
		buf.append("update om_area_t set");
		buf.append(" f_area_name = ?");
		buf.append(" ,f_postal_code = ?");
		buf.append(" ,f_area_code = ?");
		buf.append(" ,f_active_date = to_date(?,'yyyy-mm-dd')");
		buf.append(" ,f_inactive_date = to_date(?,'yyyy-mm-dd')");
		buf.append(" where f_area_id = ? ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, areaName);
			pstmt.setString(3, areaCode);
			pstmt.setString(6, areaId);

			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = -1;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--modifyAreaInfo()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = -1;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--modifyAreaInfo()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}

		return code;
	}

	public int doDeleteAreaInfo(String areaId) throws DataAccessException {
		int code = 1;

		StringBuffer buf = new StringBuffer();
		buf.append(" select rownum,f_area_id from om_area_t ");
		buf.append(" where rownum < 2 and f_parent_area_id = ?");

		String sql = "delete om_area_t where f_area_id = ? ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, areaId);
			rest = pstmt.executeQuery();
			if (rest.next()) {
				code = -100;
			}
			if (code > 0) {
				pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, areaId);
				code = pstmt.executeUpdate();
			}
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--DeleteAreaInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--DeleteAreaInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return code;
	}

	public AreaColl getAreaInnerTree() throws DataAccessException {
		AreaColl coll = null;
		StringBuffer buf = new StringBuffer();

		buf
				.append(" select level,f_area_id,f_parent_area_id,f_area_name,f_area_level ,if_city from  ");
		buf
				.append(" (select f_area_id,f_parent_area_id,f_area_name,f_area_level,1 if_city from om_area_t  ");
		buf.append(" union  ");
		buf
				.append(" select a.f_organ_id ,nvl(a.f_parent_organ_id,a.f_area_id),a.f_organ_name,b.f_area_level,0 if_city  ");
		buf
				.append(" from om_organ_t a,om_area_t b where a.F_AREA_ID = b.F_AREA_ID)  ");
		buf
				.append(" start with f_parent_area_id is null connect by prior  f_area_id = f_parent_area_id  ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			coll = new AreaColl();
			while (rest.next()) {
				AreaVO vo = new AreaVO();
				vo.setAreaId(rest.getString("f_area_id"));
				vo.setAreaName(rest.getString("f_area_name"));
				vo.setParentAreaId(rest.getString("f_parent_area_id"));
				vo.setAreaLevel(rest.getInt("f_area_level"));
				coll.addArea(vo);

			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaInnerTree-1:" + e.getMessage());
			// throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaInnerTree-2:" + e.getMessage());
			// throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;

	}

	public AreaVO getAreaByCityCode(String cityCode) throws DataAccessException {
		AreaVO areaVO = new AreaVO();
		String sql = "select f_area_id,f_parent_area_id,f_area_name,f_area_level,"
				+ "f_postal_code,f_area_code,f_active_date,f_inactive_date,f_city_code"
				+ " from om_area_t where f_city_code = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, cityCode);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				areaVO.setAttribute(rest);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaByCityCode-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"AreaDAO--getAreaByCityCode-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaVO;
	}

	/**
	 * 得到属于两个级别之间的区域集合
	 * 
	 * @param level1
	 * @param level2
	 * @return
	 * @throws DataAccessException
	 */
	public AreaColl getAreaByLevel(int level1, int level2)
			throws DataAccessException {
		AreaColl areaColl = new AreaColl();
		String level = getLevel(level1, level2);
		String sql = "select f_area_id,f_parent_area_id,f_area_name,f_area_level,"
				+ "f_postal_code,f_area_code,f_active_date,f_inactive_date,f_city_code"
				+ " from om_area_t where f_area_level in (?)";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, level);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				AreaVO areaVO = new AreaVO();
				areaVO.setAttribute(rest);
				areaColl.addArea(areaVO);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaByLevel-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaByLevel-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaColl;
	}

	/**
	 * 得到省份及以下级，输入areaId以上级和areaId确定的区域，之间的所有区域集合
	 * 
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public AreaColl getAreaCollByAuthAreaId(String areaId)
			throws DataAccessException {
		AreaColl areaColl = new AreaColl();
		List areaIdList = getAreaIdList(areaId);
		String idField = "(" + areaId;
		for (int i = 1; i < areaIdList.size(); i++) {
			idField = idField + "," + (String) areaIdList.get(i);
		}
		idField = idField + ")";
		String sql = " select * from om_area_t where f_area_id in ? order by f_area_level";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, idField);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				AreaVO areaVO = new AreaVO();
				areaVO.setAttribute(rest);
				areaColl.addArea(areaVO);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaCollByAuthAreaId-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaCollByAuthAreaId-2:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaColl;
	}

	private String getLevel(int level1, int level2) {
		String level = null;
		for (int i = level1; i < level2 + 1; i++) {
			if (level == null || level.trim().equals("")) {
				level = String.valueOf(i);
			} else {
				level = level + "," + String.valueOf(i);
			}
		}
		return level;
	}

	/*
	 * 得到areaId确定的区域上级，上级的上级....直至省份的所有areaId
	 */
	private List getAreaIdList(String areaId) {
		List list = new ArrayList();
		String parentAreaId = "";
		int areaLevel = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			while (areaLevel != 2) {
				StringBuffer buf = new StringBuffer();
				buf
						.append(" select f_parent_area_id, f_area_level from om_area_t where f_area_id = ? ");
				String sql = buf.toString();
				pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, areaId);
				rest = pstmt.executeQuery();
				while (rest.next()) {
					parentAreaId = rest.getString("f_parent_area_id");
					areaLevel = rest.getInt("f_area_level");
					list.add(areaId);
					areaId = parentAreaId;
				}
				close(pstmt);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"EmployeeDAOImpl--getAreaIdList-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"EmployeeDAOImpl--getAreaIdList-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}

		return list;
	}

	/**
	 * 根据查询条件获得区域信息集合
	 * 
	 * @param dataMap
	 * @return
	 * @throws DataAccessException
	 */
	public AreaColl getAreaColl(Map dataMap) throws DataAccessException {
		AreaColl areaColl = new AreaColl();
		String parentAreaId = (String) dataMap.get("parentAreaId");
		String areaName = (String) dataMap.get("areaName");
		String activeDate = (String) dataMap.get("activeDate");
		String inactiveDate = (String) dataMap.get("inactiveDate");
		String areaId = (String) dataMap.get("areaId");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			int i = 0;
			conn = getConnection();
			StringBuffer buf = new StringBuffer();
			buf
					.append(" select a.*, b.f_area_name f_parent_area_name from om_area_t a, om_area_t b where a.f_area_level = 4 "); // 只可以查询区县级区域
			if (parentAreaId != null && !parentAreaId.trim().equals("")) {
				buf.append(" and a.f_parent_area_id = ? ");
			}
			if (areaName != null && !areaName.trim().equals("")) {
				buf.append(" and a.f_area_name like ? ");
			}
			if (activeDate != null && !activeDate.trim().equals("")) {
				buf
						.append(" and a.f_active_date BETWEEN TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') "
								+ " AND TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') ");
			}
			if (inactiveDate != null && !inactiveDate.trim().equals("")) {
				buf
						.append(" and a.f_inactive_date BETWEEN TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') "
								+ " AND TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') ");
			}
			if (areaId != null && !areaId.trim().equals("")) {
				buf.append(" and a.f_area_id = ?");
			}
			buf.append(" and a.f_parent_area_id = b.f_area_id");
			String sql = buf.toString();
			pstmt = conn.prepareStatement(sql);
			if (parentAreaId != null && !parentAreaId.trim().equals("")) {
				i++;
				pstmt.setString(i, parentAreaId);
			}
			if (areaName != null && !areaName.trim().equals("")) {
				i++;
				pstmt.setString(i, "%" + areaName + "%");
			}
			if (activeDate != null && !activeDate.trim().equals("")) {
				i++;
				pstmt.setString(i, activeDate + " 00:00:00");
				i++;
				pstmt.setString(i, activeDate + " 23:59:59");
			}
			if (inactiveDate != null && !inactiveDate.trim().equals("")) {
				i++;
				pstmt.setString(i, inactiveDate + " 00:00:00");
				i++;
				pstmt.setString(i, inactiveDate + " 23:59:59");
			}
			if (areaId != null && !areaId.trim().equals("")) {
				i++;
				pstmt.setString(i, areaId);
			}
			rest = pstmt.executeQuery();
			while (rest.next()) {
				AreaVO vo = new AreaVO();
				vo.setAttribute(rest);
				areaColl.addArea(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaColl;
	}

	/**
	 * 根据查询条件获得区域信息集合总行数
	 * 
	 * @param dataMap
	 * @return
	 * @throws DataAccessException
	 */
	public int getAreaRowCount(Map dataMap) throws DataAccessException {
		int rowCount = 0;
		String parentAreaId = (String) dataMap.get("parentAreaId");
		String areaName = (String) dataMap.get("areaName");
		String activeDate = (String) dataMap.get("activeDate");
		String inactiveDate = (String) dataMap.get("inactiveDate");

		String newAreaId = (String) dataMap.get("newAreaId");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();

			StringBuffer buf = new StringBuffer();
			if (newAreaId.trim().equals("") || newAreaId == null) {
				buf.append(" SELECT count(*) from (	");
				buf.append(" SELECT * FROM ( ");
				buf
						.append(" SELECT a.f_area_id,a.f_area_name,a.f_parent_area_id,b.f_area_name f_parent_area_name ");
				buf
						.append(" 		,a.f_area_level, a.f_active_date,a.f_inactive_date ");
				buf.append("   FROM OM_AREA_T a,om_area_t b ");
				buf
						.append("  WHERE a.f_area_level >= 3 and b.f_area_level >= 3 ");
				if (activeDate != null && !activeDate.trim().equals("")) {
					buf
							.append(" and a.f_active_date BETWEEN TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') "
									+ " AND TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') ");
				}
				if (inactiveDate != null && !inactiveDate.trim().equals("")) {
					buf
							.append(" and a.f_inactive_date BETWEEN TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') "
									+ " AND TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') ");
				}
				buf.append("    AND a.f_parent_area_id = b.f_area_id ");
				if (parentAreaId != null && !parentAreaId.trim().equals("")) {
					buf.append(" and a.f_parent_area_id = ?");
				}
				buf.append(")");

				if (parentAreaId != null && !parentAreaId.trim().equals("")) {
					buf.append(" START WITH f_parent_area_id = ? ");
					buf
							.append(" CONNECT BY PRIOR f_area_id = f_parent_area_id ");
				}

				buf.append(" ) ");
				if (areaName != null && !areaName.trim().equals("")) {
					buf.append(" where f_area_name like ?");
				}
			} else {
				buf.append(" SELECT count(*) from om_area_t	");
				buf.append(" where f_area_id = ?");
			}

			pstmt = conn.prepareStatement(buf.toString());
			int i = 0;
			if (newAreaId.trim().equals("") || newAreaId == null) {
				if (activeDate != null && !activeDate.trim().equals("")) {
					i++;
					pstmt.setString(i, activeDate + " 00:00:00");
					i++;
					pstmt.setString(i, activeDate + " 23:59:59");
				}
				if (inactiveDate != null && !inactiveDate.trim().equals("")) {
					i++;
					pstmt.setString(i, inactiveDate + " 00:00:00");
					i++;
					pstmt.setString(i, inactiveDate + " 23:59:59");
				}
				if (parentAreaId != null && !parentAreaId.trim().equals("")) {
					i++;
					pstmt.setString(i, parentAreaId);
					i++;
					pstmt.setString(i, parentAreaId);
				}
				if (areaName != null && !areaName.trim().equals("")) {
					i++;
					pstmt.setString(i, "%" + areaName + "%");
				}
			} else {
				i++;
				pstmt.setString(i, newAreaId);
			}
			rest = pstmt.executeQuery();
			if (rest.next()) {
				rowCount = rest.getInt(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaRowCount()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaRowCount()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return rowCount;
	}

	/**
	 * 根据查询条件获得区域信息集合
	 * 
	 * @param dataMap
	 * @return
	 * @throws DataAccessException
	 */
	public AreaColl getAreaCollInfo(Map dataMap) throws DataAccessException {
		AreaColl areaColl = new AreaColl();

		String parentAreaId = (String) dataMap.get("parentAreaId");
		String areaName = (String) dataMap.get("areaName");
		String activeDate = (String) dataMap.get("activeDate");
		String inactiveDate = (String) dataMap.get("inactiveDate");
		String startRow = (String) dataMap.get("startRow");
		String endRow = (String) dataMap.get("endRow");

		String newAreaId = (String) dataMap.get("newAreaId");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();

			StringBuffer buf = new StringBuffer();
			if (newAreaId.trim().equals("") || newAreaId == null) {
				buf
						.append(" SELECT ROWNER,f_area_id,f_area_name,f_parent_area_id,f_parent_area_name ");
				buf
						.append("        ,f_area_level, f_active_date,f_inactive_date from (	");
				buf.append(" SELECT rownum ROWNER, A.* FROM ( ");
				buf
						.append(" SELECT a.f_area_id,a.f_area_name,a.f_parent_area_id,b.f_area_name f_parent_area_name ");
				buf
						.append(" 		,a.f_area_level, a.f_active_date,a.f_inactive_date ");
				buf.append("   FROM OM_AREA_T a,om_area_t b ");
				buf
						.append("  WHERE a.f_area_level >= 3 and b.f_area_level >= 3 ");
				if (activeDate != null && !activeDate.trim().equals("")) {
					buf
							.append(" and a.f_active_date BETWEEN TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') "
									+ " AND TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') ");
				}
				if (inactiveDate != null && !inactiveDate.trim().equals("")) {
					buf
							.append(" and a.f_inactive_date BETWEEN TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') "
									+ " AND TO_DATE (?, 'yyyy-MM-dd HH24:mi:ss') ");
				}
				buf.append("    AND a.f_parent_area_id = b.f_area_id ");
				if (parentAreaId != null && !parentAreaId.trim().equals("")) {
					buf.append(" and a.f_parent_area_id = ? ");
				}
				buf.append(") A");
				if (parentAreaId != null && !parentAreaId.trim().equals("")) {
					buf.append(" START WITH f_parent_area_id = ? ");
					buf
							.append(" CONNECT BY PRIOR f_area_id = f_parent_area_id ");
				}

				if (areaName != null && !areaName.trim().equals("")) {
					buf.append(" ) where f_area_name like ?");
				} else {
					buf.append(" ) where ROWNER > ? and ROWNER <= ? ");
				}
			} else {
				buf
						.append(" SELECT a.f_area_id,a.f_area_name,a.f_parent_area_id,b.f_area_name f_parent_area_name ");
				buf
						.append(" 		,a.f_area_level, a.f_active_date,a.f_inactive_date ");
				buf.append("   FROM OM_AREA_T a,om_area_t b ");
				buf
						.append("  WHERE a.f_area_level >= 3 and b.f_area_level >= 3 ");
				buf.append("    AND	a.f_area_id = ? ");
				buf.append("    AND a.f_parent_area_id = b.f_area_id ");
			}

			pstmt = conn.prepareStatement(buf.toString());
			int i = 0;
			if (newAreaId.trim().equals("") || newAreaId == null) {
				if (activeDate != null && !activeDate.trim().equals("")) {
					i++;
					pstmt.setString(i, activeDate + " 00:00:00");
					i++;
					pstmt.setString(i, activeDate + " 23:59:59");
				}
				if (inactiveDate != null && !inactiveDate.trim().equals("")) {
					i++;
					pstmt.setString(i, inactiveDate + " 00:00:00");
					i++;
					pstmt.setString(i, inactiveDate + " 23:59:59");
				}
				if (parentAreaId != null && !parentAreaId.trim().equals("")) {
					i++;
					pstmt.setString(i, parentAreaId);
					i++;
					pstmt.setString(i, parentAreaId);
				}
				if (areaName != null && !areaName.trim().equals("")) {
					i++;
					pstmt.setString(i, "%" + areaName + "%");
				} else {
					i++;
					pstmt.setString(i, startRow);
					i++;
					pstmt.setString(i, endRow);
				}
			} else {
				i++;
				pstmt.setString(i, newAreaId);
			}
			rest = pstmt.executeQuery();
			while (rest.next()) {
				AreaVO vo = new AreaVO();
				vo.setAttribute(rest);
				areaColl.addArea(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaCollInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaCollInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaColl;
	}

	/**
	 * 得到上级区域下最大的areaId
	 * 
	 * @param parentAreaId
	 * @return
	 * @throws DataAccessException
	 */
	public String getMaxAreaId(String parentAreaId) throws DataAccessException {
		String areaId = "";

		StringBuffer buf = new StringBuffer();
		buf
				.append(" select MAX(f_area_id)+1 from om_area_t where f_parent_area_id = ?");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, parentAreaId);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				areaId = rest.getString("f_area_id");
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"EmployeeDAOImpl--getMaxAreaId()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"EmployeeDAOImpl--getMaxAreaId()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}

		return areaId;
	}

	/**
	 * 根据操作员的区域级别获取第一个的区域信息
	 * 
	 * @param parentAreaId
	 * @return
	 * @throws DataAccessException
	 */
	public String getFirseAreaInfo(int areaLevel) throws DataAccessException {
		String areaId = "";

		StringBuffer buf = new StringBuffer();
		buf.append(" SELECT f_area_id");
		buf.append(" from om_area_t");
		buf.append(" where f_area_level = ?");
		buf.append(" order by f_area_id");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, areaLevel);
			rest = pstmt.executeQuery();

			if (rest.next()) {
				areaId = rest.getString(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getFirseAreaInfo()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getFirseAreaInfo()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaId;
	}

	/**
	 * 根据操作员的区域代码获取所有的区域信息
	 * 
	 * @param parentAreaId
	 * @return
	 * @throws DataAccessException
	 */
	public Vector getAllAreaInfo(String areaId, int areaLevel)
			throws DataAccessException {
		Vector coll = new Vector();
		TreeData treeData = null; // new
									// TreeData("root",null,"区域树","区域树",false);
		StringBuffer buf = new StringBuffer();
		buf
				.append(" SELECT f_area_id,f_area_name,f_parent_area_id,f_area_level");
		buf
				.append(" FROM (select * from OM_AREA_T where f_area_level <= ? order by f_area_name)");
		buf.append(" START WITH f_area_id = '" + areaId + "'");
		buf.append(" CONNECT BY PRIOR f_area_id = f_parent_area_id");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, areaLevel);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				if (rest.getString("f_area_id").trim().equalsIgnoreCase(areaId)) {
					treeData = new TreeData("root", null, rest
							.getString("f_area_name"), rest
							.getString("f_area_id"), false);
				} else {
					if (rest.getString("f_parent_area_id") != null) {
						if (rest.getString("f_parent_area_id")
								.equalsIgnoreCase(areaId))
							treeData = new TreeData(
									rest.getString("f_area_id"), "root", rest
											.getString("f_area_name"), rest
											.getString("f_area_id"), false);
						else
							treeData = new TreeData(
									rest.getString("f_area_id"), rest
											.getString("f_parent_area_id"),
									rest.getString("f_area_name"), rest
											.getString("f_area_id"), false);
					}
				}

				coll.add(treeData);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaAllInfo()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaAllInfo()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}

	/**
	 * 根据上级的区域代码获取新增区域的区域级别
	 * 
	 * @param parentAreaId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getAreaLevelByParent(String areaId)
			throws DataAccessException {
		ParamObjectCollection areaLevelColl = new ParamObjectCollection();

		String sql = "SELECT f_area_level,f_area_level_desc FROM om_area_level_t "
				+ " WHERE f_parent_area_level = (select f_area_level from om_area_t where f_area_id = ?)";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, areaId);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_area_level"));
				paramObject.setName(rest.getString("f_area_level_desc"));
				areaLevelColl.addParamObject(paramObject);
			}
		} catch (SQLException e) {
			SysLog
					.writeLogs("om", GlobalParameters.ERROR,
							"RegionDAOImpl--getAreaLevelByParent()-1:"
									+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog
					.writeLogs("om", GlobalParameters.ERROR,
							"RegionDAOImpl--getAreaLevelByParent()-2:"
									+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaLevelColl;
	}

	/**
	 * 根据区域代码获取新增区域的区域级别
	 * 
	 * @param parentAreaId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getAreaLevelById(String areaId)
			throws DataAccessException {
		ParamObjectCollection areaLevelColl = new ParamObjectCollection();

		String sql = "SELECT f_area_level,f_area_level_desc FROM om_area_level_t "
				+ " WHERE f_area_level = (select f_area_level from om_area_t where f_area_id = ?)";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, areaId);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("f_area_level"));
				paramObject.setName(rest.getString("f_area_level_desc"));
				areaLevelColl.addParamObject(paramObject);
			}
		} catch (SQLException e) {
			SysLog
					.writeLogs("om", GlobalParameters.ERROR,
							"RegionDAOImpl--getAreaLevelByParent()-1:"
									+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog
					.writeLogs("om", GlobalParameters.ERROR,
							"RegionDAOImpl--getAreaLevelByParent()-2:"
									+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaLevelColl;
	}

	/**
	 * 根据登录账号得到其可以查看的地市信息列表
	 * 
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getAreaCollByEmp(String employeeId)
			throws DataAccessException {
		ParamObjectCollection areaLevelColl = new ParamObjectCollection();
		StringBuffer sqlBuf = new StringBuffer();
		sqlBuf.append("select * from (");
		sqlBuf.append(" select common_region_id, region_name, up_region_id");
		sqlBuf.append(" from common_region ");
		sqlBuf.append(" where region_level in (1,2,3) ");
		sqlBuf.append(")start with common_region_id = ");
		sqlBuf
				.append("(select b.common_region_id from staff a, orgnization b, system_user c");
		sqlBuf
				.append(" where a.org_id = b.org_id  and a.staff_id = c.staff_id and c.staff_code = ? ) ");
		sqlBuf.append(" connect by prior common_region_id = up_region_id ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuf.toString());
			pstmt.setString(1, employeeId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getString("common_region_id"));
				paramObject.setName(rest.getString("region_name"));
				areaLevelColl.addParamObject(paramObject);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaCollByEmp()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaCollByEmp()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaLevelColl;

	}

	public AreaColl getCountryColl(String areaId) throws DataAccessException {
		AreaColl areaColl = new AreaColl();
		String sql = "select * from om_area_t where f_parent_area_id = "
				+ areaId;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				AreaVO vo = new AreaVO();
				vo.setAreaId(rest.getString("f_area_id"));
				vo.setAreaName(rest.getString("f_area_name"));
				areaColl.addArea(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getCountryColl()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getCountryColl()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return areaColl;
	}

	public Vector getAreaVec(String areaId, int areaLevel)
			throws DataAccessException {
		if (areaId == null || areaId.equals("000")) {
			Vector vec = new Vector();
			TreeData treeNode = new TreeData("root", null, "无数据", "0", false);
			vec.add(treeNode);
			return vec;
		}
		Vector coll = new Vector();
		TreeData treeData = null; // new
									// TreeData("root",null,"区域树","区域树",false);
		StringBuffer buf = new StringBuffer();

		buf
				.append(" SELECT f_area_id,f_area_name,f_parent_area_id,f_area_level");
		buf
				.append(" FROM (select * from OM_AREA_T where f_area_level <= ? order by f_area_name)");
		buf.append(" START WITH f_area_id = ? ");
		buf.append(" CONNECT BY PRIOR f_area_id = f_parent_area_id");

		String parentSQL = "select f_parent_area_id from om_area_t where f_area_id = ? ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(parentSQL);
			pstmt.setString(1, areaId);
			rest = pstmt.executeQuery();
			if (rest.next()) {
				String parentAreaId = rest.getString("f_parent_area_id");
				AreaVO parentArea = new AreaVO();
				parentArea = getAreaById(parentAreaId);
				treeData = new TreeData("root", null, parentArea.getAreaName(),
						parentArea.getAreaId(), false);
				coll.add(treeData);
			}

			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, areaLevel);
			pstmt.setString(2, areaId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				if (rest.getString("f_parent_area_id") != null) {
					if (rest.getString("f_area_id").equalsIgnoreCase(areaId))
						treeData = new TreeData(rest.getString("f_area_id"),
								"root", rest.getString("f_area_name"), rest
										.getString("f_area_id"), false);
					else
						treeData = new TreeData(rest.getString("f_area_id"),
								rest.getString("f_parent_area_id"), rest
										.getString("f_area_name"), rest
										.getString("f_area_id"), false);
				}

				coll.add(treeData);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaAllInfo()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAreaAllInfo()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}

	public Map getAllCityColl() throws DataAccessException {
		Map cityMap = new HashMap();
		String sql = "select * from om_area_t where f_area_level <= 3";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				String cityCode = rest.getString("f_city_code");
				String areaName = rest.getString("f_area_name");
				cityMap.put(cityCode, areaName);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAllCityColl()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RegionDAOImpl--getAllCityColl()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return cityMap;
	}

	public String addAreaInfo(RegionVO vo) throws DataAccessException {
		return "";
	}

	public int doAddAreaInfo(RegionVO areaVO) throws DataAccessException {
		return 0;
	}

}
