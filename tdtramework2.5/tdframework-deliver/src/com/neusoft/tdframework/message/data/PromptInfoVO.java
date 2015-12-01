
package com.neusoft.tdframework.message.data;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * @Project: CodeGen
 * @Description: iBatis2&iBatis3 CodeGenerator Tools
 * @Copyright: Copyright by Neusoft.
 * @Company: Neusoft.Co.,Ltd.
 * @author LiKaijin(li.kj@neusoft.com)
 * @version 1.0
 * @since 1.0 
 */
@SuppressWarnings("serial")
public class PromptInfoVO implements java.io.Serializable {
	
	
	
	/** 
	 * 业务cd为唯一标识，共20位，前台使用的唯一标识，为system_id(4位，不足4为用0左补齐)+4位序列串 例如08450001  
	 */
	private java.lang.String busiCode;
	
	/** 
	 * 提示信息，需要动态替换的字符用%表示，如 客户订单$。$会按前台传递的infoList进行替换，如果$找不到对应的值，会被处理为半角空格;如果前台传递的infoList为[[a],[a]]格式，则提示信息会循环拼成一个完整信息  
	 */
	private java.lang.String message;
	
	/** 
	 * 提示信息描述,描述此信息具体场景  
	 */
	private java.lang.String remark;
	
	/** 
	 * 提示类型，info为默认值，共有下列级别info、warn、question、error、默认  
	 */
	private java.lang.String type;
	
	/** 
	 * 提示信息标题 通常按照type写为 提示信息、警告信息、问题信息、错误信息、提示信息，默认为提示信息  
	 */
	private java.lang.String title;
	
	/** 
	 * 模块，标识提示信息属于哪个模块取值为om_system_t.f_system_id  
	 */
	private java.lang.String module;
	
	/** 
	 * 状态,默认值1为有效，暂时未做过滤条件  
	 */
	private java.lang.String statusCd;
	
	/** 
	 * 状态时间  
	 */
	private java.util.Date statusDate;
	
	
	
    /** default constructor */
    public PromptInfoVO() {
    	
    }
   

	/**
	 * @param busiCode the busiCode to set
	 */
	public void setBusiCode(java.lang.String busiCode) {
		this.busiCode = busiCode;
	}
	
	/**
	 * @return the busiCode
	 */
	public java.lang.String getBusiCode() {
		return this.busiCode;
	}
	

	/**
	 * @param message the message to set
	 */
	public void setMessage(java.lang.String message) {
		this.message = message;
	}
	
	/**
	 * @return the message
	 */
	public java.lang.String getMessage() {
		return this.message;
	}
	

	/**
	 * @param remark the remark to set
	 */
	public void setRemark(java.lang.String remark) {
		this.remark = remark;
	}
	
	/**
	 * @return the remark
	 */
	public java.lang.String getRemark() {
		return this.remark;
	}
	

	/**
	 * @param type the type to set
	 */
	public void setType(java.lang.String type) {
		this.type = type;
	}
	
	/**
	 * @return the type
	 */
	public java.lang.String getType() {
		return this.type;
	}
	

	/**
	 * @param title the title to set
	 */
	public void setTitle(java.lang.String title) {
		this.title = title;
	}
	
	/**
	 * @return the title
	 */
	public java.lang.String getTitle() {
		return this.title;
	}
	

	/**
	 * @param module the module to set
	 */
	public void setModule(java.lang.String module) {
		this.module = module;
	}
	
	/**
	 * @return the module
	 */
	public java.lang.String getModule() {
		return this.module;
	}
	

	/**
	 * @param statusCd the statusCd to set
	 */
	public void setStatusCd(java.lang.String statusCd) {
		this.statusCd = statusCd;
	}
	
	/**
	 * @return the statusCd
	 */
	public java.lang.String getStatusCd() {
		return this.statusCd;
	}
	

	/**
	 * @param statusDate the statusDate to set
	 */
	public void setStatusDate(java.util.Date statusDate) {
		this.statusDate = statusDate;
	}
	
	/**
	 * @return the statusDate
	 */
	public java.util.Date getStatusDate() {
		return this.statusDate;
	}
	
    
    public String toString() {
		return new ToStringBuilder(this)
			.append("BusiCode", this.getBusiCode())
			.append("Message", this.getMessage())
			.append("Remark", this.getRemark())
			.append("Type", this.getType())
			.append("Title", this.getTitle())
			.append("Module", this.getModule())
			.append("StatusCd", this.getStatusCd())
			.append("StatusDate", this.getStatusDate())
			.toString();
	}
    
    public int hashCode() {
		return new HashCodeBuilder()
			.append(this.getBusiCode())
			.append(this.getMessage())
			.append(this.getRemark())
			.append(this.getType())
			.append(this.getTitle())
			.append(this.getModule())
			.append(this.getStatusCd())
			.append(this.getStatusDate())
			.toHashCode();
	}

    public boolean equals(Object obj) {
		if(obj instanceof PromptInfoVO == false) return false;
		if(this == obj) return true;
		PromptInfoVO other = (PromptInfoVO)obj;
		return new EqualsBuilder()
			.append(this.getBusiCode(), other.getBusiCode())
			.append(this.getMessage(), other.getMessage())
			.append(this.getRemark(), other.getRemark())
			.append(this.getType(), other.getType())
			.append(this.getTitle(), other.getTitle())
			.append(this.getModule(), other.getModule())
			.append(this.getStatusCd(), other.getStatusCd())
			.append(this.getStatusDate(), other.getStatusDate())
			.isEquals();
	}
    
}

