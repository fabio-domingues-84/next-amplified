import { ReactElement } from "react";

const ModalWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {children}
    </div>
  );
};
export default ModalWrapper;
