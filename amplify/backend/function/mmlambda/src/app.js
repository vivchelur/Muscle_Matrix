/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://vchelur:vchelur@muscle-matrix-app.4cckanu.mongodb.net/?retryWrites=true&w=majority&appName=Muscle-Matrix-App';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Define Mongoose Schemas
const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number },
  reps: { type: Number },
  sets: { type: Number }
});

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [exerciseSchema]
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  exercises: [exerciseSchema],
  workouts: [workoutSchema]
});

const User = mongoose.model('User', userSchema);

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


app.post('/items', async (req, res) => {
  const { username, exercises, workouts } = req.body;
  try {
    const user = new User({ username, exercises, workouts });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a user by username
app.get('/items/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by username
app.put('/items/:username', async (req, res) => {
  const { username } = req.params;
  const { exercises, workouts } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { exercises, workouts },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by username
app.delete('/items/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
