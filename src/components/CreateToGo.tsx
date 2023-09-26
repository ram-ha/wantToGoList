import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { countryState } from '../atoms';

const Form = styled.form`
    width: 280px;
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: 280px;
    background-color: #1f1f24;
    color: #7697dd;
`;

const Btn = styled.button`
    width: 280px;
    height: 40px;
    font-size: 14px;
    border: 2px solid #278492;
    background-color: #111515c1;
    color: whitesmoke;
`;

const Error = styled.span`
    color: #b8ecff;
    margin: 5px 0 10px;
    display: block;
`;

interface IForm {
    toGo: string;
}

function CreateToGo() {
    const setToGo = useSetRecoilState(countryState);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>();
    const handleValid = ({ toGo }: IForm) => {
        setToGo((oldToGo) => [{ text: toGo, id: Date.now(), category: 'WANT_TO_GO' }, ...oldToGo]);
        setValue('toGo', '');
    };
    return (
        <Form onSubmit={handleSubmit(handleValid)}>
            <Input
                {...register('toGo', {
                    required: '😡 required!! ',
                })}
                placeholder="이름"
            />
            <Error>{errors?.toGo?.message}</Error>
            <Btn>가자!</Btn>
        </Form>
    );
}
export default CreateToGo;
