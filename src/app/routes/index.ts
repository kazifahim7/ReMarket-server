import express from 'express'
import { authRouter } from '../Modules/Auth/auth.router'
import { listingRouter } from '../Modules/listing/listing.router'
import { transactionRouter } from '../Modules/transaction/transaction.router'

const router = express.Router()

const moduleRoutes = [
    {
        path: "/auth",
        route: authRouter
    },
    {
        path: "/listing",
        route: listingRouter
    },
    {
        path: "/tran",
        route: transactionRouter
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
export default router