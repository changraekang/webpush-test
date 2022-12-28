import styled from "styled-components"

const DesingLine = styled.div`
  width: 100%;
  height: 1px;
  background: #AFAFAF;
  margin-bottom: 25px;
`
const InputAlign = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: ${(props) => (props.last ? "32px" : "12px")};
  margin-bottom: ${(props) => (props.agreement ? "24px" : null)};
`

export default function SignupAgreement() {
  return (
    <>
      <InputAlign agreement>
        <div>
          <input type="checkbox" id="agreement"/>
          <label htmlFor="agreement">전체 약관동의</label>
        </div>
      </InputAlign>
      <DesingLine></DesingLine>
      <InputAlign agreement>
        <div>
          <input type="checkbox" id="agreement1"/>
          <label htmlFor="agreement1">만 14세 이상입니다.(필수)</label>
        </div>
        <button>전문보기</button>
      </InputAlign >
      <InputAlign agreement>
        <div>
          <input type="checkbox" id="agreement2"/>
          <label htmlFor="agreement2">DMPUSH 이용약관.(필수)</label>
        </div>
        <button>전문보기</button>
      </InputAlign>
      <InputAlign agreement>
        <div>
          <input type="checkbox" id="agreement3"/>
          <label htmlFor="agreement3">DMPUSH 이용약관.(필수)</label>
        </div>
        <button>전문보기</button>
      </InputAlign>
      <InputAlign agreement>
        <div>
          <input type="checkbox" id="agreement4"/>
          <label htmlFor="agreement4">DMPUSH 이용약관.(필수)</label>
        </div>
        <button>전문보기</button>
      </InputAlign>
    </>
  )
}
