const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: "./src/index.tsx"
    },
    output: {
        filename: "[name]/build/bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            // Parse HTML template
            { test: /\.html$/, loader: "html-loader" },
            // Images
            { test: /\.(png|jpe?g|svg|)$/, use: { loader: 'file-loader' }},
            { test: /\.css?$/, loader: "css-loader"}
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            chunks: ['main'],
            template: "./index.html",
            filename: 'index.html',
        }),
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM": "react-dom",
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development' // use 'development' unless process.env.NODE_ENV is defined
        }),
        new CopyPlugin([
            { from: 'assets', to: 'assets' }
        ])
    ],

    // Dev Server config
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9001
    }
};