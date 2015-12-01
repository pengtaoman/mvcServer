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
 * ִ�����ݿ�����ĸ�����.������Ա����JdbcHandler�������ݿ������ز���.
 * ������Ա��dao�д���JdbcHandler����,ͨ������JdbcHandler�ķ����������ز���.
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
	 * ��ǰJdbcHandler�Ƿ�ʹ�õ�һConnection.
	 * @return �Ƿ�ʹ�õ�һConnection
	 */
	public boolean isUseOneConnection() {
		return jdbcTemplate.isUseOneConnection();
	}

	/**
	 * ���õ�ǰJdbcHandler�Ƿ�ʹ�õ�һConnection.
	 * @param useOneConnection
	 */
	public void setUseOneConnection(boolean useOneConnection) {
		jdbcTemplate.setUseOneConnection(useOneConnection);
	}

	
	/**
	 * ���õ�ǰJdbcHandlerʹ�õĵ�һConnection.
	 * @param connection
	 */
	public void setStaticConnection(Connection connection) {
		jdbcTemplate.setStaticConnection(connection);
	}

	
	/**
	 * ȡ�õ�ǰJdbcHandlerʹ�õĵ�һConnection.
	 * @return ��һConnection
	 */
	public Connection getStaticConnection() {
		return jdbcTemplate.getStaticConnection();
	}
	
	

	/**
	 * ִ�в�ѯ����(���ض�����¼��ɵ�List����)
	 * @param sql ��ִ�е�sql���
	 * @param rch ����������ResultSetHandler��
	 * @return �������
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
	 * ִ�в�ѯ����(���ض�����¼��ɵ�List����),PreparedStatement ��ʽ
	 * @param sql ��ִ�е�sql���
	 * @param args sql���ִ������Ҫ�����ļ���
	 * @param rch ����������ResultSetHandler��
	 * @return �������
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
	 * ִ�в�ѯ����(���ض�����¼��ɵ�List����),PreparedStatement ��ʽ
	 * @param sql ��ִ�е�sql���
	 * @param args sql���ִ������Ҫ�����ļ���
	 * @param types sql���ִ������Ҫ���������͵ļ��� 
	 * @param rch ����������ResultSetHandler��
	 * @return �������
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
	 * ִ�в�ѯ����(����һ������¼)
	 * @param sql ��ִ�е�sql���
	 * @param rch ����������ResultSetHandler��
	 * @return ���
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
	 * ִ�в�ѯ����(����һ������¼),PreparedStatement ��ʽ
	 * @param sql ��ִ�е�sql���
	 * @param args sql���ִ������Ҫ�����ļ���
	 * @param rch ����������ResultSetHandler��
	 * @return ���
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
	 * ִ�в�ѯ����(����һ������¼),PreparedStatement ��ʽ
	 * @param sql ��ִ�е�sql���
	 * @param args sql���ִ������Ҫ�����ļ���
	 * @param types sql���ִ������Ҫ���������͵ļ��� 
	 * @param rch ����������ResultSetHandler��
	 * @return ���
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
	 * ִ�и��²���(update insert delete)
	 * @param sql ��ִ�е�sql���
	 * @return ���µķ���ֵ �ο�jdbc��ع淶
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
	 * ִ�и��²���(update insert delete),PreparedStatement ��ʽ
	 * @param sql ��ִ�е�sql���
	 * @param args sql���ִ������Ҫ�����ļ���
	 * @return ���µķ���ֵ �ο�jdbc��ع淶
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
	 * ִ�и��²���(update insert delete),PreparedStatement ��ʽ
	 * @param sql ��ִ�е�sql���
	 * @param args sql���ִ������Ҫ�����ļ���
	 * @param types sql���ִ������Ҫ���������͵ļ��� 
	 * @return ���µķ���ֵ �ο�jdbc��ع淶
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
	 * ִ���������²���(update insert delete),PreparedStatement ��ʽ
	 * @param sql ��ִ�е�sql���
	 * @param batchSize ������ִ�е����δ�С(ÿ����batchSize��,ִ��һ�����������ݿ����)
	 * @param argsList "ÿ��sql���ִ������Ҫ�����ļ���"�ļ���
	 * @param types sql���ִ������Ҫ���������͵ļ��� 
	 * @return ���µķ���ֵ �ο�jdbc��ع淶
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
	 * ִ���������²���(update insert delete),PreparedStatement ��ʽ
	 * @param sql ��ִ�е�sql���
	 * @param argsList "ÿ��sql���ִ������Ҫ�����ļ���"�ļ���
	 * @param types sql���ִ������Ҫ���������͵ļ��� 
	 * @return ���µķ���ֵ �ο�jdbc��ع淶
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
	 * ִ�д洢���̻���
	 * @return ���ع��̵�ִ�н��
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
	 * ������ִ�еĴ洢���̻���������
	 * @param procedureName �洢���̻���������
	 */
	public void setProcedureName(String procedureName) {
		storedProcedure.setSql(procedureName);
	}

	/**
	 * ������ִ�еĴ洢���̵��������(��������Ϊ�ַ���)
	 * @param paramName ��������
	 * @param value ����ֵ
	 */
	public void setInParamVarchar(String paramName, String value) {
		setInParam(paramName, value, Types.VARCHAR);
	}

	/**
	 * ������ִ�еĴ洢���̵��������(��������ΪС��)
	 * @param paramName ��������
	 * @param value ����ֵ
	 */
	public void setInParamDouble(String paramName, Double value) {
		setInParam(paramName, value, Types.DOUBLE);
	}

	/**
	 * ������ִ�еĴ洢���̵��������(��������Ϊ����)
	 * @param paramName ��������
	 * @param value ����ֵ
	 */
	public void setInParamInteger(String paramName, Integer value) {
		setInParam(paramName, value, Types.INTEGER);
	}

	/**
	 * ������ִ�еĴ洢���̵��������(��������Ϊ����)
	 * @param paramName ��������
	 * @param value ����ֵ
	 */
	public void setInParamDate(String paramName, Date value) {
		setInParam(paramName, value, Types.DATE);
	}
	
	/**
	 * ������ִ�еĴ洢���̵��������
	 * @param paramName ��������
	 * @param type ��������
	 */
	public void setInParam(String paramName, Object value, int type) {
		storedProcedure.declareParameter(new SqlParameter(paramName, type));
		procedureParamMap.put(paramName, value);
	}

	/**
	 * ������ִ�еĴ洢���̵��������(��������Ϊ�����)
	 * @param paramName ��������
	 * @param rch �����������õ�RowCallbackHandler
	 */
	public void setOutParamResultSet(String paramName, RowCallbackHandler rch) {
		storedProcedure
				.declareParameter(new SqlReturnResultSet(paramName, rch));
	}

	/**
	 * ������ִ�еĴ洢���̵��������(��������Ϊ�ַ���)
	 * @param paramName ��������
	 */
	public void setOutParamVarchar(String paramName) {
		setOutParam(paramName, Types.VARCHAR);
	}

	/**
	 * ������ִ�еĴ洢���̵��������(��������ΪС��)
	 * @param paramName ��������
	 */
	public void setOutParamDouble(String paramName) {
		setOutParam(paramName, Types.DOUBLE);
	}

	/**
	 * ������ִ�еĴ洢���̵��������(��������Ϊ����)
	 * @param paramName ��������
	 */
	public void setOutParamInteger(String paramName) {
		setOutParam(paramName, Types.INTEGER);
	}

	/**
	 * ������ִ�еĴ洢���̵��������(��������Ϊ����)
	 * @param paramName ��������
	 */
	public void setOutParamDate(String paramName) {
		setOutParam(paramName, Types.DATE);
	}
	
	/**
	 * ������ִ�еĴ洢���̵��������
	 * @param paramName ��������
	 * @param type ����ֵ
	 */
	public void setOutParam(String paramName, int type) {
		storedProcedure.declareParameter(new SqlOutParameter(paramName, type));
	}

	
	/**
	 * ������ִ�е��Ƿ���һ������
	 * @return �Ƿ��Ǻ���
	 */
	public boolean isFunction() {
		return isFunction;
	}

	/**
	 * ������ִ�е��Ƿ���һ������
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
	 * �ͷŵ�һConnection����
	 */
	public void releaseConnection() {
		jdbcTemplate.releaseConnection();
	}

	protected void finalize() throws Throwable {
		super.finalize();
		releaseConnection();
	}
}
