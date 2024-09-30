import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

interface HeaderOptions {
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

export const headerSection = (options:HeaderOptions) : Content => {
    const {title, subtitle, showLogo, showDate} = options;

    const logo : Content = {
        image: 'src/assets/tucan-code-logo.png',
        width: 100,
        height: 100,
        alignment: 'center',
        margin: [0,0,0,20]
    }

    const headerLogo : Content = showLogo ? logo : null;
    const headerDate : Content = showDate ? {
        text: `${DateFormatter.getDDMMMMYYY(new Date())}`,
        alignment: 'right',
        margin: [20, 20, 20, 20]
    } as Content : null;

    return {
        columns: [headerLogo, headerDate]
    }
}