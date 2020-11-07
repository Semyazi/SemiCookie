import { createSlice } from "@reduxjs/toolkit";

const currentAscensionSlice = createSlice({
	name: "currentAscension",
	initialState: 0,
	reducers: {
		setCurrentAscension(state, action) {
			state = action.payload;

			return state;
		},
	},
});

export const { setCurrentAscension } = currentAscensionSlice.actions;
export default currentAscensionSlice.reducer;
