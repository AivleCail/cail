import React from 'react';
import './Modal.css';
import ArticalContent from './ArticalContent';
import VocContent from './VocContent';
import WorkerContent from './WorkerContent';
import UserInfoContent from './UserInfoContent';

const Modal = ({ isOpen, closeModal, entity, article, comments, voc, worker, userInfo}) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          <img src={process.env.PUBLIC_URL + "xicon1.png"} alt="Close" />
        </button>
        {entity === 'article' && <ArticalContent article={article} comments={comments} />}
        {entity === 'voc' && <VocContent voc={voc} />}
        {entity === 'worker' && <WorkerContent worker={worker} />}
        {entity === 'userInfo' && <UserInfoContent/> }
      </div>
    </div>
  );
};

export default Modal;
