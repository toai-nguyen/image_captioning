import '../../css/elements/OutputField.css';
import { Copy, Check, AlertCircle, FileText, Loader2 } from 'lucide-react';
import React from 'react';

interface OutputFieldProps {
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

export default function OutputField({
  result,
  isLoading,
  error
}: OutputFieldProps) {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  }
      // <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
      // <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      //   Upload Image
      // </h2>
  return (
    <div className="caption-field p-6 bg-gray-50 rounded-lg h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
        <FileText className="mr-2 h-6 w-6" />
        Caption Result
      </h2>
      <div className="min-h-[200px] flex flex-col">
        {/* Loading State */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Analyzing image...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-medium text-red-700 mb-2">Error occurred</h3>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Result State */}
        {result && !isLoading && !error && (
          <div className="flex-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-800">Generated Caption:</h3>
                <button
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed">{result}</p>
            </div>

            {copied && (
              <div className="text-sm text-green-600 text-center">
                ✓ Copied to clipboard!
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!result && !isLoading && !error && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Upload an image to generate caption</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}