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
        break; // (1)
      }; // (2)
    }; // (3)

    //select the <ul> within the panel with id of `#sample-metadata`
    let currentMetaData = d3.select("#sample-metadata>ul"); //(4)

    //clear any existing metadata
    currentMetaData.html(""); //(4)

    //loop over metadata dictionary, and append new tags, for each key-value in the filtered metadata, to the <ul>.
    for (var key of Object.keys(sampleData)){
      let text = String(key)+": "+String(sampleData[key]); //(5)
      d3.select("#sample-metadata>ul").append("li").text(text.toUpperCase()); //(4)
    }; // (6)
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
        break; // (1)
      }; // (2)
    }; // (3)

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

    // assign trace data to array variable
    let bubbleData = [bubbleTrace1];

    // set bubble chart layout
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

    }; // (7)

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); // (7)



    // map the otu_ids to a list of strings for your yticks
    let yTickLabels = otu_ids.map(function(item) {
      return "OTU"+ " " + String(item);
    }); // (8)

    // Build a Bar Chart. Slice the array to show top 10, and reverse for horizontal barchart formatting.
    let barTrace1 = {
      x: sample_values.slice(0,10).reverse(), // (9)
      y: yTickLabels.slice(0,10).reverse(), // (9)
      text: otu_labels.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h' // (10)
    };

    // assign trace data to array variable
    let barData = [barTrace1];

    // set barchart layout
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
    }; // (11)

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
};



// Initialization function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset"); //(4)

    // Use the list of sample names to populate the select options
    dropdown.selectAll("option").data(names).enter().append("option").text(d => d); // (12)

    // Get the first sample from the list
    let firstItem = Number(names[0]); // (13)

    // Build charts and metadata panel with the first sample
    buildMetadata(firstItem);
    buildCharts(firstItem);

  });
};



// Function for event listener
function optionChanged() {
  // Build charts and metadata panel each time a new sample is selected
  let dropdown = d3.select("#selDataset");
  let newSample = dropdown.property("value");
  buildMetadata(Number(newSample));
  buildCharts(Number(newSample));
}; //(14)

// event listener active, calling optionChanged() when manipulated.
d3.selectAll("#selDataset").on("change", optionChanged); //(14)



// Initialize the dashboard
init();



