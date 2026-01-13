import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
};

// Sentry 配置选项
const sentryOptions = {
	// 隐藏 source maps（生产环境）
	hideSourceMaps: true,

	// 自动上传 source maps 到 Sentry
	autoInstrumentServerFunctions: true,

	// 禁用 Sentry 在构建时的日志
	silent: process.env.NODE_ENV === "production",
};

export default withSentryConfig(nextConfig, sentryOptions);
