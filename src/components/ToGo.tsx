import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { ICountry, countryState } from '../atoms';

const Item = styled.li`
    display: flex;
    align-items: center;
    padding: 5px 0;
`;

const Name = styled.div`
    padding-right: 10px;
    text-align: left;
`;

const Btn = styled.button`
    width: fit-content;
    padding: 5px;
`;

function ToGo({ text, category, id }: ICountry) {
    const setToGo = useSetRecoilState(countryState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToGo((oldToGo) => {
            const targetIndex = oldToGo.findIndex((item) => item.id === id);
            const newToGo = { text, id, category: name as any };
            return [...oldToGo.slice(0, targetIndex), newToGo, ...oldToGo.slice(targetIndex + 1)];
        });
    };
    const setRemove = () => {
        setToGo((oldToGo) => oldToGo.filter((item) => item.id !== id));
    };
    return (
        <Item>
            <Name>{text}</Name>
            {category === 'WANT_TO_GO' && (
                <Btn name="VISITED" onClick={onClick}>
                    ✅
                </Btn>
            )}
            {category === 'WANT_TO_GO' && (
                <Btn name="WANT_TO_GO" onClick={setRemove}>
                    🗑️
                </Btn>
            )}
            {category === 'VISITED' && (
                <Btn name="LOVED" onClick={onClick}>
                    👍
                </Btn>
            )}
            {category === 'VISITED' && (
                <Btn name="WANT_TO_GO" onClick={onClick}>
                    ❌
                </Btn>
            )}
            {category === 'LOVED' && (
                <Btn name="VISITED" onClick={onClick}>
                    👎
                </Btn>
            )}
        </Item>
    );
}
export default ToGo;
