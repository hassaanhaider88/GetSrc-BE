import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 50,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
})

export default limiter;