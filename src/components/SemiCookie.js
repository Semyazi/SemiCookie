import React from "react";
import { CollapsibleMenu, Section } from "./Menu";
import Ascensions from "./listings/Ascensions";
import Preferences from "./listings/Preferences";
import About from "./listings/About";
import Credits from "./listings/Credits";
import "./SemiCookie.scss";

export default function SemiCookieUI() {
	return (
		<div id="SemiCookieMenu">
			<CollapsibleMenu title="SemiCookie">
				<Section title="Ascensions">
					<Ascensions />
				</Section>

				<Section title="Preferences">
					<Preferences />
				</Section>

				<Section title="About">
					<About />
				</Section>

				<Section title="Credits">
					<Credits />
				</Section>
			</CollapsibleMenu>
		</div>
	);
}
