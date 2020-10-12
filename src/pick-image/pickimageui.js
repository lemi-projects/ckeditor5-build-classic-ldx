import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

export default class PickImageUI extends Plugin {

	static get pluginName() {
		return 'PickImageUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;

		// Setup `pickImage` button.
		editor.ui.componentFactory.add( 'pickImage', locale => {
			const view = new ButtonView( locale );

			const picker = editor.config.get( 'image.picker' )

			view.set( {
				label: t( 'Insert image' ),
				icon: imageIcon,
				tooltip: true
			} );

			const insertImage = function(url) {
				if(url && url.length > 0) {
					editor.model.change( writer => {
						const imageElement = writer.createElement( 'image', {
							src: url
						} );
	
						// Insert the image in the current selection location.
						editor.model.insertContent( imageElement, editor.model.document.selection );
					} );	
				}
			}

			view.on( 'execute', () => {				
				if(picker && picker.open) {
					picker.open(editor).then((url)=>{
						insertImage(url);
					})
				}else{
					const url = prompt( 'Image URL' );
					insertImage(url);
				}
			} );

			return view;
		} );
	}
}
