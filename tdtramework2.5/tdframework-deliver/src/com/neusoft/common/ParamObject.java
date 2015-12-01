package com.neusoft.common;

import java.util.HashMap;

/** �����ľ�̬������.
  * <p>Title: ParamObject </p>
  * <p>Description: </p>
  	Ӧ����ʢװ���м�С�������, ��������������. 
  	���ѯ�ṹ��ID�����ֵ�ת��.
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p>
  * 
  * @author Chenzt
  * @version 1.0 
*/

public class ParamObject{

	int id;			//���ͱ�ʶ
	String ids = null;	//�ַ��ͱ�ʶ
	String name;	//����
	String oper_level;	//��������
	
	int preserve1;		//���� int �ֶ�1
	int preserve2;		//���� int �ֶ�2
	int preserve3;		//���� int �ֶ�3
	
	String preserve_1;	//���� String �ֶ�1
	String preserve_2;	//���� String �ֶ�2
	String preserve_3;	//���� String �ֶ�3
	
	boolean flag1=false;		//�Ƿ�ʹ���˱����ֶ�preserve1
	boolean flag2=false;		//�Ƿ�ʹ���˱����ֶ�preserve2
	boolean flag3=false;		//�Ƿ�ʹ���˱����ֶ�preserve3

	boolean flag_1=false;		//�Ƿ�ʹ���˱����ֶ�preserve_1
	boolean flag_2=false;		//�Ƿ�ʹ���˱����ֶ�preserve_2
	boolean flag_3=false;		//�Ƿ�ʹ���˱����ֶ�preserve_3
	
	private String filterDataInfo;
	private HashMap paramMap = new HashMap();
	private int filterDataFlag = -1;
	
	public int getFilterDataFlag() {
		return filterDataFlag;
	}

	public void setFilterDataFlag(int filterDataFlag) {
		this.filterDataFlag = filterDataFlag;
	}

	public void setParamKey(String key,String value) {
		this.paramMap.put(key,value);
	}
	
	public String getFilterDataInfo() {
		return filterDataInfo;
	}

	public void setFilterDataInfo(String filterDataInfo) {
		this.filterDataInfo = filterDataInfo;
	}

	public HashMap getParamMap() {
		return paramMap;
	}

	public void setParamMap(HashMap paramMap) {
		this.paramMap = paramMap;
	}

	/**
	�չ��췽��
	*/
	public ParamObject(){}
	
	/**
	����һ���µĶ���
	*/
	public ParamObject(ParamObject other) {
		if(this != other) {
			this.id = other.id;
			this.name = other.name;
		}
	}
	
	/**
		�������ͱ�ʶ
	*/
	public void setId(int id) {
		this.id = id; 
	}

	/**
		�����ַ��ͱ�ʶ
	*/
	public void setIds(String ids) {
		this.ids = ids; 
	}
	
	/**
		���ò�������
	*/
	public void setOper_level(String oper_level) {
		this.oper_level = oper_level; 
	}
	
	/**
	��������
	*/
	public void setName(String name) {
		this.name = name; 
	}
	
	/**
		��ȡ��ʶ
	*/
	public int getId() {
		return (this.id); 
	}
	
	/**
		��ȡ��ʶ
	*/
	public String getIds() {
		return (this.ids); 
	}
	
	/**
	��ȡ��������
	*/
	public String getOper_level(){
		return (this.oper_level);	
	}
	
	/**
	��ȡ����
	*/
	public String getName() {
		return (this.name); 
	}
	
	/**
	���ñ��� int �ֶ�1
	*/
	public void setPreserve1(int preserve1){
		this.preserve1 = preserve1;
		setFlag1(true);
	}

	/**
	��ȡ���� int �ֶ�1
	*/
	public int getPreserve1(){
		return this.preserve1;	
	}
	
	/**
		�����Ƿ�ʹ���˱����ֶ�1, ȱʡ�����������Ϊ��ʹ��
	*/
	public void setFlag1(boolean flag1){
		this.flag1 = flag1;	
	}
	
	/**
	���ñ��� int �ֶ�2
	*/
	public void setPreserve2(int preserve2){
		this.preserve2 = preserve2;
		setFlag2(true);
	}

	/**
	��ȡ���� int �ֶ�2
	*/
	public int getPreserve2(){
		return this.preserve2;	
	}
	
	/**
		�����Ƿ�ʹ���˱����ֶ�2, ȱʡ�����������Ϊ��ʹ��
	*/
	public void setFlag2(boolean flag2){
		this.flag2 = flag2;	
	}
	
	/**
	���ñ��� int �ֶ�3
	*/
	public void setPreserve3(int preserve3){
		this.preserve3 = preserve3;
		setFlag3(true);
	}

	/**
	��ȡ���� int �ֶ�3
	*/
	public int getPreserve3(){
		return this.preserve3;	
	}

	/**
		�����Ƿ�ʹ���˱����ֶ�3, ȱʡ�����������Ϊ��ʹ��
	*/
	public void setFlag3(boolean flag3){
		this.flag3 = flag3;	
	}
	
	/**
	���ñ��� String �ֶ�1
	*/
	public void setPreserve_1(String preserve_1){
		this.preserve_1 = preserve_1;
		setFlag_1(true);
	}

	/**
	��ȡ���� String �ֶ�1
	*/
	public String getPreserve_1(){
		return this.preserve_1;	
	}

	/**
		�����Ƿ�ʹ���˱����ֶ�_1, ȱʡ�����������Ϊ��ʹ��
	*/
	public void setFlag_1(boolean flag_1){
		this.flag_1 = flag_1;	
	}
	
	/**
	��ȡ���� String �ֶ�2
	*/
	public String getPreserve_2(){
		return this.preserve_2;	
	}
	
	/**
	���ñ��� String �ֶ�2
	*/
	public void setPreserve_2(String preserve_2){
		this.preserve_2 = preserve_2;
		setFlag_2(true);
	}

	/**
		�����Ƿ�ʹ���˱����ֶ�_2, ȱʡ�����������Ϊ��ʹ��
	*/
	public void setFlag_2(boolean flag_2){
		this.flag_2 = flag_2;	
	}

	/**
	��ȡ���� String �ֶ�3
	*/
	public String getPreserve_3(){
		return this.preserve_3;	
	}
	
	/**
	 * ���ñ��� String �ֶ�2
	 */
	public void setPreserve_3(String preserve_3){
		this.preserve_3 = preserve_3;
		setFlag_3(true);
	}
	
	/**
		�����Ƿ�ʹ���˱����ֶ�_1, ȱʡ�����������Ϊ��ʹ��
	*/
	public void setFlag_3(boolean flag_3){
		this.flag_3 = flag_3;	
	}
	
	/**
	ת��Ϊ�ַ�
	*/
	public String toString(int tabs,String id) {
        boolean isId = true;
        if(ids!=null)isId = false;
		StringBuffer ret = new StringBuffer();
		//�ƽ�����tab
		String str_tab=SysMaint.tabs(tabs);
		int selectedID=-100 ;
        
//        System.out.println("id: "+id);
		
		if(isId){
			if(id.intern()!="".intern()){
				selectedID=Integer.parseInt(id);
			}
		}
        
        if(isId){
            if(this.id==selectedID ){
                ret.append(str_tab).append("<option value='"+this.id+"' selected>\n"); 
            }else{
                ret.append(str_tab).append("<option value='"+this.id+"'>\n");
            }
        }else{
            if(this.ids.equals(id) ){
                ret.append(str_tab).append("<option value='"+this.ids+"' selected>\n"); 
            }else{
                ret.append(str_tab).append("<option value='"+this.ids+"'>\n");
            }
        }
        
//        
//		if(isId && (this.id==selectedID || this.ids.equals(id))){
//			if(ids==null){
//				ret.append(str_tab).append("<option value='"+this.id+"' selected>\n");
//			}else
//				ret.append(str_tab).append("<option value='"+nvl(this.ids)+"' selected>\n");
//		}else{
//			if(ids==null)
//				ret.append(str_tab).append("<option value='"+this.id+"'>\n");
//			else
//				ret.append(str_tab).append("<option value='"+nvl(this.ids)+"'>\n");
//		}
		
		ret.append(str_tab).append("	").append("<caption>").append(nvl(this.name)).append("</caption>\n");
			ret.append(str_tab).append("	").append("<Preserve_3>").append(nvl(this.preserve_3)).append("</Preserve_3>\n");
		
		ret.append(str_tab).append("</option>\n");
		return ret.toString();
	}	
	/**
	ת��Ϊ�ַ�
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		
		//�ƽ�����tab
		String str_tab=SysMaint.tabs(tabs);
		
		ret.append(str_tab).append("<option>\n");
		if(ids==null)
			ret.append(str_tab).append("	").append("<value>").append(this.id).append("</value>\n");
		else
			ret.append(str_tab).append("	").append("<value>").append(nvl(this.ids)).append("</value>\n");
		ret.append(str_tab).append("	").append("<caption>").append(nvl(this.name)).append("</caption>\n");
		if(flag1)
			ret.append(str_tab).append("	").append("<Preserve1>").append(this.preserve1).append("</Preserve1>\n");
		if(flag2)
			ret.append(str_tab).append("	").append("<Preserve2>").append(this.preserve2).append("</Preserve2>\n");
		if(flag3)
			ret.append(str_tab).append("	").append("<Preserve3>").append(this.preserve3).append("</Preserve3>\n");
		if(flag_1)
			ret.append(str_tab).append("	").append("<Preserve_1>").append(nvl(this.preserve_1)).append("</Preserve_1>\n");
		if(flag_2)	
			ret.append(str_tab).append("	").append("<Preserve_2>").append(nvl(this.preserve_2)).append("</Preserve_2>\n");
		if(flag_3)
			ret.append(str_tab).append("	").append("<Preserve_3>").append(nvl(this.preserve_3)).append("</Preserve_3>\n");
		
		ret.append(str_tab).append("</option>\n");
		return ret.toString();
	}	
	private String nvl(String str){
		return SysMaint.prepareXml(str==null?"":str);
	}
	
}
