package com.neusoft.orgimpl;

/**
 * <p>
 * Title: Org Implement
 * </p>
 * <p>
 * Description: Org interface implement for RDB
 * </p>
 * <p>
 * Copyright: Copyright (c) 2002
 * </p>
 * <p>
 * Company:
 * </p>
 * 
 * @author unascribed
 * @version 1.0
 */
// import java.sql.Connection;
import java.util.Properties;
import java.util.Vector;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.common.NWResultSet;
import com.neusoft.uniflow.common.StorageException;
import com.neusoft.uniflow.persistence.IPersistenceFactory;
import com.neusoft.uniflow.persistence.Persistence;
import com.neusoft.uniflow.persistence.PersistenceFactory;
import com.neusoft.uniflow.persistence.PersisterFactory;

public class NWOrgImpl implements NWOrg {
	Persistence persistence = null;
	private DBConnManger connManger = null;
	public NWOrgImpl() {
	}

	/**
	 * �������Ӳ��������ӷ�������
	 * 
	 * @param strConnectString
	 *            �����ַ����� �������ݿ⣬����������������Դ�ȣ�����LDAP�����������������˿ڵȡ�
	 * @param strUser
	 *            ��¼���������û�
	 * @param strPassword
	 *            �û�����
	 * @exception Exception
	 *                ���ӷ������쳣
	 */
	public void initialize(String strConnectString, String strUser,
			String strPassword) throws Exception {
		connManger = DBConnManger.getIntance();
		connManger.init(strConnectString,strUser,strPassword);
	}

	

	public void initialize(String dataSourceName, String user, String pwd,
		Properties props) throws Exception {
		IPersistenceFactory persistenceFacotory = (IPersistenceFactory)PersistenceFactory.getFactory("");
			persistence=(Persistence)persistenceFacotory.createPersistence(1,"" );
			persistence.init(dataSourceName, "", 1);
			//persistence.begin();
	}
	
	public Persistence getPersistence() {
		return this.persistence;
	}
	
	/*
	public NWJDBCOperation getJDBCOperation() {
		return null;
	}
	*/
	/**
	 * �Ͽ����������ӣ��ͷ���Դ��
	 * 
	 * @exception Exception
	 */
	public void uninitialize() throws Exception {
	}

	/**
	 * ���ݽ�ɫ����ȡ�ý�ɫ����
	 * 
	 * @param roleName
	 *            ��ɫ����
	 * @return �ɹ����ؽ�ɫ����ʧ�ܷ���null��
	 */
	public NWRole getRoleByName(String roleName) throws Exception {
		StringBuffer sb = new StringBuffer();
		sb.append("select F_ORGAN_ID from OM_ORGAN_T where F_ORGAN_NAME ='");
		sb.append(replaceString(roleName));
		sb.append("'");
		NWRole role = null;
		NWResultSet rs = null;
		try{
			rs = persistence.executeQuery(sb.toString());
			if (rs.next()) {
				String roleID = String.valueOf(rs.getInt("F_ORGAN_ID"));
				role = new NWRoleImpl(roleID, this);
				role.setName(roleName);
			}
		}finally{
			//DBConnManger.close(rs);
		}
		
		return role;
	}

	/**
	 * ���ݽ�ɫ��ʶȡ�ý�ɫ����
	 * 
	 * @param roleID
	 *            ��ɫ��ʶ
	 * @return �ɹ����ؽ�ɫ����ʧ�ܷ���null��
	 * @exception Exception
	 *                ���ݿ����;
	 */
	public NWRole getRole(String roleID) throws Exception {
		StringBuffer sb = new StringBuffer();
		Object[] object = {roleID};
		sb.append("select F_ROLE_NAME from om_role_t where F_ROLE_ID = ?");
		NWRole role = null;
		NWResultSet rs = null;
		try{
			rs = persistence.executeQuery(sb.toString(),object);
			if (rs.next()) {
				String roleName = rs.getString("F_ROLE_NAME");
				role = new NWRoleImpl(roleID, this);
				role.setName(roleName);
			}
		}catch(StorageException e){
			throw new Exception("NWOrgImpl-getRole-SQLException :"+e.getMessage());
		}catch(Exception e){
			throw new Exception("NWOrgImpl-getRole-Exception :"+e.getMessage());
		}
		return role;
	}

	/**
	 * ȡ����֯���������н�ɫ��
	 * 
	 * @return ��ɫ���󼯺�.
	 */
	public Vector openRoleList() throws Exception {
		Vector roles = new Vector();
		NWResultSet rs = null;
		try{
			 rs = persistence.executeQuery("select F_ORGAN_ID,F_ORGAN_NAME from OM_ORGAN_T");// ȡ�����в���
			 String roleID = null;
			 String roleName = null;
			 while (rs.next()) {
				roleID = rs.getString("F_ORGAN_ID");
				roleName = rs.getString("F_ORGAN_NAME");
				NWRole role = new NWRoleImpl(roleID, this);
				role.setName(roleName);
				roles.addElement(role);
			 }
		}finally{
			//DBConnManger.close(rs);
		}
		return roles;
	}

	/**
	 * ȡ����֯���������������ɫ�б�
	 * 
	 * @return ��ɫ���󼯺�
	 * @exception Exception
	 *                ���ݿ��쳣;
	 */
	public Vector openOrphanRoleList() throws Exception {
		Vector roles = new Vector();

		NWResultSet rs = persistence.executeQuery(
						"select * from ORG_ROLE where OWNER_UNIT_ID is NULL and PARENT_ROLE_ID is NULL");

		String roleID = null;
		String roleName = null;
		String strDescription = null;
		try{
			while (rs.next()) {
				roleID = rs.getString("ROLE_ID");
				roleName = rs.getString("ROLE_NAME");
				strDescription = rs.getString("ROLE_DESC");
				NWRole role = new NWRoleImpl(roleID, this);
				role.setName(roleName);
				role.setDescription(strDescription);
				roles.addElement(role);
			}
		}catch(StorageException e){
			throw new Exception("NWOrgImpl-openOrphanRoleList-SQLException :"+e.getMessage());
		}catch(Exception e){
			throw new Exception("NWOrgImpl-openOrphanRoleList-Exception :"+e.getMessage());
		}
		return roles;
	}

	/**
	 * ȡ����֯���������и���ɫ�б�
	 * 
	 * @return ��ɫ���󼯺�
	 * @exception Exception
	 *                ���ݿ��쳣;
	 */
	public Vector openAbsoluteRootRoleList() throws Exception {
		Vector roles = new Vector();
		NWResultSet rs = null;
		try{
			rs = persistence.executeQuery(
							"select F_ORGAN_ID,F_ORGAN_NAME from OM_ORGAN_T a,OM_AREA_T b where a.F_AREA_ID=b.F_AREA_ID and a.F_PARENT_ORGAN_ID is null and b.F_PARENT_AREA_ID is null");
	
			String strRoleID = null;
			String strRoleName = null;
			while (rs.next()) {
				strRoleID = rs.getString("F_ORGAN_ID");
				strRoleName = rs.getString("F_ORGAN_NAME");
				NWRole role = new NWRoleImpl(strRoleID, this);
				role.setName(strRoleName);
				roles.addElement(role);
			}
		}finally{
			//DBConnManger.close(rs);
		}
		return roles;
	}

	/**
	 * ������Ա�ʺ�ȡ����Ա����
	 * 
	 * @param strPersonAccount
	 *            ��Ա�ʺ�
	 * @return �ɹ�������Ա����,ʧ�ܷ���null��
	 */
	public NWPerson getPersonByAccount(String strPersonAccount)
			throws Exception {
		String s = strPersonAccount;
		StringBuffer sb = new StringBuffer();
		sb
				.append("select F_EMPLOYEE_ID,F_EMPLOYEE_NAME from OM_EMPLOYEE_T where F_WORK_NO =?");
		Object[] object = {replaceString(strPersonAccount).toUpperCase()};
		NWResultSet rs = null;
		NWPerson objPerson = null;
		try{
			rs = persistence.executeQuery(sb.toString(),object);
			if (rs.next()) {
				objPerson = new NWPersonImpl(
						rs.getString("F_EMPLOYEE_ID"), this);
				objPerson.setAccount(strPersonAccount);
				objPerson.setName(rs.getString("F_EMPLOYEE_NAME"));
			}
		}catch(StorageException e){
			throw new Exception("NWOrgImpl-openPersonByAccount-SQLException :"+e.getMessage());
		}catch(Exception e){
			throw new Exception("NWOrgImpl-openPersonByAccount-Exception :"+e.getMessage());
		}
		return objPerson;
	}

	/**
	 * ������Ա��ʶȡ����Ա����
	 * 
	 * @param strPersonID
	 *            ��Ա��ʶ
	 * @return �ɹ�������Ա����,ʧ�ܷ���null��
	 * @exception Exception
	 *                ���ݿ����;
	 */
	public NWPerson getPerson(String strPersonID) throws Exception {
		StringBuffer sb = new StringBuffer();
		sb
				.append("select F_EMPLOYEE_ID,F_EMPLOYEE_NAME,F_WORK_NO from OM_EMPLOYEE_T where F_EMPLOYEE_ID ='");
		sb.append(strPersonID);
		sb.append("'");
		NWResultSet rs = null;
		NWPerson objPerson = null;
		try{
			rs = persistence.executeQuery(sb.toString());
			if (rs.next()) {
					objPerson = new NWPersonImpl(
					rs.getString("F_EMPLOYEE_ID"), this);
					objPerson.setAccount(rs.getString("F_WORK_NO"));
					objPerson.setName(rs.getString("F_EMPLOYEE_NAME"));
			}
		}finally{
			//DBConnManger.close(rs);
		}
		return objPerson;
	}

	/**
	 * ȡ����֯���������е���Ա��
	 * 
	 * @return ��Ա���󼯺ϡ�
	 */
	public Vector openPersonList() throws Exception {
		Vector persons = new Vector();
		NWResultSet rs = null;
		NWPerson objPerson = null;
		try{
			rs = persistence.executeQuery(
						"select F_EMPLOYEE_ID, F_EMPLOYEE_NAME, F_WORK_NO FROM OM_EMPLOYEE_T");
			while (rs.next()) {
				objPerson = new NWPersonImpl(
						rs.getString("F_EMPLOYEE_ID"), this);
				objPerson.setAccount(rs.getString("F_WORK_NO"));
				objPerson.setName(rs.getString("F_EMPLOYEE_NAME"));
				persons.addElement(objPerson);
			}
		}finally{
			//DBConnManger.close(rs);
		}
		return persons;
	}

	public Vector openPersonList(int startLocation, int offset, String orderby)
			throws Exception {
		Vector personList = new Vector();
		return personList;
	}

	/**
	 * ȡ����֯��������Ա������
	 * 
	 * @return ��Ա������
	 * @exception Exception
	 *                ���ݿ��쳣;
	 */
	public long getPersonNum() throws Exception {
		return 0;
	}

	/**
	 * ȡ����֯���������е���֯��Ԫ��
	 * 
	 * @return ��֯��Ԫ���󼯺ϡ�
	 */
	public Vector openUnitList() throws Exception {
		Vector units = new Vector();
		
		return units;
	}

	/**
	 * ������֯��Ԫ����ȡ����֯��Ԫ����
	 * 
	 * @param strUnitName
	 *            ��֯��Ԫ����
	 * @return �ɹ�������֯��Ԫ����ʧ�ܷ���null��
	 */
	public NWUnit getUnitByName(String strUnitName) throws Exception {
		return null;
	}

	/**
	 * ������֯��Ԫ��ʶȡ����֯��Ԫ����
	 * 
	 * @param strUnitID
	 *            ��֯��Ԫ��ʶ
	 * @return �ɹ�������֯��Ԫ����ʧ�ܷ���null��
	 * @exception Exception
	 *                ���ݿ����;
	 */
	public NWUnit getUnit(String strUnitID) throws Exception {
		NWUnit unit = null;
		unit = new NWUnitImpl(strUnitID,this);
		return unit;
	}

	/**
	 * ָ�����ӵ���֯�ṹ���ơ� ����֯��������Դ֧�ֶ����֯����ʱ�������ø����ԡ�
	 * 
	 * @param strOrgName
	 *            ��֯��������
	 */
	public void setOrgName(String strOrgName) {
	}

	/**
	 * ���һ���µĽ�ɫ��
	 * 
	 * @return ��������ӵĽ�ɫ����
	 * @exception Exception
	 */
	public NWRole createRole(String roleID) throws Exception {
		return null;
	}

	/**
	 * ���һ������Ա��
	 * 
	 * @return ��������ӵ���Ա����
	 * @exception Exception
	 */
	public NWPerson createPerson(String personID) throws Exception {
		return null;
	}

	/**
	 * ���һ���µ���֯��Ԫ��
	 * 
	 * @return ����ӵ���֯��Ԫ����
	 * @exception Exception
	 */
	public NWUnit createUnit(String unitID) throws Exception {
		return null;
	}

	/**
	 * ɾ��һ����ɫ��
	 * 
	 * @param strRoleID
	 *            ��ɫ�����ʶ
	 * @exception Exception
	 *                ���ݿ����;
	 */
	public int removeRole(String strRoleID) throws Exception {
		return 0;
	}

	/**
	 * ɾ��һ����Ա��
	 * 
	 * @param strPersonID
	 *            ��Ա�����ʶ
	 * @exception Exception
	 *                ���ݿ����;
	 */
	public int removePerson(String strPersonID) throws Exception {
		return 0;
	}

	/**
	 * ɾ��һ����֯��Ԫ��
	 * 
	 * @param objUnit
	 *            ��֯��Ԫ�����ʶ
	 * @exception Exception
	 *                ���ݿ����;
	 */
	public int removeUnit(String strUnitID) throws Exception {
		return 0;
	}

	/**
	 * ɾ�����н�ɫ��
	 * 
	 * @return true-�����ɹ���false-����ʧ��.
	 * @exception Exception
	 *                ���ݿ��쳣;
	 */
	public long removeAllRoles() throws Exception {
		return 0;
	}

	/**
	 * ɾ��������Ա��
	 * 
	 * @return true-�����ɹ���false-����ʧ��.
	 * @exception Exception
	 *                ���ݿ��쳣;
	 */
	public long removeAllPersons() throws Exception {

		return 0;
	}

	/**
	 * ɾ��������֯��Ԫ��
	 * 
	 * @return true-�����ɹ���false-����ʧ��.
	 * @exception Exception
	 *                ���ݿ��쳣;
	 */
	public long removeAllUnits() throws Exception {
		return 0;
	}

	/**
	 * �û���֤��
	 * 
	 * @param userAccount
	 *            �û��ʺ�
	 * @param password
	 *            ����
	 * @return true���û�������ȷ false���û����벻��ȷ
	 * @exception Exception
	 *                ���ݿ�����쳣��
	 */
	public boolean validatePassword(String userAccount, String password)
			throws Exception {
		return true;
	}

	/** ********************Util********************* */

	static String replaceString(String str) {
		String sep = "'";
		String rep = "''";
		StringBuffer retVal = new StringBuffer();
		int idx = 0;
		int jdx = str.indexOf(sep);

		while (jdx >= 0) {
			retVal.append(str.substring(idx, jdx));
			retVal.append(rep);
			idx = jdx + sep.length();
			jdx = str.indexOf(sep, idx);
		}
		retVal.append(str.substring(idx));
		return retVal.toString();
	}

	public Vector openAbsoluteRootUnitList() throws Exception {
		Vector  rootOrg = new Vector();
		StringBuffer sb = new StringBuffer();
		sb.append("select F_ORGAN_ID,F_ORGAN_NAME from om_organ_t where F_PARENT_ORGAN_ID IS NULL AND EXISTS (SELECT 1 FROM OM_AREA_T WHERE OM_AREA_T.F_AREA_ID=OM_ORGAN_T.F_AREA_ID AND (F_PARENT_AREA_ID=0 or F_PARENT_AREA_ID IS NULL))");
		try{
			NWResultSet rs = this.persistence.executeQuery(sb.toString());
			while(rs.next()){
				NWUnit unit = new NWUnitImpl(rs.getString("F_ORGAN_ID"),this);
				unit.setName(rs.getString("F_ORGAN_NAME"));
				rootOrg.add(unit);
			}
		}catch(StorageException e){
			throw new Exception("NWOrgImpl-openAbsoluteRootUnitList-SQLException :"+e.getMessage());
		}catch(Exception e){
			throw new Exception("NWOrgImpl-openAbsoluteRootUnitList-Exception :"+e.getMessage());
		}
		return rootOrg;
	}
}

