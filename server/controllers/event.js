const Event = require('../models/Event');
const validator = require('validator');
const User = require('../models/User');


function validateEventForm (payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  payload.ticketPrice = Number(payload.ticketPrice);

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 5) {
    isFormValid = false;
    errors.title = 'Title must be at least 5 characters long.';
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 20) {
    isFormValid = false;
    errors.description = 'Description must be at least 20 characters long.'
  }

  if (!payload || typeof payload.image !== 'string' || payload.image.length === 0) {
    isFormValid = false;
    errors.image = 'Image URL is required.';
  }

  if (!payload || typeof payload.date !== 'string' || payload.date.length === 0) {
    isFormValid = false;
    errors.date = 'Date is required.';
  }

  if (!payload || typeof payload.time !== 'string' || payload.time.length === 0) {
    isFormValid = false;
    errors.time = 'Time is required.';
  }

  if (!payload || typeof payload.location !== 'string' || payload.location.length < 3) {
    isFormValid = false;
    errors.location = 'Location is required.';
  }

  if (!payload || !payload.ticketPrice || payload.ticketPrice < 0) {
    isFormValid = false;
    errors.ticketPrice = 'Price must be a positive number.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  };

  return {
    success: isFormValid,
    message,
    errors
  };
}

exports.createNewEvent = (req, res) => {
    const charityEvent = req.body;
    
    const validationResult = validateEventForm(charityEvent);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
  
    Event.create(charityEvent)
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Event added successfully.',
          charityEvent
        });
    });
}

exports.getAll = (req, res) => {
    
    Event.find({})
    .then((charityEvent) => {
      return res.status(200).json(charityEvent);
    });
}

exports.getById = function (req, res) {
    const id = req.params.id;

    Event.findById(id)
      .then((charityEvent) => {
        if (!charityEvent) {
          return res.status(404).json({
            success: false,
            message: 'Entry does not exists!'
          });
        }
        return res.status(200).json(charityEvent);
      }).catch ((err) => {
        console.log(err);
        return res.status(400).json({
          message: 'Something went wrong. Please try again.'
        });
      });
}

exports.updateById = (req, res) => {
  const id = req.params.id;
  const charityEvent = req.body;

  if (!charityEvent) {
    return res.status(404).json({
      success: false,
      message: 'Event does not exists!'
    });
  }

  const validationResult = validateEventForm(charityEvent);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  Event.findByIdAndUpdate(id, charityEvent)
    .then((charityEvent) => {
      return res.status(200).json({
        success: true,
        message: 'Event updated successfully!',
        charityEvent
      });
  });
}

exports.deleteById = (req, res) => {
    const id = req.params.id;
  
    Event.findById(id)
      .then((charityEvent) => {
        if (!charityEvent) {
          return res.status(404).json({
            success: false,
            message: 'Event does not exists!'
          });
        }
  
        Event.findByIdAndDelete(id)
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Event deleted successfully!'
            });
        });
    });
}

exports.getLastThree = (req, res) => {
  Event.find().sort({ createdAt: -1 }).limit(3).then((result) => {
    return res.status(200).json({
      message: '',
      result
    });
  })
  .catch(() => {
    return res.status(401).json({
      message: 'Bad Request'
    });
  });
};

exports.volounteer = async (req, res) => {

  let eventId = req.params.id; 

  Event.findById(eventId).populate('volounteers').then((charityEvent) => {
    if (!charityEvent) {
      return res.status(404).json({
        message: 'There is no event with the given id in our database.'
      });
    }
    User.findById(req.user.id).then((user) => {
      let eventIds = user.volounteerTo.map((e) => e.toString());
      if (eventIds.indexOf(eventId) !== -1) {
        return res.status(401).json({
          message: 'You already have joined this event'
        });
      }
      user.volounteerTo.push(charityEvent._id);
      charityEvent.volounteers.push(user);
      ++charityEvent.volounteers.length;
      user.save();
      charityEvent.save();

      return res.status(200).json({
        message: 'You have successfully joined the event. Thank You!',
      });
    }).catch ((err) => {
      console.log(err);
      return res.status(401).json({
        message: 'Something went wrong! Please try again.'
      });
    });
  });
};