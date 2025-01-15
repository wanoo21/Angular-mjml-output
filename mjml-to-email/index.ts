import cheerio, {load} from "cheerio";
import {parse} from "css";

/**
 * TODO 2. Extract the right background options
 * TODO 3. Adapt for external MJML Templates, as much as possible
 * TODO 4. Add all errors in case of importing an external MJML Template
 */
import {IPEmail, IStructure, TBackgroundRepeat, TDirection, TUnits} from "../mjml-output/interfaces";
import {extractBorder, extractPadding, extractStyles} from "../mjml-output/utils";
import {MjmlButton, MjmlDivider, MjmlImage, MjmlSocial, MjmlSpacer, MjmlText} from "./blocks";

const supportedBlocks = [
  'mj-button',
  'mj-divider',
  'mj-image',
  'mj-social',
  'mj-spacer',
  'mj-text',
]

// @ts-ignore
function getBlock(block: CheerioElement, $block: cheerio.Cheerio) {
  switch (block.tagName) {
    case 'mj-text':
      return new MjmlText($block).toObject()
    case 'mj-image':
      return new MjmlImage($block).toObject()
    case 'mj-button':
      return new MjmlButton($block).toObject()
    case 'mj-divider':
      return new MjmlDivider($block).toObject();
    case 'mj-spacer':
      return new MjmlSpacer($block).toObject();
    case 'mj-social':
      return new MjmlSocial($block).toObject()
  }
}

export function convertMjmlToIpEmail(mjml: string) {
  const $ = load(mjml);
  const $head = $("mj-head");
  const $body = $("mj-body");
  const {stylesheet} = parse($head.find("mj-style[inline]").text())
  const bodyStyles = extractStyles(stylesheet, '.body');

  const fonts: string[] = []
  $head.find("mj-font").each((q, font) => {
    // @ts-ignore
    fonts.push(font.attribs.href)
  })

  const structures: IStructure[] = $body.find("mj-section").toArray().map((section) => {
    const $section = $(section);
    const $columns = $section.find('mj-column')
    const [type, id] = $section.attr('css-class')?.split(' ') || '';
    const [columns] = type.match(/\d+/g) || [1];
    const sectionStyles = extractStyles(stylesheet, `.${id}`)
    const [VerticalGap, HorizontalGap] = ($columns.first().attr('padding') || '4px 4px').split(' ').map(gap => parseInt(gap))

    return {
      type,
      id: Number(id),
      options: {
        margin: {
          top: parseInt(sectionStyles('margin-top') || '0px'),
          bottom: parseInt(sectionStyles('margin-bottom') || '0px')
        },
        border: {
          ...extractBorder(sectionStyles('border')),
          radius: parseInt($section.attr('border-radius') || '0px')
        },
        padding: extractPadding($section.attr('padding')),
        background: {
          color: $section.attr('background-color'),
          url: $section.attr('background-url'),
          repeat: $section.attr('background-repeat') as TBackgroundRepeat,
          size: {
            auto: true,
            unit: '%',
            value: 200
          }
          // size TODO
        },
        disableResponsive: !!$section.find('mj-group').length,
        columns: $columns.toArray().map(column => {
          const $column = $(column);
          return {
            background: {
              color: $column.attr('background-color') || '#cccccc'
            },
            border: {
              ...extractBorder($column.attr('border')),
              radius: parseInt($column.attr('border-radius') || '0px')
            },
            verticalAlign: $column.attr('vertical-align') || 'top'
          }
        }),
        gaps: [VerticalGap, HorizontalGap],
        columnsWidth: $columns.toArray().map(column => {
          const $column = $(column);
          const width = parseInt($column.attr('width') as string) / 10;
          return width === 10 ? 1 : width;
        })
      },
      elements: $columns.toArray().map(column => {
        const $column = $(column);
        return $column.children().toArray()
        // @ts-ignore
        .filter(({tagName}) => supportedBlocks.includes(tagName))
        // @ts-ignore
        .map(block => getBlock(block, $(block)))
      }),
      columns: Number(columns)
    } as IStructure;
  });

  const [bodyWidthUnit] = ($body.attr('width') || '600px').match(/([^\d+]\w+)/g) || ['px'];
  return new IPEmail({
    padding: extractPadding(bodyStyles('padding')),
    name: $head.find('mj-title').text(),
    previewText: $head.find('mj-preview').text(),
    width: {
      value: parseInt($body.attr('width') || '600px'),
      unit: bodyWidthUnit as TUnits
    },
    background: {
      color: bodyStyles('background') || '#ffffff',
      size: {
        value: 100, // TODO parse the right data
        unit: '%', // TODO parse the right data
        // value: bodyStyles('background-size')
        auto: bodyStyles('background-size') === 'auto'
      }
    },
    direction: $head.find('mj-all').attr('direction') as TDirection || 'ltr',
    global: {
      fonts,
      padding: extractPadding($head.find('mj-all').attr('padding'))
    }
  }, structures)
}
