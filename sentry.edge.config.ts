import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: process.env.SENTRY_DSN,

	// 调整采样率
	tracesSampleRate: 1.0,

	// 设置环境
	environment: process.env.NODE_ENV,

	// Edge runtime 不支持某些功能
	debug: false,
});
