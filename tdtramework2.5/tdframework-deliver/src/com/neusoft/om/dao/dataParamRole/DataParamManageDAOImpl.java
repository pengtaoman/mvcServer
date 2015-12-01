package com.neusoft.om.dao.dataParamRole;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.common.ParamObject;
import com.neusoft.common.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class DataParamManageDAOImpl extends BaseDaoImpl implements DataParamManageDAO {
	/**
     * 根据 职员编号和数据源表名 获取职员所对应的角色信息
     * @author yanglm
     * @param 
     * @return
     */
    public String getParamRoleInfo(String employeeId,String tableName) 
    	throws DataAccessException{
    	String roleInfo = "";
    	
    	StringBuffer buf = new StringBuffer();
		buf.append(" select a.f_param_role_id ");
		buf.append("   from om_employee_param_role_rel_t a, ");
		buf.append("        om_param_role_table_relation_t b,");
		buf.append("  	    om_param_table_desc_t c");
		buf.append("  where a.f_employee_id = ? ");
		buf.append("    and c.TABLE_NAME = upper( ? )");
		buf.append("    and a.f_param_role_id = b.role_id ");
		buf.append("    and c.table_id = b.table_id ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			pstmt.setString(2,tableName);
			rest = pstmt.executeQuery();
			
			while(rest.next()) {
				roleInfo = roleInfo.intern()=="".intern()?rest.getString(1):roleInfo+";"+rest.getString(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getParamRoleInfo()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getParamRoleInfo()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return roleInfo;
    }
	/**
     * 获取数据源表标识ID号
     * @author yanglm
     * @param 
     * @return
     */
    public int getParamTableId(String employeeId,String tableName) 
    	throws DataAccessException{
    	int tableId = -1;
    	
    	StringBuffer buf = new StringBuffer();
		buf.append(" select distinct a.table_id ");
		buf.append("   from om_param_table_desc_t a,om_param_role_table_relation_t b, ");
		buf.append("        om_employee_param_role_rel_t c");
		buf.append("  where c.f_employee_id = ? ");
		buf.append("    and b.ROLE_ID = c.f_param_role_id");
		buf.append("    and a.TABLE_NAME = upper( ? )");
		buf.append("    and b.TABLE_ID = a.table_id ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, tableName);
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				tableId = rest.getInt(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamTableId()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamTableId()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return tableId;
    }
    /**
     *  获取过滤表名下拉框值
     * @author 
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getTable() 
    	throws DataAccessException {
    	StringBuffer strBuf = new StringBuffer();
        strBuf.append(" select a.table_id ,a.table_desc ");
        strBuf.append("   from om_param_table_desc_t a, ");
        strBuf.append("  	   (select table_id ");
        strBuf.append("           from om_param_table_info_t ");
        strBuf.append("          where column_type = 1) b, ");
        strBuf.append("        (select table_id ");
        strBuf.append("           from om_param_table_info_t ");
        strBuf.append("          where column_type = 2) c ");
        strBuf.append("  where a.table_id = b.table_id ");
        strBuf.append("    and a.table_id = c.table_id ");
        
        com.neusoft.tdframework.common.data.ParamObjectCollection coll = new com.neusoft.tdframework.common.data.ParamObjectCollection();
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rest = null;
        
        try{
            conn = getConnection();
            pst = conn.prepareStatement(strBuf.toString());
            rest = pst.executeQuery();
            while (rest.next()){
            	com.neusoft.tdframework.common.data.ParamObject obj = new com.neusoft.tdframework.common.data.ParamObject();
                obj.setId(rest.getString("table_id"));
                obj.setName(rest.getString("table_desc"));
                coll.addParamObject(obj);
            }
        }catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageDAOImpl--getTable():" + e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest, pst, conn);
        }
        
        return coll;
    }
    /**
     *  根据角色编号获取过滤表名下拉框值
     * @author
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getTableByRole(String roleId) 
    	throws DataAccessException {
    	StringBuffer strBuf = new StringBuffer();
        strBuf.append(" select a.table_id ,a.table_desc ");
        strBuf.append("   from om_param_table_desc_t a, ");
        strBuf.append(" 	   om_param_role_table_relation_t b,");
        strBuf.append("  	   (select table_id ");
        strBuf.append("           from om_param_table_info_t ");
        strBuf.append("          where column_type = 1) c, ");
        strBuf.append("        (select table_id ");
        strBuf.append("           from om_param_table_info_t ");
        strBuf.append("          where column_type = 2) d ");
        strBuf.append("  where b.role_id = ? ");
        strBuf.append("    and a.table_id = b.table_id ");
        strBuf.append("    and a.table_id = c.table_id ");
        strBuf.append("    and a.table_id = d.table_id ");
        
        com.neusoft.tdframework.common.data.ParamObjectCollection coll = new com.neusoft.tdframework.common.data.ParamObjectCollection();
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rest = null;
        
        try
        {
            conn = getConnection();
            pst = conn.prepareStatement(strBuf.toString());
            pst.setString(1, roleId);
            rest = pst.executeQuery();
            while (rest.next()){
            	com.neusoft.tdframework.common.data.ParamObject obj = new com.neusoft.tdframework.common.data.ParamObject();
                obj.setId(rest.getString("table_id"));
                obj.setName(rest.getString("table_desc"));
                coll.addParamObject(obj);
            }
        } 
        catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageDAOImpl--getTableByRole():" + e.getMessage());
            throw new DataAccessException(e);
        } 
        finally{
            close(rest, pst, conn);
        }
        
        return coll;
    }
    /**
     * 根据职员编号获取过滤表名下拉框值
     * @author
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getTableByEmployee(String employeeId) 
    	throws DataAccessException {
    	StringBuffer strBuf = new StringBuffer();
    	strBuf.append(" select distinct a.table_id ,a.table_desc ");
        strBuf.append("   from om_param_table_desc_t a, ");
        strBuf.append(" 	   om_param_role_table_relation_t b, ");
        strBuf.append("        om_employee_param_role_rel_t c, ");
        strBuf.append("  	   (select table_id ");
        strBuf.append("           from om_param_table_info_t ");
        strBuf.append("          where column_type = 1) d, ");
        strBuf.append("        (select table_id ");
        strBuf.append("           from om_param_table_info_t ");
        strBuf.append("          where column_type = 2) e ");
        strBuf.append(" where c.f_employee_id = ? ");
        strBuf.append("   and b.role_id = c.f_param_role_id  ");
        strBuf.append("   and a.table_id = b.table_id ");
        strBuf.append("   and a.table_id = d.table_id ");
        strBuf.append("   and a.table_id = e.table_id ");
        
        com.neusoft.tdframework.common.data.ParamObjectCollection coll = new com.neusoft.tdframework.common.data.ParamObjectCollection();
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rest = null;
        
        try
        {
            conn = getConnection();
            pst = conn.prepareStatement(strBuf.toString());
            pst.setString(1, employeeId);
            rest = pst.executeQuery();
            while (rest.next()){
            	com.neusoft.tdframework.common.data.ParamObject obj = new com.neusoft.tdframework.common.data.ParamObject();
                obj.setId(rest.getString("table_id"));
                obj.setName(rest.getString("table_desc"));
                coll.addParamObject(obj);
            }
        } 
        catch (SQLException e){
        	SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageDAOImpl--getTableByEmployee():" + e.getMessage());
            throw new DataAccessException(e);
        } 
        finally{
            close(rest, pst, conn);
        }
        
        return coll;
    }
    /**
     * 根据 角色标识 和 数据源表ID 获取过滤状态描述信息
     * @author
     * @param
     * @return
     */
    public String getParamTableDesc(String roleId,String tableId) throws DataAccessException {
       
            StringBuffer strBuf = new StringBuffer();
            strBuf.append(" select table_desc  ");
            strBuf.append(" from om_param_role_table_relation_t where 1=1 ");
            if(roleId != null && !roleId.trim().equals("") && !roleId.trim().equals("null")){
            	strBuf.append(" and role_id = '"+roleId+"'");            	
            }
            if(tableId != null && !tableId.trim().equals("")&& !tableId.trim().equals("null")){
            	strBuf.append(" and table_id = '"+tableId+"'");
            }
            Connection conn = null;
            PreparedStatement pstmt = null;
            ResultSet rest = null;
            String paramTableDesc="";
            try {
                conn = getConnection();
                pstmt = conn.prepareStatement(strBuf.toString());
                rest = pstmt.executeQuery();
                
                if (rest.next()) {
                    paramTableDesc = rest.getString("table_desc");
                }
            } catch (SQLException e) {
                SysLog.writeLogs("om", GlobalParameters.ERROR,
                        "DataParamManageDAOImpl--getParamTableDesc()-1:" + e.getMessage());
                throw new DataAccessException(e);
            } catch (Exception e) {
                SysLog.writeLogs("om", GlobalParameters.ERROR,
                        "DataParamManageDAOImpl--getParamTableDesc()-2:" + e.getMessage());
                throw new DataAccessException(e);
            } finally {
                close(rest, pstmt, conn);
            }
            
            return paramTableDesc;
    }
    /**
     * 根据职员编号获取过滤信息描述
     * @author
     * @param
     * @return
     */
    public String getPowerDescByEmployee(String employeeId,String tableId) 
    	throws DataAccessException {
        StringBuffer strBuf = new StringBuffer();
        strBuf.append("SELECT a.table_desc ");
        strBuf.append("  FROM om_param_role_table_relation_t a,");
        strBuf.append("       om_employee_param_role_rel_t b");
        strBuf.append(" WHERE a.role_id=b.f_param_role_id ");
        strBuf.append("   AND a.table_id = ?");
        strBuf.append("   AND b.f_employee_id= ? ");
        
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        String paramTableDesc = "";
        
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(strBuf.toString());
            pstmt.setString(1, tableId);
            pstmt.setString(2, employeeId);
            rest = pstmt.executeQuery();
            
            while(rest.next()) {
            	String desc = rest.getString("table_desc");
            	if(desc!=null && !desc.trim().equals("")){
            		paramTableDesc = paramTableDesc.trim().equals("")? desc:paramTableDesc+"/"+desc;
            	}
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR,
                    "DataParamManageDAOImpl--getPowerDescByEmployee()-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR,
                    "DataParamManageDAOImpl--getPowerDescByEmployee()-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        
        return paramTableDesc;
    }
    /**
     * 根据 数据源表ID 获取对应的过滤器信息
     * @author yanglm
     * @param
     * @return
     */
    public HashMap getFilters(String tableId) throws DataAccessException {
        List listFilterName=new ArrayList(); //过滤下拉框名称集合
        List listColl=new ArrayList();       //生成过滤下拉框的SQL语句
        List ifPassiveFilter = new ArrayList();    //过滤下拉框的标识字段集合
        List filterTagName = new ArrayList(); //过滤下拉框的显示字段集合
        
        HashMap map=new HashMap();
        
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rest = null;
               
        StringBuffer strBuf = new StringBuffer();
        strBuf.append(" select filter_desc,filter_info,filter_sel_id,column_info,column_order,");
        strBuf.append("        DECODE(ifPassive,'',0,ifPassive) passiveCount, ");  //ifPassive为0说明这个过滤器下拉框不是被动下拉框
        strBuf.append("        filter_sel_value,nvl(filter_sel_param,'noData')filter_sel_param ");
        strBuf.append("   from om_param_filter_info_t a, ");
        strBuf.append("   	   (select filter_id,column_order,column_info ");
        strBuf.append("   	      from om_param_table_info_t ");
        strBuf.append("   	     where column_type=4 ");
        strBuf.append("            and filter_id is not null");
        strBuf.append("   	       and table_id = ?) b, ");
        strBuf.append("   	   (select filter_id,count(filter_id) ifPassive ");     //在这个表中是否是被动下拉框
        strBuf.append("   	      from om_param_filter_rel_t ");
        strBuf.append("   	     where table_id = ?");
        strBuf.append("   	     group by filter_id) c ");
        strBuf.append("  where a.filter_id in ");
        strBuf.append("        (select filter_id from om_param_table_info_t ");
        strBuf.append("          where column_type=4 and table_id = ?");
        strBuf.append("            and filter_id is not null )");
        strBuf.append("    and a.filter_id = b.filter_id ");
        strBuf.append("    and a.filter_id = c.filter_id(+) ");
        strBuf.append("  order by column_order ");
        
        try {    
        	conn=getConnection();
        	pst=conn.prepareStatement(strBuf.toString());
        	pst.setString(1, tableId);
        	pst.setString(2, tableId);
        	pst.setString(3, tableId);
        	rest=pst.executeQuery();
		  
        	while(rest.next()){
        		String filterDesc=rest.getString("filter_desc");
        		String filterSelId=rest.getString("filter_sel_id");
        		String filterSelValue=rest.getString("filter_sel_value");
        		String filterSelParam=rest.getString("filter_sel_param");
        		StringBuffer sql=new StringBuffer();                        
        		sql.append(" select "+filterSelId+","+filterSelValue );
        		sql.append(" from "+rest.getString("filter_info"));
        		if(!filterSelParam.equals("noData")){
        			sql.append(" where "+ filterSelParam);
        			int order = filterSelParam.indexOf("order");
            		if(order < 0)
            			order = filterSelParam.indexOf("ORDER");
            		if(order < 0)
            			sql.append(" order by "+rest.getString("filter_sel_value"));
        		}
        		
        		listFilterName.add(filterDesc);                             //记录下拉框的中文描述
        		ifPassiveFilter.add(rest.getString("passiveCount"));        //用来判读过滤器是否为被动下拉框
        		filterTagName.add(rest.getString("column_info"));           //记录下拉框的TAG标识
        		listColl.add(sql.toString());								//记录生成过滤器的SQL语句
		  	}
		  
		    map.put("listColl",listColl);
		  	map.put("listFilterName",listFilterName);
		  	map.put("filterTagName",filterTagName);
		  	map.put("ifPassiveFilter",ifPassiveFilter);
        
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageDAOImpl--getFilters()-1:"+ e.getMessage());
          	throw new DataAccessException(e);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageDAOImpl--getFilters()-2:" + e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageDAOImpl--getFilters()-3:"+ e.getMessage());
        }finally {
            close(rest, pst, conn);
        }
        
        return map;
    }
    /**
     * 获取联动过滤器的onchange事件方法
     * @author yanglm
     * @param
     * @return
     */
    public List getOnChangeMethod(int tableId,List ifPassiveFilter,
    	List filterTagName,String methodName) throws DataAccessException {
        List methodList=new ArrayList(); //参数过滤下拉框onchange方法
        
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rest = null;
               
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select main_filter_info,passive_filter_info ");
        sqlBuf.append("   from om_param_filter_rel_t ");
        sqlBuf.append("  where passive_filter_info IN ");
        sqlBuf.append("        (select passive_filter_info ");
        sqlBuf.append("           from om_param_filter_rel_t");
        sqlBuf.append("          where table_id = ? ");
        sqlBuf.append("            and main_filter_info = upper( ? )) ");
        sqlBuf.append("  order by passive_filter_info ");
        
        try {    
        	conn=getConnection();
        	for(int i=0;i<ifPassiveFilter.size();i++){
        		String flag = (String)ifPassiveFilter.get(i);
        		String methodInfo = "";
				if(flag.trim().equals("0")){
					pst=conn.prepareStatement(sqlBuf.toString());
		        	pst.setInt(1,tableId);
		        	pst.setString(2,(String)filterTagName.get(i));
		        	rest=pst.executeQuery();
		        	
		        	String passiveParamName = null;
		        	String mainParamNames = null;
		        	List methodInfoList=new ArrayList();
		        	
		        	while(rest.next()){
		        		String tempPassiveName = rest.getString("passive_filter_info");
		        		String tempMainName = rest.getString("main_filter_info");
		        		
		        		if(passiveParamName == null){
		        			passiveParamName = tempPassiveName;
		        			mainParamNames = tempMainName;
		        		}else if(passiveParamName.equals(tempPassiveName)){
		        			mainParamNames = mainParamNames+"~"+tempMainName;
		        		}else{
		        			//记录新的被动下拉框名，生成另一个主过滤器下拉框的onchange方法
		        			passiveParamName = tempPassiveName;
		        			mainParamNames = tempMainName;
		        			//如果被动下拉框变化，则记录主过滤器下拉框的onchange方法
		        			methodInfoList.add(methodInfo);
		        		}
		        		
		        		//根据被动下拉框名生成主过滤器下拉框的onchange方法
	        			methodInfo = methodName+"("+tableId+",'"+mainParamNames+"','"+passiveParamName+"');";
		        	}
		        	//记录最后生成的主过滤器下拉框的onchange方法
		        	if(!methodInfo.trim().equals("")){
		        		methodInfoList.add(methodInfo);
		        	}
		        	methodInfo = "";
		        	//将这个主过滤器在onchange事件中需要出发的所有方法拼在一起
		        	for(int j=0;j<methodInfoList.size();j++){
		        		methodInfo = methodInfo+(String)methodInfoList.get(j);
		        	}
		        	
		        	methodList.add(methodInfo);
				}else{
					methodList.add(methodInfo);
				}
        	}
        }catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageDAOImpl--getOnChangeMethod()-1:"+ e.getMessage());
          	throw new DataAccessException(e);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageDAOImpl--getOnChangeMethod()-2:" + e.getMessage());
            throw new DataAccessException(e);
        }finally {
            close(rest, pst, conn);
        }
        
        return methodList;
    }
    /**
     * 根据 角色标识 和 数据源表ID 获取赋权信息
     * @author yanglm
     * @param
     * @return
     */
    public HashMap getInfoColl(String tableId,String roleId,HashMap paramMap,
    		int beginNum, int endNum) throws DataAccessException {
        DataParamManageVO vo = null;
        // 存显示的数据结果集
        List list = new ArrayList();
        // 存字段名称
        List listColName=new ArrayList();
        //map 存 结果集 and 字段名称 and length(要显示的数据列数+ectable没有显示的列数（作为checkBox的值）)
        HashMap map=new HashMap();
        //查询的表名
        String tableName="";
        //存放要显示数据的列
        List listColumns=new ArrayList();
        //存放关联了filter_id 的列
        List listColFilter=new ArrayList();
        //存放 checkbox 要存的值的列(在显示的数据列中 去掉 column_type=2 的部分)
        StringBuffer StrCheckBox=new StringBuffer();
        //显示数据的列数 + checkBox 值的列数
        int length=0;
        //存放om_param_data_info_t.data_info的结果集 （传入tableInfo.jsp 中用来判断checkbox 是否选中）
        StringBuffer dataInfo=new StringBuffer();
                
        //查询要显示的数据列的sql
        StringBuffer sqlBuf=new StringBuffer();
        sqlBuf.append(" select a.column_info,a.column_desc, ");
        sqlBuf.append(" 	   b.filter_sel_value ,b.filter_sel_id,b.FILTER_INFO ");
        sqlBuf.append(" from om_param_table_info_t a, om_param_filter_info_t b ");
        sqlBuf.append(" where a.filter_id =b.filter_id(+) and a.table_id= ? ");
        sqlBuf.append(" order by a.column_order ");
        //获取过滤器关联信息
        StringBuffer filterRel=new StringBuffer();
        filterRel.append(" select main_filter_info,passive_filter_info,param_column_info ");
        filterRel.append("   from om_param_filter_rel_t ");
        filterRel.append("  where table_id= ? ");
        filterRel.append("  order by filter_id ");
        //含有过滤器的列 过滤的列 filter_id 关联的列
        StringBuffer sqlBufFilter=new StringBuffer();
        //order by column_order不可以去掉 （使filter与关联的字段对应）
        sqlBufFilter.append(" select column_info from om_param_table_info_t  ");
        sqlBufFilter.append("  where table_id = ? ");
        sqlBufFilter.append("    and column_type = 4");
        sqlBufFilter.append("    and filter_id is not null");
        sqlBufFilter.append("  order by column_order ");
        //获取要查询的表
        StringBuffer strBufTable=new StringBuffer();
        strBufTable.append(" select table_name ");
        strBufTable.append("   from om_param_table_desc_t ");
        strBufTable.append("  where table_id = ? ");
        //获取显示字段的名称
        StringBuffer strBufName=new StringBuffer();
        strBufName.append(" select column_desc ");
        strBufName.append("   from om_param_table_info_t");
        strBufName.append("  where table_id= ? ");
        strBufName.append("  order by column_order");
        //获取checkbox 要存的值的列(在显示的列 去掉 column_type=2 的部分)
        int countCheckBoxRow=0;
        StringBuffer strBufCheck=new StringBuffer();
        strBufCheck.append(" select column_info ");
        strBufCheck.append("   from om_param_table_info_t");
        strBufCheck.append("  where table_id = ? and column_type <>2");
        strBufCheck.append("  order by column_order ");
        //查询om_param_data_info_t的数据
        StringBuffer sqlParamData=new StringBuffer();
        sqlParamData.append(" select data_info ");
        sqlParamData.append("   from om_param_data_info_t ");
        sqlParamData.append("  where role_id = ? ");
        sqlParamData.append("    and table_id = ?");
        
        StringBuffer sqlParamName = new StringBuffer();
        sqlParamName.append("select column_info ");
        sqlParamName.append("   from om_param_table_info_t");
        sqlParamName.append("  where table_id = ? and column_type = 2");
        
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try {
            conn = getConnection();
            //查询om_param_data_info_t的数据
            pstmt=conn.prepareStatement(sqlParamData.toString());
            pstmt.setString(1, roleId);
            pstmt.setString(2, tableId);
            rest=pstmt.executeQuery();
            while(rest.next()){
            	if(rest.getString("data_info") != null){
            		dataInfo.append(rest.getString("data_info"));
                    dataInfo.append("~");
            	}
            }
            close(pstmt, rest);
            
            //获取查询数据的结果集显示到list
            //获取要查询的表
            pstmt=conn.prepareStatement(strBufTable.toString());
            pstmt.setString(1, tableId);
            rest=pstmt.executeQuery();
            if(rest.next()){
                tableName=rest.getString("table_name");
            }
            close(rest,pstmt);
            
            //获取过滤器关系，过滤关联条件列
            List filterRelInfo = new ArrayList();
            pstmt = conn.prepareStatement(filterRel.toString());
            pstmt.setString(1, tableId);
            rest= pstmt.executeQuery();
            while(rest.next()){
            	FilterRelationVO obj = new FilterRelationVO();
            	obj.setMainFilterInfo(rest.getString("main_filter_info"));
            	obj.setPassiveFilterInfo(rest.getString("passive_filter_info"));
            	obj.setParamColumnInfo(rest.getString("param_column_info"));
            	filterRelInfo.add(obj);
            }
            close(rest,pstmt);
            
            //获取显示的列
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setString(1, tableId);
            rest= pstmt.executeQuery();            
            while(rest.next()){
                String filterSelValue=rest.getString("filter_sel_value");
                if(filterSelValue==null){
                    listColumns.add(rest.getString("column_info"));
                }else{
                    String filterInfo=rest.getString("filter_info");
                    String filterSelId=rest.getString("filter_sel_id");
                    String whereStr = "";
                    for(int i=0;i<filterRelInfo.size();i++){
                    	FilterRelationVO obj = (FilterRelationVO)filterRelInfo.get(i);
                    	if(obj.getPassiveFilterInfo().equals(filterSelId)){
                    		whereStr = whereStr+" and "+obj.getParamColumnInfo()+" = "+tableName+"."+obj.getMainFilterInfo();
                    	}
                    }
                    String columnInfo=rest.getString("column_info");
                    String getNameSql="( select " +filterSelValue +" from "+filterInfo+
                                      " where "+filterSelId+" = "+tableName+"."+columnInfo+
                                      whereStr+" )";
                    listColumns.add(getNameSql);
                }
                
                listColName.add(rest.getString("column_desc"));
            }
            close(rest,pstmt);
            
            // 获取checkbox 要存的值的列(在显示的列 去掉 column_type=2 的部分)
            pstmt=conn.prepareStatement(strBufCheck.toString());
            pstmt.setString(1, tableId);
            rest=pstmt.executeQuery();
            while(rest.next()){
                countCheckBoxRow++;
                StrCheckBox.append(",");
                StrCheckBox.append(rest.getString("column_info"));
            }
            close(rest,pstmt);
            
            //获取与filter_id 关联的列
            pstmt=conn.prepareStatement(sqlBufFilter.toString());
            pstmt.setString(1, tableId);
            rest=pstmt.executeQuery();
            for(int i=0;rest.next();i++){
                String columns=rest.getString("column_info");
                listColFilter.add(columns);
            }
            close(rest,pstmt);
            
            String name = new String();
            pstmt=conn.prepareStatement(sqlParamName.toString());
            pstmt.setString(1, tableId);
            rest=pstmt.executeQuery();
            while(rest.next()){
            	name = rest.getString("column_info");
            }
            close(rest,pstmt);
            
            
            //获取查询数据列
            StringBuffer sql=new StringBuffer();
            sql.append("select * from ( ");
            if(endNum != -1){
            	sql.append(" select * from ( ");
            }            		
            sql.append(" select rownum rowcound,");
            int colLength=listColumns.size();
            for(int i=0;i<colLength;i++){
                sql.append((String)listColumns.get(i)+"  abcdef"+i);// 给列起别名
                if(i<colLength-1){
                    sql.append(",");
                }
            }
            sql.append(StrCheckBox.toString());
            sql.append(" from "+tableName+" where 1=1 " );
            //关联filter_id 的列数 = 页面获取过滤器的值的数组的长度          
            for(int i=0;i<listColFilter.size();i++){
            	String filterColumn = (String)listColFilter.get(i);
                if(paramMap!=null && paramMap.size()>0){
                	String value = (String)paramMap.get(filterColumn);
                	if( value != null && !value.trim().equals("") && !value.equals("null")){
                		sql.append(" and "+filterColumn+"= '"+value+"'");
                	}
                }
            }
            
            if(endNum != -1){ //endNum == -1 表示使用数据库分页
            	sql.append("order by ").append(name).append(" )");
            	sql.append(" where  rownum < ").append(endNum);
            }else{
            	sql.append("order by  ").append(name);
            }
            sql.append(" ) ");
            if(beginNum != -1){//beginNum = -1 表示使用数据库分页
            	sql.append("where rowcound >= ").append(beginNum);
            }
            //System.out.println(sql.toString());
            pstmt=conn.prepareStatement(sql.toString());
            rest=pstmt.executeQuery();
            ///////////////////////////////////////////////////////////////////////////////////////////
            //显示的列数 + checkBox 值的列数
            length=colLength+countCheckBoxRow;
            while (rest.next()) {
                vo = new DataParamManageVO();
                if(length>0)
                    vo.setColumn1(rest.getString(2));//rest.getString(1)是rowcound
                if(length>1)
                    vo.setColumn2(rest.getString(3));
                if(length>2)
                    vo.setColumn3(rest.getString(4));
                if(length>3)
                    vo.setColumn4(rest.getString(5));
                if(length>4)
                    vo.setColumn5(rest.getString(6));
                if(length>5)
                    vo.setColumn6(rest.getString(7));
                if(length>6)
                    vo.setColumn7(rest.getString(8));
                if(length>7)
                    vo.setColumn8(rest.getString(9));
                if(length>8)
                    vo.setColumn9(rest.getString(10));
                if(length>9)
                    vo.setColumn10(rest.getString(11));
                if(length>10)
                    vo.setColumn11(rest.getString(12));
                if(length>11)
                    vo.setColumn12(rest.getString(13));
                if(length>12)
                    vo.setColumn13(rest.getString(14));
                if(length>13)
                    vo.setColumn14(rest.getString(15));
                if(length>14)
                    vo.setColumn15(rest.getString(16));
                if(length>15)
                    vo.setColumn16(rest.getString(17));
                
                list.add(vo);
            }
            
            //将两个list 放入map 返回
            map.put("listColl",list);
            map.put("listName",listColName);
            map.put("length",String.valueOf(length));
            map.put("dataInfo",dataInfo.toString());
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            		"DataParamManageDAOImpl--getInfoColl()-1:"+ e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            		"DataParamManageDAOImpl--getInfoColl()-2:"+ e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        
        return map;
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
    /**
     * 根据 职员编号 和 数据源表ID 获取赋权信息
     * 
     * @param
     * @return
     */
    public HashMap getDataCollByEmployee(String tableId,String employeeId,
    		HashMap paramMap,int beginNum, int endNum,int powerFlag,int showNewData) 
    			throws DataAccessException {
        DataParamManageVO vo = null;
        // 存显示的数据结果集
        List list = new ArrayList();
        // 存字段名称
        List listColName=new ArrayList();
        //map 存 结果集 and 字段名称 and length(要显示的数据列数+ectable没有显示的列数（作为checkBox的值）)
        HashMap map=new HashMap();
        //查询的表名
        String tableName="";
        //存放要显示数据的列
        List listColumns=new ArrayList();
        //存放关联了filter_id 的列
        List listColFilter=new ArrayList();
        //存放 checkbox 要存的值的列(在显示的数据列中 去掉 column_type=2 的部分)
        StringBuffer StrCheckBox=new StringBuffer();
        //显示数据的列数 + checkBox 值的列数
        int length=0;
        //存放om_param_data_info_t.data_info的结果集 （传入tableInfo.jsp 中用来判断checkbox 是否选中）
        StringBuffer dataInfo=new StringBuffer();
                
        //查询要显示的数据列的sql
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select a.column_info,a.column_desc, ");
        sqlBuf.append(" 	   b.filter_sel_value ,b.filter_sel_id,b.FILTER_INFO ");
        sqlBuf.append(" from om_param_table_info_t a, om_param_filter_info_t b ");
        sqlBuf.append(" where a.filter_id =b.filter_id(+) and a.table_id= ? ");
        sqlBuf.append(" order by a.column_order ");
        //获取过滤器关联信息
        StringBuffer filterRel=new StringBuffer();
        filterRel.append(" select main_filter_info,passive_filter_info,param_column_info ");
        filterRel.append("   from om_param_filter_rel_t ");
        filterRel.append("  where table_id = ? ");
        filterRel.append("  order by filter_id ");
        //含有过滤器的列 过滤的列 filter_id 关联的列
        StringBuffer sqlBufFilter=new StringBuffer();
        //order by column_order不可以去掉 （使filter与关联的字段对应）
        sqlBufFilter.append(" select column_info from om_param_table_info_t  ");
        sqlBufFilter.append("  where table_id = ? ");
        sqlBufFilter.append("    and column_type = 4");
        sqlBufFilter.append("    and filter_id is not null");
        sqlBufFilter.append("  order by column_order ");
        //获取要查询的表
        StringBuffer strBufTable=new StringBuffer();
        strBufTable.append(" select table_name ");
        strBufTable.append("   from om_param_table_desc_t ");
        strBufTable.append("  where table_id = ? ");
      
        //获取checkbox 要存的值的列(在显示的列 去掉 column_type=2 的部分)
        int countCheckBoxRow=0;
        StringBuffer strBufCheck=new StringBuffer();
        strBufCheck.append(" select column_info ");
        strBufCheck.append("   from om_param_table_info_t");
        strBufCheck.append("  where table_id = ? and column_type <>2");
        strBufCheck.append("  order by column_order ");
        
        //获得名称列名
        StringBuffer sqlParamName = new StringBuffer();
        sqlParamName.append("select column_info ");
        sqlParamName.append("   from om_param_table_info_t");
        sqlParamName.append("  where table_id = ? and column_type = 2");
        
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try {
            conn = getConnection();
            //查询需要过滤掉的数据集
            if(showNewData == 1){
                ParamObjectCollection coll = getParamDataColl(conn,employeeId,Integer.parseInt(tableId),powerFlag,"false");

                if(coll!=null){
                	for(int i=0;i<coll.getRowCount();i++){
                		ParamObject obj = coll.getParamObject(i);
                		dataInfo.append(obj.getFilterDataInfo());
                        dataInfo.append("~");
                	}
                }
            }else{
                ParamObjectCollection coll = getParamDataCollUnshownNew(conn,employeeId,Integer.parseInt(tableId),powerFlag,"false");

                if(coll!=null){
                	for(int i=0;i<coll.getRowCount();i++){
                		ParamObject obj = coll.getParamObject(i);
                		dataInfo.append(obj.getFilterDataInfo());
                        dataInfo.append("~");
                	}
                }
            }

            //获取查询数据的结果集显示到list
            //获取要查询的表
            pstmt=conn.prepareStatement(strBufTable.toString());
            pstmt.setString(1, tableId);
            rest=pstmt.executeQuery();
            if(rest.next()){
                tableName=rest.getString("table_name");
            }
            close(rest,pstmt);
            
            //获取过滤器关系，过滤关联条件列
            List filterRelInfo = new ArrayList();
            pstmt = conn.prepareStatement(filterRel.toString());
            pstmt.setString(1, tableId);
            rest= pstmt.executeQuery();
            while(rest.next()){
            	FilterRelationVO obj = new FilterRelationVO();
            	obj.setMainFilterInfo(rest.getString("main_filter_info"));
            	obj.setPassiveFilterInfo(rest.getString("passive_filter_info"));
            	obj.setParamColumnInfo(rest.getString("param_column_info"));
            	filterRelInfo.add(obj);
            }
            close(rest,pstmt);
            
            //获取显示的列
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setString(1, tableId);
            rest= pstmt.executeQuery();
            while(rest.next()){
                String filterSelValue=rest.getString("filter_sel_value");
                if(filterSelValue==null){
                    listColumns.add(rest.getString("column_info"));
                }else{
                    String filterInfo=rest.getString("filter_info");
                    String filterSelId=rest.getString("filter_sel_id");
                    String whereStr = "";
                    for(int i=0;i<filterRelInfo.size();i++){
                    	FilterRelationVO obj = (FilterRelationVO)filterRelInfo.get(i);
                    	if(obj.getPassiveFilterInfo().equals(filterSelId)){
                    		whereStr = whereStr+" and "+obj.getParamColumnInfo()+" = "+tableName+"."+obj.getMainFilterInfo();
                    	}
                    }
                    String columnInfo=rest.getString("column_info");
                    String getNameSql="( select " +filterSelValue +" from "+filterInfo+
                                      " where "+filterSelId+" = "+tableName+"."+columnInfo+
                                      whereStr+" )";
                    listColumns.add(getNameSql);
                }
                
                listColName.add(rest.getString("column_desc"));
            }
            close(rest,pstmt);
            
            // 获取checkbox 要存的值的列(在显示的列 去掉 column_type=2 的部分)
            pstmt=conn.prepareStatement(strBufCheck.toString());
            pstmt.setString(1, tableId);
            rest=pstmt.executeQuery();
            while(rest.next()){
                countCheckBoxRow++;
                StrCheckBox.append(",");
                StrCheckBox.append(rest.getString("column_info"));
            }
            close(rest,pstmt);
            
            //获取与filter_id 关联的列
            pstmt=conn.prepareStatement(sqlBufFilter.toString());
            pstmt.setString(1, tableId);
            rest=pstmt.executeQuery();
            for(int i=0;rest.next();i++){
                String columns=rest.getString("column_info");
                listColFilter.add(columns);
            }
            close(rest,pstmt);
            
            //名称列，字段名
            String name = new String();
            pstmt=conn.prepareStatement(sqlParamName.toString());
            pstmt.setString(1, tableId);
            rest=pstmt.executeQuery();
            while(rest.next()){
            	name = rest.getString("column_info");
            }
            close(rest,pstmt);
            
            //获取查询数据列
            StringBuffer sql=new StringBuffer();
            sql.append("select * from ( ");
            if(endNum != -1){
            	sql.append(" select * from ( ");
            }
            sql.append(" select rownum rowcound,");
            int colLength=listColumns.size();
            for(int i=0;i<colLength;i++){
                sql.append((String)listColumns.get(i)+"  abcdef"+i);// 给列起别名
                if(i<colLength-1){
                    sql.append(",");
                }
            }
            sql.append(StrCheckBox.toString());
            sql.append(" from "+tableName+" where 1=1 " );
            //关联filter_id 的列数 = 页面获取过滤器的值的数组的长度
            for(int i=0;i<listColFilter.size();i++){
            	String filterColumn = (String)listColFilter.get(i);
                if(paramMap!=null && paramMap.size()>0){
                	String value = (String)paramMap.get(filterColumn);
                	if(value != null && !value.trim().equals("") && !value.equals("null")){
                		sql.append(" and "+filterColumn+"= '"+value+"'");
                	}
                }
            }
            if(endNum != -1){// -1表示不使用数据库分页
            	sql.append("order by ").append(name).append(" )");
            	sql.append(" where rownum < ").append(endNum); 
            }else{
            	sql.append("order by  ").append(name);
            }
            sql.append(" ) ");//-1表示不使用数据库分页
            if(beginNum != -1){
            	sql.append("where rowcound >= ").append(beginNum);
            }
            pstmt=conn.prepareStatement(sql.toString());
            rest=pstmt.executeQuery();
            ///////////////////////////////////////////////////////////////////////////////////////////
            //显示的列数 + checkBox 值的列数
            length=colLength+countCheckBoxRow;
            while (rest.next()) {
            	vo = new DataParamManageVO();
                if(length>0)
                    vo.setColumn1(rest.getString(2));//rest.getString(1)是rowcound
                if(length>1)
                    vo.setColumn2(rest.getString(3));
                if(length>2)
                    vo.setColumn3(rest.getString(4));
                if(length>3)
                    vo.setColumn4(rest.getString(5));
                if(length>4)
                    vo.setColumn5(rest.getString(6));
                if(length>5)
                    vo.setColumn6(rest.getString(7));
                if(length>6)
                    vo.setColumn7(rest.getString(8));
                if(length>7)
                    vo.setColumn8(rest.getString(9));
                if(length>8)
                    vo.setColumn9(rest.getString(10));
                if(length>9)
                    vo.setColumn10(rest.getString(11));
                if(length>10)
                    vo.setColumn11(rest.getString(12));
                if(length>11)
                    vo.setColumn12(rest.getString(13));
                if(length>12)
                    vo.setColumn13(rest.getString(14));
                if(length>13)
                    vo.setColumn14(rest.getString(15));
                if(length>14)
                    vo.setColumn15(rest.getString(16));
                if(length>15)
                    vo.setColumn16(rest.getString(17));
                
                list.add(vo);
            }
            
            //将两个list 放入map 返回
            map.put("listColl",list);
            map.put("listName",listColName);
            map.put("length",String.valueOf(length));
            map.put("dataInfo",dataInfo.toString());
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            		"DataParamManageDAOImpl--getInfoColl()-1:"+ e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            		"DataParamManageDAOImpl--getInfoColl()-2:"+ e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        
        return map;
    }
    
    /**
     *  获取查询结果集的列数
     * 
     * @param
     * @return
     */
    public int getRowCount(String tableId,HashMap paramMap) throws DataAccessException {
       int allRows=0;
       
        //filter_id 关联的列
        List listColFilter=new ArrayList();
        String tableName="";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        //含有过滤器的列 过滤的列 filter_id 关联的列
        StringBuffer sqlBufFilter=new StringBuffer();
        sqlBufFilter.append(" select column_info from om_param_table_info_t  ");
        sqlBufFilter.append("  where table_id = ? ");
        sqlBufFilter.append("    and column_type = 4");
        sqlBufFilter.append("    and filter_id is not null");
        sqlBufFilter.append("  order by column_order ");
        
        try {
            conn = getConnection();
           
            //获取与filter_id 关联的列
            pstmt=conn.prepareStatement(sqlBufFilter.toString());
            pstmt.setString(1, tableId);
            rest=pstmt.executeQuery();
            while(rest.next()){
                String columns=rest.getString("column_info");
                listColFilter.add(columns);
            }
            close(rest,pstmt);
            
            //获取要查询的表
            StringBuffer strBufTable=new StringBuffer();
            strBufTable.append(" select table_name from om_param_table_desc_t where table_id = ?");
            pstmt=conn.prepareStatement(strBufTable.toString());
            pstmt.setString(1, tableId);
            rest=pstmt.executeQuery();
            if(rest.next()){
                tableName=rest.getString("table_name");
            }
            
            //获取查询数据列
            StringBuffer sql=new StringBuffer();
            sql.append("select count(*) ");
            sql.append(" from "+tableName+" where 1=1 " );
            //关联filter_id 的列数 = 页面获取过滤器的值的数组的长度
            for(int i=0;i<listColFilter.size();i++){
            	String filterColumn = (String)listColFilter.get(i);
                if(paramMap!=null && paramMap.size()>0){
                	String value = (String)paramMap.get(filterColumn);
                	if(value!=null && !value.trim().equals("") && !value.equals("null")){
                		sql.append(" and "+filterColumn+"= '"+value+"'");
                	}
                }
            }
            pstmt=conn.prepareStatement(sql.toString());
            //System.out.println(sql.toString());
            rest=pstmt.executeQuery();
            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            		"DataParamManageDAOImpl--getInfoColl()-1:"+ e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            		"DataParamManageDAOImpl--getInfoColl()-2:"+ e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return allRows;
        
    }
	/**
     * 新增参数过滤数据信息，先拆分出需要插入和删除的数据集，然后分别进行处理
     * @author yanglm
     * @param 
     * @return
     */
    public String addParamRoleData(int roleId,int tableId,String tableDesc,
    		ParamObjectCollection deleteDataInfo,ParamObjectCollection insertDataInfo) 
    			throws DataAccessException{
    	int code = -1;
    	String msg = "true";
    	
    	//删除被除掉（原来有但现在没有）的过滤数据信息
    	StringBuffer buf1 = new StringBuffer();
		buf1.append(" delete om_param_data_info_t ");
		buf1.append("  where role_id = ? ");
		buf1.append("    and table_id = ? ");
		buf1.append("    and data_info = ?");
		//插入新增加的过滤数据信息
		StringBuffer buf2 = new StringBuffer();
		buf2.append(" insert into om_param_data_info_t ");
		buf2.append(" (role_id,table_id,data_info) ");
		buf2.append(" values( ?,?,?)");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			
			msg = addDescTableInfo(roleId,tableId,tableDesc,conn);
			
			if(msg.equals("true")){
				if(deleteDataInfo!=null && deleteDataInfo.getRowCount()>0){
					for(int i=0;i<deleteDataInfo.getRowCount();i++){
						ParamObject vo = deleteDataInfo.getParamObject(i);
						//删除旧数据
						pstmt = conn.prepareStatement(buf1.toString());
						pstmt.setInt(1, roleId);
						pstmt.setInt(2, tableId);
						pstmt.setString(3,vo.getFilterDataInfo());
						code = pstmt.executeUpdate();
						if(code < 0){
							break;
						}
					}
				}else{
					code = 0;
				}
					
				if(code>=0 && insertDataInfo!=null){
					for(int j=0;j<insertDataInfo.getRowCount();j++){
						ParamObject vo = insertDataInfo.getParamObject(j);
						if(vo.getFilterDataInfo()==null || vo.getFilterDataInfo().trim().equals("")){
							continue;
						}
						//插入新数据
						pstmt = conn.prepareStatement(buf2.toString());
						pstmt.setInt(1, roleId);
						pstmt.setInt(2, tableId);
						pstmt.setString(3,vo.getFilterDataInfo());
						code = pstmt.executeUpdate();
						if(code < 0){
							break;
						}
					}
				}
				
				if(code >= 0){
					conn.commit();
				}else{
					conn.rollback();
					msg = "为此角色插入赋权信息时出错";
				}
			}			
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--addParamRoleData()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--addParamRoleData()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"DataParamManageDAOImpl--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			close(rest,pstmt, conn);
		}
    	
    	return msg;
    }
    
    /**
     * 权限微调——新增参数过滤数据信息，先拆分出需要插入和删除的数据集，然后分别进行处理
     * @param 
     * @return
     */
    public String addParamAdjustData(String employeeId,int tableId,
    		ParamObjectCollection deleteDataInfo,ParamObjectCollection insertDataInfo) 
				throws DataAccessException{
    	int code = -1;
    	String msg = "true";
    	
    	//删除旧的过滤数据信息
    	StringBuffer buf1 = new StringBuffer();
		buf1.append(" delete om_param_employee_data_rel_t ");
		buf1.append("  where employee_id = ? ");
		buf1.append("    and table_id = ? ");
		buf1.append("    and data_info = ?");
		//插入新增加的过滤数据信息
		StringBuffer buf2 = new StringBuffer();
		buf2.append(" insert into om_param_employee_data_rel_t ");
		buf2.append(" (employee_id,table_id,data_info,data_flag) ");
		buf2.append(" values( ?,?,?,?)");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			
			if(deleteDataInfo!=null && deleteDataInfo.getRowCount()>0){
				for(int i=0;i<deleteDataInfo.getRowCount();i++){
					ParamObject vo = deleteDataInfo.getParamObject(i);
					//删除旧数据
					pstmt = conn.prepareStatement(buf1.toString());
					pstmt.setString(1, employeeId);
					pstmt.setInt(2, tableId);
					pstmt.setString(3,vo.getFilterDataInfo());
					code = pstmt.executeUpdate();
					if(code < 0){
						break;
					}
				}
			}else{
				code = 0;
			}
				
			if(code>=0 && insertDataInfo!=null){
				for(int j=0;j<insertDataInfo.getRowCount();j++){
					ParamObject vo = insertDataInfo.getParamObject(j);
					//不能插入过滤数据为空的信息
					if(vo.getFilterDataInfo()==null || vo.getFilterDataInfo().trim().equals("")){
						continue;
					}
					//插入新数据
					pstmt = conn.prepareStatement(buf2.toString());
					pstmt.setString(1, employeeId);
					pstmt.setInt(2, tableId);
					pstmt.setString(3,vo.getFilterDataInfo());
					pstmt.setInt(4,vo.getFilterDataFlag());
					code = pstmt.executeUpdate();
					if(code < 0){
						break;
					}
				}
			}
			
			if(code >= 0){
				conn.commit();
			}else{
				conn.rollback();
				msg = "为此角色插入赋权信息时出错";
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--addParamAdjustData()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--addParamAdjustData()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"DataParamManageDAOImpl--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			close(rest,pstmt, conn);
		}
    	
    	return msg;
    }

    /**
	 * 根据 角色标识 获取角色对应的所有数据源表的描述信息
	 * @param 
	 * @return
	 */
	public List getDescTableInfo(int roleId) throws DataAccessException{
		List list = new ArrayList();
		
		StringBuffer buf1 = new StringBuffer();
		buf1.append(" select a.table_id,a.table_desc,b.table_desc ");
		buf1.append("   from om_param_table_desc_t a,om_param_role_table_relation_t b ");
		buf1.append("  where b.role_id = ? ");
		buf1.append("    and b.table_id = a.table_id");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf1.toString());
			pstmt.setInt(1, roleId);
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				HashMap map=new HashMap();
				map.put("table_id",rest.getString("table_id"));
				map.put("table_desc",rest.getString("table_desc"));
				map.put("param_table_desc",rest.getString("table_desc"));
				list.add(map);
			}			
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getDescTableInfo()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getDescTableInfo()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest,pstmt, conn);
		}
		
		return list;
	}
    /**
	 * 新增数据源表概述信息
	 * @author yanglm
	 * @param 
	 * @return
	 */
	public String addDescTableInfo(int roleId,int tableId,String tableDesc) 
		throws DataAccessException{
		int code = -1;
		String msg = "true";
    	//检查此角色 roleId 是否已经在此数据源表 tableId 存在权限信息
    	StringBuffer buf0 = new StringBuffer();
    	buf0.append(" select count(*),b.table_name ");
    	buf0.append("   from (select distinct c.table_name ");
    	buf0.append("	         from om_param_role_table_relation_t a,");
    	buf0.append("   			  om_param_table_desc_t c ");
    	buf0.append("	        where a.table_id = c.table_id");
    	buf0.append("             and a.role_id = ? ");
    	buf0.append("             and a.table_id <> ? ) a, ");
    	buf0.append("	      (select c.table_name");
    	buf0.append("           from om_param_role_table_relation_t a, ");
    	buf0.append("	              om_param_table_desc_t c");
    	buf0.append("          where a.table_id = c.table_id ");
    	buf0.append("            and a.table_id = ? ) b ");
    	buf0.append("  where a.table_name = b.table_name");
    	buf0.append("  group by b.table_name");
		//删除所有原来的过滤描述信息
		StringBuffer buf1 = new StringBuffer();
		buf1.append(" delete om_param_role_table_relation_t ");
		buf1.append("  where role_id = ? ");
		buf1.append("    and table_id = ? ");
		//插入新的过滤描述信息
		StringBuffer buf2 = new StringBuffer();
		buf2.append(" insert into om_param_role_table_relation_t ");
		buf2.append(" (role_id,table_id,table_desc) ");
		buf2.append(" values( ?,?,? )");
		StringBuffer buf3 = new StringBuffer();
		buf3.append(" insert into om_param_data_info_t ");
		buf3.append(" (role_id,table_id,data_info) ");
		buf3.append(" values( ?,?,? )");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			pstmt = conn.prepareStatement(buf0.toString());
			pstmt.setInt(1, roleId);
			pstmt.setInt(2, tableId);
			pstmt.setInt(3, tableId);
			rest = pstmt.executeQuery();
			
			String table_name = null;
			if(rest.next()){
				code = rest.getInt(1);
				table_name = rest.getString(2);
			}			
			if(code > 0){
				msg = "此角色在数据源表 "+table_name+" 上已有权限存在，不能再进行新增操作";
			}else{
				pstmt = conn.prepareStatement(buf1.toString());
				pstmt.setInt(1, roleId);
				pstmt.setInt(2, tableId);
				code = pstmt.executeUpdate();	
				if(code >= 0){
					pstmt = conn.prepareStatement(buf2.toString());
					pstmt.setInt(1, roleId);
					pstmt.setInt(2, tableId);
					pstmt.setString(3, tableDesc);
					code = pstmt.executeUpdate();
				}				
				if(code > 0){
					pstmt = conn.prepareStatement(buf3.toString());
					pstmt.setInt(1, roleId);
					pstmt.setInt(2, tableId);
					pstmt.setString(3, "*");
					code = pstmt.executeUpdate();
				}				
				if(code > 0){
					conn.commit();
				}else{				
					msg = "插入角色赋权信息失败";
				}
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--addDescTableInfo()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--addDescTableInfo()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"DataParamManageDAOImpl--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			close(rest,pstmt, conn);
		}
		
		return msg;
	}
	/**
	 * 通过传入的数据库连接，新增数据源表概述信息
	 * @author yanglm
	 * @param 
	 * @return
	 */
	public String addDescTableInfo(int roleId,int tableId,String tableDesc,
			Connection conn)throws DataAccessException{
		int code = -1;
		String msg = "true";
		//检查此角色 roleId 是否已经在此数据源表 tableId 存在权限信息
		StringBuffer buf0 = new StringBuffer();
		buf0.append(" select count(*),b.table_name ");
		buf0.append("   from (select distinct c.table_name ");
		buf0.append("	         from om_param_role_table_relation_t a,");
		buf0.append("   			  om_param_table_desc_t c ");
		buf0.append("	        where a.table_id = c.table_id");
		buf0.append("             and a.role_id = ? ");
		buf0.append("             and a.table_id <> ? ) a, ");
		buf0.append("	      (select c.table_name");
		buf0.append("           from om_param_role_table_relation_t a, ");
		buf0.append("	              om_param_table_desc_t c");
		buf0.append("          where a.table_id = c.table_id ");
		buf0.append("            and a.table_id = ?) b ");
		buf0.append("  where a.table_name = b.table_name");
		buf0.append("  group by b.table_name");
		//删除所有原来的过滤描述信息
		StringBuffer buf1 = new StringBuffer();
		buf1.append(" delete om_param_role_table_relation_t ");
		buf1.append("  where role_id = ? ");
		buf1.append("    and table_id = ? ");
		//插入新的过滤描述信息
		StringBuffer buf2 = new StringBuffer();
		buf2.append(" insert into om_param_role_table_relation_t ");
		buf2.append(" (role_id,table_id,table_desc) ");
		buf2.append(" values( ?,?,? )");
		
		StringBuffer buf3 = new StringBuffer();
		buf3.append(" insert into om_param_data_info_t ");
		buf3.append(" (role_id,table_id,data_info) ");
		buf3.append(" values( ?,?,? )");

		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			pstmt = conn.prepareStatement(buf0.toString());
			pstmt.setInt(1, roleId);
			pstmt.setInt(2, tableId);
			pstmt.setInt(3, tableId);
			rest = pstmt.executeQuery();
			
			String table_name = null;
			if(rest.next()){
				code = rest.getInt(1);
				table_name = rest.getString(2);
			}
			
			if(code > 0){
				msg = "此角色在数据源表 "+table_name+" 上已有权限存在，不能再进行新增操作";
			}else{
				pstmt = conn.prepareStatement(buf1.toString());
				pstmt.setInt(1, roleId);
				pstmt.setInt(2, tableId);
				code = pstmt.executeUpdate();	
				if(code >= 0){
					pstmt = conn.prepareStatement(buf2.toString());
					pstmt.setInt(1, roleId);
					pstmt.setInt(2, tableId);
					pstmt.setString(3, tableDesc);
					code = pstmt.executeUpdate();
				}
				if(code > 0){
					pstmt = conn.prepareStatement(buf3.toString());
					pstmt.setInt(1, roleId);
					pstmt.setInt(2, tableId);
					pstmt.setString(3, "*");
					code = pstmt.executeUpdate();
				}
				if(code > 0){					
					conn.commit();
				}else{
					msg = "插入角色赋权信息失败";
				}
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--addDescTableInfo()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--addDescTableInfo()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest,pstmt);
		}
		
		return msg;
	}
	/**
	 * 根据 角色标识 和 数据源表ID 删除过滤状态描述信息
	 * @param 
	 * @return
	 */
	public int deleteDescTableInfo(int roleId,String[] tableIds) 
		throws DataAccessException{
		int code = -1;
		//删除过滤状态描述信息
		StringBuffer buf1 = new StringBuffer();
		buf1.append(" delete om_param_role_table_relation_t ");
		buf1.append("  where role_id = ? ");
		buf1.append("    and table_id = ?");
		//删除参数过滤赋权数据信息
		StringBuffer buf2 = new StringBuffer();
		buf2.append(" delete om_param_data_info_t ");
		buf2.append("  where role_id = ? ");
		buf2.append("    and table_id = ?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			for(int i=0;i<tableIds.length;i++){
				pstmt = conn.prepareStatement(buf1.toString());
				pstmt.setInt(1, roleId);
				pstmt.setString(2,tableIds[i]);
				code = pstmt.executeUpdate();
				
				if(code > 0){
					pstmt = conn.prepareStatement(buf2.toString());
					pstmt.setInt(1, roleId);
					pstmt.setString(2,tableIds[i]);
					code = pstmt.executeUpdate();
				}
			}
			if(code >= 0){
				conn.commit();
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--deleteDescTableInfo()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--deleteDescTableInfo()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			close3(pstmt, conn);
		}
		
		return code;
	}

    /**
     * 根据 职员编号 和 数据源表名 获取下拉框主字段信息，包括ID,PK,FK
     * @param 
     * @return
     */
    public HashMap getParamColumnInfo(String employeeId,String tableName) throws DataAccessException{
    	HashMap map = new HashMap();
    	
    	StringBuffer buf = new StringBuffer();
		buf.append(" select distinct a.table_id, d.column_info, d.column_order");
		buf.append("   from om_param_table_desc_t a,om_param_role_table_relation_t b, ");
		buf.append("        om_employee_param_role_rel_t c, om_param_table_info_t d");
		buf.append("  where c.f_employee_id = ? ");
		buf.append("    and b.ROLE_ID = c.f_param_role_id");
		buf.append("    and a.TABLE_NAME = upper( ? )");
		buf.append("    and b.TABLE_ID = a.table_id ");
		buf.append("    and d.TABLE_ID = a.table_id ");
		buf.append("    and d.column_type in (1,3,4)");
		buf.append(" order by d.column_order ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			pstmt.setString(2,tableName);
			rest = pstmt.executeQuery();
			
			String tableId = "";
			List list = new ArrayList();
			int i = 0;
			while (rest.next()) {
				if(i == 0){
					tableId = rest.getString(1);
				}
				list.add(i,rest.getString(2));
				i++;
			}
			
			map.put("tablaId",tableId);
			map.put("columnList",list);
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getParamColumnInfo(String employeeId,String tableName)-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getParamColumnInfo(String employeeId,String tableName)-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return map;
    }
    /**
     * 根据 职员编号 和 数据源表名 获取下拉框主字段信息，包括ID,PK,FK
     * @param 
     * @return
     */
    public HashMap getParamColumnInfo(String employeeId,String tableName,
    		String keyTypes) throws DataAccessException{
    	HashMap map = new HashMap();
    	
    	StringBuffer buf = new StringBuffer();
		buf.append(" select distinct a.table_id, d.column_info, d.column_order");
		buf.append("   from om_param_table_desc_t a,om_param_role_table_relation_t b, ");
		buf.append("        om_employee_param_role_rel_t c, om_param_table_info_t d");
		buf.append("  where c.f_employee_id = ? ");
		buf.append("    and b.ROLE_ID = c.f_param_role_id");
		buf.append("    and a.TABLE_NAME = upper( ? )");
		buf.append("    and b.TABLE_ID = a.table_id ");
		buf.append("    and d.TABLE_ID = a.table_id ");
		buf.append("    and d.column_type in (").append(keyTypes).append(")");
		buf.append(" order by d.column_order ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			pstmt.setString(2, tableName);
			rest = pstmt.executeQuery();
			
			String tableId = "";
			List list = new ArrayList();
			int i = 0;
			while (rest.next()) {
				if(i == 0){
					tableId = rest.getString(1);
				}
				list.add(i,rest.getString(2));
				i++;
			}
			
			map.put("tablaId",tableId);
			map.put("columnList",list);
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getParamColumnInfo(String,String,String)-1:" 
					+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getParamColumnInfo(String,String,String)-2:" 
					+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return map;
    }
    /**
     * 获取下拉框关键字段信息
     * @param 
     * @return
     */
    public String[] getMainColumnInfo(String tableName,String mainType) 
    	throws DataAccessException{
    	String[] column_info = new String[2];
    	
    	StringBuffer buf = new StringBuffer();
		buf.append(" select column_info,column_type ");
		buf.append("   from	om_param_table_info_t a, ");
		buf.append("      	om_param_table_desc_t b ");
		buf.append("  where b.table_name = upper(?)");
		buf.append("    and column_type in(").append(mainType).append(")");
		buf.append("    and a.table_id = b.table_id");
		buf.append("  group by column_info,column_type");
		buf.append("  order by column_type");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,tableName);
			rest = pstmt.executeQuery();
			
			int i = 0;
			while (rest.next()) {
				if(i > 2){
					break;
				}
				column_info[i] = rest.getString(1);
				i++;
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getMainColumnInfo(String tableName,String mainType)-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getMainColumnInfo(String tableName,String mainType)-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return column_info;
    }
    /**
     * 获取下拉框关键字段信息
     * @param 
     * @return
     */
    public String[] getMainColumnInfo(int tableId,String mainType) throws DataAccessException{
    	String[] column_info;
    	
    	StringBuffer buf = new StringBuffer();
		buf.append(" select column_info ");
		buf.append("   from	om_param_table_info_t c ");
		buf.append("  where table_id = ").append(tableId);
		buf.append("    and column_type in(").append(mainType).append(")");
		buf.append(" order by column_type ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			
			String message = "";
			while (rest.next()) {
				message = message+rest.getString(1)+";";
			}
			
			column_info = message.split(";");
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getMainColumnInfo(int tableId)-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getMainColumnInfo(int tableId)-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return column_info;
    }
    
    /**
     * 根据 职员编号，数据源表编号和查询权限范围 获取过滤数据信息
     * 只包括用户微调的数据
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(String employeeId,int tableId) 
    	throws DataAccessException{
    	ParamObjectCollection dataColl = new ParamObjectCollection();

    	StringBuffer buf = new StringBuffer();
    	buf.append("SELECT data_info,data_flag ");
		buf.append("  FROM om_param_employee_data_rel_t ");
		buf.append(" WHERE employee_id = ? ");
		buf.append("   AND table_id = ? ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			pstmt.setInt(2, tableId);
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				ParamObject vo = new ParamObject();
				vo.setFilterDataInfo(rest.getString(1));
				vo.setFilterDataFlag(rest.getInt(2));
				dataColl.addParamObject(vo);
			}
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamDataColl(String,int)-2:"
						+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return dataColl;
    }
    
    /**
     * 根据 职员编号，数据源表编号和数据类型标识获取权限微调后数据信息
     * @param 
     * @return
     */
    public ParamObjectCollection getEmployeeParamColl(String employeeId,
    		int tableId,int dataFlag) throws DataAccessException {
    	
    	ParamObjectCollection dataColl = new ParamObjectCollection();

    	StringBuffer buf = new StringBuffer();
    	buf.append("SELECT data_info,data_flag ");
		buf.append("  FROM OM_PARAM_EMPLOYEE_DATA_REL_T ");
		buf.append(" WHERE employee_id = ? ");
		buf.append("   AND table_id = ? ");
		buf.append("   AND data_flag = ? ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, employeeId);
			pstmt.setInt(2, tableId);
			pstmt.setInt(3, dataFlag);
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				ParamObject vo = new ParamObject();
				vo.setFilterDataInfo(rest.getString(1));
				vo.setFilterDataFlag(rest.getInt(2));
				dataColl.addParamObject(vo);
			}
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamDataColl(String,int)-2:"
						+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return dataColl;
    }
    
    /**
     * 通过 职员编号，数据源表编号和查询权限范围 获取过滤数据信息
     * 数据包括角色对应的和职员微调后的全部数据
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(String employeeId,int tableId,
    		int powerFlag,String useRoleOnly) throws DataAccessException{
    	ParamObjectCollection dataColl = new ParamObjectCollection();

		Connection conn = null;
		
		try {
			conn = getConnection();
			int showNewData = getIfShowNewData(String.valueOf(tableId));
			if(showNewData==1){
				dataColl = getParamDataColl(conn,employeeId,tableId,powerFlag,useRoleOnly);
			}else{
				dataColl = getParamDataCollUnshownNew(conn,employeeId,tableId,powerFlag,useRoleOnly);
			}
			
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamDataColl(String,int,int,String)-2:" 
						+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{
			conn.close();
			}catch(Exception e){
				SysLog.writeLogs("om", GlobalParameters.ERROR,	"colse-4:" + e.getMessage());
			}
		}
    	
    	return dataColl;
    }
    /**
     * 通过 职员编号，数据源表编号和查询权限范围 获取过滤数据信息
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(Connection conn,String employeeId,
    		int tableId,int powerFlag,String useRoleOnly) throws DataAccessException{
    	ParamObjectCollection dataColl = new ParamObjectCollection();
    	
    	StringBuffer buf = new StringBuffer();
    	//权限范围标识为1：取最小权限范围；默认为0：取最大权限范围
    	if(powerFlag == 1){
    		buf.append(" select distinct a.data_info ");
    		buf.append("   from OM_PARAM_DATA_INFO_T a, ");
    		buf.append("        om_employee_param_role_rel_t c");
    		buf.append("  where a.ROLE_ID = c.f_param_role_id ");
    		buf.append("    and c.f_employee_id = ? ");
    		buf.append("    and a.TABLE_ID = ? ");
    		
    		if(useRoleOnly.trim().equals("false")){
    			buf.append(" MINUS select data_info ");
        		buf.append("  from OM_PARAM_EMPLOYEE_DATA_REL_T ");
        		buf.append(" where employee_id = ? ");
        		buf.append("   and table_id = ? ");
        		buf.append("   and data_flag = 1 ");
        		
        		buf.append(" UNION select data_info ");
        		buf.append("  from OM_PARAM_EMPLOYEE_DATA_REL_T ");
        		buf.append(" where employee_id = ? ");
        		buf.append("   and table_id = ? ");
        		buf.append("   and data_flag = 0 ");
    		}
    	}else{
    		buf.append(" select c.data_info from ");
    		buf.append("   (select count(role_id) role_count,a.data_info ");
    		buf.append("      from om_param_data_info_t a,");
    		buf.append("           om_employee_param_role_rel_t b  ");
    		buf.append("     where b.F_EMPLOYEE_ID = ? ");
    		buf.append("       and b.F_PARAM_ROLE_ID = a.ROLE_ID ");
    		buf.append(" 	   and a.TABLE_ID = ? ");
    		buf.append("     group by a.data_info) c, ");
    		buf.append("   (select count(distinct role_id) role_count");
    		buf.append("      from om_param_data_info_t a, ");
    		buf.append("    	   om_employee_param_role_rel_t b");
    		buf.append("     where b.F_EMPLOYEE_ID = ? ");;
    		buf.append("       and b.F_PARAM_ROLE_ID = a.ROLE_ID ");
    		buf.append(" 	   and a.TABLE_ID = ? ) d");
    		buf.append("  where c.role_count = d.role_count ");
    		
    		if(useRoleOnly.trim().equals("false")){
    			buf.append(" MINUS select data_info ");
        		buf.append("  from OM_PARAM_EMPLOYEE_DATA_REL_T ");
        		buf.append(" where employee_id = ? ");
        		buf.append("   and table_id = ? ");
        		buf.append("   and data_flag = 1 ");
        		
        		buf.append(" UNION select data_info ");
        		buf.append("  from OM_PARAM_EMPLOYEE_DATA_REL_T ");
        		buf.append(" where employee_id = ? ");
        		buf.append("   and table_id = ? ");
        		buf.append("   and data_flag = 0 ");
    		}
    	}

		//Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			//conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i = 1;
			if(powerFlag == 1){
				pstmt.setString(i++, employeeId);
				pstmt.setInt(i++, tableId);
				
				if(useRoleOnly.trim().equals("false")){
					pstmt.setString(i++, employeeId);
					pstmt.setInt(i++, tableId);
					pstmt.setString(i++, employeeId);
					pstmt.setInt(i++, tableId);
				}
			}else{
				pstmt.setString(i++, employeeId);
				pstmt.setInt(i++, tableId);
				pstmt.setString(i++, employeeId);
				pstmt.setInt(i++, tableId);
				
				if(useRoleOnly.trim().equals("false")){
					pstmt.setString(i++, employeeId);
					pstmt.setInt(i++, tableId);
					pstmt.setString(i++, employeeId);
					pstmt.setInt(i++, tableId);
				}
			}
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				if(rest.getString(1) != null){
					ParamObject vo = new ParamObject();
					vo.setFilterDataInfo(rest.getString(1));
					dataColl.addParamObject(vo);
				}
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamDataColl(Connection,String,int,int,String)-1:" 
						+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt);
		}
    	
    	return dataColl;
    }
    /**
     * 得到需要选中的数据信息
     * @param conn
     * @param employeeId
     * @param tableId
     * @param powerFlag
     * @param useRoleOnly
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getParamDataCollUnshownNew(Connection conn,String employeeId,
    		int tableId,int powerFlag,String useRoleOnly) throws DataAccessException{
    	ParamObjectCollection dataColl = new ParamObjectCollection();
    	int showNewData = getIfShowNewData(String.valueOf(tableId));
    	if(showNewData == 0 && powerFlag == 1){//如果配置新增数据不可见，则权限范围的逻辑刚好相反
    		powerFlag = 0;
    	}else if(showNewData == 0 && powerFlag == 0){
    		powerFlag = 1;
    	}
    	StringBuffer buf = new StringBuffer();
    	//权限范围标识为1：取最小权限范围；默认为0：取最大权限范围
    	if(powerFlag == 1){
    		buf.append(" select distinct a.data_info ");
    		buf.append("   from OM_PARAM_DATA_INFO_T a, ");
    		buf.append("        om_employee_param_role_rel_t c");
    		buf.append("  where a.ROLE_ID = c.f_param_role_id ");
    		buf.append("    and c.f_employee_id = ? ");
    		buf.append("    and a.TABLE_ID = ? ");
    		
    		if(useRoleOnly.trim().equals("false")){
    			buf.append(" MINUS select data_info ");
        		buf.append("  from OM_PARAM_EMPLOYEE_DATA_REL_T ");
        		buf.append(" where employee_id = ? ");
        		buf.append("   and table_id = ? ");
        		buf.append("   and data_flag = 0 ");
        		
        		buf.append(" UNION select data_info ");
        		buf.append("  from OM_PARAM_EMPLOYEE_DATA_REL_T ");
        		buf.append(" where employee_id = ? ");
        		buf.append("   and table_id = ? ");
        		buf.append("   and data_flag = 1 ");
    		}
    	}else{
    		buf.append(" select c.data_info from ");
    		buf.append("   (select count(role_id) role_count,a.data_info ");
    		buf.append("      from om_param_data_info_t a,");
    		buf.append("           om_employee_param_role_rel_t b  ");
    		buf.append("     where b.F_EMPLOYEE_ID = ? ");
    		buf.append("       and b.F_PARAM_ROLE_ID = a.ROLE_ID ");
    		buf.append(" 	   and a.TABLE_ID = ? ");
    		buf.append("     group by a.data_info) c, ");
    		buf.append("   (select count(distinct role_id) role_count");
    		buf.append("      from om_param_data_info_t a, ");
    		buf.append("    	   om_employee_param_role_rel_t b");
    		buf.append("     where b.F_EMPLOYEE_ID = ? ");;
    		buf.append("       and b.F_PARAM_ROLE_ID = a.ROLE_ID ");
    		buf.append(" 	   and a.TABLE_ID = ? ) d");
    		buf.append("  where c.role_count = d.role_count ");
    		
    		if(useRoleOnly.trim().equals("false")){
    			buf.append(" MINUS select data_info ");
        		buf.append("  from OM_PARAM_EMPLOYEE_DATA_REL_T ");
        		buf.append(" where employee_id = ? ");
        		buf.append("   and table_id = ? ");
        		buf.append("   and data_flag = 0 ");
        		
        		buf.append(" UNION select data_info ");
        		buf.append("  from OM_PARAM_EMPLOYEE_DATA_REL_T ");
        		buf.append(" where employee_id = ? ");
        		buf.append("   and table_id = ? ");
        		buf.append("   and data_flag = 1 ");
    		}
    	}

		//Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			//conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i = 1;
			if(powerFlag == 1){
				pstmt.setString(i++, employeeId);
				pstmt.setInt(i++, tableId);
				
				if(useRoleOnly.trim().equals("false")){
					pstmt.setString(i++, employeeId);
					pstmt.setInt(i++, tableId);
					pstmt.setString(i++, employeeId);
					pstmt.setInt(i++, tableId);
				}
			}else{
				pstmt.setString(i++, employeeId);
				pstmt.setInt(i++, tableId);
				pstmt.setString(i++, employeeId);
				pstmt.setInt(i++, tableId);
				
				if(useRoleOnly.trim().equals("false")){
					pstmt.setString(i++, employeeId);
					pstmt.setInt(i++, tableId);
					pstmt.setString(i++, employeeId);
					pstmt.setInt(i++, tableId);
				}
			}
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				if(rest.getString(1) != null){
					ParamObject vo = new ParamObject();
					vo.setFilterDataInfo(rest.getString(1));					
					dataColl.addParamObject(vo);
				}
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamDataColl(Connection,String,int,int,String)-1:" 
						+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt);
		}
    	return dataColl;
    }
    /**
     * 通过 角色编号和数据源表编号 获取过滤数据信息
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(int roleId,int tableId) 
		throws DataAccessException{
		ParamObjectCollection dataColl = new ParamObjectCollection();
		
		StringBuffer buf = new StringBuffer();
		buf.append(" select data_info ");
		buf.append("   from OM_PARAM_DATA_INFO_T ");
		buf.append("  where ROLE_ID = ? ");
		buf.append("    and TABLE_ID = ? ");
	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			pstmt.setInt(2, tableId);
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				if(rest.getString(1) != null){
					ParamObject vo = new ParamObject();
					vo.setFilterDataInfo(rest.getString(1));
					dataColl.addParamObject(vo);
				}
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamDataColl(int,int)-1:"
						+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamDataColl(int,int)-2:" 
						+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
		return dataColl;
	}
    /**
     * 获取参数过滤缓存与权限范围控制开关信息
     * @param 
     * @return
     */
    public String getRolePowerFlag() throws DataAccessException{
    	String flag_info = "0";
    	
    	StringBuffer buf = new StringBuffer();
		buf.append(" select f_para_value from om_switch_t");
		buf.append("  where f_para_control = 1 ");
		buf.append("    and UPPER(f_para_name) = upper('param_role_power_flag') ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			
			while(rest.next()) {	
				flag_info = rest.getString(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getRolePowerFlag()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getRolePowerFlag()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return flag_info;
    }
    
    public String getRoleCacheFlag() throws DataAccessException{
    	String flag_info = "0";
    	
    	StringBuffer buf = new StringBuffer();
		buf.append(" select f_para_value from om_switch_t");
		buf.append("  where f_para_control = 1 ");
		buf.append("    and UPPER(f_para_name) = upper('param_role_cache_flag') ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			
			if(rest.next()) {	
				flag_info = rest.getString(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getRoleCacheFlag()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"DataParamManageDAOImpl--getRoleCacheFlag()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return flag_info;
    }
    /**
     * 通过传入的SQL获取过滤下拉框的数据集合
     * @param 
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection 
    	getParamFilterColl(String sql) throws DataAccessException{
    	com.neusoft.tdframework.common.data.ParamObjectCollection dataColl = new com.neusoft.tdframework.common.data.ParamObjectCollection();

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				com.neusoft.tdframework.common.data.ParamObject vo = new com.neusoft.tdframework.common.data.ParamObject();
				vo.setId(rest.getString(1));
				vo.setName(rest.getString(2));
				dataColl.addParamObject(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamFilterColl()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamFilterColl()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	
    	return dataColl;
    }
    
    public List getParamFilterColl(List sqlList,List ifPassive) 
    	throws DataAccessException{
		List filterList = new ArrayList();
	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			for(int i=0;i<sqlList.size();i++){
				com.neusoft.tdframework.common.data.ParamObjectCollection dataColl = new com.neusoft.tdframework.common.data.ParamObjectCollection();
				String flag = (String)ifPassive.get(i);
				if(flag.trim().equals("0")){
					String sql = (String)sqlList.get(i);
					pstmt = conn.prepareStatement(sql);
					rest = pstmt.executeQuery();

					while (rest.next()) {
						com.neusoft.tdframework.common.data.ParamObject vo = new com.neusoft.tdframework.common.data.ParamObject();
						vo.setId(rest.getString(1));
						vo.setName(rest.getString(2));
						dataColl.addParamObject(vo);
					}
				}else{
					dataColl.setSelectFlag("不区分");
				}
				
				if(dataColl.getRowCount() > 2){
					dataColl.setSelectFlag("不区分");
				}
				filterList.add(dataColl);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamFilterColl()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getParamFilterColl()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
		return filterList;
	}
    /**
     * 得到数据源表配置的“新增数据是否可见”信息
     * @param tableId
     * @return
     * @throws DataAccessException
     */
    public int getIfShowNewData(String tableId) throws DataAccessException{
    	int show = -1;
		StringBuffer buf = new StringBuffer();
		buf.append(" select show_new_data from om_param_table_desc_t where table_id = "+tableId);
	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			
			if (rest.next()) {
				show = rest.getInt("show_new_data");
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--getIfShowNewData()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	return show;
    }
    
    public int doDeleteAllThisPageData(int roleId,int tableId,List allData) throws DataAccessException{
    	int code = -1;
    	String msg = "true";
    	StringBuffer buf = new StringBuffer();
		buf.append(" delete om_param_data_info_t ");
		buf.append("  where role_id = ? ");
		buf.append("    and table_id = ? ");
		buf.append("    and data_info = ?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			conn.setAutoCommit(false);						
			
				if(allData!=null && allData.size()>0){
					for(int i=0;i<allData.size();i++){
						String data = (String)allData.get(i);
						if(data== null || data.equals("")){
							continue;
						}
						pstmt = conn.prepareStatement(buf.toString());
						pstmt.setInt(1, roleId);
						pstmt.setInt(2, tableId);
						pstmt.setString(3,data);
						code = pstmt.executeUpdate();
						if(code < 0){
							break;
						}
					}
				}else{
					code = 0;
				}				
				if(code >= 0){
					conn.commit();
				}else{
					conn.rollback();
					msg = "为此角色插入赋权信息时出错";
				}	
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--doDeleteAllThisPageData()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--doDeleteAllThisPageData()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"DataParamManageDAOImpl--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			close(rest,pstmt, conn);
		
		}
    	return code;
    }
    
    public int doInsertCheckData (int roleId,int tableId,String[] data) throws DataAccessException{
    	int code = -1;
    	String msg = "true";
		StringBuffer buf = new StringBuffer();
		buf.append(" insert into om_param_data_info_t ");
		buf.append(" (role_id,table_id,data_info) ");
		buf.append(" values( ?,?,?)");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			for(int j=0;j<data.length;j++){
				if(data[j]== null || data[j].equals("")){
					continue;
				}
				pstmt = conn.prepareStatement(buf.toString());
				pstmt.setInt(1, roleId);
				pstmt.setInt(2, tableId);
				pstmt.setString(3,data[j]);
				code = pstmt.executeUpdate();
				if(code < 0){
					break;
				}
			}		
			if(code >= 0){
				conn.commit();
			}else{
				conn.rollback();
				msg = "为此角色插入赋权信息时出错";
			}		
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--doInsertCheckData()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--doInsertCheckData()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"DataParamManageDAOImpl--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			close(rest,pstmt, conn);
		}
    	
    	return code;
    }
    public int doModifyAdjustData(String employeeId, int tableId, ParamObjectCollection deleteData,
    		ParamObjectCollection addData, ParamObjectCollection updateData) throws DataAccessException{
    	int code = -1;
    	String msg = "";
    	//删除旧的过滤数据信息
    	StringBuffer buf1 = new StringBuffer();
		buf1.append(" delete om_param_employee_data_rel_t ");
		buf1.append("  where employee_id = ? ");
		buf1.append("    and table_id = ? ");
		buf1.append("    and data_info = ?");
		//插入新增加的过滤数据信息
		StringBuffer buf2 = new StringBuffer();
		buf2.append(" insert into om_param_employee_data_rel_t ");
		buf2.append(" (employee_id,table_id,data_info,data_flag) ");
		buf2.append(" values( ?,?,?,?)");
		//update
		StringBuffer buf3 = new StringBuffer();
		buf3.append(" update om_param_employee_data_rel_t ");
		buf3.append(" set data_flag = ? ");
		buf3.append(" where employee_id = ? and table_id = ? and data_info = ?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			
			if(deleteData!=null && deleteData.getRowCount()>0){
				for(int i=0;i<deleteData.getRowCount();i++){
					ParamObject vo = deleteData.getParamObject(i);
					//删除旧数据
					pstmt = conn.prepareStatement(buf1.toString());
					pstmt.setString(1, employeeId);
					pstmt.setInt(2, tableId);
					pstmt.setString(3,vo.getFilterDataInfo());
					code = pstmt.executeUpdate();
					if(code < 0){
						break;
					}
				}
			}else{
				code = 0;
			}
				
			if(code>=0 && addData!=null){
				for(int j=0;j<addData.getRowCount();j++){
					ParamObject vo = addData.getParamObject(j);
					//不能插入过滤数据为空的信息
					if(vo.getFilterDataInfo()==null || vo.getFilterDataInfo().trim().equals("")){
						continue;
					}
					//插入新数据
					pstmt = conn.prepareStatement(buf2.toString());
					pstmt.setString(1, employeeId);
					pstmt.setInt(2, tableId);
					pstmt.setString(3,vo.getFilterDataInfo());
					pstmt.setInt(4,vo.getFilterDataFlag());
					code = pstmt.executeUpdate();
					if(code < 0){
						break;
					}
				}
			}
			if(code>=0 && updateData!=null){
				for(int j=0;j<updateData.getRowCount();j++){
					ParamObject vo = updateData.getParamObject(j);
					//不能插入过滤数据为空的信息
					if(vo.getFilterDataInfo()==null || vo.getFilterDataInfo().trim().equals("")){
						continue;
					}
					//插入新数据
					pstmt = conn.prepareStatement(buf3.toString());
					pstmt.setInt(1,vo.getFilterDataFlag());
					pstmt.setString(2, employeeId);
					pstmt.setInt(3, tableId);
					pstmt.setString(4,vo.getFilterDataInfo());
					
					code = pstmt.executeUpdate();
					if(code < 0){
						break;
					}
				}
			}
			if(code >= 0){
				conn.commit();
			}else{
				conn.rollback();
				code = -1;
				msg = "为此角色插入赋权信息时出错";
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--doModifyAdjustData()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--doModifyAdjustData()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"DataParamManageDAOImpl--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			close(rest,pstmt, conn);
		}   	
    	
    	return code;
    }
    /**
     * 数据角色批量赋权
     * @param tableId
     * @param roleList
     * @param checkData
     * @param uncheckData
     * @return
     * @throws DataAccessException
     */
    public int doBatchEndowPower(String table, String roleList, List checkData, List uncheckData) throws DataAccessException{
    	int code = 0;
    	int tableId = 0;
    	if(table != null && !table.trim().equals("")){
    		tableId = Integer.parseInt(table);
    	}
    	List dataList = unionList(checkData, uncheckData);
    	String msg = "true";
    	StringBuffer bufDel = new StringBuffer();
    	bufDel.append(" delete om_param_data_info_t ");
    	bufDel.append("  where role_id in (" + roleList + ")");
    	bufDel.append("    and table_id = "+tableId);
    	bufDel.append("    and data_info = ?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			conn.setAutoCommit(false);						
			//首先将可见和不可见的信息都删除
			if(dataList!=null && dataList.size()>0){
				for(int i=0;i<dataList.size();i++){
					String data = (String)dataList.get(i);
					if(data== null || data.equals("")){
						continue;
					}
					pstmt = conn.prepareStatement(bufDel.toString());
					pstmt.setString(1, data);
					code = pstmt.executeUpdate();
					if(code >= 0){
						conn.commit();
					}else{
						conn.rollback();
						msg = "数据角色批量赋权时出错";
					}
				}
				pstmt.close();
			}				
			
			int showNewData = getIfShowNewData(table);
			//将需要增加的数据插入表中。
			StringBuffer buf = new StringBuffer();
			buf.append(" insert into om_param_data_info_t ");
			buf.append(" (role_id,table_id,data_info) ");
			buf.append(" values( ?,?,?)");
			if(roleList !=null){
				String[] roleArray = roleList.split(",");
				if(roleArray != null && roleArray.length >0){
					for(int i=0; i<roleArray.length; i++){
						String roleId = roleArray[i];
						if(roleId == null || roleId.equals("")){
							continue;
						}
						if(uncheckData != null && uncheckData.size() > 0){
							for(int j=0;j<uncheckData.size();j++){
								if( uncheckData.get(j)== null || uncheckData.get(j).equals("")){
									continue;
								}
								pstmt = conn.prepareStatement(buf.toString());
								pstmt.setString(1, roleId);
								pstmt.setInt(2, tableId);
								pstmt.setString(3,(String)uncheckData.get(j));
								code = pstmt.executeUpdate();
								if(code >= 0){
									conn.commit();
								}else{
									conn.rollback();
									msg = "数据角色批量赋权时出错";
								}
							}
							pstmt.close();
						}
					}
				}
			}
		}
        catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--doBatchEndowPower()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"DataParamManageDAOImpl--doBatchEndowPower()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"DataParamManageDAOImpl--doBatchEndowPower()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			close(rest,pstmt, conn);
		
		}
    	return code;
    }
	private List unionList(List checkData, List uncheckData) {
		List dataList = new ArrayList();
    	if(checkData != null && checkData.size() > 0){
    		dataList = checkData;
    	}
    	if(uncheckData != null && uncheckData.size() > 0){
    		for(int i=0; i < uncheckData.size(); i++){
    			String data = (String)uncheckData.get(i);
    			if(data != null && !data.equals("")){
    				dataList.add(data);
    			}
    		}
    	}
    	return dataList;
	}
	
    public int getTableIdByName(String tableName) throws DataAccessException{
    	int tableId = -1;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;       
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select table_id from om_param_table_desc_t where upper(table_name) = ?");        
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            pstmt.setString(1, tableName.toUpperCase());
            rest = pstmt.executeQuery();
            if (rest.next()) {
            	tableId = rest.getInt("table_id");
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getTableIdByName()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataSourceInfoDAOIMPL--getTableIdByName()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return tableId;
    }

}
