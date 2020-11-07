import userDataDefault from "../../userDataDefault";

import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = userDataDefault.ascensions;

export const addAscension = createAction("ascensions/add");
export const editAscension = createAction("ascensions/edit");
export const deleteAscension = createAction("ascensions/delete");

export default createReducer(initialState, (builder) => {
	builder
		.addCase(addAscension, (state, action) => {
			state.push({ hc: action.payload });
		})
		.addCase(editAscension, (state, action) => {
			const { index, hc } = action.payload;

			state[index] = { hc };
		})
		.addCase(deleteAscension, (state, action) => {
			state.splice(action.payload, 1);
		});
});
