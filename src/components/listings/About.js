import React from "react";
import { useSelector } from "react-redux/lib/hooks/useSelector";

export default function About() {
	const version = useSelector((state) => state.userData.version);

	return (
		<div>
			<p>Version: {version}</p>
		</div>
	);
}
