import unflattenHeadings from '../unflattenHeadings';

function createElement(tagName: string) {
  return { tagName };
}

describe('unflattenHeadings', () => {
  test('no headings', () => {
    const unflattened = unflattenHeadings([]);
    expect(unflattened).toStrictEqual([]);
  });

  test('single heading', () => {
    const headings = [createElement('H1')];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      { heading: createElement('H1'), active: false, section: [] },
    ]);
  });

  test('two headings at same level', () => {
    const headings = [createElement('H1'), createElement('H1')];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      { heading: createElement('H1'), active: false, section: [] },
      { heading: createElement('H1'), active: false, section: [] },
    ]);
  });

  test('two headings one section', () => {
    const headings = [createElement('H1'), createElement('H2')];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      {
        heading: createElement('H1'),
        active: false,
        section: [{ heading: createElement('H2'), active: false, section: [] }],
      },
    ]);
  });

  test('two headings two sections', () => {
    const headings = [createElement('H2'), createElement('H1')];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      { heading: createElement('H2'), active: false, section: [] },
      { heading: createElement('H1'), active: false, section: [] },
    ]);
  });

  test('three headings two sections', () => {
    const headings = [
      createElement('H2'),
      createElement('H1'),
      createElement('H3'),
    ];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      { heading: createElement('H2'), active: false, section: [] },
      {
        heading: createElement('H1'),
        active: false,
        section: [{ heading: createElement('H3'), active: false, section: [] }],
      },
    ]);
  });

  test('generic test', () => {
    const headings = [
      createElement('H1'),
      createElement('H2'),
      createElement('H2'),
      createElement('H3'),
      createElement('H5'),
      createElement('H3'),
      createElement('H2'),
      createElement('H6'),
      createElement('H1'),
      createElement('H4'),
    ];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      {
        heading: createElement('H1'),
        active: false,
        section: [
          { heading: createElement('H2'), active: false, section: [] },
          {
            heading: createElement('H2'),
            active: false,
            section: [
              {
                heading: createElement('H3'),
                active: false,
                section: [
                  { heading: createElement('H5'), active: false, section: [] },
                ],
              },
              { heading: createElement('H3'), active: false, section: [] },
            ],
          },
          {
            heading: createElement('H2'),
            active: false,
            section: [
              { heading: createElement('H6'), active: false, section: [] },
            ],
          },
        ],
      },
      {
        heading: createElement('H1'),
        active: false,
        section: [{ heading: createElement('H4'), active: false, section: [] }],
      },
    ]);
  });

  describe('activeHeadingIndex', () => {
    test('index out of bounds', () => {
      const headings = [createElement('H1')];
      const unflattened = unflattenHeadings(headings, 4);
      expect(unflattened).toStrictEqual([
        {
          heading: createElement('H1'),
          active: false,
          section: [],
        },
      ]);
    });

    test('valid index', () => {
      const headings = [
        createElement('H1'),
        createElement('H2'),
        createElement('H1'),
      ];
      const unflattened = unflattenHeadings(headings, 1);
      expect(unflattened).toStrictEqual([
        {
          heading: createElement('H1'),
          active: false,
          section: [
            { heading: createElement('H2'), active: true, section: [] },
          ],
        },
        { heading: createElement('H1'), active: false, section: [] },
      ]);
    });
  });
});
