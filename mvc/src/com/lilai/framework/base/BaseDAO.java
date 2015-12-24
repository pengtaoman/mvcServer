package com.lilai.framework.base;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
//import javax.transaction.Transactional;








import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.c3p0.internal.C3P0ConnectionProvider;
import org.springframework.context.support.ApplicationObjectSupport;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



public class BaseDAO extends ApplicationObjectSupport {
	
	@PersistenceContext(unitName="entityManagerFactory")
    protected EntityManager em;
	
	
	C3P0ConnectionProvider dd;
	
	protected Session getHibernateSession() {
		Session session = em.unwrap(org.hibernate.Session.class);
		em.close();
		return session;
	}
	
	
	public void save(Object entity) {
		em.persist(entity);
		
	}
	
	@SuppressWarnings("unchecked")
	public <T> List<T> nativeSQLQuery(String naviveSQL, Class<T> cls , Object... parameters) {
		
		List<T> lst = new ArrayList<T>();
		try {
			lst.add(cls.newInstance());
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}

		/*
		Query query = em.createNativeQuery(naviveSQL, cls);
		int posi = 1;
        for (Object para : parameters) {
        	query.setParameter(posi, para);
        	posi++;
        }
        lst = query.getResultList();	
        */
        
		return lst;
	}


}
