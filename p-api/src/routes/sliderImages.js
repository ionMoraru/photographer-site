import express from 'express';
import cloudinary from 'cloudinary';

const router = express.Router();

router.get('/', (req, res) => {
    cloudinary.v2.api.resources({ type: 'upload', max_results: 50, prefix: 'slider/' }, (error, result) => {
        if (error !== undefined) {console.log('Error retrieving images');}

        res.json({ nature: result.resources.map(img => {
            return {
                id: img.public_id,
                src: img.secure_url,
            }
        })});
    });
})

export default router;