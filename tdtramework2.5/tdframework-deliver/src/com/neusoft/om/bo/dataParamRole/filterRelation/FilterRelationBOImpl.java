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
 * ������ : DataFilter.java.java
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
     * ��ȡ���������˹���������������Դ����Ϣ
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
     * ��������Դ���ʶ��ȡ����Դ������
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
     * ��������Դ���ʶ��ȡ��������Ϣ
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
     * �ֲ�ˢ�£���ȡ����������������������Ϣ
     * @param 
     * @return
     */
    public ParamObjectCollection getPassiveSelect(String tableId,HashMap dataMap,
    		HttpSession session) throws ServiceException{
    	ParamObjectCollection filterColl=null;
    	HashMap map = null;
    	int a = Integer.parseInt(tableId);
    	String mainParamNames = (String)dataMap.get("mainParamNames");      //���������������ֶ���Ϣ
    	String[] mainValues = mainParamNames.split("~");
    	String passiveParamName = (String)dataMap.get("passiveParamName");  //�����������������ֶ���Ϣ
    	
        try{
        	//��ȡ��ѯ���������ݵ�SQL�����������ڱ����������еĹ����ֶ�
        	map = filterRelationDAO.getPassiveSelectInfo(a,passiveParamName,mainValues);
        	String filterSql = (String)map.get("filterSql");
        	//ѭ���滻��SQL�еĶ�̬������Ϣ
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
        	//���ɹ���������䣬Ȼ���ԭ����SQL���������һ��
        	if(columnList!=null && columnList.size()>0){
        		//��SQL����е�ORDER������������Ա����������WHERE����
        		int order = filterSql.indexOf("order");
        		if(order < 0)
        			order = filterSql.indexOf("ORDER");
        		
        		String orderStr = "";
        		if(order > 0){
        			orderStr = filterSql.substring(order);
        			filterSql = filterSql.substring(0,order);
        		}
        		//��ԭ����SQL������Ƿ���WHERE����
        		if(filterSql.indexOf("where")<=0 && filterSql.indexOf("WHERE")<=0){
        			filterSql = filterSql + " where 1=1 ";
        		}
        		
        		for(int i=0;i<columnList.size();i++){
        			FilterRelationVO vo = (FilterRelationVO)columnList.get(i);
        			String filterColumn = vo.getKeyValue(mainValues[i]);
        			String columnValue = (String)dataMap.get(mainValues[i]);
        			//********����ʹ�ô���********
//        			if(filterColumn.equals("F_AREA_ID")){
//        				columnValue = "018"+columnValue;
//        			}
        			//********����ʹ�ô���********
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
     * ��������Դ���ʶ����ȡ�������������ϵ��Ϣ
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
     * ��������Դ���ʶ�������������򣬻�ȡ������������Ϣ
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
     * ��������Դ���ʶ�����������ֶκͱ�����������ʶ��ɾ����������ϵ������Ϣ
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
            		message = "ɾ����������ϵ������Ϣ�����������Ϣ���������޷�����ɾ������";
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
        			message = "ɾ����������ϵ������Ϣʧ��";
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
     * ��������Դ���ʶ�����������ֶκͱ�����������ʶ��ɾ����������ϵ������Ϣ
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
                			message = "�޸Ĺ�������ϵ������Ϣ���������޷������޸Ĳ���";
                		else
                			message = "������������ϵ������Ϣ���������޷�������������";
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
        				message = "�޸Ĺ�������ϵ������Ϣʧ��";
        			else
        				message = "������������ϵ������Ϣʧ��";
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
