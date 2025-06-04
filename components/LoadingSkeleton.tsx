export default function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse text-gray-500">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-7 bg-gray-300 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        </div>

        <div className="mt-6 text-center">
          <div className="h-16 bg-gray-300 rounded w-32 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-48 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center text-gray-500">
              <div className="h-4 bg-gray-300 rounded w-20 mx-auto mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-12 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="grid grid-cols-7 gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="text-center text-gray-500">
              <div className="h-4 bg-gray-300 rounded w-16 mx-auto mb-2"></div>
              <div className="h-10 w-10 bg-gray-300 rounded-full mx-auto my-2"></div>
              <div className="h-5 bg-gray-300 rounded w-12 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded w-16 mx-auto mt-1"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 h-96">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="h-full bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}