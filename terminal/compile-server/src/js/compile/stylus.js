import SAjax from '@coffeekraken/sugar/js/class/SAjax'
import __settings from '../settings';

export default function stylus(code, language, options = {}) {

	return new Promise((resolve, reject) => {
		const ajx = new SAjax({
			url : `${__settings.apiUrl}/compile/${language}?${__settings.queryString}`,
			method : 'POST',
			data : JSON.stringify({
				data : code,
				options : options
			}),
			contentType : 'application/json'
		});
		resolve(ajx.send());
	});
}
