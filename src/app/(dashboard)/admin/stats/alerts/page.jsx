const AlertsReportPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="max-w-md mx-auto text-center bg-white p-6 rounded-lg shadow-md">
          <p className="text-2xl font-semibold text-gray-800 mb-4">P-count Alert</p>
          <p className="text-gray-600 mb-6">
            Currently, this section is under development. Check back later for more
            features.
          </p>
          <div className="flex justify-center">
            <svg
              className="w-12 h-12 text-gray-400 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Zm4-1a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
  
  export default AlertsReportPage;
  