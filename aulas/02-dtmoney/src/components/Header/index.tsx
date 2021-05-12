import Switch from 'react-switch';
import { useTheme } from 'styled-components';
import { shade } from 'polished';

import { useSpring } from 'react-spring';

import LogoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewTransactionModal,
  toggleTheme,
}) => {
  const { colors, title } = useTheme();

  const animation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 300,
  });

  return (
    <Container>
      <Content style={animation}>
        <Switch
          onChange={toggleTheme}
          checked={title === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={20}
          width={39}
          handleDiameter={20}
          offColor={shade(0.25, colors.blue)}
          onColor={colors.green}
        />
        <img src={LogoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
};
