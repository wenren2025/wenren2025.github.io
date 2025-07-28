#!/bin/bash

echo "🚀 开始启动项目..."

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "📦 检测到缺少依赖，正在安装..."
    npm install
fi

# 检查 docusaurus 命令是否可用
if [ ! -f "node_modules/.bin/docusaurus" ]; then
    echo "⚠️  Docusaurus 未找到，正在重新安装依赖..."
    npm install
fi

echo "✅ 依赖检查完成，启动开发服务器..."

# 启动开发服务器
npm start

if [ $? -eq 0 ]; then
    echo "✅ 启动成功！"
    echo "🌐 本地服务器已启动在 http://localhost:3000"
else
    echo "❌ 启动失败，请检查错误信息"
    exit 1
fi 