import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { muiTheme } from 'storybook-addon-material-ui';

import Button from './Button';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .addWithInfo('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ), { source: false, inline: true });

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
