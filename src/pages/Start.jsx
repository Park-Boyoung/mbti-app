import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrangeButton from '../components/OrangeButton';
import { init, next } from '../store/modules/mbti';
import { useDispatch } from 'react-redux';

const MainImg = styled.img`
  width: interit;
`;
const Header = styled.p`
  font-size: 3em;
`;
const SubHeader = styled.p`
  font-size: 1.5em;
  color: #777;
`;

export default function Start() {
  const [counts, setCounts] = useState(0);
  const dispatch = useDispatch();

  async function mongoFetchData() {
    const resMongoCount = await fetch('http://localhost:4000/mongo/count');
    if (resMongoCount.status === 200) {
      const numOfCounts = await resMongoCount.json();
      if (numOfCounts.length !== 0) setCounts(numOfCounts[0].counts);
    } else {
      throw new Error('방문자 수 통신 이상');
    }

    const resMongoData = await fetch('http://localhost:4000/mongo/getdata');
    if (resMongoData.status === 200) {
      const data = await resMongoData.json();
      if (data.length !== 0) dispatch(init(data[0]));
    } else {
      throw new Error('데이터 통신 이상');
    }
  }
  useEffect(() => {
    // 데이터 받아오기
    mongoFetchData();
  }, []);

  return (
    <>
      <Header>개발자 MBTI 조사</Header>
      <MainImg src="/images/common.jpeg" alt="main img" />
      <SubHeader>
        개발자가 흔히 접하는 상황에 따라서 MBTI를 알아봅시다. 지금까지{'\n\n'}
        {counts}명이 참여해주셨습니다.
      </SubHeader>
      <OrangeButton text="테스트 시작" clickEvent={() => dispatch(next())} />
    </>
  );
}
