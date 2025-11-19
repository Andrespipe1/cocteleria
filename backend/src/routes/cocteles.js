import { Router } from 'express';
import multer from 'multer';
import {
  listCocteles,
  getCoctel,
  createCoctel,
  updateCoctel,
  deleteCoctel
} from '../controllers/coctelesController.js';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', listCocteles);
router.get('/:id', getCoctel);
// Solo usa Multer en POST y PUT
router.post('/', upload.any(), createCoctel);
router.put('/:id', upload.any(), updateCoctel);
router.delete('/:id', deleteCoctel);

export default router;
