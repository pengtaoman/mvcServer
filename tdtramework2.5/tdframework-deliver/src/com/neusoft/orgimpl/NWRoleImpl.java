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
	 * ȡ�ý�ɫ��ʶ.
	 * 
	 * @return ��ɫ��ʶ.
	 */
	public String getID() {
		return this.m_strID;
	}

	/**
	 * ȡ�ý�ɫ����.
	 * 
	 * @return ��ɫ����.
	 */
	public String getName() {
		return this.m_strName;
	}

	/**
	 * ȡ�ý�ɫ������.
	 * 
	 * @return ��ɫ������.
	 */
	public String getDescription() {
//		return this.m_strDescription;
		return null;
	}

	/**
	 * ȡ���ϼ���ɫ.
	 * 
	 * @return �ϼ���ɫ.
	 * @exception Exception
	 *                ���ݿ��쳣
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
	 * ȡ�ý�ɫ��������֯��Ԫ.
	 * 
	 * @return ��������֯��Ԫ.
	 * @exception Exception
	 *                ���ݿ��쳣
	 */
	public NWUnit getSuperUnit() throws Exception {
		return null;
	}

	/**
	 * ȡ�ý�ɫ�е����г�Ա.
	 * 
	 * @return ��Ա���󼯺�.
	 */
	public Vector openMemberList() throws Exception {
		Vector members = new Vector();
		return members;
	}

	/**
	 * ָ����ɫ������
	 * 
	 * @param strRoleName
	 *            ��ɫ������.
	 */
	public void setName(String strRoleName) {
		this.m_strName = strRoleName;
	}

	/**
	 * ָ����ɫ��������Ϣ
	 * 
	 * @param strRoleName
	 *            ��ɫ��������Ϣ.
	 */
	public void setDescription(String strRoleDescription) {
	}

	/**
	 * ���ɫ�������Ա
	 * 
	 * @param person
	 *            Ҫ��ӵ���Ա����.
	 * @exception Exception
	 *                ���ݿ��쳣
	 */
	public void addMember(NWPerson person) throws Exception {

	}

	/**
	 * �ӽ�ɫ��ɾ����Ա
	 * 
	 * @param objPerson
	 *            Ҫɾ������Ա��ʶ.
	 */
	public int removeMember(String strPersonID) throws Exception {
		return 0;
	}

	/**
	 * ɾ����ɫ�����ó�Ա
	 */
	public int removeAllMembers() throws Exception {
		return 0;
	}

	/* �������������������������������ṹ�������������������������� */

	/**
	 * ����¼���ɫ
	 * 
	 * @param objRole
	 *            Ҫ��ӵ��¼���ɫ����.
	 */
	public void addChildRole(NWRole role) throws Exception {
	}

	/**
	 * ����¼���֯��Ԫ
	 * 
	 * @param objUnit
	 *            Ҫ��ӵ��¼���֯��Ԫ����.
	 */
	public void addChildUnit(NWUnit objUnit) throws Exception {
	}

	/**
	 * ȡ������������ɫ.
	 * 
	 * @param includeChildRole
	 *            ����includeChildRoleΪtrue������ý�ɫ �������¼���ɫ������ֻ�е�һ���¼���ɫ��
	 * @param includeChildUnit
	 *            ����includeChildUnitΪtrue������ý�ɫ ����������֯��Ԫ�ڵ��¼���ɫ������ֻ�б���֯��Ԫ�ڵ��¼���ɫ��
	 * @return ��ɫ���󼯺�.
	 * @exception Exception
	 *                ���ݿ��쳣
	 */
	public Vector openChildRoleList(boolean includeChildRole,
			boolean includeChildUnit) throws Exception {
		Vector roleVector = new Vector();
		return roleVector;
	}

	/**
	 * ȡ������������֯��Ԫ.
	 * 
	 * @param includeChildRole
	 *            ����includeChildRoleΪtrue������ý�ɫ �����¼���ɫ��������֯��Ԫ������ֻ��ֱ�ӵ��¼���֯��Ԫ��
	 * @param includeChildUnit
	 *            ����includeChildUnitΪtrue����� �¼���֯��Ԫ�ڵ��¼���֯��Ԫ������ֻ�ǵ�һ������֯��Ԫ��
	 * @return ��֯��Ԫ���󼯺�.
	 * @exception Exception
	 *                ���ݿ��쳣
	 */
	public Vector openChildUnitList(boolean includeChildRole,
			boolean includeChildUnit) throws Exception {
		Vector children = new Vector();
		return children;
	}

	/**
	 * ɾ���ý�ɫ�µ����н�ɫ����֯��Ԫ. ֻ��ɾ���ý�ɫ�������¼��Ĺ�ϵ�����ֱ�ִ���¼���ɫ������֯��Ԫ�ķ��������
	 * 
	 * @return ɾ���Ľ�ɫ����֯��Ԫ����.
	 * @exception Exception
	 *                ���ݿ��쳣
	 */
	public int removeAllChildren() throws Exception {
		return 0;
	}

	/**
	 * ���½�ɫ��Ϣ��
	 * 
	 * @exception Exception
	 *                ���ݿ����;
	 */
	public int update() throws Exception {
		return 0;
	}

	/**
	 * ���ý�ɫ���ϼ���ɫ����. �����ý�ɫ���������κ���֯��Ԫ�����Ҳ��������¼���ϵ����������ɫ��Ȼ��
	 * ��������֯��ԪҲ�����Ǹý�ɫ������֯��Ԫ���¼���֯��Ԫ��
	 * 
	 * @exception Exception
	 *                ���ݿ��쳣
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

