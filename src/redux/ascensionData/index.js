import { combineReducers } from "@reduxjs/toolkit";
import currentAscension from "./currentAscension";
import extraPrestige from "./extraPrestige";

export default combineReducers({
	currentAscension,
	extraPrestige,
});
