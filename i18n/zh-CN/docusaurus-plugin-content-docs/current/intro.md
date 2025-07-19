---
sidebar_position: 1
---

# 教程介绍

让我们用**不到 5 分钟的时间快速了解 Docusaurus**。

## 开始入门

通过**创建一个新站点**来开始。

或者通过 **[docusaurus.new](https://docusaurus.new)** 来**立即试用 Docusaurus**。

### 环境准备

  - [Node.js](https://nodejs.org/en/download/) 18.0 或更高版本：
      - 安装 Node.js 时，建议勾选所有与依赖项相关的复选框。

## 生成一个新站点

使用**经典模板**来生成一个新的 Docusaurus 站点。

运行以下命令后，经典模板将自动添加到你的项目中：

```bash
npm init docusaurus@latest my-website classic
```

你可以在命令提示符、Powershell、终端或代码编辑器中的任何集成终端里输入此命令。

该命令还会安装运行 Docusaurus 所需的所有必要依赖项。

## 启动你的站点

运行开发服务器：

```bash
cd my-website
npm run start
```

`cd` 命令会更改你当前的工作目录。为了操作你刚创建的 Docusaurus 站点，你需要将终端导航到该目录。

`npm run start` 命令会在本地构建你的网站，并通过一个开发服务器来提供服务，方便你在 http://localhost:3000/ 上预览。

打开 `docs/intro.md` 文件（也就是当前这个页面）并编辑几行内容：站点会**自动重新加载**并显示你的更改。