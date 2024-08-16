export async function getServerSideProps() {
  // Pastikan variabel lingkungan sudah diatur di Vercel
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Periksa apakah API URL tersedia
  if (!apiUrl) {
    console.error('API URL is not defined');
    return { props: { data: [] } };
  }

  try {
    const res = await fetch(`${apiUrl}/api/messages`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    const data = await res.json();

    return {
      props: { data },
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: { data: [] },
    };
  }
}

  
  export default function CheckMessages({ data }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border-b">To</th>
            <th className="py-2 px-4 border-b">Pesan</th>
            <th className="py-2 px-4 border-b">Musik</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{item.to}</td>
                <td className="py-2 px-4 border-b">{item.pesan}</td>
                <td className="py-2 px-4 border-b">{item.musik}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-2 px-4 text-center">No messages found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

  
