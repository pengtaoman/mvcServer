package com.neusoft.om.dao.paramMaint;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.neusoft.common.DBPool;
import com.neusoft.common.ParamObjectCollection;
import com.neusoft.common.SysException;
import com.neusoft.common.SysLog;
import com.neusoft.popedom.ParamPowerInfo;
import com.neusoft.popedom.ParamPowerInfoCollection;
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;

/**
 * <b>Version：</b> 1.0
 * <p>
 * <b>Author：</b> Liurc
 * <p>
 * <b>Copyright：</b> Copyright (c) 2003 Neusoft Company
 * <p>
 * <b>Create Date：</b> 2003.01.4
 * <p>
 * <b>Description：</b>
 * <p>
 * 角色参数关系维护类 bm_param_role_power_t
 * 
 * <p>
 * <hr>
 * <b>Modification:</b>
 * <p>
 * 
 * <p>
 */

public class ParamPowerMaint {
	private static final SysLog sysLog = SysLog.getInstance(new Long(40));

	private static final String className = ParamPowerMaint.class.getName();
	
	private static ICacheManager manager = CacheConfig.manager;
	
	private final static String PARAM_LABLE = "ParamCollectionMap";

//	private static Map paramPowerMap = Collections
//			.synchronizedMap(new HashMap());

	/**
	 * 写日志方法
	 */
	private static void log(int level, String function, String info) {
		if (level == 1) // debug
			sysLog.debug(className, function, "chenzt", info, SysLog.BY_SERVER);
		else if (level == 2)
			sysLog.info(className, function, "server", info, SysLog.BY_SERVER);
		else if (level == 3)
			sysLog.error(className, function, "server", info, SysLog.BY_SERVER);
	}

	/**
	 * 空值处理
	 */
	private String nvl(String str) {
		return str == null ? "" : str;
	}
	
	public static Map getParamPowerMap(){
		Map paramPowerMap = Collections
		.synchronizedMap(new HashMap());
		try {
			paramPowerMap = (Map)manager.peek(PARAM_LABLE);
		} catch (CachingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return paramPowerMap==null?new HashMap():paramPowerMap;
	}

	/**
	 * 获取参数角色表中所有数据
	 */
//	public static void getAllParamRolePower() {
//		
//		DBPool dbPool = null;
//		Connection conn = null;
//		PreparedStatement pstmt = null;
//		ResultSet rest = null;
//		StringBuffer sql = new StringBuffer();
//		sql.append("select * from bm_param_role_power_t");
//		getParamPowerMap().clear();
//		
//		
//		try {
//			dbPool = DBPool.getInstance();
//			conn = dbPool.getConn(40);
//			pstmt = conn.prepareStatement(sql.toString());
//			rest = pstmt.executeQuery();
//			while (rest.next()) {
//				StringBuffer str_key = new StringBuffer();
//				str_key.append(rest.getString("r_city_code"));
//				str_key.append(rest.getInt("role_id"));
//				str_key.append(rest.getString("table_name"));
//				putParamRoleObj(str_key.toString(), rest);
//			} 
//		} catch (SQLException e) {
//			log(3, "getAllParamRolePower", "SQL执行错误: " + e.getMessage());
//		} finally {
//			try {
//				if (rest != null)
//					rest.close();
//				if (pstmt != null)
//					pstmt.close();
//				dbPool.disConn(conn);
//			} catch (SQLException e) {
//				log(3, "getAllParamRolePower", "数据库断开失败: " + e.getMessage());
//			}
//		} // End final
//		try {
//			manager.putCacheObject(PARAM_LABLE,getParamPowerMap());
//		} catch (CachingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}

	/**
	 * 从表中根据地市编号，角色名称，表名，获取相关记录信息，并添加到 Map中，Key为r_city_code+" "+role_id"
	 * "+table_name;
	 * 
	 * @param city_code
	 * @param role_id
	 * @param table_name
	 */
	public static void setParamRolePowerMap(String city_code, int role_id,
			String table_name) {
		StringBuffer strBuf = new StringBuffer();
		strBuf.append(city_code).append(" ");
		strBuf.append(role_id).append(" ");
		strBuf.append(table_name);
		String key = strBuf.toString();
		getParamPowerMap().remove(key);
		StringBuffer sql = new StringBuffer();
		sql.append("select * from bm_param_role_power_t where r_city_code='"+city_code+"' and role_id="+role_id+" and upper(table_name)='"+table_name.toUpperCase()+"'");

		putParamCollection(key,sql.toString(),null);
		

//		DBPool dbPool = null;
//		Connection conn = null;
//		PreparedStatement pstmt = null;
//		ResultSet rest = null;
//		
//		try {
//			dbPool = DBPool.getInstance();
//			conn = dbPool.getConn(40);
//			pstmt = conn.prepareStatement(sql.toString());
//			pstmt.setString(1, city_code);
//			pstmt.setInt(2, role_id);
//			pstmt.setString(3, table_name.toUpperCase());
//			rest = pstmt.executeQuery();
//			while (rest.next()) {
//				putParamRoleObj(key, rest);
//			}
//		} catch (SQLException e) {
//			log(3, "setParamRolePowerMap", "SQL执行错误: " + e.getMessage());
//		} finally {
//			try {
//				if (rest != null)
//					rest.close();
//				if (pstmt != null)
//					pstmt.close();
//				dbPool.disConn(conn);
//			} catch (SQLException e) {
//				log(3, "setParamRolePowerMap", "数据库断开失败: " + e.getMessage());
//			}
//		} // End final

	}

	/**
	 * new 060714 yangxg 解除数据角色和行政区域的关联
	 * 从表中根据地市编号，角色名称，表名，获取相关记录信息，并添加到 Map中，Key为r_city_code+" "+role_id"
	 * "+table_name;
	 * 
	 * @param account
	 * @param table_name
	 */
	public static void setDataRolePowerMap(String account,
			String table_name) {
		StringBuffer strBuf = new StringBuffer();
		//strBuf.append(city_code).append(" ");
		strBuf.append(account).append(" ");
		strBuf.append(table_name);
		String key = strBuf.toString();
		
		String sql = ParamCommonTool.getQueryStringForEmp(account,table_name);
		
		getParamPowerMap().remove(key);
        String param [] = new String[3];
        param[0]= table_name.toUpperCase();
        param[1]= account;
        param[2]= account;
		
		    putParamCollection(key,sql,param);
        

	}
	/**
	 * 从记录集中获取ParamPowerInfo对象，对应与strkey在paramPowerMap中是否存在集合对象，
	 * 存在：在集合中加入该ParamPowerInfo对象；不存在：生成该集合，加入该对象，并添加到映射中
	 * 
	 * @param str_key
	 * @param rest
	 * @throws SQLException
	 */
	private static void putParamRoleObj(String str_key, ResultSet rest)
			throws SQLException {
        Map paramPowerMap = getParamPowerMap();
		if (paramPowerMap.containsKey(str_key)) {
			ParamPowerInfoCollection col = (ParamPowerInfoCollection) getParamPowerMap()
					.get(str_key);
			ParamPowerInfo pi = new ParamPowerInfo();
			pi.setAttribute(rest);
			col.addParamPowerInfo(pi);
		} else {
			ParamPowerInfoCollection col = new ParamPowerInfoCollection();
			ParamPowerInfo pi = new ParamPowerInfo();
			pi.setAttribute(rest);
			col.addParamPowerInfo(pi);
            paramPowerMap.put(str_key, col);
		}
		
		try {
			manager.putCacheObject(PARAM_LABLE,paramPowerMap);
//            System.out.println("manager.putCacheObject");
		} catch (CachingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private static void putParamRoleColl(String str_key,
			ParamPowerInfoCollection coll) {
		Map paramPowerMap = getParamPowerMap();
		if (paramPowerMap.containsKey(str_key)) {
			paramPowerMap.remove(str_key);
		}
		paramPowerMap.put(str_key, coll);

		try {
			manager.putCacheObject(PARAM_LABLE, paramPowerMap);
			// System.out.println("manager.putCacheObject");
		} catch (CachingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 添加已初始化的对象，对应与strkey在paramPowerMap中是否存在集合对象，
	 * 存在：在集合中加入该ParamPowerInfo对象；不存在：生成该集合，加入该对象，并添加到映射中
	 * 
	 * @param str_key
	 * @param rest
	 * @throws SQLException
	 */
	private static void putParamRoleObj(String str_key, ParamPowerInfo info) {
		if (getParamPowerMap().containsKey(str_key)) {
			ParamPowerInfoCollection col = (ParamPowerInfoCollection) getParamPowerMap()
					.get(str_key);
			col.addParamPowerInfo(info);
		} else {
			ParamPowerInfoCollection col = new ParamPowerInfoCollection();
			col.addParamPowerInfo(info);
			getParamPowerMap().put(str_key, col);
		}
	}

	/**
	 * 根据城市编号，角色ID，参数表名，从Map中取得相应参数表的ParamPowerInfoCollection对象
	 * 
	 * @param city_code
	 * @param role_id
	 * @param table_name
	 * @return
	 */ 
	public static ParamPowerInfoCollection getParamRolePower(String city_code,
			int role_id, String table_name) {

		StringBuffer str_key = new StringBuffer();
		str_key.append(city_code).append(" ");
		str_key.append(role_id).append(" ");
		str_key.append(table_name);

		if (getParamPowerMap().get(str_key.toString()) == null) {
			setParamRolePowerMap(city_code, role_id, table_name);
		}
		return (ParamPowerInfoCollection) getParamPowerMap().get(str_key.toString());
	}
	
	/**
	 * 根据城市编号，操作员，参数表名，从Map中取得相应参数表的ParamPowerInfoCollection对象
	 * 
	 * @param city_code
	 * @param account
	 * @param table_name
	 * @return
	 */
	public static ParamPowerInfoCollection getDataRolePower(
			String account, String table_name) {

		StringBuffer str_key = new StringBuffer();
//		str_key.append(city_code).append(" ");
		str_key.append(account).append(" ");
		str_key.append(table_name);

		if (getParamPowerMap().get(str_key.toString()) == null) {
//			setParamRolePowerMap(city_code, role_id, table_name);
			setDataRolePowerMap(account, table_name);
		}
//		try {
//			manager.putCacheObject(PARAM_LABLE,getParamPowerMap());
//		} catch (CachingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		return (ParamPowerInfoCollection) getParamPowerMap().get(str_key.toString());
	}

	/**
	 * 根据城市编号，角色ID，参数表名，从Map中取得相应参数表的ParamPowerInfoCollection对象
	 * 
	 * @param city_code
	 * @param role_id
	 * @param table_name
	 * @return
	 */
	public static ParamPowerInfoCollection getParamRolePower(String city_code,
			int role_id, String table_name, String p_city_code,
			int service_kind, int apply_event, int sub_service_kind,
			int innet_method, long pre_num1, long pre_num2, String pre_var1,
			String pre_var2) {

		StringBuffer str_key = new StringBuffer();
		str_key.append(city_code).append(" ");
		str_key.append(role_id).append(" ");
		str_key.append(table_name);

		// if(paramPowerMap.get(str_key.toString())==null){
		setParamRolePowerMap(city_code, role_id, table_name);
		// }

		ParamPowerInfoCollection infoCol = (ParamPowerInfoCollection) getParamPowerMap()
				.get(str_key.toString());

		ParamPowerInfoCollection filterCol = new ParamPowerInfoCollection();
		if (infoCol == null)
			return filterCol;
		ParamPowerInfo info = null;
		for (int i = 0; i < infoCol.getRowCount(); i++) {
			info = infoCol.getParamPowerInfo(i);
			if (info.getP_city_code().intern() == p_city_code.intern()
					&& info.getService_kind() == service_kind
					&& info.getApply_event() == apply_event
					&& info.getSub_service_kind() == sub_service_kind
					&& info.getInnet_method() == innet_method
					&& info.getPre_num1() == pre_num1
					&& info.getPre_num2() == pre_num2
					&& info.getPre_var1() == pre_var1
					&& info.getPre_var2() == pre_var2) {
				filterCol.addParamPowerInfo(info);
			}
		}
		return filterCol;
	}

	/**
	 * 根据城市标号，角色ID删除表中的相关记录
	 * 
	 * @param city_code
	 * @param role_id
	 * @throws SysException
	 */
	public static void deleteParamRolePower(String city_code, int role_id)
			throws SysException {
		DBPool dbPool = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		StringBuffer sql = new StringBuffer();
		sql.append("delete from bm_param_role_power_t where r_city_code=? and role_id=?");
		
		boolean commitFlag = true;
		try {
			dbPool = DBPool.getInstance();
			conn = dbPool.getConn(40);
			commitFlag = conn.getAutoCommit();
			conn.setAutoCommit(false);
			pstmt = conn.prepareStatement(sql.toString());
			pstmt.setString(1, city_code);
			pstmt.setInt(2, role_id);
			pstmt.executeUpdate();
			conn.commit();
			deleteFromMap(city_code, role_id);
		} catch (SQLException e) {
			log(3, "deleteParamRolePower", "SQL执行错误: " + e.getMessage());
			try {
				conn.rollback();
			} catch (SQLException sqlE) {
			}
			throw new SysException(e.getMessage());
		} finally {
			try {
				if (pstmt != null)
					pstmt.close();
				conn.setAutoCommit(commitFlag);
				dbPool.disConn(conn);
			} catch (SQLException e) {
				log(3, "deleteParamRolePower", "数据库断开失败: " + e.getMessage());
			}
		} // End final
	}

	/**
	 * 更新角色参数表中的数据
	 * 
	 * @param city_code
	 *            地市标号
	 * @param role_id
	 *            角色ID
	 * @param delIndex
	 *            修改对象ParamPowerInfoCollection中的需要删除的索引
	 * @param addIndex
	 *            修改对象ParamPowerInfoCollection中的需要增加的索引
	 * @param infoCol
	 *            修改对象ParamPowerInfoCollection
	 * @throws SysException
	 */
	public static void updateParamRolePower(String city_code, int role_id,
			int delIndex[], int addIndex[], ParamPowerInfoCollection infoCol)
			throws SysException {
		// System.out.println(" updateParamRolePower Test!!!");
		DBPool dbPool = null;
		Connection conn = null;
		Statement pstmt = null;
		ResultSet rest = null;
		boolean commitFlag = true;
		try {
			dbPool = DBPool.getInstance();
			conn = dbPool.getConn(40);
			commitFlag = conn.getAutoCommit();
			conn.setAutoCommit(false);
			pstmt = conn.createStatement();
			ParamPowerInfo info = null;
			// System.out.println("index="+String.valueOf(delIndex.length));
			for (int i = 0; i < delIndex.length; i++) {
				info = infoCol.getParamPowerInfo(delIndex[i]);
				pstmt.addBatch(getDeleteSqlString(city_code, role_id, info));
			}
			// System.out.println("prepare sql!");
			if (dbPool.getDbType() == DBPool.DB2) {
				// System.out.println("db2 sql!");
				// System.out.println("index="+String.valueOf(addIndex.length));
				for (int j = 0; j < addIndex.length; j++) {
					info = infoCol.getParamPowerInfo(addIndex[j]);
					pstmt.addBatch(getInsertSqlString_db2(city_code, role_id,
							info));
				}
			} else {
				// System.out.println("other sql!");
				for (int j = 0; j < addIndex.length; j++) {
					info = infoCol.getParamPowerInfo(addIndex[j]);
					pstmt
							.addBatch(getInsertSqlString(city_code, role_id,
									info));
				}
			}

			pstmt.executeBatch();
			conn.commit();
			updateMap(city_code, role_id, delIndex, addIndex, infoCol);
		} catch (SQLException e) {
			log(3, "updateParamRolePower", "SQL执行错误: " + e.getMessage());
			try {
				conn.rollback();
			} catch (SQLException e2) {
			}
			throw new SysException(e.getMessage());
		} finally {
			try {
				if (pstmt != null)
					pstmt.close();
				conn.setAutoCommit(true);
				dbPool.disConn(conn);
			} catch (SQLException e) {
				log(3, "updateParamRolePower", "数据库断开失败: " + e.getMessage());
				throw new SysException(e.getMessage());
			}
		} // End final
//		try {
//			manager.putCacheObject(PARAM_LABLE,getParamPowerMap());
//		} catch (CachingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}

	/**
	 * 根据城市标号角色标号，从MAP中删除对象
	 * 
	 * @param city_code
	 *            城市标号
	 * @param role_id
	 *            角色ID
	 * @return
	 */
	private static void deleteFromMap(String city_code, int role_id) {
		StringBuffer strKeyBuf = new StringBuffer();
		strKeyBuf.append(city_code).append(" ").append(role_id);
		String strKey = strKeyBuf.toString();

		Set keySet = getParamPowerMap().keySet();
		Iterator iterator = keySet.iterator();
		String key = "";
		String subKey = "";
		while (iterator.hasNext()) {
			key = (String) iterator.next();
			subKey = key.substring(0, key.lastIndexOf(" "));
			if (strKey.intern() == subKey.intern()) {
				getParamPowerMap().remove(key);
			}
		}
	}

	/**
	 * 更新角色参数MAP中的数据
	 * 
	 * @param city_code
	 *            地市标号
	 * @param role_id
	 *            角色ID
	 * @param delIndex
	 *            修改对象ParamPowerInfoCollection中的需要删除的索引
	 * @param addIndex
	 *            修改对象ParamPowerInfoCollection中的需要增加的索引
	 * @param infoCol
	 *            修改对象ParamPowerInfoCollection
	 * 
	 */
	private static void updateMap(String city_code, int role_id,
			int delIndex[], int addIndex[], ParamPowerInfoCollection infoCol) {

		StringBuffer strKeyBuf = null;
		for (int i = 0; i < delIndex.length; i++) {
			ParamPowerInfo info = infoCol.getParamPowerInfo(delIndex[i]);
			strKeyBuf = new StringBuffer();
			strKeyBuf.append(city_code).append(" ");
			strKeyBuf.append(role_id).append(" ");
			strKeyBuf.append(info.getTable_name());
			getParamPowerMap().remove(strKeyBuf.toString());
		}
		for (int i = 0; i < addIndex.length; i++) {
			ParamPowerInfo info = infoCol.getParamPowerInfo(addIndex[i]);
			strKeyBuf = new StringBuffer();
			strKeyBuf.append(city_code).append(" ");
			strKeyBuf.append(role_id).append(" ");
			strKeyBuf.append(info.getTable_name());
			putParamRoleObj(strKeyBuf.toString(), info);
		}
		
		try {
			manager.putCacheObject(PARAM_LABLE,getParamPowerMap());
		} catch (CachingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 根据城市标号，，以及操作对象ParamPowerInfo，生成SQL语句
	 * 
	 * @param city_code
	 *            城市标号
	 * @param role_id
	 *            角色ID
	 * @param info
	 *            操作对象
	 * @return
	 */
	private static String getDeleteSqlString(String city_code, int role_id,
			ParamPowerInfo info) {
		StringBuffer sql = new StringBuffer();
		// sql.append("delete from bm_param_role_power_t where r_city_code='");
		// sql.append(city_code);
		// sql.append("' and role_id=");

		// 060713 yangxg 解除参数角色与区域关联
		sql.append("delete from bm_param_role_power_t where ");
		sql.append(" role_id=");
		sql.append(role_id);
		sql.append(" and table_name='");
		sql.append(info.getTable_name());
		sql.append("'");
		if ((info.getP_city_code()) != null
				&& info.getP_city_code().intern() != "".intern()) {
			sql.append(" and p_city_code = '");
			sql.append(info.getP_city_code());
			sql.append("'");
		}
		if (info.getService_kind() != -100) {
			sql.append(" and service_kind = ");
			sql.append(info.getService_kind());
		}
		if (info.getApply_event() != -100) {
			sql.append(" and apply_event = ");
			sql.append(info.getApply_event());
		}
		if (info.getSub_service_kind() != -100) {
			sql.append(" and Sub_service_kind = ");
			sql.append(info.getSub_service_kind());
		}
		if (info.getInnet_method() != -100) {
			sql.append(" and Innet_method = ");
			sql.append(info.getInnet_method());
		}
		if (info.getPre_num1() != -100) {
			sql.append(" and pre_num1 = ");
			sql.append(info.getPre_num1());
		}
		if (info.getPre_num2() != -100) {
			sql.append(" and pre_num2 = ");
			sql.append(info.getPre_num2());
		}
		if (info.getPre_var1().intern() != "".intern()
				&& info.getPre_var1() != null) {
			sql.append(" and pre_var1 = ");
			sql.append(info.getPre_var1());
		}
		if (info.getPre_var2().intern() != "".intern()
				&& info.getPre_var2() != null) {
			sql.append(" and pre_var2 = ");
			sql.append(info.getPre_var2());
		}
		if (info.isId()) {
			sql.append(" and id = ");
			sql.append(info.getId());
		} else {
			sql.append(" and ids = '");
			sql.append(info.getIds());
			sql.append("'");
		}
		// System.out.println(sql.toString());
		return sql.toString();
	}

	/**
	 * 根据城市标号，，以及操作对象ParamPowerInfo，生成SQL语句
	 * 
	 * @param city_code
	 *            城市标号
	 * @param role_id
	 *            角色ID
	 * @param info
	 *            操作对象
	 * @return
	 */
	private static String getInsertSqlString(String city_code, int role_id,
			ParamPowerInfo info) {
		StringBuffer sql = new StringBuffer();
		sql
				.append("insert into bm_param_role_power_t(r_city_code, role_id, table_name, p_city_code, service_kind,");
		sql
				.append(" apply_event, sub_service_kind, innet_method, pre_num1, pre_num2, pre_var1, pre_var2, id, ids)");
		sql.append(" values('");
		sql.append(city_code);
		sql.append("',");
		sql.append(role_id);
		sql.append(",'");
		sql.append(info.getTable_name());
		sql.append("',");
		if ((info.getP_city_code()) != null
				&& info.getP_city_code().intern() != "".intern()) {
			sql.append("'");
			sql.append(info.getP_city_code());
			sql.append("',");
		} else
			sql.append("null,");

		if (info.getService_kind() != -100) {
			sql.append(info.getService_kind());
			sql.append(",");
		} else
			sql.append("null,");

		if (info.getApply_event() != -100) {
			sql.append(info.getApply_event());
			sql.append(",");
		} else
			sql.append("null,");

		if (info.getSub_service_kind() != -100) {
			sql.append(info.getSub_service_kind());
			sql.append(",");
		} else
			sql.append("null,");

		if (info.getInnet_method() != -100) {
			sql.append(info.getInnet_method());
			sql.append(",");
		} else
			sql.append("null,");

		if (info.getPre_num1() != -100) {
			sql.append(info.getPre_num1());
			sql.append(",");
		} else
			sql.append("null,");

		if (info.getPre_num2() != -100) {
			sql.append(info.getPre_num2());
			sql.append(",");
		} else
			sql.append("null,");

		if ((info.getPre_var1()) != null
				&& info.getPre_var1().intern() != "".intern()) {
			sql.append("'");
			sql.append(info.getPre_var1());
			sql.append("',");
		} else
			sql.append("null,");

		if ((info.getPre_var2()) != null
				&& info.getPre_var2().intern() != "".intern()) {
			sql.append("'");
			sql.append(info.getPre_var2());
			sql.append("',");
		} else
			sql.append("null,");

		if (info.isId()) {
			sql.append(info.getId());
			sql.append(",null)");
		} else {
			sql.append("null,'");
			sql.append(info.getIds());
			sql.append("')");
		}

		return sql.toString();
	}

	private static String getInsertSqlString_db2(String city_code, int role_id,
			ParamPowerInfo info) {
		StringBuffer sql = new StringBuffer();
		sql.append("insert into bm_param_role_power_t values('");
		sql.append(city_code);
		sql.append("',");
		sql.append(role_id);
		sql.append(",'");
		sql.append(info.getTable_name());
		sql.append("',");
		if ((info.getP_city_code()) != null
				&& info.getP_city_code().intern() != "".intern()) {
			sql.append("'");
			sql.append(info.getP_city_code());
			sql.append("',");
		} else
			sql.append("DEFAULT,");

		if (info.getService_kind() != -100) {
			sql.append(info.getService_kind());
			sql.append(",");
		} else
			sql.append("DEFAULT,");

		if (info.getApply_event() != -100) {
			sql.append(info.getApply_event());
			sql.append(",");
		} else
			sql.append("DEFAULT,");

		if (info.getSub_service_kind() != -100) {
			sql.append(info.getSub_service_kind());
			sql.append(",");
		} else
			sql.append("DEFAULT,");

		if (info.getInnet_method() != -100) {
			sql.append(info.getInnet_method());
			sql.append(",");
		} else
			sql.append("DEFAULT,");

		if (info.isId()) {
			sql.append(info.getId());
			sql.append(",DEFAULT)");
		} else {
			sql.append("DEFAULT,'");
			sql.append(info.getIds());
			sql.append("')");
		}
		// System.out.println(sql.toString());
		return sql.toString();
	}
	
	private static void putParamCollection(String key ,String sql,String[] param){
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
        ParamPowerInfoCollection paramPowerInfoColl = null;
		ParamPowerDAO paramPowerDAO = (ParamPowerDAO) factory.getInteractionObject(ParamPowerDAO.BEAN, appContext);
        
        if(sql==null||sql.intern()==""){
            putParamRoleColl(key,null);
            return ;
        }
        
        paramPowerInfoColl = paramPowerDAO.getParamPowerInfoColl(sql,param);       
        putParamRoleColl(key,paramPowerInfoColl);
	}
}