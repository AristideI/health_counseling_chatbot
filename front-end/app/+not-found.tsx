import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>Sorry, the page you requested could not be found.</Text>
        <Link href="/">Go to the home page</Link>
      </View>
    </>
  );
}
