import { Router, Request, Response } from "express";
import { filterImageFromURL, deleteLocalFiles } from '../../util/util';

const router: Router = Router();

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */
router.get('/filteredimage', async (req: Request, res: Response) => {
  const { image_url: imageUrl } = req.query;

  if (!imageUrl) {
    res.status(400).send({ status: false, message: 'image_url is required' });
  }

  try {
    const filteredPath = await filterImageFromURL(imageUrl);
    res.status(200).sendFile(filteredPath, () => {
      deleteLocalFiles([filteredPath]);
    });
  } catch (e) {
    res
      .status(422)
      .send({ status: false, message: 'unprocessable image_url' });
  }
});

//! END @TODO1

// Displays a simple message to the user
router.get('/', async (req: Request, res: Response) => {
  res.send('try GET /filteredimage?image_url={{}}');
});

export const IndexRouter: Router = router;
