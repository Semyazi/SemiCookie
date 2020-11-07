import React from "react";

export default function Credits() {
	const credits = [
		["Default Ascensions", "Finkus"],
		["Collapsible Menu CSS", "Aktanusa"],
		["Menu DOM Injection", "Klattmose"],
	];

	return (
		<div>
			{credits.map(([topic, author], index) => (
				<p key={index}>
					{topic} — {author}
				</p>
			))}
			<p>Made by Semyazi#7007</p>
		</div>
	);
}
