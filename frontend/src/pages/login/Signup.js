import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import Modal from '../components/modal/Modal';
import { API_URL } from '../config';
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('manager');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [phonenumberError, setPhonenumberError] = useState(false);
  const [errorAlert, setErrorAlert] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // 뷰포트 너비가 1000px 이하인지 상태 코드 추가
  const handleSignup = () => {
    if (!isChecked) {
      alert('개인정보 활용에 동의해야 합니다.');
      return;
    }


    if (!email || !password || !confirmPassword || !name || !role || !address || !phonenumber ) {
      setErrorAlert('');
      setSubmitted(true);
      return;
    }

    if ((password !== confirmPassword) && (!validateEmail(email)) && (!validatePhonenumber(phonenumber))){
      setConfirmPasswordError(true);
      setEmailError(true);
      setPhonenumberError(true);
      return;
    }
    if ((!validateEmail(email)) && (!validatePhonenumber(phonenumber))){
      setEmailError(true);
      setPhonenumberError(true);
      return;
    }
    if ((password !== confirmPassword) && (!validatePhonenumber(phonenumber))){
      setConfirmPasswordError(true);
      setPhonenumberError(true);
      return;
    }


    if ((password !== confirmPassword) && (!validateEmail(email))){
      setConfirmPasswordError(true);
      setEmailError(true);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    
    if (!validatePhonenumber(phonenumber)) {
      setPhonenumberError(true);
      return;
    }


    // 사용자 가입 유형을 확인하는 알림창 표시
    showUserTypeAlert()
      .then(() => {
        axios
          .post(`${API_URL}8080/auth/signup`, {
            name: name,
            email: email,
            password: password,
            auth: role === 'manager' ? 'ROLE_ADMIN' : 'ROLE_USER',
          }, { withCredentials: true })
          .then((response) => {
            // console.log('Well done!');
            // console.log('User profile', response.data.user);
            // console.log('User token', response.data.jwt);
            window.alert(`회원가입이 완료되었습니다.`)
            navigate('/');
          })
          .catch((error) => {
            setErrorAlert('이메일이 중복되었습니다.');
            console.error(error);
          });
      })
      .catch(() => {
        // 사용자가 취소한 경우, 필요한 초기화 작업을 수행할 수 있습니다.
        setRole('manager');
        setErrorAlert('');
        setSubmitted(false);
      });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  // const validatePhonenumber = (phonenumber) => {
  //   const phonenumberRegex = /^(010|070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/;
  //   return phonenumberRegex.test(phonenumber);
  // };

  const validatePhonenumber = (phonenumber) => {
    const phonenumberRegex = /^(010)-\d{4}-\d{4}$/;
    return phonenumberRegex.test(phonenumber);
  };
  
  const handleUserType = (selectedRole) => {
    setRole(selectedRole);
  };

  const showUserTypeAlert = () => {
    let userType = '';
    if (role === 'manager') {
      userType = '서비스 운용자';
    } else if (role === 'external') {
      userType = '사외공사자';
    }
    return new Promise((resolve, reject) => {
      if (window.confirm(`회원가입을 ${userType}로 진행하시겠습니까?`)) {
        resolve();
      } else {
        reject();
      }
    });
  };

  const openModal = () => {
    try {
      setIsOpenModal(true);
    } catch (error) {
      console.error('Error fetching voc details:', error);
    }
  };

  // Modal Close
  const closeModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {  // 1000px 이하일때(모바일) 운용자 버튼 누르지 못하게 막음
    const mediaQuery = window.matchMedia('(max-width: 1000px)');
  
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleMediaQueryChange);
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {   // 1000px 이하(모바일)일때 external 보이게
    if (isMobile) {
      setRole('external'); 
    } else {
      setRole('manager'); 
    }
  }, [isMobile]);


  return (
    <div className="container">
      <div className="bg-img" style={{ backgroundImage: 'url(bg.webp)' }}></div>
      <div className="context">
        <div className="signup-close-button-wrapper">
          <button className="signup-close-button" onClick={() => navigate('/')}>
            <img src={process.env.PUBLIC_URL + "xicon1.png"} alt="Close" />
          </button>
        </div>
        <div className='signup-title'><span>회원 가입</span></div>
        <div className='radio-buttons'>
        <button
  className={role === 'manager' ? 'user-type-button selected' : 'user-type-button'}
  onClick={() => handleUserType('manager')}
  disabled={isMobile}
>
  서비스 운용자
</button>
<button
  className={role === 'external' ? 'user-type-button selected' : 'user-type-button'}
  onClick={() => handleUserType('external')}
>
  사외공사자
</button>
        </div>
        <div className='a-input-group'>
          <div className='input-labels'>
            <span className='a-input-group-label'>이메일</span>
            {submitted && !email && <span className="field-error-message">필드를 입력해주세요.</span>}
            {emailError && <span className="field-error-message">유효한 이메일을 입력해주세요.</span>}
          </div>
          <input className='signup-input' type="text" value={email} placeholder="email@example.com" onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
            setErrorAlert('');
            setSubmitted(false);
          }} />
        </div>
        <div className='a-input-group'>
          <div className='input-labels'>
            <span className='a-input-group-label'>비밀번호</span>
            {submitted && !password && <span className="field-error-message">필드를 입력해주세요.</span>}
          </div>
          <input className='signup-input' type="password" value={password} onChange={(e) => {
            setPassword(e.target.value);
            setErrorAlert('');
            setSubmitted(false);
          }} />
        </div>
        <div className='a-input-group'>
          <div className='input-labels'>
            <span className='a-input-group-label'>비밀번호 확인</span>
            {submitted && !confirmPassword && <span className="field-error-message">필드를 입력해주세요.</span>}
            {confirmPasswordError && <span className="field-error-message">비밀번호가 일치하지 않습니다.</span>}
          </div>
          <input className='signup-input' type="password" value={confirmPassword} onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError(false);
            setErrorAlert('');
            setSubmitted(false);
            }}
          />
        </div>
        <div className='a-input-group'>
          <div className='input-labels'>
            <span className='a-input-group-label'>이름</span>
            {submitted && !name && <span className="field-error-message">필드를 입력해주세요.</span>}
          </div>
          <input className='signup-input' type="text" value={name} onChange={(e) => {
            setName(e.target.value);
            setErrorAlert('');
            setSubmitted(false);
          }}/>
        </div>
        <div className='a-input-group'>
          <div className='input-labels'>
            <span className='a-input-group-label'>주소</span>
            {submitted && !address && <span className="field-error-message">필드를 입력해주세요.</span>}
          </div>
          <input className='signup-input' type="text" value={address} onChange={(e) => {
            setAddress(e.target.value);
            setErrorAlert('');
            setSubmitted(false);
          }} />
        </div>
        <div className='a-input-group'>
          <div className='input-labels'>
            <span className='a-input-group-label'>전화번호</span>
            {submitted && !phonenumber && <span className="field-error-message">필드를 입력해주세요.</span>}
            {phonenumberError && <span className="field-error-message">유효한 전화번호를 입력해주세요.</span>}
          </div>
          <input className='signup-input' type="text" value={phonenumber} placeholder="010-0000-0000" onChange={(e) => {
            setPhonenumber(e.target.value);
            setPhonenumberError(false);
            setErrorAlert('');
            setSubmitted(false);
          }} />
          
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <strong onClick={openModal}>개인정보수집 및 이용에 동의하시겠습니까?</strong>
        </div>
        <div className='error-group'>
          {errorAlert && <div className="error-alert">{errorAlert}</div>}
        </div>
        <div className='signup-button-div'>
        <button className="signup-button" onClick={handleSignup}>가 입</button>
        </div>
      </div>
      {isOpenModal && (
      <Modal isOpen={isOpenModal} closeModal={closeModal} entity="userInfo"/>
    )}
    </div>

    
  );
};

export default Signup;
