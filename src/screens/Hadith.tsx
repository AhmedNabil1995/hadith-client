import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Book } from "lucide-react";
import axios from "axios";

// Dummy data for demonstration

interface HadithScreenProps {
  onNavigate: (screenName: string, params: any) => void;
  bookId: number | undefined;
  faslId: number | undefined;
  categoryId: number | undefined;
  firstHadith: number | undefined;
}

const HadithScreen: React.FC<HadithScreenProps> = ({
  bookId,
  faslId,
  categoryId,
  firstHadith,
}) => {
  const [hadiths, setHadiths] = useState<any[]>([]);
  const fetchHadiths = async (hadith_no: number) => {
    const res = await axios.get(`http://192.168.1.4:5000/api/hadiths`, {
      params: {
        hadith_no,
      },
    });
    setHadiths(res.data.hadiths || []);
  };

  useEffect(() => {
    fetchHadiths(firstHadith || 1);
  }, []);

  const goToNextHadith = async () => {
    await fetchHadiths(hadiths[0].hadith_no + 1);
  };

  const goToPrevHadith = async () => {
    await fetchHadiths(hadiths[0].hadith_no - 1);
  };
  const footnotes = hadiths[hadiths.length - 1]?.footnotes || [];
  const takhreej = hadiths[hadiths.length - 1]?.takhreej;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-16 pb-20">
      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Category Name */}
        <div className="bg-green-600 text-white p-3 rounded-t-lg text-right">
          <h2 className="text-lg font-bold">{hadiths?.[0]?.category_name}</h2>
        </div>

        {/* Hadith Card */}
        {hadiths.map((hadith: any, i: number) => (
          <div className="bg-white rounded-b-lg shadow-lg p-6 mb-4" key={i}>
            {/* Hadith Number */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-green-600 font-bold text-lg">
                حديث رقم: {hadith.hadith_no}
              </span>
            </div>

            {/* Hadith Text */}
            <div className="text-right mb-6 leading-relaxed text-lg">
              {hadith.hadith_text}
            </div>

            {/* Reference and Hukm */}
            <div className="flex justify-between items-center text-sm border-t pt-4">
              <span className="text-gray-600">{hadith.reference}</span>
              <span className="text-green-600 font-semibold">
                {hadith.hukm}
              </span>
            </div>
          </div>
        ))}

        {/* Footnotes Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
          <h3 className="text-right font-bold text-lg mb-3 text-green-600">
            الشرح والفوائد
          </h3>
          <div className="text-right text-gray-700">
            {footnotes.map((footnote: any, i: number) => (
              <p key={i} className="mb-2">
                {footnote.footnotes}
              </p>
            ))}
          </div>
          {takhreej && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-right font-bold mb-2 text-green-600">
                التخريج
              </h4>
              <p className="text-right text-gray-700">{takhreej}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-between px-4 py-2">
        <button
          onClick={goToPrevHadith}
          className={`bg-green-600 text-white p-3 rounded-full shadow-lg ${"hover:bg-green-700"}`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <button
          onClick={goToNextHadith}
          className={`bg-green-600 text-white p-3 rounded-full shadow-lg ${"hover:bg-green-700"}`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default HadithScreen;
