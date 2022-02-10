
# 自动签到

这是一个nodejs版自动签到工具， 基于 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架（腾讯云开发）将项目一键部署到云开发环境，仅须配置个人账号信息就能实现自动签到

### 一键部署

点击下方按钮使用 [CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework) 可以在云端一键部署本项目到自己的云开发账号上。

[![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?&action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2FCocoSilent%2Fauto-sign&appName=auto-sign&branch=main)


### 签到配置
每个平台签到要配置项都是不一样的，每个用户的值也是不同的，因此把这些放到环境变量里，云开发部署完成后，点管理就可以添加环境变量。

定时执行任务执行时间配置在cloudbaserc.json  triggers,可自行更改

#### 掘金
juejin_sessionid    sessionid 从登录掘金的cookie中取

juejin_aid    手动点击签到，从network找到check_in这个请求的参数中aid的值




### CloudBase Framework 相关开发配置

cloudbaserc.json配置说明查看 [CloudBase Framework 配置](https://github.com/TencentCloudBase/cloudbase-framework).
