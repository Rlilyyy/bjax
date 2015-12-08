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
  	.success(function(data) {console.log(data)})
  	.start();
```
### BTW，目前还有一些bug和不足之处，将在今后不断完善
