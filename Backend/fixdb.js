const mongoose = require('mongoose');
require('dotenv').config({path: './.env'});
mongoose.connect(process.env.DataBase_URL).then(async () => {
    const ServiceSchema = require('./src/Models/ServiceModel');
    const CategorySchema = require('./src/Models/CatrogrieModel');
    
    // Fix services
    const services = await ServiceSchema.find({ serviceImage: { $exists: true } });
    let updated = 0;
    for (let s of services) {
        if (s.serviceImage && s.serviceImage.includes('uploads')) {
            const parts = s.serviceImage.split(/[\\\/]/);
            const filename = parts[parts.length - 1];
            s.serviceImage = 'uploads/' + filename;
            await s.save();
            updated++;
        }
    }
    console.log('Updated', updated, 'services.');

    // Fix categories just in case
    const categories = await CategorySchema.find({ categoryImage: { $exists: true } });
    let updatedCat = 0;
    for (let c of categories) {
        if (c.categoryImage && c.categoryImage.includes('uploads')) {
            const parts = c.categoryImage.split(/[\\\/]/);
            const filename = parts[parts.length - 1];
            c.categoryImage = 'uploads/' + filename;
            await c.save();
            updatedCat++;
        }
    }
    console.log('Updated', updatedCat, 'categories.');

    process.exit(0);
}).catch(console.error);
