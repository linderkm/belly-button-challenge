// Build the metadata panel
function buildMetadata(input) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metaData = data.metadata;

    // Filter the metadata for the object with the desired sample number, store in new dictionary
    let sampleData = {};
    for (i=0; i <metaData.length; i++){
      if (metaData[i].id == input){
        sampleData = metaData[i];
        break; // https://stackoverflow.com/questions/9830650/how-to-stop-a-javascript-for-loop
      }; // Module 14; lesson 1; Activity 5; conditionals-reference.js
    }; // Module 14; lesson 1; Activity 5; iteration.js

    //select the <ul> within the panel with id of `#sample-metadata`
    let currentMetaData = d3.select("#sample-metadata>ul"); //Module 14; Lesson 3; Activity 3; index.js

    //clear any existing metadata
    currentMetaData.html(""); //Module 14; Lesson 3; Activity 3; index.js

    //loop over metadata dictionary, and append new tags, for each key-value in the filtered metadata, to the <ul>.
    for (var key of Object.keys(sampleData)){
      let text = String(key)+": "+String(sampleData[key]); //https://www.w3schools.com/jsref/jsref_string.asp
      d3.select("#sample-metadata>ul").append("li").text(text.toUpperCase()); //Module 14; Lesson 3; Activity 3; index.js
    }; // https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
  });
};















































// function to build both charts
function buildCharts(input) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sample = {}
    for (i=0; i <samples.length; i++){
      if (samples[i].id == input){
        sample = samples[i];
        break; // https://stackoverflow.com/questions/9830650/how-to-stop-a-javascript-for-loop
      }; // Module 14; lesson 1; Activity 5; conditionals-reference.js
    }; // Module 14; lesson 1; Activity 5; iteration.js

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sample.otu_ids;
    let otu_labels = sample.otu_labels;
    let sample_values = sample.sample_values;


    // Build a Bubble Chart
    let bubbleTrace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      }
    };

    let bubbleData = [bubbleTrace1];

    let bubbleLayout = {
      title: {
        text: 'Bacteria Cultures Per Sample'
      },
      showlegend: false,
      height: 600,
      width: 1200,
      xaxis: {
        title: {
          text: "OTU ID"
        }
      },
      yaxis: {
        title: {
          text: "Number of Bacteria"
        }
      }

    }; //https://plotly.com/javascript/bubble-charts/

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); //https://plotly.com/javascript/bubble-charts/


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yTickLabels = otu_ids.map(function(item) {
      return "OTU"+ " " + String(item);
    }); // Module 14; Lesson 2; Activity 1; map.js


    // Build a Bar Chart. Don't forget to slice and reverse the input data appropriately
    let barTrace1 = {
      x: sample_values.slice(0,10).reverse(), //Module 14; Lesson 2; Activity 7; slicing.js & sorting.js
      y: yTickLabels.slice(0,10).reverse(), //Module 14; Lesson 2; Activity 7; slicing.js & sorting.js
      text: otu_labels,
      type: 'bar',
      orientation: 'h' //https://plotly.com/javascript/horizontal-bar-charts/
    };

    let barData = [barTrace1];

    let barLayout = {
      title: {
        text: "Top 10 Bacteria Cultures Found"
      },
      showlegend: false,
      // height:,
      // width: ,
      xaxis: {
        title: {
          text: "Number of Bacteria"
        }
      }
    }; // https://plotly.com/javascript/bar-charts/


    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);

  });
};

// buildCharts(940);

d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  console.log(data);
});





































// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset"); //Module 14; Lesson 3; Activity 3; index.js


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new option for each sample name.
    dropdown.selectAll("option").data(names).enter().append("option").text(d => d); //google ai output from search: "javascript populate a dropdown with an array using d3"



    // Get the first sample from the list
    let firstItem = Number(names[0]); //https://www.geeksforgeeks.org/convert-a-string-to-an-integer-in-javascript/

    // Build charts and metadata panel with the first sample
    buildMetadata(firstItem);
    buildCharts(firstItem);

  });
}



// Initialize the dashboard
init();




























// Function for event listener
function optionChanged() {
  // Build charts and metadata panel each time a new sample is selected
  let dropdown = d3.select("#selDataset");
  let newSample = dropdown.property("value");
  buildMetadata(Number(newSample));
  buildCharts(Number(newSample));
}; //mod14;lesson3;act09;plots.js



// d3.selectAll("#selDataset").on("change", optionChanged); 
//mod14;lesson3;act09;plots.js


















// Initialize the dashboard
// init();
