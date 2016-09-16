# mongoose-mixed-functions
Allows you to define functions as both static and methods so you dont repeat yourself

Applies a getter and setter so that you can define both statics and methods at once. <b>Record must be the first parameter when using the statics counterpart</b>

# Installation

`npm install mongoose-mixed-functions`

# Usage

## On every model
    const mongoose = require('mongoose');
    mongoose.plugin(require('mongoose-mixed-functions'));

## On a particular model
    const mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    let sampleSchema = new Schema({
      fakeProperty : { type: String, default: "sample.property"}
    });

    sampleSchema.plugin(require('mongoose-mixed-functions'));

## Defining functions

    //either way works
    sampleSchema.mixed.print = function(sample, additionalString) {
      console.log(additionalString);
    }

    //either way works
    sampleSchema.mixed("print", function(sample, additionalString) {
      console.log(sample.fakeProperty + additionalString);
    });

## Using the functions
    const Sample = mongoose.model('sample', sampleSchema);
    const additionalString = " and this is the additionalString";

    const sample = new Sample();

    // Both print out "sample.property and this is the additionalString"
    Sample.print(sample, additionalString);
    sample.print(additionalString);
