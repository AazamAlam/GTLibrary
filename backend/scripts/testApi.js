import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE = process.env.BASE_URL || `http://localhost:${process.env.PORT || 4000}/api`;

const client = axios.create({ baseURL: BASE, timeout: 5000 });

async function run() {
  console.log(`Running API smoke tests against ${BASE}`);

  try {
    // Test root
    const rootRes = await axios.get(BASE.replace('/api','/'));
    console.log('[OK] GET / ->', rootRes.data);
  } catch (err) {
    console.error('[FAIL] GET / ->', err.message);
  }

  // Auth: register a student
  try {
    const student = {
      studentId: `s${Date.now()}`,
      name: "Test Student",
      email: `test+${Date.now()}@example.com`,
      password: "Password123!",
      department: "CS",
      year: 2
    };

  const res = await client.post('/auth/register/student', student);
    console.log('[OK] POST /auth/register/student ->', res.status);
    const token = res.data.token;

    // Try login
  const loginRes = await client.post('/auth/login', { type: 'student', email: student.email, password: student.password });
    console.log('[OK] POST /auth/login (student) ->', loginRes.status);

  } catch (err) {
    if (err.response) console.error('[FAIL] Auth student ->', err.response.status, err.response.data);
    else console.error('[FAIL] Auth student ->', err.message);
  }

  // Staff register/login
  try {
    const staff = { username: `staff${Date.now()}`, password: 'Secret123!' };
    const res = await client.post('/auth/register/staff', staff);
    console.log('[OK] POST /auth/register/staff ->', res.status);

    const loginRes = await client.post('/auth/login', { type: 'staff', username: staff.username, password: staff.password });
    console.log('[OK] POST /auth/login (staff) ->', loginRes.status);
  } catch (err) {
    if (err.response) console.error('[FAIL] Auth staff ->', err.response.status, err.response.data);
    else console.error('[FAIL] Auth staff ->', err.message);
  }

  // Equipment endpoints (basic create/get/delete flow)
  try {
    // Create a room first to get a valid ObjectId for equipment.location
    const roomRes = await client.post('/rooms', { name: `Room for Eq ${Date.now()}`, capacity: 10 });
    const roomId = roomRes.data._id || roomRes.data.id;

    const eq = { name: 'Projector', location: roomId, status: 'available', type: 'projector' };
    const createRes = await client.post('/equipment', eq);
    console.log('[OK] POST /equipment ->', createRes.status);
    const id = createRes.data._id || createRes.data.id;

    const getRes = await client.get(`/equipment/${id}`);
    console.log('[OK] GET /equipment/:id ->', getRes.status);

    const delRes = await client.delete(`/equipment/${id}`);
    console.log('[OK] DELETE /equipment/:id ->', delRes.status);
  } catch (err) {
    if (err.response) console.error('[FAIL] Equipment flow ->', err.response.status, err.response.data);
    else console.error('[FAIL] Equipment flow ->', err.message);
  }

  // Rooms endpoints
  try {
    const room = { name: 'Test Room', capacity: 20 };
    const createRes = await client.post('/rooms', room);
    console.log('[OK] POST /rooms ->', createRes.status);
    const id = createRes.data._id || createRes.data.id;

    const getRes = await client.get(`/rooms/${id}`);
    console.log('[OK] GET /rooms/:id ->', getRes.status);

    const delRes = await client.delete(`/rooms/${id}`);
    console.log('[OK] DELETE /rooms/:id ->', delRes.status);
  } catch (err) {
    if (err.response) console.error('[FAIL] Rooms flow ->', err.response.status, err.response.data);
    else console.error('[FAIL] Rooms flow ->', err.message);
  }

// Maintenance endpoints
try {
  // 1️⃣ Register a staff to perform the maintenance
  const staff = { username: `staff${Date.now()}`, password: 'Secret123!' };
  const staffRes = await client.post('/auth/register/staff', staff);
  const staffId = staffRes.data._id;

  // 2️⃣ Create a room to place the equipment
  const roomRes = await client.post('/rooms', { name: `Room for Maint ${Date.now()}`, capacity: 5 });
  const roomId = roomRes.data._id || roomRes.data.id;

  // 3️⃣ Create an equipment in that room
  const eqRes = await client.post('/equipment', { name: `Eq for Maint ${Date.now()}`, location: roomId, status: 'available', type: 'general' });
  const equipmentId = eqRes.data._id || eqRes.data.id;

  // 4️⃣ Create a maintenance log using the staffId and equipmentId
  const log = { 
    equipmentId, 
    description: 'Test maintenance', 
    reportedBy: 'Tester',
    performedBy: staffId,    // real ObjectId
    action: 'Inspection'
  };
  const createRes = await client.post('/maintenance', log);
  console.log('[OK] POST /maintenance ->', createRes.status);

  // 5️⃣ Get the maintenance log
  const id = createRes.data._id || createRes.data.id;
  const getRes = await client.get(`/maintenance/${id}`);
  console.log('[OK] GET /maintenance/:id ->', getRes.status);

  // 6️⃣ Delete the maintenance log
  const delRes = await client.delete(`/maintenance/${id}`);
  console.log('[OK] DELETE /maintenance/:id ->', delRes.status);

} catch (err) {
  if (err.response) console.error('[FAIL] Maintenance flow ->', err.response.status, err.response.data);
  else console.error('[FAIL] Maintenance flow ->', err.message);
}}

run().catch((e) => console.error(e));
