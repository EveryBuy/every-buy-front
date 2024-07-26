import { useState } from 'react';
import Modal from "react-modal";
import { ImUser } from "react-icons/im";
import styled from './ProfileModal.module.css';

Modal.setAppElement('#root');

const ProfileModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [subModalIsOpen, setSubModalIsOpen] = useState(false);
  const [subModalContent, setSubModalContent] = useState('');

  const toggleModal = () => setModalIsOpen(!modalIsOpen);
  
  const openSubModal = (content) => {
    setSubModalContent(content);
    setSubModalIsOpen(true);
  };
  const closeSubModal = () => setSubModalIsOpen(false);

  return (
    <div className={styled.profileModal}>
      <button onClick={toggleModal} className="styled.aboutMeIcon">
        <ImUser />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel="Content Label"
        className="styled.modalContent"
        overlayClassName="styled.modalOverlay"
      >
        <div className='styled.profileBubble'>
        <div className="styled.profileHeader">
          <img src="/src/assets/images/profile.png" alt="Profile" className="styled.profilePicture" />
            
          <h2>Вікторія</h2>
        </div>
        <ul className="styled.profileOptions">
          <li onClick={() => openSubModal('Редагування профілю')}>Редагування профілю</li>
          <li onClick={() => openSubModal('Оголошення')}>Оголошення</li>
          <li onClick={() => openSubModal('Повідомлення')}>Повідомлення</li>
          <li onClick={() => openSubModal('Обрані')}>Обрані</li>
          <li onClick={() => openSubModal('Вихід')}>Вихід</li>
          </ul>
          </div>
      </Modal>
      <Modal
        isOpen={subModalIsOpen}
        onRequestClose={closeSubModal}
        contentLabel="Sub Modal"
        className="styled.modalContent"
        overlayClassName="styled.modalOverlay"
      >
        <h2>{subModalContent}</h2>
        <button onClick={closeSubModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ProfileModal;