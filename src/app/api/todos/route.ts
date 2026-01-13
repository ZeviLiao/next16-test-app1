import { type NextRequest, NextResponse } from "next/server";
import { type Todo, todos } from "./store";

// GET /api/todos - 获取所有 todos
export async function GET() {
	const allTodos = Array.from(todos.values());

	return NextResponse.json(allTodos, { status: 200 });
}

// POST /api/todos - 创建新 todo
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// 验证必填字段
		if (!body.title || typeof body.title !== "string") {
			return NextResponse.json(
				{ error: "title is required and must be a string" },
				{ status: 400 },
			);
		}

		// 创建新 todo
		const id = `todo_${Date.now()}`;
		const newTodo: Todo = {
			id,
			title: body.title,
			completed: body.completed ?? false,
			createdAt: new Date().toISOString(),
		};

		todos.set(id, newTodo);

		return NextResponse.json(newTodo, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{
				error: "Invalid JSON body",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 400 },
		);
	}
}
