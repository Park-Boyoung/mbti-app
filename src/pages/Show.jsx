import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PinkButton from '../components/PinkButton';
import { reset } from '../store/modules/mbti';

const Header = styled.p`
  font-size: 3em;
`;

const Explaination = styled.p`
  font-size: 1.5em;
  color: #777;
`;

const Result = styled.p`
  font-size: 3em;
  color: dodgerblue;
`;

const Additional = styled.p`
  font-size: 2em;
  color: orange;
`;

const AdditionalImg = styled.img`
  width: 500px;
  transform: translateX(-35px);
`;

export default function Show() {
  const result = useSelector((state) => state.mbti.mbtiResult);
  const explaination = useSelector((state) => state.mbti.explaination[result]);
  const dispatch = useDispatch();

  async function incCount() {
    const resInc = await fetch('http://localhost:4000/mongo/inccount', {
      method: 'POST',
    });
    if (resInc.status === 200) {
      const msg = await resInc.json();
      console.log(msg);
    } else {
      throw new Error('통신 이상');
    }
  }

  useEffect(() => {
    // 사용자 수 추가
    incCount();
  }, []);

  return (
    <>
      <Header>당신의 개발자 MBTI 결과는?</Header>
      <Explaination>{explaination.text}</Explaination>
      <Result>{result}</Result>
      <Additional>이건 재미로 읽어보세요.</Additional>
      <AdditionalImg src={explaination.img} alt="팩폭" />
      <PinkButton text="다시 검사하기" clickEvent={() => dispatch(reset())} />
    </>
  );
}
