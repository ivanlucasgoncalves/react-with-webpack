const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// Generates an HTML file with <script> injected
const htmlPlugin = new HtmlWebPackPlugin({
	title: 'React app with Webpack 4 | Boilerplate',
	favicon: 'public/favicon.ico',
	template: 'public/index.html',
	filename: 'index.html'
})

// Detecting Dev Mode
const devMode = process.env.NODE_ENV !== 'production'

// Extract text from a bundle, or bundles, into a separate file
const cssPlugin = new MiniCssExtractPlugin({
	filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
	chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css'
})

// Enabled HMR while the application is running, without a full reload
const hotModulePlugin = new webpack.HotModuleReplacementPlugin()

// Displayed module name when HMR is enabled
const namedModulePlugin = new webpack.NamedModulesPlugin()

// Keeping it clean and fresh
const cleanPlugin = new CleanWebpackPlugin(['dist'])

module.exports = {
	entry: { app: './src/index.js' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[hash].js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				loader: [
					'css-hot-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(pdf|jpg|png|gif|svg|ico)$/,
				loader: 'url-loader'
			}
		]
	},
	plugins: [
		cleanPlugin,
		htmlPlugin,
		cssPlugin,
		hotModulePlugin,
		namedModulePlugin
	]
}
