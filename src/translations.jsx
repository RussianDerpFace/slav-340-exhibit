// English translations for body text. Quotes stay in original language.
const TR = {
  exhibitTitle: { ru: "Литература — инструмент противостояния во времена СССР", en: "Literature as an Instrument of Resistance in the USSR" },
  subTitle: { ru: "Цифровая выставка · SLAV 242/340B", en: "Digital Exhibit · SLAV 242/340B" },
  entry: { ru: "ВХОД", en: "ENTRANCE" },
  exit: { ru: "ВЫХОД", en: "EXIT" },
  floorPlan: { ru: "План выставки", en: "Floor plan" },
  beginTour: { ru: "Начать экскурсию", en: "Begin the tour" },
  room: { ru: "Зал", en: "Hall" },

  rooms: [
    { ru: "Вход. Введение", en: "Entrance. Introduction" },
    { ru: "Хвылевой · «Я (Романтика)»", en: "Khvylovy · “I (Romance)”" },
    { ru: "Довлатов · «Компромисс»", en: "Dovlatov · “The Compromise”" },
    { ru: "Солженицын · Закон тайги", en: "Solzhenitsyn · Law of the Taiga" },
    { ru: "Солженицын · Хлеб, каша, мастерок", en: "Solzhenitsyn · Bread, Kasha, Trowel" },
    { ru: "Солженицын · Почти счастливый день", en: "Solzhenitsyn · An Almost Happy Day" },
    { ru: "Булгаков · «Изменились ли горожане?»", en: "Bulgakov · “Have the citizens changed?”" },
    { ru: "Булгаков · «Рукописи не горят»", en: "Bulgakov · “Manuscripts don’t burn”" },
    { ru: "Кафе «Булгаков» · Заключение", en: "Café Bulgakov · Conclusion" },
  ],

  // Per-room subtitles
  subs: [
    { ru: "Общее введение к экспозиции", en: "A general introduction" },
    { ru: "Когда революция пожирает своих детей", en: "When the revolution devours its children" },
    { ru: "Смех как скрытое оружие", en: "Laughter as a hidden weapon" },
    { ru: "Кодекс достоинства в нечеловеческих условиях", en: "A code of dignity in inhuman conditions" },
    { ru: "Предметы как акты сопротивления", en: "Objects as acts of resistance" },
    { ru: "Ирония как приговор системе", en: "Irony as a verdict on the system" },
    { ru: "Дьявол как единственный правдоруб", en: "The devil as the only truth-teller" },
    { ru: "Правда, трусость и любовь как бунт", en: "Truth, cowardice, and love as rebellion" },
    { ru: "Выход через литературное кафе. Оставьте отзыв.", en: "Exit via the literary café. Sign the guestbook." },
  ],
};
window.TR = TR;

// Helper: bilingual text node
function tr(obj){
  const { lang } = React.useContext(window.LangContext);
  if (!obj) return "";
  return lang === "en" ? (obj.en || obj.ru) : obj.ru;
}
window.tr = tr;
