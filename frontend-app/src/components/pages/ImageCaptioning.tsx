import UploadForm from "../elements/UploadForm";
import OutputField from "../elements/OutputField";
import '../../css/pages/ImageCaptioning.css';
import { useState } from "react";
export default function ImageCaptioning() {
  const [captionResult, setCaptionResult] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCaptionResult = (result: string | null) => {
    setCaptionResult(result || '');
  };

  const handleProcessingState = (processing: boolean) => {
    setIsProcessing(processing);
  }
  const handleError = (errorMessage: string | null) => {
    setError(errorMessage || '');
  };
  const clearAll = () => {
    setCaptionResult('');
    setError(null);
    setIsProcessing(false);
  };
  return (
    <div className="content-container flex mx-auto p-4">
      <div className="w-full max-w-md">
        <UploadForm 
          onCaptionResult={handleCaptionResult}
          onProcessingState={handleProcessingState}
          onError={handleError}
          onClear={clearAll}
        />
      </div>
      <OutputField 
        result={captionResult}
        isLoading={isProcessing}
        error={error}
      />
    </div>
  );
}