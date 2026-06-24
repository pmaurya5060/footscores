export default function Loader({ message = "Loading data..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-white">
      <div className="w-10 h-10 border-4 border-t-[#ffcc00] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
