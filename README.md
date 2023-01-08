This Project is about an API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters (and additional stylization if you choose) for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API you create will handle resizing and serving stored images for you.
The names of the images are already added names and located in the imageRoutes folder named as images constant
To run the appplication npm install followed by run npm start.
To build the aplication run the command npm run build
To test the aplication run the command npm run test
To run ESlint use the command npm run lint
To run prettier use the command npm run prettier
The endpoint to resize the images is http://localhost:3000/api/images?filename=fjord&width=300&height=250. 
Base endpoint is 'https://localhost:3000/api'.