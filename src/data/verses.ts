
interface Verse {
  reference: {
    pt: string;
    en: string;
    es: string;
  };
  text: {
    pt: string;
    en: string;
    es: string;
  };
}

export const verses: Verse[] = [
  {
    reference: {
      pt: "João 3:16",
      en: "John 3:16",
      es: "Juan 3:16"
    },
    text: {
      pt: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
      en: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      es: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
    }
  },
  {
    reference: {
      pt: "Salmos 23:1",
      en: "Psalm 23:1",
      es: "Salmos 23:1"
    },
    text: {
      pt: "O Senhor é o meu pastor, nada me faltará.",
      en: "The Lord is my shepherd, I lack nothing.",
      es: "El Señor es mi pastor, nada me faltará."
    }
  },
  {
    reference: {
      pt: "Filipenses 4:13",
      en: "Philippians 4:13",
      es: "Filipenses 4:13"
    },
    text: {
      pt: "Posso todas as coisas naquele que me fortalece.",
      en: "I can do all things through Christ who strengthens me.",
      es: "Todo lo puedo en Cristo que me fortalece."
    }
  },
  {
    reference: {
      pt: "Romanos 8:28",
      en: "Romans 8:28",
      es: "Romanos 8:28"
    },
    text: {
      pt: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
      en: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      es: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados."
    }
  },
  {
    reference: {
      pt: "Jeremias 29:11",
      en: "Jeremiah 29:11",
      es: "Jeremías 29:11"
    },
    text: {
      pt: "Porque eu bem sei os planos que tenho a vosso respeito, diz o Senhor; planos de paz, e não de mal, para vos dar um futuro e uma esperança.",
      en: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
      es: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis."
    }
  },
  {
    reference: {
      pt: "1 João 4:8",
      en: "1 John 4:8",
      es: "1 Juan 4:8"
    },
    text: {
      pt: "Aquele que não ama não conhece a Deus, porque Deus é amor.",
      en: "Whoever does not love does not know God, because God is love.",
      es: "El que no ama, no ha conocido a Dios; porque Dios es amor."
    }
  },
  {
    reference: {
      pt: "Provérbios 3:5-6",
      en: "Proverbs 3:5-6",
      es: "Proverbios 3:5-6"
    },
    text: {
      pt: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
      en: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      es: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas."
    }
  }
];

export const getDailyVerse = (): Verse => {
  // Get a verse based on the day of the year to ensure the same verse is shown all day
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return verses[dayOfYear % verses.length];
};
