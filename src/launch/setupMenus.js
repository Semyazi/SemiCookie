import React from "react";
import ReactDOM from "react-dom";
import Provider from "react-redux/lib/components/Provider";
import SemiCookieUI from "../components/SemiCookie";
import { inject } from "../helpers";

export default () => {
	// Generate virtual element for React
	SemiCookie.virtualElement = document.createElement("div");

	ReactDOM.render(
		<Provider store={SemiCookie.store}>
			<SemiCookieUI />
		</Provider>,
		SemiCookie.virtualElement
	);

	// Render it
	const renderMenu = () => {
		// Some parts are derived from CCSE
		if (Game.onMenu !== "prefs") return;

		const menu = document.querySelector("#menu .subsection");
		if (!menu) return;

		const padding = menu.querySelector("div:last-child");

		if (padding) {
			menu.insertBefore(SemiCookie.virtualElement, padding);
		} else {
			menu.appendChild(SemiCookie.virtualElement);
		}
	};

	// Render the menu every time the menu is updated.
	inject("UpdateMenu", "after", renderMenu);
};
