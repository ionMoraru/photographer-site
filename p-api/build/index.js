'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _setHeaders = require('./middlewares/setHeaders');

var _setHeaders2 = _interopRequireDefault(_setHeaders);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressFileupload = require('express-fileupload');

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _collections = require('./routes/collections');

var _collections2 = _interopRequireDefault(_collections);

var _sliderImages = require('./routes/sliderImages');

var _sliderImages2 = _interopRequireDefault(_sliderImages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 8080;
_dotenv2.default.config();

_cloudinary2.default.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use((0, _morgan2.default)('tiny'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_setHeaders2.default);
app.use((0, _cookieParser2.default)());
app.use((0, _cors2.default)());
app.use((0, _expressFileupload2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.use('/api/v1/collections', _collections2.default);
app.use('/api/v1/slider', _sliderImages2.default);

app.get('/', function (req, res) {
    res.json({ text: 'API' });
});

// const response = cloudinary.v2.api.root_folders(function(error, result){console.log(result)});


app.listen(port, function () {
    return console.log('Server listen on ' + port);
});
//# sourceMappingURL=index.js.map