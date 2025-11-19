import { Router } from 'express';
import {
  listCocteles,
  getCoctel,
  createCoctel,
  updateCoctel,
  deleteCoctel
} from '../controllers/coctelesController.js';

const router = Router();

router.get('/', listCocteles);
router.get('/:id', getCoctel);
router.post('/', createCoctel);
router.put('/:id', updateCoctel);
router.delete('/:id', deleteCoctel);

export default router;
