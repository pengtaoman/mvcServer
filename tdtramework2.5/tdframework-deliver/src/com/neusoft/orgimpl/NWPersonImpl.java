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
   * 取得人员标识.
   * @return 人员标识.
   */
    public String getID(){
      return this.m_strID;
    }

    /**
     * 取得人员名称.
     * @return 人员名称.
     */
    public String getName(){
      return this.m_strName;
    }

    /**
     * 取得人员帐号.
     * @return 人员帐号.
     */
    public String getAccount(){
      return this.m_strAccount;
    }

    /**
     * 取得人员口令.
     * @return 人员口令.
     */
    public String getPassword(){
      return "";
    }

    /**
     * 取得人员保留属性1.
     * @return 人员的保留属性1.
     */
    public String getReserved01(){
      return this.m_strReserved01;
    }

    /**
     * 取得人员保留属性2.
     * @return 人员的保留属性2.
     */
    public String getReserved02(){
      return this.m_strReserved02;
    }

    /**
     * 取得人员保留属性3.
     * @return 人员的保留属性3.
     */
    public String getReserved03(){
      return this.m_strReserved03;
    }

    /**
     * 取得人员保留属性4.
     * @return 人员的保留属性4.
     */
    public String getReserved04(){
      return this.m_strReserved04;
    }
    /**
     * 取得人员保留属性5.
     * @return 人员的保留属性5.
     */
    public String getReserved05(){
      return this.m_strReserved05;
    }
    /**
     * 取得人员保留属性6.
     * @return 人员的保留属性6.
     */
    public String getReserved06(){
      return this.m_strReserved06;
    }
    /**
     * 取得人员保留属性7.
     * @return 人员的保留属性7.
     */
    public String getReserved07(){
      return this.m_strReserved07;
    }
    /**
     * 取得人员保留属性8.
     * @return 人员的保留属性8.
     */
    public String getReserved08(){
      return this.m_strReserved08;
    }

    /**
     * 取得人员保留属性9.
     * @return 人员的保留属性9.
     */
    public String getReserved09(){
      return this.m_strReserved09;
    }

    /**
     * 取得人员保留属性10.
     * @return 人员的保留属性10.
     */
    public String getReserved10(){
      return this.m_strReserved10;
    }
    /**
     * 取得人员性别.
     * @return 人员性别. 0-男 1-女
     */
    public int getSex(){
      return this.m_iSex;
    }
    /**
     * 取得人员EMail地址.
     * @return 人员EMail地址.
     */
    public String getEmail(){
      return this.m_strEMail;
    }

    /**
     * 取得人员所在部门信息.
     * @return 人员部门信息.
     */
    public String getDepartment(){
      return this.m_strDepartment;
    }

    /**
     * 取得人员的办公室地址.
     * @return 人员的办公室地址.
     */
    public String getOfficeAddress(){
      return this.m_strOfficeAddress;
    }
    /**
     * 取得人员的办公室电话.
     * @return 人员的办公室电话.
     */
    public String getOfficeTel(){
      return this.m_strOfficeTel;
    }

    /**
     * 取得人员的传真.
     * @return 人员的传真.
     */
    public String getFax(){
      return this.m_strFax;
    }

    /**
     * 取得人员的移动电话.
     * @return 人员的移动电话.
     */
    public String getMobilePhone(){
      return this.m_strMobilePhone;
    }

    /**
     * 取得人员的传呼号码.
     * @return 人员的传呼号码.
     */
    public String getPager(){
      return this.m_strPager;
    }

    /**
     * 取得人员的家庭住址.
     * @return 人员的家庭住址.
     */
    public String getHomeAddress(){
      return this.m_strHomeAddress;
    }

    /**
     * 取得人员的住宅电话号码.
     * @return 人员的住宅电话号码.
     */
    public String getHomeTel(){
      return this.m_strHomeTel;
    }

    /**
     * 取得人员的邮政编码.
     * @return 人员的邮政编码.
     */
    public String getPostalCode(){
      return this.m_strPostalCode;
    }

    /**
     * 修改人员口令.
     * @param strNewPwd 新口令.
     */
    public void setPassword(String strNewPwd){
      if(strNewPwd==null)
        strNewPwd="";
      this.m_strPassword = "";
    }

    /**
     * 指定人员账号。
     * @param strNewAccount  人员账号
     */
    public void setAccount(String strNewAccount){
      this.m_strAccount = strNewAccount;
    }

    /**
     * 指定人员姓名。
     * @param strNewName  人员姓名
     */
    public void setName(String strNewName){
      this.m_strName = strNewName;
    }

    /**
     * 指定人员性别。
     * @param iNewSex  人员性别. 0-男 1-女
     */
    public void setSex(int iNewSex){
      this.m_iSex = iNewSex;
    }

    /**
     * 指定人员所在部门。
     * @param strNewDepartment  部门名称
     */
    public void setDepartment(String strNewDepartment){
      this.m_strDepartment = strNewDepartment;
    }

    /**
     * 指定人员的EMail地址。
     * @param strNewEMail  EMail地址
     */
    public void setEmail(String strNewEMail){
      this.m_strEMail = strNewEMail;
    }

    /**
     * 指定人员的传真号。
     * @param strNewFax  传真号
     */
    public void setFax(String strNewFax){
      this.m_strFax = strNewFax;
    }

    /**
     * 指定人员的家庭住址。
     * @param strNewHomeAddr  人员家庭住址
     */
    public void setHomeAddress(String strNewHomeAddr){
      this.m_strHomeAddress = strNewHomeAddr;
    }

    /**
     * 指定人员的住宅电话。
     * @param strNewHomeTel  住宅电话号码
     */
    public void setHomeTel(String strNewHomeTel){
      this.m_strHomeTel = strNewHomeTel;
    }

    /**
     * 指定人员的移动电话。
     * @param strNewMobile  人员的移动电话
     */
    public void setMobilePhone(String strNewMobile){
      this.m_strMobilePhone = strNewMobile;
    }

    /**
     * 指定人员的办公室地址。
     * @param strNewOfficeAddress  办公室地址
     */
    public void setOfficeAddress(String strNewOfficeAddress){
      this.m_strOfficeAddress = strNewOfficeAddress;
    }

    /**
     * 指定人员的办公室电话。
     * @param strNewOfficeTel  办公室电话
     */
    public void setOfficeTel(String strNewOfficeTel){
      this.m_strOfficeTel = strNewOfficeTel;
    }

    /**
     * 指定人员的传呼号码。
     * @param strNewPager  人员的传呼号码
     */
    public void setPager(String strNewPager){
      this.m_strPager = strNewPager;
    }

    /**
     * 指定人员的邮政编码。
     * @param strNewPostalCode  人员的邮政编码
     */
    public void setPostalCode(String strNewPostalCode){
      this.m_strPostalCode = strNewPostalCode;
    }

    /**
     * 指定人员的保留属性1。
     * @param strReserved01  人员保留属性1
     */
    public void setReserved01(String strReserved01){
      this.m_strReserved01 = strReserved01;
    }

    /**
     * 指定人员的保留属性2。
     * @param strReserved02  人员保留属性2
     */
    public void setReserved02(String strReserved02){
      this.m_strReserved02 = strReserved02;
    }

    /**
     * 指定人员的保留属性3。
     * @param strReserved03  人员保留属性3
     */
    public void setReserved03(String strReserved03){
      this.m_strReserved03 = strReserved03;
    }

    /**
     * 指定人员的保留属性4。
     * @param strReserved04  人员保留属性4
     */
    public void setReserved04(String strReserved04){
      this.m_strReserved04 = strReserved04;
    }

    /**
     * 指定人员的保留属性5。
     * @param strReserved05  人员保留属性5
     */
    public void setReserved05(String strReserved05){
      this.m_strReserved05 = strReserved05;
    }

    /**
     * 指定人员的保留属性6。
     * @param strReserved06  人员保留属性6
     */
    public void setReserved06(String strReserved06){
      this.m_strReserved06 = strReserved06;
    }

    /**
     * 指定人员的保留属性7。
     * @param strReserved07  人员保留属性7
     */
    public void setReserved07(String strReserved07){
      this.m_strReserved07 = strReserved07;
    }

    /**
     * 指定人员的保留属性8。
     * @param strReserved08  人员保留属性8
     */
    public void setReserved08(String strReserved08){
      this.m_strReserved08 = strReserved08;
    }

    /**
     * 指定人员的保留属性9。
     * @param strReserved09  人员保留属性9
     */
    public void setReserved09(String strReserved09){
      this.m_strReserved09 = strReserved09;
    }
    /**
     * 指定人员的保留属性10。
     * @param strReserved10  人员保留属性10
     */
    public void setReserved10(String strReserved10){
      this.m_strReserved10 = strReserved10;
    }

    /**
     * 取得人员所属的角色集合.
     * @return 返回角色对象集合.
     * @exception Exception 数据库异常
     */
    public Vector openBelongRoleList() throws Exception{
      Vector roles = new Vector();
      System.out.println("方法未实现：openBelongRoleList()");
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
     * 取得人员所属的组织单元集合.
     * @return 返回组织单元对象集合.
     * @exception Exception 数据库异常
     */
    public Vector openBelongUnitList() throws Exception{
      Vector units = new Vector();
      System.out.println("方法未实现：openBelongUnitList()");
      return units;
    }

    public Vector openBelongUnitIDList() throws Exception{
      Vector unitIDs = new Vector();
      System.out.println("方法未实现：openBelongUnitIDList()");
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