var express = require('express');
var router = express.Router();
const Device = require('../models/deviceModel');

router.post('/add_device', (req, res) => {
    const { name, brand, price, warranty } = req.body;

    const device = new Device({ name, brand, price, warranty });

    const error = device.validateSync();
    if (error) {
        return res.status(400).json(error.errors);
    }

    device.save()
        .then(() => res.status(201).json({ message: 'Device added' }))
        .catch(() => res.status(500).json({ message: 'Server error' }));
});

router.get('/get_devices', (req, res) => {
    Device.find()
        .then(devices => {
            res.status(200).json({ devices });
        })
        .catch(() => {
            res.status(500).json({ message: 'Server error' });
        });
});

// update device
router.put('/update_device/:id', (req, res) => {
    const { name, brand, price, warranty } = req.body;

    const device = new Device({ name, brand, price, warranty });
    const error = device.validateSync();

    if (error) {
        return res.status(400).json(error.errors);
    }

    Device.findByIdAndUpdate(req.params.id, { name, brand, price, warranty })
        .then(() => res.json({ message: 'Device updated' }))
        .catch(() => res.status(500).json({ message: 'Server error' }));
});

// delete device
router.delete('/delete_device/:id', (req, res) => {
    Device.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Device deleted' }))
        .catch(() => res.status(500).json({ message: 'Server error' }));
});

module.exports = router;