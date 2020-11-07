import { combineReducers, createAction } from "@reduxjs/toolkit";
import ascensionData from "./ascensionData";
import userData from "./userData";

const rootReducer = combineReducers({
	ascensionData,
	userData,
});

export default (state, action) => {
	if (action.type === "state/reset") {
		return { ...state, ...{ userData: action.payload } };
	}

	return rootReducer(state, action);
};

export const resetState = createAction("state/reset");
