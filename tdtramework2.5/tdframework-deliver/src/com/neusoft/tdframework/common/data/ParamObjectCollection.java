/*
 * Created on 2004-10-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.common.data;

/** �洢�������ݵĽ����
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
	//�Ƿ���Ҫ���в������˿���
	private String needFiltrate = "false";
	//������Ĭ�ϱ�ʶ��Ĭ��Ϊ����
	private String selectFlag = "";
	//������������Դ������
	private String paramTableName = "";
	//��ѯ������SQL����
	private String salValue = "";
	
	/**
	 * ��ѯ������SQL����
	 */
	public String getSalValue() {
		return salValue;
	}

	public void setSalValue(String salValue) {
		this.salValue = salValue;
	}

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
	 * @param paramObject */
	public void addParamObject(ParamObject paramObject)
	{
		addElement(paramObject);
		addElement(paramObject.getId(),paramObject);
		
	}
	
	/** ���������Ż������,��ArrayList�л�ȡ����
	 * @param index */
	public ParamObject getParamObjectByIndex(int index)
	{
		return (ParamObject)getElement(index);
	}
	
	/**
		����id�Ż�ȡ����,��HashTable�л�ȡ����
	*/
	public ParamObject getParamObjectByKey(String ids){
		return (ParamObject)getElement(ids);	
	}
	
	/**
	 * ͨ�����������ֵɾ��ParamObjectCollection�����е�һ��ParamObject����
	 * @authorliyj
	 */
	public void removeParamObjectByKey(String key){
		//��HashTable������ɾ��
		removeElement(key);
		//��ArrayList������ɾ��
		for(int i=0;i<getRowCount();i++){
			ParamObject paramObject = getParamObjectByIndex(i);
			if(key.equals(paramObject.getId())){
				removeElement(i);
				break;
			}
		}
	}
	
	/**
	 * ͨ�����������ֵɾ��ParamObjectCollection�����е�һ��ParamObject����
	 * @authorliyj
	 */
	public void removeParamObjectByIndex(int index){
		//��ArrayList������ɾ��
		removeElement(index);
		//��HashTable������ɾ��
		for(int i=0;i<getRowCount();i++){
			if(index == i){
				ParamObject paramObject = getParamObjectByIndex(i);
				removeElement(paramObject.getId());
				break;
			}
		}
	}
	
	/**
		����id�Ż�ȡ��Ӧ������
	*/
	public String getParamNameById(String ids){
		if(ids==null) return "";
		
		ParamObject paramObject = (ParamObject)getElement(ids);
		if(paramObject==null) return ids;
		else
			return paramObject.getName();
	}
	
	/**
		�������ƻ�ȡ��Ӧ��Idֵ
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