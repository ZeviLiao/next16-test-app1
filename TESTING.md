# 测试和监控指南

本项目集成了 **Playwright** (E2E 测试) 和 **Sentry** (错误监控)。

---

## 🧪 Playwright E2E 测试

### 快速开始

```bash
# 运行所有测试
npm test

# 使用 UI 模式运行（推荐）
npm run test:ui

# 查看测试报告
npm run test:report
```

### 测试文件结构

```
tests/e2e/
├── homepage.spec.ts    # 首页测试
└── api.spec.ts         # API 测试（CRUD）
```

### 测试覆盖

#### 1. 首页测试 (`homepage.spec.ts`)
- ✅ 验证欢迎消息显示
- ✅ 验证页面标题
- ✅ 验证描述文本
- ✅ 验证样式应用

#### 2. API 测试 (`api.spec.ts`)
**POST /api/hello**
- ✅ 成功响应（200）
- ✅ 拒绝 GET 请求（405）
- ✅ 处理无效 JSON（400）

**CRUD /api/todos**
- ✅ 获取所有 todos
- ✅ 创建 todo
- ✅ 获取单个 todo
- ✅ 更新 todo
- ✅ 删除 todo
- ✅ 验证必填字段
- ✅ 处理不存在的资源（404）

### 配置说明

**playwright.config.ts**
```typescript
- baseURL: http://localhost:3000
- 自动启动 dev server
- 失败时截图
- 首次重试时录制 trace
```

### 添加新测试

```typescript
// tests/e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should work correctly', async ({ page }) => {
    await page.goto('/my-feature');
    // 你的测试代码
  });
});
```

### CI/CD 集成

```yaml
# .github/workflows/test.yml
- name: Install dependencies
  run: npm ci

- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npm test
```

---

## 🔍 Sentry 错误监控

### 配置步骤

#### 1. 创建 Sentry 项目

访问 [https://sentry.io](https://sentry.io) 并创建一个新项目。

#### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`:

```bash
cp .env.local.example .env.local
```

填入你的 Sentry 配置：

```env
# .env.local
SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/123456
NEXT_PUBLIC_SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/123456

# 可选：上传 source maps
SENTRY_AUTH_TOKEN=your-auth-token
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
```

#### 3. 测试 Sentry 集成

**方式 1: 访问测试页面**
```
http://localhost:3000/sentry-example
```

测试功能：
- ✅ 抛出客户端错误
- ✅ 发送消息
- ✅ 手动捕获异常
- ✅ 设置用户信息
- ✅ 添加面包屑
- ✅ 触发 API 错误

**方式 2: 访问测试 API**
```bash
curl http://localhost:3000/api/test-sentry
```

#### 4. 查看错误

在 Sentry 控制台查看：
```
https://sentry.io/organizations/[your-org]/issues/
```

### Sentry 配置说明

**已集成的功能：**
- ✅ 客户端错误自动捕获
- ✅ 服务端错误自动捕获
- ✅ Edge Runtime 支持
- ✅ 会话回放（Session Replay）
- ✅ 性能监控
- ✅ 用户上下文
- ✅ 面包屑（Breadcrumbs）

**配置文件：**
```
sentry.client.config.ts  # 客户端配置
sentry.server.config.ts  # 服务端配置
sentry.edge.config.ts    # Edge Runtime 配置
```

### 在代码中使用 Sentry

#### 客户端

```typescript
'use client';
import * as Sentry from '@sentry/nextjs';

// 捕获错误
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
}

// 发送消息
Sentry.captureMessage('Something happened', 'info');

// 设置用户
Sentry.setUser({
  id: '123',
  email: 'user@example.com'
});

// 添加面包屑
Sentry.addBreadcrumb({
  category: 'action',
  message: 'User clicked button',
  level: 'info'
});
```

#### 服务端

```typescript
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    // 你的代码
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

#### 自动错误边界

项目已配置全局错误边界 (`src/app/error.tsx`)，会自动：
- 捕获 React 渲染错误
- 上报到 Sentry
- 显示友好的错误页面

### Source Maps

在生产环境，Sentry 会自动上传 source maps（如果配置了 `SENTRY_AUTH_TOKEN`）。

**手动上传：**
```bash
npx @sentry/cli sourcemaps upload ./next/static
```

### 性能监控

Sentry 自动追踪：
- ✅ 页面加载时间
- ✅ API 请求延迟
- ✅ 组件渲染性能

在 Sentry 控制台查看：
```
Performance → Transactions
```

### 最佳实践

**1. 环境区分**
```typescript
Sentry.init({
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
});
```

**2. 采样率调整**
```typescript
{
  // 生产环境降低采样率
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
}
```

**3. 过滤敏感数据**
```typescript
Sentry.init({
  beforeSend(event, hint) {
    // 移除敏感数据
    if (event.request) {
      delete event.request.cookies;
    }
    return event;
  }
});
```

**4. 用户反馈**
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.showReportDialog({
  eventId: 'error-id',
  user: {
    email: 'user@example.com',
    name: 'User Name'
  }
});
```

---

## 📊 测试 + 监控流程

### 开发阶段
```
1. 编写代码
2. 运行 Playwright 测试 (npm test)
3. 测试通过 ✓
4. 提交代码
```

### 部署阶段
```
1. CI/CD 运行测试
2. 构建应用
3. 上传 source maps 到 Sentry
4. 部署到生产环境
```

### 生产监控
```
1. 用户遇到错误
2. Sentry 自动捕获
3. 开发团队收到通知
4. 查看错误详情、会话回放
5. 修复 bug
6. 运行测试验证
7. 部署修复
```

---

## 🔗 相关资源

- [Playwright 文档](https://playwright.dev)
- [Sentry Next.js 文档](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [测试最佳实践](https://playwright.dev/docs/best-practices)
- [Sentry 性能监控](https://docs.sentry.io/product/performance/)

---

**最后更新**: 2026-01-14
