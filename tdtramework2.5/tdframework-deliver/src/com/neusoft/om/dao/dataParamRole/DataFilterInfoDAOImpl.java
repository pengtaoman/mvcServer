/**
 * 
 */
package com.neusoft.om.dao.dataParamRole;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDictionaryDAO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/*******************************************************************************
 * 程序名 : 日期 : 2007-8-16 
 * 作者 : sunchonggui@neusoft.com 
 * 模块 : 
 * 描述 : 
 * 备注 :
 * ------------------------------------------------------------ 
 * 修改历史 序号 日期 修改人
 * 修改原因 1 2
 ******************************************************************************/
/**
 * @author wbsuncg
 * 
 */
public class DataFilterInfoDAOImpl extends BaseDictionaryDAO implements DataFilterInfoDAO {

    /**
     * 
     */
    public DataFilterInfoDAOImpl() {
        super();
        // TODO Auto-generated constructor stub
    }
    /**
     * 获取om_param_filter_info_t 中信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilters() throws DataAccessException {
      try {
          StringBuffer strBuf = new StringBuffer();
          strBuf.append(" select filter_id ,filter_info from om_param_filter_info_t order by filter_id  ");
          return executeQuery(strBuf.toString(), "filter_id", "filter_id", "filter_info", true);
      } catch (DataAccessException e) {
          SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getFilters():" + e.getMessage());
          throw new DataAccessException(e);
      }
  }
    // 查询OM_PARAM_TABLE_INFO_T 总记录数
    public int getRowCount(String filterInfo, String filterDesc) throws DataAccessException {
        // TODO Auto-generated method stub
        int allRows = 0;
        int exe=1;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from om_param_filter_info_t where 1=1");
        if (!filterInfo.equals("")) {
            sqlBuf.append(" and filter_id =?");
        }
        if (!filterDesc.equals("")) {
            sqlBuf.append(" and filter_desc like ?");
        }
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            if (!filterInfo.equals("")) {
                pstmt.setString(exe,filterInfo.toUpperCase());
                exe++;
            }
            if (!filterDesc.equals("")) {
                pstmt.setString(exe,"%"+filterDesc+"%");
            }
           // System.out.println(sqlBuf.toString());
            rest = pstmt.executeQuery();

            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getRowCount()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getRowCount()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return allRows;
    }

    // 获取 OM_PARAM_TABLE_INFO_T 的结果集
    public List getInfoColl(String filterInfo, String filterDesc, int beginNum, int endNum) throws DataAccessException {
        DataFilterInfoVO vo = null;
        List list = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from (");
        sqlBuf.append(" select rownum rowcound,a.filter_id,a.filter_info,a.filter_desc,a.filter_sel_id,a.filter_sel_value,a.filter_sel_param ");
        sqlBuf.append(" from om_param_filter_info_t a where 1=1 ");
        if (!filterInfo.equals("")) {
            sqlBuf.append(" and filter_id =?");
        }
        if (!filterDesc.equals("")) {
            sqlBuf.append(" and filter_desc like ? ");
        }

        sqlBuf.append("and rownum < ").append(endNum);
        sqlBuf.append(" ) ");
        sqlBuf.append("where rowcound >= ").append(beginNum);
        // System.out.print("sql is :"+sqlBuf.toString());
        try {
            conn = getConnection();
            int exe=1;
            pstmt = conn.prepareStatement(sqlBuf.toString());
            if (!filterInfo.equals("")) {
                pstmt.setString(exe,filterInfo.toUpperCase());
                exe++;
            }
            if (!filterDesc.equals("")) {
                pstmt.setString(exe,"%"+filterDesc+"%");
            }
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new DataFilterInfoVO();
                vo.setAttribute(rest);
                list.add(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getInfoColl()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getInfoColl()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return list;
    }

    /**
     * 局部刷新 获取表的列
     * 
     * @param
     * @return
     */
    public ParamObjectCollection getColumn(String tableName) throws DataAccessException {
        try {
            StringBuffer strBuf = new StringBuffer();
            strBuf.append(" select column_name from cols where table_name= upper('" + tableName + "')");

            return executeQuery(strBuf.toString(), "column_name", "column_name", "column_name", false);

        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getColumn():" + e.getMessage());
            throw new DataAccessException(e);
        }
    }

    /**
     * 新增保存方法
     * 
     * @param
     * @return
     */
    public String doSave(HashMap map) throws DataAccessException {

        String message = "";
        // SERVICE_FLAG--NUMBER-1-100-, IF_OPEN--NUMBER-1-100-,
        // MONTH_FEE_ONOFF--VARCHAR2-1-100-
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        int filterId = this.getMaxTabId();
        String filterDesc = (String) map.get("filterDesc");
        String tableName = (String) map.get("tableName");
        String columnId = (String) map.get("columnId");
        String columnName = (String) map.get("columnName");
        String filterParam = (String) map.get("filterParam");
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("insert into om_param_filter_info_t (FILTER_ID,FILTER_INFO,FILTER_DESC,FILTER_SEL_ID,FILTER_SEL_VALUE,FILTER_SEL_PARAM )");
        sqlBuf.append(" values(?,?,?,?,?,?)");
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setInt(1, filterId);
            pstmt.setString(2, tableName.toUpperCase());
            pstmt.setString(3, filterDesc);
            pstmt.setString(4, columnId);
            pstmt.setString(5, columnName);
            pstmt.setString(6, filterParam);
            int sucRow = pstmt.executeUpdate();
            if (sucRow > 0) {
                message = "新增保存成功";
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--doSave()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--doSave()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return message;
    }
    // 新增后回显的方法
    public int getRowCountBack() throws DataAccessException {
        // TODO Auto-generated method stub
        int allRows = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        int newFilterId=this.getMaxTabId()-1;
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from om_param_filter_info_t where filter_id =?");
       
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setInt(1,newFilterId);
            rest = pstmt.executeQuery();
            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getRowCountBack()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getRowCountBack()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return allRows;
    }

    // 获取 OM_PARAM_TABLE_INFO_T 的结果集
    public List getInfoCollBack(int beginNum, int endNum) throws DataAccessException {
        DataFilterInfoVO vo = null;
        List list = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        int newFilterId=this.getMaxTabId()-1;
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from (");
        sqlBuf
                .append(" select rownum rowcound,a.filter_id,a.filter_info,a.filter_desc,a.filter_sel_id,a.filter_sel_value,a.filter_sel_param ");
        sqlBuf.append(" from om_param_filter_info_t a where a.filter_id =? ");
        sqlBuf.append("and rownum < ").append(endNum);
        sqlBuf.append(" ) ");
        sqlBuf.append("where rowcound >= ").append(beginNum);
        // System.out.print("sql is :"+sqlBuf.toString());
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setInt(1,newFilterId);
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new DataFilterInfoVO();
                vo.setAttribute(rest);
                list.add(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getInfoColl()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getInfoColl()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return list;
    }
    /**
     * 获取 om_param_table_desc_t 中max（table_id）
     * 
     * @param
     * @return
     */
    private int getMaxTabId() throws DataAccessException {
        int maxTabId = -1;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        String sql = "select nvl(max(filter_id),0)+1 filter_id from om_param_filter_info_t ";
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();
            if (rest.next()) {
                maxTabId = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getMaxTabId()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getMaxTabId()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return maxTabId;
    }

    /**
     * 修改后回显
     * 
     * @param
     * @return
     */
    public List getInfoCollBack(int filterId) throws DataAccessException {
        DataFilterInfoVO vo = null;
        List list = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from om_param_filter_info_t where filter_id =" + filterId);
        // System.out.print("sql is :"+sqlBuf.toString());
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new DataFilterInfoVO();
                vo.setAttribute(rest);
                list.add(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getInfoCollBack()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getInfoCollBack()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return list;

    }
    /**
     * 判断是否允许 删除
     * 
     * @param
     * @return
     */
    private String BeforeDel(Connection conn,String values[]) throws DataAccessException {
        
        String flag="true";
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        //判断被使用的filter_id 不允许删除的sql。
        StringBuffer sqlBufSel=new StringBuffer();
        sqlBufSel.append(" select count(filter_id) count from om_param_table_info_t where filter_id = ?");
        
        try {
            pstmt=conn.prepareStatement(sqlBufSel.toString());

            for(int i=0;i<values.length;i++){
                pstmt.setString(1,values[i]);
                rest=pstmt.executeQuery();
                rest.next();
                if(rest.getInt(1)>0){
                    flag="false";
                    break;
                }
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--BeforeDel()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--BeforeDel()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt);
        }
        
        return flag;
    }
    /**
     * 删除方法
     * @author yanglm
     * @param
     * @return
     */
    public String doDelete(String values[]) throws DataAccessException {
        String message = "";
        
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        //检查过滤器在数据源表中是否已经被使用
        StringBuffer checkSql=new StringBuffer();
        checkSql.append(" select filter_desc,count(a.filter_id) count ");
        checkSql.append("   from om_param_table_info_t a, ");
        checkSql.append("        om_param_filter_info_t b ");
        checkSql.append("  where a.filter_id = ? ");
        checkSql.append("    and a.filter_id = b.filter_id ");
        checkSql.append("  group by b.filter_desc ");
        //删除过滤器信息
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" delete om_param_filter_info_t where ");
        //删除过滤器关系配置信息
        StringBuffer delBuf = new StringBuffer();
        delBuf.append(" delete om_param_filter_rel_t where ");
        try {
            conn = getConnection();
            conn.setAutoCommit(false);
            
            List list = new ArrayList();
            String filterDesc = null;
            
            pstmt = conn.prepareStatement(checkSql.toString());
            for(int i=0;i<values.length;i++){
            	int ifCanDel = -1;
            	if(values[i].trim().equals("")){
            		continue;
            	}
            	
                pstmt.setString(1,values[i]);
                rest=pstmt.executeQuery();

                if(rest.next()){
                	filterDesc = rest.getString("filter_desc");
                	ifCanDel = rest.getInt("count");
                }
                //如果过滤器在数据源表中已使用
                if(ifCanDel > 0){
                	message = message+"过滤器 "+filterDesc+" 已被使用，不允许被删除；";
                }else{
                	list.add(values[i]); 
                }
            }
            //如果有可以被删除的过滤器信息
            if(list.size() > 0){
                for(int i=0;i<list.size();i++) {
                	String filterId = (String)list.get(i);
                    sqlBuf.append(" ( filter_id = "+filterId+" )");
                    delBuf.append(" ( filter_id = "+filterId+" )");
                    if (i < list.size()-1) {
                        sqlBuf.append(" or ");
                        delBuf.append(" or ");
                    }
                }
                
                pstmt = conn.prepareStatement(delBuf.toString());
                int rows = pstmt.executeUpdate();
                
                if(rows < 0){
                	conn.rollback();
                }else{
                	pstmt = conn.prepareStatement(sqlBuf.toString());
                    rows = pstmt.executeUpdate();
                    
                    if(rows <= 0){
                    	conn.rollback();
                    }else{
                    	conn.commit();
                    	message = message+"成功删除 "+rows+" 条过滤器信息。";
                    }
                }
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--doDelete()-1:"
                            + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--doDelete()-2:"
                            + e.getMessage());
            throw new DataAccessException(e);
        } finally {
        	try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"FilterRelationDAO--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
            close(rest, pstmt, conn);
        }
        
        return message;
    }
    /**
     * 修改方法
     * 
     * @param
     * @return
     */
    public DataFilterInfoVO modifyInit(String filterId) throws DataAccessException {
        DataFilterInfoVO vo=null;

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try {
            conn = getConnection();
            StringBuffer sql=new StringBuffer();
            sql.append(" select * from om_param_filter_info_t where filter_id =? ");
            pstmt = conn.prepareStatement(sql.toString());
            pstmt.setString(1,filterId);
            rest=pstmt.executeQuery();
            if(rest.next()){
                vo=new DataFilterInfoVO();
                vo.setAttribute(rest);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--modify()-1:" + e.getMessage());
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--modify()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return vo;
    }
    /**
     * 修改方法
     * 
     * @param
     * @return
     */
    public String modify(HashMap map) throws DataAccessException {
        String message = "修改操作失败";

        String filterId = (String) map.get("filterId");
        // String filterInfo=(String)map.get("filterInfo");
        String filterDesc = (String) map.get("filterDesc");
        String filterSelId = (String) map.get("filterSelId");
        String filterSelValue = (String) map.get("filterSelValue");
        String filterSelParam = (String) map.get("filterSelParam");

        String sql = null;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try {
            conn = getConnection();
            sql = " update om_param_filter_info_t set filter_desc='" + filterDesc + "',filter_sel_value='"
                    + filterSelValue + "',filter_sel_id='" + filterSelId + "',filter_sel_param='" + filterSelParam
                    + "' where filter_id='" + filterId + "'";
            pstmt = conn.prepareStatement(sql);
            int sucRow = pstmt.executeUpdate();

            if (sucRow > 0) {
                message = "修改成功!";
            } else {
                message = "您没有对数据进行修改";
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--modify()-1:" + e.getMessage());
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--modify()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return message;
    }
}
