import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: process.env.SENTRY_DSN,

	// 调整采样率
	tracesSampleRate: 1.0,

	// 设置环境
	environment: process.env.NODE_ENV,

	// 调试模式（仅开发环境）
	debug: process.env.NODE_ENV === "development",
});
