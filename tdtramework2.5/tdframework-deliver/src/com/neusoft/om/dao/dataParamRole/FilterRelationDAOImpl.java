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
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.dao.BaseDictionaryDAO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/***************************************************************
 * ������ : 
 * ����  : 2007-8-11
 * ����  : yanglm@neusoft.com
 * ģ��  : 
 * ����  : 
 * ��ע  : 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���  ����  �޸���   �޸�ԭ��
 * 1
 * 2
 ***************************************************************/
public class FilterRelationDAOImpl extends BaseDictionaryDAO implements FilterRelationDAO {
    /**
     * 
     */
    public FilterRelationDAOImpl() {
        super();
    }
    /**
     * ��ȡ���������˹���������������Դ����Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterTables() throws DataAccessException {
        try {
           StringBuffer strBuf = new StringBuffer();
           strBuf.append(" select distinct a.table_id ,a.table_name ");
           strBuf.append(" from om_param_table_desc_t a, ");
           strBuf.append("      ( select count(table_id) allRows,table_id ");
           strBuf.append("          from om_param_table_info_t ");
           strBuf.append("         where column_type = 4 ");
           strBuf.append("           and filter_id is not null");
           strBuf.append("         group by table_id ) b ");
           strBuf.append(" where a.table_id = b.table_id ");
           strBuf.append(" order by table_id");
           
           return executeQuery(strBuf.toString(), "table_id", "table_id", "table_name", true);
        } catch (DataAccessException e) {
           SysLog.writeLogs("om", GlobalParameters.ERROR, 
        	   "FilterRelationDAO--getFilterTables():" + e.getMessage());
           throw new DataAccessException(e);
        }
    }
    /**
     * ��������Դ���ʶ��ȡ����Դ������
     * @param 
     * @return
     */
    public String getTableDescById(int tableId) throws DataAccessException {
    	String tableDesc = "";
    	
    	StringBuffer strBuf = new StringBuffer();
        strBuf.append(" select table_desc ");
        strBuf.append(" from om_param_table_desc_t ");
        strBuf.append(" where table_id = ? ");
        
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(strBuf.toString());
            pstmt.setInt(1,tableId);
            rest = pstmt.executeQuery();

            if(rest.next()) {
            	tableDesc = rest.getString(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--getTableDescById()-1:"+ e.getMessage());
            throw new DataAccessException(e);
        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--getTableDescById()-2:"+ e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }

        return tableDesc;
    }
    /**
     * ��������Դ���ʶ��ȡ��������Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterCollById(int tableId) throws DataAccessException {
        try {
        	StringBuffer strBuf = new StringBuffer();
            strBuf.append(" select column_info,column_desc ");
            strBuf.append("   from om_param_table_info_t ");
            strBuf.append("  where table_id = ").append(tableId);
            strBuf.append("    and column_type = 4");    //������������������ֶ�����Ϊ4
            strBuf.append("    and filter_id is not null");
           
            return executeQuery(strBuf.toString(),"column_info","column_desc");
        } catch (DataAccessException e) {
           SysLog.writeLogs("om", GlobalParameters.ERROR, 
                "FilterRelationDAO--getFilterCollById():" + e.getMessage());
           throw new DataAccessException(e);
        }
    }
    /**
     * ��������Դ���ʶ����ȡ�������������ϵ��Ϣ
     * @param 
     * @return
     */
    public List getFilterRelList(int tableId) throws DataAccessException {      
        List list = new ArrayList();

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
       
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select a.main_filter_info,a.filter_id,c.table_name, ");
        sqlBuf.append("	      a.passive_filter_info,a.param_column_info, ");
        sqlBuf.append("  	  (select filter_info ");
        sqlBuf.append("  	     from om_param_filter_info_t ");
        sqlBuf.append("  	    where filter_id = a.filter_id) filter_info,");
        sqlBuf.append("       (select filter_info ");
        sqlBuf.append("          from om_param_filter_info_t");
        sqlBuf.append("         where filter_id =");
        sqlBuf.append("	              (select filter_id ");
        sqlBuf.append("                  from om_param_table_info_t ");
        sqlBuf.append("  	            where table_id = ? ");
        sqlBuf.append("  	              and column_info = a.main_filter_info)) mainFilterTable");
        sqlBuf.append("  from om_param_filter_rel_t a, ");
        sqlBuf.append("       om_param_table_desc_t c");
        sqlBuf.append(" where a.table_id = ? ");
        sqlBuf.append("   and a.table_id = c.table_id");

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setInt(1,tableId);
            pstmt.setInt(2,tableId);
            rest = pstmt.executeQuery();
            
            while (rest.next()) {
            	FilterRelationVO vo = new FilterRelationVO();
            	vo.setTableId(tableId);
                vo.setMainFilterInfo(rest.getString("main_filter_info"));
                vo.setPassiveFilterInfo(rest.getString("passive_filter_info"));
                vo.setFilterId(rest.getInt("filter_id"));
                vo.setParamColumnInfo(rest.getString("param_column_info"));
                vo.setFilterInfo(rest.getString("filter_info"));
                vo.setMainFilterTable(rest.getString("mainFilterTable"));
                vo.setTableInfo(rest.getString("table_name"));
                list.add(vo); 
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--getFilterRelList()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--getFilterRelList()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }

        return list;
    }
    /**
     * ��������Դ���ʶ�������������򣬻�ȡ������������Ϣ
     * @param 
     * @return
     */
    public List getPassiveFilter(int tableId,String mainColumn,String operType) 
		throws DataAccessException {      
	    List list = new ArrayList();
	
	    Connection conn = null;
	    PreparedStatement pstmt = null;
	    ResultSet rest = null;
	   
	    StringBuffer sqlBuf = new StringBuffer();
	    sqlBuf.append("select rowNum,a.column_info,a.column_desc, ");
	    sqlBuf.append("	      a.filter_id,b.filter_info,c.table_name ");
	    if(operType.equals("modify")){
	    	sqlBuf.append("   ,ifUsed if_used,param_column_info");
	    }
	    sqlBuf.append("  from om_param_table_info_t a,");
	    sqlBuf.append("  	  om_param_filter_info_t b,");
	    sqlBuf.append("  	  om_param_table_desc_t c");
	    if(operType.equals("modify")){
	    	sqlBuf.append("  ,(select 'checked' ifUsed,filter_id,param_column_info ");
	    	sqlBuf.append("      from om_param_filter_rel_t ");
	    	sqlBuf.append("     where table_id = ? ");
	    	sqlBuf.append("       and main_filter_info = upper( ? )) d ");
	    }
	    sqlBuf.append(" where a.column_type = 4 ");
	    sqlBuf.append("   and a.table_id = ? ");
	    sqlBuf.append("   and a.column_info <> upper( ? ) ");
	    sqlBuf.append("   and a.filter_id is not null");
	    if(operType.equals("add")){
	    	sqlBuf.append("   and a.column_info not in (select passive_filter_info  ");
		    sqlBuf.append("                               from om_param_filter_rel_t  ");
		    sqlBuf.append("                              where table_id = ?  ");
		    sqlBuf.append("                                and main_filter_info = upper( ? ))  ");
	    }
	    sqlBuf.append("   and a.column_info not in (select main_filter_info  ");
	    sqlBuf.append("                               from om_param_filter_rel_t ");
	    sqlBuf.append("                              where table_id = ?  ");
	    sqlBuf.append("  						       and passive_filter_info = upper( ? ))");
	    sqlBuf.append("   and a.filter_id = b.filter_id ");
	    sqlBuf.append("   and a.table_id = c.table_id ");
	    if(operType.equals("modify")){
	    	sqlBuf.append("   and a.filter_id = d.filter_id(+)");
	    }
	
	    try {
	        conn = getConnection();
	        pstmt = conn.prepareStatement(sqlBuf.toString());
	        pstmt.setInt(1,tableId);
	        pstmt.setString(2,mainColumn);
	        pstmt.setInt(3,tableId);
	        pstmt.setString(4,mainColumn);
	        if(operType.equals("add") || operType.equals("modify")){
		        pstmt.setInt(5,tableId);
		        pstmt.setString(6,mainColumn);
	        }
	        rest = pstmt.executeQuery();
	        
	        while (rest.next()) {
	        	FilterRelationVO vo = new FilterRelationVO();
	        	vo.setSequenceRowId(rest.getInt("rowNum"));
	        	vo.setTableId(tableId);
	        	vo.setMainFilterInfo(mainColumn.toUpperCase());
	            vo.setPassiveFilterInfo(rest.getString("column_info"));
	            vo.setFilterId(rest.getInt("filter_id"));
	            vo.setColumnDesc(rest.getString("column_desc"));
	            vo.setFilterInfo(rest.getString("filter_info"));
	            vo.setTableInfo(rest.getString("table_name"));
	            vo.setSelectTagName("paramColumn_"+rest.getInt("rowNum"));
	            if(operType.equals("modify")){
	            	String if_used = rest.getString("if_used")==null?"":rest.getString("if_used");
	            	vo.setIfUsed(if_used);
	            	String param_column_info = rest.getString("param_column_info")==null?"":rest.getString("param_column_info");
	            	vo.setParamColumnInfo(param_column_info);
	            }
	            list.add(vo); 
	        }
	    } catch (SQLException e) {
	        SysLog.writeLogs("om", GlobalParameters.ERROR, 
	        	"FilterRelationDAO--getPassiveFilter()-1:" + e.getMessage());
	        throw new DataAccessException(e);
	    } catch (DataAccessException e) {
	        SysLog.writeLogs("om", GlobalParameters.ERROR, 
	        	"FilterRelationDAO--getPassiveFilter()-2:" + e.getMessage());
	        throw new DataAccessException(e);
	    } finally {
	        close(rest, pstmt, conn);
	    }
	
	    return list;
	}
    /**
     * ���ݹ����������ͱ��������ֶ����ͣ���ȡ��Ӧ�ı����������ֶ���Ϣ����
     * @param 
     * @return
     */
    public List getFilterColumn(List filterInfo) throws DataAccessException {      
        List list = new ArrayList();

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
       
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select column_name from cols ");
        sqlBuf.append("	 where table_name= upper( ? ) ");
        sqlBuf.append("    and data_type = ");
        sqlBuf.append("        (select data_type ");
        sqlBuf.append("           from cols ");
        sqlBuf.append("          where table_name = upper( ? )");
        sqlBuf.append("  		   and column_name = upper( ? ))");
        

        try {
            conn = getConnection();
            
            for(int i=0;i<filterInfo.size();i++){
            	ParamObjectCollection coll = new ParamObjectCollection();
            	FilterRelationVO vo = (FilterRelationVO)filterInfo.get(i);
            	pstmt = conn.prepareStatement(sqlBuf.toString());
                pstmt.setString(1,vo.getFilterInfo());
                pstmt.setString(2,vo.getTableInfo());
                pstmt.setString(3,vo.getMainFilterInfo());
                rest = pstmt.executeQuery();
                
                while (rest.next()) {
                	ParamObject obj = new ParamObject();
                	obj.setId(rest.getString(1));       
                	obj.setName(rest.getString(1));
                	coll.addParamObject(obj); 
                }
                vo.setFilterColumnColl(coll);
                list.add(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--getFilterColumn()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--getFilterColumn()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }

        return list;
    }
    /**
     *  ��ȡ�ñ��Ӧ�Ĺ�������Ϣ
     * @param
     * @return
     */
    public HashMap getPassiveSelectInfo(int tableId,String columnInfo,
    	String[] mainValues) throws DataAccessException {
    	StringBuffer filterSql=new StringBuffer();   
        List paramColumn = new ArrayList();
        //String[] idAndValue = new String[2];
    	
        HashMap map=new HashMap();
        
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rest = null;
        //���ݱ����������ֶ�����ȡ��ѯ���������ݵ�SQL���       
        StringBuffer sql1 = new StringBuffer();
        sql1.append(" select filter_info,filter_sel_id,filter_sel_value,");
        sql1.append("        nvl(filter_sel_param,'noData') filter_sel_param ");
        sql1.append("   from om_param_filter_info_t a, ");
        sql1.append("   	 om_param_table_info_t b ");
        sql1.append("  where b.table_id = ? ");
        sql1.append("    and b.column_info = upper( ? )");
        sql1.append("    and a.filter_id = b.filter_id ");
        //��ȡ�����������к�����������Ӧ���ֶ���Ϣ
        StringBuffer sql2 = new StringBuffer();
        sql2.append(" select param_column_info");
        sql2.append("   from om_param_filter_rel_t ");
        sql2.append("  where table_id = ? ");
        sql2.append("    and main_filter_info = upper( ? )");
        sql2.append("    and passive_filter_info = upper( ? )");
        
        try {    
            conn=getConnection();
            pst=conn.prepareStatement(sql1.toString());
            pst.setInt(1,tableId);
            pst.setString(2,columnInfo);
            rest=pst.executeQuery();
          
            if(rest.next()){
                String filterSelId=rest.getString("filter_sel_id");
                String filterSelValue=rest.getString("filter_sel_value");
                String filterSelParam=rest.getString("filter_sel_param");
                //������SQL���ʱ��֤��ѯ˳����ID��NAME
                filterSql.append(" select "+filterSelId+","+filterSelValue );
                filterSql.append(" from "+rest.getString("filter_info"));
                if(!filterSelParam.equals("noData")){
            	    filterSql.append(" where "+ filterSelParam);
            	    int order = filterSelParam.indexOf("order");
            		if(order < 0)
            			order = filterSelParam.indexOf("ORDER");
            		if(order < 0)
            			filterSql.append(" order by "+rest.getString("filter_sel_value"));
                }
                //idAndValue[0]=filterSelId;
                //idAndValue[1]=filterSelValue;
            }
            close(rest, pst);
            //�������������ͱ�������������ȡ���������ڱ����������еĶ�Ӧ�ֶ�
            for(int i=0;i<mainValues.length;i++){
        	    pst=conn.prepareStatement(sql2.toString());
        	    pst.setInt(1,tableId);
                pst.setString(2,mainValues[i]);
                pst.setString(3,columnInfo);
                rest=pst.executeQuery();
                if(rest.next()){
            	    FilterRelationVO vo = new FilterRelationVO();
            	    vo.setKeyMap(mainValues[i],rest.getString("param_column_info"));
            	    paramColumn.add(vo);
                }
            }
          
            //map.put("idAndValue",idAndValue);
            map.put("filterSql",filterSql.toString());
            map.put("paramColumn",paramColumn);
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--getPassiveSelectInfo()-1:"+ e.getMessage());
          	throw new DataAccessException(e);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--getPassiveSelectInfo()-2:" + e.getMessage());
            throw new DataAccessException(e);
        }finally {
            close(rest, pst, conn);
        }
        
        return map;
    }
    /**
     * ���ݹ�����SQL��ȡ��������Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterInfoColl(String sql) throws DataAccessException {
    	ParamObjectCollection coll = new ParamObjectCollection();   	
    	//String id = idAndValue[0];
    	//String value = idAndValue[1];
    	Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
    	
        try {
        	conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();
            
            while(rest.next()){
            	ParamObject vo = new ParamObject();
            	vo.setId(rest.getString(1));        //������SQL���ʱ��֤��ѯ˳����ID��NAME
            	vo.setName(rest.getString(2));
            	coll.addParamObject(vo);
            }
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--getFilterInfoColl()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--getFilterInfoColl()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        
        return coll;
    }
    /**
     * ��������Դ���ʶ�����������ֶκͱ�����������ʶ��ɾ����������ϵ������Ϣ
     * @param 
     * @return
     */
    public int deleteFilterRel(List values) throws DataAccessException {
    	int code = -1;
    	
    	StringBuffer strBuf = new StringBuffer();
        strBuf.append(" delete from om_param_filter_rel_t ");
        strBuf.append("  where table_id = ? ");
        strBuf.append("    and main_filter_info = ? ");
        strBuf.append("    and filter_id = ? ");
        
        Connection conn = null;
        PreparedStatement pstmt = null;
        
        try {
            conn = getConnection();
            conn.setAutoCommit(false);
            pstmt = conn.prepareStatement(strBuf.toString());
            
            for(int i=0;i<values.size();i++){
            	FilterRelationVO vo = (FilterRelationVO)values.get(i);
            	pstmt.setInt(1,vo.getTableId());
                pstmt.setString(2,vo.getMainFilterInfo());
                pstmt.setInt(3,vo.getFilterId());
                code = pstmt.executeUpdate();
                
                if(code <= 0){
                	conn.rollback();
                	break;
                }
            }
            
            if(code > 0){
            	conn.commit();
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--deleteFilterRel()-1:"+ e.getMessage());
            throw new DataAccessException(e);
        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--deleteFilterRel()-2:"+ e.getMessage());
            throw new DataAccessException(e);
        } finally {
        	try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"FilterRelationDAO--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
            close3(pstmt, conn);
        }

        return code;
    }
    /**
     * ������������ϵ������Ϣ��������޸Ĳ���������ɾ����������
     * @param 
     * @return
     */
    public int addFilterRel(List values,int tableId,String mainColumn,
    	String operType) throws DataAccessException {
    	int code = 0;
    	
    	StringBuffer strBuf = new StringBuffer();
        strBuf.append(" insert into om_param_filter_rel_t ");
        strBuf.append(" (table_id,main_filter_info, ");
        strBuf.append("  passive_filter_info,filter_id,param_column_info) ");
        strBuf.append(" values(?,?,?,?,?) ");
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" delete om_param_filter_rel_t ");
        sqlBuf.append("  where table_id = ?");
        sqlBuf.append("    and main_filter_info = upper( ? )");
        
        Connection conn = null;
        PreparedStatement pstmt = null;
        
        try {
            conn = getConnection();
            conn.setAutoCommit(false);
            //���Ϊ�޸Ĳ���������ɾ����������������Ӧ�Ĺ���������������Ϣ��Ȼ���ٽ��в������
            if(operType.equals("modify")){
            	pstmt = conn.prepareStatement(sqlBuf.toString());
            	pstmt.setInt(1,tableId);
                pstmt.setString(2,mainColumn);
                code = pstmt.executeUpdate();
        	}
            
            if(code>=0 && values.size()>0){
            	pstmt = conn.prepareStatement(strBuf.toString());
                
                for(int i=0;i<values.size();i++){
                	FilterRelationVO vo = (FilterRelationVO)values.get(i);
                	pstmt.setInt(1,vo.getTableId());
                    pstmt.setString(2,vo.getMainFilterInfo());
                    pstmt.setString(3,vo.getPassiveFilterInfo());
                    pstmt.setInt(4,vo.getFilterId());
                    pstmt.setString(5,vo.getParamColumnInfo());
                    code = pstmt.executeUpdate();
                    
                    if(code <= 0){
                    	conn.rollback();
                    	break;
                    }
                }
            }
            
            if(code > 0){
            	conn.commit();
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--addFilterRel()-1:"+ e.getMessage());
            throw new DataAccessException(e);
        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"FilterRelationDAO--addFilterRel()-2:"+ e.getMessage());
            throw new DataAccessException(e);
        } finally {
        	try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"FilterRelationDAO--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
            close3(pstmt, conn);
        }

        return code;
    }
	private void close(PreparedStatement pstmt, ResultSet rest)  {
		try{
		pstmt.close();
		rest.close();
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataParamManageDAOImpl--close:"+e.getMessage());
		}
	}
	private void close(ResultSet rest,PreparedStatement pstmt )  {
		try{
			pstmt.close();
			rest.close();
			}catch(Exception e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DataParamManageDAOImpl--close:"+e.getMessage());
			}
	}
	private void close3(PreparedStatement pstmt,Connection conn) {		
		try{
			pstmt.close();
			conn.close();
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DataParamManageDAOImpl--close:"+e.getMessage());
		}
	}
}
