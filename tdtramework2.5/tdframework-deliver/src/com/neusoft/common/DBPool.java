package com.neusoft.common;

import java.sql.Connection;
import java.sql.SQLException;

public class DBPool {
	
	public static final int ORACLE = 0;
	public static final int DB2 = 1;
	public static final int SYBASE = 2;
	
	private int dbType = ORACLE;
	private static DBPool pool = null;
	
	/**
	 * ����SysParams.properties ��DBPOOL������������Ӧ�����ݶ���
	 * @return
	 */
	public static DBPool getInstance(){
		
		if(pool==null) {
			String dbPool = SysMaint.getSysParams("DBPOOL");
			
			//���Ϊ��,ȱʡ����Դ����
			if(dbPool==null)
				dbPool = "SDBPool";
						
			dbPool = "com.neusoft.common."+dbPool;
			
			//try {
				//pool = (DBPool)Class.forName(dbPool).newInstance();
				pool = SDBPool.getInstance();
			//} catch (InstantiationException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			//} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			//} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			//}
		}
		
		return pool;
	};
	
	public Connection getConn(int system_id) throws SQLException{return null;};
	
	public void disConn(Connection connection){};
	
	/**
	 * �������ݿ������
	 * @author workchenzt
	 *
	 */
	protected void setDbType(int dbType) {
		this.dbType = dbType;
	}
	
	/**
	 * ��ȡ���ݿ����ӵ�����
	 * ORACLE,DB2,SYSBASE��
	 * @author workchenzt
	 *
	 * To change the template for this generated type comment go to
	 * Window - Preferences - Java - Code Generation - Code and Comments
	 */
	public int getDbType() {
		return dbType;
	}
}

