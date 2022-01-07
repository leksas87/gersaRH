const express=require('express');

const path=require('path');
//inicializations
const app=express();
//settings
app.set('port',process.env.PORT||4000);
 
//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
//Public
app.use(express.static(path.join(__dirname,'public')));
//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});