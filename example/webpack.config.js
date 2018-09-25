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
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true, // webpack@2.x and newer
						},
					},
				],
			}
	   ]
	},

	mode: 'development'
};