import { createSlice } from "@reduxjs/toolkit";

const extraPrestigeSlice = createSlice({
	name: "extraPrestige",
	initialState: 0,
	reducers: {
		setExtraPrestige(state, action) {
			state = action.payload;

			return state;
		},
	},
});

export const { setExtraPrestige } = extraPrestigeSlice.actions;
export default extraPrestigeSlice.reducer;
