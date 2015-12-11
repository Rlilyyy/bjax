# bjax
## 参照了一些underscore的思想写的XMLHttpRequest
### 调用例子如下：
``` js
// chain()是为了使用链式调用的方法，你也可以直接写一个object传入start()
// chain()可以指定一个object传入，该object将保存你后面设置的所有参数
// 例如bjax.chain(result)
bjax.chain()
  	.setURL(Connection.GUIDE)
  	.setType("GET")
  	.setData("")
  	.setAsync(true)
  	.tab(console.log) // 这里将在控制台打印当前设置好的数据的object
  	.tab(console.log, "test") // 这里将在控制台打印"test"
  	.success(function(data) {console.log(data)})
  	.start();
// tab(copy, func, doData)也可以直接调用
// 例如
bjax.tab(alert, "test")
```
### 如果在主线程进行同步传输的话，会提示不建议使用的提示语
