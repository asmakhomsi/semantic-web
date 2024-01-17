async function addDiagnosis() {
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
  
    const diagnosisData = {
      description,
      date,
    };
  
    try {
      const response = await fetch('https://6f6252c6bf06.arangodb.cloud:8529/_db/semanticweb/_api/document/Diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('root:rgstYbiSiWvlPbaakTYS'),
        },
        body: JSON.stringify(diagnosisData),
      });
  
      const result = await response.json();
      console.log(result);
  
      alert('Diagnosis added successfully!');
    } catch (error) {
      console.error('Error adding diagnosis:', error);
      alert('Failed to add diagnosis. Please check the console for details.');
    }
  }
  