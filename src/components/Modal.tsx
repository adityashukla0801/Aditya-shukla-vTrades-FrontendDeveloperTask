import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  iconSrc: string;
  title: string;
  description: string;
  buttonLabel?: string;
};

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  iconSrc,
  title,
  description,
  buttonLabel = "Okay",
}) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              className="bg-[#1F2129] text-center px-10 py-12 rounded-[10px] lg:w-[500px] lg:h-[409px] mx-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-8">
                <Image
                  src={iconSrc}
                  alt="modal icon"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-white text-[20px] font-semibold mb-6">
                {title}
              </h2>
              <p className="text-[#DADADA] text-sm mb-8">{description}</p>
              <div className="flex justify-end ">
                <button
                  onClick={onClose}
                  className="bg-[#8854C0] w-[116px] h-[50px] hover:bg-purple-700 text-white text-base font-semibold px-6 py-3 rounded-[10px]"
                >
                  {buttonLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
