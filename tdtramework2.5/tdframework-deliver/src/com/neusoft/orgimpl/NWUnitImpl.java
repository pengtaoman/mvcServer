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
   * 取得组织单元标识.
   * @return 组织单元标识.
   */
    public String getID(){
      return this.m_strID;
    }

    /**
     * 取得组织单元名称.
     * @return 组织单元名称.
     */
    public String getName(){
      return this.m_strName;
    }
    /**
     * 取得组织单元的描述.
     * @return  组织单元的描述.
     */
    public String getDescription(){
      return this.m_strDescription;
    }

    /**
     * 取得组织单元的领导角色.
     * @return 角色对象.
     */
    public NWRole getLeaderRole() throws Exception{
    	return null;
    }
    /**
     * 取得该组织单元的父角色.
     * @return 角色对象标识.
     * 如果该组织单元无父角色，返回null,表示该组织单元为顶层组织单元。
     */
    public NWRole getParentRole() throws Exception{
        return null;
    }

    /**
     * 取得该组织单元的所属组织单元.
     * @return 组织单元对象.
     * 如果该组织单元无所属组织单元，返回null,表示该组织单元为顶层组织单元。
     * @exception Exception 数据库异常
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
     * 取得组织单元下属的所有角色.
     * @param includeSub   参数includeSub为true则包括该组织单元
     *的所有子组织单元中的角色，否则只有该组织单元本身的角色。
     * @return 角色对象的集合.
     * @exception Exception 数据库异常
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
     * 取得组织单元下属的所有组织单元.
     * @param includeSub   参数includeSub为true则包括子组织单元
     *的子组织单元，否则只有该组织单元直属的子组织单元。
     * @return 组织单元对象集合.
     * @exception Exception 数据库异常
     */
    public Vector openSubUnitList(boolean includeSub) throws Exception{
    	Vector children = new Vector();
		return children;
    }

    /**
     * 取得组织单元下属的所有人员.
     * @param includeSub   参数includeSub为true则包括子组织单元
     *中的人员，否则只有该组织单元本身的人员。
     * @return 人员对象集合.
     * @exception Exception 数据库异常
     */
    public Vector openPersonList(boolean includeSub) throws Exception{
      Vector persons = new Vector();
      
      return persons;
    }
    /**
     * 设置组织单元的领导角色
     * @param role  角色对象.
     * @exception Exception 数据库异常
     */
    public void addLeaderRole(NWRole role) throws Exception{
       
    }

    /**
     * 指定组织单元的名称
     * @param strUnitName  要指定的组织单元名称.
     */
    public void setName(String strUnitName){
      this.m_strName = strUnitName;
    }

    /**
     * 指定组织单元的描述信息
     * @param strUnitName  组织单元的描述信息.
     */
    public void setDescription(String strUnitDescription){
      this.m_strDescription = strUnitDescription;
    }

    /**
     * 更新组织单元信息。
     * @exception Exception 数据库错误;
     */
    public int update() throws Exception{
     
      return 1;
    }

    /**
     * 删除该组织单元中的所有角色.
     * @return 删除的角色数.
     * @exception Exception 数据库异常
     */
    public int removeAllRoles() throws Exception{
    
      return 1;
    }

    /**
     * 将该组织单元与上级组织单元分离.
     * 分离后，该组织单元依然存在，但不再属于任何组织单元。
     * @exception Exception 数据库异常
     */
    public void split() throws Exception{
      
    }

	public void setLeaderRoleID(String arg0) {
	}
}

