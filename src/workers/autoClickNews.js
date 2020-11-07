export default () => {
	setInterval(() => {
		const {
			userData: {
				preferences: { autoClickNews },
			},
		} = SemiCookie.state;

		if (!autoClickNews) {
			return;
		}

		if (Game.TickerEffect && Game.TickerEffect.type == "fortune") {
			Game.tickerL.click();
		}
	}, 3000);
};
