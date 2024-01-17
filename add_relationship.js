// add_relationship.js
const arangojs = require('arangojs');

const HOST = 'https://6f6252c6bf06.arangodb.cloud:8529';
const PORT = 8529;
const USER = 'root';
const PASSWORD = 'rgstYbiSiWvlPbaakTYS';
const DB_NAME = 'semanticweb';


const arangoDBConnection = new arangojs.Database({
  url: `${HOST}:${PORT}`,
  databaseName: DB_NAME,
  auth: { username: USER, password: PASSWORD },
});

async function addRelationship() {
  try {
    // Get values from the form fields
    const patientId = document.getElementById('patientId').value;
    const doctorId = document.getElementById('doctorId').value;

    // Connect to ArangoDB
    await arangoDBConnection.query('RETURN 1');

    // Create the relationship in ArangoDB
    const graph = arangoDBConnection.graph(DB_NAME);
    const relationshipCollection = graph.edgeCollection('PatientDoctorRelationship'); // Replace with your actual relationship collection

    // Sample relationship data
    const relationshipData = {
      _from: `patients/${patientId}`, // Replace with actual patient ID
      _to: `doctors/${doctorId}`, // Replace with actual doctor ID
      // Add additional attributes as needed
    };

    // Save the relationship
    await relationshipCollection.save(relationshipData);

    // Optionally, you can redirect or show a success message after adding the relationship
    alert('Relationship added successfully!');
    // You may redirect to another page or update the current page as needed
  } catch (error) {
    console.error('Failed to add relationship:', error);
    // Handle the error (e.g., show an error message)
  }
}

// Optional: You can add more functions or logic as needed
