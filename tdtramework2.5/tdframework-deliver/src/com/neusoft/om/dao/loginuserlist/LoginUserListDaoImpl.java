/**
 * 文件说明信息
 */
package com.neusoft.om.dao.loginuserlist;

import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ecside.easyda.DataAccessUtil;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.dao.DataAccessExceptionWrapper;
import com.neusoft.tdframework.dao.SqlBuilder;
import com.neusoft.tdframework.dao.TDBaseDAO;
import com.neusoft.tdframework.dao.jdbchandler.JdbcHandler;
import com.neusoft.tdframework.dao.jdbchandler.ResultSetHandler;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**<p>Module: </p>
 * <p>Description: </p>
 * <p>Remark: </p>
 * <p>Date: 2010-06-12</p>
 *
 * @author liushen
 * @version
 * 
 * <p> 修改历史</p>
 * <p> 序号 日期 修改人 修改原因</p>
 * 
 */
public class LoginUserListDaoImpl extends TDBaseDAO implements LoginUserListDAO {

    /**
     * 查询区域列表集合
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param cityCode
     * @param cityLevel
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaCollection(String cityCode, int cityLevel) throws DataAccessException {

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        StringBuffer bsql = new StringBuffer();
        // 查询结果集合
        ParamObjectCollection areaCollection = null;

        // 根据地区CODE 城市级别拼装sql
		if(cityLevel == 2){
			bsql.append("SELECT F_CITY_CODE,F_AREA_NAME FROM OM_AREA_T ");
			bsql.append("WHERE F_AREA_LEVEL IN (2,3) ORDER BY F_CITY_CODE ");
		}else if(cityLevel >= 3){
			bsql.append("SELECT F_CITY_CODE,F_AREA_NAME FROM OM_AREA_T ");
			bsql.append("WHERE F_CITY_CODE = '"+cityCode+"' AND F_AREA_LEVEL = 3 ");
			bsql.append("ORDER BY F_CITY_CODE ");
		}else if(cityLevel == 1){
			bsql.append("SELECT F_CITY_CODE,F_AREA_NAME FROM OM_AREA_T ");
			bsql.append("WHERE F_AREA_LEVEL IN (1,2,3) ");
			bsql.append("ORDER BY F_CITY_CODE ");
		}
        try {
            // 获得连接
            conn = getConnection();
            // 预处理sql
            pstmt = conn.prepareStatement(bsql.toString());
            // 执行sql语句
            rest = pstmt.executeQuery();

            areaCollection = new ParamObjectCollection();
            while (rest.next()) {
                ParamObject paramObject = new ParamObject();
                paramObject.setId(rest.getString("F_CITY_CODE"));
                paramObject.setName(rest.getString("F_AREA_NAME"));

                areaCollection.addParamObject(paramObject);
            }

        } catch (SQLException e) {
            SysLog.writeLogs("loginUserList", GlobalParameters.ERROR, "LoginUserListDaoImpl--getAreaCollection-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("loginUserList", GlobalParameters.ERROR, "LoginUserListDaoImpl--getAreaCollection-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }

        return areaCollection;
    }
	
    /**
     * 获取查询结果总数
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @return
     * @throws DataAccessException
     */
    public int getLoginUserListCount(LoginUserListVO loginUserListVO) throws DataAccessException {
        SqlBuilder sqlbd = new SqlBuilder();
        sqlbd.append("SELECT COUNT (*)             ");
        sqlbd.append("  FROM OM_LOGIN_USERLIST ");
        sqlbd.append(" WHERE 1 = 1                 ");
        // 判断条件 月份
        if (loginUserListVO != null && !"".equals(String.valueOf(loginUserListVO.getPartMm()))) {
            sqlbd.append("   AND F_PART_MM = ?  ");
            sqlbd.addArg(loginUserListVO.getPartMm());
        }
        // 判断条件 区域
        if (loginUserListVO != null && !"".equals(loginUserListVO.getPartCity())) {
            sqlbd.append("   AND F_PART_CITY = ?  ");
            sqlbd.addArg(loginUserListVO.getPartCity());
        }
        // 判断条件 登录账号
        if (loginUserListVO != null && loginUserListVO.getPersonId() != null
                && !"".equals(loginUserListVO.getPersonId())) {
            sqlbd.append("   AND PERSIONID = ?  ");
            sqlbd.addArg(loginUserListVO.getPersonId());
        }
        // 判断条件 IP地址
        if (loginUserListVO != null && loginUserListVO.getIpAddress() != null
                && !"".equals(loginUserListVO.getIpAddress())) {
            sqlbd.append("   AND IPADDRESS = ?  ");
            sqlbd.addArg(loginUserListVO.getIpAddress());
        }
        // 判断条件 登录开始时间
        if (loginUserListVO != null && loginUserListVO.getLoginTime() != null
        		&& !"".equals(loginUserListVO.getLoginTime())) {
            sqlbd.append("   AND LOGINTIME >= TO_DATE(?,'yyyy-mm-dd')      ");
            sqlbd.addArg(loginUserListVO.getLoginTime());
        }
        // 判断条件 登录结束时间
        if (loginUserListVO != null && loginUserListVO.getLogoutTime() != null
        		&& !"".equals(loginUserListVO.getLogoutTime())) {
            sqlbd.append("   AND LOGINTIME <= TO_DATE(?,'yyyy-mm-dd HH24:MI:SS')      ");
            sqlbd.addArg(loginUserListVO.getLogoutTime() + " 23:59:59");
        }

        // 取得jdbc工具类
        JdbcHandler jdbcHandler = createJdbcHandler();
        //查询结果总数
        int count = 0;

        try {
            count = jdbcHandler.getJdbcTemplate().queryForInt(sqlbd.getSQL(), sqlbd.getSQLArgs().toArray());
        } catch (org.springframework.dao.DataAccessException e) {
            SysLog.writeLogs("loginUserList", GlobalParameters.ERROR, "LoginUserListDaoImpl--getLoginUserListCount-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        }
        return count;
    }

    /**
     * 获取查询结果列表
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @return
     * @throws DataAccessException
     */
    public List getLoginUserList(LoginUserListVO loginUserListVO, int start, int end) throws DataAccessException {
        SqlBuilder sqlbd = new SqlBuilder();
        sqlbd.append("SELECT *  ");
        sqlbd.append("  FROM (SELECT ROWNUM ROWCOUNT, ");
        sqlbd.append("  U.ID, ");
        sqlbd.append("  U.PERSIONID, ");
        sqlbd.append("  U.IPADDRESS, ");
        sqlbd.append("  DECODE(U.LOGINTYPE,'0','web登陆','1','CA登陆') LOGINTYPE, ");
        sqlbd.append("  U.LOGINTIME, ");
        sqlbd.append("  U.LOGOUTTIME, ");
        sqlbd.append("  A.F_AREA_NAME LOCATION, ");
        sqlbd.append("  U.MACADDRESS MACADDRESS, ");
        sqlbd.append("  U.DNSNAME DNSNAME ");
        sqlbd.append("  FROM OM_LOGIN_USERLIST U LEFT JOIN OM_AREA_T A ON U.LOCATION = A.F_CITY_CODE");
        sqlbd.append("  WHERE 1=1 ");
        // 判断条件 月份
        if (loginUserListVO != null && !"".equals(String.valueOf(loginUserListVO.getPartMm()))) {
            sqlbd.append("   AND U.F_PART_MM = ?  ");
            sqlbd.addArg(loginUserListVO.getPartMm());
        }
        // 判断条件 区域
        if (loginUserListVO != null && !"".equals(loginUserListVO.getPartCity())) {
            sqlbd.append("   AND F_PART_CITY = ?  ");
            sqlbd.addArg(loginUserListVO.getPartCity());
        }
        // 判断条件 登录账号
        if (loginUserListVO != null && loginUserListVO.getPersonId() != null
                && !"".equals(loginUserListVO.getPersonId())) {
            sqlbd.append("   AND U.PERSIONID = ?   ");
            sqlbd.addArg(loginUserListVO.getPersonId());
        }
        // 判断条件 IP地址
        if (loginUserListVO != null && loginUserListVO.getIpAddress() != null
                && !"".equals(loginUserListVO.getIpAddress())) {
            sqlbd.append("   AND U.IPADDRESS = ?    ");
            sqlbd.addArg(loginUserListVO.getIpAddress());
        }
        // 判断条件 登录开始时间
        if (loginUserListVO != null && loginUserListVO.getLoginTime() != null
        		&& !"".equals(loginUserListVO.getLoginTime())) {
            sqlbd.append("   AND U.LOGINTIME >= TO_DATE(?, 'yyyy-mm-dd')  ");
            sqlbd.addArg(loginUserListVO.getLoginTime());
        }
        // 判断条件 登录结束时间
        if (loginUserListVO != null && loginUserListVO.getLogoutTime() != null
        		&& !"".equals(loginUserListVO.getLogoutTime())) {
            sqlbd.append("   AND U.LOGINTIME <= TO_DATE(?, 'yyyy-mm-dd HH24:MI:SS')  ");
            sqlbd.addArg(loginUserListVO.getLogoutTime() + " 23:59:59");
        }
        sqlbd.append(" AND ROWNUM < ? )");
        sqlbd.append(" WHERE ROWCOUNT >= ? ");
        sqlbd.addArg(end);
        sqlbd.addArg(start);

        // 取得jdbc工具类
        JdbcHandler jdbcHandler = createJdbcHandler();

        List list = null;
        try {
            list = jdbcHandler.queryList(sqlbd.getSQL(), sqlbd.getSQLArgs(), new ResultSetHandler() {
                // 处理查询的结果集，不需要自己去循环遍历
                public void processRow(ResultSet rs) throws SQLException {
                	LoginUserListVO vo = new LoginUserListVO();
                	vo.setId(rs.getString("ID"));
                    vo.setPersonId(rs.getString("PERSIONID"));
                    vo.setIpAddress(rs.getString("IPADDRESS"));
                    vo.setLoginType(rs.getString("LOGINTYPE"));
                    vo.setLoginTime(DateUtil.stringDateTime(rs.getObject("LOGINTIME")));
                    vo.setLogoutTime(DateUtil.stringDateTime(rs.getObject("LOGOUTTIME")));
                    vo.setLocation(rs.getString("LOCATION"));
                    vo.setMacAddress(rs.getString("MACADDRESS"));
                    vo.setDnsName(rs.getString("DNSNAME"));
                    addRecord(vo);
                }
            });
        } catch (DataAccessExceptionWrapper e) {
            SysLog
                    .writeLogs("loginUserList", GlobalParameters.ERROR, "LoginUserListDaoImpl--getLoginUserList-1:"
                            + e.getMessage());
            throw new DataAccessException(e);
        }
        return list;
    }
    
    /**
     * 根据ID主键查询登录人员的详细信息
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param vo
     * @return
     */
    public LoginUserListVO getDetailById(LoginUserListVO vo) throws DataAccessException {
        SqlBuilder sqlbd = new SqlBuilder();
        sqlbd.append("SELECT * ");
        sqlbd.append("  FROM OM_LOGIN_USERLIST ");
        sqlbd.append(" WHERE ID = ? ");
        sqlbd.addArg(vo.getId());

        // 取得jdbc工具类
        JdbcHandler jdbcHandler = createJdbcHandler();

        LoginUserListVO loginUserListVO = null;
        // 使用jdbcHandler的queryOneReocrd方法
        try {
        	loginUserListVO = (LoginUserListVO) jdbcHandler.queryOneReocrd(sqlbd.getSQL(), sqlbd.getSQLArgs(),
                    new ResultSetHandler() {
                        // 处理查询的结果集，不需要自己去循环遍历
                        public void processRow(ResultSet rs) throws SQLException {
                        	LoginUserListVO vo = new LoginUserListVO();
                            vo.setId((rs.getString("ID")));
                            vo.setPersonId(rs.getString("PERSIONID"));
                            vo.setLoginType(rs.getString("LOGINTYPE"));
                            vo.setIpAddress(rs.getString("IPADDRESS"));
                            vo.setLoginTime(rs.getString("LOGINTIME"));
                            vo.setLogoutTime(rs.getString("LOGOUTTIME"));
                            vo.setLocation(rs.getString("LOCATION"));
                            vo.setMacAddress(rs.getString("MACADDRESS"));
                            vo.setDnsName(rs.getString("DNSNAME"));
                            addRecord(vo);
                        }
                    });
        } catch (DataAccessExceptionWrapper e) {
            SysLog.writeLogs("loginUserList", GlobalParameters.ERROR, "LoginUserListDaoImpl--getDetailById-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        }

        return loginUserListVO;
    }
    
    /**
	 * 导出调帐历史信息
	 */
	public void exportAllLoginUserColl(Map dataMap, OutputStream outputStream)throws DataAccessException {
		
		String workNo = (String)dataMap.get("workNo");
		String ipAddress = (String)dataMap.get("ipAddress");
		String beginLoginTime = (String)dataMap.get("beginLoginTime");
		String endLoginTime = (String)dataMap.get("endLoginTime");
		String areaCode = (String)dataMap.get("areaCode");
		
		SqlBuilder sqlbd = new SqlBuilder();
        sqlbd.append("SELECT *  ");
        sqlbd.append("  FROM (SELECT ROWNUM ROWCOUNT, ");
        sqlbd.append("  U.ID, ");
        sqlbd.append("  U.PERSIONID, ");
        sqlbd.append("  A.f_employee_name, ");        
        sqlbd.append("  U.IPADDRESS, ");
        sqlbd.append("  DECODE(U.LOGINTYPE,'0','Unieap登陆','1','CA登陆') LOGINTYPE, ");
        sqlbd.append("  U.LOGINTIME, ");
        sqlbd.append("  U.LOGOUTTIME ");
        sqlbd.append("  FROM OM_LOGIN_USERLIST U , om_employee_t A ");
        sqlbd.append("  WHERE U.persionid = a.f_work_no ");
        if (!"".equals(ipAddress)) {
            sqlbd.append("   AND U.IPADDRESS = ?");
        }
        // 判断条件 登录开始时间
        if ( !"".equals(beginLoginTime)) {
            sqlbd.append("   AND U.LOGINTIME >= TO_DATE(?, 'yyyy-mm-dd')  ");
        }
        // 判断条件 登录结束时间
        if ( !"".equals(endLoginTime)) {
            sqlbd.append("   AND U.LOGINTIME <= TO_DATE(?, 'yyyy-mm-dd')  ");
        }
        if (!"".equals(areaCode)) {
            sqlbd.append("   AND F_PART_CITY = ?  ");
        }
        sqlbd.append(")");
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		
		SysLog.writeLogs("billing",GlobalParameters.INFO,
				"LoginUserListDaoImpl SQL1:"+sqlbd.toString());


		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlbd.toString());
			
			int i = 1;
			 if (!"".equals(ipAddress)) {
				 pstmt.setString(i++, ipAddress);
		        }
		        // 判断条件 登录开始时间
		        if ( !"".equals(beginLoginTime)) {
					 pstmt.setString(i++, beginLoginTime);
		        }
		        // 判断条件 登录结束时间
		        if ( !"".equals(endLoginTime)) {
					 pstmt.setString(i++, endLoginTime);
		        }
		        // 判断条件区号
		        if ( !"".equals(areaCode)) {
					 pstmt.setString(i++, areaCode);
		        }
			
			rest = pstmt.executeQuery();
			
            // 导出CSV关键
            // 导出的各个列的列名
			String[] titles=new String[]{"序号", "ID", "登陆账号","职员姓名", "IP地址", "登录类型", "登入时间","登出时间"};

	        /* 
	         *所属地市 在表里存放的是 编号,对应到名称上 用使用字典数据.
	         *参数 mappingItems 就是用来存放字典数据的
	         *框架提供的字典数据是 ParamObjectCollection 对象,
	         *在这里我们需要使用 CollectionUtil.paramObjectCollectionToMap 转换成更加通用的map.
	         *其他类似的字典数据,也请使用这样的方法进行转换.
	         */
			
            // 创建 字典映射用的 map;
            Map mappingItems = new HashMap();
            

            // 取得 所属地市和服务类型 字典数据 
           //ParamObjectCollection cityColl=(ParamObjectCollection)dataMap.get("cityColl");
           
//           specialBillColl.addElement(0, "正常出帐");
//           specialBillColl.addElement(1, "特别出帐");
           
           // 将字典数据转换成map后,以对应的数据表字段名(大写)作为键值, 放入 字典映射用的map (mappingItems内放的是如果map)
           //mappingItems.put("CITY_CODE", CollectionUtil.paramObjectCollectionToMap(cityColl));
           
            // 导出CSV关键
            DataAccessUtil.outputCSV(rest, outputStream, titles, mappingItems);
            
		}catch(SQLException e){
			SysLog.writeLogs("billing",GlobalParameters.ERROR,"BillAdjustFeeDAO--exportAllBillAdjustFeeColl(HashMap dataMap,OutputStream os)-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("billing",GlobalParameters.ERROR,"BillAdjustFeeDAO--exportAllBillAdjustFeeColl(HashMap dataMap,OutputStream os)-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
	}
}
