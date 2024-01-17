const arangojs = require("@arangodb");

const HOST = 'https://6f6252c6bf06.arangodb.cloud:8529';
const PORT = 8529;
const USER = 'root';
const PASSWORD = 'rgstYbiSiWvlPbaakTYS';
const DB_NAME = 'semanticweb';

const db = new Database({
  url: HOST,
  databaseName: DB_NAME,
  auth: { username: USER, password: PASSWORD },
});

function formatToCollectionName(inputString) {
  // Split the string into words
  const words = inputString.split(/(?=[A-Z])/);

  // Capitalize the first letter of each word
  const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words with a hyphen and append "Collection" at the end
  const result = formattedWords.join('-') + 'Collection';

  return result;
}

function addRelationship(collectionName, fromId, toId) {
  try {
      // Assume you have a collection named 'relationships'
      const relationships = db.collection(collectionName);

      // Create a document representing the relationship
      const relationshipDocument = {
          from: fromId,
          to: toId,
          // Add any other properties as needed
      };

      // Insert the document into the collection
      relationships.save(relationshipDocument);

      console.log(`Relationship added between ${fromId} and ${toId}`);
  } catch (error) {
      console.error(`Error adding relationship: ${error.message}`);
  }
}


function addPatientDoctorRelationship() {
    const patientId = document.getElementById("patientId").value;
    const doctorId = document.getElementById("doctorId").value;

    const c = document.getElementById("relationshipType").value;
    const collectionName=formatToCollectionName(c);
    addRelationship(collectionName, patientId, doctorId);
}

function showRelationshipForm() {
    const selectedType = document.getElementById("relationshipType").value;
    const formContainer = document.getElementById("relationshipFormContainer");
  
    // Clear existing content
    formContainer.innerHTML = "";
  
    // Load the appropriate form based on the selected relationship type
    switch (selectedType) {
        case "patientDoctor":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Patient-Doctor Relationship</h2>\
            <form id="patientDoctorForm">\
              <label for="patientId">Patient ID:</label>\
              <input type="text" id="patientId" name="patientId" required>\
              <label for="doctorId">Doctor ID:</label>\
              <input type="text" id="doctorId" name="doctorId" required>\
              <button type="button" onclick="addPatientDoctorRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "patientDiagnosis":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Patient-Diagnosis Relationship</h2>\
            <form id="patientDiagnosisForm">\
              <label for="patientIdDiagnosis">Patient ID:</label>\
              <input type="text" id="patientIdDiagnosis" name="patientIdDiagnosis" required>\
              <label for="doctorIdDiagnosis">Doctor ID:</label>\
              <input type="text" id="doctorIdDiagnosis" name="doctorIdDiagnosis" required>\
              <button type="button" onclick="addPatientDiagnosisRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "doctorDiagnosis":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Doctor-Diagnosis Relationship</h2>\
            <form id="doctorDiagnosisForm">\
              <label for="doctorIdDiagnosis">Doctor ID:</label>\
              <input type="text" id="doctorIdDiagnosis" name="doctorIdDiagnosis" required>\
              <label for="patientIdDiagnosis">Patient ID:</label>\
              <input type="text" id="patientIdDiagnosis" name="patientIdDiagnosis" required>\
              <button type="button" onclick="addDoctorDiagnosisRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "patientMedication":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Patient-Medication Relationship</h2>\
            <form id="patientMedicationForm">\
              <label for="patientIdMedication">Patient ID:</label>\
              <input type="text" id="patientIdMedication" name="patientIdMedication" required>\
              <label for="doctorIdMedication">Doctor ID:</label>\
              <input type="text" id="doctorIdMedication" name="doctorIdMedication" required>\
              <button type="button" onclick="addPatientMedicationRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "doctorPrescription":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Doctor-Prescription Relationship</h2>\
            <form id="doctorPrescriptionForm">\
              <label for="doctorIdPrescription">Doctor ID:</label>\
              <input type="text" id="doctorIdPrescription" name="doctorIdPrescription" required>\
              <label for="patientIdPrescription">Patient ID:</label>\
              <input type="text" id="patientIdPrescription" name="patientIdPrescription" required>\
              <button type="button" onclick="addDoctorPrescriptionRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "doctorHospital":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Doctor-Hospital Relationship</h2>\
            <form id="doctorHospitalForm">\
              <label for="doctorIdHospital">Doctor ID:</label>\
              <input type="text" id="doctorIdHospital" name="doctorIdHospital" required>\
              <label for="hospitalIdDoctor">Hospital ID:</label>\
              <input type="text" id="hospitalIdDoctor" name="hospitalIdDoctor" required>\
              <button type="button" onclick="addDoctorHospitalRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "diseaseDiagnosis":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Disease-Diagnosis Relationship</h2>\
            <form id="diseaseDiagnosisForm">\
              <label for="diseaseIdDiagnosis">Disease ID:</label>\
              <input type="text" id="diseaseIdDiagnosis" name="diseaseIdDiagnosis" required>\
              <label for="patientIdDiagnosis">Patient ID:</label>\
              <input type="text" id="patientIdDiagnosis" name="patientIdDiagnosis" required>\
              <button type="button" onclick="addDiseaseDiagnosisRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "diseaseMedication":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Disease-Medication Relationship</h2>\
            <form id="diseaseMedicationForm">\
              <label for="diseaseIdMedication">Disease ID:</label>\
              <input type="text" id="diseaseIdMedication" name="diseaseIdMedication" required>\
              <label for="medicationIdDisease">Medication ID:</label>\
              <input type="text" id="medicationIdDisease" name="medicationIdDisease" required>\
              <button type="button" onclick="addDiseaseMedicationRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "medicationPrescription":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Medication-Prescription Relationship</h2>\
            <form id="medicationPrescriptionForm">\
              <label for="medicationIdPrescription">Medication ID:</label>\
              <input type="text" id="medicationIdPrescription" name="medicationIdPrescription" required>\
              <label for="prescriptionIdMedication">Prescription ID:</label>\
              <input type="text" id="prescriptionIdMedication" name="prescriptionIdMedication" required>\
              <button type="button" onclick="addMedicationPrescriptionRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "symptomDiagnosis":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Symptom-Diagnosis Relationship</h2>\
            <form id="symptomDiagnosisForm">\
              <label for="symptomIdDiagnosis">Symptom ID:</label>\
              <input type="text" id="symptomIdDiagnosis" name="symptomIdDiagnosis" required>\
              <label for="diagnosisIdSymptom">Diagnosis ID:</label>\
              <input type="text" id="diagnosisIdSymptom" name="diagnosisIdSymptom" required>\
              <button type="button" onclick="addSymptomDiagnosisRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "hospitalDoctor":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Hospital-Doctor Relationship</h2>\
            <form id="hospitalDoctorForm">\
              <label for="hospitalIdDoctor">Hospital ID:</label>\
              <input type="text" id="hospitalIdDoctor" name="hospitalIdDoctor" required>\
              <label for="doctorIdHospital">Doctor ID:</label>\
              <input type="text" id="doctorIdHospital" name="doctorIdHospital" required>\
              <button type="button" onclick="addHospitalDoctorRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        case "hospitalPatient":
          formContainer.innerHTML = '<div class="container">\
            <h2>Add Hospital-Patient Relationship</h2>\
            <form id="hospitalPatientForm">\
              <label for="hospitalIdPatient">Hospital ID:</label>\
              <input type="text" id="hospitalIdPatient" name="hospitalIdPatient" required>\
              <label for="patientIdHospital">Patient ID:</label>\
              <input type="text" id="patientIdHospital" name="patientIdHospital" required>\
              <button type="button" onclick="addHospitalPatientRelationship()">Add Relationship</button>\
            </form>\
          </div>';
          break;
      
        default:
          break;
      }
      
  }
  
  // Implement functions like addPatientDoctorRelationship, addPatientDiagnosisRelationship, etc.
  