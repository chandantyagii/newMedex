const PDFDocument = require('pdfkit');
const express = require('express');
const router = express.Router();

// POST endpoint for generating PDF
router.post('/api/generate-pdf', (req, res) => {
    const { prescriptionText } = req.body;

    // Input validation
    if (!prescriptionText || typeof prescriptionText !== 'string') {
        return res.status(400).json({ error: 'Invalid input. Please provide a valid prescription text.' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    let buffers = [];

    // Collect PDF data
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);

        // Set headers to return the PDF
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=prescription.pdf');
        res.send(pdfData);
    });

    // Add content to the PDF
    doc.fontSize(12).text(prescriptionText);
    doc.end();
});

module.exports = router;