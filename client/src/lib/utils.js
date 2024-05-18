import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPriceForints(price) {
  if (!price && price !== 0) return "";
  const [integerPart, decimalPart] = price.toFixed(2).split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  let formattedDecimalPart = decimalPart || "0";
  formattedDecimalPart = formattedDecimalPart.replace(/0+$/, ""); // Remove trailing zeros
  if (formattedDecimalPart === "") {
    return formattedIntegerPart + " Ft";
  } else {
    return formattedIntegerPart + "," + formattedDecimalPart + " Ft";
  }
}

export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function formatExperiences(experiences) {
  if (Array.isArray(experiences)) {
    return experiences.map(experience => {
      const interval = `${experience.fromYear}-${experience.toYear}`;
      return {
        company: experience.company,
        title: experience.title,
        interval: interval
      };
    });
  } else {
    const interval = `${experiences.fromYear}-${experiences.toYear}`;
    return {
      company: experiences.company,
      title: experiences.title,
      interval: interval
    };
  }
}
