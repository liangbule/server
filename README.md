## 一.项目初始化

init.....

# 启动服务

```
npm install
npm run dev
```

1、导入router包
2、实例化对象
3、编写路由
4、注册中间件

# 目录结构

- app 业务文件
- config 配置文件
- router 路由文件

# 依赖

```angular2html
koa-body 解析post请求body参数
mongodb mongoose
dotenv 读取配置
koa-router
```

# API接口

## admin

- [x] 用户登录
- [x] 用户注册
- [x] 修改密码
- [ ] 查询用户信息

## article

## category

- 创建分类
- 获取所有分类
- 更新分类
- 删除分类