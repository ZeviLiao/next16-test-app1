import { type NextRequest, NextResponse } from "next/server";
import { todos } from "../store";

// GET /api/todos/:id - 获取单个 todo
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const todo = todos.get(id);

	if (!todo) {
		return NextResponse.json({ error: "Todo not found" }, { status: 404 });
	}

	return NextResponse.json(todo, { status: 200 });
}

// PATCH /api/todos/:id - 更新 todo
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const todo = todos.get(id);

		if (!todo) {
			return NextResponse.json({ error: "Todo not found" }, { status: 404 });
		}

		const body = await request.json();

		// 更新字段
		const updatedTodo = {
			...todo,
			...(body.title !== undefined && { title: body.title }),
			...(body.completed !== undefined && { completed: body.completed }),
		};

		todos.set(id, updatedTodo);

		return NextResponse.json(updatedTodo, { status: 200 });
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

// DELETE /api/todos/:id - 删除 todo
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const todo = todos.get(id);

	if (!todo) {
		return NextResponse.json({ error: "Todo not found" }, { status: 404 });
	}

	todos.delete(id);

	return NextResponse.json(
		{
			message: "Todo deleted successfully",
			id,
		},
		{ status: 200 },
	);
}
