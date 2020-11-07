import { createSlice } from "@reduxjs/toolkit";
import userDataDefault from "../../userDataDefault";

const version = createSlice({
	name: "version",
	initialState: userDataDefault.version,
	reducers: {
		setVersion(state, action) {
			state = action.payload;

			return state;
		},
	},
});

export const { setVersion } = version.actions;
export default version.reducer;
