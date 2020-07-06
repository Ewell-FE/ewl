import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'components/buttons';
const requireDemo = require.context('docs/src/pages/components/buttons', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/components/buttons',
  false,
  /\.(js|md|tsx)$/,
);

export default function Page({ demos, docs }) {

  const map = {}
  for (const key of requireDemo.keys()) {
    map[key] = requireDemo(key)
  }
  console.log(map)

  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
