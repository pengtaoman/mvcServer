package com.lilai.framework.config;

import java.beans.PropertyVetoException;
import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.sql.DataSource;






import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.instrument.classloading.InstrumentationLoadTimeWeaver;
import org.springframework.jdbc.datasource.init.DataSourceInitializer;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.orm.hibernate4.HibernateExceptionTranslator;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.jpa.JpaDialect;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.jta.JtaTransactionManager;

import com.mchange.v2.c3p0.ComboPooledDataSource;

//@Configuration
@EnableTransactionManagement  //(proxyTargetClass=false)
@PropertySource(value = { "classpath:resource/properties/db-config.properties" })
@EnableJpaRepositories
public class PersistenceConfig {

	@Autowired
	private Environment env;


	@Bean(name="transactionManager")
	public PlatformTransactionManager transactionManager() {
		JpaTransactionManager txManager = new JpaTransactionManager();
		txManager.setEntityManagerFactory(entityManagerFactory().getObject());
//		JtaTransactionManager txManager = new JtaTransactionManager();
//		txManager.s
//		HibernateTransactionManager txManager = new HibernateTransactionManager();
//		txManager.set(entityManagerFactory().getObject());
		return txManager;
	}

	@Bean(name="entityManagerFactory")
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
		
		LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();

		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		
		vendorAdapter.setGenerateDdl(Boolean.TRUE);
		vendorAdapter.setShowSql(Boolean.TRUE);
		
		factory.setDataSource(dataSource());
		factory.setJpaVendorAdapter(vendorAdapter);
		factory.setPackagesToScan(env.getProperty("db.entity.package").split(","));

		factory.setLoadTimeWeaver(new InstrumentationLoadTimeWeaver());
		
		Properties jpaProperties = new Properties();
		jpaProperties.put("hibernate.show_sql", Boolean.valueOf(env.getProperty("hibernate.show_sql")));
		jpaProperties.put("hibernate.format_sql", Boolean.valueOf(env.getProperty("hibernate.format_sql")));
		jpaProperties.put("hibernate.show_sql_comments", Boolean.valueOf(env.getProperty("hibernate.show_sql_comments")));
		
		jpaProperties.put("hibernate.dialect", env.getProperty("hibernate.dialect"));
		jpaProperties.put("hibernate.cache.provider_class", env.getProperty("hibernate.cache.provider_class"));
		jpaProperties.put("hibernate.ejb.entitymanager_factory_name", env.getProperty("hibernate.ejb.entitymanager_factory_name"));

		jpaProperties.put("hbm2ddl.auto", env.getProperty("hbm2ddl.auto"));
		
		factory.setJpaProperties(jpaProperties);

		factory.afterPropertiesSet();
		
		
		JpaDialect jpaDialect = vendorAdapter.getJpaDialect();
		System.out.println("??????????????????????????? JpaDialect :  " + jpaDialect.getClass().getName());
		System.out.println("??????????????????????????? getPersistenceUnitName :  " + factory.getPersistenceUnitName());
		return factory;
	}
	
	/**
	@Bean(name="EntityManagerFactoryBean01")
	public LocalContainerEntityManagerFactoryBean entityManagerFactory01() {
		
		LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();

		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		
		vendorAdapter.setGenerateDdl(Boolean.TRUE);
		vendorAdapter.setShowSql(Boolean.TRUE);

		factory.setDataSource(dataSource01());
		factory.setJpaVendorAdapter(vendorAdapter);
		factory.setPackagesToScan(env.getProperty("db.entity.package").split(","));
		
		Properties jpaProperties = new Properties();
		jpaProperties.put("hibernate.show_sql", Boolean.valueOf(env.getProperty("hibernate.show_sql")));
		jpaProperties.put("hibernate.format_sql", Boolean.valueOf(env.getProperty("hibernate.format_sql")));
		jpaProperties.put("hibernate.show_sql_comments", Boolean.valueOf(env.getProperty("hibernate.show_sql_comments")));
		
		jpaProperties.put("hibernate.dialect", env.getProperty("hibernate.dialect"));
		jpaProperties.put("hibernate.cache.provider_class", env.getProperty("hibernate.cache.provider_class"));

		factory.setJpaProperties(jpaProperties);
		factory.afterPropertiesSet();
		
		factory.setLoadTimeWeaver(new InstrumentationLoadTimeWeaver());
		
		JpaDialect jpaDialect = vendorAdapter.getJpaDialect();
		System.out.println("??????????????????????????? JpaDialect :  " + jpaDialect.getClass().getName());

		return factory;
	}
	*/


	@Bean
	public HibernateExceptionTranslator hibernateExceptionTranslator() {
		return new HibernateExceptionTranslator();
	}

	@Bean
	public DataSource dataSource() {
		/**DBCP����
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(env.getProperty("jdbc.driverClassName"));
		dataSource.setUrl(env.getProperty("jdbc.url"));
		dataSource.setUsername(env.getProperty("jdbc.username"));
		dataSource.setPassword(env.getProperty("jdbc.password"));
		*/
        System.out.println("##########  DATABASE POOL #########");
		/**C3P0����*/
		ComboPooledDataSource dataSource = new ComboPooledDataSource();
		try {
			
			dataSource.setDriverClass(env.getProperty("jdbc.driverClassName"));
			dataSource.setJdbcUrl(env.getProperty("jdbc.url"));
			dataSource.setUser(env.getProperty("jdbc.username"));
			dataSource.setPassword(env.getProperty("jdbc.password"));

			dataSource.setMinPoolSize(Integer.valueOf(env.getProperty("min_size")));
			dataSource.setMaxPoolSize(Integer.valueOf(env.getProperty("max_size")));
			dataSource.setMaxIdleTime(Integer.valueOf(env.getProperty("maxIdleTime")));
			dataSource.setMaxStatements(Integer.valueOf(env.getProperty("max_statements")));
			dataSource.setIdleConnectionTestPeriod(Integer.valueOf(env.getProperty("idle_test_period")));
			
			dataSource.setAcquireIncrement(Integer.valueOf(env.getProperty("acquire_increment")));
			
			return dataSource;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	@Bean
	public DataSource dataSource01() {
		/**DBCP����
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(env.getProperty("jdbc.driverClassName"));
		dataSource.setUrl(env.getProperty("jdbc.url"));
		dataSource.setUsername(env.getProperty("jdbc.username"));
		dataSource.setPassword(env.getProperty("jdbc.password"));
		*/

		/**C3P0����*/
		ComboPooledDataSource dataSource = new ComboPooledDataSource();
		try {
			
			dataSource.setDriverClass(env.getProperty("jdbc.driverClassName01"));
			dataSource.setJdbcUrl(env.getProperty("jdbc.url01"));
			dataSource.setUser(env.getProperty("jdbc.username01"));
			dataSource.setPassword(env.getProperty("jdbc.password01"));

			dataSource.setMinPoolSize(Integer.valueOf(env.getProperty("min_size")));
			dataSource.setMaxPoolSize(Integer.valueOf(env.getProperty("max_size")));
			dataSource.setMaxIdleTime(Integer.valueOf(env.getProperty("maxIdleTime")));
			dataSource.setMaxStatements(Integer.valueOf(env.getProperty("max_statements")));
			dataSource.setIdleConnectionTestPeriod(Integer.valueOf(env.getProperty("idle_test_period")));
			
			dataSource.setAcquireIncrement(Integer.valueOf(env.getProperty("acquire_increment")));
			
			return dataSource;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

//	@Bean
//	public DataSourceInitializer dataSourceInitializer(DataSource dataSource) {
//		DataSourceInitializer dataSourceInitializer = new DataSourceInitializer();
//		dataSourceInitializer.setDataSource(dataSource);
//		ResourceDatabasePopulator databasePopulator = new ResourceDatabasePopulator();
//		databasePopulator.addScript(new ClassPathResource("db.sql"));
//		dataSourceInitializer.setDatabasePopulator(databasePopulator);
//		dataSourceInitializer.setEnabled(Boolean.parseBoolean(initDatabase));
//		return dataSourceInitializer;
//	}

}
