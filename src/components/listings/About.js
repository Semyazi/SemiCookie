import React from "react";
import { useSelector } from "react-redux/lib/hooks/useSelector";

export default function About() {
	const version = useSelector((state) => state.userData.version);

	return (
		<div>
			<p>Version: {version}</p>
			<p>
				If you find any bugs or problems, please make an issue on SemiCookie's
				GitHub repository.
			</p>
			<p>
				<a href="https://github.com/b1bagx55/SemiCookie" target="_blank">
					https://github.com/b1bagx55/SemiCookie
				</a>
			</p>
		</div>
	);
}
