var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        "bundle": "./src/index.tsx"
    },
    output: {
        filename: "bundle.js",
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
            {
                test: /\.css/,
                loaders: ['style', 'css'],
                include: __dirname + '/src'
            },
            //used for loading css files
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['style-loader', 'css-loader']
                })
            },
            //used for loading fonts and images
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
            test: /\.s[a|c]ss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    node : {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
};