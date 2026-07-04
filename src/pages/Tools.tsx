export default function Tools() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="w-full h-[calc(100vh-80px)] overflow-hidden">
        <iframe 
          src="https://remix-ng-goma-bi-t-tu-t-896003381997.us-west1.run.app"
          title="Goma Calculator & Inventory"
          className="w-full h-full border-none shadow-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
