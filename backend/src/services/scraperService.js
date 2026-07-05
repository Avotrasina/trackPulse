import { createOffer, findOfferByLink } from "../db/queries/offers";


export async function saveOfferIfNotExists(offer) {
  const existing = await findOfferByLink(offer.link);
  if (!existing) {
    return await createOffer(offer);
  }
}