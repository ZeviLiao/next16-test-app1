import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

	// 调整采样率
	tracesSampleRate: 1.0,

	// 设置环境
	environment: process.env.NODE_ENV,

	// 调试模式（仅开发环境）
	debug: process.env.NODE_ENV === "development",

	// Replay 功能（会话回放）
	replaysOnErrorSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,

	integrations: [
		Sentry.replayIntegration({
			maskAllText: true,
			blockAllMedia: true,
		}),
	],
});
