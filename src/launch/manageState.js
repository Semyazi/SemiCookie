// Versions of userData
/*
{
	version: "1.0.0-alpha",
	ascensions: [
		{ hc: 440 },
		{ hc: 3111 },
		{ hc: 15361 },
		{ hc: 110732 },
		{ hc: 666666 },
		{ hc: 2155831 },
		{ hc: 9013074 },
		{ hc: 20091528 },
		{ hc: 77777777 },
		{ hc: 240353606 },
		{ hc: 900 * M },
		{ hc: 2.6 * B },
		{ hc: 17111111095 },
		{ hc: 14999999985 },
		{ hc: 77777777777 },
		{ hc: 333 * B },
		{ hc: 333 * B },
		{ hc: 333 * B },
	],
	preferences: {
		autoClickCookie: false,
		autoClickShimmers: true,
		autoClickReindeers: true,
		autoClickWrathCookies: false,
		autoClickNews: true,
		autoBuyUpgrades: false,
		autoBuyBuildings: false,
	},
}
{
	version: "1.0.0",
	ascensions: [
		{ hc: 440 },
		{ hc: 2887 },
		{ hc: 30385 },
		{ hc: 128376 },
		{ hc: 844442 },
		{ hc: 2855833 },
		{ hc: 13468629 },
		{ hc: 12313751 },
		{ hc: 77777777 },
		{ hc: 240353606 },
		{ hc: 900 * M },
		{ hc: 3 * B },
		{ hc: 11111111110 },
		{ hc: 30555555525 },
		{ hc: 86777777777 },
		{ hc: 383 * B },
		{ hc: 333 * B },
		{ hc: 488555555554 },
		{ hc: 900 * B },
	],
	preferences: {
		autoClickCookie: false,
		autoClickShimmers: true,
		autoClickReindeers: true,
		autoClickWrathCookies: false,
		autoClickNews: true,
		autoBuyUpgrades: false,
		autoBuyBuildings: false,
	},
}
*/

import { resetState } from "../redux/reducer";
import userDataDefault from "../userDataDefault";

const migrate = (userData) => {
	switch (userData.version) {
		case "1.0.0-alpha":
			return userData;

		case "1.0.0":
			return userData;

		default:
			console.error("Couldn't restore saved data for SemiCookie.");

			return userDataDefault;
	}
};

export default () => {
	SemiCookie.save = () => {
		return JSON.stringify(SemiCookie.state.userData);
	};

	SemiCookie.load = (str) => {
		const state = migrate(JSON.parse(str));

		SemiCookie.store.dispatch(resetState(state));
	};
};
