package com.neusoft.orgimpl;

import java.util.Vector;

import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.common.NWResultSet;
import com.neusoft.uniflow.common.StorageException;
/**
 * <p>Title: Org Implement</p>
 * <p>Description: Org interface implement for RDB</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: </p>
 * @author unascribed
 * @version 1.0
 */


public class NWUnitImpl implements NWUnit{

  private NWOrgImpl orgRef = null;

  protected String m_strID="";
  protected String m_strName="";
  protected String m_strLeaderRoleID="";
  protected String m_strDescription="";

  protected NWUnitImpl(String unitID,NWOrgImpl org) {
    orgRef = org;
    m_strID = unitID;
  }

  /**
   * ȡ����֯��Ԫ��ʶ.
   * @return ��֯��Ԫ��ʶ.
   */
    public String getID(){
      return this.m_strID;
    }

    /**
     * ȡ����֯��Ԫ����.
     * @return ��֯��Ԫ����.
     */
    public String getName(){
      return this.m_strName;
    }
    /**
     * ȡ����֯��Ԫ������.
     * @return  ��֯��Ԫ������.
     */
    public String getDescription(){
      return this.m_strDescription;
    }

    /**
     * ȡ����֯��Ԫ���쵼��ɫ.
     * @return ��ɫ����.
     */
    public NWRole getLeaderRole() throws Exception{
    	return null;
    }
    /**
     * ȡ�ø���֯��Ԫ�ĸ���ɫ.
     * @return ��ɫ�����ʶ.
     * �������֯��Ԫ�޸���ɫ������null,��ʾ����֯��ԪΪ������֯��Ԫ��
     */
    public NWRole getParentRole() throws Exception{
        return null;
    }

    /**
     * ȡ�ø���֯��Ԫ��������֯��Ԫ.
     * @return ��֯��Ԫ����.
     * �������֯��Ԫ��������֯��Ԫ������null,��ʾ����֯��ԪΪ������֯��Ԫ��
     * @exception Exception ���ݿ��쳣
     */
    public NWUnit getSuperUnit() throws Exception{
      NWRole role = getParentRole();
      if (role==null){
        return null;
      }else{
        return role.getSuperUnit();
      }
    }

    /**
     * ȡ����֯��Ԫ���������н�ɫ.
     * @param includeSub   ����includeSubΪtrue���������֯��Ԫ
     *����������֯��Ԫ�еĽ�ɫ������ֻ�и���֯��Ԫ����Ľ�ɫ��
     * @return ��ɫ����ļ���.
     * @exception Exception ���ݿ��쳣
     */
    public Vector openRoleList(boolean includeSub) throws Exception{
    	Vector roleList = new Vector();
    	StringBuffer sb = new StringBuffer();
    	sb.append("select F_ROLE_ID,F_ROLE_NAME from OM_ROLE_T");
    	try{
			NWResultSet rs = this.orgRef.persistence.executeQuery(sb.toString());
			while( rs.next() ){
				NWRole role = new NWRoleImpl(rs.getString("F_ROLE_ID"),this.orgRef);
				role.setName(rs.getString("F_ROLE_NAME"));
				roleList.add(role);
			}
    	}catch(StorageException e){
			throw new Exception("NWUnitImpl-openRoleList-SQLException :"+e.getMessage());
		}catch(Exception e){
			throw new Exception("NWUnitImpl-openRoleList-Exception :"+e.getMessage());
		}
    	return roleList;
    }

    /**
     * ȡ����֯��Ԫ������������֯��Ԫ.
     * @param includeSub   ����includeSubΪtrue���������֯��Ԫ
     *������֯��Ԫ������ֻ�и���֯��Ԫֱ��������֯��Ԫ��
     * @return ��֯��Ԫ���󼯺�.
     * @exception Exception ���ݿ��쳣
     */
    public Vector openSubUnitList(boolean includeSub) throws Exception{
    	Vector children = new Vector();
		return children;
    }

    /**
     * ȡ����֯��Ԫ������������Ա.
     * @param includeSub   ����includeSubΪtrue���������֯��Ԫ
     *�е���Ա������ֻ�и���֯��Ԫ�������Ա��
     * @return ��Ա���󼯺�.
     * @exception Exception ���ݿ��쳣
     */
    public Vector openPersonList(boolean includeSub) throws Exception{
      Vector persons = new Vector();
      
      return persons;
    }
    /**
     * ������֯��Ԫ���쵼��ɫ
     * @param role  ��ɫ����.
     * @exception Exception ���ݿ��쳣
     */
    public void addLeaderRole(NWRole role) throws Exception{
       
    }

    /**
     * ָ����֯��Ԫ������
     * @param strUnitName  Ҫָ������֯��Ԫ����.
     */
    public void setName(String strUnitName){
      this.m_strName = strUnitName;
    }

    /**
     * ָ����֯��Ԫ��������Ϣ
     * @param strUnitName  ��֯��Ԫ��������Ϣ.
     */
    public void setDescription(String strUnitDescription){
      this.m_strDescription = strUnitDescription;
    }

    /**
     * ������֯��Ԫ��Ϣ��
     * @exception Exception ���ݿ����;
     */
    public int update() throws Exception{
     
      return 1;
    }

    /**
     * ɾ������֯��Ԫ�е����н�ɫ.
     * @return ɾ���Ľ�ɫ��.
     * @exception Exception ���ݿ��쳣
     */
    public int removeAllRoles() throws Exception{
    
      return 1;
    }

    /**
     * ������֯��Ԫ���ϼ���֯��Ԫ����.
     * ����󣬸���֯��Ԫ��Ȼ���ڣ������������κ���֯��Ԫ��
     * @exception Exception ���ݿ��쳣
     */
    public void split() throws Exception{
      
    }

	public void setLeaderRoleID(String arg0) {
	}
}

