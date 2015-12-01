dojo.require("unieap.global");
dojo.require("unieap.util.util");
dojo.provide("unieap.clientCache.googlegear");
/**
 * @declaredClass:
 * 		unieap.cache
 * @summary:
 * 		缓存操作底层接口,用于操作google gears
 * @example:
 * |<script type="text/javascript">
 * |	//判断google gears是否可用
 * |	var isCacheUsable=unieap.cache.isAvailable();
 * |	alert(isCacheUsable);
 * |</script>
 * @example:
 * |<script type="text/javascript">
 * |	//获得缓存在google gears中的总记录数
 * |	var totalCount=unieap.cache.getCount();
 * |</script>
 * @example:
 * |<script type="text/javascript">
 * |	//删除google gears中缓存的所有数据
 * |	unieap.cache.clear();
 * |</script>
 */
dojo.declare("unieap.clientCache", null, {
	
	//gears中要创建的database的名字
	DB_NAME : "com_neusoft_unieap_clientcache",
	
	//gears中要创建的table的名字
	CODELIST_TABLE_NAME : "unieap_codelist_table",
	
	constructor: function(param) {
		dojo.mixin(this, param);
	},
	
	
	_cache_db : null,
	
	
	//判断是否安装了goole gears插件
	_isInstalledGears:function(){
		if (window.google && google.gears) {
			return google.gears;
		}
		var factory = null;
		
		// Firefox
		if (typeof GearsFactory != 'undefined') {
			factory = new GearsFactory();
		} else {
			// IE
			try {
				factory = new ActiveXObject('Gears.Factory');
				if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
					factory.privateSetGlobalObject(this);
				}
			} catch (e) {
				// Safari
				if ((typeof navigator.mimeTypes != 'undefined')
						&& navigator.mimeTypes["application/x-googlegears"]) {
					factory = document.createElement("object");
					factory.style.display = "none";
					factory.width = 0;
					factory.height = 0;
					factory.type = "application/x-googlegears";
					document.documentElement.appendChild(factory);
				}
			}
		}
		if (!factory) {
			return null;
		}
		if (!window.google) {
			google = {};
		}
		if (!google.gears) {
			google.gears = {
				factory : factory
			};
		}
		return google.gears;
	},
	
	//初始化google gears的 database,创建一个db
	//如果用户没有安装googel gears提示用户安装,如果用户选择不安装,下次用户登入时
	_initDB : function() {
		if(!this.isAvailable()){
			return null;
		}
		if (this._cache_db) {
			return this._cache_db;
		}
		try {
			this._cache_db = google.gears.factory.create('beta.database');
			this._cache_db.open(this.DB_NAME);
			//_cache_db.execute('drop table '+unieap.cache.CODELIST_TABLE_NAME);
			this._cache_db.execute("CREATE TABLE IF NOT EXISTS "
					+ this.CODELIST_TABLE_NAME + "(key TEXT,value TEXT,timestamp INT)");
			this._cache_db.execute("CREATE UNIQUE INDEX IF NOT EXISTS key_index"
					+ " ON " + this.CODELIST_TABLE_NAME + " (key)");
		} catch (e) {
			//alert("必须设置Google Gears可以运行!");
			this._cache_db=null;
		}
		return this._cache_db;
	},
	
	
	/**
	 *@summary:
	 * 		判断goole gears是否可用
	 * @description:
	 * 		如果gears没有安装或者用户在gloabal.js中设置unieap.global.isUseClientCache为false，
	 * 		程序返回的也为false
	 */
	isAvailable : function(){
		return unieap.global.isUseClientCache 
				&& this._isInstalledGears()!=null;
	},
	
	//清除gears中codelist_table表的所有记录
	/**
	 *@summary:
	 * 		清除gears中codelist_table表的所有记录
	 * @example:
	 * |<script>
	 * |	unieap.cache.clear();
	 * |</script> 	
	 * 通过unieap的debug工具查看缓存数据是否被清空	
	 */
	clear : function() {
		var db = this._initDB();
		if (db == null) {
			return;
		}
		db.execute("DELETE FROM " + this.CODELIST_TABLE_NAME);
	},
	
	//往codelist_table表中插入数据
	//unieap.cache.put('name','neusoft');
	//如果不设置timestamp,timestamp值为默认为1
	/**
	 *@summary:
	 * 		往codelist_table表中插入数据
	 * @param：
	 * 		{string} key  
	 * @param：
	 * 		{string} value 
	 * @param：
	 * 		{string} timestamp   
	 * @example:
	 * |<script>
	 * |	var value = "[
	 * |		{CODEVALUE:1,CODENAME:'汉族'},
	 * |		{CODEVALUE:2,CODENAME:'回族'},
	 * |		{CODEVALUE:3,CODENAME:'白族'}
	 * |	]";
	 * |	unieap.cache.put("dept",value,String(new Date().getTime()));
	 * |</script> 
	 * 通过unieap的debug工具查看缓存数据是否被清空
	 */
	put : function(key, value,timestamp) {
		var db = this._initDB();
		if (db == null) {
			return;
		}
		db.execute("REPLACE INTO " + this.CODELIST_TABLE_NAME
				+ " VALUES (?,?,?)", [key, value,timestamp||1]);
	},
	
	//往codelist_table表中插入数据
	//unieap.cache.putMultiple(['name','age'],['neusoft',20]);
	//如果不设置timestamp,timestamp值为默认为1
	putMultiple : function(keys, values,timestamps) {
		var db = this._initDB();
		if (db == null) {
			return;
		}
		db.execute("BEGIN TRANSACTION");
		var _stmt = "REPLACE INTO " + this.CODELIST_TABLE_NAME
				+ " VALUES (?, ?,?)";
		for (var i = 0,j = 0,k=0, key, value,timestamp; (key = keys[i++]) && (value = values[j++])&&(timestamp=timestamps&&timestamps[k++]||1);) {
		
			db.execute(_stmt, [key, value,timestamp]);
		}
		db.execute("COMMIT TRANSACTION");
	},
	
	//从codelist_table表中获取数据
	////unieap.cache.get('name')=>'neusoft'
	get : function(key) {
		var db = this._initDB();
		var value = null;
		if (db == null) {
			return value;
		}
		var rs = db.execute("SELECT value FROM " + this.CODELIST_TABLE_NAME
				+ " WHERE key = ?", [key]);
		while (rs.isValidRow()) {
			value = rs.field(0);
			rs.next();
		}
		rs.close();
		return value;
	},
	
	//删除codelist_table表中的一条记录
	//unieap.cache.remove('name')=>key为name的信息被删除了
	remove : function(key) {
		var db = this._initDB();
		if (db == null) {
			return;
		}
		db.execute("DELETE FROM " + this.CODELIST_TABLE_NAME
				+ " WHERE key = ?", [key]);
	},
	
	//获取codelist_table表中的所有keys值
	getKeys : function(){
	    var db = this._initDB();
		var value = [];
		if (db == null) {
			return null;
		}
		var rs = db.execute("SELECT key FROM " + this.CODELIST_TABLE_NAME);
		while (rs.isValidRow()) {
			value.push(rs.field(0));
			rs.next();
		}
		rs.close();
		return value;
	},
	
	//获取codelist_table表中的总记录数
	getCount : function() {
		var db = this._initDB();
		if (db == null) {
			return null;
		}
		var rs = db.execute("SELECT count(*) FROM " + this.CODELIST_TABLE_NAME);
		return rs.field(0);
	},
	
	//获取codelist_table表中所有记录的timestamp
	//返回值为一个object,格式为obj[key]=timestamp
	//查找的时间戳大于2649600000,也就是大于1970年1月1日
	getAllTimeStamps : function(){
		var db = this._initDB();
		if (db == null) {
			return null;
		}
		var rs = db.execute("SELECT key,timestamp FROM " + this.CODELIST_TABLE_NAME+' WHERE timestamp>2649600000');
		var value={}
		while(rs.isValidRow()){
			value[rs.field(0)]=rs.field(1);
			rs.next();
		}
		return value;
	}
	
});
