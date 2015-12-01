/**
 * 
 */
package com.neusoft.om.dao.checkPerson;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDictionaryDAO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/***************************************************************
 * 程序名 : DataFilterDAOImpl.java.java
 * 日期  : 2007-7-17
 * 作者  : sunchonggui@neusoft.com
 * 模块  : 
 * 描述  : 
 * 备注  : 
 * ------------------------------------------------------------
 * 修改历史
 * 序号  日期  修改人   修改原因
 * 1
 * 2
 ***************************************************************/
/**
 * @author wbsuncg
 *
 */
public class CheckPersonDAOImpl extends BaseDictionaryDAO implements CheckPersonDAO {

    /**
     * 
     */
    public CheckPersonDAOImpl() {
        super();
        // TODO Auto-generated constructor stub
    }

    public int getRowCount(String fWorkNo, String checkFlag) throws DataAccessException {
        // TODO Auto-generated method stub
        int allRows = 0;

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from om_employee_check_t where 1=1");
        if (!fWorkNo.equals("")) {
            sqlBuf.append(" and f_work_no =upper('" + fWorkNo + "')");
        }
        if (!checkFlag.equals("")) {
            sqlBuf.append(" and check_flag =" + checkFlag );
        }
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());

            rest = pstmt.executeQuery();

            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "CheckPersonDAOIMPL--getRowCount()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "CheckPersonDAOIMPL--getRowCount()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }

        return allRows;
    }
   

    public List getColl(String fWorkNo, String checkFlag, int beginNum, int endNum)
            throws DataAccessException {
        CheckPersonVO vo = null;
        //CheckPersonColl coll = new CheckPersonColl();
        List list = new ArrayList();

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from (");
        sqlBuf.append(" select rownum rowcound,om_employee_check_t.*");
        sqlBuf.append(" from om_employee_check_t where 1=1 ");
        if (!fWorkNo.equals("")) {
            sqlBuf.append(" and f_work_no =upper('" + fWorkNo + "')");
        }
        if (!checkFlag.equals("")) {
            sqlBuf.append(" and check_flag =" + checkFlag );
        }
        sqlBuf.append("and rownum < ").append(endNum);
        sqlBuf.append(" ) ");
        sqlBuf.append("where rowcound >= ").append(beginNum);
        //System.out.print("sql is :"+sqlBuf.toString());
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());

            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new CheckPersonVO();
                vo.setAttribute(rest);
                list.add(vo); 
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "CheckPersonDAOIMPL--getCorrectUserList()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "CheckPersonDAOIMPL--getCorrectUserList()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return list;
    }   
    
    
    //审核方法
    public String check(String fWorkNO,HttpServletRequest request)throws DataAccessException {
        String message="";
        Connection conn = null;
        PreparedStatement pstmt = null;
        
        AuthorizeVO vo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
        StringBuffer sqlBuf = new StringBuffer();
        String checkPerson=vo.getWorkNo();
        sqlBuf.append("update om_employee_check_t");
        sqlBuf.append(" set check_flag=1 , check_person='"+checkPerson+"' , check_date =sysdate");
        sqlBuf.append(" where f_work_no = '"+fWorkNO+"'");
       
        //System.out.print("sql is :"+sqlBuf.toString());
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            int sucRow=pstmt.executeUpdate();
            if(sucRow==1){
                message="审核成功";
            }else{
             message="审核失败";
            }
            
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "CheckPersonDAOIMPL--getCorrectUserList()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "CheckPersonDAOIMPL--getCorrectUserList()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(pstmt, conn);
        }
        return message;
    }
    //审核回退
   
    public String undoCheck(String fWorkNO)throws DataAccessException {
        String message="";
        Connection conn = null;
        PreparedStatement pstmt = null;
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("update om_employee_check_t");
        sqlBuf.append(" set check_flag=0 , check_person='' , check_date =''");
        sqlBuf.append(" where f_work_no = '"+fWorkNO+"'");
       
        //System.out.print("sql is :"+sqlBuf.toString());
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            int sucRow=pstmt.executeUpdate();
            if(sucRow==1){
                message="审核回退成功";
            }else{
             message="审核回退失败";
            }
            
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "CheckPersonDAOIMPL--getCorrectUserList()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "CheckPersonDAOIMPL--getCorrectUserList()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(pstmt, conn);
        }
        return message;
    }
}
