package com.neusoft.orgimpl;

import java.sql.ResultSet;
import java.util.Vector;

import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.common.NWResultSet;

public class NWRoleImpl implements NWRole {

	private DBConnManger connManger = null;
	
	private NWOrgImpl orgRef = null;

	protected String m_strID = "";

	protected String m_strName = "";

	protected String m_strBelongUnitID = "";

	protected String m_strParentRoleID = "";

	protected String m_strDescription = "";

	protected NWRoleImpl(String roleID, NWOrgImpl org) {
		orgRef = org;
		m_strID = roleID;
	    //connManger = DBConnManger.getIntance();
	}

	/**
	 * 取得角色标识.
	 * 
	 * @return 角色标识.
	 */
	public String getID() {
		return this.m_strID;
	}

	/**
	 * 取得角色名称.
	 * 
	 * @return 角色名称.
	 */
	public String getName() {
		return this.m_strName;
	}

	/**
	 * 取得角色的描述.
	 * 
	 * @return 角色的描述.
	 */
	public String getDescription() {
//		return this.m_strDescription;
		return null;
	}

	/**
	 * 取得上级角色.
	 * 
	 * @return 上级角色.
	 * @exception Exception
	 *                数据库异常
	 */
	public NWRole getParentRole() throws Exception {
		StringBuffer sb = new StringBuffer();
		sb.append("select t.F_PARENT_ORGAN_ID,F_AREA_ID from OM_ORGAN_T t where t.F_ORGAN_ID='");
		sb.append(m_strID);
		sb.append("'");
		NWResultSet rs = null;
		try{
			rs = orgRef.getPersistence().executeQuery(sb.toString());
			if (rs.next()) {
				String strParentID = rs.getString("F_PARENT_ORGAN_ID");
				String strAreaID = rs.getString("F_AREA_ID");
				//DBConnManger.close(rs);
				if ((strParentID != null) && (!strParentID.equals(""))) {
					StringBuffer sb1 = new StringBuffer();
					sb1.append("select t.F_ORGAN_NAME from OM_ORGAN_T t where t.F_ORGAN_ID='");
					sb1.append(strParentID);
					sb1.append("'");
					NWResultSet rs1 = null;
					try{
						rs1 = orgRef.getPersistence().executeQuery(sb1.toString());
						if (rs1.next()) {
					        String strRoleName = rs1.getString("F_ORGAN_NAME");
					        NWRole role =  new NWRoleImpl(strParentID,orgRef);
					        role.setName(strRoleName);
					        return role;
						}
					}finally{
						//DBConnManger.close(rs1);
					}
				} else {
					StringBuffer sb2 = new StringBuffer();
					sb2.append("select t.F_ORGAN_ID,t.F_ORGAN_NAME from OM_ORGAN_T t where t.F_AREA_ID=(select a.F_PARENT_AREA_ID from OM_AREA_T a where a.F_AREA_ID='");
					sb2.append(strAreaID);
					sb2.append("') and t.F_PARENT_ORGAN_ID is null");
					NWResultSet rs2 = null;
					try{
						rs2 = orgRef.getPersistence().executeQuery(sb2.toString());
						if (rs2.next()) {
							String strRoleID = rs2.getString("F_ORGAN_ID");
					        String strRoleName = rs2.getString("F_ORGAN_NAME");
					        NWRole role =  new NWRoleImpl(strRoleID,orgRef);
					        role.setName(strRoleName);
					        return role;
						}
					}finally{
						//DBConnManger.close(rs2);
					}
				}
			}
		}finally{
			//DBConnManger.close(rs);
		}
		return null;
	}

	/**
	 * 取得角色所属的组织单元.
	 * 
	 * @return 所属的组织单元.
	 * @exception Exception
	 *                数据库异常
	 */
	public NWUnit getSuperUnit() throws Exception {
		return null;
	}

	/**
	 * 取得角色中的所有成员.
	 * 
	 * @return 人员对象集合.
	 */
	public Vector openMemberList() throws Exception {
		Vector members = new Vector();
		return members;
	}

	/**
	 * 指定角色的名称
	 * 
	 * @param strRoleName
	 *            角色的名称.
	 */
	public void setName(String strRoleName) {
		this.m_strName = strRoleName;
	}

	/**
	 * 指定角色的描述信息
	 * 
	 * @param strRoleName
	 *            角色的描述信息.
	 */
	public void setDescription(String strRoleDescription) {
	}

	/**
	 * 向角色中添加人员
	 * 
	 * @param person
	 *            要添加的人员对象.
	 * @exception Exception
	 *                数据库异常
	 */
	public void addMember(NWPerson person) throws Exception {

	}

	/**
	 * 从角色中删除人员
	 * 
	 * @param objPerson
	 *            要删除的人员标识.
	 */
	public int removeMember(String strPersonID) throws Exception {
		return 0;
	}

	/**
	 * 删除角色中所用成员
	 */
	public int removeAllMembers() throws Exception {
		return 0;
	}

	/* －－－－－－－－－－－－－－－结构方法－－－－－－－－－－－ */

	/**
	 * 添加下级角色
	 * 
	 * @param objRole
	 *            要添加的下级角色对象.
	 */
	public void addChildRole(NWRole role) throws Exception {
	}

	/**
	 * 添加下级组织单元
	 * 
	 * @param objUnit
	 *            要添加的下级组织单元对象.
	 */
	public void addChildUnit(NWUnit objUnit) throws Exception {
	}

	/**
	 * 取得所有下属角色.
	 * 
	 * @param includeChildRole
	 *            参数includeChildRole为true则包括该角色 的所有下级角色，否则只有第一级下级角色。
	 * @param includeChildUnit
	 *            参数includeChildUnit为true则包括该角色 所有下属组织单元内的下级角色，否则只有本组织单元内的下级角色。
	 * @return 角色对象集合.
	 * @exception Exception
	 *                数据库异常
	 */
	public Vector openChildRoleList(boolean includeChildRole,
			boolean includeChildUnit) throws Exception {
		Vector roleVector = new Vector();
		return roleVector;
	}

	/**
	 * 取得所有下属组织单元.
	 * 
	 * @param includeChildRole
	 *            参数includeChildRole为true则包括该角色 所有下级角色下属的组织单元，否则只有直接的下级组织单元。
	 * @param includeChildUnit
	 *            参数includeChildUnit为true则包括 下级组织单元内的下级组织单元，否则只是第一级的组织单元。
	 * @return 组织单元对象集合.
	 * @exception Exception
	 *                数据库异常
	 */
	public Vector openChildUnitList(boolean includeChildRole,
			boolean includeChildUnit) throws Exception {
		Vector children = new Vector();
		return children;
	}

	/**
	 * 删除该角色下的所有角色及组织单元. 只是删除该角色与所有下级的关系，即分别执行下级角色和子组织单元的分离操作。
	 * 
	 * @return 删除的角色及组织单元总数.
	 * @exception Exception
	 *                数据库异常
	 */
	public int removeAllChildren() throws Exception {
		return 0;
	}

	/**
	 * 更新角色信息。
	 * 
	 * @exception Exception
	 *                数据库错误;
	 */
	public int update() throws Exception {
		return 0;
	}

	/**
	 * 将该角色与上级角色分离. 分离后该角色不再属于任何组织单元，并且不具有上下级关系。其下属角色亦然，
	 * 其下属组织单元也不再是该角色所属组织单元的下级组织单元。
	 * 
	 * @exception Exception
	 *                数据库异常
	 */
	public void split() throws Exception {

	}



	/*-----------------------protect methed---------------------*/

	protected Vector getChildRoles1() throws Exception {
		return null;
	}

	protected Vector getChildRoles2() throws Exception {
		return null;
	}

	protected Vector getChildRoles3() throws Exception {
		return null;
	}

	protected Vector getChildRoles4() throws Exception {
		return null;
	}

	protected Vector getChildRoleTree(boolean includeSubUnit, Vector v)
			throws Exception {
		return null;
	}

	protected Vector getChildRoleList(boolean includeSubUnit, Vector v)
			throws Exception {
		return null;
	}

	protected Vector getChildUnits1() throws Exception {
		return null;
	}

	protected Vector getChildUnits2() throws Exception {
		return null;
	}

	protected Vector getChildUnits3() throws Exception {
		return null;
	}

	protected Vector getChildUnits4() throws Exception {
		return null;
	}

	public String getParentRoleID() {
		return null;
	}

	public void setParentRoleID(String arg0) throws Exception {
	}
}

