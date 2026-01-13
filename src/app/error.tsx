"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// 将错误上报到 Sentry
		Sentry.captureException(error);
	}, [error]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="max-w-md w-full text-center">
				<h2 className="text-2xl font-bold mb-4">出错了！</h2>
				<p className="text-gray-600 mb-6">
					抱歉，应用遇到了一个错误。错误已被记录，我们会尽快修复。
				</p>
				<button
					type="button"
					onClick={() => reset()}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					重试
				</button>
			</div>
		</div>
	);
}
