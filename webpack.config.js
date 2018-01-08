const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './index.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	
	module: {
	
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
				}
			},
			{
				test: /\.scss$/, 
				loader: 'style-loader!css-loader!sass-loader'
			}
			
		]
	}
};
