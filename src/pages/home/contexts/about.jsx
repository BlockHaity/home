import React from 'react';
import Markdown from 'react-markdown';

function About() {
  const markdown = `
  ### 关于我

  Hi,我是BlockHaity,一个正在高中坐牢的学生

  这是我学习react用AI和自己写出来的一个粗糙的个人主页，也许可以参考，但不多...
  `
  return (
    <Markdown>{markdown}</Markdown>
  );
}

export default About;