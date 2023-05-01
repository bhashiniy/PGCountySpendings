// Asynchronous data request to the API
async function getDataFromAPI() {
  const response = await fetch('https://data.princegeorgescountymd.gov/resource/rh7w-bmhm.json');
  const data = await response.json();
  return data;
}

// Processing request using array methods
async function processData() {
  const data = await getDataFromAPI();
  const filteredData = data.filter(item => item.agency === 'Police Department');
  const mappedData = filteredData.map(item => ({
    payee: item.payee_name,
    amount: parseFloat(item.amount),
  }));
  const reducedData = mappedData.reduce((acc, item) => {
    acc[item.payee] = acc[item.payee] || 0;
    acc[item.payee] += item.amount;
    return acc;
  }, {});

  return reducedData;
}

// Display data using a visualization library (e.g. Chart.js)
async function displayData() {
  const data = await processData();
  const labels = Object.keys(data);
  const values = Object.values(data);

  // Use Chart.js library to display the data as a chart
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Spending by Payee',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Call the displayData function to show the chart
displayData();

