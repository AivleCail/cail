import React, { useState } from "react";
import './UserInfoContent.css'

const UserInfoContent = ({userInfo}) => {
    return (
        <div className="secure-container">
          <h2>개인정보처리방침</h2>
          <table>
            <tbody>
              <tr>
                [제 1 조 총칙]<br/>
                  <br/>
                  1. 개인정보란 생존하는 개인에 관한 정보로서 성명, 주민등록번호 등에
                  의하여 당해 개인을 알아볼 수 있는 부호, 문자, 음성, 음향, 영상 및 생체
                  특성 등에 관한 정보(당해 정보 만으로는 특정 개인을 알아볼 수 없는
                  경우에도 다른 정보와 용이하게 결합하여 알아볼 수 있는 것을 포함)를
                  말합니다.<br/>
                  2. CAIL 은 정보 주체의 개인정보를 중요시하며, 『개인정보 보호 법』과
                  개인정보 보호 관련 각종 법규를 준수하고 있습니다.<br/>
                  3. CAIL 은 개인정보처리방침을 통하여 정보 주체의 개인정보가 어떠한
                  용도와 방식으로 이용되고 있으며, 개인 정보 보호를 위해 어떠한 조치가
                  취해지고 있는지 알려드립니다.<br/>
                  4. CAIL 의 개인정보처리방침은 관련 법령 및 내부 운영 방침의 변경에 따라
                  개정될 수 있습니다. 개인정보처리방침이 개정되는 경우에는 시행 일자
                  등을 부여하여 개정된 내용을 홈페이지(http://cail.shop/)에 지체
                  없이 공지합니다.<br/>
                  5. 영업의 전부 또는 일부를 양도하거나 합병 등으로 개인정보를 이전하는
                  경우 서면 전자우편 등을 통하여 정보 주체에게 개별적으로 통지하고, 
                  CAIL 의 과실 없이 정보 주체의 연락처를 알 수 없는 경우에 해당하여
                  서면, 전자우편 등으로 통지할 수 없는 경우에는
                  홈페이지(http://cail.shop/), 첫 화면에서 식별할 수 있도록
                  표기하여 30 일 이상 그 사실을 공지합니다. 단, 천재지변 등 정당한
                  사유로 홈페이지 게시가 곤란한 경우에는 2 곳 이상의 중앙 일간지(정보
                  주체의 대부분이 특정 지역에 거주하는 경우에는 그 지역을 보급 구역으로
                  하는 일간지로 할 수 있습니다.)에 1 회 이상 공고하는 것으로 갈음합니다.<br/>
                  <br/>
                  [제 2 조 총칙]<br/>
                  <br/>
                  1. CAIL 은 장애 조치 확인, TM 업무 간편화 등을 위하여 필요한 범위에서
                  최소한의 개인 정보 만을 수집합니다.<br/>
                  2. CAIL 은 사상, 신념, 가족 및 친인척 관계 등 정보 주체의 권리 이익이나
                  사생활을 뚜렷하게 침해할 우려가 있는 개인정보는 수집하지 않습니다. 
                  다만, 정보 주체가 수집에 동의하시거나 다른 법률에 따라 특별히 수집
                  대상 개인정보로 허용된 경우에는 필요한 범위에서 최소한으로 위
                  개인정보를 수집할 수 있습니다.<br/>
                  3. CAIL 이 수집하는 개인정보 항목과 수집ㆍ이용 하는 목적은 다음과
                  같습니다<br/>
                   필수 수집/이용 목적 및 항목<br/>
                  <br/>
                  o 수집 및 이용 항목<br/>
                   성명, 연락처(휴대전화), 주소, 이메일(ID)<br/>
                  <br/>
                  o 수집 및 이용 목적<br/>
                   서비스 운용자와 사외 공사자 구분 및 로그인 구분<br/>
                  <br/>
                  ※위 정보는 가입 당시 정보뿐만 아니라 정보 수정으로 변경된 정보를
                  포함합니다.<br/>
                  ※주민등록번호 처리 근거: 「근로자 직업 능력 개발 법 시행령」 제 52 조의
                  2(민감 정보 및 고유 식별 정보의 처리)<br/>
                  <br/>
                  제 1 항 제 1 의 2 호 · 제 1 의 3 호 · 
                  제 2 호 · 제 3 호 · 제 4 호 · 제 12 호<br/>
                  <br/>
                  1. CAIL 은 아래의 경우에 한하여 정보 주체의 동의 없이 정보 주체의
                  개인정보를 수집ㆍ이용할 수 있습니다.<br/>
                  가. 정보 주체와의 계약을 이행하기 위하여 필요한 개인정보로서
                  경제적ㆍ기술적인 사유로 통상적인 동의를 받는 것이 뚜렷하게 곤란한
                  경우<br/>
                  나. 관련 법령에 특별한 규정이 있거나 법령 상 의무를 준수하기 위해
                  불가피한 경우<br/>
                  다. 정보 주체 또는 그 법정 대리인이 의사표시를 할 수 없는 상태에
                  있거나 주소 불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보
                  주체 또는 제 3 자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고
                  인정되는 경우<br/>
                  라. 개인 정보 처리 자의 정당한 이익을 달성하기 위하여 필요한 경우로서
                  명백하게 정보 주체의 권리보다 우선하는 경우. 이 경우 개인 정보 처리
                  자의 정당한 이익과 상당한 관련이 있고 합리적인 범위를 초과하지
                  아니하는 경우에 한합니다.<br/>
                  <br/>
                  [제 3 조 개인정보의 수집 방법]<br/>
                  <br/>
                  CAIL 은 다음과 같은 방법으로 개인정보를 수집합니다.<br/>
                  - 온라인/오프라인 등록 신청서 작성 등을 통해 수집<br/>
                  <br/>
                  [제 8 조 개인정보 자동 수집 장치의 설치 운영 및 그 거부에 관한 사항]<br/>
                  <br/>
                  CAIL 은 홈페이지 운영에 있어 필요 시 정보 주체의 정보를 찾아내고 저장하는
                  '쿠키(Cookie)'를 운용합니다. 쿠키는 CAIL 의 웹사이트를 운영하는데 이용되는
                  서버가 정보 주체의 브라우저에 보내는 아주 작은 텍스트 파일로서 정보 주체의
                  컴퓨터 하드디스크에 저장됩니다. 정보 주체는 웹 브라우저의 보안 정책을 통해
                  쿠키에 의한 정보 수집의 허용 거부 여부를 결정하실 수 있습니다.<br/>
                  1. 쿠키에 의해 수집 되는 정보 및 이용 목적<br/>
                  가. 수집 정보 : ID, 접속 IP, 접속 로그<br/>
                  2. 정보 주체는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 웹
                  브라우저에서 옵션을 설정함으로써 쿠키에 의한 정보 수집 수준의 선택을
                  조정하실 수 있습니다.<br/>
                  가. 웹 브라우저의 [도구][인터넷 옵션][개인정보]에서 쿠키에 의한
                  정보 수집 수준을 정할 수 있습니다.<br/>
                  나. 위에 제시된 메뉴를 통해 쿠키가 저장될 때마다 확인을 하거나, 
                  아니면 모든 쿠키의 저장을 거부할 수도 있습니다. 단, 정보 주체께서
                  쿠키 설치를 거부하였을 경우 서비스 제공에 어려움이 있을 수 있습니다.<br/>
                  <br/>
                  [제 12 조 권익 침해 구제 방법]<br/>
                  <br/>
                  기타 개인정보 침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에
                  문의하여 주시기 바랍니다.<br/>
                  <br/>
                  1. 개인정보 침해 신고 센터 (한국인터넷진흥원 운영)<br/>
                  가. 소관 업무 : 개인정보 침해 사실 신고, 상담 신청<br/>
                  나. 홈페이지/전화 : http://privacy.kisa.or.kr / (국번 없이) 118<br/>
                  2. 개인정보 분쟁 조정 위원회<br/>
                  가. 소관 업무 : 개인정보 분쟁 조정 신청, 집단 분쟁 조정 (민사적 해결)<br/>
                  나. 홈페이지/전화 : www.kopico.go.kr / (국번 없이) 1833-6972<br/>
                  3. 대검찰청 사이버수사과 : www.spo.go.kr / (국번 없이) 1301<br/>
                  4. 경찰청 사이버 안전국 : cyberbureau.police.go.kr / (국번 없이) 182<br/>
                  <br/>
                  [제 13 조 개인 정보 처리 방침 고지]<br/>
                  <br/>
                  개인 정보 처리 방침 공고/시행 일자<br/>
                  가. 공고 일자 : [2022/12/1]<br/>
                  나. 시행 일자 : [2022/12/1]<br/>

              </tr>
              
            </tbody>
          </table>
        </div>
    );
};
export default UserInfoContent;