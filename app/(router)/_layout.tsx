import { Stack } from 'expo-router';

export default function MoreRouterLayout() {
  return (
    <Stack>
      <Stack.Screen name="searchResult" />
      <Stack.Screen name="announcements" />
      <Stack.Screen name="learnMore" />
      <Stack.Screen name="helpCenter" />
    </Stack>
  );
}
