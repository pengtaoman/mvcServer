package com.neusoft.om.dao.system;



/**
 * Title: 系统信息
 * Description: 定义系统信息结构
 * Company: neusoft
 * Date: 2004-11-24
 * @author renh
 * @version 
 */
public class SystemVOJson {
	/**系统编码*/
	private String stmId = ""; 
	/**系统名称*/
	private String stmName = ""; 
	/**系统类型*/
	private String systemType = ""; 
    
    private String parentStmId = "";
    
    private int order;
    
    private String ifShowFavorite = "";
	
    private String disabledDate;
    
    private String operator;
    
    private String operatorName;
	
	private String operateDate; 
	
	/**added by pengtao 2011-05-28 for CRM6*/
	private boolean ifChild;
    
	/** 获得系统编码*/
	public String getStmId() {
		return stmId;
	}
	
	/**获得系统名称*/
		public String getStmName() { 
			return stmName;
		}
	/**获得系统类型*/
	public String getSystemType() { 
		return systemType;
	}

	
	/** 设置系统编码*/
	public void setStmId(String string) {
		stmId = string;
	}

	/**设置系统名称*/
	public void setStmName(String string) { 
		stmName = string;
	}
	/**设置系统类型*/
	public void setSystemType(String string) { 
		systemType = string;
	}


    public String getParentStmId()
    {
        return parentStmId;
    }

    public void setParentStmId(String parentStmId)
    {
        this.parentStmId = parentStmId;
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
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
	 * @return the ifChild
	 */
	public boolean isIfChild() {
		return ifChild;
	}

	/**
	 * @param ifChild the ifChild to set
	 */
	public void setIfChild(boolean ifChild) {
		this.ifChild = ifChild;
	}

	
}
