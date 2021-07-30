import config from "../config";

const stripe = Stripe(config.STRIPE_KEY);

export default stripe;
