// Dummy Data
export const DUMMY_DATA = {
  maqsads: [
    { id: 1, name: "العقيدة", icon: "book" },
    { id: 2, name: "العبادات", icon: "book" },
    { id: 3, name: "المعاملات", icon: "book" },
    { id: 4, name: "الأخلاق", icon: "book" },
    { id: 5, name: "السيرة", icon: "book" },
    { id: 6, name: "التفسير", icon: "book" },
    { id: 7, name: "الفقه", icon: "book" },
    { id: 8, name: "الحديث", icon: "book" },
    { id: 9, name: "الدعوة", icon: "book" },
    { id: 10, name: "الآداب", icon: "book" },
  ],
  books: [
    { id: 1, maqsadId: 1, name: "صحيح البخاري", hasFasl: true },
    { id: 2, maqsadId: 1, name: "صحيح مسلم", hasFasl: false },
    { id: 3, maqsadId: 2, name: "سنن أبي داود", hasFasl: true },
  ],
  fasls: [
    { id: 1, bookId: 1, name: "كتاب الإيمان" },
    { id: 2, bookId: 1, name: "كتاب العلم" },
    { id: 3, bookId: 3, name: "كتاب الطهارة" },
  ],
  categories: [
    { id: 1, faslId: 1, name: "باب حلاوة الإيمان" },
    { id: 2, faslId: 1, name: "باب علامات النفاق" },
    { id: 3, bookId: 2, name: "باب الوضوء" },
  ],
};
