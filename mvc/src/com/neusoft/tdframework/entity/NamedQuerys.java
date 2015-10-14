package com.neusoft.tdframework.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@NamedQueries({
	@NamedQuery(name="User.ColumnResult", 
			query="SELECT a FROM User a")
})
public class NamedQuerys {
	@Id
	Long id;
}
