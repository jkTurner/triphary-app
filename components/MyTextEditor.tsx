import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

const MyTextEditor = () => {
  const editorRef = useRef<RichEditor | null>(null);

  return (
    <View style={styles.container}>
      {/* Rich Toolbar */}
      <RichToolbar
        editor={editorRef}  // Connect toolbar to editor
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

      {/* Rich Text Editor */}
      <RichEditor
        ref={editorRef}
        style={styles.editor}
        placeholder="Start writing..."
        onChange={(text) => console.log('Editor Content:', text)}
      />
    </View>
  );
};

export default MyTextEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  editor: {
    flex: 1,
    minHeight: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});
