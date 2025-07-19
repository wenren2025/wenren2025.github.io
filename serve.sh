#!/bin/bash

# 设置错误时退出
set -e

echo "🚀 开始构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "🌐 启动本地服务器..."
    npm run serve
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi 