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

package org.springframework.session.data.gemfire.config.annotation.web.http.support;

import com.gemstone.gemfire.cache.Cache;
import com.gemstone.gemfire.cache.GemFireCache;
import com.gemstone.gemfire.cache.InterestResultPolicy;
import com.gemstone.gemfire.cache.Region;
import com.gemstone.gemfire.cache.RegionAttributes;
import com.gemstone.gemfire.cache.RegionShortcut;
import com.gemstone.gemfire.cache.client.ClientCache;
import com.gemstone.gemfire.cache.client.ClientRegionShortcut;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.data.gemfire.client.Interest;
import org.springframework.session.ExpiringSession;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

/**
 * The GemFireCacheTypeAwareRegionFactoryBeanTest class is a test suite of test cases
 * testing the contract and functionality of the GemFireCacheTypeAwareRegionFactoryBean
 * class.
 *
 * @author John Blum
 * @since 1.1.0
 * @see org.junit.Rule
 * @see org.junit.Test
 * @see org.junit.rules.ExpectedException
 * @see org.mockito.Mockito
 * @see org.springframework.session.data.gemfire.config.annotation.web.http.support.
 * GemFireCacheTypeAwareRegionFactoryBean
 * @see com.gemstone.gemfire.cache.Cache
 * @see com.gemstone.gemfire.cache.GemFireCache
 * @see com.gemstone.gemfire.cache.InterestResultPolicy
 * @see com.gemstone.gemfire.cache.Region
 * @see com.gemstone.gemfire.cache.RegionAttributes
 * @see com.gemstone.gemfire.cache.RegionShortcut
 * @see com.gemstone.gemfire.cache.client.ClientCache
 * @see com.gemstone.gemfire.cache.client.ClientRegionShortcut
 */
@RunWith(MockitoJUnitRunner.class)
public class GemFireCacheTypeAwareRegionFactoryBeanTest {

	@Rule
	public ExpectedException exception = ExpectedException.none();

	@Mock
	ClientCache mockClientCache;

	@Mock
	Region<Object, ExpiringSession> mockClientRegion;

	@Mock
	Region<Object, ExpiringSession> mockServerRegion;

	private GemFireCacheTypeAwareRegionFactoryBean<Object, ExpiringSession> regionFactoryBean;

	@Before
	public void setup() {
		this.regionFactoryBean = new GemFireCacheTypeAwareRegionFactoryBean<Object, ExpiringSession>();
	}

	@Test
	public void afterPropertiesSetCreatesClientRegionForClientCache() throws Exception {
		this.regionFactoryBean = new GemFireCacheTypeAwareRegionFactoryBean<Object, ExpiringSession>() {
			@Override
			protected Region<Object, ExpiringSession> newClientRegion(
					GemFireCache gemfireCache) throws Exception {
				assertThat(gemfireCache).isSameAs(
						GemFireCacheTypeAwareRegionFactoryBeanTest.this.mockClientCache);
				return GemFireCacheTypeAwareRegionFactoryBeanTest.this.mockClientRegion;
			}

			@Override
			protected Region<Object, ExpiringSession> newServerRegion(
					final GemFireCache gemfireCache) throws Exception {
				assertThat(gemfireCache).isSameAs(
						GemFireCacheTypeAwareRegionFactoryBeanTest.this.mockClientCache);
				return GemFireCacheTypeAwareRegionFactoryBeanTest.this.mockServerRegion;
			}
		};

		this.regionFactoryBean.setGemfireCache(this.mockClientCache);
		this.regionFactoryBean.afterPropertiesSet();

		assertThat(this.regionFactoryBean.getGemfireCache())
				.isSameAs(this.mockClientCache);
		assertThat(this.regionFactoryBean.getObject()).isEqualTo(this.mockClientRegion);
	}

	@Test
	public void afterPropertiesSetCreatesServerRegionForPeerCache() throws Exception {
		final Cache mockCache = mock(Cache.class);

		this.regionFactoryBean = new GemFireCacheTypeAwareRegionFactoryBean<Object, ExpiringSession>() {
			@Override
			protected Region<Object, ExpiringSession> newClientRegion(
					GemFireCache gemfireCache) throws Exception {
				assertThat(gemfireCache).isSameAs(mockCache);
				return GemFireCacheTypeAwareRegionFactoryBeanTest.this.mockClientRegion;
			}

			@Override
			protected Region<Object, ExpiringSession> newServerRegion(
					final GemFireCache gemfireCache) throws Exception {
				assertThat(gemfireCache).isSameAs(mockCache);
				return GemFireCacheTypeAwareRegionFactoryBeanTest.this.mockServerRegion;
			}
		};

		this.regionFactoryBean.setGemfireCache(mockCache);
		this.regionFactoryBean.afterPropertiesSet();

		assertThat(this.regionFactoryBean.getGemfireCache()).isSameAs(mockCache);
		assertThat(this.regionFactoryBean.getObject()).isEqualTo(this.mockServerRegion);
	}

	@Test
	public void allKeysInterestRegistration() {
		Interest<Object>[] interests = this.regionFactoryBean.registerInterests(true);

		assertThat(interests).isNotNull();
		assertThat(interests.length).isEqualTo(1);
		assertThat(interests[0].isDurable()).isFalse();
		assertThat(interests[0].getKey().toString()).isEqualTo("ALL_KEYS");
		assertThat(interests[0].getPolicy()).isEqualTo(InterestResultPolicy.KEYS);
		assertThat(interests[0].isReceiveValues()).isTrue();
	}

	@Test
	public void emptyInterestsRegistration() {
		Interest<Object>[] interests = this.regionFactoryBean.registerInterests(false);

		assertThat(interests).isNotNull();
		assertThat(interests.length).isEqualTo(0);
	}

	@Test
	public void getObjectTypeBeforeInitializationIsRegionClass() {
		assertThat(this.regionFactoryBean.getObjectType()).isEqualTo(Region.class);
	}

	@Test
	public void isSingletonIsTrue() {
		assertThat(this.regionFactoryBean.isSingleton()).isTrue();
	}

	@Test
	public void setAndGetBeanFactory() {
		BeanFactory mockBeanFactory = mock(BeanFactory.class);

		this.regionFactoryBean.setBeanFactory(mockBeanFactory);

		assertThat(this.regionFactoryBean.getBeanFactory()).isEqualTo(mockBeanFactory);
	}

	@Test
	public void setBeanFactoryToNullThrowsIllegalArgumentException() {
		this.exception.expect(IllegalArgumentException.class);
		this.exception.expectMessage("BeanFactory must not be null");
		this.regionFactoryBean.setBeanFactory(null);
	}

	@Test
	public void getBeanFactoryWhenNullThrowsIllegalStateException() {
		this.exception.expect(IllegalStateException.class);
		this.exception.expectMessage(
				"A reference to the BeanFactory was not properly configured");
		this.regionFactoryBean.getBeanFactory();
	}

	@Test
	public void setAndGetClientRegionShortcut() {
		assertThat(this.regionFactoryBean.getClientRegionShortcut()).isEqualTo(
				GemFireCacheTypeAwareRegionFactoryBean.DEFAULT_CLIENT_REGION_SHORTCUT);

		this.regionFactoryBean.setClientRegionShortcut(
			ClientRegionShortcut.LOCAL_PERSISTENT);

		assertThat(this.regionFactoryBean.getClientRegionShortcut())
				.isEqualTo(ClientRegionShortcut.LOCAL_PERSISTENT);

		this.regionFactoryBean.setClientRegionShortcut(null);

		assertThat(this.regionFactoryBean.getClientRegionShortcut()).isEqualTo(
				GemFireCacheTypeAwareRegionFactoryBean.DEFAULT_CLIENT_REGION_SHORTCUT);
	}

	@Test
	public void setAndGetGemfireCache() {
		Cache mockCache = mock(Cache.class);

		this.regionFactoryBean.setGemfireCache(mockCache);

		assertThat(this.regionFactoryBean.getGemfireCache()).isEqualTo(mockCache);
	}

	@Test
	public void setGemfireCacheToNullThrowsIllegalArgumentException() {
		this.exception.expect(IllegalArgumentException.class);
		this.exception.expectMessage("GemFireCache must not be null");
		this.regionFactoryBean.setGemfireCache(null);
	}

	@Test
	public void getGemfireCacheWhenNullThrowsIllegalStateException() {
		this.exception.expect(IllegalStateException.class);
		this.exception.expectMessage(
				"A reference to the GemFireCache was not properly configured");
		this.regionFactoryBean.getGemfireCache();
	}

	@Test
	@SuppressWarnings("unchecked")
	public void setAndGetRegionAttributes() {
		RegionAttributes<Object, ExpiringSession> mockRegionAttributes = mock(
				RegionAttributes.class);

		assertThat(this.regionFactoryBean.getRegionAttributes()).isNull();

		this.regionFactoryBean.setRegionAttributes(mockRegionAttributes);

		assertThat(this.regionFactoryBean.getRegionAttributes())
				.isSameAs(mockRegionAttributes);

		this.regionFactoryBean.setRegionAttributes(null);

		assertThat(this.regionFactoryBean.getRegionAttributes()).isNull();
	}

	@Test
	public void setAndGetRegionName() {
		assertThat(this.regionFactoryBean.getRegionName()).isEqualTo(
				GemFireCacheTypeAwareRegionFactoryBean.DEFAULT_SPRING_SESSION_GEMFIRE_REGION_NAME);

		this.regionFactoryBean.setRegionName("Example");

		assertThat(this.regionFactoryBean.getRegionName()).isEqualTo("Example");

		this.regionFactoryBean.setRegionName("  ");

		assertThat(this.regionFactoryBean.getRegionName()).isEqualTo(
				GemFireCacheTypeAwareRegionFactoryBean.DEFAULT_SPRING_SESSION_GEMFIRE_REGION_NAME);

		this.regionFactoryBean.setRegionName("");

		assertThat(this.regionFactoryBean.getRegionName()).isEqualTo(
				GemFireCacheTypeAwareRegionFactoryBean.DEFAULT_SPRING_SESSION_GEMFIRE_REGION_NAME);

		this.regionFactoryBean.setRegionName(null);

		assertThat(this.regionFactoryBean.getRegionName()).isEqualTo(
				GemFireCacheTypeAwareRegionFactoryBean.DEFAULT_SPRING_SESSION_GEMFIRE_REGION_NAME);
	}

	@Test
	public void setAndGetServerRegionShortcut() {
		assertThat(this.regionFactoryBean.getServerRegionShortcut()).isEqualTo(
				GemFireCacheTypeAwareRegionFactoryBean.DEFAULT_SERVER_REGION_SHORTCUT);

		this.regionFactoryBean.setServerRegionShortcut(RegionShortcut.LOCAL_PERSISTENT);

		assertThat(this.regionFactoryBean.getServerRegionShortcut())
				.isEqualTo(RegionShortcut.LOCAL_PERSISTENT);

		this.regionFactoryBean.setServerRegionShortcut(null);

		assertThat(this.regionFactoryBean.getServerRegionShortcut()).isEqualTo(
				GemFireCacheTypeAwareRegionFactoryBean.DEFAULT_SERVER_REGION_SHORTCUT);
	}

}
