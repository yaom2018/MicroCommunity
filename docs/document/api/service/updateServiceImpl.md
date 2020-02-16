

**1\. 编辑服务实现**
###### 接口功能
> 编辑服务实现接口

###### URL
> [http://api.java110.com:8008/api/serviceImpl.updateServiceImpl](http://api.java110.com:8008/api/serviceImpl.saveServiceImpl)

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数(header部分)
|参数名称|约束|类型|长度|描述|取值说明|
| :-: | :-: | :-: | :-: | :-: | :-:|
|app_id|1|String|30|应用ID|Api服务分配                      |
|transaction_id|1|String|30|请求流水号|不能重复 1000000000+YYYYMMDDhhmmss+6位序列 |
|sign|1|String|-|签名|请参考签名说明|
|req_time|1|String|-|请求时间|YYYYMMDDhhmmss|

###### 请求参数(body部分)
|参数名称|约束|类型|长度|描述|取值说明|
| :-: | :-: | :-: | :-: | :-: | :-: |
|businessTypeCd|1|String|12|应用ID|-|
|businessTypeCd|1|String|12|业务类型|-|
|name|1|String|50|服务名称|-|
|invokeType|1|String|4|调用类型|-|
|url|1|String|200|目标地址|-|
|timeout|1|int|11|超时时间|默认60|
|retryCount|1|int|11|重试次数|-|




###### 返回协议

当http返回状态不为200 时请求处理失败 body内容为失败的原因

当http返回状态为200时请求处理成功，body内容为返回内容，


###### 举例
> 地址：[http://api.java110.com:8008/api/serviceImpl.updateServiceImpl](http://api.java110.com:8008/api/serviceImpl.saveServiceImpl)

``` javascript
请求头信息：
Content-Type:application/json
USER_ID:1234
APP_ID:8000418002
TRANSACTION_ID:10029082726
REQ_TIME:20181113225612
SIGN:aabdncdhdbd878sbdudn898
请求报文：

{
	serviceBusinessId: "143"
    businessTypeCd: "1212"
    name: "zc测试"
    invokeType: "3"
    url: "222/dasd"
    messageTopic: ""
    timeout: "60"
    retryCount: "3"
    description: "dsadad"
    communityId: "7020181217000001"
}


返回报文：

```
