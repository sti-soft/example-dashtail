import "server-only";

const dictionaries = {
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),  
};



export const getDictionary = async (locale: keyof typeof dictionaries) => {
  return dictionaries[locale]();
};