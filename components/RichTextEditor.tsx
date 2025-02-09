import { theme } from '@/constants/theme';
import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

interface RichTextEditorProps {
  onChange?: (text: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange }) => {
  const richText = useRef<RichEditor>(null);

  return (
	<View style={styles.container}>
		<RichToolbar
			editor={richText}
			style={styles.toolbar}
			flatContainerStyle={styles.flatStyle}
			selectedIconTint={theme.colors.primaryDark}
			actions={[
				actions.setBold,
				actions.setItalic,
				actions.setUnderline,
				actions.removeFormat,
				actions.alignLeft,
				actions.alignCenter,
				actions.alignRight,
				actions.insertOrderedList,
				actions.heading1,
				actions.heading4
			]}
			iconMap={{
				[actions.heading1]: ({ tintColor }: { tintColor: string }) => <Text style={{ color: tintColor }}>H1</Text>,
				[actions.heading4]: ({ tintColor }: { tintColor: string }) => <Text style={{ color: tintColor }}>H4</Text>,
			}}
		/>
		<RichEditor
			ref={richText}
			onChange={onChange}
			containerStyle={styles.editor}
			editorStyle={{
				...styles.contentStyle,
				color: theme.colors.textDark,
				placeholderColor: 'gray',
			}}
			placeholder="Type your text here..."
		/>
	</View>
  );
};

const styles = StyleSheet.create({
  container: {
	flex: 1,
	minHeight: 285,
  },
  toolbar: {
	backgroundColor: theme.colors.gray,
	borderTopRightRadius: theme.radius.xl,
	borderTopLeftRadius: theme.radius.xl,
	paddingHorizontal: 10,
  },
  flatStyle: {
	gap: 4,
  },
  editor: {
	minHeight: 240,
	flex: 1,
	borderWidth: 1.5,
	borderTopWidth: 0,
	borderBottomLeftRadius: theme.radius.xl,
	borderBottomRightRadius: theme.radius.xl,
	borderColor: theme.colors.gray,
	padding: 5,
  },
  contentStyle: {
	// color: theme.colors.textDark,
	// placeholderColor: 'gray',
  }
});

export default RichTextEditor;



// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect, useState, useRef } from 'react';
// import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
// import { theme } from '@/constants/theme';

// interface RichTextEditorProps {
// 	editorRef: React.MutableRefObject<RichEditor | null>;
// 	onChange: (text: string) => void;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ editorRef, onChange }) => {
// 	const [isEditorReady, setEditorReady] = useState(false);

// 	// ✅ Ensure the editorRef is set before rendering toolbar
// 	useEffect(() => {
// 		if (editorRef.current) {
// 			console.log("✅ Editor is assigned!", editorRef.current);
// 			setEditorReady(true);
// 		}
// 	}, [editorRef.current]);

// 	// ✅ Correctly initialize the editor when it's ready
// 	const editorInitializedCallback = () => {
// 		console.log("✅✅✅ Editor is initialized! 🔥");
// 		setEditorReady(true);
// 	};

// 	return (
// 		<View style={{ minHeight: 285 }}>
// 			<Text>RichTextEditor</Text>

// 			{isEditorReady && (
// 				<RichToolbar
// 					style={styles.richBar}
// 					flatContainerStyle={styles.listStyle}
// 					selectedIconTint={theme.colors.primaryDark}
// 					actions={[
// 						actions.setStrikethrough,
// 						actions.removeFormat,
// 						actions.setBold,
// 						actions.setItalic,
// 						actions.insertOrderedList,
// 						actions.blockquote,
// 						actions.alignLeft,
// 						actions.alignCenter,
// 						actions.alignRight,
// 						actions.line,
// 						actions.heading1,
// 						actions.heading4,
// 					]}
// 					iconMap={{
// 						[actions.heading1]: ({ tintColor }: { tintColor: string }) => <Text style={{ color: tintColor }}>H1</Text>,
// 						[actions.heading4]: ({ tintColor }: { tintColor: string }) => <Text style={{ color: tintColor }}>H4</Text>,
// 					}}
// 					editor={editorRef.current} // ✅ Linking toolbar to editor
// 				/>
// 			)}

// 			<RichEditor
// 				ref={(ref) => {
// 					editorRef.current = ref;
// 					console.log("✅✅✅ RichEditor ref assigned:", ref);
// 					setEditorReady(true);
// 				}}
// 				editorInitializedCallback={editorInitializedCallback} // ✅ Important: Ensures proper setup
// 				containerStyle={styles.rich}
// 				editorStyle={styles.contentStyle}
// 				placeholder={"What's on your mind?"}
// 				onChange={onChange}
// 			/>
// 		</View>
// 	);
// };

// export default RichTextEditor;

// const styles = StyleSheet.create({
// 	richBar: {
// 		borderTopRightRadius: theme.radius.xl,
// 		borderTopLeftRadius: theme.radius.xl,
// 		backgroundColor: theme.colors.gray,
// 		paddingHorizontal: 10,
// 	},
// 	listStyle: {},
// 	rich: {},
// 	contentStyle: {},
// });










// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
// import { theme } from '@/constants/theme';

// interface RichTextEditorProps {
// 	editorRef: React.MutableRefObject<RichEditor | null>;
// 	onChange: (text: string) => void;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ editorRef, onChange }) => {
//   return (
// 	<View style={{ minHeight: 285 }}>
// 		<RichToolbar
// 			actions={[
// 				actions.setStrikethrough,
// 				actions.removeFormat,
// 				actions.setBold,
// 				actions.setItalic,
// 				actions.insertOrderedList,
// 				actions.blockquote,
// 				actions.alignLeft,
// 				actions.alignCenter,
// 				actions.alignRight,
// 				actions.code,
// 				actions.line,
// 				actions.heading1,
// 				actions.heading4,
// 			]}
// 			iconMap={{
// 				[actions.heading1]: ({ tintColor }: { tintColor: string }) => <Text style={{ color: tintColor }}>H1</Text>,
// 				[actions.heading4]: ({ tintColor }: { tintColor: string }) => <Text style={{ color: tintColor }}>H4</Text>
// 			}}
// 			style={styles.richBar}
// 			flatContainerStyle={styles.listStyle}
// 			selectedIconTint={theme.colors.primaryDark}
// 			editor={editorRef.current}  // Make sure to use `.current` when passing refs
// 			disabled={false}
// 		/>

// 		{/* <RichEditor
// 			// ref={editorRef}
// 			// containerStyle={styles.rich}
// 			// editorStyle={styles.contentStyle}
// 			// placeholder={"What's on your mind?"}
// 			// onChange={onChange}
// 		/> */}
// 	</View>
//   );
// };

// export default RichTextEditor;

// const styles = StyleSheet.create({
// 	richBar: {
// 		borderTopRightRadius: theme.radius.xl,
// 		borderTopLeftRadius: theme.radius.xl,
// 		backgroundColor: theme.colors.gray,
// 	},
// 	listStyle: {},
// 	rich: {},
// 	contentStyle: {}
// });
