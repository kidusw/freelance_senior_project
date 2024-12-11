import React from "react";

interface CustomAlertProps {
  message: string;
  isError: boolean; // Optional types for different styles
  //   onClose: () => void; // Callback for closing the alert
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  isError,
  //   onClose,
}) => {
  return (
    <>
      {!isError ? (
        <div
          className="bg-green-100 text-green-800 p-4 rounded-lg"
          role="alert"
        >
          <strong className="font-bold text-sm mr-4">Success!</strong>
          <span className="block text-sm sm:inline max-sm:mt-2">{message}</span>
        </div>
      ) : (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
          <strong className="font-bold text-sm mr-4">Error!</strong>
          <span className="block text-sm sm:inline max-sm:mt-2">{message}</span>
        </div>
      )}
    </>
  );
};

export default CustomAlert;
