// components/RichTextEditor.tsx
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

interface RichTextEditorProps {
  onChange?: (text: string) => void;
}

const MyTextEditorTwo: React.FC<RichTextEditorProps> = ({ onChange }) => {
  const richText = useRef<RichEditor>(null);

  return (
    <View style={styles.container}>
		<RichToolbar
			editor={richText}
			style={styles.toolbar}
			actions={[
				actions.setBold,
				actions.setItalic,
				actions.setUnderline,
				actions.removeFormat,
				actions.alignLeft,
				actions.alignCenter,
				actions.alignRight,
				actions.insertOrderedList,
			]}
		/>
		<RichEditor
			ref={richText}
			onChange={onChange}
			style={styles.editor}
			placeholder="Type your text here..."
		/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editor: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
	minHeight: 300,
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default MyTextEditorTwo;


// // components/RichTextEditor.tsx
// import React, { useRef } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

// interface RichTextEditorProps {
//   onChange?: (text: string) => void;
// }

// const MyTextEditorTwo: React.FC<RichTextEditorProps> = ({ onChange }) => {
//   const richText = useRef<RichEditor>(null);

//   return (
//     <View style={styles.container}>
//       <RichEditor
//         ref={richText}
//         onChange={onChange}
//         style={styles.editor}
//         placeholder="Type your text here..."
//       />
//       <RichToolbar
//         editor={richText}
//         style={styles.toolbar}
//         actions={[
//           'bold',
//           'italic',
//           'underline',
//           'strikethrough',
//           'insertLink',
//           'unorderedList',
//           'orderedList',
//           'code',
//           'blockquote',
//           'undo',
//           'redo',
//         ]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   editor: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   toolbar: {
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//   },
// });

// export default MyTextEditorTwo;





// import React, { useState, useRef } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

// const MyTextEditorTwo: React.FC<{ onChangeText: (text: string) => void }> = ({ onChangeText }) => {
//   const [text, setText] = useState('');
//   const editor = useRef(null);

//   const handleTextChange = (html: string) => {
//     setText(html);
//     onChangeText(html); // Pass the updated text to the parent component
//   };

//   return (
//     <View style={styles.container}>
//       <RichToolbar
//         editor={editor}
//         onPressAddImage={() => console.log('Add Image Pressed')}
//       />
//       <RichEditor
//         ref={editor}
//         style={styles.editor}
//         initialHeight={400}
//         initialContentHTML={text}
//         onChange={handleTextChange}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   editor: {
//     flex: 1,
//   },
// });

// export default MyTextEditorTwo;



