import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import uuid from "react-native-uuid";

const Home = ({ navigation: { navigate } }) => {
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [cards, setCards] = useState([]);

  const handleOnPressAddCard = () => {
    const newCard = {
      id: uuid.v4(),
      content,
      writer,
      time: new Date().toLocaleString(),
    };
    setCards([...cards, newCard]);
    navigate("CardDetails", { cards: cards });
  };

  return (
    <View style={styles.background}>
      <TextInput
        style={styles.cardWriterInput}
        onChangeText={setWriter}
        value={writer}
      />
      <TextInput
        style={styles.cardContentInput}
        multiline={true}
        numberOfLines={1}
        onChangeText={setContent}
        value={content}
      />
      <TouchableOpacity onPress={handleOnPressAddCard}>
        <Text>제출</Text>
      </TouchableOpacity>
    </View>
  );
};

const CardDetails = ({ route }) => {
  return (
    <View style={styles.cardContainer}>
      {route.params.cards.map((card) => (
        <View key={card.id} style={styles.cardItem}>
          <Text>작성자: {card.writer}</Text>
          <Text>내용: {card.content}</Text>
        </View>
      ))}
    </View>
  );
};

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="CardDetails" component={CardDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  cardContentInput: {
    flex: 0.5,
    backgroundColor: "pink",
  },
  cardWriterInput: {
    flex: 0.1,
    backgroundColor: "green",
  },
  cardContainer: {
    alignItems: "center",
    backgroundColor: "aqua",
  },
  cardItem: {
    marginBottom: 10,
    backgroundColor: "whitesmoke",
    width: "90%",
  },
});
