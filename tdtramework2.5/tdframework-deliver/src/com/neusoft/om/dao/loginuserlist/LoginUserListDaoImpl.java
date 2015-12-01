/**
 * �ļ�˵����Ϣ
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
 * <p> �޸���ʷ</p>
 * <p> ��� ���� �޸��� �޸�ԭ��</p>
 * 
 */
public class LoginUserListDaoImpl extends TDBaseDAO implements LoginUserListDAO {

    /**
     * ��ѯ�����б���
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
        // ��ѯ�������
        ParamObjectCollection areaCollection = null;

        // ���ݵ���CODE ���м���ƴװsql
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
            // �������
            conn = getConnection();
            // Ԥ����sql
            pstmt = conn.prepareStatement(bsql.toString());
            // ִ��sql���
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
     * ��ȡ��ѯ�������
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
        // �ж����� �·�
        if (loginUserListVO != null && !"".equals(String.valueOf(loginUserListVO.getPartMm()))) {
            sqlbd.append("   AND F_PART_MM = ?  ");
            sqlbd.addArg(loginUserListVO.getPartMm());
        }
        // �ж����� ����
        if (loginUserListVO != null && !"".equals(loginUserListVO.getPartCity())) {
            sqlbd.append("   AND F_PART_CITY = ?  ");
            sqlbd.addArg(loginUserListVO.getPartCity());
        }
        // �ж����� ��¼�˺�
        if (loginUserListVO != null && loginUserListVO.getPersonId() != null
                && !"".equals(loginUserListVO.getPersonId())) {
            sqlbd.append("   AND PERSIONID = ?  ");
            sqlbd.addArg(loginUserListVO.getPersonId());
        }
        // �ж����� IP��ַ
        if (loginUserListVO != null && loginUserListVO.getIpAddress() != null
                && !"".equals(loginUserListVO.getIpAddress())) {
            sqlbd.append("   AND IPADDRESS = ?  ");
            sqlbd.addArg(loginUserListVO.getIpAddress());
        }
        // �ж����� ��¼��ʼʱ��
        if (loginUserListVO != null && loginUserListVO.getLoginTime() != null
        		&& !"".equals(loginUserListVO.getLoginTime())) {
            sqlbd.append("   AND LOGINTIME >= TO_DATE(?,'yyyy-mm-dd')      ");
            sqlbd.addArg(loginUserListVO.getLoginTime());
        }
        // �ж����� ��¼����ʱ��
        if (loginUserListVO != null && loginUserListVO.getLogoutTime() != null
        		&& !"".equals(loginUserListVO.getLogoutTime())) {
            sqlbd.append("   AND LOGINTIME <= TO_DATE(?,'yyyy-mm-dd HH24:MI:SS')      ");
            sqlbd.addArg(loginUserListVO.getLogoutTime() + " 23:59:59");
        }

        // ȡ��jdbc������
        JdbcHandler jdbcHandler = createJdbcHandler();
        //��ѯ�������
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
     * ��ȡ��ѯ����б�
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
        sqlbd.append("  DECODE(U.LOGINTYPE,'0','web��½','1','CA��½') LOGINTYPE, ");
        sqlbd.append("  U.LOGINTIME, ");
        sqlbd.append("  U.LOGOUTTIME, ");
        sqlbd.append("  A.F_AREA_NAME LOCATION, ");
        sqlbd.append("  U.MACADDRESS MACADDRESS, ");
        sqlbd.append("  U.DNSNAME DNSNAME ");
        sqlbd.append("  FROM OM_LOGIN_USERLIST U LEFT JOIN OM_AREA_T A ON U.LOCATION = A.F_CITY_CODE");
        sqlbd.append("  WHERE 1=1 ");
        // �ж����� �·�
        if (loginUserListVO != null && !"".equals(String.valueOf(loginUserListVO.getPartMm()))) {
            sqlbd.append("   AND U.F_PART_MM = ?  ");
            sqlbd.addArg(loginUserListVO.getPartMm());
        }
        // �ж����� ����
        if (loginUserListVO != null && !"".equals(loginUserListVO.getPartCity())) {
            sqlbd.append("   AND F_PART_CITY = ?  ");
            sqlbd.addArg(loginUserListVO.getPartCity());
        }
        // �ж����� ��¼�˺�
        if (loginUserListVO != null && loginUserListVO.getPersonId() != null
                && !"".equals(loginUserListVO.getPersonId())) {
            sqlbd.append("   AND U.PERSIONID = ?   ");
            sqlbd.addArg(loginUserListVO.getPersonId());
        }
        // �ж����� IP��ַ
        if (loginUserListVO != null && loginUserListVO.getIpAddress() != null
                && !"".equals(loginUserListVO.getIpAddress())) {
            sqlbd.append("   AND U.IPADDRESS = ?    ");
            sqlbd.addArg(loginUserListVO.getIpAddress());
        }
        // �ж����� ��¼��ʼʱ��
        if (loginUserListVO != null && loginUserListVO.getLoginTime() != null
        		&& !"".equals(loginUserListVO.getLoginTime())) {
            sqlbd.append("   AND U.LOGINTIME >= TO_DATE(?, 'yyyy-mm-dd')  ");
            sqlbd.addArg(loginUserListVO.getLoginTime());
        }
        // �ж����� ��¼����ʱ��
        if (loginUserListVO != null && loginUserListVO.getLogoutTime() != null
        		&& !"".equals(loginUserListVO.getLogoutTime())) {
            sqlbd.append("   AND U.LOGINTIME <= TO_DATE(?, 'yyyy-mm-dd HH24:MI:SS')  ");
            sqlbd.addArg(loginUserListVO.getLogoutTime() + " 23:59:59");
        }
        sqlbd.append(" AND ROWNUM < ? )");
        sqlbd.append(" WHERE ROWCOUNT >= ? ");
        sqlbd.addArg(end);
        sqlbd.addArg(start);

        // ȡ��jdbc������
        JdbcHandler jdbcHandler = createJdbcHandler();

        List list = null;
        try {
            list = jdbcHandler.queryList(sqlbd.getSQL(), sqlbd.getSQLArgs(), new ResultSetHandler() {
                // �����ѯ�Ľ����������Ҫ�Լ�ȥѭ������
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
     * ����ID������ѯ��¼��Ա����ϸ��Ϣ
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

        // ȡ��jdbc������
        JdbcHandler jdbcHandler = createJdbcHandler();

        LoginUserListVO loginUserListVO = null;
        // ʹ��jdbcHandler��queryOneReocrd����
        try {
        	loginUserListVO = (LoginUserListVO) jdbcHandler.queryOneReocrd(sqlbd.getSQL(), sqlbd.getSQLArgs(),
                    new ResultSetHandler() {
                        // �����ѯ�Ľ����������Ҫ�Լ�ȥѭ������
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
	 * ����������ʷ��Ϣ
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
        sqlbd.append("  DECODE(U.LOGINTYPE,'0','Unieap��½','1','CA��½') LOGINTYPE, ");
        sqlbd.append("  U.LOGINTIME, ");
        sqlbd.append("  U.LOGOUTTIME ");
        sqlbd.append("  FROM OM_LOGIN_USERLIST U , om_employee_t A ");
        sqlbd.append("  WHERE U.persionid = a.f_work_no ");
        if (!"".equals(ipAddress)) {
            sqlbd.append("   AND U.IPADDRESS = ?");
        }
        // �ж����� ��¼��ʼʱ��
        if ( !"".equals(beginLoginTime)) {
            sqlbd.append("   AND U.LOGINTIME >= TO_DATE(?, 'yyyy-mm-dd')  ");
        }
        // �ж����� ��¼����ʱ��
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
		        // �ж����� ��¼��ʼʱ��
		        if ( !"".equals(beginLoginTime)) {
					 pstmt.setString(i++, beginLoginTime);
		        }
		        // �ж����� ��¼����ʱ��
		        if ( !"".equals(endLoginTime)) {
					 pstmt.setString(i++, endLoginTime);
		        }
		        // �ж���������
		        if ( !"".equals(areaCode)) {
					 pstmt.setString(i++, areaCode);
		        }
			
			rest = pstmt.executeQuery();
			
            // ����CSV�ؼ�
            // �����ĸ����е�����
			String[] titles=new String[]{"���", "ID", "��½�˺�","ְԱ����", "IP��ַ", "��¼����", "����ʱ��","�ǳ�ʱ��"};

	        /* 
	         *�������� �ڱ����ŵ��� ���,��Ӧ�������� ��ʹ���ֵ�����.
	         *���� mappingItems ������������ֵ����ݵ�
	         *����ṩ���ֵ������� ParamObjectCollection ����,
	         *������������Ҫʹ�� CollectionUtil.paramObjectCollectionToMap ת���ɸ���ͨ�õ�map.
	         *�������Ƶ��ֵ�����,Ҳ��ʹ�������ķ�������ת��.
	         */
			
            // ���� �ֵ�ӳ���õ� map;
            Map mappingItems = new HashMap();
            

            // ȡ�� �������кͷ������� �ֵ����� 
           //ParamObjectCollection cityColl=(ParamObjectCollection)dataMap.get("cityColl");
           
//           specialBillColl.addElement(0, "��������");
//           specialBillColl.addElement(1, "�ر����");
           
           // ���ֵ�����ת����map��,�Զ�Ӧ�����ݱ��ֶ���(��д)��Ϊ��ֵ, ���� �ֵ�ӳ���õ�map (mappingItems�ڷŵ������map)
           //mappingItems.put("CITY_CODE", CollectionUtil.paramObjectCollectionToMap(cityColl));
           
            // ����CSV�ؼ�
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
