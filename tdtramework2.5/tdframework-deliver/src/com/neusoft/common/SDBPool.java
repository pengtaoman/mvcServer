
package com.neusoft.common;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Hashtable;
import java.util.ResourceBundle;

import javax.naming.Context;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.springframework.jdbc.datasource.DataSourceUtils;

import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.interfase.authorize.DataSourceDAOImpl;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/** ���ݿ�С���߿�
  * <p>Title: </p>
  * <p>Description: </p>
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: </p>
  * 
  * @author Chenzt
  * @version 1.0 
*/
public class SDBPool extends DBPool{
	//private static final String FILENAME = "SDBPool.conf";
	private static Hashtable dataSource = new Hashtable();
	private static SDBPool instance = null;
	//private static Hashtable fileConf = null;
	private static ResourceBundle fileConf = null;
	private static SysLog sysLog = SysLog.getInstance(new Long(0));
	private static String className = SDBPool.class.getName();
	private DataSource dataSource2;
	
	
	/** Ĭ�Ϲ��췽������ɳ�ʼ������
	 * Ϊ��֤��ʵ����Ψһ�ԣ��ʽ��乹�캯������Ϊ private
	 * 
	 * @throws java.lang.Exception */
	public SDBPool()
	{
		//fileConf = SysMaint.readFile(FILENAME);
		//fileConf = ResourceBundle.getBundle("DBPool");
		log(1,"SDBPOOL ���췽��","����SDBPOOL����");
		
		//���dataSourceDAO
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        DataSourceDAOImpl dataSourceDAO = (DataSourceDAOImpl) factory.getInteractionObject("dataSourceDAO", appContext);
		dataSource2 = dataSourceDAO.getDataSource();
		String dbName = null;
		try{
			dbName = fileConf.getString("DBNAME");
		}catch(Exception e) {
			dbName = "ORACLE";
		}
		
		log(1,"���ݿ�����",dbName);
		
		if(dbName == null)
			dbName = "ORACLE";
		
		if(dbName.intern()=="ORACLE".intern())
			setDbType(DBPool.ORACLE);
		
		if(dbName.intern()=="DB2".intern())
			setDbType(DBPool.DB2);
		
		if(dbName.intern()=="SYBASE".intern())
			setDbType(DBPool.SYBASE);
	}
	
	public static DBPool getInstance()
	{
		if (instance == null)
			instance = new SDBPool();
				
		return instance;
	}
	
	/** ȡ�����ݿ�����
	 * 
	 * @param system_id
	 * @return
	 * @throws SQLException
	 * @throws NamingException */
	public Connection getConn(int system_id)
	{
		Connection connection = null;		
		connection = DataSourceUtils.getConnection(dataSource2);
	return connection;
	
	}
	
	/** �Ͽ����ݿ�����
	 * 
	 * @param connection */
	public void disConn(Connection connection){
		DataSourceUtils.releaseConnection(connection, dataSource2);
	}

	/** 
	 д��־���� 
 	*/
	private void log(int level,String function,String info){

		if(level==1)	//debug
			sysLog.debug(this.className,function,"chenzt",info,sysLog.BY_SERVER);
		else if(level==2)
			sysLog.info(this.className,function,"server",info,sysLog.BY_SERVER);
		else if(level==3)
			sysLog.error(this.className,function,"server",info,sysLog.BY_SERVER);	
	}

	
	/** ���Է���
	 * 
	 * @param args */
	public static void main(String[] args)
	{
	
		DBPool dbPool = null;
		Connection conn = null;
		PreparedStatement prepStmt = null;
		ResultSet rs = null;
	
	  try {
	  	
	    dbPool = SDBPool.getInstance();
	    System.out.println("hehehe");
	    conn = dbPool.getConn(40);
	    prepStmt = conn.prepareStatement("select * from bm_city_id_t");
	    rs = prepStmt.executeQuery();
	
	    while(rs.next()){
	      String cityCode = rs.getString("city_code");
	      int cityLevel = rs.getInt("city_level");
	      String cityName = rs.getString("city_name");
	
	      System.out.println("city code is: " + cityCode);
	      System.out.println("city level is: " + cityLevel);
	      System.out.println("city name is: " + cityName);
	    }
	  } catch(Exception e){
	      System.out.println("java.lang.Exception in main method: " + e.getMessage());}
	  finally{
	    try{
	    rs.close();
	    prepStmt.close();
	    dbPool.disConn(conn);
	    }
	    catch(SQLException e){
	    	System.out.println("Error: " + e.getMessage());}
	  } //End final 
	}

}

