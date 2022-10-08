const Image = require('../models/Image')
const fs = require('fs')

exports.showImage =  async (req, res) => {
    try {
     const key = req.query.key;
     const image = await Image.findOne({where: {key}});
     if(image) {
         const path = image.dataValues.path;
          res.render('show_image', {key, path});
     }
      return res.render('error_page', {msg:'Invalid Key'});
    } catch (e) {
     console.log(e)
     return res.render('error_page', {msg:'there is an error, check console'});
     }
 };


 exports.addImage = async (req, res) => {
        try{
            const key = req.body.key;
            const  path = req.file.path;
            const isExist = await Image.findOne({where: {key}});
            if(isExist) {
                await Image.update({path}, {where:{key}});
                fs.unlinkSync(isExist.dataValues.path); //delete old image from file system
                return res.render('show_image', {key, path});
            }
            await Image.create({ key, path});
            res.render('show_image', {key, path});
        } catch(e) {
            console.log(e);
        }
    }


exports.getKeys = async (req, res) => {
    const keys = await Image.findAll({
        attributes: ['key']
      });
      return res.render('keys', {keys});

};