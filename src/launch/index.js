import manageState from "./manageState";
import startPrestigeLoader from "./startPrestigeLoader";
import calculateAscension from "./calculateAscension";
import setupMenus from "./setupMenus";
import workers from "../workers";

export default {
	manageState,
	startPrestigeLoader,
	calculateAscension,
	...workers,
	setupMenus,
};
