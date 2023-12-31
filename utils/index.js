export function redirectToHomepage() {
  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
}

export function CurrencyConverter(value, currency, digits) {
  if (currency) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
    }).format(value);
  }
  return new Intl.NumberFormat("id-ID", {
    maximumSignificantDigits: digits || 2,
  }).format(value);
}

export function DateConverter(value) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    month: "long",
    day: "numeric",
  }).format(Date.parse(value));
}

export function TimeConverter(value) {
  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(Date.parse(value));
}
