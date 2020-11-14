import { createAction, createReducer } from "@reduxjs/toolkit";
import userDataDefault from "../../userDataDefault";

const initialState = userDataDefault.preferences;

export const setPreference = createAction("preferences/set");
export const resetPreferences = createAction("preferences/reset");

export default createReducer(initialState, (builder) => {
	builder
		.addCase(setPreference, (state, action) => {
			const { preference, value } = action.payload;

			state[preference] = value;
		})
		.addCase(resetPreferences, (state) => {
			state = initialState;

			return state;
		});
});

Game.registerHook("reset", (val) => {
	if (val) {
		SemiCookie.store.dispatch(resetPreferences());
	}
});
