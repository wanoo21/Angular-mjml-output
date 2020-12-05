import {load} from "cheerio";
import {parse} from "css";

import {IPEmail, IStructure, TBackgroundRepeat, TDirection, TStructureTypes, TUnits} from "../mjml-output/interfaces";
import {extractBorder, extractPadding, extractStyles} from "../mjml-output/utils";

const supportedBlocks = [
    'mj-button',
    'mj-divider',
    'mj-image',
    'mj-social',
    'mj-spacer',
    'mj-text',
]

export function convertMjmlToIpEmail(mjml: string) {
    const $ = load(mjml);
    const $head = $("mj-head");
    const $body = $("mj-body");
    const {stylesheet} = parse($head.find("mj-style[inline]").text())
    const bodyStyles = extractStyles(stylesheet, '.body');

    const fonts: string[] = []
    $head.find("mj-font").each((q, font) => {
        fonts.push(font.attribs.href)
    })

    const structures: IStructure[] = $body.find("mj-section").toArray().map((section) => {
        const $section = $(section);
        const [type, id] = $section.attr('css-class')?.split(' ') || '';
        const [columns] = type.match(/\d+/g) || [1];
        const sectionStyles = extractStyles(stylesheet, `.${id}`)

        // @ts-ignore
        return {
            type: type as TStructureTypes,
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
                        unit: '%'
                    }
                    // size TODO
                },
                // disableResponsive: false
            },
            elements: [[]],
            columns: Number(columns)
        } as IStructure;
    });

    const [bodyWidthUnit] = ($body.attr('width') || '600px').match(/([^\d+]\w+)/g) || 'px';
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
