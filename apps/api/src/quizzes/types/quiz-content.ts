export type BlockType = 'HEADING' | 'QUESTION' | 'BUTTON' | 'FOOTER';

export type HeadingBlock = {
  id: string;
  type: 'HEADING';
  props: { text: string; level: 1 | 2 | 3 };
};

export type QuestionBlock = {
  id: string;
  type: 'QUESTION';
  props: {
    prompt: string;
    kind: 'single' | 'multi' | 'text';
    options: string[];
  };
};

export type ButtonBlock = {
  id: string;
  type: 'BUTTON';
  props: { label: string; variant: 'next' | 'submit' };
};

export type FooterBlock = {
  id: string;
  type: 'FOOTER';
  props: { text: string };
};

export type QuizBlock = HeadingBlock | QuestionBlock | ButtonBlock | FooterBlock;

export type QuizContent = {
  blocks: QuizBlock[];
};
