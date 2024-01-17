async function addDoctor() {
    const name = document.getElementById('name').value;
    const specialization = document.getElementById('specialization').value;
    const contact = document.getElementById('contact').value;
  
    const doctorData = {
      name,
      specialization,
      contact,
    };
  
    try {
      const response = await fetch('https://6f6252c6bf06.arangodb.cloud:8529/_db/semanticweb/_api/document/Doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('root:rgstYbiSiWvlPbaakTYS'),
        },
        body: JSON.stringify(doctorData),
      });
  
      const result = await response.json();
      console.log(result);
  
      alert('Doctor added successfully!');
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor. Please check the console for details.');
    }
  }
  