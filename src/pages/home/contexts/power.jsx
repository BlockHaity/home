import React from 'react';
import Markdown from 'react-markdown';

function Power() {
  const markdown = `
  能力:

  - 较为熟练的Python
  - 正在学习的React
  - 日用Linux
  `
  return (
    <Markdown>{markdown}</Markdown>
  );
}

export default Power;