import { getHeavenlyChipsToGet, getHeavenlyChipsTarget } from "../helpers";

export default () => {
	const changeAscendNumber = () => {
		const {
			ascensionData: { extraPrestige },
		} = SemiCookie.state;

		const prestige = extraPrestige + getHeavenlyChipsToGet();
		const target = getHeavenlyChipsTarget(0);
		const percent = Math.floor((prestige / target) * 100);

		Game.ascendNumber.innerHTML = `${percent}%`;
		Game.ascendNumber.style.display = "block";
	};

	const changeAscendMeter = () => {
		const {
			ascensionData: { extraPrestige },
		} = SemiCookie.state;
		const prestige = extraPrestige + getHeavenlyChipsToGet();
		const target = getHeavenlyChipsTarget(0);
		const percent = (prestige / target) * 100;

		let rightPixels = 100 - percent;
		rightPixels = Math.max(0, rightPixels);
		rightPixels = Math.min(100, rightPixels);

		Game.ascendMeter.style = `right: ${rightPixels}px;`;
	};

	const callback = () => {
		changeAscendNumber();
		changeAscendMeter();

		requestAnimationFrame(callback);
	};

	requestAnimationFrame(callback);
};
