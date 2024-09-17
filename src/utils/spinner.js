import { Loader2 } from 'lucide-react'; // Ensure you have lucide-react installed

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-32">
    <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
    <span className="ml-2 text-gray-500">Loading...</span>
  </div>
);
