import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _ScreenLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
            <Stack.Screen name="AlbumPlaylist" options={{ headerShown: false }} />
            <Stack.Screen name="PlayerScreen" options={{ headerShown: false }} />
            <Stack.Screen name="ArtistSongs" options={{ headerShown: false }} />
        </Stack>
    )
}