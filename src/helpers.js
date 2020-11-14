export function getHeavenlyChipsToGet() {
	const chipsOwned = Game.HowMuchPrestige(Game.cookiesReset);
	const ascendNowToOwn = Math.floor(
		Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)
	);
	const ascendNowToGet = ascendNowToOwn - Math.floor(chipsOwned);

	return ascendNowToGet;
}

export function getHeavenlyChipsTarget(defaultHc) {
	const {
		userData: { ascensions },
		ascensionData: { currentAscension },
	} = SemiCookie.state;

	if (ascensions.length > 0) {
		if (currentAscension >= ascensions.length) {
			return 0;
		}

		return ascensions[currentAscension].hc;
	} else {
		return defaultHc;
	}
}

export function getHeavenlyChips(hc) {
	const value = prompt("How many Heavenly Chips?", hc ? hc : "");

	if (value) {
		return +value;
	}

	// If user didn't enter in anything, use default.
	if (hc) {
		return +hc;
	}

	return 0;
}

export function CMLoaded() {
	return !!window.CM;
}
