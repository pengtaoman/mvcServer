
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
	 * ҵ��cdΪΨһ��ʶ����20λ��ǰ̨ʹ�õ�Ψһ��ʶ��Ϊsystem_id(4λ������4Ϊ��0����)+4λ���д� ����08450001  
	 */
	private java.lang.String busiCode;
	
	/** 
	 * ��ʾ��Ϣ����Ҫ��̬�滻���ַ���%��ʾ���� �ͻ�����$��$�ᰴǰ̨���ݵ�infoList�����滻�����$�Ҳ�����Ӧ��ֵ���ᱻ����Ϊ��ǿո�;���ǰ̨���ݵ�infoListΪ[[a],[a]]��ʽ������ʾ��Ϣ��ѭ��ƴ��һ��������Ϣ  
	 */
	private java.lang.String message;
	
	/** 
	 * ��ʾ��Ϣ����,��������Ϣ���峡��  
	 */
	private java.lang.String remark;
	
	/** 
	 * ��ʾ���ͣ�infoΪĬ��ֵ���������м���info��warn��question��error��Ĭ��  
	 */
	private java.lang.String type;
	
	/** 
	 * ��ʾ��Ϣ���� ͨ������typeдΪ ��ʾ��Ϣ��������Ϣ��������Ϣ��������Ϣ����ʾ��Ϣ��Ĭ��Ϊ��ʾ��Ϣ  
	 */
	private java.lang.String title;
	
	/** 
	 * ģ�飬��ʶ��ʾ��Ϣ�����ĸ�ģ��ȡֵΪom_system_t.f_system_id  
	 */
	private java.lang.String module;
	
	/** 
	 * ״̬,Ĭ��ֵ1Ϊ��Ч����ʱδ����������  
	 */
	private java.lang.String statusCd;
	
	/** 
	 * ״̬ʱ��  
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

