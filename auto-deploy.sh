#!/bin/bash

# RendaBio 全自动部署脚本
# 使用方法: bash auto-deploy.sh
# 此脚本将自动完成：GitHub 仓库创建 → 代码推送 → Vercel 部署 → 域名绑定

echo "🚀 RendaBio 全自动部署脚本"
echo "==========================="
echo ""
echo "此脚本将帮助您:"
echo "  1. 创建 GitHub 仓库"
echo "  2. 推送代码到 GitHub"
echo "  3. 在 Vercel 部署"
echo "  4. 绑定域名 www.rendabio.com"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误: 请在项目根目录运行此脚本${NC}"
    echo "请执行: cd /mnt/okcomputer/output/app"
    exit 1
fi

# 获取 GitHub 用户名
echo -n "请输入您的 GitHub 用户名: "
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ 错误: GitHub 用户名不能为空${NC}"
    exit 1
fi

# 获取 GitHub Token
echo ""
echo "🔑 需要 GitHub Personal Access Token"
echo "  1. 访问: https://github.com/settings/tokens"
echo "  2. 点击 'Generate new token (classic)'"
echo "  3. 勾选 'repo' 权限"
echo "  4. 生成并复制 Token"
echo ""
echo -n "请输入 GitHub Token: "
read -s GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}❌ 错误: GitHub Token 不能为空${NC}"
    exit 1
fi

# 获取 Vercel Token
echo ""
echo "🔑 需要 Vercel Token"
echo "  1. 访问: https://vercel.com/account/tokens"
echo "  2. 点击 'Create Token'"
echo "  3. 复制 Token"
echo ""
echo -n "请输入 Vercel Token: "
read -s VERCEL_TOKEN
echo ""

if [ -z "$VERCEL_TOKEN" ]; then
    echo -e "${RED}❌ 错误: Vercel Token 不能为空${NC}"
    exit 1
fi

echo ""
echo "📝 配置信息:"
echo "  GitHub 用户名: $GITHUB_USERNAME"
echo "  仓库名: rendabio"
echo "  域名: www.rendabio.com"
echo ""
echo -n "确认开始部署? (y/n): "
read CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "已取消部署"
    exit 0
fi

echo ""
echo "🚀 开始部署..."
echo ""

# ==================== 步骤 1: 创建 GitHub 仓库 ====================
echo -e "${BLUE}📦 步骤 1/4: 创建 GitHub 仓库...${NC}"

REPO_RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"rendabio\",\"description\":\"AI多智能体协作平台\",\"private\":false,\"auto_init\":true}" 2>&1)

if echo "$REPO_RESPONSE" | grep -q "\"name\":\"rendabio\""; then
    echo -e "${GREEN}✅ GitHub 仓库创建成功${NC}"
else
    if echo "$REPO_RESPONSE" | grep -q "already exists"; then
        echo -e "${YELLOW}⚠️ 仓库已存在，将使用现有仓库${NC}"
    else
        echo -e "${RED}❌ GitHub 仓库创建失败${NC}"
        echo "错误信息: $REPO_RESPONSE"
        exit 1
    fi
fi

# ==================== 步骤 2: 推送代码到 GitHub ====================
echo ""
echo -e "${BLUE}📤 步骤 2/4: 推送代码到 GitHub...${NC}"

# 配置 Git
git config user.email "crlmczx@163.com" 2>/dev/null || true
git config user.name "RendaBio" 2>/dev/null || true

# 添加远程仓库
git remote remove origin 2>/dev/null || true
git remote add origin "https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/rendabio.git"

# 推送代码
if git push -u origin main --force; then
    echo -e "${GREEN}✅ 代码推送成功${NC}"
else
    echo -e "${YELLOW}⚠️ 推送失败，尝试使用 master 分支...${NC}"
    git branch -m master 2>/dev/null || true
    if git push -u origin master --force; then
        echo -e "${GREEN}✅ 代码推送成功 (master 分支)${NC}"
    else
        echo -e "${RED}❌ 代码推送失败${NC}"
        exit 1
    fi
fi

# ==================== 步骤 3: Vercel 部署 ====================
echo ""
echo -e "${BLUE}🚀 步骤 3/4: 在 Vercel 部署...${NC}"

# 安装 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
fi

# 登录 Vercel
echo "$VERCEL_TOKEN" | vercel login --token

# 部署项目
echo ""
echo "正在部署到 Vercel..."
DEPLOY_OUTPUT=$(vercel --prod --yes --token "$VERCEL_TOKEN" 2>&1)

if echo "$DEPLOY_OUTPUT" | grep -q "https://"; then
    DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -o "https://[^[:space:]]*" | tail -1)
    echo -e "${GREEN}✅ Vercel 部署成功${NC}"
    echo "  预览地址: $DEPLOY_URL"
else
    echo -e "${YELLOW}⚠️ Vercel 部署可能有问题，请检查 Vercel Dashboard${NC}"
    echo "输出: $DEPLOY_OUTPUT"
fi

# ==================== 步骤 4: 绑定域名 ====================
echo ""
echo -e "${BLUE}🌐 步骤 4/4: 绑定域名 www.rendabio.com...${NC}"

# 获取项目 ID
PROJECT_ID=$(vercel projects ls --token "$VERCEL_TOKEN" 2>/dev/null | grep "rendabio" | awk '{print $2}')

if [ -n "$PROJECT_ID" ]; then
    # 添加域名
    DOMAIN_RESPONSE=$(curl -s -X POST \
      "https://api.vercel.com/v9/projects/$PROJECT_ID/domains" \
      -H "Authorization: Bearer $VERCEL_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"www.rendabio.com\"}" 2>&1)
    
    if echo "$DOMAIN_RESPONSE" | grep -q "\"name\":\"www.rendabio.com\""; then
        echo -e "${GREEN}✅ 域名添加成功${NC}"
    else
        echo -e "${YELLOW}⚠️ 域名添加可能有问题，请手动在 Vercel Dashboard 配置${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ 无法获取项目 ID，请手动在 Vercel Dashboard 添加域名${NC}"
fi

# ==================== 完成 ====================
echo ""
echo "================================"
echo -e "${GREEN}🎉 部署流程已完成!${NC}"
echo "================================"
echo ""
echo "📋 后续步骤:"
echo ""
echo "1. 访问 GitHub 仓库:"
echo "   https://github.com/$GITHUB_USERNAME/rendabio"
echo ""
echo "2. 访问 Vercel Dashboard 查看部署状态:"
echo "   https://vercel.com/dashboard"
echo ""
echo "3. 配置 DNS 记录 (在域名注册商处添加):"
echo "   CNAME  www  ->  cname.vercel-dns.com"
echo "   A      @    ->  76.76.21.21"
echo ""
echo "4. 等待 DNS 传播 (5-30 分钟)"
echo ""
echo "5. 访问您的网站:"
echo "   https://www.rendabio.com"
echo ""
echo "================================"
