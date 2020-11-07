export default () => {
	const CPS = 8;

	setInterval(() => {
		const {
			userData: {
				preferences: { autoClickCookie },
			},
		} = SemiCookie.state;

		if (!autoClickCookie) {
			return;
		}

		Game.ClickCookie();
	}, 1000 / CPS);
};
