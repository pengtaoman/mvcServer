/**
 *@deprecated
 * <p>Title:       简单的标题</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.tdframework.dao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.neusoft.tdframework.common.data.BaseDictItem;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
/**
 *@deprecated
 * <p>Title:       简单的标题</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */

public class BaseDictionaryDAO extends BaseDaoImpl
{
    public ParamObjectCollection executeQuery(String sql, String id, String name)
            throws DataAccessException
    {
        ParamObjectCollection coll = new ParamObjectCollection();
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rest = null;
        try
        {
            conn = getConnection();
            pst = conn.prepareStatement(sql);
            rest = pst.executeQuery();
            while (rest.next()){
                ParamObject obj = new ParamObject();
                obj.setId(rest.getString(id));
                obj.setName(rest.getString(name));
                coll.addParamObject(obj);
            }
        } 
        catch (SQLException e){
            throw new DataAccessException(e);
        } 
        finally{
            close(rest, pst, conn);
        }
        return coll;
    }
    public List executeQueryForSimpleList(String sql, String id, String name)
    	throws DataAccessException
    {
    	List coll = new ArrayList();
    	Connection conn = null;
    	PreparedStatement pst = null;
    	ResultSet rest = null;
    	try
    	{
    		conn = getConnection();
    		pst = conn.prepareStatement(sql);
    		rest = pst.executeQuery();
    		while (rest.next()){
    			BaseDictItem obj = new BaseDictItem();
    			obj.setId(rest.getString(id));
    			obj.setName(rest.getString(name));
    			coll.add(obj);
    		}
    	} 
    	catch (SQLException e){
    		throw new DataAccessException(e);
    	} 
    	finally{
    		close(rest, pst, conn);
    	}
    	return coll;
    }

    
    /**
     * 
     * @param sql
     * @param id
     * @param name
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getDictionaryMap(String sql, String id, String name)
    throws DataAccessException
    {
    	ParamObjectCollection coll = new ParamObjectCollection();
    	Connection conn = null;
    	PreparedStatement pst = null;
    	ResultSet rest = null;
    	try
    	{
    		conn = getConnection();
    		pst = conn.prepareStatement(sql);
    		rest = pst.executeQuery();
    		while (rest.next()){
    			//ParamObject obj = new ParamObject();
    			//obj.setId(rest.getString(id));
    			//obj.setName(rest.getString(name));
    			coll.addElement(rest.getString(id), rest.getString(name));
    		}
    	} 
    	catch (SQLException e){
    		throw new DataAccessException(e);
    	} 
    	finally{
    		close(rest, pst, conn);
    	}
    	return coll;
    }
    
    public ParamObjectCollection executeQuery(String sql, String id, String copy,String name,boolean copyControl)
	    throws DataAccessException
	{
		ParamObjectCollection coll = new ParamObjectCollection();
		Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;
		try
		{
		    conn = getConnection();
		    pst = conn.prepareStatement(sql);
		    rest = pst.executeQuery();
		    while (rest.next()){
		        ParamObject obj = new ParamObject();
		        if(copyControl){
		        	obj.setId(rest.getString(id));
			        obj.setName(rest.getString(copy)+"|"+rest.getString(name));
		        }else{
		        	obj.setId(rest.getString(id));
	                obj.setName(rest.getString(name));
		        } 
		        coll.addParamObject(obj);
		    }
		} 
		catch (SQLException e){
		    throw new DataAccessException(e);
		} 
		finally{
		    close(rest, pst, conn);
		}
		return coll;
	}
    public List executeQueryForSimpleList(String sql, String id, String copy,String name,boolean copyControl)
    throws DataAccessException
    {
    	List coll = new ArrayList();
    	Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;
		try
		{
		    conn = getConnection();
		    pst = conn.prepareStatement(sql);
		    rest = pst.executeQuery();
		    while (rest.next()){
		    	BaseDictItem obj = new BaseDictItem();
		        if(copyControl){
		        	obj.setId(rest.getString(id));
			        obj.setName(rest.getString(copy)+"|"+rest.getString(name));
		        }else{
		        	obj.setId(rest.getString(id));
		            obj.setName(rest.getString(name));
		        } 
		        coll.add(obj);
		    }
		} 
		catch (SQLException e){
		    throw new DataAccessException(e);
		} 
		finally{
		    close(rest, pst, conn);
		}
		return coll;
	}

    
    public ParamObjectCollection executeQuery(String sql, String id, String name,String cityCode)
    	throws DataAccessException {
	    ParamObjectCollection coll = new ParamObjectCollection();
	    Connection conn = null;
	    PreparedStatement pst = null;
	    ResultSet rest = null;
	    try
	    {
	        conn = getConnection();
	        pst = conn.prepareStatement(sql);
	        rest = pst.executeQuery();
	        while (rest.next()){
	            ParamObject obj = new ParamObject();
	            obj.setId(rest.getString(id));
	            obj.setName(rest.getString(name));
	            obj.setPreserve_1(rest.getString(cityCode));
	            coll.addParamObject(obj);
	        }
	    } 
	    catch (SQLException e){
	        throw new DataAccessException(e);
	    } 
	    finally{
	        close(rest, pst, conn);
	    }
	    return coll;
    }
    public List executeQueryForSimpleList(String sql, String id, String name,String cityCode)
		throws DataAccessException {
    	List coll = new ArrayList();
    	Connection conn = null;
		PreparedStatement pst = null;
		ResultSet rest = null;
		try
		{
		    conn = getConnection();
		    pst = conn.prepareStatement(sql);
		    rest = pst.executeQuery();
		    while (rest.next()){
		    	BaseDictItem obj = new BaseDictItem();
		        obj.setId(rest.getString(id));
		        obj.setName(rest.getString(name));
		        obj.setPreserve_1(rest.getString(cityCode));
		        coll.add(obj);
		    }
		} 
		catch (SQLException e){
		    throw new DataAccessException(e);
		} 
		finally{
		    close(rest, pst, conn);
		}
		return coll;
	}
}

