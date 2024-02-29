const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const stylesHandler = 'style-loader';

const config = {
    stats: 'normal',
    entry: './src/bootstrap.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    mode: 'development',
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.BLUEPRINT_NAMESPACE': '""',
            'process.env.REACT_VERSION': "'16.14.0'",
            'process.env.FEATURE_HUB_REACT_VERSION': "'3.6.0'",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    }
                },
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.jsx', '.js', '.json', '...'],
    },
    resolveLoader: {
        modules: [path.join(__dirname, 'node_modules'), 'node_modules'],
    },
};

const homeAppConfig = {
        entry: path.join(__dirname, './src/apps/home-app.tsx'),
        externals: {
            react: 'react',
        },
        output: {
            filename: 'home-app.umd.js',
            libraryTarget: 'umd',
            publicPath: '/',
        },
};

const headerAppConfig = {
    entry: path.join(__dirname, './src/apps/header-app.tsx'),
    externals: {
        react: 'react',
    },
    output: {
        filename: 'header-app.umd.js',
        libraryTarget: 'umd',
        publicPath: '/',
    },
};

const mergedHomeAppConfig = merge(config, homeAppConfig);
const mergedHeaderAppConfig = merge(config, headerAppConfig);

module.exports = [config, mergedHomeAppConfig, mergedHeaderAppConfig];