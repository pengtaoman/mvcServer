/**
 * 
 */
package com.neusoft.tdframework.authorization;

import java.util.List;

import com.neusoft.tdframework.core.BaseBO;

/**
 * @projectName tdframework
 * @Description 
 * @author likj 2010-6-27 下午12:13:01
 * @email li.kj@neusoft.com
 * @copyright NeuSoft
 */
public interface AuthLoginCheckBO extends BaseBO {
	
	/**
	 * 删除登录失败日志
	 * @param id
	 * @return
	 */
	public boolean delLoginLog(String id);
	
	/**
	 * 对登录失败日志做删除标记
	 * @param id
	 * @return
	 */
	public boolean updateLoginLog(String id);
	
	/**
	 * 删除登录失败统计
	 * @param id
	 * @return
	 */
	public boolean delLoginCount(String id);
	
	/**
	 * 添加登录失败日志
	 * @param vo
	 * @return
	 */
	public boolean addLoginLog(LoginFailLogVO vo);
	
	/**
	 * 添加登录失败计数
	 * @param vo
	 * @return
	 */
	public boolean addLoginCount(LoginFailCountVO vo);
	
	/**
	 * 修改登录失败计数
	 * @param vo
	 * @return
	 */
	public int updateLoginCount(LoginFailCountVO vo);
	
	/**
	 * 查询登录失败日志
	 * @param id
	 * @return
	 */
	public List<LoginFailLogVO> getLoginLogList(String id);
	
	/**
	 * 查询登录失败计数
	 * @param id
	 * @return
	 */
	public List<LoginFailCountVO> getLoginCountList(String id);
	
	/**
     * 是否存在登录失败日志
     * @param id
     * @return
     */
	public boolean isLoginLog(String id);
	
	/**
	 * 是否存在登录失败统计数
	 * @param id
	 * @return
	 */
	public boolean isLoginCount(String id);
	
	
	/**
	 * 统计同一账户登录次数是否大于等于6次
	 * @param id
	 * @param count
	 * @return
	 */
	public boolean countLogin(String id, int count);
	
	/**
	 * 统计同一账户登录次数是否大于15次
	 * @param id
	 * @param count
	 * @return
	 */
	public boolean countTotalLogin(String id, int count);
	
	/**
	 * 解锁
	 * @param vo
	 * @return
	 */
	public void unLock(LoginFailCountVO vo);
	
	/**
	 * 加锁
	 * @param vo
	 * @return
	 */
	public void lock(LoginFailCountVO vo);
	
	/**
	 * 验证账户是否被锁
	 * @param id
	 * @return
	 */
	public boolean isLock(String id);
	
	/**
	 * 验证账户是否存在
	 * @param id
	 * @return
	 */
	public boolean isExistUser(String id);
	

}
