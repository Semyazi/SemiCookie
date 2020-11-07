import React from "react";
import "./Ascensions.scss";
import Ascension from "./Ascension";
import { getHeavenlyChips } from "../../../helpers";
import { useSelector } from "react-redux/lib/hooks/useSelector";
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import { addAscension } from "../../../redux/userData/ascensions";
import { Fragment } from "react/cjs/react.production.min";

export default function Ascensions() {
	const ascensions = useSelector((state) => state.userData.ascensions);
	const currentAscension = useSelector(
		(state) => state.ascensionData.currentAscension
	);

	const dispatch = useDispatch();

	const addAscensionCallback = () => {
		const hc = getHeavenlyChips();

		if (!hc) {
			return;
		}

		dispatch(addAscension(hc));
	};

	return (
		<Fragment>
			<table className="ascensions">
				<thead>
					<tr>
						<td>Ascension Number</td>
						<td>Heavenly Chips</td>
						<td>Edit</td>
						<td>Delete</td>
						<td onClick={addAscensionCallback}>➕</td>
					</tr>
				</thead>

				<tbody>
					{ascensions.map((_, index) => (
						<Ascension
							active={currentAscension === index}
							last={index + 1 === ascensions.length}
							index={index}
							key={index}
						/>
					))}
				</tbody>
			</table>
		</Fragment>
	);
}
