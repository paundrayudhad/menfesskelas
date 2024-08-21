import { useState } from 'react';
import Modal from 'react-modal';

// Ensure you call Modal.setAppElement to prevent screen readers from reading the background content
Modal.setAppElement('#__next');

export async function getServerSideProps() {
  const res = await fetch(`https://portalberita.jeftechjuliversegroup.asia/api/messages.php`);
  const data = await res.json();
  
  return {
    props: { data },
  };
}

export default function CheckMessages({ data }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (message) => {
    setSelectedMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md table-striped">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">To</th>
            <th className="py-2 px-4 border-b">Pengirim</th>
            <th className="py-2 px-4 border-b">Pesan</th>
            <th className="py-2 px-4 border-b">Musik</th>
          </tr> 
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => openModal(item)}>
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.ke}</td>
              <td className="py-2 px-4 border-b">{item.pengirim}</td>
              <td className="py-2 px-4 border-b">{item.pesan}</td>
              <td className="py-2 px-4 border-b">{item.musik}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Message Details"
        className="fixed inset-0 bg-white rounded-lg shadow-lg p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedMessage && (
          <div>
            <h2 className="text-xl font-bold mb-4">Message Details</h2>
            <p><strong>ID:</strong> {selectedMessage.id}</p>
            <p><strong>To:</strong> {selectedMessage.ke}</p>
            <p><strong>Pengirim:</strong> {selectedMessage.pengirim}</p>
            <p><strong>Pesan:</strong> {selectedMessage.pesan}</p>
            <p><strong>Musik:</strong> {selectedMessage.musik}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
