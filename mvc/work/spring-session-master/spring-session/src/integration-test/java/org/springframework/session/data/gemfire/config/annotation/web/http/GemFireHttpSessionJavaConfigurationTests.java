/*
 * Copyright 2014-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.session.data.gemfire.config.annotation.web.http;

import java.util.Properties;

import com.gemstone.gemfire.cache.Cache;
import com.gemstone.gemfire.cache.DataPolicy;
import com.gemstone.gemfire.cache.ExpirationAction;
import com.gemstone.gemfire.cache.Region;
import com.gemstone.gemfire.cache.RegionShortcut;
import com.gemstone.gemfire.cache.query.Index;
import com.gemstone.gemfire.cache.query.QueryService;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.gemfire.CacheFactoryBean;
import org.springframework.session.ExpiringSession;
import org.springframework.session.data.gemfire.AbstractGemFireIntegrationTests;
import org.springframework.session.data.gemfire.support.GemFireUtils;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The GemFireHttpSessionJavaConfigurationTests class is a test suite of test cases
 * testing the configuration of Spring Session backed by GemFire using Java-based
 * configuration meta-data.
 *
 * @author John Blum
 * @since 1.1.0
 * @see org.junit.Test
 * @see org.springframework.session.ExpiringSession
 * @see org.springframework.session.data.gemfire.AbstractGemFireIntegrationTests
 * @see org.springframework.test.annotation.DirtiesContext
 * @see org.springframework.test.context.ContextConfiguration
 * @see org.springframework.test.context.junit4.SpringJUnit4ClassRunner
 * @see org.springframework.test.context.web.WebAppConfiguration
 * @see com.gemstone.gemfire.cache.Cache
 * @see com.gemstone.gemfire.cache.Region
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@DirtiesContext
@WebAppConfiguration
public class GemFireHttpSessionJavaConfigurationTests
		extends AbstractGemFireIntegrationTests {

	@Autowired
	private Cache gemfireCache;

	protected <K, V> Region<K, V> assertCacheAndRegion(Cache gemfireCache,
			String regionName, DataPolicy dataPolicy) {
		assertThat(GemFireUtils.isPeer(gemfireCache)).isTrue();

		Region<K, V> region = gemfireCache.getRegion(regionName);

		assertRegion(region, regionName, dataPolicy);

		return region;
	}

	@Test
	public void gemfireCacheConfigurationIsValid() {
		Region<Object, ExpiringSession> example = assertCacheAndRegion(this.gemfireCache,
				"JavaExample", DataPolicy.REPLICATE);

		assertEntryIdleTimeout(example, ExpirationAction.INVALIDATE, 900);
	}

	@Test
	public void verifyGemFireExampleCacheRegionPrincipalNameIndexWasCreatedSuccessfully() {
		Region<Object, ExpiringSession> example = assertCacheAndRegion(this.gemfireCache,
				"JavaExample", DataPolicy.REPLICATE);

		QueryService queryService = example.getRegionService().getQueryService();

		assertThat(queryService).isNotNull();

		Index principalNameIndex = queryService.getIndex(example, "principalNameIndex");

		assertIndex(principalNameIndex, "principalName", example.getFullPath());
	}

	@Test
	public void verifyGemFireExampleCacheRegionSessionAttributesIndexWasNotCreated() {
		Region<Object, ExpiringSession> example = assertCacheAndRegion(this.gemfireCache,
				"JavaExample", DataPolicy.REPLICATE);

		QueryService queryService = example.getRegionService().getQueryService();

		assertThat(queryService).isNotNull();

		Index sessionAttributesIndex = queryService.getIndex(example,
				"sessionAttributesIndex");

		assertThat(sessionAttributesIndex).isNull();
	}

	@EnableGemFireHttpSession(indexableSessionAttributes = {}, maxInactiveIntervalInSeconds = 900, regionName = "JavaExample", serverRegionShortcut = RegionShortcut.REPLICATE)
	public static class GemFireConfiguration {

		@Bean
		Properties gemfireProperties() {
			Properties gemfireProperties = new Properties();
			gemfireProperties.setProperty("name",
					GemFireHttpSessionJavaConfigurationTests.class.getName());
			gemfireProperties.setProperty("mcast-port", "0");
			gemfireProperties.setProperty("log-level", "warning");
			return gemfireProperties;
		}

		@Bean
		CacheFactoryBean gemfireCache() {
			CacheFactoryBean cacheFactory = new CacheFactoryBean();

			cacheFactory.setClose(true);
			cacheFactory.setProperties(gemfireProperties());

			return cacheFactory;
		}
	}

}
