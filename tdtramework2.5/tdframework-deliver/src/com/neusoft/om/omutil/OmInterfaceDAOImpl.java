package com.neusoft.om.omutil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.neusoft.om.dao.container.ContainerVO;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.organization.OrganColl;
import com.neusoft.om.dao.organization.OrganVO;
import com.neusoft.om.dao.region.RegionVO;
import com.neusoft.om.dao.staff.StaffVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class OmInterfaceDAOImpl extends BaseDaoImpl implements OmInterfaceDAO {

	/**
	 * ���������ʶȡ��������Ϣ
	 */
	public ParamObjectCollection getRegionCollById(HashMap<String, String> paramMap) 
			throws DataAccessException {
		
		ParamObjectCollection coll = new ParamObjectCollection();
		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(" SELECT common_region_id, region_name  ");
		strBuf.append(" FROM common_region                    ");
		strBuf.append(" WHERE common_region_id = ?            ");
		
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			pst.setLong(1, Long.parseLong(paramMap.get("areaId")));
			rest = pst.executeQuery();

			while (rest.next()) {
				ParamObject obj = new ParamObject();
				obj.setId(rest.getString("common_region_id"));
				obj.setName(rest.getString("region_name"));
				coll.addParamObject(obj);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getRegionCollById(" +
					"HashMap<String, String> paramMap)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getRegionCollById(" +
					"HashMap<String, String> paramMap)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}

		return coll;
	}
	
	/**
	 * ���������ʶ�����򼶱�ȡ��������Ϣ
	 */
	public ParamObjectCollection getRegionCollByLevel(HashMap<String, String> paramMap) 
			throws DataAccessException {
		
		ParamObjectCollection coll = new ParamObjectCollection();
		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(" SELECT common_region_id,region_name                ");
		strBuf.append(" FROM common_region a                               ");
		strBuf.append(" WHERE a.region_level = 4                           ");
		strBuf.append(" CONNECT BY PRIOR common_region_id = a.up_region_id ");
		strBuf.append(" START WITH a.common_region_id =(                   ");
		strBuf.append(" SELECT common_region_id                            ");
		strBuf.append(" FROM common_region                                 ");
		strBuf.append(" WHERE region_level = ?                             ");
		strBuf.append(" CONNECT BY PRIOR up_region_id = common_region_id   ");
		strBuf.append(" START WITH common_region_id = ?)                   ");
		strBuf.append(" ORDER BY a.common_region_id                        ");
		
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			pst.setInt(1, Integer.parseInt(paramMap.get("areaLevel")));
			pst.setLong(2, Long.parseLong(paramMap.get("areaId")));
			rest = pst.executeQuery();

			while (rest.next()) {
				ParamObject obj = new ParamObject();
				obj.setId(rest.getString("common_region_id"));
				obj.setName(rest.getString("region_name"));
				coll.addParamObject(obj);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getRegionCollByLevel(" +
					"HashMap<String, String> paramMap)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getRegionCollByLevel(" +
					"HashMap<String, String> paramMap)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}

		return coll;
	}
	
	/**
	 * ���������ʶȡ������������Ϣ
	 */
	public ParamObjectCollection getAllCityCollById(HashMap<String, String> paramMap) 
			throws DataAccessException {
		
		ParamObjectCollection coll = new ParamObjectCollection();
		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(" SELECT common_region_id, region_name             ");
		strBuf.append(" FROM common_region                               ");
		strBuf.append(" WHERE region_level = 4                           ");
		strBuf.append(" CONNECT BY PRIOR common_region_id = up_region_id ");
		strBuf.append(" START WITH common_region_id = ?                  ");
		strBuf.append(" ORDER BY common_region_id                        ");
		
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			pst.setLong(1, Long.parseLong(paramMap.get("areaId")));
			rest = pst.executeQuery();

			while (rest.next()) {
				ParamObject obj = new ParamObject();
				obj.setId(rest.getString("common_region_id"));
				obj.setName(rest.getString("region_name"));
				coll.addParamObject(obj);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getAllCityCollById(" +
					"HashMap<String, String> paramMap)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getAllCityCollById(" +
					"HashMap<String, String> paramMap)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}

		return coll;
	}
	
	/**
	 * ���������ʶȡ������������Ϣ
	 */
	public ParamObjectCollection getAllTownCollById(HashMap<String, String> paramMap) throws DataAccessException {
		
		ParamObjectCollection coll = new ParamObjectCollection();
		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(" SELECT common_region_id, region_name ");
		strBuf.append(" FROM common_region                   ");
		strBuf.append(" WHERE region_level = 5               ");
		strBuf.append(" AND up_region_id = ?                 ");
		strBuf.append(" ORDER BY common_region_id            ");
		
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			pst.setLong(1, Long.parseLong(paramMap.get("areaId")));
			rest = pst.executeQuery();

			while (rest.next()) {
				ParamObject obj = new ParamObject();
				obj.setId(rest.getString("common_region_id"));
				obj.setName(rest.getString("region_name"));
				coll.addParamObject(obj);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getAllTownCollById(" +
					"HashMap<String, String> paramMap)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getAllTownCollById(" +
					"HashMap<String, String> paramMap)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}

		return coll;
	}
	
	/**
	 * ���ݲ���Ա����ȡ��ָ�����б���������������Ϣ
	 */
	public ParamObjectCollection getRegionCollByOperLevel(HashMap<String, String> paramMap) throws DataAccessException {
		
		ParamObjectCollection coll = new ParamObjectCollection();
		int level = 0;		
		StringBuffer strBuf = new StringBuffer();
		
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;

		try {
			level = Integer.parseInt(paramMap.get("level"));
			
			if (level == 0 || level == 1 || level == 2 || level == 3) {
				strBuf.append(" SELECT common_region_id, region_name,city_code ");
				strBuf.append(" FROM common_region                             ");
				strBuf.append(" WHERE region_level = 3 AND city_code = ?       ");
			} else {
				strBuf.append(" SELECT common_region_id, region_name,city_code ");
				strBuf.append(" FROM  common_region                            ");
				strBuf.append(" WHERE region_level IN (1,2,3)                  ");
			}
			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			if (level == 0 || level == 1 || level == 2 || level == 3) {
				pst.setString(1, paramMap.get("cityCode"));
			}
			rest = pst.executeQuery();

			while (rest.next()) {
				ParamObject obj = new ParamObject();
				obj.setId(rest.getString("city_code"));
				obj.setName(rest.getString("region_name"));
				obj.setPreserve_1(rest.getString("common_region_id"));
				coll.addParamObject(obj);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getRegionCollByOperLevel(" +
					"HashMap<String, String> paramMap)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getRegionCollByOperLevel(" +
					"HashMap<String, String> paramMap)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}

		return coll;
	}
	
	/**
	 * ȡ�ö�Ӧ�����µĵ�½�˺ź�ְԱ����
	 */
	public ParamObjectCollection getStaffCollByDealerId(HashMap<String, String> paramMap) throws DataAccessException {
		
		ParamObjectCollection coll = new ParamObjectCollection();
		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(" SELECT b.system_user_id system_user_id,              ");
		strBuf.append(" a.staff_name||'/'||b.staff_code staff_name           ");
		strBuf.append(" FROM staff a, system_user b                          ");
		strBuf.append(" WHERE a.staff_id = b.staff_id                        ");
		strBuf.append(" AND (b.channel_id = ?                                ");
		strBuf.append(" OR (b.channel_id IS NULL AND to_char(a.org_id) = ?)) ");
		strBuf.append(" AND a.status_cd = 1  and b.status_cd = 10 ");
		strBuf.append(" ORDER BY a.staff_name            ");
		
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			pst.setString(1, paramMap.get("dealerId"));
			pst.setString(2, paramMap.get("dealerId"));
			rest = pst.executeQuery();

			while (rest.next()) {
				ParamObject obj = new ParamObject();
				obj.setId(rest.getString("system_user_id"));
				obj.setName(rest.getString("staff_name"));
				coll.addParamObject(obj);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getStaffCollByDealerId(" +
					"HashMap<String, String> paramMap)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getStaffCollByDealerId(" +
					"HashMap<String, String> paramMap)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}

		return coll;
	}
	/**
	 * ����city_code�������е���֯������������Դ�������ṩ
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getOrganCollByCityCode(String cityCode) throws DataAccessException{
		ParamObjectCollection coll = new ParamObjectCollection();
		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(" SELECT distinct org_id, org_content, parent_org_id     	");
		strBuf.append(" FROM (											");
		strBuf.append(" SELECT a.* 										");
		strBuf.append(" FROM orgnization a, common_region b				");
		strBuf.append(" WHERE a.common_region_id = b.common_region_id 	");
		strBuf.append(" AND b.CITY_CODE = ? )						    ");
		strBuf.append(" CONNECT BY parent_org_id = PRIOR org_id			");		
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;

		try {			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			pst.setString(1, cityCode);
			rest = pst.executeQuery();

			while (rest.next()) {
				ParamObject obj = new ParamObject();
				obj.setId(rest.getString("org_id"));
				obj.setName(rest.getString("org_content"));
				obj.setPreserve_1(rest.getString("parent_org_id"));
				coll.addParamObject(obj);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getOrganCollByCityCode --1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--getOrganCollByCityCode --2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}
		return coll;
	}
	
	/**
	 * �õ�������ĳ���������й��ţ�������Դ�������ṩ
	 * @param channelId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getSystemUserCollByChannelId(int channelId) throws DataAccessException{
		ParamObjectCollection coll = new ParamObjectCollection();
		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(" SELECT a.system_user_id , 							");
		strBuf.append(" b.staff_name||'/'||a.staff_code system_user_name  	");
		strBuf.append(" FROM system_user a, staff b           				");
		strBuf.append(" WHERE a.STAFF_ID = b.STAFF_ID                       ");
		strBuf.append(" AND a.channel_id  = ? AND a.status_cd = 10 			");
		strBuf.append(" AND b.status_cd = 1			");
		strBuf.append(" ORDER BY system_user_name       					");

		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;
		try {			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			pst.setString(1, String.valueOf(channelId));
			rest = pst.executeQuery();
			while (rest.next()) {
				ParamObject obj = new ParamObject();
				obj.setId(rest.getString("system_user_id"));
				obj.setName(rest.getString("system_user_name"));
				coll.addParamObject(obj);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"getSystemUserCollByChannelId(int channelId)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"getSystemUserCollByChannelId(int channelId)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}

		return coll;
	}
	
	/**
	 * �õ�ָ����֯�����ڵ����й��ţ�������Դ�������ṩ
	 * @param orgId
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getSystemUserCollByOrgId(int orgId) throws DataAccessException{
		ParamObjectCollection coll = new ParamObjectCollection();
		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(" SELECT a.system_user_id , 							");
		strBuf.append(" b.staff_name||'/'||a.staff_code system_user_name 	");
		strBuf.append(" FROM system_user a, staff b                         ");
		strBuf.append(" WHERE a.STAFF_ID = b.STAFF_ID                       ");
		strBuf.append(" AND b.org_id  = ?	                                ");
		strBuf.append(" AND a.status_cd = 10 and b.status_cd = 1            ");
		strBuf.append(" ORDER BY system_user_name                           ");
		
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			pst.setInt(1, orgId);
			rest = pst.executeQuery();

			while (rest.next()) {
				ParamObject obj = new ParamObject();
				obj.setId(rest.getString("system_user_id"));
				obj.setName(rest.getString("system_user_name"));
				coll.addParamObject(obj);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"getSystemUserCollByOrgId(int orgId)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"getSystemUserCollByOrgId(int orgId)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}
		return coll;
	}
	
	public ParamObjectCollection getCountyByParentRegionId (int parentRegionId) throws DataAccessException{
		ParamObjectCollection coll = new ParamObjectCollection();		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(" select * from common_region	");
		strBuf.append(" where region_type = 12     	");
		strBuf.append(" and up_region_id = ?	    ");		
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;
		try {			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			pst.setInt(1, parentRegionId);
			rest = pst.executeQuery();

			while (rest.next()) {
				ParamObject obj = new ParamObject();
				obj.setId(rest.getString("system_user_id"));
				obj.setName(rest.getString("system_user_name"));
				coll.addParamObject(obj);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"getCountyByParentRegionId (int parentRegionId)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"getCountyByParentRegionId (int parentRegionId)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}
		return coll;
	}
	
	public List getContainerColl (ContainerVO vo) throws DataAccessException{
		List list = new ArrayList();	
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(" select f_key, f_container from om_container_t where 1=1");		
		int key = vo.getKey();
		if(key != 0){
			strBuf.append(" and f_key = ?");
		}
		String container = vo.getContainer();
		if(container != null && !container.equals("")){
			strBuf.append(" and f_container = ?");
		}
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;
		try {			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			int i=1;
			if(key != 0){
				pst.setInt(i++, key);
			}
			if(container != null && !container.equals("")){
				pst.setString(2, container);
			}
			rest = pst.executeQuery();
			while (rest.next()) {
				ContainerVO containerVO = new ContainerVO();
				containerVO.setKey(rest.getInt("f_key"));
				containerVO.setContainer(rest.getString("f_container"));
				list.add(containerVO);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"getContainerColl (ContainerVO vo)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"getContainerColl (ContainerVO vo)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}
		return list;
	}
	/**Ϊ�������ṩ
	 * ��ȡ������Ϣ�����ݴ����VO�����õ����Բ�ѯ�����з��������ļ�¼����List��
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public List getRegionCollByVO(RegionVO vo) throws DataAccessException{
		List list = new ArrayList();
		String cityCode = vo.getCityCode();
		String regionCode = vo.getRegionCode();
		String regionDesc = vo.getRegionDesc();
		int regionId = vo.getRegionId();
		int regionLevel = vo.getRegionLevel();
		String regionName = vo.getRegionName();
		String regionType = vo.getRegionType();
		int upRegionId = vo.getUpRegionId();
		StringBuffer buf = new StringBuffer();
		buf.append("select * from common_region where 1=1");
		if(cityCode != null && !cityCode.equals("")){
			buf.append(" and city_code = ?");
		}
		if(regionCode != null && !regionCode.equals("")){
			buf.append(" and region_code = ?");
		}
		if(regionDesc != null && !regionDesc.equals("")){
			buf.append(" and region_desc = ?");
		}
		if(regionId != 0){
			buf.append(" and common_region_id = ?");
		}
		if(regionLevel != 0){
			buf.append(" and region_level = ?");
		}
		if(regionName != null && !regionName.equals("")){
			buf.append(" and region_name = ?");
		}
		if(regionType != null && !regionType.equals("")){
			buf.append(" and region_type = ?");
		}
		if(upRegionId != 0){
			buf.append(" and up_region_id = ?");
		}
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;
		try {			
			conn = getConnection();
			pst = conn.prepareStatement(buf.toString());
			int i=1;
			if(cityCode != null && !cityCode.equals("")){
				pst.setString(i++, cityCode);
			}
			if(regionCode != null && !regionCode.equals("")){
				pst.setString(i++, regionCode);
			}
			if(regionDesc != null && !regionDesc.equals("")){
				pst.setString(i++, regionDesc);
			}
			if(regionId != 0){
				pst.setInt(i++, regionId);;
			}
			if(regionLevel != 0){
				pst.setInt(i++, regionLevel);
			}
			if(regionName != null && !regionName.equals("")){
				pst.setString(i++, regionName);
			}
			if(regionType != null && !regionType.equals("")){
				pst.setString(i++, regionType);
			}
			if(upRegionId != 0){
				pst.setInt(i++, upRegionId);
			}
			rest = pst.executeQuery();
			while(rest.next()){
				RegionVO newRegion = new RegionVO();
				newRegion.setAttribute(rest);
				list.add(newRegion);
			}
		}catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					" getRegionCollByVO(RegionVO vo)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					" getRegionCollByVO(RegionVO vo)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}
		return list;
	}
	/** 	
	 * @param map
	 * 	CITY_CODE	����(��ֵ����Ϊ��ѯ����)	String
		COMMON_REGION_ID	����(����ֵ��ȡ���������µ���������ֵ����Ϊ��ѯ����)	String
		STAFF_ID	Ա����ʶ(��ֵ����Ϊ��ѯ����)	number
		STAFF_NAME	Ա������(֧��ģ����ѯ, ��ֵ����Ϊ��ѯ����)	String
	 * @return
	 * 	HashMap	FLAG	�ɹ�ʧ�ܱ�ʶ 1-�ɹ� 0-ʧ��	Int
				REMSG	ʧ��ʱ��ԭ��	String
				NUM	��������	int
	 * @throws DataAccessException
	 */
	public int getStaffCollCount(Map map) throws DataAccessException{
		int count = 0;
		String cityCode = (String)map.get("CITY_CODE");
		String commonRegionId = (String)map.get("COMMON_REGION_ID");
		String staffId = (String)map.get("STAFF_ID");
		String staffName = (String)map.get("STAFF_NAME");
		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append("  select count(*) ");	
		strBuf.append("  from staff a, common_region b, orgnization c ");	
		strBuf.append("  where a.org_id = c.org_id and c.common_region_id = b.common_region_id ");	
		if(staffName != null && !staffName.equals("")){
			strBuf.append("  and a.staff_name like ? ");	
		}
		if(cityCode != null && !cityCode.equals("")){
			strBuf.append("  and b.city_code = ? ");	
		}		
		if(commonRegionId != null && !commonRegionId.equals("")){
			strBuf.append("  and b.common_region_id in (   ");	
			strBuf.append("  select common_region_id  ");	
			strBuf.append("  from common_region  ");	
			strBuf.append("  connect by up_region_id = prior common_region_id ");	
			strBuf.append("  start with common_region_id = ? )");			
		}
		if(staffId != null && !staffId.equals("")){
			strBuf.append("  and a.staff_id = ? ");	
		}		          
               
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;
		try {			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			int i=1;
			if(staffName != null && !staffName.equals("")){
				pst.setString(i++, "%"+staffName+"%");
			}
			if(cityCode != null && !cityCode.equals("")){
				pst.setString(i++, cityCode);
			}
			if(commonRegionId != null && !commonRegionId.equals("")){
				pst.setString(i++, commonRegionId);
			}
			if(staffId != null && !staffId.equals("")){
				pst.setString(i++, staffId);
			}
			
			rest = pst.executeQuery();
			if (rest.next()) {
				count = rest.getInt(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					" getStaffCollCount(Map map)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					" getStaffCollCount(Map map)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}
		return count;
	}
	
	/**
	 * 
	 * @param map
	 * 	CITY_CODE	����(��ֵ����Ϊ��ѯ����)	String
		COMMON_REGION_ID	����(����ֵ��ȡ���������µ���������ֵ����Ϊ��ѯ����)	String
		STAFF_ID	Ա����ʶ(��ֵ����Ϊ��ѯ����)	number
		STAFF_NAME	Ա������(֧��ģ����ѯ, ��ֵ����Ϊ��ѯ����)	String
		BEGIN_RN	��ѯ��ʼ��	Int
		END_RN	��ѯ������	Int
	 * @return
	 * 	FLAG	�ɹ�ʧ�ܱ�ʶ 1-�ɹ� 0-ʧ��	Int
		REMSG	ʧ��ʱ��ԭ��	String
		STAFFLIST	���ϲ�ѯ����Ա���б�(list�е�ÿ��VO����Ա�����ڵ�CITY_CODE, COMMON_REGION_ID,
		STAFF_ID,
		STAFF_NAME)	List
	 * @throws DataAccessException
	 */
	public List getStaffColl(Map map) throws DataAccessException{
		List staffList = new ArrayList();
		String cityCode = (String)map.get("CITY_CODE");
		String commonRegionId = (String)map.get("COMMON_REGION_ID");
		String staffId = (String)map.get("STAFF_ID");
		String staffName = (String)map.get("STAFF_NAME");
		int beginNum = (Integer)map.get("BEGIN_RN");
		int endNum = (Integer)map.get("END_RN");
		
		StringBuffer strBuf = new StringBuffer();
		strBuf.append("  select * from( ");		
		strBuf.append("  select a.staff_id, a.staff_name, b.city_code, b.common_region_id, rownum rowcount ");	
		strBuf.append("  from staff a, common_region b, orgnization c ");	
		strBuf.append("  where a.org_id = c.org_id and c.common_region_id = b.common_region_id ");	
		if(staffName != null && !staffName.equals("")){
			strBuf.append("  and a.staff_name like ? ");	
		}
		if(cityCode != null && !cityCode.equals("")){
			strBuf.append("  and b.city_code = ? ");	
		}		
		if(commonRegionId != null && !commonRegionId.equals("")){
			strBuf.append("  and b.common_region_id in (   ");	
			strBuf.append("  select common_region_id  ");	
			strBuf.append("  from common_region  ");	
			strBuf.append("  connect by up_region_id = prior common_region_id ");	
			strBuf.append("  start with common_region_id = ? )");			
		}
		if(staffId != null && !staffId.equals("")){
			strBuf.append("  and a.staff_id = ? ");	
		}		
		strBuf.append("   and rownum < ? ");
		strBuf.append("  ) where rowcount >= ? ");              
               
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;
		try {			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf.toString());
			int i=1;
			if(staffName != null && !staffName.equals("")){
				pst.setString(i++, "%"+staffName+"%");
			}
			if(cityCode != null && !cityCode.equals("")){
				pst.setString(i++, cityCode);
			}
			if(commonRegionId != null && !commonRegionId.equals("")){
				pst.setString(i++, commonRegionId);
			}
			if(staffId != null && !staffId.equals("")){
				pst.setString(i++, staffId);
			}
			pst.setInt(i++, endNum);
			pst.setInt(i++, beginNum);
			
			rest = pst.executeQuery();
			while (rest.next()) {
				StaffVO vo = new StaffVO();
				vo.setAttribute(rest);
				staffList.add(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"getContainerColl (ContainerVO vo)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"getContainerColl (ContainerVO vo)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}
		return staffList;
	}
	
	/**Ϊ�������ṩ  -- ��һ���Է����ֶ��Ż����ƵĹ���ʹ��  
	 * �жϴ�����û��������� �Ƿ�ƥ���Լ��Ĺ��Ŷ�ָ����page_link��Ӧ������Ƿ��в�����Ȩ��
	 * @param account
	 * @param pwd
	 * @param page_link
	 * @return
	 */
	public boolean haveRight(String account, String pwd, String pageLink) throws DataAccessException{
		boolean haveRight = false;
		StringBuffer strBuf1 = new StringBuffer();
		strBuf1.append(" select f_work_pwd from om_employee_t where f_work_no = ? ");	
		
		StringBuffer buf3 = new StringBuffer();
		buf3.append(" select f_employee_id from om_employee_t where f_work_no = ? ");
		
		StringBuffer buf2 = new StringBuffer();		
        buf2.append("SELECT count(*) FROM(");
        buf2.append(" select distinct f_menu_id from om_func_role_t where f_role_id in");
        buf2.append(" ( select f_role_id from om_employee_role_relation_t ");
        buf2.append(" where f_employee_id = ? ");
        buf2.append(" and f_menu_id in (select f_menu_id from om_menu_t where f_page_link = ? ))");        
        buf2.append(" UNION SELECT p.f_menu_id FROM om_menu_t p, om_power_adjust_t q ");
        buf2.append(" WHERE p.f_menu_id = q.f_menu_id ");
        buf2.append(" AND q.f_employee_id = ? AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");
        buf2.append(" AND p.f_page_link = ? ");        
        buf2.append(" MINUS SELECT u.f_menu_id ");
        buf2.append(" FROM om_menu_t u, om_power_adjust_t v ");
        buf2.append(" WHERE u.f_menu_id = v.f_menu_id  ");
        buf2.append(" AND v.f_employee_id = ? AND v.f_admin_adjust = 2 AND v.f_exec_adjust=2 ");
        buf2.append(" AND u.f_page_link = ? )");
		
		
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;
		String empPwd = "";
		int powerCount = 0;
		String employeeId = "";
		try {			
			conn = getConnection();
			pst = conn.prepareStatement(strBuf1.toString());
			pst.setString(1, account.toUpperCase());
			rest = pst.executeQuery();
			if (rest.next()) {
				empPwd = rest.getString("f_work_pwd");				
			}
			String deCodePwd = PassWord.decode(empPwd);
			if(!deCodePwd.equals(pwd)){ //�����������
				return false; 
			}else{
				pst = conn.prepareStatement(buf3.toString()); //��ѯ�õ����Ŷ�Ӧ��ְԱ����
				pst.setString(1, account.toUpperCase());
				rest = pst.executeQuery();
				if(rest.next()){
					employeeId = rest.getString("f_employee_id");
				}
				if(!employeeId.equals("")){
					pst = conn.prepareStatement(buf2.toString());
					pst.setString(1, employeeId);
					pst.setString(2, pageLink);
					pst.setString(3, employeeId);
					pst.setString(4, pageLink);
					pst.setString(5, employeeId);
					pst.setString(6, pageLink);
					rest = pst.executeQuery();
					if (rest.next()) {
						powerCount = rest.getInt(1);
					}
				}				
			}
			if(powerCount > 0){ //����ӵ�и������Ȩ��
				haveRight = true;
			}else{
				haveRight = false;
			}
			
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"haveRight(String account, String pwd, String pageLink)--1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "OmInterfaceDAOImpl--" +
					"haveRight(String account, String pwd, String pageLink)--2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pst, conn);
		}
		return haveRight;
	}
	
	/**
	 * �����������֮���������е���֯����
	 * @param level1
	 * @param level2
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganByAreaLevel1(int level1, int level2,String cityCode) throws DataAccessException{
		OrganColl organColl = new OrganColl();
		String level = getLevel(level1, level2);
        StringBuffer buf = new StringBuffer();         
        buf.append(" SELECT a.* ");
        buf.append(" FROM orgnization a, common_region b " );
        buf.append(" WHERE a.common_region_id = b.common_region_id");
        buf.append(" AND b.region_level IN("+level+") and   b.city_code= ? ");            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, cityCode);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                OrganVO organVO = new OrganVO();
                organVO.setAttribute(rest);
                organColl.addOrgan(organVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OmInterfaceDAOImpl--getOrganByAreaLevel-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OmInterfaceDAOImpl--getOrganByAreaLevel-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return organColl;
	}
	
	public OrganColl getOrganByAreaLevel(int level1, int level2) throws DataAccessException{
		OrganColl organColl = new OrganColl();
		String level = getLevel(level1, level2);
        StringBuffer buf = new StringBuffer();         
        buf.append(" SELECT distinct a.* ");
        buf.append(" FROM orgnization a, common_region b " );
        buf.append(" WHERE a.common_region_id = b.common_region_id");
        buf.append(" AND b.region_level IN("+level+") ");          
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                OrganVO organVO = new OrganVO();
                organVO.setAttribute(rest);
                organColl.addOrgan(organVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganByAreaLevel(int level1, int level2)-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganByAreaLevel(int level1, int level2)-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return organColl;
	}
	/**
	 * �õ�ʡ��(minLevel)�����¼�������areaId���ϼ���areaIdȷ��������֮���������������֯�����ļ���
	 * @param minLevel
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganCollByAuthAreaId(String areaId) throws DataAccessException{
		OrganColl organColl = new OrganColl();
    	List areaIdList = getAreaIdList(areaId);
    	String idField = "('"+areaId+"'";
    	for(int i=1; i < areaIdList.size(); i++){
    		idField = idField + ",'"+(String)areaIdList.get(i)+"'";
    	}
    	idField = idField + ")";
        StringBuffer buf = new StringBuffer();
        buf.append(" select a.* from om_organ_t a, om_area_t b where a.f_area_id = b.f_area_id ");
        buf.append(" and a.f_area_id in ");
        buf.append( idField );
        buf.append("  and a.f_parent_organ_id is null ");
        buf.append(" union ");
        buf.append(" select a.* from om_organ_t a, om_area_t b ");
        buf.append(" where a.f_area_id = b.f_area_id ");
        buf.append(" and a.f_area_id in ");
        buf.append(idField);
        
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            //pstmt.setString(1,idField);
            //pstmt.setString(2,idField);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                OrganVO organVO = new OrganVO();
                organVO.setAttribute(rest);
                organColl.addOrgan(organVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganCollByAuthAreaId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganCollByAuthAreaId-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return organColl;
	}
    /**
     * �õ���������֮�����������ְԱ
     * Ϊ��Դ-�������ṩ
     * @param level1
     * @param level2
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getEmployeeByAreaLevel1(int level1, int level2,String cityCode) throws DataAccessException{
    	EmployeeColl employeeColl = new EmployeeColl();
        StringBuffer buf = new StringBuffer();        
        String level = getLevel(level1, level2);
        buf.append(" SELECT a.* ");
        buf.append(" FROM OM_EMPLOYEE_T a, OM_AREA_T b ");
        buf.append(" WHERE a.f_area_id = b.f_area_id AND b.f_area_level IN (" );
        buf.append(level);        
        buf.append(") and  a.f_city_code= ? ") ;            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, cityCode);
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	EmployeeVO employeeVO = new EmployeeVO();
            	employeeVO.setAttribute(rest);
            	employeeColl.addElement(employeeVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getEmployeeByAreaLevel-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getEmployeeByAreaLevel-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
    	return employeeColl;
    }
    public EmployeeColl getEmployeeByAreaLevel(int level1, int level2) throws DataAccessException{
    	EmployeeColl employeeColl = new EmployeeColl();
        StringBuffer buf = new StringBuffer();        
        String level = getLevel(level1, level2);
        buf.append(" SELECT a.* " );
        buf.append(" FROM OM_EMPLOYEE_T a, OM_AREA_T b ");
        buf.append(" WHERE a.f_area_id = b.f_area_id AND b.f_area_level IN (" + level + ")") ;            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	EmployeeVO employeeVO = new EmployeeVO();
            	employeeVO.setAttribute(rest);
            	employeeColl.addElement(employeeVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getEmployeeByAreaLevel-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getEmployeeByAreaLevel-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
    	return employeeColl;
    }
    
    public EmployeeColl getEmployeeByArea(String areaId) throws DataAccessException{
    	EmployeeColl employeeColl = new EmployeeColl();
    	List areaIdList = getAreaIdList(areaId);
    	String idField = "('"+areaId+"'";
    	for(int i=1; i < areaIdList.size(); i++){
    		idField = idField + ",'"+(String)areaIdList.get(i)+"'";
    	}
    	idField = idField + ")";
        StringBuffer buf = new StringBuffer();   
        buf.append(" select a.*");
        buf.append(" from om_employee_t a, om_area_t b, om_organ_t c");
        buf.append(" where a.f_organ_id = c.f_organ_id ");
        buf.append(" and b.f_area_id = c.F_AREA_ID and b.F_AREA_Id in ");
        buf.append(idField);
        buf.append(" and a.f_status = 0 ");            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	EmployeeVO employeeVO = new EmployeeVO();
            	//employeeVO.setAttribute(rest);
            	employeeVO.setAttribute(rest);
            	employeeColl.addElement(employeeVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getEmployeeByArea-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getEmployeeByArea-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }

    	return employeeColl;
    }
    private String getLevel(int level1, int level2){
    	String level = null;
    	for(int i = level1; i < level2+1; i ++){
    		if(level == null || level.trim().equals("")){
    			level = String.valueOf(i);
    		}else{
    			level = level+","+String.valueOf(i);
    		}    		
    	}
    	return level;
    }
    /*
     * �õ�areaIdȷ���������ϼ����ϼ����ϼ�....ֱ��ʡ�ݵ�����areaId
     */
    private List getAreaIdList(String areaId){
    	List list = new ArrayList();
    	String parentAreaId="";
    	int areaLevel = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
    	try{
    		conn = getConnection();
	    	while(areaLevel != 2){
		        StringBuffer buf = new StringBuffer();   
		        buf.append(" select up_region_id, region_level from common_region where common_region_id = ?");            
		        String sql = buf.toString();  	            
	            pstmt = conn.prepareStatement(sql);
	            pstmt.setString(1,areaId);
	            rest = pstmt.executeQuery();              
	            while(rest.next()){
	            	parentAreaId = rest.getString("up_region_id");
	            	areaLevel = rest.getInt("region_level");
	            	list.add(areaId);
	            	areaId = parentAreaId;
	            }
	            close(pstmt);
	    	}
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getAreaIdList-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getAreaIdList-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }

    	return list;
    }
    
    /**
     * ����ְԱ����õ�Ա����Ϣ
     * @param staffId
     * @return
     * @throws DataAccessException
     */
    public EmployeeVO getEmpByStaffId(String staffId) throws DataAccessException{
    	EmployeeVO empVO = new EmployeeVO();
        StringBuffer buf = new StringBuffer();     
        buf.append(" SELECT * from om_employee_t where f_employee_id = ? ") ;            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, staffId);
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	empVO.setAttribute(rest);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getEmpByStaffId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getEmpByStaffId-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
    	return empVO;
    }
    
    /**
     * ���ݹ��ű���õ�Ա����Ϣ
     * @param staffId
     * @return
     * @throws DataAccessException
     */
    public EmployeeVO getEmpBySystemUserId(String systemUserId) throws DataAccessException{
    	EmployeeVO empVO = new EmployeeVO();
        StringBuffer buf = new StringBuffer();     
        buf.append(" SELECT * from om_employee_t where f_employee_id = ? ") ;            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, systemUserId);
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	empVO.setAttribute(rest);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getEmpBySystemUserId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"OmInterfaceDAOImpl--getEmpBySystemUserId-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
    	return empVO;
    }
}
