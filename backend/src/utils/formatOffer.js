function truncateText(text, maxLength = 30) {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function formatOffer(offer) {
  const shortDescription = truncateText(offer.description);

  const offerDetails = `${offer.title}\n\nCompany: ${offer.company}\n\nLink: ${offer.link}\n\nDescription:\n${shortDescription}`;

  return offerDetails;
}

export default formatOffer;