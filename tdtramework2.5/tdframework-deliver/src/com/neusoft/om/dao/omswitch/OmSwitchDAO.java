package com.neusoft.om.dao.omswitch;
import java.util.Map;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface OmSwitchDAO extends BaseDao{
	public static final String BEAN = "omSwitchDAO";
	/**
	 * 从开关控制表中获得密码失效前N天提醒信息
	 * 开关表中的参数名: F_MESSAGE_PERIOD
	 * @return OmSwitchVO
	 * @throws DataAccessException
	 */
	public OmSwitchVO getOmSwitchMessagePeriod() throws DataAccessException;
	/**
	 * 从开关控制表中获得密码从设定开始,N天后失效的信息
	 * @return
	 * @throws DataAccessException
	 */
	public OmSwitchVO getOmSwitchPwdEffect() throws DataAccessException;
	/**
	 * 从开关控制表中得到操作员登陆账号是否区分大小写信息
	 * @return
	 * @throws DataAccessException
	 */
	public OmSwitchVO getOmSwitchDifferentiate() throws DataAccessException;
	/**
	 * 从开关参数中获得登陆账号是否区分大小写
	 * ture:区分；false:不区分
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfMatchCase() throws DataAccessException;
	/**
	 * 从开关表中获得删除组织机构和职员时是否需要产品工作流校验
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfNeedProductCheck() throws DataAccessException;
	/**
	 * 从开关表中获得登录时是否需要区分应用
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfCheckapp() throws DataAccessException;
	
	/**
	 * 得到权限版本
	 * @return
	 * @throws DataAccessException
	 */
	public String getPopedomVersion() throws DataAccessException;
	
	/**
	 * 从开关表中获得 日志查询时是否需要显示业务系统菜单的配置
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfShowBusiLog() throws DataAccessException;
	
	/**
	 * 从开关表中获得权限子系统的系统编码。om_switch_t中f_show_busi_log配置为0时，即不需要显示业务系统菜单时需要配置此数据
	 * @return
	 * @throws DataAccessException
	 */
	public String getOmSystemId() throws DataAccessException;
	
	/**
	 * 从开关表中获得登录时是否需要渠道信息的配置
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfNeedDealer() throws DataAccessException;
	
	/**
	 * 从开关表中获得是否需要与客服系统同步数据的配置
	 * @return
	 * @throws DataAccessException
	 */	
	public boolean getIfSynchronize() throws DataAccessException;
	
	/**
	 * 从开关表中获得是否通过统一认证平台管理职员信息
	 * @return
	 * @throws DataAccessException
	 */	
	public boolean getUniauth() throws DataAccessException;
	
	/**
	 * 从开关表中获得在删除职员时是否调用过程取消其分配的任务
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfCancel() throws DataAccessException;
	
	/**
	 * 从开关表中获得最大的区域级别信息，默认为6
	 * @return
	 * @throws DataAccessException
	 */
	public int getMaxAreaLevel() throws DataAccessException;
	
	/**
	 * 得到运营商是联通，还是电信,默认是电信
	 * @return
	 */
	public String getUser() throws DataAccessException;
	
	/**
	 * 得到组织机构的维度，organ表示组织机构不受区域限制，area表示组织机构收到area约束
	 * 默认为area
	 * @return
	 */
	public String getOrganDim() throws DataAccessException;
	
	/**
	 * 从开关表中得到是否记录权限调整日志的参数 1：记录 0：不记录。默认不记录
	 * @return
	 * @throws DataAccessException
	 */
	public int getPowerLog() throws DataAccessException;
	
	/**
	 * 从开关表中得到"是否经过统一认证"的配置，1：返回true 其他返回:false
	 * 此参数只为河北联通使用。配合郎新进行的改造。其余系统均可不配置或配置为其他值。
	 * 默认为false
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfUlp() throws DataAccessException;
	
	/**
	 * 获得是否需要工号分组功能
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getGroup() throws DataAccessException;
	
	/**
	 * 是否使用存储过程记录日志  
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getLogProc() throws DataAccessException;
	/**
	 * 是否自动生成工号 默认不自动
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfAutoWorkNo() throws DataAccessException;
	
	/**
	 * 自动生成的工号中是否包含地市缩写
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfNeedCityShortName() throws DataAccessException;
	
	/**
	 * 自动生成的工号中是否包含职员姓名
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfNeedEmpName() throws DataAccessException;
	
	public Map getSwitchMap() throws DataAccessException;
	
	/**
	 * 是否包含参与人信息，默认包括
	 * @return
	 * @throws DataAccessException
	 */
	public boolean getIfHaveParty() throws DataAccessException;
	
}
