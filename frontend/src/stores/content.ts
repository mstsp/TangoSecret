import { defineStore } from "pinia";

export type Language = "uk" | "ru" | "en";

interface HeroContent {
  title: string;
  description: string;
  buttonTitle: string;
}

interface AboutContent {
  title: string;
  greeting: string;
  description: string;
  imageAlt: string;
}

interface Content {
  hero: HeroContent;
  about: AboutContent;
}

const translations: Record<Language, Content> = {
  uk: {
    hero: {
      title: "Tango Secret",
      description:
        "Ми — школа аргентинського танго в м. Дніпро. Ми намагаємося, щоб люди не просто дивились, як танцюють інші, а танцювали самі.",
      buttonTitle: "Почати танцювати",
    },

    about: {
      title: "Давайте знайомитись!",
      greeting: "Привіт!",
      description:
        "Танго Сікрет — затишне місце з атмосферою добра та світла. Саме тут ми навчаємо різних людей втілювати за допомогою танго своє натхнення та емоції, танцювати вільно і не боятися бути собою. Наша мета — створити всі умови для комфортного розвитку та творчості!",
      imageAlt: "Заняття у школі аргентинського танго Tango Secret",
    },
  },

  ru: {
    hero: {
      title: "Tango Secret",
      description:
        "Мы — школа аргентинского танго в Днепре. Мы хотим, чтобы люди не просто смотрели, как танцуют другие, а танцевали сами.",
      buttonTitle: "Начать танцевать",
    },

    about: {
      title: "Давайте знакомиться!",
      greeting: "Привет!",
      description:
        "Tango Secret — уютное место с атмосферой добра и света. Здесь мы помогаем людям выражать через танго своё вдохновение и эмоции, танцевать свободно и не бояться быть собой. Наша цель — создать все условия для комфортного развития и творчества!",
      imageAlt: "Занятие в школе аргентинского танго Tango Secret",
    },
  },

  en: {
    hero: {
      title: "Tango Secret",
      description:
        "We are an Argentine tango school in Dnipro. We want people not only to watch others dance, but to dance themselves.",
      buttonTitle: "Start dancing",
    },

    about: {
      title: "Let’s get acquainted!",
      greeting: "Hello!",
      description:
        "Tango Secret is a welcoming place filled with warmth and light. Here, we help people express their inspiration and emotions through tango, dance freely, and feel comfortable being themselves. Our goal is to create the right environment for growth and creativity!",
      imageAlt: "Argentine tango class at Tango Secret",
    },
  },
};

export const useContentStore = defineStore("content", {
  state: () => ({
    language: "uk" as Language,
  }),

  getters: {
    t: (state): Content => translations[state.language],

    currentLanguage: (state): Language => state.language,
  },

  actions: {
    setLanguage(language: Language) {
      this.language = language;
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
    },

    initLanguage() {
      const savedLanguage = localStorage.getItem("language");

      if (
        savedLanguage === "uk" ||
        savedLanguage === "ru" ||
        savedLanguage === "en"
      ) {
        this.setLanguage(savedLanguage);
      } else {
        this.setLanguage("uk");
      }
    },
  },
});
