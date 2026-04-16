# RendaBio - AI多智能体协作平台

专为知识工作者打造的 AI 多智能体协作平台，融合 A2A + MCP 双协议，在营销、研究、开发等复杂业务场景中提升生产力。

## 🚀 快速部署到 Vercel

### 方法一：使用部署脚本（推荐）

```bash
# 进入项目目录
cd rendabio

# 运行部署脚本
bash deploy.sh
```

### 方法二：手动部署

#### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

#### 2. 登录 Vercel
```bash
vercel login
```

#### 3. 部署项目
```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 部署到生产环境
vercel --prod
```

### 方法三：通过 Git 仓库部署

#### 1. 创建 Git 仓库
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/rendabio.git
git push -u origin main
```

#### 2. 在 Vercel 导入项目
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **"Add New Project"**
3. 选择 **"Import Git Repository"**
4. 选择 `rendabio` 仓库
5. 点击 **"Import"** 然后 **"Deploy"**

---

## 🌐 绑定自定义域名 www.rendabio.com

### 步骤 1：在 Vercel 添加域名

1. 进入 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 点击 **"Settings"** → **"Domains"**
4. 输入 `www.rendabio.com` 点击 **"Add"**

### 步骤 2：配置 DNS 记录

在您的域名注册商处添加以下 DNS 记录：

| 类型 | 主机记录 | 记录值 |
|------|---------|--------|
| CNAME | www | cname.vercel-dns.com |
| A | @ | 76.76.21.21 |

### 步骤 3：验证域名

等待 DNS 传播（通常 5-30 分钟），Vercel 会自动验证域名。

---

## 📁 项目结构

```
rendabio/
├── src/
│   ├── components/      # 可复用组件
│   │   ├── Navbar.tsx
│   │   ├── AnimatedSection.tsx
│   │   └── GradientGlow.tsx
│   ├── sections/        # 页面区域
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Agents.tsx
│   │   ├── Workflow.tsx
│   │   ├── UseCases.tsx
│   │   ├── Pricing.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/              # 静态资源
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── vercel.json          # Vercel 配置
└── deploy.sh            # 部署脚本
```

---

## 🛠️ 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **样式**: Tailwind CSS 3
- **UI 组件**: shadcn/ui + Radix UI
- **动画**: Framer Motion
- **图标**: Lucide React

---

## 📝 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

---

## 🔧 常见问题

### Q: 部署后页面空白？
A: 检查 `vite.config.ts` 中的 `base` 配置是否为 `/`

### Q: 域名绑定失败？
A: 确保 DNS 记录正确配置，并等待 DNS 传播完成（可能需要 24-48 小时）

### Q: 如何更新网站？
A: 修改代码后重新推送 Git，Vercel 会自动重新部署

### Q: 如何配置环境变量？
A: 在 Vercel Dashboard → Settings → Environment Variables 中添加

---

## 📞 支持

如有问题，请联系：
- Email: support@rendabio.com
- GitHub Issues: https://github.com/你的用户名/rendabio/issues

---

© 2025 RendaBio. All rights reserved.
