// app/index.tsx
import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Senu 👋</Text>
      <Link href="/chat" asChild>
        <Button title="Start Chat" />
      </Link>
    </View>
  );
}
