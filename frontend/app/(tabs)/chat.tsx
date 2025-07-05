import React, { useEffect, useRef, useState } from "react";
import { Button, ScrollView, StyleSheet, TextInput, View } from "react-native";
import MessageBubble from "../../components/MessageBubble";
import { connectSocket, getSocket } from "../../lib/socket";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: string; isOwn: boolean; translated?: string }[]
  >([]);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const socket = connectSocket();
    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Connected to Socket.IO");
    });

    socket.on("receive_message", (msg: string) => {
      setMessages((prev) => [...prev, { text: msg, isOwn: false }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = getSocket();
    if (!message.trim()) return;

    socket.emit("send_message", message);
    setMessages((prev) => [...prev, { text: message, isOwn: true }]);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 20 }}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            text={msg.text}
            isOwnMessage={msg.isOwn}
            translatedText={msg.translated}
          />
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} color="#FF3B30" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },
  inputBar: {
    flexDirection: "row",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
});
