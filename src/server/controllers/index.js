var Product = require('../models/index');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res, next) {
    var product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err,product) {
        if (err) {
            return next(err);
        }
        res.send({code: 200, pobj: product})
    })
};

exports.product_details = function (req, res, next) {
    Product.find({},function (err, products) {
        if (err) return next(err);
        res.send(products);
    })
};

exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.body._id, {$set: req.body}, {new: true}, function (err, product) {
        if (err) return next(err);
        res.send({code: 200, pobj: product})
    });
};

exports.product_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.body._id, function (err) {
        if (err) return next(err);
        res.send({code: 200})
    })
};