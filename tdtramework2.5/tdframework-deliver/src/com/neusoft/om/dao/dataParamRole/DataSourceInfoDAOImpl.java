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

/***************************************************************
 * ������ : 
 * ����  : 2007-8-11
 * ����  : sunchonggui@neusoft.com
 * ģ��  : 
 * ����  : 
 * ��ע  : 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���  ����  �޸���   �޸�ԭ��
 * 1
 * 2
 ***************************************************************/
/**
 * @author wbsuncg
 *
 */
public class DataSourceInfoDAOImpl extends BaseDictionaryDAO implements DataSourceInfoDAO {

    /**
     * 
     */
    public DataSourceInfoDAOImpl() {
        super();
        // TODO Auto-generated constructor stub
    }
    /**
     * ��ȡom_param_table_desc_t ����Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getTables() throws DataAccessException {
        try {
           StringBuffer strBuf = new StringBuffer();
           strBuf.append(" select table_id ,table_name from om_param_table_desc_t order by table_id ");
           return executeQuery(strBuf.toString(), "table_id", "table_id", "table_name", true);
        } catch (DataAccessException e) {
           SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getTables():" + e.getMessage());
           throw new DataAccessException(e);
        }
    }
    /**
     * //��ѯOM_PARAM_TABLE_INFO_T �ܼ�¼��
     * @param 
     * @return
     */
    public int getRowCount(String tableId, String tableDesc, String showNewData) throws DataAccessException {
        int allRows = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        if(!showNewData.equals("0") && !showNewData.equals("1")){
        	showNewData = "";
        }
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from OM_PARAM_TABLE_INFO_T where 1=1");
        if(!tableId.trim().equals("")){
        	sqlBuf.append(" and table_id = "+tableId);
        }
    	sqlBuf.append(" and table_id in (select table_id from om_param_table_desc_t where 1=1");
    	if(!tableDesc.trim().equals("")){
    		sqlBuf.append(" and table_desc like '%"+tableDesc+"%'");
    	}
    	if( !showNewData.trim().equals("")){
    		sqlBuf.append(" and show_new_data = "+showNewData);
    	}
    	sqlBuf.append(")");         
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
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
   
    //��ȡ OM_PARAM_TABLE_INFO_T �Ľ����
    public List getInfoColl(String tableId, String tableDesc,String showNewData, int beginNum, int endNum)
            throws DataAccessException {
        DataSourceInfoVO vo = null;
        if(!showNewData.equals("0") && !showNewData.equals("1")){
        	showNewData = "";
        }
        List list = new ArrayList();

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from (");
        sqlBuf.append(" select rownum rowcound,a.table_id,b.table_name,b.table_desc,a.column_info,a.column_kind,a.column_type,a.column_order,a.column_desc," +
                    "(select filter_desc from om_param_filter_info_t where filter_id=a.filter_id)filter_id ");
        sqlBuf.append(" from OM_PARAM_TABLE_INFO_T a,OM_PARAM_TABLE_DESC_T b where a.table_id=b.table_id ");
        if(!tableId.trim().equals("")){
        	sqlBuf.append(" and a.table_id = "+tableId);
        }
    	sqlBuf.append(" and a.table_id in (select table_id from om_param_table_desc_t where 1=1");
    	if(!tableDesc.trim().equals("")){
    		sqlBuf.append(" and table_desc like '%"+tableDesc+"%'");
    	}
    	if( !showNewData.trim().equals("")){
    		sqlBuf.append(" and show_new_data = "+showNewData);
    	}
    	sqlBuf.append(")"); 
        sqlBuf.append("and rownum < ").append(endNum);
        sqlBuf.append(" ) ");
        sqlBuf.append("where rowcound >= ").append(beginNum);
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new DataSourceInfoVO();
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
    //���ݱ�����ѯ�ñ����е��ܼ�¼��
    public int getColsCount(String tableName) throws DataAccessException {
        // TODO Auto-generated method stub
        int allRows = 0;

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from cols where table_name= upper('"+tableName+"')");
       
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());

            rest = pstmt.executeQuery();

            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getColsCount()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getColsCount()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }

        return allRows;
    }
    /**
     * ���ݱ�����ȡ�����ֶκ��������� �����
     * @param 
     * @return
     */
    public List getColsInfoColl(String tableName) throws DataAccessException{
        DataSourceInfoColsVO vo = null;
        
        List list = new ArrayList();

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select column_name ,data_type ");
        sqlBuf.append(" from cols ");
        sqlBuf.append(" where table_name =upper('"+tableName+"')");
        sqlBuf.append(" order by column_name");
       
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());

            rest = pstmt.executeQuery();

            while (rest.next()) {
                vo = new DataSourceInfoColsVO();
                vo.setAttribute(rest);
                list.add(vo); 
            }

        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getColsInfoColl()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getColsInfoColl()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }

        return list;
    }
    /**
     * ��ȡ����������OM_PARAM_FILTER_INFO_T
     * @param 
     * @return
     */
    public ParamObjectCollection getFilter() throws DataAccessException {
      try {
          StringBuffer strBuf = new StringBuffer();
          strBuf.append(" select filter_id ,filter_desc from om_param_filter_info_t order by filter_id ");

          return executeQuery(strBuf.toString(), "filter_id", "filter_desc", "filter_desc", false);

      } catch (DataAccessException e) {
          SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getFilter():" + e.getMessage());
          throw new DataAccessException(e);
      }
  }
    
    /**
     * �� om_param_table_desc_t ����������
     */
    public String doSaveDesc(String tableName,String tableDesc,String showNewData) throws DataAccessException{
        
        String flag="";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        int tableId=getMaxTabId();
        int ifShowNewData = -1;
        if(showNewData.equals("0")||showNewData.equals("1")){
        	ifShowNewData = Integer.parseInt(showNewData);
        }
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("insert into om_param_table_desc_t (table_id,table_name,table_desc,show_new_data)");
        sqlBuf.append(" values(?,?,?,?)");
        try{
            conn=getConnection();
           
            pstmt=conn.prepareStatement(sqlBuf.toString());
            pstmt.setInt(1,tableId);
            pstmt.setString(2,tableName.toUpperCase());
            pstmt.setString(3,tableDesc);
            pstmt.setInt(4, ifShowNewData);
            int sucRow=pstmt.executeUpdate();
            if(sucRow>0){
                flag="true"; 
            }
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--doSaveDesc()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--doSaveDesc()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return flag;
    }
    /**
     * ��ȡ om_param_table_desc_t ��max��table_id��
     * @param 
     * @return
     */
    private int getMaxTabId()throws  DataAccessException{
        int maxTabId=-1;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        String sql="select nvl(max(table_id),0)+1 table_id from om_param_table_desc_t ";
        try{
            conn=getConnection();
            pstmt=conn.prepareStatement(sql);
            rest=pstmt.executeQuery();
            if(rest.next()){
                maxTabId=rest.getInt(1);
            } 
            }catch (SQLException e) {
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
     * �������淽��
     * @param 
     * @return
     */
    public String doSave(String values []) throws DataAccessException{
        
        String message="";
        //SERVICE_FLAG--NUMBER-1-100-, IF_OPEN--NUMBER-1-100-, MONTH_FEE_ONOFF--VARCHAR2-1-100-
        Connection conn = null;
        PreparedStatement pstmt = null;
        int tableId=getMaxTabId()-1;
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("insert into OM_PARAM_TABLE_INFO_T (table_id,column_info,column_desc,column_kind,column_type,filter_id,column_order)");
        sqlBuf.append(" values(?,?,?,?,?,?,?)");
        try{
            conn=getConnection();
            pstmt=conn.prepareStatement(sqlBuf.toString());
            for(int i=0;i<values.length;i++){
                String valueTemp[]=values[i].split("-");
                pstmt.setInt(1,tableId);
                pstmt.setString(2,valueTemp[0]);
                pstmt.setString(3,valueTemp[1]);
                pstmt.setString(4,valueTemp[2]);
                pstmt.setString(5,valueTemp[3]);
                pstmt.setString(6,valueTemp[4]);
                pstmt.setString(7,valueTemp[5]);
                pstmt.execute();
            }
                message="��������ɹ�";      
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getColsCount()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getColsCount()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(pstmt, conn);
        }
        return message;
    }
    /**
     * //���������
     * @param 
     * @return
     */
    public int getRowCountBack() throws DataAccessException {
        // TODO Auto-generated method stub
        int allRows = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        int newTableId=this.getMaxTabId()-1;
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from OM_PARAM_TABLE_INFO_T where table_id=?");
       
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setInt(1,newTableId);
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
   
    /**
     * //���������
     * @param 
     * @return
     */
    public List getInfoCollBack( int beginNum, int endNum)throws DataAccessException {
        DataSourceInfoVO vo = null;
       
        List list = new ArrayList();
        int newTableId=this.getMaxTabId()-1;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from (");
        sqlBuf.append(" select rownum rowcound,a.table_id,b.table_name,b.table_desc,a.column_info,a.column_kind,a.column_type,a.column_order,a.column_desc," +
                    "(select filter_desc from om_param_filter_info_t where filter_id=a.filter_id)filter_id ");
        sqlBuf.append(" from OM_PARAM_TABLE_INFO_T a,OM_PARAM_TABLE_DESC_T b where a.table_id=b.table_id ");
        sqlBuf.append(" and a.table_id= ?");
        sqlBuf.append("and rownum < ").append(endNum);
        sqlBuf.append(" ) ");
        sqlBuf.append("where rowcound >= ").append(beginNum);
        // System.out.print("sql is :"+sqlBuf.toString());
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setInt(1,newTableId);
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new DataSourceInfoVO();
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
     * ɾ������
     * @author yanglm
     * @param 
     * @return
     */
    public String doDelete(String[] values) throws DataAccessException{        
        String message="";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("delete OM_PARAM_TABLE_INFO_T where table_id=? and column_info=? ");
        try{
            conn=getConnection();
            conn.setAutoCommit(false);
            
            int code = -1;
            int rows = 0;
            
            pstmt=conn.prepareStatement(sqlBuf.toString());
            for(int i=0;i<values.length;i++){
            	if(values[i].trim().equals(""))
            		continue;
            	
            	String[] param=values[i].split("~");
                pstmt.setString(1,param[0]);
                pstmt.setString(2,param[1]);
                code = pstmt.executeUpdate();
                
                if(code < 0){
                	conn.rollback();
                	message = "ɾ������Դ����Ϣʧ��";
                	break;
                }else{
                	rows++;
                }
            }

            if(code > 0){
            	//��� om_param_table_info_t �е�����ɾ����ɾ�� om_param_role_table_relation_t ��Ӧ������
                code = this.delRelation(conn,values);
                
                if(code < 0){
                	conn.rollback();
                	message = "ɾ�����ݽ�ɫ������Դ��ϵ����Ϣʧ��";
                }else{
                	//��� om_param_table_info_t �е�����ɾ����ɾ�� om_param_data_info_t ��Ӧ������
                	code = this.delDataInfo(conn,values);
                	
                	if(code < 0){
                    	conn.rollback();
                    	message = "ɾ����������������Ϣʧ��";
                    }else{
                    	//��� om_param_table_info_t �е�����ɾ����ɾ�� om_param_filter_rel_t ��Ӧ������
                    	code = this.deleteFilterRel(conn,values);
                    	
                    	if(code < 0){
                        	conn.rollback();
                        	message = "ɾ����������ϵ������Ϣʧ��";
                        }else{
                        	//�ж�����Դ����Ϣ�Ƿ�ȫ����ɾ�����������ɾ�� om_param_table_desc_t ��Ӧ������
                        	code = this.afterDelInfo(conn,values);
                        	
                        	if(code < 0){
                            	conn.rollback();
                            	message = "ɾ������Դ��������Ϣʧ��";
                            }else{
                            	conn.commit();
                            	message = "�ɹ�ɾ�� "+rows+" ������Դ��Ϣ";
                            }
                        }
                    }
                }
            }   
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--doDelete()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--doDelete()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
        	try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataSourceInfoDAO--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
            close(rest, pstmt, conn);
        }
        
        return message;
    }
    /**
     * ɾ��om_param_role_table_relation_t
     * @param 
     * @return
     */
    private int delRelation(Connection conn,String[] values) throws DataAccessException{
        int code = 0;
    	
        PreparedStatement pstmt = null;
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("delete om_param_role_table_relation_t where table_id = ?");
        
        try{
            pstmt=conn.prepareStatement(sqlBuf.toString());

            for(int i=0;i<values.length;i++){
               if(values[i].trim().equals(""))
                   continue;
               
               String[] param=values[i].split("~");
               pstmt.setString(1,param[0]);
               code = pstmt.executeUpdate();
               
               if(code < 0){
            	   break;
               }
            }
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--delRelation()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--delRelation()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(pstmt);
        }
        
        return code;
    }
    /**
     * ɾ�� om_param_data_info_t
     * @param 
     * @return
     */
    private int delDataInfo(Connection conn,String values []) throws DataAccessException{
        int code = 0;
    	
        PreparedStatement pstmt = null;
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("delete om_param_data_info_t where table_id = ? ");
        
        try{
            pstmt=conn.prepareStatement(sqlBuf.toString());
            
            for(int i=0;i<values.length;i++){
            	if(values[i].trim().equals(""))
                    continue;
                
                String[] param=values[i].split("~");
                pstmt.setString(1,param[0]);
                code = pstmt.executeUpdate();
                
                if(code < 0){
             	   break;
                }
            }
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--delDataInfo()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR,
            	"DataSourceInfoDAOIMPL--delDataInfo()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(pstmt);
        }
        
        return code;
    }
    /**
     * ɾ��om_param_table_info_t�е����ݺ�Ҫ�ж��Ƿ����е�table_id ȫ��ɾ�����ȫ��ɾ��Ҫɾ��om_param_table_desc_t �е���Ӧ������
     * @param 
     * @return
     */
    private int afterDelInfo(Connection conn,String values []) throws DataAccessException{
        int code = 0;
    	
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select count(table_id) from OM_PARAM_TABLE_INFO_T where table_id = ?");
        
        try{
            pstmt=conn.prepareStatement(sqlBuf.toString());

            for(int i=0;i<values.length;i++){
               if(values[i].trim().equals(""))
                   continue;
               
               String[] param=values[i].split("~");
               pstmt.setString(1,param[0]);
               rest=pstmt.executeQuery();
               
               if(rest.next()){
            	   if(rest.getInt(1)==0){//��Ҫɾ��om_param_table_desc_t�е�����
            		   code = this.deleteDesc(conn,param[0]);
            		   
            		   if(code < 0)
            			   break;
                   }
               }
            }
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR,
            	"DataSourceInfoDAOIMPL--afterDel()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--afterDel()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt);
        }
        
        return code;
    }
    /**
     * ɾ��om_param_table_desc_t�е�����
     * @param 
     * @return
     */
    private int deleteDesc(Connection conn,String tableId) throws DataAccessException{
        int code = -1;
        
        PreparedStatement pstmt = null;
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("delete om_param_table_desc_t where  table_id = ? ");
        
        try{
            pstmt=conn.prepareStatement(sqlBuf.toString());
            pstmt.setString(1,tableId);
            code = pstmt.executeUpdate();
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--deleteDesc()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--deleteDesc()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(pstmt);
        }
        
        return code;
    }
    /**
     * ɾ�� om_param_filter_rel_t �е�����
     * @param 
     * @return
     */
    private int deleteFilterRel(Connection conn,String[] values) throws DataAccessException{
        int code = 0;
        
        PreparedStatement pstmt = null;
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" delete om_param_filter_rel_t where table_id = ? ");
        sqlBuf.append(" and (main_filter_info = upper(?) or passive_filter_info = upper(?)) ");
        
        try{
            pstmt=conn.prepareStatement(sqlBuf.toString());
            
            for(int i=0;i<values.length;i++){
            	if(values[i].trim().equals(""))
                    continue;
                
                String[] param=values[i].split("~");
                pstmt.setString(1,param[0]);
                pstmt.setString(2,param[1]);
                pstmt.setString(3,param[1]);
                code = pstmt.executeUpdate();
                
                if(code < 0){
             	   break;
                }
            }
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--deleteFilterRel()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataSourceInfoDAOIMPL--deleteFilterRel()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(pstmt);
        }
        
        return code;
    }
    //   ��ȡ����ϸ��Ϣ�����޸� ʱ��ʾ����
    public DataSourceInfoVO modiInit(String tableId,String columnInfo) throws DataAccessException {
      DataSourceInfoVO vo = new DataSourceInfoVO();
      
      StringBuffer sqlBuf = new StringBuffer();
      sqlBuf.append(" select a.*,b.table_name,b.table_desc ");
      sqlBuf.append("   from OM_PARAM_TABLE_INFO_T a, OM_PARAM_TABLE_DESC_T b ");
      sqlBuf.append("  where a.table_id=b.table_id");
      sqlBuf.append("    and a.table_id='"+tableId+"'");
      sqlBuf.append("    and a.column_info='"+columnInfo+"'");
      //�������Դ���ڲ����������ݴ洢�����Ƿ񱻸�Ȩ
      StringBuffer checkBuf1 = new StringBuffer();
      checkBuf1.append(" select rownum,table_id ");
      checkBuf1.append("   from om_param_data_info_t ");
      checkBuf1.append("  where table_id = '"+tableId+"'");
      checkBuf1.append("    and rownum < 2");
      //�������Դ����Ȩ��΢�����ݴ洢�����Ƿ񱻸�Ȩ
      StringBuffer checkBuf2 = new StringBuffer();
      checkBuf2.append(" select rownum,table_id ");
      checkBuf2.append("   from om_param_employee_data_rel_t ");
      checkBuf2.append("  where table_id = '"+tableId+"'");
      checkBuf2.append("    and rownum < 2");
      
      Connection conn = null;
      PreparedStatement pstmt = null;
      ResultSet rest = null;
      try {
          conn = getConnection();
          pstmt = conn.prepareStatement(sqlBuf.toString());
          rest = pstmt.executeQuery();

          if(rest.next()) {
              vo.setAttributeVO(rest);
              
              pstmt = conn.prepareStatement(checkBuf1.toString());
              rest = pstmt.executeQuery();
              
              if(rest.next()){
            	  vo.setIfUsed("true");
              }else{
            	  pstmt = conn.prepareStatement(checkBuf2.toString());
                  rest = pstmt.executeQuery();
                  
                  if(rest.next()){
                	  vo.setIfUsed("true");
                  }else{
                	  vo.setIfUsed("false");
                  }
              }
          }
      } catch (SQLException e) {
          SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--modiInit()-1:"
                  + e.getMessage());
          throw new DataAccessException(e);
      } catch (Exception e) {
          SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--modiInit()-2:"
                  + e.getMessage());
          throw new DataAccessException(e);
      } finally {
          close(rest, pstmt, conn);
      }
      return vo;
  }
  /**
  * �޸ķ���
  * @param 
  * @return
  */
    public String modify(HashMap map) throws DataAccessException {
      String message="����Դ��Ϣ�޸�ʧ��";
     
      String tableId=(String)map.get("tableId");
      String columnInfo=(String)map.get("columnInfo");
      String columnDesc=(String)map.get("columnDesc");
      String columnOrder=(String)map.get("columnOrder");
      String columnType=(String)map.get("columnType");
      String filterEff=(String)map.get("filterEff");
      String tableDesc=(String)map.get("tableDesc");
      
      StringBuffer sqlBuf = new StringBuffer();
      sqlBuf.append(" update OM_PARAM_TABLE_INFO_T set ");
      sqlBuf.append(" column_desc = '"+columnDesc+"'");
      if(columnType!=null && !columnType.trim().equals("")){
    	  sqlBuf.append(" ,column_type = '"+columnType+"'");
      }
      if(columnOrder!=null && !columnOrder.trim().equals("")){
    	  sqlBuf.append(" ,column_order = '"+columnOrder+"'");
      }
      if(filterEff != null){
    	  if(filterEff.trim().equals(""))
    		  sqlBuf.append(" ,filter_id = null ");
    	  else
    		  sqlBuf.append(" ,filter_id = '"+filterEff+"'");
      }
      sqlBuf.append("  where table_id = '"+tableId+"'");
      sqlBuf.append(" 	 and column_info='"+columnInfo+"'");
      
      String sql = " update om_param_table_desc_t set table_desc ='"+tableDesc+"' where table_id='"+tableId+"'";;
      Connection conn = null;
      PreparedStatement pstmt = null;
      
     try {
         conn = getConnection();
         pstmt = conn.prepareStatement(sqlBuf.toString());
         conn.setAutoCommit(false);
         int code = pstmt.executeUpdate();  
         
         if(code >= 0){
        	 pstmt = conn.prepareStatement(sql);
        	 code = pstmt.executeUpdate();
             
             if(code >= 0){
            	 conn.commit();
                 message="����Դ��Ϣ�޸ĳɹ�";
             }else{
            	 conn.rollback();
             }
         }else{
        	 conn.rollback();
         }
      } catch (SQLException e) {
          SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--modify()-1:"
                  + e.getMessage());
      } catch (Exception e) {
          SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--modify()-2:"
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
          close(pstmt, conn);
      }
      return message;
  }
////////////////////////////
    //��ѯOM_PARAM_TABLE_INFO_T �ܼ�¼�� �޸Ļ���
    public int getRowCountL(HashMap map) throws DataAccessException {
        // TODO Auto-generated method stub
        int allRows = 0;
        String tableId=(String)map.get("tableId");
        String columnInfo=(String)map.get("columnInfo");
       
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from OM_PARAM_TABLE_INFO_T where ");
        sqlBuf.append(" table_id =" + tableId );
        sqlBuf.append(" and column_info='"+columnInfo+"'");
        
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            rest = pstmt.executeQuery();
            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getRowCountL()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getRowCountL()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }

        return allRows;
    }
   
    //��ȡ OM_PARAM_TABLE_INFO_T �Ľ���� �޸Ļ���
    public List getInfoCollL(HashMap map) throws DataAccessException {
        DataSourceInfoVO vo = null;
       
        List list = new ArrayList();

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        String tableId=(String)map.get("tableId");
        String columnInfo=(String)map.get("columnInfo");
       
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select a.table_id,b.table_name,b.table_desc, ");
        sqlBuf.append(" 	   a.column_info,a.column_kind,a.column_type, ");
        sqlBuf.append(" 	   a.column_order,a.column_desc, ");
        sqlBuf.append(" 	   c.filter_desc filter_id ");
        sqlBuf.append("   from OM_PARAM_TABLE_INFO_T a , ");
        sqlBuf.append(" 	   OM_PARAM_TABLE_DESC_T b ,");
        sqlBuf.append(" 	   om_param_filter_info_t c ");
        sqlBuf.append("  where  a.table_id ="+tableId );
        sqlBuf.append("    and a.column_info ='"+columnInfo+"'");
        sqlBuf.append("    and a.table_id=b.table_id ");
        sqlBuf.append("    and a.filter_id = c.filter_id(+) ");
        
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new DataSourceInfoVO();
                vo.setAttribute(rest);
                list.add(vo); 
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getInfoCollL()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getInfoCollL()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }

        return list;
    }
    

}
