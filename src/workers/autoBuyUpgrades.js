import { CMLoaded } from "../helpers";

export default () => {
	const MAX_UPGRADE_TIME = 5 * 60;

	setInterval(() => {
		if (!CMLoaded()) return;
		if (!CM.Cache.Upgrades) return;

		const {
			userData: {
				preferences: { autoBuyUpgrades },
			},
		} = SemiCookie.state;

		if (!autoBuyUpgrades) {
			return;
		}

		// Get actual upgrades
		const upgrades = [];

		for (const upgrade of Game.UpgradesInStore) {
			if (upgrade.pool === "toggle" || upgrade.pool === "tech") {
				continue;
			}

			if (upgrade.isVaulted()) {
				continue;
			}

			upgrades.push(upgrade.name);
		}

		let bestUpgrade = null;
		let bestUpgradePaybackPeriod = Infinity;

		// Calculate max upgrade price
		const maxUpgradePrice = Game.cookies + Game.unbuffedCps * MAX_UPGRADE_TIME;

		for (const [upgradeName, upgrade] of Object.entries(CM.Cache.Upgrades)) {
			if (!upgrades.includes(upgradeName)) {
				continue;
			}

			const upgradePrice = Game.UpgradesInStore.find(
				(upgrade) => upgrade.name === upgradeName
			).getPrice();

			if (upgradePrice > maxUpgradePrice) {
				continue;
			}

			if (upgrade.pp < bestUpgradePaybackPeriod || !bestUpgrade) {
				bestUpgrade = upgradeName;
				bestUpgradePaybackPeriod = upgrade.pp;
			}
		}

		if (bestUpgrade) {
			Game.Upgrades[bestUpgrade].buy();
		}
	}, 100);
};
