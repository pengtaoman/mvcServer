package com.neusoft.tdframework.batch.dao;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class BatchDAOImpl extends BaseDaoImpl {
	
	/**
	 * 插入临时表信息
	 */
	public int insertTempInfo(String batch_no,String record) throws DataAccessException {

        int i = 1;
		String sql = "insert into TDF_BATCH_PROCESS_INFO_T values(?,?,?)";
		Connection conn = null;
		PreparedStatement pstmt = null; 

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,batch_no);
			pstmt.setString(2,record);
			pstmt.setInt(3,0);
			pstmt.executeUpdate();
			

		}catch(SQLException e){
			i = -1;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchDAOImpl--putTDF_BATCH_PROCESS_INFO_T-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			i = -1;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchDAOImpl--putTDF_BATCH_PROCESS_INFO_T-2:"+e.getMessage());
		}finally{
			close(pstmt,conn);
		}
		return i;
	}
	/**
	 * 插入批次表信息；
	 */
	public int insertBatchInfo(String batch_no,HashMap param) throws DataAccessException{
		int i =1;
		String sql = "insert into TDF_BATCH_PROCESS_T values( ?,?,?,?,to_date(?,'YYYY-MM-DD HH24:MI:SS'),?,?,?,?,?,?,?)";
		Connection conn = null;
		PreparedStatement pstmt = null; 

		String date_time = (String)param.get("operator_date");
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1,batch_no);
			pstmt.setString(2,(String)param.get("descp"));
			pstmt.setInt(3,Integer.parseInt((String)param.get("status")));
			pstmt.setString(4,(String)param.get("operator_name"));
			pstmt.setString(5,date_time);
			pstmt.setString(6,(String)param.get("city_code"));
			pstmt.setString(7,(String)param.get("department_no"));
			pstmt.setString(8,(String)param.get("system_id"));
			pstmt.setString(9,(String)param.get("module_id"));
			pstmt.setString(10,(String)param.get("procedure_name"));
			pstmt.setString(11,(String)param.get("process_msg"));
			pstmt.setInt(12,0);
			
			pstmt.executeUpdate();

		}catch(SQLException e){
			i = -1;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchDAOImpl--putBatchInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			i = -1;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchDAOImpl--putBatchInfo-2:"+e.getMessage());
		}finally{
			close(pstmt,conn);
		}
		return i;
	}
	/**
	 * 查询导入文件状态信息
	 */
	public List getBatchFileStatus(HashMap mapData,int beginNum,int endNum) 
		throws DataAccessException{
		
		List fileStatusInfo = null;
		StringBuffer sqlBuf = new StringBuffer();
		BatchVO vo = null;
		BatchColl coll = new BatchColl();
		
		String workNo = (String)mapData.get("workNo");
		String fileStatus = (String)mapData.get("fileStatus");
		String batchNo = (String)mapData.get("batchNo");
		
		sqlBuf.append(" select * from (");
		sqlBuf.append(" select rownum rowcound,");
		sqlBuf.append(" batch_no,status,create_operator,create_date ");
		sqlBuf.append(" from TDF_BATCH_PROCESS_T ");
		sqlBuf.append(" where batch_no is not null ");
		if(workNo != null && !workNo.trim().equals("")){
			sqlBuf.append(" and CREATE_OPERATOR = '"+workNo+"'");
		}
		if(fileStatus != null && !fileStatus.trim().equals("")){
			sqlBuf.append(" and STATUS = '"+fileStatus+"'");
		}
		if(batchNo != null && !batchNo.trim().equals("")){
			sqlBuf.append(" and BATCH_NO = '"+batchNo+"'");
		}
		sqlBuf.append(" and rownum < ? "); 
	    sqlBuf.append(" ) "); 
	    sqlBuf.append(" where rowcound >= ? ");
		
		Connection conn = null;
		PreparedStatement pstmt = null; 
		ResultSet rest = null;
  
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuf.toString());
			pstmt.setInt(1, endNum);
		    pstmt.setInt(2, beginNum);
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				vo = new BatchVO();
				vo.setBatch_no(rest.getString("batch_no"));
				if(rest.getInt("status")==0){
					vo.setStatus("未处理");
				}
				else if(rest.getInt("status")==1){
					vo.setStatus("正在处理");
				}
				else if(rest.getInt("status")==2){
					vo.setStatus("处理完毕");
				}
				vo.setCreate_operator(rest.getString("create_operator"));
				vo.setCreate_date(rest.getString("create_date"));
				//vo.setCity_code(rest.getString("city_code"));
				//vo.setDepartment_no(rest.getString("department_no"));
				//vo.setModule_id(rest.getString("module_id"));
				//vo.setSystem_id(rest.getString("system_id"));
				//vo.setProcedure_name(rest.getString("procedure_name"));
				coll.addBatchVO(vo);
			}
			fileStatusInfo = coll.getList();

		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchDAOImpl--getBatchFileStatus-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchDAOImpl--getBatchFileStatus-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return fileStatusInfo;
	}
	/**
	 * 根据条件获取批次表总行数
	 */
	public int getRowCount(HashMap mapData) throws DataAccessException{
		int rowCount = 0;
		StringBuffer buf = new StringBuffer();
		
		String workNo = (String)mapData.get("workNo");
		String fileStatus = (String)mapData.get("fileStatus");
		String batchNo = (String)mapData.get("batchNo");
		//onclick != null && !onclick.trim().equals("")
		buf.append(" select COUNT(batch_no) from TDF_BATCH_PROCESS_T "); 
		buf.append(" where batch_no is not null");
		if(workNo != null && !workNo.trim().equals("")){
			buf.append(" and CREATE_OPERATOR = '"+workNo+"'");
		}
		if(fileStatus != null && !fileStatus.trim().equals("")){
			buf.append(" and STATUS = '"+fileStatus+"'");
		}
		if(batchNo != null && !batchNo.trim().equals("")){
			buf.append(" and BATCH_NO = '"+batchNo+"'");
		}
		
		Connection conn = null;
		PreparedStatement pstmt = null; 
		ResultSet rest = null;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			
			if(rest.next() && rest!=null){
				rowCount = rest.getInt(1);
			}

		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchDAOImpl--getBatchFileStatus-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchDAOImpl--getBatchFileStatus-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		
		return rowCount;
	}

}
