async function addDisease() {
    const name = document.getElementById('name').value;
    const treatment = document.getElementById('treatment').value;
  
    const diseaseData = {
      name,
      treatment,
    };
  
    try {
      const response = await fetch('https://6f6252c6bf06.arangodb.cloud:8529/_db/semanticweb/_api/document/Disease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('root:rgstYbiSiWvlPbaakTYS'),
        },
        body: JSON.stringify(diseaseData),
      });
  
      const result = await response.json();
      console.log(result);
  
      alert('Disease added successfully!');
    } catch (error) {
      console.error('Error adding disease:', error);
      alert('Failed to add disease. Please check the console for details.');
    }
  }
  