import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams(); // 👈 receives the passed name

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    // Later you can query backend with `searchTerm`
    console.log("Searching for:", searchTerm);
  };

  const handleStartChat = () => {
    // Replace with real logic after friend search
    router.push("/chat");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Senu 👋</Text>
      {name && (
        <Text style={styles.subtitle}>Hi {name}, your profile is created!</Text>
      )}

      <Text style={styles.label}>Find Friends by Phone or Username</Text>
      <TextInput
        placeholder="Search..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />

      <Button title="Search" onPress={handleSearch} />

      <View style={{ height: 20 }} />

      <Button title="Start Chat" color="#FF3B30" onPress={handleStartChat} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
});
