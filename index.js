require('dotenv').config();
const exprss = require('express');
const app =  exprss();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.use(exprss.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
})
app.get('/api/:date?',(req,res)=>{ 

    let date_string = req.params.date;
    let datematch = /^\d{4}-\d{2}-\d{2}$/;
    let date;

    if(!date_string){
        date = new Date();
    }else{
        if(datematch.test(date_string)){
            date = new Date(date_string);
        }else if(!isNaN(date_string)){
            date = new Date(parseInt(date_string));
        }else{
            date = new Date(date_string);
        }
    }
    if(isNaN(date.getTime())){
        res.json({error: "Invalid Date"});
    }else{
        res.json({unix: date.getTime(), utc: date.toUTCString()});
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
