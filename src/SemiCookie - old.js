import React from "react";
import ReactDOM from "react-dom";
import MyComponent from "./components/MyComponent";

const M = 10 ** 6;
const B = 10 ** 9;

// Helpers
function getHeavenlyChipsToGet() {
    const chipsOwned = Game.HowMuchPrestige(Game.cookiesReset);
    const ascendNowToOwn = Math.floor(
        Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)
    );
    const ascendNowToGet = ascendNowToOwn - Math.floor(chipsOwned);

    return ascendNowToGet;
}

function bootstrapSemiCookie() {
    // Helpers
    function prettifyMenuListings(listings) {
        let str = "";

        for (listing in listings) {
            str += `<div class="listing"><b>${listing}: ${listings[listing]}</b></div>`;
        }

        return str;
    }

    function getHeavenlyChipsTarget(defaultHc) {
        if (UserData.ascensions.length > 0) {
            return UserData.ascensions[UserData.currentAscension].hc;
        } else {
            return defaultHc;
        }
    }

    function boolToStatus(bool) {
        return bool ? "ON" : "OFF";
    }

    // General mod data
    const SemiCookie = {
        isLoaded: false,
        menuAscensions: null,
    };

    // Data which will persist between sessions
    let UserData = {
        ascensions: [
            { hc: 440 },
            { hc: 3111 },
            { hc: 15361 },
            { hc: 110732 },
            { hc: 666666 },
            { hc: 2155831 },
            { hc: 9013074 },
            { hc: 20091528 },
            { hc: 77777777 },
            { hc: 240353606 },
            { hc: 900 * M },
            { hc: 2.6 * B },
            { hc: 17111111095 },
            { hc: 14999999985 },
            { hc: 77777777777 },
            { hc: 333 * B },
            { hc: 333 * B },
            { hc: 333 * B },
        ],
        currentAscension: 0, // Which one we're working towards
        preferences: {
            // Stuff that can be changed in the menu
            autoClickShimmers: true,
            autoClickReindeers: true,
            autoClickWrathCookies: false,
            autoClickNews: true,
        },
    };

    SemiCookie.launch = () => {
        if (SemiCookie.isLoaded) return;

        // Load
        SemiCookie.manageState();
        SemiCookie.autoClickShimmers();
        SemiCookie.autoClickNews();
        SemiCookie.startAscensionTracker();
        SemiCookie.startPrestigeLoader();
        SemiCookie.setupMenus();

        SemiCookie.isLoaded = true;
        console.log("SemiCookie loaded! 🚀");
    };

    // Shimmers
    SemiCookie.autoClickShimmers = () => {
        setInterval(() => {
            if (!UserData.preferences.autoClickShimmers) {
                return;
            }

            for (const shimmer of Game.shimmers) {
                if (
                    shimmer.wrath &&
                    !UserData.preferences.autoClickWrathCookies
                ) {
                    continue;
                }

                if (
                    shimmer.type === "reindeer" &&
                    !UserData.preferences.autoClickReindeers
                ) {
                    continue;
                }

                shimmer.pop();
            }
        }, 1000);
    };

    // News
    SemiCookie.autoClickNews = () => {
        setInterval(() => {
            if (!UserData.preferences.autoClickNews) {
                return;
            }

            if (Game.TickerEffect && Game.TickerEffect.type == "fortune") {
                Game.tickerL.click();
            }
        }, 3000);
    };

    // Ascensions
    SemiCookie.startAscensionTracker = () => {
        Game.customAscend.push(() => {
            if (Game.AscendTimer !== 1) {
                return;
            }

            UserData.currentAscension += 1;
        });
    };

    SemiCookie.startPrestigeLoader = () => {
        const changeAscendNumber = () => {
            const heavenlyChipsToGet = getHeavenlyChipsToGet();
            const target = getHeavenlyChipsTarget(0);
            const percent = Math.floor((heavenlyChipsToGet / target) * 100);

            Game.ascendNumber.innerHTML = `${percent}%`;
            Game.ascendNumber.style.display = "block";
        };

        const changeAscendMeter = () => {
            const target = getHeavenlyChipsTarget(0);
            const percent = (getHeavenlyChipsToGet() / target) * 100;

            let rightPixels = 100 - percent;
            rightPixels = Math.max(0, rightPixels);
            rightPixels = Math.min(100, rightPixels);

            Game.ascendMeter.style = `right: ${rightPixels}px;`;
        };

        const callback = () => {
            changeAscendNumber();
            changeAscendMeter();

            requestAnimationFrame(callback);
        };

        requestAnimationFrame(callback);
    };

    // Menus
    SemiCookie.setupMenus = () => {
        // Styles
        const style = document.createElement("style");
        style.innerHTML = `

		table#ascensionsTable {
			width: 100%;
			text-align: left;
			margin-left: 1rem;
		}

		table#ascensionsTable tbody tr {
			cursor: pointer;
		}

		table#ascensionsTable tbody td {
			padding: 0.4rem 0;
			margin: 0.2rem 0;
		}

		table#ascensionsTable thead th {
			padding-bottom: 0.9rem;
		}

		/* Class for active ascension */
		table#ascensionsTable tbody tr.activeAscension {
			background-color: gray;
			cursor: default;
		}

		/* Pencil pointer */
		table#ascensionsTable tbody tr td:nth-child(3) * {
			cursor: pointer !important;
		}

		table#ascensionsTable tbody tr:last-child td:nth-child(4) label::before {
			content: "❌";
			cursor: pointer !important;
		}

		/* Add button */
		table#ascensionsTable thead tr th:nth-child(5) {
			cursor: pointer !important;
		}
		`;

        const ref = document.querySelector("script");
        ref.parentNode.insertBefore(style, ref);

        // Alerts
        const getHeavenlyChips = (hc) => {
            const value = prompt("How many Heavenly Chips?", hc ? hc : "");

            if (value) {
                return +value;
            }

            if (hc) {
                return +hc;
            }

            return 0;
        };

        const confirmDeletion = (i) => {
            return confirm(
                `Are you sure you want to delete Ascension #${i + 1}?`
            );
        };

        // Menus

        // React

        Game.customOptionsMenu.push(() => {
            function renderAscension({ i, hc }) {
                return `
				<tr>
					<td><label>${i + 1}</label></td>
					<td><label>${Beautify(hc)}</label></td>
					<td><label>✏️</label></td>
					<td><label></label></td>
					<td></td>
				</tr>
				`;
            }
            const ascensions = UserData.ascensions
                .map(({ hc }, i) => renderAscension({ i, hc }))
                .join("");

            const title = "SemiCookie";

            CCSE.AppendCollapsibleOptionsMenu(
                title,
                `
			<table id="ascensionsTable">
				<thead>
					<tr>
						<th><b>Ascension Number</b></th>
						<th><b>Heavenly Chips</b></th>
						<th><b>Edit</b></th>
						<th><b>Delete</b></th>
						<th><b>➕</b></th>
					</tr>
				</thead>

				<tbody>
					${ascensions}
				</tbody>
			</table>
			`
            );

            // If it's collapsed
            // Do nothing
            if (CCSE.collapseMenu[title]) {
                return;
            }

            SemiCookie.menuAscensions = document.querySelectorAll(
                "table#ascensionsTable tbody tr"
            );

            // + Button Add
            const addButton = document.querySelector(
                "table#ascensionsTable thead tr th:nth-child(5)"
            );

            addButton.addEventListener("click", () => {
                // Get HC Amount
                const heavenlyChips = getHeavenlyChips();

                if (!heavenlyChips) {
                    return;
                }

                // Update it in the background
                UserData.ascensions.push({ hc: heavenlyChips });

                // Update it in DOM

                // Lazy approach
                Game.UpdateMenu();

                // Hard working approach
                /*
				const ascensionString = renderAscension({
					i: UserData.ascensions.length - 1,
					hc: heavenlyChips,
				});

				// Get inner string

				const ascension = document.createElement('tr');
				ascension.innerHTML = new DOMParser().parseFromString(
					ascensionString,
					'text/xml'
				).firstChild.innerHTML;

				console.log('Adding ascension', ascension, UserData.ascensions);

				if (UserData.ascensions.length === 1) {
					ascension.classList.add('activeAscension');
				}

				const newElement = document
					.querySelector('table#ascensionsTable tbody')
					.appendChild(ascension);
				*/
            });

            // Apply CSS class among other things
            for (let i = 0; i < SemiCookie.menuAscensions.length; i++) {
                const ascension = SemiCookie.menuAscensions[i];

                if (i === UserData.currentAscension) {
                    ascension.classList.add("activeAscension");
                } else {
                    ascension.classList.remove("activeAscension");
                }

                // Get pencil icon
                const pencilIcon = ascension.querySelector("td:nth-child(3)");

                // Add edit event listener
                pencilIcon.addEventListener("click", (event) => {
                    event.stopPropagation();

                    const heavenlyChips = getHeavenlyChips(
                        UserData.ascensions[i].hc
                    );

                    // Update it the background
                    UserData.ascensions[i].hc = heavenlyChips;

                    // Update it in DOM
                    ascension.querySelector(
                        "td:nth-child(2) label"
                    ).innerText = Beautify(heavenlyChips);
                });

                // Get delete icon
                const deleteIcon = ascension.querySelector("td:nth-child(4)");

                deleteIcon.addEventListener("click", (event) => {
                    if (i !== UserData.ascensions.length - 1) {
                        return;
                    }

                    event.stopPropagation();

                    if (confirmDeletion(i)) {
                        // Delete in the background
                        UserData.ascensions.pop();

                        if (i === UserData.currentAscension && i !== 0) {
                            UserData.currentAscension--;
                            SemiCookie.menuAscensions[i - 1].click();
                        }

                        // Delete it in DOM
                        document
                            .querySelector("table#ascensionsTable tbody")
                            .removeChild(ascension);
                    }
                });

                // Add event listener
                ascension.addEventListener("click", () => {
                    UserData.currentAscension = i;

                    for (const ascension of SemiCookie.menuAscensions) {
                        ascension.classList.remove("activeAscension");
                    }

                    // Change CSS classes
                    ascension.classList.add("activeAscension");
                });
            }
        });

        // React
        const reactComponent = document.createElement("div");
        ReactDOM.render(<MyComponent />, reactComponent);

        Game.customOptionsMenu.push(() => {
            /*
			// Declarative UI
			const title = 'SemiCookie Automation';

			CCSE.AppendCollapsibleOptionsMenu(
				title,
				`
			<div class="listing">
				<a id="autoClickShimmers" class="option">Auto Click Shimmers ${boolToStatus(
					UserData.preferences.autoClickShimmers
				)}</a>
				<label>Golden Cookies, Wrath Cookies, Reindeers, etc. Shimmers in general.</label>
			</div>

			<div class="listing">
				<a id="autoClickReindeers" class="option">Auto Click Reindeers ${boolToStatus(
					UserData.preferences.autoClickReindeers
				)}</a>
				<label>Auto clicks reindeers.</label>
			</div>

			<div class="listing">
				<a id="autoClickWrathCookies" class="option">Auto Click Wrath Cookies ${boolToStatus(
					UserData.preferences.autoClickWrathCookies
				)}</a>
				<label>Golden Cookies but in the Grandmapocalypse.</label>
			</div>

			<div class="listing">
				<a id="autoClickNews" class="option">Auto Click News ${boolToStatus(
					UserData.preferences.autoClickNews
				)}</a>
				<label>Auto clicks fortune news.</label>
			</div>
			`
			);

			// Check if we exist
			if (CCSE.collapseMenu[title]) {
				return;
			}

			for (const userPreference of [
				'autoClickShimmers',
				'autoClickReindeers',
				'autoClickWrathCookies',
				'autoClickNews',
			]) {
				document
					.getElementById(userPreference)
					.addEventListener('click', () => {
						UserData.preferences[userPreference] = !UserData.preferences[
							userPreference
						];
						Game.UpdateMenu();
					});
			}
			*/
            CCSE.AppendCollapsibleOptionsMenu(
                "React!",
                `<div class="react"></div>`
            );
            let node = document.querySelector(".react");
            node.appendChild(reactComponent);

            /*
			if (node) {
				console.log('Unmounted!');
				ReactDOM.unmountComponentAtNode(node);
			}

			

			node = document.querySelector('.react');

			*/
        });

        /*
		Game.customOptionsMenu.push(function () {
			CCSE.AppendCollapsibleOptionsMenu(MyMod.name, MyMod.getMenuString());
		});

		Game.customStatsMenu.push(function () {
			CCSE.AppendStatsVersionNumber(MyMod.name, MyMod.version);
		});
		*/
    };

    // State
    SemiCookie.manageState = () => {
        CCSE.customSave.push(() => {
            CCSE.save.OtherMods.SemiCookie = UserData;
        });

        CCSE.customLoad.push(() => {
            if (CCSE.save.OtherMods.SemiCookie) {
                UserData = CCSE.save.OtherMods.SemiCookie;
            }
        });

        CCSE.LoadSave();
    };

    return SemiCookie;
}

// Dependencies
Game.LoadMod("https://klattmose.github.io/CookieClicker/CCSE.js");
Game.LoadMod("https://aktanusa.github.io/CookieMonster/CookieMonster.js");

window.SemiCookie = bootstrapSemiCookie();

window.CCSE = {
    postLoadHooks: [SemiCookie.launch],
};
