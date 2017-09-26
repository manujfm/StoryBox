var app=require('./app.js'),

server=app.listen(app.get('port'),()=>{
	console.log('success')
})