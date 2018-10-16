import express from 'express';
import cloudinary from 'cloudinary';

const router = express.Router();

router.get('/', (req, res) => {
    cloudinary.v2.api.sub_folders("collections", (error, result) => {
        if (error !== undefined) {console.log('Error retrieving images');}
        
        res.json({ collections: result.folders });
    });
})

router.get('/images', (req, res) => {
    const { collectionName } = req.query;
    
    cloudinary.v2.api.resources({ type: 'upload', max_results: 50, prefix: `collections/${collectionName}/` }, (error, result) => {
        if (error !== undefined) {console.log('Error retrieving images');}

        res.json({ nature: result.resources.map(img => {
            const separator = 'color_photography/';
            return {
                id: img.public_id,
                name: img.public_id.split(separator).pop(),
                format: img.format,
                collection: 'Nature',
                url: img.secure_url,
            }
        })});
    });
})

export default router;