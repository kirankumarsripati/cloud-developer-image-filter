import { Router, Request, Response } from "express";
import { filterImageFromURL, deleteLocalFiles } from '../../util/util';
import { AuthRouter, requireAuth } from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

/**
 * Endpoint to filter an image from a public url.
 * 1. Validates the image_url query
 * 2. Call filterImageFromURL(image_url) to filter the image
 * 3. Send the resulting file in the response
 * 4. Deletes any files on the server on finish of the response
 * @param image_url: string URL of a publicly accessible image
 * @returns filtered image file
 */
router.get('/filteredimage', requireAuth, async (req: Request, res: Response) => {
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

// Displays a simple message to the user
router.get('/', async (req: Request, res: Response) => {
  res.send('try GET /filteredimage?image_url={{}}');
});

export const IndexRouter: Router = router;
