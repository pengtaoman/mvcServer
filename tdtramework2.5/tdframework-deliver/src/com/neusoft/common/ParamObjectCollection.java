package com.neusoft.common;

/** �洢�������ݵĽ����
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
	//�Ƿ���Ҫ���в������˿���
	private String needFiltrate = "false";
	//������Ĭ�ϱ�ʶ��Ĭ��Ϊ����
	private String selectFlag = "";
	//������������Դ������
	private String paramTableName = "";
	
	/**
	 * �����Ƿ����������ˣ�true,���룻false,������
	 */
	public String getNeedFiltrate() {
		return needFiltrate;
	}

	public void setNeedFiltrate(String needFiltrate) {
		this.needFiltrate = needFiltrate;
	}
	/**
	 * �Ƿ���Ҫ������ ������ ѡ���ʶ��Ĭ��Ϊ��true����Ҫ 
	 */
	public String getSelectFlag() {
		return selectFlag;
	}

	public void setSelectFlag(String selectFlag) {
		this.selectFlag = selectFlag;
	}
	/**
	 * ������������Դ������
	 */
	public String getParamTableName() {
		return paramTableName;
	}

	public void setParamTableName(String paramTableName) {
		this.paramTableName = paramTableName;
	}
	
	/**
	 * �������ݵĵ���
	 */
	public void setCity_code(String city_code) {
		this.city_code = city_code; 
	}
	
	/**
	 * �������ݵ�ҵ������
	 */
	public void setService_kind(int service_kind) {
		this.service_kind = service_kind; 
	}
	
	/**
	 * �������ݵ�ҵ������
	 */
	public void setService_kind_str(String service_kind_str) {
		this.service_kind_str = service_kind_str; 
	}
	
	/**
	 * �������ݵ���ҵ������
	 */
	public void setSub_service_kind(int sub_service_kind) {
		this.sub_service_kind = sub_service_kind; 
	}
	
	/**
	 * �������ݵ���������
	 */
	public void setApply_event(int apply_event) {
		this.apply_event = apply_event; 
	}
	
	/**
	 * �������ݵ�������ʽ
	 */
	public void setInnet_method(int innet_method) {
		this.innet_method = innet_method; 
	}
	
	/**
	 * ���ý�����ı�����
	 */
	public void setTable_name(String table_name) {
		this.table_name = table_name;
	}
	
	/**
	 * ���ý�������ַ��ͱ����ֶ�1
	 */
	public void setPre_var1(String pre_var1) {
		this.pre_var1 = pre_var1;
	}
	/**
	 * ���ý�������ַ��ͱ����ֶ�2
	 */
	public void setPre_var2(String pre_var2) {
		this.pre_var2 = pre_var2;
	}
	/**
	 * ���ý�����������ͱ����ֶ�1
	 */
	public void setPre_num1(long pre_num1) {
		this.pre_num1 = pre_num1;
	}
	/**
	 * ���ý�����������ͱ����ֶ�2
	 */
	public void setPre_num2(long pre_num2) {
		this.pre_num2 = pre_num2;
	}
	
	/**
	 * ��ȡ���ݵĵ�����Ϣ
	 */
	public String getCity_code() {
		return (this.city_code); 
	}
	
	/**
	 * ��ȡ���ݵ�ҵ������
	 */
	public int getService_kind() {
		return (this.service_kind); 
	}
	
	/**
	 * ��ȡ���ݵ�ҵ������
	 */
	public String getService_kind_str() {
		return (this.service_kind_str); 
	}
	
	/**
	 * ��ȡ���ݵ���ҵ������
	 */
	public int getSub_service_kind() {
		return (this.sub_service_kind); 
	}
	
	/**
	 * ��ȡ���ݵ���������
	 */
	public int getApply_event() {
		return (this.apply_event); 
	}
	
	/**
	 * ��ȡ���ݵ�������ʽ
	 */
	public int getInnet_method() {
		return (this.innet_method); 
	}
	
	/**
	 * ��ȡ������ı�����
	 */
	public String getTable_name(){
		return (this.table_name);
	}
	
	/**
	 * ��ȡ������ַ��ͱ����ֶ�1
	 */
	public String getPre_var1(){
		return (this.pre_var1);
	}
	
	/**
	 * ��ȡ������ַ��ͱ����ֶ�2
	 */
	public String getPre_var2(){
		return (this.pre_var2);
	}
	
	/**
	 * ��ȡ�������ֵ�ͱ����ֶ�1
	 */
	public long getPre_num1(){
		return (this.pre_num1);
	}
	
	/**
	 * ��ȡ�������ֵ�ͱ����ֶ�2
	 */
	public long getPre_num2(){
		return (this.pre_num2);
	}
	
	/** ���Ӽ�¼
	 *  ������ʱ���ͱ���.
	 * @param paramObject */
	public void addParamObject(ParamObject paramObject)
	{
		addElement(paramObject);
		addElement(new Long(paramObject.getId()),paramObject);
		
	}
	
	/** ���Ӽ�¼
	 *  ���������ַ��ͱ���ʱ����.
	 * @param paramObject */
	public void addSParamObject(ParamObject paramObject)
	{
		addElement(paramObject);
		addElement(paramObject.getIds(),paramObject);
		
	}
	
	/** ���������Ż������
	 * 
	 * @param index */
	public ParamObject getParamObject(int index)
	{
		return (ParamObject)getElement(index);
	}
	
	/**
		��������id�Ż�ȡ����
	*/
	public ParamObject getParamObjectById(int id){
		return (ParamObject)getElement(new Long(id));	
	}
	
	/**
		�����ַ���id�Ż�ȡ����
	*/
	public ParamObject getParamObjectById(String ids){
		return (ParamObject)getElement(ids);	
	}
	
	/**
		��������id�Ż�ȡ��Ӧ������
	*/
	public String getParamNameById(int id){
		ParamObject paramObject = (ParamObject)getElement(new Long(id));
		if(paramObject==null) return String.valueOf(id);
		else
			return paramObject.getName();
	}
	
	/**
		�����ַ���id�Ż�ȡ��Ӧ������
	*/
	public String getParamNameById(String ids){
		if(ids==null) return "";
		
		ParamObject paramObject = (ParamObject)getElement(ids);
		if(paramObject==null) return ids;
		else
			return paramObject.getName();
	}
	
	/**
		����id�Ż�ȡ��Ӧ��preserve_1 ��ֵ
		����������Ӧinfo_id �Ķ�Ӧ�ֶ�����ʱ�õ�.
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
		
		//�ƽ�����tab
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