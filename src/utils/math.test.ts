import { describe, expect, it } from "vitest";
import { add, divide, formatPrice, isEven, multiply, subtract } from "./math";

describe("Math Utils", () => {
	describe("add", () => {
		it("adds two positive numbers", () => {
			expect(add(1, 2)).toBe(3);
		});

		it("adds negative numbers", () => {
			expect(add(-1, -2)).toBe(-3);
		});

		it("adds zero", () => {
			expect(add(5, 0)).toBe(5);
		});
	});

	describe("subtract", () => {
		it("subtracts two numbers", () => {
			expect(subtract(5, 3)).toBe(2);
		});

		it("handles negative results", () => {
			expect(subtract(3, 5)).toBe(-2);
		});
	});

	describe("multiply", () => {
		it("multiplies two numbers", () => {
			expect(multiply(3, 4)).toBe(12);
		});

		it("multiplies by zero", () => {
			expect(multiply(5, 0)).toBe(0);
		});
	});

	describe("divide", () => {
		it("divides two numbers", () => {
			expect(divide(10, 2)).toBe(5);
		});

		it("throws error when dividing by zero", () => {
			expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
		});

		it("handles decimal results", () => {
			expect(divide(10, 3)).toBeCloseTo(3.333, 2);
		});
	});

	describe("isEven", () => {
		it("returns true for even numbers", () => {
			expect(isEven(2)).toBe(true);
			expect(isEven(4)).toBe(true);
			expect(isEven(0)).toBe(true);
		});

		it("returns false for odd numbers", () => {
			expect(isEven(1)).toBe(false);
			expect(isEven(3)).toBe(false);
			expect(isEven(-1)).toBe(false);
		});
	});

	describe("formatPrice", () => {
		it("formats USD by default", () => {
			expect(formatPrice(1234.56)).toBe("$1,234.56");
		});

		it("formats different currencies", () => {
			expect(formatPrice(1234.56, "EUR")).toMatch(/€|EUR/);
		});

		it("formats zero", () => {
			expect(formatPrice(0)).toBe("$0.00");
		});
	});
});
