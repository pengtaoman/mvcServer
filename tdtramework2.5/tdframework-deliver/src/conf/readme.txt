说明、总结及注意事项：

1.xml映射文件的命名空间必须确保唯一性：<mapper namespace="Ibatis3Users"></mapper>

2.在所有xml映射文件中id取值必须保持唯一性，如果不是唯一性在调用时必须加入命名空间：
<select id="selectByLikeCount"  parameterType="ibatis3users" resultType="int"></select>
上述代码中id取值，否则在代码中调用时候必须：
List rList = super.baseService.queryByStatement("OrdersRefGoods.selectAllOrders", org);
List rList = super.baseService.queryByStatement("Ibatis3Orders.selectAllOrders", orders);

3.在一对多关联关系中：
<collection property="ibatis3OrdersList" column="userId=userId" select="Ibatis3Orders.selectByProperties" />
上述代码select取值必须由命名空间开头

4.在iBatis中与Hibernate一样，同样存在N+1问题，解决方案见用例

5.级联关系：目前只对select操作作级联，insert、delete、update操作由程序员维护

6.CodeGen中generator.properties文件里的jdbc.schema对于Oracle数据不能为空，取值为登录数据库的大写账号

7.因工具是根据表结构模型生成相应代码，故建表时每张表必须有唯一主键标识，且主键定义为varchar2(32)，框架会模仿Hibernate思想为我们生成32位随机字符串

8.当利用iBatis3返回一个map数据集时，key值必须保持与数据库字段一致，Oracle数据库区分大小写

9.注意模板中代码生成格式：
<result property="memo" column="memo" javaType="java.lang.String" jdbcType="VARCHAR" />
javaType必须跟数据类型全路径，jdbcType必须跟数据库中对应字段类型相一致，且数据类型区分大小写，Oracle数据数据类型默认均为大写

10.通过CodeGen工具所生成的代码切勿修改，我们需遵循OC原则，程序员可以自行在所生成的xml文件下方编写自己的业务代码

11.实现基于SOA、OSGI架构思想设计，不断趋于component、plugin方式编程

12.逐渐放弃spring容器，采用guice容器置换，避免对bean xml的解析耗时

13.待解决guice中事务、aop、安全身份认真等方面问题

14.区别ibatis2与ibatis3，整体ibatis性能要逊色于纯jdbc，存在明显的问题是mapping xml解析比较耗时

15.避免过度封装和过度设计，秉承“少继承、少依赖、零配置”原则，让java的垃圾回收机制及java的反射机制得以最大效用

16.考虑高度解耦，为component、plugin方式编程提供前提必要条件

17.考虑新技术引入的风险评估与规避，同时要考虑新技术引入的必要性

18.代码中不易采用过多的注解方式编程，由于注解编程思想是利用了java的反射机制实现，执行效率有待考究，且注解方式可读性不强

19.代码注释的利弊，注释不易过多，因所写代码都需不断的重构，故以往所写的注释未及时变更往往失去他的生命力，反而会误导后来者

20.ibatis2与ibaits3区别：
  a.ibaits3支持泛化，增加接口绑定特性，ibatis2则需强转，提供全新注解方式；
  b.ibaits3 xml标签格式有所变化，模仿了JSTL的标签写法；
  c.根节点由 <sqlMap>  更改为 <mapper>；
  d.属性 parameterClass 必须更改为 parameterType；
  e.属性 resultClass 必须更改为 resultType； 
  f.属性 class 必须更改为 type； 
  g."groupBy" 属性已经删除；
  h.Dynamic SQL 发生变化：<if test="$1 != null" 置换了isNotNull。
  
21.待研究iBaits3的数据缓存机制、接口绑定机制

22.Guice性能：并发性能提升的原因之一是使用了 ConcurrentHashMap，原来的 Collections.synchronized(new HashMap()) 存在同步锁的性能瓶颈
参考站点：http://www.jroller.com/Solomon/entry/spring_2_5_perfomance_improvements
          http://code.google.com/p/google-guice/
          
23.基于iBatis2对底层代码进行封装，提供批量增加、删除、修改功能，提升批处理效率，在本机一次性处理4000条且多表关联操作只需要耗时4秒左右

24.提供返回Map数据类型接口

25.在底层对insert、update、delete实现半自动化级联关系操作，整体模仿于Hibernate的设计思想，提供主键约束和无主键支持，表间关联关系在建表时不能被创建

26.提供批量级联增加、更新、删除操作更能

27.在iBatis2版中调用自定义脚本时必须加上namespace，如：OrdersRefGoods.selectRefAllGoods

28.当调用TDFramework中batchSave、batchUpdate、batchRemove批处理方法时，存在关联关系的表不能建立相应的关联关系，否则，级联增、删、改、查会出错

29.在iBatis2中insert、update、delete、select操作，所涉及到的字段必须加数据类型，如：必须以#OrderId:VARCHAR#

30.提供多数据支持：实现动态加载Bean、动态切换数据源、动态切换事务代理及管理

31.修改生成DAO模板：拆分saveOrUpdate方法，主键生成方式暴露给业务，由业务层自行处理

32.升级CodeGen代码生成工具：设计、开发UI，将相关配置做成UI形式

33.修改所有模板：在模板中为生成的代码自动添加注释

34.升级JDBC模板：为分页查询、分页统计方法自动生成AND条件并做非null值判断

35.修改JDBC模板bug：修改doBatchUpdate模板方法，将主键条件列移至for循环最后，校正sql占位符“？”与for循环体中vo绑定数据顺序一致


需求：

1.修改CodeGen工具的模板：加入javaType，jdbcType字段的数据类型声明，加入对特殊数据类型的处理，加入字段默认值、长度等属性声明

2.修改CodeGen工具的模板：所有查询均返回HashMap结果集

3.在底层框架中扩展两个返回类型为Map集合的接口，并分别做抽象实现

4.参照Hibernate思想，实现iBatis3的insert\delete\update\select的级联操作

5.提供接口将由前台传过来的pojo对象与iBatis3的xml映射文件进行绑定，通过反射方式获取到javaType，jdbcType数据类型，及字段值

6.通用接口抽取，所暴露接口保持粗粒度，适用于任意第三方框架技术的整合

7.将基于TDFramework所开发的框架代码进行抽取，解耦成一个命名为IbaGuiceFramework独立的工程，解除对TDFramework庞大类库的依赖

8.实现实体接口与xml映射文件的数据绑定，并开发实体接口生成模板（实体接口命名必须与xml文件名保持一致）

9.提供统一“log、捕获异常、sql脚本控制台打印”输出支持

10.引入Guice或Spring所提供的AOP机制

11.提供联合主键的支持

12.提供跨数据源、多数据源配置支持

13.提供存储过程支持

14.提供用户手册

15.剥离对Spring的依赖，所有实例及事务皆交由Guice容器动态托管（通过接口绑定方式实现）

16.异常处理：
dao: try..catch..捕获SQLException，向service抛出DataAccessException运行时异常
service: try..catch..捕获DataAccessException，向action抛出ServiceException异常
action: try..catch..捕获ServiceException，向上抛出Exception异常
利用AOP获取抛异常的类名及其全路径、抛异常的方法名、异常类型、异常描述，将异常持久化(存库或存为属性文件)

17.在xml映射文件中实现“一对多”、“多对一”、“多对多”的关联关系映射代码

18.开发iBatis2代码生成模板，提供生成action、service、dao、pojo等对象生成模板

19.Batch批量方法存在bug：拼sql时，里面的“？”占位符与所绑定的vo对象值必须一一对应，在for循环中占位符“？”与所绑定的vo对象值也必须一一对应，
目前所生成的存在该问题，解决办法是在for循环中将生成的条件移动到for循环最后位置即可




 