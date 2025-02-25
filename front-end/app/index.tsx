import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Entypo";
import FontIcon from "react-native-vector-icons/FontAwesome";

export interface IMessage {
  id: string;
  text: string;
  user: "bot" | "user";
  createdAt: Date;
}

export default function HomeScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  async function sendMessage() {
    if (!inputText) {
      return;
    }
    setLoading(true);
    const message = inputText;
    try {
      setMessages((prev) => [
        ...prev,
        {
          id: String(messages.length + 1),
          text: inputText,
          user: "user",
          createdAt: new Date(),
        },
      ]);
      setInputText("");
      scrollToBottom();

      const response = await fetch(
        "http://127.0.0.1:7860/api/v1/run/11cf3bd5-1b6d-4300-a67b-254c58b2576c?stream=false",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer <TOKEN>",
            "Content-Type": "application/json",
            "x-api-key": "sk--KoipjN5k1dHCTUtqSiSjctQ8qfzwkPSmm9JRSL8_Is",
          },
          body: JSON.stringify({
            input_value: message,
            output_type: "chat",
            input_type: "chat",
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      setMessages((prev) => [
        ...prev,
        {
          id: String(messages.length + 1),
          text: data.outputs[0].outputs[0].results.message.data.text,
          user: "bot",
          createdAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  }
  // sk--KoipjN5k1dHCTUtqSiSjctQ8qfzwkPSmm9JRSL8_Is

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Saint Ai</Text>
          <Pressable onPress={() => setMessages([])}>
            <Icon name="new-message" size={25} color="white" />
          </Pressable>
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={styles.displaySection}
          contentContainerStyle={[
            styles.contentContainer,
            messages.length === 0 && { flex: 1 },
          ]}
        >
          {messages.length === 0 ? (
            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontFamily: "SpaceMono",
                }}
              >
                No messages yet
              </Text>
            </View>
          ) : (
            messages.map((message, i) => (
              <MessageComponent key={i} message={message} />
            ))
          )}
          {loading && <Loading />}
        </ScrollView>
        <View style={styles.messageSection}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            style={styles.input}
            placeholder="Type a message..."
            multiline
            placeholderTextColor={"white"}
          />
          <Pressable onPress={sendMessage}>
            <FontIcon name="send" size={25} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

function MessageComponent({ message }: { message: IMessage }) {
  return (
    <View
      style={[styles.messageContainer, message.user === "user" && styles.user]}
    >
      {message.user === "bot" && (
        <Text
          style={{
            color: "white",
            fontFamily: "SpaceMono",
            fontWeight: "bold",
            fontSize: 20,
            textDecorationLine: "underline",
            marginBottom: 5,
          }}
        >
          Bot
        </Text>
      )}
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
}
function Loading() {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
        padding: 15,
        borderRadius: 25,
      }}
    >
      <ActivityIndicator size={30} style={{}} />
      <Text style={{ color: "white" }}>Thinking ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 15,
    borderRadius: 25,
    alignSelf: "flex-start",
    maxWidth: "85%",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  user: {
    backgroundColor: "#4758f565",
    alignSelf: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "#131313",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  topBar: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  displaySection: {
    padding: 10,
    flex: 1,
    gap: 15,
    backgroundColor: "#1a1a1a",
  },
  contentContainer: {
    gap: 15,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    flex: 1,
    color: "white",
  },
  messageSection: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
});
