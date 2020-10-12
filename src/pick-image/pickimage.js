import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import PickImageUI from './pickimageui';

export default class PickImage extends Plugin {
	static get pluginName() {
		return 'PickImage';
	}

	static get requires() {
		return [ PickImageUI ];
	}
}
