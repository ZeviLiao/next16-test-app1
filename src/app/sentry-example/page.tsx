"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
	const handleTestError = () => {
		throw new Error("测试客户端错误 - Sentry 应该捕获这个");
	};

	const handleCaptureMessage = () => {
		Sentry.captureMessage("这是一个测试消息", "info");
		alert("消息已发送到 Sentry（查看浏览器控制台）");
	};

	const handleCaptureException = () => {
		try {
			throw new Error("手动捕获的错误");
		} catch (error) {
			Sentry.captureException(error);
			alert("错误已发送到 Sentry（查看浏览器控制台）");
		}
	};

	const handleSetUser = () => {
		Sentry.setUser({
			id: "123",
			email: "user@example.com",
			username: "测试用户",
		});
		alert("用户信息已设置");
	};

	const handleAddBreadcrumb = () => {
		Sentry.addBreadcrumb({
			category: "action",
			message: "用户点击了按钮",
			level: "info",
		});
		alert("面包屑已添加");
	};

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Sentry 测试页面</h1>

				<div className="space-y-4">
					<div className="p-4 bg-blue-50 rounded">
						<h2 className="text-xl font-semibold mb-2">1. 测试错误捕获</h2>
						<p className="text-gray-600 mb-4">
							这会抛出一个错误，Sentry 会自动捕获并上报
						</p>
						<button
							type="button"
							onClick={handleTestError}
							className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
						>
							抛出错误
						</button>
					</div>

					<div className="p-4 bg-green-50 rounded">
						<h2 className="text-xl font-semibold mb-2">2. 发送消息</h2>
						<p className="text-gray-600 mb-4">发送一条信息到 Sentry</p>
						<button
							type="button"
							onClick={handleCaptureMessage}
							className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
						>
							发送消息
						</button>
					</div>

					<div className="p-4 bg-yellow-50 rounded">
						<h2 className="text-xl font-semibold mb-2">3. 手动捕获异常</h2>
						<p className="text-gray-600 mb-4">捕获并上报一个异常</p>
						<button
							type="button"
							onClick={handleCaptureException}
							className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
						>
							捕获异常
						</button>
					</div>

					<div className="p-4 bg-purple-50 rounded">
						<h2 className="text-xl font-semibold mb-2">4. 设置用户信息</h2>
						<p className="text-gray-600 mb-4">为后续事件关联用户信息</p>
						<button
							type="button"
							onClick={handleSetUser}
							className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
						>
							设置用户
						</button>
					</div>

					<div className="p-4 bg-gray-50 rounded">
						<h2 className="text-xl font-semibold mb-2">5. 添加面包屑</h2>
						<p className="text-gray-600 mb-4">记录用户行为轨迹</p>
						<button
							type="button"
							onClick={handleAddBreadcrumb}
							className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
						>
							添加面包屑
						</button>
					</div>

					<div className="p-4 bg-orange-50 rounded">
						<h2 className="text-xl font-semibold mb-2">6. 测试 API 错误</h2>
						<p className="text-gray-600 mb-4">测试服务端错误捕获</p>
						<button
							type="button"
							onClick={() => fetch("/api/test-sentry")}
							className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
						>
							触发 API 错误
						</button>
					</div>
				</div>

				<div className="mt-8 p-4 bg-gray-100 rounded">
					<h3 className="font-semibold mb-2">提示：</h3>
					<ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
						<li>确保已在 .env.local 中配置 SENTRY_DSN</li>
						<li>打开浏览器控制台查看 Sentry 日志</li>
						<li>在 Sentry.io 查看上报的错误</li>
						<li>在开发环境中，错误会输出到控制台</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
