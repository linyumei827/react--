
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
	mode:'development',
	//入口文件
	entry:'./src/main.js',
	//出口文件 
	output:{
		path:path.join(__dirname,'dist'),
		//[hash]会显示数字型的码 只要main.js文件有更新 dist里面就会生成最新的js文件
		filename:'main.[hash].chunk.js',
	},
	//css样式规则
	module:{
		rules:[
			//css样式规则处理
			{
				test:/\.css$/g,
				use:["style-loader",'css-loader']
			},
			//图片规则处理
			{
				test:/\.(jpg|gif|bmp|jpeg|png)$/g,
				use:['file-loader'],
			},
			//对于react Jsx的处理规则
			{
				test:/\.js|jsx$/,
				use:['babel-loader'],
				exclude:/node_modules/
				
			},
		]
	},
	//关于服务器 服务端口的配置
	devServer:{
		port:3000,
		contentBase:'./dist'
	},
	//表示source中 可以看到我们的源代码 有利于调试 上线之后得去掉 避免消费者看到我们的代码是怎么写的
	devtool: 'inline-source-map',
	//更新 清除dist中的数据  避免消费者缓存原来的数据 看不到我们更新的数据
	plugins:[
		new CleanWebpackPlugin(),//清除dist内部之前的数据
		new HtmlWebpackPlugin({
			//目标路径
			path:'./dist',
			//
			template:'./src/index.html'
		}),
	],
	
};