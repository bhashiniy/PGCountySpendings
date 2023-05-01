// Define the API endpoint URL
const apiEndpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

// Fetch data from the API endpoint and visualize it
fetch(apiEndpoint)
  .then(response => response.json())
  .then(data => {
    // Filter data by a specific field value
    const filteredData = data.filter(item => item.field_name === 'field_value');

    // Visualize the filtered data using a library like D3.js or Plotly.js
    // For example, here's how you can create a simple bar chart using D3.js:
    const svg = d3.select('#visualization')
                  .append('svg')
                  .attr('width', 400)
                  .attr('height', 200);

    svg.selectAll('rect')
       .data(filteredData)
       .enter()
       .append('rect')
       .attr('x', (d, i) => i * 40)
       .attr('y', (d) => 200 - d.value)
       .attr('width', 20)
       .attr('height', (d) => d.value)
       .attr('fill', '#FD6CFD');
  })
  .catch(error => console.error(error));
