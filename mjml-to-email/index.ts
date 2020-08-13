import { load } from "cheerio";
import { MjmlButton, MjmlDivider } from "@mjml-to-email/blocks";

export function convertMjmlToIpEmail(mjml: string) {
    const $ = load(mjml);

    const fonts: CheerioElement["attribs"][] = []
    $('mj-head mj-font').each((q, font) => {
        fonts.push(font.attribs)
    })

    return { fonts }
}