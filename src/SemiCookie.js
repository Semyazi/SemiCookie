import userDataDefault from "./userDataDefault";
import launchSteps from "./launch";
import store from "./redux/store";

const SemiCookie = {
	version: userDataDefault.version, // The version of SemiCookie; the same as the userDataDefault version that's shipping with this version
	store,
};

Object.defineProperty(SemiCookie, "state", {
	get: () => SemiCookie.store.getState(),
});

SemiCookie.launchSteps = launchSteps;

SemiCookie.init = () => {
	for (const launchStep of Object.values(SemiCookie.launchSteps)) {
		launchStep();
	}
};

window.SemiCookie = SemiCookie;

// Requirement
if (!window.CM) {
	Game.LoadMod("https://aktanusa.github.io/CookieMonster/CookieMonster.js");
}

// Register mod
Game.registerMod("SemiCookie", SemiCookie);
