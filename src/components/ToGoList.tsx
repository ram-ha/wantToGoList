import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import CreateToGo from './CreateToGo';
import { toGoSelector } from '../atoms';
import ToGo from './ToGo';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
`;

const H1 = styled.h1`
    color: whitesmoke;
    font-size: 1.2rem;
    font-weight: 600;
    width: 280px;
    padding: 15px 0;
`;

const List = styled.ul`
    width: 280px;
    margin-bottom: 20px;
`;

const H2 = styled.h2``;

function ToGoList() {
    const [WANT_TO_GO, VISITED, LOVED] = useRecoilValue(toGoSelector);

    return (
        <Wrapper>
            <H1>내가 가고 싶은 나라들</H1>
            <CreateToGo />
            <List>
                {WANT_TO_GO?.map((item) => (
                    <ToGo key={item.id} {...item} />
                ))}
            </List>
            <H1>내가 가본 나라들</H1>
            <List>
                {VISITED?.map((item) => (
                    <ToGo key={item.id} {...item} />
                ))}
            </List>
            <H1>내가 좋아하는 나라들</H1>
            <List>
                {LOVED?.map((item) => (
                    <ToGo key={item.id} {...item} />
                ))}
            </List>
        </Wrapper>
    );
}

export default ToGoList;
