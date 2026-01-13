// 共享的 Todo 数据存储（演示用）

export interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: string;
}

export const todos = new Map<string, Todo>();

// 初始化示例数据
todos.set("todo_1", {
	id: "todo_1",
	title: "学习 Next.js 16",
	completed: false,
	createdAt: new Date().toISOString(),
});

todos.set("todo_2", {
	id: "todo_2",
	title: "测试 MCP 工具",
	completed: true,
	createdAt: new Date().toISOString(),
});
