import { combineReducers } from "@reduxjs/toolkit";
import version from "./version";
import ascensions from "./ascensions";
import preferences from "./preferences";

export default combineReducers({
	version,
	ascensions,
	preferences,
});
