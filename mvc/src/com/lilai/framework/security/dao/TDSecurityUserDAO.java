//package com.lilai.framework.security.dao;
//
////import javax.transaction.Transactional;
//
//import java.util.List;
//
//import javax.persistence.EntityManager;
//import javax.persistence.FlushModeType;
//import javax.persistence.PersistenceContext;
//import javax.persistence.Query;
//
//import org.springframework.context.ApplicationContext;
//import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
//import org.springframework.stereotype.Repository;
//
//
//
//import org.springframework.transaction.annotation.Transactional;
//
//import com.google.gson.Gson;
//import com.lilai.framework.base.BaseDAO;
//import com.lilai.framework.entity.User;
//
////@Repository
//public class TDSecurityUserDAO extends BaseDAO{
//	
//	public User getUsers(long id) {
//		User uss = this.em.find(User.class, id);
//        //System.out.println("????????????????  ==== " + uss.getClass().getName());
//        System.out.println("????????????????  ==== em.isJoinedToTransaction():: " + em.isJoinedToTransaction());
//        System.out.println("????????????????  ==== em.getDelegate():: " + em.getDelegate().getClass().getName());
//        System.out.println("????????????????  ==== em.toString():: " + em.toString());
//        //System.out.println("????????????????  ==== em.getTransaction():: " + em.getTransaction().toString());
//        return uss;
//	}
//	
//	public void updateUser() {
//		Query updateQuery = this.em.createNamedQuery("User.UpdatePhone");
//		updateQuery.setFlushMode(FlushModeType.COMMIT);
//		updateQuery.setParameter(1, "130"+Math.round(Math.random()*10000000));
//		updateQuery.setParameter(2, "LN%");
//		updateQuery.executeUpdate();
//	}
//	
//	public void create(User us) {
//		System.out.println("????????????????  ==== UserDAO this.em.getTransaction().hashCode():: " + em.isJoinedToTransaction());
//		System.out.println("????????????????  ==== UserDAO  create em.hashCode::: " + em.hashCode());
//		//System.out.println("????????????????  ==== create em.hashCode::: " + e);
//	    super.save(us);
//	}
//	
//	@SuppressWarnings("unchecked")
//	public List<User> findAllUser() {
//		Query tq = this.em.createNamedQuery("User.FindAll");
//		tq.setFlushMode(FlushModeType.COMMIT);
//		return (List<User>)tq.getResultList();
//	}
//	
//	public void testNamedQuery() {
//		//Query q = this.em.createNamedQuery("User.ColumnResult");
//		org.hibernate.Query q = this.getHibernateSession().getNamedQuery("User.ColumnResult");
//		List lst = q.list();//.getResultList();
//		System.out.println("==::" + new Gson().toJson(lst));
//	}
//	
//	public User findSecurityUserByID(String id) {
//		return this.em.find(User.class, Long.valueOf(id));
//	}
//	
//}
