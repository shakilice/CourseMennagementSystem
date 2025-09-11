export default function  passwortforgaet() {
    return (
         <form
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow font-sans space-y-4"
    >
      <h2 className="text-xl font-bold text-neutral-700">Recover Password</h2>

      <input
        type="email"
        required
        placeholder="Enter your email"
        className="w-full border text-gray-800 border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        Submitt
      </button>
    </form>
    )
}