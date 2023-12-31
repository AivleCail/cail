import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";  
import './external.css';
import AiIcon from '../components/icons/ai.svg';
import WorkerIcon from '../components/icons/worker.svg';
import InformContent from '../components/receipt/InformContent';
import FormContent from '../components/receipt/FormContent';
import { API_URL } from "../config";
const ExternalReceipt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [receiptContent, setreceiptContent] = useState("");
  const [externalAddress, setexternalAddress] = useState("");
  const [externalStartdate, setexternalStartdate] = useState("");
  const [isDataReceived, setIsDataReceived] = useState(false);
  const navigate = useNavigate();  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  useEffect(() => { // 로그인 여부 확인
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 이용가능합니다.');
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      window.alert("음성 파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('token',localStorage.getItem('accessToken'));

      axios.post(`${API_URL}8000/stt/external_check`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        setCompanyName(response.data.companyName);
        setexternalAddress(response.data.externalAddress);
        setexternalStartdate(response.data.externalStartdate);
        setreceiptContent(response.data.receiptContent);
        setIsDataReceived(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  };
  const tospring = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      window.alert("음성 파일을 선택해주세요.");
      return;
    }

    const externalData = {
      "companyName": companyName,
      "receiptContent": receiptContent,
      "externalAddress": externalAddress,
      "externalStartdate": externalStartdate,
    }

    const confirm = window.confirm("해당 접수 내용을 전송하시겠습니까?");

    if (confirm) {
      axios.post(`${API_URL}8080/worker/result`, externalData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => {
        setTimeout(function(){
          window.alert("접수가 완료되었습니다!");
          navigate("/myexternal");
        }, 1000);
        //사외공사 리스트로 보내버리기
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
     
  }

  const informText = "안녕하세요 Cail 입니다. 원활한 공사 신고를 위해 다음 안내사항에 따라 공사 정보를 등록해주세요.";
  const speechBubbleText = [
    "회사이름 : 한국가스공사",
    "공사내용 : 점검 및 고장 부품 수리",
    "공사주소 : 부산광역시 사하구 @@번지 11호",
    "공사날짜 : 2023년 06월 17일 오후 1시",
  ];


  const handleLogout = () => { // 로그아웃
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      localStorage.removeItem('accessToken');
      alert('로그아웃 되었습니다.');
      navigate('/');
    }
  };
  const handleBackButton = () => {
    const confirmLeavePage = window.confirm(
      "현재 페이지를 나가시면 내용이 저장되지 않을 수 있습니다.\n" +
      "정말 나가시겠습니까?"
    );
    if (confirmLeavePage) {
      navigate("/myexternal");
    }
  };
  
  return (
    <div className='mobile-container'>
      <div className='mobile-title'>
        <button className="list-back-button" onClick={handleBackButton}>
          <img className="list-back-button-detail" src={process.env.PUBLIC_URL + '/arrowback.svg'} alt="Back"/>
        </button>
        <span className='title-text'>새로운 공사 신고 접수</span>
        <button className="list-logout-button" onClick={handleLogout}>
          <img className="list-logout-button-detail" src={process.env.PUBLIC_URL + '/logout.svg'} alt="Logout"/>
        </button>

      </div>
      <hr />
      <InformContent
        aiIcon={AiIcon}
        informText={informText}
        speechBubbleText={speechBubbleText}
        SubcustomerIcon={WorkerIcon}
      />
      <hr />
      <FormContent
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
      <div className='received-box'>
      {isDataReceived && (
        <div className='received-box-text'>
          <p className='received-box-text-one'>회사 이름: {companyName}</p>
          <p className='received-box-text-one'>공사 내용: {receiptContent}</p>
          <p className='received-box-text-one'>공사 주소: {externalAddress}</p>
          <p className='received-box-text-one'>공사 날짜: {externalStartdate}</p>
        </div>
      )}
      </div>

      <button type="submit" className='receipt-button voice-send-button' onClick={tospring}>전송</button>
    </div>
  );
};

export default ExternalReceipt;
