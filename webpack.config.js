const { resolve } = require("path");

module.exports = {
	entry: {
		app: "./src/SemiCookie.js",
	},
	output: {
		path: resolve(__dirname, "build"),
		filename: "SemiCookie.js",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: { loader: "babel-loader" },
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	devtool: "eval-source-map",
};
