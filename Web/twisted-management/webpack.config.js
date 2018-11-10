const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack');
new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  })
  var debug = process.env.NODE_ENV !== "production";
console.log("MODE = " + process.env.NODE_ENV)
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'twisted-management-app.js',
        sourceMapFilename: 'twisted-management-app.map'
    },
    devtool: debug ? '#source-map' : null,
    module: {
        rules: [
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'json-loader'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    }]
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
                ]
            }

        ]
    },
    resolve: {
        extensions: [' ','.js', '.jsx'],
        alias: {
            'Components': path.resolve(__dirname, '/components')
          }
    },
    
    plugins: debug ? [] : [
        new HtmlWebpackPlugin({
            title: 'Twisted Cloud Management',
            filename: 'index.html',
            template: './src/assets/index.html'
        })
    ],

    optimization: { minimize: false }
}