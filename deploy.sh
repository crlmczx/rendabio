#!/bin/bash

# RendaBio Vercel 部署脚本
# 使用方法: bash deploy.sh

echo "🚀 RendaBio 部署脚本"
echo "===================="

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 正在安装 Vercel CLI..."
    npm install -g vercel
fi

# 检查是否登录
echo "🔐 检查 Vercel 登录状态..."
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "请登录 Vercel:"
    vercel login
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 部署到 Vercel
echo "🚀 部署到 Vercel..."
vercel --prod

echo ""
echo "✅ 部署完成!"
echo ""
echo "📋 下一步: 绑定自定义域名"
echo "1. 访问 Vercel Dashboard: https://vercel.com/dashboard"
echo "2. 选择您的项目"
echo "3. 点击 Settings -> Domains"
echo "4. 添加域名: www.rendabio.com"
echo ""
echo "🔧 DNS 配置:"
echo "  CNAME  www  ->  cname.vercel-dns.com"
echo "  A      @    ->  76.76.21.21"
