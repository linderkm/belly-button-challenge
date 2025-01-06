// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metaData = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let sampleData = {};
    for (i=0; i <metaData.length; i++){
      if (metaData[i].id == sample){
        sampleData = metaData[i];
        break; // https://stackoverflow.com/questions/9830650/how-to-stop-a-javascript-for-loop
      }; // Module 14; lesson 1; Activity 5; conditionals-reference.js
    }; // Module 14; lesson 1; Activity 5; iteration.js

    // Use d3 to select the panel with id of `#sample-metadata`
    let currentMetaData = d3.select("#sample-metadata>ul"); //Module 14; Lesson 3; Activity 3; index.js

    // Use `.html("") to clear any existing metadata
    currentMetaData.html(""); //Module 14; Lesson 3; Activity 3; index.js

    // Inside a loop, you will need to use d3 to append new tags for each key-value in the filtered metadata.
    for (var key of Object.keys(currentMetaData)){
      let text = String(key)+ " "+String(currentMetaData[key]) //https://www.w3schools.com/jsref/jsref_string.asp
      
    }; // https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object


  });
}
buildMetadata(943);

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field


    // Filter the samples for the object with the desired sample number


    // Get the otu_ids, otu_labels, and sample_values


    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  //mod14;lesson3;act09;plots.js
}

// Initialize the dashboard
// init();
