const API_URL = '/api/appointments';

const form = document.getElementById('appointment-form');
const nameInput = document.getElementById('name');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const list = document.getElementById('appointment-list');

let editId = null;

form.onsubmit = async (e) => {
  e.preventDefault();

  const appointment = {
    name: nameInput.value,
    date: dateInput.value,
    time: timeInput.value
  };

  if (editId) {
    await fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    });
    editId = null;
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    });
  }

  form.reset();
  loadAppointments();
};

async function loadAppointments() {
  const res = await fetch(API_URL);
  const data = await res.json();
  list.innerHTML = '';
  data.forEach(addToDOM);
}

function addToDOM(appointment) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${appointment.name}</strong> — ${appointment.date} at ${appointment.time}
    <button onclick="editAppointment(${appointment.id}, '${appointment.name}', '${appointment.date}', '${appointment.time}')">✏️</button>
    <button onclick="deleteAppointment(${appointment.id})">❌</button>
  `;
  list.appendChild(li);
}

async function deleteAppointment(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadAppointments();
}

function editAppointment(id, name, date, time) {
  nameInput.value = name;
  dateInput.value = date;
  timeInput.value = time;
  editId = id;
}

loadAppointments();
