package com.neusoft.tdframework.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 用来拼装sql语句所使用的对象.
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
	 * 取得最终拼装成的sql语句
	 * @return sql语句
	 */
	public String getSQL(){
		return outSQL.toString();
	}
	

	public String toString(){
		return getSQL();
	}
	
	/**
	 * 取得sql builder内所有的sql语句的参数
	 * @return 参数组成的集合
	 */
	public List getSQLArgs(){
		return argList;
	}
	
	/**
	 * 取得sql builder内所有的sql语句参数类型的集合
	 * @return 参数类型组成的集合
	 */
	public int[] getArgTypes(){
		int[] args=new int[argTypeList.size()];
		for (int i=0;i<argTypeList.size();i++){
			args[i]=((Integer)argTypeList.get(i)).intValue();
		}
		return args;
	}
	
	/**
	 * 向sql builder中追加 sql语句片段
	 * @param ssql sql语句片段
	 * @return sql builder本身
	 */
	public SqlBuilder append(Object ssql){
		if (!inIf||isOK){
			outSQL.append(ssql);
		}
		return this;
	}

	
	/**
	 * 向sql builder中添加sql语句所需参数的参数类型
	 * @param argType sql语句的参数的类型标识. 如 Types.VARCHAR
	 * @return sql builder本身
	 */
	public SqlBuilder addType(int argType){
		if (!inIf||isOK){
			argTypeList.add(new Integer(argType));
		}
		return this;
	}
	
	/**
	 * 向sql builder中添加sql语句所需参数的参数类型
	 * @param sqlArg sql语句的参数. 用于PreparedStatement 方式
	 * @return sql builder本身
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
	 * 向sql builder中添加sql语句所需参数的参数类型
	 * @param sqlArg sql语句的参数. 用于PreparedStatement 方式
	 * @return sql builder本身
	 */
	public SqlBuilder addArg(long sqlArg){
		if (!inIf||isOK){
			argList.add(new Long(sqlArg));
		}
		return this;
	}
	
	/**
	 * 向sql builder中添加sql语句所需参数的参数类型
	 * @param sqlArg sql语句的参数. 用于PreparedStatement 方式
	 * @return sql builder本身
	 */
	public SqlBuilder addArg(double sqlArg){
		if (!inIf||isOK){
			argList.add(new Double(sqlArg));
		}
		return this;
	}

	
	/**
	 * 条件匹配:不满足上一个条件匹配时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
	 */
	public SqlBuilder elseC(){
		isOK=!isOK;
		return this;
	}
	
	/**
	 * 结束上一个条件匹配
	 */
	public void endIf(){
		inIf=false;
	}
	
	/**
	 * 条件匹配:cObj为null时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
	 */
	public SqlBuilder ifNull(Object cObj){
		inIf=true;
		isOK=cObj==null;
		return this;
	}
	/**
	 * 条件匹配:cObj不为null时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
	 */
	public SqlBuilder ifNotNull(Object cObj){
		inIf=true;
		ifNull(cObj);
		isOK=!isOK;
		return this;
	}
	
	/**
	 * 条件匹配:cObj为null或为空集合 空字符串时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
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
	 * 条件匹配:cObj不为null也不为空集合 空字符串时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
	 */
	public SqlBuilder ifNotEmpty(Object cObj){
		inIf=true;
		ifEmpty(cObj);
		isOK=!isOK;
		return this;
	}
	
	/**
	 * 条件匹配:cObj 等于 cObj2时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
	 */
	public SqlBuilder ifEquals(Object cObj,Object cObj2){
		inIf=true;
		isOK=cObj==cObj2||cObj2.equals(cObj);
		return this;
	}

	/**
	 * 条件匹配:cObj 不等于 cObj2时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
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
	 * 条件匹配:cObj 小于 cObj2时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
	 */
	public SqlBuilder ifLess(long cObj,long cObj2){
		inIf=true;
		isOK=cObj<cObj2;
		return this;
	}
	
	/**
	 * 条件匹配:cObj 大于 cObj2时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
	 */
	public SqlBuilder ifGreat(long cObj,long cObj2){
		inIf=true;
		isOK=cObj>cObj2;
		return this;
	}
	
	/**
	 * 条件匹配:cObj 小于等于 cObj2时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
	 */
	public SqlBuilder ifLessEq(long cObj,long cObj2){
		inIf=true;
		isOK=cObj<=cObj2;
		return this;
	}
	
	/**
	 * 条件匹配:cObj 大于等于 cObj2时,进行后续操作(如append addArg addType).
	 * @return sql builder本身
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
	
	// 以下方法通常不需要开发人员直接调用
	
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
