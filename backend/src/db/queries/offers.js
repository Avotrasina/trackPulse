import pool from "../../config/db";

// Create new offer
export async function createOffer(offer) {
  const result = await pool.query(
    `INSERT INTO offers(type, title, source, link, description) VALUES ($1, $2, $3, $4, $5)
     RETURNING *
    `,
    [
      offer.type,
      offer.title,
      offer.source,
      offer.link,
      offer.description
    ]
  );
  return result.rows[0];
}

// Find offer by its Link
export async function findOfferByLink(link) {
  const result = await pool.query(
    `
    SELECT * FROM offers WHERE link = $1
    `,
    [link]
  );
  return result.rows[0];
}