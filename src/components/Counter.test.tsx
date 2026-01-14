import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Counter from "./Counter";

describe("Counter Component", () => {
	it("renders with initial count of 0", () => {
		render(<Counter />);
		expect(screen.getByText("Count: 0")).toBeInTheDocument();
	});

	it("increments count when increment button is clicked", async () => {
		const user = userEvent.setup();
		render(<Counter />);

		const incrementButton = screen.getByRole("button", { name: /increment/i });
		await user.click(incrementButton);

		expect(screen.getByText("Count: 1")).toBeInTheDocument();
	});

	it("decrements count when decrement button is clicked", async () => {
		const user = userEvent.setup();
		render(<Counter />);

		const decrementButton = screen.getByRole("button", { name: /decrement/i });
		await user.click(decrementButton);

		expect(screen.getByText("Count: -1")).toBeInTheDocument();
	});

	it("resets count to 0 when reset button is clicked", async () => {
		const user = userEvent.setup();
		render(<Counter />);

		// 先增加几次
		const incrementButton = screen.getByRole("button", { name: /increment/i });
		await user.click(incrementButton);
		await user.click(incrementButton);
		expect(screen.getByText("Count: 2")).toBeInTheDocument();

		// 然后重置
		const resetButton = screen.getByRole("button", { name: /reset/i });
		await user.click(resetButton);

		expect(screen.getByText("Count: 0")).toBeInTheDocument();
	});

	it("handles multiple operations correctly", async () => {
		const user = userEvent.setup();
		render(<Counter />);

		const incrementButton = screen.getByRole("button", { name: /increment/i });
		const decrementButton = screen.getByRole("button", { name: /decrement/i });

		// +3
		await user.click(incrementButton);
		await user.click(incrementButton);
		await user.click(incrementButton);
		expect(screen.getByText("Count: 3")).toBeInTheDocument();

		// -1
		await user.click(decrementButton);
		expect(screen.getByText("Count: 2")).toBeInTheDocument();
	});
});
