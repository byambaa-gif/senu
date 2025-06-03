// components/MessageBubble.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface MessageBubbleProps {
  text: string;
  isOwnMessage?: boolean;
  translatedText?: string;
  sender?: string;
}

export default function MessageBubble({
  text,
  isOwnMessage,
  translatedText,
  sender,
}: MessageBubbleProps) {
  return (
    <View style={[styles.container, isOwnMessage ? styles.own : styles.other]}>
      {sender && <Text style={styles.sender}>{sender}</Text>}
      <Text style={styles.originalText}>{text}</Text>
      {translatedText && (
        <Text style={styles.translatedText}>{translatedText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sender: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#fff",
  },
  container: {
    marginVertical: 4,
    padding: 10,
    maxWidth: "80%",
    borderRadius: 12,
  },
  own: {
    alignSelf: "flex-end",
    backgroundColor: "#FF3B30",
  },
  other: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  originalText: {
    color: "#fff",
    fontWeight: "600",
  },
  translatedText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
    fontStyle: "italic",
  },
});
