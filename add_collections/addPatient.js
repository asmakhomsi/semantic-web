async function addPatient() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;
  
    const patientData = {
      name,
      age: parseInt(age),
      gender,
      address,
    };
  
    try {
      const response = await fetch('https://6f6252c6bf06.arangodb.cloud:8529/_db/semanticweb/_api/document/Patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('root:rgstYbiSiWvlPbaakTYS'),
        },
        body: JSON.stringify(patientData),
      });
  
      const result = await response.json();
      console.log(result);
  
      alert('Patient added successfully!');
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Failed to add patient. Please check the console for details.');
    }
}
  
  
  
  