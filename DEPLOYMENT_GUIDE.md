# Docusaurus GitHub Pages 自动部署指南

## 项目状态

✅ Docusaurus 项目已初始化  
✅ 配置文件已更新  
✅ GitHub Actions 工作流已创建  
🔄 等待推送到 GitHub  
⏳ 需要配置 GitHub Pages 设置  

## 下一步操作

### 1. 推送代码到 GitHub

如果上面的自动推送失败，请手动执行：

```bash
git push -u origin main
```

### 2. 配置 GitHub Pages

1. 访问您的 GitHub 仓库：https://github.com/wenren2025/wenren2025.github.io
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分：
   - 选择 "GitHub Actions" 而不是 "Deploy from a branch"
   - 这是新的 GitHub Pages 体验，使用 GitHub Actions 来部署

### 3. 触发首次部署

当您推送代码到 main 分支后，GitHub Actions 将自动触发：

1. 构建您的 Docusaurus 网站
2. 部署到 GitHub Pages
3. 您的网站将可在 https://wenren2025.github.io 访问

### 4. 验证部署

1. 在您的仓库中，点击 **Actions** 标签页
2. 您应该看到 "Deploy to GitHub Pages" 工作流正在运行或已完成
3. 成功后，您的网站将在几分钟内可用

## 工作流程说明

创建的 GitHub Actions 工作流 (`.github/workflows/deploy.yml`) 将：

- 当您推送到 main 分支时自动触发
- 安装 Node.js 依赖
- 构建 Docusaurus 网站
- 部署到 GitHub Pages

## 本地开发

在本地开发时，您可以使用以下命令：

```bash
# 启动开发服务器
npm start

# 构建网站
npm run build

# 本地预览构建结果
npm run serve
```

## 自定义网站

您可以编辑以下文件来自定义您的网站：

- `docusaurus.config.ts` - 主要配置文件
- `src/pages/index.tsx` - 首页
- `docs/` - 文档内容
- `blog/` - 博客文章
- `static/` - 静态资源（图片、图标等）

## 故障排除

如果部署失败，请检查：

1. GitHub Actions 日志中的错误信息
2. 确保您的 GitHub 仓库设置中启用了 GitHub Actions
3. 确保您有推送到仓库的权限

更多详细信息，请参考：
- [Docusaurus 部署文档](https://docusaurus.io/docs/deployment#deploying-to-github-pages)
- [GitHub Pages 文档](https://docs.github.com/en/pages) 