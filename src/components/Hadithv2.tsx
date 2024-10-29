import React from "react";
import { ScreenName, ScreenParams } from "../types";
import { useHadiths } from "../hooks/useHadiths";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HadithScreenProps {
  onNavigate: (screenName: ScreenName, params: ScreenParams) => void;
  bookId: number | undefined;
  faslId: number | undefined;
  categoryId: number | undefined;
  firstHadith: number | undefined;
}

const HadithScreen: React.FC<HadithScreenProps> = ({ firstHadith = 1 }) => {
  const { hadiths, goToNextHadith, goToPrevHadith } = useHadiths(firstHadith);

  const takhreej = hadiths[hadiths.length - 1]?.takhreej;
  const footnotes = hadiths.flatMap((hadith) => hadith.footnotes);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="flex-1 p-4">
        {hadiths.length > 0 && (
          <div className="bg-green-600 text-white p-3 rounded-t-lg text-right">
            <h2 className="text-lg font-bold">{hadiths[0].category_name}</h2>
          </div>
        )}
        {hadiths.map((hadith, index) => (
          <HadithCard key={index} hadith={hadith} />
        ))}
        <FootnotesSection footnotes={footnotes} takhreej={takhreej} />
      </div>
      <NavigationArrows onPrev={goToPrevHadith} onNext={goToNextHadith} />
    </div>
  );
};

export default HadithScreen;

// HadithCard.tsx
const HadithCard: React.FC<{ hadith: any }> = ({ hadith }) => {
  function parseTextWithLinks(text: string) {
    return text.replace(/{\[(\d+)]}/g, (match, number) => {
      const anchorLink = `#ref${number}`; // Link to anchor ID on the same page
      return `<a href="${anchorLink}">${match}</a>`;
    });
  }

  return (
    <>
      <div className="bg-white rounded-b-lg shadow-lg p-6 mb-4">
        {/* Hadith Number */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-green-600 font-bold text-lg">
            حديث رقم: {hadith.hadith_no}
          </span>
        </div>

        {/* Hadith Text */}
        <div
          className="text-right mb-6 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{
            __html: parseTextWithLinks(hadith.hadith_text),
          }}
        ></div>

        {/* Reference and Hukm */}
        <div className="flex justify-between items-center text-sm border-t pt-4">
          <span className="text-gray-600">{hadith.reference}</span>
          <span className="text-green-600 font-semibold">{hadith.hukm}</span>
        </div>
      </div>
    </>
  );
};

// FootnotesSection.tsx
const FootnotesSection: React.FC<{ footnotes: any[]; takhreej: string }> = ({
  footnotes,
  takhreej,
}) => {
  return (
    (footnotes.length > 0 || takhreej) && (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4  mb-4">
        {footnotes.length > 0 && (
          <h3 className="text-right font-bold text-lg mb-3 text-green-600">
            الشرح والفوائد
          </h3>
        )}
        {footnotes.map((footnote, i) => (
          <div className="text-right text-gray-700">
            <p key={i} className="mb-2" id={`ref${i}`}>
              {`{[${i + 1}]}`} {footnote.footnotes}
            </p>
          </div>
        ))}
        {takhreej && (
          <div
            className={`${footnotes.length > 0 ? "mt-4 pt-4 border-t" : ""}`}
          >
            <h4 className="text-right font-bold mb-2 text-green-600">
              التخريج
            </h4>
            <p className="text-right text-gray-700">{takhreej}</p>
          </div>
        )}
      </div>
    )
  );
};

// NavigationArrows.tsx
const NavigationArrows: React.FC<{
  onPrev: () => void;
  onNext: () => void;
}> = ({ onPrev, onNext }) => {
  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-between px-4 py-2">
      <button
        onClick={onPrev}
        className={`bg-green-600 text-white p-3 rounded-full shadow-lg ${"hover:bg-green-700"}`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <button
        onClick={onNext}
        className={`bg-green-600 text-white p-3 rounded-full shadow-lg ${"hover:bg-green-700"}`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
    </div>
  );
};
