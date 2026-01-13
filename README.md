# Test App 1 - Next.js 16 + MCP Integration

AI 驱动开发的 Next.js 16 应用，展示 MCP (Model Context Protocol) 在实际开发中的应用。

**GitHub**: https://github.com/ZeviLiao/next16-test-app1

---

## 🤖 AI 自动化 vs 人工介入

### AI 完全自动化完成
- ✅ 项目初始化（Next.js 16 + React 19 + TypeScript）
- ✅ 依赖安装和配置（Tailwind CSS, Biome, Husky, lint-staged）
- ✅ Git 初始化、提交、推送到 GitHub
- ✅ 错误诊断和修复（缺少依赖、配置错误）
- ✅ API 端点创建（包含错误处理）
- ✅ 自动化测试执行
- ✅ 文档查询（Next.js、React、Ant Design 等）

### 人工必须介入
- 🔷 **技术选型决策**（是否启用 React Compiler、Tailwind 版本）
- 🔷 **功能需求确认**（API 的业务逻辑）
- 🔷 **测试目标选择**（测试哪些场景）
- 🔷 **最终代码 Review**

**自动化比例**: ~85-90%

---

## 🛠️ 技术栈

- **Next.js** 16.1.1 (App Router)
- **React** 19.2.3 + React Compiler
- **TypeScript** 5.9.3
- **Tailwind CSS** 4.1.18
- **Biome** 2.3.11 (Linter + Formatter)

---

## 📦 MCP 工具集成

### 1. Next-DevTools MCP
**用途**: Next.js 应用运行时诊断

- `nextjs_docs` - 查询官方文档
- `nextjs_index` - 发现运行中的 dev server
- `nextjs_call` - 调用运行时工具（错误检测、路由查询）
- `browser_eval` - 浏览器自动化测试

### 2. Context7 MCP
**用途**: 技术文档查询（预索引的 RAG 系统）

- 支持查询 React、Next.js、Ant Design 等数千个库
- 直接返回官方文档和代码示例

### 3. Chrome-DevTools MCP
**关系**: 与 next-devtools 互补
- next-devtools = Next.js 运行时（后端视角）
- chrome-devtools = 浏览器性能（前端视角）

---

## 🚀 API 示例 - CRUD

### 数据结构
```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}
```

### 1. Create - POST /api/todos
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "学习 Next.js 16",
    "completed": false
  }'
```

**Response:**
```json
{
  "id": "todo_123",
  "title": "学习 Next.js 16",
  "completed": false,
  "createdAt": "2026-01-13T23:00:00.000Z"
}
```

---

### 2. Read - GET /api/todos
```bash
# 获取所有 todos
curl http://localhost:3000/api/todos

# 获取单个 todo
curl http://localhost:3000/api/todos/todo_123
```

**Response:**
```json
[
  {
    "id": "todo_123",
    "title": "学习 Next.js 16",
    "completed": false,
    "createdAt": "2026-01-13T23:00:00.000Z"
  }
]
```

---

### 3. Update - PUT/PATCH /api/todos/:id
```bash
curl -X PATCH http://localhost:3000/api/todos/todo_123 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

**Response:**
```json
{
  "id": "todo_123",
  "title": "学习 Next.js 16",
  "completed": true,
  "createdAt": "2026-01-13T23:00:00.000Z"
}
```

---

### 4. Delete - DELETE /api/todos/:id
```bash
curl -X DELETE http://localhost:3000/api/todos/todo_123
```

**Response:**
```json
{
  "message": "Todo deleted successfully",
  "id": "todo_123"
}
```

---

## 🧪 API 测试：curl vs MCP 工具

### curl 适用场景（推荐）

**优势：**
- ✅ 快速验证 API 是否正常工作
- ✅ 调试单个请求
- ✅ 无需配置，立即可用
- ✅ 灵活性高，支持各种 HTTP 选项
- ✅ 适合本地开发

**使用时机：**
```
✓ 开发阶段的快速测试
✓ 调试 API 响应
✓ 验证单个端点
✓ 手动测试边界情况
```

---

### MCP REST API 工具适用场景

**优势：**
- ✅ 可重复的自动化测试
- ✅ 集成到 AI 工作流
- ✅ 测试套件管理
- ✅ 认证和 header 管理
- ✅ CI/CD 集成

**使用时机：**
```
✓ 需要重复执行相同测试
✓ 测试需要复杂的认证流程
✓ 管理多个环境（dev/staging/prod）
✓ 需要 AI 辅助分析测试结果
✓ 集成测试和回归测试
✓ 团队协作和测试共享
```

---

### 对比分析

| 场景 | curl | MCP 工具 | 推荐 |
|------|------|---------|------|
| **本地开发测试** | ⭐⭐⭐⭐⭐ | ⭐⭐ | curl |
| **调试单个请求** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | curl |
| **自动化测试** | ⭐⭐ | ⭐⭐⭐⭐⭐ | MCP |
| **回归测试** | ⭐ | ⭐⭐⭐⭐⭐ | MCP |
| **CI/CD 集成** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | MCP |
| **团队协作** | ⭐⭐ | ⭐⭐⭐⭐ | MCP |
| **快速验证** | ⭐⭐⭐⭐⭐ | ⭐⭐ | curl |
| **复杂认证** | ⭐⭐ | ⭐⭐⭐⭐⭐ | MCP |

---

### 实际建议

**开发阶段（Day 1-7）:**
```bash
# 用 curl 快速验证
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "测试"}'
```

**测试阶段（Week 2+）:**
```json
// 配置 mcp-rest-api
{
  "mcpServers": {
    "rest-api": {
      "command": "dkmaker-mcp-rest-api",
      "env": {
        "REST_BASE_URL": "http://localhost:3000",
        "REST_AUTH_TYPE": "bearer",
        "REST_AUTH_TOKEN": "your-token"
      }
    }
  }
}
```

**CI/CD 阶段:**
```yaml
# GitHub Actions
- name: Test API
  run: |
    # 使用 MCP 工具运行测试套件
    mcp-rest-api run tests/api-tests.json
```

---

### 何时必须用 MCP 工具？

**1. 需要 AI 辅助分析**
```
问：这个 API 为什么返回 500？
AI 通过 MCP 工具：
  → 调用 API
  → 获取错误详情
  → 查询文档
  → 提供修复建议
```

**2. 复杂的测试场景**
```javascript
// 需要测试流程：注册 → 登录 → 获取 token → 调用受保护的 API
// MCP 工具可以：
- 自动管理 token
- 链式调用多个 API
- 验证每一步的响应
- 生成测试报告
```

**3. 团队协作**
```
测试工程师定义测试套件
→ 保存为 JSON/YAML
→ 团队成员用 AI + MCP 执行
→ AI 分析失败原因
→ 自动生成 bug 报告
```

---

## 🎯 总结

### curl 的定位
**"瑞士军刀"** - 快速、灵活、随时可用

```bash
# 90% 的日常开发测试场景
curl -X POST localhost:3000/api/endpoint -d '{"data": "value"}'
```

### MCP 工具的定位
**"自动化测试平台"** - 可重复、可管理、AI 集成

```javascript
// 10% 的复杂场景：自动化、CI/CD、团队协作
{
  "test_suite": "user_flow",
  "steps": [...],
  "assertions": [...],
  "ai_analysis": true
}
```

### 最佳实践
```
开发 → curl（快速验证）
测试 → MCP 工具（自动化）
生产 → 监控工具 + MCP（诊断）
```

**结论**: curl 对于本地开发已经足够，MCP 工具在需要自动化、AI 辅助分析、团队协作时才显现价值。

---

## 📚 可用的 MCP REST API 工具

- **mcp-rest-api** - TypeScript，支持 GET/POST/PUT/DELETE/PATCH
- **fetch-mcp** - HTTP 获取和内容转换
- **atest-mcp-server** - Postman 替代品

---

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 测试 API
curl http://localhost:3000/api/hello
```

---

**最后更新**: 2026-01-13
**AI 开发时间**: ~25 分钟
**人工介入时间**: ~5 分钟（技术选型 + Review）
