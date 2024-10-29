import { useState } from "react";

// components/NoteDrawer.tsx
interface NoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, details: string) => void;
}

export const NoteDrawer = ({ isOpen, onClose, onAdd }: NoteDrawerProps) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");

  const handleSubmit = () => {
    onAdd(noteTitle, noteDetails);
    setNoteTitle("");
    setNoteDetails("");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 ${
          isOpen ? "block" : "hidden"
        }`}
      />
      <div
        className={`fixed inset-x-0 bottom-0 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="bg-white rounded-t-xl p-4 shadow-lg">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="العنوان"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full p-2 border rounded-lg text-right"
            />
            <textarea
              placeholder="التفاصيل"
              value={noteDetails}
              onChange={(e) => setNoteDetails(e.target.value)}
              className="w-full p-2 border rounded-lg h-32 text-right"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-amber-500 text-white py-2 rounded-lg"
              >
                إضافة
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 border rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
