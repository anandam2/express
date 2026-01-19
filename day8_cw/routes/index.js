var express = require('express');
var router = express.Router();
const Phone = require('../models/phoneModel');

// [GET] Home Page - Create Form
router.get('/', (req, res) => {
    res.render('homepage', {
        success: req.query.success,
        error: req.query.error
    });
});

// [POST] Create Phone
router.post('/phones', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        await Phone.create({ name, price, description });
        res.redirect('/?success=Phone added successfully');
    } catch (err) {
        res.redirect('/?error=Failed to add phone');
    }
});

// [GET] Read - Phone List
router.get('/phoneList', async (req, res) => {
    try {
        const phones = await Phone.find().sort({ createdAt: -1 });
        res.render('phoneList', { phones, success: req.query.success, error: req.query.error });
    } catch (err) {
        res.redirect('/?error=Unable to fetch phones');
    }
});

// [GET] Update - Show Edit Form
router.get('/phoneUpdate/:id', async (req, res) => {
    try {
        const phone = await Phone.findById(req.params.id);
        res.render('phoneUpdate', { phone });
    } catch (err) {
        res.redirect('/phoneList?error=Phone not found');
    }
});

// [POST] Update - Save Changes
router.post('/phones/update/:id', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        await Phone.findByIdAndUpdate(req.params.id, { name, price, description });
        res.redirect('/phoneList?success=Phone updated successfully');
    } catch (err) {
        res.redirect('/phoneList?error=Update failed');
    }
});

// [GET] Delete - Show Confirmation
router.get('/phoneDelete/:id', async (req, res) => {
    try {
        const phone = await Phone.findById(req.params.id);
        res.render('phoneDelete', { phone });
    } catch (err) {
        res.redirect('/phoneList?error=Phone not found');
    }
});

// [POST] Delete - Confirm Delete
router.post('/phones/delete/:id', async (req, res) => {
    try {
        await Phone.findByIdAndDelete(req.params.id);
        res.redirect('/phoneList?success=Phone deleted successfully');
    } catch (err) {
        res.redirect('/phoneList?error=Delete failed');
    }
});

module.exports = router;