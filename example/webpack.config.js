var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './test.jsx'),

	output: {
	    path: __dirname,
	    filename: 'test.js',
	  },	

	devServer: {
    	contentBase: __dirname
  	},

	module: {
    	rules: [
	    {
	        test : /\.jsx?/,
	        exclude: /(node_modules|bower_components)/,
	        use: {
	          loader: "babel-loader",
	          query: {
	            plugins: ["transform-class-properties","transform-object-assign"],
	            presets: [ "es2015","react","stage-0"],
	          }
	        }
	    },
	    {
			test: /\.css$/,
	    	use:['style-loader','css-loader']
	    }
	   ]
	},

	mode: 'development'
};