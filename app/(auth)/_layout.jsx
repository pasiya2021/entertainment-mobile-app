import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loginscreen" options={{ headerShown: false }} />
            
        </Stack>
    )
}