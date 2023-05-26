import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NewPostForm from './NewPostForm'; 


export default function App() {
  return (
    <View style={styles.container}>
      <NewPostForm />
      {/* Other components */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },

});

