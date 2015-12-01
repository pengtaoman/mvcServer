package com.neusoft.om.dao.organization;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import com.neusoft.om.OMAppContext;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.taglib.innertree.TreeData;

/**
 * 
 * @author zhaofan
 * 2009-9-29
 */
public class OrganizationDAOImpl extends BaseDaoImpl implements OrganDAO {
	
	public OrganColl getAllOrganInfo() throws DataAccessException{
		OrganColl coll = new OrganColl();
		OrganVO vo = null;
		StringBuffer buf = new StringBuffer();
		buf.append("select * FROM orgnization "); 
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addElement(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getAllOrganInfo()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getAllOrganInfo()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public OrganColl getAllOrganInfo(String organId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		OrganVO vo = null;
		StringBuffer buf = new StringBuffer();
		buf.append(" select * FROM orgnization ");
		buf.append(" where f_organ_id = ");
		buf.append("(select f_parent_organ_id from orgnization where f_organ_id = ?) ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,organId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addElement(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getAllOrganInfo()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getAllOrganInfo()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public OrganColl getOrganInfo(String organId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		OrganVO vo = null;
		
		StringBuffer buf = new StringBuffer();
		buf.append(" select * FROM orgnization ");
		buf.append(" where f_organ_id = ? ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,organId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addElement(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getAllOrganInfo()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getAllOrganInfo()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public OrganVO getOrganInfoById(String organId) throws DataAccessException{
		OrganVO vo = null;
		String sql = "SELECT a.org_id, a.parent_org_id, a.org_type, a.common_region_id, a.org_content, b.region_name FROM orgnization a, common_region b WHERE a.common_region_id = b.common_region_id AND org_id = ?";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			rest = pstmt.executeQuery();
			
			if(rest.next()){
				vo = new OrganVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganInfoById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganInfoById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}

	public OrganColl getOrganInfoByAreaId(String areaId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		OrganVO vo = null;
		
		String sql = "SELECT * FROM orgnization WHERE f_area_id = ? ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,areaId);
			rest = pstmt.executeQuery();
		
			while(rest.next()){
				vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addElement(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganInfoByAreaId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganInfoByAreaId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		
		return coll;
	}
	
	public OrganVO getOrganInfoFilter(Map filter) throws DataAccessException{
		OrganVO vo = null;
		
		StringBuffer sqlbf = new StringBuffer();
		sqlbf.append(" SELECT * FROM orgnization ");
		sqlbf.append(" where  f_organ_id is null ");
		Iterator keys = filter.keySet().iterator();
		while(keys.hasNext()){
			String key = (String)keys.next();
			if(!key.equals("employeeOrganId")){
				String value = (String)filter.get(key);
				sqlbf.append(" and "+value+" ");
			}
		}
		sqlbf.append(" START WITH f_organ_id = ? ");
		sqlbf.append(" CONNECT BY PRIOR  f_parent_organ_id = f_organ_id ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlbf.toString());
			pstmt.setString(1,(String)filter.get("organId"));
			rest = pstmt.executeQuery();

			while(rest.next()){
				vo = new OrganVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganInfoFilter-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganInfoFilter-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  

		return vo;
	}
	
	public OrganColl getChildOrganInfo(String organId) throws DataAccessException {
		OrganColl coll = new OrganColl();
		OrganVO vo = null;
		
		String sql = "SELECT * FROM orgnization " +
			" START WITH parent_org_id = ? " +
			" CONNECT BY PRIOR org_id = parent_org_id ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			rest = pstmt.executeQuery();

			while(rest.next()){
				vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addElement(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getChildOrganInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getChildOrganInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  

		return coll;
	}	  

	public OrganColl getOrganInfoByOrganKind(int organKind) throws DataAccessException {
		OrganColl coll = new OrganColl();
		OrganVO vo = null;
		
		String sql = "SELECT * FROM orgnization where f_organ_kind = ?" ;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,organKind);
			rest = pstmt.executeQuery();

			while(rest.next()){
				vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addElement(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganInfoByOrganKind-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganInfoByOrganKind-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  

		return coll;
	}	
	public int doAddOrgan(OrganVO vo) throws DataAccessException{
		int code = 1; //成功
		String sql = "INSERT INTO orgnization(org_id,parent_org_id,org_type,common_region_id,org_content)" +
							" VALUES(?,?,?,?,?)";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);	
			int i = 1;
			pstmt.setInt(i++,vo.getOrganId());
			pstmt.setInt(i++,vo.getParentOrganId());
			pstmt.setString(i++,vo.getOrganType());	
			pstmt.setInt(i++,vo.getRegionId());			
			pstmt.setString(i++,vo.getOrgContent());						
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--doAddOrgan()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		
		return code;
	}
	
	public int doModifyOrganById(OrganVO vo) throws DataAccessException{
		int code = 1; //成功
		StringBuffer buf = new StringBuffer();		
		buf.append(" UPDATE orgnization ");
		buf.append(" SET  org_type = ?,org_content = ? WHERE org_id = ? ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i = 1;
			pstmt.setString(i++,vo.getOrganType());
			pstmt.setString(i++,vo.getOrgContent());
			pstmt.setInt(i++,vo.getOrganId());
			code = pstmt.executeUpdate();
			
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--doModifyOrganById()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--doModifyOrganById()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return code;
	}
	
	public int doDeleteOrganById(String organId) throws DataAccessException{
		int code = 1; //成功
		
		String sql ="delete from orgnization where org_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--doDeleteOrganById()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--doDeleteOrganById()-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}  
		return code;
	}
    
	/**
	 * 获得两个级别之间区域所有的组织机构
	 * @param level1
	 * @param level2
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganByAreaLevel(int level1, int level2) throws DataAccessException{
		OrganColl organColl = new OrganColl();
		String level = getLevel(level1, level2);
        StringBuffer buf = new StringBuffer();         
        buf.append("SELECT a.* " +
        		" FROM orgnization a, OM_AREA_T b " +
        		" WHERE a.f_area_id = b.f_area_id AND b.f_area_level IN("+level+")");            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                OrganVO organVO = new OrganVO();
                organVO.setAttribute(rest);
                organColl.addOrgan(organVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganByAreaLevel-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganByAreaLevel-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return organColl;
	}
    
    private String getLevel(int level1, int level2){
    	String level = null;
    	for(int i = level1; i < level2+1; i ++){
    		if(level == null || level.trim().equals("")){
    			level = String.valueOf(i);
    		}else{
    			level = level+","+String.valueOf(i);
    		}    		
    	}
    	return level;
    }
    
	/**
	 * 判断是否存在重名
	 * @return
	 * @throws DataAccessException
	 */
	public boolean repeatedName(String areaId, String organName) throws DataAccessException{
		boolean repeat = false;
        StringBuffer buf = new StringBuffer();         
        buf.append(" select org_content from orgnization where common_region_id = ? and org_content = ? ");
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, areaId);
            pstmt.setString(2, organName);
            rest = pstmt.executeQuery();  
            while(rest.next()){
            	String orgName = rest.getString("org_content");
            	if(orgName.trim().equals(organName)){
            		repeat = true;
            	}
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--ifRepeatedName-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--ifRepeatedName-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return repeat;
	}
	public String getAppContainer(String key) throws DataAccessException{
		String container = "";
		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT f_container FROM om_container_t ");
		buf.append(" WHERE f_key = " + key);
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			while(rest.next()){
				container = rest.getString("f_container");
			}
		}catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"AppContainerDAOImpl--getAppContainer-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"AppContainerDAOImpl--getAppContainer-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return container;
	}
	//测试方法
	public static void main(String args[]){
		OrganDAO dao = (OrganDAO)OMAppContext.getBean(OrganDAO.BEAN);
		try {
			System.out.println("1:"+dao.getOrganInfoById("000").getOrganName());
			System.out.println("2:"+dao.getOrganInfoByAreaId("050501").getRowCount());
		}catch(DataAccessException e){
			e.printStackTrace();
		}
	}
	/**
	 * 得到省份(minLevel)及以下级，输入areaId以上级和areaId确定的区域，之间的所有区域中组织机构的集合
	 * @param minLevel
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getOrganCollByAuthAreaId(String areaId) throws DataAccessException{
		OrganColl organColl = new OrganColl();
    	List areaIdList = getAreaIdList(areaId);
    	String idField = "("+areaId;
    	for(int i=1; i < areaIdList.size(); i++){
    		idField = idField + ","+(String)areaIdList.get(i);
    	}
    	idField = idField + ")";
        StringBuffer buf = new StringBuffer();
        buf.append(" select a.* from orgnization a, om_area_t b where a.f_area_id = b.f_area_id ");
        buf.append(" and a.f_area_id in ? and a.f_parent_organ_id is null ");
        buf.append(" union ");
        buf.append(" select a.* from orgnization a, om_area_t b ");
        buf.append(" where a.f_area_id = b.f_area_id ");
        buf.append(" and a.f_area_id in ? ");
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,idField);
            pstmt.setString(2,idField);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                OrganVO organVO = new OrganVO();
                organVO.setAttribute(rest);
                organColl.addOrgan(organVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganCollByAuthAreaId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganCollByAuthAreaId-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return organColl;
	}
    /*
     * 得到areaId确定的区域上级，上级的上级....直至省份的所有areaId
     */
    private List getAreaIdList(String areaId){
    	List list = new ArrayList();
    	String parentAreaId="";
    	int areaLevel = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
    	try{
    		conn = getConnection();
	    	while(areaLevel != 2){
		        StringBuffer buf = new StringBuffer();   
		        buf.append(" select f_parent_area_id, f_area_level from om_area_t where f_area_id = '"+areaId+"'");            
		        String sql = buf.toString();  	            
	            pstmt = conn.prepareStatement(sql);
	            rest = pstmt.executeQuery();              
	            while(rest.next()){
	            	parentAreaId = rest.getString("f_parent_area_id");
	            	areaLevel = rest.getInt("f_area_level");
	            	list.add(areaId);
	            	areaId = parentAreaId;
	            }
	            close(pstmt);
	    	}
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getAreaIdList-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getAreaIdList-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }

    	return list;
    }
	public Vector getOrgsByAreaId(String areaId)
	{
		if(areaId == null || areaId.trim().equals("")){
			areaId= "-1";
		}
		Vector coll = new Vector();
		TreeData treeData = null;
		String sql = "select f_organ_id,f_parent_organ_id,f_organ_name " +
			" from orgnization where  f_area_id = '"+areaId+"'" +
			" start with f_parent_organ_id is null " +
			" connect by prior f_organ_id = f_parent_organ_id";
		
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			String rootNodeId = "";
			while(rest.next()) {
				if(rest.getString("f_parent_organ_id")!=null)
				{
					if(rest.getString("f_parent_organ_id").equalsIgnoreCase(rootNodeId))
						treeData = new TreeData(rest.getString("f_organ_id"),"root",rest.getString("f_organ_name"),rest.getString("f_organ_id"),false);
					else	
						treeData = new TreeData(rest.getString("f_organ_id"),rest.getString("f_parent_organ_id"),rest.getString("f_organ_name"),rest.getString("f_organ_id"),false);
				}
				else
				{
					treeData = new TreeData("root",rest.getString("f_parent_organ_id"),rest.getString("f_organ_name"),rest.getString("f_organ_id"),false);
					rootNodeId = rest.getString("f_organ_id");
				}
				coll.add(treeData);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrgsByAreaId-1:"+e.getMessage());			
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrgsByAreaId-2:"+e.getMessage());			
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	/**
	* 得到可以作为上级职能部门的组织机构集合
	*/
	public OrganColl getOrganCollByAreaId(String areaId,String organId) throws DataAccessException{
		
		OrganColl organColl = new OrganColl();		
		StringBuffer buf = new StringBuffer();         
        buf.append(" SELECT org_id,org_content ");
        buf.append(" FROM orgnization ");
        buf.append(" WHERE region_id = (select parent_region_id from local_political_region where region_id = ?)");
        if(organId!=null && organId.intern()!="".intern())
        	buf.append(" AND org_id = ? ");      
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(buf.toString());
            pstmt.setString(1, areaId);
            if(organId!=null && organId.intern()!="".intern())
            	pstmt.setString(2, organId);
            rest = pstmt.executeQuery();  
            
            while(rest.next()){
                OrganVO organVO = new OrganVO();
                organVO.setOrganId(rest.getInt("org_id"));
                organVO.setOrganName(rest.getString("org_content"));
                organColl.addOrgan(organVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganCollByAreaId()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
        
		return organColl;
	}
	
	/**
	* 得到组织机构类型
	*/
	public ParamObjectCollection getOrganTypeColl() 
		throws DataAccessException{
		
		ParamObjectCollection typeColl = new ParamObjectCollection();
		StringBuffer buf = new StringBuffer();         
        buf.append(" SELECT kind_id,kind_name ");
        buf.append(" FROM orgnization_kind ");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(buf.toString());
            rest = pstmt.executeQuery();  
            
            while(rest.next()){
                ParamObject paramObject = new ParamObject();
                paramObject.setId(rest.getString("kind_id"));
                paramObject.setName(rest.getString("kind_name"));
            	typeColl.addParamObject(paramObject);  
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganizationDAOImpl--getOrganTypeColl()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
        
		return typeColl;
	}
}                                                                                                                      