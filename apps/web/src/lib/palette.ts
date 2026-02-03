import {QuizBlock} from '../../../../libs/types';
import {uid} from './id';

export type PaletteItem = {
  paletteType: QuizBlock['type'];
  label: string;
  make: () => QuizBlock;
};

export const PALETTE: PaletteItem[] = [
  {
    paletteType: 'HEADING',
    label: 'Heading',
    make: () => ({id: uid('h'), type: 'HEADING', props: {text: 'New heading', level: 2}}),
  },
  {
    paletteType: 'QUESTION',
    label: 'Question',
    make: () => ({
      id: uid('q'),
      type: 'QUESTION',
      props: {prompt: 'Your question?', kind: 'single', options: ['Option 1', 'Option 2']},
    }),
  },
  {
    paletteType: 'BUTTON',
    label: 'Button',
    make: () => ({id: uid('btn'), type: 'BUTTON', props: {label: 'Next', variant: 'next'}}),
  },
  {
    paletteType: 'FOOTER',
    label: 'Footer',
    make: () => ({id: uid('f'), type: 'FOOTER', props: {text: 'Footer text'}}),
  },
];
