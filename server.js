const express=require('express');
const bodyParser=require('body-parser');
const {MongoClient}=require('mongodb');
const path=require('path');
const app=express();
const port=7800;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const uri = "mongodb+srv://subiksha:UNdD5RhtXmQEmhM6@cluster0.mkt9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client=new MongoClient(uri);

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'mypg.html'));
});
app.post('/ad-data',async (req,res)=>{
	try{
	const {name,room,phn,comp}=req.body;
	await client.connect();
	const database=client.db('hosteldb');
	const collection=database.collection('std');
	const hostel={name,room,phn,comp};
	await collection.insertOne(hostel);
	res.send('data added successfully');
	}catch(err)
	{
		res.status(500).send(`${err.message}`);
	}finally{
		
		await client.close();
	}

});

app.post('/up-data',async (req,res)=>{
	try{
	const {name,room,phn,comp}=req.body;
	await client.connect();
	const database=client.db('hosteldb');
	const collection=database.collection('std');
	const result=await collection.updateOne({name},{$set:{room,phn,comp}});
	if(result.matchedCount>0)
	{
		res.send('data updated successfully');
	}
	else{
		res.send(`${err.message}`);
	}
	}catch(err)
	{
		res.status(500).send(`${err.message}`);
	}finally{
		
		await client.close();
	}

});


app.post('/del-data',async (req,res)=>{
	try{
	const {name,room,phn,comp}=req.body;
	await client.connect();
	const database=client.db('hosteldb');
	const collection=database.collection('std');
	const result=await collection.deleteOne({name});
	if(result.deletedCount>0)
	{
		res.send('data deleted successfully');
	}
	else{
		res.send(`${err.message}`);
	}
	}catch(err)
	{
		res.status(500).send(`${err.message}`);
	}finally{
		
		await client.close();
	}

});

app.post('/ret-data',async (req,res)=>{
	try{
	const {name,room,phn,comp}=req.body;
	await client.connect();
	const database=client.db('hosteldb');
	const collection=database.collection('std');
	const result=await collection.findOne({name});
	if(result)
	{
		res.json(result);
	}
	else{
		res.send(`${err.message}`);
	}
	}catch(err)
	{
		res.status(500).send(`${err.message}`);
	}finally{
		
		await client.close();
	}

});



app.listen(port,()=>{
	console.log(`server listening on http://localhost:${port}`);
});