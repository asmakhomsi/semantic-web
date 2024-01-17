async function addHospital() {
    const hospitalName = document.getElementById('hospitalName').value;
    const hospitalLocation = document.getElementById('hospitalLocation').value;
    const hospitalCapacity = document.getElementById('hospitalCapacity').value;
  
    const hospitalData = {
      name: hospitalName,
      location: hospitalLocation,
      capacity: parseInt(hospitalCapacity),
    };
  
    try {
      const response = await fetch('https://6f6252c6bf06.arangodb.cloud:8529/_db/semanticweb/_api/document/Hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('root:rgstYbiSiWvlPbaakTYS'),
        },
        body: JSON.stringify(hospitalData),
      });
  
      const result = await response.json();
      console.log(result);
  
      alert('Hospital added successfully!');
    } catch (error) {
      console.error('Error adding hospital:', error);
      alert('Failed to add hospital. Please check the console for details.');
    }
  }
  