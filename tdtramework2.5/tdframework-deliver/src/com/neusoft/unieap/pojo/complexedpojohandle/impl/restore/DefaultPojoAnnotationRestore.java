package com.neusoft.unieap.pojo.complexedpojohandle.impl.restore;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.beanutils.PropertyUtils;

import com.neusoft.unieap.pojo.complexedpojohandle.ClassRelation;
import com.neusoft.unieap.pojo.complexedpojohandle.IPojoRestore;
import com.neusoft.unieap.pojo.complexedpojohandle.impl.annotation.util.DefaultAnnontationUtil;
import com.neusoft.unieap.ria.IDataStore;
import com.neusoft.unieap.ria.pojo.model.PojoEntity;
import com.neusoft.unieap.ria.pojo.util.HibernateHelper;

public class DefaultPojoAnnotationRestore  implements IPojoRestore{
	/**
	 * DataStores->Pojos
	 * */
	
	public <T> List<T> restore(List<IDataStore> stores, Class<T> cls) {
		// TODO Auto-generated method stub
		
		IDataStore topds=this.getTopDataStoreByClass(stores,cls,true);
		List topObjs=this.createPojoList(topds);
		
		
		
		Iterator<PojoEntity> it =topObjs.iterator();
	   int i=0;
		while(it.hasNext()){
			
		   this.injectComplexChilds(stores, it.next(),cls,topds.getStoreName(),i);
		   i++;
		}
	
		
		return topObjs;
		
		
	}
	
	
	private List createPojoList(IDataStore topds) {//需要重写，要考虑增删改查的状态
		// TODO Auto-generated method stub
		
		
		
		Iterator<PojoEntity> it=HibernateHelper.createPojoList(topds).getPojoList().iterator();
		List result=new ArrayList();
		while(it.hasNext()){
			result.add(it.next().getPojoObj());
		}
		
		return result;
	}

  //由于基于序列号作所以必须传序列号 这块在正式作的时候要改成基于父pojo主键，这里的i是父pojo在期List种的顺序，这样在实际作是不行的，原型验证可以
	protected void injectComplexChilds(List<IDataStore> stores,Object topObj,Class cls,String parentStoreName, int i){//topObjs不一定有实例所以必须传clss
		
		List<ClassRelation> list=DefaultAnnontationUtil.getAllClassRelationsByAnnotation(cls);
	    Iterator<ClassRelation> it=list.listIterator();
	
        while(it.hasNext()){
        	ClassRelation cr=it.next();
				if(this.isOneToOne(cr)){//one to one要被merge,这里先不做,另外多对多(非封閉情况较复杂),多对一先不作
					
					
					
				}else{//一对多 
				
					
					try {
					
						this.injectComplexChild(stores,topObj,cr,parentStoreName,  i);
						
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
			               
				
				}
	
		
	     
			
	   }
		
		
		
	}
	

	protected void injectComplexChild(List<IDataStore> stores, Object topObj, ClassRelation cr,String parentStoreName, int i) {
		// TODO Auto-generated method stub
	
		
		String chStoreName=parentStoreName+DefaultAnnontationUtil.POJO_PARSER_STORE_SEPERATOR+cr.getDataStoreName()+"_"+i;
		System.out.println(chStoreName);
		IDataStore ds=this.getDataStoreByName(stores,chStoreName,true);
		List Objs=this.createPojoList(ds);
		
		try {
			
			PropertyUtils.setProperty(topObj, cr.getFieldName(), Objs);
			Iterator it=Objs.iterator();
		int j=0;
		while(it.hasNext()){
	
			this.injectComplexChilds(stores, it.next(), Class.forName(cr.getChildClsName()),chStoreName,j);
			j++;
		
		}
		
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}




	private IDataStore getDataStoreByName(List<IDataStore> stores,
			String dataStoreName,boolean moveDataStoreInList) {
		// TODO Auto-generated method stub
		Iterator<IDataStore> it=stores.iterator();
		while(it.hasNext()){
             IDataStore tm=it.next();
			
			if(tm.getStoreName().equals(dataStoreName)){
				if(moveDataStoreInList){
				stores.remove(tm);
				}
				return tm;
			}
			
		}
		return null;
	}


	protected IDataStore getTopDataStoreByClass(List<IDataStore> stores, Class cls,boolean moveTopDataStoreInList) {
		// TODO Auto-generated method stub
	
		Iterator<IDataStore> it=stores.iterator();
		while(it.hasNext()){
			IDataStore tm=it.next();
			
			if(DefaultAnnontationUtil.isTopDataStore(tm,cls)){
				if(moveTopDataStoreInList){
					stores.remove(tm);
					}
				return tm;
			}
		}
		
		return null;
	}

	protected boolean isOneToOne(ClassRelation cr) {
		// TODO Auto-generated method stub
		return DefaultAnnontationUtil.isOneToOne(cr);
	}

	
	
}
