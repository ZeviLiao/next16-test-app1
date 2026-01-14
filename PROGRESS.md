# 项目进度记录

**最后更新**: 2026-01-14
**当前状态**: Playwright 和 Sentry 传统集成完成，下一步改用 MCP

---

## 🎯 当前完成状态

### ✅ 已完成
- [x] Next.js 16 项目搭建（React 19 + Tailwind CSS v4 + Biome）
- [x] REST API 端点（/api/hello, /api/todos CRUD）
- [x] Playwright E2E 测试集成（传统方式）
- [x] Sentry 错误监控集成（传统方式）
- [x] Git + GitHub 配置
- [x] MCP 配置（context7, next-devtools, chrome-devtools）

### ⚠️ 已知问题
**测试失败**: `tests/e2e/api.spec.ts:34` - "should handle invalid JSON"
- **原因**: Playwright 的 `request.post({ data: "invalid json" })` 会自动序列化为有效 JSON
- **结果**: API 返回 200 而非预期的 400
- **影响**: 不影响功能，仅测试用例需要修复
- **状态**: 待修复（到公司后处理）

### 📋 测试结果
```
npm test 结果:
✅ 8 passed
❌ 1 failed (invalid JSON test)
总耗时: 1.6s
```

---

## 📚 Playwright 使用和理解

### 什么是 Playwright？
- **定位**: 端到端（E2E）测试框架
- **功能**: 自动化浏览器操作，模拟真实用户行为
- **支持**: Chromium、Firefox、WebKit（跨浏览器测试）

### 当前集成方式：传统 npm 包
```bash
npm install -D @playwright/test
```

### 文件结构
```
tests/e2e/
├── homepage.spec.ts    # 首页 UI 测试
└── api.spec.ts         # API 端点测试
```

### 使用方式
```bash
# 运行所有测试
npm test

# UI 模式（图形界面）
npm run test:ui
```

### 测试示例
```typescript
test('should display welcome message', async ({ page }) => {
  await page.goto('/');
  const heading = page.getByRole('heading', { name: /Welcome/i });
  await expect(heading).toBeVisible();
});

test('should create todo', async ({ request }) => {
  const response = await request.post('/api/todos', {
    data: { title: 'Test Todo', completed: false }
  });
  expect(response.status()).toBe(201);
});
```

### 核心概念
- **`page`**: 浏览器页面对象（UI 测试）
- **`request`**: HTTP 请求对象（API 测试）
- **`expect`**: 断言库（验证结果）

### 优势
- ✅ 测试用例持久化（代码形式保存）
- ✅ CI/CD 集成友好
- ✅ 支持并行执行
- ✅ 自动截图和视频录制

---

## 🔍 Sentry 使用和理解

### 什么是 Sentry？
- **定位**: 错误监控和性能追踪平台
- **功能**: 自动捕获、上报、分析生产环境错误
- **核心**: APM（应用性能监控）+ 错误追踪

### 当前集成方式：传统 SDK
```bash
npm install @sentry/nextjs
```

### 配置文件
```
sentry.client.config.ts    # 客户端（浏览器）
sentry.server.config.ts    # 服务端（Node.js）
sentry.edge.config.ts      # Edge Runtime
next.config.ts             # Webpack 插件集成
```

### 核心功能
```typescript
// 1. 自动捕获错误
throw new Error('Something went wrong');  // 自动发送到 Sentry

// 2. 手动捕获异常
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
}

// 3. 发送消息
Sentry.captureMessage('User completed checkout', 'info');

// 4. 设置用户上下文
Sentry.setUser({ id: '123', email: 'user@example.com' });

// 5. 添加面包屑（用户行为轨迹）
Sentry.addBreadcrumb({
  category: 'action',
  message: 'User clicked button',
  level: 'info'
});
```

### 测试页面
- **路径**: `/sentry-example`
- **功能**: 6 种 Sentry 功能演示
  1. 抛出错误（测试自动捕获）
  2. 发送消息
  3. 手动捕获异常
  4. 设置用户信息
  5. 添加面包屑
  6. 触发 API 错误

### 环境变量配置
```bash
# 复制模板
cp .env.local.example .env.local

# 必填变量
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=xxx  # 用于上传 source maps
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
```

### 使用流程
1. 访问 https://sentry.io 创建项目
2. 获取 DSN（数据源名称）
3. 配置环境变量
4. 访问 `/sentry-example` 测试功能
5. 在 Sentry.io 查看上报的错误

### 优势
- ✅ 生产环境错误监控
- ✅ 堆栈轨迹和源码映射
- ✅ Session Replay（会话重放）
- ✅ 性能监控
- ✅ 错误趋势分析

---

## 🔄 传统方式 vs MCP 方式对比

### Playwright

#### 传统方式（当前）
```bash
# 安装包
npm install -D @playwright/test

# 编写测试文件
tests/e2e/api.spec.ts

# 运行测试
npm test

# 查看结果：人工阅读终端输出
```

#### MCP 方式（下一步）
```bash
# 通过 next-devtools MCP
browser_eval({
  action: "start",
  browser: "chrome"
})

browser_eval({
  action: "navigate",
  url: "http://localhost:3000"
})

browser_eval({
  action: "click",
  element: "button"
})

browser_eval({
  action: "screenshot"
})

# AI 自动执行、分析、诊断
```

**差异**：
- 传统：写测试代码 → 运行 → 人工查看结果
- MCP：AI 动态控制浏览器 → AI 自动分析 → AI 生成报告

### Sentry

#### 传统方式（当前）
```bash
# 安装 SDK
npm install @sentry/nextjs

# 配置文件
sentry.client.config.ts

# 测试：人工访问网页
open http://localhost:3000/sentry-example

# 查看：人工登录 Sentry.io
open https://sentry.io
```

#### MCP 方式（下一步）
```bash
# 通过 Sentry MCP
sentry_list_issues()
# → AI 获取最近错误列表

sentry_get_issue_latest_event(issue_id: "12345")
# → AI 获取错误详情
# → AI 分析堆栈轨迹
# → AI 定位代码位置
# → AI 建议修复方案

# 结合 Playwright MCP 测试
browser_eval(click 错误按钮)
sentry_list_issues()
# → AI 验证错误是否被正确捕获
```

**差异**：
- 传统：人工触发 → 人工查看 Sentry.io → 人工分析
- MCP：AI 查询 Sentry 数据 → AI 分析错误 → AI 生成诊断

---

## 🚀 下一步：MCP 集成计划

### 目标
将当前的 Playwright 和 Sentry 改成 MCP 方式，实现 AI 自动化测试和监控。

### 任务列表

#### 1. Playwright MCP 集成
- [ ] 确认 `playwright-mcp` 是否已通过 `next-devtools` 可用
- [ ] 测试 `browser_eval` 工具的所有 actions
- [ ] 创建 AI 自动化测试脚本（替代部分 npm test）
- [ ] 对比传统测试 vs MCP 测试的效果

#### 2. Sentry MCP 集成
- [ ] 安装 Sentry MCP 服务器
  ```bash
  # 可能的配置方式（需要查最新文档）
  npm install -g @sentry/mcp-server
  # 或在 .mcp.json 中配置
  ```
- [ ] 配置 `.mcp.json` 添加 Sentry 服务器
- [ ] 测试 Sentry MCP 工具：
  - `sentry_list_issues`
  - `sentry_get_issue_latest_event`
  - 其他可用工具
- [ ] 创建 AI 自动化监控脚本

#### 3. 验证和文档
- [ ] 验证 Playwright MCP 可以替代 `npm test`
- [ ] 验证 Sentry MCP 可以自动分析错误
- [ ] 更新 `TESTING.md` 添加 MCP 使用指南
- [ ] 创建示例：AI 如何用 MCP 做端到端测试

### 实施步骤

#### Step 1: 查询最新文档
```bash
# 搜索 Playwright MCP 最新用法
WebSearch("playwright-mcp 2026 usage")

# 搜索 Sentry MCP 最新用法
WebSearch("Sentry MCP 2026 integration")
```

#### Step 2: 配置 MCP 服务器
更新 `.mcp.json`:
```json
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    },
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server@latest"],
      "env": {
        "SENTRY_AUTH_TOKEN": "${SENTRY_AUTH_TOKEN}",
        "SENTRY_ORG": "${SENTRY_ORG}",
        "SENTRY_PROJECT": "${SENTRY_PROJECT}"
      }
    }
  }
}
```

#### Step 3: 测试集成
```bash
# 启动 dev server
npm run dev

# 使用 MCP 工具测试 Playwright
browser_eval({ action: "start" })
browser_eval({ action: "navigate", url: "http://localhost:3000" })

# 使用 MCP 工具测试 Sentry
sentry_list_issues()
```

#### Step 4: 创建 AI 自动化脚本
创建 `scripts/ai-test.md`（AI 执行的测试计划）:
```markdown
# AI 自动化测试计划

1. 使用 browser_eval 启动浏览器
2. 访问 /sentry-example 页面
3. 点击"抛出错误"按钮
4. 使用 sentry_list_issues 检查错误是否被捕获
5. 分析错误详情并生成报告
```

### 预期效果

**传统方式**:
```bash
人工: npm test
人工: 查看终端输出
人工: open /sentry-example
人工: 点击按钮
人工: 登录 Sentry.io
人工: 查看错误
人工: 分析问题
```

**MCP 方式**:
```bash
AI: browser_eval 自动测试所有页面
AI: sentry_list_issues 自动获取错误列表
AI: 分析错误堆栈轨迹
AI: 定位代码位置
AI: 生成测试报告和修复建议
```

### 成功指标
- [ ] Playwright MCP 可以完成 90% 的 E2E 测试
- [ ] Sentry MCP 可以自动分析和诊断错误
- [ ] AI 可以生成完整的测试报告
- [ ] 测试效率提升 50% 以上

---

## 📝 待办事项（到公司后）

### 优先级 P0（必做）
1. **修复测试失败**: 修改 `tests/e2e/api.spec.ts:34` 的 invalid JSON 测试
2. **查询最新文档**: 搜索 Playwright MCP 和 Sentry MCP 2026 年最新用法
3. **配置 Sentry MCP**: 更新 `.mcp.json`，添加 Sentry 服务器

### 优先级 P1（重要）
4. **测试 Playwright MCP**: 使用 `browser_eval` 复刻现有测试用例
5. **测试 Sentry MCP**: 使用 `sentry_list_issues` 查询错误
6. **对比效果**: 传统方式 vs MCP 方式的优劣分析

### 优先级 P2（可选）
7. **创建 AI 测试脚本**: 让 AI 自动执行端到端测试
8. **更新文档**: 添加 MCP 使用指南到 `TESTING.md`
9. **生产环境监控**: 配置 Sentry MCP 定期检查生产错误

---

## 🔗 快速链接

- **GitHub 仓库**: https://github.com/ZeviLiao/next16-test-app1
- **本地开发**: http://localhost:3000
- **Sentry 测试页**: http://localhost:3000/sentry-example
- **Playwright 报告**: `npx playwright show-report`

---

## 💡 关键命令

```bash
# 启动开发服务器
npm run dev

# 运行测试
npm test

# 查看测试报告
npx playwright show-report

# 检查 MCP 配置
cat .mcp.json

# 查看 Sentry 配置
cat sentry.client.config.ts
```

---

**下次继续**: MCP 集成 ✨
