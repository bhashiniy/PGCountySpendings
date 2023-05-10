fetch('https://data.princegeorgescountymd.gov/resource/rh7w-bmhm.json')
  .then(response => response.json())
  .then(data => createPieChart(data))
  .catch(error => console.error(error));

  function createPieChart(data) {
    const counts = {};
    for (const item of data) {
      if (counts[item.agency] === undefined) {
        counts[item.agency] = 1;
      } else {
        counts[item.agency]++;
      }
    }
  
    const canvas = document.getElementById('pie-chart');
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(counts),
        datasets: [{
          data: Object.values(counts),
          backgroundColor: [
            '#3B727C',
            '#B9A37E',
            '#D1BE9D',
            '#82A775',
            '#B05F66',
            '#64513B',
            '#F6D789',
            '#DEAB81',
            '#F2E4D1',
            '#ECB69B',
          ],
        }]
      },
      options: {}
    });
  }


  fetch('https://data.princegeorgescountymd.gov/resource/rh7w-bmhm.json')
  .then(response => response.json())
  .then(data => {
    const agencies = {}
    data.forEach(record => {
      if (agencies.hasOwnProperty(record.agency)) {
        agencies[record.agency] += parseFloat(record.amount)
      } else {
        agencies[record.agency] = parseFloat(record.amount)
      }
    })

    const labels = Object.keys(agencies)
    const values = Object.values(agencies)

    const ctx = document.getElementById('myChart').getContext('2d')
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Money Distribution by Agency',
          data: values,
          backgroundColor: 'rgba(185, 163, 126, 0.7)',
          borderColor: 'rgba(176, 95, 102, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  })


  // Fetch the data from the API
fetch('https://data.princegeorgescountymd.gov/resource/rh7w-bmhm.json')
.then(response => response.json())
.then(data => {
  const spendingTable = document.getElementById('spending-table');
  const tbody = spendingTable.getElementsByTagName('tbody')[0];
  
  // Add each row to the table
  data.forEach(rowData => {
    const row = tbody.insertRow();
    const payeeNameCell = row.insertCell();
    const agencyCell = row.insertCell();
    const zipCodeCell = row.insertCell();
    const amountCell = row.insertCell();
    payeeNameCell.textContent = rowData.payee_name;
    agencyCell.textContent = rowData.agency;
    zipCodeCell.textContent = rowData.zip_code;
    amountCell.textContent = rowData.amount;
  });
  
  // Add filter inputs
  const filterInputs = document.createElement('div');
  filterInputs.innerHTML = `
    <label for="payee-name-filter">Payee Name:</label>
    <input type="text" id="payee-name-filter" />
    <label for="agency-filter">Agency:</label>
    <input type="text" id="agency-filter" />
    <label for="zip-code-filter">Zip Code:</label>
    <input type="text" id="zip-code-filter" />
    <label for="amount-filter">Amount:</label>
    <input type="text" id="amount-filter" />
  `;
  spendingTable.before(filterInputs);
  
  // Add event listeners to filter inputs
  const payeeNameFilter = document.getElementById('payee-name-filter');
  payeeNameFilter.addEventListener('input', () => filterTable(0, payeeNameFilter.value));
  
  const agencyFilter = document.getElementById('agency-filter');
  agencyFilter.addEventListener('input', () => filterTable(1, agencyFilter.value));
  
  const zipCodeFilter = document.getElementById('zip-code-filter');
  zipCodeFilter.addEventListener('input', () => filterTable(2, zipCodeFilter.value));
  
  const amountFilter = document.getElementById('amount-filter');
  amountFilter.addEventListener('input', () => filterTable(3, amountFilter.value));
  
  // Function to filter the table
  function filterTable(columnIndex, filterValue) {
    const rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cellValue = row.getElementsByTagName('td')[columnIndex].textContent;
      if (cellValue.toLowerCase().includes(filterValue.toLowerCase())) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }}})

