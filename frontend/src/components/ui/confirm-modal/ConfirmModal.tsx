import { ReactNode } from "react";
import { Modal } from "../modal";
import Button from "../button/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "destructive";
  isLoading?: boolean;
  children?: ReactNode;
  requireConfirmation?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "primary",
  isLoading = false,
  children,
  requireConfirmation = true,
}) => {
  const iconClass = confirmVariant === "destructive"
    ? "bg-error-50 dark:bg-error-500/15 text-error-500"
    : "bg-brand-50 dark:bg-brand-500/15 text-brand-500";

  const confirmDisabled = requireConfirmation ? !message && !children : false;

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false} className="max-w-md mx-auto p-6">
      <div className="text-center">
        <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full mb-4 ${iconClass}`}>
          {confirmVariant === "destructive" ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {message && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>
        )}
        {children && <div className="mt-4 text-left">{children}</div>}
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>{cancelText}</Button>
          <Button variant={confirmVariant} onClick={onConfirm} loading={isLoading} disabled={confirmDisabled}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
