const pool = require('../db/db.js');

const createEvent = async ({ title, date_time, location, capacity }) => {
  const result = await pool.query(
    'INSERT INTO events (title, date_time, location, capacity) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, date_time, location, capacity]
  );
  return result.rows[0];
};

const getEventById = async (id) => {
  const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
  return result.rows[0];
};

const getRegistrationsByEventId = async (eventId) => {
  const result = await pool.query(
    'SELECT users.id, users.name, users.email FROM registrations JOIN users ON registrations.user_id = users.id WHERE registrations.event_id = $1',
    [eventId]
  );
  return result.rows;
};

const registerUserToEvent = async (userId, eventId) => {
  await pool.query('INSERT INTO registrations (user_id, event_id) VALUES ($1, $2)', [userId, eventId]);
};

const cancelRegistration = async (userId, eventId) => {
  await pool.query('DELETE FROM registrations WHERE user_id = $1 AND event_id = $2', [userId, eventId]);
};

const listUpcomingEvents = async () => {
  const result = await pool.query(
    `SELECT * FROM events WHERE date_time > NOW() ORDER BY date_time ASC, location ASC`
  );
  return result.rows;
};

const getEventStats = async (eventId) => {
  const total = await pool.query('SELECT COUNT(*) FROM registrations WHERE event_id = $1', [eventId]);
  const event = await getEventById(eventId);
  const totalRegs = parseInt(total.rows[0].count);
  return {
    total_registrations: totalRegs,
    remaining_capacity: event.capacity - totalRegs,
    percentage_used: ((totalRegs / event.capacity) * 100).toFixed(2) + '%'
  };
};

const getParticipantsInLast30Days = async (userId) => {
  const result = await pool.query(
    `SELECT 
      e.id AS event_id,
      e.title,
      e.location,
      e.date_time
    FROM registrations r
    JOIN events e ON r.event_id = e.id
    WHERE r.user_id = $1
      AND e.date_time BETWEEN NOW() - INTERVAL '30 days' AND NOW()
    ORDER BY e.date_time DESC`,
    [userId]
  );
  return result.rows;
};
const getUpcomingEventsForUser = async (userId) => {
  const result = await pool.query(
    `SELECT 
      e.id AS event_id,
      e.title,
      e.location,
      e.date_time
    FROM registrations r
    JOIN events e ON r.event_id = e.id
    WHERE r.user_id = $1
      AND e.date_time BETWEEN NOW() AND NOW() + INTERVAL '30 days'
    ORDER BY e.date_time ASC`,
    [userId]
  );
  return result.rows;
};
module.exports = {
  createEvent,
  getEventById,
  getRegistrationsByEventId,
  getParticipantsInLast30Days,
  getUpcomingEventsForUser,
  registerUserToEvent,
  cancelRegistration,
  listUpcomingEvents,
  getEventStats
};