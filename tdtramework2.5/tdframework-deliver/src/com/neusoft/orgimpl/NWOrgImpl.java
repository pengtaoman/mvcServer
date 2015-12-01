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
	 * 设置连接参数，连接服务器。
	 * 
	 * @param strConnectString
	 *            连接字符串。 对于数据库，包括驱动程序、数据源等；对于LDAP，包括服务器名、端口等。
	 * @param strUser
	 *            登录服务器的用户
	 * @param strPassword
	 *            用户口令
	 * @exception Exception
	 *                连接服务器异常
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
	 * 断开服务器连接，释放资源。
	 * 
	 * @exception Exception
	 */
	public void uninitialize() throws Exception {
	}

	/**
	 * 根据角色名称取得角色对象。
	 * 
	 * @param roleName
	 *            角色名称
	 * @return 成功返回角色对象，失败返回null。
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
	 * 根据角色标识取得角色对象。
	 * 
	 * @param roleID
	 *            角色标识
	 * @return 成功返回角色对象，失败返回null。
	 * @exception Exception
	 *                数据库错误;
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
	 * 取得组织机构中所有角色。
	 * 
	 * @return 角色对象集合.
	 */
	public Vector openRoleList() throws Exception {
		Vector roles = new Vector();
		NWResultSet rs = null;
		try{
			 rs = persistence.executeQuery("select F_ORGAN_ID,F_ORGAN_NAME from OM_ORGAN_T");// 取得所有部门
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
	 * 取得组织机构中所有游离角色列表。
	 * 
	 * @return 角色对象集合
	 * @exception Exception
	 *                数据库异常;
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
	 * 取得组织机构中所有根角色列表。
	 * 
	 * @return 角色对象集合
	 * @exception Exception
	 *                数据库异常;
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
	 * 根据人员帐号取得人员对象。
	 * 
	 * @param strPersonAccount
	 *            人员帐号
	 * @return 成功返回人员对象,失败返回null。
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
	 * 根据人员标识取得人员对象。
	 * 
	 * @param strPersonID
	 *            人员标识
	 * @return 成功返回人员对象,失败返回null。
	 * @exception Exception
	 *                数据库错误;
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
	 * 取得组织机构中所有的人员。
	 * 
	 * @return 人员对象集合。
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
	 * 取得组织机构的人员数量。
	 * 
	 * @return 人员总数。
	 * @exception Exception
	 *                数据库异常;
	 */
	public long getPersonNum() throws Exception {
		return 0;
	}

	/**
	 * 取得组织机构中所有的组织单元。
	 * 
	 * @return 组织单元对象集合。
	 */
	public Vector openUnitList() throws Exception {
		Vector units = new Vector();
		
		return units;
	}

	/**
	 * 根据组织单元名称取得组织单元对象。
	 * 
	 * @param strUnitName
	 *            组织单元名称
	 * @return 成功返回组织单元对象，失败返回null。
	 */
	public NWUnit getUnitByName(String strUnitName) throws Exception {
		return null;
	}

	/**
	 * 根据组织单元标识取得组织单元对象。
	 * 
	 * @param strUnitID
	 *            组织单元标识
	 * @return 成功返回组织单元对象，失败返回null。
	 * @exception Exception
	 *                数据库错误;
	 */
	public NWUnit getUnit(String strUnitID) throws Exception {
		NWUnit unit = null;
		unit = new NWUnitImpl(strUnitID,this);
		return unit;
	}

	/**
	 * 指定连接的组织结构名称。 当组织机构数据源支持多个组织机构时，需设置该属性。
	 * 
	 * @param strOrgName
	 *            组织机构名称
	 */
	public void setOrgName(String strOrgName) {
	}

	/**
	 * 添加一个新的角色。
	 * 
	 * @return 返回新添加的角色对象。
	 * @exception Exception
	 */
	public NWRole createRole(String roleID) throws Exception {
		return null;
	}

	/**
	 * 添加一个新人员。
	 * 
	 * @return 返回新添加的人员对象。
	 * @exception Exception
	 */
	public NWPerson createPerson(String personID) throws Exception {
		return null;
	}

	/**
	 * 添加一个新的组织单元。
	 * 
	 * @return 新添加的组织单元对象。
	 * @exception Exception
	 */
	public NWUnit createUnit(String unitID) throws Exception {
		return null;
	}

	/**
	 * 删除一个角色。
	 * 
	 * @param strRoleID
	 *            角色对象标识
	 * @exception Exception
	 *                数据库错误;
	 */
	public int removeRole(String strRoleID) throws Exception {
		return 0;
	}

	/**
	 * 删除一个人员。
	 * 
	 * @param strPersonID
	 *            人员对象标识
	 * @exception Exception
	 *                数据库错误;
	 */
	public int removePerson(String strPersonID) throws Exception {
		return 0;
	}

	/**
	 * 删除一个组织单元。
	 * 
	 * @param objUnit
	 *            组织单元对象标识
	 * @exception Exception
	 *                数据库错误;
	 */
	public int removeUnit(String strUnitID) throws Exception {
		return 0;
	}

	/**
	 * 删除所有角色。
	 * 
	 * @return true-操作成功，false-操作失败.
	 * @exception Exception
	 *                数据库异常;
	 */
	public long removeAllRoles() throws Exception {
		return 0;
	}

	/**
	 * 删除所有人员。
	 * 
	 * @return true-操作成功，false-操作失败.
	 * @exception Exception
	 *                数据库异常;
	 */
	public long removeAllPersons() throws Exception {

		return 0;
	}

	/**
	 * 删除所有组织单元。
	 * 
	 * @return true-操作成功，false-操作失败.
	 * @exception Exception
	 *                数据库异常;
	 */
	public long removeAllUnits() throws Exception {
		return 0;
	}

	/**
	 * 用户验证。
	 * 
	 * @param userAccount
	 *            用户帐号
	 * @param password
	 *            密码
	 * @return true－用户密码正确 false－用户密码不正确
	 * @exception Exception
	 *                数据库操作异常；
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

