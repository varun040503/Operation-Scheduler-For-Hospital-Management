// Firebase Firestore instance
const db = firebase.firestore();

// Admin Login
function adminLogin() {
  var username = document.getElementById('admin-username').value;
  var password = document.getElementById('admin-password').value;

  // Perform login authentication (using Firebase Auth)
  // For simplicity, skipping authentication logic here
  // Show modules after successful login
  showManageDoctors();
  showManagePatients();
  showScheduleOperations();
}

// Show Manage Doctors Section
function showManageDoctors() {
  document.getElementById('manage-doctors').classList.remove('hidden');

  // Fetch and display doctors from Firestore
  db.collection("doctors").get().then((querySnapshot) => {
    var doctorList = document.getElementById("doctor-list");
    doctorList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      var doctorData = doc.data();
      doctorList.innerHTML += `<div>${doctorData.name} - ${doctorData.specialization} - ${doctorData.contact}</div>`;
    });
  });
}

// Show Add Doctor Form
function showAddDoctorForm() {
  document.getElementById('add-doctor-form').classList.remove('hidden');
}

// Add Doctor
function addDoctor() {
  var name = document.getElementById('doctor-name').value;
  var specialization = document.getElementById('doctor-specialization').value;
  var contact = document.getElementById('doctor-contact').value;

  // Add doctor to Firestore
  db.collection("doctors").add({
    name: name,
    specialization: specialization,
    contact: contact
  })
    .then(() => {
      console.log("Doctor added successfully");
      showManageDoctors(); // Refresh doctor list
      document.getElementById('add-doctor-form').classList.add('hidden');
    })
    .catch((error) => {
      console.error("Error adding doctor: ", error);
    });
}

// Show Manage Patients Section
function showManagePatients() {
  document.getElementById('manage-patients').classList.remove('hidden');

  // Fetch and display patients from Firestore
  db.collection("patients").get().then((querySnapshot) => {
    var patientList = document.getElementById("patient-list");
    patientList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      var patientData = doc.data();
      patientList.innerHTML += `<div>${patientData.name} - ${patientData.id} - ${patientData.history}</div>`;
    });
  });
}

// Show Add Patient Form
function showAddPatientForm() {
  document.getElementById('add-patient-form').classList.remove('hidden');
}

// Add Patient
function addPatient() {
  var name = document.getElementById('patient-name').value;
  var id = document.getElementById('patient-id').value;
  var history = document.getElementById('patient-history').value;

  // Add patient to Firestore
  db.collection("patients").add({
    name: name,
    id: id,
    history: history
  })
    .then(() => {
      console.log("Patient added successfully");
      showManagePatients(); // Refresh patient list
      document.getElementById('add-patient-form').classList.add('hidden');
    })
    .catch((error) => {
      console.error("Error adding patient: ", error);
    });
}
