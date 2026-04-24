function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Bar */}
      <div className="bg-white shadow-sm px-8 py-4 flex justify-between">
        <h1 className="text-lg font-semibold text-indigo-600">
          MotoVerse
        </h1>

        <div className="flex gap-6 text-sm text-gray-600">
          <a href="/">Home</a>
          <a href="/cars">Browse</a>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {children}
      </div>

    </div>
  )
}

export default CustomerLayout