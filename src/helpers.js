export const getHeavenlyChipsToGet = () => {
	const chipsOwned = Game.HowMuchPrestige(Game.cookiesReset);
	const ascendNowToOwn = Math.floor(
		Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)
	);
	const ascendNowToGet = ascendNowToOwn - Math.floor(chipsOwned);

	return ascendNowToGet;
};

export const getHeavenlyChipsTarget = (defaultHc) => {
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
};

export const getHeavenlyChips = (hc) => {
	const value = prompt("How many Heavenly Chips?", hc ? hc : "");

	if (value) {
		return +value;
	}

	// If user didn't enter in anything, use default.
	if (hc) {
		return +hc;
	}

	return 0;
};

export const CMLoaded = () => !!window.CM;

// Inject code from Cppkies
export const inject = (funcKey, where, targetFunc, context = {}) => {
	const func = Game[funcKey];
	let newFuncStr = func.toString();

	let target = targetFunc.toString();
	target = target.slice(target.indexOf("{") + 1, target.lastIndexOf("}"));

	const findStart = /(\)[^{]*{)/;
	const findEnd = /(}?)$/;

	switch (where) {
		case "before":
			newFuncStr = newFuncStr.replace(findStart, `$1${target}`);

			break;

		case "after":
			newFuncStr = newFuncStr.replace(findEnd, `${target}$1`);

			break;
	}

	let contextStr = "";

	for (const i in context) {
		contextStr += `var ${i} = globalThis.tempCtx.${i}\n`;
	}

	globalThis.tempCtx = context;

	const newFunc = new Function(
		`${contextStr}globalThis.tempCtx = null\nreturn (${newFuncStr})`
	)();

	newFunc.prototype = func.prototype;

	Game[funcKey] = newFunc;
};
