package com.neusoft.common;

/** 存储参数数据的结果集
  * <p>Title: ParamObjectCollection </p>
  * <p>Description: </p>
  	
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p>
  * 
  * @author Chenzt
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
	 *  当主键时整型变量.
	 * @param paramObject */
	public void addParamObject(ParamObject paramObject)
	{
		addElement(paramObject);
		addElement(new Long(paramObject.getId()),paramObject);
		
	}
	
	/** 增加记录
	 *  当主键是字符型变量时调用.
	 * @param paramObject */
	public void addSParamObject(ParamObject paramObject)
	{
		addElement(paramObject);
		addElement(paramObject.getIds(),paramObject);
		
	}
	
	/** 根据索引号获得数据
	 * 
	 * @param index */
	public ParamObject getParamObject(int index)
	{
		return (ParamObject)getElement(index);
	}
	
	/**
		根据整型id号获取数据
	*/
	public ParamObject getParamObjectById(int id){
		return (ParamObject)getElement(new Long(id));	
	}
	
	/**
		根据字符型id号获取数据
	*/
	public ParamObject getParamObjectById(String ids){
		return (ParamObject)getElement(ids);	
	}
	
	/**
		根据整型id号获取对应的名称
	*/
	public String getParamNameById(int id){
		ParamObject paramObject = (ParamObject)getElement(new Long(id));
		if(paramObject==null) return String.valueOf(id);
		else
			return paramObject.getName();
	}
	
	/**
		根据字符型id号获取对应的名称
	*/
	public String getParamNameById(String ids){
		if(ids==null) return "";
		
		ParamObject paramObject = (ParamObject)getElement(ids);
		if(paramObject==null) return ids;
		else
			return paramObject.getName();
	}
	
	/**
		根据id号获取对应的preserve_1 的值
		在受理方案对应info_id 的对应字段名称时用到.
	*/
	public String getParamPreserve_1ById(int id){
		ParamObject paramObject = (ParamObject)getElement(new Long(id));
		if(paramObject==null) return "";
		else
			return paramObject.getPreserve_1();
	}

	
/*	
	public String toString(int tabs,String tabName){
		StringBuffer ret = new StringBuffer();
		
		//推进几个tab
		String str_tab="";
		
		for(int i=0;i<tabs;i++)
			str_tab = str_tab + "\t";
		
		ret.append(str_tab).append("<").append(tabName).append(">\n");
		
		for(int i=0;i<this.getRowCount();i++){
			this.getParamObject(i).toString(tabs+1);	
		}
		
		ret.append(str_tab).append("/<").append(tabName).append(">\n");
		return ret.toString();
	}
*/

}