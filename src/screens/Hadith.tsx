import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Book } from "lucide-react";

// Dummy data for demonstration
const DUMMY_HADITHS = [
  {
    hadith_no: 1,
    hadith_text:
      "عَنْ عُمَرَ بْنِ الْخَطَّابِ رضي الله عنه قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ: إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    category_name: "باب النية",
    reference: "صحيح البخاري (1/1)",
    hukm: "صحيح",
    takhreej: "أخرجه البخاري ومسلم",
    footnotes: [
      {
        hadith_no: 1,
        footnotes: "شرح الحديث: هذا حديث عظيم وقاعدة من قواعد الدين",
      },
    ],
  },
  {
    hadith_no: 2,
    hadith_text:
      "عَنْ عَائِشَةَ رضي الله عنها قَالَتْ: قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم: مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ",
    category_name: "باب البدع",
    reference: "صحيح البخاري (2697)",
    hukm: "صحيح",
    takhreej: "أخرجه البخاري ومسلم",
    footnotes: [
      {
        hadith_no: 2,
        footnotes: "شرح الحديث: قاعدة عظيمة في رد البدع والمحدثات",
      },
    ],
  },
];

interface HadithScreenProps {
  onNavigate: (screenName: string, params: any) => void;
  bookId: number | undefined;
  faslId: number | undefined;
}

const HadithScreen: React.FC<HadithScreenProps> = () => {
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0);
  const [showFootnotes, setShowFootnotes] = useState(false);

  const currentHadith = DUMMY_HADITHS[currentHadithIndex];

  const goToNextHadith = () => {
    if (currentHadithIndex < DUMMY_HADITHS.length - 1) {
      setCurrentHadithIndex((prev) => prev + 1);
      setShowFootnotes(false);
    }
  };

  const goToPrevHadith = () => {
    if (currentHadithIndex > 0) {
      setCurrentHadithIndex((prev) => prev - 1);
      setShowFootnotes(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-16 pb-20">
      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Category Name */}
        <div className="bg-green-600 text-white p-3 rounded-t-lg text-right">
          <h2 className="text-lg font-bold">{currentHadith.category_name}</h2>
        </div>

        {/* Hadith Card */}
        <div className="bg-white rounded-b-lg shadow-lg p-6 mb-4">
          {/* Hadith Number */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-green-600 font-bold text-lg">
              حديث رقم: {currentHadith.hadith_no}
            </span>
            <button
              onClick={() => setShowFootnotes(!showFootnotes)}
              className="text-green-600 hover:text-green-700"
            >
              <Book className="h-5 w-5" />
            </button>
          </div>

          {/* Hadith Text */}
          <div className="text-right mb-6 leading-relaxed text-lg">
            {currentHadith.hadith_text}
          </div>

          {/* Reference and Hukm */}
          <div className="flex justify-between items-center text-sm border-t pt-4">
            <span className="text-gray-600">{currentHadith.reference}</span>
            <span className="text-green-600 font-semibold">
              {currentHadith.hukm}
            </span>
          </div>
        </div>

        {/* Footnotes Section */}
        {showFootnotes && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
            <h3 className="text-right font-bold text-lg mb-3 text-green-600">
              الشرح والفوائد
            </h3>
            <div className="text-right text-gray-700">
              {currentHadith.footnotes.map((footnote, index) => (
                <p key={index} className="mb-2">
                  {footnote.footnotes}
                </p>
              ))}
            </div>
            {currentHadith.takhreej && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-right font-bold mb-2 text-green-600">
                  التخريج
                </h4>
                <p className="text-right text-gray-700">
                  {currentHadith.takhreej}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-between px-4 py-2">
        <button
          onClick={goToPrevHadith}
          disabled={currentHadithIndex === 0}
          className={`bg-green-600 text-white p-3 rounded-full shadow-lg ${
            currentHadithIndex === 0 ? "opacity-50" : "hover:bg-green-700"
          }`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <button
          onClick={goToNextHadith}
          disabled={currentHadithIndex === DUMMY_HADITHS.length - 1}
          className={`bg-green-600 text-white p-3 rounded-full shadow-lg ${
            currentHadithIndex === DUMMY_HADITHS.length - 1
              ? "opacity-50"
              : "hover:bg-green-700"
          }`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default HadithScreen;
