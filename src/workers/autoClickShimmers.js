export default () => {
	setInterval(() => {
		const {
			userData: {
				preferences: {
					autoClickShimmers,
					autoClickReindeers,
					autoClickWrathCookies,
				},
			},
		} = SemiCookie.state;

		if (!autoClickShimmers) {
			return;
		}

		for (const shimmer of Game.shimmers) {
			if (shimmer.wrath && !autoClickWrathCookies) {
				continue;
			}

			if (shimmer.type === "reindeer" && !autoClickReindeers) {
				continue;
			}

			shimmer.pop();
		}
	}, 1000);
};
