const path = require("path");

/*todo setup storyBook for Documentation*/

const paths = {
	context: path.join(__dirname, "./src/"),
	output: path.join(__dirname, "./dist/"),
	entry: {
		'app':"./index.js",
	}
};

const config = {
	context: paths.context,
	entry: paths.entry,
	output: {
		path: paths.output,
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.csv$/,
				use: {
					loader: "csv-loader",
					options: {
						dynamicTyping: true,
						header: true,
						skipEmptyLines: true
					}
				}
			}
		]

	},
	resolve: {
		extensions: ['.jsx','.js'],
		modules: [path.resolve(__dirname,'src'), 'node_modules'],
		alias: {
			'components': path.resolve(__dirname,'src/components/'),
			'ui': path.resolve(__dirname,'src/ui/'),
			'context': path.resolve(__dirname,'src/context/'),
			'static': path.resolve(__dirname,'src/static/'),
			'abstracts': path.resolve(__dirname,'src/abstracts/'),
			'service': path.resolve(__dirname,'src/service/'),
		}
	},
	devServer: {
		contentBase: path.join(__dirname, '/'),
		compress: true,
	},
	devtool: 'inline-source-map'
};


module.exports = config;


