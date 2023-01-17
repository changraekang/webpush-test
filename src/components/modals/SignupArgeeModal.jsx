import React from "react";
import styled from "styled-components";
import {
  grey11,
  MAIN_BACKGROUND_COLOR,
  grey1,
  grey2,
  primary4,
  grey5,
  grey3,
} from "../../constants/color";

const Wrapper = styled.div`
  position: fixed;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${grey1};
  width: 560px;
  height: 544px;
`;

const Title = styled.h2`
  color: ${grey11};
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 12px;
  align-items: center;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  width: 520px;
  height: 392px;
  padding: 16px 24px 16px 16px;
  pointer-events: auto;
  background-color: ${grey2};
  border-radius: 8px;
  outline: 0;
`;
const ButtonWrapper = styled.div`
  width: 520px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 18px;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 36px;
  background: ${grey3};
  border: 1px solid ${grey5};
  border-radius: 32px;
  &:hover {
    background-color: ${primary4};
    color: ${grey1};
  }
`;
const SignupArgeeModal = (props) => {
  console.log(`Modal`, props.content);
  const handleClose = (e) => {
    e.preventDefault();
    props.setClose(false);
  };
  const renderPersonalModal = () => {
    return (
      <ModalWrapper>
        <Title>개인정보 수입 이용동의 (필수)</Title>
        <ModalContent>
          제 1 장 Welcome, Ohouse !<br />
          <br /> 제 1 조 (목적) 주식회사 버킷플레이스(이하 '회사')가 인터넷과
          모바일 등 플랫폼(이하 ‘오늘의집’)을 통해 제공하는 다양한 서비스를
          이용하여 주셔서 감사합니다. 회사는 이용자가 오늘의집을 더 편리하게
          이용할 수 있도록 서비스 이용약관(이하 '본 약관')을 마련하였습니다. 본
          약관은 이용자가 서비스를 이용하는데 필요한 권리, 의무 및 책임사항 기타
          필요한 사항을 규정하고 있으므로 주의깊게 살펴봐 주시기 바랍니다.{" "}
          <br></br>
          제 2 조 (정의)
          <br />
          본 약관에서 사용하는 용어의 정의는 다음 각 호와 같습니다.
          <br />
          오늘의집: 회사가 운영하는 플랫폼을 의미하며, 인터넷, 모바일
          어플리케이션(이하 ‘앱’) 등을 통하여 파트너들이 제공하는 다양한 재화
          또는 용역(이하 '재화 등')의 광고를 이용자에게 제공하거나, 파트너와
          이용자 간 거래를 중개하고, 나아가 회사 또는 이용자가 창작한 다양한
          콘텐츠를 게시하고 그를 통하여 이용자 간 커뮤니케이션이 진행될 수
          있도록 설정한 공간을 말하며, 아울러 이를 운영하는 사업자의 의미로도
          사용합니다.
          <br />
          서비스: 콘텐츠 및 그를 매개로 한 이용자 간 커뮤니케이션 공간, 파트너
          재화 등의 광고 및 파트너와 고객 간 거래의 중개 등 이용자의 생활을 더
          편리하게 하기 위해 회사가 오늘의집을 통하여 제공 또는 제공할 서비스를
          말합니다.
          <br />
          제휴서비스: 회사가 자신이 운영하는 타 서비스 또는 자신과 협력관계에
          있는 제3자가 운영하는 서비스와 오늘의집을 연동하는 등 다양한 제휴
          방식을 통해 오늘의집과 별개로 국내 ∙ 외에서 제공하는 서비스를
          말합니다.
          <br />
          이용자: 회사가 제공하는 서비스를 이용하는 자로서 회원 및 비회원을
          포함합니다.
          <br />
          회원: 오늘의집에 회원등록을 한 자로서, 오늘의집 내에서 서비스를 이용할
          수 있는 자격을 갖춘 자를 말합니다.
          <br />
          비회원: 회원에 가입하지 않고, 오늘의집에서 제한적으로 제공하는
          서비스를 이용하는 자를 말합니다.
          <br />
          콘텐츠: 회사 또는 이용자가 서비스 상에 게시 또는 등록하는 모든 글,
          사진, 동영상, 각종 파일, 링크, 회원소개 등(부호, 문자, 영상, 그림 등
          그 형태를 불문합니다) 오늘의집 내에서 게시 또는 사용되는 일체의 정보를
          말합니다.
          <br />
          파트너: 오늘의집이 지정한 절차를 마치고 오늘의집을 이용하는 자로,
          오늘의집을 통해 이용자에게 자신의 재화 등을 광고 또는 판매하는 자를
          말합니다.
          <br />
          회원정보: 오늘의집을 통해 가입을 신청한 자에게 회원가입 신청양식(이하
          '신청양식')에 따라 기재를 요청하는 개인정보 및 회원의 식별과 서비스
          이용을 위하여 회원이 오늘의집에 제공한 정보를 말합니다.
        </ModalContent>
      </ModalWrapper>
    );
  };
  const renderMarketingModal = () => {
    return (
      <ModalWrapper>
        <Title>마케팅 정보 이용동의 (선택)</Title>
        <ModalContent>
          제 1 장 Welcome, Ohouse !<br />
          <br /> 제 1 조 (목적) 주식회사 버킷플레이스(이하 '회사')가 인터넷과
          모바일 등 플랫폼(이하 ‘오늘의집’)을 통해 제공하는 다양한 서비스를
          이용하여 주셔서 감사합니다. 회사는 이용자가 오늘의집을 더 편리하게
          이용할 수 있도록 서비스 이용약관(이하 '본 약관')을 마련하였습니다. 본
          약관은 이용자가 서비스를 이용하는데 필요한 권리, 의무 및 책임사항 기타
          필요한 사항을 규정하고 있으므로 주의깊게 살펴봐 주시기 바랍니다.{" "}
          <br></br>
          제 2 조 (정의)
          <br />
          본 약관에서 사용하는 용어의 정의는 다음 각 호와 같습니다.
          <br />
          오늘의집: 회사가 운영하는 플랫폼을 의미하며, 인터넷, 모바일
          어플리케이션(이하 ‘앱’) 등을 통하여 파트너들이 제공하는 다양한 재화
          또는 용역(이하 '재화 등')의 광고를 이용자에게 제공하거나, 파트너와
          이용자 간 거래를 중개하고, 나아가 회사 또는 이용자가 창작한 다양한
          콘텐츠를 게시하고 그를 통하여 이용자 간 커뮤니케이션이 진행될 수
          있도록 설정한 공간을 말하며, 아울러 이를 운영하는 사업자의 의미로도
          사용합니다.
          <br />
          서비스: 콘텐츠 및 그를 매개로 한 이용자 간 커뮤니케이션 공간, 파트너
          재화 등의 광고 및 파트너와 고객 간 거래의 중개 등 이용자의 생활을 더
          편리하게 하기 위해 회사가 오늘의집을 통하여 제공 또는 제공할 서비스를
          말합니다.
          <br />
          제휴서비스: 회사가 자신이 운영하는 타 서비스 또는 자신과 협력관계에
          있는 제3자가 운영하는 서비스와 오늘의집을 연동하는 등 다양한 제휴
          방식을 통해 오늘의집과 별개로 국내 ∙ 외에서 제공하는 서비스를
          말합니다.
          <br />
          이용자: 회사가 제공하는 서비스를 이용하는 자로서 회원 및 비회원을
          포함합니다.
          <br />
          회원: 오늘의집에 회원등록을 한 자로서, 오늘의집 내에서 서비스를 이용할
          수 있는 자격을 갖춘 자를 말합니다.
          <br />
          비회원: 회원에 가입하지 않고, 오늘의집에서 제한적으로 제공하는
          서비스를 이용하는 자를 말합니다.
          <br />
          콘텐츠: 회사 또는 이용자가 서비스 상에 게시 또는 등록하는 모든 글,
          사진, 동영상, 각종 파일, 링크, 회원소개 등(부호, 문자, 영상, 그림 등
          그 형태를 불문합니다) 오늘의집 내에서 게시 또는 사용되는 일체의 정보를
          말합니다.
          <br />
          파트너: 오늘의집이 지정한 절차를 마치고 오늘의집을 이용하는 자로,
          오늘의집을 통해 이용자에게 자신의 재화 등을 광고 또는 판매하는 자를
          말합니다.
          <br />
          회원정보: 오늘의집을 통해 가입을 신청한 자에게 회원가입 신청양식(이하
          '신청양식')에 따라 기재를 요청하는 개인정보 및 회원의 식별과 서비스
          이용을 위하여 회원이 오늘의집에 제공한 정보를 말합니다.
        </ModalContent>
      </ModalWrapper>
    );
  };
  const renderAgreementModal = () => {
    return (
      <ModalWrapper>
        <Title>이용정보 약관 이용동의 (필수)</Title>
        <ModalContent>
          제 1 장 Welcome, Ohouse !<br />
          <br /> 제 1 조 (목적) 주식회사 버킷플레이스(이하 '회사')가 인터넷과
          모바일 등 플랫폼(이하 ‘오늘의집’)을 통해 제공하는 다양한 서비스를
          이용하여 주셔서 감사합니다. 회사는 이용자가 오늘의집을 더 편리하게
          이용할 수 있도록 서비스 이용약관(이하 '본 약관')을 마련하였습니다. 본
          약관은 이용자가 서비스를 이용하는데 필요한 권리, 의무 및 책임사항 기타
          필요한 사항을 규정하고 있으므로 주의깊게 살펴봐 주시기 바랍니다.{" "}
          <br></br>
          제 2 조 (정의)
          <br />
          본 약관에서 사용하는 용어의 정의는 다음 각 호와 같습니다.
          <br />
          오늘의집: 회사가 운영하는 플랫폼을 의미하며, 인터넷, 모바일
          어플리케이션(이하 ‘앱’) 등을 통하여 파트너들이 제공하는 다양한 재화
          또는 용역(이하 '재화 등')의 광고를 이용자에게 제공하거나, 파트너와
          이용자 간 거래를 중개하고, 나아가 회사 또는 이용자가 창작한 다양한
          콘텐츠를 게시하고 그를 통하여 이용자 간 커뮤니케이션이 진행될 수
          있도록 설정한 공간을 말하며, 아울러 이를 운영하는 사업자의 의미로도
          사용합니다.
          <br />
          서비스: 콘텐츠 및 그를 매개로 한 이용자 간 커뮤니케이션 공간, 파트너
          재화 등의 광고 및 파트너와 고객 간 거래의 중개 등 이용자의 생활을 더
          편리하게 하기 위해 회사가 오늘의집을 통하여 제공 또는 제공할 서비스를
          말합니다.
          <br />
          제휴서비스: 회사가 자신이 운영하는 타 서비스 또는 자신과 협력관계에
          있는 제3자가 운영하는 서비스와 오늘의집을 연동하는 등 다양한 제휴
          방식을 통해 오늘의집과 별개로 국내 ∙ 외에서 제공하는 서비스를
          말합니다.
          <br />
          이용자: 회사가 제공하는 서비스를 이용하는 자로서 회원 및 비회원을
          포함합니다.
          <br />
          회원: 오늘의집에 회원등록을 한 자로서, 오늘의집 내에서 서비스를 이용할
          수 있는 자격을 갖춘 자를 말합니다.
          <br />
          비회원: 회원에 가입하지 않고, 오늘의집에서 제한적으로 제공하는
          서비스를 이용하는 자를 말합니다.
          <br />
          콘텐츠: 회사 또는 이용자가 서비스 상에 게시 또는 등록하는 모든 글,
          사진, 동영상, 각종 파일, 링크, 회원소개 등(부호, 문자, 영상, 그림 등
          그 형태를 불문합니다) 오늘의집 내에서 게시 또는 사용되는 일체의 정보를
          말합니다.
          <br />
          파트너: 오늘의집이 지정한 절차를 마치고 오늘의집을 이용하는 자로,
          오늘의집을 통해 이용자에게 자신의 재화 등을 광고 또는 판매하는 자를
          말합니다.
          <br />
          회원정보: 오늘의집을 통해 가입을 신청한 자에게 회원가입 신청양식(이하
          '신청양식')에 따라 기재를 요청하는 개인정보 및 회원의 식별과 서비스
          이용을 위하여 회원이 오늘의집에 제공한 정보를 말합니다.
        </ModalContent>
      </ModalWrapper>
    );
  };
  return (
    <Wrapper>
      <Modal>
        {props.content === "personal" ? renderPersonalModal() : null}
        {props.content === "agreement" ? renderAgreementModal() : null}
        {props.content === "marketing" ? renderMarketingModal() : null}
        <ButtonWrapper>
          <Button onClick={handleClose}> 닫기</Button>
        </ButtonWrapper>
      </Modal>
    </Wrapper>
  );
};

export default SignupArgeeModal;
