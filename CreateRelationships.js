// Import the required methods from arangojs
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

// Connect to ArangoDB
arangoDBConnection
  .query('RETURN 1')
  .then(() => {
    console.log('Connected to ArangoDB successfully!');
    createRelationships();
  })
  .catch((err) => {
    console.error('Failed to connect to ArangoDB:', err);
  });

// Define relationships
const relationships = [
    {
      name: 'Patient-Doctor',
      edge: 'TreatedBy',
      direction: 'Patient -> TreatedBy -> Doctor',
      inverseDirection: 'Doctor -> ProvidesTreatmentTo -> Patient',
      description: 'A patient is TreatedBy a doctor. A doctor treats multiple patients.',
    },
    {
      name: 'Patient-Diagnosis',
      edge: 'ReceivesDiagnosis',
      direction: 'Patient -> ReceivesDiagnosis -> Doctor',
      inverseDirection: 'Doctor -> RecordsDiagnosisFor -> Patient',
      description: 'A patient receives a Diagnosis recorded by a doctor. A doctor records Diagnoses for multiple patients.',
    },
    {
      name: 'Doctor-Diagnosis',
      edge: 'MakesDiagnosis',
      direction: 'Doctor -> MakesDiagnosis -> Patient',
      inverseDirection: 'Patient -> ReceivesDiagnosisFrom -> Doctor',
      description: 'A doctor makes a Diagnosis for a patient. A patient receives Diagnoses from multiple doctors.',
      attributes: ['Date of Diagnosis'],
    },
    {
      name: 'Patient-Medication',
      edge: 'PrescribedMedication',
      direction: 'Patient -> PrescribedMedication -> Doctor',
      inverseDirection: 'Doctor -> PrescribesMedicationTo -> Patient',
      description: 'A patient is Prescribed medications by a doctor. A doctor Prescribes medications for multiple patients.',
      attributes: ['Dosage', 'Medication Frequency'],
    },
    {
      name: 'Doctor-Prescription',
      edge: 'IssuesPrescription',
      direction: 'Doctor -> IssuesPrescription -> Patient',
      inverseDirection: 'Patient -> ReceivesPrescriptionFrom -> Doctor',
      description: 'A doctor Prescribes medications to a patient. A patient receives Prescriptions from multiple doctors.',
    },
    {
      name: 'Doctor-Hospital',
      edge: 'WorksAt',
      direction: 'Doctor -> WorksAt -> Hospital',
      inverseDirection: 'Hospital -> EmploysDoctor -> Doctor',
      description: 'A doctor works at a Hospital. A Hospital employs multiple doctors.',
    },
    {
      name: 'Disease-Diagnosis',
      edge: 'DiagnosedIn',
      direction: 'Disease -> DiagnosedIn -> Patient',
      inverseDirection: 'Patient -> ReceivesDiagnosisOf -> Disease',
      description: 'A Disease is Diagnosed in multiple patients. A patient is Diagnosed with multiple Diseases.',
    },
    {
      name: 'Disease-Medication',
      edge: 'ManagedWithMedication',
      direction: 'Disease -> ManagedWithMedication -> Medication',
      inverseDirection: 'Medication -> UsedForManaging -> Disease',
      description: 'A Disease is Managed with specific Medication options. Multiple Diseases may share common Medication options.',
    },
    {
      name: 'Medication-Prescription',
      edge: 'IncludedInPrescription',
      direction: 'Medication -> IncludedInPrescription -> Prescription',
      inverseDirection: 'Prescription -> ContainsMedication -> Medication',
      description: 'A Medication is Prescribed in a Prescription to a patient by a doctor. A Prescription includes one or more Medications.',
      attributes: ['Medication Dosage', 'Medication Frequency'],
    },
    {
      name: 'Symptom-Diagnosis',
      edge: 'AssociatedWithDiagnosis',
      direction: 'Symptom -> AssociatedWithDiagnosis -> Diagnosis',
      inverseDirection: 'Diagnosis -> InvolvesSymptom -> Symptom',
      description: 'A Symptom is associated with a Diagnosis for a patient. A Diagnosis may involve multiple Symptoms.',
    },
    {
      name: 'Hospital-Doctor',
      edge: 'EmploysDoctor',
      direction: 'Hospital -> EmploysDoctor -> Doctor',
      inverseDirection: 'Doctor -> WorksAt -> Hospital',
      description: 'A Hospital employs Doctors. A Doctor works at a Hospital.',
    },
    {
      name: 'Hospital-Patient',
      edge: 'ProvidesCareTo',
      direction: 'Hospital -> ProvidesCareTo -> Patient',
      inverseDirection: 'Patient -> ReceivesCareFrom -> Hospital',
      description: 'A Patient receives medical care at a Hospital. A Hospital provides care to multiple Patients.',
    },
  ];

// Create relationships
async function createRelationships() {
  try {
    for (const rel of relationships) {
      await createRelationship(rel);
    }
  } catch (err) {
    console.error('Failed to create relationships:', err);
  }
}

async function createRelationships() {
    try {
      const graph = arangoDBConnection.graph(DB_NAME);
  
      for (const rel of relationships) {
        await createRelationship(graph, rel);
      }
    } catch (err) {
      console.error('Failed to create relationships:', err);
    }
  }
  
  async function createRelationship(graph, relationship) {
    try {
      const { name, edge, direction, description } = relationship;
  
      console.log(`Creating ${name} Relationship:`);
      console.log(`Edge: ${edge}`);
      console.log(`Direction: ${direction}`);
      console.log(`Description: ${description}`);
  
      const collectionName = `${name}Collection`;
  
      // Check if the edge collection exists, and create it if it doesn't
      const collections = await arangoDBConnection.listCollections(true);
  
      if (!collections.some((collection) => collection.name === collectionName)) {
        await arangoDBConnection.createCollection(collectionName, { type: 3 }); // Use type 3 for edge collection
      }
  
      const edgeCollection = arangoDBConnection.collection(collectionName);
  
      // Extract source and target vertex types from the direction
      const [sourceVertexType, targetVertexType] = direction.split('->').map(item => item.trim());
  
      // Add edge definition dynamically
      await graph.addEdgeDefinition({
        collection: collectionName,
        from: [sourceVertexType],
        to: [targetVertexType],
      });
  
      // Insert sample relationship data dynamically
      const sampleRelationship = {
        _from: `${sourceVertexType.toLowerCase()}s/123`,
        _to: `${targetVertexType.toLowerCase()}s/456`,
        additionalAttributes: 'attributeValue',
      };
  
      await edgeCollection.save(sampleRelationship);
  
      console.log(`${name} Relationship created successfully.\n`);
    } catch (err) {
      console.error(`Failed to create ${relationship.name} Relationship:`, err);
    }
  }
  