package com.neusoft.orgimpl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
//import com.neusoft.uniflow.common.NWJDBCOperation;

/**
 * @author admin
 * 
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
public class DBConnManger {

	public static Connection conn = null;

	private static Statement statement = null;

	/** ���ݿ������������ */
	private static String DRIVER;

	/** ���ݿ������ */
	public static int DBTYPE;

	/** ����Դ���� */
	private static String DSN;

	/** ���ݿ��û� */
	private static String USER;

	/** ���ݿ��û����� */
	private static String PASSWORD;

	private static DBConnManger conManager = null;

	public static DBConnManger getIntance() {
		if (conManager == null) {
			conManager = new DBConnManger();
		}
		return conManager;
	}

	public void init(String strConnectString, String strUser, String strPassword) {

		String tempStr = strConnectString.trim();
		System.out.println("[ConnectString:]" + tempStr);
		while (true) {
			if (tempStr == null || tempStr.trim() == "")
				break;

			int i = tempStr.indexOf("#");
			String str1;
			if (i < 0) {
				str1 = tempStr.trim();
			} else {
				str1 = tempStr.substring(0, i).trim();
			}

			int j = str1.indexOf("=");
			String strHead = str1.substring(0, j).trim();
			String strBody = str1.substring(j + 1).trim();
			if (strHead.equalsIgnoreCase("Driver")) {
				DRIVER = strBody;
			}
			if (strHead.equalsIgnoreCase("DSN")) {
				DSN = strBody;
			}
			if (strHead.equalsIgnoreCase("DBType")) {
				DBTYPE = Integer.parseInt(strBody);
			}
			if (i < 0)
				break;
			tempStr = tempStr.substring(i + 1).trim();
		}
		USER = strUser;
		PASSWORD = strPassword;
		System.out.println("[DRIVER:]" + DRIVER);
		System.out.println("[DSN:]" + DSN);
		System.out.println("[DBTYPE:]" + DBTYPE);
		openConnection();

	}

	public synchronized void openConnection() {
		if (conn != null)
			return;
		try {
			Class.forName(DRIVER);
		} catch (Exception ex2) {
		}
		try {
			java.util.Properties prop = new java.util.Properties();
			sun.io.CharToByteConverter objConv = sun.io.CharToByteConverter
					.getDefault();
			String CHARSET = objConv.getCharacterEncoding();

			prop.put("charSet", CHARSET);
			prop.put("user", USER);
			prop.put("password", PASSWORD);
			prop.put("oracle.jdbc.V8Compatible", "true");
			conn = DriverManager.getConnection(DSN, prop);
			System.out.println(conn);
			System.out.println(conn.getMetaData().getDriverName() + " " + conn.getMetaData().getDriverVersion());
			conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
			System.out.println("Time:" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + " Org getConnection.");
		} catch (SQLException e) {
			e.printStackTrace();
			return;
		}
		/*
		if (DBTYPE == NWJDBCOperation.DBTYPE_ORACLE) {
			String strAlterDate = "alter session set NLS_DATE_FORMAT='YYYY-MM-DD HH24:MI:SS'";
			executeSQL(strAlterDate);
		}
		*/
	}

	public void executeSQL(String sql) {

		try {
			if (initStatement()) {
				statement.executeUpdate(sql);
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
	}

	/**
	 * �ж�conn��statement�Ƿ�Ϊnull���������ִ�г�ʼ������true������ǿ�����г�ʼ��������ʼ��ʧ���򷵻�false
	 */

	private boolean initStatement() {
		try {
			if (conn == null) {
				openConnection();
			}
			if (statement == null) {
				statement = conn.createStatement();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			statement = null;
			DBConnManger.close(conn);
			conn = null;
			openConnection();
			try {
				statement = conn.createStatement();
			} catch (SQLException e1) {
				e1.printStackTrace();
				statement = null;
				DBConnManger.close(conn);
				conn = null;
				return false;
			}
		}
		return true;
	}

	/**
	 * 
	 */

	public ResultSet getResultSet(String strSql) {
		ResultSet rs = null;
		try {
			if (initStatement()) { // ��ѯʱÿһ��ִ��initStatement()������
				// initStatement()�Ǳ�֤�ܻ����Ч��conn��statement�����������������Ϊnull����ʹ�������������Ҳ�����κβ�����
				rs = statement.executeQuery(strSql);
			}else{
				System.out.println("Can't initialize the connection to database server!");// �Ѵ�ӡ������һ��
			}
			return rs;
		} catch (SQLException sql) {
//		    System.out.println("getResultSet Error:");
//		    sql.printStackTrace();
//			System.out.println("Connection is invalid��create a connection again!");// �Ѵ�ӡ������һ��
			statement = null;
			DBConnManger.close(conn);
			conn = null;
			openConnection();
			try {
				statement = conn.createStatement();
				rs = statement.executeQuery(strSql);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return rs;
		}
	}

	public static void close(Connection c) {
		try {
			if (c != null)
				c.close();
		} catch (SQLException sqle) {
		}
	}

	public static void close(Statement stmt) {
		try {
			if (stmt != null)
				stmt.close();
		} catch (SQLException sqle) {
		}
	}

	public static void close(PreparedStatement prepstmt) {
		try {
			if (prepstmt != null)
				prepstmt.close();
		} catch (SQLException sqle) {
		}
	}

	public static void close(ResultSet rs) {
		try {
			if (rs != null)
				rs.close();
		} catch (SQLException sqle) {
		}
	}

}
