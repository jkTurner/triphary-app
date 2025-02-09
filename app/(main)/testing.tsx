// pages/testing.tsx
import MyTextEditorTwo from '@/components/MyTextEditorTwo';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';


const TestingPage: React.FC = () => {
  const [richText, setRichText] = useState('');

  const handleTextChange = (text: string) => {
    setRichText(text);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
		<MyTextEditorTwo onChange={handleTextChange} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default TestingPage;


// import React, { useState } from 'react';
// import { Text, View, Button } from 'react-native';
// import MyTextEditorTwo from '@/components/MyTextEditorTwo';

// const NewPostScreen: React.FC = () => {
//   const [postContent, setPostContent] = useState('');

//   const handlePostSubmit = () => {
//     // Handle post submission logic here (e.g., send data to server)
//     console.log('Post Content:', postContent);
//   };

//   return (
//     <View>
// 	  <MyTextEditorTwo onChangeText={setPostContent}/>
//       <Button title="Submit Post" onPress={handlePostSubmit} />
//     </View>
//   );
// };

// export default NewPostScreen;



// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import MyTextEditor from '@/components/MyTextEditor'

// const testing = () => {
//   return (
// 	<View>
// 	  <Text>testing</Text>
// 	  <MyTextEditor />
// 	</View>
//   )
// }

// export default testing

// const styles = StyleSheet.create({})



