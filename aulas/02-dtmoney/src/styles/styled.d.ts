import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      green: string;
      red: string;
      blue: string;
      blue_light: string;

      background: string;
      shape: string;

      input_border: string;
      input_background: string;
      text_title: string;
      text_body: string;
    };
  }
}
