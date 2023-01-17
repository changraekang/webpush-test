import React, { useEffect, useState } from "react";
import Layout from "../../templates/Layout";
import styled from "styled-components";
import fox from "../../assets/images/fox.png";
import { PushListBoxs } from "../../components/containers/push/PushBox";
import activeCheck from "../../assets/images/active-check.png";
import inActiveCheck from "../../assets/images/inactive-check.png";
import {
  grey1,
  grey2,
  grey3,
  grey5,
  grey9,
  primary2,
} from "../../constants/color";
import { useRecoilState } from "recoil";
import { MyPushProject } from "../../atom/Atom";
import { instanceAxios } from "../../api/axios";
import { ActiveDeletePushButton } from "../../components/buttons/PushButtons";
import Pagination from "../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
const PageWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  background-color: ${grey3};
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  padding-left: 40px;
`;
const Title = styled.p`
  display: flex;
  font-weight: 600;
  margin-bottom: 24px;
  border-bottom: 3px solid black;
`;

const Message = styled.p`
  color: ${grey9};
  font-size: 18px;
`;
const PageTitle = styled.h2`
  font-size: 40px;
  font-weight: 600;
  padding-bottom: 12px;
`;
const PushListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
const PushButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;
const RadioList = styled.ul`
  display: flex;
  margin: 14px 0;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
`;

const RadioLi = styled.li`
  display: flex;
  margin-right: 20px;
  align-items: center;
  gap: 4px;
`;
const PushConteneListWrapper = styled.div`
  padding-top: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid black; ;
`;
const Tabs = styled.div`
  display: flex;
  font-size: 24px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  flex: 0 0 30px;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const Message10 = styled.div`
  display: flex;
  justify-content: center;
  width: 10%;
  font-size: 14px;
  height: 23px;
  border-right: 1px solid black;
`;
const Message35 = styled.div`
  display: flex;
  justify-content: center;
  width: 35%;
  margin-bottom: 5px;
  font-size: 14px;
  height: 23px;
  border-right: 1px solid black;
`;
const MessageEven = styled.div`
  display: flex;
  font-size: 14px;
  height: 23px;
  background-color: ${primary2};
`;
const PushList = () => {
  //React 요소
  const navigate = useNavigate();

  //state
  const [myPushProject, setMyPushProject] = useRecoilState(MyPushProject);
  const [isReserve, setIsReserve] = useState(false);
  const [isProceed, setIsProceed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [pushList, setPushList] = useState([]);

  // 페이지네이션
  const [currentPage, setCurrrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = pushList.slice(firstPostIndex, lastPostIndex);
  // console.log(currentPosts, "currentPosts🍑🍑🍑")

  useEffect(() => {
    if (isReserve && isProceed && isComplete) {
      setIsAll(true);
    }
    if (!isReserve || !isProceed || !isComplete) {
      setIsAll(false);
    }
  }, [isReserve, isProceed, isComplete]);
  useEffect(() => {
    getPushList();
    console.log(pushList, "푸시리스트");
  }, [myPushProject]);
  const getPushList = async () => {
    try {
      const response = await instanceAxios.get(
        `/message/${myPushProject.pid}/all`,
        {}
      );
      if (response.status === 200) {
        setPushList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //handle 함수
  const handleSubmit = async (mid) => {
    console.log(mid);
    if (window.confirm("push 메세지를 삭제하시겠습니까?")) {
      try {
        const response = await instanceAxios.delete(`/message/${mid}`);
        if (response.status === 200) {
          alert("성공적으로 삭제되었습니다.");
          window.location.reload();
          console.log(response.data, "데이터 지우기⚠️");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAllClick = () => {
    if (isAll === false) {
      setIsAll(true);
      if (isProceed === false) {
        setIsProceed(true);
      }
      if (isComplete === false) {
        setIsComplete(true);
      }
      if (isReserve === false) {
        setIsReserve(true);
      }
    } else {
      setIsProceed(false);
      setIsComplete(false);
      setIsReserve(false);
      setIsAll(false);
    }
  };
  return (
    <Layout>
      <PageWrapper>
        <Title>
          {myPushProject.name ? myPushProject.name : "프로젝트를 선택해주세요"}
        </Title>
        <PageTitle>PUSH 리스트 </PageTitle>

        <Message>고객들에게 날린 웹푸시 리스트입니다</Message>
        <PushListBoxs>
          <PushButtonWrapper>
            <RadioList>
              <RadioLi onClick={handleAllClick}>
                {!isAll && <img src={inActiveCheck} alt="웹푸시 체크 아이콘" />}
                {isAll && <img src={activeCheck} alt="웹푸시 체크 아이콘" />}
                전체
              </RadioLi>
              <RadioLi onClick={() => setIsReserve(!isReserve)}>
                {!isReserve && (
                  <img src={inActiveCheck} alt="웹푸시 체크 아이콘" />
                )}
                {isReserve && (
                  <img src={activeCheck} alt="웹푸시 체크 아이콘" />
                )}
                예약중
              </RadioLi>
              <RadioLi onClick={() => setIsProceed(!isProceed)}>
                {!isProceed && (
                  <img src={inActiveCheck} alt="모바일푸시 체크 아이콘" />
                )}
                {isProceed && (
                  <img src={activeCheck} alt="모바일푸시 체크 아이콘" />
                )}
                진행중
              </RadioLi>
              <RadioLi onClick={() => setIsComplete(!isComplete)}>
                {!isComplete && (
                  <img src={inActiveCheck} alt="모바일푸시 체크 아이콘" />
                )}
                {isComplete && (
                  <img src={activeCheck} alt="모바일푸시 체크 아이콘" />
                )}
                진행완료
              </RadioLi>
            </RadioList>
          </PushButtonWrapper>
        </PushListBoxs>
        <PushListBoxs>
          <PushListWrapper>
            <PushConteneListWrapper>
              <Message10>상태</Message10>
              <Message10>발송타입</Message10>
              <Message35>내용</Message35>
              <Message35>발송시간</Message35>
              <Message10></Message10>
            </PushConteneListWrapper>
            {currentPosts.map((item, index) => {
              return (
                <PushConteneListWrapper
                  key={item.mid}
                  onClick={() => navigate(`/pushdetail/${item.mid}`)}
                >
                  <Message10>{item.state}</Message10>
                  <Message10>{item.pushType}</Message10>
                  <Message35>{item.content}</Message35>
                  <Message35>{item.sendTime.replace("T", " ")}</Message35>
                  <Message10>
                    <button>수정</button>
                    <ActiveDeletePushButton
                      handleSubmit={() => handleSubmit(item.mid)}
                    >
                      삭제
                    </ActiveDeletePushButton>
                  </Message10>
                </PushConteneListWrapper>
              );
            })}
          </PushListWrapper>
        </PushListBoxs>
        <Pagination
          totalPost={pushList.length}
          postsPerPage={postsPerPage}
          setCurrrentPage={setCurrrentPage}
        />
      </PageWrapper>
    </Layout>
  );
};

export default PushList;
