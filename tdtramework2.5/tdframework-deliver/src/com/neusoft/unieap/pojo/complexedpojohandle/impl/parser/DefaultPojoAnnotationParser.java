package com.neusoft.unieap.pojo.complexedpojohandle.impl.parser;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.beanutils.PropertyUtils;

import com.neusoft.unieap.pojo.complexedpojohandle.ClassRelation;
import com.neusoft.unieap.pojo.complexedpojohandle.IPojoParser;

import com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.util.DefaultAnnontationUtil;
import com.neusoft.unieap.ria.IDataStore;
import com.neusoft.unieap.ria.IMetaData;
import com.neusoft.unieap.ria.impl.DataStore;
import com.neusoft.unieap.ria.impl.MetaData;
import com.neusoft.unieap.ria.impl.MetaDataColumn;
import com.neusoft.unieap.ria.pojo.util.HibernateHelper;






public class DefaultPojoAnnotationParser implements IPojoParser{
      
   
	
	/**
 
	 * Pojos->DataStores

	 * */


	protected IDataStore pojoStore=null;//可以考虑将这个参数放到方法参数里，这样就可以作成单实例的，不过方法间来回传比较讨厌。
	                                    //UniEAP RIA开发模式要求从前台发起请求因此无论如何顶层datastore在后台已经生成。
	
	public DefaultPojoAnnotationParser(IDataStore pojoStore) {
		super();
		this.pojoStore = pojoStore;
	}

	
	
	public <T> List<IDataStore> parser(List<T> objs, Class<T> objcls) {

		
		   List<IDataStore> datastores =new ArrayList<IDataStore>();
			
			
			IDataStore selfDataStore=this.getSelfDataStores(objs);
			if(selfDataStore==null){
				return null;
				
			}
			datastores.add(selfDataStore);
			
			
			
			
			
			
			
			List<ClassRelation> list=DefaultAnnontationUtil.getAllClassRelationsByAnnotation(objcls);
		    Iterator<ClassRelation> it=list.listIterator();
			
	        while(it.hasNext()){
	        	ClassRelation cr=it.next();
					if(this.isOneToOne(cr)){//one to one要被merge,这里先不做,另外多对多(非封閉情况较复杂),多对一先不作
						
						
						
					}else{//一对多 
					
					List<IDataStore> ds=this.createChildrenDataStore(objs,cr);
					
					
					
					if(ds!=null){				   
						datastores.addAll(ds);
				    }
					
					}
		
			
		
				
		}
			
			
			
			
			return datastores;
		
	}
	
	protected boolean isOneToOne(ClassRelation cr){
		
	    return DefaultAnnontationUtil.isOneToOne(cr);
		
	}
	
	
	
	protected boolean isReference(ClassRelation cr){
		
		return false;
		
		
	}
	
	
	protected List<IDataStore> createChildrenDataStore(List objs,ClassRelation cr){
		List<IDataStore> list=new ArrayList<IDataStore>();
		
	   Iterator<Object> it=objs.listIterator();
	   int i=0;
		while(it.hasNext()){
			Object obj=it.next();
			
			if(isReference(cr)){
				
				//这里要考虑datastore复用性,要注意datastore命名
			}else{
				//不需要考虑datastore复用性,直接 new
				
				String getMethod=cr.getGetMethod();
				
				if(getMethod.equalsIgnoreCase(DefaultAnnontationUtil.RULE_BASED_DEFAULT_SET_GET_METHOD)){
					
					String datastoreName=this.pojoStore.getStoreName()+DefaultAnnontationUtil.POJO_PARSER_STORE_SEPERATOR+cr.getDataStoreName()+"_"+i;//这块需要考虑是否有同名场景,另外实际场景下可以考虑直接关联ID
																
					
					List chos=this.getChildObjs(obj,cr);
					
					
					
					List<IDataStore> dses;
					try {
						dses = this.getDataStores(datastoreName,Class.forName(cr.getChildClsName()),chos);
					} catch (ClassNotFoundException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
						dses=new ArrayList();
					}
					
					//this.transformBasePojo(ds,chos);
					
					list.addAll(dses);
					
				}else{//非setget命名方法
					
					
					
				}
				
				
				
			}
			
			i++;
		}
		
		
		return list;
	
	}
	
	
	protected List getChildObjs(Object obj, ClassRelation cr) {
		// TODO Auto-generated method stub
        String gm=cr.getGetMethod();
        List list=null;
        if(gm.equalsIgnoreCase(DefaultAnnontationUtil.RULE_BASED_DEFAULT_SET_GET_METHOD)){
        	
        	
        	
        	String attrName=cr.getFieldName();
        	try {
				 list=(List)PropertyUtils.getProperty(obj,attrName);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
        	
        	
        }else{//对于非set get方法暂时不实现
        	
        	
        	
        }
       if(list==null){
    	   list=new ArrayList();
    	   
       }
		
		return list;
	}




	protected  List<IDataStore> getDataStores(String datastoreName,Class cls, List chos){//简单作,后续细化,特别是datastore名字和dataset名字
		
		IDataStore ds=new DataStore(datastoreName);
		IMetaData md=new  MetaData();
		
		MetaDataColumn mdc=new MetaDataColumn();
				
		mdc.setColumnName("id");
		
		md.addColumn(mdc);
 		ds.setMetaData(md);
 		ds.setRowSetName(cls.getName());
		
		
		
		return  new DefaultPojoAnnotationParser(ds).parser(chos, cls);
		
		
	}
	
	
	
	
	protected void transformBasePojo(IDataStore ds, List objs){
 		HibernateHelper.transformPojo(ds,objs);
	}
	
	
    protected IDataStore getSelfDataStores(List objs){
    	IDataStore ds=(IDataStore) this.pojoStore.clone();
     	this.transformBasePojo(ds,objs);
		
		return ds;
	}
	
	
	/*protected boolean isTopClassed(Class cls){
		
		//ParameterizedType
		
		
		if(!cls.isAnnotationPresent(DefaultPojoAnnotationParser.POJO_PARSER_TOP_CLASS_ANNOTATION_CLASS)){
			return false;			
		}
		
			
		PojoParserClassAnnotation clsano = (PojoParserClassAnnotation)cls.getAnnotation(DefaultPojoAnnotationParser.POJO_PARSER_TOP_CLASS_ANNOTATION_CLASS);
		String[] parents=clsano.parentClass();
		
		if(parents==null||parents.length==0||parents[0].equalsIgnoreCase("")){//没有考虑没有父节点datastore的情况
			
			return true;
		}
			
		
		return false;
		
		
		
	}*/
	
   
	
	
	

}

