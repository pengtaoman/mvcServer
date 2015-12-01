package com.neusoft.tdframework.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * ����ƴװsql�����ʹ�õĶ���.
 *
 */
public class SqlBuilder {
	
	private StringBuffer outSQL;
	
	private List argList;
	
	private List argTypeList;
	
	private boolean isOK;
	
	private boolean inIf;
	
	public SqlBuilder() {
		outSQL=new StringBuffer();
		init();
	}
	
	public SqlBuilder(int bufferSize) {
		outSQL=new StringBuffer(bufferSize);
		init();
	}
	
	public SqlBuilder(String ssql) {
		outSQL=new StringBuffer(ssql);
		init();
	}
	
	private void init(){
		argList=new ArrayList();
		argTypeList=new ArrayList();
		isOK=false;
		inIf=false;
	}
	
	
	/**
	 * ȡ������ƴװ�ɵ�sql���
	 * @return sql���
	 */
	public String getSQL(){
		return outSQL.toString();
	}
	

	public String toString(){
		return getSQL();
	}
	
	/**
	 * ȡ��sql builder�����е�sql���Ĳ���
	 * @return ������ɵļ���
	 */
	public List getSQLArgs(){
		return argList;
	}
	
	/**
	 * ȡ��sql builder�����е�sql���������͵ļ���
	 * @return ����������ɵļ���
	 */
	public int[] getArgTypes(){
		int[] args=new int[argTypeList.size()];
		for (int i=0;i<argTypeList.size();i++){
			args[i]=((Integer)argTypeList.get(i)).intValue();
		}
		return args;
	}
	
	/**
	 * ��sql builder��׷�� sql���Ƭ��
	 * @param ssql sql���Ƭ��
	 * @return sql builder����
	 */
	public SqlBuilder append(Object ssql){
		if (!inIf||isOK){
			outSQL.append(ssql);
		}
		return this;
	}

	
	/**
	 * ��sql builder�����sql�����������Ĳ�������
	 * @param argType sql���Ĳ��������ͱ�ʶ. �� Types.VARCHAR
	 * @return sql builder����
	 */
	public SqlBuilder addType(int argType){
		if (!inIf||isOK){
			argTypeList.add(new Integer(argType));
		}
		return this;
	}
	
	/**
	 * ��sql builder�����sql�����������Ĳ�������
	 * @param sqlArg sql���Ĳ���. ����PreparedStatement ��ʽ
	 * @return sql builder����
	 */
	public SqlBuilder addArg(Object sqlArg){
		if (!inIf||isOK){
			if(sqlArg==null){
				sqlArg="";
			}
			argList.add(sqlArg);
		}
		return this;
	}
	
	/**
	 * ��sql builder�����sql�����������Ĳ�������
	 * @param sqlArg sql���Ĳ���. ����PreparedStatement ��ʽ
	 * @return sql builder����
	 */
	public SqlBuilder addArg(long sqlArg){
		if (!inIf||isOK){
			argList.add(new Long(sqlArg));
		}
		return this;
	}
	
	/**
	 * ��sql builder�����sql�����������Ĳ�������
	 * @param sqlArg sql���Ĳ���. ����PreparedStatement ��ʽ
	 * @return sql builder����
	 */
	public SqlBuilder addArg(double sqlArg){
		if (!inIf||isOK){
			argList.add(new Double(sqlArg));
		}
		return this;
	}

	
	/**
	 * ����ƥ��:��������һ������ƥ��ʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder elseC(){
		isOK=!isOK;
		return this;
	}
	
	/**
	 * ������һ������ƥ��
	 */
	public void endIf(){
		inIf=false;
	}
	
	/**
	 * ����ƥ��:cObjΪnullʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder ifNull(Object cObj){
		inIf=true;
		isOK=cObj==null;
		return this;
	}
	/**
	 * ����ƥ��:cObj��Ϊnullʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder ifNotNull(Object cObj){
		inIf=true;
		ifNull(cObj);
		isOK=!isOK;
		return this;
	}
	
	/**
	 * ����ƥ��:cObjΪnull��Ϊ�ռ��� ���ַ���ʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder ifEmpty(Object cObj){
		inIf=true;
		if (cObj==null){
			isOK=true;
		}else if (cObj instanceof String){
			isOK=((String)cObj).length()==0;
		}else if(cObj instanceof Collection){
			isOK=((Collection)cObj).isEmpty();
		}else if(cObj instanceof Map){
			isOK=((Map)cObj).isEmpty();
		}else{
			isOK=String.valueOf(cObj).length()==0;
		}

		return this;
	}
	
	/**
	 * ����ƥ��:cObj��ΪnullҲ��Ϊ�ռ��� ���ַ���ʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder ifNotEmpty(Object cObj){
		inIf=true;
		ifEmpty(cObj);
		isOK=!isOK;
		return this;
	}
	
	/**
	 * ����ƥ��:cObj ���� cObj2ʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder ifEquals(Object cObj,Object cObj2){
		inIf=true;
		isOK=cObj==cObj2||cObj2.equals(cObj);
		return this;
	}

	/**
	 * ����ƥ��:cObj ������ cObj2ʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder ifNotEquals(Object cObj,Object cObj2){
		inIf=true;
		ifEquals(cObj,cObj2);
		isOK=!isOK;
		return this;
	}
	
	public SqlBuilder ifEquals(long cObj,long cObj2){
		inIf=true;
		isOK=cObj==cObj2;
		return this;
	}
	
	public SqlBuilder ifNotEquals(long cObj,long cObj2){
		inIf=true;
		ifEquals(cObj,cObj2);
		isOK=!isOK;
		return this;
	}
	
	public SqlBuilder ifEquals(double cObj,double cObj2){
		inIf=true;
		isOK=cObj==cObj2;
		return this;
	}
	
	public SqlBuilder ifNotEquals(double cObj,double cObj2){
		inIf=true;
		ifEquals(cObj,cObj2);
		isOK=!isOK;
		return this;
	}
	
	/**
	 * ����ƥ��:cObj С�� cObj2ʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder ifLess(long cObj,long cObj2){
		inIf=true;
		isOK=cObj<cObj2;
		return this;
	}
	
	/**
	 * ����ƥ��:cObj ���� cObj2ʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder ifGreat(long cObj,long cObj2){
		inIf=true;
		isOK=cObj>cObj2;
		return this;
	}
	
	/**
	 * ����ƥ��:cObj С�ڵ��� cObj2ʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder ifLessEq(long cObj,long cObj2){
		inIf=true;
		isOK=cObj<=cObj2;
		return this;
	}
	
	/**
	 * ����ƥ��:cObj ���ڵ��� cObj2ʱ,���к�������(��append addArg addType).
	 * @return sql builder����
	 */
	public SqlBuilder ifGreatEq(long cObj,long cObj2){
		inIf=true;
		isOK=cObj>=cObj2;
		return this;
	}
	
	public SqlBuilder ifLess(double cObj,double cObj2){
		inIf=true;
		isOK=cObj<cObj2;
		return this;
	}
	
	public SqlBuilder ifGreat(double cObj,double cObj2){
		inIf=true;
		isOK=cObj>cObj2;
		return this;
	}
	
	
	public SqlBuilder ifLessEq(double cObj,double cObj2){
		inIf=true;
		isOK=cObj<=cObj2;
		return this;
	}
	
	public SqlBuilder ifGreatEq(double cObj,double cObj2){
		inIf=true;
		isOK=cObj>=cObj2;
		return this;
	}
	
	
	public SqlBuilder ifLess(String cObj,String cObj2){
		inIf=true;
		isOK=cObj.compareTo(cObj2)<0;
		return this;
	}
	
	public SqlBuilder ifGreat(String cObj,String cObj2){
		inIf=true;
		isOK=cObj.compareTo(cObj2)>0;
		return this;
	}
	
	
	public SqlBuilder ifLessEq(String cObj,String cObj2){
		inIf=true;
		isOK=cObj.compareTo(cObj2)<=0;
		return this;
	}
	
	public SqlBuilder ifGreatEq(String cObj,String cObj2){
		inIf=true;
		isOK=cObj.compareTo(cObj2)>=0;
		return this;
	}
	
	// ���·���ͨ������Ҫ������Աֱ�ӵ���
	
	public void setOutSQL(StringBuffer outSQL) {
		this.outSQL = outSQL;
	}


	public List getArgList() {
		return argList;
	}

	public void setArgList(List argList) {
		this.argList = argList;
	}

	public boolean isOK() {
		return isOK;
	}

	public void setOK(boolean isOK) {
		this.isOK = isOK;
	}
	
	
}
