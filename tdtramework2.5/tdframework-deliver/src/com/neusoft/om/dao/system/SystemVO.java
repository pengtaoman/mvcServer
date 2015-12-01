package com.neusoft.om.dao.system;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title: ϵͳ��Ϣ
 * Description: ����ϵͳ��Ϣ�ṹ
 * Company: neusoft
 * Date: 2004-11-24
 * @author renh
 * @version 
 */
public class SystemVO extends BaseVO implements com.neusoft.tdframework.authorization.SystemVO{
	/**ϵͳ����*/
	private String systemId = ""; 
	/**ϵͳ����*/
	private String systemName = ""; 
	/**ϵͳ����*/
	private String systemType = ""; 
	/**ϵͳ��ϸ����*/
	private String detailDesc = "";  
    
    private String parentSystemId = "";
    
    private int order;
    
    private String ifShowFavorite = "";
    
    private com.neusoft.tdframework.authorization.SystemColl subSystemColl;
	
    private String disabledDate;
    
    private String operator;
    
    private String operatorName;
	
	private String operateDate; 
    
	/** ���ϵͳ����*/
	public String getSystemId() {
		return systemId;
	}
	
	/**���ϵͳ����*/
		public String getSystemName() { 
			return XMLProperties.prepareXml(systemName);
		}
	/**���ϵͳ����*/
	public String getSystemType() { 
		return systemType;
	}
	/**���ϵͳ��ϸ����*/
	public String getDetailDesc(){
		return XMLProperties.prepareXml(detailDesc);
	}
	
	/** ����ϵͳ����*/
	public void setSystemId(String string) {
		systemId = string;
	}

	/**����ϵͳ����*/
	public void setSystemName(String string) { 
		systemName = string;
	}
	/**����ϵͳ����*/
	public void setSystemType(String string) { 
		systemType = string;
	}
	/**������ϸ����*/
	public void setDetailDesc(String string){ 
		detailDesc = string;
	}
	
	public com.neusoft.tdframework.authorization.SystemColl getSubSystemColl()
    {
        return subSystemColl;
    }

    public void setSubSystemColl(com.neusoft.tdframework.authorization.SystemColl subSystemColl)
    {
        this.subSystemColl = subSystemColl;
    }

    public String getParentSystemId()
    {
        return parentSystemId;
    }

    public void setParentSystemId(String parentSystemId)
    {
        this.parentSystemId = parentSystemId;
    }

    public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public String getIfShowFavorite() {
		return ifShowFavorite;
	}

	public void setIfShowFavorite(String ifShowFavorite) {
		this.ifShowFavorite = ifShowFavorite;
	}

	/**
	 * @return the disAbledData
	 */
	public String getDisabledDate() {
		return disabledDate;
	}

	/**
	 * @param disAbledData the disAbledData to set
	 */
	public void setDisabledDate(String disAbledDate) {
		this.disabledDate = disAbledDate;
	}

	/**
	 * @return the operateDate
	 */
	public String getOperateDate() {
		return operateDate;
	}

	/**
	 * @param operateDate the operateDate to set
	 */
	public void setOperateDate(String operateDate) {
		this.operateDate = operateDate;
	}

	/**
	 * @return the operator
	 */
	public String getOperator() {
		return operator;
	}

	/**
	 * @param operator the operator to set
	 */
	public void setOperator(String operator) {
		this.operator = operator;
	}

	/**
	 * @return the operatorName
	 */
	public String getOperatorName() {
		return operatorName;
	}

	/**
	 * @param operatorName the operatorName to set
	 */
	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}

	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}
		
	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_system_id".intern())
				systemId = resultSet.getString(i);
			else if(columnName.intern()=="f_system_name".intern())
				systemName = resultSet.getString(i);
			else if(columnName.intern()=="f_system_type".intern())
				systemType = resultSet.getString(i);
			else if(columnName.intern()=="f_detail_desc".intern())
				detailDesc = resultSet.getString(i);
            else if(columnName.intern()=="f_parent_system_id".intern())
                parentSystemId = resultSet.getString("f_parent_system_id");
            else if(columnName.intern()=="f_order".intern())
                order = resultSet.getInt("f_order");
            else if(columnName.intern()== "f_if_show_favorite".intern())
            	ifShowFavorite = resultSet.getString("f_if_show_favorite");
            else if(columnName.intern() == "f_disabled_date".intern()){
            	if(resultSet.getString("f_disabled_date") != null && !resultSet.getString("f_disabled_date").equals("")){
					String disDate = resultSet.getString("f_disabled_date").substring(0,10);
					disabledDate = disDate;
				}
            }            	
        	else if(columnName.intern() == "f_operator".intern())
				operator =resultSet.getString(i);
        	else if(columnName.intern() == "f_operate_date".intern()){
				if(resultSet.getString("f_operate_date") != null && !resultSet.getString("f_operate_date").equals("")){
					String opeDate = resultSet.getString("f_operate_date").substring(0,10);
					operateDate = opeDate;
				}
			}
		}

	}

		/**
		* ͨ��MAP��ʼ����Ϣ
		*/
		public void setAttribute(java.util.HashMap map)throws NumberFormatException {
			systemId = NullProcessUtil.nvlToString(
				map.get("systemId"),"");
			systemName = NullProcessUtil.nvlToString(
				map.get("systemName"),"");
			systemType = NullProcessUtil.nvlToString(
				map.get("systemType"),"");
			detailDesc = NullProcessUtil.nvlToString(
				map.get("detailDesc"),"");
		}
		
	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<SystemId>").append(nvl(systemId)).append("</SystemId>\n");
		ret.append(str_tab).append("<SystemName>").append(XMLProperties.prepareXml(nvl(systemName))).append("</SystemName>\n");
		ret.append(str_tab).append("<SystemType>").append(nvl(systemType)).append("</SystemType>\n");
		ret.append(str_tab).append("<parentSystemId>").append(XMLProperties.prepareXml(nvl(parentSystemId))).append("</parentSystemId>\n");
		ret.append(str_tab).append("<order>").append(order).append("</order>\n");
		ret.append(str_tab).append("<ifShowFavorite>").append(XMLProperties.prepareXml(nvl(ifShowFavorite))).append("</ifShowFavorite>\n");
		return ret.toString();
	}

	
}
