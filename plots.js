d3.json('samples.json').then(({names}) => {
  names.forEach(name => d3.select('select').append('option').text(name));
  renderData();
});

function renderData() {
  let sel = d3.select('select').node().value;
  d3.json('samples.json').then(({metadata,samples})=>{
    const meta = metadata.filter(obj=>obj.id==sel)[0];
    const sample = samples.filter(obj=>obj.id==sel)[0];

    console.log(meta.wfreq);
    d3.select('.panel-body').html('');
    Object.entries(meta).forEach(([key,val]) => {
        d3.select('.panel-body').append('h5').text(key.toUpperCase()+': '+val)
    });
    
    
    var data = [
      {
        x: sample.sample_values.slice(0,10).reverse(),
        y: sample.otu_ids.slice(0,10).reverse().map(obj=>'OTU '+obj),
        text:sample.otu_labels.slice(0,10).reverse(),
        type: 'bar', 
        orientation: 'h', 
        

      }
    ];
    
    var layout = {
      title: "Top 10 Bacteria Cultures Found",
      margin:{t:40}
    };
    Plotly.newPlot('bar', data, layout);


    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: meta.wfreq,
        title: { text:"<b>Belly Button Washing Frequency</b><br> Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400 },
        gauge: { axis: { range: [0, 10] },
        bar:{color:'black'},
        steps: [
          {range: [0,2],color:'red'},
          {range: [2,4],color:'orange'},
          {range: [4,6],color:'yellow'},
          {range: [6,8],color:'yellowgreen'},
          {range: [8,10],color:'green'},

        ]}
      }
    ];
    
    var layout = { width: 600, height: 400 };
    Plotly.newPlot('gauge', data, layout);


    var trace1 = {
      x: sample.otu_ids,
      y: sample.sample_values,
      mode: 'markers',
      text: sample.otu_labels,
      marker: {
        size: sample.sample_values,
        color: sample.otu_ids,
        colorscale: 'Earth'
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Bacteria cultures per sample',
      showlegend: false
    };
    
    Plotly.newPlot('bubble', data, layout);
  })
};



function optionChanged() {
  renderData();
}