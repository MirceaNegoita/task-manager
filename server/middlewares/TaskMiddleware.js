const { check } = require('express-validator/check')

module.exports.validate = (method) => {
    switch (method) {
        case 'createTask':
            return[
                check('title').not().isEmpty(),
                check('description').not().isEmpty(),
                check('status').not().isEmpty()
            ]
        case 'updateTask':
            return[
                check('status').not().isEmpty()
            ]
        default:
            break
    }
}