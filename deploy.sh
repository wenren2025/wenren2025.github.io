#!/bin/bash

# 部署脚本 - 先构建后部署
echo "🚀 开始部署流程..."

# 设置环境变量
export GIT_USER=wenren2025
export DEPLOYMENT_BRANCH=main

# 检查是否在正确的分支上
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "⚠️  当前在 main 分支，需要切换到其他分支进行部署"
    echo "创建并切换到 deploy 分支..."
    git checkout -b deploy
fi

# 第一步：构建项目
echo "📦 开始构建项目..."
if npm run build; then
    echo "✅ 构建成功！"
else
    echo "❌ 构建失败，停止部署"
    exit 1
fi

# 第二步：部署项目
echo "🚀 开始部署项目..."
if npm run deploy; then
    echo "✅ 部署成功！"
    echo "🌐 您的网站应该可以在以下地址访问："
    echo "   https://wenren2025.github.io"
    echo "   https://wenren.space"
else
    echo "❌ 部署失败"
    exit 1
fi

echo "🎉 部署流程完成！" 