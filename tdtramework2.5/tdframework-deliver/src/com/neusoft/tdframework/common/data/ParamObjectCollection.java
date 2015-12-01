/*
 * Created on 2004-10-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.common.data;

/** 存储参数数据的结果集
  * <p>Title: ParamObjectCollection </p>
  * <p>Description: </p>
  	
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p>
  * 
  * @author liyj from old framework
  * @version 1.0 
*/

public class ParamObjectCollection extends ObjectCollection{
	
	private String city_code="";
	private int service_kind=-100;
	private String service_kind_str = "-100";
	private int sub_service_kind=-100;
	private int apply_event=-100;
	private int innet_method=-100;
	private String table_name="";
	private long pre_num1 = -100;
	private long pre_num2 = -100;
	private String pre_var1 = "";
	private String pre_var2 = "";
	//yanglm
	//是否需要进行参数过滤开关
	private String needFiltrate = "false";
	//下拉框默认标识，默认为：空
	private String selectFlag = "";
	//参数过滤数据源表名称
	private String paramTableName = "";
	//查询下拉框SQL备份
	private String salValue = "";
	
	/**
	 * 查询下拉框SQL备份
	 */
	public String getSalValue() {
		return salValue;
	}

	public void setSalValue(String salValue) {
		this.salValue = salValue;
	}

	/**
	 * 设置是否参与参数过滤：true,参与；false,不参与
	 */
	public String getNeedFiltrate() {
		return needFiltrate;
	}

	public void setNeedFiltrate(String needFiltrate) {
		this.needFiltrate = needFiltrate;
	}
	/**
	 * 是否需要下拉框 不区分 选项标识，默认为：true，需要 
	 */
	public String getSelectFlag() {
		return selectFlag;
	}

	public void setSelectFlag(String selectFlag) {
		this.selectFlag = selectFlag;
	}
	/**
	 * 参数过滤数据源表名称
	 */
	public String getParamTableName() {
		return paramTableName;
	}

	public void setParamTableName(String paramTableName) {
		this.paramTableName = paramTableName;
	}
	/**
	 * 设置数据的地市
	 */
	public void setCity_code(String city_code) {
		this.city_code = city_code; 
	}
	
	/**
	 * 设置数据的业务类型
	 */
	public void setService_kind(int service_kind) {
		this.service_kind = service_kind; 
	}
	
	/**
	 * 设置数据的业务类型
	 */
	public void setService_kind_str(String service_kind_str) {
		this.service_kind_str = service_kind_str; 
	}
	
	/**
	 * 设置数据的子业务类型
	 */
	public void setSub_service_kind(int sub_service_kind) {
		this.sub_service_kind = sub_service_kind; 
	}
	
	/**
	 * 设置数据的申请事项
	 */
	public void setApply_event(int apply_event) {
		this.apply_event = apply_event; 
	}
	
	/**
	 * 设置数据的入网方式
	 */
	public void setInnet_method(int innet_method) {
		this.innet_method = innet_method; 
	}
	
	/**
	 * 设置结果集的表名称
	 */
	public void setTable_name(String table_name) {
		this.table_name = table_name;
	}
	
	/**
	 * 设置结果集的字符型备用字段1
	 */
	public void setPre_var1(String pre_var1) {
		this.pre_var1 = pre_var1;
	}
	/**
	 * 设置结果集的字符型备用字段2
	 */
	public void setPre_var2(String pre_var2) {
		this.pre_var2 = pre_var2;
	}
	/**
	 * 设置结果集的数字型备用字段1
	 */
	public void setPre_num1(long pre_num1) {
		this.pre_num1 = pre_num1;
	}
	/**
	 * 设置结果集的数字型备用字段2
	 */
	public void setPre_num2(long pre_num2) {
		this.pre_num2 = pre_num2;
	}
	
	/**
	 * 获取数据的地市信息
	 */
	public String getCity_code() {
		return (this.city_code); 
	}
	
	/**
	 * 获取数据的业务类型
	 */
	public int getService_kind() {
		return (this.service_kind); 
	}
	
	/**
	 * 获取数据的业务类型
	 */
	public String getService_kind_str() {
		return (this.service_kind_str); 
	}
	
	/**
	 * 获取数据的子业务类型
	 */
	public int getSub_service_kind() {
		return (this.sub_service_kind); 
	}
	
	/**
	 * 获取数据的申请事项
	 */
	public int getApply_event() {
		return (this.apply_event); 
	}
	
	/**
	 * 获取数据的入网方式
	 */
	public int getInnet_method() {
		return (this.innet_method); 
	}
	
	/**
	 * 获取结果集的表名称
	 */
	public String getTable_name(){
		return (this.table_name);
	}
	
	/**
	 * 获取结果集字符型备用字段1
	 */
	public String getPre_var1(){
		return (this.pre_var1);
	}
	
	/**
	 * 获取结果集字符型备用字段2
	 */
	public String getPre_var2(){
		return (this.pre_var2);
	}
	
	/**
	 * 获取结果集数值型备用字段1
	 */
	public long getPre_num1(){
		return (this.pre_num1);
	}
	
	/**
	 * 获取结果集数值型备用字段2
	 */
	public long getPre_num2(){
		return (this.pre_num2);
	}
	
	/** 增加记录
	 * @param paramObject */
	public void addParamObject(ParamObject paramObject)
	{
		addElement(paramObject);
		addElement(paramObject.getId(),paramObject);
		
	}
	
	/** 根据索引号获得数据,从ArrayList中获取数据
	 * @param index */
	public ParamObject getParamObjectByIndex(int index)
	{
		return (ParamObject)getElement(index);
	}
	
	/**
		根据id号获取数据,从HashTable中获取数据
	*/
	public ParamObject getParamObjectByKey(String ids){
		return (ParamObject)getElement(ids);	
	}
	
	/**
	 * 通过传入的主键值删除ParamObjectCollection对象中的一个ParamObject对象
	 * @authorliyj
	 */
	public void removeParamObjectByKey(String key){
		//从HashTable对象中删除
		removeElement(key);
		//从ArrayList对象中删除
		for(int i=0;i<getRowCount();i++){
			ParamObject paramObject = getParamObjectByIndex(i);
			if(key.equals(paramObject.getId())){
				removeElement(i);
				break;
			}
		}
	}
	
	/**
	 * 通过传入的索引值删除ParamObjectCollection对象中的一个ParamObject对象
	 * @authorliyj
	 */
	public void removeParamObjectByIndex(int index){
		//从ArrayList对象中删除
		removeElement(index);
		//从HashTable对象中删除
		for(int i=0;i<getRowCount();i++){
			if(index == i){
				ParamObject paramObject = getParamObjectByIndex(i);
				removeElement(paramObject.getId());
				break;
			}
		}
	}
	
	/**
		根据id号获取对应的名称
	*/
	public String getParamNameById(String ids){
		if(ids==null) return "";
		
		ParamObject paramObject = (ParamObject)getElement(ids);
		if(paramObject==null) return ids;
		else
			return paramObject.getName();
	}
	
	/**
		根据名称获取对应的Id值
	*/
	public String getParamIdByName(String strName){
		ParamObject paramObject = new ParamObject();
		for(int i=0;i<getRowCount();i++){
			paramObject = getParamObjectByIndex(i);
			if(strName.equals(paramObject.getName())){
				return paramObject.getId();
			}
		}
		return "";
	}

}