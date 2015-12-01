package com.neusoft.tdframework.authorization;

import com.neusoft.om.dao.paramrole.ParamRoleColl;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-10-27
 * @author ren.hui@neusoft.com
 * @version 
 */

public interface AuthorizeVO {

	/**
	 * @return
	 */
	public String getWorkNo();

	/**
	 * @return
	 */
	
	public String getAreaId();
	/**
	 * @return
	 */
	public String getAreaName();
	/**
	 * @return
	 */
	public int getAreaLevel() ;
	/**
	 * @return
	 */
	public String getParentAreaId();
	/**
	 * @return
	 */
	public String getParentAreaName() ;
	/**
	 * ��������
	 * @return
	 */
	public String getOrganID();
	/**
	 * @return
	 */
	public String getOrganName() ;
	
	/**
	 * 
	 * @return
	 */
	public int getOrganKind() ;
	/**
	 * @return
	 */
	public String getParentOrganId() ;
	/**
	 * @return
	 */
	public String getParentOrganName();
	/**
	 * 
	 * @return
	 */
	public int getParentOrganKind();
	/**
	 * @return
	 */
	public int getDutyId() ;
	
	/**
	 * @return
	 */
	public String getDutyName();
	/**
	 * 
	 * @return
	 */
	public int getParentDutyId() ;
	/**
	 * 
	 * @return
	 */
	public String getParentDutyName();
	/**
	 * @return
	 */
	public String getEmployeeId() ;
	/**
	 * @return
	 */
	public String getEmployeeName() ;
	
	public String getParentEmployeeId ();
	
	public String getParentEmployeeName();
	
	
	/**
	 * @return
	 */
	public int getAuthorizeResult() ;
	
	/**
	 * @return
	 */
	public String getAuthorizeMessage() ;
	
	/**
	 * ���ж�����ʧЧ
	 * @param 
	 *	 
	 */
	public int getAuthorizeEffectDays();
	
	/**
	 * ��������
	 * @return
	 */
	public String getPartCity() ;
			
	/**
	 * ��ȡ����
	 * @return
	 */
	public String getWorkPwd();
    
    /**
     * ������ɫ����
     * @return
     */
    public ParamRoleColl getParamRoleColl();
    
    /**
     * ���б���
     * @return
     */
    public String getCityCode();
    
    /**
     * ����Ա���� 
     * @return
     */
    public int getAdminType();
    
    /**
     * ����
     * @return
     */
    public String getAreaCode();
    /**
     * ״̬
     * @return
     */
    public int getStatus();
    // -- ���¼�������Ϊ�ںϾ�Ӫ����Ȩ��ϵͳ����
    /*
     * �Ա�
     */
    public int getGender();
    
    /*
     * �绰
     */
    public String getMobile();
    /*
     * email
     */
    public String getEmail();
    
    public void setLoginIp(String loginIp);
    
    public String getLoginIp();
    
    public void setLoginId(String loginId);
    
    public String getLoginId();
    
    public int getBusDutyId();
    
    public String getDepartmentId();
    
    public String getDealerName();
    
    public int getOperLevel();
    
    public long getSystemUserId();
    
    public long getStaffId();
    
    public long getPartyId();
    
    public String getHomeCity();
    
    public void setHomeCity(String homeCity);
    
}
