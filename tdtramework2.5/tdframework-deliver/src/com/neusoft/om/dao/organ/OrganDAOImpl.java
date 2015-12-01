package com.neusoft.om.dao.organ;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import com.neusoft.om.OMAppContext;
import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.organkind.OrganKindColl;
import com.neusoft.om.dao.organkind.OrganKindVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.taglib.innertree.TreeData;

/**brief description
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: organ maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class OrganDAOImpl extends BaseDaoImpl implements OrganDAO {
	
	public OrganColl getAllOrganInfo() throws DataAccessException{
		OrganColl coll = new OrganColl();
		OrganVO vo = null;
		StringBuffer buf = new StringBuffer();
		buf.append("select * FROM om_organ_t "); 
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getAllOrganInfo()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getAllOrganInfo()-2:"+e.getMessage());
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
		buf.append(" select * FROM om_organ_t ");
		buf.append(" where f_organ_id = ");
		buf.append("(select f_parent_organ_id from om_organ_t where f_organ_id = ?) ");
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getAllOrganInfo()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getAllOrganInfo()-2:"+e.getMessage());
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
		buf.append(" select * FROM om_organ_t ");
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getAllOrganInfo()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getAllOrganInfo()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
	public OrganVO getOrganInfoById(String organId) throws DataAccessException{
		OrganVO vo = null;
		String sql = "SELECT " +
						" f_organ_id," +
						" f_organ_name," +
						" f_organ_status," +
						" f_organ_kind," +
						" f_parent_organ_id," +
						" f_area_id," + 
						" f_inner_duty," +
						" f_principal," + 
						" f_active_date," + 
						" f_inactive_date," + 
						" f_organ_desc, " +
                        " f_city_code, " +
                        " f_order, " +
                        " f_duty_parent " +
					" FROM om_organ_t " +
					" WHERE f_organ_id = ?";
		
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganInfoById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganInfoById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}

	public OrganColl getOrganInfoByAreaId(String areaId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		OrganVO vo = null;
		
		String sql = "SELECT * FROM om_organ_t WHERE f_area_id = ? ";
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganInfoByAreaId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganInfoByAreaId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		
		return coll;
	}
	
	public OrganVO getOrganInfoFilter(Map filter) throws DataAccessException{
		OrganVO vo = null;
		
		StringBuffer sqlbf = new StringBuffer();
		sqlbf.append(" SELECT * FROM OM_ORGAN_T ");
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganInfoFilter-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganInfoFilter-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  

		return vo;
	}
	
	public OrganColl getChildOrganInfo(String organId) throws DataAccessException {
		OrganColl coll = new OrganColl();
		OrganVO vo = null;
		
		String sql = "SELECT * FROM OM_ORGAN_T " +
			" START WITH f_parent_organ_id = ? " +
			" CONNECT BY PRIOR f_organ_id = f_parent_organ_id ";
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getChildOrganInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getChildOrganInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  

		return coll;
	}	  

	public OrganColl getOrganInfoByOrganKind(int organKind) throws DataAccessException {
		OrganColl coll = new OrganColl();
		OrganVO vo = null;
		
		String sql = "SELECT * FROM OM_ORGAN_T where f_organ_kind = ?" ;
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganInfoByOrganKind-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganInfoByOrganKind-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  

		return coll;
	}	
	public int doAddOrgan(OrganVO vo) throws DataAccessException{
		int code = 1; //成功
		StringBuffer  sql = new StringBuffer();
		sql.append(" INSERT INTO om_organ_t(  f_organ_id, f_organ_name, f_organ_status, f_organ_kind, ");
		sql.append(" f_parent_organ_id,f_area_id,f_inner_duty,f_principal,f_active_date,f_inactive_date, ");
		sql.append(" f_organ_desc, f_city_code, f_order,f_duty_parent, f_party_id ) ");
		sql.append(" VALUES (?,?,?,?,?, ?,?,?,sysdate,to_date(?,'yyyy-mm-dd'), ?,?,?,?,?) ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql.toString());	
			int i = 1;
			pstmt.setString(i++,vo.getOrganId());
			pstmt.setString(i++,vo.getOrganName());
			pstmt.setInt(i++,vo.getOrganStatus());
			pstmt.setInt(i++,vo.getOrganKind());
			pstmt.setString(i++,vo.getParentOrganId());
			
			pstmt.setString(i++,vo.getAreaId());
			pstmt.setInt(i++,vo.getInnerDuty());
			pstmt.setString(i++,vo.getPrincipal());
			pstmt.setString(i++,vo.getInactiveDate());
			pstmt.setString(i++,vo.getOrganDesc());
			
			pstmt.setString(i++, getCityCodeByAreaId(vo.getAreaId()));
			pstmt.setInt(i++, vo.getOrder());
			pstmt.setString(i++,vo.getDutyParent());
			pstmt.setLong(i++, vo.getPartyId());
			
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--doAddOrgan()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		
		return code;
	};
	
	public int doModifyOrganById(OrganVO vo) throws DataAccessException{
		int code = 1; //成功
		StringBuffer buf = new StringBuffer();
		buf.append(" UPDATE om_organ_t ");
		buf.append(" SET f_organ_name = ?,");   
		buf.append(" f_organ_status = ?,");   
		buf.append(" f_organ_kind = ?,");   
		buf.append(" f_parent_organ_id = ?,");   
		buf.append(" f_area_id = ?,");   
		buf.append(" f_inner_duty= ?,");    
		buf.append(" f_principal = ?,");   
		buf.append(" f_active_date = sysdate,");   
		buf.append(" f_inactive_date = to_date(?,'yyyy-mm-dd'),");   
		buf.append(" f_organ_desc =?,");   
        buf.append(" f_city_code = ? ,");
        buf.append(" f_order = ? ,");
        buf.append(" f_duty_parent = ? ");
		buf.append(" WHERE f_organ_id = ? ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			
			pstmt.setString(1,vo.getOrganName());
			pstmt.setInt(2,vo.getOrganStatus());
			pstmt.setInt(3,vo.getOrganKind());
			pstmt.setString(4,vo.getParentOrganId());
			pstmt.setString(5,vo.getAreaId());
			pstmt.setInt(6,vo.getInnerDuty());
			pstmt.setString(7,vo.getPrincipal());
			pstmt.setString(8,vo.getInactiveDate());
			pstmt.setString(9,vo.getOrganDesc());
            pstmt.setString(10, getCityCodeByAreaId(vo.getAreaId()));
			pstmt.setInt(11,vo.getOrder());
			pstmt.setString(12,vo.getDutyParent());
			pstmt.setString(13,vo.getOrganId());
			code = pstmt.executeUpdate();
			
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--doModifyOrganById()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--doModifyOrganById()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return code;
	}
	
	public int doDeleteOrganById(String organId) throws DataAccessException{
		int code = 1; //成功
		
		String sql ="delete from om_organ_t where f_organ_id = ?";
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--doDeleteOrganById()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--doDeleteOrganById()-2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}  
		return code;
	}
    
    private String getCityCodeByAreaId(String areaId){
        String cityCode = "";
        int cityLevel = 0;
        StringBuffer buf = new StringBuffer();         
        buf.append("SELECT * FROM om_area_t  WHERE f_area_id = ?");            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,areaId);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                cityCode = rest.getString("f_city_code");
                cityLevel = rest.getInt("f_area_level");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getCityCodeByAreaId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getCityCodeByAreaId-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
        if(cityLevel > 3 && cityCode.length() >= 6){
       	 cityCode = cityCode.substring(0,3);
        }
        return cityCode;
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
        		" FROM OM_ORGAN_T a, OM_AREA_T b " +
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
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganByAreaLevel-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganByAreaLevel-2:"+e.getMessage());
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
        buf.append(" select f_organ_name from om_organ_t where f_area_id = ? and f_organ_name = ? ");
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
            	String orgName = rest.getString("f_organ_name");
            	if(orgName.trim().equals(organName)){
            		repeat = true;
            	}
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--ifRepeatedName-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--ifRepeatedName-2:"+e.getMessage());
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
    	String idField = "('"+areaId+"'";
    	for(int i=1; i < areaIdList.size(); i++){
    		idField = idField + ",'"+(String)areaIdList.get(i)+"'";
    	}
    	idField = idField + ")";
        StringBuffer buf = new StringBuffer();
        buf.append(" select a.* from om_organ_t a, om_area_t b where a.f_area_id = b.f_area_id ");
        buf.append(" and a.f_area_id in ");
        buf.append( idField );
        buf.append("  and a.f_parent_organ_id is null ");
        buf.append(" union ");
        buf.append(" select a.* from om_organ_t a, om_area_t b ");
        buf.append(" where a.f_area_id = b.f_area_id ");
        buf.append(" and a.f_area_id in ");
        buf.append(idField);
        
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            //pstmt.setString(1,idField);
            //pstmt.setString(2,idField);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                OrganVO organVO = new OrganVO();
                organVO.setAttribute(rest);
                organColl.addOrgan(organVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganCollByAuthAreaId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganCollByAuthAreaId-2:"+e.getMessage());
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
			" from om_organ_t where  f_area_id = '"+areaId+"'" +
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrgsByAreaId-1:"+e.getMessage());			
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrgsByAreaId-2:"+e.getMessage());			
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
        buf.append(" SELECT f_organ_id,f_organ_name ");
        buf.append(" FROM om_organ_t ");
        buf.append(" WHERE f_area_id = (select f_parent_area_id from om_area_t where f_area_id = ?)");
        if(organId!=null && organId.intern()!="".intern())
        	buf.append(" AND f_organ_id = ? ");      
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
                organVO.setOrganId(rest.getString("f_organ_id"));
                organVO.setOrganName(rest.getString("f_organ_name"));
                organColl.addOrgan(organVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganCollByAreaId()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
        
		return organColl;
	}
	
	public OrganKindColl getOrganKindColl() throws DataAccessException{
		OrganKindColl kindColl = new OrganKindColl();
		StringBuffer buf = new StringBuffer();         
        buf.append("select * from om_organ_kind_t ");
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                OrganKindVO kindVO = new OrganKindVO();
                kindVO.setAttribute(rest);
                kindColl.addOrganKindVO(kindVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganCollByAuthAreaId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganCollByAuthAreaId-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return kindColl;
	}

	public OrganColl getOrganByAreaForOM(String areaId) throws DataAccessException {
		OrganColl coll = new OrganColl();
		StringBuffer buf = new StringBuffer();         
		buf.append(" select f_organ_id, f_organ_name,f_organ_kind,f_parent_organ_id,f_area_id,");
		buf.append(" f_city_code,f_duty_parent from om_organ_t  ");
        buf.append(" connect by f_parent_organ_id = prior f_organ_id ");
        buf.append(" start with f_organ_id ");
        buf.append(" in ( ");
        buf.append(" select a.f_organ_id  from om_organ_t a, om_organ_t b");
        buf.append(" where a.f_parent_organ_id = b.f_organ_id and a.f_area_id <> b.f_area_id");
        buf.append(" and a.f_area_id = ? ");
        buf.append(" union ");
        buf.append(" select f_organ_id  from om_organ_t where f_parent_organ_id is null and f_area_id = ? ");
        buf.append(" ) ");
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, areaId);
            pstmt.setString(2, areaId);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                OrganVO vo = new OrganVO();
                vo.setAttribute(rest);
                coll.addOrgan(vo);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganByAreaForOM-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganByAreaForOM-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return coll;
	}
	public AreaColl getChildAreaCollByOrganId(String organId) throws DataAccessException{
		AreaColl areaColl = new AreaColl();
		StringBuffer buf = new StringBuffer();         
        buf.append(" select a.f_area_id,a.f_parent_area_id,a.f_area_name,a.f_city_code ");
        buf.append(" from om_area_t a ");
        buf.append(" connect by f_parent_area_id = prior f_area_id ");
        buf.append(" start with a.f_area_id = (select f_area_id from om_organ_t where f_organ_id = ? )");
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;        
       
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, organId);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                AreaVO vo = new AreaVO();
                vo.setAttribute(rest);
                areaColl.addArea(vo);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getChildAreaCollByOrganId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getChildAreaCollByOrganId-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return areaColl;
	}
	
	public OrganColl getSelfAndChildren(String organId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		String sql = "SELECT * FROM OM_ORGAN_T  START WITH f_organ_id = ? CONNECT BY PRIOR f_organ_id = f_parent_organ_id ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addElement(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getSelfAndChildren-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getSelfAndChildren-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
			return coll;
		}
	
	/**
	 * 根据组织机构类型查询组织机构信息
	 * @param minLevel
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganVO getOrganCollByKind4PPM(String organKind,String areaId) throws DataAccessException{
		OrganVO vo = null;
		String sql = "SELECT " +
						" f_organ_id," +
						" f_organ_name," +
						" f_organ_kind," +
						" f_parent_organ_id," +
						" f_area_id," + 
						" f_organ_desc, " +
                        " f_city_code " +
					" FROM pm_ppm_organ_t " +
					" WHERE f_organ_kind = ? AND f_area_id = ?";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organKind);
			pstmt.setString(2,areaId);
			rest = pstmt.executeQuery();
			
			if(rest.next()){
				vo = new OrganVO();
				vo.setAreaId(rest.getString("f_area_id"));
				vo.setOrganDesc(rest.getString("f_organ_desc"));
				vo.setOrganId(rest.getString("f_organ_id"));
				vo.setOrganKind(rest.getInt("f_organ_kind"));
				vo.setOrganName(rest.getString("f_organ_name"));
				vo.setCityCode(rest.getString("f_city_code"));
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganCollByKind4PPM-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganCollByKind4PPM-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	
	/**
	 * 只为PPM使用，查询部门的方法
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganVO getOrganInfoById4PPM(String organId) throws DataAccessException{
		OrganVO vo = null;
		String sql = "SELECT " +
						" f_organ_id," +
						" f_organ_name," +
						" f_organ_kind," +
						" f_parent_organ_id," +
						" f_area_id," + 
						" f_organ_desc, " +
                        " f_city_code " +
					" FROM pm_ppm_organ_t " +
					" WHERE f_organ_id = ?";
		
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
				vo.setAreaId(rest.getString("f_area_id"));
				vo.setOrganDesc(rest.getString("f_organ_desc"));
				vo.setOrganId(rest.getString("f_organ_id"));
				vo.setOrganKind(rest.getInt("f_organ_kind"));
				vo.setOrganName(rest.getString("f_organ_name"));
				vo.setCityCode(rest.getString("f_city_code"));
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganInfoById4PPM-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getOrganInfoById4PPM-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	
	/**
	 * 根据组织机构ID查询组织结构
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public OrganColl getSelfAndChildren4PPM(String organId) throws DataAccessException{
		OrganColl coll = new OrganColl();
		String sql = "SELECT * FROM pm_ppm_ORGAN_T  START WITH f_organ_id = ? CONNECT BY PRIOR f_organ_id = f_parent_organ_id ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				OrganVO vo = new OrganVO();
				vo.setAttribute(rest);
				coll.addElement(vo);	
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getSelfAndChildren4PPM-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDAOImpl--getSelfAndChildren4PPM-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
			return coll;
	}
}                                                                                                                      