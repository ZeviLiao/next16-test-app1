# 单元测试和组件测试指南

**最后更新**: 2026-01-14

---

## 🎯 测试工具配置

### 我们使用的测试栈

```
单元测试 + 组件测试:
├── Vitest（测试运行器）← 替代 Jest
├── RTL（React Testing Library）← React 组件测试
└── Testing Library User Event ← 模拟用户交互
```

---

## 📊 Vitest vs Jest vs RTL 的关系

### 重要：理解角色分工

| 工具 | 类型 | 作用 | 是否需要 |
|------|------|------|---------|
| **Vitest** | 测试运行器 | 运行测试、断言、Mock | ✅ 需要 |
| **Jest** | 测试运行器 | 运行测试、断言、Mock | ❌ 不需要（被 Vitest 替代） |
| **RTL** | React 测试工具 | 渲染组件、查找元素 | ✅ 需要 |

### 🔑 关键理解

**Vitest 和 Jest 是二选一，不是都要！**

```
❌ 错误配置：
├── Jest（测试运行器）
├── Vitest（测试运行器）← 冲突！
└── RTL

✅ 正确配置（我们的）：
├── Vitest（测试运行器）← 只要一个
└── RTL（React 组件测试）
```

---

## 💡 为什么选 Vitest 而不是 Jest？

| 特性 | Jest | Vitest |
|------|------|--------|
| **速度** | 🚶 中等 | ⚡ 极快（5-10x） |
| **ESM 支持** | ⚠️ 需要配置 | ✅ 原生支持 |
| **配置** | 复杂 | 简单 |
| **Next.js 集成** | 需要 next/jest | 直接支持 |
| **Vite 集成** | 不支持 | ✅ 原生 |
| **API 兼容性** | - | ✅ 兼容 Jest API |

**一句话：Vitest 更快、更现代，完全兼容 Jest API。**

---

## 🎯 Jest 扮演什么角色？

### 答案：在我们的项目中，Jest **不扮演任何角色**

**为什么？**
- Vitest 已经提供了 Jest 的所有功能
- Vitest API 与 Jest 100% 兼容
- Vitest 更快、更现代

### Jest 的历史角色

```
2014-2021：Jest 时代
├── Facebook 开发
├── 测试运行器标准
└── React 官方推荐

2021-现在：Vitest 时代
├── 更快的 Jest 替代品
├── 完全兼容 Jest API
└── Vite 生态标准
```

### 什么时候还需要 Jest？

| 场景 | 用 Jest？ | 用 Vitest？ |
|------|----------|-----------|
| 新项目 | ❌ | ✅ 推荐 |
| 老项目（已有 Jest） | ✅ 可以继续用 | 🟡 可以迁移 |
| 不用 Vite | ✅ 可以考虑 | ✅ Vitest 也行 |
| 需要特定 Jest 插件 | ✅ | ❌ |

**总结：新项目直接用 Vitest，老项目可以保持 Jest 或迁移。**

---

## 📦 已安装的包

```json
{
  "devDependencies": {
    "vitest": "^4.0.17",                      // 测试运行器（替代 Jest）
    "@vitejs/plugin-react": "^5.1.2",        // React 支持
    "@testing-library/react": "^16.3.1",     // RTL 核心
    "@testing-library/dom": "^10.4.1",       // DOM 查询
    "@testing-library/jest-dom": "^6.9.1",   // 扩展断言（toBeInTheDocument 等）
    "@testing-library/user-event": "^14.6.1", // 模拟用户交互
    "jsdom": "^27.4.0"                        // 模拟浏览器 DOM
  }
}
```

---

## 🚀 使用方法

### 运行测试

```bash
# 运行所有单元测试和组件测试（watch 模式）
npm run test:unit

# 或直接
npm test

# UI 模式（图形界面）
npm run test:unit:ui

# 生成覆盖率报告
npm run test:coverage

# 运行 E2E 测试（Playwright）
npm run test:e2e
```

---

## 📝 测试示例

### 1️⃣ 单元测试（纯函数）

**文件**: `src/utils/math.ts`
```typescript
export function add(a: number, b: number): number {
  return a + b;
}
```

**测试**: `src/utils/math.test.ts`
```typescript
import { describe, expect, it } from 'vitest';
import { add } from './math';

describe('Math Utils', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
```

**特点**：
- 测试纯函数
- 速度极快（0.01 秒）
- 不需要 DOM
- 使用 Vitest 的 `describe`, `it`, `expect`

---

### 2️⃣ 组件测试（RTL）

**组件**: `src/components/Counter.tsx`
```typescript
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**测试**: `src/components/Counter.test.tsx`
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Counter from './Counter';

describe('Counter Component', () => {
  it('renders with initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('increments when button clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const button = screen.getByRole('button', { name: /increment/i });
    await user.click(button);

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
```

**特点**：
- 测试 React 组件行为
- 使用 RTL 的 `render`, `screen`
- 使用 `userEvent` 模拟用户操作
- 测试用户看到的结果，不测试内部实现

---

## 🎯 RTL 核心 API

### 渲染组件
```typescript
import { render, screen } from '@testing-library/react';

render(<MyComponent />);
```

### 查找元素（推荐优先级）

| 方法 | 使用场景 | 示例 |
|------|---------|------|
| `getByRole` | 🥇 首选 | `screen.getByRole('button', { name: /submit/i })` |
| `getByLabelText` | 🥈 表单 | `screen.getByLabelText('Email')` |
| `getByPlaceholderText` | 🥉 输入框 | `screen.getByPlaceholderText('Enter email')` |
| `getByText` | 🏅 文本内容 | `screen.getByText('Welcome')` |
| `getByTestId` | ⚠️ 最后选择 | `screen.getByTestId('custom-element')` |

### 模拟用户交互
```typescript
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

// 点击
await user.click(button);

// 输入文字
await user.type(input, 'Hello');

// 选择下拉选项
await user.selectOptions(select, 'option1');

// 上传文件
await user.upload(fileInput, file);
```

### 断言
```typescript
// RTL + jest-dom 扩展断言
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toHaveTextContent('Hello');
expect(element).toHaveClass('active');
expect(input).toHaveValue('test');
expect(checkbox).toBeChecked();
```

---

## 📂 测试文件组织

```
src/
├── components/
│   ├── Counter.tsx
│   └── Counter.test.tsx        ← 组件测试
├── utils/
│   ├── math.ts
│   └── math.test.ts            ← 单元测试
└── ...

tests/
├── setup.ts                    ← Vitest 设置
└── e2e/                        ← Playwright E2E 测试
    ├── homepage.spec.ts
    └── api.spec.ts
```

**命名规则**：
- 单元测试：`*.test.ts`
- 组件测试：`*.test.tsx`
- E2E 测试：`*.spec.ts`（放在 `tests/e2e/`）

---

## ⚙️ 配置文件

### `vitest.config.ts`
```typescript
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,           // 全局 API（不需要 import）
    environment: 'jsdom',    // 模拟浏览器 DOM
    setupFiles: './tests/setup.ts',
    exclude: ['**/e2e/**'],  // 排除 E2E 测试
  },
});
```

### `tests/setup.ts`
```typescript
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 每个测试后自动清理
afterEach(() => {
  cleanup();
});
```

---

## 🎯 测试金字塔（完整版）

```
你的项目测试栈：

        /\
       /  \        E2E 测试（10-20 个）
      / PW  \      Playwright
     /______\      npm run test:e2e
    /        \
   /   RTL    \    组件测试（50-100 个）
  /____________\   RTL + Vitest
 /              \  npm run test:unit
/    Vitest      \ 单元测试（100+ 个）
/__________________\ Vitest
                     npm run test:unit
```

---

## 🔥 实际测试结果

```bash
$ npm run test:unit

✓ src/utils/math.test.ts (15 tests) 32ms
✓ src/components/Counter.test.tsx (5 tests) 195ms

Test Files  2 passed (2)
     Tests  20 passed (20)
  Start at  00:25:36
  Duration  1.16s
```

**特点**：
- ✅ 20 个测试全部通过
- ⚡ 只需 1.16 秒
- 🚀 比 Jest 快 5-10 倍

---

## 📊 Vitest vs Jest 速度对比

| 测试数量 | Jest | Vitest | 提升 |
|---------|------|--------|------|
| 20 个测试 | 5-8 秒 | 1.2 秒 | 5x |
| 100 个测试 | 20-30 秒 | 3-5 秒 | 6x |
| 500 个测试 | 2-3 分钟 | 15-30 秒 | 6x |

---

## 💡 最佳实践

### 1️⃣ 测试用户行为，不测试实现

❌ 错误（测试实现细节）：
```typescript
// 不要测试 state
expect(wrapper.state('count')).toBe(0);
```

✅ 正确（测试用户看到的）：
```typescript
// 测试用户看到什么
expect(screen.getByText('Count: 0')).toBeInTheDocument();
```

### 2️⃣ 使用 userEvent 而不是 fireEvent

❌ 较差（fireEvent）：
```typescript
fireEvent.click(button);
```

✅ 更好（userEvent）：
```typescript
const user = userEvent.setup();
await user.click(button);
```

**原因**：`userEvent` 更接近真实用户行为。

### 3️⃣ 优先使用语义化查询

✅ 推荐优先级：
```typescript
// 1. getByRole（最推荐）
screen.getByRole('button', { name: /submit/i })

// 2. getByLabelText（表单）
screen.getByLabelText('Email')

// 3. getByText（文本）
screen.getByText('Welcome')

// 4. getByTestId（最后选择）
screen.getByTestId('custom')
```

---

## 🎓 总结

### Vitest 的角色
- ✅ 测试运行器（替代 Jest）
- ✅ 提供 `describe`, `it`, `expect`
- ✅ 提供 Mock 功能
- ✅ 更快、更现代

### RTL 的角色
- ✅ React 组件测试工具
- ✅ 提供 `render`, `screen`
- ✅ 配合 Vitest 使用

### Jest 的角色
- ❌ 在我们的项目中：**没有角色**
- ✅ 已被 Vitest 替代
- 🟡 老项目可以继续用

---

**一句话总结：**
Vitest 是更快的 Jest，RTL 是 React 组件测试工具，两者配合使用，不需要 Jest。

---

## 🔗 相关文档

- [Vitest 官方文档](https://vitest.dev/)
- [RTL 官方文档](https://testing-library.com/react)
- [Testing Library 查询优先级](https://testing-library.com/docs/queries/about#priority)
