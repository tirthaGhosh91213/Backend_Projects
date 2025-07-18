const eventModel = require('../modules/eventModel');

exports.createEvent = async (req, res, next) => {
  try {
    const { title, date_time, location, capacity } = req.body;
    if (capacity <= 0 || capacity > 1000) throw { status: 400, message: 'Invalid capacity' };
    const event = await eventModel.createEvent({ title, date_time, location, capacity });
    res.status(201).json({ event_id: event.id });
  } catch (err) {
    next(err);
  }
};

exports.getEventDetails = async (req, res, next) => {
  try {
    const event = await eventModel.getEventById(req.params.id);
    const users = await eventModel.getRegistrationsByEventId(req.params.id);
    res.json({ ...event, registrations: users });
  } catch (err) {
    next(err);
  }
};

exports.participateinLast30days = async (req, res, next) => {
  try {
    const participants = await eventModel.getParticipantsInLast30Days(req.params.id);
    res.json(participants);
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const event = await eventModel.getEventById(id);
    if (!event) throw { status: 404, message: 'Event not found' };
    if (new Date(event.date_time) < new Date()) throw { status: 400, message: 'Cannot register to past event' };
    const users = await eventModel.getRegistrationsByEventId(id);
    if (users.some(u => u.id == user_id)) throw { status: 409, message: 'User already registered' };
    if (users.length >= event.capacity) throw { status: 400, message: 'Event is full' };
    await eventModel.registerUserToEvent(user_id, id);
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    next(err);
  }
};

exports.cancel = async (req, res, next) => {
  try {
    const { eventId, userId } = req.params;
    const users = await eventModel.getRegistrationsByEventId(eventId);
    if (!users.some(u => u.id == userId)) throw { status: 400, message: 'User not registered for this event' };
    await eventModel.cancelRegistration(userId, eventId);
    res.json({ message: 'Registration cancelled' });
  } catch (err) {
    next(err);
  }
};

exports.listUpcoming = async (req, res, next) => {
  try {
    const events = await eventModel.listUpcomingEvents();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

exports.stats = async (req, res, next) => {
  try {
    const stats = await eventModel.getEventStats(req.params.id);
    res.json(stats);
  } catch (err) {
    next(err);
  }
};