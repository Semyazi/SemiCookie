import { CMLoaded } from "../helpers";

export default () => {
	setInterval(() => {
		if (!CMLoaded() || !CM?.Cache?.Objects) return;

		const {
			userData: {
				preferences: { autoBuyBuildings },
			},
		} = SemiCookie.state;

		if (!autoBuyBuildings) {
			return;
		}

		let bestBuilding = null;
		let bestBuildingPaybackPeriod = Infinity;

		for (const [buildingName, building] of Object.entries(CM.Cache.Objects)) {
			if (building.pp < bestBuildingPaybackPeriod || !bestBuilding) {
				bestBuilding = buildingName;
				bestBuildingPaybackPeriod = building.pp;
			}
		}

		if (bestBuilding) {
			Game.Objects[bestBuilding].buy();
		}
	}, 100);
};
