import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		return NextResponse.json(
			{
				message: "Hello from Next.js API!",
				received: body,
				timestamp: new Date().toISOString(),
			},
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: "Invalid JSON body",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 400 },
		);
	}
}

export async function GET() {
	return NextResponse.json(
		{
			message: "This endpoint only accepts POST requests",
			hint: "Try sending a POST request with JSON body",
		},
		{ status: 405 },
	);
}
