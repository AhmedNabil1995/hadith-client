// contexts/UIContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface DialogProps {
  title: string;
  content: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface DrawerProps {
  content: ReactNode;
  onClose?: () => void;
}

interface UIContextType {
  showDialog: (props: DialogProps) => void;
  hideDialog: () => void;
  showDrawer: (props: DrawerProps) => void;
  hideDrawer: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogProps, setDialogProps] = useState<DialogProps | null>(null);
  const [drawerProps, setDrawerProps] = useState<DrawerProps | null>(null);

  const showDialog = (props: DialogProps) => setDialogProps(props);
  const hideDialog = () => setDialogProps(null);
  const showDrawer = (props: DrawerProps) => setDrawerProps(props);
  const hideDrawer = () => setDrawerProps(null);

  return (
    <UIContext.Provider
      value={{ showDialog, hideDialog, showDrawer, hideDrawer }}
    >
      {children}
      {dialogProps && <Dialog {...dialogProps} />}
      {drawerProps && <Drawer {...drawerProps} />}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};

// Generic Dialog component
const Dialog: React.FC<DialogProps> = ({
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  const { hideDialog } = useUI();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{content}</div>
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <button
              onClick={() => {
                onCancel();
                hideDialog();
              }}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
          )}
          {onConfirm && (
            <button
              onClick={() => {
                onConfirm();
                hideDialog();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Generic Drawer component
const Drawer: React.FC<DrawerProps> = ({ content, onClose }) => {
  const { hideDrawer } = useUI();

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={hideDrawer}
      />
      <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
        <div className="p-4">
          <button onClick={hideDrawer} className="absolute top-4 right-4">
            Close
          </button>
          {content}
        </div>
      </div>
    </>
  );
};
