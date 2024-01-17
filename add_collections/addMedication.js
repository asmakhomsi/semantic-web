async function addMedication() {
    const name = document.getElementById('name').value;
    const dosage = document.getElementById('dosage').value;
  
    const medicationData = {
      name,
      dosage,
    };
  
    try {
      const response = await fetch('https://6f6252c6bf06.arangodb.cloud:8529/_db/semanticweb/_api/document/Medication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('root:rgstYbiSiWvlPbaakTYS'),
        },
        body: JSON.stringify(medicationData),
      });
  
      const result = await response.json();
      console.log(result);
  
      alert('Medication added successfully!');
    } catch (error) {
      console.error('Error adding medication:', error);
      alert('Failed to add medication. Please check the console for details.');
    }
  }
  