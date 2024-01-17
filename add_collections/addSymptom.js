async function addSymptom() {
    const description = document.getElementById('description').value;
  
    const symptomData = {
      description,
    };
  
    try {
      const response = await fetch('https://6f6252c6bf06.arangodb.cloud:8529/_db/semanticweb/_api/document/Symptom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('root:rgstYbiSiWvlPbaakTYS'),
        },
        body: JSON.stringify(symptomData),
      });
  
      const result = await response.json();
      console.log(result);
  
      alert('Symptom added successfully!');
    } catch (error) {
      console.error('Error adding symptom:', error);
      alert('Failed to add symptom. Please check the console for details.');
    }
  }
  