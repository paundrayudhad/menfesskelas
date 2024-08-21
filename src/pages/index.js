import { useState } from 'react';

export default function KirimPesan() {
  const [formData, setFormData] = useState({ ke: '', pengirim: '', pesan: '', musik: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors

    try {
      const res = await fetch('https://portalberita.jeftechjuliversegroup.asia/api/messages.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert('Message added successfully');
        setFormData({ ke: '', pengirim: '', pesan: '', musik: '' }); // Reset form data
      } else {
        alert('Error adding message');
        setError(data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Error adding message');
      setError('An error occurred while adding the message.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Kirimkan Pesan ke Kami</h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
          inventore quaerat mollitia?
        </p>

        <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <div>
            <div className="relative">
              <input
                type="text"
                name="ke"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="isi orang yang ingin kamu kirimi pesan"
                value={formData.ke}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                name="pengirim"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="isi pengirim"
                value={formData.pengirim}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                name="pesan"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="isi Pesan"
                value={formData.pesan}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                name="musik"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="isi musik yang kamu inginkan"
                value={formData.musik}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Sending...' : 'Kirim Pesan'}
          </button>

          {error && (
            <div className="mt-4 text-red-500">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
