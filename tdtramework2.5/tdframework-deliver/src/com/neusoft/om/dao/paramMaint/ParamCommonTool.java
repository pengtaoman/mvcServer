package com.neusoft.om.dao.paramMaint;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.ListIterator;
import java.util.Properties;
import java.util.Set;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import com.neusoft.common.DBPool;
import com.neusoft.common.ParamObject;
import com.neusoft.common.ParamObjectCollection;
import com.neusoft.common.ReadXML;
import com.neusoft.common.SysLog;
import com.neusoft.popedom.AccountParamPowerMaint;
import com.neusoft.popedom.ExtPerson;
import com.neusoft.popedom.ExtPersonMaint;
import com.neusoft.popedom.ParamPowerInfo;
import com.neusoft.popedom.ParamPowerInfoCollection;
import com.neusoft.tdframework.common.util.FileUtil;

/**
 * 
 * <p>
 * Title: 参数权限控制公用类(该类需要进行同步操作，会产生数据不全的问题)
 * </p>
 * <p>
 * Description:获取参数表bm_param_role_power_t中的数据并加入check标记 ＝》getAllTableData
 * 获取参数表bm_param_account_power_t中的数据并加入check标记 ＝》getAllAccountTableData
 * 从配置文件中获取需要控制权限的参数表信息 ＝》getParamTable
 * </p>
 * <p>
 * Copyright: Copyright (c) 2003
 * </p>
 * <p>
 * Company:Neusoft
 * </p>
 * 
 * @author Liurc
 * @version 1.0
 */
public class ParamCommonTool {
	private static final SysLog sysLog = SysLog.getInstance(new Long(40));

	private static final String className = ParamCommonTool.class.getName();

	/** 存放配置文件信息 */
	private static HashMap nodeMap = new HashMap();

	private static ArrayList list = null;

	private static ParamObjectCollection paramTableCol = null;

	// 业务类型.
	private static ParamObjectCollection serviceKind = null;

	/**
	 * 获取配置文件中，所配置的表信息，主要用于下拉框
	 */
	public static ParamObjectCollection getParamTable() {
		if (paramTableCol == null)
			setParamTable();
		return paramTableCol;
	}

	/**
	 * 设置配置文件中，所配置的表信息
	 */
	public static void setParamTable() {
		// System.out.println("setParamTable");
		if (nodeMap.size() == 0)
			if (!initMap())
				return;
		paramTableCol = new ParamObjectCollection();
		// Collection allTable = nodeMap.values();
		Iterator iterator = list.listIterator();
		while (iterator.hasNext()) {
			Properties prop = (Properties) iterator.next();
			String table_name = prop.getProperty("Tablename");
			String remark = prop.getProperty("Remark");
			ParamObject obj = new ParamObject();
			obj.setIds(table_name);
			obj.setName(remark);
			paramTableCol.addParamObject(obj);
		}
	}

	/**
	 * 初始化配置文件信息。(配置文件位置需要解耦)
	 */
	private static boolean initMap() {
		Document doc = null;
		// ArrayList list = null;
		try {
			ClassLoader loader = ParamCommonTool.class.getClassLoader();
			//System.out.println("ParamCommonTool: "+loader.getResource("ParamCommonTool"));

			// Modify by chenzt 2004.2.22,修改参数权限管理的配置文件为可配置
			String configFileName = FileUtil.getSysParams("PARAM_CONFIG");
			if (configFileName == null)
				configFileName = "ParamTables.xml";

			InputStream in = loader.getResourceAsStream(configFileName);

			InputSource ins = new InputSource(in);
			// System.out.println("read file ok!");
			doc = ReadXML.readDoc(ins);
			// System.out.println("readDoc ok!");
			list = ReadXML.getNodeBeanCollection(doc, "ParamTables/Table");
			// System.out.println("getNodeBeanCollection ok!");
		} catch (Exception e) {
			sysLog.error(className, "initMap", "server", e.getMessage(),
					SysLog.BY_SERVER);
			return false;
		}
		ListIterator iterator = list.listIterator(list.size());

		while (iterator.hasPrevious()) {
			Properties proper = (Properties) iterator.previous();
			String key = proper.getProperty("Tablename");
			if (key != null && key.trim().intern() != "".intern()) {
				nodeMap.put(key, proper);
			}
		}
		return true;
	}

	/**
	 * 获取bm_param_role_power_t表中的数据，并返回集合
	 * 
	 * @param table_name
	 *            参数表名
	 * @param city_code
	 *            城市编码
	 * @param role_id
	 *            角色编号
	 * @return
	 */
	public static ParamPowerInfoCollection getAllTableData(String table_name,
			String city_code, int role_id) {
		if (nodeMap.size() == 0)
			if (!initMap())
				return null;
		ParamPowerInfoCollection infoCol = new ParamPowerInfoCollection();
		Properties pro = (Properties) nodeMap.get(table_name.toLowerCase());

		if (pro == null) {
			// System.out.println("pro == null");
			sysLog.error(className, "getAllTableData", "server",
					"参数权限配置文件中不存在该表：" + table_name, SysLog.BY_SERVER);
			return infoCol;
		}
		// System.out.println("Properties pro ok!");
		String[] configInfo = getConfigInfo(pro);
		getConfigInfo(pro);

		DBPool dbPool = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		String sql = null;

		try {
			dbPool = DBPool.getInstance();
			if (dbPool.getDbType() == DBPool.DB2) {
				sql = getQueryString_db2(city_code, table_name, configInfo[5],
						configInfo[6], configInfo[0], true);

			} else {
				// sql =
				// getQueryString(city_code,table_name,configInfo[5],configInfo[6],configInfo[0],true);
				sql = getQueryString(city_code, table_name, configInfo, true);
			}

			conn = dbPool.getConn(40);
			pstmt = conn.prepareStatement(sql);
			// 060713 yangxg 解除参数角色与区域关联
			// pstmt.setString(1,city_code);
			int i = 1;
			pstmt.setInt(i++, role_id);
			pstmt.setString(i++, table_name);
			if (configInfo[0] != null
					&& "true".intern() == configInfo[0].intern()) {
				pstmt.setString(i++, city_code);
			}
			rest = pstmt.executeQuery();
			while (rest.next()) {
				infoCol.addParamPowerInfo(createParamPowerInfo(rest,
						table_name, configInfo));
			}

		} catch (SQLException e) {
			sysLog.error(className, "getAllTableData", "server",
					e.getMessage(), SysLog.BY_SERVER);
			return infoCol;
		} finally {
			try {

				if (rest != null)
					rest.close();
				if (pstmt != null)
					pstmt.close();
				dbPool.disConn(conn);
			} catch (SQLException e) {
				sysLog.error(className, "getAllTableData", "server", e
						.getMessage(), SysLog.BY_SERVER);
			}
		} // End final
		return infoCol;
	}
	/**
	 * 获取tableName表中的数据，并返回集合
	 * 
	 * @param table_name
	 *            参数表名
	 * @param city_code
	 *            城市编码
	 * @return
	 */
	public static ParamPowerInfoCollection getSubSystemTableData(String table_name, String city_code){
		//System.out.println("cyj test :getAllAccountTableData");
		if(nodeMap.size() == 0)
			if(!initMap())
				return null;
		ParamPowerInfoCollection infoCol = new ParamPowerInfoCollection();
		Properties pro = (Properties)nodeMap.get(table_name.toLowerCase());
		if(pro == null){
			sysLog.error(className,"getSubSystemTableData","server","参数权限配置文件中不存在该表："+table_name,SysLog.BY_SERVER);
			return infoCol;
		}
		String []configInfo = getConfigInfo(pro);
		getConfigInfo(pro);

		DBPool dbPool = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer sql = new StringBuffer("");
		try {
			dbPool = DBPool.getInstance();
			
			sql.append("select a.* ,1 check_option ,1 sign  from ").append(table_name).append(" a ");
			String ifCity = configInfo[0];
			if(ifCity != null && "true".intern() == ifCity.intern()){
				sql.append(" where city_code = ? ");
			}
			if (configInfo[5] != null && configInfo[5].trim().intern() != "".intern()) {
				sql.append(" order by a.").append(configInfo[5]);
			} else if (configInfo[6] != null && configInfo[6].trim().intern() != "".intern()) {
				sql.append(" order by a.").append(configInfo[6]);
			}
			
			conn = dbPool.getConn(40);
			pstmt = conn.prepareStatement(sql.toString());
			
			int i = 1;
			if(ifCity != null && "true".intern() == ifCity.intern()){
				pstmt.setString(i++,city_code);
			}
			rest = pstmt.executeQuery();
			while(rest.next()){ 
				infoCol.addParamPowerInfo(createParamPowerInfo(rest,table_name,configInfo));
			}
			
			//从获取的全部微调数据中根据角色的配置修改checkOption和roleCheck
			//filterAccountParamRole(infoCol,city_code,account,table_name);
		} catch(SQLException e) {
			sysLog.error(className,"getSubSystemTableData","server",e.getMessage(),SysLog.BY_SERVER);
			return infoCol;
		}
		finally	{
			try	{
				if (rest != null)
					rest.close();
				if (pstmt != null)
					pstmt.close();
				dbPool.disConn(conn);
			}
			catch(SQLException e) {
				sysLog.error(className,"getSubSystemTableData","server",e.getMessage(),SysLog.BY_SERVER);
			}
		} //End final
		return infoCol;
	}
	/**
	 * 获取bm_param_account_power_t表中的数据，并返回集合
	 * 
	 * @param table_name
	 * @param city_code
	 * @param account
	 * @return
	 */
	public static ParamPowerInfoCollection getAllAccountTableData(
			String table_name, String city_code, String account) {
		// System.out.println("cyj test :getAllAccountTableData");
		if (nodeMap.size() == 0)
			if (!initMap())
				return null;
		ParamPowerInfoCollection infoCol = new ParamPowerInfoCollection();
		Properties pro = (Properties) nodeMap.get(table_name.toLowerCase());
		if (pro == null) {
			sysLog.error(className, "getAllAccountTableData", "server",
					"参数权限配置文件中不存在该表：" + table_name, SysLog.BY_SERVER);
			return infoCol;
		}
		String[] configInfo = getConfigInfo(pro);
		getConfigInfo(pro);

		DBPool dbPool = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		String sql = null;
		try {
			dbPool = DBPool.getInstance();
			if (dbPool.getDbType() == DBPool.DB2) {
				sql = getQueryString_db2(city_code, table_name, configInfo[5],
						configInfo[6], configInfo[0], false);
				// getQueryString(city_code,table_name,configInfo,false);
			} else {
				sql = getQueryString(city_code, table_name, configInfo, false);
			}
			conn = dbPool.getConn(40);
			pstmt = conn.prepareStatement(sql);
			int i = 1;
			// pstmt.setString(1,city_code);
			pstmt.setString(i++, account);
			pstmt.setString(i++, table_name);
			if (configInfo[0] != null
					&& "true".intern() == configInfo[0].intern()) {
				pstmt.setString(i++, city_code);
			}
			rest = pstmt.executeQuery();
			while (rest.next()) {
				infoCol.addParamPowerInfo(createParamPowerInfo(rest,
						table_name, configInfo));
			}

			// 从获取的全部微调数据中根据角色的配置修改checkOption和roleCheck
			// filterAccountParamRole(infoCol,city_code,account,table_name);
			filterParamData(infoCol, city_code, account, table_name);
		} catch (SQLException e) {
			sysLog.error(className, "getAllAccountTableData", "server", e
					.getMessage(), SysLog.BY_SERVER);
			return infoCol;
		} finally {
			try {
				if (rest != null)
					rest.close();
				if (pstmt != null)
					pstmt.close();
				dbPool.disConn(conn);
			} catch (SQLException e) {
				sysLog.error(className, "getAllAccountTableData", "server", e
						.getMessage(), SysLog.BY_SERVER);
			}
		} // End final
		return infoCol;
	}

	/**
	 * 根据该帐户所具有的参数角色和微调权限，过滤显示数据
	 * 
	 * @param infoCol
	 *            未过滤数据,方法处理后包含新的数据
	 * @param city_code
	 * @param account
	 * @param table_name
	 */
	private static void filterAccountParamRole(
			ParamPowerInfoCollection infoCol, String city_code, String account,
			String table_name) {
		// 获取扩展操作员信息
		if (infoCol == null)
			return;
		ExtPerson person = ExtPersonMaint.getOperatorParamRole(account,
				city_code);

		// 获取参数角色及参数角色对应的数据信息
		int param_role_id = person.getParam_role_id();
		ParamPowerInfoCollection filterCol = ParamPowerMaint.getParamRolePower(
				city_code, param_role_id, table_name);

		// 如果角色对应信息为空，不必过滤，退出
		if (filterCol == null)
			return;
		// 嵌套循环，修改微调得到的数据
		ParamPowerInfo tempInfo = null;
		for (int i = 0; i < infoCol.getRowCount(); i++) { // 按照源微调数据循环
			tempInfo = infoCol.getParamPowerInfo(i);
			// if(tempInfo.getParam_sign() == -1){

			for (int j = 0; j < filterCol.getRowCount(); j++) { // 角色数据循环
				if ((tempInfo.isId() && tempInfo.getId() == filterCol
						.getParamPowerInfo(j).getId())
						|| (!tempInfo.isId() && tempInfo.getIds().intern() == filterCol
								.getParamPowerInfo(j).getIds().intern())) {
					if (tempInfo.getParam_sign() == -1)
						infoCol.getParamPowerInfo(i).setCheck_option(0);
					// for role data check
					infoCol.getParamPowerInfo(i).setRoleCheck(0);
				}
			}
			// }
		}
	}

	/**
	 * 获取配置文件中的信息
	 * 
	 * @param pro
	 * @return
	 */
	private static String[] getConfigInfo(Properties pro) {

		String[] configInfo = new String[12];
		configInfo[0] = pro.getProperty("City_code");
		configInfo[1] = pro.getProperty("Service_kind");
		configInfo[2] = pro.getProperty("Apply_event");
		configInfo[3] = pro.getProperty("Sub_service_kind");
		configInfo[4] = pro.getProperty("Innet_method");
		configInfo[5] = pro.getProperty("Id");
		configInfo[6] = pro.getProperty("Ids");
		configInfo[7] = pro.getProperty("Name");

		configInfo[8] = pro.getProperty("Pre_num1");
		configInfo[9] = pro.getProperty("Pre_num2");
		configInfo[10] = pro.getProperty("Pre_var1");
		configInfo[11] = pro.getProperty("Pre_var2");

		return configInfo;
	}

	/**
	 * 根据记录集初始化ParamPowerInfo对象
	 * 
	 * @param rest
	 * @param table_name
	 * @param configInfo
	 * @return
	 * @throws SQLException
	 */
	private static ParamPowerInfo createParamPowerInfo(ResultSet rest,
			String table_name, String[] configInfo) throws SQLException {
		ParamPowerInfo info = new ParamPowerInfo();
		if (configInfo[0] != null && "true".intern() == configInfo[0].intern())
			info.setP_city_code(rest.getString("City_code"));
		if (configInfo[2] != null && "true".intern() == configInfo[2].intern())
			info.setApply_event(rest.getInt("Apply_event"));
		if (configInfo[1] != null && "true".intern() == configInfo[1].intern())
			info.setService_kind(rest.getInt("Service_kind"));
		if (configInfo[3] != null && "true".intern() == configInfo[3].intern())
			info.setSub_service_kind(rest.getInt("Sub_service_kind"));
		if (configInfo[4] != null && "true".intern() == configInfo[4].intern())
			info.setInnet_method(rest.getInt("Innet_method"));
		if (configInfo[5] != null
				&& configInfo[5].trim().intern() != "".intern()) {
			info.setId(rest.getLong(configInfo[5]));
			info.setIsid(true);
		} else if (configInfo[6] != null
				&& configInfo[6].trim().intern() != "".intern()) {
			info.setIds(rest.getString(configInfo[6]));
		}
		if (configInfo[8] != null
				&& configInfo[8].trim().intern() != "".intern()) {
			info.setPre_num1(rest.getLong(configInfo[8]));
		}
		if (configInfo[9] != null
				&& configInfo[9].trim().intern() != "".intern()) {
			info.setPre_num2(rest.getLong(configInfo[9]));
		}
		if (configInfo[10] != null
				&& configInfo[10].trim().intern() != "".intern()) {
			info.setPre_var1(rest.getString(configInfo[10]));
		}
		if (configInfo[11] != null
				&& configInfo[11].trim().intern() != "".intern()) {
			info.setPre_var2(rest.getString(configInfo[11]));
		}

		info.setCheck_option(rest.getInt("check_option"));
		info.setParam_sign(rest.getInt("sign"));
		info.setName(rest.getString(configInfo[7]));
		info.setTable_name(table_name);
		// for role data check
		// if(info.getCheck_option() == 1){
		info.setRoleCheck(info.getParam_sign() != -1 ? 1 : 0);
		// }
		return info;
	}

	/**
	 * 获得查询语句信息
	 * 
	 * @param city_code
	 * @param table_name
	 * @param id
	 * @param ids
	 * @param ifCity
	 * @param isRoleTab
	 *            bm_param_role_power_t false为bm_account_power_t;
	 * @return
	 */
	// private static String getQueryString(String city_code, String table_name,
	// String id, String ids, String ifCity, boolean isRoleTab){
	public static String getQueryStringForEmp(String account,String table_name) {
//		String condStr = "";
		String pkName = "";
		if (nodeMap.size() == 0)
			if (!initMap())
				return null;
		Properties pro = (Properties) nodeMap.get(table_name.toLowerCase());
		if (pro == null) {
			sysLog.error(className, "getQueryStringForEmp", "server",
					"参数权限配置文件中不存在该表：" + table_name.toLowerCase(), SysLog.BY_SERVER);
			return "";
		}
		String[] configInfo = getConfigInfo(pro);
		String id = configInfo[5];
		String ids = configInfo[6];
		String ifCity = configInfo[0];
		String pre_num1 = configInfo[8];
		String pre_num2 = configInfo[9];
		String pre_var1 = configInfo[10];
		String pre_var2 = configInfo[11];
		StringBuffer sqlKeyBuf = new StringBuffer("");
		StringBuffer sql = new StringBuffer("");
		int label = 0;

		// sqlBuf.append(" select ");
		if ("true".intern() == pro.getProperty("Service_kind").intern()) {
			sqlKeyBuf.append(" service_kind ");
			label = 1;
		}
		if ("true".intern() == pro.getProperty("Apply_event").intern()) {
			setLable(label, sqlKeyBuf);
			sqlKeyBuf.append(" Apply_event ");

		}
		if ("true".intern() == pro.getProperty("Sub_service_kind").intern()) {
			setLable(label, sqlKeyBuf);
			sqlKeyBuf.append(" Sub_service_kind ");
		}
		if ("true".intern() == pro.getProperty("Innet_method").intern()) {
			setLable(label, sqlKeyBuf);
			sqlKeyBuf.append(" Innet_method ");
		}

		if (pro.getProperty("Pre_num1") != null
				&& pro.getProperty("Pre_num1").intern() != "".intern()) {
			setLable(label, sqlKeyBuf);
			sqlKeyBuf.append(pre_num1);
		}
		if (pro.getProperty("Pre_num2") != null
				&& pro.getProperty("Pre_num2").intern() != "".intern()) {
			setLable(label, sqlKeyBuf);
			sqlKeyBuf.append(pre_num2);
		}
		if (pro.getProperty("Pre_var1") != null
				&& pro.getProperty("Pre_var1").intern() != "".intern()) {
			setLable(label, sqlKeyBuf);
			sqlKeyBuf.append(pre_var1);
		}
		if (pro.getProperty("Pre_var2") != null
				&& pro.getProperty("Pre_var2").intern() != "".intern()) {
			setLable(label, sqlKeyBuf);
			sqlKeyBuf.append(pre_var2);
		}

		sql.append(" select ");
		if (id != null && id.trim().intern() != "".intern()) {
			sql.append(" id ");
			pkName = "id";
		} else if (ids != null && ids.trim().intern() != "".intern()) {
			sql.append(" ids ");
			pkName = "ids";
		}
//		System.out.println("#"+sqlKeyBuf.toString()+"#");
		if(!sqlKeyBuf.toString().equals(""))
			sql.append(" , ").append(sqlKeyBuf);
		
		sql.append(" , ").append(" count(distinct role_id) ");
		sql.append(" from bm_param_role_power_t c ");
		sql.append(" 	, om_employee_t d");
		sql.append("    , om_employee_param_role_rel_t e");
		sql.append(" where upper(c.table_name) = ? ");
		sql.append(" 	AND d.f_employee_id = e.f_employee_id ");
		sql.append(" 	AND d.f_employee_id = ? ");
		sql.append(" 	AND e.f_param_role_id = c.role_id ");
		sql.append(" group by ( ").append(pkName);
		if(!sqlKeyBuf.toString().equals(""))
			sql.append(" , ").append(sqlKeyBuf);
		
		sql.append(" ) ");
		sql.append(" having count(distinct role_id) = ");
		sql.append(" (select count(f_param_role_id) "); 
		sql.append("		from OM_EMPLOYEE_PARAM_ROLE_REL_T  a,");
		sql.append("             om_employee_t b ");
		sql.append(" 		WHERE a.f_employee_id = b.f_employee_id ");
		sql.append(" 		AND b.f_employee_id = ? and a.f_usable_flag = 1 ) ");
		return sql.toString();
	}

	public static void setLable(int label, StringBuffer sqlBuf) {
		if (label == 1) {
			sqlBuf.append(" , ");
		} else {
			label = 1;
		}
	}

	/**
	 * 获得查询语句信息
	 * 
	 * @param city_code
	 * @param table_name
	 * @param id
	 * @param ids
	 * @param ifCity
	 * @param isRoleTab
	 *            bm_param_role_power_t false为bm_account_power_t;
	 * @return
	 */
	// private static String getQueryString(String city_code, String table_name,
	// String id, String ids, String ifCity, boolean isRoleTab){
	private static String getQueryString(String city_code, String table_name,
			String[] configInfo, boolean isRoleTab) {
		String condStr = "";
		String pkName = "";
		String id = configInfo[5];
		String ids = configInfo[6];
		String ifCity = configInfo[0];
		String pre_num1 = configInfo[8];
		String pre_num2 = configInfo[9];
		String pre_var1 = configInfo[10];
		String pre_var2 = configInfo[11];
		StringBuffer sqlBuf = new StringBuffer();
		sqlBuf.append("select source.*,");
		if (isRoleTab) {
			sqlBuf.append("-1 sign,");
			if (id != null && id.trim().intern() != "".intern()) {
				sqlBuf.append("decode(target.id");
				condStr = "target.id(+)=source." + id;
				pkName = id;
			} else if (ids != null && ids.trim().intern() != "".intern()) {
				sqlBuf.append("decode(target.ids");
				condStr = "target.ids(+)=source." + ids;
				pkName = ids;
			}
			sqlBuf.append(",null,1,0) check_option from");
		} else {
			sqlBuf
					.append("decode(target.param_sign,null,1,target.param_sign) check_option,");
			sqlBuf
					.append("decode(target.param_sign,null,-1,target.param_sign) sign from ");
			if (id != null && id.trim().intern() != "".intern()) {
				condStr = "target.id(+)=source." + id;
				pkName = id;
			} else if (ids != null && ids.trim().intern() != "".intern()) {
				condStr = "target.ids(+)=source." + ids;
				pkName = ids;
			}
		}
		sqlBuf.append(" (select * from");
		if (isRoleTab) {
			// sqlBuf.append(" bm_param_role_power_t where r_city_code=? and
			// role_id=? ");
			sqlBuf.append(" bm_param_role_power_t where role_id=? ");
		} else
			// sqlBuf.append(" bm_param_account_power_t where a_city_code=? and
			// account=? ");
			// 060713 yangxg 解除参数角色与区域关联
			sqlBuf.append(" bm_param_account_power_t  where  account=? ");
		sqlBuf.append(" and table_name=?) target,");
		sqlBuf.append(table_name);
		sqlBuf.append(" source");
		sqlBuf.append(" where ");
		sqlBuf.append(condStr);
		if (ifCity != null && "true".intern() == ifCity.intern()) {
			sqlBuf.append(" and source.city_code =? ");
		}
		Properties pro = (Properties) nodeMap.get(table_name.toLowerCase());
		if ("true".intern() == pro.getProperty("Service_kind").intern()) {
			sqlBuf.append(" and target.service_kind(+)=source.service_kind");
		}
		if ("true".intern() == pro.getProperty("Apply_event").intern()) {
			sqlBuf.append(" and target.Apply_event(+)=source.Apply_event");
		}
		if ("true".intern() == pro.getProperty("Sub_service_kind").intern()) {
			sqlBuf
					.append(" and target.Sub_service_kind(+)=source.Sub_service_kind");
		}
		if ("true".intern() == pro.getProperty("Innet_method").intern()) {
			sqlBuf.append(" and target.Innet_method(+)=source.Innet_method");
		}
		// add by jiangy
		if (pro.getProperty("Pre_num1") != null
				&& pro.getProperty("Pre_num1").intern() != "".intern()) {
			sqlBuf.append(" and target.Pre_num1(+)=source.").append(pre_num1);
		}
		if (pro.getProperty("Pre_num2") != null
				&& pro.getProperty("Pre_num2").intern() != "".intern()) {
			sqlBuf.append(" and target.Pre_num2(+)=source.").append(pre_num2);
		}
		if (pro.getProperty("Pre_var1") != null
				&& pro.getProperty("Pre_var1").intern() != "".intern()) {
			sqlBuf.append(" and target.Pre_var1(+)=source.").append(pre_var1);
		}
		if (pro.getProperty("Pre_var2") != null
				&& pro.getProperty("Pre_var2").intern() != "".intern()) {
			sqlBuf.append(" and target.Pre_var2(+)=source.").append(pre_var2);
		}
		sqlBuf.append(" order by ");
		// Properties pro = (Properties)nodeMap.get(table_name.toLowerCase());
		if ("true".intern() == pro.getProperty("Service_kind").intern()) {
			sqlBuf.append("source.service_kind, ");
		}
		if ("true".intern() == pro.getProperty("Apply_event").intern()) {
			sqlBuf.append("source.Apply_event, ");
		}
		if ("true".intern() == pro.getProperty("Sub_service_kind").intern()) {
			sqlBuf.append("source.Sub_service_kind, ");
		}
		if ("true".intern() == pro.getProperty("Innet_method").intern()) {
			sqlBuf.append("source.Innet_method, ");
		}

		if (pro.getProperty("Pre_num1") != null
				&& pro.getProperty("Pre_num1").intern() != "".intern()) {
			sqlBuf.append("source.").append(pre_num1).append(", ");
		}
		if (pro.getProperty("Pre_num2") != null
				&& pro.getProperty("Pre_num2").intern() != "".intern()) {
			sqlBuf.append("source.").append(pre_num2).append(", ");
		}
		if (pro.getProperty("Pre_var1") != null
				&& pro.getProperty("Pre_var1").intern() != "".intern()) {
			sqlBuf.append("source.").append(pre_var1).append(", ");
		}
		if (pro.getProperty("Pre_var2") != null
				&& pro.getProperty("Pre_var2").intern() != "".intern()) {
			sqlBuf.append("source.").append(pre_var2).append(", ");
		}
		sqlBuf.append(" source.");
		sqlBuf.append(pkName);
		return sqlBuf.toString();
	}

	/**
	 * 获得DB2查询语句信息
	 * 
	 * @param city_code
	 * @param table_name
	 * @param id
	 * @param ids
	 * @param ifCity
	 * @param isRoleTab
	 *            true为bm_role_power_t false为bm_account_power_t;
	 * @return
	 */
	private static String getQueryString_db2(String city_code,
			String table_name, String id, String ids, String ifCity,
			boolean isRoleTab) {
		String condStr = "";
		String pkName = "";
		StringBuffer sqlBuf = new StringBuffer();
		sqlBuf.append("select source.*,");
		if (isRoleTab) {
			sqlBuf.append("-1 sign,");
			sqlBuf.append(" case ");
			if (id != null && id.trim().intern() != "".intern()) {
				sqlBuf.append(" when target.id is null then 1 ");
				condStr = "target.id=source." + id;
				pkName = id;
			} else if (ids != null && ids.trim().intern() != "".intern()) {
				sqlBuf.append(" when target.ids is null then 1 ");
				condStr = "target.ids=source." + ids;
				pkName = ids;
			}
			sqlBuf.append("  else 0 ");
			sqlBuf.append(" end check_option from");
		} else {
			sqlBuf
					.append(" case when target.param_sign is null then 1 else target.param_sign end check_option,");
			sqlBuf
					.append(" case when target.param_sign is null then -1 else target.param_sign end  sign from ");
			if (id != null && id.trim().intern() != "".intern()) {
				condStr = "target.id=source." + id;
				pkName = id;
			} else if (ids != null && ids.trim().intern() != "".intern()) {
				condStr = "target.ids=source." + ids;
				pkName = ids;
			}
		}
		sqlBuf.append(" (select * from");
		if (isRoleTab) {
			// sqlBuf.append(" bm_param_role_power_t where r_city_code=? and
			// role_id=? ");
			// 060713 yangxg 解除参数角色与区域关联
			sqlBuf.append(" bm_param_role_power_t where role_id=? ");
		} else
			// sqlBuf.append(" bm_param_account_power_t where a_city_code=? and
			// account=? ");
			// 060713 yangxg 解除参数角色与区域关联
			sqlBuf.append(" bm_param_account_power_t  where  account=? ");
		sqlBuf.append(" and table_name=?) target right join ");
		sqlBuf.append(table_name);
		sqlBuf.append(" source");
		sqlBuf.append(" on ");
		sqlBuf.append(condStr);
		if (ifCity != null && "true".intern() == ifCity.intern()) {
			sqlBuf.append(" and source.city_code =? ");
		}
		Properties pro = (Properties) nodeMap.get(table_name.toLowerCase());
		if ("true".intern() == pro.getProperty("Service_kind").intern()) {
			sqlBuf.append(" and target.service_kind=source.service_kind");
		}
		if ("true".intern() == pro.getProperty("Apply_event").intern()) {
			sqlBuf.append(" and target.Apply_event=source.Apply_event");
		}
		if ("true".intern() == pro.getProperty("Sub_service_kind").intern()) {
			sqlBuf
					.append(" and target.Sub_service_kind=source.Sub_service_kind");
		}
		if ("true".intern() == pro.getProperty("Innet_method").intern()) {
			sqlBuf.append(" and target.Innet_method=source.Innet_method");
		}

		sqlBuf.append(" order by ");
		// Properties pro = (Properties)nodeMap.get(table_name.toLowerCase());
		if ("true".intern() == pro.getProperty("Service_kind").intern()) {
			sqlBuf.append("source.service_kind, ");
		}
		if ("true".intern() == pro.getProperty("Apply_event").intern()) {
			sqlBuf.append("source.Apply_event, ");
		}
		if ("true".intern() == pro.getProperty("Sub_service_kind").intern()) {
			sqlBuf.append("source.Sub_service_kind, ");
		}
		if ("true".intern() == pro.getProperty("Innet_method").intern()) {
			sqlBuf.append("source.Innet_method, ");
		}
		sqlBuf.append(" source.");
		sqlBuf.append(pkName);
		return sqlBuf.toString();
	}

	/**
	 * 获取业务类型
	 */
	public static ParamObjectCollection getServiceKind() {

		if (serviceKind == null)
			setServiceKind();

		return (serviceKind);
	}

	/**
	 * 设置业务类型
	 */
	public synchronized static void setServiceKind() {

		DBPool dbPool = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		String sql = "select * from bb_service_kind_t";

		serviceKind = new ParamObjectCollection();

		try {
			dbPool = DBPool.getInstance();
			conn = dbPool.getConn(40);
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setId(rest.getInt("service_kind"));
				paramObject.setName(rest.getString("service_name"));
				paramObject.setFlag1(true);
				paramObject.setPreserve1(rest.getInt("service_flag"));
				paramObject.setFlag2(true);
				paramObject.setPreserve2(rest.getInt("if_open"));
				serviceKind.addParamObject(paramObject);
			}
		} catch (SQLException e) {
			sysLog.error(className, "setServiceKind", "server", e.getMessage(),
					SysLog.BY_SERVER);

		} finally {
			try {
				if (rest != null)
					rest.close();
				if (pstmt != null)
					pstmt.close();
				dbPool.disConn(conn);
			} catch (SQLException e) {
				sysLog.error(className, "setServiceKind", "server", e
						.getMessage(), SysLog.BY_SERVER);
			}
		}

	}

	/**
	 * 根据帐户所具有的参数角色和微调权限，过滤ParamObjectCollection。
	 * 
	 * @param ParamObjectCollection
	 *            过滤对象
	 * @param city_code
	 *            帐户地市标号
	 * @param account
	 *            帐户
	 * @param param_role_id
	 *            参数角色ID
	 */
	public static ParamObjectCollection getFiltedParamObjectCollection(
			ParamObjectCollection oldCol, String city_code, String account,
			int param_role_id) {
		String p_city_code = oldCol.getCity_code();
		int service_kind = oldCol.getService_kind();
		int apply_event = oldCol.getApply_event();
		int sub_service_kind = oldCol.getSub_service_kind();
		int innet_method = oldCol.getInnet_method();
		long pre_num1 = oldCol.getPre_num1();
		long pre_num2 = oldCol.getPre_num2();
		String pre_var1 = oldCol.getPre_var1();
		String pre_var2 = oldCol.getPre_var2();
		String table_name = oldCol.getTable_name();
		// 复制静态数据
		ParamObjectCollection newCol = new ParamObjectCollection();
		for (int i = 0; i < oldCol.getRowCount(); i++) {
			newCol.addParamObject(oldCol.getParamObject(i));
		}

		boolean isId = false;

		// 获取角色数据过滤
		ParamPowerInfoCollection paramCol1 = ParamPowerMaint.getParamRolePower(
				city_code, param_role_id, table_name, p_city_code,
				service_kind, apply_event, sub_service_kind, innet_method,
				pre_num1, pre_num2, pre_var1, pre_var2);

		// 获取微调数据过滤
		ParamPowerInfoCollection paramCol2 = AccountParamPowerMaint
				.getAccountParamPower(city_code, account, table_name,
						p_city_code, service_kind, apply_event,
						sub_service_kind, innet_method, pre_num1, pre_num2,
						pre_var1, pre_var2);

		if (paramCol1 == null) {
			paramCol1 = new ParamPowerInfoCollection();
		}
		if (paramCol2 == null) {
			paramCol2 = new ParamPowerInfoCollection();
		}

		if (paramCol1.getRowCount() == 0 && paramCol2.getRowCount() == 0) {
			return newCol;
		}

		if (paramCol1.getRowCount() < 1) {
			isId = paramCol2.getParamPowerInfo(0).isId();
		} else {
			isId = paramCol1.getParamPowerInfo(0).isId();
		}

		// 整理出需要过滤的数据信息
		ParamPowerInfoCollection paramCol = compoundFilter(paramCol1, paramCol2);

		// 过滤数据信息
		if (paramCol != null && paramCol.getRowCount() > 0) {
			filterTempParamObjectCol(newCol, paramCol, isId);
		}
		return newCol;
	}

	/**
	 * 综合角色所具有参数权限信息和帐户微调参数权限信息，整理出在过滤过程中 需要删除的参数信息
	 * 
	 * @param paramCol1
	 *            角色所具有参数权限信息
	 * @param paramCol2
	 *            帐户微调参数权限信息
	 * @return 整理结果
	 */
	public static ParamPowerInfoCollection compoundFilter(
			ParamPowerInfoCollection paramCol1,
			ParamPowerInfoCollection paramCol2) {
		ParamPowerInfoCollection paramCol = new ParamPowerInfoCollection();
		// 复制角色权限信息
		for (int i = 0; i < paramCol1.getRowCount(); i++) {
			paramCol.addParamPowerInfo(paramCol1.getParamPowerInfo(i));
		}

		/**
		 * 校验微调参数权限信息，需要剔除的参数项，增加到paramCol中， 微调中，可以访问的参数项，如果角色的权限无法访问，则从paramCol
		 * 删除。
		 */
		ParamPowerInfo tempInfo = null;
		for (int i = 0; i < paramCol2.getRowCount(); i++) {
			tempInfo = paramCol2.getParamPowerInfo(i);

			if (tempInfo.getParam_sign() == 0) {
				paramCol.addParamPowerInfo(tempInfo);
			} else if (tempInfo.getParam_sign() == 1) {
				ParamPowerInfo tempInfo2 = null;
				for (int j = 0; j < paramCol.getRowCount(); j++) {
					tempInfo2 = paramCol.getParamPowerInfo(j);
					if ((tempInfo2.isId() && tempInfo2.getId() == tempInfo
							.getId())
							|| (!tempInfo2.isId() && tempInfo2.getIds()
									.intern() == tempInfo.getIds().intern())) {
						paramCol.removeElement(j);
						j--;
						if (tempInfo2.isId())
							paramCol.removeElement(new Long(tempInfo2.getId()));
						else
							paramCol.removeElement(tempInfo2.getIds());
						break;
					}
				}
			}// if(tempInfo.getParam_sign() == 0)
		}// for

		return paramCol;
	}

	/**
	 * 过滤数据信息
	 * 
	 * @param originalCol
	 *            过滤对象
	 * @param paramCol
	 *            剔除信息
	 * @param isId
	 *            该对象主键类型 true－整型 false－字符
	 */
	public static void filterTempParamObjectCol(
			ParamObjectCollection originalCol,
			ParamPowerInfoCollection paramCol, boolean isId) {
		ParamObject obj = null;
		ParamPowerInfo info = null;
		for (int i = 0; i < originalCol.getRowCount(); i++) {
			obj = originalCol.getParamObject(i);
			int id = -100;
			String ids = "";
			if (isId) {
				id = obj.getId();
			} else {
				ids = obj.getIds();
			}

			for (int j = 0; j < paramCol.getRowCount(); j++) {
				info = paramCol.getParamPowerInfo(j);
				if (isId) {
					if (info.getId() == id) {
						originalCol.removeElement(i);
						i--;
						originalCol.removeElement(new Long((long) id));
						break;
					}
				} else {
					if (info.getIds().intern() == ids.intern()) {
						originalCol.removeElement(i);
						i--;
						originalCol.removeElement(ids);

						break;
					}
				}
			}// for(j)
		}// for(i)
	}

	/**
	 * 测试方法
	 */
	private static ParamObjectCollection getTestParam() {
		DBPool dbPool = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		String sql = "select * from bm_person_level_t";// where
		// city_code='00001000'";
		DataSource data = null;
		ParamObjectCollection testCol = new ParamObjectCollection();

		try {
			Properties properties = new Properties();
			properties.put(Context.INITIAL_CONTEXT_FACTORY,
					"weblogic.jndi.WLInitialContextFactory");
			properties.put(Context.PROVIDER_URL, "t3://127.0.0.1:7001");

			InitialContext ctx = new InitialContext(properties);
			data = (DataSource) ctx.lookup("NewData");
		} catch (Exception ee) {
			ee.printStackTrace();
		}
		try {
			conn = data.getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();

			while (rest.next()) {
				ParamObject paramObject = new ParamObject();
				paramObject.setIds(rest.getString("level_code"));
				paramObject.setName(rest.getString("level_name"));
				testCol.addParamObject(paramObject);
			}
			return testCol;
		} catch (SQLException e) {
			return null;
		} finally {
			try {
				if (rest != null)
					rest.close();
				if (pstmt != null)
					pstmt.close();
			} catch (SQLException e) {
				return testCol;
			}
		}

	}

	public static void filterParamData(ParamPowerInfoCollection infoCol,
			String city_code, String account, String table_name) {
		// 获取扩展操作员信息
		if (infoCol == null)
			return;
		// ExtPerson person =
		// ExtPersonMaint.getOperatorParamRole(account,city_code);
		//		
		// //获取参数角色及参数角色对应的数据信息
		// int param_role_id = person.getParam_role_id();
		ParamPowerInfoCollection filterCol = ParamPowerMaint.getDataRolePower(
				account, table_name);

		// 如果角色对应信息为空，不必过滤，退出
		if (filterCol == null)
			return;
		// 嵌套循环，修改微调得到的数据
		ParamPowerInfo tempInfo = null;
		for (int i = 0; i < infoCol.getRowCount(); i++) { // 按照源微调数据循环
			tempInfo = infoCol.getParamPowerInfo(i);
			// if(tempInfo.getParam_sign() == -1){

			for (int j = 0; j < filterCol.getRowCount(); j++) { // 角色数据循环
				if ((tempInfo.isId() && tempInfo.getId() == filterCol
						.getParamPowerInfo(j).getId())
						|| (!tempInfo.isId() && tempInfo.getIds().intern() == filterCol
								.getParamPowerInfo(j).getIds().intern())) {
					if (tempInfo.getParam_sign() == -1)
						infoCol.getParamPowerInfo(i).setCheck_option(0);
					// for role data check
					infoCol.getParamPowerInfo(i).setRoleCheck(0);
				}
			}
			// }
		}

	}
	
	public static void filterParamColl(ParamPowerInfoCollection allInfoColl,ParamPowerInfoCollection filterInfoColl,String table_name){
		if(nodeMap.size() == 0)if(!initMap());
//		ParamPowerInfoCollection infoCol = new ParamPowerInfoCollection();
		Properties pro = (Properties)nodeMap.get(table_name.toLowerCase());
		if(pro == null){
			sysLog.error(className,"filterParamColl","server","参数权限配置文件中不存在该表："+table_name,SysLog.BY_SERVER);
			
		}
		String key = "";
		String fkey = "";
		ParamPowerInfo po = null;
		ParamPowerInfo fpo = null;
		for(int i=0; i<allInfoColl.getRowCount();i++){
			key = "";			
			po = allInfoColl.getParamPowerInfo(i);
			if(po.isId()){
				key += po.getId();
			}else{
				key += po.getIds();
			}
			for(int j=0;j<filterInfoColl.getRowCount();j++){
				fkey = "";
				fpo = filterInfoColl.getParamPowerInfo(j);
				if(fpo.isId()){
					fkey +=fpo.getId();
				}else{
					fkey +=fpo.getIds();
				}
				if ("true".intern() == pro.getProperty("Service_kind").intern()) {
					key+= po.getService_kind();
					fkey += fpo.getService_kind();
				}
				if ("true".intern() == pro.getProperty("Apply_event").intern()) {
					key+= po.getApply_event();
					fkey += fpo.getApply_event();
				}
				if ("true".intern() == pro.getProperty("Sub_service_kind").intern()) {
					key+= po.getSub_service_kind();
					fkey += fpo.getSub_service_kind();
				}
				if ("true".intern() == pro.getProperty("Innet_method").intern()) {
					key+= po.getInnet_method();
					fkey += fpo.getInnet_method();
				}

				if (pro.getProperty("Pre_num1") != null
						&& pro.getProperty("Pre_num1").intern() != "".intern()) {
					key+= po.getPre_num1();
					fkey += fpo.getPre_num1();
				}
				if (pro.getProperty("Pre_num2") != null
						&& pro.getProperty("Pre_num2").intern() != "".intern()) {
					key+= po.getPre_num2();
					fkey += fpo.getPre_num2();
				}
				if (pro.getProperty("Pre_var1") != null
						&& pro.getProperty("Pre_var1").intern() != "".intern()) {
					key+= po.getPre_var1();
					fkey += fpo.getPre_var1();
				}
				if (pro.getProperty("Pre_var2") != null
						&& pro.getProperty("Pre_var2").intern() != "".intern()) {
					key+= po.getPre_var2();
					fkey += fpo.getPre_var2();
				}
				
				if(key.intern()==fkey.intern())
					po.setCheck_option(0);
			}
		}
		
	}
	public static void filterParamObjectCol(ParamObjectCollection paramObjectColl,ParamPowerInfoCollection filterObjectColl,String table_name){
		if(nodeMap.size() == 0)if(!initMap());
//		ParamPowerInfoCollection infoCol = new ParamPowerInfoCollection();
		Properties pro = (Properties)nodeMap.get(table_name.toLowerCase());
		if(pro == null){
			sysLog.error(className,"filterParamColl","server","参数权限配置文件中不存在该表："+table_name,SysLog.BY_SERVER);
			
		}
		String key = "";
		String fkey = "";
		ParamPowerInfo po = null;
		ParamObject fpo = null;
		boolean isId = false;
		for(int i=0; i<filterObjectColl.getRowCount();i++){
			key = "";			
			po = filterObjectColl.getParamPowerInfo(i);
            isId = po.isId();
			if(isId){
				key += po.getId();
			}else{
				key += po.getIds();
			}
			for(int j=0;j<paramObjectColl.getRowCount();j++){
				fkey = "";
                String param="";
				fpo = paramObjectColl.getParamObject(j);
				if(isId){
					fkey +=fpo.getId();
				}else{
					fkey +=fpo.getIds();
				}
				if ("true".intern() == pro.getProperty("Service_kind").intern()) {
                    param+= po.getService_kind();
					if(paramObjectColl.getService_kind_str()==null||paramObjectColl.getService_kind_str().equals("-100"))
						fkey += paramObjectColl.getService_kind();
					else
						fkey += paramObjectColl.getService_kind_str();
				}
				if ("true".intern() == pro.getProperty("Apply_event").intern()) {
                    param+= po.getApply_event();
					fkey += paramObjectColl.getApply_event();
				}
				if ("true".intern() == pro.getProperty("Sub_service_kind").intern()) {
                    param+= po.getSub_service_kind();
					fkey += paramObjectColl.getSub_service_kind();
				}
				if ("true".intern() == pro.getProperty("Innet_method").intern()) {
                    param+= po.getInnet_method();
					fkey += paramObjectColl.getInnet_method();
				}

				if (pro.getProperty("Pre_num1") != null
						&& pro.getProperty("Pre_num1").intern() != "".intern()) {
                    param+= po.getPre_num1();
					fkey += paramObjectColl.getPre_num1();
				}
				if (pro.getProperty("Pre_num2") != null
						&& pro.getProperty("Pre_num2").intern() != "".intern()) {
                    param+= po.getPre_num2();
					fkey += paramObjectColl.getPre_num2();
				}
				if (pro.getProperty("Pre_var1") != null
						&& pro.getProperty("Pre_var1").intern() != "".intern()) {
                    param+= po.getPre_var1();
					fkey += paramObjectColl.getPre_var1();
				}
				if (pro.getProperty("Pre_var2") != null
						&& pro.getProperty("Pre_var2").intern() != "".intern()) {
                    param+= po.getPre_var2();
					fkey += paramObjectColl.getPre_var2();
				}
				System.out.println(key.intern().concat(param)+" = "+fkey);
				if(key.intern().concat(param).equals(fkey.intern()))
					paramObjectColl.removeElement(j);
			}
            
		}		
	}
	public static void main(String args[]) {
		ParamObjectCollection oldCol = ParamCommonTool.getTestParam();
		// oldCol.setTable_name("bm_test_param_t");
		oldCol.setTable_name("bm_person_level_t");
		// oldCol.setCity_code("00001000");
		// oldCol.setService_kind(1);
		// oldCol.setApply_event(1);
		// oldCol.setSub_service_kind(1);
		// oldCol.setInnet_method(0);

		//System.out.println("***Begin Ori WEITIAO Map***");
		ParamPowerInfoCollection col = AccountParamPowerMaint
				.getAccountParamPower("00001000", "center", "bm_person_level_t");
//		for (int i = 0; i < col.getRowCount(); i++) {
			//System.out.println(col.getParamPowerInfo(i).toString(2));
//		}
		//System.out.println("***End Ori WEITIAO Map***");
		// }

		//System.out.println("***Begin OldCol***");
//		for (int i = 0; i < oldCol.getRowCount(); i++) {
//			System.out.println(oldCol.getParamObject(i).toString(0,""));
//			System.out.println("---------------");
//		}
//		System.out.println("***End OldCol***");
//		System.out.println("");
//		System.out.println("***Begin NewCol***");
		ParamObjectCollection newObjCol = ParamCommonTool
				.getFiltedParamObjectCollection(oldCol, "00001000", "center", 1);

//		for (int i = 0; i < newObjCol.getRowCount(); i++) {
//			System.out.println(newObjCol.getParamObject(i).toString(0,""));
//			System.out.println("---------------");
//		}
//		System.out.println("***End NewCol***");
//
//		System.out.println("***Begin WEITIAO Map***");

		ParamPowerInfoCollection col3 = AccountParamPowerMaint
				.getAccountParamPower("00001000", "center", "bm_person_level_t");
//		for (int i = 0; i < col3.getRowCount(); i++) {
//			System.out.println(col3.getParamPowerInfo(i).toString(2));
//		}
//		System.out.println("***End WEITIAO Map***");
	}

}