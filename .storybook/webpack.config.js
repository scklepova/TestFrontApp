const path = require("path");

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
        {
            test: /\.js$/,
            loaders: "babel-loader",
            include: path.join(__dirname, "..", "src"),
        },
        {
            test: /\.less$/,
            loaders: ["classnames-loader", "style-loader", "css-loader?modules=true", "less-loader"],
            include: path.join(__dirname, "..", "src"),
        },
        {
            test: /\.(js|jsx)?$/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "stage-0", "react"],
                    },
                },
            ],
            include: /retail\-ui/,
        },
        {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
            include: /retail\-ui/,
        },
        {
            test: /\.(png|woff|woff2|eot|svg)$/,
            use: "file-loader",
        },    ],
  },
};
