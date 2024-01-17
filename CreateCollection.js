// arangoDBSetup.js
const { Database } = require('arangojs');

const HOST = 'https://6f6252c6bf06.arangodb.cloud:8529';
const PORT = 8529;
const USER = 'root';
const PASSWORD = 'rgstYbiSiWvlPbaakTYS';
const DB_NAME = 'semanticweb';

const arangoDBConnection = new Database({
  url: HOST,
  databaseName: DB_NAME,
  auth: { username: USER, password: PASSWORD },
});

// Function to create a collection with attributes
async function createCollection(collectionName, attributes) {
  try {
    const db = arangoDBConnection.database(DB_NAME);
    const collection = db.collection(collectionName);

    if (!(await collection.exists())) {
      await collection.create();
      console.log(`Collection '${collectionName}' created successfully.`);

      // Add attributes to the collection
      const indexOptions = { unique: true };
      for (const attribute of attributes) {
        await collection.ensureIndex(attribute, indexOptions);
      }

      console.log(`Attributes added to '${collectionName}' collection.`);
    } else {
      console.log(`Collection '${collectionName}' already exists.`);
    }
  } catch (err) {
    console.error(`Failed to create collection '${collectionName}':`, err);
  }
}

// Function to create collections for each entity
async function createCollections(entities) {
  for (const entityName in entities) {
    const attributes = entities[entityName];
    await createCollection(entityName, attributes);
  }
}

// Connect to ArangoDB
arangoDBConnection
  .query('RETURN 1')
  .then(() => {
    console.log('Connected to ArangoDB successfully!');
    // Define your entities here
    const entities = {
      Patient: ['PatientID', 'Name', 'Age', 'Gender', 'Address'],
      Doctor: ['DoctorID', 'Name', 'Specialization', 'Contact'],
      Disease: ['DiseaseID', 'Name', 'Treatment'],
      Symptom: ['SymptomID', 'Description'],
      Diagnosis: ['DiagnosisID', 'Description', 'Date'],
      Medication: ['MedicationID', 'Name', 'Dosage'],
      Prescription: ['PrescriptionID', 'MedicationID', 'PrescriptionDate'],
      Hospital: ['HospitalID', 'Name', 'Location', 'Capacity'],
    };

    // Run the function to create collections
    createCollections(entities);
  })
  .catch((err) => {
    console.error('Failed to connect to ArangoDB:', err);
  });
