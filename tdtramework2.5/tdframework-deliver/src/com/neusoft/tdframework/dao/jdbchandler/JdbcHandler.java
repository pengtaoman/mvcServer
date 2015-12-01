package com.neusoft.tdframework.dao.jdbchandler;

import java.sql.Connection;
import java.sql.Date;
import java.sql.Types;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.SqlReturnResultSet;
import org.springframework.jdbc.object.BatchSqlUpdate;
import org.springframework.jdbc.object.StoredProcedure;

import com.neusoft.tdframework.dao.DataAccessExceptionWrapper;

/**
 * 执行数据库操作的辅助类.开发人员功过JdbcHandler来对数据库进行相关操作.
 * 开发人员在dao中创建JdbcHandler对象,通过调用JdbcHandler的方法来完成相关操作.
 */
public class JdbcHandler {

	private JdbcTemplatePlus jdbcTemplate;

	private BatchSqlUpdate batchSqlUpdate;

	private StoredProcedure storedProcedure;

	private HashMap procedureParamMap;

	private boolean isFunction = false;

	public JdbcHandler(JdbcTemplatePlus jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public JdbcHandler(BatchSqlUpdate batchSqlUpdate) {
		this.batchSqlUpdate = batchSqlUpdate;
	}

	public JdbcHandler(StoredProcedure storedProcedure) {
		this.storedProcedure = storedProcedure;
		procedureParamMap = new HashMap();
	}

	/**
	 * 当前JdbcHandler是否使用单一Connection.
	 * @return 是否使用单一Connection
	 */
	public boolean isUseOneConnection() {
		return jdbcTemplate.isUseOneConnection();
	}

	/**
	 * 设置当前JdbcHandler是否使用单一Connection.
	 * @param useOneConnection
	 */
	public void setUseOneConnection(boolean useOneConnection) {
		jdbcTemplate.setUseOneConnection(useOneConnection);
	}

	
	/**
	 * 设置当前JdbcHandler使用的单一Connection.
	 * @param connection
	 */
	public void setStaticConnection(Connection connection) {
		jdbcTemplate.setStaticConnection(connection);
	}

	
	/**
	 * 取得当前JdbcHandler使用的单一Connection.
	 * @return 单一Connection
	 */
	public Connection getStaticConnection() {
		return jdbcTemplate.getStaticConnection();
	}
	
	

	/**
	 * 执行查询操作(返回多条记录组成的List集合)
	 * @param sql 欲执行的sql语句
	 * @param rch 处理结果集的ResultSetHandler类
	 * @return 结果集合
	 * @throws DataAccessExceptionWrapper
	 */
	public List queryList(String sql, ResultSetHandler rch)
			throws DataAccessExceptionWrapper {
		try {
			jdbcTemplate.query(sql, rch);
			return rch.getRecordList();
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}

	}

	/**
	 * 执行查询操作(返回多条记录组成的List集合),PreparedStatement 方式
	 * @param sql 欲执行的sql语句
	 * @param args sql语句执行所需要参数的集合
	 * @param rch 处理结果集的ResultSetHandler类
	 * @return 结果集合
	 * @throws DataAccessExceptionWrapper
	 */
	public List queryList(String sql, List args, ResultSetHandler rch)
			throws DataAccessExceptionWrapper {
		try {
			jdbcTemplate.query(sql, args != null ? args.toArray() : null, rch);
			return rch.getRecordList();
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}

	}

	/**
	 * 执行查询操作(返回多条记录组成的List集合),PreparedStatement 方式
	 * @param sql 欲执行的sql语句
	 * @param args sql语句执行所需要参数的集合
	 * @param types sql语句执行所需要参数的类型的集合 
	 * @param rch 处理结果集的ResultSetHandler类
	 * @return 结果集合
	 * @throws DataAccessExceptionWrapper
	 */
	public List queryList(String sql, List args, int[] types,
			ResultSetHandler rch) throws DataAccessExceptionWrapper {
		try {
			jdbcTemplate.query(sql, args != null ? args.toArray() : null,
					types, rch);

			return rch.getRecordList();
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}
	}

	
	
	/**
	 * 执行查询操作(返回一单条记录)
	 * @param sql 欲执行的sql语句
	 * @param rch 处理结果集的ResultSetHandler类
	 * @return 结果
	 * @throws DataAccessExceptionWrapper
	 */
	public Object queryOneReocrd(String sql, ResultSetHandler rch)
			throws DataAccessExceptionWrapper {
		try {
			jdbcTemplate.query(sql,rch);
			if (rch.getRecordList() == null || rch.getRecordList().size() < 1) {
				return null;
			}
			return rch.getRecordList().get(0);
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}
	}
	
	/**
	 * 执行查询操作(返回一单条记录),PreparedStatement 方式
	 * @param sql 欲执行的sql语句
	 * @param args sql语句执行所需要参数的集合
	 * @param rch 处理结果集的ResultSetHandler类
	 * @return 结果
	 * @throws DataAccessExceptionWrapper
	 */
	public Object queryOneReocrd(String sql, List args, ResultSetHandler rch)
			throws DataAccessExceptionWrapper {
		try {
			jdbcTemplate.query(sql, args != null ? args.toArray() : null, rch);
			if (rch.getRecordList() == null || rch.getRecordList().size() < 1) {
				return null;
			}
			return rch.getRecordList().get(0);
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}
	}


	/**
	 * 执行查询操作(返回一单条记录),PreparedStatement 方式
	 * @param sql 欲执行的sql语句
	 * @param args sql语句执行所需要参数的集合
	 * @param types sql语句执行所需要参数的类型的集合 
	 * @param rch 处理结果集的ResultSetHandler类
	 * @return 结果
	 * @throws DataAccessExceptionWrapper
	 */
	public Object queryOneReocrd(String sql, List args, int[] types,
			ResultSetHandler rch) throws DataAccessExceptionWrapper {
		try {
			jdbcTemplate.query(sql, args != null ? args.toArray() : null,
					types, rch);
			if (rch.getRecordList() == null || rch.getRecordList().size() < 1) {
				return null;
			}
			return rch.getRecordList().get(0);
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}
	}

	
	/**
	 * 执行更新操作(update insert delete)
	 * @param sql 欲执行的sql语句
	 * @return 更新的返回值 参考jdbc相关规范
	 * @throws DataAccessExceptionWrapper
	 */
	public int update(String sql) throws DataAccessExceptionWrapper {
		try {
			return jdbcTemplate.update(sql);
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}
	}

	/**
	 * 执行更新操作(update insert delete),PreparedStatement 方式
	 * @param sql 欲执行的sql语句
	 * @param args sql语句执行所需要参数的集合
	 * @return 更新的返回值 参考jdbc相关规范
	 * @throws DataAccessExceptionWrapper
	 */
	public int update(String sql, List args) throws DataAccessExceptionWrapper {
		try {
			return jdbcTemplate.update(sql, args.toArray());
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}
	}

	/**
	 * 执行更新操作(update insert delete),PreparedStatement 方式
	 * @param sql 欲执行的sql语句
	 * @param args sql语句执行所需要参数的集合
	 * @param types sql语句执行所需要参数的类型的集合 
	 * @return 更新的返回值 参考jdbc相关规范
	 * @throws DataAccessExceptionWrapper
	 */
	public int update(String sql, List args, int[] types)
			throws DataAccessExceptionWrapper {
		try {
			return jdbcTemplate.update(sql, args.toArray(), types);
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}
	}



	/**
	 * 执行批量更新操作(update insert delete),PreparedStatement 方式
	 * @param sql 欲执行的sql语句
	 * @param batchSize 批处理执行的批次大小(每更新batchSize条,执行一次真正的数据库更新)
	 * @param argsList "每次sql语句执行所需要参数的集合"的集合
	 * @param types sql语句执行所需要参数的类型的集合 
	 * @return 更新的返回值 参考jdbc相关规范
	 * @throws DataAccessExceptionWrapper
	 */
	public int[] updateBatch(String sql, int batchSize, List argsList,
			int[] types) throws DataAccessExceptionWrapper {
		try {
			batchSqlUpdate.setSql(sql);
			batchSqlUpdate.setBatchSize(batchSize);

			for (int i = 0; i < types.length; i++) {
				batchSqlUpdate.declareParameter(new SqlParameter(types[i]));
			}

			batchSqlUpdate.compile();

			for (Iterator itor = argsList.iterator(); itor.hasNext();) {
				batchSqlUpdate.update(((List) (itor.next())).toArray());
			}
			return batchSqlUpdate.flush();
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}
	}

	/**
	 * 执行批量更新操作(update insert delete),PreparedStatement 方式
	 * @param sql 欲执行的sql语句
	 * @param argsList "每次sql语句执行所需要参数的集合"的集合
	 * @param types sql语句执行所需要参数的类型的集合 
	 * @return 更新的返回值 参考jdbc相关规范
	 * @throws DataAccessExceptionWrapper
	 */
	public int[] updateBatch(String sql, List argsList, int[] types)
			throws DataAccessExceptionWrapper {
		try {
			return updateBatch(sql, BatchSqlUpdate.DEFAULT_BATCH_SIZE,
					argsList, types);
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}
	}


	
	/**
	 * 执行存储过程或函数
	 * @return 返回过程的执行结果
	 * @throws DataAccessExceptionWrapper
	 */
	public Map call() throws DataAccessExceptionWrapper {
		try {
			if (storedProcedure.getSql() == null
					|| storedProcedure.getSql().length() < 1) {
				return null;
			}
			storedProcedure.setFunction(isFunction);
			storedProcedure.compile();
			return storedProcedure.execute(procedureParamMap);
		} catch (DataAccessException dex) {
			throw new DataAccessExceptionWrapper(dex);
		}
	}

//	public List queryList(SqlBuilder sqlB, ResultSetHandler rch)
//			throws DataAccessExceptionWrapper {
//		try {
//			jdbcTemplate.query(sqlB.getSQL(), sqlB.getSQLArgs() != null ? sqlB
//					.getSQLArgs().toArray() : null, rch);
//			return rch.getRecordList();
//		} catch (DataAccessException dex) {
//			throw new DataAccessExceptionWrapper(dex);
//		}
//
//	}

//	public List queryOneReocrd(SqlBuilder sqlB, ResultSetHandler rch)
//			throws DataAccessExceptionWrapper {
//		try {
//			jdbcTemplate.query(sqlB.getSQL(), sqlB.getSQLArgs() != null ? sqlB
//					.getSQLArgs().toArray() : null, rch);
//			if (rch.getRecordList() == null || rch.getRecordList().size() < 1) {
//				return null;
//			}
//			return rch.getRecordList();
//		} catch (DataAccessException dex) {
//			throw new DataAccessExceptionWrapper(dex);
//		}
//	}
	
//	public int update(SqlBuilder sqlB) throws DataAccessExceptionWrapper {
//		try {
//			return jdbcTemplate.update(sqlB.getSQL(),
//					sqlB.getSQLArgs() != null ? sqlB.getSQLArgs().toArray()
//							: null);
//		} catch (DataAccessException dex) {
//			throw new DataAccessExceptionWrapper(dex);
//		}
//	}
	
	
	/**
	 * 设置欲执行的存储过程或函数的名称
	 * @param procedureName 存储过程或函数的名称
	 */
	public void setProcedureName(String procedureName) {
		storedProcedure.setSql(procedureName);
	}

	/**
	 * 设置欲执行的存储过程的输入参数(参数类型为字符串)
	 * @param paramName 参数名称
	 * @param value 参数值
	 */
	public void setInParamVarchar(String paramName, String value) {
		setInParam(paramName, value, Types.VARCHAR);
	}

	/**
	 * 设置欲执行的存储过程的输入参数(参数类型为小数)
	 * @param paramName 参数名称
	 * @param value 参数值
	 */
	public void setInParamDouble(String paramName, Double value) {
		setInParam(paramName, value, Types.DOUBLE);
	}

	/**
	 * 设置欲执行的存储过程的输入参数(参数类型为整数)
	 * @param paramName 参数名称
	 * @param value 参数值
	 */
	public void setInParamInteger(String paramName, Integer value) {
		setInParam(paramName, value, Types.INTEGER);
	}

	/**
	 * 设置欲执行的存储过程的输入参数(参数类型为日期)
	 * @param paramName 参数名称
	 * @param value 参数值
	 */
	public void setInParamDate(String paramName, Date value) {
		setInParam(paramName, value, Types.DATE);
	}
	
	/**
	 * 设置欲执行的存储过程的输入参数
	 * @param paramName 参数名称
	 * @param type 参数类型
	 */
	public void setInParam(String paramName, Object value, int type) {
		storedProcedure.declareParameter(new SqlParameter(paramName, type));
		procedureParamMap.put(paramName, value);
	}

	/**
	 * 设置欲执行的存储过程的输出参数(参数类型为结果集)
	 * @param paramName 参数名称
	 * @param rch 处理结果集所用的RowCallbackHandler
	 */
	public void setOutParamResultSet(String paramName, RowCallbackHandler rch) {
		storedProcedure
				.declareParameter(new SqlReturnResultSet(paramName, rch));
	}

	/**
	 * 设置欲执行的存储过程的输出参数(参数类型为字符串)
	 * @param paramName 参数名称
	 */
	public void setOutParamVarchar(String paramName) {
		setOutParam(paramName, Types.VARCHAR);
	}

	/**
	 * 设置欲执行的存储过程的输出参数(参数类型为小数)
	 * @param paramName 参数名称
	 */
	public void setOutParamDouble(String paramName) {
		setOutParam(paramName, Types.DOUBLE);
	}

	/**
	 * 设置欲执行的存储过程的输出参数(参数类型为整数)
	 * @param paramName 参数名称
	 */
	public void setOutParamInteger(String paramName) {
		setOutParam(paramName, Types.INTEGER);
	}

	/**
	 * 设置欲执行的存储过程的输出参数(参数类型为日期)
	 * @param paramName 参数名称
	 */
	public void setOutParamDate(String paramName) {
		setOutParam(paramName, Types.DATE);
	}
	
	/**
	 * 设置欲执行的存储过程的输出参数
	 * @param paramName 参数名称
	 * @param type 参数值
	 */
	public void setOutParam(String paramName, int type) {
		storedProcedure.declareParameter(new SqlOutParameter(paramName, type));
	}

	
	/**
	 * 返回欲执行的是否是一个函数
	 * @return 是否是函数
	 */
	public boolean isFunction() {
		return isFunction;
	}

	/**
	 * 设置欲执行的是否是一个函数
	 * @param isFunction
	 */
	public void setFunction(boolean isFunction) {
		this.isFunction = isFunction;
	}
	
	// ////////////////////////////////////////////
	public JdbcTemplatePlus getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplatePlus jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;

	}

	public StoredProcedure getStoredProcedure() {
		return storedProcedure;
	}

	public void setStoredProcedure(StoredProcedure storedProcedure) {
		this.storedProcedure = storedProcedure;
	}

	public HashMap getProcedureParamMap() {
		return procedureParamMap;
	}

	public void setProcedureParamMap(HashMap procedureParamMap) {
		this.procedureParamMap = procedureParamMap;
	}



	public BatchSqlUpdate getBatchSqlUpdate() {
		return batchSqlUpdate;
	}

	public void setBatchSqlUpdate(BatchSqlUpdate batchSqlUpdate) {
		this.batchSqlUpdate = batchSqlUpdate;
	}

	
	/**
	 * 释放单一Connection链接
	 */
	public void releaseConnection() {
		jdbcTemplate.releaseConnection();
	}

	protected void finalize() throws Throwable {
		super.finalize();
		releaseConnection();
	}
}
