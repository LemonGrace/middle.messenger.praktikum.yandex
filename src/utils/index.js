import Handlebars from 'handlebars';
import { toUpperCase } from './toUpperCase';
import { PARTIAL } from './partial';
import { buttonIconRender } from '../components/Button/Button.utils';
import { getErrorMessage } from '../pages/Error/Error.utils';
import { generateImgUrl } from './generateImgUrl';

export const initializeUtils = () => {
	Handlebars.registerHelper('toUpperCase', toUpperCase);
	Handlebars.registerHelper('buttonIconRender', buttonIconRender);
	Handlebars.registerHelper('getErrorMessage', getErrorMessage);
	Handlebars.registerHelper('generateImgUrl', generateImgUrl);
};

export const initializePartial = () => {
	for (const partialName in PARTIAL) {
		Handlebars.registerPartial(partialName, PARTIAL[partialName]);
	}
};
