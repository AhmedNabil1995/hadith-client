import { Book } from "lucide-react";

// components/NoteDialog.tsx
interface NoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNew: () => void;
}

export const NoteDialog = ({ isOpen, onClose, onAddNew }: NoteDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
      <div className="bg-white rounded-lg w-full h-full max-w-md p-4">
        <div className="flex flex-col justify-center h-full items-center mb-4">
          <div className="w-16 h-16 mb-4">
            <Book className="w-full h-full" />
          </div>
          <p className="text-center text-sm">
            عذراً ليس هناك أي ملاحظة على هذا الفصل
          </p>
          <button
            onClick={onAddNew}
            className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-lg"
          >
            اضافة جديد
          </button>
        </div>
      </div>
    </div>
  );
};
