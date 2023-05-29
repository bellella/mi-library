import { Div, DivInterface, createMi } from "@milibrary/mi-style";

export interface ContainerInterface extends DivInterface { };

export const Container = createMi<ContainerInterface>({
  tagName: <Div pl={10} pr={10} />,
  css: {
    height: '100%',
    width: '100%',
    maxWidth: '1300px',
    margin: '0 auto',
    '@media (max-width: 749px)': {
      paddingLeft: '5vw',
      paddingRight: '5vw'
    }
  }
});