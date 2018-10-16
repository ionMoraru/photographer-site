'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
    _cloudinary2.default.v2.api.resources({ type: 'upload', max_results: 50, prefix: 'slider/' }, function (error, result) {
        if (error !== undefined) {
            console.log('Error retrieving images');
        }

        res.json({ nature: result.resources.map(function (img) {
                var separator = 'color_photography/';
                return {
                    id: img.public_id,
                    src: img.secure_url
                };
            }) });
    });
});

exports.default = router;
//# sourceMappingURL=sliderImages.js.map