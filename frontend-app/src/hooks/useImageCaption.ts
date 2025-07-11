import { useState } from "react";
import { apiService, type CaptionResponse } from "../services/apiService";
import axios from "axios";

interface UseImageCaptionReturn {
    isLoading: boolean;
    error: string | null;
    caption: (file: File) => Promise<void>;
    result: string | null;
    clearError: () => void;
    clearResult: () => void;
}

export const useImageCaption = (): UseImageCaptionReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const captionImage = async(file: File):Promise<void> => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response: CaptionResponse = await apiService.captionImage(file);
            setResult(response.data.caption || null);
        } catch (err) {
            if(axios.isAxiosError(err)) {
                if (err.response) {
                    setError(err.response.data.error || 'An error occurred while processing the image.');
                } else if (err.request) {
                    setError('No response received from the server.');
                } else {
                    setError(err.message);
                }
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    const clearError = () => {
        setError(null);
    };
    const clearResult = () => {
        setResult(null);
    };
    return {
        isLoading,
        error,
        caption: captionImage,
        result,
        clearError,
        clearResult
    };
}