import { expect, test } from "@playwright/test";

test.describe("API Endpoints", () => {
	test.describe("POST /api/hello", () => {
		test("should return success response", async ({ request }) => {
			const response = await request.post("/api/hello", {
				data: {
					name: "Playwright",
					message: "Testing API",
				},
			});

			expect(response.status()).toBe(200);

			const data = await response.json();
			expect(data).toHaveProperty("message", "Hello from Next.js API!");
			expect(data).toHaveProperty("received");
			expect(data.received).toEqual({
				name: "Playwright",
				message: "Testing API",
			});
			expect(data).toHaveProperty("timestamp");
		});

		test("should reject GET requests", async ({ request }) => {
			const response = await request.get("/api/hello");

			expect(response.status()).toBe(405);

			const data = await response.json();
			expect(data.message).toContain("POST");
		});

		test("should handle invalid JSON", async ({ request }) => {
			const response = await request.post("/api/hello", {
				headers: {
					"Content-Type": "application/json",
				},
				data: "invalid json",
			});

			expect(response.status()).toBe(400);

			const data = await response.json();
			expect(data).toHaveProperty("error", "Invalid JSON body");
		});
	});

	test.describe("CRUD /api/todos", () => {
		test("should get all todos", async ({ request }) => {
			const response = await request.get("/api/todos");

			expect(response.status()).toBe(200);

			const todos = await response.json();
			expect(Array.isArray(todos)).toBe(true);
			expect(todos.length).toBeGreaterThan(0);
		});

		test("should create, update, and delete todo", async ({ request }) => {
			// 1. Create
			const createResponse = await request.post("/api/todos", {
				data: {
					title: "Playwright Test Todo",
					completed: false,
				},
			});

			expect(createResponse.status()).toBe(201);

			const newTodo = await createResponse.json();
			expect(newTodo).toHaveProperty("id");
			expect(newTodo.title).toBe("Playwright Test Todo");
			expect(newTodo.completed).toBe(false);

			const todoId = newTodo.id;

			// 2. Get single todo
			const getResponse = await request.get(`/api/todos/${todoId}`);
			expect(getResponse.status()).toBe(200);

			const fetchedTodo = await getResponse.json();
			expect(fetchedTodo.id).toBe(todoId);

			// 3. Update
			const updateResponse = await request.patch(`/api/todos/${todoId}`, {
				data: {
					completed: true,
				},
			});

			expect(updateResponse.status()).toBe(200);

			const updatedTodo = await updateResponse.json();
			expect(updatedTodo.completed).toBe(true);
			expect(updatedTodo.title).toBe("Playwright Test Todo");

			// 4. Delete
			const deleteResponse = await request.delete(`/api/todos/${todoId}`);
			expect(deleteResponse.status()).toBe(200);

			const deleteData = await deleteResponse.json();
			expect(deleteData.id).toBe(todoId);

			// 5. Verify deletion
			const verifyResponse = await request.get(`/api/todos/${todoId}`);
			expect(verifyResponse.status()).toBe(404);
		});

		test("should validate required fields", async ({ request }) => {
			const response = await request.post("/api/todos", {
				data: {
					completed: false,
					// missing title
				},
			});

			expect(response.status()).toBe(400);

			const data = await response.json();
			expect(data.error).toContain("title");
		});

		test("should return 404 for non-existent todo", async ({ request }) => {
			const response = await request.get("/api/todos/non_existent_id");
			expect(response.status()).toBe(404);
		});
	});
});
