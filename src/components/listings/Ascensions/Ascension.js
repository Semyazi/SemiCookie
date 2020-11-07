import React from "react";
import classNames from "classnames";
import "./Ascension.scss";
import { useSelector } from "react-redux/lib/hooks/useSelector";
import { getHeavenlyChips } from "../../../helpers";
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import {
	deleteAscension,
	editAscension,
} from "../../../redux/userData/ascensions";

export default function Ascension({ active, last, index }) {
	const ascension = useSelector((state) => state.userData.ascensions[index]);

	const dispatch = useDispatch();

	const editAscensionCallback = () => {
		const hc = getHeavenlyChips(ascension.hc);

		if (!hc) {
			return;
		}

		dispatch(editAscension({ index, hc }));
	};

	const deleteAscensionCallback = () => {
		if (!confirm(`Are you sure you want to delete Ascension #${index + 1}?`)) {
			return;
		}

		dispatch(deleteAscension(index));
	};

	return (
		<tr
			className={classNames({
				ascension: true,
				activeAscension: active,
				lastAscension: last,
			})}
		>
			<td>{index + 1}</td>
			<td>{Beautify(ascension.hc)}</td>
			<td onClick={editAscensionCallback}>✏️</td>
			<td onClick={deleteAscensionCallback}>{last ? "❌" : ""}</td>
			<td></td>
		</tr>
	);
}
