import express, { Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp, { OutputInfo } from 'sharp';

const images: string[] = ['encenadaport', 'fjord', 'icelandwaterfall', 'palmtunnel','santamonica'];
const router = express.Router();

router.get(
  '/images',
   (req: express.Request, res: express.Response): void | Response => {
    try{
    const fileName = req.query.filename as string;
    const imageWidth = req.query.width as string;
    const iageHeight = req.query.height as string;
    const imagesNames = images.includes(fileName);
    const imgLocation = path.resolve(`images/${fileName}.jpg`);

    if (!imagesNames) {
      return res.status(400).send('Please chose between these images for now!');
    }
    else if (!Object.prototype.hasOwnProperty.call(req.query, 'filename')) {
      return res.status(200).send('No image name');
    }
    else if (
      +imageWidth < 1 || +imageWidth > 4000 || +iageHeight < 1 || +iageHeight > 3000 || isNaN(+iageHeight) || isNaN(+imageWidth)
    ) { return res.status(400).send('please put a value < 4000 width and 300 height');
      }
    else {
      fs.stat(`output.jpg`, (err) => {
        if (!err) {
          console.log('folder exists');
        } else if (err.code === 'ENOENT') {
          fs.mkdir(`output.jpg`, (err) => {
            console.log(err);
          });
        }});
      const imageExists = path.resolve(`output.jpg`);

      fs.stat(imageExists, (err) => {
        if (!err) {
          imageResize(imgLocation, imageWidth, iageHeight).then(() => {
            const imgLocationResized = path.resolve(`output.jpg`);                  
           return res.sendFile(imgLocationResized);
          });  
        } else if (err.code === 'ENOENT') {
          imageResize(imgLocation, imageWidth, iageHeight).then(() => {
            const imgLocationResized = path.resolve(`output.jpg`);
           return res.sendFile(imgLocationResized);
          });
        }
      });
    }
  }
  catch(err){
    res.send("could not resize the image")
  }
}
);

function imageResize(imgLocation: string, imageWidth: string, imageHeight: string): Promise<OutputInfo> {
  return sharp(imgLocation)
    .resize(parseInt(imageWidth), parseInt(imageHeight))
    .toFile('output.jpg');
};

export default router;