export const getMJMLHead = ({
  global,
  padding,
  background
}: {
  global?: object;
  padding?: object;
  background?: object;
}): object => {
  return {
    tagName: 'mj-head',
    children: [
      {
        tagName: 'mj-attributes',
        children: [
          {
            tagName: 'mj-all',
            attributes: {
              // padding: 0,
              'font-size': '16px'
            }
          }
        ]
      }
    ]
  };
};

export const getMJMLBody = ({ structures }: { structures?: [] }): object => {
  return {
    tagName: 'mj-body',
    attributes: {
      'css-class': 'body'
    },
    children: [
      {
        tagName: 'mj-section',
        children: [
          {
            tagName: 'mj-column',
            children: [
              {
                tagName: 'mj-button',
                content: 'Text'
              }
            ]
          }
        ]
      }
    ]
  };
};
