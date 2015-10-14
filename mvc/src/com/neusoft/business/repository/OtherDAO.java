package com.neusoft.business.repository;

import org.springframework.stereotype.Repository;

import com.neusoft.tdframework.base.BaseDAO;
import com.neusoft.tdframework.entity.User;
@Repository
public class OtherDAO extends BaseDAO{

	public void updateUser() {
		   System.out.println("OtherDAO:::::::::::: em isOpen::: " + em.isOpen());
		   System.out.println("OtherDAO:::::::::::: em.hashCode::: " + em.hashCode());
	}
	
	public void create(User us) {
		System.out.println("????????????????  ==== OtherDAO this.em.getTransaction().hashCode():: " + em.isJoinedToTransaction());
		System.out.println("????????????????  ==== OtherDAO create em.hashCode::: " + em.hashCode());
		//System.out.println("????????????????  ==== create em.hashCode::: " + e);
	    super.save(us);
	}
}
