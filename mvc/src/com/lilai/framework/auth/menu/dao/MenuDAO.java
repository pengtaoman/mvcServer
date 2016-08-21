//package com.lilai.framework.auth.menu.dao;
//
//import java.util.List;
//
//import org.springframework.stereotype.Repository;
//
//import com.lilai.framework.base.BaseDAO;
//import com.lilai.framework.entity.OmMenuT;
//
//
////@Repository
//public class MenuDAO  extends BaseDAO{
//
//	public String createMenu(OmMenuT menu) {
//		return (String)this.getHibernateSession().save(menu);
//	}
//	
//	public List<OmMenuT> getMenu() {
//		List<OmMenuT> lst = this.getHibernateSession().createQuery("SELECT o FROM OmMenuT o").list();
//		for (OmMenuT m : lst) {
//			this.getHibernateSession().update(m.getOmSystemT());
//		}
//		
//		return lst;
//	}
//	
//	public OmMenuT loadMenu(String id) {
//		OmMenuT mm = (OmMenuT) this.getHibernateSession().load(OmMenuT.class, id);
//		String sName = mm.getOmSystemT().getFSystemName();
//		return mm;
//	}
//	
//}
