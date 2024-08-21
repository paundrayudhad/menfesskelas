export async function getServerSideProps() {
  const res = await fetch(`https://portalberita.jeftechjuliversegroup.asia/api/messages.php`);
  const data = await res.json();
  
    return {
      props: { data },
    };
  }
  
  export default function checkMessages({ data }) {
    return (
      <div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Messages</h1>
  <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md table-stripped">
    <thead>
      <tr class="bg-gray-200 text-gray-700 text-left">
      <th class="py-2 px-4 border-b">ID</th>
        <th class="py-2 px-4 border-b">To</th>
        <th class="py-2 px-4 border-b">Pengirim</th>
        <th class="py-2 px-4 border-b">Pesan</th>
        <th class="py-2 px-4 border-b">Musik</th>
      </tr> 
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id} class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{item.id}</td>
          <td class="py-2 px-4 border-b">{item.ke}</td>
          <td class="py-2 px-4 border-b">{item.pengirim}</td>
          <td class="py-2 px-4 border-b">{item.pesan}</td>
          <td class="py-2 px-4 border-b">{item.musik}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    );
  }
  