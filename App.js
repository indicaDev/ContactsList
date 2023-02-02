
import { SafeAreaView } from 'react-native';
import { ContactsList } from "./src/screens/ContactsList";

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, marginVertical: 10}} >
      <ContactsList />
    </SafeAreaView>
  );
}