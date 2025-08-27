import { v4 as uuidv4 } from "uuid";

const wordbank = {
    mri: { 
        en: "Magnetic Resonance Imaging", 
        es: "Imagen por Resonancia Magnética" 
    },
    ct: {
        en: "Computed Tomography", 
        es: "Tomografía Computarizada"
    },
    cbc: { 
        en: "Complete Blood Count", 
        es: "Biometría Hemática Completa" 
    },
    cdiff: {
        en: "Clostridioides difficile",
        es: "Clostridioides difficile"
    }
};

const getTranslation = (term, lang="en") => {
    const opp = (lang === 'en') ? 'es' : 'en'

    const original = wordbank[term]?.[lang] ?? "N/A";
    const pair = wordbank[term]?.[opp] ?? "N/A";
  return { id: uuidv4(), en: original, es: pair };
}

const normalizeTerm = (term) => {
  return term.replace(/[\.\-]/g, "").toLowerCase(); 
  // remove dots & dashes, then lowercase
};

export const getTranslations = (termsString, lang = "en") => {
  return termsString
    .split(",")
    .map(t => normalizeTerm(t.trim())) // normalize here
    .filter(Boolean)
    .map(term => getTranslation(term, lang));
};

