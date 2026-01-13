import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		// 手动触发一个错误来测试 Sentry
		throw new Error("这是一个测试错误 - Sentry 应该捕获这个");
	} catch (error) {
		// 捕获错误并发送到 Sentry
		Sentry.captureException(error);

		return NextResponse.json(
			{
				message: "错误已发送到 Sentry",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
