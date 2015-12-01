package com.neusoft.om.bo.dataParamRole.filterRelation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.neusoft.om.dao.dataParamRole.DataSourceInfoVO;
import com.neusoft.om.dao.dataParamRole.FilterRelationDAO;
import com.neusoft.om.dao.dataParamRole.FilterRelationVO;
import com.neusoft.om.omutil.DataParamUtil;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/***************************************************************
 * 程序名 : DataFilter.java.java
 * 日期  : 2007-8-11
 * 作者  : yanglm@neusoft.com
 * 模块  : 
 * 描述  : 
 * 备注  : 
 * ------------------------------------------------------------
 * 修改历史
 * 序号  日期  修改人   修改原因
 * 1
 * 2
 ***************************************************************/
public class FilterRelationBOImpl implements FilterRelationBO{

    private FilterRelationDAO filterRelationDAO;
    
    /**
     * @return Returns the filterRelationDAO.
     */
    public FilterRelationDAO getFilterRelationDAO() {
        return filterRelationDAO;
    }

    /**
     * @param filterRelationDAO The filterRelationDAO to set.
     */
    public void setFilterRelationDAO(FilterRelationDAO filterRelationDAO) {
        this.filterRelationDAO = filterRelationDAO;
    }
    
    /**
     * 获取所有配置了关联过滤器的数据源表信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterTables() throws ServiceException{
    	ParamObjectCollection tableColl=null;
    	
        try{
            tableColl=filterRelationDAO.getFilterTables();
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"FilterRelationBO--getFilterTables()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        
        return tableColl;
    }
    /**
     * 根据数据源表标识获取数据源表描述
     * @param 
     * @return
     */
    public String getTableDescById(String tableId) throws ServiceException{
    	String tableDesc = null;
    	int a = Integer.parseInt(tableId);
    	
        try{
        	tableDesc=filterRelationDAO.getTableDescById(a);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"FilterRelationBO--getTableDescById()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        
        return tableDesc;
    }
    /**
     * 根据数据源表标识获取过滤器信息
     * @param 
     * @return
     */
    public ParamObjectCollection getFilterCollById(String tableId) throws ServiceException{
    	ParamObjectCollection filterColl=null;
    	int a = Integer.parseInt(tableId);
    	
        try{
        	filterColl=filterRelationDAO.getFilterCollById(a);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"FilterRelationBO--getFilterTables()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        
        return filterColl;
    }
    /**
     * 局部刷新，获取被动过滤器下拉框数据信息
     * @param 
     * @return
     */
    public ParamObjectCollection getPassiveSelect(String tableId,HashMap dataMap,
    		HttpSession session) throws ServiceException{
    	ParamObjectCollection filterColl=null;
    	HashMap map = null;
    	int a = Integer.parseInt(tableId);
    	String mainParamNames = (String)dataMap.get("mainParamNames");      //主过滤器下拉框字段信息
    	String[] mainValues = mainParamNames.split("~");
    	String passiveParamName = (String)dataMap.get("passiveParamName");  //被动过滤器下拉框字段信息
    	
        try{
        	//获取查询下拉框数据的SQL和主过滤器在被动过滤器中的关联字段
        	map = filterRelationDAO.getPassiveSelectInfo(a,passiveParamName,mainValues);
        	String filterSql = (String)map.get("filterSql");
        	//循环替换掉SQL中的动态参数信息
        	if(filterSql.indexOf("@") >= 0){
    			String[] params = filterSql.split("@");
    			filterSql = "";
				for(int j=0;j<params.length;j++){
					if(j%2 == 0){
						filterSql = filterSql + " "+ params[j] + " ";
						continue;
					}else{
						String temp = params[j];
						temp = DataParamUtil.getInstance().getDynamicParamInfo(temp,session,1);
						filterSql = filterSql + " "+ temp + " ";
					}
				}
    		}
        	
        	List columnList = (List)map.get("paramColumn");
        	//生成过滤条件语句，然后和原来的SQL语句链接在一起
        	if(columnList!=null && columnList.size()>0){
        		//将SQL语句中的ORDER语句分离出来，以便后面再增加WHERE条件
        		int order = filterSql.indexOf("order");
        		if(order < 0)
        			order = filterSql.indexOf("ORDER");
        		
        		String orderStr = "";
        		if(order > 0){
        			orderStr = filterSql.substring(order);
        			filterSql = filterSql.substring(0,order);
        		}
        		//看原来的SQL语句中是否有WHERE条件
        		if(filterSql.indexOf("where")<=0 && filterSql.indexOf("WHERE")<=0){
        			filterSql = filterSql + " where 1=1 ";
        		}
        		
        		for(int i=0;i<columnList.size();i++){
        			FilterRelationVO vo = (FilterRelationVO)columnList.get(i);
        			String filterColumn = vo.getKeyValue(mainValues[i]);
        			String columnValue = (String)dataMap.get(mainValues[i]);
        			//********测试使用代码********
//        			if(filterColumn.equals("F_AREA_ID")){
//        				columnValue = "018"+columnValue;
//        			}
        			//********测试使用代码********
        			String sqlParam = " and "+filterColumn+"='"+columnValue+"' ";
        			filterSql = filterSql+sqlParam;
        		}
        		
        		filterSql = filterSql+orderStr;
        	}
        	
        	//String[] idAndValue = (String[])map.get("idAndValue");
        	filterColl = filterRelationDAO.getFilterInfoColl(filterSql);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"FilterRelationBO--getPassiveSelect()-1:"+e.getMessage());
           throw new ServiceException(e);
        }
        
        return filterColl;
    }
    /**
     * 根据数据源表标识，获取过滤器下拉框关系信息
     * @param 
     * @return
     */
    public List getFilterRelList(String tableId) throws ServiceException {
        List list = new ArrayList();
        int a = Integer.parseInt(tableId);
        
        try{
            list = filterRelationDAO.getFilterRelList(a);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,
          		 "FilterRelationBO--getFilterList()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return list;
    }
    /**
     * 根据数据源表标识和主过滤下拉框，获取被动下拉框信息
     * @param 
     * @return
     */
    public List getPassiveFilter(String tableId,String mainColumn,String operType) 
    	throws ServiceException {
    	List filterList = new ArrayList();
        int a = Integer.parseInt(tableId);
        
        try{
        	filterList = filterRelationDAO.getPassiveFilter(a,mainColumn,operType);
        	
        	if(filterList!=null && filterList.size()>0){
        		filterList = filterRelationDAO.getFilterColumn(filterList);
        	}
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,
          		 "FilterRelationBO--getFilterList()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        
        return filterList;
    }
    /**
     * 根据数据源表标识，主过滤器字段和被动过滤器标识，删除过滤器关系配置信息
     * @param 
     * @return
     */
    public String deleteFilterRel(String[] values) throws ServiceException {
    	String message = "true";
        
        try{
        	List list = new ArrayList();
        	
        	for(int i=0;i<values.length;i++){
            	String value = values[i];
            	if(value.trim().equals(""))
            		continue;
            	
            	String[] key = value.split("~");
            	
            	String tableId = key[0];
            	String mainColumn = key[1];
            	String filterId = key[2];
            	if(tableId.trim().equals("") || mainColumn.trim().equals("") || filterId.trim().equals("")){
            		message = "删除过滤器关系配置信息所需的主键信息不完整，无法进行删除操作";
            		list = null;
            		break;
            	}else{
            		FilterRelationVO vo = new FilterRelationVO();
            		vo.setTableId(Integer.parseInt(tableId));
            		vo.setMainFilterInfo(mainColumn);
            		vo.setFilterId(Integer.parseInt(filterId));
            		list.add(vo);
            	}
            }
        	
        	if(list!=null && list.size()>0){
        		int code = filterRelationDAO.deleteFilterRel(list);
        		
        		if(code <= 0){
        			message = "删除过滤器关系配置信息失败";
        		}
        	}
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,
          		 "FilterRelationBO--deleteFilterRel()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        
        return message;
    }
    /**
     * 根据数据源表标识，主过滤器字段和被动过滤器标识，删除过滤器关系配置信息
     * @param 
     * @return
     */
    public String addFilterRel(String[] values,String tableId,String mainColumn,
    	String operType) throws ServiceException {
    	String message = "true";
        int a = Integer.parseInt(tableId);
    	
        try{
        	List list = new ArrayList();
        	
        	if(values != null){
        		for(int i=0;i<values.length;i++){
                	String value = values[i];
                	if(value.trim().equals(""))
                		continue;
                	
                	String[] key = value.split("~");
                	
                	String passiveColumn = key[2];
                	String filterId = key[3];
                	String paramColumn = key[4];
                	if(tableId.trim().equals("") || mainColumn.trim().equals("") || filterId.trim().equals("") || passiveColumn.trim().equals("") || paramColumn.trim().equals("")){
                		if(operType.equals("modify"))
                			message = "修改过滤器关系配置信息不完整，无法进行修改操作";
                		else
                			message = "新增过滤器关系配置信息不完整，无法进行新增操作";
                		list = null;
                		break;
                	}else{
                		FilterRelationVO vo = new FilterRelationVO();
                		vo.setTableId(Integer.parseInt(tableId));
                		vo.setMainFilterInfo(mainColumn);
                		vo.setPassiveFilterInfo(passiveColumn);
                		vo.setFilterId(Integer.parseInt(filterId));
                		vo.setParamColumnInfo(paramColumn);
                		list.add(vo);
                	}
                }
        	}
        	
        	if(list!=null){
        		int code = filterRelationDAO.addFilterRel(list,a,mainColumn,operType);
        		
        		if(code <= 0){
        			if(operType.equals("modify"))
        				message = "修改过滤器关系配置信息失败";
        			else
        				message = "新增过滤器关系配置信息失败";
        		}
        	}
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,
          		 "FilterRelationBO--addFilterRel()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        
        return message;
    }
    
}
