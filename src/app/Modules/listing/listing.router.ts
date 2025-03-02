import express from 'express'
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validation';
import { ListingValidationSchema } from './listing.validation';
import { listingController } from './listing.controller';

const router = express.Router()

router.post('/listings',auth("user","admin"),validateRequest(ListingValidationSchema),listingController.createListing)
router.get('/listings',listingController.allListingProduct)
router.get('/listings/:id',auth("user"),listingController.productDetails)
router.put("/listing/:id",auth('user'),listingController.updateProduct)
router.delete("/listing/:id",auth('user'),listingController.deleteProduct)


//admin
router.delete("/listing/:id",auth('admin'),listingController.adminDeleteProduct)

//my listed product
router.get('/my-listings', listingController.mylisting)









export const listingRouter = router;



