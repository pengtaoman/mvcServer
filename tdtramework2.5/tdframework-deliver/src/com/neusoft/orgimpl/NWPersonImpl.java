package com.neusoft.orgimpl;

/**
 * <p>Title: Org Implement</p>
 * <p>Description: Org interface implement for RDB</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: </p>
 * @author unascribed
 * @version 1.0
 */
import java.sql.ResultSet;
import java.util.Vector;

import com.neusoft.org.NWPerson;
import com.neusoft.uniflow.common.NWResultSet;

public class NWPersonImpl implements NWPerson{

  private DBConnManger connManger = null;
  private NWOrgImpl orgRef = null;

  protected String m_strID="";
  protected String m_strAccount="";
  protected String m_strDepartment="";
  protected String m_strEMail="";
  protected String m_strFax="";
  protected String m_strHomeAddress="";
  protected String m_strHomeTel="";
  protected String m_strMobilePhone="";
  protected String m_strName="";
  protected String m_strOfficeAddress="";
  protected String m_strOfficeTel="";
  protected String m_strPager="";
  protected String m_strPassword="";
  protected String m_strPostalCode="";
  protected int m_iSex;
  protected String m_strReserved01="";
  protected String m_strReserved02="";
  protected String m_strReserved03="";
  protected String m_strReserved04="";
  protected String m_strReserved05="";
  protected String m_strReserved06="";
  protected String m_strReserved07="";
  protected String m_strReserved08="";
  protected String m_strReserved09="";
  protected String m_strReserved10="";

  public NWPersonImpl(String strID,NWOrgImpl org) {
    orgRef = org;
    m_strID = strID;
    //connManger = DBConnManger.getIntance();
  }

  /**
   * ȡ����Ա��ʶ.
   * @return ��Ա��ʶ.
   */
    public String getID(){
      return this.m_strID;
    }

    /**
     * ȡ����Ա����.
     * @return ��Ա����.
     */
    public String getName(){
      return this.m_strName;
    }

    /**
     * ȡ����Ա�ʺ�.
     * @return ��Ա�ʺ�.
     */
    public String getAccount(){
      return this.m_strAccount;
    }

    /**
     * ȡ����Ա����.
     * @return ��Ա����.
     */
    public String getPassword(){
      return "";
    }

    /**
     * ȡ����Ա��������1.
     * @return ��Ա�ı�������1.
     */
    public String getReserved01(){
      return this.m_strReserved01;
    }

    /**
     * ȡ����Ա��������2.
     * @return ��Ա�ı�������2.
     */
    public String getReserved02(){
      return this.m_strReserved02;
    }

    /**
     * ȡ����Ա��������3.
     * @return ��Ա�ı�������3.
     */
    public String getReserved03(){
      return this.m_strReserved03;
    }

    /**
     * ȡ����Ա��������4.
     * @return ��Ա�ı�������4.
     */
    public String getReserved04(){
      return this.m_strReserved04;
    }
    /**
     * ȡ����Ա��������5.
     * @return ��Ա�ı�������5.
     */
    public String getReserved05(){
      return this.m_strReserved05;
    }
    /**
     * ȡ����Ա��������6.
     * @return ��Ա�ı�������6.
     */
    public String getReserved06(){
      return this.m_strReserved06;
    }
    /**
     * ȡ����Ա��������7.
     * @return ��Ա�ı�������7.
     */
    public String getReserved07(){
      return this.m_strReserved07;
    }
    /**
     * ȡ����Ա��������8.
     * @return ��Ա�ı�������8.
     */
    public String getReserved08(){
      return this.m_strReserved08;
    }

    /**
     * ȡ����Ա��������9.
     * @return ��Ա�ı�������9.
     */
    public String getReserved09(){
      return this.m_strReserved09;
    }

    /**
     * ȡ����Ա��������10.
     * @return ��Ա�ı�������10.
     */
    public String getReserved10(){
      return this.m_strReserved10;
    }
    /**
     * ȡ����Ա�Ա�.
     * @return ��Ա�Ա�. 0-�� 1-Ů
     */
    public int getSex(){
      return this.m_iSex;
    }
    /**
     * ȡ����ԱEMail��ַ.
     * @return ��ԱEMail��ַ.
     */
    public String getEmail(){
      return this.m_strEMail;
    }

    /**
     * ȡ����Ա���ڲ�����Ϣ.
     * @return ��Ա������Ϣ.
     */
    public String getDepartment(){
      return this.m_strDepartment;
    }

    /**
     * ȡ����Ա�İ칫�ҵ�ַ.
     * @return ��Ա�İ칫�ҵ�ַ.
     */
    public String getOfficeAddress(){
      return this.m_strOfficeAddress;
    }
    /**
     * ȡ����Ա�İ칫�ҵ绰.
     * @return ��Ա�İ칫�ҵ绰.
     */
    public String getOfficeTel(){
      return this.m_strOfficeTel;
    }

    /**
     * ȡ����Ա�Ĵ���.
     * @return ��Ա�Ĵ���.
     */
    public String getFax(){
      return this.m_strFax;
    }

    /**
     * ȡ����Ա���ƶ��绰.
     * @return ��Ա���ƶ��绰.
     */
    public String getMobilePhone(){
      return this.m_strMobilePhone;
    }

    /**
     * ȡ����Ա�Ĵ�������.
     * @return ��Ա�Ĵ�������.
     */
    public String getPager(){
      return this.m_strPager;
    }

    /**
     * ȡ����Ա�ļ�ͥסַ.
     * @return ��Ա�ļ�ͥסַ.
     */
    public String getHomeAddress(){
      return this.m_strHomeAddress;
    }

    /**
     * ȡ����Ա��סլ�绰����.
     * @return ��Ա��סլ�绰����.
     */
    public String getHomeTel(){
      return this.m_strHomeTel;
    }

    /**
     * ȡ����Ա����������.
     * @return ��Ա����������.
     */
    public String getPostalCode(){
      return this.m_strPostalCode;
    }

    /**
     * �޸���Ա����.
     * @param strNewPwd �¿���.
     */
    public void setPassword(String strNewPwd){
      if(strNewPwd==null)
        strNewPwd="";
      this.m_strPassword = "";
    }

    /**
     * ָ����Ա�˺š�
     * @param strNewAccount  ��Ա�˺�
     */
    public void setAccount(String strNewAccount){
      this.m_strAccount = strNewAccount;
    }

    /**
     * ָ����Ա������
     * @param strNewName  ��Ա����
     */
    public void setName(String strNewName){
      this.m_strName = strNewName;
    }

    /**
     * ָ����Ա�Ա�
     * @param iNewSex  ��Ա�Ա�. 0-�� 1-Ů
     */
    public void setSex(int iNewSex){
      this.m_iSex = iNewSex;
    }

    /**
     * ָ����Ա���ڲ��š�
     * @param strNewDepartment  ��������
     */
    public void setDepartment(String strNewDepartment){
      this.m_strDepartment = strNewDepartment;
    }

    /**
     * ָ����Ա��EMail��ַ��
     * @param strNewEMail  EMail��ַ
     */
    public void setEmail(String strNewEMail){
      this.m_strEMail = strNewEMail;
    }

    /**
     * ָ����Ա�Ĵ���š�
     * @param strNewFax  �����
     */
    public void setFax(String strNewFax){
      this.m_strFax = strNewFax;
    }

    /**
     * ָ����Ա�ļ�ͥסַ��
     * @param strNewHomeAddr  ��Ա��ͥסַ
     */
    public void setHomeAddress(String strNewHomeAddr){
      this.m_strHomeAddress = strNewHomeAddr;
    }

    /**
     * ָ����Ա��סլ�绰��
     * @param strNewHomeTel  סլ�绰����
     */
    public void setHomeTel(String strNewHomeTel){
      this.m_strHomeTel = strNewHomeTel;
    }

    /**
     * ָ����Ա���ƶ��绰��
     * @param strNewMobile  ��Ա���ƶ��绰
     */
    public void setMobilePhone(String strNewMobile){
      this.m_strMobilePhone = strNewMobile;
    }

    /**
     * ָ����Ա�İ칫�ҵ�ַ��
     * @param strNewOfficeAddress  �칫�ҵ�ַ
     */
    public void setOfficeAddress(String strNewOfficeAddress){
      this.m_strOfficeAddress = strNewOfficeAddress;
    }

    /**
     * ָ����Ա�İ칫�ҵ绰��
     * @param strNewOfficeTel  �칫�ҵ绰
     */
    public void setOfficeTel(String strNewOfficeTel){
      this.m_strOfficeTel = strNewOfficeTel;
    }

    /**
     * ָ����Ա�Ĵ������롣
     * @param strNewPager  ��Ա�Ĵ�������
     */
    public void setPager(String strNewPager){
      this.m_strPager = strNewPager;
    }

    /**
     * ָ����Ա���������롣
     * @param strNewPostalCode  ��Ա����������
     */
    public void setPostalCode(String strNewPostalCode){
      this.m_strPostalCode = strNewPostalCode;
    }

    /**
     * ָ����Ա�ı�������1��
     * @param strReserved01  ��Ա��������1
     */
    public void setReserved01(String strReserved01){
      this.m_strReserved01 = strReserved01;
    }

    /**
     * ָ����Ա�ı�������2��
     * @param strReserved02  ��Ա��������2
     */
    public void setReserved02(String strReserved02){
      this.m_strReserved02 = strReserved02;
    }

    /**
     * ָ����Ա�ı�������3��
     * @param strReserved03  ��Ա��������3
     */
    public void setReserved03(String strReserved03){
      this.m_strReserved03 = strReserved03;
    }

    /**
     * ָ����Ա�ı�������4��
     * @param strReserved04  ��Ա��������4
     */
    public void setReserved04(String strReserved04){
      this.m_strReserved04 = strReserved04;
    }

    /**
     * ָ����Ա�ı�������5��
     * @param strReserved05  ��Ա��������5
     */
    public void setReserved05(String strReserved05){
      this.m_strReserved05 = strReserved05;
    }

    /**
     * ָ����Ա�ı�������6��
     * @param strReserved06  ��Ա��������6
     */
    public void setReserved06(String strReserved06){
      this.m_strReserved06 = strReserved06;
    }

    /**
     * ָ����Ա�ı�������7��
     * @param strReserved07  ��Ա��������7
     */
    public void setReserved07(String strReserved07){
      this.m_strReserved07 = strReserved07;
    }

    /**
     * ָ����Ա�ı�������8��
     * @param strReserved08  ��Ա��������8
     */
    public void setReserved08(String strReserved08){
      this.m_strReserved08 = strReserved08;
    }

    /**
     * ָ����Ա�ı�������9��
     * @param strReserved09  ��Ա��������9
     */
    public void setReserved09(String strReserved09){
      this.m_strReserved09 = strReserved09;
    }
    /**
     * ָ����Ա�ı�������10��
     * @param strReserved10  ��Ա��������10
     */
    public void setReserved10(String strReserved10){
      this.m_strReserved10 = strReserved10;
    }

    /**
     * ȡ����Ա�����Ľ�ɫ����.
     * @return ���ؽ�ɫ���󼯺�.
     * @exception Exception ���ݿ��쳣
     */
    public Vector openBelongRoleList() throws Exception{
      Vector roles = new Vector();
      System.out.println("����δʵ�֣�openBelongRoleList()");
      return roles;
    }

    public Vector openBelongRoleIDList() throws Exception{
      Vector roleIDs = new Vector();
      StringBuffer sb = new StringBuffer();
      sb.append("select t.F_ORGAN_ID from OM_EMPLOYEE_T t where t.F_EMPLOYEE_ID='");
      sb.append(m_strID);
      sb.append("'");
      NWResultSet rs = null;
		try{
			 rs  = orgRef.getPersistence().executeQuery(sb.toString());
			 String strRoleID = null;
			 while(rs.next()){
				 strRoleID = rs.getString("F_ORGAN_ID");
				 roleIDs.addElement(strRoleID);
			 }
		}finally{
			//DBConnManger.close(rs);
		}
      return roleIDs;
    }
    /**
     * ȡ����Ա��������֯��Ԫ����.
     * @return ������֯��Ԫ���󼯺�.
     * @exception Exception ���ݿ��쳣
     */
    public Vector openBelongUnitList() throws Exception{
      Vector units = new Vector();
      System.out.println("����δʵ�֣�openBelongUnitList()");
      return units;
    }

    public Vector openBelongUnitIDList() throws Exception{
      Vector unitIDs = new Vector();
      System.out.println("����δʵ�֣�openBelongUnitIDList()");
      return unitIDs;

    }

    public int update() throws Exception{
        return 1;
    }

    String getSql(String oldstr){
      String newstr = "";

      return newstr;
    }

	public boolean authenticatePassword(String arg0) {
		return true;
	}  
}