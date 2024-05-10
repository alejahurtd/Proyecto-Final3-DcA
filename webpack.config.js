const path = require('path');

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['css-loader'],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images', // Donde se colocarán los archivos (relativo a 'dist')
							publicPath: 'images', // Cómo se accederá a los archivos desde el navegador
							name: '[name].[ext]', // Mantiene el nombre original y la extensión del archivo
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/', // Asegúrate de configurar 'publicPath' si tu aplicación depende de rutas
	},
};
