package com.neusoft.om.dao.module;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: module maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface ModuleDAO extends BaseDao {
	/**
	 * ����ģ���ŵõ�ģ����Ϣ
	 * @param moduleId
	 * @return
	 * @throws DataAccessException
	 */
	public ModuleVO getModuleInfoByModuleId(String moduleId) throws DataAccessException;
	/**
	 * ����ϵͳ��ŵõ�ģ����Ϣ����
	 * @param systemId
	 * @return
	 * @throws DataAccessException
	 */
	public ModuleColl getModuleInfoBySystemId(String systemId) throws DataAccessException;
	/**
	 * ����ģ����Ϣ
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddModule(ModuleVO vo) throws DataAccessException;
	/**
	 * �޸�ģ����Ϣ
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyModule(ModuleVO vo) throws DataAccessException;
	/**
	 * ����ģ��idɾ����Ϣ
	 * @param moduleId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteModuleByModuleId(String moduleId) throws DataAccessException;
	/**
	 * ����ϵͳ��ʶɾ��ģ����Ϣ
	 * @param moduleId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteModuleBySystemId(String systemId) throws DataAccessException;
	
}