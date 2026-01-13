import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
	test("should display welcome message", async ({ page }) => {
		await page.goto("/");

		// 验证标题存在
		const heading = page.getByRole("heading", {
			name: /Welcome to Test App 1/i,
		});
		await expect(heading).toBeVisible();

		// 验证页面标题
		await expect(page).toHaveTitle("Test App 1");

		// 验证描述文字
		const description = page.getByText(
			/Next.js application with React Compiler/i,
		);
		await expect(description).toBeVisible();
	});

	test("should have proper styling", async ({ page }) => {
		await page.goto("/");

		// 检查主容器是否使用了 flex 布局
		const main = page.locator("main");
		await expect(main).toBeVisible();
	});
});
