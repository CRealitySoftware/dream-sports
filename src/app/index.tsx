import { Redirect } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function index() {
  return Platform.OS == "web" ?
    <Redirect href={"/(web)"} /> :
    <Redirect href={"/(native)"} />
}