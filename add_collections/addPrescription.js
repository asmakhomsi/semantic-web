async function addPrescription() {
    const prescriptionDate = document.getElementById('prescriptionDate').value;
  
    const prescriptionData = {
      prescriptionDate,
    };
  
    try {
      const response = await fetch('https://6f6252c6bf06.arangodb.cloud:8529/_db/semanticweb/_api/document/Prescription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('root:rgstYbiSiWvlPbaakTYS'),
        },
        body: JSON.stringify(prescriptionData),
      });
  
      const result = await response.json();
      console.log(result);
  
      alert('Prescription added successfully!');
    } catch (error) {
      console.error('Error adding prescription:', error);
      alert('Failed to add prescription. Please check the console for details.');
    }
  }
  