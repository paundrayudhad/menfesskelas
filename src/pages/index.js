import { useState } from 'react';

export default function KirimPesan() {
  const [formData, setFormData] = useState({ ke: '', pengirim: '', pesan: '', musik: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trackOptions, setTrackOptions] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getSpotifyToken = async () => {
    const clientId = '73790a45f82b474495c1c40ac2dcfda6';
    const clientSecret = '6d0c0245b9dc427f897c9cf61c1f1934';
    const creds = btoa(`${clientId}:${clientSecret}`);

    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${creds}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await res.json();
    return data.access_token;
  };

  const searchSpotifyTracks = async (query) => {
    if (!query) return;

    try {
      const token = await getSpotifyToken();
      const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      const tracks = data.tracks.items.map((track) => ({
        label: `${track.name} - ${track.artists[0].name}`,
        value: track.external_urls.spotify,
      }));
      setTrackOptions(tracks);
    } catch (err) {
      console.error('Failed to fetch tracks:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://portalberita.jeftechjuliversegroup.asia/api/messages.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          musik: selectedTrack || formData.musik,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Message added successfully');
        setFormData({ ke: '', pengirim: '', pesan: '', musik: '' });
        setSelectedTrack(null);
      } else {
        alert('Error adding message');
        setError(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Error adding message');
      setError('An error occurred while adding the message.');
    } finally {
      setLoading(false);
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

          {/* Autocomplete Musik dari Spotify */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="musik"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Cari musik dari Spotify"
                value={formData.musik}
                onChange={(e) => {
                  handleChange(e);
                  searchSpotifyTracks(e.target.value);
                }}
                required
              />
              {trackOptions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border mt-1 rounded-lg shadow max-h-60 overflow-y-auto">
                  {trackOptions.map((track, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFormData({ ...formData, musik: track.label });
                        setSelectedTrack(track.value);
                        setTrackOptions([]);
                      }}
                    >
                      {track.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Kirim Pesan'}
          </button>

          {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
}
