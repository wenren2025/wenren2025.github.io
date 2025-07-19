#!/bin/bash

# 设置错误时退出
set -e

echo "🚀 开始启动项目..."
npm run start

if [ $? -eq 0 ]; then
    echo "✅ 启动成功！"
    echo "🌐 启动本地服务器..."
else
    echo "❌ 启动失败，请检查错误信息"
    exit 1
fi 