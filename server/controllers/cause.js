const Cause = require('../models/Cause');
const validator = require('validator');
const User = require('../models/User');

const PAGE_LIMIT = 15;

function validateCauseForm (payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  payload.neededAmount = Number(payload.neededAmount);

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 5) {
    isFormValid = false;
    errors.title = 'Title must be at least 5 characters long.';
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 20) {
    isFormValid = false;
    errors.description = 'Description must be at least 20 characters long.'
  }

  if (!payload || !payload.neededAmount || payload.neededAmount < 0) {
    isFormValid = false;
    errors.neededAmount = 'Needed amount must be a positive number.';
  }

  if (!payload || typeof payload.image !== 'string' || payload.image.length === 0) {
    isFormValid = false;
    errors.image = 'Image URL is required.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  };

  return {
    success: isFormValid,
    message,
    errors
  };
}

exports.createNewCause = (req, res) => {
    const cause = req.body;
   
    const validationResult = validateCauseForm(cause);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
  
    Cause.create(cause)
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Cause added successfully.',
          cause
        });
    });
}

exports.getAll = (req, res) => {
  
    Cause.find({})
    .then((cause) => {
      return res.status(200).json(cause);
    });
}

exports.getById = function (req, res) {
    const id = req.params.id;

    Cause.findById(id)
      .then((cause) => {
        if (!cause) {
          return res.status(404).json({
            success: false,
            message: 'Entry does not exists!'
          });
        }
        return res.status(200).json(cause);
      }).catch((err) => {
        console.log(err);
        return res.status(401).json({
          message: 'Something went wrong. Please try again.'
        });
      });
}

exports.updateById = (req, res) => {
  const id = req.params.id;
  const cause = req.body;

  if (!cause) {
    return res.status(404).json({
      success: false,
      message: 'Cause does not exists!'
    });
  }

  const validationResult = validateCauseForm(cause);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  Cause.findByIdAndUpdate(id, cause)
    .then((cause) => {
      return res.status(200).json({
        success: true,
        message: 'Cause updated successfully!',
        cause
      });
  });
}

exports.deleteById = (req, res) => {
    const id = req.params.id;
  
    Cause.findById(id)
      .then((cause) => {
        if (!cause) {
          return res.status(404).json({
            success: false,
            message: 'Cause does not exists!'
          })
        }
  
        Cause.findByIdAndDelete(id)
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Cause deleted successfully!'
            });
        });
    });
}

exports.search = (req, res) => {
   
    let params = req.query;
    let searchParams = {
        query: {},
        sort: { createdAt: -1 },
        skip: null,
        limit: PAGE_LIMIT   
    };

    if (params.query || typeof params.query === 'string') {
        let query = JSON.parse(params.query);
        searchParams.query = { $text: { $search: query['searchTerm'], $language: 'en' }};
    }

    if (params.sort) {
      searchParams.sort = JSON.parse(params.sort);
    }

    if (params.skip) {
      searchParams.skip = JSON.parse(params.skip);
    }

    if (params.limit) {
        searchParams.limit = JSON.parse(params.limit);
    }

    Cause.find(searchParams.query).count().then((count) => {
        Cause.find(searchParams.query).sort(searchParams.sort).skip(searchParams.skip).limit(searchParams.limit).then((result) => {
            return res.status(200).json({
                result,
            });
        })
        .catch((err) => {
          console.log(err);
            return res.status(401).json({
                message: 'Bad Request'
            });
        });
    });
};


exports.donate = async (req, res) => {
   
    let causeId = req.params.id;
    let donatedAmount = Number(req.body.donatedAmount);

    Cause.findById(causeId).populate('donators').then((cause) => {
      if (!cause) {
        return res.status(404).json({
          message: 'There is no cause with the given id in our database.'
        });
      }
      User.findById(req.user.id).then((user) => {
        
        user.donations.push(cause._id);
        cause.donators.push(user);
        cause.raisedAmount += donatedAmount;
        ++cause.donators.length;
        user.save();
        cause.save();

        return res.status(200).json(cause);
      }).catch((err) => {
        console.log(err);
        return res.status(401).json({
          message: 'Something went wrong! Please try again.',
        });
      });
    });
};