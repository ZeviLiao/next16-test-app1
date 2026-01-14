"use client";

import { useState } from "react";

export default function Counter() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>Count: {count}</p>
			<button type="button" onClick={() => setCount(count + 1)}>
				Increment
			</button>
			<button type="button" onClick={() => setCount(count - 1)}>
				Decrement
			</button>
			<button type="button" onClick={() => setCount(0)}>
				Reset
			</button>
		</div>
	);
}
