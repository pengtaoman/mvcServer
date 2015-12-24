package com.lilai.framework.entity;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="user") 
@Access(AccessType.FIELD)
@NamedQueries({
	@NamedQuery(name="User.UpdatePhone", 
			query="update User a set a.phoneNum=?1 where a.lastname like ?2"),
	@NamedQuery(name="User.FindAll",  query="SELECT a FROM User a")
})
public class User {
	@Id
	//@GenericGenerator(strategy  = "uuid", name = "a")
	@Column(name="id")
	protected Long id;
	
	@Column(name="lastname")
	protected String lastname;
	
	@Column(name="password")
	protected String password;
	
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	@Column(name="phoneNum")
	protected String phoneNum;
	

	public String getPhoneNum() {
		//return "000" + phoneNum; /**TODO ÿ��findAll��ʹʵ�����Ա䶯�������Զ�update*/
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	
	
}
